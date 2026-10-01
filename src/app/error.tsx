"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function GlobalError({
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div className="mx-auto flex w-full max-w-xl flex-col items-start px-4 py-24 sm:px-6">
      <p className="text-[0.7rem] uppercase tracking-[0.32em] text-gold">
        Fault
      </p>
      <h1 className="mt-4 font-heading text-4xl text-cream">The projector stopped.</h1>
      <p className="mt-4 text-sm leading-relaxed text-silver">
        Something in the house failed. Try again, or leave and come back
        through the front.
      </p>
      <div className="mt-8 flex flex-wrap gap-3">
        <Button
          type="button"
          onClick={reset}
          className="h-11 rounded-none bg-gold px-6 text-[0.7rem] uppercase tracking-[0.28em] text-ink"
        >
          Try again
        </Button>
        <Button
          nativeButton={false}
          variant="outline"
          render={<Link href="/" />}
          className="h-11 rounded-none border-cream/30 px-6 text-[0.7rem] uppercase tracking-[0.28em] text-cream"
        >
          Home
        </Button>
      </div>
    </div>
  )
}
