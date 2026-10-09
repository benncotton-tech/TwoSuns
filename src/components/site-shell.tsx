"use client"

import { usePathname } from "next/navigation"
import { SiteFooter } from "@/components/site-footer"
import { SiteHeader } from "@/components/site-header"

export function SiteShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const home = pathname === "/"
  const construction = pathname === "/construction"

  if (construction) {
    return <>{children}</>
  }

  return (
    <div
      className={
        home
          ? "relative flex min-h-full flex-1 flex-col bg-ink"
          : "site-frame relative flex min-h-full flex-1 flex-col"
      }
    >
      <a href="#content" className="skip-link">
        Skip to content
      </a>
      {home ? null : <div className="film-grain" aria-hidden />}
      <SiteHeader home={home} />
      <main id="content" className="flex flex-1 flex-col">
        {children}
      </main>
      {home ? null : <SiteFooter />}
    </div>
  )
}
