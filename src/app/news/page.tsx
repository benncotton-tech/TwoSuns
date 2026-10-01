import type { Metadata } from "next"
import { NewsBoard } from "@/components/news-board"
import { PageIntro } from "@/components/page-intro"

export const metadata: Metadata = {
  title: "News",
  description:
    "What TwoSuns is on now, what is coming up, and notes from the house in Stockholm.",
}

export default function NewsPage() {
  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
      <PageIntro eyebrow="News" title="Now, coming up, and the rest.">
        <p>
          A short board. What we are on, what is next, and the occasional note
          from Stockholm. We do not run a newsletter. If it matters, it is
          here.
        </p>
      </PageIntro>
      <div className="mt-14">
        <NewsBoard />
      </div>
    </div>
  )
}
