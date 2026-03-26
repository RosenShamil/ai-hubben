# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

AI-hubben is Katrineholm municipality's PWA platform for AI assistants, statistics, training, and resources.
Domain: aihubben.se | Hosting: Vercel | Repo: github.com/RosenShamil/ai-hubben

## Commands

```bash
pnpm dev          # Start dev server (turbopack)
pnpm build        # Production build (webpack — turbopack is dev-only)
pnpm lint         # ESLint
```

No test framework is configured. Build uses webpack because Serwist service worker requires it — `pnpm dev` uses Turbopack, so dev/prod rendering can diverge. Always verify with `pnpm build` before deploying.

**Required env vars** (in `.env.local`): `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`

**Path alias:** `@/*` -> `./src/*` (configured in tsconfig.json)

## Tech Stack

- **Next.js 16** (App Router) + TypeScript + **pnpm**
- **Tailwind CSS v4** via PostCSS plugin — **no `tailwind.config` file**. All theme config lives in `src/app/globals.css` using `@theme inline` blocks and CSS custom properties. To add colors, spacing, or fonts, edit `globals.css`, not a config file.
- **Aceternity UI** (copy-paste components in `src/components/ui/`) + **shadcn/ui**
- **Framer Motion** for animations + swipe gestures; **GSAP** for scroll-triggered animations
- **Supabase** (PostgreSQL + Auth + Storage) — client-side SDK + one server action for cache revalidation
- **Serwist** for PWA/service worker (disabled in dev, active in production)
- **Recharts** for statistics charts
- **React Hook Form** + **Zod** for form validation (auth + admin pages)
- **Lucide React** for icons; **next-themes** for light/dark mode
- **Umami Cloud** for privacy-friendly analytics

## Architecture

### Route Structure

Two layout groups under `src/app/`:

- **`(main)/`** — Public pages: `/`, `/assistenter`, `/assistenter/[id]`, `/statistik`, `/utbildning` (tabbed: utbildning/akademin/begrepp), `/utbildning/akademin/[courseId]`, `/utbildning/akademin/certifikat`, `/dokumentation`, `/nyheter`, `/nyheter/[slug]`, `/faq`, `/om`, `/kontakt`, `/logga-in`, `/registrera`, `/profil`, `/integritetspolicy`, `/tillganglighet`
- **`(admin)/admin/`** — Protected admin CRUD: `/admin/startsida`, `/admin/nyheter`, `/admin/statistik`, `/admin/akademin`, `/admin/assistenter`, `/admin/utbildning`, `/admin/dokument`, `/admin/faq`, `/admin/team`, `/admin/innehall`, `/admin/meddelanden`, `/admin/kontakt`, `/admin/resurser`, `/admin/login`, `/admin/anvandare`

**Redirects:** `/akademin` -> `/utbildning?flik=akademin`, `/kunskapsbank` -> `/utbildning?flik=begrepp`

### Data Flow

- **No global state library.** Server components fetch on render; client components use `useState` + `useEffect` with direct Supabase calls.
- **No React Query/SWR.** Manual fetch + refetch patterns.
- Public pages use server components with `revalidate` for ISR caching.
- Admin pages are all `"use client"` with local state.
- Assistants merge two sources: Intric Marketplace API (live, 5 min ISR) + Supabase `assistants` table (community submissions).
- Statistics are admin-managed via `stats_data` table (Intric API has no stats endpoints). Admin saves auto-calculate "Totalt" and "Årsjämförelse" from 2025+2026 data, and trigger `revalidatePath("/statistik")` via server action (`src/app/actions.ts`).
- Training sessions use `status` field (`open`/`closed`/`full`/`completed`) to control registration availability on the public page.
- **One API route:** `/nyheter/rss.xml` for RSS feed. All other data goes through Supabase client SDK.

### Auth Model

Client-side only via `AuthProvider` context (`src/components/shared/auth-provider.tsx`):
- `AuthProvider` wraps the `(main)` layout, providing `useAuth()` hook with `{ user, profile, isAdmin, loading, signOut, refreshProfile }`
- Admin users determined by `admins` table — no self-registration as admin
- Admin layout checks `isCurrentUserAdmin()` on mount and redirects if unauthenticated
- No middleware — all auth is in layout components and AuthProvider context
- Progress (education, knowledge) syncs between localStorage and Supabase `user_progress` on login

### Key Infrastructure Files

- `src/lib/supabase.ts` — Supabase client init
- `src/lib/supabase-auth.ts` — Auth helpers (signIn, signUp, signOut, isCurrentUserAdmin, etc.)
- `src/lib/constants.ts` — Navigation links, mobile tabs, footer links, brand gradient
- `src/lib/utils.ts` — `cn()` helper (clsx + tailwind-merge)
- `src/app/actions.ts` — Server actions (revalidateStats, deleteUserAccount, exportUserData)
- `src/hooks/use-swipe-navigation.ts` — Reusable Framer Motion swipe gesture hook
- `src/sw.ts` — Serwist service worker config
- `src/app/manifest.ts` — PWA web app manifest

