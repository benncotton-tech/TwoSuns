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
    role: "Founder · lives in Stockholm",
    copy: "Came from the United States. Lives in Stockholm. One of the two people the company is named for — not an office in another city. Billy stays with a picture until the cut is honest.",
  },
  {
    id: "benjamin",
    name: "Benjamin",
    from: "Australia",
    role: "Founder · lives in Stockholm",
    copy: "Came from Australia. Lives in Stockholm. The other person the company is named for. There is no Melbourne desk. The Australian in the story is him, working from here. Benjamin keeps the days that only work if someone will wait.",
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
