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
  /** Production stills: public/films/<slug>/still-01.jpg … */
  stills?: string[]
  /**
   * Picture: public/films/<slug>/reel.mp4
   * Drop the finished film in that path when it exists. Placeholders are graded
   * 8-second loops so the landing can run before the real files arrive.
   */
  reel?: string
  featured?: boolean
  /** Set when the picture belongs in Work → Upcoming, not on the news board. */
  upcoming?: {
    order: number
    note: string
  }
  credits?: { label: string; value: string }[]
}

export const films: Film[] = [
  {
    slug: "skol",
    title: "SKÅL",
    year: "2025",
    format: "Short",
    status: "Festival circuit",
    runtime: "15 min",
    location: "Stockholm",
    featured: true,
    poster: "/films/skol/poster.jpg",
    logline:
      "Two men, Elisha and David, meet at a bar in Stockholm. Their conversation is awkward and hesitant; neither seems willing to address their relationship or shared past.",
    synopsis:
      "Elisha and David have arranged to meet. The talk stays stiff. Neither will name what they were to each other, or what they still are. Adam Lundgren and Kim Sulocki play the pair as the evening turns and the past comes up. A film by Billy Chester.",
    credits: [
      { label: "Director", value: "Billy Chester" },
      { label: "Screenplay", value: "Billy Chester" },
      { label: "Producer", value: "Benjamin Cotton" },
      { label: "Cinematography", value: "Benjamin Cotton" },
      { label: "Editor", value: "Sebastian Strand" },
      { label: "Cast", value: "Adam Lundgren, Kim Sulocki" },
    ],
  },
  {
    slug: "no-answer",
    title: "No Answer",
    year: "2020",
    format: "Short",
    status: "Released",
    runtime: "TBC",
    location: "United States",
    poster: "/films/no-answer/poster.jpg",
    logline:
      "A single father is forced to leave his daughter home alone to keep his job. The decision may cost him more than he expected.",
    synopsis:
      "Alex leaves his daughter Siena in the house and goes to work. He cannot afford to lose the job. He cannot quite afford what that choice asks of her either. Billy Chester wrote and directed the 2020 short. Omar Aragones and Siena Aragones play father and daughter; Dana Blaszkowski and Dervis Lici complete the cast. John Anderson Beavers shot it.",
    credits: [
      { label: "Director", value: "Billy Chester" },
      { label: "Screenplay", value: "Billy Chester" },
      { label: "Cinematography", value: "John Anderson Beavers" },
      { label: "Editor", value: "Nigel Luango" },
      { label: "Music", value: "Daniel Johnson" },
      { label: "Producer", value: "Amy Anderson" },
      {
        label: "Cast",
        value: "Omar Aragones, Siena Aragones, Dana Blaszkowski, Dervis Lici",
      },
    ],
  },
  {
    slug: "bonde",
    title: "BONDE",
    year: "2026",
    format: "Short",
    status: "Festival circuit",
    runtime: "TBC",
    location: "Gotland, Sweden",
    featured: true,
    poster: "/films/bonde/poster.jpg",
    stills: [
      "/films/bonde/still-01.jpg",
      "/films/bonde/still-02.jpg",
      "/films/bonde/still-03.jpg",
      "/films/bonde/still-04.jpg",
      "/films/bonde/still-05.jpg",
      "/films/bonde/still-06.jpg",
      "/films/bonde/still-07.jpg",
      "/films/bonde/still-08.jpg",
      "/films/bonde/still-09.jpg",
      "/films/bonde/still-10.jpg",
      "/films/bonde/still-11.jpg",
      "/films/bonde/still-12.jpg",
    ],
    logline:
      "On Gotland, a farmer bound to a life of rigid routine is left to fend for himself when that structure starts to go.",
    synopsis:
      "Hasse lives inside a small, familiar world built on repetition. When that world begins to shift, he has to face a life he has never had to navigate alone. Oscar Töringe plays him. John Anderson Beavers shot it on the island. A film by Billy Daniel Chester.",
    credits: [
      { label: "Director", value: "Billy Daniel Chester" },
      { label: "Cast", value: "Oscar Töringe" },
      { label: "Producers", value: "Benjamin Cotton & Karolina Berkell" },
      { label: "Cinematography", value: "John Anderson Beavers" },
      { label: "Color", value: "Olivier Ogneux" },
      { label: "Sound", value: "Octavio Sánchez" },
      { label: "Presented by", value: "TwoSuns" },
      { label: "Supported by", value: "Film på Gotland" },
      {
        label: "Special thanks",
        value: "Gotland Museum, Destination Gotland",
      },
    ],
  },
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
    upcoming: {
      order: 1,
      note: "In the cut from Stockholm. First screening when we have a date we will keep.",
    },
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
    upcoming: {
      order: 2,
      note: "Principal photography. New days in Los Angeles; the picture is produced from Stockholm.",
    },
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
    upcoming: {
      order: 3,
      note: "Script. A Nullarbor road picture. It does not shoot until it can survive silence.",
    },
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
    upcoming: {
      order: 4,
      note: "In development from Stockholm. The title we almost kept as a company name. Now a film.",
    },
    logline:
      "A cinematographer who can no longer shoot in daylight follows a crew into a Nordic winter. Working title of the company, once. Now a picture.",
    synopsis:
      "The name we almost kept as a film instead of a company. In development from Stockholm. It is not a making-of, and it is not autobiography. It is about what happens to seeing when one of the two people the company is named for can no longer look.",
  },
]

/** Last four shorts / showreel cuts, most recent first. */
export const showreelSlugs = [
  "salt-light",
  "northern-inventory",
  "harbour-hours",
  "after-the-bell",
] as const

export function getFilm(slug: string) {
  return films.find((film) => film.slug === slug)
}

export function showreelFilms() {
  return showreelSlugs
    .map((slug) => getFilm(slug))
    .filter((film): film is Film & { reel: string } => Boolean(film?.reel))
}

/** Work slate: shorts only. Features in the house live in Upcoming. */
export function slateFilms() {
  return films.filter((film) => film.format === "Short" && !film.upcoming)
}

export function featuredFilms() {
  return films.filter((film) => film.featured)
}

export type UpcomingFilm = Film & { upcoming: NonNullable<Film["upcoming"]> }

export function upcomingFilms(): UpcomingFilm[] {
  return films
    .filter((film): film is UpcomingFilm => Boolean(film.upcoming))
    .sort((a, b) => a.upcoming.order - b.upcoming.order)
}

export function nextFilm(slug: string) {
  const index = films.findIndex((film) => film.slug === slug)
  if (index === -1) return films[0]
  return films[(index + 1) % films.length]
}

