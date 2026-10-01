import type { Metadata } from "next"
import { DualSun } from "@/components/dual-sun"
import { HemisphereClocks } from "@/components/hemisphere-clocks"
import { PageIntro } from "@/components/page-intro"
import { founders } from "@/lib/site"

export const metadata: Metadata = {
  title: "About",
  description:
    "TwoSuns is a Swedish production company based in Stockholm. Two founders — Billy, from the United States, and Benjamin, from Australia — both live here. The two suns are the two of them.",
}

export default function AboutPage() {
  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
      <PageIntro eyebrow="About" title="Two suns. One city.">
        <p>
          TwoSuns is a Swedish production company based in Stockholm. The name
          is not three countries and it is not a merger. It is two people:
          Billy, from the United States, and Benjamin, from Australia. Both
          live here. The overlapping circles in the mark are them — gold and
          silver sharing an orbit.
        </p>
        <p>
          There is no Los Angeles office and no Melbourne office. Stockholm is
          home. Australia and the United States are where the founders come
          from, not extra desks. Pictures can be shot elsewhere. The company
          does not move.
        </p>
      </PageIntro>

      <div className="mt-16 flex justify-center">
        <DualSun className="h-16 w-28" />
      </div>

      <section className="mt-8">
        <HemisphereClocks />
      </section>

      <section className="mt-20 grid gap-12 lg:grid-cols-2">
        {founders.map((person) => (
          <article key={person.id} className="border-t border-gold/40 pt-6">
            <p className="text-[0.65rem] uppercase tracking-[0.28em] text-silver">
              From {person.from}
            </p>
            <h2 className="mt-2 font-heading text-4xl text-cream">{person.name}</h2>
            <p className="mt-2 text-sm text-gold">{person.role}</p>
            <p className="mt-5 text-sm leading-relaxed text-silver">{person.copy}</p>
          </article>
        ))}
      </section>

      <section className="mt-24 max-w-3xl">
        <h2 className="font-heading text-4xl text-cream">How a picture moves.</h2>
        <ol className="mt-10 space-y-8">
          <Step
            n="01"
            title="One of us champions it"
            copy="A film enters because Billy or Benjamin will put their name on the first page. If neither will, it does not join the slate."
          />
          <Step
            n="02"
            title="We go where the picture is"
            copy="A Swedish winter or an Australian highway can belong to the same company without opening a second office. We travel for the work. We come home to Stockholm."
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
