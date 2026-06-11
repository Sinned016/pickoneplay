"use client";

import { useAuth } from "@/store/useAuth";
import Link from "next/link";

export default function NavLinks() {
  const user = useAuth((state) => state.user);
  const isUserLoggedIn = !!user;

  return (
    <div className="hidden md:flex items-center space-x-6 lg:space-x-8">
      <Link
        className=" text-gray-300 hover:text-white cursor-pointer text-sm lg:text-base"
        href={"/games"}
      >
        Games
      </Link>
      <Link
        className=" text-gray-300 hover:text-white cursor-pointer text-sm lg:text-base"
        href={"#"}
      >
        Random
      </Link>
      {isUserLoggedIn && (
        <Link
          className=" text-gray-300 hover:text-white cursor-pointer text-sm lg:text-base"
          href={"/create"}
        >
          Create
        </Link>
      )}
    </div>
  );
}
