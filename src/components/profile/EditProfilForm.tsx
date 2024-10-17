import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { updateUserProfileSchema, UpdateUserProfileValues } from "@/lib/validation";
import { UserData } from "@/lib/types";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

interface EditProfileFormProps {
  user: UserData;
}

export default function EditProfileForm({ user }: EditProfileFormProps) {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<UpdateUserProfileValues>({
    resolver: zodResolver(updateUserProfileSchema),
    defaultValues: {
      displayName: user.displayName || ""
    },
  });

  // Soumission du formulaire
  async function onSubmit(values: UpdateUserProfileValues) {
    try {
      const res = await fetch("/api/update-profile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      if (!res.ok) throw new Error("Échec de la mise à jour");
      alert("Profil mis à jour avec succès !");
    } catch (error) {
      alert("Erreur lors de la mise à jour du profil");
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-3xl mx-auto p-4">
      <Card>
        <CardHeader>
          <h2>Modifier votre profil</h2>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="displayName">Nom complet</Label>
            <Input id="displayName" {...register("displayName")} placeholder="Votre nom complet" />
            {errors.displayName && <p className="text-red-500">{errors.displayName.message}</p>}
          </div>
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button type="submit" disabled={isSubmitting}>Sauvegarder</Button>
        </CardFooter>
      </Card>
    </form>
  );
}
