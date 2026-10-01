import Image from "next/image"
import Link from "next/link"
import { DualRule, DualSun } from "@/components/dual-sun"
import { HemisphereClocks } from "@/components/hemisphere-clocks"
import { Wordmark } from "@/components/wordmark"
import { Button } from "@/components/ui/button"
import { featuredFilms } from "@/lib/films"
import { desks } from "@/lib/site"

export default function HomePage() {
  const featured = featuredFilms()

  return (
    <>
      <section className="relative flex min-h-[100svh] flex-col justify-between px-4 pb-10 pt-10 sm:px-6 lg:px-8">
        <div className="mx-auto flex w-full max-w-6xl flex-1 flex-col justify-center">
          <p className="text-center text-[0.7rem] uppercase tracking-[0.42em] text-gold">
            Boutique film production
          </p>
          <div className="mx-auto mt-8 w-full max-w-3xl lg:max-w-4xl">
            <Wordmark priority />
          </div>
          <p className="mx-auto mt-8 max-w-xl text-center text-base leading-relaxed text-silver sm:text-lg">
            Three principals. Los Angeles, Stockholm, Melbourne. We make
            pictures in the overlap of two days — features, documentaries, and
            shorts, and nothing we cannot stand behind.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
            <Button
              nativeButton={false}
              render={<Link href="/work" />}
              className="h-12 w-full rounded-none bg-gold px-8 text-[0.7rem] uppercase tracking-[0.28em] text-ink hover:bg-gold/85 sm:w-auto"
            >
              The slate
            </Button>
            <Button
              nativeButton={false}
              variant="outline"
              render={<Link href="/contact" />}
              className="h-12 w-full rounded-none border-cream/30 px-8 text-[0.7rem] uppercase tracking-[0.28em] text-cream hover:bg-cream/5 sm:w-auto"
            >
              Write to the desk
            </Button>
          </div>
        </div>
        <div className="mx-auto mt-16 w-full max-w-6xl">
          <HemisphereClocks />
        </div>
      </section>

      <section className="border-t border-cream/10 px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="flex items-end justify-between gap-6">
            <div>
              <p className="text-[0.7rem] uppercase tracking-[0.32em] text-gold">
                Now on the slate
              </p>
              <h2 className="mt-3 font-heading text-4xl text-cream sm:text-5xl">
                Three pictures in motion.
              </h2>
            </div>
            <DualRule className="hidden sm:block" />
          </div>
          <ul className="mt-12 divide-y divide-cream/10 border-y border-cream/10">
            {featured.map((film, index) => (
              <li key={film.slug}>
                <Link
                  href={`/work/${film.slug}`}
                  className="group grid items-center gap-6 py-8 md:grid-cols-[8rem_1fr_11rem]"
                >
                  <span className="font-mono text-xs text-gold">
                    {String(index + 1).padStart(2, "0")} / {film.year}
                  </span>
                  <div>
                    <h3 className="font-heading text-3xl text-cream group-hover:text-gold sm:text-4xl">
                      {film.title}
                    </h3>
                    <p className="mt-2 max-w-2xl text-sm leading-relaxed text-silver">
                      {film.logline}
                    </p>
                    <p className="mt-3 text-[0.65rem] uppercase tracking-[0.22em] text-cream/60">
                      {film.format} · {film.location} · {film.status}
                    </p>
                  </div>
                  <div className="relative aspect-[3/4] w-full max-w-[11rem] overflow-hidden border border-cream/10 md:justify-self-end">
                    <Image
                      src={film.poster}
                      alt=""
                      fill
                      sizes="176px"
                      className="object-cover transition duration-500 group-hover:scale-[1.03]"
                    />
                  </div>
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-10">
            <Link
              href="/work"
              className="text-[0.7rem] uppercase tracking-[0.28em] text-gold hover:text-cream"
            >
              Full slate →
            </Link>
          </div>
        </div>
      </section>

      <section className="border-t border-cream/10 px-4 py-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <DualSun className="mx-auto h-10 w-16" />
          <blockquote className="mt-8 font-heading text-3xl leading-snug text-cream sm:text-4xl">
            The name is literal. We make films in the hours when one sun is
            going down and the other is already up.
          </blockquote>
          <p className="mt-8 text-base leading-relaxed text-silver">
            TwoSuns is not a network with a logo. It is three principals sharing
            a slate across the United States, Sweden, and Australia. Development
            in one city, production in another, picture in a third — without a
            holding company stacked on top of the work.
          </p>
        </div>
      </section>

      <section className="border-t border-cream/10 px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <p className="text-[0.7rem] uppercase tracking-[0.32em] text-gold">
            The desks
          </p>
          <h2 className="mt-3 font-heading text-4xl text-cream sm:text-5xl">
            USA. Sweden. Australia.
          </h2>
          <ul className="mt-12 grid gap-10 lg:grid-cols-3">
            {desks.map((desk) => (
              <li key={desk.id} className="border-t border-cream/15 pt-6">
                <p className="text-[0.65rem] uppercase tracking-[0.28em] text-silver">
                  {desk.code}
                </p>
                <h3 className="mt-2 font-heading text-3xl text-cream">{desk.city}</h3>
                <p className="mt-1 text-sm text-gold">{desk.role}</p>
                <p className="mt-4 text-sm leading-relaxed text-silver">{desk.copy}</p>
              </li>
            ))}
          </ul>
          <Link
            href="/about"
            className="mt-10 inline-block text-[0.7rem] uppercase tracking-[0.28em] text-gold hover:text-cream"
          >
            How we work →
          </Link>
        </div>
      </section>

      <section className="border-t border-cream/10 px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-8 border border-cream/15 px-6 py-12 sm:px-10 md:flex-row md:items-center">
          <div>
            <p className="text-[0.7rem] uppercase tracking-[0.32em] text-gold">
              Contact
            </p>
            <h2 className="mt-3 font-heading text-4xl text-cream">
              If the film is real, write.
            </h2>
            <p className="mt-3 max-w-md text-sm leading-relaxed text-silver">
              We read every letter. We do not read decks for commercials.
            </p>
          </div>
          <Button
            nativeButton={false}
            render={<Link href="/contact" />}
            className="h-12 rounded-none bg-gold px-8 text-[0.7rem] uppercase tracking-[0.28em] text-ink hover:bg-gold/85"
          >
            Contact TwoSuns
          </Button>
        </div>
      </section>
    </>
  )
}
