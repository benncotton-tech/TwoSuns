"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Volume2Icon, VolumeXIcon } from "lucide-react"
import { DeskBurnIn } from "@/components/landing/desk-burn-in"
import { Wordmark } from "@/components/wordmark"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
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
  const silver = shorts[(index + 1) % shorts.length]

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

  function watch(film: Short) {
    setWatching(film)
  }

  return (
    <section className="relative h-[100dvh] min-h-[100dvh] overflow-hidden bg-ink">
      <div className="landing-blackout" aria-hidden />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(187,169,123,0.16),transparent_55%)] landing-lamp" />

      <div className="absolute inset-0">
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

      <div className="landing-logo pointer-events-none absolute inset-0 flex items-center justify-center px-4">
        <div
          className={cn(
            "w-[min(92vw,44rem)]",
            !muted && !reduceMotion && "landing-sound-glow"
          )}
        >
          <Wordmark priority />
        </div>
      </div>

      <div className="pointer-events-none absolute inset-x-0 top-0 h-10 bg-ink sm:h-12" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-10 bg-ink sm:h-12" />

      <div className="landing-ui pointer-events-none absolute inset-0 z-20 flex flex-col justify-between px-4 pb-[max(1.25rem,env(safe-area-inset-bottom))] pt-20 sm:px-6 lg:px-8">
        <p className="pointer-events-none text-center text-[0.65rem] uppercase tracking-[0.42em] text-gold/80">
          Four shorts · Two hemispheres
        </p>

        <div className="pointer-events-auto flex flex-col gap-4">
          <div className="flex items-end justify-between gap-4">
            <Button
              type="button"
              variant="ghost"
              onClick={() => setMuted((value) => !value)}
              className={cn(
                "h-11 rounded-none px-3 text-[0.65rem] uppercase tracking-[0.22em] text-cream hover:bg-cream/10",
                reduceMotion && "opacity-50"
              )}
              disabled={reduceMotion}
              aria-pressed={!muted}
              aria-label={muted ? "Unmute showreel" : "Mute showreel"}
            >
              {muted ? <VolumeXIcon className="size-4" /> : <Volume2Icon className="size-4" />}
              <span className="ml-2 hidden sm:inline">{muted ? "Sound up" : "Sound down"}</span>
            </Button>
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
                      watch(film)
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

      <Dialog open={Boolean(watching)} onOpenChange={(open) => !open && setWatching(null)}>
        <DialogContent
          className="max-h-[min(100dvh,52rem)] w-[min(100%,56rem)] max-w-none rounded-none border-cream/20 bg-ink p-0 ring-cream/15 sm:max-w-none"
          overlayClassName="bg-black/80"
        >
          {watching ? (
            <WatchPane film={watching} muted={muted} />
          ) : null}
        </DialogContent>
      </Dialog>
    </section>
  )
}

function WatchPane({ film, muted }: { film: Short; muted: boolean }) {
  return (
    <div>
      <div className="aspect-video bg-black">
        <video
          key={film.slug}
          src={film.reel}
          poster={film.poster}
          autoPlay
          controls
          playsInline
          muted={muted}
          className="h-full w-full object-cover"
        />
      </div>
      <DialogHeader className="gap-2 px-5 py-5">
        <p className="text-[0.65rem] uppercase tracking-[0.28em] text-gold">
          {film.year} · {film.location}
        </p>
        <DialogTitle className="font-heading text-3xl text-cream">
          {film.title}
        </DialogTitle>
        <DialogDescription className="max-w-2xl text-sm leading-relaxed text-silver">
          {film.logline}
        </DialogDescription>
        <Button
          nativeButton={false}
          render={<Link href={`/work/${film.slug}`} />}
          className="mt-2 h-10 w-fit rounded-none bg-gold px-5 text-[0.65rem] uppercase tracking-[0.22em] text-ink"
        >
          On the slate
        </Button>
      </DialogHeader>
    </div>
  )
}
