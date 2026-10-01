"use client"

import { useSyncExternalStore } from "react"
import { desks } from "@/lib/site"
import { cn } from "@/lib/utils"

function subscribe(onStoreChange: () => void) {
  const id = window.setInterval(onStoreChange, 1000)
  return () => window.clearInterval(id)
}

function getNow() {
  return Date.now()
}

function getServerNow() {
  return 0
}

function formatTime(date: Date, timeZone: string) {
  return new Intl.DateTimeFormat("en-GB", {
    timeZone,
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  }).format(date)
}

function isDaylight(date: Date, timeZone: string) {
  const hour = Number(
    new Intl.DateTimeFormat("en-GB", {
      timeZone,
      hour: "2-digit",
      hour12: false,
    }).format(date)
  )
  return hour >= 6 && hour < 20
}

export function HemisphereClocks({ className }: { className?: string }) {
  const timestamp = useSyncExternalStore(subscribe, getNow, getServerNow)
  const now = timestamp === 0 ? null : new Date(timestamp)

  return (
    <ul
      className={cn(
        "grid w-full grid-cols-1 gap-6 sm:grid-cols-3 sm:gap-8",
        className
      )}
    >
      {desks.map((desk) => {
        const daylight = now ? isDaylight(now, desk.timezone) : null
        return (
          <li
            key={desk.id}
            className="flex items-start justify-between gap-4 border-t border-cream/15 pt-4 sm:flex-col sm:justify-start"
          >
            <div>
              <p className="font-heading text-lg tracking-wide text-cream sm:text-xl">
                {desk.city}
              </p>
              <p className="mt-1 text-[0.7rem] uppercase tracking-[0.28em] text-silver">
                {desk.code} · {desk.region}
              </p>
            </div>
            <div className="text-right sm:text-left">
              <p className="font-mono text-sm tabular-nums text-gold sm:text-base">
                {now ? formatTime(now, desk.timezone) : "––:––:––"}
              </p>
              <p className="mt-1 text-[0.65rem] uppercase tracking-[0.22em] text-silver/80">
                {daylight === null ? "Loading light" : daylight ? "Sun up" : "Sun down"}
              </p>
            </div>
          </li>
        )
      })}
    </ul>
  )
}
