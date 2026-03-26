# Suveränitetsanalys — Molntjänster för AI-hubben

> **Dokumenttyp:** Risk- och suveränitetsanalys enligt eSam:s metodik (ES2025-02)
> **Personuppgiftsansvarig:** Kommunstyrelsen, Katrineholms kommun
> **Datum:** 2026-03-26
> **Version:** 1.0
> **Ansvarig:** Digitaliseringsavdelningen
> **Nästa granskning:** 2026-09-26

---

## 1. Sammanfattning

AI-hubben använder tre externa molntjänster: **Intric** (AI-plattform), **Supabase** (databas/auth) och **Vercel** (webbhosting). Denna analys bedömer varje tjänst utifrån eSam:s fyra dimensioner: identitetshantering, informationshantering, kontinuitet och tekniska skyddsåtgärder — med särskild hänsyn till röjanderisk (OSL), CLOUD Act och digital suveränitet.

| Tjänst | Leverantör | Jurisdiktion | Datalagring | CLOUD Act-risk | Samlad bedömning |
|--------|-----------|-------------|-------------|---------------|-----------------|
| **Intric** | Intric AB (SE) | Sverige | Sverige (GleSys) | **Ingen** | **Låg risk** — Svensk leverantör, svensk hosting |
| **Supabase** | Supabase Inc. (US) | USA | EU/Irland (AWS) | **Ja** | **Medel risk** — US-bolag med EU-datalagring |
| **Vercel** | Vercel Inc. (US) | USA | USA/EU (AWS+globalt) | **Ja** | **Medel risk** — US-bolag, DPF-certifierat |
| **Umami Cloud** | Umami Software (US) | USA | Att verifiera | **Att utreda** | **Outredd** |

---

## 2. Rättslig bakgrund

### 2.1 OSL och röjanderisk

När en kommun gör information tekniskt tillgänglig för en molntjänstleverantör kan informationen anses **röjd** i offentlighets- och sekretesslagens (OSL) mening. Sedan **1 juli 2023** gäller den nya sekretessbrytande bestämmelsen **OSL 10 kap. 2a §**:

- Röjande till en tjänsteleverantör för **teknisk bearbetning eller lagring** är tillåtet
- **Förutsatt** att röjandet inte bedöms som **olämpligt** (olämplighetsrekvisitet)

### 2.2 Faktorer som gör röjande olämpligt

Enligt eSam (ES2023-06) ska följande beaktas:

- Mycket stora volymer känslig data aggregerad hos en leverantör
- Leverantören lyder under utländsk lagstiftning som kan tvinga fram utlämnande (CLOUD Act, FISA)
- Otillräckliga tekniska skyddsåtgärder
- Geografisk placering olämplig för informationstypen
- Flera myndigheters system kombinerade i samma moln

### 2.3 CLOUD Act och FISA

- **CLOUD Act (2018):** Ger amerikanska myndigheter rätt att kräva data från USA-kontrollerade företag oavsett var data fysiskt lagras
- **FISA Section 702:** Möjliggör underrättelseövervakning av icke-amerikanska personer
- **EU-US Data Privacy Framework (DPF):** Adekvansbeslut från juli 2023, men politiskt instabilt (Trump avskedade PCLOB-ledamöter 2025)

---

## 3. Analys per tjänst

---

### 3.1 Intric AI-plattform

#### Tjänstebeskrivning

| Fält | Värde |
|------|-------|
| Leverantör | Intric AB (559308-3743) |
| Jurisdiktion | Sverige |
| Typ | SaaS — AI-assistentplattform |
| Infrastruktur | GleSys AB (Sverige, ISO 27001) |
| Certifiering | ISO 27001:2022 |
| PUB-avtal | ✅ Tecknat (SKR:s mall) |

#### Informationsklassificering

| Datatyp | Konfidentialitetsnivå | Personuppgifter? |
|---------|----------------------|-----------------|
| Användarkonton (namn, e-post) | Intern | Ja |
| Konversationshistorik | Intern — potentiellt konfidentiell* | Potentiellt |
| Kunskapsbaser (dokument) | Intern — potentiellt konfidentiell* | Potentiellt |
| Tekniska loggar | Intern | Ja (IP-adresser) |

*Beroende på vad användare matar in/laddar upp.

#### Juridisk analys

**OSL-bedömning:**
- Intric AB är ett **svenskt bolag** med **svensk hosting** (GleSys). Ingen utländsk lagstiftning kan tvinga fram utlämnande utan svensk rättsprocess.
- Röjande till Intric enligt OSL 10:2a bedöms som **lämpligt** — svensk leverantör, svensk infrastruktur, PUB-avtal, ISO 27001.

**CLOUD Act:** Ej tillämplig — Intric är inte ett amerikanskt bolag och använder ingen amerikansk infrastruktur för primär datalagring.

