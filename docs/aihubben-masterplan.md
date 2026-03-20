# AI-HUBBEN — Masterplan
## Katrineholms AI-hub för assistenter, statistik, utbildning och resurser

**Version:** 1.1 (uppdaterad med beslut från planeringssession)
**Datum:** 2026-03-20
**Status:** Under implementation

---

## 1. PROJEKTÖVERSIKT

### 1.1 Vad är AI-hubben?
AI-hubben är Katrineholms kommun centrala plattform för allt AI-relaterat. Den samlar:
- Ett bibliotek med 300+ AI-assistenter (byggda i Intric)
- Live-statistik från Intric-plattformen
- Dokumentation, riktlinjer och vägledning (PDF:er)
- Utbildningar, workshops och videoresurser
- Projekt och case från kommunens AI-implementeringar
- En egendesignad AI-chatbot med tillgång till kommundata

### 1.2 Målgrupper
- **Primär:** Kommunanställda i Katrineholm (alla förvaltningar)
- **Sekundär:** Andra kommuner, partners, beslutsfattare, allmänheten
- Alla anställda ska kunna ladda upp och dela sina egna assistenter

### 1.3 ⚠️ KÄRNKRAV: PROGRESSIVE WEB APP (PWA)

**AI-hubben är INTE en vanlig webbsida. Det är en app som körs i webbläsaren.**

Användarna ska kunna:
- **Installera appen** på sin mobiltelefon (Android + iOS) direkt från webbläsaren
- **Öppna den från hemskärmen** som vilken app som helst — ingen adressfält, ingen browser-chrome
- **Använda den offline** — statiska sidor och cachad data ska fungera utan internet
- **Få en app-känsla** — snabba övergångar, smooth scrolling, native-liknande navigation
- **Fungera perfekt på mobil** — mobile-first design, touch-optimerad, responsiv

**Designprinciper för app-känsla:**
- Sticky bottom navigation på mobil (som en riktig app, inte bara en hamburger-meny)
- Pull-to-refresh på statistiksidan
- Smooth page transitions (inte hård sidladdning)
- Skeleton loading states (inte vita sidor eller spinners)
- Haptic feedback-känsla i interaktioner
- Splash screen vid appstart
- Fullskärmsläge utan browser-UI
- Snabb — under 2 sekunder initial load, under 200ms navigering

**Tekniskt:**
- Service Worker för caching och offline-stöd
- Web App Manifest med ikoner, tema, splash screen
- **Serwist** för Next.js-integration (valt över next-pwa pga bättre underhåll och Next.js 16-stöd)
- Lighthouse PWA-score 100
- Testat på: Chrome Android, Safari iOS, Chrome Desktop, Edge

### 1.4 Namn & Domän
- **Namn:** AI-hubben
- **Domän:** aihubben.se (egen domän)
- **Profil:** Fristående från kommunens grafiska profil — egen AI-identitet

---

## 2. TECH STACK

### 2.1 Komplett lista

