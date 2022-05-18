import type { ActionFunction, LoaderFunction } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { Link, useCatch, useLoaderData } from "@remix-run/react";
import invariant from "tiny-invariant";
import SyntaxHighlighter from "react-syntax-highlighter";
import { docco } from "react-syntax-highlighter/dist/cjs/styles/hljs/docco";
import { decode } from "html-entities";

import type { Post } from "~/models/post.server";
import { deletePost } from "~/models/post.server";
import { getPost } from "~/models/post.server";

import TestPicture from "~/modules/blog/media/test.png";
import Logo from "~/../public/logo.svg";

type LoaderData = {
  post: Post;
};

function parseHTML(tag, value) {
  switch (tag) {
    case "p":
      return <p>{value}</p>;
    case "h1":
      return <h1>{value}</h1>;
    case "h2":
      return <h2>{value}</h2>;
    case "h3":
      return <h3>{value}</h3>;
    case "img":
      return <img src={value} alt={value} />;
    case "div":
      return <div>{value}</div>;
    case "code":
      return (
        <SyntaxHighlighter language="javascript" style={docco}>
          {decode(value)}
        </SyntaxHighlighter>
      );
    default:
      throw new Error(`We don't know this tag: ${tag}`);
  }
}

export const loader: LoaderFunction = async ({ request, params }) => {
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
    <div className="bg-white">
      <section className="mx-auto max-w-[57%]">
        <header className="relative h-16 w-full">
          <div className="fixed z-40 flex h-20 w-full justify-between bg-white">
            <nav className="m-auto w-full items-center justify-between px-5 md:flex ">
              <Link to="/">
                <img src={Logo} alt={"Logotype"} width="40" height="40" />
              </Link>
            </nav>
          </div>
        </header>
        <main className="w-full">
          <article className="px-5 pt-12 pb-28">
            <h1 className="text-3xl font-bold capitalize text-black">
              {post.title}
            </h1>
            {post.tags.map((tag) => (
              <small
                key={tag}
                className="pointer mt-3 mr-3 inline-block rounded-sm bg-yellow px-1.5 text-sm text-black"
              >
                {tag}
              </small>
            ))}
            <img src={TestPicture} alt="Test" className="my-10" />
            {post.content.map((contentItem) => (
              <div key={contentItem.id} className="my-4 text-base	leading-7	">
                {parseHTML(contentItem.tag, contentItem.value)}
              </div>
            ))}
            {/* <p className="py-6">{post.content}</p> */}
            {/* <SyntaxHighlighter language="javascript" style={docco}>
              {`(num) => num + 1`}
            </SyntaxHighlighter> */}
          </article>
        </main>
      </section>
    </div>
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
