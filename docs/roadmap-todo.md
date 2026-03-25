# AI-hubben — Roadmap & TODO

Samling av alla ideer, ogjorda features och framtidsvisioner.
Uppdaterad: 2026-03-24

> **Affarsmodell olost:** Ska AI-hubben fortsatta som kommunprojekt (Katrineholm) eller bli en privat produkt/SaaS for fler kommuner? Beslutet paverkar allt nedan — sarskilt multi-kommun, prissattning och juridik. Domanen `kommunai.se` ar registrerad och antyder en bredare ambition.

---

## 1. OGJORT (befintlig plattform)

### 1.1 Domanbyte till kommunai.se
- Doman registrerad. Se `memory/project_domain_migration.md` for steg.
- Vercel, DNS, kodreferenser, Supabase Auth SMTP

### 1.2 Regulatorisk compliance
- Se `docs/regelverk-och-compliance.md` for fullstandig rapport.
- **Kritiskt:** DPA med Supabase/Vercel, integritetspolicy, tillganglighetsredogorelse, radera-konto-funktion, registerforteckning
- **Fore 2026-08-02:** EU AI Act — riskklassificering, transparensmeddelanden, DPIA, AI-policy

### 1.3 Meddelandesystem (Niva 1 + 2)
Nuvarande: enkel inkorg med lasa/ta bort + mailto-svar. Behover uppgradering.

**Niva 1 — Svar direkt fran admin:**
- [ ] Svarsfalt i modalen — skriv svar i admin, skickas som e-post (kraver Resend/SendGrid/SMTP)
- [ ] Svarshistorik — spara svar i databasen (`message_replies`-tabell)
- [ ] Status-system — Olast → Last → Besvarat → Arkiverad

**Niva 2 — Fullstandigt meddelandehantering:**
- [ ] Interna anteckningar pa meddelanden ("Skickade vidare till IT")
- [ ] Tilldela meddelande till annan admin/person
- [ ] Svarsmallar for vanliga fragor ("Tack for ditt meddelande, vi aterkommer inom 48h")

### 1.4 iKAI — AI-hubben kunskapsfix
Testresultat: 93% OK (40/43 fragor). Atgarder:

**Kunskapsdokumentet (ikai-aihubben-kunskap.md):**
- [ ] Sakerstall att assistentlistan (Ekona, Konteringsassistenten) indexeras korrekt i Intric — fraga 3.2 hittade dem inte
- [ ] Fortydliga att akademin ar textbaserade lektioner, inte videolektioner

**Tillaggsprompten (ikai-aihubben-tillaggsprompt.md):**
- [ ] Lagg till: "Community-assistenter publiceras direkt utan granskning"
- [ ] Lagg till: "Nar du namner en sida eller funktion, forklara alltid hur anvandaren navigerar dit (vilken meny, flik eller knapp)"
- [ ] Lagg till: "Ange inte specifika forvaltningars AI-anvandning utan aktuell data — hanvisa till statistiksidan"
- [ ] Valfritt: Notera att kunskapsbanken nas via /utbildning?flik=begrepp (inte /kunskapsbanken)

### 1.5 Smarre forbattringar
- [ ] Community assistant uploads — lagga till moderationsflode (status-falt, admin-godkannande)
- [ ] Skeleton loading states (nuvarande: spinners)
- [ ] Full-text search i Supabase (nuvarande: `ilike` substring)

---

## 2. ANPASSADE UTBILDNINGAR (LMS)

Idé: Chefer och forvaltare skapar skraddarsydda kurser for sina medarbetare inom AI-hubben.

### 2.1 Koncept

**Kursbyggare:**
- Valja fran mallbibliotek ELLER bygga fran grunden
- Redigera lektioner, quiz, slutprov i en enkel editor
- Anpassa till sin forvaltning/enhet/kontext
- AI-granskning vid publicering
- Godkannandeflode (auto eller manuellt beroende pa AI-granskning)

**Mallbibliotek (fardiga kursmallar):**
- AI-introduktion (generell)
- GDPR & AI
- Informationssakerhet
- AI-verktyg i vardagen
- Formagar per forvaltningstyp (Bildning, Social, Teknik, etc.)

