"use client"

import { useEffect, useRef, useState } from "react"
import { createPortal } from "react-dom"
import Image from "next/image"
import Link from "next/link"
import { Volume2Icon, VolumeXIcon, XIcon } from "lucide-react"
import { DeskBurnIn } from "@/components/landing/desk-burn-in"
import { Wordmark } from "@/components/wordmark"
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion"
import {
  backgroundPlayerSrc,
  reel,
  watchPlayerSrc,
} from "@/lib/reel"
import { cn } from "@/lib/utils"

type VimeoPlayer = {
  ready: () => Promise<void>
  play: () => Promise<void>
  pause: () => Promise<void>
  setMuted: (muted: boolean) => Promise<void>
  setVolume: (volume: number) => Promise<void>
  destroy: () => Promise<void>
}

declare global {
  interface Window {
    __twosunsOnSound?: (soundOn: boolean) => void
    __twosunsSoundBound?: boolean
  }
}

export function CinematicLanding() {
  const reduceMotion = usePrefersReducedMotion()
  const [muted, setMuted] = useState(true)
  const [watching, setWatching] = useState(false)
  const iframeRef = useRef<HTMLIFrameElement | null>(null)
  const playerRef = useRef<VimeoPlayer | null>(null)

  useEffect(() => {
    window.__twosunsOnSound = (soundOn: boolean) => {
      setMuted(!soundOn)
    }
    return () => {
      delete window.__twosunsOnSound
    }
  }, [])

  useEffect(() => {
    if (reduceMotion) return
    const iframe = iframeRef.current
    if (!iframe) return
    let player: VimeoPlayer | null = null
    let cancelled = false

    void import("@vimeo/player").then(({ default: Player }) => {
      if (cancelled || !iframeRef.current) return
      player = new Player(iframeRef.current) as unknown as VimeoPlayer
      playerRef.current = player
      player.ready().then(() => {
        if (cancelled) return
        player?.setMuted(true).catch(() => undefined)
        player?.play().catch(() => undefined)
      })
    })

    return () => {
      cancelled = true
      player?.destroy().catch(() => undefined)
      playerRef.current = null
    }
  }, [reduceMotion])

  useEffect(() => {
    const player = playerRef.current
    if (!player) return
    player.setMuted(muted).catch(() => undefined)
    if (!muted) player.setVolume(1).catch(() => undefined)
    if (watching) player.pause().catch(() => undefined)
    else player.play().catch(() => undefined)
  }, [muted, watching])

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

  return (
    <section className="relative h-[100dvh] min-h-[100dvh] overflow-hidden bg-ink">
      {reduceMotion ? (
        <div className="pointer-events-none absolute inset-0">
          <Image
            src={reel.poster}
            alt=""
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
        </div>
      ) : (
        <div className="vimeo-cover">
          <iframe
            ref={iframeRef}
            data-landing-reel="true"
            src={backgroundPlayerSrc}
            title={reel.title}
            allow="autoplay; fullscreen; picture-in-picture; encrypted-media"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          />
        </div>
      )}

      <div className="pointer-events-none absolute inset-0 bg-ink/40" aria-hidden />

      <div className="pointer-events-none relative z-10 flex h-full flex-col">
        <div className="flex flex-1 flex-col items-center justify-center px-4 text-center sm:px-6">
          <div className="w-[min(82vw,64rem)]">
            <Wordmark priority />
          </div>
        </div>
      </div>

      <div className="pointer-events-auto absolute inset-x-0 bottom-0 z-50 px-4 pb-[max(1.25rem,env(safe-area-inset-bottom))] sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 border-t border-cream/10 pt-3 sm:flex-row sm:items-end sm:justify-between">
          <button
            type="button"
            data-sound-toggle="true"
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
            <span data-sound-label>{muted ? "Sound" : "Mute"}</span>
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

      {watching
        ? createPortal(
            <ShowreelWatcher onClose={() => setWatching(false)} />,
            document.body
          )
        : null}

      <script
        dangerouslySetInnerHTML={{
          __html: `(function(){
  if (window.__twosunsSoundBound) return;
  window.__twosunsSoundBound = true;
  document.addEventListener("click", function(event) {
    var target = event.target;
    if (!target || !target.closest) return;
    var btn = target.closest("[data-sound-toggle]");
    if (!btn) return;
    var iframe = document.querySelector("[data-landing-reel]");
    if (!iframe || !iframe.contentWindow) return;
    var soundOn = btn.getAttribute("aria-pressed") !== "true";
    btn.setAttribute("aria-pressed", soundOn ? "true" : "false");
    btn.setAttribute("aria-label", soundOn ? "Mute showreel" : "Unmute showreel");
    var label = btn.querySelector("[data-sound-label]");
    if (label) label.textContent = soundOn ? "Mute" : "Sound";
    iframe.contentWindow.postMessage({ method: "setMuted", value: !soundOn }, "*");
    if (soundOn) iframe.contentWindow.postMessage({ method: "setVolume", value: 1 }, "*");
    if (typeof window.__twosunsOnSound === "function") window.__twosunsOnSound(soundOn);
  });
})();`,
        }}
      />
    </section>
  )
}

function ShowreelWatcher({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
      <button
        type="button"
        className="absolute inset-0 bg-black/88"
        aria-label="Close film"
        onClick={onClose}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="watch-title"
        className="relative z-[1] w-[min(100%,52rem)] bg-ink"
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
          <iframe
            src={watchPlayerSrc}
            title={reel.title}
            className="h-full w-full"
            allow="autoplay; fullscreen; picture-in-picture; encrypted-media"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
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
