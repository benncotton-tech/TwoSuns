"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { MenuIcon, XIcon } from "lucide-react"
import { Wordmark } from "@/components/wordmark"
import { nav } from "@/lib/site"
import { cn } from "@/lib/utils"
import { useEffect, useRef, useState, type MouseEvent } from "react"

const MENU_ID = "twosuns-mobile-menu"

export function SiteHeader({ home = false }: { home?: boolean }) {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [section, setSection] = useState("")
  const panelRef = useRef<HTMLDialogElement>(null)
  const closeRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const panel = panelRef.current
    if (open) {
      try {
        if (panel && !panel.open) panel.showModal()
      } catch {
        /* Safari can throw if the dialog is already in the top layer. */
      }
      closeRef.current?.focus()
    } else {
      try {
        if (panel && panel.open) panel.close()
      } catch {
        /* ignore */
      }
    }

    if (!open) return
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false)
        return
      }
      if (event.key !== "Tab" || !panel) return
      const focusable = [
        ...panel.querySelectorAll<HTMLElement>('a[href], button:not([disabled])'),
      ]
      if (focusable.length === 0) return
      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }

    window.addEventListener("keydown", onKey)
    document.body.style.overflow = "hidden"
    document.documentElement.style.overflow = "hidden"
    return () => {
      window.removeEventListener("keydown", onKey)
      document.body.style.overflow = ""
      document.documentElement.style.overflow = ""
    }
  }, [open])

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)")
    const onChange = () => {
      if (mq.matches) setOpen(false)
    }
    if (typeof mq.addEventListener === "function") {
      mq.addEventListener("change", onChange)
      return () => mq.removeEventListener("change", onChange)
    }
    mq.addListener(onChange)
    return () => mq.removeListener(onChange)
  }, [])

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

  function closeMenu() {
    setOpen(false)
  }

  function goToSection(
    event: MouseEvent<HTMLAnchorElement>,
    id: (typeof nav)[number]["id"]
  ) {
    closeMenu()
    if (pathname !== "/") return
    const node = document.getElementById(id)
    if (!node) return
    event.preventDefault()
    event.stopPropagation()
    const top = node.getBoundingClientRect().top + window.scrollY
    window.scrollTo({ top: Math.max(0, top), behavior: "instant" })
    window.history.replaceState(null, "", `/#${id}`)
    setSection(id)
  }

  function isActive(id: (typeof nav)[number]["id"]) {
    if (pathname.startsWith("/work/")) return id === "work"
    if (pathname.startsWith("/news/")) return id === "news"
    if (pathname.startsWith("/merch")) return id === "merch"
    if (home) return section === id
    return false
  }

  return (
    <>
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
              "hidden items-center gap-6 lg:gap-10 md:flex",
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
                  aria-current={active ? "page" : undefined}
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
            data-menu-toggle="true"
            className={cn(
              "inline-flex size-11 items-center justify-center text-cream md:hidden",
              ghost && "pointer-events-auto ml-auto"
            )}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls={MENU_ID}
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <XIcon className="size-5" /> : <MenuIcon className="size-5" />}
          </button>
        </div>
      </header>

      <dialog
        ref={panelRef}
        id={MENU_ID}
        aria-label="Menu"
        className="mobile-menu"
        onClose={closeMenu}
      >
        <div className="flex h-16 shrink-0 items-center justify-between px-4 sm:h-[4.25rem] sm:px-6">
          <p className="font-heading text-lg text-cream">TwoSuns</p>
          <button
            ref={closeRef}
            type="button"
            data-menu-close="true"
            className="inline-flex size-11 items-center justify-center text-cream"
            aria-label="Close menu"
            onClick={closeMenu}
          >
            <XIcon className="size-5" />
          </button>
        </div>
        <nav
          className="flex flex-1 flex-col justify-center gap-1 px-6 pb-[max(2rem,env(safe-area-inset-bottom))]"
          aria-label="Mobile"
        >
          <Link
            href="/"
            onClick={closeMenu}
            aria-current={home && !section ? "page" : undefined}
            className={cn(
              "block min-h-14 py-4 font-heading text-3xl tracking-normal",
              home && !section ? "text-gold" : "text-cream"
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
                aria-current={active ? "page" : undefined}
                className={cn(
                  "block min-h-14 py-4 font-heading text-3xl tracking-normal",
                  active ? "text-gold" : "text-cream"
                )}
              >
                {item.label}
              </Link>
            )
          })}
        </nav>
      </dialog>
    </>
  )
}
