"use client";

import { LogIn, User } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

// recieve the user data here and make the ternary depending on if the user is logged in or not
export default function UserButton() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);

  return (
    <div>
      {isUserLoggedIn ? (
        <div className="relative">
          <button
            onClick={() => setMenuOpen((prev) => !prev)}
            className="p-1 rounded-full bg-muted hover:bg-white cursor-pointer"
          >
            <User className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-black stroke-3" />
          </button>

          {/* // Dropdown */}
          {menuOpen && (
            <div className="absolute right-0 mt-2">
              <div className="flex flex-col gap-2 items-center w-42 border rounded-xl border-white bg-muted backdrop-blur-xl p-6 h-50 mt-auto shadow-lg">
                <div className="p-1 rounded-full border-2 bg-white border-black">
                  <User className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-black stroke-3" />
                </div>

                <div className="text-black text-sm lg:text-base">Username</div>

                <div className="mt-auto flex flex-col gap-2 items-center">
                  <Link
                    className="text-black text-sm lg:text-base hover:text-cyan"
                    href={"#"}
                  >
                    Settings
                  </Link>
                  <Link
                    className="text-black text-sm lg:text-base hover:text-cyan"
                    href={"#"}
                  >
                    Logout
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      ) : (
        <Link
          href={"/login"}
          className="flex gap-2 items-center py-1 px-3 bg-button rounded-sm cursor-pointer "
        >
          <LogIn className="w-5 h-5 text-white" />
          <div className=" text-white text-xs lg:text-lg">Sign in</div>
        </Link>
      )}
    </div>
  );
}
