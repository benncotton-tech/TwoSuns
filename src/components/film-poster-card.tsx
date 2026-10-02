import Image from "next/image"
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
      <div className="relative aspect-[3/4] overflow-hidden border border-cream/10">
        <Image
          src={film.poster}
          alt=""
          fill
          sizes="(max-width: 1024px) 50vw, 25vw"
          className="object-cover transition duration-500 group-hover:scale-[1.03]"
        />
      </div>
      <p className="mt-3 text-[0.6rem] uppercase tracking-[0.2em] text-gold sm:text-[0.65rem] sm:tracking-[0.22em]">
        {film.status}
      </p>
      <h3 className="mt-1 font-heading text-xl leading-tight text-cream transition-colors group-hover:text-gold sm:text-2xl">
        {film.title}
      </h3>
      <p className="mt-1 text-[0.6rem] uppercase tracking-[0.16em] text-silver sm:text-[0.65rem] sm:tracking-[0.18em]">
        {film.format} · {film.year}
      </p>
      <p className="mt-2 text-xs leading-relaxed text-cream/75 sm:text-sm">
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
    <ul className="mt-10 grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4 lg:gap-8">
      {children}
    </ul>
  )
}