**Medarbetarupplevelse:**
- Tilldelade kurser syns automatiskt
- Samma lesson-player som AI-akademin (steg-for-steg, swipe, quiz)
- Framsteg sparas, certifikat vid avslut

**Uppfoljning (dashboard for skaparen):**
- Hur manga paborjat / avklarat
- Quiz-resultat
- Per enhet/avdelning
- Deadline-hantering, paminnelser

### 2.2 Kvalitetssakring — tre lager

1. **Strukturell validering (automatisk, ingen AI):** Minimum antal lektioner, quiz-fragor matchar innehall, inga tomma avsnitt
2. **AI-granskning (automatisk, vid publicering):** Faktagranskning, klarsprak, regelefterlevnad, quiz-kvalitet, bias — specialbyggd pipeline med Claude API (inte iKAI)
3. **Mansklig granskning (bara vid behov):** Gront fran AI → publiceras direkt. Rott → flaggas till admin.

### 2.3 Datamodell (skiss)

```
custom_courses        — id, title, description, created_by, department_id, municipality_id, visibility, status (draft/review/published)
custom_modules        — id, course_id, title, order
custom_lessons        — id, module_id, title, content (JSON), order
custom_quiz_questions — id, module_id, question, options, correctIndex, explanation
course_enrollments    — id, course_id, user_id, enrolled_at, completed_at
course_progress       — id, enrollment_id, lesson_id, completed_at
course_templates      — id, title, description, category, content (JSON)
```

### 2.4 Tilldelning

Tre vagar in for medarbetare:
- **Automatisk** — baserad pa forvaltning/enhet i profilen
- **Inbjudan** — lank eller kurskod
- **Sjalvanmalan** — oppna kurser i katalogen

Hierarki: Kommunadmin → Forvaltningschef → Enhetschef → Individ

### 2.5 Oppna fragor

- Vem ager kursinnehallet? Kommunen eller plattformen?
- Kan kommuner dela kurser med varandra? ("Kursmarknad")
- Behover skaparen betala for AI-granskningen?
- Hur hanteras uppdateringar av mallar (nya lagar, nya verktyg)?

---

## 3. VERKTYGSPECIFIKA UTBILDNINGAR

Fardiga kurspaket per AI-verktyg:

| Verktyg | Malgrupp | Innehall |
|---------|----------|----------|
| ChatGPT | Alla | Prompting, begransningar, GDPR, anvandningsfall per roll |
| Microsoft Copilot | Office-anvandare | Copilot i Word/Excel/Teams, chefsvy |
| Intric | Intric-kommuner | Skapa assistenter, ladda upp dokument, marketplace |
| Claude | Avancerade anvandare | Langre dokument, analys, kodning |
| NotebookLM | Pedagoger, utredare | Sammanfatta material, skapa studiehandledningar |
| Gemini | Google Workspace-kommuner | Integration med Drive, Docs, Gmail |

Varje kommun markerar vilka verktyg de anvander → medarbetare ser bara relevanta guider.

---

## 4. MULTI-KOMMUN (kommunai.se)

### 4.1 Modell: En plattform, manga rum

```
Plattformen (gemensamt for alla)
├── AI-akademin (3 nivaer, 96 lektioner)
├── Kunskapsbanken (222 begrepp)
├── Verktygguider (ChatGPT, Copilot, etc.)
└── Mallbiblioteket

Per kommun
├── Egna kurser
├── Egna verktygsintegrationer
├── Forvaltningar & enheter
├── Anvandare & statistik
└── Valfritt: logotyp, accentfarg
```

### 4.2 Anvandaren ser tre lager

1. **Plattformen** — gemensamt innehall (akademin, begrepp, verktygsguider)
2. **Min kommun** — kurser, verktyg, statistik specifikt for min kommun
3. **Mitt** — tilldelade kurser, framsteg, profil, certifikat

### 4.3 Kommunens admin-vy

