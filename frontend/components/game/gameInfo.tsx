import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import { updatePlayScore } from "@/services/games";
import { GameWithPairs } from "@/types/Game";
import Image from "next/image";
import { Dispatch, SetStateAction } from "react";

type GameProps = {
  game: GameWithPairs;
  setStep: Dispatch<SetStateAction<"info" | "session" | "results">>;
};

export default function GameInfo({ game, setStep }: GameProps) {
  async function startGame() {
    try {
      await updatePlayScore(game.id);

      setStep("session");
    } catch (err) {
      // handle errors here
      console.error("Failed to update play score, error: ", err);
    }
  }

  return (
    <div>
      <div className="flex flex-col md:flex-row gap-6">
        <div className="relative w-full md:w-64 h-64 shrink-0 rounded-xl overflow-hidden">
          <Image
            src={game.image || "/placeholder-card.png"}
            alt={`${game.title} image`}
            fill
            sizes="256px"
            className="object-cover"
          />
        </div>

        <div className="flex flex-col gap-3">
          <h1 className="text-3xl font-bold text-text1">{game.title}</h1>

          <p className="text-muted">{game.description}</p>

          {game.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {game.tags.map((tag) => (
                <Badge key={tag} variant="outline">
                  {tag}
                </Badge>
              ))}
            </div>
          )}

          <div>
            <Button onClick={startGame} variant="primary" size="lg">
              Play Game
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
