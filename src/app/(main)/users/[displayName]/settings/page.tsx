"use server"

import { cache } from 'react'
import { notFound } from 'next/navigation'
import prisma from "@/lib/prisma"
import { validateRequest } from "@/auth"
import { getUserDataSelect } from "@/lib/types"
import ClientPage from './actions'

const getUser = cache(async (displayName: string, loggedInUserId: string) => {
  const user = await prisma.user.findFirst({
    where: {
      displayName: {
        equals: displayName,
        mode: "insensitive",
      },
    },
    select: getUserDataSelect(loggedInUserId),
  });
  if (!user) notFound();
  return user;
});

interface PageProps {
  params: { displayName: string };
}

export default async function Page({ params }: PageProps) {
  const { displayName } = await params

  const { user: loggedInUser } = await validateRequest();
  if (!loggedInUser) {
    return notFound();
  }
  
  if(loggedInUser.displayName != displayName)
    return notFound();

  const user = await getUser(displayName, loggedInUser.id);

  if (!user) notFound();
  
  return <ClientPage user={user} />;
}