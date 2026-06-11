import Link from "next/link";
import UserButton from "./userButton";
import NavLinks from "./navLinks";

export default async function Navbar() {
  return (
    <nav className="w-full z-50 transition-all duration-300 bg-surface1 backdrop-blur-sm">
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

          {/* Nav links */}
          <NavLinks />

          {/* UserButton or Login */}
          <UserButton />

          {/* Old mobile menu */}
          {/* <MobileMenu /> */}
        </div>
      </div>
    </nav>
  );
}
