import { CreateGameData } from "@/types/Game";

export async function createGame(data: CreateGameData) {
  console.log("STEP 1");

  const res = await fetch("/api/games/create", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(data),
  });

  const responseData = await res.json();

  if (!res.ok) {
    throw new Error(responseData?.message || "Failed to create game");
  }

  return responseData;
}
