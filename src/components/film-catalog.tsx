import Image from "next/image"
import Link from "next/link"
import { slateFilms } from "@/lib/films"

export function FilmCatalog() {
  const visible = slateFilms()

  return (
    <ol className="divide-y divide-cream/10 border-y border-cream/10">
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
              <h3 className="font-heading text-3xl text-cream transition-colors group-hover:text-gold sm:text-4xl">
                {film.title}
              </h3>
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
  )
}
