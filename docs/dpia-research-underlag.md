# DPIA Research — Underlag för Intric AI konsekvensbedömning

> Sammanställd: 2026-03-26
> Syfte: Fullständigt forskningsunderlag för att skapa en juridiskt hållbar DPIA

---

## Del 1: Intric AB — Företagsinformation

| Fält | Värde |
|------|-------|
| Bolagsnamn | Intric AB |
| Org.nr | 559308-3743 |
| Registrerat | 2021-03-22 |
| Bolagsform | Aktiebolag |
| VD | David Nikolas Alfred Wallen (david.wallen@intric.ai) |
| CTO | Jonatan Cerwall |
| Anställda | ~4 (Allabolag), 1-10 (TheHub) |
| Huvudkontor | Stockholm, Sverige |
| Postadress | Kivra: 559308-3743, 106 31 Stockholm |
| Besöksadress | Dalagatan 78A, 113 24 Stockholm |
| Finansiering | Seed-steg |
| Trust Center | https://trust.delve.co/intric-ai (kräver autentisering) |
| Certifiering | ISO 27001:2022 (uppdaterad 2026-02-18) |

**Kunder:** 50+ europeiska offentliga/kritiska organisationer. Bekräftade kommuner: Trollhättan, Mönsterås, Borås, Skövde, Täby, Sundsvall, Katrineholm, Norrtälje, Stockholm, Västerås, Linköping, Landskrona, Region Gotland, Lidköping.

**Risknotering:** Litet bolag (~4 anställda), seed-finansierat. Kontinuitets- och långsiktig verksamhetsrisk bör beaktas.

---

## Del 2: Intric-plattformen — Produktbeskrivning

Intric beskrivs som "den säkra och suveräna AI-plattformen för att bygga agenter, automatisera arbetsflöden och styra AI-adoption."

### Kärnfunktioner:
- **AI-assistenter** — Personalriktade chatbotar
- **RAG (Retrieval-Augmented Generation)** — Koppla dokument/kunskapsbaser till assistenter
- **Workflow-automatisering ("Plans")** — Flerstegs-AI-agenter
- **Samarbetsytor ("Spaces")** — Organisationsomfattande delning med RBAC
- **Modellval** — Val mellan öppen källkod och proprietära LLM:er
- **Säkerhetsklassificering** — Granulär kontroll över vilka modeller som hanterar vilken data
- **Granskningsloggning** — Full spårbarhet
- **Dokumentredigering** — Automatisk PII-detektering och maskering i PDF:er
- **MCP-integration** — Anslut externa datakällor
- **Webbsökning** — Via LinkUp (Frankrike, EU)
- **Transkribering** — Tal-till-text

---

## Del 3: AI-modeller som används

Intric är **modellagnostiskt** — administratörer väljer vilka modeller som aktiveras.

### Kända underleverantörer (från PUB-avtal):

| Leverantör | Plats | Syfte | Klassificering |
|-----------|-------|-------|---------------|
| AI Iron AB | Sverige, EU | Språkmodeller | Europeisk |
| Berget AI AB | Sverige, EU | Språkmodeller | Europeisk |
| DataCrunch Oy | Finland, EU | Nordiska språkmodeller | Europeisk |
| Mistral AI | Frankrike, EU | Språkmodeller | Europeisk |
| Microsoft Ireland | Irland, EU | Språkmodeller (Azure OpenAI) | EU-hostad, US-bolag |
| Google Cloud EMEA | Irland, EU | Språkmodeller | EU-hostad, US-bolag |

### Tillgängliga modeller (från prissidan):
- **OpenAI:** GPT-5.2, GPT-5, GPT-5 mini, GPT-4o, GPT-4o mini, o3-mini
- **Anthropic:** Claude Opus 4, Claude 4.5 Sonnet, Claude 4.5 Haiku
- **Mistral AI:** Mistral Large
- **Open Source (EU-hostad):** Llama 3.3 70B
- **Berget AI, AI Iron:** Svenskhostade modeller

