import { FilmCatalog } from "@/components/film-catalog"
import { UpcomingSlate } from "@/components/upcoming-slate"

export function WorkSection() {
  return (
    <section
      id="work"
      className="scroll-mt-20 border-t border-cream/10"
      aria-label="Work"
    >
      <div className="mx-auto w-full max-w-6xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <UpcomingSlate />

        <div className="mt-20 sm:mt-24">
          <h2
            id="slate-heading"
            className="scroll-mt-24 font-heading text-3xl leading-[1.05] text-cream sm:text-4xl"
          >
            The slate
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-silver sm:text-base">
            The shorts. Features still in the house sit in Upcoming, above.
          </p>
          <div className="mt-10">
            <FilmCatalog />
          </div>
        </div>
      </div>
    </section>
  )
}
