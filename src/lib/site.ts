export const site = {
  name: "TwoSuns",
  domain: "twosuns.se",
  url: "https://twosuns.se",
  email: "hello@twosuns.se",
  tagline: "Boutique film production between two hemispheres.",
  description:
    "TwoSuns is a boutique film production company with principals in Los Angeles, Stockholm, and Melbourne. Features, documentaries, and shorts — a short slate, taken seriously.",
} as const

export const desks = [
  {
    id: "usa",
    city: "Los Angeles",
    region: "United States",
    timezone: "America/Los_Angeles",
    code: "LAX",
    sun: "gold" as const,
    role: "Development & US production",
    copy: "The American desk holds first pass on English-language narrative: development, US production, and the conversations that happen in rooms with buyers. When Stockholm is already in the workday, Los Angeles is still choosing the morning’s light.",
  },
  {
    id: "sweden",
    city: "Stockholm",
    region: "Sweden",
    timezone: "Europe/Stockholm",
    code: "STO",
    sun: "overlap" as const,
    role: "European production & post",
    copy: "Registered home of TwoSuns and the desk that runs pictures needing winter, water, and patience. Post-production lives here. The overlapping suns in the mark sit in this longitude: one day ending, the next already up.",
  },
  {
    id: "australia",
    city: "Melbourne",
    region: "Australia",
    timezone: "Australia/Melbourne",
    code: "MEL",
    sun: "silver" as const,
    role: "Southern production & camera",
    copy: "When Europe goes dark, this desk is in the sun. The Australian principal keeps a short crew list and a warehouse key in Port Melbourne. Features that need heat, distance, and a horizon that does not end get made from here.",
  },
] as const

export const nav = [
  { href: "/work", label: "Work" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
] as const

export const inquiryLanes = [
  { value: "new-project", label: "A new project" },
  { value: "festival", label: "Festival, sales, or booking" },
  { value: "press", label: "Press" },
  { value: "other", label: "Something else" },
] as const