### Säkerhetsklassificeringssystem:
- **US-baserade modeller** (GPT-4o direkt) = lägre klassificering ("Öppen")
- **EU-hostade modeller** (Mistral EU, Berget) = högre klassificering ("Känslig/Konfidentiell")
- **On-premise lokala modeller** = högsta klassificering (helt stängd miljö)

**KRITISKT:** Om Katrineholm aktiverar amerikanska LLM:er (OpenAI/Anthropic), lämnar konversationsinnehåll (men inte användaridentitet) EU. För att hålla all data inom EU/Sverige ska enbart svenska/EU-hostade modeller användas.

---

## Del 4: Dataflöden

### 4.1 LLM-interaktion (5 steg):

1. **Användare → Intric:** Meddelande skickas via HTTPS/TLS. Data: meddelande, chatthistorik, bifogade filer.
2. **Intric intern bearbetning:** Samlar RAG-kontext, lägger till systemprompt, **tar bort identifierande metadata** (namn, e-post, IP, organisationstillhörighet). "Inget lämnar Intrics server i det här steget."
3. **Intric → LLM:** Skickar: promptinnehåll, systemprompt, hämtad RAG-kontext. Skickar INTE: användarens namn, e-post, IP, organisationstillhörighet.
4. **LLM → Intric:** Svar returneras. Intric lagrar krypterat. **"Omedelbart efter att svaret skickats tillbaka till Intric raderas både användarens input och det genererade svaret från språkmodellens server."**
5. **Intric → Användare:** Svaret visas i webbläsaren.

### 4.2 RAG/Kunskapsbas:
- Dokument bearbetas helt inom Intrics svenska infrastruktur
- Enbart textchunkar (utan identitetskontext) skickas till embedding-modeller
- Embedding-modellen har "noll kontext om användare eller organisationsidentitet"
- Omedelbart efter vektorretur raderas både input och output från embedding-modellens server

### 4.3 Webbsökning:
- Leverantör: LinkUp (Frankrike, EU)
- Enbart AI-genererad sökfråga skickas
- Fullständig prompt, chatthistorik och bifogade filer skickas INTE
- Zero-data-storage-klausuler

### 4.4 Transkribering:
- Ljud skickas till transkriptionsmodell (t.ex. Berget AI)
- Identifierande metadata borttagen innan sändning
- Zero-data-storage: ljud och transkription raderas omedelbart efter retur

### 4.5 MCP-servrar/OAuth-verktyg:
- Intric agerar mellanhand — LLM:en kontaktar aldrig externa tjänster direkt
- Användaridentifierare lämnar aldrig Intrics infrastruktur
- OAuth-tokens krypterade med Fernet (AES-128-CBC)

---

## Del 5: Datalagring och gallring

### Var data lagras:
- **Primär infrastruktur:** GleSys AB, Sverige, EU (ISO 27001-certifierad)
- Alla dokument, textextraktion och vektorindexering på svenska servrar
- Originalfiler, extraherad text, chunkar och embedding-vektorer förblir exklusivt på Intrics servrar
- Objektlagring via svensk S3-kompatibel lagring

### Vad som lagras på Intrics servrar:
- Användarkonton (namn, e-post, användar-ID, organisationstillhörighet)
- Teknisk loggdata (IP-adresser, tidsstämplar, aktivitetsloggar)
- All konversationshistorik (meddelanden + svar), krypterad
- Uppladdade dokument (originalfiler)
- Extraherade textchunkar + embedding-vektorer (PGVector)
- Filmetadata
- Granskningsloggar

### Vad som lagras hos LLM-leverantörer:
- **Ingenting.** Zero-data-storage-klausuler. Raderas omedelbart efter svar.

### Konfigurerbara gallringstider per assistent:
- Ingen automatisk radering (obegränsat)
- 7 dagar
- 30 dagar
- 90 dagar
- 180 dagar
- 365 dagar
- Anpassad varaktighet

### Tekniska loggar:
- Behålls upp till 5 år (om inte annat specificerat i PUB-avtal)

