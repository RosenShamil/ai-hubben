# AI-hubben — Komplett kunskapsdokument för iKAI

Detta dokument innehåller all information som iKAI behöver för att besvara frågor om AI-hubben, dess funktioner, Intric-plattformen och kommunens AI-arbete. Dokumentet fungerar som lathund, steg-för-steg-guide och referens.

---

## 1. VAD ÄR AI-HUBBEN?

AI-hubben (aihubben.se) är Katrineholms kommuns centrala plattform för allt AI-relaterat. Plattformen samlar:

- Ett bibliotek med 300+ AI-assistenter byggda i Intric
- Live-statistik om kommunens AI-användning
- Utbildningar, workshops och kursmaterial
- Dokumentation, riktlinjer och policyer
- Nyheter och uppdateringar om kommunens AI-arbete
- En AI-chatbot (iKAI) som kan svara på frågor

AI-hubben är byggd av Digitaliseringsavdelningen i Katrineholms kommun och riktar sig primärt till kommunanställda, men är tillgänglig för alla.

### AI-hubben som app (PWA)

AI-hubben är en PWA (Progressive Web App) — en webbsida som fungerar som en riktig app. Det innebär:

- Du kan installera den på din mobil eller dator
- Den öppnas utan adressfält, som en vanlig app
- Sidor du besökt tidigare fungerar delvis offline
- Snabba övergångar och app-känsla

---

## 2. SIDOR OCH FUNKTIONER — KOMPLETT GUIDE

### 2.1 Startsidan (/)

Startsidan är ingången till hela plattformen och visar:

- **Nyckeltal** — antal interaktioner, aktiva användare, skapade assistenter och utbildade
- **Utvalda assistenter** — ett urval av kommunens populäraste AI-assistenter med direktlänk
- **Senaste nyheter** — de tre senaste nyhetsinläggen
- **Snabblänkar** — genvägar till Utbildning, Dokumentation och FAQ
- **Dela din assistent** — uppmaning att dela egna assistenter med kommunen

### 2.2 Assistentbiblioteket (/assistenter)

Här finns alla AI-assistenter som kommunen har byggt och delat via Intric. Biblioteket hämtar assistenter automatiskt från Intric Marketplace API (filtrerat på Katrineholms kommun) samt från kommunens egen databas.

**Funktioner:**
- Sök bland assistenter via sökfältet
- Bläddra genom hela listan
- Klicka på en assistent för att se detaljerad information

**På en assistents detaljsida visas:**
- Namn och beskrivning
- Systemprompt (instruktionerna assistenten följer)
- Setup-instruktioner (hur du använder den)
- Knapp för att chatta (om chattlänk finns)
- Knapp för att importera assistenten till din egen Intric-miljö

#### Steg-för-steg: Hitta och använda en assistent

1. Gå till aihubben.se/assistenter
2. Skriv i sökfältet vad du letar efter, t.ex. "protokoll" eller "sammanfatta"
3. Klicka på assistenten du är intresserad av
4. Läs beskrivningen för att förstå vad den gör
5. Klicka **"Chatta"** för att öppna assistenten i Intric och börja använda den direkt
6. Eller klicka **"Importera assistenten"** om du vill kopiera inställningarna till din egen Intric-miljö

#### Steg-för-steg: Dela en egen assistent

1. Gå till aihubben.se/assistenter
2. Klicka på **"Lägg till"**-knappen (på mobil: den flytande plusknappen)
3. Fyll i steg 1: namn, länk till assistenten, organisation, beskrivning och region
4. Fyll i steg 2 (valfritt): systemprompt och setup-instruktioner
5. Klicka **"Skicka in"**
6. Din assistent granskas av Digitaliseringsavdelningen innan den publiceras

#### Skillnaden mellan "Chatta" och "Importera assistenten"

