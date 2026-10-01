"use client"

import { useSyncExternalStore } from "react"
import { house } from "@/lib/site"
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
  const daylight = now ? isDaylight(now, house.timezone) : null

  return (
    <div
      className={cn(
        "flex w-full items-end justify-between gap-6 border-t border-cream/15 pt-4",
        className
      )}
    >
      <div>
        <p className="font-heading text-lg tracking-wide text-cream sm:text-xl">
          {house.city}
        </p>
        <p className="mt-1 text-[0.7rem] uppercase tracking-[0.28em] text-silver">
          {house.code} · {house.country} · home
        </p>
      </div>
      <div className="text-right">
        <p className="font-mono text-sm tabular-nums text-gold sm:text-base">
          {now ? formatTime(now, house.timezone) : "––:––:––"}
        </p>
        <p className="mt-1 text-[0.65rem] uppercase tracking-[0.22em] text-silver/80">
          {daylight === null ? "Loading light" : daylight ? "Sun up" : "Sun down"}
        </p>
      </div>
    </div>
  )
}
