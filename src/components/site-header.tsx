"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { MenuIcon, XIcon } from "lucide-react"
import { Wordmark } from "@/components/wordmark"
import { nav } from "@/lib/site"
import { cn } from "@/lib/utils"
import { useEffect, useState, type MouseEvent } from "react"

export function SiteHeader({ home = false }: { home?: boolean }) {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [section, setSection] = useState("")

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

  useEffect(() => {
    if (!home) return
    const onScroll = () => setScrolled(window.scrollY > 48)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [home])

  useEffect(() => {
    if (!home) return
    const ids = nav.map((item) => item.id)
    const nodes = ids
      .map((id) => document.getElementById(id))
      .filter((node): node is HTMLElement => Boolean(node))
    if (nodes.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)
        if (visible[0]?.target.id) setSection(visible[0].target.id)
        if (window.scrollY < window.innerHeight * 0.55) setSection("")
      },
      { rootMargin: "-20% 0px -55% 0px", threshold: [0.1, 0.25, 0.5] }
    )
    nodes.forEach((node) => observer.observe(node))
    return () => observer.disconnect()
  }, [home])

  const ghost = home && !scrolled && !open

  function goToSection(
    event: MouseEvent<HTMLAnchorElement>,
    id: (typeof nav)[number]["id"]
  ) {
    if (pathname !== "/") return
    const node = document.getElementById(id)
    if (!node) return
    event.preventDefault()
    event.stopPropagation()
    const top = node.getBoundingClientRect().top + window.scrollY
    const html = document.documentElement
    const previous = html.style.scrollBehavior
    html.style.scrollBehavior = "auto"
    window.scrollTo(0, Math.max(0, top))
    html.style.scrollBehavior = previous
    window.history.replaceState(null, "", `/#${id}`)
    setSection(id)
    setOpen(false)
  }

  function isActive(id: (typeof nav)[number]["id"]) {
    if (pathname.startsWith("/work/")) return id === "work"
    if (pathname.startsWith("/news/")) return id === "news"
    if (home) return section === id
    return false
  }

  return (
    <header
      className={cn(
        "z-40",
        home
          ? cn(
              "fixed inset-x-0 top-0",
              ghost
                ? "pointer-events-none border-0 bg-transparent"
                : "border-b border-cream/10 bg-ink/80 backdrop-blur-md"
            )
          : "sticky top-0 border-b border-cream/10 bg-ink/80 backdrop-blur-md"
      )}
    >
      <div
        className={cn(
          "mx-auto flex h-16 items-center justify-between px-4 sm:h-[4.25rem] sm:px-6 lg:px-8",
          home ? "max-w-none" : "max-w-6xl"
        )}
      >
        <Link
          href="/"
          className={cn(
            "relative z-10 flex items-center",
            ghost && "pointer-events-auto drop-shadow-[0_2px_12px_rgba(0,0,0,0.85)]"
          )}
          aria-label="TwoSuns home"
        >
          <Wordmark className="h-8 w-auto sm:h-9" priority />
        </Link>

        <nav
          className={cn(
            "hidden items-center gap-10 md:flex",
            ghost && "pointer-events-auto drop-shadow-[0_1px_8px_rgba(0,0,0,0.8)]"
          )}
          aria-label="Primary"
        >
          {nav.map((item) => {
            const active = isActive(item.id)
            return (
              <Link
                key={item.id}
                href={item.href}
                onClick={(event) => goToSection(event, item.id)}
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
                  home && !section ? "text-gold" : "text-cream/85"
                )}
              >
                Home
              </Link>
              {nav.map((item) => {
                const active = isActive(item.id)
                return (
                  <Link
                    key={item.id}
                    href={item.href}
                    onClick={(event) => goToSection(event, item.id)}
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
