# Teknisk AI-systemdokumentation — AI-hubben

> **Regelverk:** EU AI Act Art. 13 (transparens), DIGG riktlinje 16
> **Datum:** 2026-03-26
> **Ansvarig:** Digitaliseringsavdelningen
> **Nästa granskning:** 2026-09-26

---

## 1. Systemöversikt

| Fält | Värde |
|------|-------|
| **Systemnamn** | AI-hubben |
| **Syfte** | Plattform för AI-assistenter, utbildning och statistik för kommunanställda |
| **Målgrupp** | ~3 000 anställda i Katrineholms kommun + externa besökare (iKAI) |
| **Systemägare** | Kommunledningsförvaltningen, Digitaliseringsavdelningen |
| **Driftstart** | 2025 |
| **URL** | aihubben.se |

---

## 2. Arkitektur

### 2.1 Komponenter

| Komponent | Teknik | Leverantör | Hosting |
|-----------|--------|-----------|---------|
| **Webbapplikation** | Next.js 16 (App Router), TypeScript, Tailwind CSS v4 | Egenbyggd | Vercel (USA/EU) |
| **Databas** | PostgreSQL (Supabase) | Supabase Inc. | AWS eu-west-1 (Irland) |
| **Autentisering** | Supabase Auth (e-post + lösenord) | Supabase Inc. | AWS eu-west-1 |
| **AI-assistenter** | Intric AI-plattform (RAG + LLM) | Intric AB | GleSys (Sverige) |
| **Webbanalys** | Umami Cloud (cookie-fri) | Umami Software | Att verifiera |
| **Service Worker** | Serwist (PWA) | Open source | Klient (webbläsare) |

### 2.2 Dataflöde

```
Användare (webbläsare)
    ↓ HTTPS
Vercel CDN (statiskt innehåll, ISR-cache)
    ↓
Next.js Server Components → Supabase (PostgreSQL, eu-west-1)
    ↓
Intric API (assistentlista, Marketplace)
    ↓
Intric Chatwidget (iframe) → Intric → LLM-leverantör → Intric → Användare
```

### 2.3 Datalagringsplatser

| Data | Plats | Jurisdiktion |
|------|-------|-------------|
| Användarkonton, profiler | Supabase (Irland) | EU |
| Utbildningsframsteg, favoriter | Supabase (Irland) | EU |
| Nyheter, FAQ, dokument | Supabase (Irland) | EU |
| AI-konversationer | Intric (GleSys, Sverige) | Sverige |
| Kunskapsbaser | Intric (GleSys, Sverige) | Sverige |
| Webbanalys | Umami Cloud | Att verifiera |
| CDN-cache | Vercel (globalt) | USA/EU |

---

## 3. AI-system i plattformen

### 3.1 Intric AI-assistenter

| Fält | Värde |
|------|-------|
| **Leverantör** | Intric AB (559308-3743), Stockholm |
| **Typ** | Generativ AI — LLM-baserade chatassistenter med RAG |
| **Riskklassificering (EU AI Act)** | Begränsad risk (Art. 50 — transparenskrav) |
| **Certifiering** | ISO 27001:2022 |
| **PUB-avtal** | Tecknat (SKR:s mall) |

### 3.2 AI-modeller

Intric är modellagnostiskt. Tillgängliga modeller per kategori:

**Europeiska/svenska (rekommenderat):**
| Modell | Leverantör | Hosting |
|--------|-----------|---------|
| Berget AI-modeller | Berget AI AB | Sverige |
| AI Iron-modeller | AI Iron AB | Sverige |
| Llama 3.3 70B | DataCrunch Oy | Finland |
| Mistral Large | Mistral AI | Frankrike |

**EU-hostade (US-moderbolag):**
| Modell | Leverantör | Hosting |
|--------|-----------|---------|
| Azure OpenAI | Microsoft Ireland | Irland |
| Google Cloud LLM | Google EMEA | Irland |

**US-baserade (kräver särskilt beslut):**
| Modell | Leverantör | Hosting |
|--------|-----------|---------|
| GPT-5.2, GPT-5, GPT-4o | OpenAI | USA |
| Claude Opus 4, Sonnet 4.5 | Anthropic | USA |

### 3.3 Hur AI-assistenterna fungerar

1. Användaren skickar en fråga via chatgränssnittet
2. Intric hämtar relevant kontext från kunskapsbaser (RAG)
3. Intric tar bort användarens identitetsmetadata (namn, e-post, IP, org)
4. Promptinnehåll + systeminstruktioner + RAG-kontext skickas till vald LLM
5. LLM genererar svar
6. Data raderas omedelbart hos LLM-leverantören (zero-data-storage)
7. Svaret lagras krypterat hos Intric och visas för användaren

