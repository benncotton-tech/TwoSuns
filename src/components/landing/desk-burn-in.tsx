"use client"

import { useSyncExternalStore } from "react"
import { desks } from "@/lib/site"

function subscribe(onStoreChange: () => void) {
  const id = window.setInterval(onStoreChange, 1000)
  return () => window.clearInterval(id)
}

export function DeskBurnIn({ className }: { className?: string }) {
  const timestamp = useSyncExternalStore(subscribe, () => Date.now(), () => 0)
  const now = timestamp === 0 ? null : new Date(timestamp)

  return (
    <ul className={className}>
      {desks.map((desk) => {
        const time = now
          ? new Intl.DateTimeFormat("en-GB", {
              timeZone: desk.timezone,
              hour: "2-digit",
              minute: "2-digit",
              hour12: false,
            }).format(now)
          : "––:––"
        const hour = now
          ? Number(
              new Intl.DateTimeFormat("en-GB", {
                timeZone: desk.timezone,
                hour: "2-digit",
                hour12: false,
              }).format(now)
            )
          : null
        const up = hour !== null && hour >= 6 && hour < 20
        return (
          <li key={desk.id} className="flex items-baseline gap-2 font-mono">
            <span className="text-gold">{desk.code}</span>
            <span className="tabular-nums text-cream/90">{time}</span>
            <span className="hidden text-silver/70 sm:inline">
              {hour === null ? "" : up ? "SUN UP" : "SUN DOWN"}
            </span>
          </li>
        )
      })}
    </ul>
  )
}
