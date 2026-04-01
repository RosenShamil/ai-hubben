# Konsekvensbedömning avseende dataskydd (DPIA)
# Intric AI-plattformen — Katrineholms kommun

---

> **Dokumenttyp:** Konsekvensbedömning enligt GDPR Art. 35
> **Version:** 1.0
> **Datum:** 2026-04-01
> **Status:** Komplett — överlämnad för DPO-samråd
> **Klassificering:** Allmän handling
> **Nästa planerad granskning:** 2026-10-01

---

## Innehållsförteckning

1. [Allmän information och styrning](#1-allmän-information-och-styrning)
2. [Tröskelanalys — Behövs en DPIA?](#2-tröskelanalys)
3. [Systematisk beskrivning av behandlingen](#3-systematisk-beskrivning)
4. [Nödvändighet och proportionalitet](#4-nödvändighet-och-proportionalitet)
5. [Riskidentifiering och riskanalys](#5-riskidentifiering-och-riskanalys)
6. [Riskreducerande åtgärder och kvarvarande risk](#6-riskreducerande-åtgärder)
7. [Behov av förhandssamråd med IMY](#7-förhandssamråd)
8. [Synpunkter från berörda parter](#8-synpunkter-från-berörda-parter)
9. [Sammanfattande bedömning och beslut](#9-sammanfattande-bedömning)
10. [Organisatorisk förankring](#10-organisatorisk-förankring)
11. [Löpande uppföljning och versionshistorik](#11-löpande-uppföljning)

**Bilagor:**
- A. Dataflödesdiagram
- B. Riskmatris
- C. Underleverantörsförteckning
- D. Tekniska och organisatoriska åtgärder (TOMs)

---

## 1. Allmän information och styrning

### 1.1 Personuppgiftsansvarig

| Fält | Uppgift |
|------|---------|
| Organisation | Katrineholms kommun |
| Organisationsnummer | 212000-0340 |
| Ansvarig nämnd | Kommunstyrelsen |
| Förvaltning | Kommunledningsförvaltningen, Digitaliseringsavdelningen |
| Postadress | 641 80 Katrineholm |
| Kontaktperson | digitaliseringsavdelningen@katrineholm.se |

### 1.2 Dataskyddsombud (DPO)

| Fält | Uppgift |
|------|---------|
| Organisation | Sydarkivera (gemensamt dataskyddsombud) |
| E-post | dataskydd@sydarkivera.se |
| Webb | sydarkivera.se |

### 1.3 Personuppgiftsbiträde

| Fält | Uppgift |
|------|---------|
| Företagsnamn | Intric AB |
| Organisationsnummer | 559308-3743 |
| Adress | Nytorpsvägen 34, 183 71 Täby |
| VD | David Wallén (david.wallen@inoolabs.com) |
| Certifiering | ISO 27001:2022 |
| PUB-avtal | Tecknat, baserat på SKR:s standardmall |

### 1.4 DPIA-ansvariga

| Roll | Person/funktion |
|------|----------------|
| Ansvarig för genomförande | Digitaliseringsavdelningen |
| Ansvarig för innehåll och bedömningar | Digitaliseringsavdelningen |
| Deltagare i DPIA-arbetet | Digitaliseringsavdelningen |
| Ansvarig för hantering av kvarvarande risker | Kommunstyrelsen |
| Ansvarig för uppföljning | Digitaliseringsavdelningen |
| DPO (granskning) | Sydarkivera |

---

## 2. Tröskelanalys — Behövs en DPIA?

### 2.1 Art. 35.1 — Övergripande bedömning

Behandlingen avser Katrineholms kommuns användning av Intric AI-plattformen — ett system för generativa AI-assistenter (LLM-baserade) som tillhandahålls till kommunens samtliga förvaltningar och ~3 500 anställda. AI-teknik utgör "ny teknik" i GDPR:s mening och behandlingen sker systematiskt och löpande i den dagliga verksamheten.

### 2.2 Art. 35.3 — Obligatoriska DPIA-fall

| Kriterium | Bedömning |
|-----------|-----------|
| (a) Systematisk/omfattande profilering med rättslig/liknande verkan? | **Nej** — assistenterna profilerar inte användare och fattar inga beslut med rättslig verkan |
| (b) Storskalig behandling av Art. 9/10-uppgifter? | **Nej** — inga känsliga personuppgifter behandlas avsiktligt |
| (c) Systematisk övervakning av offentligt tillgängligt område? | **Nej** |

### 2.3 IMY:s 9 kriterier (Art. 35.4)

| # | Kriterium | Bedömning | Motivering |
|---|-----------|-----------|------------|
| 1 | Utvärdering/poängsättning | Nej | Assistenterna utvärderar inte individer |
| 2 | Automatiserade beslut med rättslig verkan | Nej | Enbart rådgivande funktion |
| 3 | Systematisk övervakning | Nej | Inga övervakningsfunktioner. Konversationsloggar sparas men analyseras inte systematiskt per individ |
| 4 | Känsliga uppgifter (Art. 9) | Nej* | Plattformen är inte avsedd för känsliga uppgifter, men risk finns att användare matar in sådana |
| 5 | Storskalig behandling | Möjligen | ~3 500 potentiella användare i hela kommunorganisationen |
| 6 | Kombinering av datamängder | Nej | Ingen sammankoppling av externa databaser sker |
| 7 | **Sårbara registrerade** | **JA** | Anställda utgör en sårbar kategori pga maktobalans med arbetsgivaren (WP29). Tredje part (kommuninvånare, brukare, elever) kan omnämnas i konversationer utan vetskap. |
| 8 | **Ny teknik** | **JA** | Generativ AI/LLM är ny teknik. IMY:s förteckning inkluderar "innovativ användning av ny teknisk lösning" |
| 9 | Tjänstenekning | Nej | Behandlingen hindrar inte åtkomst till tjänster |

**Resultat: Kriterierna 7 och 8 är uppfyllda (≥ 2). En fullständig DPIA är obligatorisk.**

*Notering till kriterium 4: Även om plattformen inte är avsedd för känsliga uppgifter, kan anställda inom exempelvis socialtjänst, skola och vård oavsiktligt mata in sådan information i AI-chatten (t.ex. hälsoinformation, elevuppgifter, brukaruppgifter). Denna risk hanteras i avsnitt 5.

### 2.4 DPO:s bedömning av tröskelanalysen

| Fråga | Svar |
|-------|------|
| Bedömer DPO att en fullständig DPIA krävs? | ⬜ Inväntar DPO-yttrande |
| DPO:s rekommendationer | ⬜ Inväntar |
| Datum för DPO-konsultation | ⬜ Att boka |

---

## 3. Systematisk beskrivning av behandlingen

### 3.1 Bakgrund och syfte

Katrineholms kommun har beslutat att stärka AI-kompetensen och effektivisera verksamheten genom att tillhandahålla AI-assistenter till kommunens anställda via Intric AI-plattformen. Intric har upphandlats som personuppgiftsbiträde.

**Övergripande ändamål:**
- Ge kommunanställda inom samtliga förvaltningar tillgång till AI-assistenter för rådgivning, informationssökning och textgenerering
- Automatisera rutinuppgifter som sammanfattning, översättning och rapportunderlag
- Höja organisationens AI-mognad och digitala kompetens
- Tillhandahålla kontrollerad AI-användning som alternativ till okontrollerade externa tjänster

**Berörda förvaltningar:**

| Förvaltning | Användningsexempel |
|-------------|-------------------|
| Kommunledningsförvaltningen | Strategiska underlag, sammanfattningar, kommunikation |
| Social- och omsorgsförvaltningen | Metodstöd, rutinbeskrivningar, dokumentationsunderlag (ej ärendehandläggning) |
| Samhällsbyggnadsförvaltningen | Planärenden, regeltolkning, tekniska beskrivningar |
| Bildnings- och arbetsmarknadsförvaltningen | Pedagogiskt stöd, lektionsplanering, administrativa rutiner |
| Service- och kulturförvaltningen | Kommunikation, innehållsproduktion, administrativa rutiner |

**Typer av assistenter i Intric-plattformen:**

| Typ | Beskrivning | Kontroll |
|-----|-------------|----------|
| **Intric Marketplace** | Färdiga assistenter från andra kommuner och organisationer. Delade via Intrics marknadsplats. | Begränsad — kommunen väljer vilka som aktiveras men kontrollerar inte systemprompts eller kunskapsbaser |
| **Egenbyggda assistenter** | Assistenter skapade av Katrineholms kommun i Intric. Egen systemprompt, egna kunskapsbaser, eget modellval. | Full kontroll |
| **Externt exponerade assistenter** | AI-assistenter som görs tillgängliga för allmänheten (t.ex. via kommunens webbplats). | Full kontroll — kommunen styr systemprompt och kunskapsbas |

**Särskild notering om externt exponerade assistenter:** Assistenter som exponeras utanför organisationen (t.ex. via chatwidgets på kommunens webbplatser) interagerar med personer som inte är anställda. Dessa besökare har frivilligt valt att använda tjänsten. Transparensmeddelande ska visas innan interaktion ("AI-assistent — svaren genereras av AI och kan innehålla fel").

**Systemet är INTE avsett för:**
- Beslutsfattande som påverkar enskildas rättigheter
- Behandling av känsliga personuppgifter (Art. 9)
- Myndighetsutövning eller ärendehandläggning
- Automatiserad handläggning av socialtjänst-, skol- eller vårdärenden

### 3.2 Kategorier av personuppgifter

| # | Kategori | Källa | Känslig (Art. 9/10)? | Notering |
|---|----------|-------|---------------------|----------|
| 1 | Förnamn och efternamn | SSO/manuell registrering | Nej | |
| 2 | E-postadress (arbete) | SSO/manuell registrering | Nej | |
| 3 | Användar-ID | Autogenererat | Nej | Pseudonymiserat |
| 4 | Organisationstillhörighet | SSO/manuell | Nej | Förvaltning/avdelning |
| 5 | Konversationsinnehåll | Användarens inmatning | **Potentiellt*** | Användaren styr innehållet |
| 6 | AI-genererade svar | Intric/LLM | Nej | Kan innehålla felaktigheter |
| 7 | IP-adress | Automatisk insamling | Nej | Teknisk logg |
| 8 | Tidsstämplar | Automatisk insamling | Nej | Aktivitetsloggar |
| 9 | Uppladdade dokument | Användarens val | **Potentiellt*** | Användaren styr innehållet |
| 10 | Metadata (sessionsinfo) | Automatisk | Nej | |

*Potentiellt känsligt: Kommunen kan inte fullt kontrollera vad användare skriver i chatten eller laddar upp i kunskapsbaser. Risken är förhöjd inom förvaltningar som hanterar individärenden (socialtjänst, skola, vård). Risken hanteras genom policy, utbildning och Intrics PII-redigeringsfunktion.

### 3.3 Kategorier av registrerade

| # | Kategori | Antal (uppskattning) | Sårbar? | Motivering |
|---|----------|---------------------|---------|------------|
| 1 | Kommunanställda (slutanvändare) | ~3 500 potentiella, ~300–500 aktiva | **Ja** | Anställda är sårbara pga maktobalans med arbetsgivaren (WP29 riktlinje). Kan uppleva implicit tvång att använda plattformen. |
| 2 | Administratörer | ~5 | **Ja** | Samma som ovan, plus utökade befogenheter |
| 3 | Tredje part (omnämnda i konversationer) | Okänt antal | **Ja** | Kommuninvånare, brukare, elever, klienter eller andra som användare kan nämna i konversationer utan deras vetskap eller samtycke |
| 4 | Besökare av externt exponerade assistenter | Okänt antal | Nej | Frivillig interaktion, ej anställningsförhållande |

### 3.4 Omfattning

| Parameter | Värde |
|-----------|-------|
| Geografisk räckvidd | Katrineholms kommun (lokalt) |
| Organisatorisk räckvidd | Samtliga förvaltningar och nämnder |
| Antal potentiella registrerade | ~3 500 anställda |
| Uppskattad aktiv användning | ~300–500 användare |
| Antal användarlicenser | Obegränsat inom kommunen (enligt kundavtal) |
| Antal assistenter | Varierande — Intric Marketplace + egenbyggda |
| Datavolym | Konversationsloggar, uppladdade dokument i kunskapsbaser |
| Lagringsutrymme | 10 GB grundlagring (utökningsbart), lagring alltid i Sverige |
| Driftalternativ | **Dedikerad molninstans** (Sverige, GleSys AB). Tidigare multi-tenant — övergång till dedikerad instans genomförd. |
| Frekvens | Löpande, daglig användning |
| Behandlingstid | Konfigurerbar gallringstid (rekommendation: 90 dagar för konversationer) |

### 3.5 Funktionell beskrivning

#### Användningsflöde:

1. **Inloggning:** Användaren loggar in via SSO (Azure AD/Entra ID) eller manuellt konto i Intric
2. **Val av assistent:** Användaren väljer bland tillgängliga AI-assistenter
3. **Konversation:** Användaren ställer en fråga i chatfönstret
4. **RAG-hämtning (om konfigurerat):** Intric hämtar relevant kontext från uppladdade kunskapsbaser
5. **Metadataborttagning:** Intric tar bort användarens namn, e-post, IP och organisationstillhörighet innan data skickas vidare till språkmodellen
6. **LLM-anrop:** Intric skickar promptinnehåll + systeminstruktioner + RAG-kontext till vald språkmodell
7. **Svar:** LLM returnerar svar. Data raderas omedelbart hos LLM-leverantören (zero-data-storage).
8. **Lagring:** Intric lagrar konversationen krypterad på svenska servrar (GleSys AB, ISO 27001)
9. **Visning:** Svaret visas för användaren

#### Dataflödesdiagram (Bilaga A):

```
┌─────────────────────────────────────────────────────────────┐
│                      ANVÄNDARE                               │
│       Kommunanställd eller extern besökare                  │
│              (Webbläsare, HTTPS/TLS)                        │
└──────────────────────┬──────────────────────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────────────────────┐
│              INTRIC AI-PLATTFORM                             │
│    (Dedikerad instans, GleSys AB, Sverige, ISO 27001)       │
│                                                             │
│  ┌───────────────┐  ┌───────────────┐  ┌────────────────┐  │
│  │ Användarkonton│  │ Konversations-│  │ Kunskapsbaser  │  │
│  │ (namn, e-post │  │ historik      │  │ (dokument,     │  │
│  │  org, roll)   │  │ (krypterad)   │  │  vektorer)     │  │
│  └───────────────┘  └───────────────┘  └────────────────┘  │
│                                                             │
│  ┌───────────────────────────────────────────────────────┐  │
│  │           METADATABORTTAGNING                         │  │
│  │  Tar bort: namn, e-post, IP, org-tillhörighet        │  │
│  │  Behåller: promptinnehåll, systemprompt, RAG-kontext  │  │
│  └──────────────────────┬────────────────────────────────┘  │
│                         │                                   │
│                    PUB-avtal: ✅ (SKR-mall)                 │
└─────────────────────────┬───────────────────────────────────┘
                          │
          ┌───────────────┼──────────────────┐
          ▼               ▼                  ▼
┌──────────────┐ ┌──────────────┐  ┌──────────────────┐
│ SVENSKA      │ │ EU-HOSTADE   │  │ US-BASERADE      │
│ MODELLER     │ │ MODELLER     │  │ MODELLER         │
│              │ │              │  │                  │
│ Berget AI AB │ │ Mistral AI   │  │ OpenAI (GPT)     │
│ (Sverige)    │ │ (Frankrike)  │  │ Anthropic (Claude)│
│              │ │              │  │                  │
│ AI Iron AB   │ │ Microsoft IE │  │ ⚠ Data lämnar EU │
│ (Sverige)    │ │ (Irland)     │  │ (DPF-certifierat)│
│              │ │              │  │                  │
│ DataCrunch   │ │ Google EMEA  │  │                  │
│ (Finland)    │ │ (Irland)     │  │                  │
└──────────────┘ └──────────────┘  └──────────────────┘

Alla LLM-leverantörer:
- Zero-data-storage: data raderas omedelbart efter svar
- Ingen träning på kunddata (kontraktsmässigt garanterat)
- Enbart promptinnehåll skickas — ALDRIG användaridentitet
```

### 3.6 Intric Spaces och säkerhetsklassificering

Intric organiserar data i **Spaces** (arbetsytor) med rollbaserad åtkomstkontroll. Varje förvaltning kan ha egna Spaces med separerade kunskapsbaser och assistenter.

| Roll | Behörigheter |
|------|-------------|
| **Owner** | Full kontroll: skapa/radera assistenter, hantera medlemmar, konfigurera säkerhetsklassificering |
| **Creator** | Skapa assistenter och kunskapsbaser inom ett Space |
| **User** | Använda assistenter, ställa frågor |

**Säkerhetsklassificering per Space:**

Intric tillåter administratörer att begränsa vilka AI-modeller som är tillgängliga per Space baserat på informationens känslighet:

| Klassificeringsnivå | Tillåtna modeller | Användningsscenario |
|---------------------|-------------------|---------------------|
| **Öppen** | Alla modeller (inkl. US-baserade) | Allmän information utan personuppgifter |
| **Känslig** | Enbart EU/svenska modeller | Information som kan innehålla personuppgifter |
| **Konfidentiell** | Enbart svenska modeller eller on-premise | Sekretessbelagd eller verksamhetskritisk information |

**Rekommendation:** Alla Spaces sätts som standard till "Känslig" (enbart EU-modeller). "Öppen" enbart vid explicit beslut att ingen persondata förekommer. Spaces för förvaltningar som hanterar individärenden (socialtjänst, vård) bör klassificeras som "Konfidentiell".

**Notering om känsliga personuppgifter (Art. 9) och svenska modeller:**
Intric är en modell-agnostisk plattform som erbjuder både closed source-modeller (OpenAI, Anthropic — US-baserade) och open source-modeller som driftas helt i Sverige (Berget AI, AI Iron via GleSys). Vid konfiguration med enbart svenska modeller + klassificering "Konfidentiell" stannar all data inom Sverige genom hela kedjan — ingen tredjelandsöverföring sker. Detta innebär att det tekniskt är möjligt att hantera känsliga personuppgifter i sådana Spaces, förutsatt att:
1. Separat skriftligt godkännande tecknas som tillägg till PUB-avtalet (som i standardform explicit exkluderar Art. 9-data)
2. Enbart svenska modeller och svensk hosting används
3. PII-redigering aktiveras
4. Åtkomst begränsas via RBAC till behörig personal

Utan detta skriftliga tillägg gäller PUB-avtalets standardvillkor: **inga känsliga personuppgifter utan separat överenskommelse.**

### 3.7 Roller och ansvar

| Roll | Organisation | Ansvar |
|------|-------------|--------|
| **Personuppgiftsansvarig** | Katrineholms kommun (Kommunstyrelsen) | Bestämmer ändamål och medel för behandlingen |
| **Personuppgiftsbiträde** | Intric AB | Behandlar personuppgifter på uppdrag av kommunen |
| **Underbiträden** | Se Bilaga C | LLM-leverantörer, infrastruktur. Godkända i PUB-avtalet. |
| **DPO** | Sydarkivera | Rådgivning och granskning |
| **Lokal systemägare** | Digitaliseringsavdelningen | Operativ förvaltning av Intric-plattformen |
| **Space-ägare** | Respektive förvaltning | Ansvar för kunskapsbaser och assistenter inom sin förvaltning |

### 3.8 PUB-avtal och avtalsdokumentation

| Avtal | Parter | Status | Typ |
|-------|--------|--------|-----|
| Kundavtal | Katrineholms kommun ↔ Intric AB | ✅ Tecknat (pilot jan–apr 2025, övergått till standardlicens) | Intric Komplett |
| PUB-avtal (Intric) | Katrineholms kommun ↔ Intric AB | ✅ Tecknat | SKR:s standardmall |
| Underbiträdesavtal | Intric AB ↔ LLM-leverantörer | ✅ Tecknade av Intric | Zero-data-storage-klausuler |

**Kontaktpersoner i PUB-avtalet:**

| Roll | Person | E-post |
|------|--------|--------|
| Kontaktperson administration (kommunen) | Andreas Peterzén | andreas.peterzen@katrineholm.se |
| Kontaktperson dataskydd (kommunen) | Yasemin Serinkaya | yasemin.serinkaya@katrineholm.se |
| Kontaktperson (Intric) | David Wallén | david.wallen@inoolabs.com |

**Viktiga avtalsvillkor:**
- Tjänsten är **inte avsedd för behandling av känsliga personuppgifter** (Art. 9 GDPR) utan separat skriftligt godkännande
- Intric använder **aldrig** kundinnehåll för att träna egna AI-modeller
- Tredjepartsmodeller har **kontraktsmässigt skydd** mot modellträning på kunddata
- Driftalternativ: **Dedikerad molninstans** i Sverige (uppgraderad från multi-tenant)
- Tekniska loggar lagras upp till **5 år**

---

## 4. Nödvändighet och proportionalitet

### 4.1 Tillämpligt rättsligt ramverk

| Regelverk | Tillämpning |
|-----------|------------|
| GDPR (EU 2016/679) | Behandling av personuppgifter |
| Dataskyddslagen (2018:218) | Svensk kompletteringslagstiftning |
| EU AI Act (2024/1689) | AI-system som interagerar med fysiska personer (Art. 50) |
| Offentlighets- och sekretesslagen (OSL) | Sekretessprövning av handlingar |
| Arkivlagen (1990:782) | Bevarande och gallring |
| Cybersäkerhetslagen (SFS 2025:1506) | Informationssäkerhet för kommuner |
| DOS-lagen (2018:1937) | Tillgänglighet för digital offentlig service |
| DIGG/IMY:s 18 riktlinjer för generativ AI | Rekommendation men starkt normgivande |
| Katrineholms kommuns vägledning för AI-användning (apr 2025) | Intern styrning — regler för AI-användning, informationsklassning, incidenthantering |
| Katrineholms kommuns informationssäkerhetspolicy (KF 2021-06-14, giltig t.o.m. 2027-12-31) | Intern styrning — övergripande informationssäkerhetskrav, klassningsmatris (nivå 0–4), roller och ansvar. Bygger på SS-ISO/IEC 27000. |
| Katrineholms kommuns systemförvaltarmodell (v1.0, 2025-10-09) | Intern styrning — roller (systemägare, systemförvaltare, informationsägare), NIS2/CER-krav, systemförvaltarplan, incidentrapportering (24h/72h) |

### 4.2 Bedömning av dataskyddsprinciperna

#### 4.2.1 Laglighet, korrekthet och öppenhet (Art. 5.1.a)

**Laglighet:** Behandlingen grundar sig på identifierade rättsliga grunder (se 4.2.2). PUB-avtal reglerar biträdets behandling.

**Korrekthet:** Användare informeras om att de interagerar med AI och att svaren kan innehålla fel. Transparensmeddelanden ska implementeras i alla kanaler där Intric-assistenter exponeras (EU AI Act Art. 50).

**Öppenhet:** Information om behandlingen ska tillhandahållas via kommunens integritetsinformation. Beskrivning av vilka uppgifter som samlas in, ändamål, rättslig grund, mottagare, lagringstid och rättigheter.

#### 4.2.2 Rättslig grund per behandling

| # | Behandling | Personuppgifter | Rättslig grund | Motivering |
|---|-----------|----------------|---------------|------------|
| 1 | Skapa och hantera användarkonton i Intric | Namn, e-post, org, roll | **Allmänt intresse (Art. 6.1.e)** | Kommunens uppdrag att digitalisera och effektivisera verksamheten |
| 2 | Möjliggöra AI-assistentkonversationer | Konversationsinnehåll, metadata | **Allmänt intresse (Art. 6.1.e)** | Kommunens uppdrag att tillhandahålla effektiva arbetsverktyg |
| 3 | RAG/kunskapsbashämtning | Dokumentinnehåll (kan innehålla PU) | **Allmänt intresse (Art. 6.1.e)** | Nödvändigt för att assistenterna ska ge korrekta, verksamhetsanpassade svar |
| 4 | Teknisk loggning (IP, tidsstämplar) | IP-adresser, aktivitetsloggar | **Rättslig förpliktelse (Art. 6.1.c)** | Krav på informationssäkerhet och loggning enligt cybersäkerhetslagen, kommunens informationssäkerhetspolicy (SS-ISO 27000) och NIS2 |
| 5 | Granskningsloggning (audit trail) | Användar-ID, åtgärder, tidsstämplar | **Rättslig förpliktelse (Art. 6.1.c)** | Krav på spårbarhet enligt cybersäkerhetslagen och ISO 27001 |

#### 4.2.3 Ändamålsbegränsning (Art. 5.1.b)

Uppgifterna behandlas enbart för ovan angivna ändamål. Intrics PUB-avtal förbjuder uttryckligen:
- Användning av kunddata för träning av AI-modeller
- Delning av data med tredje part utöver godkända underbiträden
- Behandling utöver dokumenterade instruktioner

#### 4.2.4 Uppgiftsminimering (Art. 5.1.c)

| Åtgärd | Beskrivning |
|--------|-------------|
| Metadataborttagning | Intric tar bort användarens namn, e-post, IP och org-tillhörighet innan data skickas till LLM-leverantörer |
| Minimal kontoinformation | Enbart namn och e-post krävs för kontohantering |
| Zero-data-storage hos LLM | Promptinnehåll och svar raderas omedelbart hos LLM-leverantören |
| Konfigurerbara gallringstider | Konversationer kan automatiskt raderas efter 7–365 dagar |
| PII-redigering | Inbyggd funktion för att maskera personnummer, namn, e-post etc. i dokument |

**Bedömning:** Uppgiftsminimering är väl tillgodosedd genom Intrics arkitektur. En kvarvarande risk är att användare — särskilt inom individnära förvaltningar — oavsiktligt matar in personuppgifter eller känslig information i konversationer. Risken hanteras genom policy, utbildning och tekniska skydd.

#### 4.2.5 Korrekthet (Art. 5.1.d)

- Kontoinformation kan rättas av användaren eller administratör
- AI-genererade svar kan innehålla felaktigheter ("hallucinationer") — detta är en inneboende egenskap hos LLM:er
- Transparensmeddelanden uppmanar användare att granska AI-svar
- Konversationsloggar kan korrigeras eller raderas

#### 4.2.6 Lagringsminimering (Art. 5.1.e)

| Datatyp | Lagringstid | Raderingsmekanism |
|---------|------------|-------------------|
| Kontoinformation | Så länge kontot är aktivt | Manuell/automatisk vid kontoborttagning |
| Konversationshistorik | **Konfigurerbara gallringstider** (7d–365d eller obegränsad) | Automatisk, permanent och oåterkallelig |
| Uppladdade dokument | Så länge de finns i kunskapsbasen | Radering tar bort original, text, chunkar och vektorer |
| Tekniska loggar | Upp till 5 år (per PUB-avtal) | Automatisk |
| LLM-leverantörers data | **Noll** — raderas omedelbart | Kontraktsmässig zero-data-storage |

**Rekommendation:** Kommunen bör fastställa en standardgallringstid på **90 dagar** för konversationer. Tekniska loggars 5-åriga retention bör utvärderas mot faktiskt behov.

#### 4.2.7 Integritet och konfidentialitet (Art. 5.1.f)

Se Bilaga D (Tekniska och organisatoriska åtgärder) för fullständig redogörelse. Sammanfattning:

- **Kryptering i transit:** TLS 1.2+ för all kommunikation
- **Kryptering i vila:** Industristandard för all känslig data
- **Åtkomstkontroll:** RBAC, MFA, SSO-integration
- **Nätverkssegmentering:** Produktion/utveckling/företag separerade
- **Loggning:** Fullständig granskningslogg i 7 kategorier
- **ISO 27001:2022:** Intric är certifierat

### 4.3 Registrerades rättigheter

| Rättighet | Art. | Implementation | Ansvarig |
|-----------|------|---------------|----------|
| Information (13–14) | 13–14 | Integritetsinformation om behandlingen tillgänglig för anställda. AI-transparensmeddelanden. | Kommunen |
| Tillgång (15) | 15 | Export via Intrics admin-gränssnitt och API | Kommunen + Intric |
| Rättelse (16) | 16 | Kontoinformation redigerbar. Konversationer kan inte redigeras men kan raderas. | Kommunen + Intric |
| Radering (17) | 17 | Kontoborttagning via admin. Konversationsgallring konfigurerbar. API för programmatisk radering. | Kommunen + Intric |
| Begränsning (18) | 18 | Kontoinaktivering möjlig | Kommunen |
| Dataportabilitet (20) | 20 | Export via Intrics API (JSON-format) | Kommunen + Intric |
| Invändning (21) | 21 | Kontakta DPO (dataskydd@sydarkivera.se) | Kommunen |
| Automatiserat beslutsfattande (22) | 22 | **Ej tillämpligt** — inga automatiserade beslut med rättslig verkan fattas | — |

### 4.4 Internationella överföringar

| Scenario | Datamottagare | Plats | Skyddsmekanism | Risk |
|----------|--------------|-------|---------------|------|
| Svenska/EU-modeller (Berget, Mistral, etc.) | EU-baserade leverantörer | Sverige/EU | Ingen tredjelandsöverföring | **Låg** |
| Azure OpenAI / Google Cloud EMEA | Microsoft Ireland / Google Ireland | Irland, EU | EU-juridisk person. DPF-certifierade moderbolag. | **Medel** — CLOUD Act-risk via USA-moderbolag |
| OpenAI / Anthropic (om aktiverade) | USA-baserade företag | USA | EU-US Data Privacy Framework (DPF) | **Hög** — data lämnar EU. DPF:s stabilitet osäker (Schrems III-risk) |

**Rekommendation:** Begränsa standardkonfiguration till enbart svenska/EU-hostade modeller för alla Spaces som kan innehålla personuppgifter. Amerikanska modeller enbart för Spaces med "Öppen" klassificering där ingen persondata förekommer.

### 4.5 Bedömning av alternativ med mindre integritetsintrång

| Alternativ | Bedömning | Slutsats |
|-----------|-----------|----------|
| **Ingen AI-plattform alls** | Uppfyller inte kommunens digitaliseringsstrategi. Anställda riskerar att använda icke-godkända AI-verktyg (ChatGPT etc.) utan kontroll — s.k. "skugg-AI". | Avvisat — sämre kontroll |
| **Enbart lokala/on-premise-modeller** | Tekniskt möjligt med Intrics on-prem-alternativ. Eliminerar tredjelandsöverföring helt. Betydligt dyrare och kräver GPU-hårdvara och IT-kompetens. | Möjligt framtida alternativ. Oproportionerligt kostsamt idag. |
| **Helt anonymiserad användning** | Omöjliggör personanpassning, konversationshistorik och support. Administratörer kan inte hantera behörigheter per förvaltning. | Avvisat — gör tjänsten oanvändbar |
| **Begränsa till EU-hostade modeller** | Full funktionalitet bibehålls. Eliminerar tredjelandsöverföring till USA. Något begränsat modellutbud. | **Rekommenderas** som standardinställning |
| **Pseudonymiserade konton** | Möjligt via Intrics arkitektur (användar-ID redan pseudonymiserat). Namn/e-post behövs dock för SSO och administration. | Delvis genomfört — metadata tas bort innan LLM-anrop |
| **Automatisk gallring av konversationer** | Reducerar lagrad datamängd. 90 dagars gallringstid ger balans mellan användbarhet och minimering. | **Rekommenderas** — konfigurera 90 dagars gallring |

**Sammanfattande proportionalitetsbedömning:** Behandlingen bedöms som proportionerlig med de rekommenderade åtgärderna (EU-modellbegränsning + 90 dagars gallring). Nyttan — effektivisering, kontrollerad AI-användning, kompetensutveckling och förebyggande av "skugg-AI" — överväger integritetsintrånget.

---

## 5. Riskidentifiering och riskanalys

### 5.1 Koppling till informationsklassning

Informationsklassning av Intric-plattformen har genomförts 2025-12-17 enligt SKR:s KLASSA-metod. Klassningen bedömer informationens skyddsvärde avseende **konfidentialitet**, **riktighet** och **tillgänglighet** och utgör underlag för de tekniska och organisatoriska åtgärderna i avsnitt 6.

**Deltagare:** Shamil Rosén (IT-samordnare), Michael Bergman (IT-koordinator)

**Resultat:**

| Aspekt | Nivå | Motivering |
|--------|------|-----------|
| **Konfidentialitet** | **Nivå 3 — Allvarlig skada** | Plattformen kan hantera känsliga personuppgifter och sekretessbelagd information (socialtjänst, hemtjänst). Röjande orsakar allvarlig skada för individer och kan bryta mot GDPR och OSL. |
| **Riktighet** | **Nivå 3 — Allvarlig skada** | Information i systemet ligger till grund för verksamhetens beslut. Manipulation eller felaktig data (inkl. AI-hallucinationer) kan få allvarliga konsekvenser för verksamheten och individer. |
| **Tillgänglighet** | **Nivå 2 — Betydande skada** | Systemavbrott orsakar kännbar påverkan (manuell hantering, lägre effektivitet) men verksamheten kan fortgå med alternativa metoder. |

**Lagrum som omfattas:** GDPR, Arkivlagen, OSL. PdL omfattas inte (men bevaka vid framtida hälso-/vårdassistenter). NIS2 — Intric är stödsystem, inte kritisk infrastruktur.

Klassningen genererade **~70 leverantörskrav** (6001–6093) mappade mot ISO 27001:2022, vilka utgör kravställning mot Intric AB.

**Status:** ✅ Genomförd 2025-12-17 (se handlingsplan punkt 13).

### 5.2 Riskbedömningsmetodik

Risker bedöms enligt IMY:s modell med två dimensioner. Varje risk analyseras utifrån:

- **Riskkälla** — Vem eller vad orsakar risken (t.ex. anställd, cyberbrottsling, systemfel)
- **Materiella tillgångar** — Vilka system/lagringsplatser berörs (t.ex. Intric-plattformen, LLM-leverantör, kunskapsbas)
- **Potentiell effekt** — Vad händer om risken realiseras (t.ex. obehörig åtkomst, förlust, förstöring av personuppgifter)
- **Allvarlighetsgrad** — Konsekvens för de registrerades fri- och rättigheter
- **Sannolikhet** — Hur troligt det är att risken realiseras

**Sannolikhet:**
| Nivå | Definition |
|------|-----------|
| 1 — Låg | Osannolikt att inträffa under normal drift |
| 2 — Medel | Kan inträffa vid enskilda tillfällen |
| 3 — Hög | Sannolikt att inträffa regelbundet |
| 4 — Mycket hög | Förväntas inträffa |

**Konsekvens (för registrerade):**
| Nivå | Definition |
|------|-----------|
| 1 — Begränsad | Obetydlig påverkan på registrerades rättigheter |
| 2 — Relativt allvarlig | Viss påverkan, kan åtgärdas |
| 3 — Allvarlig | Betydande påverkan på registrerades rättigheter eller frihet |
| 4 — Mycket allvarlig | Oåterkallelig eller mycket svår påverkan |

**Risknivå = Sannolikhet × Konsekvens:**

|  | Begränsad (1) | Relativt allvarlig (2) | Allvarlig (3) | Mycket allvarlig (4) |
|---|---|---|---|---|
| **Mycket hög (4)** | Medel | Hög | Mycket hög | Mycket hög |
| **Hög (3)** | Medel | Hög | Hög | Mycket hög |
| **Medel (2)** | Låg | Medel | Hög | Hög |
| **Låg (1)** | Låg | Låg | Medel | Medel |

### 5.3 Identifierade risker

#### R1: Användare matar in personuppgifter eller känslig information i AI-chatten

| Aspekt | Bedömning |
|--------|-----------|
| **Riskkälla** | Anställd (oavsiktlig inmatning av känslig information) |
| **Materiella tillgångar** | Intric-plattformen (konversationslagring), LLM-leverantörens servrar (promptinnehåll) |
| **Potentiell effekt** | Obehörig åtkomst till personuppgifter av tredje part; otillåten tredjelandsöverföring om US-modell |
| **Scenario** | En anställd skriver in personnummer, hälsoinformation, namn på klienter/elever/brukare, eller annat känsligt i chatten. Trots Intrics metadataborttagning skickas *promptinnehållet* till LLM-leverantören. Risknivån varierar beroende på modellval: vid US-baserade modeller lämnar data EU (hög risk); vid svenska modeller (Berget AI, AI Iron) stannar data i Sverige (lägre risk, men PUB-avtalets Art. 9-begränsning gäller fortfarande). Risken är särskilt hög inom socialtjänst, vård och skola. |
| **Berörda** | Tredje part (kommuninvånare, klienter, elever, brukare) som omnämns i konversationen — utan deras vetskap eller samtycke |
| **Sannolikhet** | **3 — Hög.** Anställda som arbetar med individärenden hanterar dagligen personuppgifter och kan omedvetet inkludera dem i AI-frågor. |
| **Konsekvens** | **3 — Allvarlig** (vid US-modeller) / **2 — Relativt allvarlig** (vid svenska modeller med korrekt konfiguration). Känsliga uppgifter om tredje part kan exponeras för AI-leverantör utan rättslig grund. Konsekvensen är lägre med svenska modeller (data stannar i Sverige, zero-data-storage), men utan skriftligt Art. 9-tillägg till PUB-avtalet saknas rättslig grund för behandlingen oavsett modellval. |
| **Risknivå före åtgärder** | **HÖG (3×3=9)** |

#### R2: Obehörig åtkomst till konversationshistorik

| Aspekt | Bedömning |
|--------|-----------|
| **Riskkälla** | Extern angripare (stulna inloggningsuppgifter), intern aktör (administratörsövergrepp) |
| **Materiella tillgångar** | Intric-plattformen (konversationshistorik, användarkonton) |
| **Potentiell effekt** | Obehörig åtkomst till arbetsrelaterad och potentiellt känslig information |
| **Scenario** | En obehörig person får tillgång till en anställds konversationshistorik i Intric — via stulna inloggningsuppgifter, osäker delad arbetsstation, eller administratörsövergrepp. Konversationsloggar kan innehålla arbetsrelaterad känslig information. |
| **Berörda** | Den anställde, samt tredje part omnämnda i konversationer |
| **Sannolikhet** | **2 — Medel.** MFA och SSO minskar risken, men stulna sessionstoken eller insider-hot är möjliga. |
| **Konsekvens** | **2 — Relativt allvarlig.** Arbetsrelaterad information exponeras. Allvarligare om konversationer innehåller personuppgifter om tredje part. |
| **Risknivå före åtgärder** | **MEDEL (2×2=4)** |

#### R3: Felaktiga AI-svar leder till felaktiga beslut eller åtgärder

| Aspekt | Bedömning |
|--------|-----------|
| **Riskkälla** | Systemfel (LLM-hallucination), anställd (överdriven tillit till AI-svar) |
| **Materiella tillgångar** | LLM-leverantörens modell, Intrics kunskapsbaser (felaktig RAG-hämtning) |
| **Potentiell effekt** | Felaktigt handlande gentemot medborgare baserat på inkorrekt AI-rådgivning |
| **Scenario** | En anställd förlitar sig på ett AI-genererat svar som innehåller felaktig juridisk, medicinsk eller processrelaterad information ("hallucination"). Den anställde agerar på informationen utan att verifiera, vilket leder till felaktigt handlande gentemot en medborgare. |
| **Berörda** | Kommuninvånare som berörs av den felaktiga åtgärden, den anställde |
| **Sannolikhet** | **3 — Hög.** LLM-hallucinationer är välkända. Risken ökar om användare har överdriven tillit till AI. |
| **Konsekvens** | **2 — Relativt allvarlig.** Beror på kontexten. Vid rent informativa frågor: begränsad. Vid handläggningsrelaterade frågor: kan leda till felaktiga beslut. |
| **Risknivå före åtgärder** | **HÖG (3×2=6)** |

#### R4: Tredjelandsöverföring via amerikanska LLM-leverantörer

| Aspekt | Bedömning |
|--------|-----------|
| **Riskkälla** | Konfigurationsfel (aktivering av US-modeller), regulatorisk förändring (DPF upphävs) |
| **Materiella tillgångar** | LLM-leverantörers servrar i USA (OpenAI, Anthropic) |
| **Potentiell effekt** | Otillåten tredjelandsöverföring; CLOUD Act-åtkomst av utländsk myndighet |
| **Scenario** | Om kommunen aktiverar OpenAI (GPT) eller Anthropic (Claude) i Intric skickas promptinnehåll till servrar i USA. Trots DPF-certifiering finns risk att Data Privacy Framework upphävs (Schrems III). CLOUD Act ger amerikanska myndigheter möjlighet att begära ut data. |
| **Berörda** | Alla användare vars konversationsdata skickas till US-modeller, samt tredje part omnämnda |
| **Sannolikhet** | **2 — Medel.** Beror på vilka modeller som aktiveras. Om enbart EU-modeller används: risken elimineras. |
| **Konsekvens** | **3 — Allvarlig.** Potentiell GDPR-överträdelse vid tredjelandsöverföring utan tillräcklig skyddsnivå. Särskilt problematiskt för kommunal data pga OSL och offentlighetsprincipen. |
| **Risknivå före åtgärder** | **HÖG (2×3=6)** |

#### R5: Dataläckage eller säkerhetsincident hos Intric

| Aspekt | Bedömning |
|--------|-----------|
| **Riskkälla** | Extern angripare (dataintrång), sårbarhet i Intrics plattform |
| **Materiella tillgångar** | Intric-plattformen (GleSys-servrar), databaser med konton/konversationer/dokument |
| **Potentiell effekt** | Förlust eller obehörig åtkomst till konversationsloggar, dokument och kontoinformation |
| **Scenario** | Intric drabbas av dataintrång som exponerar användarkonton, konversationsloggar eller uppladdade dokument. Intric är ett litet bolag (~4 anställda) i seed-fasen, vilket innebär begränsade resurser för incidenthantering. |
| **Berörda** | Alla användare, tredje part omnämnda i konversationer/dokument |
| **Sannolikhet** | **1 — Låg.** Intric är ISO 27001-certifierat, använder svensk hosting (GleSys, ISO 27001), har MFA, nätverkssegmentering och penetrationstester. Men liten organisation = mindre uthållighet vid avancerade attacker. |
| **Konsekvens** | **3 — Allvarlig.** Konversationsloggar och dokument från en kommun kan innehålla verksamhetskritisk information. Förtroendeskada. |
| **Risknivå före åtgärder** | **MEDEL (1×3=3)** |

#### R6: Upplevd övervakning — chilling effect på anställda

| Aspekt | Bedömning |
|--------|-----------|
| **Riskkälla** | Arbetsgivare (bristande kommunikation), systemdesign (loggning av användning) |
| **Materiella tillgångar** | Intric-plattformen (aktivitetsloggar, konversationshistorik) |
| **Potentiell effekt** | Inskränkning av anställdas rätt till privatliv; minskad nytta av plattformen |
| **Scenario** | Anställda upplever att arbetsgivaren kan övervaka deras AI-användning (vilka frågor de ställer, hur ofta, vid vilka tidpunkter). Detta kan skapa en "chilling effect" där anställda undviker att använda tjänsten eller begränsar sin användning, särskilt för känsliga arbetsrelaterade frågor. |
| **Berörda** | Alla anställda |
| **Sannolikhet** | **2 — Medel.** Utan tydlig kommunikation om att individuell övervakning inte sker, är det rimligt att anställda oroar sig. |
| **Konsekvens** | **2 — Relativt allvarlig.** Påverkar rätten till privatliv i arbetslivet. Kan minska tjänstens nytta och skapa arbetsrättsliga frågor. |
| **Risknivå före åtgärder** | **MEDEL (2×2=4)** |

#### R7: Leverantörsberoende — Intric som litet bolag

| Aspekt | Bedömning |
|--------|-----------|
| **Riskkälla** | Leverantör (affärsrisk — konkurs, förvärv, nedläggning) |
| **Materiella tillgångar** | Intric-plattformen (all lagrad data), kunskapsbaser (vektoriserade dokument) |
| **Potentiell effekt** | Förlust av åtkomst till verksamhetsdata; behov av akut migration |
| **Scenario** | Intric AB (~4 anställda, seed-finansierat) upphör med verksamheten, förvärvas, eller kan inte upprätthålla tjänsten. Kommunens data kan bli otillgänglig. Exit-strategi saknas. |
| **Berörda** | Alla användare, kommunens verksamhet |
| **Sannolikhet** | **2 — Medel.** Startupbolag har högre risk för verksamhetsförändringar. |
| **Konsekvens** | **2 — Relativt allvarlig.** Verksamhetsdata otillgänglig. Behov av migration. Dock: Intric erbjuder dataexport via API. |
| **Risknivå före åtgärder** | **MEDEL (2×2=4)** |

#### R8: Kunskapsbaser med personuppgifter indexeras i RAG

| Aspekt | Bedömning |
|--------|-----------|
| **Riskkälla** | Administratör/Space-ägare (uppladdning av dokument med personuppgifter) |
| **Materiella tillgångar** | Intric kunskapsbaser (vektordatabas, chunkar, originaldokument) |
| **Potentiell effekt** | Obehörig åtkomst — personuppgifter citeras i AI-svar till andra användare |
| **Scenario** | En administratör eller Space-ägare laddar upp dokument som innehåller personuppgifter (t.ex. tjänsteutlåtanden, minnesanteckningar med namn, elevlistor) till en kunskapsbas. Dokumentet extraheras, chunkas och vektoriseras. Vid RAG-hämtning kan AI:n citera personuppgifter i sina svar till andra användare inom samma Space. |
| **Berörda** | Personer omnämnda i uppladdade dokument |
| **Sannolikhet** | **2 — Medel.** Beror på vilka dokument som laddas upp och Space-ägarnas medvetenhet. Risken är högre i förvaltningar med omfattande dokumentation om individer. |
| **Konsekvens** | **2 — Relativt allvarlig.** Personuppgifter kan exponeras i oväntade kontexter utan den registrerades vetskap. |
| **Risknivå före åtgärder** | **MEDEL (2×2=4)** |

#### R9: Bristande notifiering vid säkerhetsincident

| Aspekt | Bedömning |
|--------|-----------|
| **Riskkälla** | Leverantör (försenad incidentrapportering), intern process (otydliga roller) |
| **Materiella tillgångar** | Intric-plattformen, kommunens incidenthanteringsprocess |
| **Potentiell effekt** | Försenad notifiering till IMY (GDPR-överträdelse Art. 33); försenad åtgärd |
| **Scenario** | Intrics incidentrespons-SLA anger 48 timmar för kritiska incidenter. GDPR Art. 33 kräver att personuppgiftsansvarig notifierar IMY inom 72 timmar. Det lämnar kommunen enbart 24 timmar för intern bedömning och rapportering. |
| **Berörda** | Alla registrerade vid en incident |
| **Sannolikhet** | **1 — Låg.** Säkerhetsincidenter av denna allvar är ovanliga. |
| **Konsekvens** | **3 — Allvarlig.** Försenad notifiering till IMY = GDPR-överträdelse. |
| **Risknivå före åtgärder** | **MEDEL (1×3=3)** |

#### R10: Bristande styrning vid decentraliserad Space-hantering

| Aspekt | Bedömning |
|--------|-----------|
| **Riskkälla** | Space-ägare/förvaltning (felkonfigurering utan central styrning) |
| **Materiella tillgångar** | Intric Spaces (säkerhetsklassificering, modellval, kunskapsbaser) |
| **Potentiell effekt** | Otillåten tredjelandsöverföring; exponering av känsliga uppgifter via felkonfigurerat Space |
| **Scenario** | När förvaltningar skapar egna Spaces och kunskapsbaser utan central styrning kan det leda till inkonsekvent säkerhetsklassificering, felaktiga modellval, eller uppladdning av olämpliga dokument. En förvaltning kan oavsiktligt aktivera US-modeller i ett Space med känslig information. |
| **Berörda** | Alla registrerade vars data behandlas i felkonfigurerade Spaces |
| **Sannolikhet** | **2 — Medel.** Utan tydliga riktlinjer och utbildning för Space-ägare är detta sannolikt. |
| **Konsekvens** | **3 — Allvarlig.** Kan leda till otillåten tredjelandsöverföring eller exponering av känsliga uppgifter. |
| **Risknivå före åtgärder** | **HÖG (2×3=6)** |

#### R11: Arkivering kontra gallring av konversationer

| Aspekt | Bedömning |
|--------|-----------|
| **Riskkälla** | Regelkonflikt (GDPR:s lagringsminimering vs arkivlagens bevarandekrav) |
| **Materiella tillgångar** | Intric-plattformen (konversationshistorik), kommunens arkivsystem |
| **Potentiell effekt** | Förstöring av allmänna handlingar vid automatisk gallring; alternativt överlagring i strid med GDPR |
| **Scenario** | Konversationer i Intric kan utgöra allmänna handlingar enligt TF 2:4 om de tillför sakuppgift till ett ärende. Automatisk gallring efter 90 dagar kan innebära att handlingar som ska bevaras enligt arkivlagen förstörs. Omvänt kan obegränsad lagring strida mot GDPR:s lagringsminimeringsprincip. Gallringsbeslut saknas för AI-genererat material. |
| **Berörda** | Kommunen (lagefterlevnad), medborgare (rätt att ta del av allmänna handlingar) |
| **Sannolikhet** | **3 — Hög.** Gallringsbeslut för AI-konversationer saknas i de flesta kommuner. |
| **Konsekvens** | **2 — Relativt allvarlig.** Brott mot arkivlagen eller GDPR. Förlust av handlingar som borde bevarats. |
| **Risknivå före åtgärder** | **HÖG (3×2=6)** |

#### R12: Offentlighetsprincipen — konversationsloggar kan begäras ut

| Aspekt | Bedömning |
|--------|-----------|
| **Riskkälla** | Extern part (begäran om utlämnande av allmän handling) |
| **Materiella tillgångar** | Intric-plattformen (konversationshistorik), kommunens registratur |
| **Potentiell effekt** | Exponering av känsligt konversationsinnehåll; sekretessprövning krävs per handling |
| **Scenario** | Om konversationer i Intric bedöms som allmänna handlingar kan vem som helst begära ut dem. Konversationerna kan innehålla information som den anställde inte förväntade sig skulle bli offentlig — t.ex. frågor om arbetsrättsliga problem, personliga reflektioner, eller tredjepartsuppgifter. Sekretessprövning enligt OSL måste göras per handling, vilket kan vara resurskrävande. |
| **Berörda** | Anställda (privatlivsförväntan), tredje part omnämnda i konversationer |
| **Sannolikhet** | **2 — Medel.** Begäran kan ske, men har hittills inte varit vanligt för AI-konversationer. |
| **Konsekvens** | **2 — Relativt allvarlig.** Oförväntad exponering av arbetsrelaterat innehåll. Resurskrävande sekretessprövning. |
| **Risknivå före åtgärder** | **MEDEL (2×2=4)** |

#### R13: Bias och diskriminering i AI-svar

| Aspekt | Bedömning |
|--------|-----------|
| **Riskkälla** | Systemfel (inneboende bias i LLM-modeller, träningsdata) |
| **Materiella tillgångar** | LLM-leverantörens modell, Intric-plattformen (svarsleverans) |
| **Potentiell effekt** | Diskriminerande eller partisk rådgivning som påverkar kommunens handlande gentemot medborgare |
| **Scenario** | AI-modeller kan ge svar som speglar bias i träningsdata — t.ex. könsstereotypa förslag, kulturella fördomar, eller systematiskt sämre kvalitet på svenska jämfört med engelska. Om anställda agerar på sådana svar utan kritisk granskning kan det leda till ojämlik behandling av medborgare. Risken är förhöjd inom socialtjänst och skola. |
| **Berörda** | Kommuninvånare som berörs av AI-informerade beslut |
| **Sannolikhet** | **2 — Medel.** Bias i LLM:er är väldokumenterat, men påverkan beror på användningskontext. |
| **Konsekvens** | **2 — Relativt allvarlig.** Kan leda till ojämlik behandling. Allvarligare vid individnära verksamhet. |
| **Risknivå före åtgärder** | **MEDEL (2×2=4)** |

#### R14: Sekretessbrott via mosaikeffekt i RAG

| Aspekt | Bedömning |
|--------|-----------|
| **Riskkälla** | Systemdesign (RAG-hämtning kombinerar information från flera dokument) |
| **Materiella tillgångar** | Intric kunskapsbaser (chunkar från olika dokument), LLM (sammanställning) |
| **Potentiell effekt** | Röjande av sekretessbelagd information genom sammanställning av i sig harmlösa delar |
| **Scenario** | AI:n hämtar chunkar från flera dokument i en kunskapsbas och sammanställer ett svar som röjer sekretessbelagd information — även om varje enskilt dokument inte gör det. Exempelvis kan namn + diagnos + avdelning från tre separata dokument kombineras till en identifierbar individuppgift. Denna "mosaikeffekt" är svår att förutse och förhindra tekniskt. |
| **Berörda** | Personer vars uppgifter finns i kunskapsbaser (tredje part) |
| **Sannolikhet** | **1 — Låg.** Kräver att flera dokument med relaterade uppgifter finns i samma kunskapsbas. |
| **Konsekvens** | **3 — Allvarlig.** Sekretessbrott enligt OSL. Kan innebära brott mot tystnadsplikt. |
| **Risknivå före åtgärder** | **MEDEL (1×3=3)** |

#### R15: Skugg-AI — okontrollerad användning av externa AI-verktyg

| Aspekt | Bedömning |
|--------|-----------|
| **Riskkälla** | Anställd (använder icke-godkända AI-verktyg som alternativ till Intric) |
| **Materiella tillgångar** | Externa tjänster (ChatGPT, Copilot, Gemini etc.) utan PUB-avtal |
| **Potentiell effekt** | Personuppgifter och verksamhetsinformation delas med externa leverantörer utan avtal eller kontroll |
| **Scenario** | Om Intric upplevs som begränsande (t.ex. enbart EU-modeller, långsam, begränsat modellutbud) kan anställda istället använda ChatGPT, Copilot eller andra externa AI-verktyg via privata konton. Dessa tjänster saknar PUB-avtal med kommunen, och data kan användas för modellträning. Kommunen förlorar kontroll över vilka personuppgifter som behandlas. |
| **Berörda** | Alla registrerade vars uppgifter matas in i okontrollerade verktyg |
| **Sannolikhet** | **3 — Hög.** Studier visar att anställda i alla sektorer redan använder externa AI-verktyg. |
| **Konsekvens** | **3 — Allvarlig.** Personuppgiftsbehandling utan rättslig grund, utan PUB-avtal, utan kontroll. |
| **Risknivå före åtgärder** | **HÖG (3×3=9)** |

---

## 6. Riskreducerande åtgärder och kvarvarande risk

### 6.1 Åtgärdstabell

| Risk | Åtgärd | Ansvarig | Status | Kvarvarande S | Kvarvarande K | Kvarvarande risknivå |
|------|--------|----------|--------|---|---|---|
| **R1** — PII i AI-chatt | (a) Begränsa standardmodeller till enbart EU/svenska modeller. (b) Aktivera Intrics PII-redigering på känsliga Spaces. (c) Utbilda anställda i informationsklassning — "mata aldrig in personnummer, hälsodata eller namn på klienter". (d) Publicera tydliga riktlinjer i AI-policy. (e) Särskild utbildning för individnära förvaltningar. | Kommunen | (a) ⬜ Att konfigurera (b) ⬜ Att aktivera (c) ✅ AI-vägledning + utbildningar via Estracer (d) ✅ "Vägledning för AI-användning" (apr 2025) (e) ⬜ Förvaltningsspecifik | 2 | 2 | **MEDEL (4)** |
| **R2** — Obehörig åtkomst | (a) Kräv SSO med MFA. (b) Konfigurera konversationsgallring (90 dagar). (c) Begränsa administratörsåtkomst till minimum. | Kommunen + Intric | (a) ⬜ Att verifiera (b) ⬜ Att konfigurera (c) ✅ | 1 | 2 | **LÅG (2)** |
| **R3** — Felaktiga AI-svar | (a) Transparensmeddelanden: "Svaren genereras av AI och bör granskas". (b) Förbjud användning av AI för formella beslut utan mänsklig granskning. (c) Inkludera AI-kritiskt tänkande i utbildningsmaterial. | Kommunen | (a) ⬜ Att implementera i alla kanaler (b) ✅ AI-vägledningen: "ses som utkast", "vara källkritisk" (c) ✅ AI-vägledningen: källkritik, granska ursprung | 2 | 1 | **LÅG (2)** |
| **R4** — Tredjelandsöverföring | (a) Begränsa standardkonfiguration till EU/svenska modeller via Intrics säkerhetsklassificering. (b) Dokumentera policybeslut. (c) Om US-modeller aktiveras: enbart i Spaces utan persondata, med "Öppen" klassificering. | Kommunen | (a) ⬜ Att konfigurera (b) ⬜ Att dokumentera (c) N/A | 1 | 2 | **LÅG (2)** |
| **R5** — Dataläckage Intric | (a) PUB-avtal tecknat. (b) Intric ISO 27001-certifierat. (c) Kräv årlig säkerhetsrapport från Intric. (d) Ha en exitplan med dataexport via API. | Kommunen + Intric | (a) ✅ (b) ✅ (c) ⬜ (d) ⬜ | 1 | 2 | **LÅG (2)** |
| **R6** — Chilling effect | (a) Kommunicera tydligt att individuell AI-användning INTE övervakas. (b) Konversationsloggar tillgängliga enbart för den enskilda användaren, inte chefer. (c) Inkludera i introduktionsutbildning. | Kommunen | (a) ⬜ (b) ✅ (Intrics RBAC) (c) ✅ Delvis — AI-utbildningar finns via Estracer | 1 | 1 | **LÅG (1)** |
| **R7** — Leverantörsberoende | (a) Säkerställ regelbunden dataexport via API. (b) Dokumentera exitstrategi. (c) Bevaka Intrics finansiella status årligen. | Kommunen | (a) ⬜ (b) ⬜ (c) ⬜ | 1 | 2 | **LÅG (2)** |
| **R8** — PII i kunskapsbaser | (a) Policy: Ladda INTE upp dokument med personuppgifter utan PII-redigering. (b) Aktivera Intrics automatiska PII-maskering. (c) Utbild Space-ägare och administratörer. | Kommunen | (a) ⬜ (b) ⬜ (c) ⬜ | 1 | 2 | **LÅG (2)** |
| **R9** — Incidentnotifiering | (a) Begär att Intric notifierar inom 24 timmar (inte 48). (b) Upprätta intern incidenthanteringsrutin med tydliga roller. | Kommunen | (a) ⬜ Att förhandla (b) ✅ Systemförvaltarmodellen (NIS2: 24h varning + 72h rapport) + AI-vägledning + infosäkpolicyn (rapportering till MSB) | 1 | 2 | **LÅG (2)** |
| **R10** — Decentraliserad styrning | (a) Central riktlinje för Space-konfiguration. (b) Standardmall för nya Spaces (Känslig klassificering, EU-modeller). (c) Obligatorisk utbildning för Space-ägare. (d) Kvartalsvis granskning av Space-konfigurationer. | Kommunen | (a) ⬜ (b) ⬜ (c) ⬜ (d) ⬜ | 1 | 2 | **LÅG (2)** |
| **R11** — Arkivering vs gallring | (a) Utreda om AI-konversationer utgör allmänna handlingar (i samråd med kommunarkivet). (b) Fatta gallringsbeslut specifikt för AI-genererat material. (c) Konfigurera gallringstid i Intric i enlighet med beslutet. (d) Dokumentera ställningstagandet. | Kommunen (arkiv + digitalisering) | (a) ⬜ (b) ⬜ (c) ⬜ (d) ⬜ | 2 | 1 | **LÅG (2)** |
| **R12** — Offentlighetsprincipen | (a) Utreda hur begäran om utlämnande av AI-konversationer ska hanteras. (b) Etablera rutin för sekretessprövning av konversationsloggar. (c) Informera anställda att konversationer kan vara allmänna handlingar. | Kommunen (registratur + juridik) | (a) ⬜ (b) ⬜ (c) ⬜ | 1 | 2 | **LÅG (2)** |
| **R13** — Bias och diskriminering | (a) Inkludera AI-bias i utbildningsmaterial. (b) Förbjud AI som ensam grund för beslut som berör individer. (c) Följa upp rapporterade fall av partiska svar. | Kommunen | (a) ⬜ (b) ✅ Delvis — AI-vägledningen: "AI-system får inte användas för beslutsfattande" (c) ⬜ | 1 | 2 | **LÅG (2)** |
| **R14** — Mosaikeffekt i RAG | (a) Begränsa kunskapsbaser till dokument utan personuppgifter där möjligt. (b) Separata Spaces per verksamhetsområde (undvik blandade kunskapsbaser). (c) Aktivera PII-redigering innan dokumentuppladdning. | Kommunen | (a) ⬜ (b) ⬜ (c) ⬜ | 1 | 2 | **LÅG (2)** |
| **R15** — Skugg-AI | (a) Tydlig AI-policy som förbjuder okontrollerade AI-verktyg för verksamhetsdata. (b) Säkerställ att Intric är tillräckligt användarvänligt och kapabelt att minska incitamentet för alternativ. (c) Utbilda anställda om riskerna med externa AI-verktyg. (d) Teknisk blockering av externa AI-tjänster (om möjligt via nätverkspolicy). | Kommunen (IT + digitalisering) | (a) ✅ AI-vägledningen: ChatGPT/Copilot explicit förbjudna för PII/sekretess (b) Löpande (c) ✅ AI-vägledningen + utbildningar (d) ⬜ Att utreda | 2 | 2 | **MEDEL (4)** |

### 6.2 Riskmatris — före och efter åtgärder

**Före åtgärder:**

|  | Begränsad (1) | Relativt allvarlig (2) | Allvarlig (3) | Mycket allvarlig (4) |
|---|---|---|---|---|
| **Hög (3)** | | R3, R11 | R1, R15 | |
| **Medel (2)** | | R2, R6, R7, R8, R12, R13 | R4, R10 | |
| **Låg (1)** | | | R5, R9, R14 | |

**Efter åtgärder:**

|  | Begränsad (1) | Relativt allvarlig (2) | Allvarlig (3) | Mycket allvarlig (4) |
|---|---|---|---|---|
| **Hög (3)** | | | | |
| **Medel (2)** | | R1, R15 | | |
| **Låg (1)** | R3, R6 | R2, R4, R5, R7, R8, R9, R10, R11, R12, R13, R14 | | |

**Alla risker reducerade till LÅG eller MEDEL efter åtgärder.** R1 (PII i AI-chatt) och R15 (skugg-AI) kvarstår som MEDEL eftersom de inte helt kan elimineras — användare kan alltid mata in personuppgifter trots utbildning/policy, och skugg-AI kräver både tekniska och organisatoriska åtgärder.

---

## 7. Behov av förhandssamråd med IMY

### 7.1 Bedömning

Enligt Art. 36 ska personuppgiftsansvarig samråda med tillsynsmyndigheten (IMY) om behandlingen, **efter vidtagna åtgärder**, fortfarande innebär en hög risk.

**Bedömning:** Inga kvarvarande risker bedöms som HÖG efter att rekommenderade åtgärder genomförts. Förhandssamråd med IMY bedöms **inte nödvändigt**.

**Förbehåll:** DPO (Sydarkivera) ska ges möjlighet att göra en oberoende bedömning av denna fråga.

---

## 8. Synpunkter från berörda parter

### 8.1 Dataskyddsombudets rekommendationer

| # | Rekommendation | Datum | Kontrollantens svar |
|---|---------------|-------|---------------------|
| 1 | ⬜ Inväntar DPO-yttrande | — | — |

**Åtgärd:** Denna DPIA ska skickas till Sydarkivera (dataskydd@sydarkivera.se) för granskning och yttrande.

### 8.2 Registrerades synpunkter

| Fråga | Svar |
|-------|------|
| Har registrerade (anställda) konsulterats? | **Nej** |
| Motivering | Behandlingen avser ett arbetsverktyg för anställda. Anställdas synpunkter inhämtas via ordinarie samverkansprocesser (MBL). Individuella samråd bedöms oproportionerliga. |
| Fackliga representanter informerade? | ⬜ Rekommenderas att informera via samverkansgrupp |

### 8.3 Övriga intressenter

| Intressent | Konsulterad? | Synpunkt |
|-----------|-------------|----------|
| IT-säkerhetsansvarig | ⬜ Bör konsulteras | — |
| HR-avdelning | ⬜ Bör informeras (anställdas integritet) | — |
| Förvaltningschefer | ⬜ Bör informeras (ansvar som Space-ägare) | — |
| Intric AB | Delvis — via dokumentation | Stöddokumentation tillgänglig på help.intric.ai |

---

## 9. Sammanfattande bedömning och beslut

### 9.1 Sammanfattning av efterlevnad

| Princip | Bedömning |
|---------|-----------|
| Laglighet, korrekthet, öppenhet | ✅ Godtagbar — rättslig grund identifierad, AI-transparens krävs i alla kanaler |
| Ändamålsbegränsning | ✅ Godtagbar — PUB-avtal förbjuder ändamålsglid |
| Uppgiftsminimering | ✅ Godtagbar — metadataborttagning, zero-data-storage hos LLM |
| Korrekthet | ⚠️ Delvis godtagbar — AI-vägledningen täcker källkritik och ansvar. Transparensmeddelanden behövs i alla kanaler där Intric-assistenter exponeras. |
| Lagringsminimering | ⚠️ Förbättring planerad — gallringstid bör konfigureras (rekommendation: 90 dagar) |
| Integritet och konfidentialitet | ✅ Godtagbar — ISO 27001, TLS, kryptering, RBAC, MFA |
| Registrerades rättigheter | ✅ Godtagbar — alla rättigheter tillgodosedda via plattform och processer |
| Internationella överföringar | ⚠️ Förbättring planerad — policybeslut om EU-modellbegränsning behövs |

### 9.2 Handlingsplan

| # | Åtgärd | Ansvarig | Prioritet | Tidsfrist |
|---|--------|----------|-----------|-----------|
| 1 | Begränsa standardmodeller till EU/svenska via Intrics säkerhetsklassificering | Digitaliseringsavdelningen | Hög | 2026-04-30 |
| 2 | Konfigurera automatisk konversationsgallring (90 dagar) | Digitaliseringsavdelningen | Hög | 2026-04-30 |
| 3 | Skicka DPIA till Sydarkivera för DPO-samråd | Digitaliseringsavdelningen | Hög | 2026-04-01 ✅ |
| 4 | AI-vägledning för kommunen (inkl. informationsklassning vid AI-användning) | Digitaliseringsavdelningen + ledning | Hög | ✅ "Vägledning för AI-användning" (apr 2025) |
| 5 | Utbildningsmaterial: "Vad får/får inte matas in i AI" | Digitaliseringsavdelningen | Hög | ✅ Ingår i AI-vägledningen + utbildningar via Estracer |
| 6 | Aktivera PII-redigering på känsliga Spaces | Digitaliseringsavdelningen | Medel | 2026-05-31 |
| 7 | Informera fackliga representanter via samverkansgrupp | HR + Digitaliseringsavdelningen | Medel | 2026-05-31 |
| 8 | Verifiera SSO/MFA-konfiguration | IT-avdelningen | Medel | 2026-04-30 |
| 9 | Central riktlinje för Space-konfiguration + standardmall | Digitaliseringsavdelningen | Medel | 2026-05-31 |
| 10 | Obligatorisk utbildning för Space-ägare (förvaltningar) | Digitaliseringsavdelningen | Medel | 2026-06-30 |
| 11 | Dokumentera exitstrategi (dataexport vid leverantörsbyte) | Digitaliseringsavdelningen | Låg | 2026-09-30 |
| 12 | Begär 24-timmars incidentnotifiering från Intric | Digitaliseringsavdelningen | Låg | 2026-09-30 |
| 13 | Genomför KLASSA-klassificering av Intric-plattformen | Informationssäkerhetssamordnare | Medel | ✅ Genomförd 2025-12-17 (K3/R3/T2) |
| 14 | Utreda om AI-konversationer utgör allmänna handlingar — samråd med kommunarkivet | Digitaliseringsavdelningen + arkiv | Hög | 2026-06-30 |
| 15 | Fatta gallringsbeslut för AI-genererat material | Kommunstyrelsen | Hög | 2026-08-31 |
| 16 | Etablera rutin för sekretessprövning av AI-konversationer vid begäran om utlämnande | Registratur + juridik | Medel | 2026-08-31 |
| 17 | Inkludera AI-bias och diskrimineringsrisker i utbildningsmaterial | Digitaliseringsavdelningen | Medel | 2026-06-30 |
| 18 | AI-policy: förbjud okontrollerade externa AI-verktyg för verksamhetsdata | Digitaliseringsavdelningen + ledning | Hög | ✅ AI-vägledningen förbjuder ChatGPT/Copilot för PII/sekretess |
| 19 | Utreda teknisk blockering av externa AI-tjänster via nätverkspolicy | IT-avdelningen | Medel | 2026-09-30 |
| 20 | Upprätta systemförvaltarplan för Intric som förvaltningsobjekt (enl. systemförvaltarmodellen) | Systemägare + systemförvaltare | Medel | 2026-06-30 |
| 21 | Implementera AI-transparensmeddelanden i alla kanaler där Intric-assistenter exponeras | Digitaliseringsavdelningen | Medel | 2026-06-30 |
| 22 | Kommunicera till anställda att individuell AI-användning inte övervakas | Digitaliseringsavdelningen + HR | Medel | 2026-06-30 |
| 23 | Begär årlig säkerhetsrapport från Intric AB | Digitaliseringsavdelningen | Låg | 2026-09-30 |

### 9.3 Formell validering

| Fält | Uppgift |
|------|---------|
| Personuppgiftsansvarigs bedömning | Behandlingen kan fortgå med de planerade åtgärderna. Kvarvarande risker bedöms som acceptabla. |
| Godkänd av | ⬜ Inväntar signatur |
| Datum | ⬜ |
| DPO:s yttrande | ⬜ Inväntar |

---

## 10. Organisatorisk förankring

### 10.1 Intern förankring

| Steg | Datum | Deltagare | Resultat |
|------|-------|-----------|----------|
| DPIA framtagen | 2026-04-01 | Digitaliseringsavdelningen | Version 1.0 |
| DPO-samråd | ⬜ | Sydarkivera | ⬜ |
| Ledningsförankring | ⬜ | Kommunstyrelsen | ⬜ |
| Facklig information | ⬜ | Samverkansgrupp | ⬜ |
| Förvaltningschefer informerade | ⬜ | Alla förvaltningar | ⬜ |

### 10.2 Ansvar för genomförande

- **Riskreducerande åtgärder (punkt 1–23):** Digitaliseringsavdelningen
- **Policybeslut (AI-policy, gallringsbeslut):** Kommunstyrelsen
- **Space-styrning per förvaltning:** Respektive förvaltningschef
- **Systemägare Intric:** Digitaliseringschef (enligt systemförvaltarmodellen — kommungemensamt system)
- **Systemförvaltare Intric:** Att utse (enl. systemförvaltarmodellen)
- **Informationsägare Intric:** Att utse (enl. systemförvaltarmodellen)
- **Kvarvarande risker:** Accepteras av Kommunstyrelsen efter DPO-samråd

---

## 11. Löpande uppföljning och versionshistorik

### 11.1 Granskningsplan

| Aspekt | Frekvens | Ansvarig |
|--------|----------|----------|
| Ordinär granskning av DPIA | Halvårsvis (nästa: 2026-10-01) | Digitaliseringsavdelningen |
| Granskning vid nya modeller/funktioner | Vid varje förändring | Digitaliseringsavdelningen |
| Granskning vid säkerhetsincident | Vid incident | IT-säkerhet + Digitaliseringsavdelningen |
| Granskning vid nya regelverk | Vid ikraftträdande | Digitaliseringsavdelningen + DPO |
| Granskning av Space-konfigurationer | Kvartalsvis | Digitaliseringsavdelningen |

### 11.2 Trigger för omgranskning

DPIA:n ska omgranskas vid:
1. Nya AI-modeller aktiveras (särskilt US-baserade)
2. Ny funktionalitet läggs till i Intric
3. Förändring av driftalternativ (t.ex. byte till on-premise eller tillbaka till multi-tenant)
4. Intric byter underleverantör
5. Säkerhetsincident hos Intric eller LLM-leverantör
6. Ändring i tillämplig lagstiftning (t.ex. EU AI Act full tillsyn aug 2026)
7. IMY publicerar ny vägledning relevant för behandlingen
8. Nya förvaltningar börjar använda Intric i stor skala
9. Kommunen börjar använda AI-assistenter för medborgarkommunikation i större skala

### 11.3 Versionshistorik

| Version | Datum | Deltagare | Godkänd av | Förändringar |
|---------|-------|-----------|-----------|-------------|
| 1.0 | 2026-04-01 | Digitaliseringsavdelningen | ⬜ Inväntar DPO-yttrande | Första version — kommun-övergripande DPIA för Intric-plattformen |

---

## Bilaga A: Dataflödesdiagram

Se avsnitt 3.5 för visuellt dataflödesdiagram.

---

## Bilaga B: Riskmatris

Se avsnitt 5.3 och 6.2 för riskmatris före och efter åtgärder.

---

## Bilaga C: Underleverantörsförteckning

| Organisation | Org.nr | Plats | Syfte | Data som behandlas | Tredjeland? |
|-------------|--------|-------|-------|-------------------|------------|
| GleSys AB | 556647-9241 | Sverige | Plattformsinfrastruktur (dedikerad molninstans) | Identitets-, kontakt-, IT-relaterade uppgifter | Nej |
| AI Iron AB (Airon) | 559490-8054 | Sverige | Svenska språkmodeller | Användardelat innehåll (fritext, bilagor, kunskapssamlingar) | Nej |
| Berget AI AB | 559504-7522 | Sverige | Svenska språkmodeller | Användardelat innehåll | Nej |
| DataCrunch Oy | FI28868098 | Finland | Nordiska språkmodeller | Användardelat innehåll | Nej |
| Mistral AI | 952 418 325 | Frankrike | Språkmodeller | Användardelat innehåll | Nej |
| Microsoft Ireland Operations | — | Irland | EU-baserade språkmodeller (Azure) | Användardelat innehåll | Nej (EU-enhet, US-moderbolag) |
| Google Cloud EMEA Limited | — | Irland | EU-baserade språkmodeller | Användardelat innehåll | Nej (EU-enhet, US-moderbolag) |
| LinkUp Technologies SAS | 930 910 740 | Frankrike | AI-sökning på internet | Användardelat innehåll | Nej |
| Paragon (Forge Technology, Inc) | — | Tyskland | Integrationstjänster (Office 365, Google Suite, Slack m.fl.) | Användardelat innehåll | Nej |
| Scaleway SAS | — | Frankrike | Systemuppdateringar och resursövervakning | Namn, e-postadress | Nej |

Senast uppdaterad av Intric: 2026-03-27.

**Notering:** Om OpenAI eller Anthropic aktiveras som modelleverantör, tillkommer dessa som underbiträden med servrar i USA. Kräver separat bedömning och omgranskning av denna DPIA.

---

## Bilaga D: Tekniska och organisatoriska åtgärder (TOMs)

### D.1 Intrics tekniska åtgärder

| Kategori | Åtgärd |
|----------|--------|
| **Kryptering i transit** | TLS 1.2+ obligatoriskt för all kommunikation över publika nätverk |
| **Kryptering i vila** | Industristandard för all känslig data |
| **Kryptering av tokens** | OAuth-tokens krypterade med Fernet (AES-128-CBC), dekrypteras enbart i minne |
| **Åtkomstkontroll** | RBAC med tre roller (Owner, Creator, User). Minsta-behörighetsprincipen. |
| **Autentisering** | MFA för produktionsåtkomst. SSO-integration (SAML, OAuth, Azure AD/Entra ID, Google Workspace). |
| **Nätverkssäkerhet** | Produktion, utveckling och företagsnätverk segregerade. Brandväggar. Katrineholms kommun kör dedikerad instans — fullständig nätverksisolering från andra kunder. |
| **Sårbarhetshantering** | Månatlig automatiserad sårbarhetsskanning. Regelbundna penetrationstester. |
| **Loggning** | Alla systemaktiviteter loggas i 7 kategorier. NTP-synkronisering. Loggar skyddade mot manipulation. |
| **Backup** | Dagliga automatiserade backuper (molninstans). 14 dagars återställningsfönster efter radering. Geografisk redundans. Periodisk integritetskontroll. Dokumenterade RTO/RPO. |
| **Utvecklingssäkerhet** | Separata dev/prod-miljöer. Obligatorisk kodgranskning. Komplett ändringshistorik. |
| **Enhetshantering** | Centraliserad MDM. Obligatorisk diskkryptering. Automatiska OS-uppdateringar. |
| **Dataminimering** | Identitetsmetadata (namn, e-post, IP, org) tas bort innan LLM-anrop |
| **Zero-data-storage** | Kontraktsmässig garanti med alla LLM-leverantörer: ingen lagring efter svar |
| **PII-redigering** | Automatisk detektering och maskering av personnummer, namn, e-post, telefon etc. |

### D.2 Intrics organisatoriska åtgärder

| Kategori | Åtgärd |
|----------|--------|
| **Certifiering** | ISO 27001:2022 |
| **Policygranskning** | Årlig, i linje med ISO 27001 |
| **Riskbedömning** | Systematisk, årlig |
| **Personalåtgärder** | Bakgrundskontroller. Sekretessavtal. Obligatorisk årlig säkerhetsutbildning. |
| **Incidenthantering** | 24/7 övervakning. Kritiska incidenter inom 48 timmar. |
| **Leverantörsgranskning** | Årliga säkerhetsgranskningar av underbiträden |
| **Förändringshantering** | Formell process med återställningsplaner |
| **Kontinuitetsplanering** | Business Impact Analysis. Årlig DR/BC-testning. |

### D.3 Katrineholms kommuns åtgärder

| Kategori | Åtgärd | Status |
|----------|--------|--------|
| **PUB-avtal** | Tecknat med Intric (SKR:s mall) | ✅ |
| **AI-vägledning** | "Vägledning för AI-användning" (april 2025) — reglerar informationsklassning, PII-förbud, sekretess, externa AI-verktyg, incidentrapportering, roller | ✅ |
| **AI-utbildning** | Grundläggande AI-utbildningar tillgängliga för alla medarbetare via Estracer (intranätet) | ✅ |
| **Informationsklassningsutbildning** | Förvaltningsspecifik utbildning för individnära verksamheter (socialtjänst, vård, skola) | ⬜ Att komplettera |
| **Space-styrningsriktlinje** | Under framtagning — standardmall och krav för förvaltningars Spaces | ⬜ |
| **Utbildning Space-ägare** | Under framtagning — obligatorisk för alla med Owner/Creator-roll | ⬜ |
| **Exitstrategi** | Under framtagning — dokumenterad plan för leverantörsbyte | ⬜ |
| **Systemförvaltarmodell** | Systemförvaltarmodell v1.0 (2025-10-09) — definierar systemägare, systemförvaltare, informationsägare, NIS2/CER-krav, incidentrapportering (24h/72h) | ✅ |
| **Incidenthanteringsrutin** | Beskriven i informationssäkerhetspolicyn + AI-vägledningen + systemförvaltarmodellen. Rapportering till Digitaliseringsavdelningen/ServiceDesk/MSB. | ✅ |

---

## Bilaga E: Bifogade dokument

Följande dokument bifogas denna DPIA och utgör underlag för bedömningarna:

### E.1 Avtalshandlingar

| # | Dokument | Datum | Beskrivning |
|---|----------|-------|-------------|
| E1 | PUB-avtal Intric ↔ Katrineholms kommun | Tecknat | Personuppgiftsbiträdesavtal baserat på SKR:s standardmall. Reglerar behandling, underbiträden, säkerhetsåtgärder, Art. 9-begränsning. |
| E2 | Kundavtal Intric (inkl. Bilaga A–D) | 2025-01-01 | Intric Komplett — funktioner, hosting, AI-modeller, priser. Pilot jan–apr 2025, övergått till standardlicens. |

### E.2 Kommunens styrdokument

| # | Dokument | Version/Datum | Beskrivning |
|---|----------|---------------|-------------|
| E3 | Vägledning för AI-användning | April 2025 | Regler för AI-användning, informationsklassning, PII-förbud, sekretess, externa AI-verktyg (ChatGPT/Copilot), incidentrapportering, roller. |
| E4 | Informationssäkerhetspolicy + instruktioner (Användare + Förvaltning) | KF 2021-06-14, giltig t.o.m. 2027-12-31 | Övergripande informationssäkerhetskrav, klassningsmatris (nivå 0–4), roller och ansvar. Bygger på SS-ISO/IEC 27000. |
| E5 | Systemförvaltarmodell | v1.0, 2025-10-09 | Roller (systemägare, systemförvaltare, informationsägare), NIS2/CER-krav, systemförvaltarplan, incidentrapportering (24h/72h). |

### E.3 Informationsklassning

| # | Dokument | Datum | Beskrivning |
|---|----------|-------|-------------|
| E6 | KLASSA-klassificering av Intric — Krav på säkerhetsåtgärder till leverantör | 2025-12-17 | SKR KLASSA-klassning: K3/R3/T2. ~70 leverantörskrav (6001–6093) mappade mot ISO 27001:2022. Deltagare: Shamil Rosén, Michael Bergman. |

### E.4 Leverantörsdokumentation

| # | Dokument | Källa | Beskrivning |
|---|----------|-------|-------------|
| E7 | Intric DPIA-stöd (steg-för-steg, systemarkitektur, TOMs, dataflöden, RBAC, best practices) | help.intric.ai | Intrics officiella dokumentation för DPIA-arbete. Underlag för Bilaga D. |
| E8 | Intric PUB-avtalsmall (Bilaga 1: Instruktion + Bilaga 2: Underbiträden) | help.intric.ai | Standardformulerade bilagor till PUB-avtalet. Underbiträdeslista senast uppdaterad 2026-03-27. |
| E9 | Intric Trust Center (ISO 27001:2022-certifikat) | trust.delve.co/intric-ai | Verifiering av Intrics certifieringar. |