**Tredjelandsöverföring:** Inga tredjelandsöverföringar sker om enbart svenska/EU-hostade AI-modeller används. Om amerikanska modeller (OpenAI/Anthropic) aktiveras, överförs promptinnehåll (utan användaridentitet) till USA.

#### Teknisk analys

| Aspekt | Bedömning |
|--------|-----------|
| Kryptering i transit | ✅ TLS 1.2+ |
| Kryptering i vila | ✅ Industristandard |
| Nyckelhantering | Leverantörskontrollerad (kundkontrollerad vid on-prem) |
| Datalagring | Sverige (GleSys) |
| Åtkomstkontroll | RBAC, MFA, SSO |
| Loggning | Fullständig granskningslogg (7 kategorier) |

#### Suveränitetsbedömning

| Aspekt | Bedömning |
|--------|-----------|
| Digital suveränitet | **Hög** — Svensk leverantör, svensk hosting |
| Vendor lock-in | **Låg–medel** — Dataexport via API möjlig |
| Exit-strategi | Export av data via API. Migration till annan plattform kräver arbete men är möjlig. |
| Totalförsvarsperspektiv | Svensk infrastruktur, ej beroende av utländska leverantörer för grundfunktioner |

#### Beslut

**✅ Godkänd** — Låg risk. Svensk leverantör med svensk hosting. Förutsättning: Enbart EU/svenska AI-modeller som standard.

---

### 3.2 Supabase (databas, autentisering, lagring)

#### Tjänstebeskrivning

| Fält | Värde |
|------|-------|
| Leverantör | Supabase Inc. |
| Jurisdiktion | **USA** (San Francisco) |
| Typ | PaaS — PostgreSQL-databas, autentisering, lagring |
| Infrastruktur | Amazon Web Services (USA-bolag) |
| Datacenter | **EU — eu-west-1, Irland** |
| DPA | ✅ Tecknad 2026-03-26 (inkl. EU SCCs) |

#### Informationsklassificering

| Datatyp | Konfidentialitetsnivå | Personuppgifter? |
|---------|----------------------|-----------------|
| Profiler (namn, e-post, kommun, yrkestitel) | Intern | Ja |
| Lösenord (bcrypt-hashade) | Konfidentiell | Ja (krypterade) |
| Utbildningsframsteg | Intern | Ja |
| Favoriter | Intern | Ja |
| Utbildningsanmälningar | Intern | Ja |
| Kontaktmeddelanden | Intern | Ja |
| Nyheter, FAQ, dokument | Öppen | Nej |
| Assistentdata | Öppen | Nej |

#### Juridisk analys

**OSL-bedömning:**
- Supabase Inc. är ett **amerikanskt bolag**. Trots EU-datalagring (Irland) kan amerikanska myndigheter kräva tillgång via CLOUD Act.
- AI-hubben innehåller **ingen sekretessbelagd information** — all data är antingen offentlig (nyheter, assistenter, FAQ) eller interna arbetsuppgifter (profiler, framsteg).
- Röjande enligt OSL 10:2a bedöms som **lämpligt** med villkor: (a) ingen sekretessbelagd information lagras, (b) DPA med SCCs tecknad, (c) Supabase DPF-certifierat.

**CLOUD Act-risk:**
- **Ja, strukturell risk finns.** Supabase och AWS är amerikanska bolag.
- **Bedömd sannolikhet:** Mycket låg. Amerikansk lagstiftning riktar sig mot terrorbekämpning och grov brottslighet — en svensk kommuns utbildningsplattform är inte ett realistiskt mål.
- **Konsekvens vid realisering:** Medel. Personuppgifter (namn, e-post) exponeras, men ingen känslig information (Art. 9) finns.

**GDPR — tredjelandsöverföring:**
- Data lagras i EU (Irland). Ingen rutinmässig tredjelandsöverföring sker.
- DPA med EU Standard Contractual Clauses (SCCs) tecknad.
- Supabase kontrollbolag (USA) har teoretisk åtkomst — hanteras via DPA:ns åtkomstbegränsningar.

**EU-US DPF:**
- Verifiera om Supabase Inc. är DPF-certifierat på dataprivacyframework.gov
- DPF:s långsiktiga stabilitet är osäker (Schrems III-risk)

#### Teknisk analys

| Aspekt | Bedömning |
|--------|-----------|
| Kryptering i transit | ✅ TLS |
| Kryptering i vila | ✅ AES-256 (AWS) |
| Nyckelhantering | AWS-kontrollerad (ej kundkontrollerad på gratis/pro-plan) |
| Datalagring | EU (Irland, eu-west-1) |
| Åtkomstkontroll | Row Level Security (RLS), rollbaserad |
| Loggning | Databasloggar, auth-loggar |
| Backuper | Dagliga automatiserade, point-in-time recovery |

