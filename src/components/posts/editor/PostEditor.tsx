"use client"

import {EditorContent, useEditor} from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import PlaceHolder from "@tiptap/extension-placeholder";
import { submitPost } from "./actions";
import UserAvatar from "@/components/UserAvatar";
import { useSession } from "@/app/(main)/SessionProvider";
import { Button } from "@/components/ui/button";
import "./styles.css"
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { MapPin } from "lucide-react";
import { useState } from "react";

export default function PostEditor() {

    const {user} = useSession();

    const [postRadius, setPostRadius] = useState(5)
    const [activeFilter, setActiveFilter] = useState("recent")

    const editor = useEditor({
        extensions: [
            StarterKit.configure({
                bold: false,
                italic: false
            }),
            PlaceHolder.configure({
                placeholder: "Quoi de beau aujourd'hui?"
            })
        ]
    })

    const input = editor?.getText({
        blockSeparator: "\n",
    }) || "";

    async function onSubmit() {
        await submitPost(input)
        editor?.commands.clearContent();
    }

    return (
        <>
            <Card>
              <CardContent className="pt-6">
              <EditorContent
                editor={editor}
                className="w-full max-h-[20rem] overflow-y-auto bg-background rounded-md px-5 py-3" />
              </CardContent>
              <CardFooter className="flex justify-between items-center">
                <div className="flex items-center space-x-2">
                  <MapPin className="h-5 w-5 text-primary" />
                  <span className="text-sm">Visible dans un rayon de {postRadius} km</span>
                </div>
                <Button onClick={onSubmit} disabled={!input.trim()}>Publier</Button>
              </CardFooter>
            </Card>

            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Fil d&apos;actualité local</h2>
              <div className="flex space-x-2">
                <Button
                  variant={activeFilter === "recent" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setActiveFilter("recent")}
                >
                  Récents
                </Button>
                <Button
                  variant={activeFilter === "popular" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setActiveFilter("popular")}
                >
                  Populaires
                </Button>
              </div>
            </div>
        </>
    );

    /*return <div className="flex flex-col gap-5 rounded-2xl bg-card p-5 shadow-sm">
        <div className="flex gap-5">
            <UserAvatar avatarUrl={user.avatarUrl} className="hidden sm:inline" />
            <EditorContent
            editor={editor}
            className="w-full max-h-[20rem] overflow-y-auto bg-background rounded-2xl px-5 py-3" />
        </div>
        <div className="flex justify-end">
            <Button
            onClick={onSubmit}
            disabled={!input.trim()}
            className="min-w-20">
                Envoyer
            </Button>
        </div>
    </div>*/
}