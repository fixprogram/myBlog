import Post from "~/components/post";
import Menu from "~/components/menu";

import { formatDateTime, useOptionalUser } from "~/utils";

import { getPostListItems } from "~/models/post.server";
import { json } from "@remix-run/server-runtime";
import type { LoaderFunction } from "@remix-run/server-runtime";
import { Link, useLoaderData } from "@remix-run/react";
import AuthorPhoto from "../../public/author_photo.jpg";

const SOCIAL = [
  {
    abbr: "GitHub",
    name: "GH",
    link: "",
  },
  {
    abbr: "Twitter",
    name: "TW",
    link: "",
  },
  {
    abbr: "Instagram",
    name: "IG",
    link: "",
  },
  {
    abbr: "LinkedIn",
    name: "LI",
    link: "",
  },
  {
    abbr: "Dev.to",
    name: "DV",
    link: "",
  },
  {
    abbr: "YouTube",
    name: "YT",
    link: "",
  },
];

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
          <ul className="mt-6 flex">
            {SOCIAL.map((social_item) => (
              <li key={social_item.name}>
                <abbr title="" className="pr-5 no-underline">
                  <Link
                    to={social_item.link}
                    className="font-text text-2xl	font-semibold text-black"
                  >
                    {social_item.name}
                  </Link>
                </abbr>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <img
            src={AuthorPhoto}
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
