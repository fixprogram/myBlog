import Post from "~/components/post";
import Menu from "~/components/menu";

import { formatDateTime, useOptionalUser } from "~/utils";

import { getPostListItems } from "~/models/post.server";
import { json } from "@remix-run/server-runtime";
import type { LoaderFunction } from "@remix-run/server-runtime";
import { Link, useLoaderData } from "@remix-run/react";
import AuthorPhoto from "../../public/author_photo.jpg";
import myDuo from "../../public/myDuo.png";

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

const PROJECTS = [
  {
    title: "myDuo",
    link: "https://my-duo.vercel.app/",
    img: myDuo,
    description: `Literally it's a clone of Duolingo.com, but with a little change: you can create your own exercises and practice them.`,
    technologies: ["React", "Prisma", "MongoDB", "TS", "Vercel"],
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
    <main className="min-h-screen bg-whip px-14 pt-7">
      <Menu user={user} />
      <section className="mt-20 flex justify-between px-20">
        <div className="max-w-lr py-20">
          <h1
            className="font-title text-6xl text-black"
            style={{ margin: "0.67em 0" }}
          >
            Hey I'm Denis Davydov
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
            alt="Den Davydov"
            className="w-auto max-w-sm rounded-full"
          />
        </div>
      </section>

      <section className="my-20 p-20">
        <div className="flex justify-between">
          <h2 className="font-title text-4xl">Latest Posts</h2>
          <Link to="/blog" className="text-2xl">
            See all
          </Link>
        </div>
        <div className="flex flex-wrap justify-between">
          {posts.map(({ id, title, content, createdAt, tags }) => (
            <div className="mt-12 w-full max-w-lg" key={id}>
              <Post
                to={`blog/${id}`}
                title={title}
                description={content[0]?.value}
                createdAt={formatDateTime(new Date(createdAt))}
                tags={tags}
              />
            </div>
          ))}
        </div>
      </section>

      <section className="my-20 p-20">
        <h2 className="mb-10 font-title text-4xl">Latest Projects</h2>
        {PROJECTS.map((project) => (
          <div key={project.title} className="flex">
            <a
              href={project.link}
              className="w-3/6"
              target="_blank"
              rel="noreferrer"
            >
              <img src={project.img} alt={project.title} />
            </a>
            <div className="pl-5">
              <a
                href={project.link}
                className="font-title text-3xl"
                target="_blank"
                rel="noreferrer"
              >
                {project.title}
              </a>
              <p className="my-3 font-text text-xl">{project.description}</p>
              <p>Technologies used: </p>
              <ul className="mt-3 flex flex-wrap">
                {project.technologies.map((tech) => (
                  <li key={tech} className="pr-3">
                    {tech}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </section>

      <section className="my-20 flex flex-col justify-center p-20">
        <h2 className="mb-10 text-center font-title text-4xl">Get In Touch</h2>
        <p className="mb-8 text-center">
          Currently I'm looking for a job as Frontend or Fullstack web
          developer.
        </p>
        <a
          href="mailto:qepttt@gmail.com"
          className="mx-auto bg-red p-5 font-semibold text-white"
        >
          Say Hello
        </a>
      </section>
    </main>
  );
}
