"use client";
import { LogIn, Menu, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  return (
    <nav className="fixed top-0 w-full z-50 transition-all duration-300 bg-slate-950/20 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-14 sm:h-16 md:h-20">
          <div className="flex items-center space-x-2 cursor-pointer">
            <div className="">Logo</div>
            <span className="text-lg sm:text-xl md:text-2xl font-medium">
              <span className="text-cyan-300">Pick</span>
              <span className="text-red-400">One</span>
              <span className="text-white">Play</span>
            </span>
          </div>

          {/* Links */}
          <div className="hidden md:flex items-center space-x-6 lg:space-x-8">
            <Link
              className=" text-gray-300 hover:text-white cursor-pointer text-sm lg:text-base"
              href={"/test1"}
            >
              Test1
            </Link>
            <Link
              className=" text-gray-300 hover:text-white cursor-pointer text-sm lg:text-base"
              href={"/test2"}
            >
              Test2
            </Link>
            <Link
              className=" text-gray-300 hover:text-white cursor-pointer text-sm lg:text-base"
              href={"/test3"}
            >
              Test3
            </Link>
          </div>

          {/* Login / Logout */}
          {isUserLoggedIn ? (
            <div>
              <p>Logged in</p>
            </div>
          ) : (
            <Link
              href={"/login"}
              className="hidden md:flex gap-2 items-center py-1 px-3 border bg-gray-300 hover:bg-white rounded-sm cursor-pointer "
            >
              <LogIn className="w-5 h-5 text-black" />
              <div className=" text-black text-xs lg:text-base">Login</div>
            </Link>
          )}

          {/* Mobile */}
          <button
            className="md:hidden p-2 text-gray-300 hover:text-white cursor-pointer"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
          >
            {mobileMenuOpen ? (
              <X className="w-5 h-5 sm:w-6 sm:h-6" />
            ) : (
              <Menu className="w-5 h-5 sm:w-6 sm:h-6" />
            )}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden bg-slate-900/95 backdrop-blur-lg border-t border-slate-800 animate-in slide-in-from-top animate-duration-300">
          <div className="px-4 py-4 sm:py-6 sm:px-6 flex flex-col gap-3 sm:gap-4">
            <Link
              className=" text-gray-300 hover:text-white cursor-pointer text-sm lg:text-base"
              href={"/test1"}
            >
              Test1
            </Link>
            <Link
              className=" text-gray-300 hover:text-white cursor-pointer text-sm lg:text-base"
              href={"/test2"}
            >
              Test2
            </Link>
            <Link
              className=" text-gray-300 hover:text-white cursor-pointer text-sm lg:text-base"
              href={"/test3"}
            >
              Test3
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
