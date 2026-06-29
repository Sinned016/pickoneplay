"use client";
import { GameWithPairs, Pair } from "@/types/Game";
import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import { Dispatch, SetStateAction } from "react";

type GameProps = {
  game: GameWithPairs;
  setStep: Dispatch<SetStateAction<"info" | "session" | "results">>;
  index: number;
  setIndex: Dispatch<SetStateAction<number>>;
  answers: string[];
  setAnswers: Dispatch<SetStateAction<string[]>>;
};

export default function GameSession({
  game,
  setStep,
  index,
  setIndex,
  answers,
  setAnswers,
}: GameProps) {
  const pair: Pair = game.pairs[index];

  function choose(option: string) {
    // Save answer
    setAnswers((prev) => [...prev, option]);

    // Go to next slide
    const nextIndex = index + 1;

    if (nextIndex >= game.pairs.length) {
      setStep("results");
    } else {
      setIndex(nextIndex);
    }
  }

  function back() {
    setIndex(0);
    setAnswers([]);
    setStep("info");
  }

  return (
    <div>
      <button onClick={back} className="cursor-pointer">
        <ArrowLeft size={24} />
      </button>

      <h2 className="text-3xl md:text-5xl text-center mb-24 mt-12">
        Would you rather
      </h2>

      <div className="flex flex-row gap-6 lg:gap-24 justify-center items-center">
        <div>
          <h3 className="text-center text-xl md:text-3xl mb-2">
            {pair.leftName}
          </h3>

          <button
            onClick={() => choose(pair.leftName)}
            className="relative w-32 h-24 md:w-64 md:h-46 cursor-pointer animate-all duration-200 "
          >
            {pair.leftImage ? (
              <Image
                src={pair.leftImage}
                alt={pair.leftName}
                fill
                sizes="256"
                className="object-cover rounded-lg"
              />
            ) : (
              <Image
                src={"/placeholder-card.png"}
                alt={pair.leftName}
                fill
                sizes="256"
                className="object-cover rounded-lg"
              />
            )}
          </button>
        </div>

        <span>OR</span>

        <div>
          <h3 className="text-center text-xl md:text-3xl mb-2">
            {pair.leftName}
          </h3>

          <button
            onClick={() => choose(pair.rightName)}
            className="relative w-32 h-24 md:w-64 md:h-46 cursor-pointer animate-all duration-200 "
          >
            {pair.rightImage ? (
              <Image
                src={pair.rightImage}
                alt={pair.rightName}
                fill
                sizes="256"
                className="object-cover rounded-lg"
              />
            ) : (
              <Image
                src={"/placeholder-card.png"}
                alt={pair.rightName}
                fill
                sizes="256"
                className="object-cover rounded-lg"
              />
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