#### Suveränitetsbedömning

| Aspekt | Bedömning |
|--------|-----------|
| Digital suveränitet | **Medel** — EU-datalagring men USA-kontrollerat bolag |
| Vendor lock-in | **Låg** — PostgreSQL är öppen standard. Data kan exporteras och migreras. |
| Exit-strategi | pg_dump + migrera till annan PostgreSQL-värd (Aiven, egen server). Genomförbart inom veckor. |
| Totalförsvarsperspektiv | Beroende av amerikanskt bolag och AWS. Vid geopolitisk konflikt: tjänsten kan bli otillgänglig. |

#### Riskreducerande åtgärder

1. ✅ DPA med SCCs tecknad
2. ✅ Data i EU-region (Irland)
3. ✅ Ingen sekretessbelagd information lagras
4. ✅ Lösenord krypterade (bcrypt)
5. 📋 Dokumentera exitstrategi (pg_dump)
6. 📋 Överväg svensk/europeisk alternativ långsiktigt (Aiven, Neon EU, Safespring)

#### Beslut

**✅ Godkänd med villkor:**
- Ingen sekretessbelagd information får lagras i Supabase
- DPA ska hållas aktuell
- Exitstrategi ska dokumenteras
- Vid förändrad DPF-status: omvärdera

---

### 3.3 Vercel (webbhosting, CDN)

#### Tjänstebeskrivning

| Fält | Värde |
|------|-------|
| Leverantör | Vercel Inc. |
| Jurisdiktion | **USA** (San Francisco) |
| Typ | PaaS — webbhosting, serverless functions, CDN |
| Infrastruktur | AWS, Azure, GCP (globalt) |
| DPA | ✅ Gäller via Terms of Service (EU SCCs inkluderade) |
| DPF | ✅ Certifierat |

#### Informationsklassificering

| Datatyp | Konfidentialitetsnivå | Personuppgifter? |
|---------|----------------------|-----------------|
| Statiskt webbinnehåll (HTML, CSS, JS) | Öppen | Nej |
| ISR-cache (renderade sidor) | Öppen — intern* | Potentiellt |
| HTTP-förfrågningar (headers, cookies) | Intern | Ja (session-tokens) |
| Serverless function execution | Intern | Potentiellt |

*ISR-cache kan innehålla renderade profilsidor om server-side rendering av persondata sker.

#### Juridisk analys

**OSL-bedömning:**
- Vercel processar **primärt öppet innehåll** (statisk webbsida). Inga sekretessbelagda handlingar passerar Vercel.
- Session-tokens (Supabase Auth cookies) passerar via HTTP-headers men är krypterade och opaka.
- Röjande bedöms som **lämpligt** — enbart öppen/intern information, DPA tecknad.

**CLOUD Act-risk:**
- **Ja, strukturell risk finns.** Vercel är amerikanskt.
- **Bedömd sannolikhet:** Mycket låg. Vercel hanterar enbart webbhosting, inte datalagring.
- **Konsekvens:** Låg. Ingen permanent personuppgiftslagring i Vercel.

**Tredjelandsöverföring:**
- Serverless functions körs som standard i USA (iad1).
- CDN-caching sker globalt.
- **Åtgärd:** Verifiera om Vercel-projektet kan konfigureras med EU-region för serverless functions.

#### Teknisk analys

| Aspekt | Bedömning |
|--------|-----------|
| Kryptering i transit | ✅ TLS (automatiskt via Vercel) |
| Kryptering i vila | ✅ AES-256 |
| Datalagring | Ephemeral (ingen permanent datalagring) |
| Serverless region | ⚠️ Standard: USA. Bör konfigureras till EU. |
| CDN | Globalt distribuerad cache |
| SOC 2 | ✅ Type 2 |

#### Suveränitetsbedömning

| Aspekt | Bedömning |
|--------|-----------|
| Digital suveränitet | **Låg–medel** — USA-kontrollerat, globalt CDN |
| Vendor lock-in | **Låg** — Next.js är open source, kan deployas på andra plattformar (Netlify, Coolify, egen server) |
| Exit-strategi | Migrera till annan Next.js-värd. Genomförbart inom dagar. |
| Totalförsvarsperspektiv | Beroende av amerikanskt bolag. Vid konflikt: sajten kan bli otillgänglig. Alternativ: self-hosting med Coolify/Docker. |

#### Riskreducerande åtgärder

1. ✅ DPA gäller via ToS (EU SCCs)
2. ✅ DPF-certifierat
3. ✅ Ingen permanent personuppgiftslagring
4. 📋 Konfigurera EU-region för serverless functions
5. 📋 Dokumentera exitstrategi (self-hosting)

#### Beslut

