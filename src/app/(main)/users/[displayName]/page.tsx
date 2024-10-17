"use client";

import { UserData } from "@/lib/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import ky from "ky";
import { useEffect, useState } from "react";
import { redirect, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast"
import { useForm } from "react-hook-form";
import { updateUserProfileSchema } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Camera } from "lucide-react";
import SkeletonForm from "./SkeletonForm";

async function fetchUser(displayName: string | undefined): Promise<UserData> {
  if (!displayName) {
    throw new Error("Aucun pseudo fourni.");
  }

  const response = await ky.get(`/api/user?displayName=${displayName}`).json<UserData>();
  if (!response) {
    "test";
  }
  return response;
}

async function checkAuthorization(displayName: string): Promise<boolean> {
  const response = await ky.get(`/api/check-auth?displayName=${displayName}`).json<{ isAuthorized: boolean }>();
  return response.isAuthorized;
}

interface PageProps {
  params: { displayName: string };
}

export default function Page({ params: { displayName } }: PageProps) {
  const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null);
  const router = useRouter();
  const queryClient = useQueryClient();

  const { toast } = useToast()
  
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(updateUserProfileSchema),
  });

  useEffect(() => {
    async function checkAuth() {
      try {
        const authorized = await checkAuthorization(displayName);
        setIsAuthorized(authorized);
        if (!authorized) {
          redirect("/unauthorized");
        }
      } catch (error) {
        console.error("Erreur lors de la vérification de l'autorisation:", error);
        setIsAuthorized(false);
      }
    }
    checkAuth();
  }, [displayName, router]);

  const { data: user, isLoading, error } = useQuery({
    queryKey: ["user", displayName],
    queryFn: () => fetchUser(displayName),
    staleTime: 1000 * 60 * 5, // 5 minutes avant que les données soient considérées comme périmées
    gcTime: 1000 * 60 * 10, // 10 minutes avant que le cache soit supprimé
    refetchOnWindowFocus: true, // Recharge les données lorsque l'utilisateur revient sur la fenêtre
  });

  const updateUserMutation = useMutation({
    mutationFn: (updatedData: Partial<UserData>) =>
      ky.post('/api/update-profil', { json: updatedData }).json(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user", displayName] });
      toast({
        title: "Profil mis à jour",
        description: "Vos informations ont été mises à jour avec succès.",
      });
    },

    
    onError: (error) => {
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de la mise à jour du profil.",
        variant: "destructive",
      });
    },
  });

  
  const onSubmit = (data: Partial<UserData>) => {
    updateUserMutation.mutate(data);
  };

  if (isAuthorized === null || isLoading) return <SkeletonForm />;
  if (isAuthorized === false) return redirect("/");
  if (error) return <p>Erreur : {(error as Error).message}</p>;
  if (!user) return <p>Utilisateur introuvable.</p>;
  
    return (
      <main className="max-w-3xl mx-auto p-4">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Informations personnelles</CardTitle>
            <CardDescription>Mettez à jour vos informations de profil</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-col items-center space-y-2">
              <Avatar className="w-24 h-24">
                <AvatarImage src={user.avatarUrl || "https://github.com/shadcn.png"} />
                <AvatarFallback>{user.displayName?.charAt(0) || 'U'}</AvatarFallback>
              </Avatar>
              <Button variant="outline" size="sm">
                <Camera className="h-4 w-4 mr-2" />
                Changer la photo
              </Button>
            </div>
            <div className="space-y-2">
              <Label htmlFor="displayName">Pseudo</Label>
              <Input 
                id="displayName" 
                {...register("displayName")} 
                defaultValue={user.displayName || ""} 
              />
              {errors.displayName && <p className="text-red-500">{errors.displayName.message as string}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input 
                id="email" 
                type="email" 
                {...register("email")} 
                defaultValue={user.email || ""} 
              />
              {errors.email && <p className="text-red-500">{errors.email.message as string}</p>}
            </div>
          </CardContent>
        </Card>
        <CardFooter className="flex justify-end">
          <Button type="submit" disabled={updateUserMutation.isPending}>
            {updateUserMutation.isPending ? 'Sauvegarde...' : 'Sauvegarder les modifications'}
          </Button>
        </CardFooter>
      </form>
    </main>
    );
  
}