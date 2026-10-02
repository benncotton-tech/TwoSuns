"use client"

import { memo, useEffect, useRef, useState, type MouseEvent, type Ref } from "react"
import { Volume2Icon, VolumeXIcon } from "lucide-react"
import { DeskBurnIn } from "@/components/landing/desk-burn-in"
import { ReelBoundary } from "@/components/reel-boundary"
import { Wordmark } from "@/components/wordmark"
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion"
import { reel } from "@/lib/reel"
import { safePause, safePlay } from "@/lib/safe-media"
import { cn } from "@/lib/utils"

declare global {
  interface Window {
    __twosunsOnSound?: (soundOn: boolean) => void
    __twosunsOnWatch?: (watching: boolean) => void
    __twosunsOpenShowreel?: () => void
    __twosunsCloseShowreel?: () => void
    __twosunsSoundStamp?: number
    __twosunsWatchStamp?: number
  }
}

export function CinematicLanding() {
  const reduceMotion = usePrefersReducedMotion()
  const [muted, setMuted] = useState(true)
  const [watching, setWatching] = useState(false)
  const videoRef = useRef<HTMLVideoElement | null>(null)

  useEffect(() => {
    window.__twosunsOnSound = (soundOn: boolean) => setMuted(!soundOn)
    window.__twosunsOnWatch = setWatching
    return () => {
      delete window.__twosunsOnSound
      delete window.__twosunsOnWatch
    }
  }, [])

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const hold = () => video.setAttribute("data-reel-hold", "true")
    const release = () => video.removeAttribute("data-reel-hold")

    const pause = () => {
      safePause(video)
    }

    const play = () => {
      if (reduceMotion || watching || document.hidden) {
        pause()
        return
      }
      release()
      safePlay(video)
    }

    if (reduceMotion || watching) {
      hold()
      pause()
    } else {
      play()
    }

    const onVisible = () => {
      if (document.visibilityState === "hidden") pause()
      else play()
    }
    const onPageShow = () => play()
    const onPageHide = () => pause()
    const onError = () => {
      try {
        video.load()
      } catch {
        return
      }
      play()
    }

    document.addEventListener("visibilitychange", onVisible)
    window.addEventListener("pageshow", onPageShow)
    window.addEventListener("pagehide", onPageHide)
    document.addEventListener("freeze", onPageHide)
    document.addEventListener("resume", onPageShow)
    video.addEventListener("error", onError)

    return () => {
      document.removeEventListener("visibilitychange", onVisible)
      window.removeEventListener("pageshow", onPageShow)
      window.removeEventListener("pagehide", onPageHide)
      document.removeEventListener("freeze", onPageHide)
      document.removeEventListener("resume", onPageShow)
      video.removeEventListener("error", onError)
      pause()
    }
  }, [reduceMotion, watching])

  const onSoundClick = (event: MouseEvent<HTMLButtonElement>) => {
    const video = videoRef.current
    if (!video) return
    if (window.__twosunsSoundStamp === event.nativeEvent.timeStamp) {
      setMuted(video.muted)
      return
    }
    const soundOn = video.muted
    video.muted = !soundOn
    try {
      video.volume = 1
    } catch {
      /* ignore */
    }
    if (soundOn) safePlay(video)
    setMuted(!soundOn)
  }

  const onShowreelClick = (event: MouseEvent<HTMLButtonElement>) => {
    if (window.__twosunsWatchStamp === event.nativeEvent.timeStamp) {
      setWatching(true)
      return
    }
    if (typeof window.__twosunsOpenShowreel === "function") {
      window.__twosunsOpenShowreel()
    }
    setWatching(true)
  }

  return (
    <section className="landing-hero relative h-[100dvh] min-h-[100dvh] overflow-hidden bg-ink">
      <h1 className="sr-only">TwoSuns</h1>
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        {reduceMotion ? (
          <img
            src={reel.poster}
            alt=""
            className="absolute inset-0 h-full w-full object-cover"
          />
        ) : (
          <ReelBoundary>
            <LandingReel videoRef={videoRef} />
          </ReelBoundary>
        )}
      </div>

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
            onClick={onSoundClick}
            className={cn(
              "inline-flex h-11 min-w-24 cursor-pointer items-center gap-2 text-[0.65rem] uppercase tracking-[0.22em] text-silver hover:text-cream"
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
            data-showreel-toggle="true"
            onClick={onShowreelClick}
            className="inline-flex h-11 cursor-pointer items-center text-[0.7rem] uppercase tracking-[0.2em] text-cream hover:text-gold"
          >
            Showreel
          </button>

          <DeskBurnIn className="hidden h-11 items-center text-[0.6rem] uppercase tracking-[0.16em] text-silver lg:flex" />
        </div>
      </div>
    </section>
  )
}

const LandingReel = memo(function LandingReel({
  videoRef,
}: {
  videoRef: Ref<HTMLVideoElement | null>
}) {
  return (
    <video
      ref={videoRef}
      data-landing-reel="true"
      src={reel.file}
      poster={reel.poster}
      autoPlay
      playsInline
      loop
      muted
      preload="auto"
      aria-hidden
      className="h-full w-full object-cover"
    />
  )
})
