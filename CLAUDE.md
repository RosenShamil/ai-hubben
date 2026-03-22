# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

AI-hubben is Katrineholm municipality's PWA platform for AI assistants, statistics, training, and resources.
Domain: aihubben.se | Repo: github.com/RosenShamil/ai-hubben

## Commands

```bash
pnpm dev          # Start dev server (turbopack)
pnpm build        # Production build (webpack — turbopack is dev-only)
pnpm lint         # ESLint
```

No test framework is configured. Build uses `next build --webpack` because Serwist service worker requires webpack.

## Tech Stack

- **Next.js 16** (App Router) + TypeScript
- **Tailwind CSS v4** (PostCSS plugin, no tailwind.config — all config in CSS)
- **Aceternity UI** (copy-paste components in `src/components/ui/`) + **shadcn/ui**
- **Framer Motion** for animations
- **Supabase** (PostgreSQL + Auth + Storage) — client-side only, no server actions
- **Serwist** for PWA/service worker (disabled in dev, active in production)
- **Recharts** for statistics charts
- **GSAP** for scroll-triggered and timeline animations
- **React Hook Form** + **Zod** for form validation (admin pages)
- **Lucide React** for icons
- **next-themes** for light/dark mode toggle
- **pnpm** as package manager

## Architecture

### Route Structure

Two layout groups under `src/app/`:

- **`(main)/`** — Public pages: `/`, `/assistenter`, `/statistik`, `/utbildning`, `/kunskapsbank`, `/akademin`, `/dokumentation`, `/nyheter`, `/faq`, `/om`, `/kontakt`, `/~offline`
- **`(admin)/admin/`** — Protected admin CRUD: `/admin/nyheter`, `/admin/statistik`, `/admin/akademin`, `/admin/assistenter`, `/admin/utbildning`, `/admin/faq`, `/admin/team`, `/admin/innehall`, `/admin/meddelanden`, etc.

### Data Flow

- **No API routes.** All data access goes directly through the Supabase client SDK.
- **No global state library.** Server components fetch on render; client components use `useState` + `useEffect` with direct Supabase calls.
- **No React Query/SWR.** Manual fetch + refetch patterns.
- Public pages use server components with `revalidate` for caching.
- Admin pages are all client components (`"use client"`) with local state.

### Key Files

- `src/lib/supabase.ts` — Supabase client init (public anon key)
- `src/lib/supabase-auth.ts` — Auth helpers: `signIn`, `signOut`, `isCurrentUserAdmin` (checks `admins` table)
- `src/lib/intric.ts` — Fetches AI assistants from Intric Marketplace API + Supabase
- `src/lib/constants.ts` — Navigation links, mobile tabs, footer links, brand gradient
- `src/lib/knowledge-bank.ts` — Kunskapsbank types, categories, 222 concepts, learning paths, quiz & scenario data
- `src/lib/knowledge-progress.ts` — localStorage-based progress tracking (read concepts, quiz scores, streaks)
- `src/lib/explainers-data.ts` — 225 animated step-by-step explainers for all concepts
- `src/lib/fun-facts.ts` — 222 "Visste du att..." fun facts
- `src/lib/daily-byte.ts` — Daily concept selection logic (date-based, prioritizes unseen)
- `src/lib/education-system.ts` — AI-akademin types, XP rewards, badges, certification levels
- `src/lib/education-data.ts` — All course/module/lesson/quiz data (Nivå 1 complete)
- `src/lib/education-data-niva2.ts` — Nivå 2 lessons, quiz, and exam data (32 lessons)
- `src/lib/education-data-niva3.ts` — Nivå 3 lessons, quiz, and exam data (32 lessons)
- `src/lib/education-progress.ts` — localStorage progress for academy (lessons, quizzes, certs, XP)
- `src/lib/education-analytics.ts` — Fire-and-forget event reporting to Supabase for admin analytics
- `src/lib/certificate-generator.ts` — Canvas-based certificate rendering (PNG)
- `src/lib/badge-checker.ts` — Auto-check and award badges
- `src/lib/utils.ts` — `cn()` helper (clsx + tailwind-merge)
- `src/sw.ts` — Serwist service worker config
- `src/app/manifest.ts` — PWA web app manifest

### Auth Model

Client-side only. Admin layout checks `isCurrentUserAdmin()` on mount and redirects to `/admin/login` if unauthenticated. No middleware — all auth is in layout components.

### Styling

- Tailwind v4 with CSS custom properties for theming (light default, dark toggle)
- Fonts: **Bodoni Moda** (headings), **General Sans** (body), **Geist Mono** (labels/uppercase)
- Brand rainbow gradient defined in `constants.ts` (`BRAND_GRADIENT`)
- Component variants via shadcn's `cva` pattern in `src/components/ui/button.tsx`

### Shared Components

- `src/components/shared/` — Navbar, Footer, BottomTabBar, ChatWidget, ThemeProvider, CountUp, FadeIn
- `src/components/ui/` — shadcn + Aceternity animated components (spotlight, moving-border, etc.)
- Feature components live alongside their pages in `src/components/{feature}/`
- `src/components/kunskapsbank/` — Knowledge bank: concept cards, search, filters, storyboard lessons, quiz, scenarios, animated explainers, daily byte, my-journey
- `src/components/akademin/` — AI Academy: academy-page, course-overview, lesson-player, module-quiz, final-exam, certificate-viewer, xp-toast, badge-notification

## Conventions

- **Swedish** for UI text and routes (`/assistenter`, `/statistik`, `/utbildning`)
- **English** for code (variable names, component names, commit messages)
- Design goal: Speakeasy-inspired — premium, sophisticated, not generic AI/Tailwind-look
- Mobile-first, PWA with app-like feel (bottom tab bar, smooth transitions)
- Max 2-3 heavy animations per page
- WCAG 2.1 AA accessibility
- Workflow: explain → approve → implement → test → push

## Documentation

- `docs/aihubben-masterplan.md` — Detailed design brief, database schema overview, and feature roadmap
- `docs/design-system.md` — Full design system: color tokens, typography scales, spacing, component patterns
- `docs/ikai-kunskap-aihubben.md` — Knowledge bank content reference
