export type Assistant = {
  slug: string;
  name: string;
  organization: string;
  category: string;
  model: string;
  description: string;
  prompt?: string;
  setupInstructions?: string;
  submittedBy?: string;
  assistantLink?: string;
};

export const CATEGORIES = [
  "Alla",
  "Administration",
  "Vård & omsorg",
  "Juridik",
  "Utbildning",
  "Förvaltning",
  "Kommunikation",
  "HR",
  "IT",
] as const;

export const ASSISTANTS: Assistant[] = [
  {
    slug: "motessammanfattare",
    name: "Mötessammanfattare",
    organization: "Kommunledningsförvaltningen",
    category: "Administration",
    model: "GPT-4",
    description:
      "Sammanfattar protokoll och mötesanteckningar automatiskt. Extraherar beslutspunkter, åtgärder och ansvariga.",
    prompt:
      "Du är en assistent som sammanfattar mötesprotokoll. Extrahera beslut, åtgärder och ansvariga personer. Formatera tydligt med rubriker.",
    setupInstructions:
      "Använder GPT-4 med hög temperatur för kreativa sammanfattningar. Kopplad till kommunens dokumenthanteringssystem.",
    submittedBy: "Anna Johansson",
  },
  {
    slug: "beslutsstod-socialtjanst",
    name: "Beslutsstöd socialtjänst",
    organization: "Socialförvaltningen",
    category: "Vård & omsorg",
    model: "Claude",
    description:
      "Hjälper handläggare med beslutsunderlag och lagstöd. Söker i SoL, LSS och andra relevanta regelverk.",
    prompt:
      "Du hjälper socialsekreterare att hitta relevant lagstiftning och praxis för sina ärenden.",
    setupInstructions:
      "Använder Claude med RAG mot Socialstyrelsens riktlinjer och kommunens lokala policyer.",
    submittedBy: "Erik Lindström",
  },
  {
    slug: "upphandlingsassistent",
    name: "Upphandlingsassistent",
    organization: "Ekonomiavdelningen",
    category: "Juridik",
    model: "GPT-4",
    description:
      "Analyserar upphandlingsdokument och identifierar risker. Hjälper med kravspecifikationer och utvärderingskriterier.",
    prompt:
      "Du analyserar upphandlingsdokument enligt LOU. Identifiera risker, oklarheter och förbättringsförslag.",
    setupInstructions:
      "GPT-4 med tillgång till LOU-databasen och kommunens tidigare upphandlingar.",
  },
  {
    slug: "skolplanerare",
    name: "Skolplanerare",
    organization: "Bildningsförvaltningen",
    category: "Utbildning",
    model: "Claude",
    description:
      "Skapar lektionsplaneringar och pedagogiskt material anpassat efter läroplanen.",
    prompt:
      "Du är en pedagogisk assistent som hjälper lärare skapa lektionsplaneringar enligt Lgr22.",
    setupInstructions:
      "Claude med kunskap om Lgr22 och Skolverkets stödmaterial.",
    submittedBy: "Maria Svensson",
  },
  {
    slug: "arendehanterare",
    name: "Ärendehanterare",
    organization: "Kontaktcenter",
    category: "Förvaltning",
    model: "GPT-4",
    description:
      "Klassificerar och prioriterar inkommande ärenden automatiskt. Dirigerar till rätt handläggare.",
  },
  {
    slug: "kommunikator",
    name: "Kommunikatör",
    organization: "Kommunikationsavdelningen",
    category: "Kommunikation",
    model: "Claude",
    description:
      "Skriver pressmeddelanden, informationstexter och sociala medieinlägg i kommunens tonalitet.",
    prompt:
      "Du skriver kommunikationsmaterial för Katrineholms kommun. Håll en professionell men varm ton.",
    submittedBy: "Lisa Andersson",
  },
  {
    slug: "hr-assistent",
    name: "HR-assistent",
    organization: "HR-avdelningen",
    category: "HR",
    model: "GPT-4",
    description:
      "Hjälper med rekryteringsprocessen — skriver annonser, screenar CV:n och förbereder intervjufrågor.",
  },
  {
    slug: "it-support",
    name: "IT-support",
    organization: "IT-avdelningen",
    category: "IT",
    model: "Claude",
    description:
      "Hjälper medarbetare med vanliga IT-frågor och felsökning. Guidar genom steg-för-steg-lösningar.",
    setupInstructions:
      "Kopplad till IT-avdelningens kunskapsbas och FAQ.",
  },
  {
    slug: "oversattare",
    name: "Översättare",
    organization: "Kommunledningsförvaltningen",
    category: "Administration",
    model: "GPT-4",
    description:
      "Översätter dokument mellan svenska och andra språk med fokus på myndighetsspråk.",
  },
];
