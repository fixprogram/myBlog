import Post from "~/components/post";
import Menu from "~/components/menu";

import { formatDateTime, useOptionalUser } from "~/utils";

import { getPostListItems } from "~/models/post.server";
import { json } from "@remix-run/server-runtime";
import type { LoaderFunction } from "@remix-run/server-runtime";
import { useLoaderData } from "@remix-run/react";
import MePhoto from "../../public/me_photo.jpg";

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
    <main className="bg-whip px-14 pt-7">
      <Menu user={user} />
      <section className="mt-20 flex justify-between px-20">
        <div className="max-w-lr py-20">
          <h1
            className="font-title text-6xl text-black"
            style={{ margin: "0.67em 0" }}
          >
            Hey I'm Dan Davydov
          </h1>
          <p className="font-text text-2xl">
            I’m a web developer and content creator based in Finland.
          </p>
          <ul className="flex"></ul>
        </div>
        <div>
          <img
            src={MePhoto}
            alt="Dan Davydov"
            className="w-auto max-w-sm rounded-full"
          />
        </div>
      </section>

      <section className="mt-20 px-20">
        <h2 className="font-title text-4xl">Latest Posts</h2>
        <div className="flex flex-wrap justify-between">
          {posts.map(({ id, title, content, createdAt, tags }) => (
            <Post
              key={id}
              to={id}
              title={title}
              description={content}
              createdAt={formatDateTime(new Date(createdAt))}
              tags={tags}
            />
          ))}
        </div>
      </section>
    </main>
  );
}
