import prisma from "@/lib/prisma"
import { getUserDataSelect } from "@/lib/types"
import { notFound } from "next/navigation"
import { cache } from "react"

interface PageProps {
    params: { username: string }
}

const getUser = cache(async (username: string, loggedInUserId: string) => {
    const user = await prisma.user.findFirst({
        where: {
            username: {
                equals: username,
                mode: "insensitive"
            }
        },
    select: getUserDataSelect(loggedInUserId)
    });

    if(!user) notFound();

    return user;
})

export async function generateMedatada() {

}

export default function Page({params: {username}}: PageProps) {
    
}