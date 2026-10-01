# TwoSuns

Cinematic site for **TwoSuns**, a boutique film production company working from Los Angeles, Stockholm, and Melbourne. Domain: [twosuns.se](https://twosuns.se).

The landing is a dual-projector showreel: the last four shorts play in overlapping gold and silver frames behind the official wordmark. Work, About, and Contact stay secondary.

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

- **Home** — projector landing, mute/unmute, reduced-motion stills, four identifiable shorts
- **Work** — the full slate
- **About** — the three desks
- **Contact** — a letter to the desk (no email backend)

## Stack

Next.js (App Router), TypeScript, Tailwind CSS, shadcn/ui.
