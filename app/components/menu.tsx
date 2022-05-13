import type { User } from "@prisma/client";
import { Link } from "@remix-run/react";
import Logo from "~/../public/logo.svg";

const MENU = [
  {
    name: "About",
    link: "/about",
    auth: false,
  },
  {
    name: "Blog",
    link: "/blog",
    auth: false,
  },
  {
    name: "Contact",
    link: "/contact",
    auth: false,
  },
  {
    name: "Add a post",
    link: "/new",
    auth: true,
  },
];

export default function Menu({ user }: { user: User | undefined }) {
  return (
    <div className="flex h-16 items-center justify-between py-6 px-20">
      <div>
        <Link to="/">
          <img src={Logo} alt={"Logotype"} width="40" height="40" />
        </Link>
      </div>
      <div className="flex items-center justify-between">
        <div>
          {MENU.map((menuItem, idx) => {
            if (menuItem.auth && !user) {
              return null;
            }
            return (
              <Link
                to={menuItem.link}
                key={menuItem.link}
                className={`mr-12 text-xl font-bold ${
                  idx === MENU.length - 1 && "mr-0"
                }`}
              >
                {menuItem.name}
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
