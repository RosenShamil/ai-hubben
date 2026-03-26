# Regelverk och Compliance for AI-hubben

> Katrineholms kommuns AI-plattform for ~3 000 kommunanställda
> Senast uppdaterad: 2026-03-24

---

## Innehåll

1. [EU-förordningar och direktiv](#1-eu-förordningar-och-direktiv)
2. [Svenska lagar](#2-svenska-lagar)
3. [Svenska myndigheters riktlinjer](#3-svenska-myndigheters-riktlinjer)
4. [Säkerhetsstandarder](#4-säkerhetsstandarder)
5. [Tillgänglighetsstandarder](#5-tillgänglighetsstandarder)
6. [Datahantering och lagring](#6-datahantering-och-lagring)
7. [Sammanfattning: Åtgärdslista](#7-sammanfattning-åtgärdslista)

---

## 1. EU-förordningar och direktiv

### 1.1 EU:s AI-förordning (EU AI Act)

**Vad det är:** EU:s förordning om artificiell intelligens (2024/1689), världens första heltäckande AI-lagstiftning. Klassificerar AI-system i fyra risknivåer: oacceptabel risk, hög risk, begränsad risk och minimal risk.

**Status:** OBLIGATORISK (EU-förordning, direkt tillämplig)

**Tidplan:**
- 2 februari 2025: Förbud mot AI med oacceptabel risk trädde i kraft
- 2 augusti 2025: Regler för AI för allmänna ändamål (generativ AI) gäller
- **2 augusti 2026: Majoriteten av reglerna träder i kraft**, inklusive högrisk-AI i Annex III, transparenskrav (Artikel 50), och fullständig tillsyn startar

**Hur det påverkar AI-hubben:**

| Funktion | Riskklassificering | Krav |
|----------|-------------------|------|
| AI-assistentbibliotek (Intric) | **Begränsad risk** — chatbotar och generativ AI | Transparenskrav: användare måste informeras att de interagerar med AI |
| AI-akademin med certifikat | **Potentiellt hög risk** om AI används för bedömning/examination | Om AI-baserad bedömning: kräver konsekvensanalys, datakvalitet, dokumentation, mänsklig tillsyn, noggrannhet |
| Kunskapsbank, nyheter, statistik | **Minimal risk** — informationsvisning | Inga specifika krav utöver god praxis |

**Vad plattformen behöver göra:**
- Genomföra en **AI-riskklassificering** av varje funktion på plattformen
- Implementera **transparensmeddelanden** vid alla AI-interaktioner ("Denna tjänst drivs av AI")
- Dokumentera vilka AI-modeller som används (Intric-plattformen)
- Säkerställa **mänsklig tillsyn** av AI-genererat innehåll
- Förbereda teknisk dokumentation inför 2 augusti 2026
- Bevaka Sveriges nationella implementering via SOU 2025:101, som pekar ut elva tillsynsmyndigheter

**Källor:**
- [EU AI Act Implementation Timeline](https://artificialintelligenceact.eu/implementation-timeline/)
- [DIGG: Förbered verksamheten inför AI-förordningen](https://www.digg.se/ai-for-offentlig-forvaltning/riktlinjer-for-generativ-ai/forbered-verksamheten-infor-ai-forordningen)

---

### 1.2 GDPR (Dataskyddsförordningen, EU 2016/679)

**Vad det är:** EU:s dataskyddsförordning som reglerar behandling av personuppgifter. I Sverige kompletterad av Dataskyddslagen (2018:218).

**Status:** OBLIGATORISK

**Hur det påverkar AI-hubben:**

AI-hubben behandlar personuppgifter i flera sammanhang:
- **Användarregistrering:** e-post, namn, profilinformation (Supabase Auth)
- **Inloggning och sessionshantering:** autentiseringsdata
- **Utbildningsframsteg:** vilka kurser/quiz en användare genomfört (`user_progress`)
- **Favoriter:** sparade assistenter/kurser (`user_favorites`)
- **Kontaktformulär:** namn, e-post, meddelande
- **Administratörshantering:** `admins`-tabellen
- **Analytik:** Umami Cloud (aggregerad, ej personuppgifter)

**Vad plattformen behöver göra:**
- **Rättslig grund:** Fastställ rättslig grund för varje behandling (samtycke, avtal, rättslig förpliktelse, allmänt intresse). För kommuner är ofta "uppgift av allmänt intresse" (Art. 6.1.e) eller "rättslig förpliktelse" (Art. 6.1.c) tillämpligt.
- **Personuppgiftsbiträdesavtal (PBA/DPA):** Teckna med Supabase, Vercel och Umami Cloud
- **Dataskyddspolicy:** Publicera en tydlig integritetspolicy på svenska
- **Registerförteckning:** Upprätta enligt Art. 30 — dokumentera alla behandlingar
- **Konsekvensbedömning (DPIA):** Genomför för AI-assistenter och utbildningsdata
- **Rätt till radering:** Implementera funktion för användare att radera sitt konto och all data
- **Rätt till tillgång:** Användare ska kunna exportera sina uppgifter
- **Dataportabilitet:** Tillhandahåll export i maskinläsbart format
- **Dataminimering:** Samla bara in nödvändiga uppgifter
- **Tredjelandsöverföring:** Säkerställ att all data lagras inom EU/EES eller att adekvat skyddsnivå finns (se avsnitt 6)

**Källor:**
- [IMY: Överföring av personuppgifter till tredjeland](https://www.imy.se/verksamhet/dataskydd/det-har-galler-enligt-gdpr/overforing-till-tredje-land/)
- [Supabase DPA](https://supabase.com/legal/dpa)

---

### 1.3 NIS2-direktivet / Cybersäkerhetslagen

**Vad det är:** EU:s direktiv om åtgärder för en hög gemensam cybersäkerhetsnivå (2022/2555). Implementerat i svensk lag som **Cybersäkerhetslagen (SFS 2025:1506)**, i kraft sedan **15 januari 2026**.

**Status:** OBLIGATORISK — offentlig förvaltning (inklusive kommuner) är en av de "högt kritiska sektorerna"

**Hur det påverkar AI-hubben:**

Katrineholms kommun omfattas av cybersäkerhetslagen oavsett storlek, eftersom kommuner ingår i sektorn "offentlig förvaltning". AI-hubben som digital tjänst för kommunanställda behöver uppfylla:

**Vad plattformen/kommunen behöver göra:**
- **Anmälan till MCF** (Myndigheten för civilt försvar och beredskap, f.d. MSB): Anmälan om verksamhet ska ha skett senast 16 februari 2026
- **Riskhantering:** Systematisk riskbedömning av plattformens cybersäkerhet
- **Incidentrapportering:** Rapportera cybersäkerhetsincidenter till MCF (tidig varning inom 24 timmar, fullständig rapport inom 72 timmar)
- **Säkerhetsnivåer:** Implementera tekniska och organisatoriska säkerhetsåtgärder
- **Ledningsansvar:** Kommunens ledning har formellt ansvar för cybersäkerheten
- **Kontinuitetsplanering:** Plan för driftskontinuitet och katastrofhantering

**Källor:**
- [Cybersäkerhetslagen: NIS2 i Sverige](https://www.lindahl.se/en/expertise/national-security-trade-control/new-cybersecurity-act-implementation-of-the-nis2-directive-in-swedish-law/)
- [Bird & Bird: NIS2 i Sverige](https://www.twobirds.com/en/insights/2025/sweden/navigating-nis-2-in-sweden-what-companies-need-to-know)

---

### 1.4 ePrivacy-direktivet / Lagen om elektronisk kommunikation (LEK)

**Vad det är:** EU:s direktiv om integritet och elektronisk kommunikation (2002/58/EG), implementerat i Sverige genom Lagen om elektronisk kommunikation (2022:482).

**Status:** OBLIGATORISK

**Hur det påverkar AI-hubben:**

LEK reglerar bland annat användning av cookies och liknande spårningstekniker.

**Vad plattformen behöver göra:**
- **Umami Cloud (cookie-free):** Eftersom Umami inte använder cookies och inte samlar personuppgifter, krävs inget cookie-samtycke för analytiken. Dock bör detta dokumenteras.
- **Övriga cookies:** Om plattformen använder sessionscookies (t.ex. Supabase Auth), informera användaren om detta
- **Strikt nödvändiga cookies** (för autentisering, inloggning) kräver **inte** samtycke men kräver information
- **Informationsplikt:** Oavsett cookie-typ ska användare informeras om vilka tekniker som används och deras syfte
- **Ingen cookie-banner krävs** om enbart strikt nödvändiga cookies + cookie-fri analytik används, men en **integritetsinformation** behövs

**Notera:** IMY har 2025 skärpt tillsynen av "dark patterns" i cookie-samtyckesgränssnitt.

**Källor:**
- [Cookie Information: Swedish Cookie Guidelines](https://cookieinformation.com/regulations/cookie-guidelines/swedish-cookie-guidelines/)
- [IMY: Dark patterns i cookie-banners](https://cookieinformation.com/blog/blog-swedish-dpa-imy-dark-patterns-april-2025/)

---

### 1.5 Digital Services Act (DSA)

**Vad det är:** EU:s förordning om digitala tjänster (2022/2065), som reglerar onlineplattformar och digitala förmedlingstjänster. Implementerad i svensk lag (2024:954).

**Status:** BEGRÄNSAT TILLÄMPLIG

**Hur det påverkar AI-hubben:**

DSA riktar sig primärt mot **förmedlingstjänster**, **värdtjänster** och **onlineplattformar** som förmedlar tredjepartsinnehåll. AI-hubben är primärt en intern kommunal plattform som tillhandahåller eget innehåll till anställda.

**Bedömning:** DSA har **begränsad direkt tillämpning** på AI-hubben eftersom:
- Plattformen är inte en onlineplattform i DSA:s mening (förmedlar inte tredjepartsinnehåll till allmänheten)
- Den fungerar som en intern arbetsplatsresurs
- Nyhetsbloggen publicerar eget innehåll, inte användargenererat

**Vad plattformen ändå bör göra:**
- Vara medveten om DSA:s principer kring transparens
- Om kontaktformuläret eller framtida funktioner tillåter användargenererat innehåll, bedöm om DSA-krav aktualiseras

---

### 1.6 European Accessibility Act (EAA) / Tillgänglighetslagen

**Vad det är:** EU:s tillgänglighetsdirektiv (2019/882), implementerat i Sverige som Lagen om vissa produkters och tjänsters tillgänglighet (2023:254), i kraft sedan **28 juni 2025**.

**Status:** DELVIS TILLÄMPLIG (se distinktion nedan)

**Viktig distinktion:** EAA/tillgänglighetslagen gäller primärt för **privata aktörer** som tillhandahåller konsumenttjänster. Kommuner som offentliga aktörer regleras istället av **DOS-lagen** (se 2.5). Dock:
- Om AI-hubben riktar sig till allmänheten (delar av den gör det), kan EAA:s principer vara relevanta
- PTS är tillsynsmyndighet för e-handelstjänster och elektroniska kommunikationstjänster

**Maximal sanktion:** 10 000 000 SEK

**Vad plattformen behöver göra:**
- Följ WCAG 2.1 AA (och förbered för WCAG 2.2 AA som förväntas krävas ~2026)
- Se avsnitt 5 för detaljerade tillgänglighetskrav

**Källor:**
- [PTS: Tillgänglighetslagen](https://pts.se/digital-inkludering/lagen-om-vissa-produkters-och-tjansters-tillganglighet/)

---

## 2. Svenska lagar

### 2.1 Dataskyddslagen (2018:218)

**Vad det är:** Svensk kompletterande lagstiftning till GDPR. Innehåller nationella anpassningar och undantag.

**Status:** OBLIGATORISK

**Hur det påverkar AI-hubben:**
- Samma som GDPR ovan, med svenska kompletterande regler
- **Integritetsskyddsmyndigheten (IMY)** är tillsynsmyndighet
- Kommunen behöver ett dataskyddsombud (DPO) — detta gäller kommunen som helhet, inte enbart AI-hubben

---

### 2.2 Offentlighets- och sekretesslagen (OSL, 2009:400)

**Vad det är:** Reglerar vilka uppgifter hos myndigheter som är offentliga respektive sekretessbelagda. Grundad i offentlighetsprincipen i Tryckfrihetsförordningen (TF 2 kap.).

**Status:** OBLIGATORISK

**Hur det påverkar AI-hubben:**

Allt som registreras och lagras i AI-hubben kan potentiellt utgöra **allmänna handlingar** som är offentliga:
- Meddelanden via kontaktformulär
- Nyhetspubliceringar
- Användarstatistik (aggregerad)
- Administrativ dokumentation

**Specifika risker med molntjänster:**
eSam har lyft frågan om **röjande** av sekretessbelagda uppgifter vid användning av utländska molntjänster (CLOUD Act-problematiken). Om sekretessbelagda uppgifter lagras hos Supabase (AWS), kan det innebära ett röjande om en utländsk myndighet kan begära ut data.

**Vad plattformen behöver göra:**
- **Klassificera information:** Avgör vilken information på plattformen som kan vara sekretessbelagd
- **Registrering:** Säkerställ att allmänna handlingar (t.ex. kontaktformulärsinkomster) registreras/diarieförs
- **Röjanderiskanalys:** Bedöm om lagring i Supabase (AWS EU-Frankfurt) innebär risk för röjande av sekretessbelagda uppgifter
- **Praktisk åtgärd:** Lagra INTE sekretessbelagd information i AI-hubben. Plattformen bör enbart innehålla öppen information.

**Källor:**
- [eSam: Molnfrågan](https://www.esamverka.se/vad-vi-gor/molnfragan.html)

---

### 2.3 Arkivlagen (1990:782)

**Vad det är:** Reglerar bevarande och gallring av allmänna handlingar hos myndigheter.

**Status:** OBLIGATORISK

**Hur det påverkar AI-hubben:**

Allmänna handlingar som uppstår i AI-hubben ska hanteras enligt kommunens arkivreglemente:
- Publicerade nyheter/artiklar
- Kontaktformulärsmeddelanden
- Styrdokument och policyer
- Potentiellt: användarstatistik

**Vad plattformen behöver göra:**
- **Gallringsplan:** Upprätta i samråd med kommunarkivarien — vilken information ska bevaras och hur länge
- **Exportmöjlighet:** Säkerställ att data kan exporteras från Supabase i arkivvänligt format
- **Bevarandeplan:** Plan för långtidsbevarande av handlingar som inte ska gallras
- **Dokumentera systemet:** AI-hubben som IT-system ska beskrivas i kommunens systemförteckning

---

### 2.4 Kommunallagen (2017:725)

**Vad det är:** Grundläggande regler för kommuners och regioners organisation och verksamhet.

**Status:** OBLIGATORISK

**Hur det påverkar AI-hubben:**
- **God ekonomisk hushållning:** Investeringen i AI-hubben ska vara motiverad och kostnadseffektiv
- **Likabehandling:** Alla anställda ska ha likvärdig tillgång till plattformen
- **Beslutsbefogenhet:** Beslut om att införa AI-hubben ska ha fattats med rätt befogenhet (nämnd eller kommunstyrelse)
- **Revision:** Plattformens användning och kostnader kan granskas av kommunrevisionen

---

### 2.5 DOS-lagen (2018:1937) — Lagen om tillgänglighet till digital offentlig service

**Vad det är:** Svensk implementering av EU:s webbtillgänglighetsdirektiv (2016/2102). Kräver att offentliga aktörers digitala tjänster är tillgängliga.

**Status:** OBLIGATORISK — kommuner är direkt omfattade

**Hur det påverkar AI-hubben:**

AI-hubben är en digital offentlig tjänst och ska uppfylla DOS-lagens krav fullt ut:
- Uppfylla tillgänglighetskraven i EN 301 549 (bygger på WCAG 2.1 AA)
- Publicera en **tillgänglighetsredogörelse** (accessibility statement)
- Möjliggöra för användare att rapportera tillgänglighetsbrister
- DIGG är tillsynsmyndighet

**Tidsfrister:** Gäller redan nu (sedan september 2020 för befintliga webbplatser).

**Kommande uppdatering:** EN 301 549 v4.1.1 förväntas 2026 och kommer hänvisa till WCAG 2.2 AA istället för 2.1.

**Vad plattformen behöver göra:**
- Se avsnitt 5 för detaljerade tillgänglighetskrav
- Publicera en tillgänglighetsredogörelse som uppdateras årligen
- Skapa process för att hantera tillgänglighetsklagomål

**Källor:**
- [DIGG: Om DOS-lagen](https://www.digg.se/analys-och-uppfoljning/lagen-om-tillganglighet-till-digital-offentlig-service-dos-lagen/om-lagen)
- [DIGG: EN 301 549 och WCAG](https://www.digg.se/webbriktlinjer/lagar-och-krav/det-har-ar-en-301-549-och-wcag)

---

### 2.6 Lagen om elektronisk kommunikation (LEK, 2022:482)

Se avsnitt 1.4 ovan. LEK är den svenska implementeringen av ePrivacy-direktivet.

---

## 3. Svenska myndigheters riktlinjer

### 3.1 DIGG:s och IMY:s riktlinjer för generativ AI (januari 2025)

**Vad det är:** 18 nationella riktlinjer för hur offentlig förvaltning bör använda generativ AI. Lanserade 21 januari 2025.

**Status:** REKOMMENDATION — men starkt normgivande och baserat på bindande lag

**De 18 riktlinjerna:**

#### Ledning och ansvar
1. **Inför en AI-policy** — Kommunen ska ha en dokumenterad AI-policy
2. **Förbered verksamheten inför AI-förordningen** — Kartlägg AI-användning och förbereda för 2 aug 2026
3. **Beslut med stöd av generativ AI bör ha mänsklig kontroll** — Ingen automatiserad beslutsfattning utan mänsklig granskning

#### Dataskydd och personuppgiftsbehandling
4. **Beakta dataskyddsregelverket som utgångspunkt**
5. **Använd generativ AI enligt dataskyddsrättsliga principer**
6. **Klargör rollfördelningen** mellan personuppgiftsansvarig och personuppgiftsbiträde
7. **Se till att det finns rättslig grund** och annat rättsligt stöd
8. **Överväg automatiserat beslutsfattande och överföring till tredje land**
9. **Säkerställ enskildas rättigheter** vid användning av generativ AI
10. **Bedöm riskerna** och säkerställ lämplig säkerhet
11. **Särskilt om användning av allmänt tillgänglig och integrerad generativ AI**

#### Arbetsrätt
12. **Analysera hur arbetsplatsen påverkas** av att införa generativ AI

#### Anskaffning
13. **Ta medvetna beslut** om att skaffa generativ AI
14. **Köp generativ AI** enligt lagen om offentlig upphandling (LOU)

#### Informationssäkerhet
15. **Säkerställ sekretess** vid användning av generativ AI
16. **Identifiera risker för informationssäkerhet**

#### Upphovsrätt
17. **Bedöm upphovsrätten** vid användningen av generativ AI

#### Etik
18. **Använd generativ AI på ett etiskt sätt**

**Vad AI-hubben specifikt behöver göra:**
- **AI-policy:** Ta fram och publicera Katrineholms kommuns AI-policy (kan publiceras i AI-hubbens dokumentationssektion)
- **Mänsklig kontroll:** Tydliggöra att AI-assistenter via Intric inte fattar beslut — de ger förslag som anställda granskar
- **Dataskydd:** Dokumentera hur Intric-plattformen behandlar data som matas in av användare
- **Informationssäkerhet:** Klassificera vilken information som FÅR och INTE FÅR matas in i AI-assistenterna
- **Upphovsrätt:** Informera användare om upphovsrättsliga begränsningar för AI-genererat innehåll
- **Etik:** Etiska riktlinjer för AI-användning bör ingå i utbildningsmaterialet

**Källor:**
- [DIGG: Riktlinjer för generativ AI](https://www.digg.se/ai-for-offentlig-forvaltning/riktlinjer-for-generativ-ai)
- [IMY: Nationella riktlinjer för generativ AI](https://www.imy.se/nyheter/nu-lanseras-nationella-riktlinjer-for-anvandningen-av-generativ-ai-inom-offentlig-forvaltning/)

---

### 3.2 MSB/MCF:s föreskrifter och vägledningar

**Vad det är:** Myndigheten för samhällsskydd och beredskap (sedan 1 januari 2026: Myndigheten för civilt försvar och beredskap, MCF) utfärdar föreskrifter och vägledningar om informationssäkerhet.

**Status:** MSBFS 2020:6 och 2020:7 är OBLIGATORISKA för statliga myndigheter, REKOMMENDERADE för kommuner

**Relevanta föreskrifter:**
- **MSBFS 2020:6:** Föreskrifter om informationssäkerhet för statliga myndigheter (rekommenderas även för kommuner)
- **MSBFS 2020:7:** Allmänna råd om säkerhetsåtgärder i informationssystem
- **Cybersäkerhetslagen (SFS 2025:1506):** Kommuner omfattas direkt (se 1.3)

**Vad plattformen/kommunen behöver göra:**
- Implementera **systematiskt informationssäkerhetsarbete (SIS)** baserat på MSB:s metodstöd
- Genomföra **informationsklassificering** av AI-hubbens data
- Upprätta **säkerhetsrutiner** för drift och förvaltning
- Rapportera **IT-incidenter** till MCF
- Använda MCF:s verktyg **KLASSA** (SKR:s verktyg för informationsklassificering)

**Källor:**
- [MCF: MSBFS 2020:6](https://www.mcf.se/siteassets/dokument/regler/forfattningar/msbfs-2020-6-foreskrifter-om-informationssakerhet-for-statliga-myndigheter.pdf)
- [SKR: KLASSA](https://klassa.skr.se/)

---

### 3.3 SKR:s rekommendationer

**Vad det är:** Sveriges Kommuner och Regioner (SKR) ger vägledning och rekommendationer till kommuner.

**Status:** REKOMMENDATION

**Relevanta initiativ:**
- **AI-råd** för kommuner — rekommendationer för accelererad AI-utveckling
- **Kraftsamling för AI i kommuner** (med AI Sweden)
- **Socialtjänstens användning av AI** — rapport om rättsliga förutsättningar
- **Vägledning för molntjänster** — juridisk bedömning av molntjänstanvändning
- **Färdplan för AI** — mål och aktiviteter

**Vad plattformen behöver göra:**
- Följa SKR:s vägledning vid utvärdering av AI-tjänster
- Delta i SKR:s nätverk för erfarenhetsutbyte kring kommunal AI
- Använda SKR:s verktyg KLASSA för informationsklassificering

**Källor:**
- [SKR: Artificiell intelligens, AI](https://skr.se/digitaliseringivalfarden/datadrivenutveckling/artificiellintelligensai.716.html)
- [AI Sweden: Kraftsamling AI i kommuner](https://www.ai.se/sv/sektorsinitiativ-projekt/kraftsamling-ai-i-kommuner-och-civilsamhalle)

---

### 3.4 eSam:s vägledningar

**Vad det är:** eSam är ett samverkansprogram mellan myndigheter för digital utveckling.

**Status:** REKOMMENDATION — men baserat på bindande lagstiftning

**Relevanta vägledningar:**
- **Molnfrågan:** Metodstöd för risk- och suveränitetsanalyser vid molntjänstanvändning
- **Outsourcing-vägledning:** Juridisk bedömning av IT-outsourcing
- **CLOUD Act-problematiken:** Analys av röjanderisk vid amerikanska molntjänster
- **Adekvansbeslutet:** Uppdateringar om EU-US Data Privacy Framework

**Vad plattformen behöver göra:**
- Genomföra en **suveränitetsanalys** för Supabase (AWS) och Vercel
- Bedöma **röjanderisken** enligt OSL vid lagring hos utländsk molnleverantör
- Dokumentera riskbedömning och motivering för val av molntjänst

**Källor:**
- [eSam: Molnfrågan](https://www.esamverka.se/vad-vi-gor/molnfragan.html)

---

## 4. Säkerhetsstandarder

### 4.1 ISO/IEC 27001:2023

**Vad det är:** Internationell standard för ledningssystem för informationssäkerhet (LIS/ISMS).

**Status:** REKOMMENDERAD för kommuner, men i praktiken en förutsättning för att uppfylla cybersäkerhetslagen

**Hur det påverkar AI-hubben:**

ISO 27001 ger ramverket för systematiskt informationssäkerhetsarbete som kommunen behöver.

**Vad plattformen/kommunen behöver göra:**
- Integrera AI-hubben i kommunens befintliga informationssäkerhetsarbete
- Genomföra **riskbedömning** specifikt för AI-hubben
- Implementera säkerhetsåtgärder baserade på ISO 27001 Annex A:
  - Åtkomstkontroll (admin-roller, användarautentisering)
  - Kryptering (HTTPS, data at rest)
  - Incidenthantering
  - Leverantörshantering (Supabase, Vercel, Intric)
  - Kontinuitetsplanering

---

### 4.2 MSBFS-föreskrifter

Se avsnitt 3.2 ovan.

---

### 4.3 Säkerhetsskyddslagen (2018:585)

**Vad det är:** Reglerar skydd av verksamhet som är av betydelse för Sveriges säkerhet.

**Status:** OBLIGATORISK om tillämplig — men sannolikt **EJ DIREKT TILLÄMPLIG** på AI-hubben

**Bedömning:** AI-hubben hanterar inte information som rör Sveriges säkerhet. Dock bör kommunen generellt ha genomfört en **säkerhetsskyddsanalys** för att verifiera att inga delar av verksamheten omfattas.

---

## 5. Tillgänglighetsstandarder

### 5.1 WCAG 2.1 AA (nuvarande krav)

**Vad det är:** Web Content Accessibility Guidelines 2.1, nivå AA — internationell standard från W3C.

**Status:** OBLIGATORISK via DOS-lagen och EN 301 549

**Nuläge i AI-hubben:** Enligt CLAUDE.md följer plattformen redan WCAG 2.1 AA med focus-visible, aria-labels, prefers-reduced-motion och skip link.

**Fullständig checklista:**

| Område | Krav | Status i AI-hubben |
|--------|------|--------------------|
| Textkontrast | Minst 4.5:1 för normal text, 3:1 för stor text | Verifiera i mörkt/ljust läge |
| Tangentbordsnavigering | Alla funktioner nåbara via tangentbord | Skip link finns |
| Skärmläsare | Alt-texter, ARIA-labels, semantisk HTML | Delvis implementerat |
| Fokusindikering | Tydlig fokusmarkering | focus-visible implementerat |
| Rörelsereduktion | Respektera prefers-reduced-motion | Implementerat |
| Formulärvalidering | Tydliga felmeddelanden, labels | React Hook Form + Zod |
| Responsivitet | Fungera i 200% zoom utan informationsförlust | PWA med mobile-first |
| Språk | Lang-attribut på sidan | Verifiera sv |
| Struktur | Korrekt rubrikhierarki (h1-h6) | Verifiera |

### 5.2 EN 301 549 v3.2.1 (nuvarande) → v4.1.1 (kommande)

**Vad det är:** Europeisk harmoniserad standard som hänvisas till i DOS-lagen. Bygger på WCAG men inkluderar även krav på icke-webbinnehåll.

**Status:** OBLIGATORISK

**Kommande förändring:** EN 301 549 v4.1.1 förväntas träda i kraft 2026 och kommer kräva WCAG 2.2 AA. Nya krav inkluderar bl.a.:
- **2.4.11 Focus Not Obscured (Minimum):** Fokuserat element får inte vara helt dolt
- **2.4.13 Focus Appearance:** Tydligare krav på fokusmarkeringens utseende
- **2.5.7 Dragging Movements:** Alternativ till drag-and-drop
- **2.5.8 Target Size (Minimum):** Minst 24x24 CSS-pixlar för interaktiva element
- **3.2.6 Consistent Help:** Hjälpfunktioner på samma plats
- **3.3.7 Redundant Entry:** Undvik att be om samma information igen

### 5.3 Tillgänglighetsredogörelse

**OBLIGATORISK** enligt DOS-lagen.

**Vad plattformen behöver göra:**
- Publicera en tillgänglighetsredogörelse på aihubben.se
- Ange vilka delar som uppfyller kraven och vilka som inte gör det
- Beskriv eventuella undantag och motiveringen
- Ange kontaktuppgifter för tillgänglighetsfeedback
- Uppdatera årligen
- Anmäl till DIGG via deras formulär

---

## 6. Datahantering och lagring

### 6.1 Nuvarande datalokalisering

| Tjänst | Leverantör | Datacenter | Jurisdiktion |
|--------|-----------|------------|-------------|
| **Databas, Auth, Storage** | Supabase | AWS eu-west-1 eller eu-central-1 (Frankfurt) | EU (Tyskland) — VERIFIERA att EU-region är vald |
| **Webbhosting, CDN** | Vercel | AWS globalt, CDN-noder i EU | USA (huvudkontor), EU (cache). Statisk data cachas globalt, ingen permanent lagring i EU garanterad |
| **Analytik** | Umami Cloud | Leverantörens infrastruktur | VERIFIERA var Umami Cloud lagrar data |
| **AI-assistenter** | Intric | Intric:s infrastruktur | VERIFIERA var data bearbetas |
| **Domän** | aihubben.se | — | — |

### 6.2 Personuppgiftsbiträdesavtal (DPA) som behövs

| Leverantör | DPA-status | Åtgärd |
|-----------|-----------|--------|
| **Supabase** | DPA tillgänglig via self-service | Teckna DPA + Standard Contractual Clauses (SCC) i Supabase-konsolen |
| **Vercel** | DPA tillgänglig på vercel.com/legal/dpa | Teckna DPA. Vercel är certifierade under EU-US Data Privacy Framework (DPF) |
| **Umami Cloud** | VERIFIERA | Kontrollera om Umami Cloud erbjuder DPA. Alternativ: self-host Umami |
| **Intric** | VERIFIERA | Kontrollera Intric:s DPA och var AI-bearbetning sker |

### 6.3 Datalokaliseringskrav för svenska kommuner

**Det finns inget generellt lagkrav** på att svenska kommuners data måste lagras i Sverige. Dock finns viktiga begränsningar:

1. **GDPR Art. 44-49:** Personuppgifter får bara överföras till tredjeland (utanför EU/EES) om adekvat skyddsnivå finns eller lämpliga skyddsåtgärder vidtas
2. **EU-US Data Privacy Framework (DPF):** Gäller sedan juli 2023, tillåter överföring till certifierade amerikanska företag. **OBS:** Politisk instabilitet kring DPF — kan återkallas (Schrems III-risk)
3. **OSL + CLOUD Act:** Amerikanska myndigheter kan begära data från amerikanska molnleverantörer (Supabase via AWS, Vercel). Detta kan innebära ett **röjande** enligt OSL
4. **eSam:s rekommendation:** Genomför risk- och suveränitetsanalys innan beslut om molntjänst

### 6.4 Rekommenderade åtgärder för datahantering

**Kritiska åtgärder:**
1. **Verifiera Supabase-region:** Kontrollera att projektet körs i en EU-region (Frankfurt)
2. **Teckna DPA** med alla underleverantörer (Supabase, Vercel, Umami, Intric)
3. **Genomför risk- och suveränitetsanalys** enligt eSam:s metodstöd
4. **Klassificera all data** enligt KLASSA eller liknande verktyg
5. **Dokumentera tredjelandsöverföringar** (Vercel-servrar i USA)
6. **Kryptera data** i transit (HTTPS) och at rest (Supabase encryption)

**Rekommenderade åtgärder:**
7. Överväg **self-hosting av Umami** i EU för full kontroll
8. Utvärdera om **Vercel Edge Functions** kan konfigureras att enbart köra i EU-regioner
9. Upprätta en **dataskyddspolicy** för AI-hubben
10. Implementera **dataraderingsfunktionalitet** för användardata (GDPR Art. 17)

---

## 7. Sammanfattning: Åtgärdslista

### Prioritet 1: KRITISKT (juridiskt obligatoriskt, omedelbart)

| # | Åtgärd | Regelverk | Status |
|---|--------|-----------|--------|
| 1 | Verifiera att Supabase körs i EU-region | GDPR | ✅ Bekräftat: eu-west-1 (Irland) |
| 2 | Teckna DPA med Supabase | GDPR | ✅ Signerad 2026-03-26. Se `Compliance/Supabase User DPA (March 12, 2026).pdf` |
| 3 | Teckna DPA med Vercel | GDPR | ✅ Gäller automatiskt via ToS. Inkluderar EU SCCs. Kopia sparad i `Compliance/`. |
| 4 | Publicera integritetspolicy/dataskyddsinformation | GDPR | ✅ `/integritetspolicy` — DPO via Sydarkivera, rättsliga grunder, rättigheter, cookies, AI-transparens |
| 5 | Publicera tillgänglighetsredogörelse | DOS-lagen | ✅ `/tillganglighet` — DIGG-mall, WCAG 2.1 AA, kända brister, DIGG-anmälningslänk |
| 6 | Upprätta registerförteckning (Art. 30) | GDPR | ✅ `docs/registerforteckning.md` — 7 behandlingar, biträdesförteckning, rättighetstöd |
| 7 | Verifiera att kommunen anmält till MCF (NIS2) | Cybersäkerhetslagen | 📋 Kolla med kommunens säkerhetsansvarig. Deadline var 2026-02-16. |
| 8 | Implementera radera-konto-funktion | GDPR Art. 17 | ✅ Profilsidan — tvåstegsbekräftelse, raderar all data + auth-användare |

### Prioritet 2: HÖG (juridiskt obligatoriskt, före aug 2026)

| # | Åtgärd | Regelverk | Status |
|---|--------|-----------|--------|
| 9 | Genomför AI-riskklassificering | EU AI Act | ✅ `docs/ai-riskklassificering.md` — Assistenter=begränsad risk, akademin=minimal, övrigt=utanför AI Act |
| 10 | Implementera AI-transparensmeddelanden | EU AI Act Art. 50 | ✅ Chatwidget, assistentdetaljsida, assistentbibliotek — "drivs av AI, granska svaren" |
| 11 | Genomför DPIA (konsekvensbedömning) | GDPR Art. 35 | ✅ `docs/intric-dpia.md` (~25 sidor) — Fullständig DPIA för Intric. Inväntar DPO-samråd med Sydarkivera. Research i `docs/dpia-research-underlag.md` |
| 12 | Ta fram kommunens AI-policy | DIGG riktlinje 1 | ✅ `docs/ai-policy.md` — 18 sektioner, DIGG-baserad. Kompletterar befintlig "Vägledning för AI-användning". Inväntar beslut av kommunstyrelsen. |
| 13 | Genomför suveränitetsanalys för molntjänster | OSL + eSam | ✅ `docs/suveranitetsanalys.md` — Alla 4 tjänster analyserade (Intric, Supabase, Vercel, Umami). Alla godkända. |
| 14 | Klassificera information (KLASSA) | MSB/cybersäkerhetslagen | ✅ `docs/informationsklassificering.md` — K3/R2/T2. Formalisera i KLASSA-verktyget vid tillgång. |
| 15 | Upprätta incidentrapporteringsrutin | Cybersäkerhetslagen | ✅ `docs/incidentrapporteringsrutin.md` — NIS2 3-stegsmodell (24h/72h/1mån), GDPR Art. 33, flödesschema. |
| 16 | Dokumentera AI-system (teknisk dokumentation) | EU AI Act | ✅ `docs/ai-systemdokumentation.md` — Arkitektur, AI-modeller, dataflöden, risker, transparens, leverantörer. |

### Prioritet 3: MEDIUM (rekommenderat, bör göras)

| # | Åtgärd | Regelverk | Status |
|---|--------|-----------|--------|
| 17 | Gallringsplan med kommunarkivarie | Arkivlagen | 📋 Organisatoriskt — kontakta kommunarkivarien. Gäller kontaktmeddelanden, nyheter, styrdokument. |
| 18 | Exportfunktion för användardata | GDPR Art. 20 | ✅ Profilsidan — JSON-export av profil, framsteg, favoriter, anmälningar |
| 19 | Förbered för WCAG 2.2 AA | EN 301 549 v4.1.1 | ✅ Target size ≥24px på alla interaktiva element, aria-labels på stängknappar |
| 20 | Verifiera Intric:s DPA och datalokalisering | GDPR | ✅ PUB-avtal tecknat (SKR-mall). Data i Sverige (GleSys). Dokumenterat i DPIA + suveränitetsanalys. |
| 21 | Verifiera Umami Cloud:s DPA och datalokalisering | GDPR | 📋 Kontakta Umami — eller överväg self-hosting (#25). |
| 22 | Utbildningsmaterial om informationsklassning vid AI-användning | DIGG riktlinje 15 | ✅ Redan i AI-akademin: kurs-1-3/mod-1-3-2 "Informationssäkerhet & GDPR" med "Vad får du skriva till en AI?" + AI-policyn avsnitt 7+9. |
| 23 | Etiska riktlinjer i akademin | DIGG riktlinje 18 | ✅ Redan i AI-akademin: kurs-2-4/mod-2-4-3 "Etisk AI i offentlig sektor" med "AI-etik i praktiken" + AI-policyn avsnitt 5. |
| 24 | Riskbedömning av plattformens cybersäkerhet | ISO 27001 | 📋 Organisatoriskt — samordna med kommunens informationssäkerhetsansvarig. Klassificering gjord i #14. |

### Prioritet 4: LÅGT (bra praxis)

| # | Åtgärd | Regelverk | Status |
|---|--------|-----------|--------|
| 25 | Överväg self-hosting av Umami | Datalokaliseringsprincip | 📋 Löser #21 automatiskt. Kan köras på Vercel eller egen server. |
| 26 | Delta i SKR/AI Sweden-nätverk | SKR rekommendation | 📋 ai.se/kraftsamling, skr.se/ai |
| 27 | Utvärdera svensk/europeisk hosting-alternativ | Suveränitetsprincip | 📋 Alternativ: Safespring, Elastx, City Cloud (svenska moln). |
| 28 | Upprätta kontinuitetsplan | ISO 27001 / NIS2 | ✅ `docs/kontinuitetsplan.md` — 5 scenarier, exitstrategier per tjänst, backup-strategi, kommunikationsplan. |

---

## Viktiga datum

| Datum | Händelse |
|-------|---------|
| **Redan gällande** | GDPR, DOS-lagen, OSL, Arkivlagen, Kommunallagen, LEK |
| **28 juni 2025** | Tillgänglighetslagen (EAA) trädde i kraft |
| **2 augusti 2025** | EU AI Act: regler för generativ AI gäller |
| **15 januari 2026** | Cybersäkerhetslagen (NIS2) trädde i kraft |
| **16 februari 2026** | Deadline för anmälan till MCF |
| **2 augusti 2026** | EU AI Act: majoriteten av reglerna, full tillsyn, högrisk-krav |
| **~2026** | EN 301 549 v4.1.1 → WCAG 2.2 AA förväntas |
| **2030** | EAA: befintliga produkter/tjänster ska vara anpassade |
