export type FilmFormat = "Feature" | "Documentary" | "Short"
export type FilmStatus =
  | "Released"
  | "Festival circuit"
  | "In production"
  | "Post-production"
  | "In development"

export type Film = {
  slug: string
  title: string
  year: string
  format: FilmFormat
  status: FilmStatus
  runtime: string
  location: string
  logline: string
  synopsis: string
  /** Still: public/films/<slug>/poster.jpg */
  poster: string
  /**
   * Picture: public/films/<slug>/reel.mp4
   * Drop the finished film in that path when it exists. Placeholders are graded
   * 8-second loops so the landing can run before the real files arrive.
   */
  reel?: string
  featured?: boolean
}

export const films: Film[] = [
  {
    slug: "salt-light",
    title: "Salt Light",
    year: "2024",
    format: "Feature",
    status: "Festival circuit",
    runtime: "112 min",
    location: "Skåne, Sweden",
    featured: true,
    poster: "/films/salt-light/poster.jpg",
    reel: "/films/salt-light/reel.mp4",
    logline:
      "A salvage diver spends one winter raising a wreck that should have stayed down. Her daughter keeps a camera rolling after the batteries should be dead.",
    synopsis:
      "On the Skåne coast, Marta takes a contract nobody else would sign: a wreck in water too cold, too late in the season. Her teenage daughter, sent north for the winter, films the dives. The footage lasts longer than the batteries. TwoSuns produced the picture from Stockholm with a small Swedish crew and a camera package that never quite behaved. It is the company’s first feature to travel.",
  },
  {
    slug: "the-dry-line",
    title: "The Dry Line",
    year: "2025",
    format: "Feature",
    status: "Post-production",
    runtime: "104 min",
    location: "Western Australia",
    featured: true,
    poster: "/films/the-dry-line/poster.jpg",
    logline:
      "A surveyor is hired to map a river that no longer reaches the sea. The client wants a line on a document. The land wants the line erased.",
    synopsis:
      "Shot on the edge of the wheatbelt and the salt lakes, The Dry Line follows a contract surveyor whose job is to draw a boundary through a riverbed that has not carried water in nine years. Produced from Stockholm; shot in Western Australia. TwoSuns does not treat landscape as backdrop. The land is the other lead.",
  },
  {
    slug: "split-horizon",
    title: "Split Horizon",
    year: "2026",
    format: "Feature",
    status: "In production",
    runtime: "TBC",
    location: "Los Angeles / Stockholm",
    featured: true,
    poster: "/films/split-horizon/poster.jpg",
    logline:
      "Two sisters — one in Los Angeles, one in Stockholm — inherit an unfinished film their father shot on both coasts in 1998. Neither wants the footage. Both start cutting.",
    synopsis:
      "A TwoSuns picture produced from Stockholm, with new material shot in both Los Angeles and Stockholm. The inherited rushes are real method, not a gimmick — we shot on the same stocks the father would have used, then let the sisters argue in the cut. Gold on one side of the frame, silver on the other.",
  },
  {
    slug: "harbour-hours",
    title: "Harbour Hours",
    year: "2023",
    format: "Documentary",
    status: "Released",
    runtime: "86 min",
    location: "Port of Melbourne",
    poster: "/films/harbour-hours/poster.jpg",
    reel: "/films/harbour-hours/reel.mp4",
    logline:
      "Eighteen months on the Melbourne night shift: crane operators, quarantine dogs, a chaplain, and the ships that never arrive when they say they will.",
    synopsis:
      "A documentary of waiting. Shot with night crews at the Port of Melbourne over a year and a half; produced from Stockholm. No interviews against brick walls. No score telling you how to feel about labour. Just the hours, the sodium lights, and the people who keep a city supplied while it sleeps.",
  },
  {
    slug: "northern-inventory",
    title: "Northern Inventory",
    year: "2024",
    format: "Documentary",
    status: "Released",
    runtime: "79 min",
    location: "Stockholm",
    poster: "/films/northern-inventory/poster.jpg",
    reel: "/films/northern-inventory/reel.mp4",
    logline:
      "A Stockholm archivist catalogs unclaimed rushes from collapsed productions. The pictures start to form a film nobody commissioned.",
    synopsis:
      "Produced from Stockholm inside a real archive of unfinished work. We did not re-stage the shelves. The archivist is who she says she is. Northern Inventory is about what remains when a production company disappears and the pictures do not.",
  },
  {
    slug: "after-the-bell",
    title: "After the Bell",
    year: "2022",
    format: "Short",
    status: "Released",
    runtime: "18 min",
    location: "Ohio, United States",
    poster: "/films/after-the-bell/poster.jpg",
    reel: "/films/after-the-bell/reel.mp4",
    logline:
      "A night porter in a closed Midwestern hotel keeps the lights on for one guest who may not be staying.",
    synopsis:
      "The first TwoSuns short. Shot in a hotel that had already failed, with a crew of seven and a single tungsten package. It is still the picture we send when someone asks what we mean by boutique: few people, enough time, no logo in the end card besides our own.",
  },
  {
    slug: "two-hours-east",
    title: "Two Hours East",
    year: "TBC",
    format: "Feature",
    status: "In development",
    runtime: "TBC",
    location: "Nullarbor, Australia",
    poster: "/films/two-hours-east/poster.jpg",
    logline:
      "A driver is paid to take a sealed case across the Nullarbor and not ask what is in it. She asks.",
    synopsis:
      "In development from Stockholm. A road picture that treats distance as a moral problem, not a postcard. We will not shoot it until the script can survive silence.",
  },
  {
    slug: "the-second-sun",
    title: "The Second Sun",
    year: "TBC",
    format: "Feature",
    status: "In development",
    runtime: "TBC",
    location: "Norrland, Sweden",
    poster: "/films/the-second-sun/poster.jpg",
    logline:
      "A cinematographer who can no longer shoot in daylight follows a crew into a Nordic winter. Working title of the company, once. Now a picture.",
    synopsis:
      "The name we almost kept as a film instead of a company. In development from Stockholm. It is not a making-of, and it is not autobiography. It is about what happens to seeing when one of the two suns goes out.",
  },
]

/** Last four shorts / showreel cuts, most recent first. */
export const showreelSlugs = [
  "salt-light",
  "northern-inventory",
  "harbour-hours",
  "after-the-bell",
] as const

export const filmLanes = [
  { id: "all", label: "All" },
  { id: "Feature", label: "Features" },
  { id: "Documentary", label: "Documentaries" },
  { id: "Short", label: "Shorts" },
  { id: "Development", label: "Development" },
  { id: "Commercial", label: "Commercials" },
] as const

export type FilmLane = (typeof filmLanes)[number]["id"]

export function getFilm(slug: string) {
  return films.find((film) => film.slug === slug)
}

export function showreelFilms() {
  return showreelSlugs
    .map((slug) => getFilm(slug))
    .filter((film): film is Film & { reel: string } => Boolean(film?.reel))
}

export function filterFilms(lane: FilmLane) {
  if (lane === "all") return films
  if (lane === "Development") {
    return films.filter((film) => film.status === "In development")
  }
  if (lane === "Commercial") return []
  return films.filter((film) => film.format === lane)
}

export function featuredFilms() {
  return films.filter((film) => film.featured)
}

export function nextFilm(slug: string) {
  const index = films.findIndex((film) => film.slug === slug)
  if (index === -1) return films[0]
  return films[(index + 1) % films.length]
}
