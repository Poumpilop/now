"use client"

import Post from "@/components/posts/editor/Post";
import { ScrollArea } from "@/components/ui/scroll-area";
import kyInstance from "@/lib/ky";
import { PostData } from "@/lib/types"
import { useQuery } from "@tanstack/react-query"
import { Loader2 } from "lucide-react";


interface ForYouFeedProps {
    displayName?: string; // On utilise maintenant le username pour identifier l'utilisateur
  }

export default function ForYouFeed({ displayName }: ForYouFeedProps) {

    const query = useQuery<PostData[]>({
        queryKey: ["post-feed", displayName || "for-you"],
        queryFn: () => {
            const endpoint = displayName 
                ? `api/posts/user/${displayName}` 
                : "api/posts/for-you";
            
            return kyInstance.get(endpoint, {
                credentials: "include",
            }).json<PostData[]>();
        },
    });
    
    if(query.status === "pending") {
        return <Loader2 className="mx-auto animate-spin" />
    }

    if(query.status === "error") {
        return <p className="text-center text-destructive">
            Une erreur s&apos;est produite lors du chargement des posts.
        </p>
    }

    if(!query.data?.length) {
        const message = "Cette utilisateur n'a pas encore posté"

        return (
            <div className="text-center p-8 text-muted-foreground">
                <p className="text-lg">
                    {message}
                </p>
            </div>
        );
    }

    return ( 
        
        
        <ScrollArea className="h-[calc(100vh-300px)]">
        {query.data.map(post => (
            <Post key={post.id} post={post} />
        ))}
    </ScrollArea> );
}