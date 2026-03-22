// =============================================================================
// KUNSKAPSBANKEN — Types, metadata & concept data
// =============================================================================

// --- Difficulty levels ---

export type DifficultyLevel = "grundlaggande" | "mellanniva" | "fordjupning";

export const DIFFICULTY_LEVELS: Record<
  DifficultyLevel,
  { label: string; dots: number }
> = {
  grundlaggande: { label: "Grundläggande", dots: 1 },
  mellanniva: { label: "Mellannivå", dots: 2 },
  fordjupning: { label: "Fördjupning", dots: 3 },
};

// --- Categories ---

export type ConceptCategory =
  | "it-grunderna"
  | "ai-grunderna"
  | "sprakmodeller"
  | "ai-pa-jobbet"
  | "intric"
  | "copilot"
  | "teknik"
  | "data-sokning"
  | "lagar-regler"
  | "sakerhet-etik"
  | "verktyg"
  | "avancerat";

export const CATEGORIES: Record<
  ConceptCategory,
  { label: string; icon: string; color: string }
> = {
  "it-grunderna": {
    label: "IT-grunderna",
    icon: "Monitor",
    color: "slate",
  },
  "ai-grunderna": {
    label: "AI-grunderna",
    icon: "Brain",
    color: "purple",
  },
  sprakmodeller: {
    label: "Språkmodeller & generativ AI",
    icon: "Sparkles",
    color: "indigo",
  },
  "ai-pa-jobbet": {
    label: "AI på jobbet",
    icon: "Briefcase",
    color: "blue",
  },
  intric: {
    label: "Intric-plattformen",
    icon: "Boxes",
    color: "teal",
  },
  copilot: {
    label: "Microsoft Copilot & 365",
    icon: "Laptop",
    color: "sky",
  },
  teknik: {
    label: "Teknik & infrastruktur",
    icon: "Server",
    color: "green",
  },
  "data-sokning": {
    label: "Data & sökning",
    icon: "Database",
    color: "emerald",
  },
  "lagar-regler": {
    label: "Lagar & regler",
    icon: "Scale",
    color: "amber",
  },
  "sakerhet-etik": {
    label: "Säkerhet & etik",
    icon: "Shield",
    color: "rose",
  },
  verktyg: {
    label: "Verktyg & plattformar",
    icon: "Wrench",
    color: "orange",
  },
  avancerat: {
    label: "Avancerade AI-koncept",
    icon: "FlaskConical",
    color: "violet",
  },
};

// --- Core types ---

export interface Concept {
  id: string;
  title: string;
  icon: string;
  shortExplanation: string;
  analogy: string;
  difficulty: DifficultyLevel;
  category: ConceptCategory;
  relatedConceptIds: string[];
  explainerId?: string;
  funFact?: string;
}

export interface LearningPath {
  id: string;
  title: string;
  description: string;
  conceptIds: string[];
  estimatedMinutes: number;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  conceptId?: string;
  category?: ConceptCategory;
  pathId?: string;
}

export interface ScenarioCard {
  id: string;
  title: string;
  situation: string;
  options: ScenarioOption[];
  category: ConceptCategory;
  relatedConceptIds: string[];
}

export interface ScenarioOption {
  label: string;
  feedback: string;
  quality: "good" | "ok" | "bad";
}

export interface FlowStep {
  id: string;
  label: string;
  description: string;
  icon?: string;
}

export interface AnimatedExplainer {
  id: string;
  title: string;
  description: string;
  steps: FlowStep[];
  category: ConceptCategory;
}

// =============================================================================
// CONCEPT DATA
// =============================================================================

