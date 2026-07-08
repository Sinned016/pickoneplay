import { cn } from "@/lib/utils";

type Props = {
  label?: string;
  className?: string;
};

export default function VsDivider({ label = "VS", className }: Props) {
  return (
    <div
      className={cn(
        "flex items-center justify-center w-12 h-12 rounded-full bg-surface2 border border-border1-strong shrink-0",
        className,
      )}
    >
      <span className="text-sm font-bold text-text1">{label}</span>
    </div>
  );
}
