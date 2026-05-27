import FeaturedGames from "@/components/featuredGames";
import Hero from "@/components/hero";
import Image from "next/image";

export default function Home() {
  return (
    <div className="">
      <Hero />
      <FeaturedGames />
    </div>
  );
}
