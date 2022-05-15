import type { Post } from "@prisma/client";

import { prisma } from "~/db.server";

export type { Post } from "@prisma/client";

export function getPost({ id }: Pick<Post, "id">) {
  return prisma.post.findFirst({
    where: { id },
  });
}

export function getPostListItems(): Post[] {
  return prisma.post.findMany({
    select: {
      id: true,
      title: true,
      content: true,
      createdAt: true,
      tags: true,
    },
    orderBy: { updatedAt: "desc" },
  });
}

export function createPost({
  content,
  title,
  tags,
}: Pick<Post, "content" | "title" | "tags">) {
  return prisma.post.create({
    data: {
      title,
      content,
      tags,
    },
  });
}

export function deletePost({ id }: Pick<Post, "id">) {
  return prisma.post.deleteMany({
    where: { id },
  });
}
