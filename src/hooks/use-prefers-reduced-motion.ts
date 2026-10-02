"use client"

import { useSyncExternalStore } from "react"

function subscribe(onChange: () => void) {
  const mq = window.matchMedia("(prefers-reduced-motion: reduce)")
  if (typeof mq.addEventListener === "function") {
    mq.addEventListener("change", onChange)
    return () => mq.removeEventListener("change", onChange)
  }
  mq.addListener(onChange)
  return () => mq.removeListener(onChange)
}

function getSnapshot() {
  try {
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches
  } catch {
    return false
  }
}

export function usePrefersReducedMotion() {
  return useSyncExternalStore(subscribe, getSnapshot, () => false)
}