export const CONCEPTS: Concept[] = [
  // =========================================================================
  // 1. IT-GRUNDERNA (15 begrepp)
  // =========================================================================
  {
    id: "server",
    title: "Server",
    icon: "Server",
    shortExplanation:
      "En dator som alltid är igång och levererar data till andra datorer. När du besöker en webbsida frågar din dator en server om att skicka sidan till dig.",
    analogy:
      "Som ett bibliotek som aldrig stänger — du frågar efter en bok och bibliotekaren (servern) hämtar den åt dig.",
    difficulty: "grundlaggande",
    category: "it-grunderna",
    relatedConceptIds: ["molntjanst", "databas", "api"],
  },
  {
    id: "databas",
    title: "Databas",
    icon: "Database",
    shortExplanation:
      "Ett organiserat digitalt lager för information som kan sökas och sorteras. Allt från kundregister till AI:ns kunskapsbaser lagras i databaser.",
    analogy:
      "Som ett supersnabbt arkivskåp med miljontals mappar — du säger vad du letar efter och det hittar rätt mapp direkt.",
    difficulty: "grundlaggande",
    category: "it-grunderna",
    relatedConceptIds: ["server", "vektordatabas", "metadata"],
  },
  {
    id: "molntjanst",
    title: "Molntjänst (Cloud)",
    icon: "Cloud",
    shortExplanation:
      "Program och data som körs på internet istället för din egen dator. Du når dem var du än är, från vilken enhet som helst.",
    analogy:
      "Som att ha dina filer i ett bankfack istället för hemma — du kan komma åt dem från vilket bankkontor som helst.",
    difficulty: "grundlaggande",
    category: "it-grunderna",
    relatedConceptIds: ["server", "saas", "lokal-ai-vs-moln"],
    explainerId: "vad-ar-molnet",
  },
  {
    id: "webblasare",
    title: "Webbläsare (Browser)",
    icon: "Globe",
    shortExplanation:
      "Programmet du använder för att besöka webbsidor — Chrome, Edge, Firefox eller Safari. Webbläsaren skickar förfrågningar till servrar och visar resultatet som sidor.",
    analogy:
      "Som ett fönster mot internet — du tittar genom det för att se vad som finns där ute.",
    difficulty: "grundlaggande",
    category: "it-grunderna",
    relatedConceptIds: ["url", "http-https", "dns", "cookies"],
  },
  {
    id: "url",
    title: "URL (webbadress)",
    icon: "Link",
    shortExplanation:
      "Adressen till en webbsida, till exempel aihubben.se. Den talar om för webbläsaren exakt var på internet den ska leta.",
    analogy:
      "Som en gatuadress — istället för att leta planlöst skriver du adressen och hittar direkt rätt.",
    difficulty: "grundlaggande",
    category: "it-grunderna",
    relatedConceptIds: ["webblasare", "dns", "http-https"],
  },
  {
    id: "http-https",
    title: "HTTP & HTTPS",
    icon: "Lock",
    shortExplanation:
      "Reglerna för hur din webbläsare och servrar pratar med varandra. HTTPS lägger till kryptering så ingen kan tjuvlyssna — det lilla låset i adressfältet.",
    analogy:
      "HTTP är som att skicka ett vykort — alla kan läsa det. HTTPS är som ett förseglat brev — bara mottagaren kan öppna det.",
    difficulty: "grundlaggande",
    category: "it-grunderna",
    relatedConceptIds: ["kryptering", "url", "webblasare"],
  },
  {
    id: "dns",
    title: "DNS (domännamnssystem)",
    icon: "BookOpen",
    shortExplanation:
      "Översätter webbadresser (som aihubben.se) till IP-adresser (som 192.168.1.1) som datorer förstår. Utan DNS skulle du behöva komma ihåg siffror istället för namn.",
    analogy:
      "Som en telefonbok för internet — du slår upp ett namn och får numret.",
    difficulty: "mellanniva",
    category: "it-grunderna",
    relatedConceptIds: ["url", "ip-adress", "webblasare"],
  },
  {
    id: "kryptering",
    title: "Kryptering",
    icon: "KeyRound",
    shortExplanation:
      "Omvandlar information till en hemlig kod som bara den med rätt nyckel kan läsa. Används i HTTPS, VPN, mejl och AI-kommunikation.",
    analogy:
      "Som att skriva ett brev med osynligt bläck — bara den som har rätt lampa kan läsa det.",
    difficulty: "grundlaggande",
    category: "it-grunderna",
    relatedConceptIds: ["http-https", "vpn", "informationssakerhet"],
    explainerId: "hur-fungerar-kryptering",
  },
  {
    id: "vpn",
    title: "VPN",
    icon: "ShieldCheck",
    shortExplanation:
      "Skapar en krypterad tunnel för din internettrafik. Kommunen använder VPN för att ge anställda säker åtkomst till interna system hemifrån.",
    analogy:
      "Som en hemlig underjordisk tunnel — ingen kan se vad du skickar genom den.",
    difficulty: "grundlaggande",
    category: "it-grunderna",
    relatedConceptIds: ["kryptering", "brandvagg", "informationssakerhet"],
  },
  {
    id: "tvafaktor",
    title: "Tvåfaktorsautentisering (2FA/MFA)",
    icon: "ShieldCheck",
    shortExplanation:
      "Kräver två bevis på att du är du — till exempel lösenord plus en kod från din telefon. Gör det mycket svårare för obehöriga att komma in.",
    analogy:
      "Som att ha både nyckel och kod till dörren — även om någon hittar nyckeln behöver de fortfarande koden.",
    difficulty: "grundlaggande",
    category: "it-grunderna",
    relatedConceptIds: ["kryptering", "informationssakerhet", "sso"],
    explainerId: "vad-hander-vid-2fa",
  },
  {
    id: "cookies",
    title: "Cookies",
    icon: "Cookie",
    shortExplanation:
      "Små textfiler som webbsidor sparar i din webbläsare för att komma ihåg dig — till exempel att du är inloggad eller vilka inställningar du valt.",
    analogy:
      "Som en namnbricka på en konferens — nästa gång du kommer behöver du inte presentera dig igen.",
    difficulty: "grundlaggande",
    category: "it-grunderna",
    relatedConceptIds: ["webblasare", "cache", "gdpr"],
  },
  {
    id: "cache",
    title: "Cache",
    icon: "HardDrive",
    shortExplanation:
      "Tillfällig lagring av data som används ofta, för att snabba upp nästa gång. Din webbläsare sparar bilder i cache så sidor laddas snabbare vid återbesök.",
    analogy:
      "Som att lägga böcker du läser ofta på nattduksbordet istället för att hämta dem från bokhyllan varje gång.",
    difficulty: "grundlaggande",
    category: "it-grunderna",
    relatedConceptIds: ["webblasare", "cookies"],
  },
  {
    id: "brandvagg",
    title: "Brandvägg (Firewall)",
    icon: "Flame",
    shortExplanation:
      "Ett säkerhetssystem som övervakar och kontrollerar nätverkstrafik. Den släpper igenom tillåten trafik och blockerar obehöriga försök att komma in.",
    analogy:
      "Som en vakt vid entrén som kollar ID-kort — godkända släpps in, andra stoppas.",
    difficulty: "mellanniva",
    category: "it-grunderna",
    relatedConceptIds: ["vpn", "kryptering", "informationssakerhet"],
  },
  {
    id: "ip-adress",
    title: "IP-adress",
    icon: "Hash",
    shortExplanation:
      "En unik nummeradress som varje enhet på internet har. Din dator, telefon och router har alla egna IP-adresser.",
    analogy:
      "Som ett postnummer för din dator — det talar om var på internet den befinner sig.",
    difficulty: "mellanniva",
    category: "it-grunderna",
    relatedConceptIds: ["dns", "server", "vpn"],
  },
  {
    id: "saas",
    title: "SaaS (Software as a Service)",
    icon: "CloudCog",
    shortExplanation:
      "Program du använder via internet utan att installera något — som Microsoft 365, Google Workspace eller Intric. Du betalar en prenumeration.",
    analogy:
      "Som att hyra en lägenhet istället för att köpa hus — någon annan sköter underhållet, du bara bor där.",
    difficulty: "mellanniva",
    category: "it-grunderna",
    relatedConceptIds: ["molntjanst", "server"],
  },

  // =========================================================================
  // 2. AI-GRUNDERNA (12 begrepp)
  // =========================================================================
  {
    id: "ai",
    title: "Artificiell intelligens (AI)",
    icon: "Brain",
    shortExplanation:
      "Datorsystem som kan utföra uppgifter som normalt kräver mänsklig intelligens — analysera text, känna igen bilder, fatta beslut och föra samtal.",
    analogy:
      "Som en elev som aldrig slutar plugga — den har läst miljontals texter och kan svara på det mesta, men förstår inte riktigt vad den säger.",
    difficulty: "grundlaggande",
    category: "ai-grunderna",
    relatedConceptIds: ["maskininlarning", "generativ-ai", "ai-modell"],
    explainerId: "hur-lar-sig-en-ai",
  },
  {
    id: "maskininlarning",
    title: "Maskininlärning (ML)",
    icon: "TrendingUp",
    shortExplanation:
      "En gren av AI där datorn lär sig mönster från data istället för att programmeras med exakta regler. Ju mer data, desto bättre blir den.",
    analogy:
      "Som att lära ett barn cykla — du visar det 1000 gånger, och till slut fattar barnet själv hur man balanserar.",
    difficulty: "grundlaggande",
    category: "ai-grunderna",
    relatedConceptIds: ["ai", "traningsdata", "deep-learning", "neurala-natverk"],
    explainerId: "ai-vs-ml-vs-dl",
  },
  {
    id: "neurala-natverk",
    title: "Neurala nätverk",
    icon: "Network",
    shortExplanation:
      "AI-system inspirerade av hjärnans struktur, med lager av sammankopplade noder. Varje koppling har en styrka (vikt) som justeras under träningen.",
    analogy:
      "Som ett lag medarbetare som var och en gör en liten del av jobbet — tillsammans löser de hela uppgiften.",
    difficulty: "mellanniva",
    category: "ai-grunderna",
    relatedConceptIds: ["maskininlarning", "deep-learning", "parametrar"],
    explainerId: "vad-ar-neuralt-natverk",
  },
  {
    id: "deep-learning",
    title: "Deep Learning",
    icon: "Layers",
    shortExplanation:
      "Maskininlärning med många lager av neurala nätverk. 'Deep' syftar på djupet — fler lager betyder att AI:n kan lära sig mer komplexa mönster.",
    analogy:
      "Som att tänka steg för steg i flera nivåer — först ser du bokstäver, sedan ord, sedan meningar, sedan betydelse.",
    difficulty: "fordjupning",
    category: "ai-grunderna",
    relatedConceptIds: ["neurala-natverk", "maskininlarning", "ai-modell"],
    explainerId: "ai-vs-ml-vs-dl",
  },
  {
    id: "ai-modell",
    title: "AI-modell",
    icon: "Box",
    shortExplanation:
      "Det färdigtränade programmet som gör AI:ns arbete. En modell innehåller miljontals inlärda mönster och kan svara på frågor, skriva text eller analysera data.",
    analogy:
      "Som en hjärna med specialkunskap — den har studerat klart och är redo att jobba, men kan inte lära sig nya saker utan att tränas om.",
    difficulty: "grundlaggande",
    category: "ai-grunderna",
    relatedConceptIds: ["traningsdata", "parametrar", "llm"],
  },
  {
    id: "traningsdata",
    title: "Träningsdata",
    icon: "FileStack",
    shortExplanation:
      "All data som AI:n lär sig från — böcker, webbsidor, dokument, bilder. Kvaliteten på träningsdata avgör hur bra AI:n blir.",
    analogy:
      "Som skolmaterial — om läraren bara har dåliga läroböcker blir eleven inte så bra. Bra data = bra AI.",
    difficulty: "grundlaggande",
    category: "ai-grunderna",
    relatedConceptIds: ["ai-modell", "maskininlarning", "bias"],
  },
  {
    id: "algoritm",
    title: "Algoritm",
    icon: "ListOrdered",
    shortExplanation:
      "En steg-för-steg-instruktion för att lösa ett problem. AI-algoritmer beskriver hur datorn ska lära sig från data och göra förutsägelser.",
    analogy:
      "Som ett recept — följ stegen i rätt ordning så får du rätt resultat varje gång.",
    difficulty: "grundlaggande",
    category: "ai-grunderna",
    relatedConceptIds: ["maskininlarning", "ai-modell"],
  },
  {
    id: "overvakad-inlarning",
    title: "Övervakad inlärning (Supervised Learning)",
    icon: "UserCheck",
    shortExplanation:
      "AI som lär sig från märkta exempel där svaret är känt. 'Det här är en katt, det här är en hund' — tills AI:n kan skilja dem själv.",
    analogy:
      "Som en lärare som rättar prov — eleven (AI:n) gissar, läraren säger rätt eller fel, och eleven lär sig.",
    difficulty: "mellanniva",
    category: "ai-grunderna",
    relatedConceptIds: ["maskininlarning", "traningsdata", "oovervakad-inlarning"],
  },
  {
    id: "oovervakad-inlarning",
    title: "Oövervakad inlärning (Unsupervised Learning)",
    icon: "Puzzle",
    shortExplanation:
      "AI som hittar mönster och grupperingar i data utan att få facit. Den upptäcker själv vilka saker som hör ihop.",
    analogy:
      "Som att sortera en låda med knappar utan instruktioner — du grupperar automatiskt efter färg och storlek.",
    difficulty: "mellanniva",
    category: "ai-grunderna",
    relatedConceptIds: ["maskininlarning", "overvakad-inlarning"],
  },
  {
    id: "forstarkningsinlarning",
    title: "Förstärkningsinlärning (Reinforcement Learning)",
    icon: "Trophy",
    shortExplanation:
      "AI som lär sig genom att testa och få belöning eller bestraffning. Grunden för hur ChatGPT tränades att ge bra svar.",
    analogy:
      "Som att träna en hund — den får en godis när den gör rätt och inget när den gör fel. Till slut lär den sig.",
    difficulty: "mellanniva",
    category: "ai-grunderna",
    relatedConceptIds: ["maskininlarning", "rlhf"],
  },
  {
    id: "datorseende",
    title: "Datorseende (Computer Vision)",
    icon: "Eye",
    shortExplanation:
      "AI:ns förmåga att tolka och förstå bilder och video — känna igen ansikten, läsa text i bilder, eller identifiera objekt.",
    analogy:
      "Som att ge en dator glasögon och lära den vad den ser — 'det där är en bil, det där är en person'.",
    difficulty: "mellanniva",
    category: "ai-grunderna",
    relatedConceptIds: ["neurala-natverk", "deep-learning", "ocr"],
  },
  {
    id: "nlp",
    title: "NLP (Naturlig språkbehandling)",
    icon: "MessageSquare",
    shortExplanation:
      "AI:ns förmåga att förstå, tolka och generera mänskligt språk. Allt från stavningskontroll till ChatGPT bygger på NLP.",
    analogy:
      "Som en tolk som kan alla världens språk — och dessutom förstår ironi, kontext och nyanser.",
    difficulty: "mellanniva",
    category: "ai-grunderna",
    relatedConceptIds: ["llm", "ai", "sentimentanalys"],
  },

  // =========================================================================
  // 3. SPRÅKMODELLER & GENERATIV AI (15 begrepp)
  // =========================================================================
  {
    id: "llm",
    title: "Stor språkmodell (LLM)",
    icon: "BookText",
    shortExplanation:
      "En AI-modell tränad på enorma mängder text som kan förstå och skapa språk. GPT, Claude och Gemini är alla LLM:er med miljarder parametrar.",
    analogy:
      "Som en supersnabb läsare som har läst hela internet och kan sammanfatta, svara och skriva — men som inte riktigt 'förstår' vad den läst.",
    difficulty: "grundlaggande",
    category: "sprakmodeller",
    relatedConceptIds: ["gpt", "transformer", "token", "ai-modell"],
  },
  {
    id: "gpt",
    title: "GPT (Generative Pre-trained Transformer)",
    icon: "Sparkles",
    shortExplanation:
      "En familj av språkmodeller från OpenAI. Namnet betyder 'Generativ Förtränad Transformer' — den är förtränad på text och genererar nytt innehåll.",
    analogy:
      "Som en författare som läst alla böcker i världen och sedan kan skriva i vilken stil som helst — men som ibland hittar på citat.",
    difficulty: "mellanniva",
    category: "sprakmodeller",
    relatedConceptIds: ["llm", "transformer", "chatgpt"],
  },
  {
    id: "transformer",
    title: "Transformer-arkitekturen",
    icon: "Cpu",
    shortExplanation:
      "Den tekniska designen bakom moderna språkmodeller, introducerad 2017. Revolutionerade AI genom att kunna bearbeta hela texter samtidigt istället för ord för ord.",
    analogy:
      "Som att läsa en hel sida på en gång istället för ord för ord — transformern ser hela bilden och förstår sammanhanget.",
    difficulty: "fordjupning",
    category: "sprakmodeller",
    relatedConceptIds: ["attention", "llm", "gpt"],
  },
  {
    id: "attention",
    title: "Attention-mekanismen (Self-Attention)",
    icon: "Focus",
    shortExplanation:
      "Kärnan i transformer-arkitekturen. Gör att AI:n kan väga vilka ord i en text som är viktigast för att förstå varje annat ord.",
    analogy:
      "Som att markera nyckelord med överstrykningspenna — AI:n lär sig vilka ord som hänger ihop och påverkar varandra.",
    difficulty: "fordjupning",
    category: "sprakmodeller",
    relatedConceptIds: ["transformer", "llm"],
  },
  {
    id: "generativ-ai",
    title: "Generativ AI",
    icon: "Wand2",
    shortExplanation:
      "AI som skapar nytt innehåll — text, bilder, kod, musik, video. Istället för att bara analysera data kan den producera helt nytt material.",
    analogy:
      "Som en konstnär som studerat tusentals tavlor och nu kan måla egna — inspirerad av allt den sett men med unika resultat.",
    difficulty: "grundlaggande",
    category: "sprakmodeller",
    relatedConceptIds: ["llm", "ai", "bildgenerering", "textgenerering"],
  },
  {
    id: "token",
    title: "Token & tokenisering",
    icon: "SplitSquareHorizontal",
    shortExplanation:
      "Den minsta enheten som AI:n läser. Text delas i tokens — ungefär ¾ av ett ord. 'Katrineholm' kan bli ['Kat', 'rine', 'holm']. Tokens styr kostnad och hastighet.",
    analogy:
      "Som att dela en mening i stavelser — AI:n läser inte hela ord utan mindre bitar som den pusslar ihop.",
    difficulty: "mellanniva",
    category: "sprakmodeller",
    relatedConceptIds: ["llm", "kontextfonster", "temperatur"],
    explainerId: "vad-ar-tokens",
  },
  {
    id: "kontextfonster",
    title: "Kontext-fönster",
    icon: "Maximize2",
    shortExplanation:
      "Hur mycket text AI:n kan 'se' och komma ihåg i en konversation — dess korttidsminne. GPT-4 har ~128K tokens, Claude har 200K.",
    analogy:
      "Som arbetsminnet på ditt skrivbord — ju större bord, desto fler dokument kan du ha framme samtidigt.",
    difficulty: "mellanniva",
    category: "sprakmodeller",
    relatedConceptIds: ["token", "llm"],
    explainerId: "kontextfonstret",
  },
  {
    id: "temperatur",
    title: "Temperatur",
    icon: "Thermometer",
    shortExplanation:
      "En inställning som styr hur kreativ eller förutsägbar AI:ns svar blir. Låg temperatur = exakt och fokuserat. Hög temperatur = kreativt och varierat.",
    analogy:
      "Som en kreativitetsratt — vrider du ner den får du torra fakta, vrider du upp den får du poetiska svar.",
    difficulty: "mellanniva",
    category: "sprakmodeller",
    relatedConceptIds: ["top-p", "llm", "prompt"],
    explainerId: "temperatur-kreativitet",
  },
  {
    id: "top-p",
    title: "Top-p (Nucleus Sampling)",
    icon: "SlidersHorizontal",
    shortExplanation:
      "En annan inställning för AI:ns kreativitet. Begränsar urvalet av nästa ord till de mest sannolika. Lägre top-p = färre valmöjligheter = mer fokuserat.",
    analogy:
      "Som att bara välja bland de 10 bästa restaurangerna istället för alla — du får garanterat bra mat men kanske missar en pärla.",
    difficulty: "fordjupning",
    category: "sprakmodeller",
    relatedConceptIds: ["temperatur", "llm"],
  },
  {
    id: "systemprompt",
    title: "Systemprompt",
    icon: "Settings",
    shortExplanation:
      "Dolda instruktioner som styr AI:ns beteende — dess 'arbetsbeskrivning'. Bestämmer personlighet, begränsningar och hur den ska svara.",
    analogy:
      "Som reglerna på en arbetsplats — 'var alltid artig, svara på svenska, och hänvisa till chefen vid klagomål'.",
    difficulty: "mellanniva",
    category: "sprakmodeller",
    relatedConceptIds: ["prompt", "promptteknik", "guardrails"],
  },
  {
    id: "multimodal-ai",
    title: "Multimodal AI",
    icon: "LayoutGrid",
    shortExplanation:
      "AI som förstår flera typer av input: text, bilder, ljud, video. GPT-4 och Gemini kan till exempel analysera bilder och svara med text.",
    analogy:
      "Som en person som kan läsa, titta på bilder OCH lyssna på musik — och förstå alla tre samtidigt.",
    difficulty: "mellanniva",
    category: "sprakmodeller",
    relatedConceptIds: ["llm", "generativ-ai", "transkribering"],
  },
  {
    id: "grundmodell",
    title: "Grundmodell (Foundation Model)",
    icon: "Building",
    shortExplanation:
      "En stor, allmänt tränad AI-modell som kan anpassas till specifika uppgifter. GPT-4, Claude och Llama är alla grundmodeller.",
    analogy:
      "Som en nyutexaminerad generalist — bred kunskap som kan specialiseras till vilket yrke som helst med lite vidareutbildning.",
    difficulty: "mellanniva",
    category: "sprakmodeller",
    relatedConceptIds: ["ai-modell", "fine-tuning", "llm"],
  },
  {
    id: "parametrar",
    title: "Parametrar (vikter)",
    icon: "Binary",
    shortExplanation:
      "De inlärda värdena inuti en AI-modell — miljontals till biljarder siffror. Fler parametrar betyder ofta en smartare modell men kräver mer beräkningskraft.",
    analogy:
      "Som kopplingar i hjärnan — fler kopplingar = mer kapacitet att tänka komplext.",
    difficulty: "fordjupning",
    category: "sprakmodeller",
    relatedConceptIds: ["ai-modell", "neurala-natverk", "kvantisering"],
  },
  {
    id: "hallucination",
    title: "Hallucination",
    icon: "AlertTriangle",
    shortExplanation:
      "När AI:n hittar på fakta som låter trovärdiga men är helt felaktiga. Händer eftersom AI:n förutsäger sannolika ord, inte verifierar fakta.",
    analogy:
      "Som en pratglad kollega som alltid låter säker men ibland hittar på saker — du måste dubbelkolla det viktiga.",
    difficulty: "grundlaggande",
    category: "sprakmodeller",
    relatedConceptIds: ["grounding", "kallkritik", "rag"],
  },
  {
    id: "grounding",
    title: "Grounding (förankring)",
    icon: "Anchor",
    shortExplanation:
      "Att koppla AI:ns svar till verifierad källdata för att minska hallucinationer. RAG och kunskapsbaser är vanliga grounding-tekniker.",
    analogy:
      "Som att kräva att en journalist alltid anger sina källor — det gör svaren mer tillförlitliga.",
    difficulty: "mellanniva",
    category: "sprakmodeller",
    relatedConceptIds: ["hallucination", "rag", "kunskapsbas"],
  },

  // =========================================================================
  // 4. AI PÅ JOBBET (16 begrepp)
  // =========================================================================
  {
    id: "ai-assistent",
    title: "AI-assistent",
    icon: "Bot",
    shortExplanation:
      "Ett AI-verktyg du chattar med för att få hjälp med uppgifter — skriva text, sammanfatta, analysera. Som en digital kollega som alltid är tillgänglig.",
    analogy:
      "Som en jättesnabb praktikant som kan allt — men som du behöver dubbelkolla ibland.",
    difficulty: "grundlaggande",
    category: "ai-pa-jobbet",
    relatedConceptIds: ["prompt", "chatbot", "copilot", "intric-assistent"],
    explainerId: "ai-assistent",
  },
  {
    id: "prompt",
    title: "Prompt",
    icon: "MessageSquare",
    shortExplanation:
      "Det du skriver till AI:n — din fråga, instruktion eller uppgift. En bra prompt ger ett bra svar. Kvaliteten på din fråga avgör kvaliteten på svaret.",
    analogy:
      "Som en beställning på en restaurang — ju tydligare du beskriver vad du vill ha, desto bättre blir maten.",
    difficulty: "grundlaggande",
    category: "ai-pa-jobbet",
    relatedConceptIds: ["promptteknik", "systemprompt", "ai-assistent"],
    explainerId: "hur-skriver-du-bra-prompt",
  },
  {
    id: "promptteknik",
    title: "Promptteknik (Prompt Engineering)",
    icon: "Wrench",
    shortExplanation:
      "Konsten att formulera instruktioner till AI:n för att få bättre svar. Inkluderar att ge kontext, format, persona och tydliga begränsningar.",
    analogy:
      "Som att skriva en bra projektbeskrivning — ju tydligare specen, desto bättre blir resultatet.",
    difficulty: "grundlaggande",
    category: "ai-pa-jobbet",
    relatedConceptIds: ["prompt", "systemprompt", "cot"],
    explainerId: "hur-skriver-du-bra-prompt",
  },
  {
    id: "chatbot",
    title: "Chatbot",
    icon: "MessageCircle",
    shortExplanation:
      "Ett program som automatiskt svarar på frågor i en chattkonversation. Kan vara enkel (förprogrammerade svar) eller AI-driven (förstår fritt språk).",
    analogy:
      "Som en receptionist som svarar på vanliga frågor — 'vilka är öppettiderna?' — men en AI-driven chatbot kan hantera oväntade frågor också.",
    difficulty: "grundlaggande",
    category: "ai-pa-jobbet",
    relatedConceptIds: ["ai-assistent", "prompt"],
  },
  {
    id: "copilot-begrepp",
    title: "Copilot (AI-medhjälpare)",
    icon: "UserPlus",
    shortExplanation:
      "AI som hjälper dig medan du jobbar — föreslår text i mejl, sammanfattar möten, analyserar data. Arbetar vid din sida, inte istället för dig.",
    analogy:
      "Som en medpassagerare som läser kartan medan du kör — du bestämmer vart ni åker, men du får hjälp att navigera.",
    difficulty: "grundlaggande",
    category: "ai-pa-jobbet",
    relatedConceptIds: ["m365-copilot", "ai-assistent"],
  },
  {
    id: "automatisering",
    title: "Automatisering",
    icon: "Repeat",
    shortExplanation:
      "Att låta AI eller IT utföra repetitiva uppgifter utan manuellt arbete — sortera mejl, fylla i formulär, skicka påminnelser.",
    analogy:
      "Som att sätta diskmaskin istället för att diska för hand — maskinen gör jobbet medan du gör något annat.",
    difficulty: "grundlaggande",
    category: "ai-pa-jobbet",
    relatedConceptIds: ["ai-agent", "integration"],
  },
  {
    id: "sammanfattning",
    title: "Sammanfattning med AI",
    icon: "FileText",
    shortExplanation:
      "AI:ns förmåga att kondensera långa texter till kortare sammanfattningar. Kan sammanfatta rapporter, mejltrådar, mötesprotokoll och dokument.",
    analogy:
      "Som en kollega som läser en 50-sidig rapport och säger 'här är de 5 viktigaste punkterna' på 30 sekunder.",
    difficulty: "grundlaggande",
    category: "ai-pa-jobbet",
    relatedConceptIds: ["textgenerering", "motessammanfattning", "llm"],
  },
  {
    id: "textgenerering",
    title: "Textgenerering",
    icon: "PenTool",
    shortExplanation:
      "AI som skriver text åt dig — mejlutkast, rapporter, sammanfattningar, kreativa texter. Du ger instruktioner och AI:n producerar ett första utkast.",
    analogy:
      "Som en ghostwriter som skriver ett första utkast baserat på dina instruktioner — du redigerar och polerar.",
    difficulty: "grundlaggande",
    category: "ai-pa-jobbet",
    relatedConceptIds: ["generativ-ai", "prompt", "sammanfattning"],
  },
  {
    id: "transkribering",
    title: "Transkribering (tal till text)",
    icon: "Mic",
    shortExplanation:
      "AI som omvandlar tal till skriven text. Kan transkribera mötesinspelningar, telefonsamtal och intervjuer med hög precision.",
    analogy:
      "Som en sekreterare som skriver ner allt som sägs på ett möte — fast mycket snabbare och billigare.",
    difficulty: "grundlaggande",
    category: "ai-pa-jobbet",
    relatedConceptIds: ["motessammanfattning", "transkriptionsmodell"],
    explainerId: "hur-fungerar-transkribering",
  },
  {
    id: "motessammanfattning",
    title: "Mötessammanfattning",
    icon: "Calendar",
    shortExplanation:
      "AI som lyssnar på ett möte (eller läser transkriptionen) och skapar en sammanfattning med beslutspunkter, åtgärder och ansvariga.",
    analogy:
      "Som en mötessekreterare som aldrig missar en poäng och levererar protokollet innan du hunnit tillbaka till skrivbordet.",
    difficulty: "grundlaggande",
    category: "ai-pa-jobbet",
    relatedConceptIds: ["transkribering", "copilot-teams", "sammanfattning"],
  },
  {
    id: "ai-beslutsfattande",
    title: "AI i beslutsfattande (beslutsstöd)",
    icon: "Scale",
    shortExplanation:
      "Att använda AI som underlag för beslut — den analyserar data och föreslår alternativ, men människan fattar alltid det slutgiltiga beslutet.",
    analogy:
      "Som en rådgivare som presenterar fakta och alternativ — du lyssnar, men det är du som bestämmer.",
    difficulty: "mellanniva",
    category: "ai-pa-jobbet",
    relatedConceptIds: ["mansklig-kontroll", "ansvarsfragor"],
  },
  {
    id: "arendehantering-ai",
    title: "Ärendehantering med AI",
    icon: "Inbox",
    shortExplanation:
      "AI som hjälper till att sortera, kategorisera, prioritera och föreslå svar på inkomna ärenden — snabbare hantering med bibehållen kvalitet.",
    analogy:
      "Som en erfaren handläggare som snabbt kan bedöma vilka ärenden som är brådskande och föreslå lämpliga svar.",
    difficulty: "mellanniva",
    category: "ai-pa-jobbet",
    relatedConceptIds: ["automatisering", "ai-assistent", "verksamhetssystem"],
  },
  {
    id: "bildgenerering",
    title: "Bildgenerering",
    icon: "Image",
    shortExplanation:
      "AI som skapar nya bilder från textbeskrivningar. DALL-E, Midjourney och Stable Diffusion kan skapa fotorealistiska bilder eller illustrationer.",
    analogy:
      "Som att beskriva en dröm för en illustratör — du berättar vad du ser och AI:n målar det.",
    difficulty: "grundlaggande",
    category: "ai-pa-jobbet",
    relatedConceptIds: ["generativ-ai", "prompt", "upphovsratt"],
  },
  {
    id: "ocr",
    title: "OCR (Optical Character Recognition)",
    icon: "ScanText",
    shortExplanation:
      "AI som läser text i bilder och skannade dokument och gör den redigerbar och sökbar. Gör att gamla pappersarkiv kan digitaliseras.",
    analogy:
      "Som glasögon för datorn — den kan nu läsa text som bara fanns som bild.",
    difficulty: "mellanniva",
    category: "ai-pa-jobbet",
    relatedConceptIds: ["datorseende", "intric-dokument"],
  },
  {
    id: "sentimentanalys",
    title: "Sentimentanalys",
    icon: "SmilePlus",
    shortExplanation:
      "AI som avgör känslan i en text — positiv, negativ eller neutral. Kan användas för att analysera medborgarfeedback, enkätsvar eller sociala medier.",
    analogy:
      "Som en expert på kroppsspråk, fast för text — den läser mellan raderna och känner av stämningen.",
    difficulty: "mellanniva",
    category: "ai-pa-jobbet",
    relatedConceptIds: ["nlp", "textgenerering"],
  },
  {
    id: "ai-agent",
    title: "AI-agent",
    icon: "Zap",
    shortExplanation:
      "En AI som inte bara svarar utan kan agera — söka information, köra verktyg, planera flera steg och utföra uppgifter självständigt.",
    analogy:
      "Skillnaden mellan en receptionist (assistent) och en projektledare (agent) — agenten planerar, delegerar och levererar hela resultatet.",
    difficulty: "mellanniva",
    category: "ai-pa-jobbet",
    relatedConceptIds: ["ai-assistent", "automatisering", "mcp-server"],
    explainerId: "ai-agent-vs-assistent",
  },

  // =========================================================================
  // 5. INTRIC-PLATTFORMEN (14 begrepp)
  // =========================================================================
  {
    id: "intric-plattform",
    title: "Intric",
    icon: "Boxes",
    shortExplanation:
      "Svensk AI-plattform för att bygga och hantera AI-assistenter i organisationer. All data stannar i EU och hanteras enligt GDPR.",
    analogy:
      "Som en verktygslåda för AI — du bygger dina egna assistenter anpassade för just din verksamhet.",
    difficulty: "grundlaggande",
    category: "intric",
    relatedConceptIds: ["intric-space", "intric-assistent", "intric-kunskap"],
  },
  {
    id: "intric-space",
    title: "Space (arbetsyta)",
    icon: "FolderOpen",
    shortExplanation:
      "En digital samarbetsyta i Intric där du och kollegor samlar era assistenter och gemensam kunskap. Tänk 'mapp' eller 'teamrum'.",
    analogy:
      "Som ett konferensrum med en whiteboardtavla — ni samarbetar, allt finns på plats, och ni bestämmer vem som får komma in.",
    difficulty: "grundlaggande",
    category: "intric",
    relatedConceptIds: ["intric-plattform", "intric-roller", "sakerhetsklasser"],
  },
  {
    id: "intric-assistent",
    title: "Assistent (i Intric)",
    icon: "Bot",
    shortExplanation:
      "En skräddarsydd AI-chattbot du konfigurerar för en specifik uppgift. Består av tre delar: språkmodell (motorn), kunskap (bränslet) och prompt (instruktionen).",
    analogy:
      "Som att anställa en specialist — du väljer kompetens (modell), ger den underlag (kunskap) och en arbetsbeskrivning (prompt).",
    difficulty: "grundlaggande",
    category: "intric",
    relatedConceptIds: ["intric-space", "intric-kunskap", "prompt"],
  },
  {
    id: "intric-kunskap",
    title: "Kunskap (Knowledge)",
    icon: "Library",
    shortExplanation:
      "Intern information (dokument, webbsidor, integrationer) som laddas upp i ett Space. Assistenten söker i kunskapen för att ge svar baserade på era dokument.",
    analogy:
      "Som ett bibliotek som assistenten kan besöka — istället för att gissa letar den upp svaret i era egna böcker.",
    difficulty: "grundlaggande",
    category: "intric",
    relatedConceptIds: ["intric-samling", "rag", "kunskapsbas"],
  },
  {
    id: "intric-samling",
    title: "Samling (Collection)",
    icon: "FolderKanban",
    shortExplanation:
      "En mapp inuti Kunskap där du organiserar filer som hör ihop. Varje samling använder en embeddingmodell för att göra innehållet sökbart.",
    analogy:
      "Som en bokhylla med en specifik kategori — alla böcker om HR i en hylla, alla om ekonomi i en annan.",
    difficulty: "grundlaggande",
    category: "intric",
    relatedConceptIds: ["intric-kunskap", "embeddings", "embeddingmodell"],
  },
  {
    id: "sakerhetsklasser",
    title: "Säkerhetsklasser",
    icon: "ShieldAlert",
    shortExplanation:
      "System i Intric som delar in information i nivåer och styr vilka AI-modeller som får användas. Känslig data kan begränsas till EU-baserade modeller.",
    analogy:
      "Som sekretessnivåer på dokument — 'öppen', 'intern', 'konfidentiell' — varje nivå har olika regler.",
    difficulty: "mellanniva",
    category: "intric",
    relatedConceptIds: ["intric-space", "gdpr", "informationsklassificering"],
  },
  {
    id: "intric-roller",
    title: "Roller i Intric (Admin, Redigerare, Läsare)",
    icon: "Users",
    shortExplanation:
      "Tre behörighetsnivåer: Admin (full kontroll), Redigerare (skapar assistenter och kunskap), Läsare (använder färdiga assistenter).",
    analogy:
      "Som roller i ett dokument — ägaren kan ändra allt, redaktören kan redigera, och läsaren kan bara läsa.",
    difficulty: "grundlaggande",
    category: "intric",
    relatedConceptIds: ["intric-space", "rbac"],
  },
  {
    id: "intric-personlig-chatt",
    title: "Personlig chatt",
    icon: "MessageSquare",
    shortExplanation:
      "Din privata AI-chatt i Intric för allmänna frågor. Du kan byta modell fritt, men kan inte ladda upp egen kunskap här — det gör du i Spaces.",
    analogy:
      "Som att ringa en vän och fråga vad som helst — ingen annan hör samtalet, men vännen har bara allmän kunskap.",
    difficulty: "grundlaggande",
    category: "intric",
    relatedConceptIds: ["intric-assistent", "intric-space"],
  },
  {
    id: "intric-bilagor-kunskap",
    title: "Bilagor vs. Kunskap",
    icon: "FileStack",
    shortExplanation:
      "Bilagor = stående instruktioner assistenten alltid läser (t.ex. varumärkesguide). Kunskap = sökbart bibliotek som konsulteras vid behov (t.ex. personalhandbok).",
    analogy:
      "Bilagor = lappar på skrivbordet du alltid ser. Kunskap = böcker i bokhyllan du plockar fram vid behov.",
    difficulty: "mellanniva",
    category: "intric",
    relatedConceptIds: ["intric-kunskap", "intric-assistent", "rag"],
  },
  {
    id: "intric-plans",
    title: "Plans (arbetsflöden)",
    icon: "ListTodo",
    shortExplanation:
      "Flerstegsarbetsflöden i Intric som körs i bakgrunden. Varje steg kan skriva, söka, analysera eller sammanfatta — och resultatet skickas vidare till nästa steg.",
    analogy:
      "Som en löpande band-process — steg 1 samlar information, steg 2 analyserar, steg 3 skriver rapporten.",
    difficulty: "mellanniva",
    category: "intric",
    relatedConceptIds: ["ai-agent", "automatisering", "intric-assistent"],
  },
  {
    id: "intric-marketplace",
    title: "Intric Marketplace",
    icon: "Store",
    shortExplanation:
      "Bibliotek med färdiga AI-assistenter som kan delas mellan organisationer. En assistenter som byggts i en kommun kan återanvändas av en annan.",
    analogy:
      "Som en appbutik för AI-assistenter — istället för att bygga allt själv kan du ladda ner färdiga lösningar.",
    difficulty: "grundlaggande",
    category: "intric",
    relatedConceptIds: ["intric-plattform", "intric-assistent"],
  },
  {
    id: "intric-arena",
    title: "Intric Arena",
    icon: "Users",
    shortExplanation:
      "Intrics community-nätverk med ambassadörer, biblioteksresurser och branschspecifika grupper (HR, vård, utbildning, ekonomi, IT-säkerhet).",
    analogy:
      "Som en yrkesförening för AI-användare — du delar erfarenheter och lär av andra organisationer.",
    difficulty: "grundlaggande",
    category: "intric",
    relatedConceptIds: ["intric-plattform", "intric-marketplace"],
  },
  {
    id: "intric-redacting",
    title: "Redacting (maskering av känslig data)",
    icon: "EyeOff",
    shortExplanation:
      "Automatisk upptäckt och maskering av känsliga uppgifter i dokument — personnummer, telefonnummer, adresser döljs innan AI:n analyserar texten.",
    analogy:
      "Som att stryka över känsliga delar med svart penna innan du visar dokumentet — informationen finns kvar men AI:n ser den inte.",
    difficulty: "mellanniva",
    category: "intric",
    relatedConceptIds: ["gdpr", "informationssakerhet", "personuppgiftsbehandling"],
  },
  {
    id: "intric-data-retention",
    title: "Data Retention (datalagring)",
    icon: "Clock",
    shortExplanation:
      "Inställning per assistent som styr hur länge konversationer sparas — allt från 'ingen radering' till 7, 30 eller 365 dagar. Data raderas permanent.",
    analogy:
      "Som en timer på en whiteboardtavla — efter inställd tid suddas allt ut automatiskt.",
    difficulty: "mellanniva",
    category: "intric",
    relatedConceptIds: ["gdpr", "informationssakerhet", "intric-assistent"],
  },

  // =========================================================================
  // 6. MICROSOFT COPILOT & 365 (12 begrepp)
  // =========================================================================
  {
    id: "m365-copilot",
    title: "Microsoft 365 Copilot",
    icon: "Laptop",
    shortExplanation:
      "AI-assistent inbyggd i Microsoft 365-apparna (Word, Teams, Outlook, Excel, PowerPoint). Använder din organisations data för att ge personliga svar.",
    analogy:
      "Som en assistent som sitter bredvid dig på jobbet och har tillgång till alla dina filer, mejl och möten.",
    difficulty: "grundlaggande",
    category: "copilot",
    relatedConceptIds: ["microsoft-graph", "semantic-index", "copilot-begrepp"],
  },
  {
    id: "microsoft-graph",
    title: "Microsoft Graph",
    icon: "GitBranch",
    shortExplanation:
      "Datalager som innehåller all din organisations information — mejl, filer, kalendrar, chattar, möten. Copilot använder Graph för att hitta relevant kontext.",
    analogy:
      "Som ett jättelikt arkiv med allt som hänt på jobbet — Copilot kan söka i det för att hitta vad du behöver.",
    difficulty: "mellanniva",
    category: "copilot",
    relatedConceptIds: ["m365-copilot", "semantic-index"],
  },
  {
    id: "semantic-index",
    title: "Semantic Index",
    icon: "Search",
    shortExplanation:
      "Microsofts system som skapar vektorrepresentationer av organisationsdata. Möjliggör sökning efter betydelse, inte bara exakta ord.",
    analogy:
      "Som ett superbibliotek som förstår vad du menar, inte bara vad du skriver — söker du 'budgetproblem' hittar den även 'kostnadsöverskridanden'.",
    difficulty: "mellanniva",
    category: "copilot",
    relatedConceptIds: ["microsoft-graph", "semantisk-sokning", "embeddings"],
  },
  {
    id: "copilot-outlook",
    title: "Copilot i Outlook",
    icon: "Mail",
    shortExplanation:
      "AI som hjälper dig skriva mejl, sammanfatta långa mejltrådar, föreslå svar och hantera din kalender direkt i Outlook.",
    analogy:
      "Som en sekreterare som läst alla dina mejl och kan föreslå svar, boka möten och prioritera det viktiga.",
    difficulty: "grundlaggande",
    category: "copilot",
    relatedConceptIds: ["m365-copilot", "microsoft-graph"],
    explainerId: "copilot-i-outlook",
  },
  {
    id: "copilot-teams",
    title: "Copilot i Teams",
    icon: "Video",
    shortExplanation:
      "AI som transkriberar möten i realtid, skapar sammanfattningar med beslutspunkter, och svarar på frågor om vad som sagts.",
    analogy:
      "Som en mötessekreterare som aldrig missar ett ord och kan svara 'vad beslutade vi om budgeten?' direkt efter mötet.",
    difficulty: "grundlaggande",
    category: "copilot",
    relatedConceptIds: ["m365-copilot", "motessammanfattning", "transkribering"],
    explainerId: "copilot-i-teams",
  },
  {
    id: "copilot-word",
    title: "Copilot i Word",
    icon: "FileText",
    shortExplanation:
      "AI som hjälper dig skriva, redigera och formatera dokument. Kan skapa utkast från instruktioner, sammanfatta texter och omformulera stycken.",
    analogy:
      "Som en skrivcoach som sitter bredvid dig — 'gör den här meningen tydligare', 'skriv en inledning till rapporten'.",
    difficulty: "grundlaggande",
    category: "copilot",
    relatedConceptIds: ["m365-copilot", "textgenerering"],
  },
  {
    id: "copilot-excel",
    title: "Copilot i Excel",
    icon: "Table",
    shortExplanation:
      "AI som analyserar data, föreslår formler, skapar diagram och hittar mönster i dina kalkylblad. Du ställer frågor i naturligt språk.",
    analogy:
      "Som en dataanalytiker som tittar på ditt kalkylblad och säger 'jag ser att kostnaderna ökar 15% per kvartal, vill du se ett diagram?'.",
    difficulty: "grundlaggande",
    category: "copilot",
    relatedConceptIds: ["m365-copilot"],
  },
  {
    id: "copilot-powerpoint",
    title: "Copilot i PowerPoint",
    icon: "Presentation",
    shortExplanation:
      "AI som skapar presentationer från instruktioner eller Word-dokument. Kan generera bilder, föreslå layouter och sammanfatta slides.",
    analogy:
      "Som en presentationsdesigner — du säger 'gör en presentation om vår AI-strategi' och får ett färdigt utkast.",
    difficulty: "grundlaggande",
    category: "copilot",
    relatedConceptIds: ["m365-copilot", "textgenerering"],
  },
  {
    id: "copilot-studio",
    title: "Copilot Studio",
    icon: "Wrench",
    shortExplanation:
      "Microsofts plattform för att bygga egna AI-agenter och anpassa Copilot med specialiserade kunskaper och verktyg.",
    analogy:
      "Som en verktygslåda för att bygga din egen version av Copilot — anpassad för just din avdelnings behov.",
    difficulty: "mellanniva",
    category: "copilot",
    relatedConceptIds: ["m365-copilot", "copilot-agenter"],
  },
  {
    id: "copilot-agenter",
    title: "Copilot-agenter",
    icon: "Zap",
    shortExplanation:
      "Specialiserade versioner av Copilot byggda i Copilot Studio för specifika uppgifter och arbetsflöden — t.ex. en HR-agent eller en ekonomiagent.",
    analogy:
      "Som specialiserade konsulter — en kan HR, en kan ekonomi, en kan IT — alla drivna av samma AI-motor.",
    difficulty: "mellanniva",
    category: "copilot",
    relatedConceptIds: ["copilot-studio", "ai-agent", "m365-copilot"],
  },
  {
    id: "copilot-kopplingar",
    title: "Copilot-kopplingar (Connectors)",
    icon: "Plug",
    shortExplanation:
      "Kopplingar som indexerar extern organisationsdata i Microsoft Graph så Copilot kan söka i den — t.ex. data från Jira, Salesforce eller interna system.",
    analogy:
      "Som att koppla in fler hyllor i Copilots bibliotek — ju fler datakällor du kopplar, desto mer kan Copilot hitta.",
    difficulty: "mellanniva",
    category: "copilot",
    relatedConceptIds: ["microsoft-graph", "m365-copilot", "integration"],
  },
  {
    id: "microsoft-purview",
    title: "Microsoft Purview (datasäkerhet)",
    icon: "ShieldCheck",
    shortExplanation:
      "Microsofts verktyg för dataklassificering, känslighetsmärkning och skydd mot dataläckor. Säkerställer att Copilot respekterar behörigheter.",
    analogy:
      "Som en säkerhetsvakt som ser till att Copilot bara visar dokument du har rätt att se.",
    difficulty: "mellanniva",
    category: "copilot",
    relatedConceptIds: ["m365-copilot", "informationsklassificering", "rbac"],
  },

  // =========================================================================
  // 7. TEKNIK & INFRASTRUKTUR (16 begrepp)
  // =========================================================================
  {
    id: "api",
    title: "API (Application Programming Interface)",
    icon: "Plug",
    shortExplanation:
      "Ett sätt för program att prata med varandra. När du frågar en AI-assistent skickas din fråga via ett API till AI-modellen, som skickar tillbaka svaret.",
    analogy:
      "Som en servitör på en restaurang — du beställer (skickar fråga), servitören går till köket (API:t), och kommer tillbaka med maten (svaret).",
    difficulty: "mellanniva",
    category: "teknik",
    relatedConceptIds: ["rest-api", "mcp-server", "integration"],
    explainerId: "hur-fungerar-api",
  },
  {
    id: "rest-api",
    title: "REST API",
    icon: "ArrowRightLeft",
    shortExplanation:
      "Den vanligaste typen av API på internet. Använder HTTP-metoder (GET, POST, PUT, DELETE) för att hämta och skicka data mellan system.",
    analogy:
      "Som ett standardiserat beställningsformulär — alla restauranger använder samma format, så du vet alltid hur du beställer.",
    difficulty: "mellanniva",
    category: "teknik",
    relatedConceptIds: ["api", "http-https", "json-xml"],
  },
  {
    id: "mcp-server",
    title: "MCP-server (Model Context Protocol)",
    icon: "Cable",
    shortExplanation:
      "En öppen standard som låter AI-assistenter koppla till externa verktyg och datakällor. Intric använder MCP för att ansluta till SCB, Kolada och Domstolsverket.",
    analogy:
      "Som en universaladapter för laddare — istället för en kabel per verktyg har du en standard som fungerar med allt.",
    difficulty: "fordjupning",
    category: "teknik",
    relatedConceptIds: ["api", "integration", "intric-plattform"],
    explainerId: "vad-ar-mcp",
  },
  {
    id: "integration",
    title: "Integration",
    icon: "Link2",
    shortExplanation:
      "Att koppla ihop olika system så de kan dela data automatiskt. T.ex. att Intric kan söka i SharePoint, eller att HR-systemet skickar data till ekonomisystemet.",
    analogy:
      "Som att bygga en bro mellan två öar — istället för att paddla med data fram och tillbaka flödar den automatiskt.",
    difficulty: "mellanniva",
    category: "teknik",
    relatedConceptIds: ["api", "mcp-server", "copilot-kopplingar"],
    explainerId: "hur-fungerar-integration",
  },
  {
    id: "open-source",
    title: "Open source (öppen källkod)",
    icon: "Unlock",
    shortExplanation:
      "Programvara där koden är öppen för alla att se, använda och förbättra. Llama, Mistral och GPT-SW3 är open source AI-modeller.",
    analogy:
      "Som ett recept som alla kan läsa och anpassa — du kan laga rätten precis som du vill, och dela dina förbättringar.",
    difficulty: "grundlaggande",
    category: "teknik",
    relatedConceptIds: ["proprietar", "lokal-ai-vs-moln", "llama", "mistral"],
  },
  {
    id: "proprietar",
    title: "Proprietär (stängd) programvara",
    icon: "Lock",
    shortExplanation:
      "Programvara där koden är hemlig och kontrollerad av ett företag. GPT-4, Claude och Gemini är proprietära modeller — du använder dem via API.",
    analogy:
      "Som en restaurang med hemligt recept — du kan äta maten men inte se hur den lagas.",
    difficulty: "mellanniva",
    category: "teknik",
    relatedConceptIds: ["open-source", "lokal-ai-vs-moln"],
  },
  {
    id: "lokal-ai-vs-moln",
    title: "Lokal AI vs. moln-AI",
    icon: "Server",
    shortExplanation:
      "Lokal AI körs på din egen server — data lämnar aldrig organisationen. Moln-AI körs hos en leverantör (OpenAI, Google) — enklare men data skickas ut.",
    analogy:
      "Som skillnaden mellan att laga mat hemma (lokal) och beställa hem (moln) — hemma har du full kontroll, men det kräver mer utrustning.",
    difficulty: "mellanniva",
    category: "teknik",
    relatedConceptIds: ["open-source", "on-premises", "gpu", "tredjelandsoverforing"],
    explainerId: "lokal-vs-moln-ai",
  },
  {
    id: "gpu",
    title: "GPU (grafikprocessor)",
    icon: "Cpu",
    shortExplanation:
      "Specialiserad processor som är extremt bra på parallella beräkningar — perfekt för AI-träning och inferens. NVIDIA dominerar marknaden.",
    analogy:
      "Som ett lag av tusentals miniräknare som arbetar samtidigt — medan en vanlig processor (CPU) är en enda superkalkylator.",
    difficulty: "mellanniva",
    category: "teknik",
    relatedConceptIds: ["inferens", "lokal-ai-vs-moln", "on-premises"],
  },
  {
    id: "server-instans",
    title: "Server/Instans",
    icon: "Server",
    shortExplanation:
      "En instans är en egen kopia av ett program som körs på en server. Intric kan köras som delad, dedikerad eller lokal instans beroende på säkerhetsbehov.",
    analogy:
      "Som skillnaden mellan att bo i lägenhet (delad server), radhus (dedikerad) eller villa (egen server) — mer kontroll kostar mer.",
    difficulty: "mellanniva",
    category: "teknik",
    relatedConceptIds: ["server", "molntjanst", "on-premises"],
  },
  {
    id: "on-premises",
    title: "On-premises (lokal drift)",
    icon: "Building2",
    shortExplanation:
      "Att köra programvara på egna servrar i den egna organisationen. All data stannar inom nätverket — maximal kontroll men kräver egen IT-kompetens.",
    analogy:
      "Som att ha ett eget kök istället för att beställa catering — du bestämmer allt men måste sköta disken själv.",
    difficulty: "mellanniva",
    category: "teknik",
    relatedConceptIds: ["molntjanst", "lokal-ai-vs-moln", "server-instans"],
  },
  {
    id: "deployment",
    title: "Deployment (driftsättning)",
    icon: "Rocket",
    shortExplanation:
      "Processen att göra ett program tillgängligt för användare — att ta det från utveckling till produktion. 'Vi deployar nya versionen på fredag.'",
    analogy:
      "Som att öppna en butik — allt är förberett bakom kulisserna och nu slår du upp dörrarna för kunderna.",
    difficulty: "mellanniva",
    category: "teknik",
    relatedConceptIds: ["server", "molntjanst"],
  },
  {
    id: "sso",
    title: "SSO (Single Sign-On)",
    icon: "KeyRound",
    shortExplanation:
      "Logga in en gång och få åtkomst till alla dina system — utan att behöva separata lösenord överallt. Intric stödjer SSO via organisationens identitetssystem.",
    analogy:
      "Som ett huvudnyckelkort på jobbet — en bricka öppnar alla dörrar istället för att ha en nyckel per dörr.",
    difficulty: "mellanniva",
    category: "teknik",
    relatedConceptIds: ["tvafaktor", "rbac"],
  },
  {
    id: "rbac",
    title: "RBAC (rollbaserad åtkomstkontroll)",
    icon: "Shield",
    shortExplanation:
      "System där behörigheter bestäms av din roll — inte vem du är personligen. Admin ser allt, redigerare kan ändra, läsare kan bara titta.",
    analogy:
      "Som nyckelkort på ett hotell — städpersonalen kommer in i alla rum, gästen bara i sitt eget.",
    difficulty: "mellanniva",
    category: "teknik",
    relatedConceptIds: ["sso", "intric-roller", "microsoft-purview"],
  },
  {
    id: "interoperabilitet",
    title: "Interoperabilitet",
    icon: "Puzzle",
    shortExplanation:
      "Förmågan hos olika system att samarbeta och utbyta data sömlöst. Grunden för att kommunens AI-verktyg ska fungera med befintliga system.",
    analogy:
      "Som att alla talar samma språk — system från olika leverantörer kan förstå varandra utan tolk.",
    difficulty: "mellanniva",
    category: "teknik",
    relatedConceptIds: ["api", "integration", "mcp-server"],
  },
  {
    id: "pwa",
    title: "PWA (Progressive Web App)",
    icon: "Smartphone",
    shortExplanation:
      "En webbsida som beter sig som en app — kan installeras på telefonen, fungerar offline och skickar notiser. AI-hubben är en PWA.",
    analogy:
      "Som en kameleon — den ser ut som en app men är egentligen en webbsida som kan allt en app kan.",
    difficulty: "mellanniva",
    category: "teknik",
    relatedConceptIds: ["webblasare", "cache"],
  },
  {
    id: "json-xml",
    title: "JSON & XML (dataformat)",
    icon: "Braces",
    shortExplanation:
      "Standardformat för att strukturera data som skickas mellan system. JSON är lättläst och det vanligaste formatet i moderna API:er.",
    analogy:
      "Som ett gemensamt språk för datorer — istället för att skicka en rörig text skickar du organiserad information i ett format alla förstår.",
    difficulty: "mellanniva",
    category: "teknik",
    relatedConceptIds: ["api", "rest-api"],
  },

  // =========================================================================
  // 8. DATA & SÖKNING (12 begrepp)
  // =========================================================================
  {
    id: "rag",
    title: "RAG (Retrieval-Augmented Generation)",
    icon: "BookSearch",
    shortExplanation:
      "Teknik som låter AI söka i dina egna dokument innan den svarar. Istället för att gissa baserat på träningsdata hittar den fakta i din kunskapsbas.",
    analogy:
      "Som en student som får ha med sig böcker på tentan — istället för att memorera allt kan den slå upp svaret.",
    difficulty: "mellanniva",
    category: "data-sokning",
    relatedConceptIds: ["embeddings", "vektordatabas", "chunking", "intric-kunskap"],
    explainerId: "hur-fungerar-rag",
  },
  {
    id: "embeddings",
    title: "Embeddings (textinbäddning)",
    icon: "Grid3x3",
    shortExplanation:
      "AI:ns sätt att omvandla text till siffror (vektorer) som fångar betydelsen. Liknande texter får liknande siffror, vilket möjliggör smart sökning.",
    analogy:
      "Som att ge varje ord en GPS-koordinat på en betydelsekarta — ord med liknande mening hamnar nära varandra.",
    difficulty: "fordjupning",
    category: "data-sokning",
    relatedConceptIds: ["vektordatabas", "semantisk-sokning", "embeddingmodell"],
    explainerId: "vad-ar-embeddings",
  },
  {
    id: "vektordatabas",
    title: "Vektordatabas",
    icon: "Database",
    shortExplanation:
      "En databas specialiserad på att lagra och söka i vektorer (embeddingar). Hittar snabbt text med liknande betydelse — grunden för RAG.",
    analogy:
      "Som ett bibliotek sorterat efter ämne istället för författare — du hittar alla böcker om 'ledarskap' oavsett vem som skrivit dem.",
    difficulty: "fordjupning",
    category: "data-sokning",
    relatedConceptIds: ["embeddings", "rag", "semantisk-sokning"],
  },
  {
    id: "semantisk-sokning",
    title: "Semantisk sökning",
    icon: "Search",
    shortExplanation:
      "Sökning baserad på betydelse istället för exakta ord. Söker du 'minska kostnader' hittar den även dokument som nämner 'budgetoptimering'.",
    analogy:
      "Som en bibliotekarie som förstår vad du menar, inte bara vad du säger — 'jag vill ha en spännande bok' → böcker om äventyr, thriller och mysterier.",
    difficulty: "mellanniva",
    category: "data-sokning",
    relatedConceptIds: ["embeddings", "vektordatabas", "semantic-index"],
    explainerId: "semantisk-vs-nyckelord",
  },
  {
    id: "chunking",
    title: "Chunking (textsegmentering)",
    icon: "Scissors",
    shortExplanation:
      "Att dela upp stora dokument i mindre bitar innan de görs sökbara. Varje bit får sin egen embedding — för precis sökning.",
    analogy:
      "Som att klippa en bok i kapitel innan du lägger den i bokhyllan — det är lättare att hitta rätt stycke än att söka i hela boken.",
    difficulty: "fordjupning",
    category: "data-sokning",
    relatedConceptIds: ["rag", "embeddings", "intric-dokument"],
  },
  {
    id: "kunskapsbas",
    title: "Kunskapsbas / Knowledge Base",
    icon: "Library",
    shortExplanation:
      "En samling dokument som AI:n kan söka i för att ge bättre svar. Intrics kunskapssamlingar och SharePoint-bibliotek är exempel på kunskapsbaser.",
    analogy:
      "Som ett uppslagsverk som AI:n kan bläddra i — ju fler relevanta böcker, desto bättre svar.",
    difficulty: "mellanniva",
    category: "data-sokning",
    relatedConceptIds: ["rag", "intric-kunskap", "intric-samling"],
  },
  {
    id: "verksamhetssystem",
    title: "Verksamhetssystem",
    icon: "Building2",
    shortExplanation:
      "IT-system som stödjer verksamheten — ekonomisystem, HR-system, ärendehantering, journalsystem. AI kan integreras med dessa för smartare arbetsflöden.",
    analogy:
      "Som verktyg i en verktygslåda — varje system löser en specifik uppgift, och AI kan vara limet som kopplar ihop dem.",
    difficulty: "grundlaggande",
    category: "data-sokning",
    relatedConceptIds: ["integration", "api", "automatisering"],
  },
  {
    id: "strukturerad-ostrukturerad",
    title: "Strukturerad vs. ostrukturerad data",
    icon: "Table2",
    shortExplanation:
      "Strukturerad data = tabeller och register (Excel, databaser). Ostrukturerad = fritext, bilder, ljud. AI är bra på att hantera bägge typer.",
    analogy:
      "Strukturerad = böcker ordnade i en bokhylla. Ostrukturerad = högar med lösa papper — AI:n kan sortera båda.",
    difficulty: "mellanniva",
    category: "data-sokning",
    relatedConceptIds: ["databas", "metadata"],
  },
  {
    id: "metadata",
    title: "Metadata",
    icon: "Tag",
    shortExplanation:
      "Data om data — vem skapade dokumentet, när, vilken typ, vilka nyckelord. Hjälper AI:n att sortera och hitta rätt information.",
    analogy:
      "Som etiketten på en burk — den berättar vad som finns inuti utan att du behöver öppna den.",
    difficulty: "mellanniva",
    category: "data-sokning",
    relatedConceptIds: ["strukturerad-ostrukturerad", "databas"],
  },
  {
    id: "oppna-data",
    title: "Öppna data",
    icon: "Unlock",
    shortExplanation:
      "Data från offentliga aktörer som är fritt tillgänglig för alla att använda. SCB, Kolada och DIGG tillhandahåller öppna data som AI kan analysera.",
    analogy:
      "Som böcker på ett öppet bibliotek — vem som helst kan låna och använda dem, inklusive AI.",
    difficulty: "grundlaggande",
    category: "data-sokning",
    relatedConceptIds: ["mcp-server", "api"],
  },
  {
    id: "dataflode",
    title: "Dataflöde",
    icon: "ArrowRightLeft",
    shortExplanation:
      "Hur information rör sig mellan system — från indata till behandling till resultat. Att förstå dataflöden är avgörande för GDPR och säkerhet.",
    analogy:
      "Som vatten i ett rörsystem — du behöver veta var det kommer in, var det behandlas, och var det hamnar.",
    difficulty: "mellanniva",
    category: "data-sokning",
    relatedConceptIds: ["integration", "gdpr", "informationssakerhet"],
  },
  {
    id: "webbcrawling",
    title: "Webbcrawling & indexering",
    icon: "Globe",
    shortExplanation:
      "Automatisk genomsökning av webbsidor för att göra innehållet sökbart. Intric kan crawla webbplatser och lägga in innehållet i kunskapsbaser.",
    analogy:
      "Som en robot som läser alla sidor på en webbplats och gör ett register — så AI:n snabbt kan hitta rätt.",
    difficulty: "mellanniva",
    category: "data-sokning",
    relatedConceptIds: ["intric-kunskap", "semantisk-sokning"],
  },

  // =========================================================================
  // 9. LAGAR & REGLER (16 begrepp)
  // =========================================================================
  {
    id: "gdpr",
    title: "GDPR (Dataskyddsförordningen)",
    icon: "Scale",
    shortExplanation:
      "EU:s lag som skyddar personuppgifter. Bestämmer hur organisationer får samla in, lagra och använda information om individer — extra viktigt vid AI-användning.",
    analogy:
      "Som trafikregler för data — de finns för att skydda människor, och du måste följa dem vart du än kör.",
    difficulty: "grundlaggande",
    category: "lagar-regler",
    relatedConceptIds: ["personuppgiftsansvarig", "personuppgiftsbitrade", "dpia", "rattslig-grund"],
  },
  {
    id: "ai-act",
    title: "EU:s AI-förordning (AI Act)",
    icon: "Landmark",
    shortExplanation:
      "Världens första heltäckande AI-lag. Klassificerar AI-system efter risknivå och ställer krav som ökar med risken. Trädde i kraft 1 aug 2024.",
    analogy:
      "Som byggnormer för AI — ju högre 'hus' du bygger (högre risk), desto strängare regler måste du följa.",
    difficulty: "grundlaggande",
    category: "lagar-regler",
    relatedConceptIds: ["ai-act-riskkategorier", "ai-act-litteracitet", "ai-act-fria"],
    explainerId: "ai-act-riskkategorier-animation",
  },
  {
    id: "ai-act-riskkategorier",
    title: "AI Act: Riskkategorier",
    icon: "AlertTriangle",
    shortExplanation:
      "AI Act delar in AI i 4 risknivåer: Förbjuden (social scoring), Hög risk (beslut om medborgare), Begränsad risk (chatbots, måste vara transparenta), Minimal risk (spamfilter).",
    analogy:
      "Som en stege — på bottenvåningen är det fritt fram, men ju högre du klättrar desto mer säkerhetsutrustning krävs.",
    difficulty: "mellanniva",
    category: "lagar-regler",
    relatedConceptIds: ["ai-act", "ai-act-fria"],
    explainerId: "ai-act-riskkategorier-animation",
  },
  {
    id: "ai-act-litteracitet",
    title: "AI Act: AI-litteracitet (utbildningskrav)",
    icon: "GraduationCap",
    shortExplanation:
      "Krav i AI Act (gäller sedan feb 2025) att organisationer ska säkerställa att personal som använder AI har tillräcklig förståelse för möjligheter och risker.",
    analogy:
      "Som att kräva körkort för att köra bil — du måste förstå grunderna innan du får använda verktyget.",
    difficulty: "mellanniva",
    category: "lagar-regler",
    relatedConceptIds: ["ai-act"],
  },
  {
    id: "ai-act-fria",
    title: "AI Act: Grundläggande rättigheter (FRIA)",
    icon: "Heart",
    shortExplanation:
      "Offentliga organ måste göra en bedömning av grundläggande rättigheter (FRIA) innan de sätter in högrisk-AI. Hur påverkas medborgarnas rättigheter?",
    analogy:
      "Som en checklista innan byggstart — 'påverkar det här grannarna?' — fast för medborgarnas rättigheter.",
    difficulty: "mellanniva",
    category: "lagar-regler",
    relatedConceptIds: ["ai-act", "ai-act-riskkategorier", "dpia"],
  },
  {
    id: "offentlighetsprincipen-ai",
    title: "Offentlighetsprincipen & AI",
    icon: "Eye",
    shortExplanation:
      "Allt kommun-AI gör kan bli allmän handling. Chattar med AI-assistenter, genererade dokument och beslutsstöd kan begäras ut — tänk innan du promptar.",
    analogy:
      "Som att skriva på en whiteboardtavla i ett rum med glasväggar — vem som helst kan titta in.",
    difficulty: "grundlaggande",
    category: "lagar-regler",
    relatedConceptIds: ["gdpr", "ai-sekretess", "informationsklassificering"],
  },
  {
    id: "personuppgiftsansvarig",
    title: "Personuppgiftsansvarig",
    icon: "UserCog",
    shortExplanation:
      "Organisationen som bestämmer varför och hur personuppgifter behandlas. Kommunen är personuppgiftsansvarig för sin AI-användning.",
    analogy:
      "Som ägaren av en butik — du bestämmer vilka kunduppgifter som samlas in och vad de används till.",
    difficulty: "mellanniva",
    category: "lagar-regler",
    relatedConceptIds: ["personuppgiftsbitrade", "gdpr"],
  },
  {
    id: "personuppgiftsbitrade",
    title: "Personuppgiftsbiträde (& PUB-avtal)",
    icon: "FileCheck",
    shortExplanation:
      "Extern part som behandlar personuppgifter åt den ansvarige — t.ex. Intric som molntjänstleverantör. Kräver ett PUB-avtal (Personuppgiftsbiträdesavtal).",
    analogy:
      "Som ett städföretag — de städar ditt kontor (behandlar din data) men måste följa dina regler om vad de får röra.",
    difficulty: "mellanniva",
    category: "lagar-regler",
    relatedConceptIds: ["personuppgiftsansvarig", "gdpr"],
  },
  {
    id: "dpia",
    title: "Konsekvensbedömning (DPIA)",
    icon: "ClipboardCheck",
    shortExplanation:
      "Analys som måste göras innan AI används för känsliga uppgifter. Bedömer risker för individers integritet och hur de kan minimeras.",
    analogy:
      "Som en riskbedömning innan ett byggprojekt — vad kan gå fel, och hur förebygger vi det?",
    difficulty: "mellanniva",
    category: "lagar-regler",
    relatedConceptIds: ["gdpr", "personuppgiftsansvarig", "ai-act-fria"],
  },
  {
    id: "dataskyddsombud",
    title: "Dataskyddsombud (DPO)",
    icon: "UserCheck",
    shortExplanation:
      "Personen i organisationen som övervakar att dataskyddet följs. Obligatorisk roll för myndigheter och kommuner. Kontakta DPO:n vid AI-frågor.",
    analogy:
      "Som en intern revisor för personuppgifter — den som ser till att alla följer reglerna.",
    difficulty: "grundlaggande",
    category: "lagar-regler",
    relatedConceptIds: ["gdpr", "dpia"],
  },
  {
    id: "tredjelandsoverforing",
    title: "Tredjelandsöverföring",
    icon: "Globe",
    shortExplanation:
      "När personuppgifter skickas till länder utanför EU — t.ex. till amerikanska AI-tjänster som ChatGPT. Kräver extra skyddsåtgärder enligt GDPR.",
    analogy:
      "Som att skicka ett värdefullt paket utomlands — du behöver extra försäkring och spårning.",
    difficulty: "mellanniva",
    category: "lagar-regler",
    relatedConceptIds: ["gdpr", "lokal-ai-vs-moln", "azure-openai"],
  },
  {
    id: "rattslig-grund",
    title: "Rättslig grund (6 grunder i GDPR)",
    icon: "Scale",
    shortExplanation:
      "Du måste ha en laglig anledning att behandla personuppgifter: samtycke, avtal, rättslig förpliktelse, vitala intressen, allmänt intresse eller intresseavvägning.",
    analogy:
      "Som att ha en giltig anledning att öppna någons brev — du kan inte bara göra det för att du vill.",
    difficulty: "mellanniva",
    category: "lagar-regler",
    relatedConceptIds: ["gdpr", "personuppgiftsansvarig"],
  },
  {
    id: "informationsklassificering",
    title: "Informationsklassificering",
    icon: "Tag",
    shortExplanation:
      "Att bedöma hur känslig information är innan den delas med AI. 'Öppen', 'intern', 'konfidentiell' — varje nivå har olika regler för vilka AI-verktyg som får användas.",
    analogy:
      "Som att sortera post i fack — reklam kan alla se, men brev med 'konfidentiellt' öppnas bara av rätt person.",
    difficulty: "grundlaggande",
    category: "lagar-regler",
    relatedConceptIds: ["sakerhetsklasser", "gdpr", "microsoft-purview"],
  },
  {
    id: "ansvarsfragor",
    title: "Ansvarsfrågor vid AI-beslut",
    icon: "Gavel",
    shortExplanation:
      "Vem ansvarar om AI:n ger fel råd? Alltid människan — aldrig maskinen. AI är ett verktyg, inte en beslutsfattare. Den anställde och organisationen bär ansvaret.",
    analogy:
      "Som en kalkylator — om du matar in fel siffror och fattar ett dåligt beslut är det inte kalkylatorns fel.",
    difficulty: "grundlaggande",
    category: "lagar-regler",
    relatedConceptIds: ["mansklig-kontroll", "ai-beslutsfattande", "ansvarsfull-ai"],
  },
  {
    id: "offentlig-upphandling-ai",
    title: "Offentlig upphandling & AI",
    icon: "FileSearch",
    shortExplanation:
      "Regler för hur kommuner får köpa in AI-tjänster. Kräver transparens, konkurrensutsättning och att leverantören uppfyller GDPR och AI Act.",
    analogy:
      "Som att handla i en affär med speciella regler — du måste jämföra priser, kolla kvalitet och följa alla regler.",
    difficulty: "mellanniva",
    category: "lagar-regler",
    relatedConceptIds: ["ai-act", "gdpr"],
  },
  {
    id: "privacy-by-design",
    title: "Inbyggt dataskydd (Privacy by Design)",
    icon: "ShieldCheck",
    shortExplanation:
      "Principen att dataskydd ska byggas in från start, inte läggas till i efterhand. AI-system ska designas med integritet som grundval.",
    analogy:
      "Som att bygga in brandsäkerhet i husritningen — inte installera brandvarnare efter att det brunnit.",
    difficulty: "mellanniva",
    category: "lagar-regler",
    relatedConceptIds: ["gdpr", "dpia"],
  },

  // =========================================================================
  // 10. SÄKERHET & ETIK (14 begrepp)
  // =========================================================================
  {
    id: "bias",
    title: "Bias (partiskhet i AI)",
    icon: "Scale",
    shortExplanation:
      "Systematiska snedvridningar i AI:ns svar orsakade av skev träningsdata. AI:n kan diskriminera baserat på kön, etnicitet eller ålder utan att 'vilja' det.",
    analogy:
      "Som en spegel som vrider bilden — AI:n speglar fördomar som finns i den data den tränats på.",
    difficulty: "mellanniva",
    category: "sakerhet-etik",
    relatedConceptIds: ["traningsdata", "ansvarsfull-ai", "transparens"],
  },
  {
    id: "transparens",
    title: "Transparens",
    icon: "Eye",
    shortExplanation:
      "Att vara öppen med när och hur AI används. AI Act kräver att chatbotar talar om att de är AI, och att AI-genererat innehåll märks.",
    analogy:
      "Som att sätta 'skapat av AI' på en text — läsaren har rätt att veta att en maskin skrivit det.",
    difficulty: "grundlaggande",
    category: "sakerhet-etik",
    relatedConceptIds: ["ai-act", "ansvarsfull-ai", "forklarbar-ai"],
  },
  {
    id: "ansvarsfull-ai",
    title: "Ansvarsfull AI",
    icon: "Heart",
    shortExplanation:
      "Principer för att använda AI rättvist, transparent och med mänsklig kontroll. Inkluderar etik, säkerhet, inkludering och hållbarhet.",
    analogy:
      "Som att köra bil ansvarsfullt — du har ett kraftfullt verktyg och skyldighet att använda det säkert.",
    difficulty: "grundlaggande",
    category: "sakerhet-etik",
    relatedConceptIds: ["bias", "transparens", "mansklig-kontroll"],
  },
  {
    id: "informationssakerhet",
    title: "Informationssäkerhet",
    icon: "ShieldAlert",
    shortExplanation:
      "Att skydda känslig data från att läcka till AI-tjänster. Dela aldrig lösenord, personnummer eller konfidentiell information med extern AI.",
    analogy:
      "Som att inte prata om hemliga saker i hissen — du vet aldrig vem som lyssnar.",
    difficulty: "grundlaggande",
    category: "sakerhet-etik",
    relatedConceptIds: ["kryptering", "gdpr", "sakerhetsklasser"],
  },
  {
    id: "ai-sekretess",
    title: "AI och sekretess",
    icon: "Lock",
    shortExplanation:
      "Dela aldrig sekretessbelagd information med externa AI-tjänster. Kommunens sekretessregler gäller även när du använder AI — oavsett verktyg.",
    analogy:
      "Som att inte kopiera hemliga dokument och ge till en okänd — extern AI är en tredje part.",
    difficulty: "grundlaggande",
    category: "sakerhet-etik",
    relatedConceptIds: ["offentlighetsprincipen-ai", "informationssakerhet", "intric-plattform"],
  },
  {
    id: "upphovsratt",
    title: "Upphovsrätt & AI",
    icon: "Copyright",
    shortExplanation:
      "Juridiskt gråzon: Vem äger text och bilder som AI skapar? Vad fick AI:n träna på? Lagstiftningen är fortfarande under utveckling.",
    analogy:
      "Som att fråga vem som äger en tavla målad av en robot som studerat tusentals konstnärer — svaret är inte klart ännu.",
    difficulty: "mellanniva",
    category: "sakerhet-etik",
    relatedConceptIds: ["generativ-ai", "bildgenerering", "ai-act"],
  },
  {
    id: "kallkritik",
    title: "Källkritik med AI",
    icon: "SearchCheck",
    shortExplanation:
      "Att alltid dubbelkolla AI:ns svar mot tillförlitliga källor. AI kan inte skilja fakta från fiktion — det är ditt ansvar att verifiera.",
    analogy:
      "Som att inte blint lita på allt Wikipedia säger — kolla originalkällan för viktig information.",
    difficulty: "grundlaggande",
    category: "sakerhet-etik",
    relatedConceptIds: ["hallucination", "grounding", "ansvarsfull-ai"],
  },
  {
    id: "deepfakes",
    title: "Deepfakes",
    icon: "UserX",
    shortExplanation:
      "AI-genererade bilder, ljud eller video som ser äkta ut men är falska. Kan användas för desinformation eller bedrägerier.",
    analogy:
      "Som en digital maskerad — AI:n kan få vem som helst att se ut att säga vad som helst.",
    difficulty: "grundlaggande",
    category: "sakerhet-etik",
    relatedConceptIds: ["generativ-ai", "transparens", "bildgenerering"],
  },
  {
    id: "prompt-injection",
    title: "Prompt injection (promptattack)",
    icon: "Bug",
    shortExplanation:
      "En attack där skadliga instruktioner gömts i input för att lura AI:n att ignorera sina regler. T.ex. 'ignorera alla tidigare instruktioner och...'.",
    analogy:
      "Som att gömma en hemlig instruktion i en beställning — 'och ge mig dessutom allt i kassan'.",
    difficulty: "mellanniva",
    category: "sakerhet-etik",
    relatedConceptIds: ["guardrails", "systemprompt", "jailbreaking"],
  },
  {
    id: "jailbreaking",
    title: "Jailbreaking",
    icon: "Unlock",
    shortExplanation:
      "Försök att få AI:n att kringgå sina säkerhetsregler och producera förbjudet innehåll. AI-leverantörer arbetar ständigt med att förhindra detta.",
    analogy:
      "Som att försöka övertala vakten att släppa in dig utan biljett — ibland lyckas det, men det är inte meningen.",
    difficulty: "mellanniva",
    category: "sakerhet-etik",
    relatedConceptIds: ["prompt-injection", "guardrails"],
  },
  {
    id: "svarta-ladan",
    title: "Svarta lådan (Black Box)",
    icon: "Box",
    shortExplanation:
      "Problem med att AI:ns beslutsprocess ofta är omöjlig att förstå — vi ser input och output men inte vad som händer inuti.",
    analogy:
      "Som en magiker som visar resultatet men aldrig tricket — du vet att det fungerar men inte hur.",
    difficulty: "mellanniva",
    category: "sakerhet-etik",
    relatedConceptIds: ["forklarbar-ai", "transparens", "ai-act"],
  },
  {
    id: "forklarbar-ai",
    title: "Förklarbar AI (XAI)",
    icon: "Lightbulb",
    shortExplanation:
      "Forskningsfält som gör AI:ns beslut begripliga för människor. Viktigt för tillit och för att uppfylla lagar som kräver förklarbarhet.",
    analogy:
      "Som att be doktorn förklara diagnosen — du vill veta varför, inte bara vad.",
    difficulty: "mellanniva",
    category: "sakerhet-etik",
    relatedConceptIds: ["svarta-ladan", "transparens", "ai-act"],
  },
  {
    id: "mansklig-kontroll",
    title: "Mänsklig kontroll (Human-in-the-loop)",
    icon: "UserCheck",
    shortExplanation:
      "Principen att människor alltid ska kunna övervaka och övertrumfa AI:ns beslut. Särskilt viktigt i offentlig sektor vid beslut som påverkar medborgare.",
    analogy:
      "Som autopilot i ett flygplan — tekniken styr men piloten kan alltid ta över och har sista ordet.",
    difficulty: "grundlaggande",
    category: "sakerhet-etik",
    relatedConceptIds: ["ansvarsfull-ai", "ansvarsfragor", "ai-beslutsfattande"],
  },
  {
    id: "overtro-ai",
    title: "Övertro på AI (Overreliance)",
    icon: "AlertOctagon",
    shortExplanation:
      "Risken att lita för mycket på AI-genererat innehåll utan att granska det. Kan leda till att felaktiga svar sprids eller att kritiskt tänkande minskar.",
    analogy:
      "Som att blint lita på GPS:en — den kan leda dig rätt oftast, men ibland kör den dig rakt in i en återvändsgränd.",
    difficulty: "grundlaggande",
    category: "sakerhet-etik",
    relatedConceptIds: ["hallucination", "kallkritik", "mansklig-kontroll"],
  },

  // =========================================================================
  // 11. VERKTYG & PLATTFORMAR (12 begrepp)
  // =========================================================================
  {
    id: "chatgpt",
    title: "ChatGPT",
    icon: "MessageSquare",
    shortExplanation:
      "OpenAI:s populära AI-chattverktyg baserat på GPT-modellerna. Världens mest använda AI-assistent med hundratals miljoner användare.",
    analogy:
      "Som den AI-assistent alla har hört talas om — den som startade AI-revolutionen för vanliga användare.",
    difficulty: "grundlaggande",
    category: "verktyg",
    relatedConceptIds: ["gpt", "llm", "intric-plattform"],
    explainerId: "chatgpt-vs-intric",
  },
  {
    id: "claude",
    title: "Claude (Anthropic)",
    icon: "Bot",
    shortExplanation:
      "Anthropics AI-assistent, känd för noggrannhet, långa konversationer och säkerhetsfokus. Bygger på 'Constitutional AI' — principer som styr beteendet.",
    analogy:
      "Som den försiktiga och grundliga kollegan — tar lite längre tid men levererar genomtänkta svar.",
    difficulty: "grundlaggande",
    category: "verktyg",
    relatedConceptIds: ["llm", "constitutional-ai"],
  },
  {
    id: "gemini",
    title: "Gemini (Google)",
    icon: "Sparkles",
    shortExplanation:
      "Googles multimodala AI-modell integrerad i Google Workspace (Docs, Gmail, Sheets). Kan analysera text, bilder, video och kod.",
    analogy:
      "Som Googles version av ChatGPT — men integrerad i alla Google-tjänster du redan använder.",
    difficulty: "grundlaggande",
    category: "verktyg",
    relatedConceptIds: ["llm", "multimodal-ai"],
  },
  {
    id: "gpt-sw3",
    title: "GPT-SW3 (AI Swedens svenska modell)",
    icon: "Flag",
    shortExplanation:
      "AI Swedens storskaliga svenska språkmodell, tränad på nordiska språk. Open source och tillgänglig för alla — Sveriges eget alternativ till GPT.",
    analogy:
      "Som en AI som vuxit upp i Sverige — den förstår svenska, norska och danska bättre än de internationella modellerna.",
    difficulty: "mellanniva",
    category: "verktyg",
    relatedConceptIds: ["llm", "open-source"],
  },
  {
    id: "llama",
    title: "Llama (Meta, open source)",
    icon: "Boxes",
    shortExplanation:
      "Metas open source-språkmodeller. Finns i storlekar från 8B till 405B parametrar. Fria att ladda ner och köra lokalt.",
    analogy:
      "Som en gratis bil du kan bygga om — Meta ger dig ritningen och du kan anpassa den efter dina behov.",
    difficulty: "mellanniva",
    category: "verktyg",
    relatedConceptIds: ["open-source", "lokal-ai-vs-moln"],
  },
  {
    id: "mistral",
    title: "Mistral (open source)",
    icon: "Zap",
    shortExplanation:
      "Franskt AI-företag med effektiva open source-modeller. Mistral/Mixtral är kända för hög kvalitet trots mindre storlek — bra för lokal drift.",
    analogy:
      "Som en sportbil som är bränsleeffektiv — snabb och kapabel utan att behöva en enorm motor.",
    difficulty: "mellanniva",
    category: "verktyg",
    relatedConceptIds: ["open-source", "lokal-ai-vs-moln", "moe"],
  },
  {
    id: "azure-openai",
    title: "Azure OpenAI",
    icon: "Cloud",
    shortExplanation:
      "Microsofts molntjänst som ger tillgång till OpenAI:s modeller (GPT, DALL-E) med GDPR-kompatibel datahantering i EU-datacenter.",
    analogy:
      "Som att köra ChatGPT men genom ett säkert EU-filter — samma modell, men din data stannar i Europa.",
    difficulty: "mellanniva",
    category: "verktyg",
    relatedConceptIds: ["m365-copilot", "chatgpt", "tredjelandsoverforing"],
  },
  {
    id: "hugging-face",
    title: "Hugging Face",
    icon: "SmilePlus",
    shortExplanation:
      "Det centrala biblioteket för open source AI — modeller, dataset och verktyg. Som GitHub för AI — här hittar du tusentals fria modeller.",
    analogy:
      "Som ett öppet bibliotek för AI-modeller — du kan bläddra, ladda ner och använda vad du vill.",
    difficulty: "mellanniva",
    category: "verktyg",
    relatedConceptIds: ["open-source", "llama", "mistral"],
  },
  {
    id: "ai-hubben",
    title: "AI-hubben",
    icon: "LayoutDashboard",
    shortExplanation:
      "Katrineholms kommuns egen plattform som samlar AI-assistenter, statistik, utbildning och kunskapsbank. Byggd som en PWA för alla anställda.",
    analogy:
      "Som kommunens digitala AI-centrum — allt du behöver för att använda och lära dig om AI, samlat på ett ställe.",
    difficulty: "grundlaggande",
    category: "verktyg",
    relatedConceptIds: ["intric-plattform", "pwa"],
  },
  {
    id: "ollama",
    title: "Ollama (lokala modeller)",
    icon: "Terminal",
    shortExplanation:
      "Verktyg för att köra AI-modeller lokalt på din egen dator eller server. Ett kommando laddar ner och startar en modell — ingen data lämnar din maskin.",
    analogy:
      "Som en 'Docker för AI' — ett enkelt kommando och du har en AI-modell igång lokalt, helt offline.",
    difficulty: "fordjupning",
    category: "verktyg",
    relatedConceptIds: ["lokal-ai-vs-moln", "open-source", "llama"],
  },
  {
    id: "teams-ai",
    title: "Microsoft Teams AI-funktioner",
    icon: "Video",
    shortExplanation:
      "AI-funktioner i Teams: automatiska mötessammanfattningar, realtidstranskribering, intelligenta chattsvar och Copilot-integration.",
    analogy:
      "Som att ha en AI-assistent i alla dina möten — den antecknar, sammanfattar och kan svara på frågor efteråt.",
    difficulty: "grundlaggande",
    category: "verktyg",
    relatedConceptIds: ["copilot-teams", "transkribering", "motessammanfattning"],
  },
  {
    id: "ai-huset",
    title: "AI-Huset (AI Sweden)",
    icon: "GraduationCap",
    shortExplanation:
      "AI Swedens utbildningsprogram för ledare och organisationer. Hjälper svenska organisationer att bygga AI-kompetens och AI-mognad.",
    analogy:
      "Som en intensivkurs i AI för chefer — lär dig strategiskt tänkande kring AI i din organisation.",
    difficulty: "grundlaggande",
    category: "verktyg",
    relatedConceptIds: ["ansvarsfull-ai"],
  },

  // =========================================================================
  // 12. AVANCERADE AI-KONCEPT (14 begrepp)
  // =========================================================================
  {
    id: "fine-tuning",
    title: "Fine-tuning (finjustering)",
    icon: "SlidersHorizontal",
    shortExplanation:
      "Att vidareutbilda en AI-modell med egen specifik data. Modellen specialiseras för en uppgift utan att tränas om från grunden.",
    analogy:
      "Som att lära en kock laga lokala rätter — hon kan redan laga mat, men du lär henne Sörmlandsrecept.",
    difficulty: "fordjupning",
    category: "avancerat",
    relatedConceptIds: ["grundmodell", "lora", "traningsdata"],
  },
  {
    id: "rlhf",
    title: "RLHF (Reinforcement Learning from Human Feedback)",
    icon: "ThumbsUp",
    shortExplanation:
      "Tekniken som gör att ChatGPT och Claude ger hjälpsamma svar. Människor bedömer AI-svar, och modellen lär sig producera svar som människor föredrar.",
    analogy:
      "Som att ha en smakpanel — 1000 personer säger vilken version av svaret som är bäst, och AI:n lär sig mönstret.",
    difficulty: "fordjupning",
    category: "avancerat",
    relatedConceptIds: ["forstarkningsinlarning", "fine-tuning", "constitutional-ai"],
  },
  {
    id: "lora",
    title: "LoRA (Low-Rank Adaptation)",
    icon: "Minimize2",
    shortExplanation:
      "En effektiv teknik för fine-tuning där bara ~1% av modellens parametrar ändras. Gör specialanpassning billigt och snabbt.",
    analogy:
      "Som att byta ut en del av en motor istället för hela motorn — du får bättre prestanda utan att bygga om allt.",
    difficulty: "fordjupning",
    category: "avancerat",
    relatedConceptIds: ["fine-tuning", "parametrar"],
  },
  {
    id: "kvantisering",
    title: "Kvantisering (Quantization)",
    icon: "Shrink",
    shortExplanation:
      "Att komprimera en AI-modell genom att minska precisionen i dess siffror (från 32-bit till 8- eller 4-bit). Modellen blir mindre och snabbare med minimal kvalitetsförlust.",
    analogy:
      "Som att komprimera en bild till JPEG — den tar mindre plats och ser nästan lika bra ut.",
    difficulty: "fordjupning",
    category: "avancerat",
    relatedConceptIds: ["parametrar", "gpu", "inferens"],
  },
  {
    id: "knowledge-distillation",
    title: "Knowledge Distillation",
    icon: "Beaker",
    shortExplanation:
      "Att träna en liten 'elev-modell' att efterlikna en stor 'lärar-modell'. Resultatet: en kompakt modell som behåller mycket av den storas kapacitet.",
    analogy:
      "Som att en erfaren chef sammanfattar sina 30 års kunskap till en handbok som en ny anställd kan läsa.",
    difficulty: "fordjupning",
    category: "avancerat",
    relatedConceptIds: ["fine-tuning", "kvantisering"],
  },
  {
    id: "inferens",
    title: "Inferens",
    icon: "Play",
    shortExplanation:
      "Att köra en tränad AI-modell för att generera svar (till skillnad från träning). Varje gång du chattar med ChatGPT sker inferens.",
    analogy:
      "Träning = att plugga till provet. Inferens = att skriva provet. Du använder det du lärt dig.",
    difficulty: "mellanniva",
    category: "avancerat",
    relatedConceptIds: ["gpu", "latens-genomstromning"],
  },
  {
    id: "latens-genomstromning",
    title: "Latens & genomströmning",
    icon: "Timer",
    shortExplanation:
      "Latens = hur lång tid det tar att få svar. Genomströmning = hur många frågor systemet hanterar per sekund. Balansen mellan dessa är viktig.",
    analogy:
      "Latens = kötiden på restaurangen. Genomströmning = hur många gäster restaurangen serverar per timme.",
    difficulty: "mellanniva",
    category: "avancerat",
    relatedConceptIds: ["inferens", "gpu"],
  },
  {
    id: "cot",
    title: "Chain-of-Thought (CoT)",
    icon: "ListOrdered",
    shortExplanation:
      "Promptteknik där AI:n ombeds tänka steg för steg. Förbättrar avsevärt noggrannheten vid komplexa resonemang och matematiska problem.",
    analogy:
      "Som att be en elev visa sin uträkning — istället för att bara gissa svaret resonerar den sig fram.",
    difficulty: "mellanniva",
    category: "avancerat",
    relatedConceptIds: ["promptteknik", "llm"],
  },
  {
    id: "zero-few-shot",
    title: "Zero-shot & Few-shot Learning",
    icon: "Target",
    shortExplanation:
      "Zero-shot: AI löser en uppgift utan exempel. Few-shot: du ger 2-3 exempel i prompten. Fler exempel → mer precisa svar.",
    analogy:
      "Zero-shot = 'skriv en sammanfattning' (utan exempel). Few-shot = 'här är 2 exempel på bra sammanfattningar, gör likadant'.",
    difficulty: "mellanniva",
    category: "avancerat",
    relatedConceptIds: ["promptteknik", "cot"],
  },
  {
    id: "guardrails",
    title: "Guardrails (säkerhetsmekanismer)",
    icon: "Fence",
    shortExplanation:
      "Säkerhetssystem som hindrar AI:n från att producera skadligt, olämpligt eller felaktigt innehåll. Inbyggda regler som modellen inte får bryta.",
    analogy:
      "Som räcket på en balkong — du kan njuta av utsikten utan att ramla ner.",
    difficulty: "mellanniva",
    category: "avancerat",
    relatedConceptIds: ["systemprompt", "prompt-injection", "jailbreaking"],
  },
  {
    id: "constitutional-ai",
    title: "Constitutional AI",
    icon: "Scroll",
    shortExplanation:
      "Anthropics metod där AI:n tränas med skrivna principer ('en konstitution') som styr beteendet — hjälpsam, sanningsenlig och ofarlig.",
    analogy:
      "Som att ge AI:n en grundlag att följa — skrivna regler som vägleder alla beslut.",
    difficulty: "fordjupning",
    category: "avancerat",
    relatedConceptIds: ["rlhf", "ansvarsfull-ai", "claude"],
  },
  {
    id: "model-collapse",
    title: "Model Collapse",
    icon: "TrendingDown",
    shortExplanation:
      "Försämring av AI-modeller som tränats på AI-genererad data istället för mänsklig. Modellen 'glömmer' ovanliga men viktiga mönster.",
    analogy:
      "Som att kopiera en kopia av en kopia — varje generation blir suddigare. AI behöver äkta mänsklig data.",
    difficulty: "fordjupning",
    category: "avancerat",
    relatedConceptIds: ["traningsdata", "syntetisk-data"],
  },
  {
    id: "syntetisk-data",
    title: "Syntetisk data",
    icon: "Factory",
    shortExplanation:
      "Artificiellt genererad data som används för att träna AI-modeller. Kan lösa brist på träningsdata och integritetsproblem — men riskerar model collapse.",
    analogy:
      "Som att öva på simulerade scenarion istället för riktiga — användbart men inte samma sak som verkligheten.",
    difficulty: "fordjupning",
    category: "avancerat",
    relatedConceptIds: ["traningsdata", "model-collapse"],
  },
  {
    id: "moe",
    title: "Mixture of Experts (MoE)",
    icon: "GitBranch",
    shortExplanation:
      "Arkitektur där bara en del av modellens parametrar aktiveras per fråga. Gör modellen snabbare och effektivare utan att minska kapaciteten.",
    analogy:
      "Som ett sjukhus med specialister — du skickas till rätt expert beroende på symptom, inte till alla läkare samtidigt.",
    difficulty: "fordjupning",
    category: "avancerat",
    relatedConceptIds: ["parametrar", "mistral", "inferens"],
  },

  // =========================================================================
  // Extra utility types for explainer/diagram references
  // =========================================================================
  {
    id: "embeddingmodell",
    title: "Embeddingmodell",
    icon: "Grid3x3",
    shortExplanation:
      "AI-modell specialiserad på att omvandla text till vektorer (siffror). Används i Intric för att göra kunskapsbaser sökbara. Varje samling kopplas till en embeddingmodell.",
    analogy:
      "Som en översättare som omvandlar text till ett matematiskt språk — så datorn kan jämföra och söka efter liknande innehåll.",
    difficulty: "fordjupning",
    category: "data-sokning",
    relatedConceptIds: ["embeddings", "intric-samling", "vektordatabas"],
  },
  {
    id: "transkriptionsmodell",
    title: "Transkriptionsmodell",
    icon: "Mic",
    shortExplanation:
      "AI-modell specialiserad på att omvandla tal till text. OpenAI:s Whisper är ett populärt exempel. Används i Intric för att göra ljudfiler sökbara.",
    analogy:
      "Som en stenograf som skriver ner allt som sägs — fast med AI-hastighet och precision.",
    difficulty: "mellanniva",
    category: "data-sokning",
    relatedConceptIds: ["transkribering", "intric-kunskap"],
  },
  {
    id: "intric-dokument",
    title: "Dokumentuppladdning i Intric",
    icon: "Upload",
    shortExplanation:
      "Processen att ladda upp dokument (PDF, Word, Excel, ljudfiler) i Intric. Dokument OCR-behandlas, delas i bitar, omvandlas till vektorer och blir sökbara.",
    analogy:
      "Som att skanna in ett papper, klippa det i stycken och sätta varje stycke i rätt mapp — fast AI:n gör allt automatiskt.",
    difficulty: "grundlaggande",
    category: "intric",
    relatedConceptIds: ["intric-samling", "ocr", "chunking", "embeddings"],
    explainerId: "ladda-upp-dokument-intric",
  },
  {
    id: "personuppgiftsbehandling",
    title: "Personuppgiftsbehandling",
    icon: "FileSearch",
    shortExplanation:
      "Allt som kan göras med personuppgifter — insamling, lagring, läsning, bearbetning, utlämning, radering. Extra känsligt med AI som behandlar text.",
    analogy:
      "Som att hantera en annan persons brev — du har ansvar för att göra det respektfullt och enligt reglerna.",
    difficulty: "mellanniva",
    category: "lagar-regler",
    relatedConceptIds: ["gdpr", "personuppgiftsansvarig", "dpia"],
  },

  // =========================================================================
  // TILLAGDA BEGREPP — från begreppsöversikten
  // =========================================================================

  // --- AI-grunderna (tillägg) ---
  {
    id: "transfer-learning",
    title: "Transfer Learning",
    icon: "ArrowRightLeft",
    shortExplanation:
      "Att ta en AI som redan lärt sig en sak och bygga vidare så den kan en ny sak, istället för att börja om från noll. Sparar enormt mycket tid och data.",
    analogy:
      "Som en kock som redan kan laga italienskt — det går mycket snabbare att lära sig fransk matlagning än att börja helt från grunden.",
    difficulty: "mellanniva",
    category: "ai-grunderna",
    relatedConceptIds: ["fine-tuning", "grundmodell", "traningsdata"],
  },
  {
    id: "sjalvovervakad-inlarning",
    title: "Självövervakad inlärning (Self-Supervised Learning)",
    icon: "RefreshCw",
    shortExplanation:
      "AI:n skapar egna övningsuppgifter av data, till exempel genom att dölja ett ord i en mening och gissa vilket det är. Grunden för hur dagens stora språkmodeller tränas.",
    analogy:
      "Som att öva glosor genom att täcka över svaret och gissa — fast AI:n gör det med miljarder meningar.",
    difficulty: "mellanniva",
    category: "ai-grunderna",
    relatedConceptIds: ["llm", "traningsdata", "deep-learning"],
  },
  {
    id: "overfitting",
    title: "Overfitting",
    icon: "TrendingDown",
    shortExplanation:
      "När AI:n memorerat träningsdata utantill istället för att lära sig generella mönster. Den presterar bra på övningsexempel men dåligt på nya situationer.",
    analogy:
      "Som att plugga facit istället för att förstå ämnet — du klarar gamla prov men inte nya frågor.",
    difficulty: "mellanniva",
    category: "ai-grunderna",
    relatedConceptIds: ["traningsdata", "ai-modell", "hyperparameter"],
  },

  // --- Språkmodeller & generativ AI (tillägg) ---
  {
    id: "tokenisering",
    title: "Tokenisering",
    icon: "Scissors",
    shortExplanation:
      "Processen att dela upp text i små bitar (tokens) som AI:n kan arbeta med. Ett svenskt ord kan bli en eller flera tokens beroende på hur vanligt det är.",
    analogy:
      "Som att dela upp en mening i legobitar — AI:n bygger sedan ihop svaret bit för bit.",
    difficulty: "mellanniva",
    category: "sprakmodeller",
    relatedConceptIds: ["token", "kontextfonster", "llm"],
  },
  {
    id: "fortraning",
    title: "Förträning (Pre-training)",
    icon: "GraduationCap",
    shortExplanation:
      "Första steget där en AI-modell läser enorma mängder text och data för att bygga en grundförståelse för språk och kunskap. Sker innan fine-tuning.",
    analogy:
      "Som grundskolan — du lär dig läsa, skriva och räkna innan du specialiserar dig inom ett yrke.",
    difficulty: "mellanniva",
    category: "sprakmodeller",
    relatedConceptIds: ["llm", "fine-tuning", "grundmodell", "traningsdata"],
  },
  {
    id: "streaming",
    title: "Streaming",
    icon: "Radio",
    shortExplanation:
      "När AI:ns svar visas ord för ord i realtid istället för att du behöver vänta tills hela svaret är klart. Gör att det känns snabbare och mer som ett samtal.",
    analogy:
      "Som att lyssna på någon prata i realtid istället för att vänta på ett färdigt brev.",
    difficulty: "grundlaggande",
    category: "sprakmodeller",
    relatedConceptIds: ["llm", "inferens", "latens-genomstromning"],
  },
  {
    id: "tool-use",
    title: "Tool Use / Function Calling",
    icon: "Hammer",
    shortExplanation:
      "AI:ns förmåga att använda externa verktyg som räknare, databaser eller webbsökningar. Gör att AI:n kan utföra uppgifter den inte klarar själv, som att hämta aktuell data.",
    analogy:
      "Som en hantverkare som väljer rätt verktyg ur sin verktygslåda beroende på vad som behöver fixas.",
    difficulty: "mellanniva",
    category: "sprakmodeller",
    relatedConceptIds: ["ai-agent", "mcp-server", "api"],
  },
  {
    id: "text-till-video",
    title: "Text-till-video",
    icon: "Video",
    shortExplanation:
      "AI som skapar videor utifrån textbeskrivningar. Tekniken utvecklas snabbt och kan skapa allt från korta klipp till längre sekvenser.",
    analogy:
      "Som att ge en filmregissör ett manus och få tillbaka en färdig scen — fast AI:n gör allt själv.",
    difficulty: "mellanniva",
    category: "sprakmodeller",
    relatedConceptIds: ["generativ-ai", "diffusionsmodell", "bildgenerering"],
  },
  {
    id: "reasoning-models",
    title: "Reasoning Models",
    icon: "BrainCircuit",
    shortExplanation:
      "AI-modeller som är extra bra på logiskt tänkande och problemlösning. De 'tänker steg för steg' internt innan de svarar, vilket ger bättre svar på komplexa frågor.",
    analogy:
      "Som en erfaren problemlösare som stannar upp och tänker igenom alla steg innan den ger ett svar, istället för att svara direkt.",
    difficulty: "mellanniva",
    category: "sprakmodeller",
    relatedConceptIds: ["llm", "cot", "generativ-ai"],
  },
  {
    id: "diffusionsmodell",
    title: "Diffusionsmodell",
    icon: "Paintbrush",
    shortExplanation:
      "Tekniken bakom modern bildgenerering. Modellen börjar med slumpmässigt brus och tar gradvis bort det tills en tydlig bild framträder, styrd av din textbeskrivning.",
    analogy:
      "Som att skulptera — du börjar med ett block och mejslar bort material tills figuren framträder.",
    difficulty: "mellanniva",
    category: "sprakmodeller",
    relatedConceptIds: ["bildgenerering", "generativ-ai", "text-till-video"],
  },

  // --- AI på jobbet (tillägg) ---
  {
    id: "agentic-ai",
    title: "Agentic AI",
    icon: "Bot",
    shortExplanation:
      "AI som kan planera, fatta beslut och agera självständigt för att nå ett mål. Till skillnad från en vanlig chatbot kan den utföra flera steg och använda verktyg utan att du behöver styra varje moment.",
    analogy:
      "Som en praktikant som får ett uppdrag och själv planerar, utför och rapporterar resultatet — istället för att fråga om varje steg.",
    difficulty: "mellanniva",
    category: "ai-pa-jobbet",
    relatedConceptIds: ["ai-agent", "tool-use", "multi-agent-system"],
  },
  {
    id: "prompt-mall",
    title: "Prompt-mall (Prompt Template)",
    icon: "FileText",
    shortExplanation:
      "Färdiga formuleringar som du kan återanvända för att få bra och konsekventa resultat från AI:n. Bra för uppgifter du gör ofta, som att sammanfatta mejl eller skriva protokoll.",
    analogy:
      "Som en brevmall på jobbet — du fyller i de specifika detaljerna, men grundstrukturen är redan klar.",
    difficulty: "grundlaggande",
    category: "ai-pa-jobbet",
    relatedConceptIds: ["prompt", "promptteknik", "systemprompt"],
  },
  {
    id: "personalisering",
    title: "Personalisering",
    icon: "UserCog",
    shortExplanation:
      "AI som anpassar innehåll, förslag och upplevelser efter dina vanor och preferenser. Används i allt från Spotify-förslag till nyhetsflöden.",
    analogy:
      "Som en barista som lär sig dina favoritdrinkar och föreslår nya du troligen gillar.",
    difficulty: "grundlaggande",
    category: "ai-pa-jobbet",
    relatedConceptIds: ["rekommendationssystem", "maskininlarning", "traningsdata"],
  },
  {
    id: "rekommendationssystem",
    title: "Rekommendationssystem",
    icon: "ThumbsUp",
    shortExplanation:
      "AI som föreslår saker du kan gilla baserat på vad du och andra med liknande smak gillat tidigare. Används av Netflix, Spotify, YouTube och webbshoppar.",
    analogy:
      "Som en kompis som känner din smak och säger 'om du gillade den filmen kommer du älska den här'.",
    difficulty: "grundlaggande",
    category: "ai-pa-jobbet",
    relatedConceptIds: ["personalisering", "maskininlarning", "embeddings"],
  },
  {
    id: "textklassificering",
    title: "Textklassificering",
    icon: "Tags",
    shortExplanation:
      "AI som automatiskt sorterar texter i rätt kategori. Används för allt från spamfilter i mejlen till att sortera medborgarärenden till rätt avdelning.",
    analogy:
      "Som en brevbärare som automatiskt sorterar post i rätt fack — fast med tusentals brev per sekund.",
    difficulty: "grundlaggande",
    category: "ai-pa-jobbet",
    relatedConceptIds: ["nlp", "sentimentanalys", "automatisering"],
  },
  {
    id: "maskinoversattning",
    title: "Maskinöversättning",
    icon: "Languages",
    shortExplanation:
      "Automatisk översättning mellan språk med hjälp av AI. Moderna system som Google Translate och DeepL förstår sammanhang och nyanser mycket bättre än tidigare.",
    analogy:
      "Som en simultantolk som inte bara översätter ord för ord utan förstår vad du menar.",
    difficulty: "grundlaggande",
    category: "ai-pa-jobbet",
    relatedConceptIds: ["nlp", "llm", "transformer"],
  },
  {
    id: "stt",
    title: "STT (Speech-to-Text)",
    icon: "Mic",
    shortExplanation:
      "AI som omvandlar tal till skriven text. Används för att transkribera möten, telefonsamtal och röstmeddelanden automatiskt.",
    analogy:
      "Som en stenograf som skriver ner allt som sägs — fast med AI-hastighet.",
    difficulty: "grundlaggande",
    category: "ai-pa-jobbet",
    relatedConceptIds: ["transkribering", "tts", "nlp"],
  },
  {
    id: "tts",
    title: "TTS (Text-to-Speech)",
    icon: "Volume2",
    shortExplanation:
      "AI som läser upp text med en naturligt klingande röst. Används i allt från GPS-navigering och tillgänglighet till podcast-generering.",
    analogy:
      "Som en skådespelare som kan läsa upp vilken text som helst med rätt tonfall och känsla.",
    difficulty: "grundlaggande",
    category: "ai-pa-jobbet",
    relatedConceptIds: ["stt", "nlp", "multimodal-ai"],
  },
  {
    id: "bildigenkanning",
    title: "Bildigenkänning (Image Recognition)",
    icon: "ScanEye",
    shortExplanation:
      "AI som kan identifiera vad som finns i en bild — personer, djur, objekt, text eller scener. Grunden för allt från Google Bilder-sökning till medicinska diagnoser.",
    analogy:
      "Som att visa ett foto för någon och fråga 'vad ser du?' — fast AI:n kan göra det med tusentals bilder per sekund.",
    difficulty: "grundlaggande",
    category: "ai-pa-jobbet",
    relatedConceptIds: ["datorseende", "objektdetektering", "deep-learning"],
  },
  {
    id: "objektdetektering",
    title: "Objektdetektering (Object Detection)",
    icon: "ScanSearch",
    shortExplanation:
      "AI som hittar och markerar specifika saker i bilder eller video. Används i självkörande bilar, övervakningskameror och kvalitetskontroll i industrin.",
    analogy:
      "Som att rita rutor runt allt intressant i en bild och sätta etiketter på dem — 'bil', 'cyklist', 'trafikljus'.",
    difficulty: "mellanniva",
    category: "ai-pa-jobbet",
    relatedConceptIds: ["datorseende", "bildigenkanning", "deep-learning"],
  },
  {
    id: "dataextraktion",
    title: "Dataextraktion",
    icon: "FileOutput",
    shortExplanation:
      "AI som plockar ut specifik information ur dokument automatiskt — till exempel belopp från fakturor, datum från avtal eller namn från ansökningar.",
    analogy:
      "Som en assistent som läser igenom en hög papper och fyller i ett formulär med rätt uppgifter.",
    difficulty: "mellanniva",
    category: "ai-pa-jobbet",
    relatedConceptIds: ["ocr", "nlp", "ner"],
  },
  {
    id: "anomalidetektering",
    title: "Anomalidetektering",
    icon: "AlertTriangle",
    shortExplanation:
      "AI som upptäcker avvikelser och ovanliga mönster i data. Används för att hitta bedrägerier, tekniska fel eller ovanligt beteende.",
    analogy:
      "Som en erfaren kassör som märker att något inte stämmer med ett kvitto — fast AI:n kan granska miljontals transaktioner.",
    difficulty: "mellanniva",
    category: "ai-pa-jobbet",
    relatedConceptIds: ["maskininlarning", "prediktiv-analys", "oovervakad-inlarning"],
  },
  {
    id: "prediktiv-analys",
    title: "Prediktiv analys",
    icon: "TrendingUp",
    shortExplanation:
      "AI som förutspår framtida trender och händelser baserat på historisk data. Kan till exempel förutse sjukfrånvaro, behov av resurser eller underhållsbehov.",
    analogy:
      "Som en väderprognos — baserat på tidigare mönster gör AI:n kvalificerade gissningar om framtiden.",
    difficulty: "mellanniva",
    category: "ai-pa-jobbet",
    relatedConceptIds: ["maskininlarning", "traningsdata", "anomalidetektering"],
  },
  {
    id: "augmentering",
    title: "Augmentering",
    icon: "UserPlus",
    shortExplanation:
      "AI som förstärker människans förmåga istället för att ersätta den. Tanken är att AI + människa presterar bättre tillsammans än var för sig.",
    analogy:
      "Som glasögon — de ersätter inte dina ögon utan gör att du ser bättre.",
    difficulty: "grundlaggande",
    category: "ai-pa-jobbet",
    relatedConceptIds: ["copilot-begrepp", "mansklig-kontroll", "ai-assistent"],
  },
  {
    id: "poc",
    title: "PoC (Proof of Concept)",
    icon: "FlaskConical",
    shortExplanation:
      "Ett litet testprojekt för att se om en AI-idé fungerar i praktiken innan man investerar stort. Vanligt sätt att utvärdera AI-verktyg i organisationer.",
    analogy:
      "Som att provlaga en ny rätt med en liten portion innan du lagar den till hela festen.",
    difficulty: "grundlaggande",
    category: "ai-pa-jobbet",
    relatedConceptIds: ["automatisering", "ai-beslutsfattande"],
  },

  // --- Teknik & infrastruktur (tillägg) ---
  {
    id: "edge-ai",
    title: "Edge AI",
    icon: "Smartphone",
    shortExplanation:
      "AI som körs direkt på din enhet (mobil, kamera, sensor) istället för i molnet. Ger snabbare svar och bättre integritet eftersom data inte behöver skickas iväg.",
    analogy:
      "Som att ha en minihjärna i din telefon som tänker lokalt, istället för att ringa upp ett kontor varje gång du behöver hjälp.",
    difficulty: "mellanniva",
    category: "teknik",
    relatedConceptIds: ["lokal-ai-vs-moln", "gpu", "inferens"],
  },
  {
    id: "orchestration",
    title: "Orchestration",
    icon: "Workflow",
    shortExplanation:
      "Att koordinera flera AI-steg, verktyg eller agenter så de samarbetar smidigt i ett arbetsflöde. Ser till att rätt sak händer i rätt ordning.",
    analogy:
      "Som en dirigent som ser till att alla musiker i orkestern spelar sin del vid rätt tidpunkt.",
    difficulty: "mellanniva",
    category: "teknik",
    relatedConceptIds: ["ai-agent", "agentic-ai", "integration"],
  },
  {
    id: "mlops",
    title: "MLOps (Machine Learning Operations)",
    icon: "Settings2",
    shortExplanation:
      "Rutiner och verktyg för att drifta AI-system i produktion — liknande DevOps fast anpassat för maskininlärning. Handlar om att hålla modeller uppdaterade, övervakade och pålitliga.",
    analogy:
      "Som att inte bara bygga en bil utan också se till att den servas, tankas och besiktigas regelbundet.",
    difficulty: "fordjupning",
    category: "teknik",
    relatedConceptIds: ["deployment", "ai-modell", "inferens"],
  },

  // --- Data & sökning (tillägg) ---
  {
    id: "knowledge-graph",
    title: "Knowledge Graph",
    icon: "Share2",
    shortExplanation:
      "En strukturerad karta över kunskap som visar hur saker hänger ihop. Används av sökmotorer och AI-system för att förstå samband mellan begrepp, personer och platser.",
    analogy:
      "Som en stor tankekarta eller mindmap — fast med miljontals kopplingar som datorn kan navigera.",
    difficulty: "mellanniva",
    category: "data-sokning",
    relatedConceptIds: ["semantisk-sokning", "rag", "metadata"],
  },
  {
    id: "ner",
    title: "NER (Named Entity Recognition)",
    icon: "Highlighter",
    shortExplanation:
      "AI som automatiskt plockar ut och markerar namn, platser, organisationer, datum och andra viktiga enheter ur text. Grunden för många automatiseringar.",
    analogy:
      "Som att markera alla namn med gult, alla platser med blått och alla datum med grönt i en text — fast AI:n gör det automatiskt.",
    difficulty: "mellanniva",
    category: "data-sokning",
    relatedConceptIds: ["nlp", "dataextraktion", "textklassificering"],
  },

  // --- Lagar & regler (tillägg) ---
  {
    id: "ai-governance",
    title: "AI Governance",
    icon: "Landmark",
    shortExplanation:
      "Regler, riktlinjer och processer för hur AI får utvecklas och användas i en organisation eller i samhället. Handlar om styrning, ansvar och uppföljning.",
    analogy:
      "Som trafikregler för AI — utan dem blir det kaos, med dem kan alla använda AI tryggt och ansvarsfullt.",
    difficulty: "mellanniva",
    category: "lagar-regler",
    relatedConceptIds: ["ai-act", "ansvarsfull-ai", "ansvarsfragor"],
  },
  {
    id: "anonymisering",
    title: "Anonymisering",
    icon: "EyeOff",
    shortExplanation:
      "Att ta bort eller maskera personuppgifter i data innan AI behandlar den. Viktigt för att följa GDPR och skydda individers integritet.",
    analogy:
      "Som att sudda ut ansikten i en dokumentär — informationen finns kvar men ingen kan identifieras.",
    difficulty: "mellanniva",
    category: "lagar-regler",
    relatedConceptIds: ["gdpr", "personuppgiftsbehandling", "intric-redacting"],
  },
  {
    id: "dataminimering",
    title: "Dataminimering",
    icon: "Minimize2",
    shortExplanation:
      "Principen att bara samla in och använda den data som verkligen behövs för uppgiften. En grundpelare i GDPR som är extra viktig när AI bearbetar personuppgifter.",
    analogy:
      "Som att bara be om namn och telefonnummer när du bokar en tid — inte passnummer, blodgrupp och mammas favoritfärg.",
    difficulty: "grundlaggande",
    category: "lagar-regler",
    relatedConceptIds: ["gdpr", "privacy-by-design", "personuppgiftsbehandling"],
  },

  // --- Säkerhet & etik (tillägg) ---
  {
    id: "ai-sakerhet",
    title: "AI-säkerhet (AI Safety)",
    icon: "ShieldCheck",
    shortExplanation:
      "Forskning och arbete för att säkerställa att AI-system inte orsakar skada — varken avsiktligt eller oavsiktligt. Handlar om att bygga AI som är pålitlig och trygg att använda.",
    analogy:
      "Som säkerhetsbälten och krockkuddar i en bil — tekniken är kraftfull, men vi behöver skydd inbyggt.",
    difficulty: "grundlaggande",
    category: "sakerhet-etik",
    relatedConceptIds: ["alignment", "guardrails", "ansvarsfull-ai"],
  },
  {
    id: "alignment",
    title: "Alignment",
    icon: "Compass",
    shortExplanation:
      "Arbetet med att se till att AI agerar i linje med mänskliga värderingar och gör det vi faktiskt vill. En av de stora utmaningarna inom AI-utveckling.",
    analogy:
      "Som att uppfostra ett barn — du vill att det ska förstå inte bara reglerna utan också varför de finns.",
    difficulty: "mellanniva",
    category: "sakerhet-etik",
    relatedConceptIds: ["rlhf", "ai-sakerhet", "guardrails", "constitutional-ai"],
  },
  {
    id: "red-teaming",
    title: "Red Teaming",
    icon: "Swords",
    shortExplanation:
      "Att medvetet försöka lura, bryta eller utnyttja AI-system för att hitta svagheter innan andra gör det. Ett viktigt steg för att göra AI säkrare.",
    analogy:
      "Som att anlita en inbrottstjuv för att testa om ditt larm fungerar — bättre att hitta bristerna själv.",
    difficulty: "mellanniva",
    category: "sakerhet-etik",
    relatedConceptIds: ["ai-sakerhet", "prompt-injection", "jailbreaking"],
  },
  {
    id: "modellgiftning",
    title: "Modellförgiftning (Data Poisoning)",
    icon: "Skull",
    shortExplanation:
      "En attack där någon medvetet lägger in felaktig eller skadlig data i träningen för att sabotera AI:ns beteende. Kan leda till att modellen ger felaktiga eller farliga svar.",
    analogy:
      "Som att smyga in felaktiga svar i en lärobok — alla som pluggar ur den lär sig fel utan att veta om det.",
    difficulty: "mellanniva",
    category: "sakerhet-etik",
    relatedConceptIds: ["traningsdata", "ai-sakerhet", "bias"],
  },
  {
    id: "rostkloning",
    title: "Röstkloning",
    icon: "AudioLines",
    shortExplanation:
      "AI som kan kopiera en persons röst utifrån inspelningar och sedan generera nytt tal med den rösten. Kan användas för tillgänglighet men också missbrukas för bedrägerier.",
    analogy:
      "Som en imitatör som kan härma vem som helst perfekt — kraftfullt men potentiellt farligt i fel händer.",
    difficulty: "mellanniva",
    category: "sakerhet-etik",
    relatedConceptIds: ["deepfakes", "tts", "generativ-ai"],
  },
  {
    id: "ansiktsigenkanning",
    title: "Ansiktsigenkänning",
    icon: "ScanFace",
    shortExplanation:
      "AI som kan identifiera eller verifiera personer utifrån deras ansikte. Används för att låsa upp telefoner men är kontroversiellt för övervakning. Regleras strikt i EU:s AI Act.",
    analogy:
      "Som en dörrvakt som minns alla ansikten — praktiskt för att komma in, men obehagligt om det används för att spåra var du går.",
    difficulty: "mellanniva",
    category: "sakerhet-etik",
    relatedConceptIds: ["datorseende", "ai-act", "bias", "privacy-by-design"],
  },

  // --- Verktyg & plattformar (tillägg) ---
  {
    id: "ai-sokning",
    title: "AI-sökning",
    icon: "SearchCheck",
    shortExplanation:
      "Sökmotorer som ger AI-genererade sammanfattningar istället för bara länkar. Exempel är Perplexity, Google AI Overviews och Bing Chat.",
    analogy:
      "Som att fråga en forskare istället för att bläddra i en hög med böcker — du får ett sammanfattat svar direkt.",
    difficulty: "grundlaggande",
    category: "verktyg",
    relatedConceptIds: ["llm", "rag", "semantisk-sokning"],
  },

  // --- Avancerade AI-koncept (tillägg) ---
  {
    id: "gan",
    title: "GAN (Generative Adversarial Network)",
    icon: "Swords",
    shortExplanation:
      "Två AI-nätverk som tävlar mot varandra: en skapar innehåll och den andra bedömer det. Genom tävlingen blir det skapade innehållet allt mer realistiskt.",
    analogy:
      "Som en konstnär och en kritiker som pushar varandra — konstnären blir bättre och bättre på att skapa övertygande verk.",
    difficulty: "fordjupning",
    category: "avancerat",
    relatedConceptIds: ["generativ-ai", "deep-learning", "bildgenerering"],
  },
  {
    id: "cnn",
    title: "CNN (Convolutional Neural Network)",
    icon: "Grid3x3",
    shortExplanation:
      "En typ av neuralt nätverk som är särskilt bra på att analysera bilder. Det skannar bilden i små rutor och lär sig känna igen mönster som kanter, former och objekt.",
    analogy:
      "Som att titta på en bild genom ett förstoringsglas som rör sig steg för steg — varje del analyseras separat och sätts ihop till en helhetsbild.",
    difficulty: "fordjupning",
    category: "avancerat",
    relatedConceptIds: ["neurala-natverk", "datorseende", "deep-learning"],
  },
  {
    id: "rnn",
    title: "RNN (Recurrent Neural Network)",
    icon: "Repeat",
    shortExplanation:
      "En typ av neuralt nätverk som har minne och kan komma ihåg vad det sett tidigare i en sekvens. Bra för text och tidsserier, men har till stor del ersatts av transformers.",
    analogy:
      "Som att läsa en bok och komma ihåg handlingen — varje nytt kapitel förstås bättre tack vare det du redan läst.",
    difficulty: "fordjupning",
    category: "avancerat",
    relatedConceptIds: ["neurala-natverk", "transformer", "deep-learning"],
  },
  {
    id: "backpropagation",
    title: "Backpropagation",
    icon: "Undo2",
    shortExplanation:
      "Processen där AI:n lär sig av sina fel. Felet mäts i slutet, och sedan skickas information bakåt genom nätverket för att justera varje del så felet blir mindre.",
    analogy:
      "Som att rätta ett prov och gå tillbaka steg för steg för att förstå var du tänkte fel — och sedan justera din metod.",
    difficulty: "fordjupning",
    category: "avancerat",
    relatedConceptIds: ["neurala-natverk", "loss-function", "traningsdata"],
  },
  {
    id: "loss-function",
    title: "Loss Function",
    icon: "Target",
    shortExplanation:
      "Ett mått på hur fel AI:n har. Under träningen försöker modellen göra detta tal så litet som möjligt — ju lägre, desto bättre svar ger den.",
    analogy:
      "Som poängtavlan i en pilkastningstävling — den visar hur långt från prick du är, och målet är att komma närmare och närmare.",
    difficulty: "fordjupning",
    category: "avancerat",
    relatedConceptIds: ["backpropagation", "traningsdata", "overfitting"],
  },
  {
    id: "hyperparameter",
    title: "Hyperparameter",
    icon: "SlidersHorizontal",
    shortExplanation:
      "Inställningar som människor väljer innan träningen börjar, till exempel inlärningshastighet och antal träningsvarv. De styr hur modellen lär sig, inte vad den lär sig.",
    analogy:
      "Som att ställa in ugnstemperaturen och tiden innan du bakar — brödet (modellen) blir olika beroende på inställningarna.",
    difficulty: "mellanniva",
    category: "avancerat",
    relatedConceptIds: ["traningsdata", "overfitting", "epoch"],
  },
  {
    id: "epoch",
    title: "Epoch",
    icon: "RotateCw",
    shortExplanation:
      "Ett helt varv genom all träningsdata. AI:n tränas ofta i många epoker — varje gång lär den sig lite mer, men för många epoker kan leda till overfitting.",
    analogy:
      "Som att läsa igenom en lärobok flera gånger — varje genomläsning ger djupare förståelse, men till slut memorerar du bara texten.",
    difficulty: "mellanniva",
    category: "avancerat",
    relatedConceptIds: ["traningsdata", "overfitting", "hyperparameter"],
  },
  {
    id: "multi-agent-system",
    title: "Multi-agent System",
    icon: "Users",
    shortExplanation:
      "Flera AI-agenter som jobbar tillsammans, var och en med sin specialitet. En agent kan söka information, en annan skriva text och en tredje granska kvaliteten.",
    analogy:
      "Som ett team på jobbet — var och en har sin roll och expertis, och tillsammans löser de uppgiften bättre.",
    difficulty: "mellanniva",
    category: "avancerat",
    relatedConceptIds: ["ai-agent", "agentic-ai", "orchestration"],
  },
  {
    id: "federated-learning",
    title: "Federated Learning",
    icon: "Network",
    shortExplanation:
      "Flera organisationer tränar en AI-modell tillsammans utan att dela sin data med varandra. Varje part tränar lokalt och bara lärdomarna delas, inte själva datan.",
    analogy:
      "Som att flera skolor delar med sig av undervisningsmetoder utan att lämna ut elevernas journaler.",
    difficulty: "fordjupning",
    category: "avancerat",
    relatedConceptIds: ["maskininlarning", "gdpr", "lokal-ai-vs-moln"],
  },
  {
    id: "benchmark",
    title: "Benchmark",
    icon: "BarChart3",
    shortExplanation:
      "Standardiserade tester för att jämföra hur bra olika AI-modeller presterar på olika uppgifter. Hjälper organisationer att välja rätt modell.",
    analogy:
      "Som nationella prov i skolan — alla gör samma test så att man rättvist kan jämföra resultaten.",
    difficulty: "mellanniva",
    category: "avancerat",
    relatedConceptIds: ["ai-modell", "llm", "inferens"],
  },
];

