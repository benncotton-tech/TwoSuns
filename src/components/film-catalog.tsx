import Image from "next/image"
import Link from "next/link"
import { filmLanes, filterFilms, type FilmLane } from "@/lib/films"
import { cn } from "@/lib/utils"

export function FilmCatalog({ lane }: { lane: FilmLane }) {
  const visible = filterFilms(lane)

  return (
    <div>
      <div className="flex flex-wrap gap-2" role="group" aria-label="Slate filter">
        {filmLanes.map((item) => {
          const active = lane === item.id
          const href =
            item.id === "all" ? "/#slate-heading" : `/?lane=${item.id}#slate-heading`
          return (
            <Link
              key={item.id}
              href={href}
              aria-current={active ? "page" : undefined}
              className={cn(
                "inline-flex h-9 items-center border px-3 text-[0.65rem] uppercase tracking-[0.22em] transition-colors",
                active
                  ? "border-gold bg-gold/10 text-gold"
                  : "border-cream/15 text-silver hover:border-cream/30 hover:text-cream"
              )}
            >
              {item.label}
            </Link>
          )
        })}
      </div>

      {visible.length === 0 ? (
        <EmptyLane lane={lane} />
      ) : (
        <ol className="mt-12 divide-y divide-cream/10 border-y border-cream/10">
          {visible.map((film, index) => (
            <li key={film.slug}>
              <Link
                href={`/work/${film.slug}`}
                className="group grid gap-6 py-8 md:grid-cols-[7rem_1fr_10rem] md:items-center lg:grid-cols-[7rem_1fr_auto_12rem]"
              >
                <span className="font-mono text-xs tabular-nums text-gold">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="font-heading text-3xl text-cream transition-colors group-hover:text-gold sm:text-4xl">
                    {film.title}
                  </h3>
                  <p className="mt-2 text-[0.7rem] uppercase tracking-[0.22em] text-silver">
                    {film.format} · {film.year} · {film.location}
                  </p>
                  <p className="mt-3 max-w-xl text-sm leading-relaxed text-cream/75">
                    {film.logline}
                  </p>
                </div>
                <p className="hidden text-[0.65rem] uppercase tracking-[0.22em] text-gold lg:block">
                  {film.status}
                </p>
                <div className="relative aspect-[3/4] w-full max-w-[10rem] overflow-hidden border border-cream/10 md:justify-self-end">
                  <Image
                    src={film.poster}
                    alt=""
                    fill
                    sizes="160px"
                    className="object-cover transition duration-500 group-hover:scale-[1.03]"
                  />
                </div>
              </Link>
            </li>
          ))}
        </ol>
      )}
    </div>
  )
}

function EmptyLane({ lane }: { lane: FilmLane }) {
  const copy =
    lane === "Commercial"
      ? {
          title: "We do not make commercials.",
          body: "TwoSuns keeps a short slate of features, documentaries, and shorts. If you have a picture — not a product — write to us.",
          action: "Start a conversation",
        }
      : lane === "Upcoming"
        ? {
            title: "Nothing upcoming.",
            body: "When a picture is coming, it sits on this slate — not on the news board. If you have one, write to Stockholm.",
            action: "Write to the house",
          }
        : {
            title: "This lane is empty.",
            body: "Nothing on this part of the slate. Look at another lane, or write to Stockholm.",
            action: "Write to the house",
          }

  return (
    <div className="mt-16 border border-cream/15 px-6 py-16 text-center">
      <p className="text-[0.65rem] uppercase tracking-[0.28em] text-gold">
        Empty lane
      </p>
      <h3 className="mt-4 font-heading text-3xl text-cream">{copy.title}</h3>
      <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-silver">
        {copy.body}
      </p>
      <Link
        href="/#contact"
        className="mt-8 inline-flex h-11 items-center bg-gold px-6 text-[0.7rem] uppercase tracking-[0.28em] text-ink hover:bg-gold/85"
      >
        {copy.action}
      </Link>
    </div>
  )
}
