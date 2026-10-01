"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { XIcon } from "lucide-react"
import { DeskBurnIn } from "@/components/landing/desk-burn-in"
import { Wordmark } from "@/components/wordmark"
import { showreelFilms, type Film } from "@/lib/films"

type Short = Film & { reel: string }

export function CinematicLanding() {
  const shorts = showreelFilms()
  const [watching, setWatching] = useState<Short | null>(null)

  useEffect(() => {
    if (!watching) return
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setWatching(null)
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [watching])

  return (
    <div className="bg-ink">
      <section className="flex min-h-[100dvh] flex-col">
        <div className="flex flex-1 flex-col items-center justify-center px-6 text-center">
          <p className="text-[0.7rem] uppercase tracking-[0.42em] text-gold">
            Boutique film production
          </p>
          <div className="mt-10 w-[min(94vw,42rem)] sm:w-[min(88vw,40rem)]">
            <Wordmark priority />
          </div>
          <p className="mt-8 max-w-md text-sm leading-relaxed text-silver">
            Two founders · Stockholm
          </p>
        </div>
      </section>

      <section className="border-t border-cream/10 px-4 pb-[max(3rem,env(safe-area-inset-bottom))] sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 pt-8 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-[0.65rem] uppercase tracking-[0.28em] text-gold">
              The last four
            </p>
            <p className="mt-2 max-w-sm text-sm text-silver">
              Click a title to watch.
            </p>
          </div>
          <DeskBurnIn className="hidden text-[0.6rem] uppercase tracking-[0.16em] text-silver lg:block" />
        </div>

        <ul className="mx-auto mt-10 grid max-w-6xl gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {shorts.map((film) => (
            <li key={film.slug}>
              <button
                type="button"
                onClick={() => setWatching(film)}
                className="group w-full text-left"
              >
                <div className="relative aspect-video overflow-hidden border border-cream/10 bg-black">
                  <Image
                    src={film.poster}
                    alt=""
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover transition duration-500 group-hover:scale-[1.03]"
                  />
                </div>
                <p className="mt-3 text-[0.7rem] uppercase tracking-[0.2em] text-cream group-hover:text-gold">
                  {film.title}
                </p>
                <p className="mt-1 text-[0.65rem] uppercase tracking-[0.18em] text-silver">
                  {film.year} · {film.location}
                </p>
              </button>
            </li>
          ))}
        </ul>
      </section>

      {watching ? (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <button
            type="button"
            className="absolute inset-0 bg-black/88"
            aria-label="Close film"
            onClick={() => setWatching(null)}
          />
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="watch-title"
            className="relative z-[1] w-[min(100%,52rem)] bg-ink"
          >
            <button
              type="button"
              className="absolute top-2 right-2 z-[2] inline-flex size-10 items-center justify-center text-cream"
              aria-label="Close film"
              onClick={() => setWatching(null)}
            >
              <XIcon className="size-5" />
            </button>
            <div className="aspect-video bg-black">
              <video
                key={watching.slug}
                src={watching.reel}
                poster={watching.poster}
                autoPlay
                controls
                playsInline
                className="h-full w-full object-cover"
              />
            </div>
            <div className="px-5 py-5">
              <p className="text-[0.65rem] uppercase tracking-[0.28em] text-gold">
                {watching.year} · {watching.location}
              </p>
              <h2 id="watch-title" className="mt-2 font-heading text-3xl text-cream">
                {watching.title}
              </h2>
              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-silver">
                {watching.logline}
              </p>
              <Link
                href={`/work/${watching.slug}`}
                className="mt-5 inline-block text-[0.7rem] uppercase tracking-[0.22em] text-gold hover:text-cream"
              >
                On the slate
              </Link>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  )
}
