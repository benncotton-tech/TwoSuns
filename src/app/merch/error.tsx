"use client"

import { FaultScreen } from "@/components/fault-screen"

export default function MerchError({
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <FaultScreen
      title="The lookbook would not load."
      copy="The rail jammed. It should recover if you just left the tab. Write to Stockholm if you already know the piece."
      reset={reset}
      homeHref="/#contact"
      homeLabel="Contact"
    />
  )
}
