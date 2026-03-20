# AI-hubben — Projektkontext

## Vad är detta?
AI-hubben är Katrineholms kommuns centrala PWA-plattform för AI-assistenter, statistik, utbildning och resurser.
Domän: aihubben.se | Repo: github.com/RosenShamil/ai-hubben

## Tech stack
- **Framework:** Next.js 16 (App Router) + TypeScript
- **Styling:** Tailwind CSS v4
- **UI:** Aceternity UI (copy-paste) + shadcn/ui
- **Animation:** Framer Motion (primärt) + GSAP ScrollTrigger
- **Databas:** Supabase (PostgreSQL + Auth + Storage)
- **Hosting:** Vercel
- **PWA:** Serwist
- **Font:** Geist Sans + Geist Mono
- **Ikoner:** Lucide React
- **Charts:** Recharts
- **Forms:** React Hook Form + Zod
- **Pakethanterare:** pnpm

## Kommandon
```bash
pnpm dev          # Starta dev-server
pnpm build        # Bygga för produktion
pnpm lint         # Kör ESLint
```

## Designprinciper
- "Stripe meets kommunal innovation" — professionell, inte generisk AI-look
- Ljust tema default, mörkt som toggle
- Mobile-first, PWA med app-känsla
- Max 2-3 tunga animationer per sida, resten subtilt
- WCAG 2.1 AA tillgänglighet

## Konventioner
- Svenska för UI-text och routes (/assistenter, /statistik, /utbildning)
- Engelska för kod (variabelnamn, komponentnamn, commits)
- En komponent/funktion åt gången — testa innan nästa
- Förklara → godkänn → implementera → testa → pusha

## Fullständig specifikation
Se `docs/aihubben-masterplan.md`
