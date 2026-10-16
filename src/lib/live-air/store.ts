"use client"

import {
  CHANNEL_META,
  DEFAULT_CAL_POINTS,
  MOTOR_CHANNELS,
  type LensProfile,
  type LiveAirStore,
  type MotorChannel,
  type MotorSlots,
} from "./types"

export const LIVE_AIR_STORAGE_KEY = "twosuns.live-air.v1"

const listeners = new Set<() => void>()
let memoryStore: LiveAirStore | null = null

function emptySlots(): MotorSlots {
  return {
    red: null,
    yellow: null,
    green: null,
    blue: null,
    white: null,
  }
}

function nowIso() {
  return new Date().toISOString()
}

function uid() {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID()
  }
  return `lens_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`
}

export function createEmptyStore(): LiveAirStore {
  return {
    version: 1,
    lenses: seedLenses(),
    slots: emptySlots(),
    activeChannel: "red",
  }
}

function seedLenses(): LensProfile[] {
  // Stable ids so SSR / first paint do not thrash React keys.
  const stamped = "2026-01-01T00:00:00.000Z"
  const base = {
    hardStops: true,
    motorDirection: "normal" as const,
    afSpeed: "medium" as const,
    lidarScanDeg: 4 as const,
    calPoints: { ...DEFAULT_CAL_POINTS },
    notes: "",
    loadedOnChannel: null,
    lastCalibratedAt: null,
    createdAt: stamped,
    updatedAt: stamped,
  }

  return [
    {
      ...base,
      id: "seed-cooke-32",
      name: "32mm",
      brand: "Cooke S4/i",
      focalLengthMm: 32,
      tStop: "T2.0",
      serial: "",
    },
    {
      ...base,
      id: "seed-cooke-50",
      name: "50mm",
      brand: "Cooke S4/i",
      focalLengthMm: 50,
      tStop: "T2.0",
      serial: "",
    },
    {
      ...base,
      id: "seed-cooke-75",
      name: "75mm",
      brand: "Cooke S4/i",
      focalLengthMm: 75,
      tStop: "T2.0",
      serial: "",
      calPoints: { nearM: 1.2, midM: 3, farM: 8 },
    },
  ]
}

export function blankLens(partial?: Partial<LensProfile>): LensProfile {
  const stamped = nowIso()
  const id = partial?.id ?? uid()
  return {
    name: "",
    brand: "",
    focalLengthMm: null,
    tStop: "",
    serial: "",
    hardStops: true,
    motorDirection: "normal",
    afSpeed: "medium",
    lidarScanDeg: 4,
    calPoints: { ...DEFAULT_CAL_POINTS },
    notes: "",
    loadedOnChannel: null,
    lastCalibratedAt: null,
    ...partial,
    id,
    createdAt: partial?.createdAt ?? stamped,
    updatedAt: stamped,
  }
}

export function lensLabel(lens: LensProfile) {
  const bits = [lens.brand, lens.name || (lens.focalLengthMm ? `${lens.focalLengthMm}mm` : "")]
    .map((s) => s.trim())
    .filter(Boolean)
  return bits.join(" ") || "Untitled lens"
}

function parseStore(raw: string): LiveAirStore | null {
  try {
    const parsed = JSON.parse(raw) as LiveAirStore
    if (parsed?.version !== 1 || !Array.isArray(parsed.lenses)) return null
    return {
      version: 1,
      lenses: parsed.lenses,
      slots: { ...emptySlots(), ...parsed.slots },
      activeChannel: MOTOR_CHANNELS.includes(parsed.activeChannel)
        ? parsed.activeChannel
        : "red",
    }
  } catch {
    return null
  }
}

export function readStore(): LiveAirStore {
  if (typeof window === "undefined") return createEmptyStore()
  const raw = window.localStorage.getItem(LIVE_AIR_STORAGE_KEY)
  if (!raw) {
    const fresh = createEmptyStore()
    window.localStorage.setItem(LIVE_AIR_STORAGE_KEY, JSON.stringify(fresh))
    return fresh
  }
  return parseStore(raw) ?? createEmptyStore()
}

