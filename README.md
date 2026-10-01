# TwoSuns

Cinematic site for **TwoSuns**, a Swedish film production company based in Stockholm. Two founders, Billy and Benjamin, both live here. Domain: [twosuns.se](https://twosuns.se).

The landing is a large official wordmark over the last four shorts, one picture at a time. Work, About, and Contact stay secondary.

## Local development

```bash
npm install
npm run dev
```

Then open [http://127.0.0.1:4317](http://127.0.0.1:4317).

| Script | What it does |
| --- | --- |
| `npm run dev` | Dev server on port **4317** |
| `npm run build` | Production build |
| `npm run start` | Serve the production build |
| `npm run lint` | ESLint |

## Dropping in real films

Each picture lives in its own folder. Replace the placeholder reel when the finished file exists; keep the filename.

```
public/films/<slug>/poster.jpg
public/films/<slug>/reel.mp4
```

Showreel shorts (most recent first): `salt-light`, `northern-inventory`, `harbour-hours`, `after-the-bell`.

Placeholder reels are graded 8-second loops. They are not the finished pictures.

## What’s on the site

- **Home** — large wordmark over the showreel, mute, click-to-watch
- **Work** — the full slate
- **News** — now, coming up, and notes from the house
- **About** — two founders, Stockholm
- **Contact** — a letter to Stockholm (no email backend)

## Posting news

There is no CMS. Add a post at the top of `src/lib/news.ts` in the `posts` array:

```ts
{
  slug: "short-url-name",
  title: "The headline.",
  date: "2026-10-01", // ISO
  kind: "now", // "now" | "coming-up" | "news"
  dek: "One or two sentences for the board.",
  body: ["First paragraph.", "Second paragraph."],
  film: "salt-light", // optional work slug
}
```

## Stack

Next.js (App Router), TypeScript, Tailwind CSS, shadcn/ui.
