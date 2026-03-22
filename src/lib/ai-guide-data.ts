// =============================================================================
// AI-GUIDE — Department, role, and content data for the interactive guide
// =============================================================================

// ─── Types ───

export type DepartmentId =
  | "kommunledning"
  | "bildning"
  | "samhallsbyggnad"
  | "social-omsorg"
  | "service-teknik"
  | "vuxenutbildning"
  | "kultur";

export type RoleCategory =
  | "chef"
  | "handlaggare"
  | "pedagog"
  | "administrator"
  | "specialist"
  | "vard-omsorg"
  | "drift-service";

export type ExperienceLevel = "nyborjare" | "lite-erfarenhet" | "erfaren";

export type GoalId =
  | "skriva"
  | "sammanfatta"
  | "ideer"
  | "lara-grunder"
  | "regler"
  | "verktyg";

export interface Department {
  id: DepartmentId;
  name: string;
  shortName: string;
  icon: string;
  description: string;
  roleCategories: RoleCategory[];
}

export interface UseCaseTemplate {
  id: string;
  title: string;
  description: string;
  examplePrompt: string;
  departments: DepartmentId[] | "all";
  roleCategories: RoleCategory[] | "all";
  goals: GoalId[];
  difficulty: "enkelt" | "medel" | "avancerat";
  actionLabel?: string;
  actionHref?: string;
}

export interface GuideRule {
  text: string;
  type: "do" | "dont";
  departments: DepartmentId[] | "all";
}

export interface RoleCategoryInfo {
  id: RoleCategory;
  title: string;
  description: string;
  icon: string;
}

export interface GoalOption {
  id: GoalId;
  label: string;
  icon: string;
}

// ─── Departments ───

export const DEPARTMENTS: Department[] = [
  {
    id: "kommunledning",
    name: "Kommunledningsförvaltningen",
    shortName: "Kommunledning",
    icon: "Building2",
    description: "Styrning, ekonomi, HR, IT, kommunikation och digitalisering",
    roleCategories: ["chef", "administrator", "specialist"],
  },
  {
    id: "bildning",
    name: "Bildningsförvaltningen",
    shortName: "Bildning",
    icon: "GraduationCap",
    description: "Förskola, grundskola, gymnasium och elevhälsa",
    roleCategories: ["chef", "pedagog", "administrator", "specialist"],
  },
  {
    id: "samhallsbyggnad",
    name: "Samhällsbyggnadsförvaltningen",
    shortName: "Samhällsbyggnad",
    icon: "Landmark",
    description: "Bygglov, planering, miljö och näringslivsutveckling",
    roleCategories: ["chef", "handlaggare", "administrator", "specialist"],
  },
  {
    id: "social-omsorg",
    name: "Social- och omsorgsförvaltningen",
    shortName: "Social & omsorg",
    icon: "Heart",
    description: "Socialtjänst, äldreomsorg, funktionsstöd och LSS",
    roleCategories: ["chef", "handlaggare", "administrator", "vard-omsorg"],
  },
  {
    id: "service-teknik",
    name: "Service- och teknikförvaltningen",
    shortName: "Service & teknik",
    icon: "Wrench",
    description: "Måltider, fastigheter, park, drift och transport",
    roleCategories: ["chef", "administrator", "drift-service"],
  },
  {
    id: "vuxenutbildning",
    name: "Vuxenutbildnings- och arbetsmarknadsförvaltningen",
    shortName: "Vuxenutbildning",
    icon: "BookOpen",
    description: "Komvux, SFI, arbetsmarknad och samhällsorientering",
    roleCategories: ["chef", "pedagog", "handlaggare", "administrator"],
  },
  {
    id: "kultur",
    name: "Kulturförvaltningen",
    shortName: "Kultur",
    icon: "Palette",
    description: "Bibliotek, kulturhus, ungdomsverksamhet och evenemang",
    roleCategories: ["chef", "administrator", "specialist"],
  },
];

