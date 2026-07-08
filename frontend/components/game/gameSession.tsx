"use client";
import Button from "@/components/ui/Button";
import VsDivider from "@/components/ui/VsDivider";
import { cn } from "@/lib/utils";
import { updatePairScore } from "@/services/games";
import { GameWithPairs, Pair } from "@/types/Game";
import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import { Dispatch, SetStateAction, useState } from "react";
import { Answer } from "./gameController";

type GameProps = {
  game: GameWithPairs;
  setStep: Dispatch<SetStateAction<"info" | "session" | "results">>;
  index: number;
  setIndex: Dispatch<SetStateAction<number>>;
  answers: Answer[];
  setAnswers: Dispatch<SetStateAction<Answer[]>>;
};

type ChoiceTileProps = {
  name: string;
  image: string | null;
  isSelected: boolean;
  isDimmed: boolean;
  onChoose: () => void;
};

function ChoiceTile({
  name,
  image,
  isSelected,
  isDimmed,
  onChoose,
}: ChoiceTileProps) {
  return (
    <div className="flex-1 flex flex-col items-center min-w-0">
      <h3 className="text-center text-xl md:text-3xl mb-2 text-text1">
        {name}
      </h3>

      <button
        onClick={onChoose}
        disabled={isSelected || isDimmed}
        className={cn(
          "relative w-32 h-32 md:w-64 md:h-64 rounded-xl border border-border1 overflow-hidden cursor-pointer transition-all duration-200",
          "hover:border-main1/60 hover:scale-105 hover:shadow-md active:scale-95",
          isSelected && "ring-2 ring-main1 scale-105",
          isDimmed && "opacity-50 pointer-events-none",
        )}
      >
        <Image
          src={image || "/placeholder-card.png"}
          alt={name}
          fill
          sizes="256px"
          className="object-cover"
        />
      </button>
    </div>
  );
}

export default function GameSession({
  game,
  setStep,
  index,
  setIndex,
  answers,
  setAnswers,
}: GameProps) {
  const pair: Pair = game.pairs[index];
  const [selectedSide, setSelectedSide] = useState<"left" | "right" | null>(
    null,
  );

  async function choose(pairId: string, name: string, side: "left" | "right") {
    setSelectedSide(side);

    setAnswers((prev) => [
      ...prev,
      {
        pairId,
        selected: side,
        name,
      },
    ]);

    const dataToSend = {
      pairId,
      name,
      side,
    };

    // update score
    await updatePairScore(dataToSend);

    // Set error state if it goes wrong.

    // Go to next slide
    const nextIndex = index + 1;

    if (nextIndex >= game.pairs.length) {
      // Finish game and go to results
      setStep("results");
    } else {
      setIndex(nextIndex);
      setSelectedSide(null);
    }
  }

  function back() {
    setIndex(0);
    setAnswers([]);
    setStep("info");
  }

  return (
    <div>
      <Button
        onClick={back}
        variant="ghost"
        size="icon"
        aria-label="Back to game info"
      >
        <ArrowLeft size={24} />
      </Button>

      <h2 className="text-3xl md:text-5xl text-center mb-24 mt-12 text-text1">
        Would you rather
      </h2>

      <div className="flex flex-col md:flex-row items-center justify-between gap-6">
        <ChoiceTile
          name={pair.leftName}
          image={pair.leftImage}
          isSelected={selectedSide === "left"}
          isDimmed={selectedSide !== null && selectedSide !== "left"}
          onChoose={() => choose(pair.id, pair.leftName, "left")}
        />

        <VsDivider />

        <ChoiceTile
          name={pair.rightName}
          image={pair.rightImage}
          isSelected={selectedSide === "right"}
          isDimmed={selectedSide !== null && selectedSide !== "right"}
          onChoose={() => choose(pair.id, pair.rightName, "right")}
        />
      </div>
    </div>
  );
}
