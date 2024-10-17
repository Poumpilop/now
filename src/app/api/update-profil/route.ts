import { validateRequest } from "@/auth";
import prisma from "@/lib/prisma";
import { getUserDataSelect } from "@/lib/types";
import { updateUserProfileSchema } from "@/lib/validation";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { user } = await validateRequest();
    if (!user) {
      return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
    }

    const data = await req.json();
    const validatedData = updateUserProfileSchema.parse(data);

    const updatedUser = await prisma.user.update({
      where: { id: user.id },
      data: validatedData,
      select: getUserDataSelect(user.id),
    });

    return NextResponse.json({
      message: "Profil mis à jour avec succès",
      user: updatedUser,
    });
  } catch (error) {
    console.error("Erreur lors de la mise à jour du profil:", error);
    return NextResponse.json({ error: "Erreur interne" }, { status: 500 });
  }
}