export const DEPARTMENTS_MAP = Object.fromEntries(
  DEPARTMENTS.map((d) => [d.id, d])
) as Record<DepartmentId, Department>;

// ─── Role Categories ───

export const ROLE_CATEGORIES: RoleCategoryInfo[] = [
  {
    id: "chef",
    title: "Chef / ledare",
    description: "Enhetschef, rektor, förvaltningschef",
    icon: "Crown",
  },
  {
    id: "handlaggare",
    title: "Handläggare / utredare",
    description: "Biståndshandläggare, bygglov, socialsekreterare",
    icon: "FileSearch",
  },
  {
    id: "pedagog",
    title: "Pedagog / lärare",
    description: "Lärare, förskolelärare, specialpedagog, SFI-lärare",
    icon: "BookOpen",
  },
  {
    id: "administrator",
    title: "Administratör / stöd",
    description: "Registrator, nämndsekreterare, skoladmin",
    icon: "ClipboardList",
  },
  {
    id: "specialist",
    title: "Specialist / tekniker",
    description: "IT, ekonom, kommunikatör, GIS, HR",
    icon: "Cpu",
  },
  {
    id: "vard-omsorg",
    title: "Vård / omsorg",
    description: "Undersköterska, sjuksköterska, omsorgspersonal",
    icon: "Stethoscope",
  },
  {
    id: "drift-service",
    title: "Drift / service",
    description: "Drifttekniker, måltidschef, vaktmästare, parkarbetare",
    icon: "HardHat",
  },
];

export const ROLE_CATEGORIES_MAP = Object.fromEntries(
  ROLE_CATEGORIES.map((r) => [r.id, r])
) as Record<RoleCategory, RoleCategoryInfo>;

// ─── Goals ───

export const GOAL_OPTIONS: GoalOption[] = [
  { id: "skriva", label: "Skriva texter snabbare", icon: "Pen" },
  { id: "sammanfatta", label: "Sammanfatta & analysera dokument", icon: "FileText" },
  { id: "ideer", label: "Få idéer och inspiration", icon: "Lightbulb" },
  { id: "lara-grunder", label: "Lära mig grunderna i AI", icon: "GraduationCap" },
  { id: "regler", label: "Förstå regler och riktlinjer", icon: "Scale" },
  { id: "verktyg", label: "Hitta verktyg för mitt arbete", icon: "Wrench" },
];

// ─── Use Cases ───

