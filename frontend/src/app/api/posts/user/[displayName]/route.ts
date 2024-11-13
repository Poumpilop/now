import prisma from "@/lib/prisma"; // Ton instance Prisma
import { getPostDataInclude } from "@/lib/types";

export async function GET(req: Request, { params }: { params: { displayName: string } }) {
    try {

        const { displayName } = await params;  // On attend l'objet params

        if (!displayName) {
            return Response.json({error: "Nom d'utilisateur requis"}, { status: 400 });
        }

        const user = await prisma.user.findUnique({
        where: { displayName: displayName },
        });

        if (!user) {
            return Response.json({error: "Utilisateur non trouvé"}, { status: 404 });
        }

        const posts = await prisma.post.findMany({
            where: {
                userId: user.id  // Ajouter cette ligne
            },
            include: getPostDataInclude(user.id),
            orderBy: {createdAt: "desc"}
        });

        return Response.json(posts);
    } catch (error) {
        console.error(error);
        return Response.json({error: "Erreur interne du serveur"}, { status: 500})
    }
}
