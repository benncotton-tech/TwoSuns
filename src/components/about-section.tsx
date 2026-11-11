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
        <PageIntro
          heading="h2"
          eyebrow="About"
          title="Swedish films for a global audience."
        >
          <p>
            TwoSuns is a Swedish production company based in Stockholm. We
            produce Swedish films for a global audience.
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
      </div>
    </section>
  )
}
