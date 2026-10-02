import Image from "next/image"
import Link from "next/link"
import { DualRule } from "@/components/dual-sun"
import { FilmPosterCard, FilmPosterGrid } from "@/components/film-poster-card"
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
        <FilmPosterGrid>
          {pictures.map((film) => (
            <li key={film.slug}>
              <FilmPosterCard film={film} note={film.upcoming.note} />
            </li>
          ))}
        </FilmPosterGrid>
      )}
    </section>
  )
}
