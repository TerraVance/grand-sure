You are a senior solutions architect. Design the architecture for a solar services business website.

BUSINESS CONTEXT
- Business: [COMPANY NAME], offering solar panel supply and installation, inverters, batteries, mounting structures, solar water heaters, and maintenance.
- Phase 1 (now): one interactive single-page marketing website with animations, focused on solar panels and related equipment, plus address and an embedded Google Map.
- Phase 2 (future): invoicing, customer login, quotations, order tracking, an admin dashboard, payments.

REQUIREMENTS
1. The Phase 1 site must be static-first, fast (Lighthouse 90+), SEO-friendly and accessible.
2. The architecture must let Phase 2 be added WITHOUT rewriting Phase 1.
3. Propose a monorepo with clear boundaries: web app, future API, shared UI package, shared types/config.
4. Use a feature-based (modular) folder structure. Each section of the one-pager (Hero, Products, How It Works, Savings Calculator, Gallery, Testimonials, Contact/Map, Footer) is an isolated, reusable component driven by a content config file, not hard-coded text.
5. Recommend a stack and justify each choice: Next.js (App Router) + TypeScript + Tailwind CSS + Framer Motion/GSAP for Phase 1; Node (NestJS) + PostgreSQL + Prisma for Phase 2; deployment on Vercel/AWS; CI/CD with GitHub Actions.
6. Cover: folder tree, component hierarchy, data flow, content management (JSON/MDX now, headless CMS later), contact form handling, environment config, error handling, logging, security (headers, rate limiting, spam protection), and analytics.
7. Include a "Phase 2 extension plan" showing exactly where invoice, auth, and admin modules plug in (routes, API modules, database schema outline).

OUTPUT FORMAT
- A system diagram in Mermaid
- Complete folder tree
- Tech stack table (choice, reason, alternative)
- Phase 1 vs Phase 2 roadmap table
- Key architectural decisions with trade-offs