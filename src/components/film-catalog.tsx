import { DualRule } from "@/components/dual-sun"
import { FilmPosterCarousel } from "@/components/film-poster-carousel"
import { FilmPosterCard } from "@/components/film-poster-card"
import { slateFilms } from "@/lib/films"

export function FilmCatalog() {
  const visible = slateFilms()

  return (
    <section id="slate" aria-labelledby="slate-heading">
      <p className="text-[0.7rem] uppercase tracking-[0.32em] text-gold">
        The slate
      </p>
      <h2
        id="slate-heading"
        className="scroll-mt-24 mt-3 font-heading text-3xl leading-[1.05] text-cream sm:text-4xl"
      >
        Shorts.
      </h2>
      <p className="mt-3 max-w-2xl text-sm leading-relaxed text-silver sm:text-base">
        Pictures that have left the house. Features still in work sit in
        Upcoming, above.
      </p>
      <DualRule className="mt-8" />

      {visible.length === 0 ? (
        <p className="mt-10 max-w-xl text-sm leading-relaxed text-silver">
          When a short has left the house, it sits here.
        </p>
      ) : (
        <>
          <FilmPosterCarousel
            label="Shorts"
            films={visible.map((film) => ({ film, note: film.logline }))}
          />
          <ul className="mt-12 hidden grid-cols-3 gap-x-10 gap-y-12 lg:grid">
            {visible.map((film) => (
              <li key={film.slug}>
                <FilmPosterCard film={film} note={film.logline} />
              </li>
            ))}
          </ul>
        </>
      )}
    </section>
  )
}
