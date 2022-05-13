import { Link } from "@remix-run/react";

export default function Post({
  to = "",
  title = "",
  description = "",
  image = "",
  createdAt = "",
  tags = [""],
}) {
  return (
    <div className="mt-12 w-full max-w-lg">
      <Link to={to} className="flex justify-between">
        <div>
          <h2 className="color-black font-title text-3xl">{title}</h2>
          <p>{description}</p>
        </div>
        <div>
          <time className="text-lg	">{createdAt}</time>
          <p>{tags}</p>
        </div>
      </Link>
    </div>
  );
}
