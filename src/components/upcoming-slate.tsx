import Image from "next/image"
import Link from "next/link"
import { DualRule } from "@/components/dual-sun"
import { upcomingFilms } from "@/lib/films"

export function UpcomingSlate() {
  const pictures = upcomingFilms()

  return (
    <section id="upcoming" aria-labelledby="upcoming-heading">
      <p className="text-[0.7rem] uppercase tracking-[0.32em] text-gold">
        Upcoming
      </p>
      <h2
        id="upcoming-heading"
        className="mt-3 font-heading text-3xl leading-[1.05] text-cream sm:text-4xl"
      >
        Pictures still in the house.
      </h2>
      <p className="mt-3 max-w-2xl text-sm leading-relaxed text-silver sm:text-base">
        Titles on the slate that have not left yet. Status lives here. Notes
        from the cut live on News.
      </p>
      <DualRule className="mt-8" />

      {pictures.length === 0 ? (
        <p className="mt-10 max-w-xl text-sm leading-relaxed text-silver">
          When a picture is coming, it sits here.
        </p>
      ) : (
        <ul className="mt-10 grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4 lg:gap-8">
          {pictures.map((film) => (
            <li key={film.slug}>
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
                  {film.upcoming.note}
                </p>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}
