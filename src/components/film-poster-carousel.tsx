"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import { FilmPosterCard } from "@/components/film-poster-card"
import type { Film } from "@/lib/films"
import { cn } from "@/lib/utils"

export function FilmPosterCarousel({
  films,
  label,
}: {
  films: { film: Film; note: string }[]
  label: string
}) {
  const scrollerRef = useRef<HTMLUListElement>(null)
  const [index, setIndex] = useState(0)

  const updateIndex = useCallback(() => {
    const scroller = scrollerRef.current
    if (!scroller) return
    const slides = Array.from(scroller.children) as HTMLElement[]
    if (slides.length === 0) return
    const start = scroller.scrollLeft
    let nearest = 0
    let distance = Number.POSITIVE_INFINITY
    slides.forEach((slide, i) => {
      const d = Math.abs(slide.offsetLeft - start)
      if (d < distance) {
        distance = d
        nearest = i
      }
    })
    setIndex(nearest)
  }, [])

  useEffect(() => {
    const scroller = scrollerRef.current
    if (!scroller) return
    updateIndex()
    scroller.addEventListener("scroll", updateIndex, { passive: true })
    window.addEventListener("resize", updateIndex)
    return () => {
      scroller.removeEventListener("scroll", updateIndex)
      window.removeEventListener("resize", updateIndex)
    }
  }, [films.length, updateIndex])

  function goTo(next: number) {
    const scroller = scrollerRef.current
    const slide = scroller?.children[next] as HTMLElement | undefined
    if (!scroller || !slide) return
    const left = slide.offsetLeft
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    scroller.scrollTo({
      left: Math.max(0, left),
      behavior: reduce ? "auto" : "smooth",
    })
  }

  function onKeyDown(event: React.KeyboardEvent<HTMLDivElement>) {
    if (event.key === "ArrowRight") {
      event.preventDefault()
      goTo(Math.min(index + 1, films.length - 1))
    }
    if (event.key === "ArrowLeft") {
      event.preventDefault()
      goTo(Math.max(index - 1, 0))
    }
  }

  if (films.length === 0) return null

  return (
    <div
      className="mt-12 lg:hidden"
      role="region"
      aria-roledescription="carousel"
      aria-label={label}
      onKeyDown={onKeyDown}
    >
      <p className="sr-only">Swipe sideways to move between shorts.</p>
      <ul
        ref={scrollerRef}
        tabIndex={0}
        className="slate-carousel flex snap-x snap-mandatory gap-3 overflow-x-auto overscroll-x-contain pe-8 pb-1 outline-none"
      >
        {films.map(({ film, note }) => (
          <li
            key={film.slug}
            className="w-[88%] max-w-none shrink-0 snap-start"
            aria-label={`${film.title}, ${film.year}`}
          >
            <FilmPosterCard film={film} note={note} />
          </li>
        ))}
      </ul>
      {films.length > 1 ? (
        <div
          className="mt-6 flex items-center justify-center gap-2"
          role="group"
          aria-label="Slides"
        >
          {films.map(({ film }, i) => (
            <button
              key={film.slug}
              type="button"
              aria-label={`Show ${film.title}`}
              aria-current={i === index ? "true" : undefined}
              onClick={() => goTo(i)}
              className={cn(
                "size-2.5 rounded-full transition-colors",
                i === index ? "bg-gold" : "bg-cream/25"
              )}
            />
          ))}
        </div>
      ) : null}
    </div>
  )
}