- **Chatta** — öppnar assistenten direkt i Intric. Du pratar med assistenten som den är, med all kunskap och data kopplad.
- **Importera assistenten** — kopierar assistentens inställningar (namn, systemprompt, setup) till din egen Intric-miljö. OBS: Kunskapen och datan följer INTE med — du behöver koppla på din egen data efter import.

### 2.3 Statistik (/statistik)

Statistiksidan visar data om kommunens AI-användning. All data uppdateras av Digitaliseringsavdelningen.

**Nyckeltal (med periodväljare: 2025 / 2026 / Allt):**
- Totala interaktioner — antal gånger assistenter använts
- Aktiva användare — unika användare som använt Intric
- Skapade assistenter — antal assistenter som byggts
- Utbildade — antal medarbetare som genomgått AI-utbildning

**Diagram och visualiseringar:**
- Daglig användning — linjediagram som visar interaktioner över tid
- Populäraste assistenter — stapeldiagram med topp 10 mest använda
- AI-modellanvändning — cirkeldiagram som visar fördelning mellan GPT, Claude och andra modeller
- Personliga vs anpassade — fördelning mellan den personliga assistenten och egna assistenter
- Filuppladdningar — vilka filtyper som laddas upp mest (PDF, Word, PowerPoint, etc.)
- Årsjämförelse — jämförelse av nyckeltal mellan 2025 och 2026
- Utbildningsinsatser — antal workshops, individuella sessioner och totalt utbildade, fördelat per förvaltning och yrkesgrupp

### 2.4 Utbildning (/utbildning)

Utbildningssidan är navet för kommunens AI-utbildningar.

**Kalender:**
- Månadsvy som visar kommande utbildningstillfällen
- Dagar med utbildningar markeras med färgade prickar
- Klicka på en dag för att se detaljer om utbildningen
- Navigera mellan månader med pilknapparna

**Anmälan:**
- Klicka på en utbildning i kalendern
- Se typ av utbildning, förvaltning, yrkesgrupp, tid och antal platser
- Klicka "Anmäl dig" och fyll i namn och e-post
- Antal lediga platser visas. "Fullbokat" visas om inga platser kvar.

**Utbildningsmaterial:**
- Guider, videos, PDF:er och kurser
- Filtrera med flikar: Alla, Guider, Videos, PDF, Kurser
- Klicka för att öppna eller ladda ner materialet

**Genomförda utbildningar:**
- Lista med tidigare utbildningstillfällen (datum, typ, förvaltning)

#### Steg-för-steg: Anmäl dig till en utbildning

1. Gå till aihubben.se/utbildning
2. Bläddra i kalendern till rätt månad
3. Klicka på en dag som har en färgad prick
4. Läs informationen om utbildningen
5. Om det finns lediga platser, klicka **"Anmäl dig"**
6. Fyll i ditt namn och din e-postadress
7. Klicka **"Bekräfta"**

### 2.5 Dokumentation (/dokumentation)

Dokumentationssidan samlar alla riktlinjer, policyer, guider och resurser.

**Funktioner:**
- Sök bland alla dokument med sökfältet
- Filtrera med flikar: Riktlinjer, Policyer, Guider, Rapporter, Mallar, Video, Övrigt
- Klicka på ett dokument för att öppna eller ladda ner det
- Video-dokument visar YouTube-thumbnail och öppnas direkt

**Intric-dokumentation:**
- Kategoriserade länkar till Intric:s officiella hjälpcenter (help.intric.ai)
- Kategorier: Kom igång, Assistenter, Planer, Kunskap & Data, Administration, Säkerhet & Compliance, Spaces, Teknisk dokumentation

### 2.6 Nyheter (/nyheter)

Blogg med nyheter och uppdateringar om kommunens AI-arbete.

- Senaste inlägget visas som stort featured-kort med bild
- Övriga inlägg i rutnät med bild, titel och datum
- Klicka på ett inlägg för att läsa hela artikeln
- Artiklar kan innehålla bilder, YouTube-video och formaterad text

### 2.7 FAQ (/faq)

Vanliga frågor och svar om AI-hubben och kommunens AI-arbete.

