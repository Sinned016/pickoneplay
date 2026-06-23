"use client";

import { CreateGameFormData } from "@/types/CreateGameFormData";
import { ImagePlus, X } from "lucide-react";
import { useState } from "react";
import { useFormContext } from "react-hook-form";

// id String @id @default(uuid())
// title String @unique
// description String
// image String?
// createdBy String
// createdAt DateTime @default(now())
// category String @default("random")
// tags String[]

// creator User @relation("GameCreator", fields: [createdBy], references: [id], onDelete: Cascade)
// pairs Pair[]

// IF i want the page to be wrapped in a card
// bg-surface1 border border-border1-strong

const testTags = ["Food", "Pasta", "Meat", "Soda"];

export default function CreateGameForm() {
  const { register, watch, setValue } = useFormContext<CreateGameFormData>();
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const tags = watch("tags") || [];
  const [tagInput, setTagInput] = useState("");

  const addTag = () => {
    const value = tagInput.trim();

    if (!value) return;
    if (tags.includes(value)) return;

    setValue("tags", [...tags, value], {
      shouldDirty: true,
      shouldValidate: true,
    });

    setTagInput("");
  };

  return (
    <div className="flex flex-col gap-2 rounded-xl text-text1 ">
      <div className="flex flex-col gap-6 mt-2">
        <div className="flex flex-col gap-2">
          <label className="font-medium text-lg" htmlFor="">
            Game Title *
          </label>
          <input
            className="py-1 px-2 border border-border1-strong rounded-sm outline-none bg-black/30 focus:border-border1-focus"
            type="text"
            placeholder="Game title..."
            {...register("title", { required: true })}
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="font-medium text-lg" htmlFor="">
            Description *
          </label>
          <textarea
            rows={3}
            className="py-1 px-2 border border-border1-strong rounded-sm outline-none bg-black/30 focus:border-border1-focus max-h-[160px] overflow-y-auto"
            placeholder="Description..."
            {...register("description", { required: true })}
          />
        </div>

        <div className="mx-auto mt-4">
          <label className="flex items-center justify-center w-40 h-40 border border-white/10 rounded-md bg-black/30 cursor-pointer hover:border-border1-focus transition overflow-hidden">
            {imagePreview ? (
              <img
                src={imagePreview}
                alt="Game preview"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="flex flex-col items-center gap-2 text-text1">
                <ImagePlus size={28} />
                <span className="text-xs">Upload image</span>
              </div>
            )}

            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0] || null;

                setValue("image", file, {
                  shouldDirty: true,
                });

                if (file) {
                  setImagePreview(URL.createObjectURL(file));
                } else {
                  setImagePreview(null);
                }
              }}
            />
          </label>
        </div>

        <div className="flex flex-col gap-2">
          <label className="font-medium text-lg" htmlFor="">
            Category
          </label>
          <input
            className="py-1 px-2 border border-border1-strong rounded-sm outline-none bg-black/30 focus:border-border1-focus"
            type="text"
            placeholder="Category..."
            {...register("category")}
          />
        </div>

        <div className="flex flex-col gap-2 flex-1">
          <span className="font-medium text-lg">Tags *</span>
          <div className="flex items-center gap-2 py-1 px-2 border border-border1-strong rounded-sm outline-none bg-black/30 focus-within:border-border1-focus">
            <input
              className="flex-1 outline-none focus:outline-none focus:ring-0 focus:border-transparent w-full"
              type="text"
              placeholder="Tags..."
              value={tagInput}
              onChange={(e) => {
                setTagInput(e.target.value);
              }}
            />

            <button
              type="button"
              className="text-text1 hover:text-main1 text-lg px-2 cursor-pointer"
              onClick={addTag}
            >
              +
            </button>
          </div>

          <div className="flex flex-wrap gap-2 mt-2">
            {tags.map((tag, i) => {
              return (
                <div
                  key={i}
                  className="flex items-center gap-2 py-1 px-3 rounded-full bg-main1 text-black text-sm font-medium"
                >
                  <span className="text-sm font-medium">{tag}</span>
                  <button
                    className="cursor-pointer"
                    onClick={() =>
                      setValue(
                        "tags",
                        tags.filter((_, index) => index !== i),
                      )
                    }
                  >
                    <X size={18} />
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
