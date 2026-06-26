import { NextResponse } from "next/server";
import { CREDS, COOKIE, signSession } from "@/lib/auth";

export async function POST(request) {
  const origin = request.headers.get("origin") ?? "";
  const host = request.headers.get("host") ?? "";
  if (!origin.includes(host)) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const { username, password } = await request.json();

  if (username !== CREDS.user || password !== CREDS.pass) {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  }

  const token = signSession({ user: username, iat: Date.now() });
  const response = NextResponse.json({ ok: true });
  response.cookies.set(COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7, // 7 days
  });
  return response;
}
