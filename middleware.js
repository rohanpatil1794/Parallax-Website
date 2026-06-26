// Middleware always runs in the Edge runtime — Node.js crypto APIs are not
// available here. We only check cookie presence for the redirect guard.
// Full HMAC verification happens in each API route (requireAdmin) which runs
// on Node.js and has access to the full crypto module.
import { NextResponse } from "next/server";
import { COOKIE } from "./lib/auth";

export function middleware(request) {
  const { pathname } = request.nextUrl;
  const hasToken = !!request.cookies.get(COOKIE)?.value;

  if (pathname.startsWith("/admin/login")) {
    if (hasToken) return NextResponse.redirect(new URL("/admin", request.url));
    return NextResponse.next();
  }

  if (!hasToken) {
    const url = new URL("/admin/login", request.url);
    url.searchParams.set("from", pathname);
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = { matcher: ["/admin/:path*"] };
