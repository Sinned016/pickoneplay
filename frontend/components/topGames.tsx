import Image from "next/image";
import React from "react";

export default function TopGames() {
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

  return (
    <div className="">
      <h2 className="text-2xl text-text1 font-semibold mb-6">Top games</h2>

      <div className="flex flex-col gap-4">
        {fakeGames.map((game, index) => (
          <div
            key={game.id}
            className="flex items-center gap-4 p-2 rounded-md hover:bg-white/5 transition-all cursor-pointer"
          >
            {/* rank */}
            <div className="w-6 text-text1 font-semibold">{index + 1}</div>

            {/* image */}
            <Image
              src={game.image}
              alt={game.title}
              width={48}
              height={48}
              className="rounded-md object-cover"
            />

            {/* title */}
            <div className="text-text1 font-medium">{game.title}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
