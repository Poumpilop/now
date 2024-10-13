"use client"

import Post from "@/components/posts/editor/Post";
import { ScrollArea } from "@/components/ui/scroll-area";
import kyInstance from "@/lib/ky";
import { PostData } from "@/lib/types"
import { useQuery } from "@tanstack/react-query"
import { Loader2 } from "lucide-react";

export default function ForYouFeed() {
    const query = useQuery<PostData[]>( {
        queryKey: ["post-feed", "for-you"],
        queryFn: kyInstance.get("/api/posts/for-you").json<PostData[]>
    });
    
    if(query.status === "pending") {
        return <Loader2 className="mx-auto animate-spin" />
    }

    if(query.status === "error") {
        return <p className="text-center text-destructive">
            Une erreur s&apos;est produite lors du chargement des posts.
        </p>
    }

    return <ScrollArea className="h-[calc(100vh-300px)]">
        {query.data.map(post => (
            <Post key={post.id} post={post} />
        ))}
    </ScrollArea>
}