export const USE_CASES: UseCaseTemplate[] = [
  // ── Skriva ──
  {
    id: "uc-mail-svar",
    title: "Formulera professionella e-postsvar",
    description: "Få hjälp att skriva tydliga, vänliga svar på invånarfrågor.",
    examplePrompt: "Skriv ett professionellt och vänligt svar på detta meddelande från en invånare: [klistra in meddelandet]. Svaret ska vara tydligt, informativt och i kommunens ton.",
    departments: "all",
    roleCategories: "all",
    goals: ["skriva"],
    difficulty: "enkelt",
  },
  {
    id: "uc-rapport-utkast",
    title: "Skriva rapportutkast",
    description: "Låt AI skapa ett första utkast baserat på dina nyckelbudskap.",
    examplePrompt: "Skriv ett utkast till en rapport med rubriken '[titel]'. Rapporten ska innehålla: bakgrund, nuläge, analys och rekommendation. Nyckelbudskap: [lista dina punkter].",
    departments: "all",
    roleCategories: ["chef", "handlaggare", "specialist"],
    goals: ["skriva"],
    difficulty: "enkelt",
  },
  {
    id: "uc-beslut-formulering",
    title: "Formulera beslutstexter",
    description: "Få hjälp att strukturera och formulera formella beslut.",
    examplePrompt: "Hjälp mig formulera ett formellt beslut för [ärendetyp]. Beslutet ska innehålla bakgrund, bedömning och beslutsmening. Lagrum: [ange relevant lag].",
    departments: ["samhallsbyggnad", "social-omsorg"],
    roleCategories: ["handlaggare"],
    goals: ["skriva"],
    difficulty: "medel",
  },
  {
    id: "uc-lektionsplan",
    title: "Skapa lektionsplaneringar",
    description: "Generera lektionsupplägg anpassade till ålder och ämne.",
    examplePrompt: "Skapa en lektionsplan för [ämne] i årskurs [X]. Lektionen är 60 minuter. Inkludera: lärandemål, uppstart, huvudaktivitet, avslutning och differentiering för elever som behöver extra stöd.",
    departments: ["bildning", "vuxenutbildning"],
    roleCategories: ["pedagog"],
    goals: ["skriva", "ideer"],
    difficulty: "enkelt",
  },
  {
    id: "uc-pressmeddelande",
    title: "Skriv pressmeddelanden",
    description: "Snabba utkast till pressmeddelanden med rätt ton och struktur.",
    examplePrompt: "Skriv ett pressmeddelande för Katrineholms kommun om [ämne]. Inkludera rubrik, ingress, citat från [namn, titel] och kontaktuppgifter. Tonen ska vara professionell men tillgänglig.",
    departments: ["kommunledning"],
    roleCategories: ["specialist"],
    goals: ["skriva"],
    difficulty: "enkelt",
  },

  // ── Sammanfatta ──
  {
    id: "uc-sammanfatta-protokoll",
    title: "Sammanfatta mötesprotokoll",
    description: "Kondensera långa protokoll till korta sammanfattningar med beslutspunkter.",
    examplePrompt: "Sammanfatta detta mötesprotokoll i max 10 punkter. Fokusera på beslut som fattades, åtgärder med ansvarig person och deadlines: [klistra in protokollet].",
    departments: "all",
    roleCategories: ["chef", "administrator"],
    goals: ["sammanfatta"],
    difficulty: "enkelt",
  },
  {
    id: "uc-sammanfatta-utredning",
    title: "Sammanfatta utredningar",
    description: "Snabb överblick av långa utredningsdokument.",
    examplePrompt: "Sammanfatta denna utredning. Ge mig: 1) Huvudsakligt syfte, 2) Viktigaste slutsatserna, 3) Rekommenderade åtgärder, 4) Eventuella risker: [klistra in texten].",
    departments: ["social-omsorg", "samhallsbyggnad", "kommunledning"],
    roleCategories: ["handlaggare", "chef"],
    goals: ["sammanfatta"],
    difficulty: "enkelt",
  },
  {
    id: "uc-analysera-budget",
    title: "Analysera budgetunderlag",
    description: "Hitta trender och avvikelser i ekonomisk data.",
    examplePrompt: "Analysera detta budgetunderlag. Identifiera: 1) De tre största kostnadsposterna, 2) Poster som ökat mest jämfört med föregående år, 3) Möjliga besparingsområden: [klistra in data].",
    departments: ["kommunledning"],
    roleCategories: ["specialist", "chef"],
    goals: ["sammanfatta"],
    difficulty: "medel",
  },
  {
    id: "uc-journal-sammanfattning",
    title: "Sammanfatta journalanteckningar",
    description: "Kondensera vårdanteckningar till överlämningsunderlag.",
    examplePrompt: "Sammanfatta dessa journalanteckningar till ett kort överlämningsdokument. Fokusera på: aktuellt hälsotillstånd, pågående insatser, förändringar och uppföljningspunkter. OBS: Anonymisera innan du klistrar in!",
    departments: ["social-omsorg"],
    roleCategories: ["vard-omsorg"],
    goals: ["sammanfatta"],
    difficulty: "medel",
  },

  // ── Idéer ──
  {
    id: "uc-brainstorm",
    title: "Brainstorma lösningar",
    description: "Använd AI som bollplank för nya idéer.",
    examplePrompt: "Jag jobbar med [beskriv utmaningen]. Ge mig 10 kreativa förslag på hur vi kan lösa detta. Tänk både traditionella och innovativa lösningar.",
    departments: "all",
    roleCategories: "all",
    goals: ["ideer"],
    difficulty: "enkelt",
  },
  {
    id: "uc-aktivitetsplanering",
    title: "Planera aktiviteter för brukare",
    description: "Få förslag på meningsfulla aktiviteter anpassade till målgruppen.",
    examplePrompt: "Föreslå 10 aktiviteter för äldre personer på ett boende. Målgruppen har varierande rörlighet. Aktiviteterna ska vara sociala, stimulerande och genomförbara med begränsade resurser.",
    departments: ["social-omsorg"],
    roleCategories: ["vard-omsorg"],
    goals: ["ideer"],
    difficulty: "enkelt",
  },
  {
    id: "uc-evenemang",
    title: "Planera evenemang och program",
    description: "Få hjälp med programupplägg och marknadsföringstexter.",
    examplePrompt: "Hjälp mig planera ett [typ av evenemang] för [målgrupp]. Budget: [X kr]. Ge förslag på program, aktiviteter och en kort marknadsföringstext för sociala medier.",
    departments: ["kultur"],
    roleCategories: ["specialist", "administrator"],
    goals: ["ideer", "skriva"],
    difficulty: "enkelt",
  },
  {
    id: "uc-differentiering",
    title: "Differentierad undervisning",
    description: "Anpassa uppgifter till elever på olika nivåer.",
    examplePrompt: "Jag undervisar i [ämne], årskurs [X]. Skapa tre versioner av samma uppgift om [tema]: en grundnivå, en mellannivå och en utmanande nivå. Varje version ska ha tydliga instruktioner.",
    departments: ["bildning", "vuxenutbildning"],
    roleCategories: ["pedagog"],
    goals: ["ideer"],
    difficulty: "medel",
  },

  // ── Lära grunder ──
  {
    id: "uc-forsta-ai",
    title: "Förstå vad AI kan göra för dig",
    description: "Börja med AI-akademins grundkurs — 30 min som ger dig grunden.",
    examplePrompt: "",
    departments: "all",
    roleCategories: "all",
    goals: ["lara-grunder"],
    difficulty: "enkelt",
    actionLabel: "Gå till AI-akademin",
    actionHref: "/akademin",
  },
  {
    id: "uc-prompt-teknik",
    title: "Lär dig skriva bra promptar",
    description: "Tydliga instruktioner ger bättre resultat — lär dig grunderna.",
    examplePrompt: "Förklara för mig som nybörjare: vad är en prompt, varför är den viktig, och ge mig 5 konkreta tips för att skriva bättre promptar med exempel.",
    departments: "all",
    roleCategories: "all",
    goals: ["lara-grunder"],
    difficulty: "enkelt",
  },

  // ── Regler ──
  {
    id: "uc-gdpr-koll",
    title: "Kolla GDPR-regler snabbt",
    description: "Fråga AI vad som gäller — men dubbelkolla alltid med kommunens riktlinjer.",
    examplePrompt: "Jag vill använda AI för att [beskriv din uppgift]. Vilka GDPR-aspekter behöver jag tänka på? Ge mig en checklista med konkreta steg.",
    departments: "all",
    roleCategories: "all",
    goals: ["regler"],
    difficulty: "medel",
  },
  {
    id: "uc-sekretess-bedomning",
    title: "Bedöm sekretessnivå",
    description: "Förstå vilken information du kan och inte kan dela med AI.",
    examplePrompt: "",
    departments: ["social-omsorg"],
    roleCategories: ["handlaggare", "vard-omsorg"],
    goals: ["regler"],
    difficulty: "medel",
    actionLabel: "Läs dokumentation",
    actionHref: "/dokumentation",
  },

  // ── Verktyg ──
  {
    id: "uc-intric-start",
    title: "Kom igång med Intric",
    description: "Katrineholms AI-plattform — skapa och dela assistenter. Logga in med ditt AD-konto.",
    examplePrompt: "",
    departments: "all",
    roleCategories: "all",
    goals: ["verktyg"],
    difficulty: "enkelt",
    actionLabel: "Öppna Intric",
    actionHref: "https://katrineholm.intric.ai",
  },
  {
    id: "uc-hitta-assistent",
    title: "Hitta rätt AI-assistent",
    description: "Utforska bibliotekets 300+ assistenter och hitta den som passar dig.",
    examplePrompt: "",
    departments: "all",
    roleCategories: "all",
    goals: ["verktyg"],
    difficulty: "enkelt",
    actionLabel: "Utforska assistenter",
    actionHref: "/assistenter",
  },
  {
    id: "uc-bygga-egen",
    title: "Bygg din egen assistent",
    description: "Skapa en AI-assistent anpassad för dina specifika arbetsuppgifter.",
    examplePrompt: "",
    departments: "all",
    roleCategories: ["specialist", "chef", "pedagog"],
    goals: ["verktyg"],
    difficulty: "avancerat",
  },

  // ── Förvaltningsspecifika ──
  {
    id: "uc-bygglov-sortering",
    title: "Sortera och prioritera ärenden",
    description: "Låt AI kategorisera inkommande ärenden efter komplexitet och typ.",
    examplePrompt: "Jag har fått in dessa bygglovsärenden idag: [lista ärenden med kort beskrivning]. Kategorisera dem efter: 1) Komplexitet (enkel/medel/komplex), 2) Typ (nybyggnad/tillbyggnad/ändring), 3) Föreslå prioriteringsordning.",
    departments: ["samhallsbyggnad"],
    roleCategories: ["handlaggare"],
    goals: ["sammanfatta", "verktyg"],
    difficulty: "medel",
  },
  {
    id: "uc-elevbedomning",
    title: "Stöd vid elevbedömning",
    description: "Formulera bedömningar och omdömen med rätt terminologi.",
    examplePrompt: "Hjälp mig formulera ett omdöme för en elev i [ämne], årskurs [X]. Eleven visar [styrkor] men behöver utveckla [områden]. Använd kunskapskravens terminologi (Lgr22).",
    departments: ["bildning"],
    roleCategories: ["pedagog"],
    goals: ["skriva"],
    difficulty: "medel",
  },
  {
    id: "uc-sfi-material",
    title: "Skapa SFI-material",
    description: "Generera övningar och texter anpassade till SFI-nivåer.",
    examplePrompt: "Skapa en lästext på SFI-nivå [B/C/D] om [tema, t.ex. 'att söka jobb i Sverige']. Inkludera 5 förståelsefrågor och 5 nya ord med förklaringar.",
    departments: ["vuxenutbildning"],
    roleCategories: ["pedagog"],
    goals: ["skriva", "ideer"],
    difficulty: "enkelt",
  },
  {
    id: "uc-maltidsplanering",
    title: "Planera veckomatsedel",
    description: "Skapa matsedlar som uppfyller näringskrav och budget.",
    examplePrompt: "Skapa en veckomatsedel för [skola/äldreboende]. Krav: varierad kost, max [X kr] per portion, minst 2 vegetariska alternativ per vecka, anpassat för [eventuella allergier/specialkost].",
    departments: ["service-teknik"],
    roleCategories: ["drift-service", "chef"],
    goals: ["ideer"],
    difficulty: "enkelt",
  },
  {
    id: "uc-bistand-underlag",
    title: "Strukturera biståndsunderlag",
    description: "Organisera information inför biståndsbedömning.",
    examplePrompt: "Hjälp mig strukturera ett underlag för biståndsbedömning (SoL). Jag har denna information: [anonymiserad sammanfattning]. Strukturera det enligt: bakgrund, nuvarande situation, behov, bedömning av insatser. OBS: Klistra aldrig in personuppgifter!",
    departments: ["social-omsorg"],
    roleCategories: ["handlaggare"],
    goals: ["skriva", "sammanfatta"],
    difficulty: "medel",
  },
  {
    id: "uc-bibliotek-info",
    title: "Skapa informationsmaterial",
    description: "Skriv lättlästa guider och informationsblad för besökare.",
    examplePrompt: "Skriv en lättläst guide om [ämne, t.ex. 'Så använder du bibliotekets digitala tjänster']. Målgruppen är besökare med varierande digital vana. Max 1 A4-sida, använd korta meningar och tydliga steg.",
    departments: ["kultur"],
    roleCategories: ["specialist", "administrator"],
    goals: ["skriva"],
    difficulty: "enkelt",
  },
  {
    id: "uc-tillsyn-rapport",
    title: "Skriv tillsynsrapporter",
    description: "Strukturera observationer från inspektioner till formella rapporter.",
    examplePrompt: "Jag har gjort en tillsyn av [typ av verksamhet]. Mina observationer: [lista punkter]. Strukturera detta till en formell tillsynsrapport med: syfte, genomförande, observationer, bedömning och eventuella krav på åtgärder.",
    departments: ["samhallsbyggnad"],
    roleCategories: ["handlaggare", "specialist"],
    goals: ["skriva"],
    difficulty: "medel",
  },
  {
    id: "uc-hr-policy",
    title: "Utforma policydokument",
    description: "Skapa utkast till policyer och riktlinjer.",
    examplePrompt: "Skriv ett utkast till en policy för [ämne, t.ex. 'AI-användning på arbetsplatsen']. Inkludera: syfte, omfattning, riktlinjer, ansvar och uppföljning. Tonen ska vara professionell och tydlig.",
    departments: ["kommunledning"],
    roleCategories: ["specialist", "chef"],
    goals: ["skriva"],
    difficulty: "avancerat",
  },
  {
    id: "uc-arbetsmarknad-matchning",
    title: "Matcha arbetssökande med insatser",
    description: "Använd AI för att identifiera lämpliga åtgärder och utbildningsvägar.",
    examplePrompt: "En arbetssökande har [beskriv bakgrund, kompetenser, hinder — anonymiserat]. Föreslå 3-5 möjliga insatser och utbildningsvägar som kan stärka personens position på arbetsmarknaden.",
    departments: ["vuxenutbildning"],
    roleCategories: ["handlaggare"],
    goals: ["ideer", "verktyg"],
    difficulty: "medel",
  },
];