- Sök bland frågor med sökfältet
- Klicka på en fråga för att expandera och se svaret (accordion)
- Hittar du inte svaret? Längst ner finns en länk till kontaktsidan

### 2.8 Om oss (/om)

Information om Digitaliseringsavdelningen.

- **Uppdrag** — vad avdelningen ansvarar för
- **Vision** — avdelningens vision för digital utveckling
- **Teamet** — alla medarbetare med namn, roll och kontaktuppgifter
- **Ansvarsområden** — Systemförvaltning, Informationssäkerhet, Digital utveckling, AI & Innovation, Licenser & Inköp, Samverkan

### 2.9 Kontakt (/kontakt)

Kontakta Digitaliseringsavdelningen via:

- **Kontaktformulär** — fyll i namn, e-post, ämne och meddelande
- **E-post** — mejla direkt till avdelningen
- **Servicedesk** — för IT-support och tekniska ärenden

Kontaktuppgifterna kan ändras av administratörer och kan variera — se alltid den aktuella informationen på kontaktsidan.

---

## 3. NAVIGERING — LATHUND

### På dator (desktop)

- **Navigeringsfält** överst: Hem, Assistenter, Statistik, Utbildning, Dokumentation
- **Logga in** — knapp längst upp till höger (för administratörer)
- **Tema** — byt mellan ljust och mörkt läge med sol/måne-knappen
- **Footer** — snabblänkar till alla sidor längst ner
- **AI-chatbot (iKAI)** — flytande bubbla nere till vänster

### På mobil

- **Flikfält** längst ner: Hem, Assistenter, Statistik, Utbildning, Mer
- **Mer-menyn** — öppnar: Dokumentation, Nyheter, FAQ, Kontakt, Om
- **AI-chatbot (iKAI)** — flytande bubbla nere till vänster, öppnas i helskärm
- Ingen footer visas på mobil — allt nås via flikfältet och Mer-menyn

### AI-chatboten (iKAI)

Den flytande chatbubblan finns på alla sidor.

1. Klicka på bubblan för att öppna chatten
2. Skriv din fråga och tryck Enter
3. Klicka på pilen i hörnet för att expandera till större fönster
4. På mobil öppnas chatten automatiskt i helskärm
5. Klicka på X för att stänga chatten

---

## 4. INTRIC — AI-PLATTFORMEN

### Vad är Intric?

Intric är den AI-plattform som Katrineholms kommun använder för att bygga, drifta och dela AI-assistenter. Intric är ett svenskt företag. Plattformen erbjuder:

- Byggverktyg för att skapa AI-assistenter utan att koda
- Möjlighet att koppla egna dokument och datakällor
- Val mellan olika AI-modeller (open source och kommersiella)
- Marketplace för att dela assistenter inom organisationen

### AI-modeller och datasäkerhet

Intric erbjuder två typer av AI-modeller:

**Open source-modeller:**
- All databehandling sker på svenska servrar
- Ingen data skickas utanför Sverige
- Exempel: Llama, Mistral

**Kommersiella modeller (GPT, Claude):**
- Frågor och svar behandlas på servrar i USA
- Data kan passera utländska servrar
- Ger ofta högre kvalitet på svaren

**Viktigt att veta:**
- Kontrollera vilken modell en assistent använder om datasäkerhet är viktigt
- Intric uppfyller GDPR oavsett modellval
- Vid känslig information, välj assistenter som använder open source-modeller
- Fråga Digitaliseringsavdelningen om du är osäker

### Steg-för-steg: Kom igång med Intric

1. Gå till katrineholm.intric.ai
2. Logga in med din kommunala e-postadress
3. Du har nu tillgång till den personliga assistenten och alla delade assistenter
4. Utforska befintliga assistenter eller skapa en egen
5. För djupare guider, se dokumentationen på help.intric.ai

### Steg-för-steg: Skapa en assistent i Intric

