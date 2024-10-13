import { Prisma } from "@prisma/client";

export function getUserDataSelect(loggedInUserId: string) {
  return {
    id: true,
    username: true,
    displayName: true,
    avatarUrl: true,
    bio: true,
    createdAt: true,
    _count: {
      select: {
        posts: true,
      },
    },
  } satisfies Prisma.UserSelect;
}

export const postDataInclude = {
        user: {
          select: {
            username: true,
            displayName: true,
            avatarUrl: true,
          },
        },
} satisfies Prisma.PostInclude;

export type PostData = Prisma.PostGetPayload<{
    include: typeof postDataInclude
}>;