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

Phase 2 (customer login, quotations, invoices, admin) is not built. Reserved route groups are `src/app/(portal)` and `src/app/(admin)`. `src/server/quotes.ts` is the place a database write attaches later.
