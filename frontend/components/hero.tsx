import Button from "@/components/ui/Button";

export default function Hero() {
  return (
    <header className="py-24 text-center hero-bg">
      <p className="text-main1 font-medium mb-3">PickOnePlay</p>

      <h1 className="text-5xl md:text-7xl font-black text-white tracking-tight">
        The Ultimate
        <span className="block text-main1">Would You Rather</span>
        Experience
      </h1>

      <p className="mt-6 text-lg text-text1">
        Create games, Challenge friends and explore.
      </p>

      <div className="mt-10 flex justify-center gap-4">
        <Button href="/games" variant="primary" size="lg">
          Browse games
        </Button>
      </div>
    </header>
  );
}
