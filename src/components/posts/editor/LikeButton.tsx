import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import kyInstance from "@/lib/ky";
import { LikeInfo } from "@/lib/types";
import { QueryKey, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Heart, MessageCircle } from "lucide-react";

interface LikeButtonsProps {
    postId: string,
    initialState: LikeInfo
}

export default function LikeButton({ postId, initialState }: LikeButtonsProps) {
    const { toast } = useToast();

    const queryClient = useQueryClient();

    const queryKey: QueryKey = ["like-info", postId]

    const {data} = useQuery({
        queryKey,
        queryFn: () => kyInstance.get(`api/posts/${postId}`).json<LikeInfo>(),
        initialData: initialState,
        staleTime: Infinity,
    });

    const {mutate} = useMutation({
        mutationFn: () =>
            data.isLikedByUser
        ? kyInstance.delete(`api/posts/${postId}/likes`)
        : kyInstance.post(`api/posts/${postId}/likes`),
        onMutate: async () => {
            await queryClient.cancelQueries({ queryKey });
            
            const previousState = queryClient.getQueryData<LikeInfo>(queryKey);

            queryClient.setQueryData<LikeInfo>(queryKey, () => ({
                likes:
                (previousState?.likes || 0) +
                (previousState?.isLikedByUser ? -1 : 1),
                isLikedByUser: !previousState?.isLikedByUser,
            }));

            return { previousState };
        },
        onError(error, variables, context) {
            queryClient.setQueryData(queryKey, context?.previousState);
            console.error(error);
            toast({
                variant: "destructive",
                description: "Quelque choses s'est mal passé. Veuillez réessayer."
            })
        },
    });

    return <>
        <Button
                variant="link"
                size="sm"
                className="text-muted-foreground p-0 h-auto hover:no-underline hover:bg-transparent"
                onClick={() => mutate()}
                >
                <Heart 
                    className={`h-4 w-4 mr-1 transition-colors duration-200 ${
                    data.isLikedByUser ? 'text-red-500 fill-red-500' : 'text-muted-foreground'
                    }`} 
                />
                <span className="text-xs text-muted-foreground">{data.likes}</span>
                </Button>
    </>
}