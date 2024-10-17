import { validateRequest } from "@/auth";
import prisma from "@/lib/prisma";
import { getUserDataSelect } from "@/lib/types";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const { user } = await validateRequest();
    if (!user) {
      return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
    }

    const userData = await prisma.user.findUnique({
      where: { displayName: user.displayName},
      select: getUserDataSelect(user.displayName),
    });

    if (!userData) {
      return NextResponse.json({ error: "Utilisateur introuvable" }, { status: 404 });
    }

    return NextResponse.json(userData);
  } catch (error) {
    console.error("Erreur lors de la récupération de l'utilisateur:", error);
    return NextResponse.json({ error: "Erreur interne" }, { status: 500 });
  }
}
