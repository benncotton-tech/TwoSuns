import { DualSun } from "@/components/dual-sun"
import { HemisphereClocks } from "@/components/hemisphere-clocks"
import { PageIntro } from "@/components/page-intro"
import { founders } from "@/lib/site"

export function AboutSection() {
  return (
    <section
      id="about"
      className="scroll-mt-20 border-t border-cream/10"
      aria-label="About"
    >
      <div className="mx-auto w-full max-w-6xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <PageIntro heading="h2" eyebrow="About" title="Two suns. One city.">
          <p>
            TwoSuns is a Swedish production company based in Stockholm. The name
            is not three countries and it is not a merger. It is two people:
            Billy, from the United States, and Benjamin, from Australia. Both
            live here. The overlapping circles in the mark are them — two people,
            not two stars.
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

        <div className="mt-8">
          <HemisphereClocks />
        </div>

        <div className="mt-20 grid gap-12 lg:grid-cols-2">
          {founders.map((person) => (
            <article key={person.id} className="border-t border-gold/40 pt-6">
              <p className="text-[0.65rem] uppercase tracking-[0.28em] text-silver">
                From {person.from}
              </p>
              <h3 className="mt-2 font-heading text-4xl text-cream">{person.name}</h3>
              <p className="mt-2 text-sm text-gold">{person.role}</p>
              <p className="mt-5 text-sm leading-relaxed text-silver">{person.copy}</p>
            </article>
          ))}
        </div>

        <div className="mt-24 max-w-3xl">
          <h3 className="font-heading text-4xl text-cream">How a picture moves.</h3>
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
              copy="We turn down commissioned commercials and most branded work. Capacity is a creative choice. Empty lanes on the slate are not a failure of marketing."
            />
          </ol>
        </div>
      </div>
    </section>
  )
}

function Step({ n, title, copy }: { n: string; title: string; copy: string }) {
  return (
    <li className="grid gap-3 sm:grid-cols-[4rem_1fr]">
      <span className="font-mono text-xs text-gold">{n}</span>
      <div>
        <h4 className="font-heading text-2xl text-cream">{title}</h4>
        <p className="mt-2 text-sm leading-relaxed text-silver">{copy}</p>
      </div>
    </li>
  )
}