- Hantera forvaltningar och enheter
- Valja vilka AI-verktyg kommunen anvander (paverkar kursinnehall)
- Skapa/godkanna kurser
- Se statistik per forvaltning/enhet
- Valfritt: logotyp, varumarke

### 4.4 Organisationsstruktur

**Forvaltningar:** Forifylla med standardmall (Bildning, Social, Teknik, Kultur, etc.) — kommunadmin anpassar namn.

**Enheter:** Maste laggas in manuellt av kommunadmin eller importeras via CSV. Ingen nationell databas over enheter.

**Kommuner:** Dropdown med alla 290 kommuner (oppen data fran SKR) vid registrering.

### 4.5 Innehallsanpassning per kommun

Kursmallarna anpassas dynamiskt:
- Kommun som anvander Intric → namner Intric i exemplen
- Kommun utan AI-verktyg → generella exempel med ChatGPT/Copilot (gratis)
- Forvaltningsspecifika referenser → Skolverket for Bildning, Socialstyrelsen for Social, etc.

---

## 5. KUNSKAPSBAS (for mallar och AI-granskning)

Research som kravs for att bygga kvalitativa mallar:

### 5.1 Myndighetskallor
- **DIGG** — Rekommendationer for AI i offentlig forvaltning
- **IMY** — GDPR-vagledning specifikt for AI
- **Skolverket** — AI i skolan, digitalisering
- **Socialstyrelsen** — AI i vard och omsorg
- **SKR** — Kommunernas gemensamma riktlinjer
- **AI Sweden** — Nationella AI-resurser

### 5.2 Per forvaltningstyp
- Vilka AI-anvandningsfall ar relevanta?
- Vilka lagar/regler styr?
- Vilka verktyg anvands typiskt?
- Vilka risker finns?

### 5.3 Anamningsstrategin
Gors EN gang, atervands i alla mallar for alla kommuner. Uppdateras vid nya lagar/riktlinjer.

---

## 6. ONBOARDING & PROFIL

### 6.1 Vid registrering (obligatoriskt)
- Namn, e-post
- Kommun (dropdown, 290 kommuner)
- Forvaltning (dynamisk lista baserat pa kommun)

### 6.2 Forsta inloggningen (frivilligt men uppmuntrat)
- AI-resa-quiz (utokad): forvaltning, roll, erfarenhet, mal
- Resultatet styr rekommendationer

### 6.3 Under profil (redigerbart)
- Allt kan andras
- Byte av forvaltning → nya tilldelade kurser
- Gor om AI-resan → nya rekommendationer

---

## 7. AFFARSMODELL (OLOST)

### Alternativ A: Kommunprojekt
- AI-hubben forblir Katrineholms interna plattform
- Andra kommuner inspireras, bygger egna
- Ingen inkomst, ren intern nytta

### Alternativ B: Oppen kallkod + hostning
- Koden ar oppen, kommuner kan hosta sjolva
- Shamil erbjuder hostning/support som tjanst
- Lag ingangsbarrir, svart att ta betalt

### Alternativ C: SaaS for kommuner
- kommunai.se som en produkt
- Manatlig kostnad per kommun (baserat pa antal anvandare eller forvaltningar)
- Inkluderar: plattform, mallar, AI-granskning, support
- Kravs: foretag/organisation, avtal, SLA, GDPR-compliance

### Alternativ D: Hybrid
- Grundplattform gratis (akademin, kunskapsbanken, verktygsguider)
- Premiumfunktioner: anpassade kurser, AI-granskning, dashboard, multi-forvaltning
- "Freemium" for kommuner

### Fragor att besvara
- Kan Shamil driva detta som privatperson eller kravs foretag?
- Vilken prisnivia ar rimlig for en kommun? (Jfr Learnster, Kompetensportalen)
- Behover kommunen upphandla? (Direktupphandling < 700k SEK)
- Vem ar kund — IT-avdelningen, HR, verksamhetsutvecklare, forvaltningschef?
- Kan Katrineholm vara pilot/referens?

---

## 8. TEKNISKA FORUTSATTNINGAR

