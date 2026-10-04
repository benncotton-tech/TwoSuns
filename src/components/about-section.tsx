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
            TwoSuns is a Swedish production company in Stockholm. The name is
            two people. The overlapping circles in the mark are them — two
            people, not two stars.
          </p>
          <p>
            The house is Stockholm. That is where they live, and that is where
            the work is based.
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
              <div className="mt-5 space-y-4">
                {person.copy.map((paragraph) => (
                  <p key={paragraph} className="text-sm leading-relaxed text-silver">
                    {paragraph}
                  </p>
                ))}
              </div>
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
              copy="A winter on Gotland or a night in Stockholm can belong to the same slate. We travel for the work. We come home to the house."
            />
            <Step
              n="03"
              title="The slate stays short"
              copy="We turn down commissioned commercials and most branded work. Capacity is a creative choice. The slate stays short on purpose."
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
