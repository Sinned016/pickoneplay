import { Game } from "@/types/Game";
import Image from "next/image";

type Props = {
  games: Game[];
};

export default function TopGames({ games }: Props) {
  const fakeGames = [
    { id: 1, title: "Would You Rather", image: "/catFlower.jpg" },
    { id: 2, title: "Truth or Dare", image: "/catHalloween.jpg" },
    { id: 3, title: "Guess the Song", image: "/catHeadset.jpg" },
    { id: 4, title: "Trivia Clash", image: "/catTable.png" },
    { id: 5, title: "Would You Rather2", image: "/catFlower.jpg" },
    { id: 6, title: "Truth or Dare2", image: "/catHalloween.jpg" },
    { id: 7, title: "Guess the Song2", image: "/catHeadset.jpg" },
    { id: 8, title: "Trivia Clash2", image: "/catTable.png" },
    { id: 9, title: "Memory Master", image: "/catFlower.jpg" },
    { id: 10, title: "Quick Quiz", image: "/catHalloween.jpg" },
  ];

  const topGames = [...games].sort((a, b) => b.plays - a.plays).slice(0, 10);

  return (
    <div className="">
      <h2 className="text-2xl text-text1 font-semibold mb-6">Top games</h2>

      <div className="flex flex-col gap-4">
        {topGames.map((game, index) => (
          <div
            key={game.id}
            className="flex items-center gap-4 p-2 rounded-md hover:bg-white/5 transition-all cursor-pointer"
          >
            {/* rank */}
            <div className="w-6 text-text1 font-semibold">{index + 1}</div>

            {/* image */}
            <div className="relative w-12 h-12 flex-shrink-0">
              {game.image ? (
                <Image
                  src={game.image}
                  alt={game.title}
                  fill
                  sizes="96px"
                  className="rounded-md object-cover"
                />
              ) : (
                <Image
                  src={"/placeholder-card.png"}
                  alt={game.title}
                  fill
                  sizes="96px"
                  className="rounded-md object-cover"
                />
              )}
            </div>

            {/* title */}
            <div className="text-text1 font-medium">{game.title}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
