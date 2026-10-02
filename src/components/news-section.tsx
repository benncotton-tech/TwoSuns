import { NewsBoard } from "@/components/news-board"
import { PageIntro } from "@/components/page-intro"

export function NewsSection() {
  return (
    <section
      id="news"
      className="scroll-mt-20 border-t border-cream/10"
      aria-label="News"
    >
      <div className="mx-auto w-full max-w-6xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <PageIntro
          heading="h2"
          eyebrow="News"
          title="Now, coming up, and the rest."
        >
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
    </section>
  )
}