1. Logga in på katrineholm.intric.ai
2. Klicka på "Skapa assistent" eller "+"
3. Ge assistenten ett namn och en beskrivning
4. Skriv en systemprompt — instruktioner för hur assistenten ska bete sig
5. Välj AI-modell (open source för svenska servrar, GPT/Claude för högre kvalitet)
6. Koppla kunskap — ladda upp dokument, PDF:er eller annan data
7. Testa assistenten genom att chatta med den
8. Dela den via AI-hubben om du vill att kollegor ska kunna använda den

---

## 5. VANLIGA FRÅGOR (FAQ)

### Om AI-hubben

**Vad är AI-hubben?**
AI-hubben är Katrineholms kommuns plattform för AI-assistenter, statistik, utbildning och resurser. Här samlar vi allt som rör kommunens AI-arbete på ett ställe.

**Vem kan använda AI-hubben?**
Alla anställda i Katrineholms kommun kan använda plattformen. Du behöver ingen särskild behörighet för att komma åt assistenterna eller utbildningsmaterialet. Plattformen är även tillgänglig för allmänheten.

**Vem står bakom AI-hubben?**
AI-hubben utvecklas och förvaltas av Digitaliseringsavdelningen i Katrineholms kommun.

**Kostar det något att använda AI-hubben?**
Nej, AI-hubben är kostnadsfri för alla kommunanställda.

### Om AI-assistenter

**Vad är en AI-assistent?**
En AI-assistent är ett specialanpassat AI-verktyg som är tränat för en specifik uppgift, till exempel att sammanfatta protokoll, skriva texter eller svara på frågor om kommunens riktlinjer. Assistenterna bygger på stora språkmodeller (LLM) och kan anpassas med egen data och instruktioner.

**Hur använder jag en assistent?**
Gå till Assistenter-sidan, sök efter det du behöver, klicka på en assistent och tryck "Chatta". Du skriver din fråga och assistenten svarar.

**Kan jag lita på svaren?**
AI kan ibland ge felaktiga eller ofullständiga svar — detta kallas "hallucination". Dubbelkolla alltid viktig information mot källan. Om en assistent konsekvent ger felaktiga svar, kontakta Digitaliseringsavdelningen.

**Kan jag skapa och dela en egen assistent?**
Ja! Om du har byggt en assistent i Intric kan du dela den via AI-hubben. Klicka på "Dela din assistent" på startsidan eller "Lägg till" på assistentsidan. Assistenten granskas innan publicering.

**Vad är skillnaden mellan personlig assistent och anpassade assistenter?**
- **Personlig assistent** — Intric:s inbyggda assistent som alla användare har tillgång till. En generell AI du kan chatta med.
- **Anpassade assistenter** — specialbyggda assistenter med specifik kunskap och instruktioner, skapade av kommunanställda för specifika uppgifter.

**Vad händer med data jag skickar till en assistent?**
Det beror på vilken modell assistenten använder:
- Open source-modeller: allt behandlas på svenska servrar
- Kommersiella modeller (GPT, Claude): data behandlas på servrar i USA
Skicka aldrig personnummer, lösenord eller annan känslig persondata till en assistent utan att först kontrollera vilken modell den använder.

### Om installering och teknik

**Kan jag installera AI-hubben som en app?**
Ja, AI-hubben är en PWA (Progressive Web App).

*Android (Chrome/Edge):*
1. Öppna aihubben.se i webbläsaren
2. Tryck på menyknappen (tre prickar)
3. Välj "Installera app" eller "Lägg till på startskärmen"
4. Bekräfta installationen

*iPhone (Safari):*
1. Öppna aihubben.se i Safari
2. Tryck på dela-knappen (fyrkant med pil uppåt)
3. Scrolla ner och välj "Lägg till på hemskärmen"
4. Tryck "Lägg till"

*Dator (Chrome/Edge):*
1. Öppna aihubben.se
2. Klicka på installationsikonen i adressfältet (eller menyknappen → "Installera AI-hubben")
3. Bekräfta