**✅ Godkänd med villkor:**
- Verifiera/konfigurera EU-region för serverless functions
- Exitstrategi ska dokumenteras
- Vid förändrad DPF-status: omvärdera

---

### 3.4 Umami Cloud (webbanalys)

#### Tjänstebeskrivning

| Fält | Värde |
|------|-------|
| Leverantör | Umami Software Inc. |
| Jurisdiktion | **USA** (att verifiera) |
| Typ | SaaS — webbanalys |
| DPA | ⬜ Att verifiera |

#### Bedömning

Umami Cloud samlar **enbart anonymiserad, aggregerad besöksstatistik**. Inga cookies, inga personuppgifter, ingen individuell spårning.

**OSL-bedömning:** Ingen sekretessbelagd eller personlig information hanteras. Röjanderisken är **försumbar**.

**GDPR:** Inga personuppgifter behandlas. GDPR är i praktiken ej tillämpligt.

**Rekommendation:** Verifiera datalokalisering. Överväg self-hosting (Umami är öppen källkod) för full kontroll.

#### Beslut

**✅ Godkänd** — Försumbar risk givet att enbart anonymiserad data hanteras. Verifiera DPA och datalokalisering.

---

## 4. Samlad riskbedömning

### 4.1 Riskmatris per tjänst

| Tjänst | Röjanderisk (OSL) | CLOUD Act | Tredjeland | Vendor lock-in | Kontinuitet | Samlad |
|--------|-------------------|-----------|-----------|---------------|-------------|--------|
| **Intric** | Ingen | Ingen | Ingen* | Låg–medel | Medel (litet bolag) | **Låg** |
| **Supabase** | Låg (ej sekretess) | Låg (strukturell) | Låg (EU-lagring) | Låg (PostgreSQL) | God | **Medel** |
| **Vercel** | Försumbar | Låg (strukturell) | Låg–medel | Låg (Next.js OSS) | God | **Låg–medel** |
| **Umami** | Ingen | Ej relevant | Ej relevant | Låg (OSS) | God | **Försumbar** |

*Förutsatt EU/svenska modeller.

### 4.2 Övergripande bedömning

AI-hubben lagrar **ingen sekretessbelagd information**. All information är antingen:
- **Öppen** (nyheter, assistenter, FAQ, kurser)
- **Intern** (profiler, utbildningsframsteg, kontaktmeddelanden)

Den mest känsliga behandlingen sker i **Intric** (konversationsdata), som är svenskhostat. Supabase och Vercel hanterar primärt öppen eller intern information, och båda har DPA:er med EU SCCs.

**CLOUD Act-risken** är strukturell men bedöms som **låg** i praktiken — AI-hubbens data är inte av den karaktär som amerikanska myndigheter riktar in sig på.

### 4.3 Kvarvarande åtgärder

| # | Åtgärd | Prioritet | Ansvarig |
|---|--------|-----------|----------|
| 1 | Konfigurera EU-region för Vercel serverless functions | Medel | Digitaliseringsavdelningen |
| 2 | Begränsa Intric till EU/svenska AI-modeller som standard | Hög | Digitaliseringsavdelningen |
| 3 | Dokumentera exitstrategier för Supabase och Vercel | Låg | Digitaliseringsavdelningen |
| 4 | Verifiera Umami Clouds datalokalisering och DPA | Låg | Digitaliseringsavdelningen |
| 5 | Årlig omvärdering av DPF-status och CLOUD Act-risk | Medel | Digitaliseringsavdelningen |

---

## 5. Beslut

Samtliga molntjänster bedöms som **godkända för fortsatt användning** med de villkor som anges per tjänst. Inga olämpliga röjanden bedöms ske.

| Tjänst | Beslut |
|--------|--------|
| Intric | ✅ Godkänd |
| Supabase | ✅ Godkänd med villkor |
| Vercel | ✅ Godkänd med villkor |
| Umami Cloud | ✅ Godkänd (verifiera DPA) |

**Godkänd av:** ⬜ Inväntar signatur

---

## Referenser

| Källa | URL |
|-------|-----|
| eSam ES2025-02: Att analysera molntjänster | https://www.esamverka.se/vad-vi-gor/molnfragan.html |
| eSam ES2023-06: Vägledning Utkontraktering | https://www.esamverka.se/publikationer.html |
| OSL 10 kap. 2a § | SFS 2023:335 |
| IMY: Överföringar till USA | https://www.imy.se/verksamhet/dataskydd/det-har-galler-enligt-gdpr/overforing-till-tredje-land/overforingar-till-usa/ |
| EU-US Data Privacy Framework | https://dataprivacyframework.gov |
| Supabase DPA | Signerad 2026-03-26, sparad i `Compliance/` |
| Vercel DPA | vercel.com/legal/dpa, gäller via ToS |
| Intric PUB-avtal | Tecknat, SKR:s mall |
