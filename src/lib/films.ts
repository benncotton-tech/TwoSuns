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
  /** Optional cut: public/films/<slug>/reel.mp4 */
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
    runtime: "9 min",
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
    slug: "bonde-feature",
    title: "BONDE",
    year: "2027",
    format: "Feature",
    status: "In development",
    runtime: "TBC",
    location: "TBC",
    featured: true,
    poster: "/films/bonde-feature/poster.jpg",
    upcoming: {
      order: 1,
      note: "Production, May 2027.",
    },
    logline: "The next TwoSuns feature. Production begins May 2027.",
    synopsis:
      "A TwoSuns feature. The picture goes into production in May 2027.",
  },
]

export function getFilm(slug: string) {
  return films.find((film) => film.slug === slug)
}

/** Work slate: shorts only, newest year first. Features in the house live in Upcoming. */
export function slateFilms() {
  return films
    .filter((film) => film.format === "Short" && !film.upcoming)
    .sort((a, b) => Number(b.year) - Number(a.year))
}

export type UpcomingFilm = Film & { upcoming: NonNullable<Film["upcoming"]> }

export function upcomingFilms(): UpcomingFilm[] {
  return films
    .filter((film): film is UpcomingFilm => Boolean(film.upcoming))
    .sort((a, b) => a.upcoming.order - b.upcoming.order)
}

export function nextFilm(slug: string) {
  const sequence = [...upcomingFilms(), ...slateFilms()]
  const ordered = sequence.length > 0 ? sequence : films
  const index = ordered.findIndex((film) => film.slug === slug)
  if (index === -1) return ordered[0]
  return ordered[(index + 1) % ordered.length]
}
