"use client"

import { useMemo, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { filmLanes, filterFilms, type FilmLane } from "@/lib/films"
import { cn } from "@/lib/utils"

export function FilmCatalog() {
  const [lane, setLane] = useState<FilmLane>("all")
  const visible = useMemo(() => filterFilms(lane), [lane])

  return (
    <div>
      <div className="flex flex-wrap gap-2" role="group" aria-label="Slate filter">
        {filmLanes.map((item) => {
          const active = lane === item.id
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => setLane(item.id)}
              aria-pressed={active}
              className={cn(
                "inline-flex h-9 items-center border px-3 text-[0.65rem] uppercase tracking-[0.22em] transition-colors",
                active
                  ? "border-gold bg-gold/10 text-gold"
                  : "border-cream/15 text-silver hover:border-cream/30 hover:text-cream"
              )}
            >
              {item.label}
            </button>
          )
        })}
      </div>

      {visible.length === 0 ? (
        <div className="mt-16 border border-cream/15 px-6 py-16 text-center">
          <p className="text-[0.65rem] uppercase tracking-[0.28em] text-gold">
            Empty lane
          </p>
          <h2 className="mt-4 font-heading text-3xl text-cream">
            We do not make commercials.
          </h2>
          <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-silver">
            TwoSuns keeps a short slate of features, documentaries, and shorts.
            If you have a picture — not a product — write to us.
          </p>
          <Link
            href="/contact"
            className="mt-8 inline-flex h-11 items-center bg-gold px-6 text-[0.7rem] uppercase tracking-[0.28em] text-ink hover:bg-gold/85"
          >
            Start a conversation
          </Link>
        </div>
      ) : (
        <ol className="mt-12 divide-y divide-cream/10 border-y border-cream/10">
          {visible.map((film, index) => (
            <li key={film.slug}>
              <Link
                href={`/work/${film.slug}`}
                className="group grid gap-6 py-8 md:grid-cols-[7rem_1fr_10rem] md:items-center lg:grid-cols-[7rem_1fr_auto_12rem]"
              >
                <span className="font-mono text-xs tabular-nums text-gold">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div>
                  <h2 className="font-heading text-3xl text-cream transition-colors group-hover:text-gold sm:text-4xl">
                    {film.title}
                  </h2>
                  <p className="mt-2 text-[0.7rem] uppercase tracking-[0.22em] text-silver">
                    {film.format} · {film.year} · {film.location}
                  </p>
                  <p className="mt-3 max-w-xl text-sm leading-relaxed text-cream/75">
                    {film.logline}
                  </p>
                </div>
                <p className="hidden text-[0.65rem] uppercase tracking-[0.22em] text-gold lg:block">
                  {film.status}
                </p>
                <div className="relative aspect-[3/4] w-full max-w-[10rem] overflow-hidden border border-cream/10 md:justify-self-end">
                  <Image
                    src={film.poster}
                    alt=""
                    fill
                    sizes="160px"
                    className="object-cover transition duration-500 group-hover:scale-[1.03]"
                  />
                </div>
              </Link>
            </li>
          ))}
        </ol>
      )}
    </div>
  )
}
