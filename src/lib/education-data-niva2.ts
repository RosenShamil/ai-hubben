// =============================================================================
// AI-AKADEMIN — Nivå 2 lesson & quiz content
// =============================================================================

import type { Lesson, AcademyQuizQuestion } from "./education-system";

// ---------------------------------------------------------------------------
// Nivå 2 — Lektioner
// ---------------------------------------------------------------------------

export const LESSONS_NIVA_2: Lesson[] = [
  // =========================================================================
  // KURS 2.1 — Förstå tekniken
  // =========================================================================

  // --- Modul 2.1.1: Från text till tokens ---
  {
    id: "les-2-1-1-1", moduleId: "mod-2-1-1", title: "Tokens på djupet", order: 1, estimatedMinutes: 7, type: "reading",
    conceptIds: ["token", "kontextfonster"],
    content: {
      hook: "Du vet redan att AI bryter ner text i tokens. Men visste du att samma mening kan bli olika antal tokens beroende på språk? Svenska kostar ofta 30–50% fler tokens än engelska.",
      funFact: "GPT-4 har ett kontextfönster på 128 000 tokens — det motsvarar ungefär en 300-sidig bok. Claude kan hantera upp till 200 000 tokens.",
      sections: [
        { heading: "Varför tokens och inte ord?", text: "AI:n arbetar inte med ord utan med tokens — bitar av text som kan vara hela ord, orddelar eller enskilda tecken. 'Kommunstyrelsen' kan bli ['Kommun', 'styr', 'elsen'] — tre tokens. Engelska 'The council' är bara två tokens. Därför 'kostar' svenska text mer.", icon: "Puzzle" },
        { heading: "Kontextfönstret — AI:ns arbetsminne", text: "Kontextfönstret bestämmer hur mycket text AI:n kan bearbeta samtidigt. Allt du skrivit + allt AI:n svarat = total tokenförbrukning. När fönstret är fullt börjar AI:n 'glömma' det äldsta i konversationen. Därför blir långa chattar ibland sämre mot slutet.", analogy: "Tänk dig ett skrivbord med begränsat utrymme. Ju fler papper du lägger på, desto fler gamla papper ramlar ner på golvet. AI:ns kontextfönster fungerar likadant.", icon: "Layers" },
      ],
      municipalExample: { title: "Tokenanvändning i praktiken", description: "Om du klistrar in ett 50-sidigt beslutsunderlag i Intric (ca 25 000 tokens) och ber om en sammanfattning (500 tokens), använder du ~25 500 tokens av kontextfönstret. Med ett 128K-fönster finns gott om plats — men vid flera dokument fylls det snabbt.", department: "Alla förvaltningar", icon: "Calculator" },
      interactiveElement: { type: "fill-blank", data: { sentence: "AI:ns kontextfönster bestämmer hur mycket text den kan ___ samtidigt.", correctAnswer: "bearbeta", distractors: ["översätta", "radera", "skriva ut"] } },
      summary: ["Tokens är AI:ns textenhet — ofta orddelar, inte hela ord", "Svenska text kostar fler tokens än engelska", "Kontextfönstret begränsar hur mycket AI kan 'komma ihåg' i en konversation"],
    },
  },
  {
    id: "les-2-1-1-2", moduleId: "mod-2-1-1", title: "Embeddings — AI:ns förståelse", order: 2, estimatedMinutes: 7, type: "reading",
    conceptIds: ["embeddings"],
    content: {
      hook: "Hur vet AI:n att 'bil' och 'fordon' hör ihop, men inte 'bil' och 'banan'? Svaret: embeddings — talvektorer som fångar betydelse.",
      funFact: "I embeddings-rymden ligger 'kung' - 'man' + 'kvinna' ≈ 'drottning'. AI:n har lärt sig relationer mellan begrepp genom ren statistik.",
      sections: [
        { heading: "Ord som siffror", text: "En embedding är en lång lista med siffror (en vektor) som representerar ett ords betydelse. Ord med liknande betydelse har liknande vektorer. 'Kommun' och 'myndighet' ligger nära varandra, medan 'kommun' och 'pizza' ligger långt ifrån.", icon: "Sigma" },
        { heading: "Varför det är viktigt", text: "Embeddings är grunden för AI:ns förmåga att förstå kontext och hitta relevant information. När du söker i Intric jämförs din frågas embedding med dokumentens embeddings — och de mest likartade resultaten visas. Det kallas semantisk sökning.", analogy: "Tänk dig en enorm karta där varje begrepp har en GPS-koordinat. Närstående begrepp ligger nära varandra geografiskt. Att söka = att hitta närmaste granne på kartan.", icon: "Map" },
      ],
      municipalExample: { title: "Embeddings i Intric", description: "När du laddar upp dokument i Intric konverteras texten till embeddings. När du sedan ställer en fråga matchar systemet din fråga mot dokumentens embeddings och hittar de mest relevanta styckena — även om du använder andra ord än dokumentet.", department: "IT & digitalisering", icon: "Search" },
      interactiveElement: { type: "true-false", data: { statement: "Embeddings gör att AI kan hitta relevanta dokument även om sökorden inte matchar exakt.", isTrue: true, explanation: "Rätt! Embeddings fångar betydelse, inte exakta ord. 'Ansöka om bygglöv' kan matcha 'bygglovsansökan' tack vare liknande vektorer." } },
      summary: ["Embeddings omvandlar text till siffror som fångar betydelse", "Liknande begrepp får liknande vektorer — grunden för semantisk sökning", "Intric använder embeddings för att hitta relevanta dokument åt dig"],
    },
  },

  // --- Modul 2.1.2: Transformer-revolutionen ---
  {
    id: "les-2-1-2-1", moduleId: "mod-2-1-2", title: "Attention — AI:ns superkraft", order: 1, estimatedMinutes: 7, type: "reading",
    conceptIds: ["attention", "transformer"],
    content: {
      hook: "2017 publicerade Google-forskare en artikel med titeln 'Attention Is All You Need'. Den blev den viktigaste AI-publikationen på ett decennium. Här är varför.",
      funFact: "Transformer-arkitekturen ligger bakom GPT (OpenAI), Claude (Anthropic), Gemini (Google) och alla moderna språkmodeller. Allt började med en 11-sidig forskningsartikel.",
      sections: [
        { heading: "Vad är attention?", text: "Attention-mekanismen låter AI:n fokusera på de viktigaste delarna av texten. I meningen 'Kommunstyrelsens ordförande beslutade att...' vet AI:n att 'beslutade' hör ihop med 'ordförande', inte med 'kommunstyrelsens'. Den ser sambanden mellan ord, oavsett avstånd.", icon: "Eye" },
        { heading: "Transformer — byggstenarna", text: "En transformer är en arkitektur byggd av attention-lager staplade på varandra. Varje lager förfinar förståelsen. De första lagren fångar ordföljd och grammatik. Mellanlagren förstår betydelse. De djupaste lagren gör avancerade resonemang.", analogy: "Tänk dig att läsa en text tre gånger. Först förstår du orden. Andra gången ser du meningsbyggnaden. Tredje gången fattar du poängen. En transformer gör detta med hundratals 'lager' av förståelse.", icon: "Layers" },
      ],
      municipalExample: { title: "Transformer i din vardag", description: "Varje gång du chattar med Intric eller Copilot kör en transformer-modell miljontals attention-beräkningar för att förstå din fråga och formulera ett svar. Allt på under en sekund.", department: "IT", icon: "Zap" },
      interactiveElement: { type: "multi-choice", data: { question: "Vad gör attention-mekanismen?", options: ["Översätter text automatiskt", "Låter AI:n fokusera på relevanta delar av texten", "Ger AI:n tillgång till internet", "Komprimerar data för lagring"], correctIndex: 1, explanation: "Attention låter AI:n 'fokusera' på de viktigaste orden i relation till varandra — nyckeln till språkförståelse." } },
      summary: ["Attention låter AI:n se samband mellan ord oavsett avstånd i texten", "Transformer = staplade attention-lager som förfinar förståelsen", "Alla moderna språkmodeller (GPT, Claude, Gemini) bygger på transformer"],
    },
  },
  {
    id: "les-2-1-2-2", moduleId: "mod-2-1-2", title: "Hur en LLM tränas", order: 2, estimatedMinutes: 7, type: "reading",
    conceptIds: ["neuralt-natverk"],
    content: {
      hook: "Att träna GPT-4 kostade uppskattningsvis 100 miljoner dollar och tog månader med tusentals specialchip. Vad händer egentligen under träningen?",
      funFact: "GPT-4 tränades på uppskattningsvis 13 biljoner tokens — det motsvarar cirka 10 miljoner böcker. Träningen krävde cirka 25 000 Nvidia A100-GPU:er.",
      sections: [
        { heading: "Steg 1: Förträning", text: "Modellen matas med enorma mängder text från internet, böcker och dokument. Den lär sig förutsäga nästa ord. Efter biljontals ord har den internaliserat grammatik, fakta och resonemang — men den vet inte skillnaden mellan bra och dåliga svar.", icon: "Database" },
        { heading: "Steg 2: Finjustering", text: "Mänskliga tränare skapar exempel på bra svar. Modellen lär sig att vara hjälpsam, korrekt och säker. Sedan används RLHF (Reinforcement Learning from Human Feedback) — människor rankar svar och modellen justeras. Det är därför ChatGPT och Claude svarar artigt och strukturerat.", analogy: "Förträning = att läsa alla böcker i världen. Finjustering = att gå en kurs i kundservice. Utan finjustering vet modellen allt men kan inte föra ett bra samtal.", icon: "UserCheck" },
      ],
      municipalExample: { title: "Varför modellval spelar roll", description: "Olika modeller har tränats olika. GPT-4 och Claude Opus är stora och dyra men bra på komplexa uppgifter. Mindre modeller (GPT-4o-mini, Claude Haiku) är snabbare och billigare. Intric låter dig välja rätt modell för rätt uppgift.", department: "IT", icon: "Settings" },
      interactiveElement: { type: "match", data: [{ term: "Förträning", definition: "Läser miljarder texter, lär sig språkmönster" }, { term: "Finjustering", definition: "Lär sig ge hjälpsamma, säkra svar" }, { term: "RLHF", definition: "Människor rankar svar, modellen justeras" }, { term: "Token", definition: "Textbit som AI bearbetar" }] },
      summary: ["Förträning: modellen läser biljontals tokens och lär sig språkmönster", "Finjustering + RLHF: modellen lär sig vara hjälpsam och säker", "Modellval påverkar kvalitet, hastighet och kostnad"],
    },
  },

  // --- Modul 2.1.3: RAG — AI med dina dokument ---
  {
    id: "les-2-1-3-1", moduleId: "mod-2-1-3", title: "Vad är RAG?", order: 1, estimatedMinutes: 7, type: "reading",
    conceptIds: ["rag", "vektordatabas"],
    content: {
      hook: "En LLM vet otroligt mycket — men den vet inget om dina interna dokument, riktlinjer eller processer. RAG löser det. Det är tekniken som gör Intric kraftfullt.",
      funFact: "RAG uppfanns av Facebook AI Research 2020 och har blivit standardmönstret för företags-AI. Det kombinerar det bästa av sökning och generering.",
      sections: [
        { heading: "RAG = Sök + Generera", text: "Retrieval-Augmented Generation (RAG) fungerar i två steg: 1) **Retrieval** — systemet söker i dina dokument efter relevant information, 2) **Generation** — LLM:en använder hittad information för att formulera ett svar. Resultatet: AI:n svarar baserat på ER kunskap, inte bara sin träningsdata.", icon: "Search" },
        { heading: "Vektordatabasen — hjärtat i RAG", text: "En vektordatabas lagrar dokument som embeddings (talvektorer). När du ställer en fråga konverteras den till en vektor, och databasen hittar de mest liknande dokumentstyckena. Det är semantisk sökning — den förstår vad du menar, inte bara vad du skriver.", analogy: "Tänk dig ett bibliotek där böckerna inte sorteras alfabetiskt utan efter innehåll. Alla böcker om 'ledarskap' står bredvid varandra, oavsett titel eller författare. Vektordatabasen fungerar likadant.", icon: "Database" },
      ],
      municipalExample: { title: "RAG i Intric", description: "När du laddar upp kommunens riktlinjer, policyer och handböcker i Intric lagras de i en vektordatabas. När en medarbetare frågar 'Hur hanterar vi GDPR vid AI-användning?' söker RAG-systemet igenom alla dokument och ger ett svar baserat på kommunens egna riktlinjer.", department: "IT & digitalisering", icon: "FileText" },
      interactiveElement: { type: "multi-choice", data: { question: "Vad gör RAG som en vanlig LLM inte kan?", options: ["Svarar snabbare", "Svarar baserat på organisationens egna dokument", "Förstår fler språk", "Genererar bilder"], correctIndex: 1, explanation: "RAG kombinerar sökning i egna dokument med LLM:ens språkförmåga — så svaren baseras på er kunskap." } },
      summary: ["RAG = Retrieval (sök) + Augmented Generation (skapa svar med hittad info)", "Vektordatabasen lagrar dokument som siffror och möjliggör semantisk sökning", "Intric använder RAG för att svara baserat på kommunens egna dokument"],
    },
  },
  {
    id: "les-2-1-3-2", moduleId: "mod-2-1-3", title: "Semantisk sökning i praktiken", order: 2, estimatedMinutes: 6, type: "reading",
    conceptIds: ["semantisk-sokning"],
    content: {
      hook: "Har du någonsin sökt efter ett dokument men inte hittat det för att du använde 'fel' ord? Semantisk sökning löser det — den förstår vad du menar.",
      sections: [
        { heading: "Nyckelordssökning vs. semantisk sökning", text: "Traditionell sökning matchar exakta ord. Söker du 'bygglöv handläggningstid' hittar den bara dokument med just de orden. Semantisk sökning förstår betydelsen — den hittar även dokument som handlar om 'väntetider för bygglovsärenden' eller 'handläggningstider enligt PBL'.", icon: "Search" },
        { heading: "Hur det fungerar med RAG", text: "1. Du ställer en fråga\n2. Frågan omvandlas till en embedding (vektor)\n3. Vektordatabasen hittar de mest liknande dokumentstyckena\n4. LLM:en läser dessa stycken + din fråga\n5. Du får ett svar grundat i organisationens kunskap", icon: "Workflow" },
      ],
      municipalExample: { title: "Sökning som förstår", description: "En medarbetare frågar Intric: 'Hur ska vi hantera klagomål?' Även om inget dokument innehåller exakt det uttrycket, hittar semantisk sökning kommunens synpunktshanteringsrutin, klagomålspolicy och kvalitetsdokument — för att betydelsen matchar.", department: "Kvalitet & verksamhetsstöd", icon: "FileSearch" },
      interactiveElement: { type: "true-false", data: { statement: "Semantisk sökning kräver att du använder exakt samma ord som dokumentet.", isTrue: false, explanation: "Nej! Det är hela poängen — semantisk sökning förstår betydelse, inte exakta ord. Du kan formulera dig fritt." } },
      summary: ["Semantisk sökning förstår betydelse — inte bara exakta ord", "RAG-flödet: fråga → embedding → sökning → LLM-svar", "Gör att AI kan ge relevanta svar även med fritt formulerade frågor"],
    },
  },

  // --- Modul 2.1.4: API:er & integrationer ---
  {
    id: "les-2-1-4-1", moduleId: "mod-2-1-4", title: "Vad är ett API?", order: 1, estimatedMinutes: 7, type: "reading",
    conceptIds: ["api"],
    content: {
      hook: "Varje gång du chattar med Intric, använder Copilot eller ber en AI om hjälp — sker tusentals API-anrop i bakgrunden. Men vad är egentligen ett API?",
      funFact: "Över 80% av all webbtrafik idag går via API:er. Din telefon gör hundratals API-anrop bara genom att öppna en app.",
      sections: [
        { heading: "API = Digital beställningsdisk", text: "API (Application Programming Interface) är ett standardiserat sätt för program att prata med varandra. Tänk på det som en restaurangmeny: du beställer (request), köket lagar maten (processing), och servitören levererar (response). Du behöver inte veta hur köket fungerar.", analogy: "Ett API är som en beställningsdisk: du säger vad du vill ha, någon annan gör jobbet, och du får resultatet tillbaka. Du behöver inte veta hur det görs — bara vad du kan beställa.", icon: "Plug" },
        { heading: "AI-API:er", text: "OpenAI, Anthropic (Claude) och Google erbjuder alla API:er. Intric använder dessa API:er i bakgrunden — du chattar med Intric, Intric skickar din fråga till en LLM via API, och svaret kommer tillbaka. API:er möjliggör också integrationer: att koppla AI till andra system.", icon: "Link" },
      ],
      municipalExample: { title: "API:er i kommunens system", description: "Intric använder API:er för att koppla till språkmodeller (Claude, GPT), vektordatabaser och kommunens dokument. I framtiden kan API:er koppla AI till ärendehanteringssystem, intranät eller e-tjänster.", department: "IT", icon: "Network" },
      interactiveElement: { type: "match", data: [{ term: "API", definition: "Standardiserat gränssnitt mellan system" }, { term: "Request", definition: "Förfrågan som skickas till API:et" }, { term: "Response", definition: "Svar som returneras från API:et" }, { term: "Integration", definition: "Koppling mellan två system via API" }] },
      summary: ["API = standardiserat sätt för program att kommunicera", "Intric använder AI-API:er (Claude, GPT) i bakgrunden", "API:er möjliggör integrationer med andra system"],
    },
  },
  {
    id: "les-2-1-4-2", moduleId: "mod-2-1-4", title: "Webhooks och framtidens kopplingar", order: 2, estimatedMinutes: 6, type: "reading",
    conceptIds: ["webhook"],
    content: {
      hook: "Med API:er frågar du systemet. Med webhooks berättar systemet för dig — automatiskt, i realtid. Det är skillnaden mellan att ringa och att bli uppringd.",
      sections: [
        { heading: "Webhooks — automatiska notifieringar", text: "En webhook är en URL som tar emot data automatiskt när något händer. Istället för att konstant fråga 'har det hänt något?' (polling) får du ett meddelande direkt: 'Nytt ärende inkommet', 'Dokument uppdaterat', 'AI-analys klar'.", analogy: "API = du ringer pizzerian och frågar om din beställning är klar. Webhook = pizzerian ringer DIG när pizzan är klar. Webhook är effektivare.", icon: "Bell" },
        { heading: "AI-integrationer i framtiden", text: "Med webhooks och API:er kan AI-system kopplas in i befintliga arbetsflöden: ett nytt ärende triggar automatisk kategorisering, en färdig mötesanteckning skickas till rätt kanal, ett uppdaterat dokument uppdaterar assistentens kunskap. Automatisering — inte bara chatt.", icon: "Workflow" },
      ],
      municipalExample: { title: "Framtidens arbetsflöde", description: "Scenariot: ett medborgarförslag inkommer via e-tjänst → webhook triggar Intric → AI kategoriserar ärendet och föreslår ansvarig enhet → handläggaren får en notis med AI-sammanfattning. Allt automatiskt.", department: "Kommunledning", icon: "Sparkles" },
      interactiveElement: { type: "true-false", data: { statement: "En webhook skickar data automatiskt när en händelse inträffar, utan att man behöver fråga.", isTrue: true, explanation: "Rätt! Det är precis vad en webhook gör — push-baserad kommunikation istället för polling." } },
      summary: ["Webhooks skickar data automatiskt vid händelser — ingen polling behövs", "API:er + webhooks möjliggör automatiserade AI-arbetsflöden", "Framtidens kommun-AI: ärendehantering, kategorisering och notiser automatiskt"],
    },
  },

  // =========================================================================
  // KURS 2.2 — Intric — bygg din egen assistent
  // =========================================================================

  // --- Modul 2.2.1: Spaces & assistenter ---
  {
    id: "les-2-2-1-1", moduleId: "mod-2-2-1", title: "Spaces — din arbetsyta", order: 1, estimatedMinutes: 7, type: "reading",
    conceptIds: ["intric-space", "sakerhetsklasser"],
    content: {
      hook: "I Nivå 1 lärde du dig använda Intric. Nu ska du bli skapare. Första steget: förstå spaces — arbetsytor där du bygger och organiserar dina AI-assistenter.",
      sections: [
        { heading: "Vad är ett space?", text: "Ett space i Intric är en avgränsad arbetsyta. Tänk på det som en projektmapp. I ett space kan du skapa assistenter, ladda upp kunskap (dokument) och hantera vem som har åtkomst. Du kan ha ett space för 'HR-frågor', ett för 'Bygglov' och ett för 'Allmänna frågor'.", icon: "FolderOpen" },
        { heading: "Säkerhetsklasser", text: "Intric har säkerhetsklasser som styr vilka data som får användas. Klass 1 (öppen) = ingen känslig info. Klass 2 (intern) = interna dokument. Klass 3 (konfidentiell) = känslig data med extra skydd. Välj rätt klass baserat på innehållet.", icon: "Shield" },
      ],
      municipalExample: { title: "Organisera med spaces", description: "Kommunens Intric kan ha spaces som: 'HR-assistenten' (Klass 2, interna policyer), 'Invånarservice' (Klass 1, öppen info), 'Socialtjänst FAQ' (Klass 2, interna rutiner). Varje space har sin egen kunskap och sina egna behörigheter.", department: "IT & alla förvaltningar", icon: "Building2" },
      interactiveElement: { type: "multi-choice", data: { question: "Vilken säkerhetsklass passar för en assistent som svarar på frågor om interna HR-policyer?", options: ["Klass 1 — öppen info", "Klass 2 — intern info", "Klass 3 — konfidentiell", "Det spelar ingen roll"], correctIndex: 1, explanation: "Interna policyer som inte är offentliga men heller inte sekretessbelagda = Klass 2." } },
      summary: ["Ett space = en arbetsyta med egna assistenter, kunskap och behörigheter", "Säkerhetsklasser (1–3) styr vilken typ av data som får hanteras", "Organisera spaces efter verksamhetsområde eller användningsfall"],
    },
  },
  {
    id: "les-2-2-1-2", moduleId: "mod-2-2-1", title: "Skapa din första assistent", order: 2, estimatedMinutes: 7, type: "reading",
    conceptIds: ["intric-assistent"],
    content: {
      hook: "Nu skapar vi din första assistent — en AI som svarar på frågor utifrån just de dokument och instruktioner du ger den.",
      sections: [
        { heading: "Steg för steg", text: "1. **Gå till ditt space** i Intric\n2. **Klicka 'Ny assistent'**\n3. **Ge den ett namn** — t.ex. 'HR-assistenten' eller 'Bygglov FAQ'\n4. **Välj modell** — större modell = bättre kvalitet, långsammare + dyrare\n5. **Skriv en systemprompt** — instruktioner för hur assistenten ska bete sig\n6. **Koppla kunskapskällor** — dokument den ska kunna svara utifrån", icon: "Plus" },
        { heading: "Systemprompt — assistentens personlighet", text: "Systempromten är det viktigaste. Den styr assistentens beteende, ton och begränsningar. Utan en bra systemprompt beter sig assistenten generiskt. Med en bra systemprompt blir den en specialist.", analogy: "Systempromten är som en jobbeskrivning för en nyanställd. Utan den vet personen inte vad den ska göra, vilken ton den ska ha eller vilka gränser som gäller.", icon: "FileText" },
      ],
      municipalExample: { title: "Exempel på systemprompt", description: "\"Du är HR-assistenten för Katrineholms kommun. Svara alltid baserat på kommunens interna policyer. Var professionell, vänlig och tydlig. Om du inte hittar svar i dokumenten, säg det istället för att gissa. Hänvisa alltid till relevant policy.\"", department: "HR", icon: "Bot" },
      interactiveElement: { type: "fill-blank", data: { sentence: "Systempromten styr assistentens ___, ton och begränsningar.", correctAnswer: "beteende", distractors: ["hastighet", "språk", "färg"] } },
      summary: ["Skapa en assistent i 6 steg: space → namn → modell → systemprompt → kunskap", "Systempromten styr assistentens beteende — den viktigaste inställningen", "Utan bra systemprompt = generisk AI. Med bra systemprompt = specialist."],
    },
  },

  // --- Modul 2.2.2: Kunskap & samlingar ---
  {
    id: "les-2-2-2-1", moduleId: "mod-2-2-2", title: "Ladda upp kunskap", order: 1, estimatedMinutes: 7, type: "reading",
    conceptIds: ["intric-kunskap", "intric-samling"],
    content: {
      hook: "En assistent utan kunskap är som en nyanställd utan introduktion. Låt oss ge din assistent tillgång till rätt dokument.",
      sections: [
        { heading: "Kunskapskällor i Intric", text: "Du kan ge din assistent kunskap genom att:\n\n• **Ladda upp filer** — PDF, Word, text (vanligast)\n• **Koppla webbsidor** — URL:er som crawlas automatiskt\n• **Samlingar** — gruppera dokument tematiskt\n\nAlla dokument konverteras till embeddings och lagras i en vektordatabas. Assistenten söker sedan i denna databas för att ge relevanta svar.", icon: "Upload" },
        { heading: "Samlingar — organisera smart", text: "En samling är en grupp relaterade dokument. Du kan ha samlingar som 'Personalpolicyer', 'Bygglovsinformation', 'GDPR-riktlinjer'. En assistent kan kopplas till en eller flera samlingar. Det ger kontroll över vilken kunskap assistenten använder.", icon: "FolderKanban" },
      ],
      municipalExample: { title: "Kunskapsstruktur", description: "HR-assistenten kopplas till samlingarna: 'Anställningsavtal', 'Lönepolicy', 'Arbetsmiljörutiner', 'Friskvårdspolicy'. Bygglov-assistenten kopplas till: 'Plan- och bygglagen', 'Handläggningstider', 'Ansökningsguide'. Varje assistent får precis den kunskap den behöver.", department: "IT + alla förvaltningar", icon: "Database" },
      interactiveElement: { type: "match", data: [{ term: "Kunskapskälla", definition: "Dokument eller webbsida som assistenten kan läsa" }, { term: "Samling", definition: "Gruppering av relaterade dokument" }, { term: "Embedding", definition: "Dokumentets text omvandlad till siffror" }, { term: "Vektordatabas", definition: "Lagring för embeddings som möjliggör sökning" }] },
      summary: ["Ladda upp filer eller koppla webbsidor som kunskapskällor", "Samlingar grupperar dokument — ger kontroll över assistentens kunskap", "All kunskap konverteras till embeddings för semantisk sökning"],
    },
  },
  {
    id: "les-2-2-2-2", moduleId: "mod-2-2-2", title: "Webbcrawling och uppdatering", order: 2, estimatedMinutes: 6, type: "reading",
    conceptIds: ["webbcrawling"],
    content: {
      hook: "Vad händer om kommunens webbsida uppdateras? Ska du manuellt ladda upp dokument varje gång? Nej — webbcrawling löser det.",
      sections: [
        { heading: "Automatisk webbcrawling", text: "Intric kan kopplas till webbsidor och automatiskt 'crawla' (läsa in) innehållet. Om en sida uppdateras kan du schemalägga re-crawling. Perfekt för FAQ-sidor, riktlinjer och information som uppdateras regelbundet.", icon: "Globe" },
        { heading: "Håll kunskapen aktuell", text: "Tips för att hålla assistentens kunskap fräsch:\n\n• **Granska regelbundet** — ta bort föråldrade dokument\n• **Namnge tydligt** — 'Resepolicy_2025.pdf' inte 'dokument3.pdf'\n• **Schemalägga crawling** — för webbsidor som ändras ofta\n• **Testa efter uppdatering** — ställ kontrollfrågor till assistenten", icon: "RefreshCw" },
      ],
      municipalExample: { title: "Automatiserad kunskap", description: "Kommunens 'Invånarservice'-assistent crawlar katrineholms.se automatiskt var vecka. När nya nyheter eller uppdaterad information publiceras, vet assistenten om det inom en vecka utan manuell insats.", department: "Kommunikation", icon: "Newspaper" },
      interactiveElement: { type: "true-false", data: { statement: "Webbcrawling innebär att Intric automatiskt kan läsa in och uppdatera kunskap från webbsidor.", isTrue: true, explanation: "Rätt! Webbcrawling läser in innehåll från webbsidor automatiskt, vilket håller assistentens kunskap aktuell." } },
      summary: ["Webbcrawling hämtar automatiskt innehåll från webbsidor", "Schemalägg crawling för sidor som uppdateras ofta", "Granska och namnge dokument tydligt — garbage in, garbage out"],
    },
  },

  // --- Modul 2.2.3: Promptdesign för assistenter ---
  {
    id: "les-2-2-3-1", moduleId: "mod-2-2-3", title: "Skriv effektiva systemprompts", order: 1, estimatedMinutes: 7, type: "reading",
    conceptIds: ["systemprompt"],
    content: {
      hook: "I Nivå 1 lärde du dig skriva bra prompts som användare. Nu ska du skriva systemprompts — instruktioner som styr AI:ns beteende permanent.",
      sections: [
        { heading: "Systemprompens anatomi", text: "En bra systemprompt har fem delar:\n\n1. **Roll** — Vem är assistenten? ('Du är HR-assistenten...')\n2. **Uppgift** — Vad ska den göra? ('Svara på frågor om...')\n3. **Ton** — Hur ska den låta? ('Professionell, vänlig, tydlig')\n4. **Källor** — Var hittar den svar? ('Basera svar på bifogade dokument')\n5. **Begränsningar** — Vad får den INTE göra? ('Gissa aldrig, säg att du inte vet')", icon: "FileEdit" },
        { heading: "Vanliga misstag", text: "• **För vag**: 'Var hjälpsam' → bättre: 'Svara alltid med max 3 meningar, hänvisa till dokumentnamn'\n• **Inga begränsningar**: utan 'säg att du inte vet' hittar AI:n på svar\n• **Glömd ton**: utan tonanvisning kan assistenten vara opersonlig\n• **För lång**: en systemprompt på 2000 ord äter kontextfönster. Håll den under 500 ord.", icon: "AlertCircle" },
      ],
      municipalExample: { title: "Mall för systemprompt", description: "ROLL: Du är Katrineholms kommuns HR-assistent.\nUPPGIFT: Svara på frågor om anställningsvillkor, policyer och rutiner.\nTON: Professionell, vänlig och tydlig. Skriv kortfattat.\nKÄLLOR: Basera ALLTID svar på bifogade policydokument. Citera dokumentnamn.\nBEGRÄNSNINGAR: Om svaret inte finns i dokumenten, säg 'Jag hittar inte svar på det i våra policyer. Kontakta HR-avdelningen direkt.'", department: "Alla", icon: "FileText" },
      interactiveElement: { type: "fill-blank", data: { sentence: "De fem delarna av en systemprompt är: roll, uppgift, ton, källor och ___.", correctAnswer: "begränsningar", distractors: ["lösenord", "hastighet", "typsnitt"] } },
      summary: ["Systemprompt = roll + uppgift + ton + källor + begränsningar", "Var specifik, inte vag — 'max 3 meningar' slår 'var kort'", "Sätt alltid begränsningar — annars hittar AI:n på svar"],
    },
  },
  {
    id: "les-2-2-3-2", moduleId: "mod-2-2-3", title: "Chain-of-thought och avancerade tekniker", order: 2, estimatedMinutes: 6, type: "reading",
    conceptIds: ["promptteknik"],
    content: {
      hook: "Du kan göra din assistent dramatiskt bättre med ett enkelt tillägg i systempromten: 'Tänk steg för steg innan du svarar.'",
      sections: [
        { heading: "Chain-of-thought i systemprompts", text: "Chain-of-thought innebär att instruera AI:n att resonera innan den svarar. I en systemprompt kan du skriva: 'Innan du svarar, identifiera: 1) Vilken fråga ställs? 2) Vilka dokument är relevanta? 3) Finns svaret i dokumenten? Presentera sedan svaret.' Det ger mer genomtänkta svar.", icon: "ListOrdered" },
        { heading: "Few-shot examples", text: "En annan kraftfull teknik: ge exempel i systempromten.\n\n**Fråga:** 'Hur många semesterdagar har jag?'\n**Bra svar:** 'Enligt Kommunals kollektivavtal har du 25–31 semesterdagar beroende på ålder (se Semesterpolicy 2025, s.3).'\n\nMed 2–3 sådana exempel lär sig assistenten formatet.", icon: "Copy" },
      ],
      municipalExample: { title: "Prompt-optimering", description: "Bygglov-assistenten förbättrades dramatiskt genom att lägga till: 'Svara alltid med: 1) Kort svar (1 mening), 2) Relevant lagtext/policy, 3) Nästa steg för den som frågar.' Svaren gick från vaga till konkreta och handlingsbara.", department: "Samhällsbyggnad", icon: "Wand2" },
      interactiveElement: { type: "multi-choice", data: { question: "Vad gör chain-of-thought i en systemprompt?", options: ["Gör AI:n snabbare", "Instruerar AI:n att resonera steg för steg", "Översätter automatiskt", "Minskar tokenförbrukningen"], correctIndex: 1, explanation: "Chain-of-thought instruerar AI:n att bryta ner problemet i steg, vilket ger bättre och mer genomtänkta svar." } },
      summary: ["Chain-of-thought: 'tänk steg för steg' ger bättre resonerande svar", "Few-shot examples: visa assistenten hur bra svar ser ut", "Iterera — testa, justera systempromten, testa igen"],
    },
  },

  // --- Modul 2.2.4: Testa, iterera & dela ---
  {
    id: "les-2-2-4-1", moduleId: "mod-2-2-4", title: "Testa din assistent", order: 1, estimatedMinutes: 6, type: "reading",
    conceptIds: ["intric-widget"],
    content: {
      hook: "Du har byggt din assistent. Men hur vet du att den faktiskt fungerar bra? Systematisk testning gör skillnaden mellan en okej och en bra assistent.",
      sections: [
        { heading: "Testprotokoll i 4 steg", text: "1. **Grundfrågor** — frågor den definitivt ska kunna svara på (baserat på uppladdade dokument)\n2. **Kantfall** — frågor utanför scope. Säger den 'jag vet inte'?\n3. **Felaktiga antaganden** — frågor med fel premiss. Korrigerar den?\n4. **Tonfallstest** — låter den professionell? Är svaren lagom långa?", icon: "TestTube" },
        { heading: "Widget — dela din assistent", text: "När assistenten är redo kan du skapa en widget — en inbäddningsbar chatt som kan placeras på intranätet, i en app eller på en webbsida. Widgets har sin egen URL och kan delas med specifika grupper.", icon: "ExternalLink" },
      ],
      municipalExample: { title: "Testning i praktiken", description: "HR-assistenten testades med: 'Hur lång är uppsägningstiden?' (grund), 'Kan du boka en restaurang?' (kantfall), 'Stämmer det att vi har 40 semesterdagar?' (felaktig premiss), 'Berätta om semesterlagen' (tonfall). Resultatet ledde till 3 justeringar i systempromten.", department: "HR + IT", icon: "ClipboardCheck" },
      interactiveElement: { type: "true-false", data: { statement: "Det räcker att testa assistenten med 2-3 frågor innan man publicerar den.", isTrue: false, explanation: "Nej! Systematisk testning med grundfrågor, kantfall, felaktiga premisser och tonfall krävs för en pålitlig assistent." } },
      summary: ["Testa med grundfrågor, kantfall, felaktiga premisser och tonfallsfrågor", "En widget gör assistenten tillgänglig via URL eller inbäddning", "Minst 10-15 testfrågor innan publicering"],
    },
  },
  {
    id: "les-2-2-4-2", moduleId: "mod-2-2-4", title: "Iterera och förbättra", order: 2, estimatedMinutes: 6, type: "reading",
    conceptIds: ["intric-mallar"],
    content: {
      hook: "De bästa assistenterna byggs inte på en dag. De förbättras iterativt — baserat på verklig användning och feedback.",
      sections: [
        { heading: "Feedback-loopen", text: "1. **Lansera** — publicera assistenten för en liten grupp\n2. **Samla feedback** — vad funkar? Vad saknas? Vilka frågor klarar den inte?\n3. **Förbättra** — justera systemprompt, lägg till kunskap, fixa luckor\n4. **Bredda** — när kvaliteten är god, öppna för fler användare\n\nDen här loopen tar aldrig slut — assistenten ska alltid bli bättre.", icon: "RefreshCw" },
        { heading: "Mallar för återanvändning", text: "Intric stödjer mallar. När du byggt en bra assistent kan du spara konfigurationen som en mall och återanvända den för liknande behov. 'HR-assistent'-mallen kan snabbt anpassas till 'Ekonomi-assistent' med nya dokument men samma promptstruktur.", icon: "Copy" },
      ],
      municipalExample: { title: "Från pilot till produktion", description: "Socialtjänstens FAQ-assistent startade med 5 testanvändare i 2 veckor. 23 feedbackpunkter ledde till 8 promptjusteringar och 4 nya dokument. Därefter breddinfördes den för alla 120 medarbetare med 94% nöjdhet.", department: "Socialtjänsten", icon: "TrendingUp" },
      interactiveElement: { type: "fill-blank", data: { sentence: "Feedback-loopen för assistenter: lansera → samla feedback → ___ → bredda.", correctAnswer: "förbättra", distractors: ["ta bort", "ignorera", "starta om"] } },
      summary: ["Assistenter förbättras iterativt — lansera, samla feedback, förbättra, bredda", "Starta med en pilotgrupp innan breddinförande", "Spara bra konfigurationer som mallar för återanvändning"],
    },
  },

  // =========================================================================
  // KURS 2.3 — Copilot & Microsoft 365
  // =========================================================================

  // --- Modul 2.3.1: Copilot förklarat ---
  {
    id: "les-2-3-1-1", moduleId: "mod-2-3-1", title: "Vad är Microsoft Copilot?", order: 1, estimatedMinutes: 7, type: "reading",
    conceptIds: ["copilot-begrepp", "microsoft-graph"],
    content: {
      hook: "Microsoft har lagt in AI i varje del av Office 365. Copilot kan nu läsa dina mejl, sammanfatta möten och skriva rapporter — direkt inne i de verktyg du redan använder.",
      funFact: "Microsoft investerade 13 miljarder dollar i OpenAI. Copilot bygger på GPT-4 och har tillgång till all data i din Microsoft 365-miljö via Microsoft Graph.",
      sections: [
        { heading: "Copilot = AI + dina data", text: "Microsoft Copilot kombinerar en kraftfull LLM (GPT-4) med dina data via Microsoft Graph — mejl, filer, kalendrar, Teams-chattar. Det betyder att Copilot kan svara på frågor som: 'Vad beslutades på förra veckmötet?' eller 'Sammanfatta mejlkonversationen med leverantören.'", icon: "Laptop" },
        { heading: "Var finns Copilot?", text: "Copilot finns inbyggt i:\n• **Word** — skriv, sammanfatta, omformulera\n• **Excel** — analysera data, skapa formler\n• **PowerPoint** — skapa presentationer från dokument\n• **Teams** — sammanfatta möten i realtid\n• **Outlook** — skriva och sammanfatta mejl\n• **Copilot Chat** — fristående chat med tillgång till allt", icon: "Grid" },
      ],
      municipalExample: { title: "Copilot på kommunen", description: "Katrineholms kommun har Copilot-licenser för utvalda medarbetare. Om du har licens ser du Copilot-ikonen direkt i Word, Excel, Teams och Outlook. Ingen separat app behövs — det är redan integrerat.", department: "IT", icon: "Monitor" },
      interactiveElement: { type: "multi-choice", data: { question: "Vad skiljer Copilot från ChatGPT?", options: ["Copilot är gratis", "Copilot har tillgång till dina Microsoft 365-data", "Copilot är snabbare", "Det finns ingen skillnad"], correctIndex: 1, explanation: "Copilots unika styrka är integrationen med Microsoft Graph — det kan läsa dina mejl, filer och möten." } },
      summary: ["Copilot = GPT-4 + dina Microsoft 365-data via Microsoft Graph", "Finns inbyggt i Word, Excel, PowerPoint, Teams, Outlook", "Kräver Copilot-licens — kontakta IT om du är intresserad"],
    },
  },
  {
    id: "les-2-3-1-2", moduleId: "mod-2-3-1", title: "Copilot-licens och säkerhet", order: 2, estimatedMinutes: 6, type: "reading",
    conceptIds: ["copilot-licens"],
    content: {
      hook: "Copilot är kraftfullt — men det väcker också frågor. Vem kan se vad? Läser Microsoft mina mejl? Här klargör vi.",
      sections: [
        { heading: "Licens och åtkomst", text: "Copilot kräver en separat licens utöver vanliga Microsoft 365. Utan licens syns inte Copilot-funktionerna. Licensen kostar per användare och månad. Kommunens IT-avdelning bestämmer vem som får licens.", icon: "Key" },
        { heading: "Säkerhet och integritet", text: "Copilot respekterar existerande behörigheter. Du ser bara data du redan har åtkomst till. Dina data används INTE för att träna AI-modellen. All bearbetning sker inom Microsofts EU-datacenter (för EU-kunder). GDPR-krav uppfylls.", icon: "Shield" },
      ],
      municipalExample: { title: "Behörigheter i praktiken", description: "Om du inte har åtkomst till ekonomiavdelningens filer i SharePoint, kan Copilot inte heller läsa dem åt dig. Det är samma behörighetssystem — Copilot är inte en bakdörr. Kontakta IT-avdelningen om du vill ansöka om Copilot-licens.", department: "IT", icon: "Lock" },
      interactiveElement: { type: "true-false", data: { statement: "Copilot kan visa data som du normalt inte har behörighet att se.", isTrue: false, explanation: "Nej! Copilot respekterar existerande behörigheter. Du kan bara se data du redan har åtkomst till." } },
      summary: ["Copilot kräver separat licens — kontakta IT", "Respekterar existerande behörigheter — ingen bakdörr", "Data används inte för träning, bearbetas inom EU"],
    },
  },

  // --- Modul 2.3.2: Copilot i Word, Excel & PowerPoint ---
  {
    id: "les-2-3-2-1", moduleId: "mod-2-3-2", title: "Copilot i Word", order: 1, estimatedMinutes: 7, type: "reading",
    conceptIds: ["copilot-word"],
    content: {
      hook: "Att starta med ett tomt dokument är det svåraste. Med Copilot i Word behöver du aldrig börja från noll igen.",
      sections: [
        { heading: "Vad Copilot kan göra i Word", text: "• **Skriva utkast** — 'Skriv ett PM om de nya parkeringsreglerna baserat på detta beslut'\n• **Sammanfatta** — markera text och be Copilot sammanfatta\n• **Omformulera** — 'Gör denna text mer lättläst' eller 'Mer formell'\n• **Förlänga/korta** — 'Expandera detta stycke' eller 'Korta ner till hälften'\n• **Skapa utifrån annat** — 'Skriv ett PM baserat på detta Excel-ark'", icon: "FileText" },
        { heading: "Tips för bästa resultat", text: "• Ge kontext: 'Skriv ett informationsbrev till invånare om...' slår 'Skriv något'\n• Referera till filer: Copilot kan hämta innehåll från andra Office-dokument\n• Iterera: Säg 'Gör det kortare' eller 'Ändra tonen till mer formell'\n• Granska ALLTID: Copilot skriver utkast — du godkänner", icon: "Lightbulb" },
      ],
      municipalExample: { title: "Copilot i Word på jobbet", description: "En handläggare behöver skriva ett tjänsteutlåtande. Prompten: 'Skriv ett tjänsteutlåtande baserat på bifogat beslutsunderlag. Följ kommunens mall för tjänsteutlåtanden. Max 2 sidor.' Resultat: utkast på 30 sekunder istället för 2 timmar.", department: "Alla förvaltningar", icon: "PenTool" },
      interactiveElement: { type: "match", data: [{ term: "Skriv utkast", definition: "Copilot skapar ny text från instruktioner" }, { term: "Sammanfatta", definition: "Copilot kortar ner markerad text" }, { term: "Omformulera", definition: "Copilot ändrar ton eller komplexitet" }, { term: "Skapa från annan fil", definition: "Copilot hämtar innehåll från Excel/PowerPoint" }] },
      summary: ["Copilot i Word: skriva utkast, sammanfatta, omformulera, förlänga/korta", "Ge kontext, referera till filer, iterera — och granska ALLTID", "Kan hämta innehåll från andra Office-dokument som källa"],
    },
  },
  {
    id: "les-2-3-2-2", moduleId: "mod-2-3-2", title: "Copilot i Excel & PowerPoint", order: 2, estimatedMinutes: 7, type: "reading",
    conceptIds: ["copilot-excel", "copilot-powerpoint"],
    content: {
      hook: "Excel-formler som tar 20 minuter att googla? Copilot skriver dem på 5 sekunder. Presentationer som tar en förmiddag? 30 sekunder.",
      sections: [
        { heading: "Copilot i Excel", text: "• **Analysera data** — 'Vilken avdelning hade högst kostnad Q3?'\n• **Skapa formler** — 'Räkna ut genomsnittlig handläggningstid'\n• **Skapa diagram** — 'Gör ett stapeldiagram av detta'\n• **Hitta mönster** — 'Finns det trender i sjukfrånvaron?'\n\nKrav: data måste vara i tabellformat (Infoga → Tabell) och filen måste vara sparad i OneDrive/SharePoint.", icon: "Table" },
        { heading: "Copilot i PowerPoint", text: "• **Skapa presentation** — 'Skapa en presentation från detta Word-dokument'\n• **Lägg till bild** — 'Hitta en relevant bild till denna slide'\n• **Omorganisera** — 'Gör detta till 5 slides istället för 10'\n• **Talarpunkter** — 'Lägg till talarpunkter till varje slide'\n\nCopilot förstår innehållet och skapar visuellt tilltalande slides automatiskt.", icon: "Presentation" },
      ],
      municipalExample: { title: "Snabb dataanalys", description: "Ekonomiavdelningen har ett Excel-ark med 10 000 rader budgetdata. Prompt: 'Jämför utfall mot budget per förvaltning och markera avvikelser över 5%.' Resultat: färgkodad tabell + diagram på 15 sekunder.", department: "Ekonomi", icon: "BarChart3" },
      interactiveElement: { type: "multi-choice", data: { question: "Vad krävs för att Copilot ska fungera i Excel?", options: ["Inget särskilt", "Data i tabellformat, fil sparad i OneDrive/SharePoint", "Minst 1000 rader data", "Att man skriver formler manuellt först"], correctIndex: 1, explanation: "Data måste vara formaterat som en tabell och filen sparad i molnet (OneDrive/SharePoint) för att Copilot ska kunna analysera den." } },
      summary: ["Excel: analysera data, skapa formler och diagram, hitta mönster", "PowerPoint: skapa presentationer från dokument, omorganisera, talarpunkter", "Krav: tabellformat i Excel, OneDrive/SharePoint för alla"],
    },
  },

  // --- Modul 2.3.3: Copilot i Teams & Outlook ---
  {
    id: "les-2-3-3-1", moduleId: "mod-2-3-3", title: "Copilot i Teams", order: 1, estimatedMinutes: 7, type: "reading",
    conceptIds: ["copilot-teams"],
    content: {
      hook: "Missade du ett möte? Copilot i Teams kan ge dig en komplett sammanfattning — inklusive beslut, åtgärdspunkter och vem som sa vad.",
      sections: [
        { heading: "Under mötet", text: "Med Copilot aktivt under ett Teams-möte kan du:\n• **Sammanfatta hittills** — 'Vad har diskuterats hittills?'\n• **Fånga åtgärder** — 'Vilka beslut har fattats?'\n• **Ställ frågor** — 'Vad sa Anna om budgeten?'\n\nAllt i realtid, utan att störa mötet.", icon: "Video" },
        { heading: "Efter mötet", text: "• **Mötessammanfattning** — automatisk sammanfattning med rubriker\n• **Åtgärdspunkter** — lista med vad som ska göras och av vem\n• **Sökbar transkription** — hela mötet som sökbar text\n• **Dela** — skicka sammanfattningen till deltagarna\n\nKrav: mötet måste spelas in eller transkriberas.", icon: "ClipboardList" },
      ],
      municipalExample: { title: "Aldrig missa ett möte", description: "Kommunstyrelsens veckomöte (60 min) sammanfattas automatiskt: 3 beslut fattades, 5 åtgärdspunkter med ansvariga, och en komplett transkription. Allt tillgängligt 30 sekunder efter att mötet avslutats.", department: "Kommunstyrelsen", icon: "Calendar" },
      interactiveElement: { type: "fill-blank", data: { sentence: "För att Copilot ska kunna sammanfatta ett Teams-möte måste mötet ___ eller transkriberas.", correctAnswer: "spelas in", distractors: ["vara kort", "ha max 5 deltagare", "vara på engelska"] } },
      summary: ["Under mötet: sammanfatta, fånga beslut, ställ frågor i realtid", "Efter mötet: automatisk sammanfattning, åtgärdspunkter, sökbar text", "Krav: mötet måste spelas in eller transkriberas"],
    },
  },
  {
    id: "les-2-3-3-2", moduleId: "mod-2-3-3", title: "Copilot i Outlook", order: 2, estimatedMinutes: 6, type: "reading",
    conceptIds: ["copilot-outlook"],
    content: {
      hook: "Du har 47 olästa mejl en måndagmorgon. Med Copilot kan du hantera dem på en bråkdel av tiden.",
      sections: [
        { heading: "Mejlhantering med AI", text: "• **Sammanfatta tråd** — 'Sammanfatta denna mejlkonversation' (perfekt för långa trådar)\n• **Skriva svar** — 'Skriv ett professionellt svar som tackar ja till mötet'\n• **Tona om** — 'Gör detta svar mer formellt' eller 'Mer vänligt'\n• **Skriva från scratch** — 'Skriv ett mejl till leverantören om försening'", icon: "Mail" },
        { heading: "Smart prioritering", text: "Copilot kan hjälpa dig prioritera din inkorg genom att identifiera vilka mejl som kräver svar, vilka som är informativa och vilka som kan arkiveras. Be Copilot: 'Vilka mejl behöver jag agera på idag?'", icon: "ListChecks" },
      ],
      municipalExample: { title: "Mejl på halva tiden", description: "En enhetschef fick 23 mejl under semestern. Med Copilot: sammanfattade 5 långa mejltrådar (2 min), skrev 8 svar med rätt ton (5 min), identifierade 3 brådskande ärenden. Total tid: 15 min istället för 60+ min.", department: "Alla", icon: "Clock" },
      interactiveElement: { type: "true-false", data: { statement: "Copilot i Outlook kan sammanfatta långa mejltrådar med flera deltagare.", isTrue: true, explanation: "Ja! Det är en av Copilots starkaste funktioner — den kan sammanfatta hela mejlkonversationer och lyfta ut beslut och frågor." } },
      summary: ["Sammanfatta mejltrådar, skriv svar, tona om — allt direkt i Outlook", "Smart prioritering: 'Vilka mejl behöver jag agera på idag?'", "Granska alltid AI-genererade mejl innan du skickar"],
    },
  },

  // --- Modul 2.3.4: Copilot Studio & anpassning ---
  {
    id: "les-2-3-4-1", moduleId: "mod-2-3-4", title: "Copilot Studio", order: 1, estimatedMinutes: 7, type: "reading",
    conceptIds: ["copilot-studio"],
    content: {
      hook: "Vill du bygga en AI-agent som automatiskt besvarar FAQ, hanterar ärendeflöden eller hjälper nya medarbetare? Copilot Studio gör det möjligt — utan kodning.",
      sections: [
        { heading: "Vad är Copilot Studio?", text: "Copilot Studio (tidigare Power Virtual Agents) låter dig bygga anpassade AI-agenter. Till skillnad från vanlig Copilot i Office, kan en Studio-agent:\n• Svara på specifika frågor baserat på egna datakällor\n• Utföra uppgifter (boka möten, skapa ärenden)\n• Integreras med Power Automate för arbetsflöden\n• Publiceras på webbsidor, Teams och andra kanaler", icon: "Wrench" },
        { heading: "Low-code — ingen programmering", text: "Copilot Studio är byggt för icke-tekniska användare. Du definierar ämnen (topics), kopplar datakällor och testar i ett visuellt gränssnitt. Det är 'low-code' — du klickar och konfigurerar istället för att programmera.", icon: "MousePointer" },
      ],
      municipalExample: { title: "FAQ-bot för invånare", description: "Kommunen kan bygga en FAQ-bot i Copilot Studio som svarar på vanliga invånarfrågor: 'Hur söker jag bygglov?', 'Var lämnar jag grovsopor?', 'När öppnar biblioteket?' Boten kopplas till kommunens webbsida och Teams.", department: "Kommunikation + IT", icon: "MessageCircle" },
      interactiveElement: { type: "multi-choice", data: { question: "Vad är Copilot Studios största fördel?", options: ["Det är gratis", "Man kan bygga AI-agenter utan kodning", "Det ersätter alla andra AI-verktyg", "Det fungerar offline"], correctIndex: 1, explanation: "Copilot Studio är low-code — du bygger AI-agenter genom att konfigurera, inte programmera." } },
      summary: ["Copilot Studio = bygg anpassade AI-agenter utan kodning", "Kan svara på frågor, utföra uppgifter och integreras med arbetsflöden", "Publiceras på webben, i Teams eller andra kanaler"],
    },
  },
  {
    id: "les-2-3-4-2", moduleId: "mod-2-3-4", title: "Copilot-agenter och automatisering", order: 2, estimatedMinutes: 6, type: "reading",
    conceptIds: ["copilot-agent"],
    content: {
      hook: "En Copilot-agent kan göra mer än att svara på frågor. Den kan agera — skicka mejl, skapa uppgifter, uppdatera system. Det är AI som gör saker åt dig.",
      sections: [
        { heading: "Från chatt till handling", text: "En Copilot-agent kan kopplas till Power Automate och utföra åtgärder:\n• Användaren frågar: 'Jag behöver boka ett mötesrum'\n• Agenten frågar: 'Vilken dag och tid?'\n• Agenten kontrollerar tillgänglighet via API\n• Agenten bokar rummet och bekräftar", icon: "Play" },
        { heading: "Intric vs. Copilot Studio", text: "Båda är kraftfulla — men olika:\n• **Intric** — bäst för kunskapsbaserade assistenter (RAG, egna dokument, säker datahantering)\n• **Copilot Studio** — bäst för action-baserade agenter (integrationer, arbetsflöden, Microsoft-ekosystemet)\n\nDe kompletterar varandra.", icon: "GitCompare" },
      ],
      municipalExample: { title: "Automatiserad onboarding", description: "En onboarding-agent i Copilot Studio guider nya medarbetare: 'Välkommen! Jag hjälper dig komma igång.' → Genererar IT-ärende för utrustning → Bokar intro-möte med chef → Skickar checklista via mejl → Kopplar till HR-assistenten i Intric för policyfrågor.", department: "HR + IT", icon: "UserPlus" },
      interactiveElement: { type: "match", data: [{ term: "Intric", definition: "Kunskapsbaserade assistenter med RAG" }, { term: "Copilot Studio", definition: "Actionbaserade agenter med integrationer" }, { term: "Power Automate", definition: "Automatiserar arbetsflöden och uppgifter" }, { term: "Copilot-agent", definition: "AI som kan utföra åtgärder, inte bara svara" }] },
      summary: ["Copilot-agenter kan agera — boka, skicka, skapa — inte bara svara", "Intric = kunskapsbaserat, Copilot Studio = actionbaserat", "Tillsammans täcker de de flesta AI-behov i kommunen"],
    },
  },

  // =========================================================================
  // KURS 2.4 — Lagar, regler & etik på djupet
  // =========================================================================

  // --- Modul 2.4.1: AI Act i detalj ---
  {
    id: "les-2-4-1-1", moduleId: "mod-2-4-1", title: "EU:s AI-förordning", order: 1, estimatedMinutes: 7, type: "reading",
    conceptIds: ["ai-act", "ai-act-riskkategorier"],
    content: {
      hook: "Den 1 augusti 2024 trädde EU:s AI Act i kraft — världens första heltäckande AI-lag. Den påverkar alla som utvecklar eller använder AI i EU, inklusive kommuner.",
      funFact: "AI Act tog 3 år att förhandla. Den slutliga texten är 459 sidor lång. Böterna för brott kan uppgå till 35 miljoner euro eller 7% av global omsättning.",
      sections: [
        { heading: "Fyra risknivåer", text: "AI Act kategoriserar AI-system i fyra nivåer:\n\n• **Oacceptabel risk** — Förbjudna. Social poängsättning, manipulativ AI, biometrisk massövervakning.\n• **Hög risk** — Strängt reglerade. AI i rekrytering, kreditbedömning, samhällskritiska system.\n• **Begränsad risk** — Transparenskrav. Chatbotar måste informera att de är AI.\n• **Minimal risk** — Fritt att använda. Spam-filter, stavningskontroll.", icon: "Layers" },
        { heading: "Vad det innebär för kommunen", text: "De flesta AI-verktyg kommunen använder (Intric, Copilot för textskrivning) faller under begränsad eller minimal risk. MEN: om AI används för beslut som påverkar invånare (socialbidrag, bygglov-prioritering, rekrytering) kan det klassas som hög risk — med krav på dokumentation, övervakning och mänsklig kontroll.", icon: "AlertTriangle" },
      ],
      municipalExample: { title: "AI Act i kommunal vardag", description: "Intric för mötessammanfattning = minimal risk (inga krav). AI för att sortera bygglovsansökningar = potentiellt hög risk (kräver riskbedömning, dokumentation och mänsklig kontroll). Det är ANVÄNDNINGEN som avgör risknivån, inte verktyget i sig.", department: "Juridik + IT", icon: "Scale" },
      interactiveElement: { type: "multi-choice", data: { question: "Vad bestämmer risknivån i AI Act?", options: ["Priset på AI-verktyget", "Hur AI:n används och vilken påverkan den har", "Vilket land AI:n utvecklades i", "Hur gammal AI-modellen är"], correctIndex: 1, explanation: "Det är användningen och konsekvenserna som avgör risknivån — inte verktyget i sig." } },
      summary: ["AI Act: fyra risknivåer — oacceptabel, hög, begränsad, minimal", "Användningen avgör risknivån, inte verktyget", "AI som påverkar invånares rättigheter kan klassas som hög risk"],
    },
  },
  {
    id: "les-2-4-1-2", moduleId: "mod-2-4-1", title: "Transparens och högrisk-krav", order: 2, estimatedMinutes: 7, type: "reading",
    conceptIds: ["ai-act-transparenskrav", "hogrisksystem"],
    content: {
      hook: "Om din kommun använder AI för att prioritera ärenden, rekrytera personal eller bedöma risker — kan det vara ett högrisk-system. Här är vad som krävs.",
      sections: [
        { heading: "Transparenskrav", text: "AI Act kräver transparens på flera nivåer:\n• **Användare ska veta** att de interagerar med AI (chatbot-märkning)\n• **AI-genererat innehåll** ska vara märkbart\n• **Deepfakes** måste deklareras\n• **Högrisk-system** kräver detaljerad dokumentation av funktion, data och begränsningar", icon: "Eye" },
        { heading: "Krav för högrisk-system", text: "Om AI-systemet klassas som högrisk krävs:\n1. **Riskhanteringssystem** — identifiera och hantera risker\n2. **Datakvalitet** — säkerställ korrekt och representativ träningsdata\n3. **Dokumentation** — teknisk dokumentation av systemet\n4. **Mänsklig kontroll** — människa ska kunna gripa in\n5. **Cybersäkerhet** — skydd mot manipulation\n6. **Registrering** — i EU:s databas för AI-system", icon: "ClipboardCheck" },
      ],
      municipalExample: { title: "Checklista för nya AI-system", description: "Innan kommunen inför ett nytt AI-system: 1) Bedöm riskkategori, 2) Om hög risk — genomför konsekvensbedömning, 3) Dokumentera syfte, data och begränsningar, 4) Säkerställ mänsklig kontroll, 5) Informera berörda. Ta hjälp av dataskyddsombudet.", department: "Juridik + IT", icon: "ListChecks" },
      interactiveElement: { type: "true-false", data: { statement: "Alla chatbotar måste enligt AI Act informera användaren om att de interagerar med AI.", isTrue: true, explanation: "Ja! AI Act kräver att användare informeras när de interagerar med en AI-chatbot (transparenskrav)." } },
      summary: ["AI Act kräver transparens — användare ska veta att de pratar med AI", "Högrisk-system: krav på riskhantering, dokumentation, mänsklig kontroll", "Kommunen bör bedöma riskkategori INNAN nya AI-system införs"],
    },
  },

  // --- Modul 2.4.2: GDPR & konsekvensbedömning ---
  {
    id: "les-2-4-2-1", moduleId: "mod-2-4-2", title: "DPIA — konsekvensbedömning", order: 1, estimatedMinutes: 7, type: "reading",
    conceptIds: ["dpia", "dataskyddsombud"],
    content: {
      hook: "DPIA låter komplicerat. Men det handlar egentligen om en sak: tänk efter INNAN du inför AI som hanterar personuppgifter.",
      funFact: "DPIA står för Data Protection Impact Assessment. IMY (Integritetsskyddsmyndigheten) har utfärdat sanktionsavgifter på miljontals kronor till organisationer som inte gjort DPIA när de borde.",
      sections: [
        { heading: "Vad är en DPIA?", text: "En konsekvensbedömning (DPIA) är en systematisk analys av hur en ny behandling av personuppgifter påverkar integriteten. Du måste göra en DPIA om:\n• Ny teknik används (som AI)\n• Behandling i stor skala\n• Systematisk övervakning\n• Känsliga uppgifter behandlas\n\nI praktiken: de flesta nya AI-system som berör personuppgifter bör ha en DPIA.", icon: "FileSearch" },
        { heading: "Dataskyddsombudets roll", text: "Kommunens dataskyddsombud (DSO) är din främsta resurs. DSO:n ska:\n• Råda vid DPIA-genomförande\n• Övervaka GDPR-efterlevnad\n• Vara kontaktpunkt mot IMY\n• Informera och utbilda medarbetare\n\nKontakta DSO tidigt — helst innan AI-systemet upphandlas.", icon: "UserCheck" },
      ],
      municipalExample: { title: "DPIA i praktiken", description: "Socialtjänsten ville använda AI för att kategorisera inkommande ärenden. En DPIA visade: personuppgifter behandlas, risk för profilering, känsliga uppgifter involverade. Åtgärder: anonymisering, mänsklig granskning av alla AI-förslag, loggning. DPIA dokumenterades och godkändes av DSO.", department: "Socialtjänsten + juridik", icon: "FileCheck" },
      interactiveElement: { type: "fill-blank", data: { sentence: "En DPIA bör genomföras ___ ett nytt AI-system som hanterar personuppgifter införs.", correctAnswer: "innan", distractors: ["efter", "samtidigt som", "istället för att"] } },
      summary: ["DPIA = konsekvensbedömning innan AI-system med personuppgifter införs", "De flesta nya AI-system som berör persondata bör ha en DPIA", "Kontakta dataskyddsombudet tidigt — helst före upphandling"],
    },
  },
  {
    id: "les-2-4-2-2", moduleId: "mod-2-4-2", title: "Privacy by design och personuppgiftsansvar", order: 2, estimatedMinutes: 6, type: "reading",
    conceptIds: ["privacy-by-design", "personuppgiftsansvarig"],
    content: {
      hook: "Det bästa sättet att skydda personuppgifter? Se till att de aldrig hamnar i AI-systemet från början. Det är kärnan i privacy by design.",
      sections: [
        { heading: "Privacy by design", text: "Privacy by design innebär att integritets­skydd byggs in från start — inte läggs till efteråt:\n• **Minimera data** — samla bara in det som behövs\n• **Anonymisera** — ta bort identifierande information\n• **Begränsa åtkomst** — bara de som behöver, ser\n• **Automatisk radering** — ta bort data som inte längre behövs\n\nFör AI: anonymisera INNAN data skickas till AI:n.", icon: "ShieldCheck" },
        { heading: "Vem är ansvarig?", text: "Kommunen (som organisation) är personuppgiftsansvarig. Det innebär ansvar för att:\n• Rätt laglig grund finns\n• DPIA genomförs vid behov\n• Personuppgiftsbiträdesavtal finns med AI-leverantörer\n• Data hanteras enligt GDPR\n\nIndividuella medarbetare är inte personuppgiftsansvariga — men de ansvarar för att följa kommunens riktlinjer.", icon: "Building2" },
      ],
      municipalExample: { title: "Privacy by design i AI-projektet", description: "Före: medarbetare klistrade in ärenden med personnummer i ChatGPT. Efter: anonymiseringsrutin INNAN AI-användning, standardprompts som påminner om att inte inkludera personuppgifter, Intric (med EU-datahantering) som primärverktyg.", department: "Alla förvaltningar", icon: "Lock" },
      interactiveElement: { type: "multi-choice", data: { question: "Vem är personuppgiftsansvarig när kommunen använder AI?", options: ["Den enskilda medarbetaren", "AI-leverantören", "Kommunen som organisation", "IT-avdelningen"], correctIndex: 2, explanation: "Kommunen som organisation bär personuppgiftsansvaret. Medarbetare ska följa riktlinjerna, men ansvaret ligger hos organisationen." } },
      summary: ["Privacy by design: bygg in skydd från start — anonymisera innan AI", "Kommunen är personuppgiftsansvarig — inte individen, inte leverantören", "Personuppgiftsbiträdesavtal krävs med alla AI-leverantörer"],
    },
  },

  // --- Modul 2.4.3: Etisk AI i offentlig sektor ---
  {
    id: "les-2-4-3-1", moduleId: "mod-2-4-3", title: "AI-etik i praktiken", order: 1, estimatedMinutes: 7, type: "reading",
    conceptIds: ["ai-etik-ramverk", "algoritmisk-rattvisa"],
    content: {
      hook: "Lagar sätter minimikrav. Etik sätter högre krav. Som offentlig sektor förväntas vi inte bara följa lagen — utan agera föredömligt.",
      sections: [
        { heading: "Etiska principer för AI", text: "DIGG och EU har definierat principer för tillförlitlig AI:\n\n1. **Mänsklig kontroll** — människan i centrum\n2. **Robusthet** — system som fungerar pålitligt\n3. **Integritetsskydd** — respektera privatlivet\n4. **Transparens** — förklara hur AI används\n5. **Rättvisa** — undvik diskriminering\n6. **Samhällsnytta** — AI ska göra gott\n7. **Ansvarsutkrävande** — tydligt vem som bär ansvaret", icon: "Heart" },
        { heading: "Algoritmisk rättvisa", text: "AI-system kan omedvetet diskriminera. Om en AI tränats på historisk data där vissa grupper behandlats annorlunda, reproducerar den den orättvisan. I offentlig sektor är detta extra allvarligt — invånare har rätt till likabehandling. Lösning: regelbunden uppföljning av AI:ns resultat, uppdelat på relevanta grupper.", icon: "Scale" },
      ],
      municipalExample: { title: "Etisk checklista", description: "Innan AI används i ett nytt sammanhang: 1) Kan beslutet påverka individer negativt? 2) Finns risk för systematisk snedvridning? 3) Är processen transparent? 4) Kan en berörd person ifrågasätta beslutet? 5) Finns mänsklig kontroll? Om svaret på någon fråga är oklart — stanna och diskutera.", department: "Alla", icon: "CheckSquare" },
      interactiveElement: { type: "true-false", data: { statement: "Det räcker att följa lagen för att använda AI etiskt i offentlig sektor.", isTrue: false, explanation: "Nej! Lagen sätter minimikrav. Som offentlig sektor förväntas vi gå längre — med transparens, rättvisa och samhällsnytta som ledstjärnor." } },
      summary: ["7 etiska principer: kontroll, robusthet, integritet, transparens, rättvisa, nytta, ansvar", "Algoritmisk rättvisa: följ upp AI:ns resultat för att upptäcka snedvridning", "Etik > lag — som offentlig sektor ska vi vara föredömen"],
    },
  },
  {
    id: "les-2-4-3-2", moduleId: "mod-2-4-3", title: "Ansvarsfull AI i organisationen", order: 2, estimatedMinutes: 6, type: "reading",
    conceptIds: ["ansvarsfull-ai"],
    content: {
      hook: "Etik handlar inte bara om principer — det handlar om kultur. Hur bygger man en organisation som använder AI ansvarsfullt?",
      sections: [
        { heading: "Från principer till praktik", text: "1. **Tydliga riktlinjer** — publicera AI-policy som alla kan följa\n2. **Utbildning** — alla som använder AI ska ha grundkunskap (det gör du just nu!)\n3. **Gemensam diskussion** — skapa forum för AI-frågor och dilemman\n4. **Incidenthantering** — ha en plan för när AI ger fel resultat\n5. **Löpande utvärdering** — granska AI-användning regelbundet", icon: "Building2" },
        { heading: "AI-dilemman i vardagen", text: "Etiska frågor dyker upp i vardagen:\n• Ska vi berätta för invånaren att svaret formulerats av AI?\n• Får vi använda AI för att bedöma ansökningar?\n• Hur hanterar vi om AI ger olika svar beroende på hur frågan ställs?\n\nDet finns inte alltid ett rätt svar — men det finns alltid en diskussion att ha.", icon: "MessageSquare" },
      ],
      municipalExample: { title: "AI-etik i organisationen", description: "Katrineholms kommun har AI-riktlinjer som säger: 1) Granska alltid AI:ns output, 2) Berätta när AI använts, 3) Inga personuppgifter i AI utan anonymisering, 4) Rapportera fel och dela lärdomar. Det skapar en kultur av ansvarsfullt användande.", department: "Kommunledning", icon: "Users" },
      interactiveElement: { type: "fill-blank", data: { sentence: "Ansvarsfull AI-användning kräver inte bara teknik och policy, utan också ___.", correctAnswer: "kultur", distractors: ["mer pengar", "fler datorer", "snabbare internet"] } },
      summary: ["Ansvarsfull AI = riktlinjer + utbildning + diskussion + incidenthantering", "Etiska dilemman har sällan ett rätt svar — men de ska diskuteras", "Bygg en kultur där det är okej att ifrågasätta AI:ns resultat"],
    },
  },

  // --- Modul 2.4.4: Upphandling & avtal ---
  {
    id: "les-2-4-4-1", moduleId: "mod-2-4-4", title: "Upphandla AI-tjänster", order: 1, estimatedMinutes: 7, type: "reading",
    conceptIds: ["upphandling-ai"],
    content: {
      hook: "Kommunen kan inte bara 'testa lite ChatGPT'. Att införa AI kräver korrekt upphandling. Här är vad du behöver veta.",
      sections: [
        { heading: "Upphandlingskrav för AI", text: "Vid upphandling av AI-tjänster bör kravspecifikationen inkludera:\n\n• **Datasäkerhet** — var lagras data? EU/EES-krav?\n• **GDPR-efterlevnad** — personuppgiftsbiträdesavtal\n• **Modellkontroll** — vilken modell används? Kan den bytas?\n• **Transparens** — kan leverantören förklara hur AI:n fungerar?\n• **Exit-strategi** — vad händer om vi byter leverantör?\n• **SLA** — tillgänglighet, svarstider, support", icon: "FileText" },
        { heading: "Vanliga fällor", text: "• **Vendor lock-in** — bli inte beroende av en enda leverantör\n• **Oklar datahantering** — fråga explicit: 'Används vår data för träning?'\n• **Dolda kostnader** — tokenförbrukning, API-anrop, lagring\n• **Ingen exit** — säkerställ att data kan exporteras", icon: "AlertTriangle" },
      ],
      municipalExample: { title: "Upphandling av Intric", description: "Katrineholms kommun upphandlade Intric med krav på: svensk leverantör, EU-datacenter, ingen dataträning, personuppgiftsbiträdesavtal, exportmöjlighet, SSO-integration. Resultatet: en trygg plattform med fullständig kontroll.", department: "IT + upphandling", icon: "Gavel" },
      interactiveElement: { type: "multi-choice", data: { question: "Vilken fråga är VIKTIGAST att ställa till en AI-leverantör?", options: ["Hur snabb är tjänsten?", "Används vår data för att träna AI-modellen?", "Hur snygg är gränssnittet?", "Har ni många kunder?"], correctIndex: 1, explanation: "Om leverantören använder din data för träning kan känslig information läcka till andra användares svar. Det är den viktigaste säkerhetsfrågan." } },
      summary: ["Upphandling av AI kräver krav på datasäkerhet, GDPR, transparens och exit", "Fråga alltid: 'Används vår data för träning?'", "Undvik vendor lock-in — säkerställ exportmöjlighet"],
    },
  },
  {
    id: "les-2-4-4-2", moduleId: "mod-2-4-4", title: "Personuppgiftsbiträdesavtal", order: 2, estimatedMinutes: 6, type: "reading",
    conceptIds: ["personuppgiftsbitrade", "databehandlingsavtal"],
    content: {
      hook: "Varje gång en AI-leverantör bearbetar personuppgifter åt kommunen krävs ett personuppgiftsbiträdesavtal. Inga undantag.",
      sections: [
        { heading: "Vad är ett PUB-avtal?", text: "Ett personuppgiftsbiträdesavtal (PUB) reglerar hur leverantören (biträdet) får hantera personuppgifter på kommunens (den ansvariges) uppdrag. Det ska specificera:\n• Vilka personuppgifter som behandlas\n• Syftet med behandlingen\n• Säkerhetsåtgärder\n• Var data lagras\n• Vad som händer vid avtalsslut", icon: "FileSignature" },
        { heading: "Underbiträden", text: "Om din AI-leverantör i sin tur använder en annan tjänst (t.ex. Intric använder OpenAI:s API), är OpenAI ett underbiträde. PUB-avtalet ska reglera även detta:\n• Vilka underbiträden finns?\n• Var finns de geografiskt?\n• Godkänner kommunen dessa?\n\nTransparens hela vägen ner.", icon: "GitFork" },
      ],
      municipalExample: { title: "PUB-avtal med Intric", description: "Kommunens PUB-avtal med Intric specificerar: data lagras i EU, OpenAI (via Azure EU) är godkänt underbiträde, data raderas vid avtalsslut, incidentrapportering inom 24h, årlig säkerhetsrevision. Utan detta avtal får kommunen INTE använda tjänsten med personuppgifter.", department: "Juridik + IT", icon: "Shield" },
      interactiveElement: { type: "true-false", data: { statement: "Ett PUB-avtal behövs bara om AI-leverantören hanterar personnummer.", isTrue: false, explanation: "Nej! PUB-avtal krävs för ALL behandling av personuppgifter — namn, mejladresser, ärendenummer med mera. Inte bara personnummer." } },
      summary: ["PUB-avtal krävs alltid när leverantör bearbetar personuppgifter", "Avtalet ska täcka: vilka uppgifter, syfte, säkerhet, lagring, avtalsslut", "Kontrollera underbiträden — transparens hela vägen ner i kedjan"],
    },
  },
];

