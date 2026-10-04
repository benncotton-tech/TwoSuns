export const site = {
  name: "TwoSuns",
  domain: "twosuns.se",
  url: "https://twosuns.se",
  email: "hello@twosuns.se",
  tagline: "A Swedish production company, based in Stockholm.",
  description:
    "TwoSuns is a Swedish film production company in Stockholm. Billy is from Detroit. Benjamin is from Newcastle, Australia. Both live here.",
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
    from: "Detroit, Michigan",
    role: "Founder · Director, screenplay",
    craft: "Director, screenplay",
    copy: [
      "Billy is from Detroit, Michigan. Film took him early — a first camera at thirteen, then work on the East Coast — and love brought him to Sweden in 2011. Stockholm has been home since 2020. He writes and directs from here.",
    ],
  },
  {
    id: "benjamin",
    name: "Benjamin",
    from: "Newcastle, Australia",
    role: "Founder · Producer, cinematography",
    craft: "Producer, cinematography",
    copy: [
      "Benjamin is from Newcastle, Australia. He has lived in Sweden since 2011. Stockholm is home. He produces and he shoots.",
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
