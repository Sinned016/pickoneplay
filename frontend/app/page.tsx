import FeaturedGames from "@/components/featuredGames";
import Hero from "@/components/hero";
import TopGames from "@/components/topGames";

export default function Home() {
  return (
    <div>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 ">
        <Hero />

        <div className="flex flex-col lg:flex-row gap-6">
          <div className="lg:flex-2">
            <FeaturedGames />
          </div>

          <div className="lg:flex-1">
            <TopGames />
          </div>
        </div>
      </div>
    </div>
  );
}
