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
  desk: "Los Angeles" | "Stockholm" | "Melbourne"
  logline: string
  synopsis: string
  poster: string
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
    desk: "Stockholm",
    featured: true,
    poster: "/films/salt-light.jpg",
    logline:
      "A salvage diver spends one winter raising a wreck that should have stayed down. Her daughter keeps a camera rolling after the batteries should be dead.",
    synopsis:
      "On the Skåne coast, Marta takes a contract nobody else would sign: a wreck in water too cold, too late in the season. Her teenage daughter, sent north for the winter, films the dives. The footage lasts longer than the batteries. TwoSuns produced the picture from the Stockholm desk with a small Swedish crew and a camera package that never quite behaved. It is the company’s first feature to travel.",
  },
  {
    slug: "the-dry-line",
    title: "The Dry Line",
    year: "2025",
    format: "Feature",
    status: "Post-production",
    runtime: "104 min",
    location: "Western Australia",
    desk: "Melbourne",
    featured: true,
    poster: "/films/the-dry-line.jpg",
    logline:
      "A surveyor is hired to map a river that no longer reaches the sea. The client wants a line on a document. The land wants the line erased.",
    synopsis:
      "Shot on the edge of the wheatbelt and the salt lakes, The Dry Line follows a contract surveyor whose job is to draw a boundary through a riverbed that has not carried water in nine years. The Melbourne desk ran production; Los Angeles held the cut. TwoSuns does not treat landscape as backdrop. The land is the other lead.",
  },
  {
    slug: "split-horizon",
    title: "Split Horizon",
    year: "2026",
    format: "Feature",
    status: "In production",
    runtime: "TBC",
    location: "Los Angeles / Stockholm",
    desk: "Los Angeles",
    featured: true,
    poster: "/films/split-horizon.jpg",
    logline:
      "Two sisters — one in Los Angeles, one in Stockholm — inherit an unfinished film their father shot on both coasts in 1998. Neither wants the footage. Both start cutting.",
    synopsis:
      "A TwoSuns picture in the most literal sense: production split between the American and Swedish desks, edited in the hours when both cities are awake. The inherited rushes are real method, not a gimmick — we shot new material on the same stocks the father would have used, then let the sisters argue in the cut. Gold on one side of the frame, silver on the other.",
  },
  {
    slug: "harbour-hours",
    title: "Harbour Hours",
    year: "2023",
    format: "Documentary",
    status: "Released",
    runtime: "86 min",
    location: "Port of Melbourne",
    desk: "Melbourne",
    poster: "/films/harbour-hours.jpg",
    logline:
      "Eighteen months on the Melbourne night shift: crane operators, quarantine dogs, a chaplain, and the ships that never arrive when they say they will.",
    synopsis:
      "A documentary of waiting. The Melbourne desk embedded with night crews at the port for a year and a half. No interviews against brick walls. No score telling you how to feel about labour. Just the hours, the sodium lights, and the people who keep a city supplied while it sleeps.",
  },
  {
    slug: "northern-inventory",
    title: "Northern Inventory",
    year: "2024",
    format: "Documentary",
    status: "Released",
    runtime: "79 min",
    location: "Stockholm",
    desk: "Stockholm",
    poster: "/films/northern-inventory.jpg",
    logline:
      "A Stockholm archivist catalogs unclaimed rushes from collapsed productions. The pictures start to form a film nobody commissioned.",
    synopsis:
      "Produced from the Swedish desk inside a real archive of unfinished work. We did not re-stage the shelves. The archivist is who she says she is. Northern Inventory is about what remains when a production company disappears and the pictures do not.",
  },
  {
    slug: "after-the-bell",
    title: "After the Bell",
    year: "2022",
    format: "Short",
    status: "Released",
    runtime: "18 min",
    location: "Ohio, United States",
    desk: "Los Angeles",
    poster: "/films/after-the-bell.jpg",
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
    desk: "Melbourne",
    poster: "/films/two-hours-east.jpg",
    logline:
      "A driver is paid to take a sealed case across the Nullarbor and not ask what is in it. She asks.",
    synopsis:
      "In development at the Melbourne desk, with Los Angeles on the draft. A road picture that treats distance as a moral problem, not a postcard. We will not shoot it until the script can survive silence.",
  },
  {
    slug: "the-second-sun",
    title: "The Second Sun",
    year: "TBC",
    format: "Feature",
    status: "In development",
    runtime: "TBC",
    location: "Norrland, Sweden",
    desk: "Stockholm",
    poster: "/films/the-second-sun.jpg",
    logline:
      "A cinematographer who can no longer shoot in daylight follows a crew into a Nordic winter. Working title of the company, once. Now a picture.",
    synopsis:
      "The name we almost kept as a film instead of a company. In development from Stockholm. It is not a making-of, and it is not autobiography. It is about what happens to seeing when one of the two suns goes out.",
  },
]

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
