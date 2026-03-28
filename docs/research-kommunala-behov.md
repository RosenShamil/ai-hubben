# Research: Kommunala behov, smärtpunkter och AI-möjligheter

> Sammanställd: 2026-03-26
> Syfte: Underlag för nya funktioner och verktyg för kommuner

---

## 1. Administrativ börda

### Socialsekreterare — dokumentationsbördan
- **~70% av arbetstiden** går åt till dokumentation, inte klientarbete
- Bara ~1 timme/vecka i faktiskt samtal med barn i barnavård
- Varje journalanteckning tar 20+ minuter manuellt
- Nacka kommun sparar ~20 min per journal med AI-transkription (Pulsen Omsorg)
- Vännäs kommun rapporterar **300+ timmar/månad** spart med AI-dokumentation
- 69% av socialarbetare nöjda med talteknik-lösningar
- Vissa team använder dedikerade "skrivdagar" i 3-veckorsrotation

**Källor:**
- [Suntarbetsliv: AI i socialtjänsten](https://www.suntarbetsliv.se/artiklar/organisatorisk-och-social-arbetsmiljo/ai-i-socialtjansten-stenaldern-att-behova-skriva-igen/)
- [SKR DELA: Smartare dokumentation med AI](https://dela.skr.se/losningar/smartare-dokumentation-med-ai)

### Lärare — administrativ börda
- **79% av lärare** lägger 5+ timmar/vecka på administration
- **23% lägger 11-20 timmar/vecka** på admin
- **9 av 10 lärare stressade** av dokumentationskrav (Vi Lärare)
- IUP (Individuella utvecklingsplaner) tidskrävande per elev
- Åtgärdsprogram: utredning, upprättande, uppföljning
- Nationella prov, riskbedömningar, incidentrapporter, frånvarohantering
- Regeringsutredning (Dir. 2023:72) specifikt om minskad admin för lärare

**Källor:**
- [Riksdagen Dir. 2023:72: Minskad administrativ börda för lärare](https://www.riksdagen.se/sv/dokument-och-lagar/dokument/kommittedirektiv/en-minskad-administrativ-borda-for-forskollarare_hbb172/)
- [SKR: Programberedning för minskad admin](https://skr.se/omskr/styrelseochberedningar/beredningar/programberedningforminskadadministrativbordaochantikrangel.8412.html)

### Bygglov
- Lagkrav: 10 veckor (förlängningsbart till 20)
- Upp till **10 veckors variation** mellan kommuner för samma ärende
- Nacka kommun: **26% av bygglovsbeslut helautomatiserade** — veckor till minuter
- Digital processkedja saknas mellan översiktsplan → detaljplan → bygglov

### Mötesprotokoll
- Varje nämnd, styrelse, arbetsgrupp i alla 290 kommuner skriver protokoll manuellt
- Lagkrav: protokoll ska finnas inom 2 dagar efter justering
- §-numrering, närvarande, beslut, reservationer — standardiserat format

### Diarieföring
- Lagkrav: registrering senast nästa arbetsdag
- Under systemmigration i Hässleholm: veckolånga förseningar vid manuell hantering
- Kommuner kan ha hundratals formulär och flera ärendehanteringssystem

### Trelleborgsmodellen (RPA-pionjär)
- Handläggningstid försörjningsstöd: **1 vecka → 1 dag**
- Robothandläggning: 1-3 minuter per ärende
- Sparade **30 timmar/vecka** i handläggningstid
- 450 personer gick från bidrag till arbete (upp från 168)
- Bidragskostnader minskade **~15% på ett år**
- Kontrovers: JO-anmälan, domstol beslutade att källkoden är offentlig handling

**Källor:**
- [AI Watch: Trelleborg](https://ai-watch.github.io/AI-watch-T6-X/service/90131.html)
- [Kvalitetsmagasinet: Trelleborg](https://kvalitetsmagasinet.se/i-trelleborg-fattar-roboten-besluten/)

---

## 2. Digital mognad i kommuner

### PwC Digital Mognad 2025 (164 respondenter, 4:e utgåvan)
- **Bara 1 av 10 kommuner/regioner har implementerat AI** (~90% har inte)
- Positiv trend i digital mognad generellt
- Takten i förändring av arbetssätt avtar

| Barriär | Andel |
|---------|-------|
| Ekonomi/budgetbegränsningar | 59% |
| Låg IT-mognad bland anställda | 40% |
| Otillräcklig kompetens bland chefer | 38% |

**Framgångsfaktorer:**
- Engagerat ledarskap: ~65% (upp från 44% 2020)
- Motiverade interna förändringsagenter: ~65%

**Källor:**
- [PwC: Digital mognad i kommuner 2025](https://www.pwc.se/sv/branscher/offentlig-sektor/digitala-kommunen.html)
- [PwC: Oroande låg AI-användning](https://news.cision.com/se/pwc/r/oroande-lag-ai-anvandning-i-kommuner-och-regioner,c4168839)

### SKR/RISE Digitaliseringsindex
- 6% ökning år-över-år i senaste mätningen
- Störst förbättring: styrning, shadow IT, sourcingstrategi
- Kvarvarande gap: AI, datadriven beslutsfattning, tvärfunktionell integration

**Källor:**
- [RISE Digitaliseringsindex](https://www.ri.se/en/data-science/project/digitalisation-index-for-swedish-municipalities-and-regions)

### Sveriges digitaliseringsstrategi 2025-2030
- "Digital förvaltning 2030" — gemensamma standarder för datadelning
- Medborgare ska inte behöva logga in i flera plattformar

**Källor:**
- [Regeringen: Digitaliseringsstrategin](https://www.regeringen.se/contentassets/fe3e296228fb474f803a986ae3842b4c/sveriges-digitaliseringsstrategi-20252030.pdf)

---

## 3. AI-adoption — barriärer

### Strukturella barriärer
- 290 kommuner, 21 regioner, 350+ myndigheter fattar oberoende teknikbeslut
- **~600 offentliga organisationer bygger egna AI-lösningar** — massiv dubblering (SVEA)
- LOU (upphandlingslagen) citeras ofta som största hindret — riskminimering hämmar experiment
- Vendor lock-in: kommuner fastnar i suboptimala IT-system

### Organisatoriska barriärer (AI Sweden intervjustudie)
- **"Pilotkyrko-gården"**: Bra piloter misslyckas skala
- Riskaversion: politiskt styrda org → ledare bär risk ensamma
- Organisatoriska silos: "fyrverkeri-driven" isolerade projekt
- Samarbetsretorik vs faktiskt samarbete

### Kompetensbariärer
- Användare generellt på **nybörjarnivå** med generativ AI
- Skattestruktur gör det svårt att attrahera AI-talang till offentlig sektor
- 38% av kommuner nämner otillräcklig chefskompetens

### SVEA-erfarenheten
- 1 500 offentliganställda använder SVEA-chatboten veckovis
- 2 000 personer utbildade i ansvarsfull AI-användning
- 30 av 33 Skåne-kommuner deltar
- Nyckelinsikt: **Teknologi är inte huvudhindret — storskalig förändringsledning är det**
- Många anställda jobbar på mobil utanför kontor — mobilanpassning kritiskt

**Källor:**
- [AI Sweden: Stor intervjustudie om kommunernas AI-användning](https://www.ai.se/sv/nyheter/stor-intervjustudie-om-kommunernas-ai-anvandning)
- [AI Sweden: Lärdomar från Svea](https://www.ai.se/sv/nyheter/lardomar-fran-svea-ledarskap-kompetenshojning-och-tekniska-anpassningar)
- [DIGG: Riktlinjer för generativ AI](https://www.digg.se/ai-for-offentlig-forvaltning/riktlinjer-for-generativ-ai)
- [Inkopsrådet: Undvik inlåsning vid IT-upphandling](https://inkopsradet.se/undvik-inlasning-vid-it-upphandling/)

---

## 4. Medborgartjänster — smärtpunkter

### Tillgänglighet och väntetider
- Telefonväntetider har **ökat markant** senaste decenniet
- Flera myndigheter har snittid >10 minuter
- Kommuners kontaktcenter: mån-fre ~8-16 med lunchstängning
- Medborgare som jobbar dagtid har svårt att nå kommunen

### Medborgarfrustrationer
- Svårt att navigera digitala tjänster
- Förvirrande information
- Problem med bilagor
- Långa telefonköer
- BankID-problem

### Digital exkludering
- **22% av personer med funktionsnedsättning** tycker e-tjänster försvårar tidsbokning
- **30% av sällananvändare av internet** upplever samma problem
- Språkbarriärer, kognitiva svårigheter underrepresenterade i undersökningar
- Riksrevisionen: myndigheter borde erbjuda callback istället för telefonkö

### Språkbarriärer
- Sveriges invandrade befolkning möter språkhinder vid kontakt med kommuner
- Digitala tjänster främst på svenska
- Tolktjänster dyra och inte alltid tillgängliga
- Tillgänglighetslagen (juni 2025) skapar lagkrav

**Källor:**
- [Riksrevisionen: Digitala tjänster till privatpersoner](https://www.riksrevisionen.se/granskningar/granskningsrapporter/2023/digitala-tjanster-till-privatpersoner---stora-utvecklingsmojligheter-for-statliga-myndigheter.html)
- [Svenskarna och internet 2025: Digital tillgänglighet](https://etu.se/nyheter/vad-svenskarna-och-internet-2025-sager-om-digital-tillganglighet-och-e-tjanster/)
- [Regeringen: Fler e-tjänster för företag](https://www.regeringen.se/pressmeddelanden/2024/10/fler-e-tjanster-hos-kommunerna-ska-forenkla-for-foretag/)

---

## 5. Compliance-bördan

### Regeltsuanami 2025-2026

| Regelverk | Status | Huvudsaklig påverkan |
|-----------|--------|---------------------|
| **GDPR** | Gäller sedan 2018 | Registerförteckning, DPIA, samtycke, raderingsrätt |
| **EU AI Act** | Mesta gäller 2 aug 2026 | Riskklassificering, transparens, dokumentation |
| **NIS2/Cybersäkerhetslagen** | Gäller jan 2026 | Cybersäkerhet, incidentrapportering, böter till 10M EUR |
| **DOS-lagen** | Gäller | Webbtillgänglighet WCAG 2.1 AA |
| **Tillgänglighetslagen (EAA)** | Gäller juni 2025 | Utökade tillgänglighetskrav |
| **Arkivlagen** | Löpande | Alla offentliga handlingar ska arkiveras |
| **Offentlighetsprincipen** | Grundlag | Alla dokument offentliga om ej sekretess |

### Överlappningsproblemet
En enda AI-implementation kan trigga krav från 4-5 regelverk samtidigt (GDPR + AI Act + NIS2 + DOS-lagen + Arkivlagen).

### Små kommuners nackdel
AI-kommissionens färdplan (SOU 2025:12) erkänner att mindre, resurssvaga kommuner drabbas oproportionerligt. Föreslagen "AI-verkstad" vid Försäkringskassan/Skatteverket med "insatsstyrka" för mindre kommuner.

### AI-kommissionen
- Totalt föreslagna investeringar: **16,7 miljarder SEK** (1,3% av statsbudgeten)
- Regeringen tilldelade **479 MSEK** för AI- och datareformer 2025/26

**Källor:**
- [AI-kommissionens Färdplan (SOU 2025:12)](https://www.riksdagen.se/sv/dokument-och-lagar/dokument/statens-offentliga-utredningar/ai-kommissionens-fardplan-for-sverige_hdb312/html/)
- [Regeringen: AI-verkstad för offentlig förvaltning](https://www.regeringen.se/pressmeddelanden/2025/07/regeringen-vill-utreda-forutsattningarna-for-en-ai-verkstad-for-offentlig-forvaltning/)
- [NIS2 i svenska kommuner (Nesp.ONE)](https://nespone.com/en/cybersikkerhed-i-kommuner/)
- [Voister: AI- och datareformer 479 mkr](https://www.voister.se/artikel/2025/09/ai-och-datareformer-for-479-mkr-i-regeringens-budget-detta-gar-pengarna-till/)

---

## 6. Samarbete mellan kommuner

### 290-kommuners-problemet
Alla 290 kommuner tillhandahåller samma tjänster men utvecklar egna IT-lösningar, policyer och processer.

### Kommungemensamt Handslag
- **280 av 290 kommuner** anslutna till minst ett erbjudande
- **250 kommuner** prenumererar på SDK för socialtjänst
- Leds av SKR + Adda + Inera
- Prioriterat: socialtjänst, skola, grundläggande digital infrastruktur

### Gemensamma problem som skriker efter gemensamma lösningar
1. Dokumenthantering & diarieföring
2. Bygglovshandläggning
3. Socialtjänst ärendehantering
4. Medborgarkommunikation
5. Compliance-dokumentation
6. Mötesprotokoll
7. Onboarding & utbildning
8. Remissvar

### AI Swedens Kommunportalen
Digital plattform på My AI för kommunanställda — mötesplats för AI-utveckling, lärande och samarbete.

**Källor:**
- [SKR: Handslag för digitalisering](https://skr.se/digitaliseringivalfarden/handslagfordigitalisering.712.html)
- [Inera: Historisk uppslutning](https://www.inera.se/aktuellt/nyheter/historisk-uppslutning-for-framtidens-digitala-valfard/)
- [Adda: Imponerande uppslutning 2025](https://www.adda.se/aktuellt/2025/imponerande-uppslutning-kommungemensam-digitalisering-igen/)

---

## 7. Personalbrist

### Siffrorna
- **410 000 nya medarbetare** behövs i välfärden till 2031
- Bara **253 000 personer** når arbetsför ålder till 2031
- Arbetsför befolkning **minskar i 6 av 10 kommuner** till 2033
- Befolkning 80+ ökar **~50%** till 2031
- Q3 2024: brist på **70 000 yrkesverksamma** trots 8% arbetslöshet

### Svåraste roller att rekrytera

| Sektor | Allvarlighet | Detaljer |
|--------|-------------|---------|
| **Äldreomsorg (undersköterskor)** | Kritisk | 7/10 kommuner rapporterar brist. >50% svårt rekrytera. Sjukskrivning 2x rikssnitt. <50% vill stanna 3+ år. |
| **Socialsekreterare** | Allvarlig | Hög omsättning, utbrändhet pga dokumentation. Vissa kommuner erbjuder 4-dagars vecka. |
| **Sjukvård** | Allvarlig | Läkare, sjuksköterskor, specialister |
| **Lärare** | Hög | Avtagande men fortfarande signifikant |
| **IT/digital kompetens** | Hög | Kommuner kan inte konkurrera med privata sektorns löner |

### Där AI/automation kan hjälpa
- Minska dokumentationsbörda för socialsekreterare (från 70% till 30-40%)
- Automatisera rutinärenden (Trelleborgsmodellen: 30 tim/vecka)
- Bygglovsautomation (Nackamodellen: 26% automatiserade)
- Medborgar-självservice 24/7
- Schema/bemanningsoptimering för äldreomsorg
- Onboarding-acceleration
- Compliance-dokumentation (autogenerera)

**Källor:**
- [SKR: Action plan för välfärdens kompetensförsörjning](https://skr.se/personalochkompetensforsorjning/actionplanforvalfardenskompetensforsorjning.8000.html)
- [SVT: Över 400 000 behöver anställas](https://www.svt.se/nyheter/lokalt/skane/prognosen-over-400-000-behover-anstallas-i-valfarden-de-kommande-aren)
- [Kommunal: Problemet i äldreomsorgen](https://www.kommunal.se/blogg/mari-huupponen/problemet-i-aldreomsorgen-ar-inte-personalbrist-det-ar-daliga-arbetsvillkor)
- [Arbetet: En miljon övertidstimmar](https://arbetet.se/2023/01/23/personalbrist/)

---

## 8. Kunskapshantering

### Nuläge — fragmenterat och manuellt
- Organisationskunskap utspridd i mängder av dokument (SVEA-fynd)
- De flesta kommuner saknar strukturerad kunskapshantering
- Policyer, rutiner, riktlinjer på intranät, SharePoint, delade enheter — eller i folks huvuden
- **410 000 pensioneringar till 2031** → institutionell kunskap försvinner

### Onboarding-utmaningar
- Nya medarbetare måste lära sig kommunspecifika system, processer OCH lagstiftning
- Ingen standardiserad onboarding trots identiska lagkrav
- Utbildning typiskt peer-to-peer och informell → inkonsistens
- Nya socialsekreterare får omedelbar ärendebelastning med otillräcklig utbildning

### Vad kommuner behöver
1. Sökbara, AI-drivna kunskapsbaser (RAG) med egna policyer
2. Standardiserade onboarding-program anpassningsbara per kommun
3. Levande policydokument med ändringsnotifikationer
4. Tvärfunktionell kunskapsdelning
5. Fånga institutionell kunskap före masspensioneringarna

**Källor:**
- [AI Sweden: Lärdomar från Svea](https://www.ai.se/sv/nyheter/lardomar-fran-svea-ledarskap-kompetenshojning-och-tekniska-anpassningar)

---

## 9. Intric AI — plattform och begränsningar

### Vad Intric erbjuder
- No-code AI-assistent/agentbyggare
- Multimodal: chat, röst (Whisper), bildanalys, bildgenerering
- Integrationer: SharePoint, Outlook, OneDrive, Teams, Gmail, Google Calendar, Confluence, webbbsökning
- Offentliga datakonnektorer: SCB, Kolada, Destatis, SSB
- Öppet API + MCP-server
- Rollbaserad åtkomstkontroll
- Modellflexibilitet: 21 modeller (GPT-4.1, Claude Opus, Llama 3.3 70B m.fl.)
- ISO 27001, GDPR-certifierad

### Priser
- **Basic**: 1 000 SEK/mån (~8 000 frågor)
- **Extended**: 2 000 SEK/mån (steg om 1 000 SEK)
- Tokenbaserad konsumtion utöver

### Adoption
- 60+ organisationer (Sverige, Finland, Norge, Tyskland)
- 5 000+ AI-agenter
- 3,8M EUR pre-seed (byFounders, 2026)
- Kunder: Katrineholm, Borås, Västerås, Landskrona, Stockholm, Region Gotland, Linköping, Trollhättan, Örebro

### Intric/Eneo-splitten
- Sundsvall/Ånge utvecklade originalkoden som blev Intric
- 2025: Split — Intric AB stängde delar av koden
- Sundsvall/Ånge skapade **Eneo** (AGPL v3, helt öppen källkod)
- Eneo styrs av oberoende användarförening
- **Intric är nu kommersiellt, Eneo är community-drivet**

### Intrics begränsningar
1. Ingen publik marknadsplatskatalog
2. Inget statistik/analys-API
3. Tokenbaserad prissättning kan vara ogenomskinlig
4. Vendor lock-in-risk (closed-source efter splitten)
5. Ingen inbyggd integration med svenska kommunsystem (Platina, Raindance, Treserva)
6. Inget medborgarchatbot-stöd
7. Inga utbildnings/LMS-funktioner
8. Ingen RPA/arbetsflödesautomation utöver agentsamtal

**Källor:**
- [Intric Product](https://intric.ai/en/product)
- [Intric Government](https://intric.ai/en/government)
- [Intric Pricing](https://intric.ai/en/price-list)
- [byFounders Investment](https://www.byfounders.vc/insights/why-we-invested-in-intric)
- [Eneo Platform (Sundsvall)](https://utveckling.sundsvall.se/digital-infrastruktur/ai-plattformen-eneo)
- [Eneo GitHub](https://github.com/eneo-ai/eneo)

---

## 10. Konkurrenter och alternativ

### Eneo (öppen källkod)
- AGPL v3, fullt öppen
- Chat, mötesranskription, bildanalys, modell-agnostik
- Self-hosted eller managed (GDM.se)
- Ingen vendor lock-in

### SVEA — Nationell AI-assistent
- Leds av AI Sweden, finansierad av Vinnova
- Fas 2 med 55+ organisationer, Fas 3 2026 med 70+
- Öppna språkmodeller (GPT-SW3-linje), all data i Sverige
- Mål: överlämning till permanent operatör inom svensk förvaltning senast 2026

**Källor:**
- [AI Sweden: SVEA](https://www.ai.se/sv/projekt/en-gemensam-digital-assistent-offentlig-sektor)
- [Vinnova: SVEA](https://www.vinnova.se/p/en-gemensam-digital-assistent-for-svensk-offentlig-sektor/)

### AI-verkstaden (Nationell AI-workshop)
- Försäkringskassan + Skatteverket, regeringsuppdrag jan 2026
- Budget: **200 MSEK** (100M vardera)
- Begränsad drift 1 juli 2026, full utrullning 5 år
- Säkra testmiljöer, juridisk vägledning, delade AI-lösningar

**Källor:**
- [Regeringen: AI-verkstaden](https://www.regeringen.se/pressmeddelanden/2026/01/forsakringskassan-och-skatteverket-ska-etablera-en-ai-verkstad-for-den-offentliga-forvaltningen/)
- [Skatteverket: AI-verkstaden](https://skatteverket.se/omoss/pressochmedia/nyheter/2026/nyheter/maletforaiverkstadensakersnabbochlikvardigai.5.1522bf3f19aea8075ba3eae.html)
- [AI-verkstaden.ai](https://www.aiverkstaden.ai/)

### Microsoft Copilot for M365
- Växjö kommun (7 000 anställda) är nämndvärd svensk kommunadoptör
- Dyrt per licens, kräver M365 E3/E5
- Suveränitetsfrågor

### Övriga
- ChatGPT Enterprise — kräver DPA, suveränitetsfrågor
- Google Workspace med Gemini — mindre antaget i svenska kommuner
- Systemleverantörer (CGI, TietoEvry, Visma) lägger till AI i sina produkter

---

## 11. Befintliga kommunala IT-system

| Domän | System | Leverantör |
|-------|--------|------------|
| Ärendehantering | **Platina** (80% av statliga) | Formpipe |
| Ärendehantering | **Public 360** | TietoEvry |
| Ekonomi/ERP | **Raindance** (öppet API, stöder RPA/AI) | CGI |
| Ekonomi/ERP | **Agresso/Unit4** | Unit4 |
| HR/Lön | **Primula/eCompanion** (200+ kommuner) | TietoEvry |
| HR/Lön | **Heroma**, **Personec** | Visma m.fl. |
| Skola | **Edlevo**, **IST**, **SchoolSoft** | Diverse |
| Vård/Omsorg | **Treserva** (AI-planering med Intraphone) | CGI |
| Vård/Omsorg | **Lifecare** (analys + AI) | TietoEvry |
| Vård/Omsorg | **Combine Core** (AI-projekt med Nacka) | Pulsen Omsorg |
| Upphandling | **TendSign**, **Mercell** | Diverse |

**Nyckelinsikt:** Raindance stöder explicit AI/RPA-integration via API:er. Treserva har börjat med AI-planering. Lifecare marknadsför "avancerad analys och AI". Men det finns **inget enhetligt AI-lager** som sitter ovanpå alla system.

**Källor:**
- [CGI: Raindance](https://www.cgi.com/se/sv/raindance-affarsystem-erp)
- [Formpipe: Platina](https://www.formpipe.com/products/platina/)
- [CGI: Treserva](https://www.cgi.com/se/sv/treserva)
- [Pulsen Omsorg](https://pulsenomsorg.se/)
- [TietoEvry: Lifecare](https://www.tietoevry.com/en/care/)

---

## 12. Vad kommuner faktiskt bygger med AI

### Trelleborg — RPA-pionjär
Se avsnitt 1.

### Helsingborg — AI Innovation Lab
- **Nationellt City Lab** (AI Sweden) — Sveriges första AI-lab för kommundata
- **Sally chatbot** för vuxenutbildning
- **AI-assistent för ekonomiskt bistånd** — intern chatbot för handläggare
- **Digitala tolken** — AI-översättning för möten med icke-svensktalande
- AI för omvärldsbevakning

**Källor:**
- [Helsingborg Innovation](https://innovation.helsingborg.se/initiativ/ai-assistent-for-ekonomiskt-bistand/)
- [Laiban](https://laiban.helsingborg.se/)
- [DIGG: Digitala Tolken](https://www.digg.se/ai-for-socialtjansten/ai-initiativ/digitala-tolken---ett-ai-verktyg-testas-for-att-assistera-med-tolkning-under-moten)

### Sundsvall — AI-plattformsbyggare
- Byggde Eneo (ursprungligen Intric)
- AI-kameror för vägskadedetektering
- AI-drivna scenarier för förebyggande arbete med ungdomar
- Open source-filosofi

**Källor:**
- [Sundsvall AI](https://utveckling.sundsvall.se/ai)
- [DIGG: Sundsvall](https://www.digg.se/ai-for-offentlig-forvaltning/ai-initiativ/sundsvalls-kommun-bygger-gemensam-ai-plattform)

### Övriga kommuner
- **Nacka**: AI-transkription i socialtjänst, 26% automatiserade bygglov
- **Lidköping**: Intric för tjänsteskrivelser
- **Lund**: AI-analys och prediktion i socialtjänst
- **Norrtälje**: Automatiserade försörjningsstödsberäkningar
- **Luleå**: AI-assistent för kommunanställda

---

## 13. Katrineholm kommun — specifik kontext

### Organisation
5 förvaltningar, 11 nämnder:
1. **Kommunledningsförvaltningen** — HR, ekonomi, löner, kansli, arkiv, digitalisering, kommunikation
2. **Bildnings- och arbetsmarknadsförvaltningen** — förskola, grundskola, gymnasium, vuxenutbildning
3. **Samhällsbyggnadsförvaltningen** — bygglov, detaljplaner, miljö- och hälsoskydd
4. **Service- och kulturförvaltningen** — måltider, parker, idrott, kultur, bibliotek
5. **Social- och omsorgsförvaltningen** — socialtjänst, äldreomsorg, funktionshinder

### Nyckeltal
- ~3 400 anställda (4 575 inkl kommunala bolag)
- ~35 000 invånare
- Ekonomiskt resultat 2025: **114,4 MSEK överskott** (54,9 MSEK bättre än budget), 21:a raka överskottsåret
- Digitaliseringschef: **Andreas Peterzén**

### Strategiska utmaningar
- **"125% välfärd med 75% resurser"** — välfärdsgapet kritiskt 2030-2035
- Åldrande befolkning
- Kompetensförsörjning
- Barnfattigdom jämförelsevis hög
- 65% gymnasieexamen inom 4 år (vs 73% nationellt)

### Pågående AI/digital-initiativ
- **AI-assistent för hemtjänst** — rullas ut på mobiler, flerspråkig, nödstöd
- **Planerad: AI-assistent på katrineholm.se** — medborgarservice + internt
- **SDK** ersätter fysisk kurirtransport av sekretesshandlingar
- **Nytt helhets-IT-avtal** (jan 2025) — enda totalleverantör
- NIS2-compliance pågår
- Legacy-systemmigrering

**Källor:**
- [Katrineholm: Organisation](https://www.katrineholm.se/kommun-och-politik/organisation/styrelse-namnder-och-forvaltningar.html)
- [Voister: SDK, AI-assistenter och Digital post i Katrineholm](https://www.voister.se/artikel/2025/08/sdk-ai-assistenter-och-digital-post-vagen-framat-for-katrineholm/)
- [Voister: IT-avtalet som ska ta Katrineholm till nästa nivå](https://www.voister.se/artikel/2025/01/snart-gar-startskottet-for-it-avtalet-som-ska-ta-katrineholms-kommun-till-nasta-niva/)
- [Katrineholm: 114 miljoner plus](https://www.katrineholm.se/kommun-och-politik/press-och-kommunikation/alla-nyheter/nyheter-2026/2026-03-11-114-miljoner-plus-i-katrineholm.html)
- [AI Sweden: Kartläggning av kommuners AI-arbete](https://via.tt.se/pressmeddelande/3687032/unik-kartlaggning-av-svenska-kommuners-ai-arbete)

---

## 14. Gap i marknaden

1. **Inget enhetligt AI-lager** över kommunala system (Platina + Raindance + Treserva)
2. **Ingen AI-utbildningsplattform** för kommunanställda på svenska (AI-hubben fyller detta!)
3. **Inget compliance-verktyg** för GDPR + EU AI Act + NIS2 paketerat för kommuner
4. **Ingen turnkey medborgar-chatbot** anpassad för svenska kommuner
5. **Inget tjänsteskrivelse-verktyg** specifikt för kommunal dokumentstruktur
6. **Ingen benchmarking/jämförelsetjänst** för AI-mognad mellan kommuner
7. **Inget upphandlingsstöd** för AI-utvärdering mot regelverk
8. **Ingen prisvärd, förkonfigurerad AI-lösning** för kommuner med <20 000 invånare
9. **Ingen integrationsmiddleware** mellan AI-plattformar och kommunsystem
10. **Inget AI-incident/compliance-dashboard**

---

## 15. AI-hubbens unika positionering

| Funktion | Intric | Eneo | SVEA | Copilot | AI-hubben |
|----------|--------|------|------|---------|-----------|
| AI-assistenter | Ja | Ja | Ja | Ja | Ja (via Intric + community) |
| Användningsstatistik | Grundläggande | Grundläggande | Nej | Nej | Ja (admin-hanterad) |
| AI-utbildning | Nej | Nej | Nej | Nej | **Ja (akademi + kurser)** |
| Svenskt kommunfokus | Delvis | Ja | Ja | Nej | **Ja** |
| Compliance-dokumentation | Nej | Nej | Nej | Nej | **Ja** |
| Nyheter/uppdateringar | Nej | Nej | Nej | Nej | **Ja** |
| Community-hub | Delning | Open source | Konsortium | Nej | **Ja** |

AI-hubbens differentiering: **presentations- och utbildningslagret** — ingången där kommunanställda upptäcker AI-verktyg, lär sig använda dem, följer organisationens adoption och håller sig compliant.
