import Image from "next/image";

// Pass down games here
// I want max 12 games here.
export default function FeaturedGames() {
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
    <div className=" ">
      <div className="flex flex-row justify-between items-center mb-6">
        <h2 className="text-2xl text-text1 font-semibol">Featured games</h2>

        {/* Maybe filtering here */}
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {fakeGames.map((game) => (
          <div
            key={game.id}
            className="space-y-2 rounded-xl p-2 transition-all hover:bg-white/5 hover:scale-105 cursor-pointer"
          >
            <div className="relative aspect-4/5 w-full overflow-hidden rounded-xl">
              <Image
                src={game.image}
                alt={game.title}
                fill
                className="object-cover"
              />
            </div>

            <p className="text-sm font-medium">{game.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
