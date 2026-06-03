"use client";

import { useAuth } from "@/store/useAuth";
import { LogIn, User } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

// recieve the user data here and make the ternary depending on if the user is logged in or not
export default function UserButton() {
  const [menuOpen, setMenuOpen] = useState(false);
  // make sure to user this user state to gate keep logged in actions.
  const user = useAuth((state) => state.user);
  const isUserLoggedIn = !!user;

  const logout = useAuth((state) => state.logout);

  return (
    <div>
      {isUserLoggedIn ? (
        <div className="relative">
          <button
            onClick={() => setMenuOpen((prev) => !prev)}
            className="p-1 rounded-full bg-white/80 hover:bg-white cursor-pointer transition-all duration-200"
          >
            <User className="w-5 h-5 sm:w-6 sm:h-6  text-black stroke-3" />
          </button>

          {/* // Dropdown */}
          {menuOpen && (
            <div className="absolute right-0 mt-2 ">
              <div className="flex flex-col gap-2 items-center bg-surface2 rounded-xl shadow-[0_0_5px_rgba(0,0,0,0.35)]">
                <div className="p-1 rounded-full border-2 bg-white border-black mt-6">
                  <User className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-black stroke-3" />
                </div>

                <div className="text-text1 text-sm lg:text-base mb-1">
                  {user?.username}
                </div>

                <div className="flex flex-col items-center">
                  <Link
                    className="text-text1 text-sm lg:text-sm cursor-pointer py-2 px-2 hover:bg-surface2-hover w-42 text-center transition-all duration-200"
                    href={"#"}
                  >
                    Settings
                  </Link>
                  <button
                    onClick={logout}
                    className="text-text1 text-sm lg:text-sm cursor-pointer py-2 px-2 bg-surface1 hover:text-white w-42 text-center rounded-b-xl transition-all duration-200"
                  >
                    Logout
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      ) : (
        <Link
          href={"/login"}
          className="flex gap-2 items-center py-1 px-3 bg-button hover:bg-button-hover rounded-lg cursor-pointer transition-all duration-200"
        >
          <LogIn className="w-5 h-5 text-black" />
          <div className=" text-black text-xs lg:text-lg">Sign in</div>
        </Link>
      )}
    </div>
  );
}
