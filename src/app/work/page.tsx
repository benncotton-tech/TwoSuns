import type { Metadata } from "next"
import { FilmCatalog } from "@/components/film-catalog"
import { PageIntro } from "@/components/page-intro"

export const metadata: Metadata = {
  title: "Work",
  description:
    "The TwoSuns slate: features, documentaries, and shorts produced from Los Angeles, Stockholm, and Melbourne.",
}

export default function WorkPage() {
  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
      <PageIntro eyebrow="Work" title="A short slate, on purpose.">
        <p>
          Eight titles. Features, documentaries, shorts — and two in
          development. We do not pad the list with service work. If a picture
          is here, a desk is still living with it.
        </p>
      </PageIntro>
      <div className="mt-14">
        <FilmCatalog />
      </div>
    </div>
  )
}