// ---------------------------------------------------------------------------
// Nivå 2 — Quiz-frågor
// ---------------------------------------------------------------------------

export const QUIZ_QUESTIONS_NIVA_2: AcademyQuizQuestion[] = [
  // --- Kurs 2.1: Förstå tekniken ---
  { id: "aq-2-1-1", moduleId: "mod-2-1-1", question: "Varför kostar svenska text fler tokens än engelska?", options: ["Svenska har fler bokstäver", "Svenska ord delas i fler delar av tokenizern", "AI förstår inte svenska", "Det gör den inte"], correctIndex: 1, explanation: "Svenska sammansatta ord bryts ner i fler delar/tokens av AI:ns tokenizer." },
  { id: "aq-2-1-2", moduleId: "mod-2-1-1", question: "Vad händer när kontextfönstret fylls?", options: ["AI:n kraschar", "AI:n börjar 'glömma' äldre delar av konversationen", "AI:n blir snabbare", "Inget särskilt"], correctIndex: 1, explanation: "AI:n tappar de äldsta delarna — därför blir långa chattar sämre mot slutet." },
  { id: "aq-2-1-3", moduleId: "mod-2-1-1", question: "Vad är en embedding?", options: ["En typ av bild", "En talvektor som representerar textens betydelse", "En sorts kryptering", "Ett komprimerat dokument"], correctIndex: 1, explanation: "Embeddings omvandlar text till talvektorer som fångar semantisk betydelse." },
  { id: "aq-2-1-4", moduleId: "mod-2-1-1", question: "Vad möjliggör embeddings?", options: ["Snabbare internet", "Semantisk sökning — hitta liknande betydelser", "Bättre bilder", "Automatisk översättning"], correctIndex: 1, explanation: "Embeddings gör att system kan hitta likartade betydelser, inte bara exakta ordmatchningar." },
  { id: "aq-2-1-5", moduleId: "mod-2-1-1", question: "Vad innebär semantisk sökning?", options: ["Sökning baserad på betydelse", "Sökning baserad på exakta ord", "Sökning på internet", "Sökning i databaser"], correctIndex: 0, explanation: "Semantisk sökning förstår vad du menar, inte bara vilka ord du använder." },
  { id: "aq-2-1-6", moduleId: "mod-2-1-2", question: "Vad gör attention-mekanismen?", options: ["Ger AI tillgång till internet", "Låter AI fokusera på relevanta delar av texten", "Ökar AI:ns hastighet", "Minskar minnesanvändning"], correctIndex: 1, explanation: "Attention låter AI:n väga samband mellan alla ord i texten — oavsett avstånd." },
  { id: "aq-2-1-7", moduleId: "mod-2-1-2", question: "Alla moderna språkmodeller bygger på:", options: ["Regelbaserad programmering", "Transformer-arkitekturen", "Enkel statistik", "Manuellt skrivna svar"], correctIndex: 1, explanation: "GPT, Claude, Gemini — alla bygger på transformer med attention-mekanismen." },
  { id: "aq-2-1-8", moduleId: "mod-2-1-2", question: "Vad är förträning?", options: ["Att manuellt programmera regler", "Att mata modellen med miljarder texter för att lära sig mönster", "Att testa modellen före lansering", "Att installera programvaran"], correctIndex: 1, explanation: "Förträning = modellen läser enorm mängd text och lär sig språkets mönster." },
  { id: "aq-2-1-9", moduleId: "mod-2-1-2", question: "RLHF står för:", options: ["Real-time Language Help Function", "Reinforcement Learning from Human Feedback", "Rapid Learning High Frequency", "Remote Learning for Higher Functions"], correctIndex: 1, explanation: "RLHF = människor rankar svar så att modellen lär sig vara mer hjälpsam och säker." },
  { id: "aq-2-1-10", moduleId: "mod-2-1-2", question: "Varför behövs finjustering efter förträning?", options: ["Modellen är för stor", "Modellen vet allt men kan inte föra bra samtal", "Förträningen misslyckas alltid", "Det behövs inte"], correctIndex: 1, explanation: "Förträning ger kunskap, finjustering lär modellen att vara hjälpsam och kommunicera väl." },
  { id: "aq-2-1-11", moduleId: "mod-2-1-3", question: "RAG står för:", options: ["Random Access Generation", "Retrieval-Augmented Generation", "Rapid AI Growth", "Real-time AI Gateway"], correctIndex: 1, explanation: "RAG = sök relevant info (Retrieval) och använd den för att generera svar (Generation)." },
  { id: "aq-2-1-12", moduleId: "mod-2-1-3", question: "Vad lagrar en vektordatabas?", options: ["Bilder", "Embeddings (talvektorer) av dokument", "Lösenord", "Webbsidor"], correctIndex: 1, explanation: "Vektordatabasen lagrar dokument som embeddings — talvektorer som representerar betydelse." },
  { id: "aq-2-1-13", moduleId: "mod-2-1-3", question: "Varför är RAG viktigt för organisationer?", options: ["Det är billigare", "AI kan svara baserat på organisationens EGNA dokument", "Det gör AI snabbare", "Det krävs av lag"], correctIndex: 1, explanation: "RAG gör att AI:n kan ge svar grundade i organisationens kunskap, inte bara allmän träningsdata." },
  { id: "aq-2-1-14", moduleId: "mod-2-1-3", question: "Semantisk sökning kan hitta relevanta dokument även om:", options: ["Dokumenten är krypterade", "Du använder andra ord än dokumentet", "Dokumenten är på ett annat språk", "Dokumenten är raderade"], correctIndex: 1, explanation: "Semantisk sökning matchar betydelse, inte exakta ord — 'bygglöv' matchar 'bygglovsansökan'." },
  { id: "aq-2-1-15", moduleId: "mod-2-1-3", question: "I RAG-flödet: vad händer först?", options: ["LLM:en genererar svar", "Frågan konverteras till embedding och matchas mot dokument", "Användaren får ett svar", "Dokumenten raderas"], correctIndex: 1, explanation: "Först söker systemet relevanta dokument (retrieval), sedan genererar LLM:en ett svar baserat på dem." },
  { id: "aq-2-1-16", moduleId: "mod-2-1-4", question: "Ett API är:", options: ["En typ av AI-modell", "Ett standardiserat gränssnitt mellan system", "En webbsida", "Ett programmeringsspråk"], correctIndex: 1, explanation: "API = Application Programming Interface — standardiserat sätt för program att kommunicera." },
  { id: "aq-2-1-17", moduleId: "mod-2-1-4", question: "Vad är en webhook?", options: ["En typ av webbsida", "En URL som tar emot data automatiskt vid händelser", "Ett lösenord", "En sökmotor"], correctIndex: 1, explanation: "Webhook = automatisk notifiering via URL när något händer — push istället för polling." },
  { id: "aq-2-1-18", moduleId: "mod-2-1-4", question: "Skillnaden mellan API och webhook:", options: ["API är snabbare", "API = du frågar, webhook = du blir notifierad", "Webhook är säkrare", "Det finns ingen skillnad"], correctIndex: 1, explanation: "API = pull (du frågar), webhook = push (du blir kontaktad automatiskt)." },
  { id: "aq-2-1-19", moduleId: "mod-2-1-4", question: "Intric använder API:er för att:", options: ["Visa bilder", "Koppla till språkmodeller som Claude och GPT", "Skicka SMS", "Spela musik"], correctIndex: 1, explanation: "Intric anropar LLM-API:er (Claude, GPT) i bakgrunden för att generera svar." },
  { id: "aq-2-1-20", moduleId: "mod-2-1-4", question: "En framtida AI-integration i kommunen kan vara:", options: ["AI som automatiskt kategoriserar inkomna ärenden", "AI som ersätter alla anställda", "AI som kör kommunens bilar", "AI som bygger nya hus"], correctIndex: 0, explanation: "Automatisk ärendekategorisering via API + webhook är ett realistiskt och värdefullt användningsfall." },

  // --- Kurs 2.2: Intric — bygg din egen assistent ---
  { id: "aq-2-2-1", moduleId: "mod-2-2-1", question: "Vad är ett space i Intric?", options: ["En chatbot", "En avgränsad arbetsyta med assistenter och kunskap", "En typ av dokument", "Ett lösenord"], correctIndex: 1, explanation: "Ett space = arbetsyta med egna assistenter, kunskapskällor och behörigheter." },
  { id: "aq-2-2-2", moduleId: "mod-2-2-1", question: "Vilken säkerhetsklass passar för helt offentlig information?", options: ["Klass 1", "Klass 2", "Klass 3", "Ingen klass behövs"], correctIndex: 0, explanation: "Klass 1 = öppen info som inte är känslig." },
  { id: "aq-2-2-3", moduleId: "mod-2-2-1", question: "Systempromten styr:", options: ["Assistentens hastighet", "Assistentens beteende, ton och begränsningar", "Priset per fråga", "Vilken webbläsare som används"], correctIndex: 1, explanation: "Systempromten definierar hur assistenten beter sig, kommunicerar och vilka gränser den har." },
  { id: "aq-2-2-4", moduleId: "mod-2-2-1", question: "Utan systemprompt beter sig assistenten:", options: ["Perfekt", "Generiskt — utan specifik personlighet eller begränsningar", "Inte alls", "Exakt som ChatGPT"], correctIndex: 1, explanation: "Utan systemprompt saknar assistenten specifik roll, ton och begränsningar." },
  { id: "aq-2-2-5", moduleId: "mod-2-2-1", question: "Vad bör finnas i en bra systemprompt?", options: ["Bara assistentens namn", "Roll, uppgift, ton, källor och begränsningar", "Teknisk dokumentation", "Användarens lösenord"], correctIndex: 1, explanation: "De fem delarna: roll, uppgift, ton, källor och begränsningar." },
  { id: "aq-2-2-6", moduleId: "mod-2-2-2", question: "Vilka kunskapskällor kan du ge en Intric-assistent?", options: ["Bara PDF-filer", "Filer, webbsidor och samlingar", "Bara webbsidor", "Bara Excel-filer"], correctIndex: 1, explanation: "Intric stödjer filer (PDF, Word, text), webbsidor och organiserade samlingar." },
  { id: "aq-2-2-7", moduleId: "mod-2-2-2", question: "Vad är en samling i Intric?", options: ["En typ av AI-modell", "En grupp relaterade dokument", "En chatt-historik", "En rapport"], correctIndex: 1, explanation: "Samlingar grupperar relaterade dokument — t.ex. 'Personalpolicyer' eller 'Bygglovsinfo'." },
  { id: "aq-2-2-8", moduleId: "mod-2-2-2", question: "Vad gör webbcrawling?", options: ["Skapar webbsidor", "Hämtar automatiskt innehåll från webbsidor", "Raderar webbhistorik", "Blockerar webbsidor"], correctIndex: 1, explanation: "Webbcrawling hämtar och indexerar innehåll från webbsidor automatiskt." },
  { id: "aq-2-2-9", moduleId: "mod-2-2-2", question: "Hur hålls assistentens kunskap aktuell?", options: ["Den uppdateras aldrig", "Genom att granska dokument, schemalägga crawling och testa", "Automatiskt utan insats", "Genom att starta om datorn"], correctIndex: 1, explanation: "Aktiv förvaltning: granska dokument, schemalägga webbcrawling, testa regelbundet." },
  { id: "aq-2-2-10", moduleId: "mod-2-2-2", question: "'Garbage in, garbage out' i AI-kontext betyder:", options: ["AI skapar skräppost", "Dålig indata ger dåliga svar", "AI fungerar inte med PDF", "Man måste rensa papperkorgen"], correctIndex: 1, explanation: "Om du laddar upp dåliga eller föråldrade dokument, ger assistenten dåliga svar." },
  { id: "aq-2-2-11", moduleId: "mod-2-2-3", question: "De fem delarna av en systemprompt är:", options: ["Namn, datum, plats, tid, kostnad", "Roll, uppgift, ton, källor, begränsningar", "Input, process, output, feedback, loop", "Vem, var, när, hur, varför"], correctIndex: 1, explanation: "Roll + uppgift + ton + källor + begränsningar = komplett systemprompt." },
  { id: "aq-2-2-12", moduleId: "mod-2-2-3", question: "Chain-of-thought i systemprompt innebär:", options: ["Att kedja ihop flera assistenter", "Att instruera AI:n att resonera steg för steg", "Att skriva en lång prompt", "Att kedja ihop dokument"], correctIndex: 1, explanation: "Chain-of-thought = AI:n resonerar steg för steg, vilket ger mer genomtänkta svar." },
  { id: "aq-2-2-13", moduleId: "mod-2-2-3", question: "Vad är few-shot examples?", options: ["Korta prompts", "Exempelsvar i systempromten som visar önskat format", "Testfrågor", "Bilder i prompten"], correctIndex: 1, explanation: "Few-shot examples visar AI:n 2–3 exempel på hur bra svar ser ut." },
  { id: "aq-2-2-14", moduleId: "mod-2-2-3", question: "Varför bör systempromten vara under 500 ord?", options: ["AI kan inte läsa mer", "Längre prompts äter kontextfönster och ger sämre resultat", "Det är en teknisk begränsning", "Det finns ingen gräns"], correctIndex: 1, explanation: "En för lång systemprompt tar plats i kontextfönstret som behövs för dokument och konversation." },
  { id: "aq-2-2-15", moduleId: "mod-2-2-3", question: "Det vanligaste misstaget i systemprompts är:", options: ["Att de är för korta", "Att de saknar begränsningar — AI:n hittar på svar", "Att de skrivs på engelska", "Att de innehåller bilder"], correctIndex: 1, explanation: "Utan 'säg att du inte vet'-begränsning riskerar AI:n att hitta på fakta." },
  { id: "aq-2-2-16", moduleId: "mod-2-2-4", question: "Hur bör du testa en assistent innan publicering?", options: ["Ställ 1 fråga", "Systematiskt med grundfrågor, kantfall, felaktiga premisser och tonfallstest", "Be IT testa", "Publicera direkt och se vad som händer"], correctIndex: 1, explanation: "Systematisk testning med olika typer av frågor fångar problem före publicering." },
  { id: "aq-2-2-17", moduleId: "mod-2-2-4", question: "Vad är en widget i Intric?", options: ["En typ av dokument", "En inbäddningsbar chatt som kan placeras på webben", "En AI-modell", "Ett diagram"], correctIndex: 1, explanation: "Widget = inbäddningsbar chatt-komponent med egen URL, kan placeras på intranät eller webbsida." },
  { id: "aq-2-2-18", moduleId: "mod-2-2-4", question: "Rätt ordning för feedback-loopen:", options: ["Bredda → Lansera → Feedback → Förbättra", "Lansera → Feedback → Förbättra → Bredda", "Förbättra → Lansera → Bredda → Feedback", "Feedback → Lansera → Förbättra → Bredda"], correctIndex: 1, explanation: "Lansera (pilotgrupp) → Samla feedback → Förbättra → Bredda (fler användare)." },
  { id: "aq-2-2-19", moduleId: "mod-2-2-4", question: "Mallar i Intric används för att:", options: ["Skapa dokument", "Återanvända bra assistent-konfigurationer", "Formatera text", "Skicka mejl"], correctIndex: 1, explanation: "Mallar sparar en bra konfiguration (systemprompt, inställningar) för snabb återanvändning." },
  { id: "aq-2-2-20", moduleId: "mod-2-2-4", question: "Minst hur många testfrågor bör du ställa innan publicering?", options: ["1-2", "10-15", "100+", "Det behövs inga tester"], correctIndex: 1, explanation: "10-15 testfrågor av olika typer ger rimlig täckning av grundfunktionalitet och kantfall." },

  // --- Kurs 2.3: Copilot & Microsoft 365 ---
  { id: "aq-2-3-1", moduleId: "mod-2-3-1", question: "Copilot skiljer sig från ChatGPT genom:", options: ["Det är gratis", "Det har tillgång till dina Microsoft 365-data", "Det fungerar offline", "Det är snabbare"], correctIndex: 1, explanation: "Copilots unika styrka = integration med Microsoft Graph (mejl, filer, möten)." },
  { id: "aq-2-3-2", moduleId: "mod-2-3-1", question: "Vad är Microsoft Graph?", options: ["Ett diagram-verktyg", "En plattform som ger Copilot åtkomst till dina 365-data", "En typ av Excel-formel", "Microsofts sociala nätverk"], correctIndex: 1, explanation: "Microsoft Graph kopplar samman alla dina 365-data — mejl, filer, kalender, Teams." },
  { id: "aq-2-3-3", moduleId: "mod-2-3-1", question: "Copilot kräver:", options: ["Bara en vanlig 365-licens", "En separat Copilot-licens", "Inget särskilt", "En Google-licens"], correctIndex: 1, explanation: "Copilot kräver en separat tilläggslicens utöver vanliga Microsoft 365." },
  { id: "aq-2-3-4", moduleId: "mod-2-3-1", question: "Kan Copilot visa data du normalt inte har åtkomst till?", options: ["Ja, det är poängen", "Nej, den respekterar existerande behörigheter", "Bara i Excel", "Bara chefer kan se allt"], correctIndex: 1, explanation: "Copilot respekterar alltid dina befintliga behörigheter — ingen bakdörr." },
  { id: "aq-2-3-5", moduleId: "mod-2-3-1", question: "Används Copilot-data för att träna AI-modellen?", options: ["Ja", "Nej", "Bara mejl", "Bara i USA"], correctIndex: 1, explanation: "Microsoft använder INTE kunddata för att träna AI-modeller. Data bearbetas och returneras." },
  { id: "aq-2-3-6", moduleId: "mod-2-3-2", question: "Copilot i Word kan:", options: ["Bara rätta stavfel", "Skriva utkast, sammanfatta, omformulera och hämta från andra filer", "Bara läsa högt", "Bara formatera text"], correctIndex: 1, explanation: "Copilot i Word är mångsidigt: skriva, sammanfatta, omformulera och referera andra filer." },
  { id: "aq-2-3-7", moduleId: "mod-2-3-2", question: "Vad krävs för Copilot i Excel?", options: ["Inget särskilt", "Data i tabellformat, fil sparad i OneDrive/SharePoint", "Minst 10 kolumner", "Formler måste finnas"], correctIndex: 1, explanation: "Data måste vara i tabell-format och filen sparad i molnet." },
  { id: "aq-2-3-8", moduleId: "mod-2-3-2", question: "Copilot i PowerPoint kan:", options: ["Bara lägga till bilder", "Skapa presentationer från dokument, omorganisera och lägga till talarpunkter", "Bara ändra bakgrund", "Inget av ovanstående"], correctIndex: 1, explanation: "Copilot i PowerPoint skapar slides från dokument, omorganiserar och lägger till talarpunkter." },
  { id: "aq-2-3-9", moduleId: "mod-2-3-2", question: "Vad bör du alltid göra med Copilot-genererad text?", options: ["Skicka direkt", "Granska innan du använder den", "Radera den", "Översätta till engelska"], correctIndex: 1, explanation: "Granska ALLTID — Copilot skriver utkast, du godkänner." },
  { id: "aq-2-3-10", moduleId: "mod-2-3-2", question: "Copilot i Excel kan hjälpa med:", options: ["Bara enkla summeringar", "Analys, formler, diagram och mönster", "Bara formatering", "Bara filtrering"], correctIndex: 1, explanation: "Copilot i Excel analyserar data, skapar formler och diagram, och hittar trender." },
  { id: "aq-2-3-11", moduleId: "mod-2-3-3", question: "Copilot i Teams kan under ett möte:", options: ["Bara spela in", "Sammanfatta hittills, fånga beslut och svara på frågor", "Bara transkribera", "Inget — det fungerar bara efteråt"], correctIndex: 1, explanation: "Under mötet kan Copilot sammanfatta i realtid, fånga beslut och svara på frågor." },
  { id: "aq-2-3-12", moduleId: "mod-2-3-3", question: "Vad krävs för att Copilot ska kunna sammanfatta ett möte?", options: ["Att alla har Copilot", "Att mötet spelas in eller transkriberas", "Att mötet är på engelska", "Att chefen ger tillåtelse"], correctIndex: 1, explanation: "Mötet måste spelas in eller transkriberas för att Copilot ska ha data att arbeta med." },
  { id: "aq-2-3-13", moduleId: "mod-2-3-3", question: "Copilot i Outlook kan:", options: ["Bara sortera mejl", "Sammanfatta trådar, skriva svar och hjälpa prioritera", "Bara radera mejl", "Bara skicka automatiska svar"], correctIndex: 1, explanation: "Copilot i Outlook sammanfattar, skriver svar, tonar om och hjälper prioritera." },
  { id: "aq-2-3-14", moduleId: "mod-2-3-3", question: "En bra Copilot-prompt i Outlook är:", options: ["Skriv svar", "Skriv ett professionellt svar som tackar ja till mötet och föreslår en annan tid", "Svar", "Mejl"], correctIndex: 1, explanation: "Specifik prompt med ton (professionell), åtgärd (tacka ja) och tillägg (föreslå tid)." },
  { id: "aq-2-3-15", moduleId: "mod-2-3-3", question: "Bör du alltid granska Copilot-genererade mejl?", options: ["Nej, de är alltid korrekta", "Ja, alltid", "Bara långa mejl", "Bara mejl till chefer"], correctIndex: 1, explanation: "ALLTID granska — Copilot kan ha fel ton, missa kontext eller skriva felaktigt." },
  { id: "aq-2-3-16", moduleId: "mod-2-3-4", question: "Copilot Studio är:", options: ["Microsofts fotoredigerare", "Plattform för att bygga anpassade AI-agenter utan kodning", "En typ av Teams-möte", "Microsofts molnlagring"], correctIndex: 1, explanation: "Copilot Studio = low-code plattform för att bygga AI-agenter." },
  { id: "aq-2-3-17", moduleId: "mod-2-3-4", question: "En Copilot-agent kan:", options: ["Bara svara på frågor", "Svara, utföra åtgärder och integreras med arbetsflöden", "Bara skicka mejl", "Inget av ovanstående"], correctIndex: 1, explanation: "Agenter kan både svara och agera — boka möten, skapa ärenden, skicka notiser." },
  { id: "aq-2-3-18", moduleId: "mod-2-3-4", question: "Intric och Copilot Studio:", options: ["Gör exakt samma sak", "Kompletterar varandra — Intric för kunskap, Studio för actions", "Kan inte användas samtidigt", "Ägs av samma företag"], correctIndex: 1, explanation: "Intric = kunskapsbaserat (RAG), Copilot Studio = actionbaserat (integrationer)." },
  { id: "aq-2-3-19", moduleId: "mod-2-3-4", question: "Power Automate används med Copilot för:", options: ["Att göra presentationer", "Att automatisera arbetsflöden och uppgifter", "Att skriva kod", "Att redigera bilder"], correctIndex: 1, explanation: "Power Automate kopplar Copilot-agenter till arbetsflöden — automatisering utan kodning." },
  { id: "aq-2-3-20", moduleId: "mod-2-3-4", question: "Low-code innebär:", options: ["Att man skriver komplex kod", "Att man konfigurerar visuellt istället för att programmera", "Att koden är kort", "Att man använder få datorer"], correctIndex: 1, explanation: "Low-code = konfigurera och klicka istället för att skriva programkod." },

  // --- Kurs 2.4: Lagar, regler & etik ---
  { id: "aq-2-4-1", moduleId: "mod-2-4-1", question: "AI Act delar in AI-system i:", options: ["2 kategorier", "4 risknivåer", "10 klasser", "Inga kategorier"], correctIndex: 1, explanation: "Oacceptabel, hög, begränsad och minimal risk — fyra nivåer." },
  { id: "aq-2-4-2", moduleId: "mod-2-4-1", question: "Vad avgör risknivån i AI Act?", options: ["Priset", "Användningen och konsekvenserna", "Leverantörens storlek", "Modellens ålder"], correctIndex: 1, explanation: "Det är HUR AI:n används och vilken påverkan den har som bestämmer risknivån." },
  { id: "aq-2-4-3", moduleId: "mod-2-4-1", question: "Chatbotar måste enligt AI Act:", options: ["Vara gratis", "Informera användaren om att de interagerar med AI", "Vara godkända av regeringen", "Bara finnas på engelska"], correctIndex: 1, explanation: "Transparenskrav: användare ska veta att de pratar med AI." },
  { id: "aq-2-4-4", moduleId: "mod-2-4-1", question: "AI i rekrytering klassas troligtvis som:", options: ["Minimal risk", "Begränsad risk", "Hög risk", "Oacceptabel risk"], correctIndex: 2, explanation: "AI som påverkar människors anställning klassas som hög risk enligt AI Act." },
  { id: "aq-2-4-5", moduleId: "mod-2-4-1", question: "Intric för mötessammanfattning klassas som:", options: ["Oacceptabel risk", "Hög risk", "Begränsad eller minimal risk", "Förbjudet"], correctIndex: 2, explanation: "Text-sammanfattning utan beslutspåverkan = låg risk." },
  { id: "aq-2-4-6", moduleId: "mod-2-4-2", question: "DPIA ska genomföras:", options: ["Efter att AI-systemet lanserats", "Innan AI-systemet som hanterar personuppgifter införs", "Bara vid dataintrång", "Aldrig för kommuner"], correctIndex: 1, explanation: "DPIA görs INNAN — det är en förebyggande åtgärd." },
  { id: "aq-2-4-7", moduleId: "mod-2-4-2", question: "Dataskyddsombudets roll är att:", options: ["Utveckla AI-system", "Råda, övervaka GDPR-efterlevnad och vara kontakt mot IMY", "Fatta alla AI-beslut", "Installera programvara"], correctIndex: 1, explanation: "DSO rådger, övervakar och är kontaktpunkt — men fattar inte själv beslut." },
  { id: "aq-2-4-8", moduleId: "mod-2-4-2", question: "Privacy by design innebär:", options: ["Att ha ett snyggt gränssnitt", "Att integritets­skydd byggs in från start", "Att dölja AI:n", "Att radera alla data dagligen"], correctIndex: 1, explanation: "Privacy by design = skydd från början, inte lagt till efteråt." },
  { id: "aq-2-4-9", moduleId: "mod-2-4-2", question: "Vem är personuppgiftsansvarig när kommunen använder AI?", options: ["Medarbetaren", "AI-leverantören", "Kommunen som organisation", "Ingen"], correctIndex: 2, explanation: "Kommunen bär personuppgiftsansvaret — inte individen, inte leverantören." },
  { id: "aq-2-4-10", moduleId: "mod-2-4-2", question: "PUB-avtal krävs:", options: ["Bara för personnummer", "Alltid när leverantör behandlar personuppgifter", "Bara för utländska leverantörer", "Aldrig för svenska leverantörer"], correctIndex: 1, explanation: "PUB-avtal krävs vid ALL personuppgiftsbehandling av leverantör." },
  { id: "aq-2-4-11", moduleId: "mod-2-4-3", question: "Etik i AI-användning handlar om:", options: ["Att följa lagen minimalt", "Att gå utöver lagen med principer som rättvisa och transparens", "Att undvika AI helt", "Att använda den dyraste modellen"], correctIndex: 1, explanation: "Etik > lag — som offentlig sektor ska vi vara föredömen." },
  { id: "aq-2-4-12", moduleId: "mod-2-4-3", question: "Algoritmisk rättvisa innebär:", options: ["Att AI alltid har rätt", "Att AI:ns resultat inte systematiskt missgynnar grupper", "Att alla får samma svar", "Att AI behandlar alla anonymt"], correctIndex: 1, explanation: "Algoritmisk rättvisa = AI:n ska inte reproducera diskriminering." },
  { id: "aq-2-4-13", moduleId: "mod-2-4-3", question: "DIGG:s principer för tillförlitlig AI inkluderar:", options: ["Bara säkerhet", "Mänsklig kontroll, transparens, rättvisa, samhällsnytta m.fl.", "Bara kostnadseffektivitet", "Bara hastighet"], correctIndex: 1, explanation: "7 principer: kontroll, robusthet, integritet, transparens, rättvisa, nytta, ansvarsutkrävande." },
  { id: "aq-2-4-14", moduleId: "mod-2-4-3", question: "Ansvarsfull AI kräver inte bara policy utan också:", options: ["Mer pengar", "En kultur som uppmuntrar ifrågasättande och diskussion", "Snabbare datorer", "Fler chefer"], correctIndex: 1, explanation: "Kultur > policy — medarbetare ska våga ifrågasätta AI:ns resultat." },
  { id: "aq-2-4-15", moduleId: "mod-2-4-3", question: "AI-etik i offentlig sektor är extra viktigt för att:", options: ["Det är dyrt", "Invånare har rätt till likabehandling och transparens", "Chefer kräver det", "Det ser bra ut i media"], correctIndex: 1, explanation: "Offentlig sektor har ett demokratiskt ansvar för likabehandling och transparens." },
  { id: "aq-2-4-16", moduleId: "mod-2-4-4", question: "Vid upphandling av AI bör kravspecen inkludera:", options: ["Bara priset", "Datasäkerhet, GDPR, transparens, exit-strategi", "Bara leveranstid", "Bara antal användare"], correctIndex: 1, explanation: "En komplett kravspec täcker säkerhet, juridik, transparens och exit." },
  { id: "aq-2-4-17", moduleId: "mod-2-4-4", question: "Den viktigaste frågan till en AI-leverantör:", options: ["Hur snabb är tjänsten?", "Används vår data för att träna modellen?", "Har ni en app?", "Hur många anställda har ni?"], correctIndex: 1, explanation: "Dataträning-frågan avgör om känslig information kan läcka." },
  { id: "aq-2-4-18", moduleId: "mod-2-4-4", question: "Vendor lock-in innebär:", options: ["Att leverantören låser sitt kontor", "Att man blir så beroende av en leverantör att man inte kan byta", "Att data krypteras", "Att avtalet är kort"], correctIndex: 1, explanation: "Vendor lock-in = beroende av en leverantör utan möjlighet att byta eller exportera." },
  { id: "aq-2-4-19", moduleId: "mod-2-4-4", question: "PUB-avtal ska reglera:", options: ["Bara priset", "Vilka data som behandlas, syfte, säkerhet, lagring och avtalsslut", "Bara leveranstiden", "Bara supporttider"], correctIndex: 1, explanation: "Komplett PUB-avtal: data, syfte, säkerhet, lagring, underbiträden, avtalsslut." },
  { id: "aq-2-4-20", moduleId: "mod-2-4-4", question: "Underbiträde i AI-kontext är:", options: ["Kommunens IT-avdelning", "En tredjepartstjänst som AI-leverantören använder (t.ex. OpenAI)", "En konsult", "En medarbetare"], correctIndex: 1, explanation: "Underbiträde = leverantörens leverantör. T.ex. Intric använder OpenAI/Azure som underbiträde." },
];

