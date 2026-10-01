# TwoSuns

Marketing site for **TwoSuns**, a boutique film production company working from Los Angeles, Stockholm, and Melbourne. Domain: [twosuns.se](https://twosuns.se).

The overlapping gold and silver circles in the wordmark are the point of the company: three principals, two hemispheres, one slate.

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

## What’s on the site

- **Home** — wordmark, live light in three timezones, featured pictures
- **Work** — the slate, including an empty lane for work we do not take
- **About** — USA / Sweden / Australia desks
- **Contact** — a letter to the desk (validation, loading, success, and error states)

The contact form posts to a local API route. It does not send email and does not use a database.

## Stack

Next.js (App Router), TypeScript, Tailwind CSS, shadcn/ui.
