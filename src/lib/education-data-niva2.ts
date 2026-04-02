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
      interactiveElement: { type: "true-false", data: { statement: "Embeddings gör att AI kan hitta relevanta dokument även om sökorden inte matchar exakt.", isTrue: true, explanation: "Rätt! Embeddings fångar betydelse, inte exakta ord. 'Ansöka om bygglov' kan matcha 'bygglovsansökan' tack vare liknande vektorer." } },
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
      hook: "I Nivå 1 lärde du dig vad Intric är och startade din första chatt. Nu ska du bli skapare — bygga egna assistenter. Första steget: förstå spaces — arbetsytor där du organiserar assistenter och kunskap.",
      sections: [
        { heading: "Tre roller i Intric", text: "Du har en av tre globala roller i Intric:\n\n• **User** — Använda personlig chatt och publicerade assistenter. De flesta medarbetare har denna roll.\n• **Creator** — Allt en User kan + **skapa spaces** och bygga AI-assistenter. Krävs för att skapa ett space. Superanvändare och förvaltningsansvariga har ofta denna roll.\n• **Admin** — Full kontroll över hela plattformen. Bara ett fåtal personer.\n\nDen här kursen riktar sig till dig som är eller vill bli **Creator**.", icon: "UserCheck" },
        { heading: "Vad är ett space?", text: "Ett space är en avgränsad arbetsyta — tänk projektmapp. Som Creator kan du skapa ett space och sedan bygga assistenter, ladda upp kunskap och bjuda in andra. Vänstermenyn i ett space har fem delar: Översikt, Assistenter, Kunskap, Medlemmar och Inställningar.", icon: "FolderOpen" },
        { heading: "Roller i ett space", text: "Inom varje space finns tre separata roller (oberoende av den globala rollen):\n\n• **Space-Admin** — Full kontroll i spacet: säkerhetsklassificering, medlemmar, assistenter, kunskap, inställningar.\n• **Space-Redigerare** — Skapa och redigera assistenter och kunskap. Kan inte ändra medlemmar eller säkerhet.\n• **Space-Läsare** — Använda publicerade assistenter. Kan inte ändra något.\n\nNär du som Creator skapar ett space blir du automatiskt Space-Admin. Du kan sedan bjuda in andra och ge dem roller.", icon: "Users" },
        { heading: "Säkerhetsklassificering", text: "Säkerhetsklassificeringen sätts på **Space-nivå** under Inställningar. Tre alternativ:\n\n• **Lokala AI-Modeller (GDPR-Säker)** — Sverige/EU-modeller (Llama 3.3 SWE, Swedish Hosted). Krävs för känsliga uppgifter.\n• **Alla AI-Modeller (Inget GDPR-Krav)** — Inkluderar utländska modeller (Claude, GPT). Bara för offentlig info.\n• **Ingen Klassificering** — Ingen begränsning.\n\nValet avgör vilka modeller som blir tillgängliga för alla assistenter i spacet.", icon: "Shield" },
      ],
      municipalExample: { title: "Så funkar det hos oss", description: "De flesta medarbetare i kommunen har rollen User — de använder personlig chatt och publicerade assistenter som iKAI. Superanvändare med Creator-rollen kan skapa egna spaces och bygga assistenter. I spacet 'Allmänna assistenter' har ett fåtal Space-Admins full kontroll, medan gruppen 'All Users' är Space-Läsare och använder de publicerade assistenterna.", department: "Alla förvaltningar", icon: "Building2" },
      interactiveElement: { type: "multi-choice", data: { question: "Du är Creator i Intric och Space-Redigerare i ett space. Vad kan du göra?", options: ["Ändra säkerhetsklassificeringen för spacet", "Skapa och redigera assistenter och kunskap", "Bara använda publicerade assistenter", "Hantera vilka som är medlemmar i spacet"], correctIndex: 1, explanation: "Som Space-Redigerare kan du skapa och redigera assistenter och hantera kunskap — men inte ändra medlemmar eller säkerhetsklassificering (det kan bara Space-Admin)." } },
      summary: ["Tre roller i Intric: User (använda), Creator (bygga), Admin (administrera)", "Tre roller i varje space: Admin, Redigerare, Läsare — separata från Intric-rollen", "Säkerhetsklassificering på Space-nivå avgör vilka AI-modeller som är tillgängliga"],
    },
  },
  {
    id: "les-2-2-1-2", moduleId: "mod-2-2-1", title: "Skapa din första assistent", order: 2, estimatedMinutes: 7, type: "reading",
    conceptIds: ["intric-assistent"],
    content: {
      hook: "Nu skapar vi din första assistent — en AI som svarar på frågor utifrån just de dokument och instruktioner du ger den.",
      sections: [
        { heading: "Skapa eller importera", text: "I ett space klickar du **'Skapa ny assistent'**. Du kan också **importera en befintlig assistent** via en delningskod — klicka pilen bredvid knappen och välj 'Importera assistent'. Ange namn och klistra in delningskoden (börjar med intric-asc-...).", icon: "Plus" },
        { heading: "Assistentens inställningar", text: "När du skapar en assistent konfigurerar du följande:\n\n**Instruktioner:**\n• **Namn** — visas för användarna\n• **Beskrivning** — syfte och riktlinjer\n• **Datalagringspolicy** — om meddelanden ska raderas automatiskt\n• **Prompt** — systempromten som styr beteendet (har versionshistorik)\n• **Bilagor** — extra dokument som assistenten alltid ser\n\n**Kunskap** — koppla samlingar med dokument\n**Exempelfrågor** — konversationsstartare som visas som platshållartext\n\n**AI-konfiguration:**\n• **Kompletteringsmodell** — språkmodellen (t.ex. Claude 4.6 Sonnet, GPT-5 mini, Llama 3.3 SWE)\n• **Transkriptionsmodell** — för ljud till text (t.ex. KB-Whisper SWE)\n• **Modellbeteende** — förinställning (Standard) eller manuellt\n\n**Ytterligare förmågor** — verktyg som SCB, Kolada, Outlook, SharePoint, Teams, OneDrive, Skolverket, Socialstyrelsen, Sveriges Domstolar, Riksdagen, Webbsökning\n\n**Publicering** — publicera/avpublicera + Insights för att följa användning", icon: "Settings" },
      ],
      municipalExample: { title: "iKAI — ett verkligt exempel", description: "Katrineholms AI-assistent iKAI är konfigurerad med: systemprompt som definierar roll och beteende, 16+ kunskapssamlingar (2400+ filer från kommunen, mötesprotokoll, policyer), kompletteringsmodell Claude 4.6 Sonnet, transkription KB-Whisper SWE, och verktyg som SCB, Kolada, Outlook, SharePoint, Teams och Webbsökning.", department: "Digitalisering", icon: "Bot" },
      interactiveElement: { type: "fill-blank", data: { sentence: "Assistentens inställningar har två modellval: kompletteringsmodell och ___.", correctAnswer: "transkriptionsmodell", distractors: ["bildmodell", "översättningsmodell", "sökmodell"] } },
      summary: ["Skapa ny assistent eller importera via delningskod", "Konfigurera: instruktioner, prompt, kunskap, AI-modeller, verktyg och publicering", "Två modellval: kompletteringsmodell (språk) och transkriptionsmodell (ljud till text)"],
    },
  },

  // --- Modul 2.2.2: Kunskap & samlingar ---
  {
    id: "les-2-2-2-1", moduleId: "mod-2-2-2", title: "Ladda upp kunskap", order: 1, estimatedMinutes: 7, type: "reading",
    conceptIds: ["intric-kunskap", "intric-samling"],
    content: {
      hook: "En assistent utan kunskap är som en nyanställd utan introduktion. Låt oss ge din assistent tillgång till rätt dokument.",
      sections: [
        { heading: "Bilagor vs Kunskap — viktig skillnad", text: "Det finns två sätt att ge assistenten information, och de fungerar helt olika:\n\n• **Bilagor** — Dokument som assistenten **alltid ser** i varje svar. Perfekt för riktlinjer, vägledningar och rutiner som ska styra beteendet. T.ex. 'Så hanterar vi GDPR-frågor' eller 'Tonguide för kommunikation'.\n• **Kunskap (samlingar)** — Ett sökbart bibliotek som assistenten **söker i vid behov**. All annan dokumentation och data hamnar här. T.ex. policyer, mötesprotokoll, handböcker.\n\nTumregel: Om assistenten alltid ska följa det → bilaga. Om assistenten ska kunna hitta det → kunskap.", icon: "SplitSquareVertical" },
        { heading: "Kunskapskällor", text: "Du kan ge assistenten kunskap genom:\n\n• **Samlingar** — ladda upp filer (PDF, Word, Excel, PowerPoint, text, ljud, video, bild) grupperade tematiskt\n• **Webbplatser** — URL:er som crawlas automatiskt med schemalagd uppdatering\n• **Microsoft 365** — koppla Outlook, SharePoint, Teams och OneDrive\n• **Verktyg via MCP** — externa databaser som Kolada, SCB, Skolverket, Socialstyrelsen, Riksdagen, Sveriges Domstolar m.fl.\n\nSamlingar och webbplatser konverteras till embeddings och lagras i en vektordatabas. Verktyg anropas i realtid.", icon: "Upload" },
        { heading: "Integrationer och säkerhetsklass", text: "Microsoft 365-kopplingar (Outlook, SharePoint, Teams, OneDrive) innehåller intern och ofta känslig data — lokala AI-modeller (GDPR-säker) måste användas. Det gäller alla AI-komponenter i kedjan: språkmodell, embedding-modell och verktyg. MCP-verktyg som Kolada och SCB hämtar offentlig data och kan användas med alla modeller.", icon: "Shield" },
      ],
      municipalExample: { title: "Bilagor vs kunskap i praktiken", description: "HR-assistenten har kommunens 'Riktlinjer för personalärenden' som bilaga — den följer alltid dessa regler. Som kunskap har den samlingarna 'Anställningsavtal' (150 filer), 'Lönepolicy' och 'Arbetsmiljörutiner' samt koppling till SharePoint. Assistenten söker i kunskapen när en fråga ställs, men följer alltid riktlinjerna i bilagan.", department: "HR + IT", icon: "Database" },
      interactiveElement: { type: "match", data: [{ term: "Bilaga", definition: "Instruktioner assistenten alltid följer (riktlinjer, rutiner)" }, { term: "Kunskap/samling", definition: "Sökbart bibliotek med dokument och data" }, { term: "MCP-verktyg", definition: "Realtidskoppling till externa databaser (SCB, Kolada)" }, { term: "Webbplats", definition: "URL som crawlas och indexeras automatiskt" }] },
      summary: ["Bilagor = alltid aktiva instruktioner (riktlinjer, rutiner). Kunskap = sökbart bibliotek (dokument, data)", "Kunskapskällor: samlingar, webbplatser, Microsoft 365 och MCP-verktyg", "M365-kopplingar kräver lokala modeller — MCP-verktyg med offentlig data kan använda alla modeller"],
    },
  },
  {
    id: "les-2-2-2-2", moduleId: "mod-2-2-2", title: "Webbcrawling och uppdatering", order: 2, estimatedMinutes: 6, type: "reading",
    conceptIds: ["webbcrawling"],
    content: {
      hook: "Vad händer om kommunens webbsida uppdateras? Ska du manuellt ladda upp dokument varje gång? Nej — webbcrawling löser det.",
      sections: [
        { heading: "Webbcrawling", text: "Space-Admins kan ansluta webbplatser under Kunskap → Webbplatser. Intric crawlar (läser in) innehållet och du kan schemalägga automatisk uppdatering, t.ex. varje vecka. Det finns två metoder: Basic Crawl (följer länkar, vanligast) och Sitemap (läser sitemap.xml, bättre täckning). I framtiden kommer integrationer och MCP att ersätta webbcrawling för många användningsfall.", icon: "Globe" },
        { heading: "Håll kunskapen aktuell", text: "Tips för att hålla assistentens kunskap fräsch:\n\n• **Granska regelbundet** — ta bort föråldrade dokument\n• **Namnge tydligt** — 'Resepolicy_2025.pdf' inte 'dokument3.pdf'\n• **Testa efter uppdatering** — ställ kontrollfrågor till assistenten", icon: "RefreshCw" },
      ],
      municipalExample: { title: "Kunskap i praktiken", description: "Kommunen använder en mix av kunskapskällor: samlingar med interna dokument (policyer, mötesprotokoll), webbcrawling av katrineholm.se och vardhandboken.se, samt MCP-verktyg som Kolada och SCB för statistik. Trenden går mot fler integrationer och MCP — de ger mer exakt och aktuell data än crawling.", department: "Digitalisering", icon: "Newspaper" },
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
        { heading: "Bilagor — extra instruktioner", text: "Utöver systempromten kan du ladda upp **bilagor** — dokument med riktlinjer eller viktig information som assistenten alltid ser. Bilagor är perfekta för långa instruktioner, tabeller eller mallar som inte passar i promptfältet. Assistenten behandlar bilagor som en del av sina instruktioner.", icon: "Paperclip" },
        { heading: "Vanliga misstag", text: "• **För vag**: 'Var hjälpsam' → bättre: 'Svara alltid med max 3 meningar, hänvisa till dokumentnamn'\n• **Inga begränsningar**: utan 'säg att du inte vet' hittar AI:n på svar\n• **Glömd ton**: utan tonanvisning kan assistenten vara opersonlig\n• **För lång**: en systemprompt på 2000 ord äter kontextfönster. Håll den under 500 ord. Använd bilagor för längre instruktioner.", icon: "AlertCircle" },
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
        { heading: "Publicera och dela", text: "När assistenten är testad och redo ändrar du status till **Published** under Publicering. Då blir den tillgänglig för alla användare med visningsåtkomst till spacet. Du kan också aktivera **Insights** — då kan administratörer se historiken av användarfrågor och följa hur assistenten används.\n\nAdministratörer kan dessutom skapa en **widget** — en inbäddningsbar chatt som kan placeras på intranätet eller en webbsida. Widgets kopplas till spacets integritetspolicy.", icon: "ExternalLink" },
      ],
      municipalExample: { title: "Testning i praktiken", description: "HR-assistenten testades med: 'Hur lång är uppsägningstiden?' (grund), 'Kan du boka en restaurang?' (kantfall), 'Stämmer det att vi har 40 semesterdagar?' (felaktig premiss), 'Berätta om semesterlagen' (tonfall). Resultatet ledde till 3 justeringar i systempromten. Insights aktiverades för att följa användningen över tid.", department: "HR + IT", icon: "ClipboardCheck" },
      interactiveElement: { type: "true-false", data: { statement: "Det räcker att testa assistenten med 2-3 frågor innan man publicerar den.", isTrue: false, explanation: "Nej! Systematisk testning med grundfrågor, kantfall, felaktiga premisser och tonfall krävs för en pålitlig assistent." } },
      summary: ["Testa med grundfrågor, kantfall, felaktiga premisser och tonfallsfrågor", "Publicera gör assistenten tillgänglig — Insights ger inblick i användningen", "Widgets (admin-funktion) bäddar in assistenten på webbsidor"],
    },
  },
  {
    id: "les-2-2-4-2", moduleId: "mod-2-2-4", title: "Iterera och förbättra", order: 2, estimatedMinutes: 6, type: "reading",
    conceptIds: ["intric-mallar"],
    content: {
      hook: "De bästa assistenterna byggs inte på en dag. De förbättras iterativt — baserat på verklig användning och feedback.",
      sections: [
        { heading: "Feedback-loopen", text: "1. **Lansera** — publicera assistenten för en liten grupp\n2. **Samla feedback** — vad funkar? Vad saknas? Vilka frågor klarar den inte?\n3. **Förbättra** — justera systemprompt, lägg till kunskap, fixa luckor\n4. **Bredda** — när kvaliteten är god, öppna för fler användare\n\nDen här loopen tar aldrig slut — assistenten ska alltid bli bättre.", icon: "RefreshCw" },
        { heading: "Dela och återanvänd", text: "Intric har flera sätt att sprida bra assistenter:\n\n• **Delningskod** — dela via en kod (intric-asc-...). Viktigt att veta: delningskoden kopierar **bara namn, beskrivning och prompt** — INTE kunskap eller verktyg. Uppladdaren kan ange instruktioner som beskriver vilka verktyg och AI-modell som rekommenderas, men mottagaren måste konfigurera dem manuellt och koppla sin egen kunskap.\n• **Prompthistorik** — systempromten har versionshistorik (klockikonen). Gå tillbaka till en tidigare version om en ändring försämrade kvaliteten.\n• **Insights** — se vilka frågor som ställs och identifiera förbättringsområden.", icon: "Copy" },
      ],
      municipalExample: { title: "Från pilot till produktion", description: "Socialtjänstens FAQ-assistent startade med 5 testanvändare. Feedback ledde till 8 promptjusteringar och 4 nya dokument. Delningskoden spreds till andra förvaltningar — de importerade assistentens prompt och anpassade den med sin egen kunskap och verktyg. Instruktionerna i delningen beskrev vilka modeller och verktyg som rekommenderades.", department: "Socialtjänsten", icon: "TrendingUp" },
      interactiveElement: { type: "fill-blank", data: { sentence: "Feedback-loopen för assistenter: lansera → samla feedback → ___ → bredda.", correctAnswer: "förbättra", distractors: ["ta bort", "ignorera", "starta om"] } },
      summary: ["Assistenter förbättras iterativt — lansera, samla feedback, förbättra, bredda", "Delningskod kopierar prompt men INTE kunskap eller verktyg — mottagaren konfigurerar själv", "Prompthistorik och Insights hjälper dig förbättra över tid"],
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
        { heading: "Två versioner av Copilot", text: "Det finns två versioner:\n\n• **Copilot Basic (gratis)** — Chatt på copilot.microsoft.com. Generell AI för frågor, skrivhjälp och sökning. Begränsad funktionalitet i Office-webbappar. Kan INTE läsa dina mejl, filer eller Teams-chattar. De flesta medarbetare har denna version.\n• **Microsoft 365 Copilot (licens)** — Full integration i Word, Excel, PowerPoint, Teams och Outlook. Kopplad till Microsoft Graph — kan läsa dina mejl, filer, kalendrar och möten. Kräver separat licens (~300 kr/mån per användare).\n\nSkillnaden: med licens blir Copilot en assistent som känner till ditt arbete. Utan licens är det en smart chatt utan kontext.", icon: "Laptop" },
        { heading: "Vad kan Copilot med licens?", text: "Med Microsoft 365 Copilot-licens finns AI inbyggt i:\n• **Word** — skriv, sammanfatta, omformulera\n• **Excel** — analysera data, skapa formler\n• **PowerPoint** — skapa presentationer från dokument\n• **Teams** — sammanfatta möten i realtid\n• **Outlook** — skriva och sammanfatta mejl\n• **Copilot Chat** — fristående chatt med tillgång till all din M365-data", icon: "Grid" },
      ],
      municipalExample: { title: "Copilot på kommunen", description: "De flesta medarbetare i Katrineholms kommun har Copilot Basic — en gratis AI-chatt utan koppling till era dokument och mejl. Ett fåtal har den fulla Copilot-licensen med integration i Word, Teams och Outlook. Kontakta IT-avdelningen om du vill veta mer om licens.", department: "IT", icon: "Monitor" },
      interactiveElement: { type: "multi-choice", data: { question: "Vad är den största skillnaden mellan Copilot Basic och Copilot med licens?", options: ["Licens-versionen är snabbare", "Licens-versionen har tillgång till dina Microsoft 365-data", "Det finns ingen skillnad", "Basic-versionen fungerar bara på mobilen"], correctIndex: 1, explanation: "Med licens kopplas Copilot till Microsoft Graph och kan läsa dina mejl, filer, möten och Teams-chattar. Basic har inte den tillgången." } },
      summary: ["Copilot Basic (gratis) = smart chatt utan koppling till dina data", "Copilot med licens = AI inbyggt i Office med tillgång till mejl, filer och möten", "De flesta har Basic — kontakta IT om du vill ha licens"],
    },
  },
  {
    id: "les-2-3-1-2", moduleId: "mod-2-3-1", title: "Copilot-licens och säkerhet", order: 2, estimatedMinutes: 6, type: "reading",
    conceptIds: ["copilot-licens"],
    content: {
      hook: "Copilot är kraftfullt — men det väcker också frågor. Vem kan se vad? Läser Microsoft mina mejl? Här klargör vi.",
      sections: [
        { heading: "Licens och åtkomst", text: "De flesta funktionerna i denna kurs kräver Microsoft 365 Copilot-licens. Utan licens har du bara Copilot Basic (gratis chatt). Licensen kostar ~300 kr/mån per användare och kommunens IT-avdelning bestämmer vem som får den. Även utan licens är det värdefullt att förstå vad Copilot kan — så du vet vad som är möjligt.", icon: "Key" },
        { heading: "Säkerhet och integritet", text: "Copilot med licens respekterar existerande behörigheter. Du ser bara data du redan har åtkomst till — ingen bakdörr. Dina data används INTE för att träna AI-modellen. All bearbetning sker inom Microsofts EU-datacenter. GDPR-krav uppfylls.", icon: "Shield" },
      ],
      municipalExample: { title: "Behörigheter i praktiken", description: "Om du inte har åtkomst till ekonomiavdelningens filer i SharePoint, kan Copilot inte heller läsa dem åt dig. Behörigheterna är desamma. Även med Copilot Basic kan du använda den som en smart skrivhjälp — men utan koppling till organisationens data.", department: "IT", icon: "Lock" },
      interactiveElement: { type: "true-false", data: { statement: "Copilot kan visa data som du normalt inte har behörighet att se.", isTrue: false, explanation: "Nej! Copilot respekterar existerande behörigheter. Du kan bara se data du redan har åtkomst till." } },
      summary: ["Copilot kräver separat licens — kontakta IT", "Respekterar existerande behörigheter — ingen bakdörr", "Data används inte för träning, bearbetas inom EU"],
    },
  },

  // --- Modul 2.3.2: Copilot i Word, Excel & PowerPoint ---
  {
    id: "les-2-3-2-1", moduleId: "mod-2-3-2", title: "Copilot i Word", order: 1, estimatedMinutes: 7, type: "reading",
    conceptIds: ["copilot-word"],
    content: {
      hook: "Att starta med ett tomt dokument är det svåraste. Med Copilot i Word behöver du aldrig börja från noll igen. (Funktionerna nedan kräver Microsoft 365 Copilot-licens.)",
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
      hook: "Excel-formler som tar 20 minuter att googla? Copilot skriver dem på 5 sekunder. Presentationer som tar en förmiddag? 30 sekunder. (Kräver Microsoft 365 Copilot-licens.)",
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
      hook: "Missade du ett möte? Copilot i Teams kan ge dig en komplett sammanfattning — inklusive beslut, åtgärdspunkter och vem som sa vad. (Kräver Microsoft 365 Copilot-licens.)",
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
      hook: "Du har 47 olästa mejl en måndagmorgon. Med Copilot kan du hantera dem på en bråkdel av tiden. (Kräver Microsoft 365 Copilot-licens.)",
      sections: [
        { heading: "Mejlhantering med AI", text: "• **Sammanfatta tråd** — 'Sammanfatta denna mejlkonversation' (perfekt för långa trådar)\n• **Skriva svar** — 'Skriv ett professionellt svar som tackar ja till mötet'\n• **Tona om** — 'Gör detta svar mer formellt' eller 'Mer vänligt'\n• **Skriva från scratch** — 'Skriv ett mejl till leverantören om försening'", icon: "Mail" },
        { heading: "Smart prioritering", text: "Copilot kan hjälpa dig prioritera din inkorg genom att identifiera vilka mejl som kräver svar, vilka som är informativa och vilka som kan arkiveras. Be Copilot: 'Vilka mejl behöver jag agera på idag?'", icon: "ListChecks" },
      ],
      municipalExample: { title: "Mejl på halva tiden", description: "En enhetschef fick 23 mejl under semestern. Med Copilot: sammanfattade 5 långa mejltrådar (2 min), skrev 8 svar med rätt ton (5 min), identifierade 3 brådskande ärenden. Total tid: 15 min istället för 60+ min.", department: "Alla", icon: "Clock" },
      interactiveElement: { type: "true-false", data: { statement: "Copilot i Outlook kan sammanfatta långa mejltrådar med flera deltagare.", isTrue: true, explanation: "Ja! Det är en av Copilots starkaste funktioner — den kan sammanfatta hela mejlkonversationer och lyfta ut beslut och frågor." } },
      summary: ["Sammanfatta mejltrådar, skriv svar, tona om — allt direkt i Outlook", "Smart prioritering: 'Vilka mejl behöver jag agera på idag?'", "Granska alltid AI-genererade mejl innan du skickar"],
    },
  },

  // --- Modul 2.3.4: Copilot i praktiken ---
  {
    id: "les-2-3-4-1", moduleId: "mod-2-3-4", title: "Copilot Basic — utan licens", order: 1, estimatedMinutes: 7, type: "reading",
    conceptIds: ["copilot-basic"],
    content: {
      hook: "Du har inte Copilot-licens? Ingen fara — Copilot Basic kan fortfarande hjälpa dig i vardagen. Här visar vi hur.",
      sections: [
        { heading: "Vad du kan göra med Basic", text: "Copilot Basic (copilot.microsoft.com) är gratis och fungerar som en smart AI-chatt:\n\n• **Skrivhjälp** — 'Hjälp mig formulera ett mejlsvar till en missnöjd invånare'\n• **Sammanfattning** — klistra in text och be om sammanfattning\n• **Brainstorming** — 'Ge mig 5 förslag på rubriker till nyhetsbrevet'\n• **Enkel analys** — 'Förklara denna text i enklare ord'\n• **Sökning** — ställ frågor och få svar med webbkällor\n\nDu kan också bifoga filer direkt i chatten.", icon: "MessageSquare" },
        { heading: "Begränsningar att känna till", text: "Copilot Basic kan INTE:\n• Läsa dina mejl, Teams-chattar eller OneDrive-filer\n• Sammanfatta Teams-möten\n• Arbeta direkt inne i Word, Excel eller PowerPoint\n• Komma åt organisationens interna data\n\nFör det behövs antingen Copilot-licens eller Intric (som har tillgång till kommunens dokument).", icon: "AlertCircle" },
      ],
      municipalExample: { title: "Copilot Basic i vardagen", description: "Utan licens kan du fortfarande: formulera mejlsvar (kopiera in texten → be om hjälp), förbereda mötesagendor, skriva utkast till informationsbrev, och söka information. Det ersätter inte licens-versionen, men det är en bra startpunkt.", department: "Alla", icon: "Lightbulb" },
      interactiveElement: { type: "true-false", data: { statement: "Med Copilot Basic kan du sammanfatta Teams-möten.", isTrue: false, explanation: "Nej! Mötessammanfattning kräver Microsoft 365 Copilot-licens. Basic har inte tillgång till Teams-data." } },
      summary: ["Copilot Basic = gratis AI-chatt för skrivhjälp, sammanfattning och brainstorming", "Kan inte läsa dina mejl, filer eller möten — det kräver licens", "Bra startpunkt som kompletteras av Intric för organisationskunskap"],
    },
  },
  {
    id: "les-2-3-4-2", moduleId: "mod-2-3-4", title: "Copilot vs Intric — rätt verktyg", order: 2, estimatedMinutes: 6, type: "reading",
    conceptIds: ["copilot-vs-intric"],
    content: {
      hook: "Kommunen har både Intric och Copilot. Men vilket verktyg ska du använda när? Här får du en tydlig guide.",
      sections: [
        { heading: "Välj rätt verktyg", text: "**Använd Intric när du vill:**\n• Söka i kommunens egna dokument och policyer\n• Få svar baserat på intern kunskap (RAG)\n• Använda verktyg som Kolada, SCB, Skolverket\n• Arbeta med känslig data (GDPR-säkra modeller)\n\n**Använd Copilot (med licens) när du vill:**\n• Skriva och redigera direkt i Word, Excel, PowerPoint\n• Sammanfatta Teams-möten och mejltrådar\n• Arbeta med dina personliga M365-filer\n\n**Använd Copilot Basic när du vill:**\n• Ha snabb skrivhjälp eller brainstorma\n• Sammanfatta text du klistrar in\n• Söka på webben med AI", icon: "GitCompare" },
        { heading: "Vanliga misstag", text: "• **Klistra in personuppgifter i Copilot Basic** — det är en extern tjänst utan GDPR-garanti. Använd Intric istället.\n• **Skicka Copilot-text utan granskning** — AI gör misstag. Läs alltid igenom.\n• **Använda Copilot för interna frågor** — Copilot Basic vet inget om kommunens dokument. Intric gör det.\n• **Ge upp efter dåligt svar** — omformulera din prompt, ge mer kontext, testa igen.", icon: "AlertTriangle" },
      ],
      municipalExample: { title: "En typisk arbetsdag", description: "09:00 — Kolla iKAI i Intric: 'Vad gäller för semesteransökan före midsommar?' (intern policy). 10:00 — Copilot i Word: 'Skriv ett utkast till informationsbrev baserat på beslutet' (kräver licens). 14:00 — Copilot Basic: 'Hjälp mig formulera ett artigt nej-tack till en leverantör' (generell skrivhjälp). Tre verktyg, tre användningsfall.", department: "Alla", icon: "Calendar" },
      interactiveElement: { type: "match", data: [{ term: "Intric", definition: "Svar baserat på kommunens egna dokument och policyer" }, { term: "Copilot med licens", definition: "Skriva i Word, sammanfatta möten, mejlhantering" }, { term: "Copilot Basic", definition: "Gratis AI-chatt för skrivhjälp och brainstorming" }, { term: "Ingen AI", definition: "Beslut som kräver mänskligt omdöme och ansvar" }] },
      summary: ["Intric = organisationskunskap och känslig data. Copilot = Office-produktivitet. Basic = snabb skrivhjälp.", "Klistra ALDRIG in personuppgifter i Copilot Basic — använd Intric", "Granska alltid AI-genererad text innan du använder den"],
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
  { id: "aq-2-1-1", moduleId: "mod-2-1-1", question: "Varför kostar svenska text fler tokens än engelska?", options: ["Svenska ord delas i fler delar av tokenizern", "Svenska har fler bokstäver", "AI förstår inte svenska", "Det gör den inte"], correctIndex: 0, explanation: "Svenska sammansatta ord bryts ner i fler delar/tokens av AI:ns tokenizer." },
  { id: "aq-2-1-2", moduleId: "mod-2-1-1", question: "Vad händer när kontextfönstret fylls?", options: ["AI:n kraschar", "AI:n börjar 'glömma' äldre delar av konversationen", "AI:n blir snabbare", "Inget särskilt"], correctIndex: 1, explanation: "AI:n tappar de äldsta delarna — därför blir långa chattar sämre mot slutet." },
  { id: "aq-2-1-3", moduleId: "mod-2-1-1", question: "Vad är en embedding?", options: ["En typ av bild", "En sorts kryptering", "En talvektor som representerar textens betydelse", "Ett komprimerat dokument"], correctIndex: 2, explanation: "Embeddings omvandlar text till talvektorer som fångar semantisk betydelse." },
  { id: "aq-2-1-4", moduleId: "mod-2-1-1", question: "Vad möjliggör embeddings?", options: ["Snabbare internet", "Bättre bilder", "Automatisk översättning", "Semantisk sökning — hitta liknande betydelser"], correctIndex: 3, explanation: "Embeddings gör att system kan hitta likartade betydelser, inte bara exakta ordmatchningar." },
  { id: "aq-2-1-5", moduleId: "mod-2-1-1", question: "Vad innebär semantisk sökning?", options: ["Sökning baserad på betydelse", "Sökning baserad på exakta ord", "Sökning på internet", "Sökning i databaser"], correctIndex: 0, explanation: "Semantisk sökning förstår vad du menar, inte bara vilka ord du använder." },
  { id: "aq-2-1-6", moduleId: "mod-2-1-2", question: "Vad gör attention-mekanismen?", options: ["Ger AI tillgång till internet", "Låter AI fokusera på relevanta delar av texten", "Ökar AI:ns hastighet", "Minskar minnesanvändning"], correctIndex: 1, explanation: "Attention låter AI:n väga samband mellan alla ord i texten — oavsett avstånd." },
  { id: "aq-2-1-7", moduleId: "mod-2-1-2", question: "Alla moderna språkmodeller bygger på:", options: ["Regelbaserad programmering", "Enkel statistik", "Transformer-arkitekturen", "Manuellt skrivna svar"], correctIndex: 2, explanation: "GPT, Claude, Gemini — alla bygger på transformer med attention-mekanismen." },
  { id: "aq-2-1-8", moduleId: "mod-2-1-2", question: "Vad är förträning?", options: ["Att manuellt programmera regler", "Att testa modellen före lansering", "Att installera programvaran", "Att mata modellen med miljarder texter för att lära sig mönster"], correctIndex: 3, explanation: "Förträning = modellen läser enorm mängd text och lär sig språkets mönster." },
  { id: "aq-2-1-9", moduleId: "mod-2-1-2", question: "RLHF står för:", options: ["Reinforcement Learning from Human Feedback", "Real-time Language Help Function", "Rapid Learning High Frequency", "Remote Learning for Higher Functions"], correctIndex: 0, explanation: "RLHF = människor rankar svar så att modellen lär sig vara mer hjälpsam och säker." },
  { id: "aq-2-1-10", moduleId: "mod-2-1-2", question: "Varför behövs finjustering efter förträning?", options: ["Modellen är för stor", "Modellen vet allt men kan inte föra bra samtal", "Förträningen misslyckas alltid", "Det behövs inte"], correctIndex: 1, explanation: "Förträning ger kunskap, finjustering lär modellen att vara hjälpsam och kommunicera väl." },
  { id: "aq-2-1-11", moduleId: "mod-2-1-3", question: "RAG står för:", options: ["Random Access Generation", "Rapid AI Growth", "Retrieval-Augmented Generation", "Real-time AI Gateway"], correctIndex: 2, explanation: "RAG = sök relevant info (Retrieval) och använd den för att generera svar (Generation)." },
  { id: "aq-2-1-12", moduleId: "mod-2-1-3", question: "Vad lagrar en vektordatabas?", options: ["Bilder", "Lösenord", "Webbsidor", "Embeddings (talvektorer) av dokument"], correctIndex: 3, explanation: "Vektordatabasen lagrar dokument som embeddings — talvektorer som representerar betydelse." },
  { id: "aq-2-1-13", moduleId: "mod-2-1-3", question: "Varför är RAG viktigt för organisationer?", options: ["AI kan svara baserat på organisationens EGNA dokument", "Det är billigare", "Det gör AI snabbare", "Det krävs av lag"], correctIndex: 0, explanation: "RAG gör att AI:n kan ge svar grundade i organisationens kunskap, inte bara allmän träningsdata." },
  { id: "aq-2-1-14", moduleId: "mod-2-1-3", question: "Semantisk sökning kan hitta relevanta dokument även om:", options: ["Dokumenten är krypterade", "Du använder andra ord än dokumentet", "Dokumenten är på ett annat språk", "Dokumenten är raderade"], correctIndex: 1, explanation: "Semantisk sökning matchar betydelse, inte exakta ord — 'bygglöv' matchar 'bygglovsansökan'." },
  { id: "aq-2-1-15", moduleId: "mod-2-1-3", question: "I RAG-flödet: vad händer först?", options: ["LLM:en genererar svar", "Användaren får ett svar", "Frågan konverteras till embedding och matchas mot dokument", "Dokumenten raderas"], correctIndex: 2, explanation: "Först söker systemet relevanta dokument (retrieval), sedan genererar LLM:en ett svar baserat på dem." },
  { id: "aq-2-1-16", moduleId: "mod-2-1-4", question: "Ett API är:", options: ["En typ av AI-modell", "En webbsida", "Ett programmeringsspråk", "Ett standardiserat gränssnitt mellan system"], correctIndex: 3, explanation: "API = Application Programming Interface — standardiserat sätt för program att kommunicera." },
  { id: "aq-2-1-17", moduleId: "mod-2-1-4", question: "Vad är en webhook?", options: ["En URL som tar emot data automatiskt vid händelser", "En typ av webbsida", "Ett lösenord", "En sökmotor"], correctIndex: 0, explanation: "Webhook = automatisk notifiering via URL när något händer — push istället för polling." },
  { id: "aq-2-1-18", moduleId: "mod-2-1-4", question: "Skillnaden mellan API och webhook:", options: ["API är snabbare", "API = du frågar, webhook = du blir notifierad", "Webhook är säkrare", "Det finns ingen skillnad"], correctIndex: 1, explanation: "API = pull (du frågar), webhook = push (du blir kontaktad automatiskt)." },
  { id: "aq-2-1-19", moduleId: "mod-2-1-4", question: "Intric använder API:er för att:", options: ["Visa bilder", "Skicka SMS", "Koppla till språkmodeller som Claude och GPT", "Spela musik"], correctIndex: 2, explanation: "Intric anropar LLM-API:er (Claude, GPT) i bakgrunden för att generera svar." },
  { id: "aq-2-1-20", moduleId: "mod-2-1-4", question: "En framtida AI-integration i kommunen kan vara:", options: ["AI som ersätter alla anställda", "AI som kör kommunens bilar", "AI som bygger nya hus", "AI som automatiskt kategoriserar inkomna ärenden"], correctIndex: 3, explanation: "Automatisk ärendekategorisering via API + webhook är ett realistiskt och värdefullt användningsfall." },

  // --- Kurs 2.2: Intric — bygg din egen assistent ---
  { id: "aq-2-2-1", moduleId: "mod-2-2-1", question: "Vad är ett space i Intric?", options: ["En avgränsad arbetsyta med assistenter och kunskap", "En chatbot", "En typ av dokument", "Ett lösenord"], correctIndex: 0, explanation: "Ett space = arbetsyta med egna assistenter, kunskapskällor och behörigheter." },
  { id: "aq-2-2-2", moduleId: "mod-2-2-1", question: "Vilken typ av AI-modell får användas för helt offentlig, icke-känslig information?", options: ["Bara lokala AI-modeller", "Alla AI-modeller — både lokala och externa", "Bara ChatGPT", "Ingen AI-modell får användas"], correctIndex: 1, explanation: "Offentlig, icke-känslig information kan hanteras av alla AI-modeller — både lokala (Sverige/EU) och externa (utomlands)." },
  { id: "aq-2-2-3", moduleId: "mod-2-2-1", question: "Vilken global roll krävs för att skapa ett space i Intric?", options: ["User", "Space-Läsare", "Creator", "Ingen roll behövs"], correctIndex: 2, explanation: "Du måste ha Creator-rollen för att kunna skapa ett space. Users kan bara använda personlig chatt och publicerade assistenter." },
  { id: "aq-2-2-4", moduleId: "mod-2-2-1", question: "Vad kan en Space-Redigerare göra?", options: ["Ändra säkerhetsklassificering och hantera medlemmar", "Bara använda publicerade assistenter", "Administrera hela Intric-plattformen", "Skapa och redigera assistenter och kunskap"], correctIndex: 3, explanation: "Space-Redigerare kan skapa och redigera assistenter och kunskap — men inte ändra medlemmar eller säkerhetsklassificering (det kan bara Space-Admin)." },
  { id: "aq-2-2-5", moduleId: "mod-2-2-1", question: "Vad bör finnas i en bra systemprompt?", options: ["Roll, uppgift, ton, källor och begränsningar", "Bara assistentens namn", "Teknisk dokumentation", "Användarens lösenord"], correctIndex: 0, explanation: "De fem delarna: roll, uppgift, ton, källor och begränsningar." },
  { id: "aq-2-2-6", moduleId: "mod-2-2-2", question: "Vilka kunskapskällor och verktyg kan du ge en Intric-assistent?", options: ["Bara PDF-filer", "Filer, webbsidor, samlingar, Microsoft 365 och externa verktyg via MCP", "Bara webbsidor och dokument", "Bara Excel-filer"], correctIndex: 1, explanation: "Intric stödjer filer, webbsidor, samlingar, Microsoft 365-integration (Outlook, SharePoint, Teams, OneDrive) och MCP-verktyg (Kolada, SCB, Skolverket, Socialstyrelsen m.fl.)." },
  { id: "aq-2-2-7", moduleId: "mod-2-2-2", question: "Vad är en samling i Intric?", options: ["En typ av AI-modell", "En chatt-historik", "En grupp relaterade dokument", "En rapport"], correctIndex: 2, explanation: "Samlingar grupperar relaterade dokument — t.ex. 'Personalpolicyer' eller 'Bygglovsinfo'." },
  { id: "aq-2-2-8", moduleId: "mod-2-2-2", question: "Vad är skillnaden mellan bilagor och kunskap i Intric?", options: ["Det finns ingen skillnad", "Kunskap är viktigare än bilagor", "Bilagor kan bara vara PDF-filer", "Bilagor är alltid aktiva instruktioner, kunskap är ett sökbart bibliotek"], correctIndex: 3, explanation: "Bilagor (riktlinjer, rutiner) ser assistenten alltid. Kunskap (samlingar med dokument) söker assistenten i vid behov." },
  { id: "aq-2-2-9", moduleId: "mod-2-2-2", question: "Hur hålls assistentens kunskap aktuell?", options: ["Genom att granska dokument, schemalägga crawling, synka Microsoft 365 och testa", "Den uppdateras aldrig", "Automatiskt utan insats", "Genom att starta om datorn"], correctIndex: 0, explanation: "Aktiv förvaltning: granska dokument, schemalägga webbcrawling, synka via Microsoft 365-integrationer och testa regelbundet." },
  { id: "aq-2-2-10", moduleId: "mod-2-2-2", question: "'Garbage in, garbage out' i AI-kontext betyder:", options: ["AI skapar skräppost", "Dålig indata ger dåliga svar", "AI fungerar inte med PDF", "Man måste rensa papperkorgen"], correctIndex: 1, explanation: "Om du laddar upp dåliga eller föråldrade dokument, ger assistenten dåliga svar." },
  { id: "aq-2-2-11", moduleId: "mod-2-2-3", question: "De fem delarna av en systemprompt är:", options: ["Namn, datum, plats, tid, kostnad", "Input, process, output, feedback, loop", "Roll, uppgift, ton, källor, begränsningar", "Vem, var, när, hur, varför"], correctIndex: 2, explanation: "Roll + uppgift + ton + källor + begränsningar = komplett systemprompt." },
  { id: "aq-2-2-12", moduleId: "mod-2-2-3", question: "Chain-of-thought i systemprompt innebär:", options: ["Att kedja ihop flera assistenter", "Att skriva en lång prompt", "Att kedja ihop dokument", "Att instruera AI:n att resonera steg för steg"], correctIndex: 3, explanation: "Chain-of-thought = AI:n resonerar steg för steg, vilket ger mer genomtänkta svar." },
  { id: "aq-2-2-13", moduleId: "mod-2-2-3", question: "Vad är few-shot examples?", options: ["Exempelsvar i systempromten som visar önskat format", "Korta prompts", "Testfrågor", "Bilder i prompten"], correctIndex: 0, explanation: "Few-shot examples visar AI:n 2–3 exempel på hur bra svar ser ut." },
  { id: "aq-2-2-14", moduleId: "mod-2-2-3", question: "Varför bör systempromten vara under 500 ord?", options: ["AI kan inte läsa mer", "Längre prompts äter kontextfönster och ger sämre resultat", "Det är en teknisk begränsning", "Det finns ingen gräns"], correctIndex: 1, explanation: "En för lång systemprompt tar plats i kontextfönstret som behövs för dokument och konversation." },
  { id: "aq-2-2-15", moduleId: "mod-2-2-3", question: "Det vanligaste misstaget i systemprompts är:", options: ["Att de är för korta", "Att de skrivs på engelska", "Att de saknar begränsningar — AI:n hittar på svar", "Att de innehåller bilder"], correctIndex: 2, explanation: "Utan 'säg att du inte vet'-begränsning riskerar AI:n att hitta på fakta." },
  { id: "aq-2-2-16", moduleId: "mod-2-2-4", question: "Hur bör du testa en assistent innan publicering?", options: ["Ställ 1 fråga", "Be IT testa", "Publicera direkt och se vad som händer", "Systematiskt med grundfrågor, kantfall, felaktiga premisser och tonfallstest"], correctIndex: 3, explanation: "Systematisk testning med olika typer av frågor fångar problem före publicering." },
  { id: "aq-2-2-17", moduleId: "mod-2-2-4", question: "Vad är en widget i Intric?", options: ["En inbäddningsbar chatt som admin kan placera på en webbsida", "En typ av dokument", "En AI-modell", "Ett diagram"], correctIndex: 0, explanation: "Widget = inbäddningsbar chatt som administratörer kan skapa för att bädda in en assistent på intranät eller webbsida." },
  { id: "aq-2-2-18", moduleId: "mod-2-2-4", question: "Rätt ordning för feedback-loopen:", options: ["Bredda → Lansera → Feedback → Förbättra", "Lansera → Feedback → Förbättra → Bredda", "Förbättra → Lansera → Bredda → Feedback", "Feedback → Lansera → Förbättra → Bredda"], correctIndex: 1, explanation: "Lansera (pilotgrupp) → Samla feedback → Förbättra → Bredda (fler användare)." },
  { id: "aq-2-2-19", moduleId: "mod-2-2-4", question: "Delningskod i Intric används för att:", options: ["Dela lösenord", "Radera assistenter", "Importera en befintlig assistent till ett annat space", "Skicka mejl"], correctIndex: 2, explanation: "Med en delningskod (intric-asc-...) kan du importera en färdig assistent med alla inställningar till ditt space." },
  { id: "aq-2-2-20", moduleId: "mod-2-2-4", question: "Minst hur många testfrågor bör du ställa innan publicering?", options: ["1-2", "100+", "Det behövs inga tester", "10-15"], correctIndex: 3, explanation: "10-15 testfrågor av olika typer ger rimlig täckning av grundfunktionalitet och kantfall." },

  // --- Kurs 2.3: Copilot & Microsoft 365 ---
  { id: "aq-2-3-1", moduleId: "mod-2-3-1", question: "Vad är den största skillnaden mellan Copilot Basic och Copilot med licens?", options: ["Licens-versionen har tillgång till dina M365-data via Microsoft Graph", "Basic är snabbare", "Det finns ingen skillnad", "Basic fungerar bara i Teams"], correctIndex: 0, explanation: "Med licens kopplas Copilot till Microsoft Graph och kan läsa dina mejl, filer, möten och Teams-chattar. Basic saknar den kopplingen." },
  { id: "aq-2-3-2", moduleId: "mod-2-3-1", question: "Vad är Microsoft Graph?", options: ["Ett diagram-verktyg", "En plattform som ger Copilot åtkomst till dina 365-data", "En typ av Excel-formel", "Microsofts sociala nätverk"], correctIndex: 1, explanation: "Microsoft Graph kopplar samman alla dina 365-data — mejl, filer, kalender, Teams." },
  { id: "aq-2-3-3", moduleId: "mod-2-3-1", question: "Copilot kräver:", options: ["Bara en vanlig 365-licens", "Inget särskilt", "En separat Copilot-licens", "En Google-licens"], correctIndex: 2, explanation: "Copilot kräver en separat tilläggslicens utöver vanliga Microsoft 365." },
  { id: "aq-2-3-4", moduleId: "mod-2-3-1", question: "Kan Copilot visa data du normalt inte har åtkomst till?", options: ["Ja, det är poängen", "Bara i Excel", "Bara chefer kan se allt", "Nej, den respekterar existerande behörigheter"], correctIndex: 3, explanation: "Copilot respekterar alltid dina befintliga behörigheter — ingen bakdörr." },
  { id: "aq-2-3-5", moduleId: "mod-2-3-1", question: "Används Copilot-data för att träna AI-modellen?", options: ["Nej", "Ja", "Bara mejl", "Bara i USA"], correctIndex: 0, explanation: "Microsoft använder INTE kunddata för att träna AI-modeller. Data bearbetas och returneras." },
  { id: "aq-2-3-6", moduleId: "mod-2-3-2", question: "Copilot i Word kan:", options: ["Bara rätta stavfel", "Skriva utkast, sammanfatta, omformulera och hämta från andra filer", "Bara läsa högt", "Bara formatera text"], correctIndex: 1, explanation: "Copilot i Word är mångsidigt: skriva, sammanfatta, omformulera och referera andra filer." },
  { id: "aq-2-3-7", moduleId: "mod-2-3-2", question: "Vad krävs för Copilot i Excel?", options: ["Inget särskilt", "Minst 10 kolumner", "Data i tabellformat, fil sparad i OneDrive/SharePoint", "Formler måste finnas"], correctIndex: 2, explanation: "Data måste vara i tabell-format och filen sparad i molnet." },
  { id: "aq-2-3-8", moduleId: "mod-2-3-2", question: "Copilot i PowerPoint kan:", options: ["Bara lägga till bilder", "Bara ändra bakgrund", "Inget av ovanstående", "Skapa presentationer från dokument, omorganisera och lägga till talarpunkter"], correctIndex: 3, explanation: "Copilot i PowerPoint skapar slides från dokument, omorganiserar och lägger till talarpunkter." },
  { id: "aq-2-3-9", moduleId: "mod-2-3-2", question: "Vad bör du alltid göra med Copilot-genererad text?", options: ["Granska innan du använder den", "Skicka direkt", "Radera den", "Översätta till engelska"], correctIndex: 0, explanation: "Granska ALLTID — Copilot skriver utkast, du godkänner." },
  { id: "aq-2-3-10", moduleId: "mod-2-3-2", question: "Copilot i Excel kan hjälpa med:", options: ["Bara enkla summeringar", "Analys, formler, diagram och mönster", "Bara formatering", "Bara filtrering"], correctIndex: 1, explanation: "Copilot i Excel analyserar data, skapar formler och diagram, och hittar trender." },
  { id: "aq-2-3-11", moduleId: "mod-2-3-3", question: "Copilot i Teams kan under ett möte:", options: ["Bara spela in", "Bara transkribera", "Sammanfatta hittills, fånga beslut och svara på frågor", "Inget — det fungerar bara efteråt"], correctIndex: 2, explanation: "Under mötet kan Copilot sammanfatta i realtid, fånga beslut och svara på frågor." },
  { id: "aq-2-3-12", moduleId: "mod-2-3-3", question: "Vad krävs för att Copilot ska kunna sammanfatta ett möte?", options: ["Att alla har Copilot", "Att mötet är på engelska", "Att chefen ger tillåtelse", "Att mötet spelas in eller transkriberas"], correctIndex: 3, explanation: "Mötet måste spelas in eller transkriberas för att Copilot ska ha data att arbeta med." },
  { id: "aq-2-3-13", moduleId: "mod-2-3-3", question: "Copilot i Outlook kan:", options: ["Sammanfatta trådar, skriva svar och hjälpa prioritera", "Bara sortera mejl", "Bara radera mejl", "Bara skicka automatiska svar"], correctIndex: 0, explanation: "Copilot i Outlook sammanfattar, skriver svar, tonar om och hjälper prioritera." },
  { id: "aq-2-3-14", moduleId: "mod-2-3-3", question: "En bra Copilot-prompt i Outlook är:", options: ["Skriv svar", "Skriv ett professionellt svar som tackar ja till mötet och föreslår en annan tid", "Svar", "Mejl"], correctIndex: 1, explanation: "Specifik prompt med ton (professionell), åtgärd (tacka ja) och tillägg (föreslå tid)." },
  { id: "aq-2-3-15", moduleId: "mod-2-3-3", question: "Bör du alltid granska Copilot-genererade mejl?", options: ["Nej, de är alltid korrekta", "Bara långa mejl", "Ja, alltid", "Bara mejl till chefer"], correctIndex: 2, explanation: "ALLTID granska — Copilot kan ha fel ton, missa kontext eller skriva felaktigt." },
  { id: "aq-2-3-16", moduleId: "mod-2-3-4", question: "Vad kan du göra med Copilot Basic (utan licens)?", options: ["Sammanfatta Teams-möten", "Redigera direkt i Word med AI", "Läsa dina mejl i Outlook", "Använda AI-chatt för skrivhjälp, sammanfattning och brainstorming"], correctIndex: 3, explanation: "Copilot Basic är en gratis AI-chatt. Möten, Word-integration och mejlåtkomst kräver licens." },
  { id: "aq-2-3-17", moduleId: "mod-2-3-4", question: "Varför ska du INTE klistra in personuppgifter i Copilot Basic?", options: ["Det är en extern tjänst utan GDPR-garanti för känslig data", "Det är för långsamt", "Det fungerar inte tekniskt", "Det kostar extra"], correctIndex: 0, explanation: "Copilot Basic saknar GDPR-garantier för känslig data. Använd Intric med lokala modeller för personuppgifter." },
  { id: "aq-2-3-18", moduleId: "mod-2-3-4", question: "När ska du använda Intric istället för Copilot?", options: ["Alltid", "När du behöver svar baserat på kommunens egna dokument eller hanterar känslig data", "Aldrig — Copilot är alltid bättre", "Bara på fredagar"], correctIndex: 1, explanation: "Intric har tillgång till kommunens dokument via RAG och kan använda GDPR-säkra modeller. Copilot saknar den interna kunskapen." },
  { id: "aq-2-3-19", moduleId: "mod-2-3-4", question: "Vad bör du alltid göra med AI-genererad text?", options: ["Skicka direkt utan att läsa", "Radera den", "Granska och redigera innan du använder den", "Översätta till engelska"], correctIndex: 2, explanation: "AI gör misstag. Granska alltid — oavsett om det är Copilot, Intric eller något annat AI-verktyg." },
  { id: "aq-2-3-20", moduleId: "mod-2-3-4", question: "Copilot Basic, Copilot med licens och Intric:", options: ["Gör exakt samma sak", "Ska aldrig användas tillsammans", "Är bara för IT-avdelningen", "Är tre olika verktyg med olika styrkor som kompletterar varandra"], correctIndex: 3, explanation: "Basic = gratis skrivhjälp. Licens = Office-integration med dina data. Intric = organisationskunskap och GDPR-säkert." },

  // --- Kurs 2.4: Lagar, regler & etik ---
  { id: "aq-2-4-1", moduleId: "mod-2-4-1", question: "AI Act delar in AI-system i:", options: ["4 risknivåer", "2 kategorier", "10 klasser", "Inga kategorier"], correctIndex: 0, explanation: "Oacceptabel, hög, begränsad och minimal risk — fyra nivåer." },
  { id: "aq-2-4-2", moduleId: "mod-2-4-1", question: "Vad avgör risknivån i AI Act?", options: ["Priset", "Användningen och konsekvenserna", "Leverantörens storlek", "Modellens ålder"], correctIndex: 1, explanation: "Det är HUR AI:n används och vilken påverkan den har som bestämmer risknivån." },
  { id: "aq-2-4-3", moduleId: "mod-2-4-1", question: "Chatbotar måste enligt AI Act:", options: ["Vara gratis", "Vara godkända av regeringen", "Informera användaren om att de interagerar med AI", "Bara finnas på engelska"], correctIndex: 2, explanation: "Transparenskrav: användare ska veta att de pratar med AI." },
  { id: "aq-2-4-4", moduleId: "mod-2-4-1", question: "AI i rekrytering klassas troligtvis som:", options: ["Minimal risk", "Begränsad risk", "Oacceptabel risk", "Hög risk"], correctIndex: 3, explanation: "AI som påverkar människors anställning klassas som hög risk enligt AI Act." },
  { id: "aq-2-4-5", moduleId: "mod-2-4-1", question: "Intric för mötessammanfattning klassas som:", options: ["Begränsad eller minimal risk", "Oacceptabel risk", "Hög risk", "Förbjudet"], correctIndex: 0, explanation: "Text-sammanfattning utan beslutspåverkan = låg risk." },
  { id: "aq-2-4-6", moduleId: "mod-2-4-2", question: "DPIA ska genomföras:", options: ["Efter att AI-systemet lanserats", "Innan AI-systemet som hanterar personuppgifter införs", "Bara vid dataintrång", "Aldrig för kommuner"], correctIndex: 1, explanation: "DPIA görs INNAN — det är en förebyggande åtgärd." },
  { id: "aq-2-4-7", moduleId: "mod-2-4-2", question: "Dataskyddsombudets roll är att:", options: ["Utveckla AI-system", "Fatta alla AI-beslut", "Råda, övervaka GDPR-efterlevnad och vara kontakt mot IMY", "Installera programvara"], correctIndex: 2, explanation: "DSO rådger, övervakar och är kontaktpunkt — men fattar inte själv beslut." },
  { id: "aq-2-4-8", moduleId: "mod-2-4-2", question: "Privacy by design innebär:", options: ["Att ha ett snyggt gränssnitt", "Att dölja AI:n", "Att radera alla data dagligen", "Att integritets­skydd byggs in från start"], correctIndex: 3, explanation: "Privacy by design = skydd från början, inte lagt till efteråt." },
  { id: "aq-2-4-9", moduleId: "mod-2-4-2", question: "Vem är personuppgiftsansvarig när kommunen använder AI?", options: ["Kommunen som organisation", "Medarbetaren", "AI-leverantören", "Ingen"], correctIndex: 0, explanation: "Kommunen bär personuppgiftsansvaret — inte individen, inte leverantören." },
  { id: "aq-2-4-10", moduleId: "mod-2-4-2", question: "PUB-avtal krävs:", options: ["Bara för personnummer", "Alltid när leverantör behandlar personuppgifter", "Bara för utländska leverantörer", "Aldrig för svenska leverantörer"], correctIndex: 1, explanation: "PUB-avtal krävs vid ALL personuppgiftsbehandling av leverantör." },
  { id: "aq-2-4-11", moduleId: "mod-2-4-3", question: "Etik i AI-användning handlar om:", options: ["Att följa lagen minimalt", "Att undvika AI helt", "Att gå utöver lagen med principer som rättvisa och transparens", "Att använda den dyraste modellen"], correctIndex: 2, explanation: "Etik > lag — som offentlig sektor ska vi vara föredömen." },
  { id: "aq-2-4-12", moduleId: "mod-2-4-3", question: "Algoritmisk rättvisa innebär:", options: ["Att AI alltid har rätt", "Att alla får samma svar", "Att AI behandlar alla anonymt", "Att AI:ns resultat inte systematiskt missgynnar grupper"], correctIndex: 3, explanation: "Algoritmisk rättvisa = AI:n ska inte reproducera diskriminering." },
  { id: "aq-2-4-13", moduleId: "mod-2-4-3", question: "DIGG:s principer för tillförlitlig AI inkluderar:", options: ["Mänsklig kontroll, transparens, rättvisa, samhällsnytta m.fl.", "Bara säkerhet", "Bara kostnadseffektivitet", "Bara hastighet"], correctIndex: 0, explanation: "7 principer: kontroll, robusthet, integritet, transparens, rättvisa, nytta, ansvarsutkrävande." },
  { id: "aq-2-4-14", moduleId: "mod-2-4-3", question: "Ansvarsfull AI kräver inte bara policy utan också:", options: ["Mer pengar", "En kultur som uppmuntrar ifrågasättande och diskussion", "Snabbare datorer", "Fler chefer"], correctIndex: 1, explanation: "Kultur > policy — medarbetare ska våga ifrågasätta AI:ns resultat." },
  { id: "aq-2-4-15", moduleId: "mod-2-4-3", question: "AI-etik i offentlig sektor är extra viktigt för att:", options: ["Det är dyrt", "Chefer kräver det", "Invånare har rätt till likabehandling och transparens", "Det ser bra ut i media"], correctIndex: 2, explanation: "Offentlig sektor har ett demokratiskt ansvar för likabehandling och transparens." },
  { id: "aq-2-4-16", moduleId: "mod-2-4-4", question: "Vid upphandling av AI bör kravspecen inkludera:", options: ["Bara priset", "Bara leveranstid", "Bara antal användare", "Datasäkerhet, GDPR, transparens, exit-strategi"], correctIndex: 3, explanation: "En komplett kravspec täcker säkerhet, juridik, transparens och exit." },
  { id: "aq-2-4-17", moduleId: "mod-2-4-4", question: "Den viktigaste frågan till en AI-leverantör:", options: ["Används vår data för att träna modellen?", "Hur snabb är tjänsten?", "Har ni en app?", "Hur många anställda har ni?"], correctIndex: 0, explanation: "Dataträning-frågan avgör om känslig information kan läcka." },
  { id: "aq-2-4-18", moduleId: "mod-2-4-4", question: "Vendor lock-in innebär:", options: ["Att leverantören låser sitt kontor", "Att man blir så beroende av en leverantör att man inte kan byta", "Att data krypteras", "Att avtalet är kort"], correctIndex: 1, explanation: "Vendor lock-in = beroende av en leverantör utan möjlighet att byta eller exportera." },
  { id: "aq-2-4-19", moduleId: "mod-2-4-4", question: "PUB-avtal ska reglera:", options: ["Bara priset", "Bara leveranstiden", "Vilka data som behandlas, syfte, säkerhet, lagring och avtalsslut", "Bara supporttider"], correctIndex: 2, explanation: "Komplett PUB-avtal: data, syfte, säkerhet, lagring, underbiträden, avtalsslut." },
  { id: "aq-2-4-20", moduleId: "mod-2-4-4", question: "Underbiträde i AI-kontext är:", options: ["Kommunens IT-avdelning", "En konsult", "En medarbetare", "En tredjepartstjänst som AI-leverantören använder (t.ex. OpenAI)"], correctIndex: 3, explanation: "Underbiträde = leverantörens leverantör. T.ex. Intric använder OpenAI/Azure som underbiträde." },
];

// ---------------------------------------------------------------------------
// Nivå 2 — Final exam pool
// ---------------------------------------------------------------------------

export const FINAL_EXAM_POOL_NIVA_2: AcademyQuizQuestion[] = [
  { id: "fe-2-1", levelId: "niva-2", question: "RAG fungerar genom att:", options: ["Söka relevanta dokument och använda dem som grund för svaret", "Generera slumpmässig text", "Kopiera text från internet", "Bara sammanfatta"], correctIndex: 0, explanation: "RAG = Retrieval (sök i egna dokument) + Augmented Generation (skapa svar baserat på hittat material)." },
  { id: "fe-2-2", levelId: "niva-2", question: "En bra systemprompt innehåller:", options: ["Bara assistentens namn", "Roll, uppgift, ton, källor och begränsningar", "Så mycket text som möjligt", "Användarens lösenord"], correctIndex: 1, explanation: "De fem delarna skapar en komplett instruktion för assistentens beteende." },
  { id: "fe-2-3", levelId: "niva-2", question: "Microsoft Copilot respekterar:", options: ["Inga behörighetsgränser", "Bara chefers behörigheter", "Existerande behörigheter i Microsoft 365", "Bara offentliga filer"], correctIndex: 2, explanation: "Copilot visar bara data du redan har åtkomst till." },
  { id: "fe-2-4", levelId: "niva-2", question: "DPIA ska genomföras:", options: ["Efteråt", "Bara vid incidenter", "Bara av leverantören", "Innan ett nytt AI-system med personuppgifter införs"], correctIndex: 3, explanation: "DPIA = förebyggande analys INNAN införande." },
  { id: "fe-2-5", levelId: "niva-2", question: "Attention-mekanismen gör att:", options: ["AI kan fokusera på relevanta delar av texten", "AI fungerar utan el", "AI svarar snabbare", "AI kan se bilder"], correctIndex: 0, explanation: "Attention = AI:n väger samband mellan alla ord och fokuserar på det relevanta." },
  { id: "fe-2-6", levelId: "niva-2", question: "Vektordatabas lagrar:", options: ["Bilder", "Embeddings som möjliggör semantisk sökning", "Lösenord", "E-post"], correctIndex: 1, explanation: "Vektordatabaser lagrar embeddings — grunden för RAG och semantisk sökning." },
  { id: "fe-2-7", levelId: "niva-2", question: "AI Act klassificerar risk baserat på:", options: ["Pris", "Leverantör", "Användning och konsekvenser", "Land"], correctIndex: 2, explanation: "Det är HUR AI:n används som avgör risknivån." },
  { id: "fe-2-8", levelId: "niva-2", question: "Privacy by design innebär:", options: ["Snygg design", "AI fungerar utan data", "Alla data offentliggörs", "Integritetsskydd byggs in från start"], correctIndex: 3, explanation: "Skydd från början — minimera data, anonymisera, begränsa åtkomst." },
  { id: "fe-2-9", levelId: "niva-2", question: "Copilot Basic (utan licens) kan:", options: ["Användas som gratis AI-chatt för skrivhjälp och brainstorming", "Sammanfatta Teams-möten", "Redigera Word-dokument med AI", "Läsa dina mejl i Outlook"], correctIndex: 0, explanation: "Copilot Basic är en gratis AI-chatt. Möten, Office-integration och mejlåtkomst kräver licens." },
  { id: "fe-2-10", levelId: "niva-2", question: "Chain-of-thought i systemprompts:", options: ["Gör AI snabbare", "Instruerar AI att resonera steg för steg", "Kedjar ihop dokument", "Minskar kostnaden"], correctIndex: 1, explanation: "CoT = 'tänk steg för steg' — bättre resonerande och mer genomtänkta svar." },
  { id: "fe-2-11", levelId: "niva-2", question: "Webhook vs API:", options: ["Samma sak", "API är gratis, webhook kostar", "Webhook pushar data automatiskt, API kräver aktiv förfrågan", "Webhook är säkrare"], correctIndex: 2, explanation: "API = pull (du frågar), webhook = push (du blir notifierad automatiskt)." },
  { id: "fe-2-12", levelId: "niva-2", question: "Algoritm­isk rättvisa innebär:", options: ["AI alltid har rätt", "Alla får samma svar", "AI behandlar alla anonymt", "AI:ns resultat inte systematiskt missgynnar grupper"], correctIndex: 3, explanation: "Rättvisa = AI ska inte reproducera diskriminering." },
  { id: "fe-2-13", levelId: "niva-2", question: "Ansvarsfull AI i organisationen kräver:", options: ["Riktlinjer, utbildning, diskussion och incidenthantering", "Bara teknik", "Bara pengar", "Bara chefers godkännande"], correctIndex: 0, explanation: "Riktlinjer + utbildning + kultur + incidenthantering = ansvarsfull AI." },
  { id: "fe-2-14", levelId: "niva-2", question: "Vendor lock-in undviks genom:", options: ["Att köpa det billigaste", "Att säkerställa exportmöjlighet och undvika proprietära format", "Att inte använda AI", "Att byta leverantör varje månad"], correctIndex: 1, explanation: "Exportmöjlighet och öppna format minskar beroendet av en enda leverantör." },
  { id: "fe-2-15", levelId: "niva-2", question: "Hur många tokens motsvarar GPT-4:s kontextfönster (128K)?", options: ["En sida text", "10 ord", "Cirka 300 sidor/en bok", "En miljon böcker"], correctIndex: 2, explanation: "128 000 tokens ≈ 300 sidor text — en hel bok." },
  { id: "fe-2-16", levelId: "niva-2", question: "Intric och Copilot:", options: ["Gör samma sak", "Kan inte samexistera", "Är gratis", "Kompletterar varandra — Intric för organisationskunskap, Copilot för Office-produktivitet"], correctIndex: 3, explanation: "Intric = organisationskunskap med GDPR-säkra modeller. Copilot = AI i Office-appar med dina M365-data." },
  { id: "fe-2-17", levelId: "niva-2", question: "Underbiträde i AI-kontext:", options: ["Leverantörens leverantör (t.ex. OpenAI via Intric)", "Din kollega", "IT-chefen", "AI-modellen själv"], correctIndex: 0, explanation: "Underbiträde = tredjepartstjänst som leverantören använder i bakgrunden." },
  { id: "fe-2-18", levelId: "niva-2", question: "Copilot i Teams kräver att mötet:", options: ["Är kort", "Spelas in eller transkriberas", "Har max 3 deltagare", "Är på engelska"], correctIndex: 1, explanation: "Inspelning/transkribering krävs för att Copilot ska ha data att arbeta med." },
  { id: "fe-2-19", levelId: "niva-2", question: "Embedd­ings gör att:", options: ["Text blir snabbare", "AI kan se bilder", "Liknande begrepp får liknande talvektorer", "Internet fungerar snabbare"], correctIndex: 2, explanation: "Embeddings fångar semantisk likhet — grunden för AI:s textförståelse." },
  { id: "fe-2-20", levelId: "niva-2", question: "De flesta nya AI-system i kommunen bör ha:", options: ["Inget speciellt", "Bara ett pressmeddelande", "Bara IT-chefens godkännande", "En DPIA innan införande"], correctIndex: 3, explanation: "DPIA = konsekvensbedömning innan AI-system med personuppgifter införs." },
  { id: "fe-2-21", levelId: "niva-2", question: "Kommunens två säkerhetsklasser för AI styr:", options: ["Vilka AI-komponenter som får användas beroende på datakänslighet", "Vilken webbläsare som används", "Bara priset på tjänsten", "Inget — alla modeller får användas fritt"], correctIndex: 0, explanation: "Lokala modeller (GDPR-säker) för känslig data, alla modeller för offentlig info. Gäller LLM:er, embedding, transkription och MCP-servrar." },
  { id: "fe-2-22", levelId: "niva-2", question: "Transformer-arkitekturen:", options: ["Är en typ av robot", "Ligger bakom alla moderna språkmodeller (GPT, Claude, Gemini)", "Används bara i bilar", "Är föråldrad"], correctIndex: 1, explanation: "Transformer = arkitekturen som revolutionerade AI 2017 och som alla LLM:er bygger på." },
  { id: "fe-2-23", levelId: "niva-2", question: "Feedback-loopen för assistenter:", options: ["Bredda → lansera → feedback → förbättra", "Förbättra → bredda → lansera → feedback", "Lansera → feedback → förbättra → bredda", "Finns inte"], correctIndex: 2, explanation: "Lansera (pilot) → Samla feedback → Förbättra → Bredda (fler användare)." },
  { id: "fe-2-24", levelId: "niva-2", question: "7 etiska principer för AI inkluderar:", options: ["Bara säkerhet och kostnad", "Bara hastighet och pris", "Bara GDPR", "Mänsklig kontroll, transparens, rättvisa, samhällsnytta m.fl."], correctIndex: 3, explanation: "Kontroll, robusthet, integritet, transparens, rättvisa, nytta, ansvarsutkrävande." },
  { id: "fe-2-25", levelId: "niva-2", question: "PUB-avtal krävs:", options: ["Alltid när en leverantör behandlar personuppgifter åt kommunen", "Aldrig", "Bara vid stora upphandlingar", "Bara med utländska leverantörer"], correctIndex: 0, explanation: "Alltid vid personuppgiftsbehandling av leverantör — inga undantag." },
];
