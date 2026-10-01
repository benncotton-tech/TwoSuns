"use client"

import { usePathname } from "next/navigation"
import { SiteFooter } from "@/components/site-footer"
import { SiteHeader } from "@/components/site-header"

export function SiteShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const home = pathname === "/"

  return (
    <div
      className={
        home
          ? "relative flex min-h-full flex-1 flex-col bg-ink"
          : "site-frame relative flex min-h-full flex-1 flex-col"
      }
    >
      {home ? null : <div className="film-grain" aria-hidden />}
      <SiteHeader ghost={home} />
      <main className="flex flex-1 flex-col">{children}</main>
      <SiteFooter />
    </div>
  )
}
