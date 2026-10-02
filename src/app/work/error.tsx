"use client"

import { FaultScreen } from "@/components/fault-screen"

export default function WorkError({
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <FaultScreen
      kicker="Projection fault"
      title="The slate would not load."
      copy="The reel jammed on the way in. It should recover if you just left the tab. If it stays jammed, try again."
      reset={reset}
    />
  )
}
