import { z } from "zod";

const requiredString = z.string().trim().min(1, "Requis");

export const signUpSchema = z.object({
    email: requiredString.email("Adresse email invalide."),
    username: requiredString.regex(
        /^[a-zA-Z0-9_-]+$/,
        "Seulement lettres, nombres, - et _ autorisé."
    ),
    password: requiredString.min(8, "Minimum 8 caractères") 
});

export type SignUpValues = z.infer<typeof signUpSchema>

export const loginSchema = z.object({
    username: requiredString,
    password: requiredString,
})

export type LoginValues = z.infer<typeof loginSchema>;

export const createPostSchema = z.object({
    content: requiredString,
})

export const updateUserProfileSchema = z.object({
    displayName: z.string().min(2, "Le nom doit contenir au moins 2 caractères"),
    email: z.string().email("Adresse email invalide"),
  });

export type UpdateUserProfileValues = z.infer<typeof updateUserProfileSchema>;