# TwoSuns

Website for **TwoSuns**, a Swedish film production company based in Stockholm. Two founders — Billy (USA) and Benjamin (Australia) — both live here. The two suns are the two of them. Domain: [twosuns.se](https://twosuns.se).

This is a Next.js site with **file-based content**. There is no CMS, no database, and no login. You edit TypeScript files, commit, and the site updates.

The first screen is the official cream wordmark over the looping showreel. Scroll down for Upcoming, the Work slate, News, About, and Contact. The nav (Work / News / About / Contact) jumps to those sections. **Sound** unmutes the reel. **Showreel** opens the same cut with controls.

Stack: Next.js (App Router), TypeScript, Tailwind CSS, shadcn/ui.

## Run it locally

You need [Node.js 20+](https://nodejs.org/) and npm.

```bash
git clone <this-repo-url>
cd twosuns
npm install
npm run dev
```

Open [http://127.0.0.1:4391](http://127.0.0.1:4391).

| Script | What it does |
| --- | --- |
| `npm run dev` | Dev server on **0.0.0.0:4391** |
| `npm run build` | Production build (this is what Vercel runs) |
| `npm run start` | Serve that production build on 4391 |
| `npm run lint` | ESLint |

Anyone with access to the GitHub repo can clone it, edit, and push. That is how Benjamin and collaborators both work on the house.

## How to edit the site

Content lives in TypeScript, not a CMS. After you change a file, the dev server hot-reloads. For the live site, commit and push — Vercel rebuilds.

### House copy — `src/lib/site.ts`

Company name, Stockholm house, founders (Billy and Benjamin), nav, contact email (`hello@twosuns.se`), and the inquiry lanes on the letter form.

### Pictures — `src/lib/films.ts`

The slate. Each film has a `slug`, title, year, format, status, logline, synopsis, poster path, optional reel, and optional `upcoming` block.

To put a title in **Upcoming** (on the landing, not on the News board):

```ts
upcoming: {
  order: 1, // lower comes first
  note: "One line of status. Not a news post.",
},
```

Stills and picture files:

```
public/films/<slug>/poster.jpg
public/films/<slug>/reel.mp4
```

Replace the placeholder reel when the finished file exists; keep the filename.

### News — `src/lib/news.ts`

There is no CMS. Add a post at the **top** of the `posts` array (newest first).

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

News **Coming up** is a house note. Work **Upcoming** is the pictures.

### Showreel — `src/lib/reel.ts` and `public/landing/`

The landing plays `public/landing/reel.mp4` (Benjamin’s Vimeo cut, *Demoreel two suns_v3*). The file is local so **Sound** can unmute it. Poster: `public/landing/poster.jpg`.

Source: `https://vimeo.com/1232004117/19df93e39f`. Before embedding that Vimeo URL elsewhere, allow **twosuns.se** in the Vimeo video’s embed settings.

Official wordmark: `public/twosuns-wordmark.png`.

## Deploy on Vercel

Do not wait on a login from this chat. When the GitHub repo exists:

1. Sign in at [vercel.com](https://vercel.com) (GitHub is fine).
2. **Add New… → Project** and import this repository.
3. Vercel should detect **Next.js**. Leave the defaults:
   - Build command: `next build` (or `npm run build`)
   - Output: Next.js (no extra config file is required)
4. There are **no environment variables** and no database. Deploy.
5. Each push to the default branch ships a new production build. Preview deployments appear on pull requests.

The contact form posts to `/api/contact` and acknowledges the letter. It does not send email until you later wire a mailer. Until then, people can still use `hello@twosuns.se`.

## Point twosuns.se at Vercel

Do this in two places. Vercel will print the **exact** records — use those, not a guessed IP.

1. In the Vercel project: **Settings → Domains → Add** `twosuns.se` (and `www.twosuns.se` if you want the www).
2. At the registrar that owns **twosuns.se**, open DNS and add the records Vercel shows. Typical shapes (confirm against Vercel’s screen):
   - Apex `twosuns.se` — **A** record, or nameservers Vercel provides
   - `www.twosuns.se` — **CNAME** to the host Vercel names (often `cname.vercel-dns.com`)

Do not paste API tokens, Vercel passwords, or GitHub tokens into DNS. Wait for the domain to show **Valid** in Vercel. HTTPS is issued automatically once DNS is correct.

If the domain currently points somewhere else, change it only when you are ready for this site to be what loads at twosuns.se.

## What’s on the page

- **Hero** — wordmark over the showreel, Sound, Showreel
- **Upcoming** — pictures still in the house (`/#work`)
- **The slate** — full Work list, including an empty Commercials lane
- **News** — now / coming up / notes (`/#news`); individual posts at `/news/<slug>`
- **About** — two founders, Stockholm (`/#about`)
- **Contact** — letter to Stockholm (`/#contact`)
- Film pages: `/work/<slug>`
