import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { DualRule } from "@/components/dual-sun"
import { SafeVideo } from "@/components/safe-video"
import { films, getFilm, nextFilm } from "@/lib/films"

type Props = {
  params: Promise<{ slug: string }>
}

export const dynamicParams = false

export function generateStaticParams() {
  return films.map((film) => ({ slug: film.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const film = getFilm(slug)
  if (!film) notFound()
  return {
    title: film.title,
    description: film.logline,
  }
}

export default async function FilmPage({ params }: Props) {
  const { slug } = await params
  const film = getFilm(slug)
  if (!film) notFound()
  const next = nextFilm(film.slug)

  return (
    <article className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
      <p className="text-[0.7rem] uppercase tracking-[0.32em] text-gold">
        <Link href="/#work" className="hover:text-cream">
          Work
        </Link>
        <span className="text-silver"> / {film.format}</span>
      </p>
      <div className="mt-6 grid items-start gap-12 lg:grid-cols-[1fr_minmax(18rem,28rem)]">
        <div>
          <h1 className="font-heading text-5xl leading-[0.95] text-cream sm:text-6xl lg:text-7xl">
            {film.title}
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-silver">
            {film.logline}
          </p>
          <dl className="mt-10 grid grid-cols-2 gap-6 text-sm sm:grid-cols-4">
            <Meta label="Year" value={film.year} />
            <Meta label="Runtime" value={film.runtime} />
            <Meta label="Location" value={film.location} />
            <Meta label="Status" value={film.status} />
          </dl>
          <DualRule className="mt-10" />
          <p className="mt-10 max-w-2xl text-base leading-relaxed text-cream/85">
            {film.synopsis}
          </p>
          {film.credits ? (
            <dl className="mt-10 grid max-w-2xl grid-cols-1 gap-4 sm:grid-cols-2">
              {film.credits.map((row) => (
                <Meta key={row.label} label={row.label} value={row.value} />
              ))}
            </dl>
          ) : null}
        </div>
        <div className="space-y-4">
          {film.reel ? (
            <SafeVideo
              src={film.reel}
              poster={film.poster}
              controls
              preload="metadata"
              className="aspect-video w-full border border-cream/15 bg-black object-cover"
            />
          ) : null}
          <div className="relative mx-auto aspect-[2/3] w-full max-w-md overflow-hidden border border-cream/15 bg-black lg:max-w-none">
            <img
              src={film.poster}
              alt={`${film.title} poster`}
              className="absolute inset-0 h-full w-full object-cover"
            />
          </div>
        </div>
      </div>
      {film.stills && film.stills.length > 0 ? (
        <section className="mt-16 sm:mt-20" aria-labelledby="stills-heading">
          <p
            id="stills-heading"
            className="text-[0.7rem] uppercase tracking-[0.28em] text-gold"
          >
            Stills
          </p>
          <ul className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3">
            {film.stills.map((src, index) => (
              <li
                key={src}
                className="relative aspect-[16/9] overflow-hidden border border-cream/10 bg-black"
              >
                <img
                  src={src}
                  alt={`${film.title} still ${index + 1}`}
                  className="absolute inset-0 h-full w-full object-cover"
                />
              </li>
            ))}
          </ul>
        </section>
      ) : null}
      <div className="mt-20 flex flex-col gap-4 border-t border-cream/10 pt-8 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-[0.7rem] uppercase tracking-[0.28em] text-silver">
          Next on the slate
        </p>
        <Link
          href={`/work/${next.slug}`}
          className="inline-flex h-11 items-center border border-cream/30 px-6 text-[0.7rem] uppercase tracking-[0.28em] text-cream"
        >
          {next.title} · {next.format} →
        </Link>
      </div>
    </article>
  )
}

function Meta({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-[0.65rem] uppercase tracking-[0.22em] text-gold">{label}</dt>
      <dd className="mt-1 text-cream">{value}</dd>
    </div>
  )
}
