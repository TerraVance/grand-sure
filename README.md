# Grand Sure

Phase 1 marketing site for Grand Sure solar supply and installation. Next.js App Router, TypeScript, deployed on Vercel.

## Scripts

- `npm run dev` — local site
- `npm run build` — production build
- `npm test` — unit and component tests
- `npm run lint` and `npm run typecheck`

## Environment

Copy `.env.example` to `.env.local`.

- `NEXT_PUBLIC_SITE_URL` — canonical URL used for metadata, sitemap, and robots
- `RESEND_API_KEY` and `QUOTE_TO_EMAIL` — quote notifications. Without them, development logs the request and still returns success. Production returns an error until both are set.
- `QUOTE_FROM_EMAIL` — verified Resend sender
- `UPSTASH_REDIS_REST_URL` and `UPSTASH_REDIS_REST_TOKEN` — optional rate limit store. Without them, the quote route uses a short-lived in-memory limit, which is weak on serverless.

Business address, phone, WhatsApp, email, hours, and the Google Maps link live in `src/content/business.ts`. They are placeholders until you replace them. Set `mapsEmbedUrl` to a Google Maps embed URL and `mapsLink` to the directions URL when you have them.

## Deploy

Import the repository in Vercel. Set the environment variables above for Production and Preview. The contact form posts to `POST /api/quote`.

### Domain: grandsureelectricals.in

1. Deploy the project on Vercel until the default `*.vercel.app` URL opens the site.
2. In Vercel → Project → Settings → Domains, add `grandsureelectricals.in` and `www.grandsureelectricals.in`.
3. At the domain registrar, point DNS as Vercel shows (usually an A record for `@` and a CNAME for `www`).
4. Set Production env `NEXT_PUBLIC_SITE_URL=https://grandsureelectricals.in`, then redeploy.
5. Confirm `https://grandsureelectricals.in` returns the site (not 403 or a registrar parking page).
6. In [Google Search Console](https://search.google.com/search-console), add the domain, verify ownership, and submit `https://grandsureelectricals.in/sitemap.xml`.
7. In Google Business Profile, add the website URL so Maps and search both link to the site.
8. Add the Instagram profile URL in `src/content/business.ts` under `social` so local search can connect the brand profiles.

Google will keep ranking Instagram and Maps until the live site is crawlable and indexed. Brand searches can take days to weeks after a correct deploy.

Phase 2 (customer login, quotations, invoices, admin) is not built. Reserved route groups are `src/app/(portal)` and `src/app/(admin)`. `src/server/quotes.ts` is the place a database write attaches later.
