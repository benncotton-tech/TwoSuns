import type { Metadata } from "next"
import { LiveAirApp } from "@/components/live-air/live-air-app"

export const metadata: Metadata = {
  title: "Live Air companion",
  description:
    "Unlimited lens library and guided LiDAR calibration for PD Movie Live Air 4 Smart.",
  robots: { index: false, follow: false },
}

export default function LiveAirPage() {
  return <LiveAirApp />
}
