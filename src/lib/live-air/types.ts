/** Live Air 4 Smart motor channels — hardware limit is five. */
export const MOTOR_CHANNELS = [
  "red",
  "yellow",
  "green",
  "blue",
  "white",
] as const

export type MotorChannel = (typeof MOTOR_CHANNELS)[number]

export type AfSpeed = "slow" | "medium" | "fast"
export type MotorDirection = "normal" | "reversed"
export type LidarScanDeg = 4 | 16

/** Preferred LiDAR AF mark distances in metres. */
export type AfCalPoints = {
  nearM: number
  midM: number
  farM: number
}

/**
 * App-side lens profile. The motor only keeps five; this library is unbounded
 * and treats the five colour channels as a hot cache.
 */
export type LensProfile = {
  id: string
  name: string
  brand: string
  focalLengthMm: number | null
  tStop: string
  serial: string
  hardStops: boolean
  motorDirection: MotorDirection
  afSpeed: AfSpeed
  lidarScanDeg: LidarScanDeg
  calPoints: AfCalPoints
  notes: string
  /** Channel currently holding this profile on the physical motor, if any. */
  loadedOnChannel: MotorChannel | null
  lastCalibratedAt: string | null
  createdAt: string
  updatedAt: string
}

export type MotorSlots = Record<MotorChannel, string | null>

export type LiveAirStore = {
  version: 1
  lenses: LensProfile[]
  slots: MotorSlots
  activeChannel: MotorChannel
}

export const CHANNEL_META: Record<
  MotorChannel,
  { label: string; swatch: string; hint: string }
> = {
  red: { label: "Red", swatch: "#e24a3b", hint: "Channel 1" },
  yellow: { label: "Yellow", swatch: "#e6c84a", hint: "Channel 2" },
  green: { label: "Green", swatch: "#3ecf72", hint: "Channel 3" },
  blue: { label: "Blue", swatch: "#3b82f6", hint: "Channel 4" },
  white: { label: "White", swatch: "#f4f1ea", hint: "Channel 5" },
}

export const DEFAULT_CAL_POINTS: AfCalPoints = {
  nearM: 0.9,
  midM: 2,
  farM: 6,
}

/** Long-distance rescue distances from PD Movie’s own guidance. */
export const FAR_FOCUS_RESCUE_CAL: AfCalPoints = {
  nearM: 0.9,
  midM: 2,
  farM: 8,
}
