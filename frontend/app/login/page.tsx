"use client";
import { Lock, Mail } from "lucide-react";
import Link from "next/link";

export default function Login() {
  return (
    <div className="flex flex-1 items-center justify-center">
      <div className="relative bg-gray-600/20 rounded-xl w-100 mx-auto">
        {/* <X className="w-5 h-5 absolute right-5 top-5" /> */}

        <div className="flex flex-col gap-6 p-6">
          <h2 className="text-3xl text-text1 mx-auto">Login</h2>

          <form className="flex flex-col gap-2" action="">
            <div className="flex items-center gap-2 border border-gray-500 rounded-sm py-3 px-3 focus-within:border-muted focus-within:bg-white/5">
              <Mail className="w-5 h-5" />
              <input
                className="outline-none focus:outline-none focus:ring-0 focus:border-transparent w-full"
                type="text"
                placeholder="Email"
              />
            </div>

            <div className="flex items-center gap-2 border border-gray-500 rounded-sm py-3 px-3 focus-within:border-muted focus-within:bg-white/5">
              <Lock className="w-5 h-5" />
              <input
                className="outline-none focus:outline-none focus:ring-0 focus:border-transparent w-full"
                type="password"
                placeholder="Password"
              />
            </div>

            <div className="">
              <Link
                className="text-sm text-text1 hover:text-text-hover"
                href={"#"}
              >
                Forgot password?
              </Link>
            </div>

            <div className="mt-6">
              <button className="py-2 px-3 bg-button hover:bg-button-hover w-full text-white text-lg rounded-sm transition-all duration-200 cursor-pointer">
                Login
              </button>
            </div>

            <div className="flex justify-center items-center gap-2 mt-4">
              <p className="text-sm">Don't have an account?</p>
              <Link
                className="text-sm text-main1 hover:text-main1-hover"
                href={"/register"}
              >
                Register
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
