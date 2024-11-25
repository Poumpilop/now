import { validateRequest } from "@/auth";
import prisma from "@/lib/prisma";
import { getPostDataInclude } from "@/lib/types";

export async function GET() {
    try {
        const {user} = await validateRequest();

        if(!user) {
            return Response.json({error: " Non autorisé"}, { status: 401});
        }

        const posts = await prisma.post.findMany({
            include: getPostDataInclude(user.id),
            orderBy: {createdAt: "desc"}
        });

        return Response.json(posts);
    } catch (error) {
        console.error(error);
        return Response.json({error: "Erreur interne du serveur"}, { status: 500})
    }
}