function emit() {
  for (const listener of listeners) listener()
}

export function writeStore(store: LiveAirStore) {
  memoryStore = store
  if (typeof window !== "undefined") {
    window.localStorage.setItem(LIVE_AIR_STORAGE_KEY, JSON.stringify(store))
  }
  emit()
}

export function getLiveAirSnapshot(): LiveAirStore {
  if (typeof window === "undefined") return createEmptyStore()
  if (!memoryStore) memoryStore = readStore()
  return memoryStore
}

export function getLiveAirServerSnapshot(): LiveAirStore {
  return createEmptyStore()
}

export function subscribeLiveAir(onStoreChange: () => void) {
  listeners.add(onStoreChange)
  return () => {
    listeners.delete(onStoreChange)
  }
}

export function exportStoreJson(store: LiveAirStore) {
  return JSON.stringify(store, null, 2)
}

export function importStoreJson(raw: string): LiveAirStore {
  const parsed = parseStore(raw)
  if (!parsed) throw new Error("Not a Live Air library file.")
  return parsed
}

/**
 * Assign a lens onto a motor channel (overwriting whatever was there).
 * Returns the previous occupant id if any.
 */
export function assignLensToChannel(
  store: LiveAirStore,
  lensId: string,
  channel: MotorChannel
): { store: LiveAirStore; displacedId: string | null } {
  const displacedId = store.slots[channel]
  const lenses = store.lenses.map((lens) => {
    if (lens.id === lensId) {
      return {
        ...lens,
        loadedOnChannel: channel,
        updatedAt: nowIso(),
      }
    }
    if (lens.id === displacedId || lens.loadedOnChannel === channel) {
      return {
        ...lens,
        loadedOnChannel: null,
        updatedAt: nowIso(),
      }
    }
    return lens
  })

  return {
    displacedId: displacedId && displacedId !== lensId ? displacedId : null,
    store: {
      ...store,
      lenses,
      slots: { ...store.slots, [channel]: lensId },
      activeChannel: channel,
    },
  }
}

export function markCalibrated(store: LiveAirStore, lensId: string): LiveAirStore {
  const stamped = nowIso()
  return {
    ...store,
    lenses: store.lenses.map((lens) =>
      lens.id === lensId
        ? { ...lens, lastCalibratedAt: stamped, updatedAt: stamped }
        : lens
    ),
  }
}

export function channelOccupant(
  store: LiveAirStore,
  channel: MotorChannel
): LensProfile | null {
  const id = store.slots[channel]
  if (!id) return null
  return store.lenses.find((l) => l.id === id) ?? null
}

export function suggestChannelForLoad(
  store: LiveAirStore,
  lensId: string
): { channel: MotorChannel; reason: string } {
  const lens = store.lenses.find((l) => l.id === lensId)
  if (lens?.loadedOnChannel) {
    return {
      channel: lens.loadedOnChannel,
      reason: `Already on ${CHANNEL_META[lens.loadedOnChannel].label}. Travel-cal to wake AF.`,
    }
  }

  for (const channel of MOTOR_CHANNELS) {
    if (!store.slots[channel]) {
      return {
        channel,
        reason: `${CHANNEL_META[channel].label} is empty — write AF data here.`,
      }
    }
  }

  let oldest: { channel: MotorChannel; at: number } | null = null
  for (const channel of MOTOR_CHANNELS) {
    const occupant = channelOccupant(store, channel)
    const at = occupant?.lastCalibratedAt
      ? Date.parse(occupant.lastCalibratedAt)
      : 0
    if (!oldest || at < oldest.at) {
      oldest = { channel, at }
    }
  }

  const channel = oldest?.channel ?? "red"
  const occupant = channelOccupant(store, channel)
  return {
    channel,
    reason: occupant
      ? `All five slots full. Overwrite ${CHANNEL_META[channel].label} (${lensLabel(occupant)}) — full AF cal required.`
      : `Use ${CHANNEL_META[channel].label}.`,
  }
}
