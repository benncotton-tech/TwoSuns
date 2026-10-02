import type { Metadata } from "next"
import { FilmCatalog } from "@/components/film-catalog"
import { PageIntro } from "@/components/page-intro"
import { UpcomingSlate } from "@/components/upcoming-slate"
import { filmLanes, type FilmLane } from "@/lib/films"

export const metadata: Metadata = {
  title: "Work",
  description:
    "The TwoSuns slate: features, documentaries, and shorts produced from Stockholm, plus pictures still upcoming.",
}

function laneFromParam(value: string | string[] | undefined): FilmLane {
  const lane = Array.isArray(value) ? value[0] : value
  return filmLanes.some((item) => item.id === lane) ? (lane as FilmLane) : "all"
}

export default async function WorkPage({
  searchParams,
}: {
  searchParams: Promise<{ lane?: string | string[] }>
}) {
  const params = await searchParams
  const lane = laneFromParam(params.lane)

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
      <PageIntro eyebrow="Work" title="A short slate, on purpose.">
        <p>
          Eight titles. Features, documentaries, shorts — and four still
          coming. We do not pad the list with service work. If a picture is
          here, one of us is still living with it.
        </p>
      </PageIntro>

      <div className="mt-14 sm:mt-16">
        <UpcomingSlate />
      </div>

      <section className="mt-20 sm:mt-24" aria-labelledby="slate-heading">
        <h2
          id="slate-heading"
          className="font-heading text-3xl leading-[1.05] text-cream sm:text-4xl"
        >
          The slate
        </h2>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-silver sm:text-base">
          Everything we will stand next to. Filter by form. Commercials is
          empty on purpose.
        </p>
        <div className="mt-10">
          <FilmCatalog lane={lane} />
        </div>
      </section>
    </div>
  )
}