// =============================================================================
// STORYBOARD PANEL DATA
// =============================================================================

export interface StoryboardPanel {
  title: string;
  text: string;
  icon: string;
  conceptId?: string;
}

export interface LearningPathWithPanels extends LearningPath {
  panels: StoryboardPanel[];
  icon: string;
}

export const LEARNING_PATHS: LearningPathWithPanels[] = [
  {
    id: "kom-igang-med-ai",
    title: "Kom igång med AI",
    description:
      "En introduktion till artificiell intelligens — vad det är, hur det fungerar och varför det är viktigt.",
    conceptIds: [
      "ai",
      "maskininlarning",
      "generativ-ai",
      "llm",
      "ai-modell",
      "prompt",
      "ai-assistent",
      "hallucination",
    ],
    estimatedMinutes: 15,
    icon: "Rocket",
    panels: [
      {
        title: "Tänk dig en kollega som aldrig sover",
        text: "Artificiell intelligens (AI) är datorsystem som kan utföra uppgifter som normalt kräver mänsklig intelligens — analysera text, föra samtal och fatta beslut. AI är inte magi, utan matematik och mönsterigenkänning.",
        icon: "Brain",
        conceptId: "ai",
      },
      {
        title: "Hur lär sig en AI?",
        text: "Maskininlärning är grunden: AI:n matas med tusentals exempel och hittar mönster själv. Som ett barn som ser 1000 bilder på katter och till slut kan känna igen en katt den aldrig sett förut.",
        icon: "TrendingUp",
        conceptId: "maskininlarning",
      },
      {
        title: "AI som skapar nytt",
        text: "Generativ AI kan producera text, bilder, kod och musik. Den analyserar inte bara — den skapar. ChatGPT, Claude och Copilot är alla generativa AI-verktyg.",
        icon: "Wand2",
        conceptId: "generativ-ai",
      },
      {
        title: "Språkmodeller — AI:ns motor",
        text: "Stora språkmodeller (LLM) är tränade på enorma mängder text. De förutsäger nästa ord baserat på alla ord de läst. GPT, Claude och Gemini är alla LLM:er.",
        icon: "BookText",
        conceptId: "llm",
      },
      {
        title: "Vad är en AI-modell?",
        text: "En AI-modell är det färdigtränade programmet — tänk det som en hjärna med specialkunskap. Den har studerat klart och är redo att jobba, men kan inte lära sig nytt utan omträning.",
        icon: "Box",
        conceptId: "ai-modell",
      },
      {
        title: "Din instruktion är allt",
        text: "En prompt är det du skriver till AI:n. Kvaliteten på din fråga avgör kvaliteten på svaret. Var tydlig med vad du vill ha, ge kontext, och specificera formatet.",
        icon: "MessageSquare",
        conceptId: "prompt",
      },
      {
        title: "Din digitala kollega",
        text: "AI-assistenter är verktyg du chattar med för att få hjälp. De kan skriva mejl, sammanfatta dokument, analysera data och besvara frågor — dygnet runt.",
        icon: "Bot",
        conceptId: "ai-assistent",
      },
      {
        title: "Lita men verifiera",
        text: "AI:n kan halllucinera — hitta på fakta som låter trovärdiga. Eftersom den förutsäger ord, inte verifierar fakta, måste du alltid dubbelkolla viktig information. AI är ett verktyg, inte en sanning.",
        icon: "AlertTriangle",
        conceptId: "hallucination",
      },
    ],
  },
  {
    id: "ai-pa-jobbet",
    title: "AI på jobbet i kommunen",
    description:
      "Praktiska exempel på hur AI kan hjälpa dig i ditt dagliga arbete — från mejlskrivande till mötessammanfattningar.",
    conceptIds: [
      "ai-assistent",
      "chatbot",
      "copilot-begrepp",
      "promptteknik",
      "sammanfattning",
      "transkribering",
      "arendehantering-ai",
      "textgenerering",
    ],
    estimatedMinutes: 15,
    icon: "Briefcase",
    panels: [
      {
        title: "AI som medarbetare",
        text: "AI-assistenter är digitala kollegor du chattar med för att få hjälp. De kan skriva, sammanfatta, analysera och svara — dygnet runt, utan kaffepaus.",
        icon: "Bot",
        conceptId: "ai-assistent",
      },
      {
        title: "Chatbotar överallt",
        text: "En chatbot svarar automatiskt på frågor i chatt. Enklare chatbotar har förprogrammerade svar, men AI-drivna chatbotar förstår fritt språk och kan hantera oväntade frågor.",
        icon: "MessageCircle",
        conceptId: "chatbot",
      },
      {
        title: "Copilot vid din sida",
        text: "En Copilot är AI som hjälper dig medan du jobbar — föreslår text i mejl, sammanfattar möten, analyserar data. Den arbetar vid din sida, inte istället för dig.",
        icon: "UserPlus",
        conceptId: "copilot-begrepp",
      },
      {
        title: "Konsten att fråga rätt",
        text: "Promptteknik handlar om att formulera bra instruktioner. Ge kontext (varför), format (hur du vill ha svaret), och persona (vem AI:n ska vara). Bra prompt = bra svar.",
        icon: "Wrench",
        conceptId: "promptteknik",
      },
      {
        title: "50 sidor på 30 sekunder",
        text: "AI kan sammanfatta långa dokument, mejltrådar och rapporter till kärnpunkterna. Istället för att läsa allt kan du fråga 'vad är de 5 viktigaste slutsatserna?'.",
        icon: "FileText",
        conceptId: "sammanfattning",
      },
      {
        title: "Möten som skriver sig själva",
        text: "AI-transkribering omvandlar tal till text i realtid. Kombinerat med sammanfattning kan du få mötesprotokoll med beslutspunkter automatiskt efter varje möte.",
        icon: "Mic",
        conceptId: "transkribering",
      },
      {
        title: "Smartare ärendehantering",
        text: "AI kan sortera, kategorisera och prioritera inkomna ärenden automatiskt. Den kan även föreslå svar baserade på tidigare liknande ärenden — snabbare handläggning.",
        icon: "Inbox",
        conceptId: "arendehantering-ai",
      },
      {
        title: "Utkast på nolltid",
        text: "Textgenerering med AI ger dig ett första utkast — mejl, rapporter, PM. Du ger instruktioner och AI:n producerar. Du redigerar och polerar. Sparar timmar varje vecka.",
        icon: "PenTool",
        conceptId: "textgenerering",
      },
    ],
  },
  {
    id: "forsta-tekniken",
    title: "Förstå tekniken bakom",
    description:
      "Hur fungerar AI egentligen? En resa inuti språkmodellens hjärna — från tokens till attention.",
    conceptIds: [
      "llm",
      "token",
      "transformer",
      "attention",
      "kontextfonster",
      "api",
      "embeddings",
      "rag",
    ],
    estimatedMinutes: 20,
    icon: "Cpu",
    panels: [
      {
        title: "Motorerna bakom AI",
        text: "Stora språkmodeller (LLM) som GPT och Claude är tränade på enorma mängder text. De förutsäger det mest sannolika nästa ordet — miljarder gånger — tills ett komplett svar finns.",
        icon: "BookText",
        conceptId: "llm",
      },
      {
        title: "Text i bitar",
        text: "AI läser inte ord — den läser tokens. 'Katrineholms kommun' blir kanske ['Kat','rine','holms',' kommun']. Tokens styr vad AI:n kostar och hur fort den svarar.",
        icon: "SplitSquareHorizontal",
        conceptId: "token",
      },
      {
        title: "Transformer — revolutionen",
        text: "Transformer-arkitekturen (2017) revolutionerade AI genom att bearbeta hela texter samtidigt istället för ord för ord. Det är grunden för alla moderna språkmodeller.",
        icon: "Cpu",
        conceptId: "transformer",
      },
      {
        title: "Attention — vad hänger ihop?",
        text: "Attention-mekanismen låter AI:n väga vilka ord i texten som är viktigast för varje annat ord. 'Katten sov för att den var trött' — attention förstår att 'den' = 'katten'.",
        icon: "Focus",
        conceptId: "attention",
      },
      {
        title: "AI:ns korttidsminne",
        text: "Kontext-fönstret är hur mycket AI:n kan 'se' i en konversation. Som ett skrivbord — ju större, desto fler dokument kan den ha framme. GPT-4 har ~128K tokens.",
        icon: "Maximize2",
        conceptId: "kontextfonster",
      },
      {
        title: "Hur system pratar med varandra",
        text: "API:er är språket program använder för att kommunicera. När du frågar en AI skickas din fråga via ett API till modellen, som skickar tillbaka svaret — som en servitör på restaurang.",
        icon: "Plug",
        conceptId: "api",
      },
      {
        title: "Text som siffror",
        text: "Embeddings omvandlar text till vektorer (siffror) som fångar betydelsen. 'Kung' och 'drottning' hamnar nära varandra i siffervärlden. Det möjliggör smart sökning.",
        icon: "Grid3x3",
        conceptId: "embeddings",
      },
      {
        title: "Svar baserade på DINA dokument",
        text: "RAG (Retrieval-Augmented Generation) låter AI:n söka i dina egna dokument innan den svarar. Istället för att gissa hittar den fakta i din kunskapsbas — grunden för Intric.",
        icon: "BookSearch",
        conceptId: "rag",
      },
    ],
  },
  {
    id: "saker-ai",
    title: "Säker AI-användning",
    description:
      "Hur du använder AI ansvarsfullt — undvik fallgropar, hantera risker och skydda känslig information.",
    conceptIds: [
      "hallucination",
      "bias",
      "kallkritik",
      "informationssakerhet",
      "ai-sekretess",
      "transparens",
      "mansklig-kontroll",
      "ansvarsfull-ai",
    ],
    estimatedMinutes: 20,
    icon: "Shield",
    panels: [
      {
        title: "AI:n kan hitta på",
        text: "Hallucination: AI:n genererar ibland trovärdiga men felaktiga svar. Den förutsäger ord, inte fakta. Ju viktigare beslutet, desto viktigare att du dubbelkollar.",
        icon: "AlertTriangle",
        conceptId: "hallucination",
      },
      {
        title: "Fördomar i maskinen",
        text: "Bias: AI speglar fördomar i sin träningsdata. Den kan omedvetet diskriminera baserat på kön, etnicitet eller ålder. Var extra uppmärksam vid beslut som påverkar människor.",
        icon: "Scale",
        conceptId: "bias",
      },
      {
        title: "Var din egen faktakollare",
        text: "Källkritik är din viktigaste superkraft med AI. Kolla alltid viktiga påståenden mot tillförlitliga källor. 'AI sa det' är aldrig en källa.",
        icon: "SearchCheck",
        conceptId: "kallkritik",
      },
      {
        title: "Skydda din information",
        text: "Dela aldrig lösenord, personnummer eller konfidentiell information med extern AI. Tänk: 'skulle jag skicka det här på ett vykort?' — om nej, dela det inte med ChatGPT.",
        icon: "ShieldAlert",
        conceptId: "informationssakerhet",
      },
      {
        title: "Sekretess gäller fortfarande",
        text: "Kommunens sekretessregler gäller även med AI. Sekretessbelagd information får inte delas med externa AI-tjänster — oavsett hur bra verktyget är.",
        icon: "Lock",
        conceptId: "ai-sekretess",
      },
      {
        title: "Berätta att det är AI",
        text: "Transparens: var öppen med när AI har hjälpt till. AI Act kräver att chatbotar berättar att de är AI, och AI-genererat innehåll bör märkas.",
        icon: "Eye",
        conceptId: "transparens",
      },
      {
        title: "Människan bestämmer",
        text: "Mänsklig kontroll (Human-in-the-loop): AI föreslår, du bestämmer. Särskilt viktigt vid beslut som påverkar medborgare — AI är ett stöd, aldrig beslutsfattaren.",
        icon: "UserCheck",
        conceptId: "mansklig-kontroll",
      },
      {
        title: "Använd AI med ansvar",
        text: "Ansvarsfull AI handlar om att vara rättvis, transparent och ha kontroll. Du har ett kraftfullt verktyg — och skyldighet att använda det klokt.",
        icon: "Heart",
        conceptId: "ansvarsfull-ai",
      },
    ],
  },
  {
    id: "lagar-regler",
    title: "Lagar & regler för AI",
    description:
      "GDPR, AI Act och offentlighetsprincipen — vad du behöver veta om regelverket kring AI i offentlig sektor.",
    conceptIds: [
      "gdpr",
      "ai-act",
      "ai-act-riskkategorier",
      "offentlighetsprincipen-ai",
      "dpia",
      "dataskyddsombud",
      "personuppgiftsansvarig",
      "privacy-by-design",
    ],
    estimatedMinutes: 20,
    icon: "Scale",
    panels: [
      {
        title: "GDPR — grunden för dataskydd",
        text: "EU:s dataskyddsförordning bestämmer hur personuppgifter får hanteras. Gäller alltid — även när AI är inblandad. Fråga dig: 'hanterar jag personuppgifter?' Om ja → GDPR gäller.",
        icon: "Scale",
        conceptId: "gdpr",
      },
      {
        title: "AI Act — världens första AI-lag",
        text: "EU:s AI-förordning klassificerar AI efter risk. Förbjudna tillämpningar (social scoring) → Hög risk (beslut om medborgare) → Begränsad risk (chatbotar) → Minimal risk.",
        icon: "Landmark",
        conceptId: "ai-act",
      },
      {
        title: "Risknivåer i AI Act",
        text: "Kommunens AI-användning hamnar ofta i 'begränsad risk' (chatbotar måste vara transparenta) eller 'hög risk' (beslutsstöd om medborgare kräver extra krav).",
        icon: "AlertTriangle",
        conceptId: "ai-act-riskkategorier",
      },
      {
        title: "Allt kan bli allmän handling",
        text: "Offentlighetsprincipen: chattar med AI kan begäras ut som allmän handling. Skriv aldrig något till en AI-assistent som du inte vill ska bli offentligt.",
        icon: "Eye",
        conceptId: "offentlighetsprincipen-ai",
      },
      {
        title: "Bedöm riskerna först",
        text: "Konsekvensbedömning (DPIA): innan AI används för känsliga uppgifter måste riskerna analyseras. Hur påverkas individers integritet? Hur minimerar vi riskerna?",
        icon: "ClipboardCheck",
        conceptId: "dpia",
      },
      {
        title: "Din GDPR-kontakt",
        text: "Dataskyddsombudet (DPO) övervakar att dataskyddet följs. Alla kommuner måste ha ett. Kontakta DPO:n vid frågor om AI och personuppgifter.",
        icon: "UserCheck",
        conceptId: "dataskyddsombud",
      },
      {
        title: "Vem ansvarar?",
        text: "Kommunen är personuppgiftsansvarig för sin AI-användning. Det betyder: ni bestämmer varför och hur personuppgifter behandlas — och ni bär ansvaret.",
        icon: "UserCog",
        conceptId: "personuppgiftsansvarig",
      },
      {
        title: "Bygg in dataskydd från start",
        text: "Privacy by Design: dataskydd ska byggas in i AI-system från början, inte läggas till i efterhand. Välj verktyg som Intric som har GDPR inbyggt.",
        icon: "ShieldCheck",
        conceptId: "privacy-by-design",
      },
    ],
  },
  {
    id: "intric-fran-grunden",
    title: "Intric från grunden",
    description:
      "Lär dig använda Intric — kommunens AI-plattform. Från personlig chatt till att bygga din egen assistent.",
    conceptIds: [
      "intric-plattform",
      "intric-personlig-chatt",
      "intric-space",
      "intric-assistent",
      "intric-kunskap",
      "intric-samling",
      "sakerhetsklasser",
    ],
    estimatedMinutes: 15,
    icon: "Boxes",
    panels: [
      {
        title: "Välkommen till Intric",
        text: "Intric är kommunens AI-plattform — svensk, GDPR-kompatibel och byggd för organisationer. Här bygger du AI-assistenter anpassade för just din verksamhet.",
        icon: "Boxes",
        conceptId: "intric-plattform",
      },
      {
        title: "Börja med Personlig chatt",
        text: "Personlig chatt är din privata AI — ställ allmänna frågor, byt modell fritt. Perfekt för att komma igång. Ingen annan ser dina konversationer.",
        icon: "MessageSquare",
        conceptId: "intric-personlig-chatt",
      },
      {
        title: "Spaces — din arbetsyta",
        text: "Ett Space är en samarbetsyta där du och kollegor samlar assistenter och kunskap. Tänk 'teamrum' — ni bestämmer vem som får komma in.",
        icon: "FolderOpen",
        conceptId: "intric-space",
      },
      {
        title: "Bygg din första assistent",
        text: "En assistent i Intric har tre delar: språkmodell (motorn), kunskap (bränslet) och prompt (instruktionen). Som att anställa en specialist med rätt kompetens och arbetsbeskrivning.",
        icon: "Bot",
        conceptId: "intric-assistent",
      },
      {
        title: "Ge assistenten kunskap",
        text: "Ladda upp dokument, anslut webbsidor eller koppla integrationer. Assistenten söker i kunskapen för att ge svar baserade på ERA dokument — inte internet.",
        icon: "Library",
        conceptId: "intric-kunskap",
      },
      {
        title: "Organisera i samlingar",
        text: "Samlingar är mappar i kunskapsbasen. Alla HR-dokument i en samling, ekonomidokument i en annan. Varje samling använder en embeddingmodell för smart sökning.",
        icon: "FolderKanban",
        conceptId: "intric-samling",
      },
      {
        title: "Rätt säkerhet för rätt data",
        text: "Säkerhetsklasser styr vilka AI-modeller som får användas. Känslig data? Bara EU-baserade modeller. Öppen information? Alla modeller tillgängliga. Du väljer nivå per Space.",
        icon: "ShieldAlert",
        conceptId: "sakerhetsklasser",
      },
    ],
  },
];