// ─── Rules ───

export const GUIDE_RULES: GuideRule[] = [
  // Generella DO
  { text: "Använd alltid Intric som första val — det är kommunens godkända AI-plattform", type: "do", departments: "all" },
  { text: "Granska alltid AI-genererad text innan du skickar eller publicerar", type: "do", departments: "all" },
  { text: "Börja med enkla uppgifter och öka komplexiteten gradvis", type: "do", departments: "all" },
  { text: "Var tydlig och specifik i dina instruktioner till AI", type: "do", departments: "all" },
  { text: "Dela med dig av bra promptar och assistenter till kollegor", type: "do", departments: "all" },

  // Generella DON'T
  { text: "Klistra aldrig in personuppgifter, personnummer eller känslig information", type: "dont", departments: "all" },
  { text: "Lita aldrig blint på AI-svar — verifiera fakta och siffror", type: "dont", departments: "all" },
  { text: "Använd inte AI för formella myndighetsbeslut utan mänsklig granskning", type: "dont", departments: "all" },
  { text: "Dela inte sekretessbelagda handlingar med externa AI-tjänster", type: "dont", departments: "all" },
  { text: "Kopiera aldrig AI-text rakt av till officiella dokument utan redigering", type: "dont", departments: "all" },

  // Förvaltningsspecifika
  { text: "Anonymisera alltid patient-/brukarinformation innan du använder AI", type: "dont", departments: ["social-omsorg"] },
  { text: "Journalanteckningar får aldrig matas in i AI-verktyg som inte är godkända", type: "dont", departments: ["social-omsorg"] },
  { text: "AI kan inte ersätta den professionella bedömningen i socialtjänsten", type: "dont", departments: ["social-omsorg"] },
  { text: "Elevdata och omdömen är skyddade — använd aldrig riktiga elevnamn i AI", type: "dont", departments: ["bildning", "vuxenutbildning"] },
  { text: "Kontrollera att AI-genererat undervisningsmaterial stämmer med läroplanen", type: "do", departments: ["bildning", "vuxenutbildning"] },
  { text: "Miljödata och tillsynsuppgifter kan vara offentliga — kontrollera innan AI-användning", type: "do", departments: ["samhallsbyggnad"] },
  { text: "Bygglovsritningar och handlingar kan innehålla skyddade personuppgifter", type: "dont", departments: ["samhallsbyggnad"] },
  { text: "Ekonomiska underlag kan vara arbetsmaterial — kolla sekretessnivå", type: "do", departments: ["kommunledning"] },
  { text: "Upphandlingsunderlag får inte delas med AI innan upphandlingen är avslutad", type: "dont", departments: ["service-teknik", "kommunledning"] },
];

