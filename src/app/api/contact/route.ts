import { NextResponse } from "next/server"
import { inquiryLanes } from "@/lib/site"

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const allowedInquiry = new Set<string>(inquiryLanes.map((lane) => lane.value))

export async function POST(request: Request) {
  await new Promise((resolve) => setTimeout(resolve, 700))

  let body: unknown
  try {
    body = await request.json()
  } catch {
    return NextResponse.json(
      { error: "The letter never arrived intact." },
      { status: 400 }
    )
  }

  if (!body || typeof body !== "object") {
    return NextResponse.json({ error: "Nothing to read." }, { status: 400 })
  }

  const { name, email, company, inquiry, message } = body as Record<
    string,
    unknown
  >

  if (typeof name !== "string" || !name.trim()) {
    return NextResponse.json({ error: "A name is required." }, { status: 400 })
  }
  if (typeof email !== "string" || !emailPattern.test(email.trim())) {
    return NextResponse.json({ error: "That email is not usable." }, { status: 400 })
  }
  if (typeof inquiry !== "string" || !allowedInquiry.has(inquiry)) {
    return NextResponse.json({ error: "Choose a lane." }, { status: 400 })
  }
  if (typeof message !== "string" || message.trim().length < 20) {
    return NextResponse.json(
      { error: "Give the desk a little more to go on." },
      { status: 400 }
    )
  }
  if (company !== undefined && typeof company !== "string") {
    return NextResponse.json({ error: "Company must be text." }, { status: 400 })
  }

  return NextResponse.json({ ok: true })
}
