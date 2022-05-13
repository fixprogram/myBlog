import type { ActionFunction } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { Form, Link, useActionData } from "@remix-run/react";
import Logo from "~/../public/logo.svg";

import { createPost } from "~/models/post.server";
import { Editor } from "~/modules/editor";

type ActionData = {
  errors?: {
    title?: string;
    body?: string;
  };
};

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const title = formData.get("title");
  const body = formData.getAll("p");

  if (typeof title !== "string" || title.length === 0) {
    return json<ActionData>(
      { errors: { title: "Title is required" } },
      { status: 400 }
    );
  }

  if (body.length === 0) {
    console.log("body: ", body);
    return json<ActionData>(
      { errors: { body: "Body is required" } },
      { status: 400 }
    );
  }

  const post = await createPost({
    title,
    content: body.join(" "),
    tags: ["Java Script"],
  });

  return redirect(`/${post.id}`);
};

export default function NewPostPage() {
  const actionData = useActionData() as ActionData;

  return (
    <Form method="post">
      <div className="mx-auto flex h-16 w-full max-w-5xl items-center justify-between p-6">
        <div>
          <Link to="/">
            <img src={Logo} alt={"Logotype"} width="40" height="40" />
          </Link>
        </div>
        <div className="flex items-center justify-between">
          <button type="submit">Publish</button>
        </div>
      </div>
      <input
        type="text"
        name="title"
        placeholder="Title"
        className="mx-auto mt-5 w-full max-w-3xl px-5"
        required
      />
      <Editor data={{ title: "", content: [] }} />
    </Form>
  );
}
