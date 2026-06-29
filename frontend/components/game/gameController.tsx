"use client";

import { GameWithPairs } from "@/types/Game";
import { useState } from "react";
import GameInfo from "./gameInfo";
import GameSession from "./gameSession";
import GameResults from "./gameResults";

type GameProps = {
  game: GameWithPairs;
};

export default function GameController({ game }: GameProps) {
  // States to handle if game has started and more.
  const [step, setStep] = useState<"info" | "session" | "results">("info");
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);

  function startGame() {
    setStep("session");
  }

  return (
    <div>
      {step === "info" && <GameInfo game={game} setStep={setStep} />}

      {step === "session" && (
        <GameSession
          game={game}
          setStep={setStep}
          index={index}
          setIndex={setIndex}
          answers={answers}
          setAnswers={setAnswers}
        />
      )}

      {step === "results" && <GameResults game={game} setStep={setStep} />}
    </div>
  );
}
