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

export function getPostDataInclude(loggedInUserId: string) {
  return {
    user: {
      select: getUserDataSelect(loggedInUserId),
      },
      likes: {
        where: {
            userId: loggedInUserId,
        },
        select: {
            userId: true
        }
    },
    _count: {
        select: {
            likes: true
        },
    },
  } satisfies Prisma.PostInclude;
}

export type PostData = Prisma.PostGetPayload<{
    include: ReturnType<typeof getPostDataInclude>;
}>;

export interface LikeInfo {
  likes: number;
  isLikedByUser: boolean
}