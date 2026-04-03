// =============================================================================
// LATHUNDAR — Guide data for Intric platform guides
// =============================================================================

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export type GuideAudience = "user" | "creator" | "space-admin" | "owner";

export interface GuideExample {
  /** What you want to do */
  task: string;
  /** What to write/do */
  prompt: string;
}

export interface CensorZone {
  /** Position and size as percentage of image dimensions */
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface GuideImage {
  src: string;
  alt: string;
  caption?: string;
  /** Areas to blur (e.g. names, personal info) */
  censorZones?: CensorZone[];
}

export interface GuideStep {
  id: string;
  title: string;
  description: string;
  /** Detailed instructions shown in the step view */
  instructions: string[];
  /** Practical examples */
  examples?: GuideExample[];
  /** Screenshots (supports multiple per step) */
  images?: GuideImage[];
  /** Optional tip box */
  tip?: string;
  /** Optional warning box */
  warning?: string;
}

export interface Guide {
  id: string;
  title: string;
  description: string;
  /** Target audience */
  audience: GuideAudience;
  /** Audience label in Swedish */
  audienceLabel: string;
  /** Lucide icon name */
  icon: string;
  /** Estimated time in minutes */
  estimatedMinutes: number;
  /** Order within audience group */
  order: number;
  /** Guide steps */
  steps: GuideStep[];
}

// ---------------------------------------------------------------------------
// Audience labels
// ---------------------------------------------------------------------------

export const AUDIENCE_LABELS: Record<GuideAudience, string> = {
  user: "Alla användare",
  creator: "Creators / Redigerare",
  "space-admin": "Space-admins",
  owner: "Organisationsadmins",
};

export const AUDIENCE_COLORS: Record<GuideAudience, string> = {
  user: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300",
  creator: "bg-sky-100 text-sky-800 dark:bg-sky-900/30 dark:text-sky-300",
  "space-admin": "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300",
  owner: "bg-violet-100 text-violet-800 dark:bg-violet-900/30 dark:text-violet-300",
};

// ---------------------------------------------------------------------------
// Guide #1: Personlig chatt
// ---------------------------------------------------------------------------

const IMG = "/images/lathundar/personlig-chatt";

const GUIDE_PERSONLIG_CHATT: Guide = {
  id: "personlig-chatt",
  title: "Personlig chatt",
  description:
    "Lär dig använda Intrics personliga chatt — välj modell, ställ frågor, bifoga filer och använd mikrofonen.",
  audience: "user",
  audienceLabel: AUDIENCE_LABELS.user,
  icon: "MessageSquare",
  estimatedMinutes: 5,
  order: 1,
  steps: [
    {
      id: "steg-1",
      title: "Öppna den personliga chatten",
      description: "Logga in och hitta den personliga chatten.",
      instructions: [
        "Gå till katrineholm.intric.ai och logga in med ditt AD-konto.",
        "Du landar direkt i den personliga chatten — \"Personlig assistent\".",
        "I toppmenyn ser du flikarna \"Chatt\" och \"Space\". Chatten är din privata AI-assistent.",
        "Ingen annan kan se dina konversationer här.",
      ],
      images: [
        {
          src: `${IMG}/chatt-vy.png`,
          alt: "Intric personlig chatt — huvudvyn med välkomstmeddelande och textfält",
          caption: "Huvudvyn i den personliga chatten. Modellväljaren syns uppe till höger och textfältet längst ner.",
          censorZones: [
            { x: 41.5, y: 39, width: 7, height: 3.5 },
          ],
        },
      ],
      tip: "Bokmärk sidan för snabb åtkomst. Intric fungerar bäst i Chrome eller Edge.",
    },
    {
      id: "steg-2",
      title: "Välj AI-modell",
      description: "Olika modeller passar för olika uppgifter.",
      instructions: [
        "Klicka på modellväljaren uppe till höger (visar t.ex. \"Claude 4.6 Sonnet\").",
        "En lista med tillgängliga modeller visas — Claude, GPT, Llama, Mistral med flera.",
        "Varje modell har indikatorer för hastighet och intelligens.",
        "Ska du använda AI som allmänt stöd utan känslig information kan du välja fritt mellan alla tillgängliga modeller.",
        "Är du osäker om du hanterar känsliga dokument eller information — välj alltid \"Swedish Hosted — Managed by Intric\" som körs lokalt i Sverige.",
      ],
      images: [
        {
          src: `${IMG}/modellvaljare.png`,
          alt: "Modellväljaren i Intric — lista med alla tillgängliga AI-modeller",
          caption: "Modellväljaren visar alla modeller med indikatorer för hastighet och intelligens. Bockmarkeringen visar vilken som är vald.",
        },
      ],
      examples: [
        {
          task: "Allmänt AI-stöd (ej känsligt)",
          prompt: "Välj valfri modell — t.ex. GPT-4.1, Claude 4.5 Haiku eller GPT-5 mini. Alla fungerar bra för texter, sammanfattningar och analys.",
        },
        {
          task: "Känslig information eller dokument",
          prompt: "Välj \"Swedish Hosted — Managed by Intric\". Data stannar i Sverige och lämnar aldrig EU.",
        },
      ],
      warning:
        "Skriv ALDRIG personnummer, lösenord eller annan känslig information med molnmodeller (Claude, GPT). Välj \"Swedish Hosted\" för allt som kan vara känsligt.",
    },
    {
      id: "steg-3",
      title: "Ställ en fråga",
      description: "Skriv din fråga eller uppgift i textfältet.",
      instructions: [
        "Klicka i textfältet \"Ställ en fråga...\" längst ner på sidan.",
        "Var tydlig och specifik — ju mer kontext du ger, desto bättre svar.",
        "Klicka på \"Skicka\" eller tryck Enter.",
      ],
      examples: [
        {
          task: "Skriva ett mail till en medborgare",
          prompt: "Skriv ett professionellt mail till en medborgare som frågar om bygglov. Tonen ska vara vänlig och informativ. Inkludera handläggningstid och kontaktuppgifter.",
        },
        {
          task: "Sammanfatta mötesanteckningar",
          prompt: "Sammanfatta dessa mötesanteckningar i 5 punkter. Markera beslut med ✅ och öppna frågor med ❓.",
        },
        {
          task: "Skriva en kortfattad rapport",
          prompt: "Skriv ett utkast till en kvartalsrapport om digitalisering i kommunen. Inkludera rubriker för bakgrund, genomförda insatser och nästa steg.",
        },
      ],
      images: [
        {
          src: `${IMG}/textfalt.png`,
          alt: "Textfältet i Intric med ikoner för bifoga fil, mikrofon och planer",
          caption: "Textfältet med tre ikoner: gem (bifoga fil), mikrofon (diktera) och planer-ikonen.",
        },
      ],
      tip: "Du kan ställa följdfrågor i samma konversation — AI:n minns hela samtalet.",
    },
    {
      id: "steg-4",
      title: "Bifoga filer & diktera",
      description: "Ladda upp dokument eller tala istället för att skriva.",
      instructions: [
        "Gem-ikonen (första ikonen) — klicka för att bifoga filer. PDF, Word, Excel, PowerPoint och CSV stöds.",
        "Mikrofon-ikonen (andra ikonen) — klicka för att diktera med rösten. Transkriberas automatiskt med KB-Whisper SWE (svensk modell).",
        "Planer-ikonen (tredje ikonen) — används för att visa och köra sparade planer (se steg 7).",
        "Du kan bifoga flera filer och ställa frågor om dem.",
      ],
      examples: [
        {
          task: "Analysera ett dokument",
          prompt: "[Bifoga PDF] Sammanfatta det här dokumentet i 5 punkter och lista eventuella beslut.",
        },
        {
          task: "Jämföra två filer",
          prompt: "[Bifoga fil 1 + fil 2] Jämför dessa två dokument och lista skillnaderna.",
        },
        {
          task: "Diktera ett meddelande",
          prompt: "[Klicka mikrofon] \"Hej, jag vill skriva ett PM om nya rutiner för reseräkningar...\" → redigera texten → skicka.",
        },
      ],
      images: [
        {
          src: `${IMG}/textfalt.png`,
          alt: "Närbild på textfältet med gem-, mikrofon- och planer-ikoner",
          caption: "Från vänster: gem (bifoga fil), mikrofon (diktera), planer (visa/köra sparade planer).",
        },
      ],
      warning: "Bifoga inte dokument med känsliga personuppgifter till molnmodeller. Välj \"Swedish Hosted\" för känsliga filer.",
      tip: "Mikrofonen är perfekt för att snabbt diktera längre texter. Texten visas i fältet så du kan redigera innan du skickar.",
    },
    {
      id: "steg-5",
      title: "Se assistentens info & förmågor",
      description: "Klicka på info-ikonen för att se vilka förmågor assistenten har.",
      instructions: [
        "Klicka på ⓘ-ikonen bredvid \"Personlig assistent\" uppe till vänster.",
        "En panel öppnas med detaljerad information om assistenten.",
        "Du ser vilken språkmodell som används, transkriptionsmodell (KB-Whisper SWE), och metadata.",
        "Under \"Ytterligare förmågor\" ser du vilka verktyg assistenten har tillgång till — t.ex. Webbsökning, Kolada, SCB, OneDrive, SharePoint, och fler.",
        "Datalagringspolicy visas längst ner.",
      ],
      images: [
        {
          src: `${IMG}/info-panel.png`,
          alt: "Info-panelen med språkmodell, transkription, förmågor och inställningar",
          caption: "Info-panelen visar modell (Claude 4.6 Sonnet), transkription (KB-Whisper SWE), och alla verktyg som Kolada, SCB, SharePoint m.fl.",
        },
      ],
    },
    {
      id: "steg-6",
      title: "Historik & nya konversationer",
      description: "Starta nya chattar och hitta tidigare konversationer.",
      instructions: [
        "Klicka på \"Historik\" i toppmenyn (bredvid \"Chatt\") för att se alla tidigare konversationer.",
        "Konversationerna visas i en lista med namn och datum. Du kan söka med \"Filtrera sessioner\".",
        "Klicka på en konversation för att öppna den, eller använd penn-ikonen för att byta namn och papperskorgen för att radera.",
        "Klicka på \"Ny konversation\" (blå knappen uppe till höger) för att starta en ny chatt.",
      ],
      images: [
        {
          src: `${IMG}/historik-vy.png`,
          alt: "Historik-vyn i Intric med lista över sparade konversationer",
          caption: "Historik-fliken visar sparade konversationer med namn och datum. Använd sökfältet för att filtrera.",
        },
      ],
      tip: "Starta en ny chatt för varje ny uppgift så att AI:n inte blandar ihop sammanhang. Du kan alltid gå tillbaka till en gammal konversation.",
    },
    {
      id: "steg-7",
      title: "Planer (beta)",
      description: "Låt AI:n skapa flerstegsuppgifter som körs automatiskt i bakgrunden.",
      instructions: [
        "Planer är en beta-funktion som låter AI:n dela upp en uppgift i flera steg och utföra dem i ordning.",
        "Be assistenten skapa en plan — t.ex. \"Skapa en plan för att onboarda nya teammedlemmar\". AI:n bryter ner uppgiften i tydliga steg.",
        "Klicka på bokmärke-ikonen på en plan för att spara den. Sparade planer hittar du via planer-ikonen i textfältet.",
        "Du kan köra en sparad plan när som helst — öppna planer-panelen och klicka på den plan du vill köra. Assistenten utför varje steg automatiskt.",
      ],
      examples: [
        {
          task: "Onboarding av ny medarbetare",
          prompt: "Skapa en plan för att onboarda en ny medarbetare på kommunen. Inkludera IT-konton, introduktionsmöten och systemåtkomst.",
        },
        {
          task: "Veckorapport",
          prompt: "Skapa en plan för att sammanställa en veckorapport. Stegen ska inkludera datainsamling, sammanfattning och distribution.",
        },
      ],
      images: [
        {
          src: `${IMG}/planer-steg3.png`,
          alt: "Skapa en plan — AI:n bryter ner uppgiften i steg",
          caption: "Steg 1: Be assistenten skapa en plan. AI:n delar upp arbetet i genomförbara steg.",
        },
        {
          src: `${IMG}/planer-steg1.png`,
          alt: "Kör sparade planer när som helst",
          caption: "Steg 2: Öppna planer-panelen och kör en sparad plan direkt. Assistenten utför varje steg.",
        },
        {
          src: `${IMG}/planer-steg2.png`,
          alt: "Bokmärk din plan för att spara den",
          caption: "Steg 3: Bokmärk planen så att du kan hitta och köra den igen senare.",
        },
      ],
      tip: "Planer är perfekt för återkommande arbetsflöden — t.ex. veckorapporter, onboarding-checklistor eller mötesförberedelser.",
    },
    {
      id: "steg-8",
      title: "Kontoinställningar",
      description: "Hantera ditt konto och logga ut.",
      instructions: [
        "Klicka på profil-ikonen uppe till höger för att öppna kontomenyn.",
        "\"Mitt konto\" — hantera dina inställningar.",
        "\"Testa nya intric\" — provkör nya funktioner innan de släpps.",
        "\"Logga ut\" — loggar ut dig från Intric.",
      ],
      images: [
        {
          src: `${IMG}/personlig-assistent-header.png`,
          alt: "Toppmenyn i Intric med profil- och kontoinställningar",
          caption: "Klicka på profil-ikonen uppe till höger för att öppna kontomenyn.",
        },
      ],
    },
  ],
};

// ---------------------------------------------------------------------------
// All guides (more will be added)
// ---------------------------------------------------------------------------

export const GUIDES: Guide[] = [
  GUIDE_PERSONLIG_CHATT,
];

// ---------------------------------------------------------------------------
// Helper functions
// ---------------------------------------------------------------------------

export function getGuideById(id: string): Guide | undefined {
  return GUIDES.find((g) => g.id === id);
}

export function getGuidesByAudience(audience: GuideAudience): Guide[] {
  return GUIDES.filter((g) => g.audience === audience).sort((a, b) => a.order - b.order);
}

/** Get completed step IDs for a guide from localStorage */
export function getGuideProgress(guideId: string): string[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(`guide-progress-${guideId}`);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

/** Toggle a step as completed/uncompleted */
export function toggleStepComplete(guideId: string, stepId: string): string[] {
  const current = getGuideProgress(guideId);
  const next = current.includes(stepId)
    ? current.filter((id) => id !== stepId)
    : [...current, stepId];
  localStorage.setItem(`guide-progress-${guideId}`, JSON.stringify(next));
  return next;
}
