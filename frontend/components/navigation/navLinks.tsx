"use client";

import { useAuth } from "@/store/useAuth";
import Link from "next/link";

export default function NavLinks() {
  const user = useAuth((state) => state.user);
  const isUserLoggedIn = !!user;

  return (
    <div className="hidden md:flex items-center space-x-6 lg:space-x-8">
      <Link
        className="text-text1 hover:text-text1-hover transition-colors cursor-pointer text-sm lg:text-base"
        href={"/games"}
      >
        Games
      </Link>
      <span
        aria-disabled
        title="Coming soon"
        className="text-muted/50 cursor-not-allowed text-sm lg:text-base"
      >
        Random
      </span>
      {isUserLoggedIn && (
        <Link
          className="text-text1 hover:text-text1-hover transition-colors cursor-pointer text-sm lg:text-base"
          href={"/create"}
        >
          Create
        </Link>
      )}
    </div>
  );
}
