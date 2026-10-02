"use client"

import { useMemo, useState } from "react"
import Link from "next/link"
import {
  filterNews,
  formatNewsDate,
  newsKindLabel,
  newsLanes,
  type NewsLane,
} from "@/lib/news"
import { cn } from "@/lib/utils"

export function NewsBoard() {
  const [lane, setLane] = useState<NewsLane>("all")
  const visible = useMemo(() => filterNews(lane), [lane])

  return (
    <div>
      <div className="flex flex-wrap gap-2" role="group" aria-label="Board filter">
        {newsLanes.map((item) => {
          const active = lane === item.id
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => setLane(item.id)}
              aria-pressed={active}
              className={cn(
                "inline-flex h-9 items-center border px-3 text-[0.65rem] uppercase tracking-[0.22em] transition-colors",
                active
                  ? "border-gold bg-gold/10 text-gold"
                  : "border-cream/15 text-silver hover:border-cream/30 hover:text-cream"
              )}
            >
              {item.label}
            </button>
          )
        })}
      </div>

      {visible.length === 0 ? (
        <div className="mt-16 border border-cream/15 px-6 py-16 text-center">
          <p className="text-[0.65rem] uppercase tracking-[0.28em] text-gold">
            Empty lane
          </p>
          <h2 className="mt-4 font-heading text-3xl text-cream">Nothing posted here.</h2>
          <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-silver">
            Now, coming up, and news all live on this board. If the lane is
            empty, check back — or write to Stockholm.
          </p>
          <Link
            href="/#contact"
            className="mt-8 inline-flex h-11 items-center bg-gold px-6 text-[0.7rem] uppercase tracking-[0.28em] text-ink hover:bg-gold/85"
          >
            Write to the house
          </Link>
        </div>
      ) : (
        <ol className="mt-12 divide-y divide-cream/10 border-y border-cream/10">
          {visible.map((post) => (
            <li key={post.slug}>
              <Link
                href={`/news/${post.slug}`}
                className="group grid gap-3 py-8 sm:grid-cols-[7.5rem_1fr] sm:items-baseline"
              >
                <p className="font-mono text-xs tabular-nums text-gold">
                  {formatNewsDate(post.date)}
                </p>
                <div>
                  <p className="text-[0.65rem] uppercase tracking-[0.22em] text-silver">
                    {newsKindLabel[post.kind]}
                  </p>
                  <h2 className="mt-2 font-heading text-3xl text-cream transition-colors group-hover:text-gold sm:text-4xl">
                    {post.title}
                  </h2>
                  <p className="mt-3 max-w-2xl text-sm leading-relaxed text-cream/75">
                    {post.dek}
                  </p>
                </div>
              </Link>
            </li>
          ))}
        </ol>
      )}
    </div>
  )
}
