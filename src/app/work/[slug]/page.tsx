import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { DualRule } from "@/components/dual-sun"
import { Button } from "@/components/ui/button"
import { films, getFilm, nextFilm } from "@/lib/films"

type Props = {
  params: Promise<{ slug: string }>
}

export function generateStaticParams() {
  return films.map((film) => ({ slug: film.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const film = getFilm(slug)
  if (!film) return { title: "Missing reel" }
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
        <Link href="/work" className="hover:text-cream">
          Work
        </Link>
        <span className="text-silver"> / {film.format}</span>
      </p>
      <div className="mt-6 grid items-start gap-12 lg:grid-cols-[1fr_18rem]">
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
            <Meta label="Desk" value={film.desk} />
            <Meta label="Status" value={film.status} />
          </dl>
          <DualRule className="mt-10" />
          <p className="mt-10 max-w-2xl text-base leading-relaxed text-cream/85">
            {film.synopsis}
          </p>
          <p className="mt-6 text-[0.7rem] uppercase tracking-[0.22em] text-silver">
            {film.location}
          </p>
        </div>
        <div className="relative mx-auto aspect-[3/4] w-full max-w-xs overflow-hidden border border-cream/15 lg:max-w-none">
          <Image
            src={film.poster}
            alt={`${film.title} still`}
            fill
            priority
            sizes="(max-width: 1024px) 320px, 288px"
            className="object-cover"
          />
        </div>
      </div>
      <div className="mt-20 flex flex-col gap-4 border-t border-cream/10 pt-8 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-[0.7rem] uppercase tracking-[0.28em] text-silver">
          Next on the slate
        </p>
        <Button
          nativeButton={false}
          variant="outline"
          render={<Link href={`/work/${next.slug}`} />}
          className="h-11 rounded-none border-cream/30 px-6 text-[0.7rem] uppercase tracking-[0.28em] text-cream"
        >
          {next.title} →
        </Button>
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
