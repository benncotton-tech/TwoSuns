import type { AfCalPoints, AfSpeed, MotorChannel, MotorDirection } from "./types"
import { CHANNEL_META } from "./types"

/** Hardware button cheatsheet for PD-BTMP-SPM. */
export const BUTTON_CHEATSHEET = [
  {
    id: "power",
    action: "Power on",
    taps: "Hold ~0.5s",
    detail: "Battery LED leaves blue; rapid flash = Bluetooth unpaired.",
  },
  {
    id: "channel-cycle",
    action: "Cycle lens channel",
    taps: "Double-press",
    detail: "Red → Yellow → Green → Blue → White. Slow flash = empty slot.",
  },
  {
    id: "channel-show",
    action: "Show channel LED",
    taps: "Triple-press",
    detail: "Turns the channel indicator back on if it went dark.",
  },
  {
    id: "travel-cal",
    action: "Auto lens travel cal",
    taps: "Hold 3s",
    detail: "Runs end-to-end travel. Required after power-up to wake saved AF.",
  },
  {
    id: "af-cal",
    action: "Enter LiDAR AF calibration",
    taps: "Short press, then hold 3s",
    detail: "Channel LED double-flashes. Focus ring unlocks for mark points.",
  },
  {
    id: "mark",
    action: "Confirm AF mark",
    taps: "Short press (beep)",
    detail: "Saves the current focus distance as near / mid / far.",
  },
  {
    id: "speed",
    action: "Cycle AF speed",
    taps: "Five short presses",
    detail: "Slow → Medium → Fast. Medium is the usual starting point.",
  },
  {
    id: "manual",
    action: "Manual override while AF",
    taps: "Short press in AF mode",
    detail: "Lets you turn the ring by hand, then resume.",
  },
] as const

export type WizardKind = "activate" | "full-af"

export type WizardStep = {
  id: string
  title: string
  body: string
  motorCue?: string
  tip?: string
}

export function buildActivateWizard(channel: MotorChannel): WizardStep[] {
  const color = CHANNEL_META[channel].label
  return [
    {
      id: "pick-channel",
      title: `Select ${color} channel`,
      body: `Double-press the motor button until the channel LED is ${color.toLowerCase()}. That slot already holds this lens’s AF map.`,
      motorCue: "Double-press to cycle channels",
    },
    {
      id: "travel",
      title: "Run travel calibration",
      body: "Hold the motor button for 3 seconds. Wait until the motor fully stops. This pulls the saved AF data for that channel — you do not need a full LiDAR re-cal.",
      motorCue: "Hold 3 seconds",
      tip: "Lens locks after travel cal. That is expected.",
    },
    {
      id: "check",
      title: "Smoke-check autofocus",
      body: "Point at a subject inside the LiDAR FOV. AF should land. If far focus is soft, run the full LiDAR wizard with farther mark points instead of reusing this activation.",
      tip: "Keep the LiDAR clear of matte boxes and flags.",
    },
  ]
}

export function buildFullAfWizard(
  channel: MotorChannel,
  cal: AfCalPoints,
  opts: {
    hardStops: boolean
    direction: MotorDirection
    speed: AfSpeed
    lidarScanDeg: 4 | 16
  }
): WizardStep[] {
  const color = CHANNEL_META[channel].label
  return [
    {
      id: "prep",
      title: "Prep the set",
      body: `Print or mount the PD Movie focus card on a non-reflective vertical surface. Set the long-range LiDAR to ${opts.lidarScanDeg}°. Keep the beam path clear.`,
      tip: "4° for longer throws; 16° when you need a wider hunt.",
    },
    {
      id: "channel",
      title: `Park on ${color}`,
      body: `Double-press until the channel LED is ${color.toLowerCase()}. This is the slot that will receive the new AF map (any previous lens on this colour is overwritten on the motor).`,
      motorCue: "Double-press to cycle",
    },
    {
      id: "direction",
      title: "Confirm motor direction",
      body:
        opts.direction === "normal"
          ? "Gear should drive focus the natural way for this lens. If the ring runs the wrong way after travel cal, reverse direction on the motor before AF marks."
          : "This profile expects a reversed motor direction. Flip direction on the motor if the ring fights you after travel cal.",
    },
    {
      id: "travel",
      title: opts.hardStops ? "Auto travel calibration" : "Manual travel calibration",
      body: opts.hardStops
        ? "Hold the motor button 3 seconds. Let it find both hard stops and stop completely."
        : "This lens has no hard stops. Use manual travel cal against the DOF scale / subtle electronic limits before AF marks.",
      motorCue: opts.hardStops ? "Hold 3 seconds" : "Manual travel cal",
    },
    {
      id: "enter-af",
      title: "Enter LiDAR AF calibration",
      body: "Short-press once, then hold 3 seconds. The channel LED should double-flash quickly and the focus ring unlocks.",
      motorCue: "Short press → hold 3s",
    },
    {
      id: "near",
      title: `Mark 1 — near (${formatMetres(cal.nearM)})`,
      body: `Place the focus card at about ${formatMetres(cal.nearM)} (or the lens’s closest useful focus). Rack until the card is sharp, then short-press. Wait for the beep.`,
      motorCue: "Short press = save mark",
      tip: "PD Movie often starts near at the lens MFD (e.g. 0.9 m).",
    },
    {
      id: "mid",
      title: `Mark 2 — mid (${formatMetres(cal.midM)})`,
      body: `Move back so the card is about ${formatMetres(cal.midM)} from the sensor plane. Refocus sharp, short-press, wait for the beep.`,
      motorCue: "Short press = save mark",
    },
    {
      id: "far",
      title: `Mark 3 — far (${formatMetres(cal.farM)})`,
      body: `Move to about ${formatMetres(cal.farM)}. Refocus sharp, short-press. When calibration finishes the channel LED stays on (or alternates with purple).`,
      motorCue: "Short press = save mark",
      tip: "If infinity is soft later, re-run with far at 5–8 m instead of a short third mark.",
    },
    {
      id: "speed",
      title: `Set AF speed → ${opts.speed}`,
      body: "Five short presses cycles Slow / Medium / Fast. Land on the speed saved in this profile.",
      motorCue: "Five short presses",
    },
    {
      id: "done",
      title: "Library updated",
      body: `This lens is now the occupant of ${color} on the motor. Next time you need it, tap Load → Activate (travel cal only). Export the library so the crew phone stays in sync.`,
    },
  ]
}

export function formatMetres(m: number) {
  if (Number.isInteger(m)) return `${m} m`
  return `${m.toFixed(1)} m`
}
