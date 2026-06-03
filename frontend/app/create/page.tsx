// Fetch all games or in batches?

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

// Make sure to send the jwt cookie to the backend, if current user does not have a jwt cookie we should instantly go to "/" again.
export default async function Create() {
  const cookieStore = await cookies();
  const token = cookieStore.get("jwt");

  if (!token) {
    redirect("/");
  }

  return <div>Create game page, only for logged in users</div>;
}
