export type NewsKind = "now" | "coming-up" | "news"

export type NewsPost = {
  slug: string
  title: string
  date: string
  kind: NewsKind
  dek: string
  body: string[]
  film?: string
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
    slug: "split-horizon-in-production",
    title: "Split Horizon is in production.",
    date: "2026-09-18",
    kind: "now",
    film: "split-horizon",
    dek: "Principal photography from Stockholm, with days in Los Angeles for the inherited rushes.",
    body: [
      "Billy and Benjamin are in it. Split Horizon follows two sisters — one in Los Angeles, one in Stockholm — who inherit an unfinished film their father shot in 1998. Neither wants the footage. Both start cutting.",
      "The picture is produced from Stockholm. New material is being shot on the same stocks the father would have used. That is not a gimmick. It is the method.",
      "If you need the house while this is on, write. We still read letters.",
    ],
  },
  {
    slug: "salt-light-still-travelling",
    title: "Salt Light is still travelling.",
    date: "2026-08-04",
    kind: "now",
    film: "salt-light",
    dek: "The first TwoSuns feature to leave the house. Festival circuit, from Stockholm.",
    body: [
      "Salt Light spent one winter on the Skåne coast: a salvage diver, a wreck that should have stayed down, a daughter with a camera that kept rolling after the batteries should have been dead.",
      "It is still the picture we send when someone asks what we are making. Bookings and festival notes go to hello@twosuns.se. Put the film in the subject.",
    ],
  },
  {
    slug: "the-dry-line-in-post",
    title: "The Dry Line is in post.",
    date: "2026-07-22",
    kind: "coming-up",
    film: "the-dry-line",
    dek: "Shot in Western Australia. Cut in Stockholm. The land is the other lead.",
    body: [
      "A surveyor is hired to map a river that no longer reaches the sea. The client wants a line on a document. The land wants the line erased.",
      "We are in the cut from Stockholm. There is no Melbourne office and no Los Angeles office on this picture. The work came home.",
      "A date for the first screening will sit here when we have one we will keep.",
    ],
  },
  {
    slug: "two-pictures-in-development",
    title: "Two pictures in development.",
    date: "2026-06-11",
    kind: "coming-up",
    dek: "Two Hours East and The Second Sun. Neither shoots until the script can survive silence.",
    body: [
      "Two Hours East is a road picture across the Nullarbor: a driver paid not to ask what is in the case. She asks. The Second Sun is a cinematographer who can no longer shoot in daylight, following a crew into a Nordic winter. That title was almost the company name. Now it is a film.",
      "Both are being written from Stockholm. We will not pad this board with a start date we do not believe.",
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
