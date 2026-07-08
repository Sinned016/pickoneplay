import Card from "@/components/ui/Card";
import { Game } from "@/types/Game";
import Image from "next/image";
import Link from "next/link";

type Props = {
  games: Game[];
};

export default function FeaturedGames({ games }: Props) {
  return (
    <div>
      <div className="flex flex-row justify-between items-center mb-6">
        <h2 className="text-2xl text-text1 font-semibold">Featured games</h2>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {games.map((game) => (
          <Link href={`/game/${game.id}`} key={game.id}>
            <Card variant="ghost" interactive radius="xl" padding="sm" className="space-y-2">
              <div className="relative aspect-4/5 w-full overflow-hidden rounded-xl">
                <Image
                  src={game.image ?? "/placeholder-card.png"}
                  alt={game.title}
                  fill
                  sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  className="object-cover"
                />
              </div>

              <p className="text-sm font-medium text-text1">{game.title}</p>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
