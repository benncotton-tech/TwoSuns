"use client"

import { FaultScreen } from "@/components/fault-screen"

export default function NewsError({
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <FaultScreen
      title="The board would not load."
      copy="News jammed on the way in. It should recover if you just left the tab. If it stays dark, try again."
      reset={reset}
    />
  )
}
