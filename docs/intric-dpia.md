# Konsekvensbedömning avseende dataskydd (DPIA)
# Intric AI-plattformen — Katrineholms kommun

---

> **Dokumenttyp:** Konsekvensbedömning enligt GDPR Art. 35
> **Version:** 1.1
> **Datum:** 2026-04-01
> **Status:** Komplett — överlämnad för DPO-samråd
> **Klassificering:** Allmän handling
> **Nästa planerad granskning:** 2026-09-26

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
| Adress | Dalagatan 78A, 113 24 Stockholm |
| VD | David Wallen (david.wallen@intric.ai) |
| Certifiering | ISO 27001:2022 |
| PUB-avtal | Tecknat, baserat på SKR:s standardmall |

### 1.4 DPIA-ansvariga

| Roll | Person/funktion |
|------|----------------|
| Ansvarig för genomförande | Digitaliseringsavdelningen |
| Ansvarig för innehåll och bedömningar | Digitaliseringsavdelningen |
| Deltagare i DPIA-arbetet | Digitaliseringsavdelningen, IT-säkerhet |
| Ansvarig för hantering av kvarvarande risker | Kommunstyrelsen |
| Ansvarig för uppföljning | Digitaliseringsavdelningen |
| DPO (granskning) | Sydarkivera |

---

## 2. Tröskelanalys — Behövs en DPIA?

### 2.1 Art. 35.1 — Övergripande bedömning

Behandlingen avser användning av generativ AI (LLM-baserade assistenter) för kommunens ~3 000 anställda via Intric-plattformen. AI-teknik utgör "ny teknik" i GDPR:s mening och behandlingen sker systematiskt och löpande.

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
| 5 | Storskalig behandling | Möjligen | ~3 000 potentiella användare, men faktisk användning är betydligt lägre |
| 6 | Kombinering av datamängder | Nej | Ingen sammankoppling av databaser sker |
| 7 | **Sårbara registrerade** | **JA** | Anställda utgör en sårbar kategori pga maktobalans med arbetsgivaren (WP29) |
| 8 | **Ny teknik** | **JA** | Generativ AI/LLM är ny teknik. IMY:s förteckning inkluderar "innovativ användning av ny teknisk lösning" |
| 9 | Tjänstenekning | Nej | Behandlingen hindrar inte åtkomst till tjänster |

**Resultat: Kriterierna 7 och 8 är uppfyllda (≥ 2). En fullständig DPIA är obligatorisk.**

*Notering till kriterium 4: Även om plattformen inte är avsedd för känsliga uppgifter, kan anställda oavsiktligt mata in sådan information i AI-chatten (t.ex. hälsoinformation vid personalärenden). Denna risk hanteras i avsnitt 5.

### 2.4 DPO:s bedömning av tröskelanalysen

| Fråga | Svar |
|-------|------|
| Bedömer DPO att en fullständig DPIA krävs? | ⬜ Inväntar DPO-yttrande |
| DPO:s rekommendationer | ⬜ Inväntar |
| Datum för DPO-konsultation | ⬜ Att boka |

---

## 3. Systematisk beskrivning av behandlingen

### 3.1 Bakgrund och syfte

Katrineholms kommun har beslutat att stärka AI-kompetensen och effektivisera verksamheten genom att tillhandahålla AI-assistenter till kommunens anställda. Plattformen Intric har upphandlats som personuppgiftsbiträde för att leverera AI-assistenttjänster.

**Övergripande ändamål:**
- Ge kommunanställda tillgång till AI-assistenter som kan besvara frågor om regelverk, processer och verksamhet
- Automatisera rutinuppgifter som sammanfattning, textgenerering och informationssökning
- Höja organisationens AI-mognad och digital kompetens

**Typer av assistenter i Intric-plattformen:**

| Typ | Beskrivning | Kontroll |
|-----|-------------|----------|
| **Intric Marketplace** | Färdiga assistenter från andra kommuner och organisationer. Visas i AI-hubbens bibliotek. | Begränsad — kommunen väljer vilka som aktiveras men kontrollerar inte systemprompts eller kunskapsbaser |
| **Egenbyggda assistenter** | Assistenter skapade av Katrineholms kommun i Intric. Egen systemprompt, egna kunskapsbaser, eget modellval. | Full kontroll |
| **iKAI (extern chatbot)** | AI-assistent exponerad för allmänheten via AI-hubben (chatwidget). **Enda assistenten som icke-anställda kan interagera med.** | Full kontroll — kommunen styr systemprompt och kunskapsbas |

**Särskild notering om iKAI:** Eftersom iKAI är tillgänglig för alla besökare på AI-hubben (inte enbart anställda) gäller ytterligare överväganden. Besökare som interagerar med iKAI är *inte* i ett anställningsförhållande och har frivilligt valt att använda tjänsten. Transparensmeddelande visas innan interaktion ("AI-assistent — svaren genereras av AI").

**Systemet är INTE avsett för:**
- Beslutsfattande som påverkar enskildas rättigheter
- Behandling av känsliga personuppgifter (Art. 9)
- Myndighetsutövning eller ärendehandläggning
- Direkt medborgarservice (iKAI ger allmän information, hanterar inga ärenden)

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

