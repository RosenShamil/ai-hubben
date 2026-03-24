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

No test framework is configured. Build uses `next build --webpack` because Serwist service worker requires webpack.

**Required env vars** (in `.env.local`): `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`

**Path alias:** `@/*` → `./src/*` (configured in tsconfig.json)

## Tech Stack

- **Next.js 16** (App Router) + TypeScript
- **Tailwind CSS v4** (PostCSS plugin, no tailwind.config — all config in CSS)
- **Aceternity UI** (copy-paste components in `src/components/ui/`) + **shadcn/ui**
- **Framer Motion** for animations + swipe gestures
- **Supabase** (PostgreSQL + Auth + Storage) — client-side only, no server actions
- **Serwist** for PWA/service worker (disabled in dev, active in production)
- **Recharts** for statistics charts
- **GSAP** for scroll-triggered and timeline animations
- **React Hook Form** + **Zod** for form validation (auth + admin pages)
- **Lucide React** for icons
- **next-themes** for light/dark mode toggle
- **Umami Cloud** for analytics (privacy-friendly, cookie-free)
- **pnpm** as package manager

## Architecture

### Route Structure

Two layout groups under `src/app/`:

- **`(main)/`** — Public pages: `/`, `/assistenter`, `/assistenter/[id]`, `/statistik`, `/utbildning` (tabbed: utbildning/akademin/begrepp), `/utbildning/akademin/[courseId]`, `/utbildning/akademin/certifikat`, `/dokumentation`, `/nyheter`, `/nyheter/[slug]`, `/faq`, `/om`, `/kontakt`, `/logga-in`, `/registrera`, `/profil`
- **`(admin)/admin/`** — Protected admin CRUD: `/admin/startsida`, `/admin/nyheter`, `/admin/statistik`, `/admin/akademin`, `/admin/assistenter`, `/admin/utbildning`, `/admin/dokument`, `/admin/faq`, `/admin/team`, `/admin/innehall`, `/admin/meddelanden`, `/admin/kontakt`, `/admin/resurser`, `/admin/login`

**Redirects:** `/akademin` → `/utbildning?flik=akademin`, `/kunskapsbank` → `/utbildning?flik=begrepp` (legacy URLs preserved)

### SEO

- `src/app/sitemap.ts` — Dynamic sitemap at `/sitemap.xml` (static pages + courses + posts + assistants, revalidated hourly)
- `src/app/robots.ts` — Robots.txt blocking `/admin/`, `/profil`, `/logga-in`, `/registrera`, `/~offline`
- Dynamic `generateMetadata()` on `/nyheter/[slug]` and `/assistenter/[id]`

### Data Flow

- **One API route:** `/nyheter/rss.xml` generates an RSS 2.0 feed from published posts.
- All other data access goes directly through the Supabase client SDK.
- **No global state library.** Server components fetch on render; client components use `useState` + `useEffect` with direct Supabase calls.
- **No React Query/SWR.** Manual fetch + refetch patterns.
- Public pages use server components with `revalidate` for caching.
- Admin pages are all client components (`"use client"`) with local state.
- Statistics are managed manually via admin panel (`stats_data` table), not fetched live from Intric API.
- Assistants come from two sources merged: Intric Marketplace API (live, 5 min ISR) + Supabase `assistants` table (community submissions).

### Supabase Tables

`profiles`, `user_progress`, `user_favorites`, `admins`, `assistants`, `featured_assistants`, `posts`, `faqs`, `documents`, `team_members`, `contact_messages`, `contact_entries`, `training_resources`, `training_sessions`, `training_registrations`, `site_content`, `stats_data`, `education_events`

### Key Files

Core infrastructure:
- `src/lib/supabase.ts` — Supabase client init (public anon key)
- `src/lib/supabase-auth.ts` — Auth helpers: `signIn`, `signUp`, `signOut`, `isCurrentUserAdmin`, `getUserProfile`, `updateUserProfile`, `changePassword`, `resetPassword`
- `src/lib/auth-validation.ts` — Zod schemas for login, register, profile, password change forms
- `src/lib/constants.ts` — Navigation links, mobile tabs, footer links, brand gradient
- `src/lib/utils.ts` — `cn()` helper (clsx + tailwind-merge)
- `src/hooks/use-swipe-navigation.ts` — Reusable Framer Motion swipe gesture hook
- `src/sw.ts` — Serwist service worker config
- `src/app/manifest.ts` — PWA web app manifest

Data and progress (files in `src/lib/` follow `{feature}-{concern}.ts` naming):
- `progress-sync.ts` — Syncs localStorage progress with Supabase `user_progress` table on login
- `favorites.ts` — CRUD for user favorites in Supabase `user_favorites` table
- `intric.ts` — Fetches AI assistants from Intric Marketplace API (`marketplace.intric.ai`) + Supabase
- `assistant-chat-links.ts` — Per-assistant Intric public chat URLs (defaults + Supabase override)
- `stats-data.ts` — Statistics data with hardcoded defaults + Supabase `stats_data` fallback
- `training-data.ts` — Training session aggregation from Supabase
- `posts.ts` — News/blog post fetching from Supabase
- `knowledge-bank.ts` / `knowledge-progress.ts` — 222 concepts, quiz, learning paths + localStorage progress
- `education-data.ts` / `education-data-niva2.ts` / `education-data-niva3.ts` — All course/lesson/quiz data (96 lessons across 3 levels)
- `education-progress.ts` / `education-system.ts` / `education-analytics.ts` — Academy progress, XP/badges, admin analytics
- `certificate-generator.ts` — Canvas-based certificate rendering (PNG) for all 3 levels
- `badge-checker.ts` — Auto-check and award 13+ badges (common→legendary)
- `ai-guide-data.ts` / `ai-guide-profile.ts` — Onboarding quiz (7 departments, 7 roles, 30 use cases) + localStorage profile
- `explainers-data.ts` / `explainers-data-2.ts` / `explainers-data-3.ts` — 225 animated explainers
- `fun-facts.ts` / `daily-byte.ts` — 222 fun facts, daily concept picker

