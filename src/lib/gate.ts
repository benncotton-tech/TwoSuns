import { createHmac } from "node:crypto"

export const GATE_COOKIE = "twosuns_gate"
export const GATE_MAX_AGE = 60 * 60 * 24 * 30

export function passwordsMatch(provided: string, expected: string): boolean {
  const enc = new TextEncoder()
  const a = enc.encode(provided)
  const b = enc.encode(expected)
  const max = Math.max(a.length, b.length)
  let diff = a.length ^ b.length
  for (let i = 0; i < max; i++) {
    diff |= (a[i] ?? 0) ^ (b[i] ?? 0)
  }
  return diff === 0
}

export function gateToken(password: string) {
  return createHmac("sha256", password).update("twosuns.gate.v1").digest("hex")
}

export function gateCookieOptions(secure: boolean) {
  return {
    httpOnly: true,
    secure,
    sameSite: "lax" as const,
    path: "/",
    maxAge: GATE_MAX_AGE,
  }
}
