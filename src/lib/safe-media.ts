/** Media and navigation failures Safari throws when a tab is frozen or restored. */

export function isResumeNoise(reason: unknown): boolean {
  if (reason == null) return false
  const name =
    typeof reason === "object" && "name" in reason
      ? String((reason as { name?: string }).name || "")
      : ""
  const message =
    reason instanceof Error
      ? reason.message
      : typeof reason === "string"
        ? reason
        : String(reason)
  if (
    name === "AbortError" ||
    name === "NotAllowedError" ||
    name === "NotSupportedError"
  ) {
    return true
  }
  return /play\(\)|interrupted|aborted|Load failed|Failed to fetch|NotAllowedError|NotSupportedError|The operation was aborted|media resource|fetching process for the media/i.test(
    message
  )
}

export function safePause(video: HTMLMediaElement | null | undefined) {
  if (!video) return
  try {
    video.pause()
  } catch {
    /* Safari can throw if the media pipeline was discarded. */
  }
}

export function safePlay(video: HTMLMediaElement | null | undefined) {
  if (!video || typeof document === "undefined" || document.hidden) return
  try {
    if (video.error) {
      try {
        video.load()
      } catch {
        return
      }
    }
    const play = video.play()
    if (play && typeof play.catch === "function") {
      play.catch(() => undefined)
    }
  } catch {
    /* WebKit sometimes rejects play() synchronously after a freeze. */
  }
}

export function landingVideo() {
  if (typeof document === "undefined") return null
  return document.querySelector<HTMLVideoElement>("[data-landing-reel]")
}

export function resumeHouseMedia() {
  if (typeof document === "undefined" || document.hidden) return
  const overlay = document.getElementById("twosuns-showreel")
  if (overlay) {
    safePlay(overlay.querySelector("video"))
    return
  }
  const bg = landingVideo()
  if (bg && !bg.hasAttribute("data-reel-hold")) safePlay(bg)
}

export function pauseHouseMedia() {
  if (typeof document === "undefined") return
  document.querySelectorAll("video").forEach((video) => {
    if (!video.paused) video.setAttribute("data-was-playing", "1")
    safePause(video)
  })
}

export function resumeMarkedMedia() {
  if (typeof document === "undefined" || document.hidden) return
  document.querySelectorAll<HTMLVideoElement>("video[data-was-playing='1']").forEach((video) => {
    video.removeAttribute("data-was-playing")
    safePlay(video)
  })
  resumeHouseMedia()
}
