import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { noindexHeader } from "@/lib/indexing";

function passwordsMatch(provided: string, expected: string): boolean {
  const enc = new TextEncoder();
  const a = enc.encode(provided);
  const b = enc.encode(expected);
  const max = Math.max(a.length, b.length);
  let diff = a.length ^ b.length;
  for (let i = 0; i < max; i++) {
    diff |= (a[i] ?? 0) ^ (b[i] ?? 0);
  }
  return diff === 0;
}

function authorized(header: string | null, password: string): boolean {
  if (!header?.startsWith("Basic ")) {
    return false;
  }
  let decoded = "";
  try {
    decoded = atob(header.slice(6).trim());
  } catch {
    return false;
  }
  const sep = decoded.indexOf(":");
  const pass = sep === -1 ? decoded : decoded.slice(sep + 1);
  return passwordsMatch(pass, password);
}

function withRobots(response: NextResponse, gated: boolean) {
  if (gated) {
    response.headers.set("X-Robots-Tag", noindexHeader);
  }
  return response;
}

/** Site-wide HTTP Basic Auth when SITE_PASSWORD is set. Node proxy (not Edge middleware) so Vercel source deploys work. */
export function proxy(request: NextRequest) {
  const password = process.env.SITE_PASSWORD;
  if (!password) {
    return NextResponse.next();
  }

  if (authorized(request.headers.get("authorization"), password)) {
    return withRobots(NextResponse.next(), true);
  }

  return withRobots(
    new NextResponse("Authentication required.", {
      status: 401,
      headers: {
        "WWW-Authenticate": 'Basic realm="TwoSuns", charset="UTF-8"',
        "Cache-Control": "no-store",
      },
    }),
    true
  );
}