*Potentiellt känsligt: Kommunen kan inte fullt kontrollera vad användare skriver i chatten eller laddar upp i kunskapsbaser. Risken hanteras genom policy, utbildning och Intrics PII-redigeringsfunktion.

### 3.3 Kategorier av registrerade

| # | Kategori | Antal (uppskattning) | Sårbar? | Motivering |
|---|----------|---------------------|---------|------------|
| 1 | Kommunanställda (slutanvändare) | ~3 000 potentiella, ~200-500 aktiva | **Ja** | Anställda är sårbara pga maktobalans med arbetsgivaren (WP29 riktlinje). Kan uppleva implicit tvång att använda plattformen. |
| 2 | Administratörer | ~3-5 | **Ja** | Samma som ovan, plus utökade befogenheter |
| 3 | Tredje part (omnämnda i konversationer) | Okänt antal | **Ja** | Kommuninvånare, klienter eller andra som användare kan nämna i konversationer utan deras vetskap |
| 4 | Besökare av iKAI (extern chatbot) | Okänt antal | Nej | Frivillig interaktion, ej anställningsförhållande |

### 3.4 Omfattning

| Parameter | Värde |
|-----------|-------|
| Geografisk räckvidd | Katrineholms kommun (lokalt) |
| Antal potentiella registrerade | ~3 000 anställda |
| Uppskattad aktiv användning | ~200-500 användare |
| Antal assistenter | Varierande, Intric Marketplace + egna |
| Datavolym | Konversationsloggar, uppladdade dokument |
| Frekvens | Löpande, daglig användning |
| Behandlingstid | Obegränsad (kan konfigureras med automatisk gallring) |

### 3.5 Funktionell beskrivning

#### Användningsflöde:

1. **Inloggning:** Användaren loggar in via SSO (Azure AD/Entra ID) eller manuellt konto
2. **Val av assistent:** Användaren väljer bland tillgängliga AI-assistenter i Intric
3. **Konversation:** Användaren ställer en fråga i chatfönstret
4. **RAG-hämtning (om konfigurerat):** Intric hämtar relevant kontext från uppladdade kunskapsbaser
5. **Metadataborttagning:** Intric tar bort användarens namn, e-post, IP och organisationstillhörighet innan data skickas vidare
6. **LLM-anrop:** Intric skickar promptinnehåll + systemin instruktioner + RAG-kontext till vald språkmodell
7. **Svar:** LLM returnerar svar. Data raderas omedelbart hos LLM-leverantören.
8. **Lagring:** Intric lagrar svaret krypterat på svenska servrar (GleSys AB)
9. **Visning:** Svaret visas för användaren

#### Dataflödesdiagram (Bilaga A):