// =============================================================================
// QUIZ DATA
// =============================================================================

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  // --- AI-grunderna ---
  { id: "q1", question: "Vad betyder AI?", options: ["Automatisk integration", "Artificiell intelligens", "Avancerad information", "Alternativ infrastruktur"], correctIndex: 1, explanation: "AI står för Artificiell Intelligens — datorsystem som kan utföra uppgifter som normalt kräver mänsklig intelligens.", category: "ai-grunderna" },
  { id: "q2", question: "Vad är maskininlärning?", options: ["Att programmera exakta regler för datorn", "En typ av databas", "Att AI lär sig mönster från data", "Ett programmeringsspråk"], correctIndex: 2, explanation: "Maskininlärning innebär att AI:n lär sig mönster genom att analysera data, istället för att följa förprogrammerade regler.", category: "ai-grunderna" },
  { id: "q3", question: "Vad är träningsdata?", options: ["Data som AI:n genererar", "All data som AI:n lärde sig från", "Användarnas frågor", "Testresultat"], correctIndex: 1, explanation: "Träningsdata är all data (texter, bilder, dokument) som AI:n lär sig från — dess skolmaterial.", category: "ai-grunderna" },
  { id: "q4", question: "Vad skiljer deep learning från vanlig maskininlärning?", options: ["Deep learning kräver mer data", "Deep learning använder många lager av neurala nätverk", "Deep learning är snabbare", "Ingen skillnad"], correctIndex: 1, explanation: "Deep learning använder neurala nätverk med många lager ('deep' = djup), vilket gör att den kan lära sig mer komplexa mönster.", category: "ai-grunderna" },
  { id: "q5", question: "Vad är NLP?", options: ["Ny lagstiftning för persondata", "Naturlig språkbehandling", "Neuralt lärande per pixel", "Nätverksbaserad lagring och process"], correctIndex: 1, explanation: "NLP (Natural Language Processing) är AI:ns förmåga att förstå, tolka och generera mänskligt språk.", category: "ai-grunderna" },

  // --- Språkmodeller ---
  { id: "q6", question: "Vad är en LLM?", options: ["En liten lokal modell", "En stor språkmodell", "En typ av databas", "Ett programmeringsspråk"], correctIndex: 1, explanation: "LLM står för Large Language Model — en AI-modell tränad på enorma mängder text som kan förstå och generera språk.", category: "sprakmodeller" },
  { id: "q7", question: "Vad är en token i AI-sammanhang?", options: ["En inloggningsnyckel", "Den minsta textenheten AI:n bearbetar", "En typ av kryptering", "Ett betalningsmedel"], correctIndex: 1, explanation: "Tokens är de minsta textenheterna som en språkmodell bearbetar — ungefär ¾ av ett ord.", category: "sprakmodeller" },
  { id: "q8", question: "Vad styr 'temperatur' i en AI-modell?", options: ["Hur snabbt den svarar", "Hur kreativ eller förutsägbar den är", "Hur mycket minne den använder", "Serverbelastningen"], correctIndex: 1, explanation: "Temperatur styr kreativiteten: låg = exakt och fokuserat, hög = kreativt och varierat.", category: "sprakmodeller" },
  { id: "q9", question: "Vad är en hallucination?", options: ["När AI:n kraschar", "När AI:n hittar på trovärdiga men felaktiga fakta", "När AI:n inte förstår frågan", "En teknisk term för snabb bearbetning"], correctIndex: 1, explanation: "Hallucination är när AI:n genererar text som låter övertygande men som är helt felaktig.", category: "sprakmodeller" },
  { id: "q10", question: "Vad gör en systemprompt?", options: ["Startar om AI-modellen", "Styr AI:ns beteende med dolda instruktioner", "Uppdaterar AI:ns programvara", "Säkerhetskopierar konversationer"], correctIndex: 1, explanation: "Systemprompten är dolda instruktioner som styr hur AI:n ska bete sig — dess 'arbetsbeskrivning'.", category: "sprakmodeller" },
  { id: "q11", question: "Vad är grounding?", options: ["Att stänga av AI:n", "Att koppla AI:ns svar till verifierad källdata", "Att ansluta till internet", "Att starta träningsprocessen"], correctIndex: 1, explanation: "Grounding innebär att förankra AI:ns svar i verifierad data för att minska hallucinationer.", category: "sprakmodeller" },

  // --- AI på jobbet ---
  { id: "q12", question: "Vad är promptteknik?", options: ["En typ av programmering", "Konsten att formulera bra instruktioner till AI:n", "Ett sätt att testa AI-modeller", "En metod för dataanalys"], correctIndex: 1, explanation: "Promptteknik handlar om att skriva tydliga instruktioner med kontext, format och persona för bättre AI-svar.", category: "ai-pa-jobbet" },
  { id: "q13", question: "Vad är en AI-agent?", options: ["Samma sak som en chatbot", "En AI som kan planera och utföra multi-steg-uppgifter", "En säkerhetsrobot", "En typ av virus"], correctIndex: 1, explanation: "En AI-agent kan agera självständigt — söka information, köra verktyg och utföra flerstegsuppgifter, till skillnad från en enkel assistent.", category: "ai-pa-jobbet" },
  { id: "q14", question: "Vad kan AI-transkribering göra?", options: ["Översätta mellan programmeringsspråk", "Omvandla tal till skriven text", "Kryptera meddelanden", "Sortera mejl"], correctIndex: 1, explanation: "AI-transkribering omvandlar talat språk (t.ex. mötesinspelningar) till text med hög precision.", category: "ai-pa-jobbet" },

  // --- Intric ---
  { id: "q15", question: "Vad är ett Space i Intric?", options: ["Lagringsutrymme för filer", "En samarbetsyta för assistenter och kunskap", "En typ av AI-modell", "Intrics chattfunktion"], correctIndex: 1, explanation: "Ett Space är en digital samarbetsyta i Intric där team samlar assistenter och gemensam kunskap.", category: "intric" },
  { id: "q16", question: "Vilka tre delar har en assistent i Intric?", options: ["Databas, API, frontend", "Språkmodell, kunskap, prompt", "Server, klient, nätverk", "Indata, bearbetning, utdata"], correctIndex: 1, explanation: "En Intric-assistent består av: språkmodell (motorn), kunskap (bränslet) och prompt (instruktionen).", category: "intric" },
  { id: "q17", question: "Vad gör säkerhetsklasser i Intric?", options: ["Krypterar data", "Styr vilka AI-modeller som får användas baserat på datakänslighet", "Begränsar antalet användare", "Skapar säkerhetskopior"], correctIndex: 1, explanation: "Säkerhetsklasser kontrollerar vilka AI-modeller som är tillgängliga per Space — känslig data kan begränsas till EU-modeller.", category: "intric" },
  { id: "q18", question: "Vad är skillnaden mellan 'bilagor' och 'kunskap' i Intric?", options: ["Ingen skillnad", "Bilagor = stående instruktioner, Kunskap = sökbart bibliotek", "Bilagor = bilder, Kunskap = text", "Bilagor = privat, Kunskap = offentlig"], correctIndex: 1, explanation: "Bilagor är dokument assistenten alltid läser (t.ex. varumärkesguide). Kunskap är ett sökbart bibliotek som konsulteras vid behov.", category: "intric" },

  // --- Copilot ---
  { id: "q19", question: "Vad använder Microsoft Copilot för att ge personliga svar?", options: ["Bara internet", "Microsoft Graph med dina mejl, filer och kalendrar", "Enbart ChatGPT", "Lokala filer på din dator"], correctIndex: 1, explanation: "Copilot använder Microsoft Graph — all din organisations data (mejl, filer, kalendrar, möten) — för att ge kontextuellt relevanta svar.", category: "copilot" },
  { id: "q20", question: "Vad kan Copilot göra i Teams?", options: ["Bara transkribera", "Transkribera, sammanfatta och svara på frågor om mötet", "Boka rum", "Skicka fakturor"], correctIndex: 1, explanation: "Copilot i Teams transkriberar möten i realtid, skapar sammanfattningar med beslutspunkter och svarar på frågor.", category: "copilot" },

  // --- Teknik ---
  { id: "q21", question: "Vad är ett API?", options: ["En typ av AI-modell", "Ett sätt för program att kommunicera med varandra", "Ett programmeringsspråk", "En typ av databas"], correctIndex: 1, explanation: "API (Application Programming Interface) är kontrollerade gränssnitt som låter program skicka data till varandra.", category: "teknik" },
  { id: "q22", question: "Vad är en MCP-server?", options: ["En vanlig webbserver", "En standard som kopplar AI till externa datakällor", "En typ av molntjänst", "Microsofts chattprotokoll"], correctIndex: 1, explanation: "MCP (Model Context Protocol) är en öppen standard som låter AI-assistenter koppla till verktyg och datakällor som SCB och Kolada.", category: "teknik" },
  { id: "q23", question: "Vad är fördelen med lokal AI jämfört med moln-AI?", options: ["Den är alltid snabbare", "Data lämnar aldrig organisationen", "Den är gratis", "Den har bättre modeller"], correctIndex: 1, explanation: "Lokal AI körs på egen infrastruktur — all data stannar inom organisationen, viktigt för GDPR och känslig information.", category: "teknik" },
  { id: "q24", question: "Vad betyder open source?", options: ["Gratis programvara utan support", "Programvara med öppen källkod som alla kan se och förbättra", "Mjukvara utan upphovsrätt", "Program som bara fungerar online"], correctIndex: 1, explanation: "Open source innebär att koden är öppen för alla att inspektera, använda och förbättra. Llama och Mistral är open source AI-modeller.", category: "teknik" },

  // --- Data & sökning ---
  { id: "q25", question: "Vad gör RAG?", options: ["Komprimerar AI-modeller", "Låter AI söka i dina dokument innan den svarar", "Tränar nya AI-modeller", "Krypterar data"], correctIndex: 1, explanation: "RAG (Retrieval-Augmented Generation) söker i din kunskapsbas och ger AI:n relevanta dokument som kontext, vilket minskar hallucinationer.", category: "data-sokning" },
  { id: "q26", question: "Vad är embeddings?", options: ["Inbäddade bilder i dokument", "Text omvandlad till siffror som fångar betydelsen", "Kopior av AI-modeller", "Krypterade meddelanden"], correctIndex: 1, explanation: "Embeddings omvandlar text till vektorer (siffror) där liknande texter får liknande siffror — grunden för semantisk sökning.", category: "data-sokning" },
  { id: "q27", question: "Vad är semantisk sökning?", options: ["Sökning med exakta nyckelord", "Sökning baserad på betydelse istället för exakta ord", "Sökning i databaser", "Sökning i sociala medier"], correctIndex: 1, explanation: "Semantisk sökning förstår vad du menar, inte bara vad du skriver. 'Minska kostnader' hittar också 'budgetoptimering'.", category: "data-sokning" },

  // --- Lagar & regler ---
  { id: "q28", question: "Vad står GDPR för?", options: ["General Data Protection Regulation", "Global Digital Privacy Rules", "Government Data Processing Requirements", "General Development Protocol Registry"], correctIndex: 0, explanation: "GDPR (General Data Protection Regulation) är EU:s dataskyddsförordning som skyddar personuppgifter.", category: "lagar-regler" },
  { id: "q29", question: "Vilken riskkategori i AI Act kräver strängast regler?", options: ["Minimal risk", "Begränsad risk", "Hög risk", "Förbjuden"], correctIndex: 3, explanation: "Förbjudna tillämpningar (t.ex. social scoring) är helt bannlysta. Hög risk har strängast regler av de tillåtna.", category: "lagar-regler" },
  { id: "q30", question: "Vad innebär offentlighetsprincipen för AI-chattar?", options: ["De måste publiceras online", "De kan begäras ut som allmän handling", "De raderas automatiskt", "De är alltid sekretessbelagda"], correctIndex: 1, explanation: "Konversationer med kommun-AI kan begäras ut som allmänna handlingar enligt offentlighetsprincipen.", category: "lagar-regler" },
  { id: "q31", question: "Vad är en DPIA?", options: ["Digital Platform Integration Architecture", "Data Protection Impact Assessment", "Dynamic Processing Intelligence Algorithm", "Distributed Privacy Information Access"], correctIndex: 1, explanation: "DPIA (Data Protection Impact Assessment) är en konsekvensbedömning av risker innan AI används för känsliga uppgifter.", category: "lagar-regler" },
  { id: "q32", question: "Vad innebär Privacy by Design?", options: ["Att designa snygga integritetsinställningar", "Att dataskydd byggs in i system från start", "Att kryptera alla dokument", "Att radera data regelbundet"], correctIndex: 1, explanation: "Privacy by Design innebär att dataskydd ska byggas in i AI-system från början, inte läggas till i efterhand.", category: "lagar-regler" },

  // --- Säkerhet & etik ---
  { id: "q33", question: "Vad är bias i AI?", options: ["Ett programmeringsfel", "Systematiska snedvridningar i AI:ns svar", "En typ av virus", "Fel i träningsalgoritmen"], correctIndex: 1, explanation: "Bias är systematiska snedvridningar orsakade av skev träningsdata — AI:n kan diskriminera utan att 'vilja' det.", category: "sakerhet-etik" },
  { id: "q34", question: "Vad är prompt injection?", options: ["Att mata in data i en databas", "En attack där skadliga instruktioner gömts i input till AI:n", "En typ av AI-träning", "Att skriva en systemprompt"], correctIndex: 1, explanation: "Prompt injection är en attack där skadliga instruktioner gömts i input för att lura AI:n att ignorera sina regler.", category: "sakerhet-etik" },
  { id: "q35", question: "Vad betyder 'Human-in-the-loop'?", options: ["Att AI:n simulerar mänskligt beteende", "Att människor alltid ska kunna övervaka och övertrumfa AI:ns beslut", "Att AI och människa turas om", "Att bara människor får använda AI"], correctIndex: 1, explanation: "Human-in-the-loop innebär att människor alltid har sista ordet — AI föreslår, människan bestämmer.", category: "sakerhet-etik" },

  // --- Verktyg ---
  { id: "q36", question: "Vad är GPT-SW3?", options: ["En ny version av ChatGPT", "AI Swedens svenska språkmodell", "Ett Google-verktyg", "Ett säkerhetsprotokoll"], correctIndex: 1, explanation: "GPT-SW3 är AI Swedens storskaliga svenska språkmodell — open source och tränad på nordiska språk.", category: "verktyg" },

  // --- Avancerat ---
  { id: "q37", question: "Vad är fine-tuning?", options: ["Att justera ljudinställningar", "Att vidareutbilda en AI-modell med specifik data", "Att komprimera en modell", "Att testa en modell"], correctIndex: 1, explanation: "Fine-tuning innebär att specialträna en befintlig AI-modell med egen data — utan att börja om från noll.", category: "avancerat" },
  { id: "q38", question: "Vad gör LoRA?", options: ["Komprimerar bilder", "Möjliggör effektiv fine-tuning genom att bara ändra ~1% av vikterna", "Krypterar AI-modeller", "Övervakar AI-prestanda"], correctIndex: 1, explanation: "LoRA (Low-Rank Adaptation) fine-tunar bara en liten del av modellens parametrar — gör specialanpassning billigt och snabbt.", category: "avancerat" },
  { id: "q39", question: "Vad är inferens?", options: ["AI-träning", "Att köra en tränad modell för att generera svar", "Dataöverföring", "En typ av encryption"], correctIndex: 1, explanation: "Inferens = att använda en färdigtränad modell. Träning = att plugga. Inferens = att skriva provet.", category: "avancerat" },
  { id: "q40", question: "Vad är kvantisering?", options: ["Att mäta AI:ns kvalitet", "Att komprimera modellvikter till färre bitar", "Att räkna antalet parametrar", "Att dela upp data i mindre delar"], correctIndex: 1, explanation: "Kvantisering minskar precisionen i modellens siffror (t.ex. 32-bit → 4-bit) — modellen blir mindre och snabbare med minimal kvalitetsförlust.", category: "avancerat" },

  // --- Fler AI-grunderna ---
  { id: "q41", question: "Vad är generativ AI?", options: ["AI som analyserar data", "AI som skapar nytt innehåll — text, bilder, kod", "AI som bara svarar ja/nej", "AI som övervakar nätverk"], correctIndex: 1, explanation: "Generativ AI skapar nytt innehåll istället för att bara analysera befintligt. ChatGPT och DALL-E är exempel.", category: "ai-grunderna" },
  { id: "q42", question: "Vad är skillnaden mellan AI och maskininlärning?", options: ["Samma sak", "ML är en del av AI — AI är det breda fältet, ML är en metod", "AI är gammal teknik, ML är ny", "ML är hårdvara, AI är mjukvara"], correctIndex: 1, explanation: "AI är det breda fältet. Maskininlärning är en specifik metod inom AI där datorn lär sig mönster från data.", category: "ai-grunderna" },
  { id: "q43", question: "Vad är datorseende (Computer Vision)?", options: ["En ny typ av bildskärm", "AI:ns förmåga att tolka och förstå bilder och video", "Ett VR-verktyg", "Kameraövervakning"], correctIndex: 1, explanation: "Computer Vision ger AI:n förmåga att 'se' — känna igen objekt, läsa text i bilder och tolka visuell information.", category: "ai-grunderna" },

  // --- Fler Språkmodeller ---
  { id: "q44", question: "Vad betyder 'kontext-fönster'?", options: ["Fönstret i AI:ns interface", "Hur mycket text AI:n kan se och komma ihåg i en konversation", "En typ av webbläsarfunktion", "Tidsramen för AI-svar"], correctIndex: 1, explanation: "Kontext-fönstret är AI:ns 'korttidsminne' — hur många tokens den kan bearbeta samtidigt i en konversation.", category: "sprakmodeller" },
  { id: "q45", question: "Vad är multimodal AI?", options: ["AI med flera användare", "AI som förstår text, bilder, ljud och video", "AI som kör på flera servrar", "AI som pratar flera språk"], correctIndex: 1, explanation: "Multimodal AI kan bearbeta och förstå flera typer av input — text, bilder, ljud och video — samtidigt.", category: "sprakmodeller" },
  { id: "q46", question: "Vad är en grundmodell (Foundation Model)?", options: ["Den första AI-modellen som byggdes", "En stor, allmänt tränad modell som kan anpassas till specifika uppgifter", "En modell för byggindustrin", "Basversionen av en app"], correctIndex: 1, explanation: "Foundation Models som GPT-4, Claude och Llama är brett tränade och kan fine-tunas för specifika uppgifter.", category: "sprakmodeller" },

  // --- Fler AI på jobbet ---
  { id: "q47", question: "Vad är OCR?", options: ["Online Content Retrieval", "Optical Character Recognition — AI som läser text i bilder", "Open Cloud Resources", "Organized Code Repository"], correctIndex: 1, explanation: "OCR omvandlar text i bilder och skannade dokument till redigerbar, sökbar text.", category: "ai-pa-jobbet" },
  { id: "q48", question: "Vad är skillnaden mellan en AI-assistent och en AI-agent?", options: ["Samma sak", "Agenten kan planera och utföra multi-steg-uppgifter självständigt", "Assistenten är smartare", "Agenten är billigare"], correctIndex: 1, explanation: "En assistent svarar på enstaka frågor. En agent kan planera, söka, analysera och leverera hela uppgifter i flera steg.", category: "ai-pa-jobbet" },
  { id: "q49", question: "Vad kan sentimentanalys användas till i en kommun?", options: ["Mäta temperatur", "Analysera känslan i medborgarfeedback och enkätsvar", "Översätta dokument", "Skapa bilder"], correctIndex: 1, explanation: "Sentimentanalys avgör om text är positiv, negativ eller neutral — användbart för att analysera medborgarfeedback.", category: "ai-pa-jobbet" },
  { id: "q50", question: "Varför är promptteknik viktigt?", options: ["Det gör AI:n snabbare", "Bättre formulerade frågor ger bättre svar", "Det är ett krav i AI Act", "Det minskar kostnaden"], correctIndex: 1, explanation: "Kvaliteten på din prompt avgör kvaliteten på AI:ns svar. Kontext, format och tydlighet är nyckeln.", category: "ai-pa-jobbet" },

  // --- Fler Intric ---
  { id: "q51", question: "Vad är Intric Marketplace?", options: ["En webbutik för AI-hårdvara", "Bibliotek med färdiga AI-assistenter som kan delas mellan organisationer", "Intrics prislista", "En marknadsplats för data"], correctIndex: 1, explanation: "Intric Marketplace låter organisationer dela och återanvända AI-assistenter — en kommun kan använda en annan kommuns lösning.", category: "intric" },
  { id: "q52", question: "Vad gör 'Plans' i Intric?", options: ["Planerar möten", "Kör flerstegsarbetsflöden i bakgrunden", "Hanterar abonnemang", "Skapar projektplaner"], correctIndex: 1, explanation: "Plans är automatiserade arbetsflöden med flera steg — t.ex. samla information, analysera, och skriva rapport — allt i bakgrunden.", category: "intric" },
  { id: "q53", question: "Vad gör Intrics redacting-funktion?", options: ["Raderar gamla konversationer", "Automatiskt maskerar känslig information som personnummer i dokument", "Redigerar AI:ns svar", "Tar bort duplicerade filer"], correctIndex: 1, explanation: "Redacting upptäcker och döljer känsliga uppgifter (personnummer, telefonnummer, adresser) innan AI:n analyserar dokumentet.", category: "intric" },
  { id: "q54", question: "Vad bestämmer vilka AI-modeller som finns tillgängliga i ett Space?", options: ["Antalet användare", "Spacets säkerhetsklass", "Vilken dag det är", "Administratörens preferenser"], correctIndex: 1, explanation: "Säkerhetsklassen filtrerar bort modeller som inte uppfyller kraven — känslig data kan begränsas till EU-modeller.", category: "intric" },
  { id: "q55", question: "Hur skiljer sig en Intric-samling från kunskap?", options: ["Samling = enskild fil, Kunskap = alla filer", "Samling = organiserad mapp inuti Kunskap", "Ingen skillnad", "Samling = bilder, Kunskap = text"], correctIndex: 1, explanation: "Kunskap är hela biblioteket, Samlingar är mappar inuti det — som bokhyllor sorterade efter ämne.", category: "intric" },
  { id: "q56", question: "Vad händer med din data när du chattar med Intric?", options: ["Den skickas till USA", "Den stannar i EU och hanteras enligt GDPR", "Den delas med andra användare", "Den säljs till annonsörer"], correctIndex: 1, explanation: "Intric är GDPR-kompatibelt — all data lagras i EU/EES och används aldrig för att träna tredjepartsmodeller.", category: "intric" },

  // --- Fler Copilot ---
  { id: "q57", question: "Vad är Copilot Studio?", options: ["En musikstudio", "Microsofts plattform för att bygga egna AI-agenter", "Videoredigeringsprogram", "En typ av Teams-rum"], correctIndex: 1, explanation: "Copilot Studio låter dig bygga specialiserade AI-agenter med egen kunskap och verktyg, anpassade för din verksamhet.", category: "copilot" },
  { id: "q58", question: "Vad är Microsoft Graph i Copilot-sammanhang?", options: ["Ett diagramverktyg", "Datalagret med din organisations mejl, filer, kalendrar och möten", "En typ av databas", "Grafikkort"], correctIndex: 1, explanation: "Microsoft Graph är det centrala datalagret som Copilot använder för att hitta relevant kontext i din organisation.", category: "copilot" },
  { id: "q59", question: "Vad kan Copilot göra i Excel?", options: ["Bara skapa diagram", "Analysera data, föreslå formler, hitta mönster och skapa diagram", "Bara sortera rader", "Bara formatera celler"], correctIndex: 1, explanation: "Copilot i Excel kan analysera data, föreslå formler, hitta trender och skapa visualiseringar — allt med naturligt språk.", category: "copilot" },

  // --- Fler Teknik ---
  { id: "q60", question: "Vad betyder SSO (Single Sign-On)?", options: ["Super Secure Online", "Logga in en gång och få åtkomst till alla system", "En typ av VPN", "Serverbaserad säkerhetsövervakning"], correctIndex: 1, explanation: "SSO låter dig logga in en gång och sedan nå alla dina system utan separata lösenord — Intric stödjer SSO.", category: "teknik" },
  { id: "q61", question: "Vad är RBAC?", options: ["Remote Backup And Copy", "Rollbaserad åtkomstkontroll — behörighet baserat på din roll", "Real-time Bandwidth Allocation Control", "Rapid Build And Configure"], correctIndex: 1, explanation: "RBAC bestämmer behörigheter baserat på roll — admin ser allt, redigerare kan ändra, läsare kan bara titta.", category: "teknik" },
  { id: "q62", question: "Vad är en GPU och varför behövs den för AI?", options: ["En typ av databas", "En processor som är extremt bra på parallella beräkningar", "En grafikkortskylare", "En typ av nätverk"], correctIndex: 1, explanation: "GPU:er (grafikprocessorer) kan utföra tusentals beräkningar samtidigt, vilket gör dem perfekta för AI-träning och inferens.", category: "teknik" },

  // --- Fler Data & sökning ---
  { id: "q63", question: "Vad är chunking?", options: ["Att komprimera filer", "Att dela upp stora dokument i mindre bitar innan de görs sökbara", "Att radera data i delar", "Att gruppera användare"], correctIndex: 1, explanation: "Chunking delar dokument i mindre segment som var och en får sin egen embedding — för mer precis sökning i RAG.", category: "data-sokning" },
  { id: "q64", question: "Vad är metadata?", options: ["Data som AI genererar", "Data om data — vem skapade det, när, vilken typ", "Falsk data", "Backupdata"], correctIndex: 1, explanation: "Metadata är information om information — som etiketten på en burk som berättar vad som finns inuti.", category: "data-sokning" },
  { id: "q65", question: "Vad är skillnaden mellan strukturerad och ostrukturerad data?", options: ["Strukturerad = ny, ostrukturerad = gammal", "Strukturerad = tabeller/register, ostrukturerad = fritext/bilder/ljud", "Ingen skillnad", "Strukturerad = stor, ostrukturerad = liten"], correctIndex: 1, explanation: "Strukturerad data finns i tabeller (Excel, databaser). Ostrukturerad data är fritext, bilder och ljud. AI hanterar båda.", category: "data-sokning" },

  // --- Fler Lagar & regler ---
  { id: "q66", question: "Vad innebär AI-litteracitet enligt AI Act?", options: ["Att kunna programmera AI", "Att personal som använder AI ska ha tillräcklig förståelse för möjligheter och risker", "Att läsa AI-genererad text", "Att skriva om AI"], correctIndex: 1, explanation: "AI-litteracitet (gäller sedan feb 2025) kräver att organisationer säkerställer tillräcklig AI-kompetens hos sina anställda.", category: "lagar-regler" },
  { id: "q67", question: "Vad är ett PUB-avtal?", options: ["Ett avtal om publik data", "Personuppgiftsbiträdesavtal — reglerar hur en leverantör får hantera din data", "Ett publiceringsavtal", "Ett upphandlingsavtal"], correctIndex: 1, explanation: "PUB-avtal krävs när en extern part (som Intric) behandlar personuppgifter för kommunens räkning.", category: "lagar-regler" },
  { id: "q68", question: "Vilka är de 4 riskkategorierna i AI Act?", options: ["Låg, Medel, Hög, Kritisk", "Förbjuden, Hög risk, Begränsad risk, Minimal risk", "Grön, Gul, Orange, Röd", "A, B, C, D"], correctIndex: 1, explanation: "AI Act delar in AI i: Förbjuden (bannlyst), Hög risk (strängast krav), Begränsad risk (transparenskrav), Minimal risk (fritt).", category: "lagar-regler" },
  { id: "q69", question: "Vad är tredjelandsöverföring?", options: ["Att flytta data mellan kommuner", "När personuppgifter skickas till länder utanför EU", "Att byta AI-leverantör", "Att dela data med tre organisationer"], correctIndex: 1, explanation: "Tredjelandsöverföring sker t.ex. när du använder ChatGPT — din data skickas till USA. Kräver extra GDPR-skydd.", category: "lagar-regler" },

  // --- Fler Säkerhet & etik ---
  { id: "q70", question: "Vad är en deepfake?", options: ["En djup analys", "AI-genererat falskt ljud, bild eller video som ser äkta ut", "En typ av virus", "En säkerhetskopia"], correctIndex: 1, explanation: "Deepfakes är AI-genererat innehåll som ser autentiskt ut men är fabricerat — kan användas för desinformation.", category: "sakerhet-etik" },
  { id: "q71", question: "Vad är förklarbar AI (XAI)?", options: ["AI som kan förklara skämt", "Metoder för att göra AI:ns beslut begripliga för människor", "AI med bättre ordförråd", "AI som pratar högt"], correctIndex: 1, explanation: "XAI syftar till att göra AI:ns beslutsprocess transparent — viktigt för tillit och lagefterlevnad.", category: "sakerhet-etik" },
  { id: "q72", question: "Varför är 'övertro på AI' ett problem?", options: ["AI blir dyrare", "Man slutar granska och tänka kritiskt, och sprider felaktiga svar", "AI:n slutar fungera", "Det bryter mot lagen"], correctIndex: 1, explanation: "Övertro leder till att fel sprids okontrollerat. AI kan halllucinera — du måste alltid vara den sista kontrollen.", category: "sakerhet-etik" },

  // --- Fler Verktyg ---
  { id: "q73", question: "Vad är Ollama?", options: ["En AI-assistent från Google", "Verktyg för att köra AI-modeller lokalt på din dator/server", "En typ av molntjänst", "En chatbot för barn"], correctIndex: 1, explanation: "Ollama låter dig köra open source AI-modeller lokalt — ett kommando laddar ner och startar modellen, utan att data lämnar din maskin.", category: "verktyg" },
  { id: "q74", question: "Vad är Hugging Face?", options: ["En emoji-app", "Det centrala biblioteket för open source AI-modeller och dataset", "En social media-plattform", "En ansiktsigenkänningsapp"], correctIndex: 1, explanation: "Hugging Face är 'GitHub för AI' — tusentals fria modeller, dataset och verktyg tillgängliga för alla.", category: "verktyg" },

  // --- Fler Avancerat ---
  { id: "q75", question: "Vad är RLHF?", options: ["Real-time Language Handling Framework", "Reinforcement Learning from Human Feedback — människor bedömer AI-svar för att förbättra modellen", "Rapid Learning Hardware Format", "Remote Language Host Function"], correctIndex: 1, explanation: "RLHF är tekniken som gör ChatGPT och Claude hjälpsamma — människor rankar AI-svar och modellen lär sig vilka som föredras.", category: "avancerat" },
  { id: "q76", question: "Vad är Chain-of-Thought (CoT)?", options: ["En blockkedja", "Promptteknik där AI:n ombeds tänka steg för steg", "En typ av nätverk", "En kedja av AI-agenter"], correctIndex: 1, explanation: "CoT förbättrar AI:ns resonemang genom att be den visa sina tankesteg — 'tänk steg för steg' ger ofta bättre svar.", category: "avancerat" },
  { id: "q77", question: "Vad är Mixture of Experts (MoE)?", options: ["Ett team av AI-experter", "Arkitektur där bara en del av modellens parametrar aktiveras per fråga", "En typ av ensemble-modell", "En grupp specialiserade chatbotar"], correctIndex: 1, explanation: "MoE gör modeller snabbare genom att bara aktivera relevanta delar — som att skickas till rätt specialist på sjukhuset.", category: "avancerat" },
  { id: "q78", question: "Vad är model collapse?", options: ["När en server kraschar", "Försämring av AI som tränats på AI-genererad data", "När modellen blir för stor", "En planerad nedstängning"], correctIndex: 1, explanation: "Model collapse sker när AI tränas på AI-genererad data — varje 'kopia av kopian' blir sämre, som att kopiera en kopia.", category: "avancerat" },
];

