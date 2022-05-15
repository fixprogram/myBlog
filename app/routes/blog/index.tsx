// import Post from "~/components/post";
import Menu from "~/components/menu";

import { useOptionalUser } from "~/utils";

import { getPostListItems } from "~/models/post.server";
import { json } from "@remix-run/server-runtime";
import type { LoaderFunction } from "@remix-run/server-runtime";
import { useLoaderData } from "@remix-run/react";
import Blog from "~/modules/blog";

type LoaderData = {
  posts: Awaited<ReturnType<typeof getPostListItems>>;
};

export const loader: LoaderFunction = async ({ request }) => {
  const posts = await getPostListItems();
  return json<LoaderData>({ posts });
};

export default function Index() {
  const { posts } = useLoaderData() as LoaderData;
  const user = useOptionalUser();

  return (
    <main className="bg-whip px-14 pt-7 min-h-screen">
      <Menu user={user} />
        <section className="mt-20 px-20">
          <Blog posts={posts} />
        </section>
    </main>
  );
}