```
┌─────────────────────────────────────────────────────────────┐
│                      ANVÄNDARE                               │
│              (Webbläsare, HTTPS/TLS)                        │
└──────────────────────┬──────────────────────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────────────────────┐
│               AI-HUBBEN (Vercel)                             │
│   Portal/katalog — visar assistenter, länkar till Intric    │
│   Lagrar INTE konversationsdata                             │
│   DPA: ✅ (automatisk via ToS, EU SCCs)                     │
└──────────────────────┬──────────────────────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────────────────────┐
│              INTRIC AI-PLATTFORM                             │
│         (GleSys AB, Sverige, ISO 27001)                     │
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
│ EU/SVENSKA   │ │ EU-HOSTADE   │  │ US-BASERADE      │
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

Intric organiserar data i **Spaces** (arbetsytor) med rollbaserad åtkomstkontroll:

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

**Rekommendation för Katrineholm:** Alla Spaces som standard sätts till "Känslig" (enbart EU-modeller). "Öppen" enbart vid explicit beslut att ingen persondata förekommer.

### 3.7 Roller och ansvar

| Roll | Organisation | Ansvar |
|------|-------------|--------|
| **Personuppgiftsansvarig** | Katrineholms kommun (Kommunstyrelsen) | Bestämmer ändamål och medel för behandlingen |
| **Personuppgiftsbiträde** | Intric AB | Behandlar personuppgifter på uppdrag av kommunen |
| **Underbiträden** | Se Bilaga C | LLM-leverantörer, infrastruktur. Godkända i PUB-avtalet. |
| **DPO** | Sydarkivera | Rådgivning och granskning |

### 3.8 PUB-avtal och avtalsdokumentation

| Avtal | Parter | Status | Typ |
|-------|--------|--------|-----|
| PUB-avtal (Intric) | Katrineholms kommun ↔ Intric AB | ✅ Tecknat | SKR:s standardmall |
| Underbiträdesavtal | Intric AB ↔ LLM-leverantörer | ✅ Tecknade av Intric | Zero-data-storage-klausuler |
| DPA Supabase | Katrineholms kommun ↔ Supabase | ✅ Tecknat | Supabase standard DPA |
| DPA Vercel | Katrineholms kommun ↔ Vercel | ✅ Gäller via ToS | EU SCCs inkluderade |

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

### 4.2 Bedömning av dataskyddsprinciperna

#### 4.2.1 Laglighet, korrekthet och öppenhet (Art. 5.1.a)

**Laglighet:** Behandlingen grundar sig på identifierade rättsliga grunder (se 4.2.2). PUB-avtal reglerar biträdets behandling.

**Korrekthet:** Användare informeras om att de interagerar med AI och att svaren kan innehålla fel. Transparensmeddelanden implementerade på AI-hubben (EU AI Act Art. 50).

**Öppenhet:** Integritetspolicy publicerad på `/integritetspolicy`. Beskriver vilka uppgifter som samlas in, ändamål, rättslig grund, mottagare, lagringstid och rättigheter.

#### 4.2.2 Rättslig grund per behandling

| # | Behandling | Personuppgifter | Rättslig grund | Motivering |
|---|-----------|----------------|---------------|------------|
| 1 | Skapa och hantera användarkonton i Intric | Namn, e-post, org, roll | **Allmänt intresse (Art. 6.1.e)** | Kommunens uppdrag att digitalisera och effektivisera verksamheten. Alternativt: Avtal (Art. 6.1.b) om användaren aktivt skapar konto. |
| 2 | Möjliggöra AI-assistentkonversationer | Konversationsinnehåll, metadata | **Allmänt intresse (Art. 6.1.e)** | Kommunens uppdrag att tillhandahålla effektiva arbetsverktyg |
| 3 | RAG/kunskapsbashämtning | Dokumentinnehåll (kan innehålla PU) | **Allmänt intresse (Art. 6.1.e)** | Nödvändigt för att assistenterna ska ge korrekta svar |
| 4 | Teknisk loggning (IP, tidsstämplar) | IP-adresser, aktivitetsloggar | **Berättigat intresse (Art. 6.1.f)** | Informationssäkerhet, felsökning, incidenthantering |
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
| Konfigurerbara gallringstider | Konversationer kan automatiskt raderas efter 7-365 dagar |
| PII-redigering | Inbyggd funktion för att maskera personnummer, namn, e-post etc. i dokument |

**Bedömning:** Uppgiftsminimering är väl tillgodosedd genom Intrics arkitektur. En kvarvarande risk är att användare oavsiktligt matar in personuppgifter eller känslig information i konversationer — detta hanteras genom policy och utbildning.

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

**Rekommendation:** Kommunen bör fastställa en standardgallringstid (t.ex. 90 eller 180 dagar) för konversationer, snarare än obegränsad lagring. Tekniska loggars 5-åriga retention bör utvärderas mot faktiskt behov.

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
| Information (13–14) | 13–14 | Integritetspolicy på `/integritetspolicy`, AI-transparensmeddelanden | Kommunen |
| Tillgång (15) | 15 | Export via Intrics admin-gränssnitt och API | Kommunen + Intric |
| Rättelse (16) | 16 | Kontoinformation redigerbar. Konversationer kan inte redigeras men kan raderas. | Kommunen + Intric |
| Radering (17) | 17 | Kontoborttagning via admin. Konversationsgallring konfigurerbar. API för programmatisk radering. | Kommunen + Intric |
| Begränsning (18) | 18 | Kontoinaktivering möjlig | Kommunen |
| Dataportabilitet (20) | 20 | Export via Intrics API (JSON). Dataexport från AI-hubben profilsida. | Kommunen + Intric |
| Invändning (21) | 21 | Kontakta DPO (dataskydd@sydarkivera.se) | Kommunen |
| Automatiserat beslutsfattande (22) | 22 | **Ej tillämpligt** — inga automatiserade beslut med rättslig verkan fattas | — |

### 4.4 Internationella överföringar

| Scenario | Datamottagare | Plats | Skyddsmekanism | Risk |
|----------|--------------|-------|---------------|------|
| Svenska/EU-modeller (Berget, Mistral, etc.) | EU-baserade leverantörer | Sverige/EU | Ingen tredjelandsöverföring | **Låg** |
| Azure OpenAI / Google Cloud EMEA | Microsoft Ireland / Google Ireland | Irland, EU | EU-juridisk person. DPF-certifierade moderbolag. | **Medel** — CLOUD Act-risk via USA-moderbolag |
| OpenAI / Anthropic (om aktiverade) | USA-baserade företag | USA | EU-US Data Privacy Framework (DPF) | **Hög** — data lämnar EU. DPF:s stabilitet osäker (Schrems III-risk) |

**Katrineholms beslut:** Kommunen bör ta ställning till vilka modellkategorier som tillåts. Rekommendation: Begränsa till enbart svenska/EU-hostade modeller för alla Spaces som kan innehålla personuppgifter. Amerikanska modeller enbart för Spaces med "Öppen" klassificering där ingen persondata förekommer.

### 4.5 Bedömning av alternativ med mindre integritetsintrång

| Alternativ | Bedömning | Slutsats |
|-----------|-----------|----------|
| **Ingen AI-plattform alls** | Uppfyller inte kommunens digitaliseringsstrategi. Anställda riskerar att använda icke-godkända AI-verktyg (ChatGPT etc.) utan kontroll. | Avvisat — sämre kontroll |
| **Enbart lokala/on-premise-modeller** | Tekniskt möjligt med Intrics on-prem-alternativ. Eliminerar tredjelandsöverföring helt. Betydligt dyrare och kräver GPU-hårdvara och IT-kompetens. | Möjligt framtida alternativ. Oproportionerligt kostsamt idag. |
| **Helt anonymiserad användning** | Omöjliggör personanpassning, konversationshistorik och support. Administratörer kan inte hantera behörigheter. | Avvisat — gör tjänsten oanvändbar |
| **Begränsa till EU-hostade modeller** | Full funktionalitet bibehålls. Eliminerar tredjelandsöverföring till USA. Något begränsat modellutbud. | **Rekommenderas** som standardinställning |
| **Pseudonymiserade konton** | Möjligt via Intrics arkitektur (användar-ID redan pseudonymiserat). Namn/e-post behövs dock för SSO och administration. | Delvis genomfört — metadata tas bort innan LLM-anrop |
| **Automatisk gallring av konversationer** | Reducerar lagrad datamängd. 90 dagars gallringstid ger balans mellan användbarhet och minimering. | **Rekommenderas** — konfigurera 90 dagars gallring |

**Sammanfattande proportionalitetsbedömning:** Behandlingen bedöms som proportionerlig med de rekommenderade åtgärderna (EU-modellbegränsning + 90 dagars gallring). Nyttan (effektivisering, kontrollerad AI-användning, kompetensutveckling) överväger integritetsintrånget, särskilt med beaktande av att alternativet (inga verktyg) leder till okontrollerad användning av externa AI-tjänster.

---

## 5. Riskidentifiering och riskanalys

### 5.1 Riskbedömningsmetodik

Risker bedöms enligt IMY:s modell med två dimensioner:

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

### 5.2 Identifierade risker

#### R1: Användare matar in personuppgifter eller känslig information i AI-chatten

| Aspekt | Bedömning |
|--------|-----------|
| **Scenario** | En anställd skriver in personnummer, hälsoinformation, namn på klienter/elever/brukare, eller annat känsligt i chatten. Trots Intrics metadataborttagning skickas *promptinnehållet* till LLM-leverantören. Om en amerikansk modell används, lämnar data EU. |
| **Berörda** | Tredje part (kommuninvånare, klienter, elever) som omnämns i konversationen — utan deras vetskap eller samtycke |
| **Sannolikhet** | **3 — Hög.** Anställda som arbetar med individärenden (socialtjänst, skola, HR) hanterar dagligen personuppgifter och kan omedvetet inkludera dem i AI-frågor. |
| **Konsekvens** | **3 — Allvarlig.** Känsliga uppgifter om tredje part kan exponeras för AI-leverantör utan rättslig grund. Om Art. 9-uppgifter (hälsa) skickas till US-modell: potentiell GDPR-överträdelse. |
| **Risknivå före åtgärder** | **HÖG (3×3=9)** |

#### R2: Obehörig åtkomst till konversationshistorik

| Aspekt | Bedömning |
|--------|-----------|
| **Scenario** | En obehörig person får tillgång till en anställds konversationshistorik i Intric — via stulna inloggningsuppgifter, osäker delad arbetsstation, eller administratörsövergrepp. Konversationsloggar kan innehålla arbetsrelaterad känslig information. |
| **Berörda** | Den anställde, samt tredje part omnämnda i konversationer |
| **Sannolikhet** | **2 — Medel.** MFA och SSO minskar risken, men stulna sessionstoken eller insider-hot är möjliga. |
| **Konsekvens** | **2 — Relativt allvarlig.** Arbetsrelaterad information exponeras. Allvarligare om konversationer innehåller personuppgifter om tredje part. |
| **Risknivå före åtgärder** | **MEDEL (2×2=4)** |

#### R3: Felaktiga AI-svar leder till felaktiga beslut eller åtgärder

| Aspekt | Bedömning |
|--------|-----------|
| **Scenario** | En anställd förlitar sig på ett AI-genererat svar som innehåller felaktig juridisk, medicinsk eller processrelaterad information ("hallucination"). Den anställde agerar på informationen utan att verifiera, vilket leder till felaktigt handlande gentemot en medborgare. |
| **Berörda** | Kommuninvånare som berörs av den felaktiga åtgärden, den anställde |
| **Sannolikhet** | **3 — Hög.** LLM-hallucinationer är välkända. Risken ökar om användare har överdriven tillit till AI. |
| **Konsekvens** | **2 — Relativt allvarlig.** Beror på kontexten. Vid rent informativa frågor: begränsad. Vid handläggningsrelaterade frågor: kan leda till felaktiga beslut. |
| **Risknivå före åtgärder** | **HÖG (3×2=6)** |

#### R4: Tredjelandsöverföring via amerikanska LLM-leverantörer

| Aspekt | Bedömning |
|--------|-----------|
| **Scenario** | Om kommunen aktiverar OpenAI (GPT) eller Anthropic (Claude) i Intric skickas promptinnehåll till servrar i USA. Trots DPF-certifiering finns risk att Data Privacy Framework upphävs (Schrems III). CLOUD Act ger amerikanska myndigheter möjlighet att begära ut data. |
| **Berörda** | Alla användare vars konversationsdata skickas till US-modeller, samt tredje part omnämnda |
| **Sannolikhet** | **2 — Medel.** Beror på vilka modeller som aktiveras. Om enbart EU-modeller används: risken elimineras. |
| **Konsekvens** | **3 — Allvarlig.** Potentiell GDPR-överträdelse vid tredjelandsöverföring utan tillräcklig skyddsnivå. Särskilt problematiskt för kommunal data pga OSL och offentlighetsprincipen. |
| **Risknivå före åtgärder** | **HÖG (2×3=6)** |

#### R5: Dataläckage eller säkerhetsincident hos Intric

| Aspekt | Bedömning |
|--------|-----------|
| **Scenario** | Intric drabbas av dataintrång som exponerar användarkonton, konversationsloggar eller uppladdade dokument. Intric är ett litet bolag (~4 anställda) i seed-fasen, vilket innebär begränsade resurser för incidenthantering. |
| **Berörda** | Alla användare, tredje part omnämnda i konversationer/dokument |
| **Sannolikhet** | **1 — Låg.** Intric är ISO 27001-certifierat, använder svensk hosting (GleSys, ISO 27001), har MFA, nätverkssegmentering och penetrationstester. Men liten organisation = mindre uthållighet vid avancerade attacker. |
| **Konsekvens** | **3 — Allvarlig.** Konversationsloggar och dokument från en kommun kan innehålla verksamhetskritisk information. Förtroendeskada. |
| **Risknivå före åtgärder** | **MEDEL (1×3=3)** |

#### R6: Upplevd övervakning — chilling effect på anställda

| Aspekt | Bedömning |
|--------|-----------|
| **Scenario** | Anställda upplever att arbetsgivaren kan övervaka deras AI-användning (vilka frågor de ställer, hur ofta, vid vilka tidpunkter). Detta kan skapa en "chilling effect" där anställda undviker att använda tjänsten eller begränsar sin användning, särskilt för känsliga arbetsrelaterade frågor. |
| **Berörda** | Alla anställda |
| **Sannolikhet** | **2 — Medel.** Utan tydlig kommunikation om att individuell övervakning inte sker, är det rimligt att anställda oroar sig. |
| **Konsekvens** | **2 — Relativt allvarlig.** Påverkar rätten till privatliv i arbetslivet. Kan minska tjänstens nytta och skapa arbetsrättsliga frågor. |
| **Risknivå före åtgärder** | **MEDEL (2×2=4)** |

#### R7: Leverantörsberoende — Intric som litet bolag

| Aspekt | Bedömning |
|--------|-----------|
| **Scenario** | Intric AB (4 anställda, seed-finansierat) upphör med verksamheten, förvärvas, eller kan inte upprätthålla tjänsten. Kommunens data kan bli otillgänglig. Exit-strategi saknas. |
| **Berörda** | Alla användare, kommunens verksamhet |
| **Sannolikhet** | **2 — Medel.** Startupbolag har högre risk för verksamhetsförändringar. |
| **Konsekvens** | **2 — Relativt allvarlig.** Verksamhetsdata otillgänglig. Behov av migration. Dock: Intric erbjuder dataexport via API. |
| **Risknivå före åtgärder** | **MEDEL (2×2=4)** |

#### R8: Kunskapsbaser med personuppgifter indexeras i RAG

| Aspekt | Bedömning |
|--------|-----------|
| **Scenario** | En administratör laddar upp dokument som innehåller personuppgifter (t.ex. tjänsteutlåtanden, minnesanteckningar med namn) till en kunskapsbas. Dokumentet extraheras, chunkas och vektoriseras. Vid RAG-hämtning kan AI:n citera personuppgifter i sina svar. |
| **Berörda** | Personer omnämnda i uppladdade dokument |
| **Sannolikhet** | **2 — Medel.** Beror på vilka dokument som laddas upp och administratörernas medvetenhet. |
| **Konsekvens** | **2 — Relativt allvarlig.** Personuppgifter kan exponeras i oväntade kontexter utan den registrerades vetskap. |
| **Risknivå före åtgärder** | **MEDEL (2×2=4)** |

#### R9: Bristande notifiering vid säkerhetsincident

| Aspekt | Bedömning |
|--------|-----------|
| **Scenario** | Intrics incidentrespons-SLA anger 48 timmar för kritiska incidenter. GDPR Art. 33 kräver att personuppgiftsansvarig notifierar IMY inom 72 timmar. Det lämnar kommunen enbart 24 timmar för intern bedömning och rapportering. |
| **Berörda** | Alla registrerade vid en incident |
| **Sannolikhet** | **1 — Låg.** Säkerhetsincidenter av denna allvar är ovanliga. |
| **Konsekvens** | **3 — Allvarlig.** Försenad notifiering till IMY = GDPR-överträdelse. |
| **Risknivå före åtgärder** | **MEDEL (1×3=3)** |

---

## 6. Riskreducerande åtgärder och kvarvarande risk

### 6.1 Åtgärdstabell

| Risk | Åtgärd | Ansvarig | Status | Kvarvarande S | Kvarvarande K | Kvarvarande risknivå |
|------|--------|----------|--------|---|---|---|
| **R1** — PII i AI-chatt | (a) Begränsa standardmodeller till enbart EU/svenska modeller. (b) Aktivera Intrics PII-redigering på känsliga Spaces. (c) Utbilda anställda i informationsklassning — "mata aldrig in personnummer, hälsodata eller namn på klienter". (d) Publicera tydliga riktlinjer i AI-policy. | Kommunen | (a) ⬜ Att konfigurera (b) ⬜ Att aktivera (c) ⬜ Att skapa utbildning (d) ⬜ Att skapa policy | 2 | 2 | **MEDEL (4)** |
| **R2** — Obehörig åtkomst | (a) Kräv SSO med MFA. (b) Konfigurera konversationsgallring (90 dagar). (c) Begränsa administratörsåtkomst till minimum. | Kommunen + Intric | (a) ⬜ Att verifiera (b) ⬜ Att konfigurera (c) ✅ | 1 | 2 | **LÅG (2)** |
| **R3** — Felaktiga AI-svar | (a) Transparensmeddelanden implementerade: "Svaren genereras av AI och bör granskas". (b) Förbjud användning av AI för formella beslut utan mänsklig granskning. (c) Inkludera AI-kritiskt tänkande i utbildningsmaterial. | Kommunen | (a) ✅ (b) ⬜ Att inkludera i AI-policy (c) ⬜ Att skapa | 2 | 1 | **LÅG (2)** |
| **R4** — Tredjelandsöverföring | (a) Begränsa standardkonfiguration till EU/svenska modeller via Intrics säkerhetsklassificering. (b) Dokumentera policybeslut. (c) Om US-modeller aktiveras: enbart i Spaces utan persondata, med "Öppen" klassificering. | Kommunen | (a) ⬜ Att konfigurera (b) ⬜ Att dokumentera (c) N/A | 1 | 2 | **LÅG (2)** |
| **R5** — Dataläckage Intric | (a) PUB-avtal tecknat. (b) Intric ISO 27001-certifierat. (c) Kräv årlig säkerhetsrapport från Intric. (d) Ha en exitplan med dataexport via API. | Kommunen + Intric | (a) ✅ (b) ✅ (c) ⬜ (d) ⬜ | 1 | 2 | **LÅG (2)** |
| **R6** — Chilling effect | (a) Kommunicera tydligt att individuell AI-användning INTE övervakas. (b) Konversationsloggar tillgängliga enbart för den enskilda användaren, inte chefer. (c) Inkludera i introduktionsutbildning. | Kommunen | (a) ⬜ (b) ✅ (Intrics RBAC) (c) ⬜ | 1 | 1 | **LÅG (1)** |
| **R7** — Leverantörsberoende | (a) Säkerställ regelbunden dataexport via API. (b) Dokumentera exitstrategi. (c) Bevaka Intrics finansiella status årligen. | Kommunen | (a) ⬜ (b) ⬜ (c) ⬜ | 1 | 2 | **LÅG (2)** |
| **R8** — PII i kunskapsbaser | (a) Policy: Ladda INTE upp dokument med personuppgifter utan PII-redigering. (b) Aktivera Intrics automatiska PII-maskering. (c) Utbild administratörer. | Kommunen | (a) ⬜ (b) ⬜ (c) ⬜ | 1 | 2 | **LÅG (2)** |
| **R9** — Incidentnotifiering | (a) Begär att Intric notifierar inom 24 timmar (inte 48). (b) Upprätta intern incidenthanteringsrutin med tydliga roller. | Kommunen | (a) ⬜ Att förhandla (b) ⬜ | 1 | 2 | **LÅG (2)** |

### 6.2 Riskmatris — före och efter åtgärder

**Före åtgärder:**

|  | Begränsad (1) | Relativt allvarlig (2) | Allvarlig (3) | Mycket allvarlig (4) |
|---|---|---|---|---|
| **Hög (3)** | | R3 | R1 | |
| **Medel (2)** | | R2, R6, R7, R8 | R4 | |
| **Låg (1)** | | | R5, R9 | |

**Efter åtgärder:**

|  | Begränsad (1) | Relativt allvarlig (2) | Allvarlig (3) | Mycket allvarlig (4) |
|---|---|---|---|---|
| **Hög (3)** | | | | |
| **Medel (2)** | | R1 | | |
| **Låg (1)** | R3, R6 | R2, R4, R5, R7, R8, R9 | | |

**Alla risker reducerade till LÅG eller MEDEL efter åtgärder.** R1 (PII i AI-chatt) kvarstår som MEDEL eftersom risken inte helt kan elimineras — användare kan alltid mata in personuppgifter trots utbildning och policy.

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
| Intric AB | Delvis — via dokumentation | Stöddokumentation tillgänglig på help.intric.ai |

---

## 9. Sammanfattande bedömning och beslut

### 9.1 Sammanfattning av efterlevnad

| Princip | Bedömning |
|---------|-----------|
| Laglighet, korrekthet, öppenhet | ✅ Godtagbar — rättslig grund identifierad, integritetspolicy publicerad, AI-transparens implementerad |
| Ändamålsbegränsning | ✅ Godtagbar — PUB-avtal förbjuder ändamålsglid |
| Uppgiftsminimering | ✅ Godtagbar — metadataborttagning, zero-data-storage hos LLM |
| Korrekthet | ⚠️ Förbättring planerad — transparensmeddelanden finns, men utbildningsmaterial om källkritik behövs |
| Lagringsminimering | ⚠️ Förbättring planerad — gallringstid bör konfigureras (rekommendation: 90 dagar) |
| Integritet och konfidentialitet | ✅ Godtagbar — ISO 27001, TLS, kryptering, RBAC, MFA |
| Registrerades rättigheter | ✅ Godtagbar — alla rättigheter tillgodosedda via plattform och processer |
| Internationella överföringar | ⚠️ Förbättring planerad — policybeslut om EU-modellbegränsning behövs |

### 9.2 Handlingsplan

| # | Åtgärd | Ansvarig | Prioritet | Tidsfrist |
|---|--------|----------|-----------|-----------|
| 1 | Begränsa standardmodeller till EU/svenska via Intrics säkerhetsklassificering | Digitaliseringsavdelningen | Hög | 2026-04-15 |
| 2 | Konfigurera automatisk konversationsgallring (90 dagar) | Digitaliseringsavdelningen | Hög | 2026-04-15 |
| 3 | Skicka DPIA till Sydarkivera för DPO-samråd | Digitaliseringsavdelningen | Hög | 2026-04-01 ✅ |
| 4 | Skapa AI-policy för kommunen (inkl. informationsklassning vid AI-användning) | Digitaliseringsavdelningen + ledning | Hög | 2026-06-01 |
| 5 | Skapa utbildningsmaterial: "Vad får/får inte matas in i AI" | Digitaliseringsavdelningen | Hög | 2026-06-01 |
| 6 | Aktivera PII-redigering på känsliga Spaces | Digitaliseringsavdelningen | Medel | 2026-05-01 |
| 7 | Informera fackliga representanter via samverkansgrupp | HR + Digitaliseringsavdelningen | Medel | 2026-05-01 |
| 8 | Verifiera SSO/MFA-konfiguration | IT-avdelningen | Medel | 2026-04-15 |
| 9 | Dokumentera exitstrategi (dataexport vid leverantörsbyte) | Digitaliseringsavdelningen | Låg | 2026-08-01 |
| 10 | Begär 24-timmars incidentnotifiering från Intric | Digitaliseringsavdelningen | Låg | 2026-08-01 |
| 11 | Genomför KLASSA-klassificering av AI-hubben/Intric | Informationssäkerhetssamordnare | Medel | 2026-06-01 |

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
| DPIA framtagen | 2026-03-26 | Digitaliseringsavdelningen | Utkast klart |
| DPO-samråd | ⬜ | Sydarkivera | ⬜ |
| Ledningsförankring | ⬜ | Kommunstyrelsen | ⬜ |
| Facklig information | ⬜ | Samverkansgrupp | ⬜ |

### 10.2 Ansvar för genomförande

- **Riskreducerande åtgärder (punkt 1-8):** Digitaliseringsavdelningen
- **Policybeslut (AI-policy):** Kommunstyrelsen
- **Kvarvarande risker:** Accepteras av Kommunstyrelsen efter DPO-samråd

---

## 11. Löpande uppföljning och versionshistorik

### 11.1 Granskningsplan

| Aspekt | Frekvens | Ansvarig |
|--------|----------|----------|
| Ordinär granskning av DPIA | Halvårsvis (nästa: 2026-09-26) | Digitaliseringsavdelningen |
| Granskning vid nya modeller/funktioner | Vid varje förändring | Digitaliseringsavdelningen |
| Granskning vid säkerhetsincident | Vid incident | IT-säkerhet + Digitaliseringsavdelningen |
| Granskning vid nya regelverk | Vid ikraftträdande | Digitaliseringsavdelningen + DPO |

### 11.2 Trigger för omgranskning

DPIA:n ska omgranskas vid:
1. Nya AI-modeller aktiveras (särskilt US-baserade)
2. Ny funktionalitet läggs till i Intric
3. Förändring av driftalternativ (t.ex. byte från multi-tenant till on-premise)
4. Intric byter underleverantör
5. Säkerhetsincident hos Intric eller LLM-leverantör
6. Ändring i tillämplig lagstiftning (t.ex. EU AI Act full tillsyn aug 2026)
7. IMY publicerar ny vägledning relevant för behandlingen
8. Kommunen börjar använda AI-assistenter för medborgarkommunikation i större skala

### 11.3 Versionshistorik

| Version | Datum | Deltagare | Godkänd av | Förändringar |
|---------|-------|-----------|-----------|-------------|
| 1.0 | 2026-03-26 | Digitaliseringsavdelningen | — | Första version (utkast) |
| 1.1 | 2026-04-01 | Digitaliseringsavdelningen | ⬜ Inväntar DPO-yttrande | Statusuppdatering, överlämnad för DPO-samråd och allmän handling |

---

## Bilaga A: Dataflödesdiagram

Se avsnitt 3.5 för visuellt dataflödesdiagram.

---

## Bilaga B: Riskmatris

Se avsnitt 5.1 och 6.2 för riskmatris före och efter åtgärder.

---

## Bilaga C: Underleverantörsförteckning

| Organisation | Plats | Syfte | Tredjeland? |
|-------------|-------|-------|------------|
| GleSys AB | Sverige | Plattformsinfrastruktur (hosting) | Nej |
| AI Iron AB | Sverige | Språkmodeller | Nej |
| Berget AI AB | Sverige | Språkmodeller | Nej |
| DataCrunch Oy | Finland | Nordiska språkmodeller | Nej |
| Mistral AI | Frankrike | Språkmodeller | Nej |
| Microsoft Ireland Operations | Irland | Språkmodeller (Azure) | Nej (EU-enhet, US-moderbolag) |
| Google Cloud EMEA Limited | Irland | Språkmodeller | Nej (EU-enhet, US-moderbolag) |
| LinkUp Technologies SAS | Frankrike | Webbsökning | Nej |
| Paragon/Forge Technology | Tyskland | Integrationstjänster | Nej |
| Scaleway SAS | Frankrike | Systemnotifikationer | Nej |

Senast uppdaterad av Intric: 2026-03-13.

**Notering:** Om OpenAI eller Anthropic aktiveras som modelleverantör, tillkommer dessa som underbiträden med servrar i USA. Kräver separat bedömning.

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
| **Nätverkssäkerhet** | Produktion, utveckling och företagsnätverk segregerade. Brandväggar. |
| **Sårbarhetshantering** | Månatlig automatiserad sårbarhetsskanning. Regelbundna penetrationstester. |
| **Loggning** | Alla systemaktiviteter loggas i 7 kategorier. NTP-synkronisering. Loggar skyddade mot manipulation. |
| **Backup** | Veckovis automatiserade backuper. Periodisk återställningsverifiering. Dokumenterade RTO/RPO. |
| **Utvecklingssäkerhet** | Separata dev/prod-miljöer. Obligatorisk kodgranskning. Komplett ändringshistorik. |
| **Enhetshantering** | Centraliserad MDM. Obligatorisk diskkryptering. Automatiska OS-uppdateringar. |
| **Dataminimering** | Identitetsmetadata (namn, e-post, IP, org) tas bort innan LLM-anrop |
| **Zero-data-storage** | Kontraktsmässig garanti med alla LLM-leverantörer: ingen lagring efter svar |
| **PII-redigering** | Automatisk detektering och maskering av personnummer, namn, e-post, telefon etc. |

### D.2 Intrics organisatoriska åtgärder

| Kategori | Åtgärd |
|----------|--------|
| **Certifiering** | ISO 27001:2022 |
| **Policygranskning** | Årlig, alignerad med ISO 27001 |
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
| **Integritetspolicy** | Publicerad på `/integritetspolicy` | ✅ |
| **AI-transparens** | Implementerad på chatwidget, assistentsidor | ✅ |
| **Radera konto** | Möjligt via profilsidan | ✅ |
| **Dataexport** | JSON-export via profilsidan | ✅ |
| **AI-policy** | Under framtagning | ⬜ |
| **Informationsklassningsutbildning** | Under framtagning | ⬜ |
| **SSO/MFA-konfiguration** | Att verifiera | ⬜ |
| **Gallringspolicy** | Att konfigurera i Intric (rekommendation: 90 dagar) | ⬜ |
| **KLASSA-klassificering** | Att genomföra | ⬜ |

---

---

## Referenser

| Källa | URL |
|-------|-----|
| IMY DPIA-vägledning | https://www.imy.se/verksamhet/dataskydd/det-har-galler-enligt-gdpr/konsekvensbedomning/ |
| IMY praktisk guide (PDF) | https://www.imy.se/globalassets/dokument/vagledningar/en-praktisk-guide.pdf |
| IMY DPIA-mall (PDF, 33 sidor) | https://www.imy.se/globalassets/dokument/mallar/mall-for-konsekvensbedomning-enligt-dataskyddsforordningen-2025-05-26.pdf |
| IMY Riskhantering (Excel) | https://www.imy.se/globalassets/dokument/mallar/riskhantering-vid-konsekvensbedomning.xlsx |
| IMY Tröskelanalys-mall (PDF) | https://www.imy.se/globalassets/dokument/mallar/mall-for-bedomning-av-behovet-av-konsekvensbedomning.pdf |
| IMY Rättsligt tolkningsstöd (PDF) | https://www.imy.se/globalassets/dokument/vagledningar/rattsligt-tolkningsstod.pdf |
| Intric GDPR-dokumentation | https://help.intric.ai/sv/docs/sakerhet-compliance/gdpr/ |
| Intric PUB-avtal | https://help.intric.ai/sv/docs/sakerhet-compliance/pub-avtal/ |
| Intric Dataflöden LLM | https://help.intric.ai/sv/docs/sakerhet-compliance/data-flows/llm/ |
| Intric Dataflöden Knowledge | https://help.intric.ai/sv/docs/sakerhet-compliance/data-flows/knowledge/ |
| Intric TOMs | https://help.intric.ai/sv/docs/sakerhet-compliance/dpia/intrics-toms/ |
| Intric Certifieringar | https://help.intric.ai/sv/docs/sakerhet-compliance/certifieringar/ |
| Intric AI-förordningen | https://help.intric.ai/sv/docs/sakerhet-compliance/ai-forordningen/ |
| Intric Data retention | https://help.intric.ai/sv/docs/assistenter/data-retention/ |
| Intric Driftalternativ | https://help.intric.ai/sv/docs/teknisk-dokumentation/driftalternativ/ |
| WP248 rev.01 DPIA-riktlinjer | https://ec.europa.eu/newsroom/article29/item-detail.cfm?item_id=611236 |
| EDPB Opinion 28/2024 (AI) | https://www.edpb.europa.eu/system/files/2024-12/edpb_opinion_202428_ai-models_en.pdf |
| DIGG/IMY riktlinjer gen. AI | https://www.digg.se/ai-for-offentlig-forvaltning/riktlinjer-for-generativ-ai |
| SKR KLASSA | https://klassa.skr.se/ |
| Förtroendemodellen | https://fortroendemodellen.dataportal.se/en |
| SKR DPIA-vägledning | https://skr.se/juridik/dataskyddsforordningengdpr/konsekvensbedomningar.8169.html |

---

*Slut på dokument. Total omfattning: ~28 sidor.*
