import { GameWithPairs } from "@/types/Game";
import Image from "next/image";
import { Dispatch, SetStateAction } from "react";

type GameProps = {
  game: GameWithPairs;
  setStep: Dispatch<SetStateAction<"info" | "session" | "results">>;
};

export default function GameInfo({ game, setStep }: GameProps) {
  return (
    <div>
      <div className="flex gap-6">
        <div className="relative w-64 h-64">
          {game.image ? (
            <Image
              src={game.image}
              alt={`${game.title} image`}
              fill
              sizes="256px"
              className="object-cover rounded-lg"
            />
          ) : (
            <Image
              src={"placeholder-card.png"}
              alt={"placeholder image"}
              fill
              sizes="256px"
              className="object-cover rounded-lg"
            />
          )}
        </div>

        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold">{game.title}</h1>

          <p className="text-muted">{game.description}</p>

          {/* <div className="flex gap-2">
            {game.tags.map((tag) => (
              <div
                key={tag}
                className="flex items-center gap-2 py-1 px-3 rounded-full bg-main1 text-black"
              >
                <span className="text-sm font-medium">{tag}</span>
              </div>
            ))}
          </div> */}

          <button
            onClick={() => setStep("session")}
            className="px-6 py-3 rounded-xl bg-main1 hover:bg-main1-hover transition-all duration-200 cursor-pointer text-black font-bold"
          >
            Play Game
          </button>
        </div>
      </div>
    </div>
  );
}
