import Article from "~/components/article";
import Menu from "~/components/menu";

import { useOptionalUser } from "~/utils";

import { getArticleListItems } from "~/models/article.server";
import { LoaderFunction, json } from "@remix-run/server-runtime";
import { requireUserId } from "~/session.server";
import { useLoaderData } from "@remix-run/react";
import { useEffect } from "react";

type LoaderData = {
  articles: Awaited<ReturnType<typeof getArticleListItems>>;
};

export const loader: LoaderFunction = async ({ request }) => {
  const articles = await getArticleListItems();
  return json<LoaderData>({ articles });
};

export default function Index() {
  const { articles } = useLoaderData() as LoaderData;
  const user = useOptionalUser();

  useEffect(() => {
    console.log(articles);
  }, []);

  return (
    <main>
      <Menu user={user} />
      <section className="border-b border-black bg-orange">
        <section className="mx-14 flex justify-between px-20">
          <div className="max-w-md py-20">
            <h2
              style={{ fontSize: 96, lineHeight: "90px" }}
              className="text-black"
            >
              Never stop studying
            </h2>
          </div>
          <div>Animation</div>
        </section>
      </section>

      <section
        style={{ paddingTop: 56 }}
        className="mx-14 flex justify-between px-20"
      >
        <div>
          {articles.map((article) => (
            <Article
              key={article.id}
              to={article.id}
              title={article.title}
              // description={article.body}
            />
          ))}
          {/* <Article
            to="/article"
            title="What Does the Perfect Work Day Look Like?"
            description="My 20-year experiment with work/life balance is paying off"
          /> */}
        </div>

        <div>
          <b>DISCOVER MORE OF WHAT MATTERS TO YOU</b>
          <ul>
            <li></li>
          </ul>
        </div>
      </section>
    </main>
  );
}
