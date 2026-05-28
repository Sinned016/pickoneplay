import FeaturedGames from "@/components/featuredGames";
import Hero from "@/components/hero";
import TopGames from "@/components/topGames";

export default function Home() {
  return (
    <div className="flex flex-col gap-2 py-5">
      <Hero />
      <FeaturedGames />
      <TopGames />
    </div>
  );
}
