import type { Metadata } from "next"
import { DualSun } from "@/components/dual-sun"
import { HemisphereClocks } from "@/components/hemisphere-clocks"
import { PageIntro } from "@/components/page-intro"
import { desks } from "@/lib/site"

export const metadata: Metadata = {
  title: "About",
  description:
    "TwoSuns is three principals across the United States, Sweden, and Australia — boutique film production from both hemispheres.",
}

export default function AboutPage() {
  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
      <PageIntro eyebrow="About" title="Two suns. Three desks.">
        <p>
          TwoSuns is a boutique film production company named for a practical
          fact: we work both hemispheres. When the American day is wrapping,
          Sweden is already lighting. When Stockholm goes dark, Melbourne is
          still in the sun. The overlapping circles in the mark are that
          overlap — gold and silver sharing an orbit, not a merger deck.
        </p>
        <p>
          There is no fourth office and no layer of producers whose job is to
          manage the other producers. Three principals. A short slate. Pictures
          we will still answer for in ten years.
        </p>
      </PageIntro>

      <div className="mt-16 flex justify-center">
        <DualSun className="h-16 w-28" />
      </div>

      <section className="mt-8">
        <HemisphereClocks />
      </section>

      <section className="mt-20 grid gap-12 lg:grid-cols-3">
        {desks.map((desk) => (
          <article key={desk.id} className="border-t border-gold/40 pt-6">
            <p className="text-[0.65rem] uppercase tracking-[0.28em] text-silver">
              {desk.region}
            </p>
            <h2 className="mt-2 font-heading text-4xl text-cream">{desk.city}</h2>
            <p className="mt-2 text-sm text-gold">{desk.role}</p>
            <p className="mt-5 text-sm leading-relaxed text-silver">{desk.copy}</p>
          </article>
        ))}
      </section>

      <section className="mt-24 max-w-3xl">
        <h2 className="font-heading text-4xl text-cream">How a picture moves.</h2>
        <ol className="mt-10 space-y-8">
          <Step
            n="01"
            title="One desk champions it"
            copy="A film enters on a single principal’s desk. The other two can argue, but they cannot dilute. If nobody will put their name on the first page, it does not join the slate."
          />
          <Step
            n="02"
            title="The work follows the light"
            copy="Development, production, and post do not have to live in the same city. A Swedish winter and an Australian summer can belong to the same schedule. We move the picture, not a circus."
          />
          <Step
            n="03"
            title="The slate stays short"
            copy="We turn down commissioned commercials and most branded work. Capacity is a creative choice. Empty lanes on the work page are not a failure of marketing."
          />
        </ol>
      </section>
    </div>
  )
}

function Step({ n, title, copy }: { n: string; title: string; copy: string }) {
  return (
    <li className="grid gap-3 sm:grid-cols-[4rem_1fr]">
      <span className="font-mono text-xs text-gold">{n}</span>
      <div>
        <h3 className="font-heading text-2xl text-cream">{title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-silver">{copy}</p>
      </div>
    </li>
  )
}
