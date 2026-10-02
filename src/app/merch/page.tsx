import type { Metadata } from "next"
import Link from "next/link"
import { DualRule } from "@/components/dual-sun"
import { PageIntro } from "@/components/page-intro"
import { merch } from "@/lib/merch"

export const metadata: Metadata = {
  title: "Merch",
  description:
    "Black TwoSuns hats and t-shirts with the cream house wordmark. A lookbook from Stockholm. Write if you want one.",
}

export default function MerchPage() {
  return (
    <article className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
      <PageIntro eyebrow="Merch" title="Black cloth. Cream mark.">
        <p>
          Hats and t-shirts with the official TwoSuns wordmark. Nothing else on
          the garment. No cart, no drop, no countdown. If you want a piece,
          write to Stockholm and say which one.
        </p>
      </PageIntro>
      <DualRule className="mt-10" />

      {merch.length === 0 ? (
        <p className="mt-12 max-w-xl text-sm leading-relaxed text-silver">
          Nothing on the rail right now. Write to Stockholm if you want a piece
          when it is back in the house.
        </p>
      ) : (
        <ul className="mt-12 grid grid-cols-1 gap-10 sm:grid-cols-2 lg:gap-12">
          {merch.map((item) => (
            <li key={item.slug} className="group">
              <div className="relative aspect-[3/4] overflow-hidden border border-cream/10 bg-black">
                <img
                  src={item.image}
                  alt={`${item.name} — black ${item.kind.toLowerCase()} with the cream TwoSuns wordmark`}
                  className="absolute inset-0 h-full w-full object-cover"
                />
              </div>
              <p className="mt-4 text-[0.6rem] uppercase tracking-[0.2em] text-gold sm:text-[0.65rem] sm:tracking-[0.22em]">
                {item.kind}
              </p>
              <h2 className="mt-1 font-heading text-2xl leading-tight text-cream sm:text-3xl">
                {item.name}
              </h2>
              <p className="mt-1 text-[0.6rem] uppercase tracking-[0.16em] text-silver sm:text-[0.65rem] sm:tracking-[0.18em]">
                {item.fabric}
              </p>
              <p className="mt-3 max-w-md text-sm leading-relaxed text-cream/75">
                {item.copy}
              </p>
              <Link
                href="/?inquiry=merch#contact"
                className="mt-5 inline-flex h-11 items-center border border-cream/30 px-5 text-[0.65rem] uppercase tracking-[0.24em] text-cream"
              >
                Enquire
              </Link>
            </li>
          ))}
        </ul>
      )}

      <p className="mt-16 max-w-xl text-sm leading-relaxed text-silver">
        Stock is small and not always in the house. Put the piece in the subject
        or the letter. Use the merch lane on the contact form.
      </p>
    </article>
  )
}
