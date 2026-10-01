"use client"

import { usePathname } from "next/navigation"
import { useLayoutEffect } from "react"
import { SiteFooter } from "@/components/site-footer"
import { SiteHeader } from "@/components/site-header"

export function SiteShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const home = pathname === "/"

  useLayoutEffect(() => {
    document.documentElement.classList.toggle("landing-lock", home)
    return () => document.documentElement.classList.remove("landing-lock")
  }, [home])

  return (
    <div className={home ? "relative flex min-h-full flex-1 flex-col" : "site-frame relative flex min-h-full flex-1 flex-col"}>
      <div className="film-grain" aria-hidden />
      <SiteHeader ghost={home} />
      <main className="flex flex-1 flex-col">{children}</main>
      {home ? null : <SiteFooter />}
    </div>
  )
}
