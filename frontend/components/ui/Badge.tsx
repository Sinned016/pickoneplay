import { cn } from "@/lib/utils";
import { X } from "lucide-react";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
  onRemove?: () => void;
  variant?: "solid" | "outline";
  className?: string;
};

export default function Badge({
  children,
  onRemove,
  variant = "solid",
  className,
}: Props) {
  return (
    <div
      className={cn(
        "flex items-center gap-2 py-1 px-3 rounded-full text-sm font-medium",
        variant === "solid"
          ? "bg-main1 text-black"
          : "border border-border1-strong text-text1",
        className,
      )}
    >
      <span>{children}</span>
      {onRemove && (
        <button type="button" onClick={onRemove} className="cursor-pointer">
          <X size={16} />
        </button>
      )}
    </div>
  );
}
