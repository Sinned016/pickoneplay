import Link from "next/link";
import UserButton from "./userButton";

export default function Navbar() {
  // Fetch logged in user here.

  return (
    <nav className="fixed top-0 w-full z-50 transition-all duration-300 bg-surface1 backdrop-blur-sm">
      <div className="w-full mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2 cursor-pointer">
            {/* <div className="">Logo</div> */}
            <Link
              href={"/"}
              className="text-lg sm:text-xl md:text-2xl font-medium"
            >
              <span className="">LOGO</span>
            </Link>
          </div>

          {/* Add links here */}
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

            <Link
              className=" text-gray-300 hover:text-white cursor-pointer text-sm lg:text-base"
              href={"/create"}
            >
              Create
            </Link>
          </div>

          {/* Login */}
          {/* Make sure to send down user session */}
          <UserButton />

          {/* Old mobile menu */}
          {/* <MobileMenu /> */}
        </div>
      </div>
    </nav>
  );
}
