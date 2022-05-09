import type { ActionFunction } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { Form, Link, useActionData } from "@remix-run/react";
import * as React from "react";
import Logo from "~/../public/logo.svg";
import ContentBlock from "~/components/content-block";

import { createArticle } from "~/models/article.server";

type ActionData = {
  errors?: {
    title?: string;
    body?: string;
  };
};

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const title = formData.get("title");
  const body = formData.get("body");

  if (typeof title !== "string" || title.length === 0) {
    return json<ActionData>(
      { errors: { title: "Title is required" } },
      { status: 400 }
    );
  }

  if (typeof body !== "string" || body.length === 0) {
    return json<ActionData>(
      { errors: { body: "Body is required" } },
      { status: 400 }
    );
  }

  const article = await createArticle({ title, body });

  return redirect(`/${article.id}`);
};

export default function NewArticlePage() {
  const actionData = useActionData() as ActionData;
  const titleRef = React.useRef<HTMLInputElement>(null);
  const bodyRef = React.useRef<HTMLTextAreaElement>(null);
  // const [{ onText, content, previous }, dispatch] = React.useReducer(reducer, {
  //   ...initialState,
  // });
  const [content, setContent] = React.useState([{ value: "" }]);
  const [previous, setPrevious] = React.useState(false);
  const itemsRef = React.useRef<Array<HTMLDivElement | null>>([]);

  React.useEffect(() => {
    itemsRef.current = itemsRef.current.slice(0, content?.length);
    if (previous) {
      setFocusOnLastContent();
    }
  }, [content, previous]);

  function setFocusOnLastContent() {
    itemsRef.current[content?.length - 1]?.focus();
  }

  function setFocusOnNextContent(idx: number) {
    itemsRef.current[idx + 1]?.focus();
  }

  function setFocusOnPreviousContent(idx: number) {
    if (itemsRef.current[idx - 1]) {
      itemsRef.current[idx - 1]?.focus();
    }
  }

  React.useEffect(() => {
    if (actionData?.errors?.title) {
      titleRef.current?.focus();
    } else if (actionData?.errors?.body) {
      bodyRef.current?.focus();
    }
  }, [actionData]);

  return (
    <Form
      method="post"
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 8,
        width: "100%",
      }}
    >
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
      <section className="mx-auto mt-5 w-full max-w-3xl px-5">
        {content?.map(({ value }: any, idx: number) => {
          return (
            <ContentBlock
              value={value}
              key={idx + value}
              onRemove={() => {
                setContent((prevContent) => {
                  const newContent = prevContent;
                  newContent.splice(idx, 1);
                  return { ...newContent };
                });
              }}
              onAdd={() => {
                setContent((prevContent) => [
                  ...prevContent,
                  { value: itemsRef.current[idx]?.value },
                ]);
                setFocusOnNextContent(idx);
              }}
              refName={(el: any) => (itemsRef.current[idx] = el)}
              setFocusOnPreviousContent={() => setFocusOnPreviousContent(idx)}
            />
          );
        })}
      </section>
    </Form>
  );
}