### Redan pa plats (ateranvandbart)
- Lesson-player med steg-for-steg, swipe, quiz
- Progress-sync (localStorage <-> Supabase)
- Certifikat-generator (Canvas-baserad PNG)
- Admin-panel CRUD-monster
- Rollsystem (AI-resa-profilen har forvaltning + roll)
- PWA med offline-stod

### Behover byggas
- Kurseditor (skapare-vy)
- Mallbibliotek med dynamisk anpassning
- AI-granskningspipeline (Claude API)
- Multi-tenant datamodell (kommun → forvaltning → enhet)
- Dashboard for uppfoljning
- Organisationsstruktur-hantering (admin per kommun)
- Behorighetssystem (kommunadmin, forvaltningsansvarig, kursansvarig, medarbetare)

### Skalbarhetsovervaganden
- 290 kommuner x ~500 anstallda = 145 000 potentiella anvandare
- Supabase klarar det, men prismodellen andras
- AI-granskning kostar ~$0.01-0.05 per kurs (Claude API)

---

## 9. PRIORITERINGSFORSLAG

### Fas 0 — Nu (befintlig plattform)
- [x] Bugfixar fran kollegors feedback (quiz shuffle, profil-titel, bygglov-stavning)
- [x] Admin-sida for anvandare med framsteg
- [x] Komplett admin-overhaul: alla 16 sidor granskade och forbattrade
- [x] Live dashboard med data fran alla tabeller + marketplace API
- [x] Breadcrumb-navigering pa alla admin-sidor
- [x] Sidebar logiskt grupperad och omdopt
- [x] Startsida-admin: inline textredigering + alla svenska assistenter i dropdown
- [x] Nyheter: sok, raknare, importfunktion (URL/fil/klistra), forbattrad artikelrendering
- [x] FAQ: expanderbara rader, live-lank
- [x] Assistenter: komplett oversikt (marketplace + community), overrides, dolj/visa, Intric Library-lank
- [x] Alla sidor: raknare, live-lankar, forbattrad UX
- [x] Marketplace-assistenter: alla svenska orgs inkluderade, tyska exkluderade
- [x] Assistentsidan: uppdelad i "Vara assistenter" + "Ovriga Sverige"
- [x] Travel-flash hover-effekt pa AI-profil, CTA, certifikatkort
- [x] Artikelrendering: visuell hierarki, klickbara lankar/mejl, markdown-stod
- [x] Revalidering standardiserad till 60 sek pa alla publika sidor
- [x] URL-import API-route for nyhetsartiklar
- [x] assistant_overrides-tabell for marketplace-overrides
- [x] iKAI kunskapsdokument + tillaggsprompt + testlista (93% godkant)
- [ ] Compliance-atgarder (se punkt 1.2)
- [ ] Domanbyte till kommunai.se (se punkt 1.1)
- [ ] iKAI-fixar (se punkt 1.4)

### Fas 1 — MVP anpassade kurser
- [ ] Mallbibliotek (5-10 mallar)
- [ ] Admin tilldelar mall-baserade kurser till forvaltning
- [ ] Medarbetare ser "Tilldelade utbildningar"
- [ ] Dashboard: genomforande per forvaltning
- *Ingen kurseditor, ingen AI-granskning, ingen multi-kommun*

### Fas 2 — Kurseditor
- [ ] Skapare-vy for chefer/forvaltare
- [ ] Anpassa mallar (redigera lektioner, quiz)
- [ ] Godkannandeflode (utkast → granskning → publicerad)
- [ ] Strukturell validering
- [ ] Verktygsspecifika kurspaket

### Fas 3 — AI-granskning + multi-kommun
- [ ] AI-granskningspipeline
- [ ] Multi-tenant (fler kommuner)
- [ ] Organisationsstruktur per kommun
- [ ] Kommunadmin-vy
- [ ] Affarsmodell implementerad

### Fas 4 — Skalning
- [ ] Kursmarknad (kommuner delar mallar)
- [ ] HR-systemimport (Personec, Heroma)
- [ ] Rapporter/export (PDF, Excel)
- [ ] Deadline och paminnelser
- [ ] Benchmark mellan kommuner
