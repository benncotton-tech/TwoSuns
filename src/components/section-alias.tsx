"use client"

import { useEffect } from "react"
import { useSearchParams } from "next/navigation"

export function SectionAlias({
  hash,
  lane,
}: {
  hash: string
  lane?: boolean
}) {
  const params = useSearchParams()

  useEffect(() => {
    const value = lane ? params.get("lane") : null
    const url = value
      ? `/?lane=${encodeURIComponent(value)}#slate-heading`
      : `/#${hash}`
    window.location.replace(url)
  }, [hash, lane, params])

  return <p className="sr-only">Opening {hash}…</p>
}
