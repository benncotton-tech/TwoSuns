import {
  isResumeNoise,
  pauseHouseMedia,
  resumeMarkedMedia,
} from "@/lib/safe-media"

declare global {
  interface Window {
    __twosunsResumeBound?: boolean
  }
}

function swallow(event: PromiseRejectionEvent) {
  if (isResumeNoise(event.reason)) event.preventDefault()
}

window.addEventListener("unhandledrejection", swallow)

if (!window.__twosunsResumeBound) {
  window.__twosunsResumeBound = true
  const onHidden = () => pauseHouseMedia()
  const onShown = () => resumeMarkedMedia()
  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "hidden") onHidden()
    else onShown()
  })
  window.addEventListener("pageshow", onShown)
  window.addEventListener("pagehide", onHidden)
  document.addEventListener("freeze", onHidden)
  document.addEventListener("resume", onShown)
}
