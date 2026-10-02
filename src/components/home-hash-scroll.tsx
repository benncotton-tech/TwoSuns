"use client"

import { useEffect } from "react"

export function HomeHashScroll() {
  useEffect(() => {
    const id = window.location.hash.replace(/^#/, "")
    if (!id) return
    const go = () => document.getElementById(id)?.scrollIntoView()
    go()
    const timer = window.setTimeout(go, 80)
    return () => window.clearTimeout(timer)
  }, [])

  return null
}
