import { FilmCatalog } from "@/components/film-catalog"
import { UpcomingSlate } from "@/components/upcoming-slate"

export function WorkSection() {
  return (
    <section
      id="work"
      className="scroll-mt-20 border-t border-cream/10"
      aria-label="Work"
    >
      <div className="mx-auto w-full max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <UpcomingSlate />
        <div className="mt-20 sm:mt-24">
          <FilmCatalog />
        </div>
      </div>
    </section>
  )
}