**Fungerar AI-hubben offline?**
Delvis. Sidor du tidigare besökt cachas och kan visas utan internet. Själva AI-assistenterna kräver dock uppkoppling för att fungera.

**Vilka webbläsare stöds?**
AI-hubben fungerar i alla moderna webbläsare: Chrome, Edge, Firefox, Safari. Bäst upplevelse i Chrome och Edge.

**Sidan laddar långsamt / ser konstig ut — vad gör jag?**
1. Testa att ladda om sidan (Ctrl+F5 eller Cmd+Shift+R)
2. Rensa webbläsarens cache
3. Prova en annan webbläsare
4. Om problemet kvarstår, kontakta Digitaliseringsavdelningen

### Om utbildning

**Finns det utbildningar om AI?**
Ja, Digitaliseringsavdelningen erbjuder regelbundna workshops och utbildningstillfällen. Se Utbildning-sidan för kommande datum och anmälan. Inspelningar och material finns också tillgängliga.

**Hur anmäler jag mig till en utbildning?**
Gå till aihubben.se/utbildning, klicka på en dag i kalendern som har en färgad prick, och klicka "Anmäl dig". Fyll i namn och e-post.

**Kan min avdelning boka en egen utbildning?**
Ja! Gå till Utbildning-sidan och använd formuläret "Boka utbildning" längst ner, eller kontakta Digitaliseringsavdelningen direkt.

**Var hittar jag utbildningsmaterial?**
Under fliken "Material" på Utbildning-sidan. Där finns guider, videos, PDF:er och kurser att ta del av.

### Om säkerhet och GDPR

**Är det säkert att använda AI-assistenterna?**
Assistenterna körs via Intric, en svensk plattform som uppfyller GDPR. Om en assistent använder open source-modeller behandlas allt på svenska servrar. Använder assistenten externa modeller som GPT eller Claude behandlas frågan på servrar i USA. Intric erbjuder båda alternativen — kontrollera vilken modell en assistent använder om det är viktigt för dig.

**Vilken data ser AI-assistenterna?**
Assistenterna har bara tillgång till de dokument och datakällor som de är kopplade till. De kan inte se dina personliga filer, e-post eller andra system om det inte är specifikt konfigurerat.

**Kan jag skicka känslig information till en assistent?**
Var försiktig med känslig information. Undvik att skicka personnummer, lösenord, patientdata eller annan sekretessbelagd information. Om du behöver arbeta med känslig data, kontakta Digitaliseringsavdelningen för att diskutera säkra alternativ. Välj assistenter som använder open source-modeller om du behöver hantera känsligare information.

**Sparas mina konversationer?**
Konversationer med assistenter sparas i Intric i enlighet med plattformens datapolicy. Kontakta Digitaliseringsavdelningen för specifik information om lagringstider och hantering.

---

## 6. DIGITALISERINGSAVDELNINGEN

Digitaliseringsavdelningen ansvarar för Katrineholms kommuns digitala infrastruktur och utveckling.

### Ansvarsområden

- **Systemförvaltning** — drift, underhåll och vidareutveckling av kommunens digitala system
- **Informationssäkerhet** — skydd av data, riskanalyser och efterlevnad av regelverk
- **Digital utveckling** — nya digitala tjänster och modernisering av befintliga lösningar
- **AI & Innovation** — implementering av AI-lösningar och utforskning av ny teknik
- **Licenser & Inköp** — hantering av programlicenser, hårdvara och leverantörsavtal
- **Samverkan** — samarbete med verksamheter, leverantörer och andra kommuner

### Teamet

- Andreas Peterzén — Digitaliseringschef
- Christoffer Patring — Informationssäkerhetssamordnare
- Hassan Aziz Abbas — Praktikant, systemutvecklare
- Mervi Junttila — IT-koordinator
- Michael Bergman — AI-utvecklare (michael.bergman@katrineholm.se)
- Michael Fransson — Teknisk chef
- Shamil Rosén — AI-utvecklare (rosen.shamil@katrineholm.se)
- Tomas Vasseur — Digitaliseringsarkitekt