### Backup:
- Raderad data kan återställas inom 14 dagar (molninstallation)
- Dagliga automatiserade backuper

---

## Del 6: Säkerhetsåtgärder (TOMs)

### Kryptering:
- TLS 1.2+ för all datatransfer
- Kryptering at rest för känslig data
- OAuth-tokens: Fernet/AES-128-CBC
- On-premise: kundkontrollerade krypteringsnycklar

### Åtkomstkontroll:
- MFA för produktionsåtkomst
- RBAC med minsta behörighet
- Unika inloggningsuppgifter med full spårbarhet
- Kvartalsvis åtkomstgranskning
- SSO-integration (SAML, OAuth, Azure AD/Entra ID, Google Workspace)

### Nätverkssäkerhet:
- Produktion, utveckling och företagsnätverk segregerade
- Brandväggar begränsar till nödvändiga portar/protokoll

### Sårbarhetshantering:
- Månatlig automatiserad sårbarhetsskanning
- Kritiska patchar adresseras omedelbart
- Regelbundna penetrationstester

### Loggning och övervakning:
- Alla systemaktiviteter, adminåtgärder, säkerhetshändelser loggas
- NTP-tidssynkronisering
- Loggar skyddade mot obehörig åtkomst/modifiering
- Sju granskningsloggkategorier: assistenter, spaces, interaktioner, verktyg, filer, säkerhet, användare

### Backup och katastrofåterställning:
- Veckovis automatiserade backuper över tillgänglighetszoner
- Periodisk återställningsverifiering
- Dokumenterade RTO/RPO

### Organisatoriska åtgärder:
- Årliga policygranskningar (ISO 27001:2022)
- Systematiska årliga riskbedömningar
- Bakgrundskontroller före anställning
- Obligatorisk årlig säkerhetsutbildning
- Sekretessavtal krävs före åtkomst
- 24/7 övervakning; kritiska incidenter hanteras inom 48 timmar
- Formell förändringshantering med återställningsplaner
- Årliga leverantörssäkerhetsgranskningar

---

## Del 7: PUB-avtal (DPA)

- Baserat på **SKR:s standardmall**
- Personuppgifter som omfattas: namn, e-post, användar-ID, organisationstillhörighet, teknisk loggdata, användardelat innehåll
- **"Tjänsten är inte avsedd för behandling av känsliga personuppgifter (Art. 9)"** om inte särskilt avtalat
- **Garanti:** "Personuppgiftsbiträdet använder aldrig Personuppgiftsansvarigs innehåll för att träna sina egna eller andra externa, proprietära AI-modeller"
- Zero-data-storage-klausuler med alla LLM-underleverantörer

---

## Del 8: Underleverantörer (komplett lista)

| Organisation | Plats | Syfte |
|-------------|-------|-------|
| GleSys AB | Sverige, EU | Plattformsinfrastruktur |
| AI Iron AB | Sverige, EU | Språkmodeller |
| DataCrunch Oy | Finland, EU | Nordiska språkmodeller |
| Berget AI AB | Sverige, EU | Språkmodeller |
| Mistral AI | Frankrike, EU | Språkmodeller |
| Microsoft Ireland | Irland, EU | Språkmodeller (Azure) |
| LinkUp Technologies | Frankrike, EU | Webbsökning |
| Paragon | Tyskland, EU | Integrationstjänster |
| Google Cloud EMEA | Irland, EU | Språkmodeller |
| Scaleway | Frankrike, EU | Systemnotifikationer |

**Alla underleverantörer inom EU/EES.** Microsoft och Google är USA-huvudkontorsbaserade med EU-enheter. Senast uppdaterad: 2026-03-13.

---

## Del 9: Driftalternativ

| Alternativ | Beskrivning | Dataplats |
|-----------|-------------|-----------|
| Multi-tenant Cloud | Delade servrar, strikt logisk separation. GleSys AB. | Sverige |
| Dedicated Cloud Instance | Isolerad databas per kund. GleSys AB. | Sverige |
| On-Prem Managed | Körs på kundens egna servrar. | Kundkontrollerat |
| On-Prem med lokal GPU | Lokal GPU för lokala LLM:er. Helt stängd miljö. | Kundkontrollerat |

