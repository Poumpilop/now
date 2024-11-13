"use client"

import {EditorContent, useEditor} from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import PlaceHolder from "@tiptap/extension-placeholder";
import { submitPost } from "./actions";
import { Button } from "@/components/ui/button";
import "./styles.css"
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { MapPin } from "lucide-react";
import { useState, useEffect } from "react"; // Ajout de useEffect

export default function PostEditor() {
    const [mounted, setMounted] = useState(false); // Nouvel état
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
            }),
        ],
        editorProps: {
            attributes: {
                class: 'w-full max-h-[20rem] overflow-y-auto bg-background rounded-md px-5 py-3'
            }
        },
        enableInputRules: false,
        enablePasteRules: false,
        immediatelyRender: false
    });

    // Ajout d'un useEffect pour gérer le montage
    useEffect(() => {
        setMounted(true);
    }, []);

    const input = editor?.getText({
        blockSeparator: "\n",
    }) || "";

    async function onSubmit() {
        await submitPost(input)
        editor?.commands.clearContent();
    }

    if (!mounted) {
        return null; // Ne rien rendre jusqu'au montage côté client
    }

    return (
        <>
            <Card>
                <CardContent className="pt-6">
                    <EditorContent editor={editor} />
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
}