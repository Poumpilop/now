import { validateRequest } from "@/auth";
import prisma from "@/lib/prisma";
import { LikeInfo } from "@/lib/types";

export async function GET(req: Request, { params: { postId } }: { params: { postId: string } }, ) {
    try {
        const { user: logggedInUser } = await validateRequest();
        
        if(!logggedInUser) {
            return Response.json({error: "Non autorisé"}, { status: 500 });
        }

        const post = await prisma.post.findUnique({
            where: {id: postId},
            select: {
                likes: {
                    where: {
                        userId: logggedInUser.id
                    },
                    select: {
                        userId: true
                    }
                },
                _count: {
                    select: {
                        likes: true
                    }
                }
            }
        })

        if(!post) {
            return Response.json({error: "Poste non trouvé"}, { status: 404 });
        }

        const data: LikeInfo = {
            likes: post._count.likes,
            isLikedByUser: !!post.likes.length
        }

        return Response.json(data);

    } catch (error) {
        console.error(error);
        return Response.json({error: "Erreur interne au serveur"}, { status: 500 });
    }
}

export async function POST(req: Request, { params: { postId } }: { params: { postId: string } }, ) {
 try 
 {
    const { user: logggedInUser } = await validateRequest();
        
        if(!logggedInUser) {
            return Response.json({error: "Non autorisé"}, { status: 500 });
        }

        await prisma.like.upsert({
            where: {
                userId_postId: {
                    userId: logggedInUser.id,
                    postId
                }
            },
            create: {
                userId: logggedInUser.id,
                postId
            },
            update: {}
        })
        
        return new Response();
 } catch (error) {
    console.error(error);
    return Response.json({error: "Erreur interne au serveur"}, { status: 500 });
}
}

export async function DELETE(req: Request, { params: { postId } }: { params: { postId: string } }, ) {

    try {
        const { user: logggedInUser } = await validateRequest();
        
        if(!logggedInUser) {
            return Response.json({error: "Non autorisé"}, { status: 500 });
        }

        await prisma.like.deleteMany({
            where:{
                userId: logggedInUser.id,
                postId,
            },
        });
    } catch (error) {
        return Response.json({error: "Erreur interne au serveur"}, { status: 500 });
    }

}