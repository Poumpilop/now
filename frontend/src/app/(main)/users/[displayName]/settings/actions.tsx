// ClientPage.tsx (composant client)
'use client'

import { UserData } from "@/lib/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
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
import kyInstance from "@/lib/ky";

interface ClientPageProps {
  user: UserData;
}

export default function ClientPage({ user }: ClientPageProps) {
  const queryClient = useQueryClient();
  const { toast } = useToast()
  
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(updateUserProfileSchema),
  });

  const updateUserMutation = useMutation({
    mutationFn: (updatedData: Partial<UserData>) =>
      kyInstance.post('api/update-profil', { json: updatedData }).json(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user", user.displayName] });
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
                <AvatarImage src={"https://github.com/shadcn.png"} />
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
            <div className="space-y-2">
              <Label htmlFor="bio">Biographie</Label>
              <Input 
                id="bio" 
                {...register("bio")} 
                defaultValue={user.bio || ""} 
              />
              {errors.bio && <p className="text-red-500">{errors.bio.message as string}</p>}
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