| Kategori | Teknik | Syfte |
|----------|--------|-------|
| **Framework** | Next.js 16 (App Router) | Frontend + API routes + SSR + PWA |
| **Språk** | TypeScript | Typsäkerhet genom hela projektet |
| **Databas** | Supabase (PostgreSQL) | Data, auth, storage, realtime |
| **Hosting** | Vercel | Deploy, CDN, edge functions |
| **Styling** | Tailwind CSS v4 | Bas-styling |
| **UI-komponenter** | Aceternity UI (copy-paste) + shadcn/ui | Premium animerade komponenter |
| **Animationer** | Framer Motion (primärt) + GSAP ScrollTrigger | UI transitions + scroll-animationer |
| **Typografi** | Geist (Vercel's font) | Modern, premium känsla |
| **Ikoner** | Lucide React | Konsekvent ikonbibliotek |
| **Charts** | Recharts eller Tremor | Statistik-visualiseringar |
| **Forms** | React Hook Form + Zod | Formulärhantering + validering |
| **API-integration** | Intric API | Live-statistik + chatbot |
| **PWA** | Serwist | Service worker, offline, installbar |
| **Markdown/MDX** | next-mdx-remote | Blogg/nyheter-innehåll |
| **Sök** | Supabase Full-text search | Global sökning |
| **Analytics** | Plausible eller Umami | Integritetsvänlig analys |

### 2.2 MCP-servrar för Claude Code / Cursor

Dessa MCP-servrar ska konfigureras INNAN kodning påbörjas. Claude Code diskuterar varje server med dig och du autentiserar.

#### ✅ KRITISKA (måste ha)

**1. Supabase MCP** — Direkt tillgång till databas, auth, storage, edge functions
```json
{
  "supabase": {
    "url": "https://mcp.supabase.com/mcp?project_ref=<ditt-projekt-ref>"
  }
}
```
- Claude Code kan: skapa tabeller, köra queries, hantera auth, inspektera schema
- Auth: OAuth (öppnar webbläsare automatiskt)
- ⚠️ Scopa ALLTID till specifikt projekt (project_ref)

**2. GitHub MCP** — PR-hantering, issue-tracking, repo-hantering
```json
{
  "github": {
    "type": "http",
    "url": "https://api.githubcopilot.com/mcp/"
  }
}
```
- Claude Code kan: pusha kod, skapa PRs, hantera issues, söka i repot
- Auth: GitHub token (du autentiserar via /mcp kommandot)

**3. Vercel MCP** — Deploy, projekthantering, miljövariabler
```json
{
  "vercel": {
    "type": "http",
    "url": "https://mcp.vercel.com/mcp"
  }
}
```
- Claude Code kan: deploya, kolla deploy-status, hantera env-vars, skapa projekt
- Auth: Vercel OAuth

#### 🔧 REKOMMENDERADE (stor nytta)

**4. Playwright MCP** — Automatiserad testning i webbläsaren
```json
{
  "playwright": {
    "command": "npx",
    "args": ["-y", "@anthropic/mcp-server-playwright"]
  }
}
```
- Claude Code kan: köra E2E-tester, verifiera att sidor fungerar, testa responsivitet
- Använder accessibility tree (inte screenshots) — snabbt och pålitligt
- Perfekt för att testa varje steg innan push

**5. Context7 MCP** — Uppdaterad dokumentation för alla bibliotek
```json
{
  "context7": {
    "type": "http",
    "url": "https://mcp.context7.com/mcp"
  }
}
```
- Claude Code kan: hämta aktuell dokumentation för Next.js, Supabase, Tailwind, etc.
- Undviker utdaterade API-anrop — alltid senaste versionen
- Gratis, ingen auth krävs

> **BORTTAGNA:** Sequential Thinking, Memory och Filesystem MCP — onödiga då Claude Code har inbyggt minne och filåtkomst.

#### Komplett `.mcp.json` för projektet:
```json
{
  "mcpServers": {
    "supabase": {
      "url": "https://mcp.supabase.com/mcp?project_ref=<DITT_PROJEKT_REF>"
    },
    "github": {
      "type": "http",
      "url": "https://api.githubcopilot.com/mcp/"
    },
    "vercel": {
      "type": "http",
      "url": "https://mcp.vercel.com/mcp"
    },
    "playwright": {
      "command": "npx",
      "args": ["-y", "@anthropic/mcp-server-playwright"]
    },
    "context7": {
      "type": "http",
      "url": "https://mcp.context7.com/mcp"
    }
  }
}
```

#### Setup-ordning:
1. Claude Code föreslår vilka MCP-servrar som behövs
2. Du autentiserar varje server (OAuth/token)
3. Claude Code verifierar att alla servrar är anslutna
4. Först därefter börjar kodning

### 2.3 Verktyg att installera lokalt
- Node.js 20+
- pnpm (pakethanterare)
- Cursor IDE eller VS Code med Claude Code
- Supabase CLI (`npx supabase init`)
- Vercel CLI (`npx vercel`)

---

## 3. DESIGN BRIEF

### 3.1 Designfilosofi
**"Stripe meets kommunal innovation"** — Polerad, professionell, med strategiskt placerade wow-moments. Inte "vibe-coded" generiskt. Varje animation ska ha ett syfte.

### 3.2 Färgschema

**Ljust tema (DEFAULT):**
```css
--background: #FAFAFA;          /* Varm off-white */
--foreground: #0A0A0F;          /* Nästan svart text */
--primary: #2563EB;             /* Levande blå (AI-accent) */
--primary-gradient: linear-gradient(135deg, #06B6D4, #2563EB, #7C3AED); /* Cyan → Blå → Lila */
--secondary: #F1F5F9;           /* Ljusgrå sektioner */
--card: #FFFFFF;                /* Vita kort med subtil skugga */
--border: #E2E8F0;              /* Mjuk border */
--muted: #64748B;               /* Sekundär text */
--accent: #7C3AED;              /* Lila accent för highlights */
```

**Mörkt tema (toggle):**
```css
--background: #0A0A0F;          /* Djup mörk */
--foreground: #F8FAFC;          /* Ljus text */
--primary: #3B82F6;             /* Ljusare blå */
--card: #1A1A2E;                /* Mörka kort */
--border: #1E293B;              /* Subtil border */
```

### 3.3 Typografi
- **Rubriker:** Geist Sans (Bold/Semibold)
- **Brödtext:** Geist Sans (Regular) — 16px bas
- **Kod/data:** Geist Mono
- **Hero-text:** Stor (48-72px), gradient text-effekt

### 3.4 Designelement per sida

**Globalt:**
- Floating navigation med blur-backdrop (desktop)
- **Sticky bottom tab bar på mobil** (som Instagram/Spotify — inte hamburger-meny):
  - Hem | Assistenter | Statistik | Utbildning | Mer (...)
  - Aktiv tab med accent-färg och subtil animation
  - Smooth tab-switching utan sidladdning
- Smooth page transitions (Framer Motion — app-känsla, inte webbsida-känsla)
- Dark/light toggle i navbar
- AI-chatbot som flytande knapp nere till höger med animerad border beam
- Skeleton loading states (inte spinners — aldrig vita sidor)
- Breadcrumbs på alla undersidor (desktop)
- Pull-to-refresh på statistik och assistentbibliotek (mobil)
- Swipe-gester för navigering mellan relaterat innehåll (mobil)

**Specifika Aceternity UI / Magic UI komponenter att använda:**
- **Hero:** Spotlight-effekt eller Background Gradient med animerad text (TextGenerateEffect)
- **Assistentbibliotek:** 3D Card Effect med hover, eller Focus Cards
- **Statistik:** Glowing borders på kort, animerade siffror (CountUp)
- **Navigation:** Floating Dock eller subtil sticky nav
- **Bakgrunder:** Subtle Grid + Dot pattern (inte överallt, bara hero + statistik)
- **Scroll:** GSAP ScrollTrigger för sektionsövergångar mellan hero → statistik → bibliotek
- **Kort:** Card Spotlight eller Glare Card för projekt/case
- **Testimonials/citat:** Infinite Moving Cards för att visa assistenter
- **Timeline:** Timeline-komponent för Katrineholms AI-resa (Om-sidan)

### 3.5 Designprinciper
1. **Restraint** — Max 2-3 tunga animationer per sida. Resten subtilt.
2. **Funktion först** — Varje animation ska hjälpa användaren, inte distrahera.
3. **Tillgänglighet** — WCAG 2.1 AA. Hög kontrast, keyboard-navigering, reduced-motion respect.
4. **Mobile-first** — Designa för mobil först, skala upp till desktop.
5. **Snabb** — Lazy-load tunga komponenter. Lighthouse score 90+.

---

## 4. SIDSTRUKTUR & FUNKTIONALITET

### 4.1 Startsida (`/`)

**Sektioner (top-to-bottom scroll):**

1. **Hero**
   - Stor rubrik: "AI-hubben Katrineholm" med gradient text-animation
   - Undertitel: Kort beskrivning av plattformen
   - CTA-knappar: "Utforska assistenter" + "Se statistik"
   - Bakgrund: Spotlight eller Aurora-effekt (subtil)

2. **Live-statistik highlights**
   - 4-6 kort i rad med nyckeltal från Intric API:
     - Antal AI-assistenter
     - Antal ställda frågor (totalt)
     - Antal aktiva användare
     - Antal spaces
   - Animerade siffror (CountUp on scroll)
   - Glowing border-effekt på korten

3. **Utvalda assistenter**
   - Horisontell scroll eller grid med 6-8 populära assistenter
   - 3D Card Effect med hover-animation
   - Kategori-badge, kort beskrivning, vilken modell

4. **Senaste nyheter**
   - 3 senaste blogg/nyhets-inlägg
   - Kort-format med bild, rubrik, datum

5. **Snabblänkar**
   - Grid med ikoner: Utbildning, Dokumentation, Projekt, FAQ
   - Subtil hover-animation

6. **CTA-sektion**
   - "Har du byggt en assistent? Dela den här!"
   - Länk till uppladdningsformuläret

### 4.2 Assistentbiblioteket (`/assistenter`)

**Funktionalitet:**
- **Sök:** Fritext-sökning över namn, beskrivning, prompt
- **Filter:**
  - Kategori/verksamhetsområde (HR, Utbildning, Vård, Samhällsbyggnad, etc.)
  - AI-modell (GPT-4, Claude, etc.)
  - Skapare
  - Popularitet / Senast tillagda
- **Visning:** Grid (kort) eller lista (kompakt) — toggle
- **Sortering:** Senaste, populäraste, alfabetiskt

**Varje assistentkort visar:**
- Namn
- Kort beskrivning (max 2 rader)
- Kategori-badge
- AI-modell-ikon
- Antal frågor ställda (om tillgängligt)

**Detaljsida per assistent (`/assistenter/[slug]`):**
- Fullständig beskrivning
- Prompten (visa/dölj, kopierbar)
- Vilken modell som används
- Verksamhetsområde
- Skapare
- Statistik (om tillgängligt)
- "Testa i Intric"-länk (deep link till Intric)
- Relaterade assistenter

**Ladda upp assistent (öppet formulär):**
- Fält: Namn, beskrivning, prompt, kategori (dropdown), modell (dropdown), skaparens namn/enhet
- Ingen inloggning krävs — men admin måste godkänna (moderationskö)
- Status: "Väntar på godkännande" → "Publicerad"

### 4.3 Statistik Dashboard (`/statistik`)

**Data från Intric API (live eller cachad med revalidation var 5:e minut):**

**Översiktskort (top):**
- Totalt antal spaces
- Totalt antal assistenter
- Totalt antal ställda frågor
- Totalt antal prompter
- Antal användare (creators vs users)

**Grafer/visualiseringar:**
- **Användning över tid** — Linjediagram (frågor per dag/vecka/månad)
- **Populäraste modeller** — Cirkeldiagram eller bar chart
- **Top 10 assistenter** — Horisontellt bar chart
- **Användarkategorier** — Creators vs Users fördelning
- **Workshops & utbildningar** — Antal genomförda, antal deltagare

**Design:**
- Glassmorfism-kort med subtil bakgrundsblur
- Animerade siffror vid scroll-in
- Responsiva grafer som fungerar på mobil
- Tidsperiod-filter: Senaste veckan / månaden / kvartalet / allt

### 4.4 Utbildning & Resurser (`/utbildning`)

**Sektioner:**

1. **Intric-utbildningsvideos**
   - Inbäddade YouTube-videos från Intrics kanal (2-3 min vardera)
   - Kategoriserade: "Kom igång", "Skapa assistenter", "Prompter", etc.
   - Kortformat med thumbnail, titel, längd

2. **Workshops**
   - Lista över genomförda och kommande workshops
   - Datum, beskrivning, antal deltagare, material (PDF)

3. **Individuella utbildningar**
   - AI-Huset (AI Sweden-programmet för ledningsgruppen)
   - AI-mognadsmätning
   - Övriga utbildningsinsatser

4. **Guider & Tutorials**
   - Steg-för-steg-guider i MDX-format
   - "Så bygger du din första assistent"
   - "Prompttips för bättre resultat"

### 4.5 Dokumentation & Riktlinjer (`/dokumentation`)

**Innehåll:**
- AI-strategi och riktlinjer (PDF-visning/nedladdning)
- Vägledning för AI-användning
- GDPR och informationssäkerhet
- Best practices
- Länk till Intrics officiella dokumentation (help.intric.ai)

**Format:**
- PDF-filer visas inline med preview
- Filtrerbar lista
- Sökbar

### 4.6 Projekt & Case (`/projekt`)

**Varje projekt har en egen sida med:**
- Projektnamn och kort beskrivning
- Verksamhetsområde
- Resultat/nyckeltal
- Tidslinje
- Screenshots/bilder
- Lärdomar

**Existerande projekt att inkludera:**
- AI-assistenten för hemtjänsten
- AI-kameror för trygghet
- SDK (Säker Digital Kommunikation)
- Digital post
- AI-assistent på katrineholm.se (kommande)

### 4.7 Nyheter & Blogg (`/nyheter`)

- MDX-baserade bloggposter
- Författare, datum, kategori
- Bildstöd
- Delningsknappar
- RSS-feed

### 4.8 FAQ (`/faq`)

- Accordion-format (expanderbara frågor)
- Kategoriserade: Allmänt, Intric, Assistenter, Säkerhet, Teknik
- Sökbar
- "Hittade du inte svaret? Fråga vår AI-chatbot!"

### 4.9 Kontakt & Feedback (`/kontakt`)

- Kontaktinformation
- Feedback-formulär (sparas i Supabase)
- "Föreslå en förbättring"
- Länk till kommunens övriga kanaler

### 4.10 Om AI-hubben (`/om`)

- Vision och syfte
- Katrineholms AI-resa (timeline-komponent)
- Teamet bakom
- Partners (Intric, AI Sweden)
- Nyckeltal och milstolpar

---

## 5. DATAMODELL (Supabase)

### 5.1 Tabeller

```sql
-- Assistenter (biblioteket)
CREATE TABLE assistants (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  prompt TEXT,
  category_id UUID REFERENCES categories(id),
  ai_model TEXT,
  creator_name TEXT,
  creator_unit TEXT,
  intric_id TEXT,                    -- Koppling till Intric
  status TEXT DEFAULT 'pending',      -- pending | published | archived
  question_count INTEGER DEFAULT 0,
  featured BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Kategorier
CREATE TABLE categories (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT UNIQUE NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  icon TEXT,
  sort_order INTEGER DEFAULT 0
);

-- Projekt/Case
CREATE TABLE projects (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  content TEXT,                        -- MDX/Markdown
  category TEXT,
  results JSONB,                       -- Nyckeltal
  images TEXT[],
  status TEXT DEFAULT 'published',
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Utbildningar
CREATE TABLE trainings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  type TEXT NOT NULL,                  -- workshop | individual | video | guide
  description TEXT,
  date DATE,
  participant_count INTEGER,
  video_url TEXT,
  materials_url TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Dokument/PDFer
CREATE TABLE documents (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  category TEXT,
  file_url TEXT NOT NULL,              -- Supabase Storage URL
  file_size INTEGER,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Nyheter/Blogg
CREATE TABLE posts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  excerpt TEXT,
  content TEXT,                        -- MDX
  author TEXT,
  category TEXT,
  image_url TEXT,
  published BOOLEAN DEFAULT false,
  published_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- FAQ
CREATE TABLE faqs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  question TEXT NOT NULL,
  answer TEXT NOT NULL,
  category TEXT,
  sort_order INTEGER DEFAULT 0
);

-- Feedback
CREATE TABLE feedback (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT,
  email TEXT,
  message TEXT NOT NULL,
  type TEXT DEFAULT 'feedback',        -- feedback | suggestion | bug
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Statistik-cache (från Intric API)
CREATE TABLE intric_stats_cache (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  stat_key TEXT UNIQUE NOT NULL,
  stat_value JSONB NOT NULL,
  fetched_at TIMESTAMPTZ DEFAULT now()
);

-- Admin-användare
CREATE TABLE admin_users (
  id UUID REFERENCES auth.users PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  name TEXT,
  role TEXT DEFAULT 'admin',
  created_at TIMESTAMPTZ DEFAULT now()
);
```

### 5.2 Supabase Storage Buckets
- `documents` — PDF-filer
- `images` — Projektbilder, bloggbilder
- `assistant-icons` — Ikoner/bilder för assistenter

### 5.3 Row Level Security (RLS)
- **Läsning:** Alla tabeller öppna för läsning (public)
- **Skrivning assistants:** Öppet för INSERT (med status 'pending'), UPDATE/DELETE kräver admin
- **Skrivning övrigt:** Kräver admin auth
- **Feedback:** Öppet för INSERT, läsning kräver admin

---

## 6. INTRIC API-INTEGRATION

### 6.1 Statistik-endpoints att använda
Kartlägg dessa endpoints med er Intric API-access:
- GET /spaces — Antal spaces
- GET /assistants — Lista alla assistenter med metadata
- GET /analytics/questions — Antal ställda frågor
- GET /analytics/users — Användarstatistik
- GET /analytics/models — Modell-användning

### 6.2 Data-flöde
```
Intric API → Next.js API Route (server-side) → Cache i Supabase → Frontend
```

### 6.3 Caching-strategi
- **Statistik:** Revalidera var 5:e minut (ISR)
- **Assistentlista:** Revalidera var 15:e minut
- **Fallback:** Visa cachad data om API:t är nere

### 6.4 Chatbot-integration
- Egendesignad chatbot-komponent i React
- Anropar Intric API för att skicka frågor och ta emot svar
- Streama svaret (SSE/WebSocket om Intric stöder det)
- Design: Glassmorfism-panel med animerad border beam
- Typing-animation, smooth öppna/stäng

---

## 7. PWA-KONFIGURATION (KRITISK PRIORITET)

> ⚠️ AI-hubben ska kännas som en native app. Varje beslut i design och utveckling
> ska utgå från frågan: "Fungerar detta bra på en mobiltelefon?"

### 7.1 Funktioner
- **Installerbar** på hemskärmen (Android + iOS + Desktop)
- **Offline-stöd** — Service Worker cachar:
  - App shell (layout, navigation, styling) — alltid tillgängligt offline
  - Senast visade assistenter och sidor — cachad data
  - Statistik — visa senast hämtade data med "Uppdaterad: X min sedan"
  - Bilder och ikoner — cachade lokalt
- **App-liknande navigation** — inga hårda sidladdningar, smooth transitions
- **Splash screen** vid appstart med AI-hubben-logotyp
- **Fullskärmsläge** utan adressfält och browser-chrome
- **Push notifications** (framtida: notis vid nya assistenter, nyheter)

### 7.2 manifest.json
```json
{
  "name": "AI-hubben Katrineholm",
  "short_name": "AI-hubben",
  "description": "Katrineholms AI-hub — assistenter, statistik och resurser",
  "start_url": "/",
  "display": "standalone",
  "orientation": "portrait",
  "background_color": "#FAFAFA",
  "theme_color": "#2563EB",
  "categories": ["productivity", "education"],
  "icons": [
    { "src": "/icons/icon-72.png", "sizes": "72x72", "type": "image/png" },
    { "src": "/icons/icon-96.png", "sizes": "96x96", "type": "image/png" },
    { "src": "/icons/icon-128.png", "sizes": "128x128", "type": "image/png" },
    { "src": "/icons/icon-144.png", "sizes": "144x144", "type": "image/png" },
    { "src": "/icons/icon-152.png", "sizes": "152x152", "type": "image/png" },
    { "src": "/icons/icon-192.png", "sizes": "192x192", "type": "image/png" },
    { "src": "/icons/icon-384.png", "sizes": "384x384", "type": "image/png" },
    { "src": "/icons/icon-512.png", "sizes": "512x512", "type": "image/png" }
  ],
  "screenshots": [
    { "src": "/screenshots/home.png", "sizes": "390x844", "type": "image/png", "form_factor": "narrow" },
    { "src": "/screenshots/home-wide.png", "sizes": "1280x720", "type": "image/png", "form_factor": "wide" }
  ]
}
```

### 7.3 Service Worker-strategi
- **App Shell:** Cache First — layouten laddas alltid direkt
- **API-data:** Network First med fallback till cache — statistik och assistenter
- **Bilder:** Cache First med expiry — sparar bandbredd
- **Sidor:** Stale While Revalidate — visa cachad sida, uppdatera i bakgrunden

### 7.4 Mobil-specifik design
- **Bottom tab bar** (5 tabs) — INTE hamburger-meny
- **Touch targets** minst 44x44px
- **Swipe-gester** för tillbaka-navigering
- **Pull-to-refresh** på data-sidor
- **Safe area** insets (notch, home indicator)
- **Viewport** meta tag med viewport-fit=cover
- **Font-storlek** minst 16px (undvik iOS zoom)
- **Inga hover-only interaktioner** — allt ska fungera med touch

### 7.5 Test-krav
- [ ] Lighthouse PWA score: 100
- [ ] Installerbar på Android Chrome
- [ ] Installerbar på iOS Safari (Add to Home Screen)
- [ ] Offline: Startsida laddar utan internet
- [ ] Offline: Visar cachade assistenter utan internet
- [ ] Snabb: Under 2s initial load (4G)
- [ ] Snabb: Under 200ms navigation mellan sidor
- [ ] Ingen layout shift (CLS < 0.1)
- [ ] Fungerar i fullskärmsläge utan browser-UI

---

## 8. AUTENTISERING

### 8.1 Admin-panel (`/admin`)
- **Inloggning:** Supabase Auth (email/password)
- **Endast 2 admin-konton** (du + kollega)
- **Admin kan:**
  - Godkänna/avvisa uppladdade assistenter
  - Redigera allt innehåll (assistenter, projekt, utbildningar, nyheter, FAQ, dokument)
  - Se feedback/förslag
  - Manuellt uppdatera statistik-cache

### 8.2 Publik sajt
- Ingen inloggning krävs för att:
  - Bläddra assistenter
  - Se statistik
  - Läsa dokumentation, nyheter, FAQ
  - Använda chatboten
  - Ladda upp en assistent (hamnar i moderationskö)
  - Skicka feedback

---

## 9. PROJEKTFASER

### Fas 1 — Grundstruktur (Vecka 1-2)
- [ ] Initiera Next.js-projekt med TypeScript
- [ ] Konfigurera Tailwind CSS v4
- [ ] Installera Aceternity UI + Magic UI + GSAP + Framer Motion
- [ ] Sätta upp Supabase-projekt (databas + auth + storage)
- [ ] Skapa datamodell (alla tabeller + RLS)
- [ ] Konfigurera Vercel-deploy
- [ ] Implementera dark/light theme toggle
- [ ] Bygga grundlayout: Navbar, Footer, Sidstruktur
- [ ] PWA-konfiguration (manifest + service worker)
- [ ] Registrera domän aihubben.se

### Fas 2 — Kärnfunktionalitet (Vecka 3-4)
- [ ] **Startsida** — Hero med animationer, statistik-highlights, utvalda assistenter
- [ ] **Assistentbiblioteket** — Grid, sök, filter, detaljsidor
- [ ] **Uppladdningsformulär** för assistenter (publik)
- [ ] **Admin-panel** — Login, moderationskö, innehållshantering
- [ ] **Intric API-integration** — Hämta statistik, cacha i Supabase
- [ ] **Global sök** — Supabase full-text search

### Fas 3 — Statistik & Chatbot (Vecka 5-6)
- [ ] **Statistik Dashboard** — Alla grafer och visualiseringar
- [ ] **Chatbot** — Egendesignad komponent, Intric API-anrop
- [ ] **Dokumentation** — PDF-uppladdning, inline-visning
- [ ] **Utbildning** — Video-inbäddning, workshop-lista

### Fas 4 — Innehåll & Polish (Vecka 7-8)
- [ ] **Projekt & Case** — Alla existerande projekt
- [ ] **Nyheter & Blogg** — MDX-stöd, RSS
- [ ] **FAQ** — Accordion med sök
- [ ] **Kontakt & Feedback** — Formulär
- [ ] **Om-sidan** — Timeline, vision
- [ ] **SEO** — Meta tags, Open Graph, sitemap
- [ ] **Prestanda** — Lighthouse 90+, lazy loading, image optimization
- [ ] **Tillgänglighet** — WCAG 2.1 AA audit
- [ ] **Slutlig QA** — Cross-browser, mobil, PWA-test

---

## 10. MAPPSTRUKTUR

```
aihubben/
├── public/
│   ├── icons/                    # PWA-ikoner
│   ├── images/                   # Statiska bilder
│   └── manifest.json             # PWA manifest
├── src/
│   ├── app/                      # Next.js App Router
│   │   ├── layout.tsx            # Root layout (navbar, footer, chatbot, theme)
│   │   ├── page.tsx              # Startsida
│   │   ├── assistenter/
│   │   │   ├── page.tsx          # Biblioteket (sök + grid)
│   │   │   ├── [slug]/page.tsx   # Detaljsida per assistent
│   │   │   └── ladda-upp/page.tsx # Uppladdningsformulär
│   │   ├── statistik/
│   │   │   └── page.tsx          # Dashboard
│   │   ├── utbildning/
│   │   │   └── page.tsx          # Utbildning & resurser
│   │   ├── dokumentation/
│   │   │   └── page.tsx          # Dokument & riktlinjer
│   │   ├── projekt/
│   │   │   ├── page.tsx          # Alla projekt
│   │   │   └── [slug]/page.tsx   # Detaljsida per projekt
│   │   ├── nyheter/
│   │   │   ├── page.tsx          # Alla nyheter
│   │   │   └── [slug]/page.tsx   # Enskild nyhet
│   │   ├── faq/
│   │   │   └── page.tsx
│   │   ├── kontakt/
│   │   │   └── page.tsx
│   │   ├── om/
│   │   │   └── page.tsx
│   │   ├── admin/                # Admin-panel
│   │   │   ├── layout.tsx        # Auth-skyddad layout
│   │   │   ├── page.tsx          # Dashboard
│   │   │   ├── assistenter/page.tsx  # Moderationskö
│   │   │   ├── innehall/page.tsx     # CMS
│   │   │   └── feedback/page.tsx     # Inkomna förslag
│   │   └── api/                  # API routes
│   │       ├── intric/           # Intric API proxy + cache
│   │       ├── assistants/       # CRUD assistenter
│   │       ├── search/           # Global sök
│   │       └── chat/             # Chatbot proxy
│   ├── components/
│   │   ├── ui/                   # Aceternity UI / Magic UI komponenter
│   │   ├── layout/               # Navbar, Footer, Sidebar
│   │   ├── assistants/           # AssistantCard, AssistantGrid, etc.
│   │   ├── stats/                # StatCard, Charts, etc.
│   │   ├── chatbot/              # ChatWidget, ChatMessage, etc.
│   │   ├── admin/                # Admin-specifika komponenter
│   │   └── shared/               # ThemeToggle, SearchBar, etc.
│   ├── lib/
│   │   ├── supabase/             # Supabase client + helpers
│   │   ├── intric/               # Intric API client
│   │   ├── utils.ts              # Utility functions
│   │   └── constants.ts          # Kategorier, modeller, etc.
│   ├── hooks/                    # Custom React hooks
│   ├── types/                    # TypeScript types
│   └── styles/
│       └── globals.css           # Tailwind + custom CSS + themes
├── content/                      # MDX-filer för nyheter/guider
├── supabase/
│   ├── migrations/               # SQL migrations
│   └── seed.sql                  # Initial data
├── .env.local                    # Miljövariabler
├── next.config.ts
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

---

## 11. MILJÖVARIABLER

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhb...
SUPABASE_SERVICE_ROLE_KEY=eyJhb...

# Intric API
INTRIC_API_URL=https://api.intric.ai
INTRIC_API_KEY=your-api-key
INTRIC_WORKSPACE_ID=your-workspace-id

# Chatbot
INTRIC_CHAT_ASSISTANT_ID=your-assistant-id

# Analytics (valfritt)
NEXT_PUBLIC_PLAUSIBLE_DOMAIN=aihubben.se

# Övrigt
NEXT_PUBLIC_SITE_URL=https://aihubben.se
```

---

## 12. INSTRUKTIONER TILL CLAUDE CODE

### ⚠️ VIKTIGT: LÄS DETTA FÖRST

Denna masterplan är ett FÖRSLAG, inte en färdig specifikation. Innan du börjar koda:

1. **Gå igenom hela planen med mig.** Förklara varje sektion — vad den innebär och varför.
2. **Föreslå ändringar.** Om du ser problem, bättre lösningar eller saker som saknas — säg till INNAN vi börjar bygga.
3. **Vi diskuterar och godkänner tillsammans** innan implementation påbörjas.

### ARBETSFLÖDE — STEG FÖR STEG

Följ detta flöde för VARJE uppgift, utan undantag:

```
┌─────────────────────────────────────┐
│  1. Claude Code förklarar vad som   │
│     ska byggas i nästa steg         │
│              ↓                      │
│  2. Jag godkänner eller justerar    │
│              ↓                      │
│  3. Claude Code implementerar       │
│     EN sak åt gången               │
│              ↓                      │
│  4. Claude Code ber mig testa       │
│     - Frontend (fungerar det?)      │
│     - Backend (API:er OK?)          │
│     - Databas (data korrekt?)       │
│              ↓                      │
│  5. Jag testar och rapporterar      │
│              ↓                      │
│  6. Om OK → Push till GitHub        │
│     Om FEL → Claude Code fixar      │
│              ↓                      │
│  7. Nästa steg (tillbaka till 1)    │
└─────────────────────────────────────┘
```

### REGLER FÖR CLAUDE CODE:

- **ALDRIG** bygg flera saker samtidigt. En funktion/komponent åt gången.
- **ALLTID** förklara vad du ska göra innan du gör det.
- **ALLTID** be mig testa innan du går vidare.
- **ALLTID** pusha till GitHub efter godkänt test.
- **FRÅGA** om du är osäker — gissa aldrig.
- **CLAUDE.md** — Skapa och underhåll en CLAUDE.md fil i projektets rot. Denna fil är Claude Codes MINNE. Den MÅSTE:
  - **Läsas FÖRST** vid varje ny session, terminal-omstart eller kontextförlust
  - **Uppdateras SIST** efter varje godkänt steg
  - Innehålla ALL nödvändig kontext för att kunna fortsätta arbetet utan att fråga
  - Se mallen i `CLAUDE.md` som skapas vid projektstarten

### ⚠️ MINNESSYSTEM — KRITISKT

**Problem:** Claude Code tappar kontext när terminalen stängs, kontextfönstret blir fullt, eller sessionen avbryts mitt i arbetet.

**Lösning:** CLAUDE.md fungerar som permanent minne. Claude Code MÅSTE:

1. **Vid VARJE sessionsstart:**
   ```
   Läs CLAUDE.md → Förstå var vi är → Fortsätt exakt där vi slutade
   ```

2. **Vid VARJE avslutat steg:**
   ```
   Uppdatera CLAUDE.md → Pusha till GitHub
   ```

3. **Om terminalen kraschar eller sessionen bryts:**
   ```
   Öppna terminal → cat CLAUDE.md → Fortsätt arbetet
   ```

**CLAUDE.md ska vara en kort projektfil med:**
- Tech stack och byggkommandon
- Designprinciper och konventioner
- Projektregler

> Not: Claude Code har inbyggt persistent minne — CLAUDE.md behöver inte spåra sessionshistorik, senast ändrade filer eller detaljerad position.

### IMPLEMENTERINGSORDNING

#### Steg 1: Projektinitiering ✅ KLART
```bash
npx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir --use-pnpm
# Repo: github.com/RosenShamil/ai-hubben
```

#### Steg 2: Skapa CLAUDE.md ✅ KLART
Slimmad projektfil i roten med tech stack, kommandon och konventioner.

#### Steg 3: Installera beroenden (ett paket i taget, förklara varför)
```bash
pnpm add @supabase/supabase-js @supabase/ssr
pnpm add framer-motion gsap recharts lucide-react
pnpm add react-hook-form @hookform/resolvers zod
pnpm add next-mdx-remote next-themes
pnpm add -D @types/gsap
```

#### Steg 4: Installera UI-komponenter
Följ Aceternity UI:s installationsguide (npx shadcn-ui init, sedan copy-paste komponenter från ui.aceternity.com).
Välj ut dessa komponenter:
- Spotlight / Aurora Background (hero)
- 3D Card Effect (assistentkort)
- Text Generate Effect (hero-text)
- Floating Dock (navigation — utvärdera)
- Moving Border (chatbot-knapp)
- Tracing Beam (projekt-timeline)
- Glare Card eller Card Spotlight (statistikkort)
- Infinite Moving Cards (assistent-showcase)
- Timeline (om-sida)

#### Steg 5: Supabase setup
```bash
npx supabase init
npx supabase db push  # Kör migrations
```

#### Steg 6: Bygg i fasordning
Följ faserna i sektion 9. Bygg EN komponent/sida åt gången.
Varje steg: förklara → godkänn → implementera → testa → pusha → nästa.

---

## 13. REFERENSLÄNKAR

- **Intric Dokumentation:** https://help.intric.ai/sv/
- **Intric Assistentbibliotek (referens):** https://intric-library.pages.dev/
- **Aceternity UI:** https://ui.aceternity.com/components
- **Magic UI:** https://magicui.design
- **GSAP:** https://gsap.com
- **Framer Motion:** https://motion.dev
- **Supabase Docs:** https://supabase.com/docs
- **Next.js Docs:** https://nextjs.org/docs
- **Vercel Docs:** https://vercel.com/docs
- **Geist Font:** https://vercel.com/font
- **AI Sweden:** https://www.ai.se

---

*Masterplanen skapad 2026-03-20. Uppdaterad 2026-03-20 med beslut från planeringssession.*
