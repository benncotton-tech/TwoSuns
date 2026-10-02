import Link from "next/link"
import type { ReactNode } from "react"
import type { Film } from "@/lib/films"

export function FilmPosterCard({
  film,
  note,
}: {
  film: Film
  note: string
}) {
  return (
    <Link href={`/work/${film.slug}`} className="group block">
      <div className="relative aspect-[2/3] overflow-hidden border border-cream/10 bg-black">
        <img
          src={film.poster}
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
        />
      </div>
      <p className="mt-4 text-[0.65rem] uppercase tracking-[0.2em] text-gold sm:text-xs sm:tracking-[0.22em]">
        {film.status}
      </p>
      <h3 className="mt-2 font-heading text-2xl leading-tight text-cream transition-colors group-hover:text-gold sm:text-3xl lg:text-4xl">
        {film.title}
      </h3>
      <p className="mt-2 text-[0.65rem] uppercase tracking-[0.16em] text-silver sm:text-xs sm:tracking-[0.18em]">
        {film.format} · {film.year}
      </p>
      <p className="mt-3 text-sm leading-relaxed text-cream/75 sm:text-base">
        {note}
      </p>
    </Link>
  )
}

export function FilmPosterGrid({
  children,
}: {
  children: ReactNode
}) {
  return (
    <ul className="mt-12 grid grid-cols-1 gap-10 sm:grid-cols-2 sm:gap-x-10 sm:gap-y-14 lg:gap-x-14 lg:gap-y-16">
      {children}
    </ul>
  )
}