// ---------------------------------------------------------------------------
// Nivå 2 — Final exam pool
// ---------------------------------------------------------------------------

export const FINAL_EXAM_POOL_NIVA_2: AcademyQuizQuestion[] = [
  { id: "fe-2-1", levelId: "niva-2", question: "RAG fungerar genom att:", options: ["Generera slumpmässig text", "Söka relevanta dokument och använda dem som grund för svaret", "Kopiera text från internet", "Bara sammanfatta"], correctIndex: 1, explanation: "RAG = Retrieval (sök i egna dokument) + Augmented Generation (skapa svar baserat på hittat material)." },
  { id: "fe-2-2", levelId: "niva-2", question: "En bra systemprompt innehåller:", options: ["Bara assistentens namn", "Roll, uppgift, ton, källor och begränsningar", "Så mycket text som möjligt", "Användarens lösenord"], correctIndex: 1, explanation: "De fem delarna skapar en komplett instruktion för assistentens beteende." },
  { id: "fe-2-3", levelId: "niva-2", question: "Microsoft Copilot respekterar:", options: ["Inga behörighetsgränser", "Existerande behörigheter i Microsoft 365", "Bara chefers behörigheter", "Bara offentliga filer"], correctIndex: 1, explanation: "Copilot visar bara data du redan har åtkomst till." },
  { id: "fe-2-4", levelId: "niva-2", question: "DPIA ska genomföras:", options: ["Efteråt", "Innan ett nytt AI-system med personuppgifter införs", "Bara vid incidenter", "Bara av leverantören"], correctIndex: 1, explanation: "DPIA = förebyggande analys INNAN införande." },
  { id: "fe-2-5", levelId: "niva-2", question: "Attention-mekanismen gör att:", options: ["AI fungerar utan el", "AI kan fokusera på relevanta delar av texten", "AI svarar snabbare", "AI kan se bilder"], correctIndex: 1, explanation: "Attention = AI:n väger samband mellan alla ord och fokuserar på det relevanta." },
  { id: "fe-2-6", levelId: "niva-2", question: "Vektordatabas lagrar:", options: ["Bilder", "Embeddings som möjliggör semantisk sökning", "Lösenord", "E-post"], correctIndex: 1, explanation: "Vektordatabaser lagrar embeddings — grunden för RAG och semantisk sökning." },
  { id: "fe-2-7", levelId: "niva-2", question: "AI Act klassificerar risk baserat på:", options: ["Pris", "Användning och konsekvenser", "Leverantör", "Land"], correctIndex: 1, explanation: "Det är HUR AI:n används som avgör risknivån." },
  { id: "fe-2-8", levelId: "niva-2", question: "Privacy by design innebär:", options: ["Snygg design", "Integritetsskydd byggs in från start", "AI fungerar utan data", "Alla data offentliggörs"], correctIndex: 1, explanation: "Skydd från början — minimera data, anonymisera, begränsa åtkomst." },
  { id: "fe-2-9", levelId: "niva-2", question: "Copilot Studio är:", options: ["Microsofts fotoredigerare", "Low-code plattform för att bygga AI-agenter", "En typ av Office-licens", "Microsofts e-posttjänst"], correctIndex: 1, explanation: "Copilot Studio = bygg AI-agenter utan kodning." },
  { id: "fe-2-10", levelId: "niva-2", question: "Chain-of-thought i systemprompts:", options: ["Gör AI snabbare", "Instruerar AI att resonera steg för steg", "Kedjar ihop dokument", "Minskar kostnaden"], correctIndex: 1, explanation: "CoT = 'tänk steg för steg' — bättre resonerande och mer genomtänkta svar." },
  { id: "fe-2-11", levelId: "niva-2", question: "Webhook vs API:", options: ["Samma sak", "Webhook pushar data automatiskt, API kräver aktiv förfrågan", "API är gratis, webhook kostar", "Webhook är säkrare"], correctIndex: 1, explanation: "API = pull (du frågar), webhook = push (du blir notifierad automatiskt)." },
  { id: "fe-2-12", levelId: "niva-2", question: "Algoritm­isk rättvisa innebär:", options: ["AI alltid har rätt", "AI:ns resultat inte systematiskt missgynnar grupper", "Alla får samma svar", "AI behandlar alla anonymt"], correctIndex: 1, explanation: "Rättvisa = AI ska inte reproducera diskriminering." },
  { id: "fe-2-13", levelId: "niva-2", question: "Ansvarsfull AI i organisationen kräver:", options: ["Bara teknik", "Riktlinjer, utbildning, diskussion och incidenthantering", "Bara pengar", "Bara chefers godkännande"], correctIndex: 1, explanation: "Riktlinjer + utbildning + kultur + incidenthantering = ansvarsfull AI." },
  { id: "fe-2-14", levelId: "niva-2", question: "Vendor lock-in undviks genom:", options: ["Att köpa det billigaste", "Att säkerställa exportmöjlighet och undvika proprietära format", "Att inte använda AI", "Att byta leverantör varje månad"], correctIndex: 1, explanation: "Exportmöjlighet och öppna format minskar beroendet av en enda leverantör." },
  { id: "fe-2-15", levelId: "niva-2", question: "Hur många tokens motsvarar GPT-4:s kontextfönster (128K)?", options: ["En sida text", "Cirka 300 sidor/en bok", "10 ord", "En miljon böcker"], correctIndex: 1, explanation: "128 000 tokens ≈ 300 sidor text — en hel bok." },
  { id: "fe-2-16", levelId: "niva-2", question: "Intric och Copilot Studio:", options: ["Gör samma sak", "Kompletterar varandra — kunskap vs. actions", "Kan inte samexistera", "Är gratis"], correctIndex: 1, explanation: "Intric = kunskapsbaserat (RAG), Copilot Studio = actionbaserat (integrationer)." },
  { id: "fe-2-17", levelId: "niva-2", question: "Underbiträde i AI-kontext:", options: ["Din kollega", "Leverantörens leverantör (t.ex. OpenAI via Intric)", "IT-chefen", "AI-modellen själv"], correctIndex: 1, explanation: "Underbiträde = tredjepartstjänst som leverantören använder i bakgrunden." },
  { id: "fe-2-18", levelId: "niva-2", question: "Copilot i Teams kräver att mötet:", options: ["Är kort", "Spelas in eller transkriberas", "Har max 3 deltagare", "Är på engelska"], correctIndex: 1, explanation: "Inspelning/transkribering krävs för att Copilot ska ha data att arbeta med." },
  { id: "fe-2-19", levelId: "niva-2", question: "Embedd­ings gör att:", options: ["Text blir snabbare", "Liknande begrepp får liknande talvektorer", "AI kan se bilder", "Internet fungerar snabbare"], correctIndex: 1, explanation: "Embeddings fångar semantisk likhet — grunden för AI:s textförståelse." },
  { id: "fe-2-20", levelId: "niva-2", question: "De flesta nya AI-system i kommunen bör ha:", options: ["Inget speciellt", "En DPIA innan införande", "Bara ett pressmeddelande", "Bara IT-chefens godkännande"], correctIndex: 1, explanation: "DPIA = konsekvensbedömning innan AI-system med personuppgifter införs." },
  { id: "fe-2-21", levelId: "niva-2", question: "Säkerhetsklasser i Intric:", options: ["Finns inte", "Styr vilken typ av data som får hanteras (1-3)", "Är bara för chefer", "Bestämmer hastigheten"], correctIndex: 1, explanation: "Klass 1 (öppen), Klass 2 (intern), Klass 3 (konfidentiell)." },
  { id: "fe-2-22", levelId: "niva-2", question: "Transformer-arkitekturen:", options: ["Är en typ av robot", "Ligger bakom alla moderna språkmodeller (GPT, Claude, Gemini)", "Används bara i bilar", "Är föråldrad"], correctIndex: 1, explanation: "Transformer = arkitekturen som revolutionerade AI 2017 och som alla LLM:er bygger på." },
  { id: "fe-2-23", levelId: "niva-2", question: "Feedback-loopen för assistenter:", options: ["Lansera → feedback → förbättra → bredda", "Bredda → lansera → feedback → förbättra", "Förbättra → bredda → lansera → feedback", "Finns inte"], correctIndex: 0, explanation: "Lansera (pilot) → Samla feedback → Förbättra → Bredda (fler användare)." },
  { id: "fe-2-24", levelId: "niva-2", question: "7 etiska principer för AI inkluderar:", options: ["Bara säkerhet och kostnad", "Mänsklig kontroll, transparens, rättvisa, samhällsnytta m.fl.", "Bara hastighet och pris", "Bara GDPR"], correctIndex: 1, explanation: "Kontroll, robusthet, integritet, transparens, rättvisa, nytta, ansvarsutkrävande." },
  { id: "fe-2-25", levelId: "niva-2", question: "PUB-avtal krävs:", options: ["Aldrig", "Alltid när en leverantör behandlar personuppgifter åt kommunen", "Bara vid stora upphandlingar", "Bara med utländska leverantörer"], correctIndex: 1, explanation: "Alltid vid personuppgiftsbehandling av leverantör — inga undantag." },
];
