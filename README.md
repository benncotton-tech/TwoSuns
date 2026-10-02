# TwoSuns

Website for **TwoSuns**, a Swedish film production company based in Stockholm. Two founders — Billy (USA) and Benjamin (Australia) — both live here. The two suns are the two of them. Domain: [twosuns.se](https://twosuns.se).

Repo: [github.com/benncotton-tech/TwoSuns](https://github.com/benncotton-tech/TwoSuns).

This is a Next.js site with **file-based content**. There is no CMS, no database, and no user accounts. You edit TypeScript files, commit, and the site updates. Production deploys from `main` on Vercel.

The live site stays behind **`SITE_PASSWORD`** (HTTP Basic Auth) until Benjamin opens it. While that env var is set, the site sends `noindex` so search engines do not list the gated house.

The first screen is the official cream wordmark over the looping showreel. Scroll down for Upcoming, the Work slate, News, About, and Contact. The nav (Work / News / About / Contact / Merch) jumps to those sections, except Merch which is its own lookbook. **Sound** unmutes the reel. **Showreel** opens the same cut with controls.

Stack: Next.js (App Router), TypeScript, Tailwind CSS, shadcn/ui.

## Remaining human clicks

1. Loopia Kundzon: set `@` A to `216.198.79.1` if Vercel still shows **Invalid Configuration**, then **Refresh** the domain.
2. Keep **`SITE_PASSWORD`** on Vercel Production until the house is ready to go public. Username can be anything (or `twosuns`); the password is that value.
3. Do not Redeploy an old anonymous / prebuilt Vercel URL. Production is this GitHub repo on `main`.

## Run it locally

You need [Node.js 20+](https://nodejs.org/) and npm.

```bash
git clone https://github.com/benncotton-tech/TwoSuns.git
cd TwoSuns
npm install
npm run dev
```

Open [http://127.0.0.1:4391](http://127.0.0.1:4391). Leave `SITE_PASSWORD` unset locally so preview stays open.

| Script | What it does |
| --- | --- |
| `npm run dev` | Dev server on **0.0.0.0:4391** |
| `npm run build` | Production build (this is what Vercel runs) |
| `npm run start` | Serve that production build on 4391 |
| `npm run lint` | ESLint |

Anyone with access to the GitHub repo can clone it, edit, and push. That is how Benjamin and collaborators both work on the house.

## How to edit the site

Content lives in TypeScript, not a CMS. After you change a file, the dev server hot-reloads. For the live site, commit and push to `main` — Vercel rebuilds.

### House copy — `src/lib/site.ts`

Company name, Stockholm house, founders (Billy and Benjamin), nav, contact email (`hello@twosuns.se`), and the inquiry lanes on the letter form.

### Pictures — `src/lib/films.ts`

The slate. Each film has a `slug`, title, year, format, status, logline, synopsis, poster path, optional reel, optional stills, and optional `upcoming` block.

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
public/films/<slug>/still-01.jpg
public/films/<slug>/reel.mp4
```

The Work slate is shorts only, newest year first. Features still in the house sit in Upcoming. Do not invent titles.

### News — `src/lib/news.ts`

There is no CMS. Add a post at the **top** of the `posts` array (newest first).

```ts
{
  slug: "short-url-name",
  title: "The headline.",
  date: "2026-10-02", // ISO
  kind: "now", // "now" | "coming-up" | "news"
  dek: "One or two sentences for the board.",
  body: ["First paragraph.", "Second paragraph."],
  film: "bonde-feature", // optional work slug
}
```

News **Coming up** is a house note. Work **Upcoming** is the pictures.

### Merch — `src/lib/merch.ts` and `public/merch/`

Lookbook only. No cart. Enquire goes to the contact letter with the merch lane. Hats and tees use the official cream wordmark on black cloth. The beanie keeps the smaller cuff mark.

### Showreel — `src/lib/reel.ts` and `public/landing/`

The landing plays `public/landing/reel.mp4` (Benjamin’s Vimeo cut, *Demoreel two suns_v3*). The file is local so **Sound** can unmute it. Poster: `public/landing/poster.jpg`.

Source: `https://vimeo.com/1232004117/19df93e39f`. Before embedding that Vimeo URL elsewhere, allow **twosuns.se** in the Vimeo video’s embed settings.

Official wordmark: `public/twosuns-wordmark.png`. Favicon and Open Graph (`public/og.jpg`) are that same mark on black. Do not redraw it.

## Deploy on Vercel

GitHub `main` → Vercel production. There is no database. The only env var is optional **`SITE_PASSWORD`**: when it is set, the whole site (including `/` and the reel) asks for HTTP Basic Auth, and pages are `noindex`. Leave it unset locally. On Vercel: **Settings → Environment Variables → Production** → `SITE_PASSWORD` → **Redeploy**. Do not put the password in git.

The contact form posts to `/api/contact` and acknowledges the letter. It does not send email until you later wire a mailer. Until then, people can still use `hello@twosuns.se`.

## Point twosuns.se at Vercel

Registrar is [Loopia.se](https://www.loopia.se/). Apex cannot be a CNAME at Loopia. Docs: [DNS-editorn — A och CNAME](https://support.loopia.se/wiki/dnseditorn-a-och-cname/).

1. Log in to **Kundzon**, click **twosuns.se**, open the blue **DNS-editor**.
2. Under **`@`**, change or add **A** to **`216.198.79.1`**. **Ta bort** any conflicting A or CNAME on `@` first if needed.
3. Do not touch **MX**.
4. In Vercel, **Refresh** the domain.

| Type | Name | Value |
| --- | --- | --- |
| **A** | `@` | **`216.198.79.1`** |

Legacy `76.76.21.21` / `cname.vercel-dns.com` still work, but use the new IP.

Do not paste API tokens into DNS. When the record matches, Vercel should flip from **Invalid Configuration** to **Valid** and issue HTTPS.

## What’s on the page

- **Hero** — wordmark over the showreel, Sound, Showreel
- **Upcoming** — the feature BONDE, production May 2027 (`/#work`)
- **The slate** — shorts newest to oldest: BONDE, SKÅL, No Answer (`/#work`). Desktop shows three posters in a row. On smaller screens the shorts are a swipe carousel. Upcoming still stacks.
- **News** — now / coming up / notes (`/#news`); individual posts at `/news/<slug>`
- **About** — two founders, Stockholm (`/#about`)
- **Merch** — hats and tees lookbook (`/merch`)
- **Contact** — letter to Stockholm (`/#contact`)
- Film pages: `/work/<slug>`
