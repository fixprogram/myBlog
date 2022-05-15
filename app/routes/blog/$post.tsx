import type { ActionFunction, LoaderFunction } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { useCatch, useLoaderData } from "@remix-run/react";
import invariant from "tiny-invariant";

import type { Post } from "~/models/post.server";
import { deletePost } from "~/models/post.server";
import { getPost } from "~/models/post.server";

type LoaderData = {
  post: Post;
};

export const loader: LoaderFunction = async ({ request, params }) => {
  //   const userId = await requireUserId(request);
  invariant(params.post, "post not found");

  const post = await getPost({ id: params.post });
  if (!post) {
    throw new Response("Not Found", { status: 404 });
  }
  return json<LoaderData>({ post });
};

export const action: ActionFunction = async ({ request, params }) => {
  //   const userId = await requireUserId(request);
  invariant(params.post, "post not found");

  await deletePost({ id: params.post });

  return redirect("/");
};

export default function NoteDetailsPage() {
  const { post } = useLoaderData() as LoaderData;

  return (
    <section className="mx-20 p-20">
      <article className="mx-20">
        <h1 className="text-3xl font-bold">{post.title}</h1>
        <p className="py-6">{post.content}</p>
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
