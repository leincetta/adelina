# Adelina

Small-batch gelato by chef Leandro Incetta — Brooklyn. Next.js (App Router) +
TypeScript + Tailwind CSS, content managed in Sanity Studio embedded at
`/studio`, booking inquiries emailed via Resend.

The site works and looks complete right now with placeholder copy/images —
you can develop, deploy, and share it before doing any of the setup below.
Flavors and story text fall back to local content in
[`lib/placeholder-data.ts`](lib/placeholder-data.ts) whenever Sanity isn't
configured, so nothing ever looks broken or empty.

## 1. Local development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). The homepage, flavors,
story, and booking pages all render with placeholder content immediately —
no environment variables required.

## 2. Connect your Sanity project (content — flavors, story copy, images)

1. Go to [sanity.io/manage](https://www.sanity.io/manage) and create a free
   account/project (the free tier is more than enough for this site).
2. Copy the **Project ID** it gives you.
3. Create `.env.local` in the project root (copy `.env.example`) and set:
   ```
   NEXT_PUBLIC_SANITY_PROJECT_ID=your-project-id
   NEXT_PUBLIC_SANITY_DATASET=production
   ```
4. Restart `npm run dev`. Visit **http://localhost:3000/studio** — that's
   your CMS, embedded right in the site. Sign in with the same account.
5. (Optional but recommended) Seed the starter flavors and story copy so
   Studio isn't empty on first login:
   - In [sanity.io/manage](https://www.sanity.io/manage), under your project
     → **API** → **Tokens**, create a token with **Editor** permissions.
   - Add it to `.env.local` as `SANITY_API_TOKEN=...`.
   - Run:
     ```bash
     npm run seed
     ```
   - This creates the 7 starter flavors (zabaione, chocolate, pistachio,
     fior di latte, fig & port, peanut butter & dulce de leche,
     rum-caramelized banana) and the story/homepage copy as text only —
     open `/studio` afterward and drag your real photography into each
     flavor's **Hero image** field (and the Site Settings image fields) when
     you have it. Until then, the site shows a clearly labeled placeholder
     graphic in that flavor's place — nothing looks broken.

**Editing content going forward:** just use `/studio`. No code changes
needed for new flavors, copy edits, or swapping photography.

## 3. Booking form emails (Resend)

The "Book an event" form posts to `app/api/book/route.ts`, which sends the
inquiry by email using [Resend](https://resend.com).

1. Create a free Resend account and get an API key at
   [resend.com/api-keys](https://resend.com/api-keys).
2. Add to `.env.local`:
   ```
   RESEND_API_KEY=your-key
   BOOKING_NOTIFICATION_EMAIL=you@yourdomain.com
   ```
3. Until you verify a sending domain in Resend, emails send from Resend's
   shared sandbox address (`onboarding@resend.dev`), which works fine for
   testing. Once you verify your own domain in Resend, set
   `BOOKING_FROM_EMAIL="Adelina Bookings <bookings@yourdomain.com>"` so
   emails come from your own address.
4. Without these two variables set, the form still validates and submits
   correctly, but shows a clear "booking inquiries aren't wired up yet"
   message instead of silently failing — so you'll know right away if this
   step got missed.

## 4. Deploying to Vercel

1. Push this repo to GitHub (or GitLab/Bitbucket).
2. Go to [vercel.com/new](https://vercel.com/new) and import the repo.
   Vercel auto-detects Next.js — no build config needed.
3. Before the first deploy (or right after, then redeploy), add the same
   environment variables from your `.env.local` in the Vercel project's
   **Settings → Environment Variables**:
   - `NEXT_PUBLIC_SANITY_PROJECT_ID`
   - `NEXT_PUBLIC_SANITY_DATASET`
   - `NEXT_PUBLIC_SANITY_API_VERSION` (optional, defaults to `2024-06-01`)
   - `RESEND_API_KEY`
   - `BOOKING_NOTIFICATION_EMAIL`
   - `BOOKING_FROM_EMAIL` (optional)
   - `SANITY_API_TOKEN` is only needed locally to run `npm run seed` — you
     don't need it on Vercel.
4. Deploy. Your site is live at the `*.vercel.app` URL Vercel gives you.
5. In Sanity Studio project settings
   ([sanity.io/manage](https://www.sanity.io/manage) → your project → API →
   CORS Origins), add your Vercel URL (and later your custom domain) as an
   allowed origin so `/studio` can talk to the API from production.

## 5. Pointing your custom domain

1. In the Vercel project, go to **Settings → Domains** and add your domain
   (e.g. `adelinagelato.com`).
2. Vercel will show you DNS records to add. At your domain registrar:
   - For the root domain, add the `A` record Vercel gives you (or use
     Vercel's nameservers if you'd rather they manage DNS).
   - For a `www` subdomain, add the `CNAME` record Vercel gives you.
3. Wait for DNS to propagate (usually minutes, sometimes longer) — Vercel's
   dashboard shows a green check once it's verified and SSL is issued.
4. Update `lib/site-config.ts` — set `domain` to your real domain. This
   feeds the SEO metadata and Open Graph URLs in `app/layout.tsx`.
5. Add your final domain to the Sanity CORS origins list too (step 5 above).

## Where things live

- `app/(site)/` — all public pages (home, flavors, story, book). Shares one
  layout with the header/footer.
- `app/studio/[[...tool]]/` — embedded Sanity Studio at `/studio`.
- `app/api/book/route.ts` — booking form email handler.
- `sanity/schemaTypes/` — the `flavor` document type and the `siteSettings`
  singleton (story text + homepage tagline).
- `lib/sanity/queries.ts` — all CMS reads, each with a placeholder fallback.
- `lib/placeholder-data.ts` — the local starter content (mirrors
  `scripts/seed.mjs`).
- `components/MediaFrame.tsx` — renders a real image via `next/image` when
  one exists, otherwise a moody gradient + grain placeholder clearly marked
  "Placeholder image."
