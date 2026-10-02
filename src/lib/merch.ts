export type MerchKind = "T-shirt" | "Hat"

export type MerchItem = {
  slug: string
  name: string
  kind: MerchKind
  image: string
  copy: string
  fabric: string
}

export const merch: MerchItem[] = [
  {
    slug: "wordmark-tee",
    name: "Wordmark tee",
    kind: "T-shirt",
    image: "/merch/tee.jpg",
    fabric: "Heavyweight black cotton",
    copy: "Cream TwoSuns mark on the chest. The same wordmark as the house. Cut to sit clean, not loud.",
  },
  {
    slug: "wordmark-tee-oversized",
    name: "Oversized tee",
    kind: "T-shirt",
    image: "/merch/tee-oversized.jpg",
    fabric: "Heavyweight black cotton",
    copy: "A longer body, dropped shoulder. The mark sits where a title card would. Black cloth, cream type.",
  },
  {
    slug: "wordmark-cap",
    name: "Wordmark cap",
    kind: "Hat",
    image: "/merch/cap.jpg",
    fabric: "Black cotton twill",
    copy: "Unstructured. Cream mark on the front panel. Metal buckle. Made to be worn, not merchandised.",
  },
  {
    slug: "wordmark-beanie",
    name: "Wordmark beanie",
    kind: "Hat",
    image: "/merch/beanie.jpg",
    fabric: "Black knit",
    copy: "A watch cap with the mark on the cuff. For Gotland weather and Stockholm nights.",
  },
]
