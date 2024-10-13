import { PostData } from "@/lib/types"
import { formatRelativeData } from "@/lib/utils"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Heart, MapPin, MessageCircle, Share } from "lucide-react"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"

interface PostProps {
    post: PostData
}

export default function Post({ post }: PostProps) {
    return (
        <>
        <Card key={post.id} className=" max-w-full border-none shadow-none">
        <CardContent className="p-4">
        <div className="flex items-start space-x-4">
        <Avatar className="w-10 h-10">
            <AvatarImage src={`https://api.dicebear.com/6.x/initials/svg?seed=${post.user}`} />
            <AvatarFallback>{/*post*/}</AvatarFallback>
        </Avatar>
        <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold truncate">{post.user.displayName}</h3>
            <p className="text-xs text-muted-foreground whitespace-nowrap">
                <MapPin className="inline h-3 w-3 mr-1" />
                5 km · {formatRelativeData(post.createdAt)}
            </p>
            </div>
            <p className="mt-1 text-sm break-words">{post.content}</p>
            <div className="mt-3 flex items-center space-x-4">
            <Button variant="ghost" size="sm" className="text-muted-foreground px-0">
                <MessageCircle className="h-4 w-4 mr-1" />
                <span className="text-xs">1</span>
            </Button>
            <Button variant="ghost" size="sm" className="text-muted-foreground px-0">
                <Heart className="h-4 w-4 mr-1" />
                <span className="text-xs">5</span>
            </Button>
            <Button variant="ghost" size="sm" className="text-muted-foreground px-0">
                <Share className="h-4 w-4" />
            </Button>
            </div>
        </div>
        </div>
        </CardContent>
        </Card>
        <Separator />
        </>
    );
}