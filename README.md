# TwoSuns

Website for **TwoSuns**, a Swedish film production company based in Stockholm. Two founders — Billy (USA) and Benjamin (Australia) — both live here. The two suns are the two of them. Domain: [twosuns.se](https://twosuns.se).

This is a Next.js site with **file-based content**. There is no CMS, no database, and no user accounts. You edit TypeScript files, commit, and the site updates. An optional `SITE_PASSWORD` can gate the live site with HTTP Basic Auth.

The first screen is the official cream wordmark over the looping showreel. Scroll down for Upcoming, the Work slate, News, About, and Contact. The nav (Work / News / About / Contact) jumps to those sections. **Sound** unmutes the reel. **Showreel** opens the same cut with controls.

Stack: Next.js (App Router), TypeScript, Tailwind CSS, shadcn/ui.

## Remaining human clicks

1. **Create repo** in Cursor — public, suggested name `twosuns` (or `twosuns.se`). GitHub still cannot be created from this agent.
2. Loopia Kundzon: set `@` A to `216.198.79.1` (steps below), then Vercel **Refresh**. `twosuns.se` is already on the project; status is **Invalid Configuration** until DNS matches.
3. Vercel **Settings → Environment Variables → Production** → `SITE_PASSWORD` → **Redeploy**. Until that exists, the live site is open.

No draft PR until the GitHub repo exists. The temporary Vercel host is **Valid**.

## Run it locally

You need [Node.js 20+](https://nodejs.org/) and npm.

```bash
git clone <github-repo-url>
cd twosuns
npm install
npm run dev
```

Open [http://127.0.0.1:4391](http://127.0.0.1:4391). There is no GitHub URL yet — this agent cannot create the repo (`gh` is logged out; the Origin token cannot create a standard public GitHub repo). Click **Create repo** in Cursor (public, suggested name `twosuns`).

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

Live site from a **source** anonymous deploy (no `--prebuilt`; includes the password gate). Expires about an hour after it was created unless claimed:

[https://temporary-speedy-frost-foigbjp.vercel.app](https://temporary-speedy-frost-foigbjp.vercel.app)

Claim: [https://vercel.com/claim-deployment?code=f73b0e4d-0c34-41c4-9940-4f137834a069](https://vercel.com/claim-deployment?code=f73b0e4d-0c34-41c4-9940-4f137834a069)

The earlier prebuilt URL cannot be Redeployed. This agent is still logged out of Vercel, so this is a new anonymous project — not a `--prod` deploy onto the old one. After claim: **Settings → Environment Variables → Production** → `SITE_PASSWORD` → **Redeploy**. Until that env exists, the site stays open.

`twosuns.se` is added on that project. Vercel status for the domain is **Invalid Configuration** until the A record below is at the registrar.

There is no database. The only env var is optional **`SITE_PASSWORD`**: when it is set, the whole site (including `/` and the reel) asks for HTTP Basic Auth. Username can be anything (or `twosuns`); the password is that value. Leave it unset locally so preview stays open. On Vercel: **Settings → Environment Variables → Production** → `SITE_PASSWORD` → **Redeploy**. Do not put the password in git.

The contact form posts to `/api/contact` and acknowledges the letter. It does not send email until you later wire a mailer. Until then, people can still use `hello@twosuns.se`.

Once a GitHub repo exists, import it in Vercel so pushes rebuild production.

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
- **Upcoming** — pictures still in the house (`/#work`)
- **The slate** — full Work list, including an empty Commercials lane
- **News** — now / coming up / notes (`/#news`); individual posts at `/news/<slug>`
- **About** — two founders, Stockholm (`/#about`)
- **Contact** — letter to Stockholm (`/#contact`)
- Film pages: `/work/<slug>`
