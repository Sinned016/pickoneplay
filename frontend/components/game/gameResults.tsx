"use client";
import { GameWithPairs } from "@/types/Game";
import Image from "next/image";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Answer } from "./gameController";
import { ArrowLeft } from "lucide-react";

type GameProps = {
  id: string;
  setStep: Dispatch<SetStateAction<"info" | "session" | "results">>;
  answers: Answer[];
  setAnswers: Dispatch<SetStateAction<Answer[]>>;
  setIndex: Dispatch<SetStateAction<number>>;
};

export default function GameResults({
  id,
  setStep,
  answers,
  setAnswers,
  setIndex,
}: GameProps) {
  const [gameData, setGameData] = useState<GameWithPairs | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  console.log("GAME DATA: ", gameData);

  useEffect(() => {
    async function fetchGameData() {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/game/getFullGame/${id}`,
        );

        const json = await res.json();

        if (json.status !== "success") {
          throw new Error(json.message);
        }

        setGameData(json.data);
      } catch (err) {
        // set error state
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchGameData();
  }, [id]);

  function back() {
    setIndex(0);
    setAnswers([]);
    setStep("info");
  }

  // if loading show a spinner of some kind etc..
  return (
    <div className="flex flex-col gap-8">
      <button onClick={back} className="w-10 h-10 cursor-pointer">
        <ArrowLeft size={24} />
      </button>

      {gameData?.pairs.map((pair) => {
        const userAnswer = answers.find((a) => a.pairId === pair.id);

        const leftWins = pair.leftScore > pair.rightScore;
        const rightWins = pair.rightScore > pair.leftScore;
        const pickedLeft = userAnswer?.selected === "left";
        const pickedRight = userAnswer?.selected === "right";

        return (
          <div
            key={pair.id}
            className="bg-surface1 rounded-2xl shadow-md p-4 md:p-6"
          >
            {/* VS header */}
            <div className="text-center text-sm text-gray-500 mb-4">
              Battle Result
            </div>

            {/* Main row */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              {/* LEFT */}
              <div className="flex flex-col items-center flex-1">
                <h3 className="text-lg font-semibold mb-2 text-center">
                  {pair.leftName}
                </h3>

                <div className="relative w-28 h-28 md:w-40 md:h-40">
                  <Image
                    src={pair.leftImage || "/placeholder-card.png"}
                    alt={pair.leftName}
                    fill
                    className={`object-cover rounded-xl border-4 ${
                      pickedLeft ? "border-green-500" : "border-transparent"
                    }`}
                  />
                </div>

                <div className="mt-3 text-2xl font-bold">{pair.leftScore}</div>

                <div
                  className={`text-sm mt-1 ${
                    leftWins ? "text-green-500 font-semibold" : "text-gray-400"
                  }`}
                >
                  {leftWins ? "Winner" : " "}
                </div>
              </div>

              {/* VS */}
              <div className="text-xl font-bold text-gray-400">VS</div>

              {/* RIGHT */}
              <div className="flex flex-col items-center flex-1">
                <h3 className="text-lg font-semibold mb-2 text-center">
                  {pair.rightName}
                </h3>

                <div className="relative w-28 h-28 md:w-40 md:h-40">
                  <Image
                    src={pair.rightImage || "/placeholder-card.png"}
                    alt={pair.rightName}
                    fill
                    className={`object-cover rounded-xl border-4 ${
                      pickedRight ? "border-green-500" : "border-transparent"
                    }`}
                  />
                </div>

                <div className="mt-3 text-2xl font-bold">{pair.rightScore}</div>

                <div
                  className={`text-sm mt-1 ${
                    rightWins ? "text-green-500 font-semibold" : "text-gray-400"
                  }`}
                >
                  {rightWins ? "Winner" : " "}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
