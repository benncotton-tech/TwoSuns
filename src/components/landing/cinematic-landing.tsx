"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Volume2Icon, VolumeXIcon, XIcon } from "lucide-react"
import { DeskBurnIn } from "@/components/landing/desk-burn-in"
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

  const gold = shorts[index]
  const silver = shorts[(index + 1) % Math.max(shorts.length, 1)]

  useEffect(() => {
    if (reduceMotion) return
    const id = window.setInterval(() => {
      setIndex((current) => (current + 1) % shorts.length)
    }, 8000)
    return () => window.clearInterval(id)
  }, [reduceMotion, shorts.length])

  useEffect(() => {
    nodes.current.forEach((video, i) => {
      if (!video) return
      const on = i === index || i === (index + 1) % shorts.length
      video.muted = muted
      try {
        video.volume =
          i === index && !muted
            ? 0.85
            : i === (index + 1) % shorts.length && !muted
              ? 0.28
              : 0
      } catch {
        /* iOS ignores volume */
      }
      if (reduceMotion || watching) {
        video.pause()
        return
      }
      if (on) {
        const play = video.play()
        if (play) play.catch(() => undefined)
      } else {
        video.pause()
      }
    })
  }, [index, muted, reduceMotion, shorts.length, watching])

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
      <div className="landing-blackout" aria-hidden />
      <div className="pointer-events-none absolute inset-0 z-[1] bg-[radial-gradient(ellipse_at_center,rgba(187,169,123,0.16),transparent_55%)] landing-lamp" />

      <div className="absolute inset-0 z-0">
        {shorts.map((film, i) => {
          const isGold = film.slug === gold?.slug
          const isSilver = film.slug === silver?.slug
          const visible = isGold || isSilver
          return (
            <div
              key={film.slug}
              className={cn(
                "projector-frame",
                isGold && "projector-gold",
                isSilver && "projector-silver",
                !visible && "pointer-events-none opacity-0"
              )}
            >
              {reduceMotion ? (
                <Image
                  src={film.poster}
                  alt=""
                  fill
                  priority={visible}
                  className="object-cover"
                  sizes="80vw"
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
                  preload="auto"
                  className="h-full w-full object-cover"
                />
              )}
              <span className="sr-only">{film.title}</span>
            </div>
          )
        })}
      </div>

      <div className="landing-logo pointer-events-none absolute inset-0 z-10 flex items-center justify-center px-4">
        <div
          className={cn(
            "w-[min(92vw,48rem)] drop-shadow-[0_12px_40px_rgba(0,0,0,0.85)]",
            !muted && !reduceMotion && "landing-sound-glow"
          )}
        >
          <Image
            src="/twosuns-logo.png"
            alt="TwoSuns"
            width={941}
            height={420}
            priority
            className="h-auto w-full"
          />
        </div>
      </div>

      <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-10 bg-ink sm:h-12" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-10 bg-ink sm:h-12" />

      <div className="landing-ui pointer-events-none absolute inset-0 z-20 flex flex-col justify-between px-4 pb-[max(1.25rem,env(safe-area-inset-bottom))] pt-20 sm:px-6 lg:px-8">
        <p className="pointer-events-none text-center text-[0.65rem] uppercase tracking-[0.42em] text-gold/80">
          Four shorts · Two hemispheres
        </p>

        <div className="pointer-events-auto flex flex-col gap-4">
          <div className="flex items-end justify-between gap-4">
            <button
              type="button"
              onClick={() => setMuted((value) => !value)}
              className={cn(
                "inline-flex h-11 items-center gap-2 px-3 text-[0.65rem] uppercase tracking-[0.22em] text-cream hover:bg-cream/10",
                reduceMotion && "opacity-50"
              )}
              disabled={reduceMotion}
              aria-pressed={!muted}
              aria-label={muted ? "Unmute showreel" : "Mute showreel"}
            >
              {muted ? <VolumeXIcon className="size-4" /> : <Volume2Icon className="size-4" />}
              <span className="hidden sm:inline">{muted ? "Sound up" : "Sound down"}</span>
            </button>
            <DeskBurnIn className="flex flex-col items-end gap-1 text-[0.6rem] uppercase tracking-[0.18em] sm:flex-row sm:gap-5" />
          </div>

          <ol className="grid grid-cols-2 gap-2 sm:grid-cols-4">
            {shorts.map((film, i) => {
              const active = film.slug === gold?.slug || film.slug === silver?.slug
              return (
                <li key={film.slug}>
                  <button
                    type="button"
                    onClick={() => {
                      setIndex(i)
                      setWatching(film)
                    }}
                    className={cn(
                      "group flex w-full items-stretch gap-2 border px-2 py-2 text-left transition sm:px-3",
                      active
                        ? "border-gold/70 bg-gold/10"
                        : "border-cream/15 bg-ink/50 hover:border-cream/35"
                    )}
                  >
                    <span className="relative hidden aspect-[3/4] w-8 shrink-0 overflow-hidden sm:block">
                      <Image src={film.poster} alt="" fill className="object-cover" sizes="32px" />
                    </span>
                    <span>
                      <span className="block font-mono text-[0.6rem] text-gold">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="block font-heading text-sm text-cream group-hover:text-gold sm:text-base">
                        {film.title}
                      </span>
                      <span className="block text-[0.6rem] uppercase tracking-[0.16em] text-silver">
                        {film.year} · {film.desk}
                      </span>
                    </span>
                  </button>
                </li>
              )
            })}
          </ol>
        </div>
      </div>

      {watching ? (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <button
            type="button"
            className="absolute inset-0 bg-black/85"
            aria-label="Close film"
            onClick={() => setWatching(null)}
          />
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="watch-title"
            className="relative z-[1] w-[min(100%,56rem)] border border-cream/20 bg-ink"
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
                className="mt-4 inline-flex h-10 items-center bg-gold px-5 text-[0.65rem] uppercase tracking-[0.22em] text-ink"
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
