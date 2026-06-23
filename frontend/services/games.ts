export async function createGame(data: FormData) {
  console.log("STEP 1");

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/game/create`,
    {
      method: "POST",
      credentials: "include",
      body: data, // IMPORTANT: keep FormData as-is
    },
  );

  const responseData = await res.json();

  if (!res.ok) {
    throw new Error(responseData?.message || "Failed to create game");
  }

  return responseData;
}