// ─── Result Generator ───

export interface GuideResult {
  recommendedLevel: "niva-1" | "niva-2" | "niva-3";
  useCases: UseCaseTemplate[];
  rules: GuideRule[];
  levelDescription: string;
}

export function generateGuideResult(
  departmentId: DepartmentId,
  roleCategory: RoleCategory,
  experienceLevel: ExperienceLevel,
  goals: GoalId[]
): GuideResult {
  // Recommended academy level
  const recommendedLevel: "niva-1" | "niva-2" | "niva-3" =
    experienceLevel === "nyborjare"
      ? "niva-1"
      : experienceLevel === "lite-erfarenhet"
        ? "niva-2"
        : "niva-3";

  const levelDescriptions = {
    "niva-1": "AI-redo medarbetare — lär dig grunderna på ~2,5 timmar",
    "niva-2": "AI-superanvändare — fördjupa dig och bli effektivare",
    "niva-3": "AI-ambassadör — led AI-initiativ i din förvaltning",
  };

  // Filter use cases: match department + role + goals
  const matchedUseCases = USE_CASES.filter((uc) => {
    const deptMatch =
      uc.departments === "all" || uc.departments.includes(departmentId);
    const roleMatch =
      uc.roleCategories === "all" || uc.roleCategories.includes(roleCategory);
    const goalMatch = uc.goals.some((g) => goals.includes(g));
    return deptMatch && roleMatch && goalMatch;
  });

  // Sort: prefer department-specific over "all", then by goal relevance
  const scored = matchedUseCases.map((uc) => {
    let score = 0;
    if (uc.departments !== "all") score += 3;
    if (uc.roleCategories !== "all") score += 2;
    score += uc.goals.filter((g) => goals.includes(g)).length;
    return { uc, score };
  });
  scored.sort((a, b) => b.score - a.score);
  const topUseCases = scored.slice(0, 3).map((s) => s.uc);

  // Filter rules: general + department-specific
  const matchedRules = GUIDE_RULES.filter((r) => {
    return r.departments === "all" || r.departments.includes(departmentId);
  });

  // Take top 2 do + top 2 don't
  const dos = matchedRules.filter((r) => r.type === "do").slice(0, 2);
  const donts = matchedRules.filter((r) => r.type === "dont").slice(0, 2);

  return {
    recommendedLevel,
    useCases: topUseCases,
    rules: [...dos, ...donts],
    levelDescription: levelDescriptions[recommendedLevel],
  };
}
