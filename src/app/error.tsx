"use client"

import { FaultScreen } from "@/components/fault-screen"

export default function ErrorPage({
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <FaultScreen
      title="The projector stopped."
      copy="Something in the house failed. The slate should come back on its own if you just left the browser. If it stays dark, try again."
      reset={reset}
    />
  )
}
