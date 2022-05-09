import { Link } from "@remix-run/react";

export default function Article({ to = "", title = "", description = "" }) {
  return (
    <div className="mb-12 flex justify-between">
      <div>
        <Link to={to}>
          <h2
            style={{ fontSize: 22, lineHeight: "28px" }}
            className="color-black"
          >
            {title}
          </h2>
          <p>{description}</p>
        </Link>
      </div>
      <Link to={to}>
        <img src="" alt="article" />
      </Link>
    </div>
  );
}