---

## 7. KONTAKTUPPGIFTER

**Digitaliseringsavdelningen:**
- E-post: digitaliseringsavdelningen@katrineholm.se
- Besök kontaktsidan på aihubben.se/kontakt

**IT-support (Servicedesk):**
- Telefon: 0150-569 00
- E-post: 6900@katrineholm.se
- För teknisk support, IT-ärenden och felsökning

**Kommunväxeln:**
- Telefon: 0150-570 00
- E-post: kontaktcenter@katrineholm.se

**Webbplatser:**
- AI-hubben: aihubben.se
- Intric (AI-plattform): katrineholm.intric.ai
- Intric hjälpcenter: help.intric.ai

---

## 8. ORDLISTA

| Begrepp | Förklaring |
|---------|------------|
| **AI (Artificiell intelligens)** | Teknik som gör att datorer kan utföra uppgifter som normalt kräver mänsklig intelligens, som att förstå text, svara på frågor och analysera data. |
| **AI-assistent** | Ett AI-verktyg specialanpassat för en specifik uppgift, byggt med instruktioner och kopplad data. |
| **Hallucination** | När en AI-modell genererar svar som låter trovärdiga men är felaktiga eller påhittade. |
| **Intric** | Svensk AI-plattform som Katrineholms kommun använder för att bygga och drifta AI-assistenter. |
| **LLM (Large Language Model)** | Stor språkmodell — AI-teknik som kan förstå och generera text. Exempel: GPT, Claude, Llama. |
| **Open source-modell** | AI-modell med öppen källkod som kan köras på egna/svenska servrar, t.ex. Llama och Mistral. |
| **PWA (Progressive Web App)** | En webbsida som kan installeras och användas som en app på mobilen, med offline-stöd och app-känsla. |
| **Prompt** | Instruktionen eller frågan du skriver till en AI-assistent. |
| **Systemprompt** | De basinstruktioner som styr hur en AI-assistent beter sig och svarar. Sätts av den som bygger assistenten. |
| **RAG (Retrieval-Augmented Generation)** | Teknik där AI:n söker i kopplade dokument innan den svarar, för att ge mer relevanta och korrekta svar. |
| **GPT** | AI-modell utvecklad av OpenAI (USA). Används i ChatGPT. Kommersiell modell. |
| **Claude** | AI-modell utvecklad av Anthropic (USA). Kommersiell modell. |
| **GDPR** | EU:s dataskyddsförordning som reglerar hur personuppgifter får hanteras. |
| **Marketplace** | Intric:s marknadsplats där organisationer kan dela och hitta AI-assistenter. |
| **Kunskapsbas** | De dokument och datakällor som kopplas till en AI-assistent för att ge den specifik kunskap. |

---

## 9. SNABBREFERENS — VANLIGA UPPGIFTER

| Jag vill... | Gör så här |
|-------------|------------|
| Hitta en AI-assistent | Gå till /assistenter och sök |
| Chatta med en assistent | Klicka på assistenten → "Chatta" |
| Dela min assistent | /assistenter → "Lägg till" → fyll i formuläret |
| Se statistik | Gå till /statistik |
| Anmäla mig till utbildning | /utbildning → klicka på dag i kalender → "Anmäl dig" |
| Ladda ner en guide | /dokumentation → sök/filtrera → klicka |
| Läsa nyheter | Gå till /nyheter |
| Kontakta avdelningen | /kontakt → fyll i formuläret |
| Installera appen (Android) | Öppna i Chrome → meny → "Installera app" |
| Installera appen (iPhone) | Öppna i Safari → dela-knapp → "Lägg till på hemskärmen" |
| Byta till mörkt läge | Klicka sol/måne-ikonen i navigeringsfältet |
| Prata med iKAI | Klicka på chatbubblan nere till vänster |
| Logga in som admin | Klicka "Logga in" → ange e-post och lösenord |
