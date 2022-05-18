import { Content } from "@prisma/client";
import {
  ActionFunction,
  unstable_createFileUploadHandler,
  unstable_parseMultipartFormData,
} from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { Form, Link, useActionData } from "@remix-run/react";
import { nanoid } from "nanoid";
import Logo from "~/../public/logo.svg";
import { encode } from "html-entities";

import { createPost } from "~/models/post.server";
import { Editor } from "~/modules/editor";

type ActionData = {
  errors?: {
    title?: string;
    body?: string;
  };
};

export const fileUploadHandler = unstable_createFileUploadHandler({
  directory: "../modules/blog/media",
  file: ({ filename }) => filename,
});

export const action: ActionFunction = async ({ request }) => {
  const formData = await unstable_parseMultipartFormData(
    request,
    fileUploadHandler
  );
  // const formData = await request.formData();
  const title = formData.get("title");
  const fields = Object.entries(formData._fields);
  const body = [] as Content[];

  if (typeof title !== "string" || title.length === 0) {
    return json<ActionData>(
      { errors: { title: "Title is required" } },
      { status: 400 }
    );
  }

  fields.forEach((field) => {
    if (field[0] === "title") {
      return;
    }
    if (field[1][0].type) {
      return;
    }
    if (field[1].length > 1) {
      field[1].forEach((item) =>
        body.push({ tag: field[0], value: item, id: nanoid() })
      );
      // } else if (field[1][0].type) {
      //   return
      // body.push({ tag: "img", value: field[1][0].filepath, id: nanoid() });
      // } else if (field[0] === "code") {
      //   body.push({ tag: "code", value: encode(field[1][0]), id: nanoid() });
    } else {
      body.push({ tag: field[0], value: field[1][0], id: nanoid() });
    }
  });

  const post = await createPost({
    title,
    content: body,
    tags: ["Java Script"],
  });

  return redirect(`/blog/${post.id}`);
};

export default function NewPostPage() {
  const actionData = useActionData() as ActionData;

  return (
    <Form method="post" encType="multipart/form-data">
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
        className="mx-auto mt-5 mb-1 block w-full max-w-3xl px-5 text-3xl font-semibold capitalize text-black	"
        required
      />
      <Editor data={{ title: "", content: [] }} />
    </Form>
  );
}
