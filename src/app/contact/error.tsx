"use client"

import { FaultScreen } from "@/components/fault-screen"

export default function ContactError({
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <FaultScreen
      title="The letter would not load."
      copy="The form jammed. It should recover if you just left the tab. You can also write hello@twosuns.se directly."
      reset={reset}
    />
  )
}
