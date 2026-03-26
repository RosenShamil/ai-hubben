# Kontinuitetsplan — AI-hubben

> **Regelverk:** ISO 27001, Cybersäkerhetslagen (NIS2)
> **Datum:** 2026-03-26
> **Ansvarig:** Digitaliseringsavdelningen
> **Nästa granskning:** 2026-09-26

---

## 1. Syfte

Denna plan beskriver hur AI-hubbens drift upprätthålls vid störningar och hur verksamheten kan återställas vid längre avbrott. Planen täcker alla externa tjänster som AI-hubben är beroende av.

---

## 2. Tjänsteberoenden och kritikalitet

| Tjänst | Leverantör | Funktion | Kritikalitet | Utan tjänsten |
|--------|-----------|----------|-------------|---------------|
| **Vercel** | Vercel Inc. | Webbhosting, CDN | **Hög** | Sajten otillgänglig |
| **Supabase** | Supabase Inc. | Databas, auth, lagring | **Hög** | Ingen inloggning, ingen data |
| **Intric** | Intric AB | AI-assistenter | **Medel** | AI-assistenter nere, övrig sajt fungerar |
| **Umami** | Umami Software | Webbanalys | **Låg** | Ingen besöksstatistik, inga användare märker |
| **DNS/domän** | Domänregistrar | Namnupplösning | **Hög** | Sajten onåbar |

---

## 3. Scenarioanalys

### Scenario A: Vercel otillgänglig (webbhosting)

| Aspekt | Bedömning |
|--------|-----------|
| **Sannolikhet** | Låg — Vercel har >99.99% uptime historiskt |
| **Påverkan** | Hög — Hela sajten nere |
| **Upptäcktstid** | Minuter (Vercel-statuspage + Umami visar noll trafik) |
| **Åtgärd kortsiktigt** | Vänta — Vercel har incident response. Informera internt att sajten är nere. |
| **Åtgärd långsiktigt** | Migrera till alternativ Next.js-host: Coolify (self-hosted), Netlify, Railway, eller Docker på egen server |
| **RTO (Recovery Time Objective)** | <4h vid Vercel-incident, <1 vecka vid permanent migration |
| **RPO (Recovery Point Objective)** | 0 — ingen data lagras hos Vercel, källkod i Git |

### Scenario B: Supabase otillgänglig (databas)

| Aspekt | Bedömning |
|--------|-----------|
| **Sannolikhet** | Låg — AWS eu-west-1 har hög tillgänglighet |
| **Påverkan** | Hög — Ingen inloggning, inget dynamiskt innehåll, admin nere |
| **Upptäcktstid** | Minuter (felmeddeklanden i appen) |
| **Åtgärd kortsiktigt** | Vänta — Supabase/AWS har incident response. Statiskt innehåll (ISR-cache) kan fortfarande visas. |
| **Åtgärd långsiktigt** | Migrera PostgreSQL till alternativ värd: Aiven (EU), Neon (EU), egen server med pg_restore |
| **RTO** | <4h vid Supabase-incident, <2 veckor vid permanent migration |
| **RPO** | <24h — Supabase gör dagliga backuper med point-in-time recovery |

**Dataexport:** `pg_dump` via Supabase CLI eller dashboard. Exportera regelbundet (rekommendation: veckovis).

### Scenario C: Intric otillgänglig (AI-assistenter)

| Aspekt | Bedömning |
|--------|-----------|
| **Sannolikhet** | Medel — Litet bolag (~4 anställda), större risk än Vercel/Supabase |
| **Påverkan** | Medel — AI-assistenter nere, men resten av AI-hubben fungerar normalt |
| **Upptäcktstid** | Timmar (chatwidget visar fel, assistentsidor tomma) |
| **Åtgärd kortsiktigt** | Dölj chatwidget och assistentsektioner. Visa informationsmeddelande. |
| **Åtgärd långsiktigt** | Migrera till alternativ AI-plattform (t.ex. Eneo, egen RAG-lösning, Azure OpenAI direkt) |
| **RTO** | <1 dag (dölj funktionalitet), <1 månad (byt plattform) |
| **RPO** | Konversationshistorik: exportera via Intric API innan migration. Kunskapsbaser: spara lokala kopior av alla dokument. |

