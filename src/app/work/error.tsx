"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function WorkError({
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div className="mx-auto flex w-full max-w-xl flex-col items-start px-4 py-24 sm:px-6">
      <p className="text-[0.7rem] uppercase tracking-[0.32em] text-gold">
        Projection fault
      </p>
      <h1 className="mt-4 font-heading text-4xl text-cream">The slate would not load.</h1>
      <p className="mt-4 text-sm leading-relaxed text-silver">
        The reel jammed on the way in. Try again, or go back to the house.
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