Data files in `src/lib/` follow `{feature}-{concern}.ts` naming (e.g., `education-data.ts`, `education-progress.ts`, `knowledge-bank.ts`).

### Supabase Tables

`profiles`, `user_progress`, `user_favorites`, `admins`, `assistants`, `featured_assistants`, `assistant_overrides`, `posts`, `faqs`, `documents`, `team_members`, `contact_messages`, `contact_entries`, `training_resources`, `training_sessions` (has `status` column: open/closed/full/completed), `training_registrations`, `site_content`, `stats_data`, `education_events`

### Styling

- Tailwind v4 with CSS custom properties in `globals.css` (light default, dark toggle via `@custom-variant dark`)
- Fonts: **Bodoni Moda** (headings via `--font-heading`), **General Sans** (body via `--font-sans`), **Geist Mono** (labels via `--font-mono`)
- Brand rainbow gradient in `constants.ts` (`BRAND_GRADIENT`)
- shadcn `cva` pattern for component variants

### Component Organization

- `src/components/shared/` — Navbar, Footer, BottomTabBar, ChatWidget, ThemeProvider, AuthProvider, SearchModal, etc.
- `src/components/ui/` — shadcn + Aceternity animated components
- `src/components/{feature}/` — Feature-specific components (akademin, kunskapsbank, ai-guide, etc.)

### SEO

- `src/app/sitemap.ts` — Dynamic sitemap (static pages + courses + posts + assistants)
- `src/app/robots.ts` — Blocks `/admin/`, `/profil`, `/logga-in`, `/registrera`
- Dynamic `generateMetadata()` on `/nyheter/[slug]` and `/assistenter/[id]`

## Conventions

- **Swedish** for UI text and routes (`/assistenter`, `/statistik`, `/utbildning`)
- **English** for code (variable names, component names, commit messages)
- Design goal: **Speakeasy-inspired** — premium, sophisticated, not generic AI/Tailwind-look
- Mobile-first PWA with app-like feel (bottom tab bar, swipe gestures, pull-to-refresh)
- Max 2-3 heavy animations per page
- WCAG 2.1 AA + 2.2 prep (focus-visible, aria-labels, prefers-reduced-motion, target size ≥24px)
- Workflow: explain -> approve -> implement -> test -> push

## Design Decisions (Intentional)

- Statistics are admin-managed (not live API) — Intric has no stats endpoints
- News uses custom markdown parser (not MDX) — supports bold, headings, lists, links, emails
- Search uses PostgreSQL full-text search (`search_all` RPC) with Swedish stemming + prefix matching + ilike fallback
- Community assistant uploads go live immediately (no moderation queue)
- GDPR consent required at registration (acceptPrivacy checkbox + Zod validation)
- Account deletion available via profile page (two-step confirmation, deletes all data)
- Data export available via profile page (JSON download)

## Not Yet Implemented

- **Domain migration** — `kommunai.se` registered but not configured (see `docs/roadmap-todo.md`)
- **LMS / custom courses** — Concept designed but not built (see `docs/roadmap-todo.md`)
- **Compliance (organizational)** — 8 of 28 items remain, all requiring organizational action (MCF, archiving, Umami DPA, cybersecurity assessment, network participation). See `docs/regelverk-och-compliance.md`.

## Documentation

- `docs/aihubben-masterplan.md` — Design brief, database schema, feature roadmap
- `docs/design-system.md` — Color tokens, typography scales, spacing, component patterns
- `docs/roadmap-todo.md` — LMS concept, multi-kommun vision, business model, prioritized phases
- `docs/ikai-*.md` — iKAI knowledge base, system prompt, and test checklist

### Compliance & Regulatory (docs/)

- `regelverk-och-compliance.md` — Master checklist (28 items, 20 complete) with status
- `intric-dpia.md` — DPIA for Intric AI (~28 pages, IMY 10-step model)
- `dpia-research-underlag.md` — Research compilation for DPIA
- `ai-riskklassificering.md` — EU AI Act risk classification
- `ai-policy.md` — Municipal AI policy (18 sections, DIGG-based)
- `ai-systemdokumentation.md` — Technical AI system documentation
- `registerforteckning.md` — GDPR Art. 30 register of processing activities
- `suveranitetsanalys.md` — Cloud sovereignty analysis (eSam methodology)
- `informationsklassificering.md` — KLASSA-based information classification
- `incidentrapporteringsrutin.md` — NIS2 incident reporting routine
- `kontinuitetsplan.md` — Business continuity plan
