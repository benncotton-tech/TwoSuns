"use client"

import Link from "next/link"
import { useEffect } from "react"
import { bindResumeRecovery } from "@/lib/recover-on-resume"

export function FaultScreen({
  kicker = "Fault",
  title,
  copy,
  reset,
  homeHref = "/",
  homeLabel = "Home",
}: {
  kicker?: string
  title: string
  copy: string
  reset: () => void
  homeHref?: string
  homeLabel?: string
}) {
  useEffect(() => bindResumeRecovery(reset), [reset])

  return (
    <div className="mx-auto flex w-full max-w-xl flex-col items-start px-4 py-24 sm:px-6">
      <p className="text-[0.7rem] uppercase tracking-[0.32em] text-gold">{kicker}</p>
      <h1 className="mt-4 font-heading text-4xl text-cream">{title}</h1>
      <p className="mt-4 text-sm leading-relaxed text-silver">{copy}</p>
      <div className="mt-8 flex flex-wrap gap-3">
        <button
          type="button"
          onClick={reset}
          className="inline-flex h-11 items-center bg-gold px-6 text-[0.7rem] uppercase tracking-[0.28em] text-ink"
        >
          Try again
        </button>
        <Link
          href={homeHref}
          className="inline-flex h-11 items-center border border-cream/30 px-6 text-[0.7rem] uppercase tracking-[0.28em] text-cream"
        >
          {homeLabel}
        </Link>
      </div>
    </div>
  )
}
