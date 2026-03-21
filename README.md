# AI-hubben

Katrineholms kommuns centrala plattform för AI-assistenter, statistik, utbildning och resurser.

**Domän:** [aihubben.se](https://aihubben.se)

---

## Om projektet

AI-hubben samlar allt AI-relaterat för Katrineholms kommun på ett ställe:

- **Assistentbibliotek** — Kommunens AI-assistenter via Intric, med chatt och import
- **Statistik** — Dashboards med användningsdata, trender och AI-modellfördelning
- **Utbildning** — Kalender med anmälan, utbildningsmaterial och kontaktformulär
- **Dokumentation** — Riktlinjer, policyer, guider, video + Intric-dokumentation
- **Nyheter** — Blogginlägg med rich content, bilder och YouTube-embed
- **FAQ** — Sökbar accordion med frågor och svar
- **Om oss** — Teamet, uppdrag och ansvarsområden
- **Kontakt** — Formulär med admin-inbox
- **AI-chatbot** — Flytande iKAI-assistent på alla sidor
- **Admin-panel** — Fullständig hantering av allt innehåll

## Tech stack

| Kategori | Teknik |
|----------|--------|
| Framework | Next.js 16 (App Router) + TypeScript |
| Styling | Tailwind CSS v4 |
| UI | Aceternity UI + shadcn/ui |
| Animation | Framer Motion |
| Databas | Supabase (PostgreSQL + Auth + Storage) |
| Hosting | Vercel |
| PWA | Serwist |
| Typografi | Geist Sans + Geist Mono + Bodoni Moda |
| Ikoner | Lucide React |
| Charts | Recharts |
| AI-plattform | Intric |
| Pakethanterare | pnpm |

## Komma igång

```bash
# Klona repot
git clone https://github.com/RosenShamil/ai-hubben.git
cd ai-hubben

# Installera dependencies
pnpm install

# Skapa .env.local med Supabase-nycklar
cp .env.example .env.local

# Starta dev-server
pnpm dev
```

### Miljövariabler

Skapa `.env.local` med:

```
NEXT_PUBLIC_SUPABASE_URL=https://ditt-projekt.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=din-anon-nyckel
SUPABASE_SERVICE_ROLE_KEY=din-service-role-nyckel
```

## Kommandon

```bash
pnpm dev          # Starta dev-server
pnpm build        # Bygga för produktion
pnpm lint         # Kör ESLint
```

## Projektstruktur

```
src/
├── app/
│   ├── (main)/           # Publika sidor
│   │   ├── assistenter/  # Assistentbibliotek + detaljvy
│   │   ├── statistik/    # Dashboards
│   │   ├── utbildning/   # Kalender + material
│   │   ├── dokumentation/# Dokument + Intric docs
│   │   ├── nyheter/      # Blogg + enskilda inlägg
│   │   ├── faq/          # Vanliga frågor
│   │   ├── om/           # Om digitaliseringsavdelningen
│   │   └── kontakt/      # Kontaktformulär
│   └── (admin)/admin/    # Admin-panel (skyddad)
│       ├── startsida/    # Utvalda assistenter
│       ├── statistik/    # Redigera all statistik
│       ├── utbildning/   # Utbildningstillfällen
│       ├── resurser/     # Utbildningsmaterial
│       ├── dokument/     # Dokumenthantering
│       ├── team/         # Teammedlemmar
│       ├── innehall/     # Texter + chattlänkar
│       ├── nyheter/      # Bloggeditor
│       ├── faq/          # FAQ-hantering
│       ├── assistenter/  # Community-assistenter
│       └── meddelanden/  # Kontaktmeddelanden
├── components/           # React-komponenter
├── lib/                  # Datalogik, API-klienter, hjälpfunktioner
└── sw.ts                 # Service Worker (PWA)
```

## Designprinciper

- **"Stripe meets kommunal innovation"** — professionell, inte generisk AI-look
- **Speakeasy-inspirerad** — Bodoni-typografi, brand gradient, subtila animationer
- **Mobile-first** — PWA med app-känsla, installbar på mobil
- **Mörkt/ljust tema** — toggle tillgänglig överallt
- **Svenska** för UI-text, **engelska** för kod

## Admin-panel

Inloggning via `/admin/login`. Full kontroll över:

- Startsidans utvalda assistenter och texter
- All statistikdata (nyckeltal, diagram, trender)
- Utbildningstillfällen med kalender och anmälningar
- Dokument med filuppladdning och YouTube-video
- Teammedlemmar med bilder
- Blogginlägg med rich content
- FAQ, chattlänkar och kontaktmeddelanden

## Integrationer

- **Intric Marketplace API** — hämtar kommunens AI-assistenter
- **Intric Widget** — inbäddad AI-chatbot (iKAI)
- **Supabase** — databas, auth, fillagring
- **Serwist** — PWA med offline-stöd

---

Byggt av **Digitaliseringsavdelningen**, Katrineholms kommun.
