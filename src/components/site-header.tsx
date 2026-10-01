"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { MenuIcon, XIcon } from "lucide-react"
import { Wordmark } from "@/components/wordmark"
import { nav } from "@/lib/site"
import { cn } from "@/lib/utils"
import { useEffect, useState } from "react"

export function SiteHeader({ ghost = false }: { ghost?: boolean }) {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (!open) return
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false)
    }
    window.addEventListener("keydown", onKey)
    document.body.style.overflow = "hidden"
    return () => {
      window.removeEventListener("keydown", onKey)
      document.body.style.overflow = ""
    }
  }, [open])

  return (
    <header
      className={cn(
        "z-40",
        ghost
          ? "pointer-events-none absolute inset-x-0 top-0 border-0 bg-transparent"
          : "sticky top-0 border-b border-cream/10 bg-ink/80 backdrop-blur-md"
      )}
    >
      <div
        className={cn(
          "mx-auto flex h-16 items-center justify-between px-4 sm:h-[4.25rem] sm:px-6 lg:px-8",
          ghost ? "max-w-none" : "max-w-6xl"
        )}
      >
        {ghost ? (
          <span className="sr-only">TwoSuns</span>
        ) : (
          <Link href="/" className="relative z-10 flex items-center" aria-label="TwoSuns home">
            <Wordmark className="h-8 w-auto sm:h-9" priority />
          </Link>
        )}

        <nav
          className={cn(
            "hidden items-center gap-10 md:flex",
            ghost && "pointer-events-auto ml-auto"
          )}
          aria-label="Primary"
        >
          {nav.map((item) => {
            const active =
              pathname === item.href || pathname.startsWith(`${item.href}/`)
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "text-[0.7rem] uppercase tracking-[0.32em] transition-colors",
                  active ? "text-gold" : "text-cream/80 hover:text-cream"
                )}
              >
                {item.label}
              </Link>
            )
          })}
        </nav>

        <button
          type="button"
          className={cn(
            "inline-flex size-10 items-center justify-center text-cream md:hidden",
            ghost && "pointer-events-auto ml-auto"
          )}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <XIcon className="size-5" /> : <MenuIcon className="size-5" />}
        </button>
      </div>

      {open ? (
        <div className="fixed inset-0 z-[90] md:hidden">
          <button
            type="button"
            className="absolute inset-0 bg-black/75"
            aria-label="Close menu"
            onClick={() => setOpen(false)}
          />
          <div className="absolute inset-y-0 right-0 flex w-[min(100%,20rem)] flex-col border-l border-cream/15 bg-ink">
            <div className="flex items-center justify-between px-4 py-4">
              <p className="font-heading text-lg text-cream">TwoSuns</p>
              <button
                type="button"
                className="inline-flex size-10 items-center justify-center text-cream"
                aria-label="Close menu"
                onClick={() => setOpen(false)}
              >
                <XIcon className="size-5" />
              </button>
            </div>
            <nav className="flex flex-col gap-1 px-4" aria-label="Mobile">
              <Link
                href="/"
                onClick={() => setOpen(false)}
                className={cn(
                  "py-3 text-sm uppercase tracking-[0.28em]",
                  pathname === "/" ? "text-gold" : "text-cream/85"
                )}
              >
                Home
              </Link>
              {nav.map((item) => {
                const active =
                  pathname === item.href || pathname.startsWith(`${item.href}/`)
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className={cn(
                      "py-3 text-sm uppercase tracking-[0.28em]",
                      active ? "text-gold" : "text-cream/85"
                    )}
                  >
                    {item.label}
                  </Link>
                )
              })}
            </nav>
          </div>
        </div>
      ) : null}
    </header>
  )
}
