import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { DualRule } from "@/components/dual-sun"
import { Button } from "@/components/ui/button"
import { getFilm } from "@/lib/films"
import {
  formatNewsDate,
  getPost,
  newsKindLabel,
  nextPost,
  posts,
} from "@/lib/news"

type Props = {
  params: Promise<{ slug: string }>
}

export const dynamicParams = false

export function generateStaticParams() {
  return posts.map((post) => ({ slug: post.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = getPost(slug)
  if (!post) notFound()
  return {
    title: post.title,
    description: post.dek,
  }
}

export default async function NewsPostPage({ params }: Props) {
  const { slug } = await params
  const post = getPost(slug)
  if (!post) notFound()
  const next = nextPost(post.slug)
  const film = post.film ? getFilm(post.film) : undefined

  return (
    <article className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
      <p className="text-[0.7rem] uppercase tracking-[0.32em] text-gold">
        <Link href="/news" className="hover:text-cream">
          News
        </Link>
        <span className="text-silver"> / {newsKindLabel[post.kind]}</span>
      </p>
      <p className="mt-4 font-mono text-xs tabular-nums text-silver">
        {formatNewsDate(post.date)}
      </p>
      <h1 className="mt-4 max-w-3xl font-heading text-5xl leading-[0.95] text-cream sm:text-6xl">
        {post.title}
      </h1>
      <p className="mt-6 max-w-2xl text-lg leading-relaxed text-silver">{post.dek}</p>
      <DualRule className="mt-10" />
      <div className="mt-10 max-w-2xl space-y-5 text-base leading-relaxed text-cream/85">
        {post.body.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>
      {film ? (
        <p className="mt-10">
          <Link
            href={`/work/${film.slug}`}
            className="text-[0.7rem] uppercase tracking-[0.22em] text-gold hover:text-cream"
          >
            On the slate · {film.title}
          </Link>
        </p>
      ) : null}
      <div className="mt-20 flex flex-col gap-4 border-t border-cream/10 pt-8 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-[0.7rem] uppercase tracking-[0.28em] text-silver">
          Next on the board
        </p>
        <Button
          nativeButton={false}
          variant="outline"
          render={<Link href={`/news/${next.slug}`} />}
          className="h-11 rounded-none border-cream/30 px-6 text-[0.7rem] uppercase tracking-[0.28em] text-cream"
        >
          {next.title} →
        </Button>
      </div>
    </article>
  )
}