### Auth Model

Client-side only via `AuthProvider` context (`src/components/shared/auth-provider.tsx`):
- **Public users** register at `/registrera` (email verification required) and log in at `/logga-in`
- **Admin users** are determined by the `admins` table — no self-registration as admin
- `AuthProvider` wraps the `(main)` layout, providing `useAuth()` hook with `{ user, profile, isAdmin, loading, signOut, refreshProfile }`
- Admin layout checks `isCurrentUserAdmin()` on mount and redirects to `/logga-in` if unauthenticated
- Progress (education, knowledge, AI guide) syncs between localStorage and Supabase `user_progress` table on login
- No middleware — all auth is in layout components and the AuthProvider context

### Styling

- Tailwind v4 with CSS custom properties for theming (light default, dark toggle)
- Fonts: **Bodoni Moda** (headings), **General Sans** (body), **Geist Mono** (labels/uppercase)
- Brand rainbow gradient defined in `constants.ts` (`BRAND_GRADIENT`)
- Component variants via shadcn's `cva` pattern in `src/components/ui/button.tsx`

### Shared Components

- `src/components/shared/` — Navbar, Footer, BottomTabBar, ChatWidget (Intric iframe), ThemeProvider, AuthProvider, CountUp, FadeIn, PullToRefresh, SearchModal (Ctrl+K), SubmitAssistantModal
- `src/components/ai-guide/` — "Starta din AI-resa" interactive onboarding quiz on homepage
- `src/components/ui/` — shadcn + Aceternity animated components (spotlight, moving-border, etc.)
- Feature components live alongside their pages in `src/components/{feature}/`
- `src/components/kunskapsbank/` — Knowledge bank: concept cards, search, filters, storyboard lessons (swipe), quiz (swipe), scenarios, animated explainers, daily byte, my-journey
- `src/components/akademin/` — AI Academy: academy-page, course-overview, lesson-player (swipe), module-quiz, final-exam, certificate-viewer, xp-toast, badge-notification

### Mobile UX

- Bottom tab bar (5 tabs: Hem, Assistenter, Statistik, Utbildning, Mer)
- Pull-to-refresh on public + admin pages
- Swipe gestures (left/right) on lesson player, storyboard lessons, and quiz player via `useSwipeNavigation` hook
- Floating chat widget (Intric iframe) positioned above bottom tab bar
- `touchAction: "pan-y"` on swipeable areas to allow vertical scroll while capturing horizontal swipe

## Conventions

- **Swedish** for UI text and routes (`/assistenter`, `/statistik`, `/utbildning`)
- **English** for code (variable names, component names, commit messages)
- Design goal: Speakeasy-inspired — premium, sophisticated, not generic AI/Tailwind-look
- Mobile-first, PWA with app-like feel (bottom tab bar, smooth transitions)
- Max 2-3 heavy animations per page
- WCAG 2.1 AA accessibility (focus-visible, aria-labels, prefers-reduced-motion, skip link)
- Workflow: explain → approve → implement → test → push

## Project Status

### Fully Implemented (~95%)
- All 18 public pages + 15 admin pages
- Auth system (registration, login, profile, password change, admin check)
- AI-akademin: 3 certification levels, 96 lessons, quizzes, final exams, certificates, XP, 13+ badges
- Kunskapsbank: 222 concepts, 12 categories, 225 explainers, 222 fun facts, 6 learning paths, quizzes, scenarios, daily byte, my-journey
- AI-resa onboarding quiz (7 departments, 7 roles, personalized recommendations)
- Assistants library (Intric Marketplace + community uploads via modal + admin moderation)
- Statistics dashboard (admin-managed data, not live API)
- News/blog with RSS feed
- Global search modal (Ctrl+K, searches 8 data sources)
- Progress sync (localStorage ↔ Supabase on login)
- Favorites system (assistants, courses, lessons)
- Chat widget (embedded Intric iframe on all pages + per-assistant chat links)
- PWA (Serwist, offline fallback, installable)
- Training management with registration flow and capacity checks
- Full admin CMS (content, team, documents, FAQ, messages, resources, featured assistants, chat links, statistics)
- SEO (sitemap.xml, robots.txt, dynamic metadata)
- Swipe gestures on lesson player, storyboard, quiz

### Not Implemented
- **`/projekt` — Project/case showcase page** (5 projects described in masterplan: hemtjänst-AI, AI-kameror, SDK, digital post, katrineholm.se-assistent). No route, components, data, or admin page exists.

### Design Decisions (Intentional Simplifications)
- Statistics are admin-managed (not live Intric API) — Intric Marketplace API has no stats endpoints
- News content uses custom markdown parser (not MDX) — sufficient for current needs
- Search uses `ilike` substring matching (not Supabase full-text search) — works well for current data volume
- No skeleton loading states — pages load fast enough with spinners
- Community assistant uploads go live immediately (no `status` field / moderation queue)

## Documentation

- `docs/aihubben-masterplan.md` — Detailed design brief, database schema overview, and feature roadmap
- `docs/design-system.md` — Full design system: color tokens, typography scales, spacing, component patterns
- `docs/ikai-kunskap-aihubben.md` — Knowledge bank content reference
- `docs/ecc-kommandon.md` — ECC commands reference
