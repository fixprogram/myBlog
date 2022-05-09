import type { User } from "@prisma/client";
import { Link } from "@remix-run/react";
import Logo from "~/../public/logo.svg";

export default function Menu({ user }: { user: User | undefined }) {
  return (
    <section className="border-b border-black bg-orange">
      <div className="mx-14 flex h-16 items-center justify-between py-6 px-20">
        <div>
          <Link to="/">
            <img src={Logo} alt={"Logotype"} width="40" height="40" />
          </Link>
        </div>
        <div className="flex items-center justify-between">
          {user ? (
            <Link to="/new">Create a new article</Link>
          ) : (
            <div>
              <Link to="/join">Sign up</Link>
              <Link to="/login">Log In</Link>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
