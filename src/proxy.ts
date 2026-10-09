import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { GATE_COOKIE, gateToken, passwordsMatch } from "@/lib/gate"
import { noindexHeader } from "@/lib/indexing"

function withRobots(response: NextResponse, gated: boolean) {
  if (gated) {
    response.headers.set("X-Robots-Tag", noindexHeader)
  }
  response.headers.set("Cache-Control", "no-store")
  return response
}

function isOpenPath(pathname: string) {
  if (pathname === "/construction" || pathname === "/api/unlock") return true
  if (pathname.startsWith("/_next/")) return true
  return (
    pathname === "/twosuns-wordmark.png" ||
    pathname === "/favicon.ico" ||
    pathname === "/favicon.svg" ||
    pathname === "/favicon.png" ||
    pathname === "/favicon-32.png" ||
    pathname === "/favicon-48.png" ||
    pathname === "/apple-touch-icon.png" ||
    pathname === "/og.jpg" ||
    pathname === "/robots.txt"
  )
}

function hasGateCookie(request: NextRequest, password: string) {
  const token = request.cookies.get(GATE_COOKIE)?.value
  if (!token) return false
  return passwordsMatch(token, gateToken(password))
}

/**
 * When SITE_PASSWORD is set, the house stays private. Visitors get the
 * under-construction page — never a browser Basic Auth prompt.
 */
export function proxy(request: NextRequest) {
  const password = process.env.SITE_PASSWORD
  if (!password) {
    return NextResponse.next()
  }

  if (hasGateCookie(request, password)) {
    return withRobots(NextResponse.next(), true)
  }

  if (isOpenPath(request.nextUrl.pathname)) {
    return withRobots(NextResponse.next(), true)
  }

  const accept = request.headers.get("accept") ?? ""
  if (request.method === "GET" && accept.includes("text/html")) {
    return withRobots(
      NextResponse.redirect(new URL("/construction", request.url)),
      true
    )
  }

  return withRobots(
    NextResponse.json({ error: "The house is closed." }, { status: 401 }),
    true
  )
}

export const config = {
  matcher: ["/((?!_next/static|_next/image).*)"],
}
