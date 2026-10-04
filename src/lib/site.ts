export const site = {
  name: "TwoSuns",
  domain: "twosuns.se",
  url: "https://twosuns.se",
  email: "hello@twosuns.se",
  tagline: "A Swedish production company, based in Stockholm.",
  description:
    "TwoSuns is a Swedish film production company in Stockholm. Billy writes and directs. Benjamin produces and shoots. A short slate, and BONDE the feature, taken seriously.",
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
    craft: "Director, screenplay",
    copy: [
      "He writes the picture and he directs it. The shorts on the slate — BONDE, SKÅL, No Answer — are his from the first page through the cut. BONDE the feature is next: production in May 2027.",
      "A documentary eye sits under the fiction: people as they are, not as a pitch wants them. He stays with a story until it will sit still in a room.",
    ],
  },
  {
    id: "benjamin",
    name: "Benjamin",
    from: "Australia",
    role: "Founder · Producer, cinematography",
    craft: "Producer, cinematography",
    copy: [
      "He produces and he shoots — the same hands on the days and on the lens. On SKÅL he produced and shot. On the short BONDE he produced so the picture could be made. The feature is the same house, the same job, a longer cut.",
      "He will take a picture from the first day through the grade. Lighting, the schedule, the finish: one job. The slate stays short because he will not split himself across a crowd of jobs.",
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
