import type { ActionFunction, LoaderFunction } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { Form, useCatch, useLoaderData } from "@remix-run/react";
import invariant from "tiny-invariant";

import type { Article } from "~/models/article.server";
import { deleteArticle } from "~/models/article.server";
import { getArticle } from "~/models/article.server";
import { requireUserId } from "~/session.server";

type LoaderData = {
  article: Article;
};

export const loader: LoaderFunction = async ({ request, params }) => {
  //   const userId = await requireUserId(request);
  invariant(params.article, "article not found");

  const article = await getArticle({ id: params.article });
  if (!article) {
    throw new Response("Not Found", { status: 404 });
  }
  return json<LoaderData>({ article });
};

export const action: ActionFunction = async ({ request, params }) => {
  //   const userId = await requireUserId(request);
  invariant(params.article, "article not found");

  await deleteArticle({ id: params.article });

  return redirect("/");
};

export default function NoteDetailsPage() {
  const data = useLoaderData() as LoaderData;

  return (
    <section style={{ paddingTop: 56, paddingLeft: 79 }}>
      <article className="mx-20">
        <h1 className="text-3xl font-bold">{data.article.title}</h1>
        <p className="py-6">{data.article.body}</p>
      </article>
    </section>
  );
}

export function ErrorBoundary({ error }: { error: Error }) {
  console.error(error);

  return <div>An unexpected error occurred: {error.message}</div>;
}

export function CatchBoundary() {
  const caught = useCatch();

  if (caught.status === 404) {
    return <div>Note not found</div>;
  }

  throw new Error(`Unexpected caught response with status: ${caught.status}`);
}