### Scenario D: Intric AB upphör som bolag

| Aspekt | Bedömning |
|--------|-----------|
| **Sannolikhet** | Låg–medel — Seed-finansierat startup |
| **Påverkan** | Hög på sikt — Ingen support, inga uppdateringar |
| **Åtgärd** | 1. Exportera all data via API (konversationer, kunskapsbaser, konfigurationer). 2. Utvärdera alternativ: Eneo (öppen källkod, Sundsvall), Azure OpenAI, egen RAG-lösning. 3. Migrera inom 3 månader. |

### Scenario E: DPF ogiltigförklaras (Schrems III)

| Aspekt | Bedömning |
|--------|-----------|
| **Sannolikhet** | Medel — Politiskt osäkert |
| **Påverkan** | Medel — Supabase och Vercel juridiskt ifrågasatta |
| **Åtgärd** | 1. Supabase: Migrera till svensk/europeisk PostgreSQL (Aiven, Safespring). 2. Vercel: Migrera till Coolify (self-hosted) eller europeisk host. 3. Intric: Redan svensk hosting, ej påverkad. |
| **Tidsram** | EU brukar ge övergångsperiod (6-12 månader). Påbörja planering omedelbart vid ogiltigförklaring. |

---

## 4. Databackup-strategi

| Data | Backup-metod | Frekvens | Lagringsplats | Ansvarig |
|------|-------------|----------|---------------|----------|
| **Källkod** | Git (GitHub) | Vid varje push | GitHub (USA) + lokal kopia | Utvecklare |
| **Databas (Supabase)** | Supabase automatisk | Dagligen | AWS eu-west-1 | Automatisk |
| **Databas-export** | pg_dump via CLI | 📋 Veckovis (att konfigurera) | Lokal/svensk lagring | Digitaliseringsavdelningen |
| **Intric konversationer** | API-export | 📋 Kvartalsvis (att konfigurera) | Lokal lagring | Digitaliseringsavdelningen |
| **Intric kunskapsbaser** | Lokala kopior av originaldokument | Vid uppladdning | Kommunens filserver | Administratörer |
| **Compliance-dokument** | Git (i docs/) | Vid varje ändring | GitHub + lokal | Automatisk |

---

## 5. Kommunikationsplan vid incident

| Tidpunkt | Åtgärd | Ansvarig | Kanal |
|----------|--------|----------|-------|
| 0–30 min | Bedöm incident och påverkan | Digitaliseringsavdelningen | Intern |
| 30 min–1h | Informera närmaste chef + IT-avdelning | Digitaliseringsavdelningen | E-post/Teams |
| 1–4h | Om längre driftstörning: informera medarbetare | Kommunikationsavdelningen | Intranätet |
| 24h | Extern rapportering om NIS2-kriterier uppfylls | Digitaliseringsavdelningen | CERT-SE (iron.msb.se) |

---

## 6. Exitstrategier per tjänst

| Tjänst | Alternativ | Migreringstid | Komplexitet |
|--------|-----------|---------------|-------------|
| **Vercel** | Coolify (self-host), Netlify, Railway | Dagar | Låg — Next.js är open source |
| **Supabase** | Aiven, Neon, egen PostgreSQL | 1–2 veckor | Medel — pg_dump + auth-migration |
| **Intric** | Eneo (OSS), Azure OpenAI + egen RAG | 1–3 månader | Hög — kräver ny AI-arkitektur |
| **Umami** | Self-hosted Umami (Docker) | Timmar | Låg — OSS, Docker-image |

---

## 7. Testning och övning

| Aktivitet | Frekvens | Ansvarig |
|-----------|----------|----------|
| Verifiera Supabase-backup (pg_dump + restore-test) | Halvårsvis | Digitaliseringsavdelningen |
| Testa exitstrategi för Vercel (lokal deploy) | Årligen | Digitaliseringsavdelningen |
| Exportera Intric-data via API | Kvartalsvis | Digitaliseringsavdelningen |
| Granska och uppdatera denna plan | Halvårsvis | Digitaliseringsavdelningen |
