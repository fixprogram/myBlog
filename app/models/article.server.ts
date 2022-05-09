import type { User, Article } from "@prisma/client";

import { prisma } from "~/db.server";

export type { Article } from "@prisma/client";

export function getArticle({ id }: Pick<Article, "id">) {
  return prisma.article.findFirst({
    where: { id },
  });
}

export function getArticleListItems() {
  return prisma.article.findMany({
    select: { id: true, title: true },
    orderBy: { updatedAt: "desc" },
  });
}

export function createArticle({
  body,
  title,
}: Pick<Article, "body" | "title">) {
  return prisma.article.create({
    data: {
      title,
      body,
    },
  });
}

export function deleteArticle({ id }: Pick<Article, "id">) {
  return prisma.article.deleteMany({
    where: { id },
  });
}
