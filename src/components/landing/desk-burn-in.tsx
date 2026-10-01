"use client"

import { useSyncExternalStore } from "react"
import { house } from "@/lib/site"

function subscribe(onStoreChange: () => void) {
  const id = window.setInterval(onStoreChange, 1000)
  return () => window.clearInterval(id)
}

export function DeskBurnIn({ className }: { className?: string }) {
  const timestamp = useSyncExternalStore(subscribe, () => Date.now(), () => 0)
  const now = timestamp === 0 ? null : new Date(timestamp)

  const time = now
    ? new Intl.DateTimeFormat("en-GB", {
        timeZone: house.timezone,
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      }).format(now)
    : "––:––"
  const hour = now
    ? Number(
        new Intl.DateTimeFormat("en-GB", {
          timeZone: house.timezone,
          hour: "2-digit",
          hour12: false,
        }).format(now)
      )
    : null
  const up = hour !== null && hour >= 6 && hour < 20

  return (
    <p className={className}>
      <span className="text-gold">{house.code}</span>
      <span className="ml-2 tabular-nums text-cream/90">{time}</span>
      <span className="ml-2 hidden text-silver/70 sm:inline">
        {hour === null ? "" : up ? "DAY" : "NIGHT"}
      </span>
    </p>
  )
}
