"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Volume2Icon, VolumeXIcon, XIcon } from "lucide-react"
import { DeskBurnIn } from "@/components/landing/desk-burn-in"
import { Wordmark } from "@/components/wordmark"
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion"
import { showreelFilms, type Film } from "@/lib/films"
import { cn } from "@/lib/utils"

type Short = Film & { reel: string }

export function CinematicLanding() {
  const shorts = showreelFilms()
  const reduceMotion = usePrefersReducedMotion()
  const [index, setIndex] = useState(0)
  const [muted, setMuted] = useState(true)
  const [watching, setWatching] = useState<Short | null>(null)
  const nodes = useRef<(HTMLVideoElement | null)[]>([])
  const current = shorts[index]

  useEffect(() => {
    if (reduceMotion || watching) return
    const id = window.setInterval(() => {
      setIndex((value) => (value + 1) % shorts.length)
    }, 11000)
    return () => window.clearInterval(id)
  }, [reduceMotion, watching, shorts.length])

  useEffect(() => {
    nodes.current.forEach((video, i) => {
      if (!video) return
      video.muted = muted
      if (reduceMotion || watching) {
        video.pause()
        return
      }
      if (i === index) {
        const play = video.play()
        if (play) play.catch(() => undefined)
      } else {
        video.pause()
      }
    })
  }, [index, muted, reduceMotion, watching])

  useEffect(() => {
    if (!watching) return
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setWatching(null)
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [watching])

  return (
    <section className="relative h-[100dvh] min-h-[100dvh] overflow-hidden bg-ink">
      <div className="absolute inset-0">
        {shorts.map((film, i) => {
          const on = i === index
          return (
            <div
              key={film.slug}
              className={cn(
                "absolute inset-0 transition-opacity duration-1000",
                on ? "opacity-100" : "opacity-0"
              )}
            >
              {reduceMotion ? (
                <Image
                  src={film.poster}
                  alt=""
                  fill
                  priority={on}
                  className="object-cover"
                  sizes="100vw"
                />
              ) : (
                <video
                  ref={(node) => {
                    nodes.current[i] = node
                  }}
                  src={film.reel}
                  poster={film.poster}
                  playsInline
                  loop
                  muted
                  preload={on ? "auto" : "metadata"}
                  className="h-full w-full object-cover"
                />
              )}
            </div>
          )
        })}
      </div>

      <div
        className="pointer-events-none absolute inset-0 bg-ink/30"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-ink/80 via-ink/10 to-ink/88"
        aria-hidden
      />

      <div className="relative z-10 flex h-full flex-col">
        <div className="flex flex-1 flex-col items-center justify-center px-6 text-center">
          <p className="text-[0.7rem] uppercase tracking-[0.42em] text-gold">
            Boutique film production
          </p>
          <div className="mt-8 w-[min(94vw,42rem)] sm:w-[min(88vw,40rem)]">
            <Wordmark priority inFrame />
          </div>
          {current ? (
            <p className="mt-8 max-w-md text-sm leading-relaxed text-silver">
              Los Angeles · Stockholm · Melbourne
            </p>
          ) : null}
        </div>

        <div className="px-4 pb-[max(1.25rem,env(safe-area-inset-bottom))] sm:px-6 lg:px-8">
          <div className="mx-auto flex max-w-6xl flex-col gap-4 border-t border-cream/10 pt-4 sm:flex-row sm:items-end sm:justify-between">
            <button
              type="button"
              onClick={() => setMuted((value) => !value)}
              disabled={reduceMotion}
              aria-pressed={!muted}
              aria-label={muted ? "Unmute showreel" : "Mute showreel"}
              className={cn(
                "inline-flex h-9 items-center gap-2 text-[0.65rem] uppercase tracking-[0.22em] text-silver hover:text-cream",
                reduceMotion && "opacity-40"
              )}
            >
              {muted ? (
                <VolumeXIcon className="size-3.5" />
              ) : (
                <Volume2Icon className="size-3.5" />
              )}
              {muted ? "Sound" : "Mute"}
            </button>

            <ul className="flex flex-wrap gap-x-5 gap-y-2">
              {shorts.map((film, i) => (
                <li key={film.slug}>
                  <button
                    type="button"
                    onClick={() => {
                      setIndex(i)
                      setWatching(film)
                    }}
                    className={cn(
                      "text-left text-[0.7rem] uppercase tracking-[0.2em] transition-colors",
                      i === index ? "text-cream" : "text-silver/70 hover:text-cream"
                    )}
                  >
                    {film.title}
                  </button>
                </li>
              ))}
            </ul>

            <DeskBurnIn className="hidden gap-4 text-[0.6rem] uppercase tracking-[0.16em] text-silver lg:flex" />
          </div>
        </div>
      </div>

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
    </section>
  )
}
