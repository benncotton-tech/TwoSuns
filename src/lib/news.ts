export type NewsKind = "now" | "coming-up" | "news"

export type NewsPost = {
  slug: string
  title: string
  date: string
  kind: NewsKind
  dek: string
  body: string[]
  film?: string
  /** Optional board/detail still. Drop the file under public/ then set the path. */
  image?: string
}

export const newsLanes = [
  { id: "all", label: "All" },
  { id: "now", label: "Now" },
  { id: "coming-up", label: "Coming up" },
  { id: "news", label: "News" },
] as const

export type NewsLane = (typeof newsLanes)[number]["id"]

export const newsKindLabel: Record<NewsKind, string> = {
  now: "Now",
  "coming-up": "Coming up",
  news: "News",
}

/**
 * Board copy lives here. To post: add an object at the top of `posts`
 * (newest first). `date` is ISO (YYYY-MM-DD). Optional `film` is a work slug.
 */
export const posts: NewsPost[] = [
  {
    slug: "bonde-austin-film-festival-2026",
    title: "BONDE world premieres at Austin Film Festival.",
    date: "2026-11-01",
    kind: "news",
    film: "bonde",
    // Laurel poster: drop at public/films/bonde/laurel-poster.jpg, then set image below.
    // image: "/films/bonde/laurel-poster.jpg",
    dek: "The short. Official selection — Shorts Program 7: Courageous Hearts.",
    body: [
      "BONDE had its world premiere at the 33rd Austin Film Festival (29 October–5 November 2026). It screened 1 November and 3 November at Galaxy Theatre, Austin, in Shorts Program 7: Courageous Hearts. Billy Daniel Chester wrote and directed. TwoSuns produced.",
    ],
  },
  {
    slug: "bonde-feature-may-2027",
    title: "BONDE, the feature, goes into production in May 2027.",
    date: "2026-10-02",
    kind: "coming-up",
    film: "bonde-feature",
    dek: "The next TwoSuns picture. Production, May 2027.",
    body: [
      "The house’s next feature is BONDE. Production begins May 2027.",
    ],
  },
  {
    slug: "the-house-is-stockholm",
    title: "The house is Stockholm.",
    date: "2026-05-02",
    kind: "news",
    dek: "Two founders. One city. Letters to hello@twosuns.se.",
    body: [
      "TwoSuns is a Swedish production company based in Stockholm. Billy came from the United States. Benjamin came from Australia. Both live here. The two overlapping circles in the mark are them — two people, not two countries, not two offices.",
      "Pictures can be shot elsewhere. The company does not move. If you have a film — not a product — write to the house.",
    ],
  },
]

export function getPost(slug: string) {
  return posts.find((post) => post.slug === slug)
}

export function newsByDate() {
  return [...posts].sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0))
}

export function filterNews(lane: NewsLane) {
  const list = newsByDate()
  if (lane === "all") return list
  return list.filter((post) => post.kind === lane)
}

export function nextPost(slug: string) {
  const list = newsByDate()
  const index = list.findIndex((post) => post.slug === slug)
  if (index === -1) return list[0]
  return list[(index + 1) % list.length]
}

export function formatNewsDate(iso: string) {
  const date = new Date(`${iso}T12:00:00`)
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date)
}
