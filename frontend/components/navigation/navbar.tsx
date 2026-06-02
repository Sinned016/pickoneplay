import UserButton from "./userButton";

export default function Navbar() {
  // Fetch logged in user here.

  return (
    <nav className="fixed top-0 w-full z-50 transition-all duration-300 bg-surface1 backdrop-blur-sm">
      <div className="w-full mx-auto px-4 sm:px-6 lg:px-20">
        <div className="flex justify-between items-center h-14 sm:h-16 md:h-20 ">
          <div className="flex items-center space-x-2 cursor-pointer">
            {/* <div className="">Logo</div> */}
            <span className="text-lg sm:text-xl md:text-2xl font-medium">
              <span className="text-main1">Pick</span>
              <span className="text-main2">One</span>
              <span className="text-white">Play</span>
            </span>
          </div>

          {/* Add links here */}
          {/* <div className="hidden md:flex items-center space-x-6 lg:space-x-8">
            <Link
              className=" text-gray-300 hover:text-white cursor-pointer text-sm lg:text-base"
              href={"/test1"}
            >
              Games
            </Link>
            <Link
              className=" text-gray-300 hover:text-white cursor-pointer text-sm lg:text-base"
              href={"/test2"}
            >
            </Link>
            <Link
              className=" text-gray-300 hover:text-white cursor-pointer text-sm lg:text-base"
              href={"/test3"}
            >
              Test3
            </Link>
          </div> */}

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
