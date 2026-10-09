import { NextResponse } from "next/server"
import {
  GATE_COOKIE,
  gateCookieOptions,
  gateToken,
  passwordsMatch,
} from "@/lib/gate"
import { noindexHeader } from "@/lib/indexing"

function lockedRedirect(request: Request, failed: boolean) {
  const url = new URL(failed ? "/construction?err=1" : "/construction", request.url)
  const response = NextResponse.redirect(url, 303)
  response.headers.set("X-Robots-Tag", noindexHeader)
  response.headers.set("Cache-Control", "no-store")
  return response
}

export async function POST(request: Request) {
  const password = process.env.SITE_PASSWORD
  if (!password) {
    return NextResponse.redirect(new URL("/", request.url), 303)
  }

  let provided = ""
  const contentType = request.headers.get("content-type") ?? ""
  try {
    if (contentType.includes("application/json")) {
      const body = (await request.json()) as { password?: unknown }
      provided = typeof body.password === "string" ? body.password : ""
    } else {
      const form = await request.formData()
      const value = form.get("password")
      provided = typeof value === "string" ? value : ""
    }
  } catch {
    return lockedRedirect(request, true)
  }

  if (!passwordsMatch(provided, password)) {
    return lockedRedirect(request, true)
  }

  const response = NextResponse.redirect(new URL("/", request.url), 303)
  response.cookies.set(
    GATE_COOKIE,
    gateToken(password),
    gateCookieOptions(request.url.startsWith("https:"))
  )
  response.headers.set("X-Robots-Tag", noindexHeader)
  response.headers.set("Cache-Control", "no-store")
  return response
}

export function GET(request: Request) {
  return lockedRedirect(request, false)
}
