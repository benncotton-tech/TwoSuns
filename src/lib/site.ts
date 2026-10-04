export const site = {
  name: "TwoSuns",
  domain: "twosuns.se",
  url: "https://twosuns.se",
  email: "hello@twosuns.se",
  tagline: "A Swedish production company, based in Stockholm.",
  description:
    "TwoSuns is a Swedish film production company based in Stockholm. Two founders — Billy, from the United States, and Benjamin, from Australia — both live here. Features, documentaries, and shorts. A short slate, taken seriously.",
} as const

export const house = {
  city: "Stockholm",
  country: "Sweden",
  timezone: "Europe/Stockholm",
  code: "STO",
} as const

export const founders = [
  {
    id: "billy",
    name: "Billy",
    from: "United States",
    role: "Founder · Director, screenplay",
    copy: [
      "Came from Detroit. Lives in Stockholm — the house, not a year abroad. He writes the picture and he directs it. The shorts on the slate are his from the first page through the cut.",
      "He came for a life here, and the films followed. A documentary eye sits under the fiction: people as they are, not as a pitch wants them. He stays with a story until it will sit still in a room. There is no American office. The work can travel. He does not.",
    ],
  },
  {
    id: "benjamin",
    name: "Benjamin",
    from: "Australia",
    role: "Founder · Producer, cinematography",
    copy: [
      "Came from Australia. Lives in Stockholm. He produces and he shoots — the same hands on the days and on the lens. There is no Melbourne desk. The Australian in the house is him.",
      "He will take a picture from the first day through the grade. Lighting, the schedule, the finish: one job. On SKÅL he produced and shot. On BONDE he produced so the picture could be made. The slate stays short because he will not split himself across a crowd of jobs.",
    ],
  },
] as const

export const nav = [
  { id: "work", href: "/#work", label: "Work" },
  { id: "news", href: "/#news", label: "News" },
  { id: "about", href: "/#about", label: "About" },
  { id: "merch", href: "/merch", label: "Merch" },
  { id: "contact", href: "/#contact", label: "Contact" },
] as const

export const inquiryLanes = [
  { value: "new-project", label: "A new project" },
  { value: "festival", label: "Festival, sales, or booking" },
  { value: "press", label: "Press" },
  { value: "merch", label: "Merch" },
  { value: "other", label: "Something else" },
] as const
