# TwoSuns

Cinematic site for **TwoSuns**, a Swedish film production company based in Stockholm. Two founders, Billy and Benjamin, both live here. Domain: [twosuns.se](https://twosuns.se).

The landing is a single picture behind the official wordmark: the last four shorts playing quietly in the dark. Work, About, and Contact stay secondary.

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

- **Home** — wordmark-led landing, one film plane, mute, reduced-motion stills, four shorts
- **Work** — the full slate
- **About** — two founders, Stockholm
- **Contact** — a letter to Stockholm (no email backend)

## Stack

Next.js (App Router), TypeScript, Tailwind CSS, shadcn/ui.
