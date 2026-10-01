export const reel = {
  vimeoId: "1232004117",
  hash: "19df93e39f",
  title: "Showreel",
  page: "https://vimeo.com/1232004117/19df93e39f",
  poster: "/landing/poster.jpg",
} as const

function playerSrc(params: Record<string, string>) {
  const query = new URLSearchParams({
    h: reel.hash,
    dnt: "1",
    ...params,
  })
  return `https://player.vimeo.com/video/${reel.vimeoId}?${query.toString()}`
}

export const backgroundPlayerSrc = playerSrc({
  autoplay: "1",
  loop: "1",
  muted: "1",
  autopause: "0",
  title: "0",
  byline: "0",
  portrait: "0",
  controls: "0",
})

export const watchPlayerSrc = playerSrc({
  autoplay: "1",
  title: "0",
  byline: "0",
  portrait: "0",
})
