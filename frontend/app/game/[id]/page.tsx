import GameController from "@/components/game/gameController";
import { GameWithPairs } from "@/types/Game";

type Props = {
  params: {
    id: string;
  };
};

export default async function Page({ params }: Props) {
  const { id } = await params;

  // Fetch game
  let game: GameWithPairs | null;

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/game/getFullGame/${id}`,
    );

    const json = await res.json();

    if (json.status !== "success") {
      throw new Error(json.message);
    }

    game = json.data;
  } catch (err) {
    console.log(err);
    game = null;
  }

  if (!game) {
    return <div>Game not found</div>;
  }

  return (
    <div className="max-w-7xl mx-auto mt-8 px-4 sm:px-6 lg:px-8">
      <GameController game={game} />
    </div>
  );
}
