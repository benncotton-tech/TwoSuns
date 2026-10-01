"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { MenuIcon } from "lucide-react"
import { Wordmark } from "@/components/wordmark"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { nav } from "@/lib/site"
import { cn } from "@/lib/utils"
import { useState } from "react"

export function SiteHeader({ ghost = false }: { ghost?: boolean }) {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  return (
    <header
      className={cn(
        "z-40",
        ghost
          ? "landing-ui pointer-events-none absolute inset-x-0 top-0 border-0 bg-transparent"
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

        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger
            render={
              <Button
                variant="ghost"
                size="icon"
                className={cn(
                  "rounded-none text-cream md:hidden",
                  ghost && "pointer-events-auto ml-auto"
                )}
                aria-label="Open menu"
              />
            }
          >
            <MenuIcon className="size-5" />
          </SheetTrigger>
          <SheetContent
            side="right"
            className="w-[min(100%,20rem)] border-cream/15 bg-ink text-cream"
          >
            <SheetHeader>
              <SheetTitle className="font-heading text-left text-cream">
                TwoSuns
              </SheetTitle>
            </SheetHeader>
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
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}
