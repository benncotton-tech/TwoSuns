import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { DualRule } from "@/components/dual-sun"
import { Wordmark } from "@/components/wordmark"
import { GATE_COOKIE, gateToken, passwordsMatch } from "@/lib/gate"
import { site } from "@/lib/site"

export const dynamic = "force-dynamic"

export const metadata = {
  title: "TwoSuns",
  description: "The house is still being built. Stockholm.",
}

export default async function ConstructionPage({
  searchParams,
}: {
  searchParams: Promise<{ err?: string }>
}) {
  const password = process.env.SITE_PASSWORD
  if (!password) {
    redirect("/")
  }

  const token = (await cookies()).get(GATE_COOKIE)?.value
  if (token && passwordsMatch(token, gateToken(password))) {
    redirect("/")
  }

  const { err } = await searchParams
  const failed = err === "1"

  return (
    <div className="flex min-h-dvh flex-col items-center justify-center bg-ink px-6 py-16 text-center">
      <h1 className="sr-only">TwoSuns</h1>
      <Wordmark
        priority
        className="h-auto w-full max-w-[17rem] sm:max-w-[20rem]"
      />
      <DualRule className="mt-10" />
      <p className="mt-8 text-[0.7rem] uppercase tracking-[0.32em] text-gold">
        Under construction
      </p>
      <p className="mt-5 max-w-sm font-heading text-3xl leading-[1.1] text-cream sm:text-4xl">
        The house is still being built.
      </p>
      <p className="mt-4 max-w-sm text-sm leading-relaxed text-silver">
        Huset är inte öppet än. Stockholm. Write to{" "}
        <a href={`mailto:${site.email}`} className="text-cream hover:text-gold">
          {site.email}
        </a>{" "}
        if you need us.
      </p>

      <form
        method="post"
        action="/api/unlock"
        className="mt-16 w-full max-w-xs text-left"
      >
        <label
          htmlFor="house-key"
          className="text-[0.65rem] uppercase tracking-[0.22em] text-silver"
        >
          House
        </label>
        <input
          id="house-key"
          name="password"
          type="password"
          autoComplete="current-password"
          className="mt-2 h-11 w-full border border-cream/20 bg-transparent px-3 text-sm text-cream outline-none"
        />
        {failed ? (
          <p className="mt-3 text-sm text-cream/80" role="alert">
            That is not the key.
          </p>
        ) : null}
        <button
          type="submit"
          className="mt-5 inline-flex h-11 w-full items-center justify-center border border-cream/30 text-[0.7rem] uppercase tracking-[0.28em] text-cream hover:border-gold hover:text-gold"
        >
          Enter
        </button>
      </form>
    </div>
  )
}