// =============================================================================
// SCENARIO DATA
// =============================================================================

export const SCENARIOS: ScenarioCard[] = [
  {
    id: "s1",
    title: "Mötesprotokoll med känslig info",
    situation: "Du har spelat in ett möte som handlade om en medarbetares sjukfrånvaro. Du vill använda AI för att skapa ett mötesprotokoll.",
    category: "sakerhet-etik",
    relatedConceptIds: ["informationssakerhet", "gdpr", "intric-plattform"],
    options: [
      { label: "Ladda upp inspelningen i ChatGPT", feedback: "Dåligt val. ChatGPT är en extern tjänst och personuppgifter om sjukfrånvaro är känsliga. Data kan hamna på servrar i USA utan GDPR-skydd.", quality: "bad" },
      { label: "Använd Intric med rätt säkerhetsklass", feedback: "Bra val! Intric med rätt säkerhetsklass säkerställer att känslig data hanteras inom EU enligt GDPR.", quality: "good" },
      { label: "Skriv protokollet manuellt", feedback: "Fungerar, men du missar effektivitetsvinsten. Det finns säkra AI-alternativ som kan hjälpa.", quality: "ok" },
      { label: "Mejla inspelningen till en kollega", feedback: "Dåligt val. Att mejla känsliga personuppgifter utan kryptering skapar ytterligare GDPR-risker.", quality: "bad" },
    ],
  },
  {
    id: "s2",
    title: "AI-svar i en rapport",
    situation: "Du har bett AI:n sammanfatta en komplex utredning och vill inkludera sammanfattningen i en officiell rapport till kommunstyrelsen.",
    category: "sakerhet-etik",
    relatedConceptIds: ["hallucination", "kallkritik", "transparens"],
    options: [
      { label: "Kopiera in AI:ns text direkt utan granskning", feedback: "Dåligt val. AI kan halllucinera — hitta på fakta som låter trovärdiga. En felaktig sammanfattning i en officiell rapport kan få allvarliga konsekvenser.", quality: "bad" },
      { label: "Granska AI:ns text noggrant mot originaldokumentet och ange att AI använts", feedback: "Bästa valet! Du verifierar fakta, tar ansvar för innehållet och är transparent om AI-användningen.", quality: "good" },
      { label: "Granska texten men nämn inte att AI hjälpt till", feedback: "Okej att granska, men transparens är viktigt. AI Act och god praxis säger att man bör ange när AI varit involverad.", quality: "ok" },
      { label: "Låt en kollega dubbelkolla AI-texten", feedback: "Bra att få en andra åsikt, men du bör ändå själv verifiera mot källdokumentet. Ytterst är det du som ansvarar.", quality: "ok" },
    ],
  },
  {
    id: "s3",
    title: "Personnummer i en fråga till AI",
    situation: "En medborgare ringer och ber om hjälp med ett ärende. Du vill snabbt söka upp ärendet med AI:ns hjälp och funderar på att klistra in personnumret i chatten.",
    category: "lagar-regler",
    relatedConceptIds: ["gdpr", "personuppgiftsbehandling", "informationssakerhet"],
    options: [
      { label: "Klistra in personnumret i ChatGPT", feedback: "Dåligt val. Personnummer är känsliga personuppgifter och får inte delas med extern AI. Du bryter mot GDPR.", quality: "bad" },
      { label: "Använd verksamhetssystemet istället", feedback: "Bästa valet! Personnummer ska sökas i behöriga system med rätt åtkomstkontroll — inte via AI-chattar.", quality: "good" },
      { label: "Anonymisera personnumret innan du skickar", feedback: "Bättre, men om du bara tar bort siffror kan AI:n ändå inte hjälpa dig söka upp ärendet. Använd rätt system istället.", quality: "ok" },
      { label: "Klistra in det i Intric med hög säkerhetsklass", feedback: "Bättre än ChatGPT, men personnummer bör ändå hanteras i dedikerade verksamhetssystem med rätt behörigheter.", quality: "ok" },
    ],
  },
  {
    id: "s4",
    title: "Val av AI-verktyg",
    situation: "Du vill skapa en AI-assistent som svarar på frågor om kommunens personalhandbok. Vilken approach väljer du?",
    category: "intric",
    relatedConceptIds: ["intric-assistent", "rag", "intric-kunskap"],
    options: [
      { label: "Kopiera handboken till ChatGPT och ställ frågor", feedback: "Dåligt val. Personalhandboken kan innehålla intern information. ChatGPT sparar konversationer och data kan användas för träning.", quality: "bad" },
      { label: "Bygg en Intric-assistent med personalhandboken som kunskap", feedback: "Bästa valet! Intric använder RAG för att söka i handboken, data stannar i EU, och assistenten kan delas med hela HR-teamet.", quality: "good" },
      { label: "Skriv en sammanfattning av handboken och dela den", feedback: "Fungerar men skalar inte. Varje gång handboken uppdateras måste du göra om. En AI-assistent med RAG uppdateras automatiskt.", quality: "ok" },
      { label: "Skapa en FAQ-lista manuellt", feedback: "Tidskrävande och begränsande. En AI-assistent kan svara på frågor du inte förutsett, till skillnad från en statisk FAQ.", quality: "ok" },
    ],
  },
  {
    id: "s5",
    title: "Copilot sammanfattar ett möte",
    situation: "Copilot i Teams har sammanfattat ett möte och du märker att en beslutspunkt verkar felaktig — den nämner ett belopp du inte känner igen.",
    category: "copilot",
    relatedConceptIds: ["hallucination", "mansklig-kontroll", "copilot-teams"],
    options: [
      { label: "Lita på Copilot — den har ju transkriptionen", feedback: "Dåligt val. Copilot kan halllucinera eller misstolka ljud, särskilt vid dålig ljudkvalitet eller talare som pratar i mun på varandra.", quality: "bad" },
      { label: "Kolla transkriptionen och lyssna på inspelningen", feedback: "Bästa valet! Verifiera alltid viktiga detaljer mot källan. Copilot är ett hjälpmedel, inte en sanning.", quality: "good" },
      { label: "Fråga en kollega som var med på mötet", feedback: "Bra som komplement, men kollegans minne kan också vara fel. Kontrollera mot transkriptionen för säkerhet.", quality: "ok" },
      { label: "Ta bort beloppet och skriv 'se inspelning'", feedback: "Fungerar som nödlösning, men bättre att verifiera direkt och ha korrekta siffror i protokollet.", quality: "ok" },
    ],
  },
  {
    id: "s6",
    title: "Allmän handling och AI",
    situation: "En journalist begär ut alla chattar med AI-assistenter som kommunen har. Din chef frågar dig vad som gäller.",
    category: "lagar-regler",
    relatedConceptIds: ["offentlighetsprincipen-ai", "gdpr", "ai-sekretess"],
    options: [
      { label: "Alla AI-chattar är sekretessbelagda", feedback: "Fel. Offentlighetsprincipen gäller — AI-chattar kan vara allmänna handlingar och måste bedömas vid begäran.", quality: "bad" },
      { label: "Varje chatt bedöms individuellt — sekretessprövning görs", feedback: "Bästa svaret! Varje handling bedöms individuellt. Vissa delar kan vara sekretessbelagda, men principen är offentlighet.", quality: "good" },
      { label: "AI-chattar räknas inte som handlingar", feedback: "Fel. Om chattar sparas hos myndigheten kan de klassas som allmänna handlingar enligt tryckfrihetsförordningen.", quality: "bad" },
      { label: "Vi lämnar ut allt utan granskning", feedback: "Fel approach. Personuppgifter och eventuell sekretess måste bedömas innan utlämning.", quality: "bad" },
    ],
  },
  {
    id: "s7",
    title: "Promptteknik i praktiken",
    situation: "Du behöver AI:n skriva ett mejl till föräldrar om en förändring i skolmatsedeln. Vilket prompt ger bäst resultat?",
    category: "ai-pa-jobbet",
    relatedConceptIds: ["promptteknik", "prompt", "textgenerering"],
    options: [
      { label: "'Skriv ett mejl om skolmaten'", feedback: "För vagt. AI:n vet inte vem mottagaren är, vad förändringen är, eller vilken ton du vill ha.", quality: "bad" },
      { label: "'Skriv ett kort, vänligt mejl till föräldrar om att skolmatsedeln ändras från vecka 15. Nämn att allergianpassade alternativ finns. Max 150 ord.'", feedback: "Utmärkt! Tydlig mottagare, kontext, specifik info och formatbegränsning. Det här ger ett bra resultat direkt.", quality: "good" },
      { label: "'Skriv mejl om matsedel, kort och snällt'", feedback: "Bättre men saknar detaljer. Vilken förändring? Till vem? Mer kontext = bättre svar.", quality: "ok" },
      { label: "'Du är en skribent. Skriv professionellt.'", feedback: "Persona är bra men det saknas helt kontext om vad mejlet ska handla om.", quality: "bad" },
    ],
  },
  {
    id: "s8",
    title: "AI Act och din verksamhet",
    situation: "Din avdelning vill använda AI för att automatiskt prioritera inkomna socialbidragsansökningar. Vad behöver ni tänka på?",
    category: "lagar-regler",
    relatedConceptIds: ["ai-act", "ai-act-riskkategorier", "dpia", "mansklig-kontroll"],
    options: [
      { label: "Bara köra igång — AI effektiviserar ju", feedback: "Dåligt val. Beslut om socialbidrag påverkar medborgares grundläggande rättigheter — detta klassas troligen som högrisk-AI enligt AI Act.", quality: "bad" },
      { label: "Genomföra DPIA och FRIA, säkerställa mänsklig kontroll, och dokumentera systemet", feedback: "Bästa valet! Högrisk-AI kräver konsekvensbedömning, grundläggande rättighetsanalys, mänsklig översyn och omfattande dokumentation.", quality: "good" },
      { label: "Använda AI som stöd men alltid låta en handläggare fatta beslutet", feedback: "Bra princip med mänsklig kontroll, men formella krav som DPIA och dokumentation måste också uppfyllas innan systemet tas i bruk.", quality: "ok" },
      { label: "Vänta med AI tills reglerna är helt klara", feedback: "Onödigt — reglerna finns redan (AI Act). Bättre att börja med rätt förberedelser och använda AI ansvarsfullt.", quality: "ok" },
    ],
  },
  {
    id: "s9",
    title: "Tredjelandsöverföring",
    situation: "IT-avdelningen vill testa ChatGPT Enterprise för alla kommunanställda. En kollega påpekar att data skickas till USA.",
    category: "lagar-regler",
    relatedConceptIds: ["tredjelandsoverforing", "gdpr", "azure-openai"],
    options: [
      { label: "Det spelar ingen roll — alla använder ju ChatGPT redan", feedback: "Dåligt val. Att andra använder det gör det inte lagligt för kommunen. GDPR kräver rättslig grund för tredjelandsöverföring.", quality: "bad" },
      { label: "Utreda GDPR-konsekvenser, överväga Azure OpenAI (EU-hosting), och genomföra DPIA", feedback: "Bästa valet! Azure OpenAI kan köras i EU-datacenter. En DPIA krävs och PUB-avtal måste finnas.", quality: "good" },
      { label: "Bara blockera ChatGPT för alla", feedback: "Löser GDPR-frågan men missar möjligheten. Bättre att hitta en GDPR-kompatibel lösning.", quality: "ok" },
      { label: "Skriva en policy att anställda inte får mata in persondata", feedback: "En policy hjälper men räcker inte ensam. Tekniska och organisatoriska åtgärder krävs också.", quality: "ok" },
    ],
  },
  {
    id: "s10",
    title: "Säkerhetsklasser i Intric",
    situation: "Du bygger en assistent för HR-avdelningen som ska svara på frågor om medarbetares anställningsvillkor. Vilken säkerhetsklass väljer du?",
    category: "intric",
    relatedConceptIds: ["sakerhetsklasser", "gdpr", "intric-assistent"],
    options: [
      { label: "Öppen — alla modeller tillgängliga", feedback: "Dåligt val. Anställningsvillkor kan innehålla känsliga personuppgifter. Öppen klass tillåter amerikanska modeller dit data kan skickas.", quality: "bad" },
      { label: "Hög säkerhetsklass — bara EU-baserade modeller", feedback: "Bästa valet! HR-data är känslig och bör bara behandlas av modeller inom EU för att uppfylla GDPR.", quality: "good" },
      { label: "Medium — begränsa till EU men tillåt alla EU-modeller", feedback: "Acceptabelt om det innebär att bara EU-baserade modeller används, men välj alltid den högsta nivån för personuppgifter.", quality: "ok" },
      { label: "Bygga assistenten utan kunskap — bara generella svar", feedback: "Missar hela poängen. Utan koppling till era HR-dokument kan assistenten inte ge korrekta svar om era specifika villkor.", quality: "bad" },
    ],
  },

  // --- BILDNINGSFÖRVALTNINGEN ---
  {
    id: "s11",
    title: "Lärare: Elevbedömning med AI",
    situation: "Som lärare vill du använda AI för att snabba upp bedömning av elevuppsatser. Du funderar på att ladda upp uppsatserna i en AI-tjänst.",
    category: "lagar-regler",
    relatedConceptIds: ["gdpr", "informationssakerhet", "intric-plattform"],
    options: [
      { label: "Ladda upp elevuppsatser i ChatGPT", feedback: "Dåligt val. Elevuppsatser innehåller namn och är personuppgifter. Extern AI i USA bryter mot GDPR och skolans dataskyddsriktlinjer.", quality: "bad" },
      { label: "Använda Intric med hög säkerhetsklass och anonymiserade uppsatser", feedback: "Bästa valet! Anonymisera först, använd sedan en EU-baserad lösning. Var transparent mot elever och vårdnadshavare.", quality: "good" },
      { label: "Använda AI för att skapa bedömningsmallar, inte för att läsa elevtexter", feedback: "Smart approach! AI kan hjälpa dig skapa kriterier och exempeltexter utan att du behöver ladda upp elevdata.", quality: "ok" },
      { label: "Be eleverna använda AI själva och bedöma resultatet", feedback: "Intressant pedagogiskt men löser inte bedömningsfrågan. Dessutom behövs en policy kring elevers AI-användning.", quality: "ok" },
    ],
  },
  {
    id: "s12",
    title: "Rektor: AI-policy för skolan",
    situation: "Som rektor ska du ta fram riktlinjer för AI-användning på din skola. Lärare frågar om de och eleverna får använda ChatGPT.",
    category: "lagar-regler",
    relatedConceptIds: ["ai-act-litteracitet", "ansvarsfull-ai", "transparens"],
    options: [
      { label: "Förbjuda all AI-användning", feedback: "Oproportionerligt och orealistiskt. AI-kompetens är en del av digital kompetens som läroplanen kräver. Bättre att styra användningen.", quality: "bad" },
      { label: "Skapa tydliga riktlinjer: när, hur och vilka verktyg som får användas", feedback: "Bästa valet! Riktlinjer bör täcka vilka verktyg som är godkända, hur persondata hanteras, och vilken transparens som krävs.", quality: "good" },
      { label: "Låta varje lärare bestämma själv", feedback: "Riskfyllt utan samordning. Otydliga regler kan leda till GDPR-brott och ojämlik undervisning.", quality: "bad" },
      { label: "Vänta på nationella riktlinjer", feedback: "DIGG och Skolverket har redan publicerat vägledning. Ni kan agera nu med stöd av befintliga riktlinjer.", quality: "ok" },
    ],
  },
  {
    id: "s13",
    title: "Pedagog: Lektionsplanering med AI",
    situation: "Du är pedagog i förskolan och vill använda AI för att skapa aktivitetsplaner anpassade efter barngruppens behov och intressen.",
    category: "ai-pa-jobbet",
    relatedConceptIds: ["promptteknik", "intric-assistent", "textgenerering"],
    options: [
      { label: "Beskriva barnens namn och behov i ChatGPT", feedback: "Dåligt val. Information om barns specifika behov är känslig. Använd inte externa AI-tjänster med identifierbar information om barn.", quality: "bad" },
      { label: "Använda AI med generella beskrivningar utan personuppgifter", feedback: "Bästa valet! Beskriv åldersgrupp och intressen generellt: 'aktiviteter för 4-åringar som gillar djur och natur' — inga namn eller känsliga detaljer.", quality: "good" },
      { label: "Bygga en Intric-assistent med läroplanen som kunskap", feedback: "Utmärkt komplement! En assistent med Lpfö18 som kunskapsbas kan ge pedagogiskt grundade förslag anpassade efter läroplanen.", quality: "good" },
      { label: "Hoppa över AI och göra allt manuellt", feedback: "Fungerar men du missar möjligheten att få inspiration och spara tid. AI kan komplettera din expertis.", quality: "ok" },
    ],
  },

  // --- SOCIAL- OCH OMSORGSFÖRVALTNINGEN ---
  {
    id: "s14",
    title: "Sjuksköterska: Journalanteckningar med AI",
    situation: "Som sjuksköterska i hemtjänsten vill du använda AI för att snabba upp dokumentation av hembesök. Du funderar på att diktera och transkribera med AI.",
    category: "sakerhet-etik",
    relatedConceptIds: ["transkribering", "gdpr", "informationssakerhet"],
    options: [
      { label: "Diktera direkt i ChatGPT:s röstfunktion", feedback: "Dåligt val. Hälsoinformation är känsliga personuppgifter. Extern AI-transkribering bryter mot GDPR och patientdatalagen.", quality: "bad" },
      { label: "Använda kommunens godkända journalsystem med inbyggd diktering", feedback: "Bästa valet! Journalsystemet har rätt säkerhet, behörigheter och GDPR-skydd för patientdata.", quality: "good" },
      { label: "Diktera i Intric med högsta säkerhetsklassen", feedback: "Bättre än ChatGPT, men patientdata bör alltid hanteras i dedikerade journalsystem med rätt behörighetskontroll.", quality: "ok" },
      { label: "Skriva manuellt på papper och överföra senare", feedback: "Fungerar men ineffektivt och skapar risk för förlorade anteckningar. Digitala journalsystem finns av en anledning.", quality: "ok" },
    ],
  },
  {
    id: "s15",
    title: "Handläggare: Socialbidragsbedömning",
    situation: "Som handläggare på socialförvaltningen föreslår din chef att ni testar AI för att effektivisera bedömningen av ekonomiskt bistånd.",
    category: "lagar-regler",
    relatedConceptIds: ["ai-act-riskkategorier", "dpia", "mansklig-kontroll", "ai-beslutsfattande"],
    options: [
      { label: "Låta AI fatta besluten automatiskt", feedback: "Förbjudet. Automatiserat beslutsfattande om socialbidrag påverkar grundläggande rättigheter och klassas som högrisk-AI enligt AI Act.", quality: "bad" },
      { label: "Använda AI som beslutsstöd — AI sammanfattar, handläggaren beslutar", feedback: "Bästa valet! AI kan sammanfatta underlag och flagga relevant information, men handläggaren fattar alltid beslutet. Kräver DPIA.", quality: "good" },
      { label: "Prova med anonymiserade ärenden först", feedback: "Bra startpunkt för pilot, men ni behöver fortfarande genomföra DPIA och säkerställa mänsklig kontroll innan skarp användning.", quality: "ok" },
      { label: "Avvakta tills tekniken är mognare", feedback: "AI kan redan hjälpa — som sammanfattningsverktyg. Väntar ni missar effektiviseringsmöjligheter som frigör tid för klientkontakt.", quality: "ok" },
    ],
  },
  {
    id: "s16",
    title: "Omsorgspersonal: AI för aktivitetsplanering",
    situation: "Du arbetar på ett äldreboende och vill använda AI för att skapa individuella aktivitetsplaner baserade på de boendes intressen.",
    category: "ai-pa-jobbet",
    relatedConceptIds: ["promptteknik", "intric-assistent", "gdpr"],
    options: [
      { label: "Skriva de boendes namn och hälsotillstånd i ChatGPT", feedback: "Dåligt val. Hälsouppgifter om identifierbara individer är särskilt känsliga personuppgifter och får inte delas med extern AI.", quality: "bad" },
      { label: "Be AI om generella aktivitetsidéer: 'aktiviteter för äldre som gillar musik och trädgård'", feedback: "Bästa valet! Använd AI för inspiration med generella beskrivningar. Anpassa sedan till individerna med din expertis.", quality: "good" },
      { label: "Bygga en Intric-assistent med verksamhetens aktivitetsguide som kunskap", feedback: "Bra komplement! Assistenten kan ge förslag baserade på er egen beprövade metodik och evidensbaserade aktiviteter.", quality: "good" },
      { label: "Fråga AI om medicinska rekommendationer", feedback: "AI ska aldrig användas för medicinska beslut. Medicinsk rådgivning kräver legitimerad hälso- och sjukvårdspersonal.", quality: "bad" },
    ],
  },

  // --- KOMMUNLEDNINGSFÖRVALTNINGEN ---
  {
    id: "s17",
    title: "Kommunikatör: Pressmeddelande med AI",
    situation: "Som kommunikatör ska du snabbt skriva ett pressmeddelande om en ny satsning. Du vill använda AI för att skapa ett utkast.",
    category: "ai-pa-jobbet",
    relatedConceptIds: ["textgenerering", "promptteknik", "transparens"],
    options: [
      { label: "Be AI skriva hela pressmeddelandet och publicera direkt", feedback: "Dåligt val. AI-genererad text måste alltid granskas. Felaktiga påståenden i ett pressmeddelande kan skada kommunens trovärdighet.", quality: "bad" },
      { label: "Ge AI detaljerad kontext och fakta, granska utkastet noggrant, och ange att AI använts som stöd", feedback: "Bästa valet! Du sparar tid med utkastet, säkerställer kvalitet genom granskning, och är transparent.", quality: "good" },
      { label: "Använda AI för disposition och sedan skriva själv", feedback: "Bra mellanväg. AI kan ge struktur och idéer, men du behåller full kontroll över ordval och ton.", quality: "ok" },
      { label: "Använda AI men inte berätta det", feedback: "Inte rekommenderat. Transparens om AI-användning bygger förtroende. I en kommun är tillit centralt.", quality: "ok" },
    ],
  },
  {
    id: "s18",
    title: "Chef: AI-strategi för avdelningen",
    situation: "Som avdelningschef ska du presentera en plan för AI-användning på din avdelning. Förvaltningschefen frågar hur ni tänker kring risker.",
    category: "lagar-regler",
    relatedConceptIds: ["ansvarsfull-ai", "ai-act", "dpia", "informationsklassificering"],
    options: [
      { label: "Vi testar olika gratisverktyg och ser vad som fungerar", feedback: "Riskfyllt. Gratisverktyg kan ha otydliga datavillkor. Ni behöver en strukturerad approach med godkända verktyg.", quality: "bad" },
      { label: "Kartlägga användningsfall, klassificera data, välja godkända verktyg, utbilda personal", feedback: "Bästa valet! En strukturerad plan: identifiera var AI tillför värde, bedöm riskerna, välj rätt verktyg, och bygg kompetens.", quality: "good" },
      { label: "Vänta tills IT-avdelningen säger vad vi får använda", feedback: "IT bör vara med, men verksamheten måste driva behovsanalysen. AI-strategi kräver samarbete mellan verksamhet och IT.", quality: "ok" },
      { label: "Köpa in en AI-konsult", feedback: "Kan vara värdefullt, men ni behöver intern kompetens för att äga strategin långsiktigt. Kombination kan fungera.", quality: "ok" },
    ],
  },
  {
    id: "s19",
    title: "Ekonom: Budgetanalys med AI",
    situation: "Som ekonom vill du använda AI för att analysera budgetavvikelser och ta fram prognoser baserat på historisk data.",
    category: "ai-pa-jobbet",
    relatedConceptIds: ["copilot-excel", "sammanfattning", "hallucination"],
    options: [
      { label: "Ladda upp hela budgetfilen i ChatGPT", feedback: "Dåligt val. Ekonomisk data kan vara känslig och intern. ChatGPT är inte godkänt för kommunens budgetdata.", quality: "bad" },
      { label: "Använda Copilot i Excel (om licensierat) eller Intric med EU-modeller", feedback: "Bästa valet! Copilot i Excel analyserar data direkt i din miljö. Intric med rätt säkerhetsklass håller data i EU.", quality: "good" },
      { label: "Exportera aggregerad, anonymiserad data och analysera med AI", feedback: "Bra kompromiss. Aggregerade siffror utan personkoppling kan ofta användas i AI-verktyg.", quality: "ok" },
      { label: "Lita helt på AI:ns prognos", feedback: "AI kan halllucinera även med siffror. Alltid dubbelkolla beräkningar och jämför med era egna modeller.", quality: "bad" },
    ],
  },

  // --- SAMHÄLLSBYGGNADSFÖRVALTNINGEN ---
  {
    id: "s20",
    title: "Bygglovshandläggare: AI för ärendesortering",
    situation: "Bygglovsavdelningen får hundratals ärenden per månad. Ni vill testa AI för att automatiskt kategorisera och prioritera inkomna ansökningar.",
    category: "ai-pa-jobbet",
    relatedConceptIds: ["arendehantering-ai", "automatisering", "mansklig-kontroll"],
    options: [
      { label: "Låta AI automatiskt godkänna enkla ärenden", feedback: "Dåligt val. Bygglovsbeslut är myndighetsutövning och kräver alltid mänsklig bedömning. AI kan assistera men inte besluta.", quality: "bad" },
      { label: "Använda AI för att kategorisera, prioritera och förbereda ärenden — handläggaren beslutar", feedback: "Bästa valet! AI snabbar upp sorteringen medan handläggaren behåller beslutanderätten. Mänsklig kontroll bevarad.", quality: "good" },
      { label: "Börja med en pilot på en ärendekategori", feedback: "Bra approach. Begränsa scopet, utvärdera resultat, och skala sedan. Men säkerställ DPIA först.", quality: "ok" },
      { label: "Anställa fler handläggare istället", feedback: "Löser kapacitetsproblemet men missar effektiviseringsmöjligheten. AI och fler handläggare kan komplettera varandra.", quality: "ok" },
    ],
  },
  {
    id: "s21",
    title: "Miljöinspektör: AI för tillsynsrapporter",
    situation: "Som miljöinspektör vill du använda AI för att snabba upp skrivandet av tillsynsrapporter efter platsbesök.",
    category: "ai-pa-jobbet",
    relatedConceptIds: ["textgenerering", "promptteknik", "intric-assistent"],
    options: [
      { label: "Diktera observationer och låta AI skriva rapporten direkt", feedback: "Riskfyllt utan granskning. Tillsynsrapporter har juridisk vikt och måste vara korrekta. AI-text måste alltid granskas.", quality: "ok" },
      { label: "Bygga en Intric-assistent med rapportmallar och regelverk som kunskap", feedback: "Bästa valet! Assistenten kan skriva utkast baserade på era faktiska mallar och regelverk, vilket ger konsistenta rapporter.", quality: "good" },
      { label: "Använda ChatGPT med din standard-rapportmall", feedback: "ChatGPT har inte tillgång till era specifika regelverk. Dessutom kan inspektionsdetaljer vara känsliga.", quality: "bad" },
      { label: "Fortsätta skriva manuellt", feedback: "Säkert men tidskrävande. En AI-assistent med rätt underlag kan halvera tiden för rapportskrivning.", quality: "ok" },
    ],
  },

  // --- KULTUR- OCH TURISMFÖRVALTNINGEN ---
  {
    id: "s22",
    title: "Bibliotekarie: AI-hjälp för besökare",
    situation: "Biblioteket vill erbjuda en AI-chatbot som hjälper besökare att hitta böcker och information. Hur bör ni gå tillväga?",
    category: "intric",
    relatedConceptIds: ["intric-assistent", "intric-kunskap", "chatbot"],
    options: [
      { label: "Bädda in ChatGPT på bibliotekets webbsida", feedback: "Dåligt val. ChatGPT kan ge felaktiga bokrekommendationer (hallucination) och ni har ingen kontroll över svaren.", quality: "bad" },
      { label: "Bygga en Intric-assistent med bibliotekets katalog och information som kunskap", feedback: "Bästa valet! RAG-baserad assistent som söker i er faktiska katalog och information — korrekta svar, kontrollerad upplevelse.", quality: "good" },
      { label: "Skapa en enkel FAQ-chatbot med förprogrammerade svar", feedback: "Fungerar för vanliga frågor men kan inte hantera oväntade förfrågningar. En AI-assistent är mer flexibel.", quality: "ok" },
      { label: "Bara hänvisa till hemsidan", feedback: "Missar möjligheten att ge personlig hjälp dygnet runt. En AI-assistent kan svara utanför öppettiderna.", quality: "ok" },
    ],
  },

  // --- IT-AVDELNINGEN ---
  {
    id: "s23",
    title: "IT: Intric-space för hela kommunen",
    situation: "IT-avdelningen ska sätta upp Intric-spaces för kommunens förvaltningar. Hur organiserar ni det bäst?",
    category: "intric",
    relatedConceptIds: ["intric-space", "intric-roller", "sakerhetsklasser"],
    options: [
      { label: "Ett enda Space för hela kommunen", feedback: "Dåligt val. Olika förvaltningar har olika datakänslighet. Ett space gör det svårt att separera behörigheter och säkerhetsklasser.", quality: "bad" },
      { label: "Separata Spaces per förvaltning med rätt säkerhetsklass och rollstruktur", feedback: "Bästa valet! Varje förvaltning får ett eget Space med anpassad säkerhetsklass, roller och kunskapskällor.", quality: "good" },
      { label: "Separata Spaces per projekt", feedback: "Kan fungera men riskerar fragmentering. Förvaltningsbaserad struktur med projekt-samlingar inom varje Space är bättre.", quality: "ok" },
      { label: "Alla får personlig chatt men inga Spaces", feedback: "Missar Intrics styrka. Utan Spaces och kunskap kan assistenterna inte ge verksamhetsspecifika svar.", quality: "bad" },
    ],
  },
  {
    id: "s24",
    title: "IT: Val av AI-modell i Intric",
    situation: "En förvaltning vill ha den snabbaste och billigaste AI-modellen i sitt Intric-space. Spacet hanterar intern personalinformation.",
    category: "intric",
    relatedConceptIds: ["sakerhetsklasser", "lokal-ai-vs-moln", "gdpr"],
    options: [
      { label: "Välj GPT-5.3 — det är populärast", feedback: "Inte per automatik rätt. GPT-modeller behandlas hos OpenAI (USA). Med personaldata måste ni beakta tredjelandsöverföring.", quality: "ok" },
      { label: "Sätt hög säkerhetsklass så bara EU-baserade modeller visas, och välj den bästa därifrån", feedback: "Bästa valet! Med personaldata måste data stanna i EU. Säkerhetsklassen filtrerar bort olämpliga modeller automatiskt.", quality: "good" },
      { label: "Använda en gratis open source-modell", feedback: "Open source kan vara bra, men avgörande är VAR modellen körs — den måste köras i EU för personaldata.", quality: "ok" },
      { label: "Fråga leverantören vad de rekommenderar", feedback: "Intric kan rådge, men det är kommunen som personuppgiftsansvarig som måste bedöma vilken säkerhetsnivå som krävs.", quality: "ok" },
    ],
  },

  // --- ADMINISTRATIVA ROLLER ---
  {
    id: "s25",
    title: "Administratör: Möteshantering med Copilot",
    situation: "Som administratör förbereder du dagordningar och skriver mötesprotokoll för nämndsammanträden. Din chef föreslår att ni börjar använda Copilot i Teams.",
    category: "copilot",
    relatedConceptIds: ["copilot-teams", "motessammanfattning", "offentlighetsprincipen-ai"],
    options: [
      { label: "Aktivera Copilot och låta den skriva alla protokoll automatiskt", feedback: "Riskfyllt. Nämndprotokoll är officiella handlingar. AI-genererade protokoll måste alltid granskas av den som ansvarar.", quality: "bad" },
      { label: "Använda Copilot som stöd — den transkriberar och sammanfattar, du redigerar och godkänner", feedback: "Bästa valet! Copilot snabbar upp arbetet men du behåller ansvaret. Verifiera alla beslutspunkter.", quality: "good" },
      { label: "Bara använda transkriberingen, inte sammanfattningen", feedback: "Säkert men du missar halva nyttan. Sammanfattningen sparar tid — granska den bara noggrant.", quality: "ok" },
      { label: "Vänta tills alla nämndmedlemmar godkänt AI-användning", feedback: "Bra att informera, men beslutet om verktyg ligger hos tjänstemannaorganisationen, inte nämnden.", quality: "ok" },
    ],
  },
  {
    id: "s26",
    title: "HR: Rekrytering med AI-stöd",
    situation: "HR-avdelningen vill använda AI för att screena CV:n och rangordna kandidater i en rekryteringsprocess.",
    category: "sakerhet-etik",
    relatedConceptIds: ["bias", "ai-act-riskkategorier", "mansklig-kontroll", "dpia"],
    options: [
      { label: "Låta AI rangordna kandidater automatiskt", feedback: "Högrisk enligt AI Act! Rekrytering påverkar individers rättigheter. AI-baserad screening kräver DPIA, biasgranskning och mänsklig kontroll.", quality: "bad" },
      { label: "Använda AI för att sammanfatta CV:n — rekryteraren bedömer", feedback: "Bästa valet! AI sammanfattar och strukturerar, men rekryteraren gör bedömningen. Minskar bias-risk vid korrekt användning.", quality: "good" },
      { label: "Testa med anonymiserade CV:n först och utvärdera bias", feedback: "Bra pilotapproach! Testa, mät bias, och justera innan skarp användning. Men glöm inte formell DPIA.", quality: "ok" },
      { label: "Hoppa över AI och screena manuellt", feedback: "Säkert men tidskrävande. Manuell screening kan också ha bias. AI som stöd (inte beslutsfattare) kan faktiskt minska partiskhet.", quality: "ok" },
    ],
  },

  // --- INTRIC-SPECIFIKA ---
  {
    id: "s27",
    title: "Intric: Bygga avtalskontrollsassistent",
    situation: "Juridiska avdelningen vill bygga en Intric-assistent som kan svara på frågor om kommunens ramavtal. Hur sätter du upp den?",
    category: "intric",
    relatedConceptIds: ["intric-assistent", "intric-kunskap", "intric-samling", "rag"],
    options: [
      { label: "Skapa assistenten utan att ladda upp avtal — GPT vet ju det mesta", feedback: "Dåligt val. GPT har inte tillgång till era specifika avtal. Utan RAG-kunskap blir svaren generella och potentiellt felaktiga.", quality: "bad" },
      { label: "Skapa Space, ladda upp avtal i samlingar, konfigurera prompt med uppgift och begränsningar", feedback: "Bästa valet! Ladda upp avtalen, ge assistenten en tydlig prompt ('svara bara baserat på uppladdade avtal'), och sätt rätt säkerhetsklass.", quality: "good" },
      { label: "Kopiera avtalen till assistentens prompt-fält", feedback: "Promptfältet är för instruktioner, inte dokument. Avtal ska laddas upp som Kunskap så RAG kan söka i dem.", quality: "bad" },
      { label: "Använda bilagor istället för kunskap", feedback: "Bilagor är för stående instruktioner assistenten alltid läser. Avtal är bättre som Kunskap — sökbar vid behov.", quality: "ok" },
    ],
  },
  {
    id: "s28",
    title: "Intric: Data retention för känslig assistent",
    situation: "Du har byggt en Intric-assistent för medarbetarsamtal. Chefer chattar med den om personalärenden. Hur lång data retention väljer du?",
    category: "intric",
    relatedConceptIds: ["intric-data-retention", "gdpr", "informationssakerhet"],
    options: [
      { label: "Ingen radering — konversationerna kan vara bra att ha kvar", feedback: "Riskfyllt. Konversationer om personalärenden är känsliga personuppgifter. Lagringsminimering är en GDPR-princip.", quality: "bad" },
      { label: "7 dagars retention — kort nog för GDPR, långt nog för uppföljning", feedback: "Bästa valet! Kort retention minskar risken vid dataintrång. Chefer kan exportera svar de behöver spara i rätt system.", quality: "good" },
      { label: "30 dagars retention", feedback: "Acceptabelt men onödigt långt för känslig data. Ju kortare retention, desto lägre risk.", quality: "ok" },
      { label: "365 dagars retention", feedback: "Alldeles för långt för personaldata. Bryter troligen mot principen om lagringsminimering i GDPR.", quality: "bad" },
    ],
  },
  {
    id: "s29",
    title: "Intric: Webbcrawling för medborgartjänst",
    situation: "Du vill att kommunens Intric-assistent ska kunna svara på frågor om kommunens tjänster. Hur ger du den rätt kunskap?",
    category: "intric",
    relatedConceptIds: ["webbcrawling", "intric-kunskap", "intric-samling"],
    options: [
      { label: "Manuellt kopiera text från hemsidan till dokument och ladda upp", feedback: "Fungerar men ineffektivt och svårt att hålla uppdaterat. Varje gång hemsidan ändras måste du göra om.", quality: "ok" },
      { label: "Använda Intrics webbcrawling — peka på kommunens hemsida", feedback: "Bästa valet! Intric crawlar hemsidan automatiskt och indexerar innehållet. Ställ in uppdateringsfrekvens för att hålla kunskapen aktuell.", quality: "good" },
      { label: "Ge assistenten tillgång till internet via webbsökning", feedback: "Webbsökning ger breda internetsvar, inte specifikt er information. Crawling av er specifika sida är mer precist.", quality: "ok" },
      { label: "Skriva all information i assistentens prompt", feedback: "Prompten har begränsat utrymme och är till för instruktioner, inte data. Kunskap ska in via samlingar eller crawling.", quality: "bad" },
    ],
  },
  {
    id: "s30",
    title: "Intric: MCP-integration med Kolada",
    situation: "Kommunens ledningsgrupp vill snabbt kunna fråga 'Hur ligger Katrineholm till jämfört med andra kommuner?' Hur löser du det i Intric?",
    category: "intric",
    relatedConceptIds: ["mcp-server", "intric-assistent", "oppna-data"],
    options: [
      { label: "Manuellt ladda ner statistik från Kolada och ladda upp i Intric", feedback: "Fungerar tillfälligt men data blir snabbt inaktuell. Varje gång ny statistik publiceras måste du uppdatera manuellt.", quality: "ok" },
      { label: "Aktivera Kolada MCP-servern i Intric och bygga en statistikassistent", feedback: "Bästa valet! MCP-integrationen hämtar aktuella data direkt från Kolada i realtid. Alltid uppdaterad statistik.", quality: "good" },
      { label: "Be assistenten söka på webben efter statistik", feedback: "Opålitligt. Webbsökning kan ge gammal eller felaktig statistik. MCP-kopplingen mot Kolada är mer precis.", quality: "ok" },
      { label: "Ge ledningsgruppen tillgång till Kolada direkt", feedback: "Kolada kräver att man kan navigera gränssnittet. En AI-assistent gör statistiken tillgänglig med naturligt språk.", quality: "ok" },
    ],
  },
];
