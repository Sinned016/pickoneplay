import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    console.log("STEP 2");

    const body = await req.json();

    const cookie = req.headers.get("cookie") || "";

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/game/create`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // IMPORTANT: forward cookies to backend
          cookie: cookie,
        },
        body: JSON.stringify(body),
      },
    );

    const data = await res.json();

    return NextResponse.json(data, {
      status: res.status,
    });
  } catch (err: any) {
    return NextResponse.json(
      { user: null, error: err.message },
      { status: 500 },
    );
  }
}
