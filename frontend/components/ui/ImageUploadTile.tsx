"use client";

import { cn } from "@/lib/utils";
import { ImagePlus } from "lucide-react";

type Props = {
  preview: string | null;
  onChange: (file: File | null) => void;
  alt?: string;
  className?: string;
};

export default function ImageUploadTile({
  preview,
  onChange,
  alt = "Preview",
  className,
}: Props) {
  return (
    <label
      className={cn(
        "flex items-center justify-center rounded-xl border border-border1 bg-surface1 cursor-pointer overflow-hidden transition-colors hover:border-border1-focus",
        className,
      )}
    >
      {preview ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={preview} alt={alt} className="w-full h-full object-cover" />
      ) : (
        <div className="flex flex-col items-center gap-2 text-muted">
          <ImagePlus size={28} />
          <span className="text-xs">Upload image</span>
        </div>
      )}

      <input
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => onChange(e.target.files?.[0] || null)}
      />
    </label>
  );
}
