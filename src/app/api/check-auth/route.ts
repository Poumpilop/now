import { NextApiRequest, NextApiResponse } from 'next';
import { validateRequest } from "@/auth";
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const displayName = searchParams.get("displayName");

  try {
    const { user } = await validateRequest();
    console.log("user" + user + "/ " + user?.displayName + " " + displayName)
    if (user && (user.displayName === displayName )) {
        return NextResponse.json({ isAuthorized: true }, { status: 200 });
    } else {
    return NextResponse.json({ isAuthorized: false }, { status: 403 });
    }
  } catch (error) {
    return NextResponse.json({ error: "Erreur lors de la vérification de l'autorisation" }, { status: 500 });
  }
}