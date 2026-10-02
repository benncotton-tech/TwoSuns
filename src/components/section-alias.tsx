"use client"

import { useEffect } from "react"

export function SectionAlias({ hash }: { hash: string }) {
  useEffect(() => {
    window.location.replace(`/#${hash}`)
  }, [hash])

  return <p className="sr-only">Opening {hash}…</p>
}