---

## Del 10: EU AI Act-efterlevnad (Intric)

- Transparens: Användare informeras om att innehåll genereras av AI
- Human-in-the-loop: Assistentflödesdesign där AI genererar förslag, människor granskar
- Granskningsbarhet: Automatisk loggning av alla systemhändelser
- Dokumentation: Tekniska dokument om kapaciteter, begränsningar och användarinstruktioner

---

## Del 11: PII-redigering (inbyggd)

Intric kan automatiskt detektera och permanent maskera:
- Namn, e-postadresser, telefonnummer
- Svenska personnummer
- Födelsedatum, adresser
- Organisationsnummer
- Kreditkortsnummer, IBAN
- Medicinska diagnoser
- Anpassade kategorier

---

## Del 12: IMY:s DPIA-ramverk

### 9 kriterier (DPIA krävs vid 2+ träffar):
1. Utvärdering/poängsättning av individer
2. Automatiserade beslut med rättslig/liknande verkan
3. Systematisk övervakning av individer
4. Känsliga uppgifter (Art. 9)
5. Storskalig behandling
6. Kombinering av datamängder
7. **Sårbara registrerade (anställda)** ← TRÄFF
8. **Ny teknik (AI/LLM)** ← TRÄFF
9. Tjänstenekning

**→ Minst 2 kriterier uppfyllda = DPIA obligatorisk**

### IMY:s 10-stegsmodell:
1. Behovsanalys (tröskelanalys)
2. Etablera DPIA-processen
3. Systematisk beskrivning
4. Bedöm nödvändighet och proportionalitet
5. Identifiera och bedöm risker
6. Bedöm behov av förhandssamråd (Art. 36)
7. Synpunkter från berörda parter
8. Sammanfattande bedömning
9. Organisatorisk förankring
10. Löpande uppföljning

### IMY:s mallar (nedladdningsbara):
- Tröskelanalys (PDF): https://www.imy.se/globalassets/dokument/mallar/mall-for-bedomning-av-behovet-av-konsekvensbedomning.pdf
- Fullständig DPIA-mall (PDF, 33 sidor): https://www.imy.se/globalassets/dokument/mallar/mall-for-konsekvensbedomning-enligt-dataskyddsforordningen-2025-05-26.pdf
- Riskhanteringskalkyblad (Excel): https://www.imy.se/globalassets/dokument/mallar/riskhantering-vid-konsekvensbedomning.xlsx
- Praktisk guide (PDF): https://www.imy.se/globalassets/dokument/vagledningar/en-praktisk-guide.pdf

---

## Del 13: Obligatoriskt DPIA-innehåll (Art. 35.7 + WP248)

### Obligatoriska sektioner:

**A. Allmän information och styrning**
- Personuppgiftsansvarig
- DPO-kontakt
- Ansvariga för DPIA:n

**B. Systematisk beskrivning (Art. 35.7a)**
- Behandlingens natur, omfattning, sammanhang, ändamål
- Kategorier av personuppgifter (tabell)
- Kategorier av registrerade (tabell, inkl. sårbarhet)
- Omfattning (volym, geografisk räckvidd)
- Resurser/stödsystem
- Funktionell beskrivning med dataflödesdiagram
- Roller: personuppgiftsansvarig, biträden, mottagare

**C. Rättslig analys — Nödvändighet och proportionalitet (Art. 35.7b)**
- Tillämpligt rättsligt ramverk
- Dataskyddsprinciper (Art. 5): laglighet, ändamålsbegränsning, uppgiftsminimering, korrekthet, lagringsminimering, integritet/konfidentialitet
- Rättslig grund per behandling (tabell)
- Registrerades rättigheter (Art. 13-22)
- Internationella överföringar
- Bedömning av alternativ med mindre integritetsintrång

