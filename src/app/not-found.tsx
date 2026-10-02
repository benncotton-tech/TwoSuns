import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function NotFound() {
  return (
    <div className="mx-auto flex w-full max-w-xl flex-1 flex-col justify-center px-4 py-24 sm:px-6">
      <p className="text-[0.7rem] uppercase tracking-[0.32em] text-gold">404</p>
      <h1 className="mt-4 font-heading text-5xl text-cream">This reel is missing.</h1>
      <p className="mt-4 text-sm leading-relaxed text-silver">
        The frame you asked for is not on the slate. It may have never been
        shot. Go back to the house, or look at the work that exists.
      </p>
      <div className="mt-8 flex flex-wrap gap-3">
        <Button
          nativeButton={false}
          render={<Link href="/" />}
          className="h-11 rounded-none bg-gold px-6 text-[0.7rem] uppercase tracking-[0.28em] text-ink"
        >
          Home
        </Button>
        <Button
          nativeButton={false}
          variant="outline"
          render={<Link href="/#work" />}
          className="h-11 rounded-none border-cream/30 px-6 text-[0.7rem] uppercase tracking-[0.28em] text-cream"
        >
          Work
        </Button>
      </div>
    </div>
  )
}
