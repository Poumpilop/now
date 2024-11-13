"use server"

import { cache } from "react";
import ProfileForm from "./actions";
import prisma from "@/lib/prisma";
import { getUserDataSelect } from "@/lib/types";
import { notFound } from "next/navigation";

const getUser = cache(async (data: string) => {
  const user = await prisma.user.findFirst({
    where: {
      displayName: {
        equals: data,
        mode: "insensitive",
      },
    },
    select: getUserDataSelect(data),
  });
  if (!user) notFound();
  return user;
});

interface PageProps {
  params: { displayName: string };
}

export default async function Page({ params }: PageProps) {
  const { displayName } = await params

  const user = await getUser(displayName);

  if (!user) notFound();

  return (
    <main className="flex-grow">
        <div className="max-w-7xl mx-auto px-4 py-8 flex flex-col md:flex-row gap-8">
        <section className="flex-grow space-y-6 max-w-4xl">
            <ProfileForm user={user} />
        </section>
      </div>
    </main>
  );
}