**D. Riskhantering (Art. 35.7c-d)**
- Riskidentifiering med scenarier
- Sannolikhet × konsekvens per risk (motiverat, inte bara siffror)
- Befintliga och planerade skyddsåtgärder per risk
- Kvarvarande risk efter åtgärder
- Riskmatris (4×4)
- Säkerhetskontroller (tekniska + organisatoriska)

**E. Förhandssamråd (Art. 36)**
- Behöver IMY konsulteras?

**F. Synpunkter från berörda parter (Art. 35.9)**
- DPO:s rekommendationer (tabell med datum, svar)
- Registrerades synpunkter (om konsulterade)
- Övriga intressenter

**G. Övergripande bedömning och beslut**
- Sammanfattning
- Handlingsplan (tabell)
- Formell validering/signatur

**H. Organisatorisk förankring**

**I. Löpande uppföljning**
- Granskningsplan
- Versionshistorik

### AI-specifika tillägg (EDPB Opinion 28/2024):
- AI-systemtyp och algoritmbeskrivning
- Träningsdata: källor, volym, personuppgifter
- Art. 22-analys: automatiserade beslut?
- AI-specifika risker: bias, hallucination, re-identifiering, modellextraktion
- Transparensrisker: förklarbarhet

---

## Del 14: DPIA-mallar från myndigheter

| Källa | Dokument | URL |
|-------|----------|-----|
| IMY | Tröskelanalys (PDF) | https://www.imy.se/globalassets/dokument/mallar/mall-for-bedomning-av-behovet-av-konsekvensbedomning.pdf |
| IMY | DPIA-mall (PDF, 33 sidor) | https://www.imy.se/globalassets/dokument/mallar/mall-for-konsekvensbedomning-enligt-dataskyddsforordningen-2025-05-26.pdf |
| IMY | Riskhantering (Excel) | https://www.imy.se/globalassets/dokument/mallar/riskhantering-vid-konsekvensbedomning.xlsx |
| IMY | Praktisk guide (PDF) | https://www.imy.se/globalassets/dokument/vagledningar/en-praktisk-guide.pdf |
| CNIL | PIA-mall (PDF, 25 sidor) | https://www.cnil.fr/sites/default/files/atoms/files/cnil-pia-2-en-templates.pdf |
| CNIL | PIA-metodik (PDF) | https://www.cnil.fr/sites/default/files/atoms/files/cnil-pia-1-en-methodology.pdf |
| ICO | DPIA-mall (DOCX) | https://ico.org.uk/media2/migrated/2553993/dpia-template.docx |
| SKR/Skåne | Kommunmall (DOCX) | https://vardgivare.skane.se/siteassets/2.-patientadministration/journalhantering-och-registrering/informationssakerhet/dataskydd---fillistning/mall---konsekvensbedomning-avseende-dataskydd-dpia.docx |
| WP248 | Art. 29 WP-riktlinjer | https://ec.europa.eu/newsroom/article29/item-detail.cfm?item_id=611236 |

---

## Del 15: Svenska kommunexempel

### Kungsbacka kommun:
- Sveriges första AI-ramverk för kommuner (maj 2024)
- Tre dokument: "Regler för AI", kommunikationsguide, DPO-vägledning
- Utvecklat tillsammans med andra Hallandskommuner

### Sundsvall kommun:
- Mest avancerade kommunala AI-programmet
- Utvecklade Intric (nu Eneo) som öppen källkod
- Publicerat "Riktlinjer för automatiserade beslut"
- Kontakt: digitalisering@sundsvall.se

### Trelleborg kommun:
- Pionjär inom RPA-automation för ekonomiskt bistånd
- IMY kritiserade för otillräcklig DPIA — för ytlig och generisk
- Sanktioner utfärdade

### Skellefteå kommun:
- Ansiktsigenkänning i skolor
- DPIA genomförd men bedömd som otillräcklig av IMY
- Bristande proportionalitetsbedömning
- Böter: 200 000 kr

**Lärdomar:** IMY godtar inte ytliga DPIA:er. Proportionalitetsbedömning och alternativanalys måste vara substantiella.

