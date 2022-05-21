import { Link } from "@remix-run/react";

export default function BlogPost({
  to = "",
  title = "",
  description = "",
  image = "",
  createdAt = "",
  tags = [""],
}) {
  return (
    <Link to={to} className="flex justify-between">
      <div className="max-w-[75%]">
        <h2 className="color-black font-title text-3xl">{title}</h2>
        <p>{description}</p>
      </div>
      <div className="flex flex-col">
        <time className="font-text text-lg	font-light tracking-wide">
          {createdAt}
        </time>
        <p className="mt-auto rounded-sm bg-yellow px-1.5 py-3 text-center font-text text-sm text-black">
          {tags}
        </p>
      </div>
    </Link>
  );
}
