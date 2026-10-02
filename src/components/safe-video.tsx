"use client"

import { useEffect, useRef, type VideoHTMLAttributes } from "react"
import { safePause, safePlay } from "@/lib/safe-media"

export function SafeVideo(props: VideoHTMLAttributes<HTMLVideoElement>) {
  const innerRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const video = innerRef.current
    if (!video) return

    const onHide = () => {
      if (!video.paused) video.setAttribute("data-was-playing", "1")
      safePause(video)
    }
    const onShow = () => {
      if (video.getAttribute("data-was-playing") === "1") {
        video.removeAttribute("data-was-playing")
        safePlay(video)
      }
    }
    const onVisible = () => {
      if (document.visibilityState === "hidden") onHide()
      else onShow()
    }

    document.addEventListener("visibilitychange", onVisible)
    window.addEventListener("pagehide", onHide)
    window.addEventListener("pageshow", onShow)
    return () => {
      document.removeEventListener("visibilitychange", onVisible)
      window.removeEventListener("pagehide", onHide)
      window.removeEventListener("pageshow", onShow)
    }
  }, [])

  return (
    <video
      {...props}
      ref={innerRef}
      playsInline
      onError={(event) => {
        safePause(event.currentTarget)
        props.onError?.(event)
      }}
    />
  )
}