---

## Del 16: DIGG + IMY nationella riktlinjer (januari 2025)

18 riktlinjer för generativ AI i offentlig förvaltning:
1. Inför AI-policy
2. Förbered för AI-förordningen
3. Mänsklig kontroll vid beslut
4-11. Dataskydd (rättslig grund, roller, rättigheter, risker)
12. Arbetsrättsanalys
13-14. Anskaffning/upphandling
15-16. Informationssäkerhet
17. Upphovsrätt
18. Etik

---

## Del 17: SKR KLASSA

**KLASSA** (klassa.skr.se) — självskattningsverktyg för informationsklassificering:
1. **Informationsklassificering** — betygsätter system på Konfidentialitet, Integritet, Tillgänglighet
2. **Handlingsplan** — genererar säkerhetsåtgärder baserat på klassificering
3. **Upphandlingskrav** — producerar säkerhetskrav för leverantörer

Process: Informationssäkerhetssamordnaren sammankallar systemadministratör och driftansvarig. Ca 2 timmar per system.

---

## Del 18: Förtroendemodellen

Nordiskt självskattningsverktyg (DIGG + norska Digdir + finska DVV):
1. AI-kompetens
2. Etisk och ansvarsfull användning
3. Transparens

URL: https://fortroendemodellen.dataportal.se/en

---

## Del 19: Identifierade risker och luckor

1. **Litet bolag (~4 anställda):** Kontinuitets- och verksamhetsrisk
2. **SOC 2-status oklar:** Refereras men ingen publik rapport
3. **US-modell datatransferrisk:** Om GPT-4o/Anthropic aktiveras lämnar data EU
4. **Microsoft/Google som underleverantörer:** EU-enheter men USA-moderbolag (Cloud Act)
5. **Teknisk loggretention 5 år:** Kan överstiga nödvändighet
6. **Inget publikt utnämnt DPO** hittat i Intrics dokumentation
7. **Incidentrespons-SLA 48 timmar:** Verifiera mot GDPR Art. 33 (72 timmars notifiering till DPA)
8. **MCP-serverrisk:** Tredjepartsservrar kan ta emot data utanför jurisdiktionen
9. **Användarinmatad PII:** Om användare skriver personuppgifter i chatten skickas de till LLM:en trots metadataborttagning

---

## Källor

- https://intric.ai
- https://help.intric.ai/sv/
- https://help.intric.ai/sv/docs/sakerhet-compliance/gdpr/
- https://help.intric.ai/sv/docs/sakerhet-compliance/pub-avtal/
- https://help.intric.ai/sv/docs/sakerhet-compliance/data-flows/llm/
- https://help.intric.ai/sv/docs/sakerhet-compliance/data-flows/knowledge/
- https://help.intric.ai/sv/docs/sakerhet-compliance/dpia/intrics-toms/
- https://help.intric.ai/sv/docs/sakerhet-compliance/certifieringar/
- https://help.intric.ai/sv/docs/sakerhet-compliance/ai-forordningen/
- https://help.intric.ai/sv/docs/sakerhet-compliance/dpia/datahantering-export-radering-gallring/
- https://help.intric.ai/sv/docs/assistenter/data-retention/
- https://help.intric.ai/sv/docs/administration/security-classification/models/
- https://help.intric.ai/sv/docs/teknisk-dokumentation/driftalternativ/
- https://www.imy.se/verksamhet/dataskydd/det-har-galler-enligt-gdpr/konsekvensbedomning/
- https://www.imy.se/verksamhet/dataskydd/innovationsportalen/vagledning-om-gdpr-och-ai/
- https://www.digg.se/ai-for-offentlig-forvaltning/riktlinjer-for-generativ-ai
- https://klassa.skr.se/
- https://fortroendemodellen.dataportal.se/en
- https://www.allabolag.se/foretag/intric-ab
- WP248 rev.01 (Article 29 Working Party DPIA Guidelines)
- EDPB Opinion 28/2024 on AI models
