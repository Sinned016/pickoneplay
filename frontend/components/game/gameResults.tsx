import { GameWithPairs } from "@/types/Game";
import { Dispatch, SetStateAction } from "react";

type GameProps = {
  game: GameWithPairs;
  setStep: Dispatch<SetStateAction<"info" | "session" | "results">>;
};

export default function GameResults({ game, setStep }: GameProps) {
  return <div>gameResults</div>;
}
