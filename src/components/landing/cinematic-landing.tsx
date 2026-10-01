"use client"

import { useEffect, useRef, useState } from "react"
import { createPortal } from "react-dom"
import Image from "next/image"
import Link from "next/link"
import { Volume2Icon, VolumeXIcon, XIcon } from "lucide-react"
import { DeskBurnIn } from "@/components/landing/desk-burn-in"
import { Wordmark } from "@/components/wordmark"
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion"
import { cn } from "@/lib/utils"

const REEL = "/landing/reel.mp4"
const POSTER = "/landing/poster.jpg"

export function CinematicLanding() {
  const reduceMotion = usePrefersReducedMotion()
  const [muted, setMuted] = useState(true)
  const [watching, setWatching] = useState(false)
  const node = useRef<HTMLVideoElement | null>(null)

  useEffect(() => {
    const video = node.current
    if (!video) return
    video.muted = muted
    if (reduceMotion || watching) {
      video.pause()
      return
    }
    const play = video.play()
    if (play) play.catch(() => undefined)
  }, [muted, reduceMotion, watching])

  useEffect(() => {
    if (!watching) return
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setWatching(false)
    }
    window.addEventListener("keydown", onKey)
    const previous = document.body.style.overflow
    document.body.style.overflow = "hidden"
    return () => {
      window.removeEventListener("keydown", onKey)
      document.body.style.overflow = previous
    }
  }, [watching])

  const watcher = watching
    ? createPortal(
        <ShowreelWatcher onClose={() => setWatching(false)} />,
        document.body
      )
    : null

  return (
    <section className="relative h-[100dvh] min-h-[100dvh] overflow-hidden bg-ink">
      <div className="pointer-events-none absolute inset-0">
        {reduceMotion ? (
          <Image
            src={POSTER}
            alt=""
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
        ) : (
          <video
            ref={node}
            src={REEL}
            poster={POSTER}
            playsInline
            loop
            muted
            preload="auto"
            className="h-full w-full object-cover"
          />
        )}
      </div>

      <div className="pointer-events-none absolute inset-0 bg-ink/40" aria-hidden />

      <div className="relative z-10 flex h-full flex-col">
        <div className="pointer-events-none flex flex-1 flex-col items-center justify-center px-4 text-center sm:px-6">
          <div className="w-[min(96vw,86rem)]">
            <Wordmark priority />
          </div>
        </div>

        <div className="relative z-50 px-4 pb-[max(1.25rem,env(safe-area-inset-bottom))] sm:px-6 lg:px-8">
          <div className="mx-auto flex max-w-6xl flex-col gap-3 border-t border-cream/10 pt-3 sm:flex-row sm:items-end sm:justify-between">
            <button
              type="button"
              onClick={() => setMuted((value) => !value)}
              aria-pressed={!muted}
              aria-label={muted ? "Unmute showreel" : "Mute showreel"}
              className={cn(
                "inline-flex h-11 cursor-pointer items-center gap-2 text-[0.65rem] uppercase tracking-[0.22em] text-silver hover:text-cream"
              )}
            >
              {muted ? (
                <VolumeXIcon className="size-3.5" />
              ) : (
                <Volume2Icon className="size-3.5" />
              )}
              {muted ? "Sound" : "Mute"}
            </button>

            <button
              type="button"
              onClick={() => setWatching(true)}
              className="inline-flex h-11 cursor-pointer items-center text-[0.7rem] uppercase tracking-[0.2em] text-cream hover:text-gold"
            >
              Showreel
            </button>

            <DeskBurnIn className="hidden h-11 items-center text-[0.6rem] uppercase tracking-[0.16em] text-silver lg:flex" />
          </div>
        </div>
      </div>

      {watcher}
    </section>
  )
}

function ShowreelWatcher({ onClose }: { onClose: () => void }) {
  const [armed, setArmed] = useState(false)

  useEffect(() => {
    const id = window.setTimeout(() => setArmed(true), 50)
    return () => window.clearTimeout(id)
  }, [])

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
      <button
        type="button"
        className="absolute inset-0 bg-black/88"
        aria-label="Close film"
        onClick={() => {
          if (armed) onClose()
        }}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="watch-title"
        className="relative z-[1] w-[min(100%,52rem)] bg-ink"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          className="absolute top-2 right-2 z-[2] inline-flex size-11 cursor-pointer items-center justify-center text-cream"
          aria-label="Close film"
          onClick={onClose}
        >
          <XIcon className="size-5" />
        </button>
        <div className="aspect-video bg-black">
          <video
            src={REEL}
            poster={POSTER}
            autoPlay
            controls
            playsInline
            className="h-full w-full object-cover"
          />
        </div>
        <div className="px-5 py-5">
          <p className="text-[0.65rem] uppercase tracking-[0.28em] text-gold">
            Stockholm
          </p>
          <h2 id="watch-title" className="mt-2 font-heading text-3xl text-cream">
            Showreel
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-silver">
            Pictures from the house. Mute stays on until you ask for sound.
          </p>
          <Link
            href="/work"
            className="mt-5 inline-block text-[0.7rem] uppercase tracking-[0.22em] text-gold hover:text-cream"
          >
            On the slate
          </Link>
        </div>
      </div>
    </div>
  )
}
