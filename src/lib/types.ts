import { Prisma } from "@prisma/client";

export function getUserDataSelect(loggedInUserId: string) {
  return {
    id: true,
    username: true,
    displayName: true,
    avatarUrl: true,
    bio: true,
    email: true,
    createdAt: true,
    isAdmin: true,
    _count: {
      select: {
        posts: true,
      },
    },
  } satisfies Prisma.UserSelect;
}

export type UserData = Prisma.UserGetPayload<{
  select: ReturnType<typeof getUserDataSelect>;
}>;

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