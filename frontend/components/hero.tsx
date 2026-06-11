// GO to "Build and Deploy a Fully Responsive Modern Website using ReactJS and Tailwind CSS" by PedroTech and look at his example of a hero.

import Link from "next/link";

export default function Hero() {
  return (
    <header className="py-24 text-center hero-bg">
      <p className="text-main1 font-medium mb-3">PickOnePlay</p>

      <h1 className="text-5xl md:text-7xl font-black text-white tracking-tight">
        The Ultimate
        <span className="block text-main1">Would You Rather</span>
        Experience
      </h1>

      <p className="mt-6 text-lg text-text1">
        Create games, Challenge friends and explore.
      </p>

      <div className="mt-10 flex justify-center gap-4">
        <Link
          href={"/games"}
          className="px-6 py-3 rounded-xl bg-main1 hover:bg-main1-hover transition-all duration-200 cursor-pointer text-black font-bold"
        >
          Browse games
        </Link>
      </div>
    </header>
  );
}
