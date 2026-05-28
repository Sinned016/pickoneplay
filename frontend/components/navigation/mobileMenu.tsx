"use client";

import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

// -- NOT USED ANYMORE! --
export default function MobileMenu() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  return (
    <>
      <button
        className="md:hidden p-2 text-text1 hover:text-text-hover cursor-pointer"
        onClick={() => setMobileMenuOpen((prev) => !prev)}
      >
        {mobileMenuOpen ? (
          <X className="w-5 h-5 sm:w-6 sm:h-6" />
        ) : (
          <Menu className="w-5 h-5 sm:w-6 sm:h-6" />
        )}
      </button>

      {/* Mobile Dropdown */}
      {mobileMenuOpen && (
        <div className="absolute top-full left-0 w-full md:hidden bg-slate-900/95 backdrop-blur-lg border-t border-slate-800 animate-in slide-in-from-top animate-duration-300">
          <div className="px-4 py-4 sm:py-6 sm:px-6 flex flex-col gap-3 sm:gap-4">
            <Link className="text-text1 hover:text-text-hover" href="/test1">
              Test1
            </Link>

            <Link className="text-text1 hover:text-text-hover" href="/test2">
              Test2
            </Link>

            <Link className="text-text1 hover:text-text-hover" href="/test3">
              Test3
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
