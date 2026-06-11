"use client";

import { CreateGameFormData } from "@/types/CreateGameFormData";
import { ImagePlus } from "lucide-react";
import { useState } from "react";
import { useFieldArray, useFormContext } from "react-hook-form";

export default function CreatePairsForm() {
  const { control, register } = useFormContext<CreateGameFormData>();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "pairs",
  });

  const addPair = () => {
    if (fields.length < 8) {
      append({
        leftName: "",
        leftImage: null,
        rightName: "",
        rightImage: null,
      });
    }
  };

  const removeLastPair = () => {
    if (fields.length > 4) {
      remove(fields.length - 1);
    }
  };

  return (
    <div className="flex flex-col gap-6">
      {fields.map((field, i) => (
        <div key={field.id} className="flex flex-col gap-2">
          <span>Pair {i + 1}</span>

          <div className="flex items-center gap-4">
            {/* Left side */}
            <div className="flex-1 flex flex-col gap-2">
              <input
                className="py-1 px-2 border border-border1-strong rounded-sm outline-none bg-black/30 focus:border-border1-focus"
                placeholder="Enter name..."
                {...register(`pairs.${i}.leftName`)}
              />

              <label className="flex items-center justify-center h-40 border border-white/10 rounded-md bg-black/30 cursor-pointer hover:border-border1-focus transition">
                <div className="flex flex-col items-center gap-2 text-text1">
                  <ImagePlus size={28} />
                  <span className="text-xs">Upload image</span>
                </div>

                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0] || null;

                    // later: setValue(`pairs.${i}.leftImage`, file)
                  }}
                />
              </label>
            </div>

            {/* VS */}
            <div className="flex items-center justify-center w-16">
              <span className="font-bold text-lg">VS</span>
            </div>

            {/* Right side */}
            <div className="flex-1 flex flex-col gap-2">
              <input
                className="py-1 px-2 border border-border1-strong rounded-sm outline-none bg-black/30 focus:border-border1-focus"
                placeholder="Enter name..."
                {...register(`pairs.${i}.rightName`)}
              />

              <label className="flex items-center justify-center h-40 border border-white/10 rounded-md bg-black/30 cursor-pointer hover:border-border1-focus transition">
                <div className="flex flex-col items-center gap-2 text-text1">
                  <ImagePlus size={28} />
                  <span className="text-xs">Upload image</span>
                </div>

                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0] || null;

                    // later: setValue(`pairs.${i}.leftImage`, file)
                  }}
                />
              </label>
            </div>
          </div>
        </div>
      ))}

      {/* <div className="flex justify-center items-center gap-6">
        {fields.length > 4 && (
          <button
            type="button"
            onClick={removeLastPair}
            className="px-4 py-2 rounded-lg bg-red-500 text-white"
          >
            -
          </button>
        )}

        {fields.length < 8 && (
          <button
            type="button"
            onClick={addPair}
            className="px-4 py-2 rounded-lg bg-main1 hover:bg-main1-hover transition-all duration-200 text-black font-medium self-start"
          >
            +
          </button>
        )}
      </div> */}
    </div>
  );
}