### 3.4 Begränsningar och kända risker

| Begränsning | Beskrivning | Åtgärd |
|-------------|-------------|--------|
| **Hallucinationer** | LLM:er kan generera felaktig information som ser trovärdig ut | Transparensmeddelanden uppmanar till granskning |
| **Bias** | Träningsdata kan innehålla systematiska fördomar | Regelbunden granskning av svarskvalitet |
| **Oavsiktlig PII-inmatning** | Användare kan mata in personuppgifter i chatten | Utbildning + PII-redigeringsfunktion |
| **Kontextfönster** | LLM:er har begränsat minne per konversation | Konfigurerat per assistent |
| **Kunskapsbas-kvalitet** | RAG-svar beror på kvaliteten på uppladdade dokument | Administratörer ansvarar för dokumentkvalitet |

### 3.5 Mänsklig tillsyn

| Aspekt | Implementation |
|--------|---------------|
| **Assistentkonfiguration** | Administratörer granskar och konfigurerar systemprompts |
| **Modellval** | Administratörer väljer vilka modeller som tillåts per Space |
| **Ingen automatiserad beslutsfattning** | AI-assistenterna ger förslag — människor fattar beslut |
| **Transparens** | Användare informeras om att de interagerar med AI |
| **Gallring** | Konfigurerbara gallringstider per assistent |

---

## 4. AI-riskklassificering (EU AI Act)

| Funktion | Risknivå | Motivering |
|----------|----------|------------|
| AI-assistenter (Intric) | **Begränsad risk** | Interagerar med fysiska personer (Art. 50). Ej beslutsfattande. |
| AI-akademin (quiz/certifikat) | **Minimal risk** | Regelbaserade quiz, ingen AI-bedömning |
| Statistik, nyheter, docs | **Utanför AI Act** | Ingen AI inblandad |
| iKAI (extern chatbot) | **Begränsad risk** | Interagerar med allmänheten |

Fullständig klassificering: `docs/ai-riskklassificering.md`

---

## 5. Transparensåtgärder (Art. 50)

| Plats | Implementation |
|-------|---------------|
| **Chatwidget (iKAI)** | "iKAI — AI-assistent — svaren genereras av AI" i widgetens header |
| **Assistentdetaljsida** | Infobox: "Denna assistent drivs av artificiell intelligens. Svaren genereras automatiskt och bör alltid granskas." |
| **Assistentbibliotek** | Notis: "Assistenterna drivs av artificiell intelligens. Svaren genereras automatiskt och bör granskas." |
| **Integritetspolicy** | Avsnitt om AI-tjänster och transparens |

---

## 6. Dataskydd

| Åtgärd | Status |
|--------|--------|
| DPIA genomförd | ✅ `docs/intric-dpia.md` |
| Integritetspolicy publicerad | ✅ `/integritetspolicy` |
| DPA med Intric (PUB-avtal) | ✅ |
| DPA med Supabase | ✅ |
| DPA med Vercel | ✅ |
| Radera konto-funktion | ✅ |
| Dataexport (JSON) | ✅ |
| GDPR-samtycke vid registrering | ✅ |

---

## 7. Leverantörer och avtalsstatus

| Leverantör | Tjänst | DPA | Certifiering | Datalokalisering |
|-----------|--------|-----|-------------|-----------------|
| Intric AB | AI-plattform | ✅ PUB-avtal (SKR) | ISO 27001:2022 | Sverige (GleSys) |
| Supabase Inc. | Databas, auth | ✅ DPA + SCCs | SOC 2 Type 2 | EU (Irland) |
| Vercel Inc. | Webbhosting | ✅ Via ToS + SCCs | SOC 2 Type 2 | USA/EU (DPF) |
| Umami Software | Webbanalys | ⬜ Att verifiera | — | Att verifiera |

---

## 8. Relaterade dokument

| Dokument | Sökväg |
|----------|--------|
| Intric DPIA | `docs/intric-dpia.md` |
| AI-riskklassificering | `docs/ai-riskklassificering.md` |
| AI-policy | `docs/ai-policy.md` |
| Registerförteckning (Art. 30) | `docs/registerforteckning.md` |
| Informationsklassificering | `docs/informationsklassificering.md` |
| Suveränitetsanalys | `docs/suveranitetsanalys.md` |
| Incidentrapporteringsrutin | `docs/incidentrapporteringsrutin.md` |
| Compliance-översikt | `docs/regelverk-och-compliance.md` |
