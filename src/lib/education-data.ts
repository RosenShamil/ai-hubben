// =============================================================================
// AI-AKADEMIN — Course data (Nivå 1: AI-redo medarbetare)
// =============================================================================

import type {
  CertificationLevelConfig,
  Course,
  Module,
  Lesson,
  AcademyQuizQuestion,
} from "./education-system";
import { LESSONS_NIVA_2, QUIZ_QUESTIONS_NIVA_2, FINAL_EXAM_POOL_NIVA_2 } from "./education-data-niva2";
import { LESSONS_NIVA_3, QUIZ_QUESTIONS_NIVA_3, FINAL_EXAM_POOL_NIVA_3 } from "./education-data-niva3";

// ---------------------------------------------------------------------------
// Certification levels
// ---------------------------------------------------------------------------

export const CERTIFICATION_LEVELS: CertificationLevelConfig[] = [
  {
    id: "niva-1",
    title: "AI-redo medarbetare",
    subtitle: "Grundnivå",
    description:
      "Lär dig grunderna i AI, hur du använder det på jobbet och hur du gör det säkert. För alla anställda.",
    icon: "GraduationCap",
    color: "amber",
    badgeColor: "brons",
    courseIds: ["kurs-1-1", "kurs-1-2", "kurs-1-3"],
    finalExamQuestionCount: 15,
    finalExamPassThreshold: 0.8,
    requiredScenarios: 3,
    estimatedTotalMinutes: 150,
  },
  {
    id: "niva-2",
    title: "AI-superanvändare",
    subtitle: "Fördjupning",
    description:
      "Förstå tekniken, bygg egna assistenter i Intric, använd Copilot som ett proffs och förstå lagarna.",
    icon: "Rocket",
    color: "sky",
    badgeColor: "silver",
    requiredLevel: "niva-1",
    courseIds: ["kurs-2-1", "kurs-2-2", "kurs-2-3", "kurs-2-4"],
    finalExamQuestionCount: 20,
    finalExamPassThreshold: 0.8,
    requiredScenarios: 5,
    estimatedTotalMinutes: 240,
  },
  {
    id: "niva-3",
    title: "AI-ambassadör",
    subtitle: "Avancerad",
    description:
      "Led AI-initiativ, utveckla strategier och bli din förvaltnings AI-expert.",
    icon: "Crown",
    color: "violet",
    badgeColor: "guld",
    requiredLevel: "niva-2",
    courseIds: ["kurs-3-1", "kurs-3-2", "kurs-3-3", "kurs-3-4"],
    finalExamQuestionCount: 25,
    finalExamPassThreshold: 0.8,
    requiredScenarios: 2,
    estimatedTotalMinutes: 300,
  },
];

// ---------------------------------------------------------------------------
// Nivå 1 — Kurser
// ---------------------------------------------------------------------------

export const COURSES: Course[] = [
  // =========================================================================
  // KURS 1.1 — Vad är AI?
  // =========================================================================
  {
    id: "kurs-1-1",
    levelId: "niva-1",
    title: "Vad är AI?",
    description:
      "En introduktion till artificiell intelligens — vad det är, hur det fungerar och varför det spelar roll för dig.",
    icon: "Brain",
    order: 1,
    estimatedMinutes: 45,
    moduleIds: ["mod-1-1-1", "mod-1-1-2", "mod-1-1-3"],
  },
  // =========================================================================
  // KURS 1.2 — AI på jobbet
  // =========================================================================
  {
    id: "kurs-1-2",
    levelId: "niva-1",
    title: "AI på jobbet",
    description:
      "Praktiska exempel på hur AI kan hjälpa dig i ditt dagliga arbete — från mejl till mötessammanfattningar.",
    icon: "Briefcase",
    order: 2,
    estimatedMinutes: 45,
    moduleIds: ["mod-1-2-1", "mod-1-2-2", "mod-1-2-3"],
  },
  // =========================================================================
  // KURS 1.3 — Använd AI säkert
  // =========================================================================
  {
    id: "kurs-1-3",
    levelId: "niva-1",
    title: "Använd AI säkert",
    description:
      "Fallgropar, risker och regler — allt du behöver veta för att använda AI tryggt och ansvarsfullt.",
    icon: "Shield",
    order: 3,
    estimatedMinutes: 40,
    moduleIds: ["mod-1-3-1", "mod-1-3-2", "mod-1-3-3"],
  },

  // =========================================================================
  // NIVÅ 2 — KURSER
  // =========================================================================
  {
    id: "kurs-2-1",
    levelId: "niva-2",
    title: "Förstå tekniken",
    description:
      "Hur fungerar AI egentligen? Tokens, transformer, RAG och API:er — tekniken bakom verktygen.",
    icon: "Cpu",
    order: 1,
    estimatedMinutes: 60,
    moduleIds: ["mod-2-1-1", "mod-2-1-2", "mod-2-1-3", "mod-2-1-4"],
  },
  {
    id: "kurs-2-2",
    levelId: "niva-2",
    title: "Intric — bygg din egen assistent",
    description:
      "Gå från användare till skapare. Bygg, anpassa och dela AI-assistenter i Intric.",
    icon: "Boxes",
    order: 2,
    estimatedMinutes: 60,
    moduleIds: ["mod-2-2-1", "mod-2-2-2", "mod-2-2-3", "mod-2-2-4"],
  },
  {
    id: "kurs-2-3",
    levelId: "niva-2",
    title: "Copilot & Microsoft 365",
    description:
      "Använd AI direkt i Word, Excel, PowerPoint, Teams och Outlook — praktiskt och effektivt.",
    icon: "Laptop",
    order: 3,
    estimatedMinutes: 60,
    moduleIds: ["mod-2-3-1", "mod-2-3-2", "mod-2-3-3", "mod-2-3-4"],
  },
  {
    id: "kurs-2-4",
    levelId: "niva-2",
    title: "Lagar, regler & etik på djupet",
    description:
      "AI Act, GDPR, konsekvensbedömning och upphandling — regelverket i detalj.",
    icon: "Scale",
    order: 4,
    estimatedMinutes: 60,
    moduleIds: ["mod-2-4-1", "mod-2-4-2", "mod-2-4-3", "mod-2-4-4"],
  },

  // =========================================================================
  // NIVÅ 3 — KURSER
  // =========================================================================
  {
    id: "kurs-3-1",
    levelId: "niva-3",
    title: "AI-strategi för din verksamhet",
    description:
      "Identifiera AI-möjligheter, driva piloter och mäta effekt — från idé till verksamhetsnytta.",
    icon: "Target",
    order: 1,
    estimatedMinutes: 75,
    moduleIds: ["mod-3-1-1", "mod-3-1-2", "mod-3-1-3", "mod-3-1-4"],
  },
  {
    id: "kurs-3-2",
    levelId: "niva-3",
    title: "Avancerad AI-teknik",
    description:
      "Finetuning, AI-agenter, multimodal AI och AI-säkerhet — för dig som vill förstå framkanten.",
    icon: "FlaskConical",
    order: 2,
    estimatedMinutes: 75,
    moduleIds: ["mod-3-2-1", "mod-3-2-2", "mod-3-2-3", "mod-3-2-4"],
  },
  {
    id: "kurs-3-3",
    levelId: "niva-3",
    title: "Leda AI-initiativ",
    description:
      "Bygg AI-policy, utbilda kollegor, skapa AI-team och driv förändring i din organisation.",
    icon: "Users",
    order: 3,
    estimatedMinutes: 75,
    moduleIds: ["mod-3-3-1", "mod-3-3-2", "mod-3-3-3", "mod-3-3-4"],
  },
  {
    id: "kurs-3-4",
    levelId: "niva-3",
    title: "Verktygslandskapet",
    description:
      "Öppna vs. stängda modeller, AI för bild/ljud/video, low-code och framtidens arbetsplats.",
    icon: "Wrench",
    order: 4,
    estimatedMinutes: 75,
    moduleIds: ["mod-3-4-1", "mod-3-4-2", "mod-3-4-3", "mod-3-4-4"],
  },
];

// ---------------------------------------------------------------------------
// Nivå 1 — Moduler
// ---------------------------------------------------------------------------

export const MODULES: Module[] = [
  // --- Kurs 1.1: Vad är AI? ---
  {
    id: "mod-1-1-1",
    courseId: "kurs-1-1",
    title: "AI förklarat på 10 minuter",
    description: "Vad AI är, vad det INTE är, och varför det handlar om mönster — inte magi.",
    order: 1,
    estimatedMinutes: 15,
    lessonIds: ["les-1-1-1-1", "les-1-1-1-2"],
    quizQuestionIds: ["aq-1-1-1", "aq-1-1-2", "aq-1-1-3", "aq-1-1-4", "aq-1-1-5"],
    quizPassThreshold: 0.8,
  },
  {
    id: "mod-1-1-2",
    courseId: "kurs-1-1",
    title: "Generativ AI & språkmodeller",
    description: "Hur AI kan skapa text, bilder och kod — och vad en språkmodell egentligen gör.",
    order: 2,
    estimatedMinutes: 15,
    lessonIds: ["les-1-1-2-1", "les-1-1-2-2"],
    quizQuestionIds: ["aq-1-1-6", "aq-1-1-7", "aq-1-1-8", "aq-1-1-9", "aq-1-1-10"],
    quizPassThreshold: 0.8,
  },
  {
    id: "mod-1-1-3",
    courseId: "kurs-1-1",
    title: "Prata med AI — din första prompt",
    description: "Hur du ger instruktioner till AI och får bra svar — praktiskt och enkelt.",
    order: 3,
    estimatedMinutes: 15,
    lessonIds: ["les-1-1-3-1", "les-1-1-3-2"],
    quizQuestionIds: ["aq-1-1-11", "aq-1-1-12", "aq-1-1-13", "aq-1-1-14", "aq-1-1-15"],
    quizPassThreshold: 0.8,
  },
  // --- Kurs 1.2: AI på jobbet ---
  {
    id: "mod-1-2-1",
    courseId: "kurs-1-2",
    title: "AI som arbetsverktyg",
    description: "Chatbotar, assistenter och Copilot — vilka AI-verktyg finns och vad gör de?",
    order: 1,
    estimatedMinutes: 15,
    lessonIds: ["les-1-2-1-1", "les-1-2-1-2"],
    quizQuestionIds: ["aq-1-2-1", "aq-1-2-2", "aq-1-2-3", "aq-1-2-4", "aq-1-2-5"],
    quizPassThreshold: 0.8,
  },
  {
    id: "mod-1-2-2",
    courseId: "kurs-1-2",
    title: "Praktiska användningsfall",
    description: "Sammanfatta möten, skriva mejl, bearbeta texter — AI i vardagen.",
    order: 2,
    estimatedMinutes: 15,
    lessonIds: ["les-1-2-2-1", "les-1-2-2-2"],
    quizQuestionIds: ["aq-1-2-6", "aq-1-2-7", "aq-1-2-8", "aq-1-2-9", "aq-1-2-10"],
    quizPassThreshold: 0.8,
  },
  {
    id: "mod-1-2-3",
    courseId: "kurs-1-2",
    title: "Intric — din första chatt",
    description: "Kom igång med Intric, kommunens AI-plattform — steg för steg.",
    order: 3,
    estimatedMinutes: 15,
    lessonIds: ["les-1-2-3-1", "les-1-2-3-2"],
    quizQuestionIds: ["aq-1-2-11", "aq-1-2-12", "aq-1-2-13", "aq-1-2-14", "aq-1-2-15"],
    quizPassThreshold: 0.8,
  },
  // --- Kurs 1.3: Använd AI säkert ---
  {
    id: "mod-1-3-1",
    courseId: "kurs-1-3",
    title: "Fallgropar & risker",
    description: "Hallucinationer, bias och källkritik — vad du behöver veta innan du litar på AI.",
    order: 1,
    estimatedMinutes: 15,
    lessonIds: ["les-1-3-1-1", "les-1-3-1-2"],
    quizQuestionIds: ["aq-1-3-1", "aq-1-3-2", "aq-1-3-3", "aq-1-3-4", "aq-1-3-5"],
    quizPassThreshold: 0.8,
  },
  {
    id: "mod-1-3-2",
    courseId: "kurs-1-3",
    title: "Informationssäkerhet & GDPR",
    description: "Vad får du skriva till en AI? Hur skyddar du personuppgifter och känslig information?",
    order: 2,
    estimatedMinutes: 15,
    lessonIds: ["les-1-3-2-1", "les-1-3-2-2"],
    quizQuestionIds: ["aq-1-3-6", "aq-1-3-7", "aq-1-3-8", "aq-1-3-9", "aq-1-3-10"],
    quizPassThreshold: 0.8,
  },
  {
    id: "mod-1-3-3",
    courseId: "kurs-1-3",
    title: "Ansvarsfull AI-användning",
    description: "Transparens, mänsklig kontroll och etik — att använda AI med gott omdöme.",
    order: 3,
    estimatedMinutes: 10,
    lessonIds: ["les-1-3-3-1"],
    quizQuestionIds: ["aq-1-3-11", "aq-1-3-12", "aq-1-3-13", "aq-1-3-14", "aq-1-3-15"],
    quizPassThreshold: 0.8,
  },

  // =========================================================================
  // NIVÅ 2 — MODULER
  // =========================================================================

  // --- Kurs 2.1: Förstå tekniken ---
  { id: "mod-2-1-1", courseId: "kurs-2-1", title: "Från text till tokens", description: "Hur AI bryter ner och förstår text — tokens, embeddings och kontextfönster.", order: 1, estimatedMinutes: 15, lessonIds: ["les-2-1-1-1", "les-2-1-1-2"], quizQuestionIds: ["aq-2-1-1", "aq-2-1-2", "aq-2-1-3", "aq-2-1-4", "aq-2-1-5"], quizPassThreshold: 0.8 },
  { id: "mod-2-1-2", courseId: "kurs-2-1", title: "Transformer-revolutionen", description: "Arkitekturen som förändrade allt — hur attention och transformer fungerar.", order: 2, estimatedMinutes: 15, lessonIds: ["les-2-1-2-1", "les-2-1-2-2"], quizQuestionIds: ["aq-2-1-6", "aq-2-1-7", "aq-2-1-8", "aq-2-1-9", "aq-2-1-10"], quizPassThreshold: 0.8 },
  { id: "mod-2-1-3", courseId: "kurs-2-1", title: "RAG — AI med dina dokument", description: "Retrieval-Augmented Generation: hur AI kan svara baserat på organisationens egen kunskap.", order: 3, estimatedMinutes: 15, lessonIds: ["les-2-1-3-1", "les-2-1-3-2"], quizQuestionIds: ["aq-2-1-11", "aq-2-1-12", "aq-2-1-13", "aq-2-1-14", "aq-2-1-15"], quizPassThreshold: 0.8 },
  { id: "mod-2-1-4", courseId: "kurs-2-1", title: "API:er & integrationer", description: "Hur AI-tjänster kommunicerar med andra system — API:er, webhooks och MCP.", order: 4, estimatedMinutes: 15, lessonIds: ["les-2-1-4-1", "les-2-1-4-2"], quizQuestionIds: ["aq-2-1-16", "aq-2-1-17", "aq-2-1-18", "aq-2-1-19", "aq-2-1-20"], quizPassThreshold: 0.8 },

  // --- Kurs 2.2: Intric — bygg din egen assistent ---
  { id: "mod-2-2-1", courseId: "kurs-2-2", title: "Spaces & assistenter", description: "Skapa ditt eget space och konfigurera din första assistent i Intric.", order: 1, estimatedMinutes: 15, lessonIds: ["les-2-2-1-1", "les-2-2-1-2"], quizQuestionIds: ["aq-2-2-1", "aq-2-2-2", "aq-2-2-3", "aq-2-2-4", "aq-2-2-5"], quizPassThreshold: 0.8 },
  { id: "mod-2-2-2", courseId: "kurs-2-2", title: "Kunskap & samlingar", description: "Koppla dokument, webbsidor och data till din assistent.", order: 2, estimatedMinutes: 15, lessonIds: ["les-2-2-2-1", "les-2-2-2-2"], quizQuestionIds: ["aq-2-2-6", "aq-2-2-7", "aq-2-2-8", "aq-2-2-9", "aq-2-2-10"], quizPassThreshold: 0.8 },
  { id: "mod-2-2-3", courseId: "kurs-2-2", title: "Promptdesign för assistenter", description: "Skriv systemprompts som styr assistentens beteende och ton.", order: 3, estimatedMinutes: 15, lessonIds: ["les-2-2-3-1", "les-2-2-3-2"], quizQuestionIds: ["aq-2-2-11", "aq-2-2-12", "aq-2-2-13", "aq-2-2-14", "aq-2-2-15"], quizPassThreshold: 0.8 },
  { id: "mod-2-2-4", courseId: "kurs-2-2", title: "Testa, iterera & dela", description: "Kvalitetssäkra och publicera din assistent för kollegor.", order: 4, estimatedMinutes: 15, lessonIds: ["les-2-2-4-1", "les-2-2-4-2"], quizQuestionIds: ["aq-2-2-16", "aq-2-2-17", "aq-2-2-18", "aq-2-2-19", "aq-2-2-20"], quizPassThreshold: 0.8 },

  // --- Kurs 2.3: Copilot & Microsoft 365 ---
  { id: "mod-2-3-1", courseId: "kurs-2-3", title: "Copilot förklarat", description: "Vad Copilot är, hur det fungerar och vad som krävs för att komma igång.", order: 1, estimatedMinutes: 15, lessonIds: ["les-2-3-1-1", "les-2-3-1-2"], quizQuestionIds: ["aq-2-3-1", "aq-2-3-2", "aq-2-3-3", "aq-2-3-4", "aq-2-3-5"], quizPassThreshold: 0.8 },
  { id: "mod-2-3-2", courseId: "kurs-2-3", title: "Copilot i Word, Excel & PowerPoint", description: "Skriv, analysera och presentera med AI-stöd i Office.", order: 2, estimatedMinutes: 15, lessonIds: ["les-2-3-2-1", "les-2-3-2-2"], quizQuestionIds: ["aq-2-3-6", "aq-2-3-7", "aq-2-3-8", "aq-2-3-9", "aq-2-3-10"], quizPassThreshold: 0.8 },
  { id: "mod-2-3-3", courseId: "kurs-2-3", title: "Copilot i Teams & Outlook", description: "Sammanfatta möten, hantera mejl och chatta med AI i Teams.", order: 3, estimatedMinutes: 15, lessonIds: ["les-2-3-3-1", "les-2-3-3-2"], quizQuestionIds: ["aq-2-3-11", "aq-2-3-12", "aq-2-3-13", "aq-2-3-14", "aq-2-3-15"], quizPassThreshold: 0.8 },
  { id: "mod-2-3-4", courseId: "kurs-2-3", title: "Copilot Studio & anpassning", description: "Bygg egna Copilot-agenter och automatiseringar.", order: 4, estimatedMinutes: 15, lessonIds: ["les-2-3-4-1", "les-2-3-4-2"], quizQuestionIds: ["aq-2-3-16", "aq-2-3-17", "aq-2-3-18", "aq-2-3-19", "aq-2-3-20"], quizPassThreshold: 0.8 },

  // --- Kurs 2.4: Lagar, regler & etik ---
  { id: "mod-2-4-1", courseId: "kurs-2-4", title: "AI Act i detalj", description: "EU:s AI-förordning — riskkategorier, krav och vad det innebär för kommunen.", order: 1, estimatedMinutes: 15, lessonIds: ["les-2-4-1-1", "les-2-4-1-2"], quizQuestionIds: ["aq-2-4-1", "aq-2-4-2", "aq-2-4-3", "aq-2-4-4", "aq-2-4-5"], quizPassThreshold: 0.8 },
  { id: "mod-2-4-2", courseId: "kurs-2-4", title: "GDPR & konsekvensbedömning", description: "Dataskydd på djupet — DPIA, dataskyddsombud och privacy by design.", order: 2, estimatedMinutes: 15, lessonIds: ["les-2-4-2-1", "les-2-4-2-2"], quizQuestionIds: ["aq-2-4-6", "aq-2-4-7", "aq-2-4-8", "aq-2-4-9", "aq-2-4-10"], quizPassThreshold: 0.8 },
  { id: "mod-2-4-3", courseId: "kurs-2-4", title: "Etisk AI i offentlig sektor", description: "Ramverk, principer och praktisk tillämpning av AI-etik.", order: 3, estimatedMinutes: 15, lessonIds: ["les-2-4-3-1", "les-2-4-3-2"], quizQuestionIds: ["aq-2-4-11", "aq-2-4-12", "aq-2-4-13", "aq-2-4-14", "aq-2-4-15"], quizPassThreshold: 0.8 },
  { id: "mod-2-4-4", courseId: "kurs-2-4", title: "Upphandling & avtal för AI", description: "Hur kommunen köper AI-tjänster rätt — avtal, krav och fallgropar.", order: 4, estimatedMinutes: 15, lessonIds: ["les-2-4-4-1", "les-2-4-4-2"], quizQuestionIds: ["aq-2-4-16", "aq-2-4-17", "aq-2-4-18", "aq-2-4-19", "aq-2-4-20"], quizPassThreshold: 0.8 },

  // =========================================================================
  // NIVÅ 3 — MODULER
  // =========================================================================

  // --- Kurs 3.1: AI-strategi ---
  { id: "mod-3-1-1", courseId: "kurs-3-1", title: "Identifiera AI-möjligheter", description: "Systematiskt hitta processer där AI kan skapa mest värde.", order: 1, estimatedMinutes: 18, lessonIds: ["les-3-1-1-1", "les-3-1-1-2"], quizQuestionIds: ["aq-3-1-1", "aq-3-1-2", "aq-3-1-3", "aq-3-1-4", "aq-3-1-5"], quizPassThreshold: 0.8 },
  { id: "mod-3-1-2", courseId: "kurs-3-1", title: "Från idé till pilot", description: "Planera, genomföra och utvärdera AI-piloter i verksamheten.", order: 2, estimatedMinutes: 18, lessonIds: ["les-3-1-2-1", "les-3-1-2-2"], quizQuestionIds: ["aq-3-1-6", "aq-3-1-7", "aq-3-1-8", "aq-3-1-9", "aq-3-1-10"], quizPassThreshold: 0.8 },
  { id: "mod-3-1-3", courseId: "kurs-3-1", title: "Förändringsledning & adoption", description: "Få kollegor att vilja använda AI — inte bara kunna.", order: 3, estimatedMinutes: 18, lessonIds: ["les-3-1-3-1", "les-3-1-3-2"], quizQuestionIds: ["aq-3-1-11", "aq-3-1-12", "aq-3-1-13", "aq-3-1-14", "aq-3-1-15"], quizPassThreshold: 0.8 },
  { id: "mod-3-1-4", courseId: "kurs-3-1", title: "Mäta effekt & ROI", description: "Kvantifiera AI:s värde — tid, kvalitet, kostnad.", order: 4, estimatedMinutes: 18, lessonIds: ["les-3-1-4-1", "les-3-1-4-2"], quizQuestionIds: ["aq-3-1-16", "aq-3-1-17", "aq-3-1-18", "aq-3-1-19", "aq-3-1-20"], quizPassThreshold: 0.8 },

  // --- Kurs 3.2: Avancerad AI-teknik ---
  { id: "mod-3-2-1", courseId: "kurs-3-2", title: "Finetuning & specialisering", description: "Anpassa AI-modeller för specifika uppgifter och domäner.", order: 1, estimatedMinutes: 18, lessonIds: ["les-3-2-1-1", "les-3-2-1-2"], quizQuestionIds: ["aq-3-2-1", "aq-3-2-2", "aq-3-2-3", "aq-3-2-4", "aq-3-2-5"], quizPassThreshold: 0.8 },
  { id: "mod-3-2-2", courseId: "kurs-3-2", title: "AI-agenter & automation", description: "Autonoma AI-system som kan planera, utföra och utvärdera uppgifter.", order: 2, estimatedMinutes: 18, lessonIds: ["les-3-2-2-1", "les-3-2-2-2"], quizQuestionIds: ["aq-3-2-6", "aq-3-2-7", "aq-3-2-8", "aq-3-2-9", "aq-3-2-10"], quizPassThreshold: 0.8 },
  { id: "mod-3-2-3", courseId: "kurs-3-2", title: "Multimodal AI", description: "AI som förstår och genererar text, bild, ljud och video.", order: 3, estimatedMinutes: 18, lessonIds: ["les-3-2-3-1", "les-3-2-3-2"], quizQuestionIds: ["aq-3-2-11", "aq-3-2-12", "aq-3-2-13", "aq-3-2-14", "aq-3-2-15"], quizPassThreshold: 0.8 },
  { id: "mod-3-2-4", courseId: "kurs-3-2", title: "AI-säkerhet på djupet", description: "Prompt injection, jailbreaks och hur man skyddar AI-system.", order: 4, estimatedMinutes: 18, lessonIds: ["les-3-2-4-1", "les-3-2-4-2"], quizQuestionIds: ["aq-3-2-16", "aq-3-2-17", "aq-3-2-18", "aq-3-2-19", "aq-3-2-20"], quizPassThreshold: 0.8 },

  // --- Kurs 3.3: Leda AI-initiativ ---
  { id: "mod-3-3-1", courseId: "kurs-3-3", title: "AI-policy & riktlinjer", description: "Utforma och implementera AI-policy för organisationen.", order: 1, estimatedMinutes: 18, lessonIds: ["les-3-3-1-1", "les-3-3-1-2"], quizQuestionIds: ["aq-3-3-1", "aq-3-3-2", "aq-3-3-3", "aq-3-3-4", "aq-3-3-5"], quizPassThreshold: 0.8 },
  { id: "mod-3-3-2", courseId: "kurs-3-3", title: "Utbilda & inspirera kollegor", description: "Metoder för att sprida AI-kompetens i organisationen.", order: 2, estimatedMinutes: 18, lessonIds: ["les-3-3-2-1", "les-3-3-2-2"], quizQuestionIds: ["aq-3-3-6", "aq-3-3-7", "aq-3-3-8", "aq-3-3-9", "aq-3-3-10"], quizPassThreshold: 0.8 },
  { id: "mod-3-3-3", courseId: "kurs-3-3", title: "Bygga AI-team & roller", description: "Rätt kompetens, rätt roller — organisera för AI-framgång.", order: 3, estimatedMinutes: 18, lessonIds: ["les-3-3-3-1", "les-3-3-3-2"], quizQuestionIds: ["aq-3-3-11", "aq-3-3-12", "aq-3-3-13", "aq-3-3-14", "aq-3-3-15"], quizPassThreshold: 0.8 },
  { id: "mod-3-3-4", courseId: "kurs-3-3", title: "Framtidsspaning", description: "AI-trender, AGI-debatten och vad som väntar runt hörnet.", order: 4, estimatedMinutes: 18, lessonIds: ["les-3-3-4-1", "les-3-3-4-2"], quizQuestionIds: ["aq-3-3-16", "aq-3-3-17", "aq-3-3-18", "aq-3-3-19", "aq-3-3-20"], quizPassThreshold: 0.8 },

  // --- Kurs 3.4: Verktygslandskapet ---
  { id: "mod-3-4-1", courseId: "kurs-3-4", title: "Öppna vs. stängda modeller", description: "Open source AI vs. proprietära lösningar — för- och nackdelar.", order: 1, estimatedMinutes: 18, lessonIds: ["les-3-4-1-1", "les-3-4-1-2"], quizQuestionIds: ["aq-3-4-1", "aq-3-4-2", "aq-3-4-3", "aq-3-4-4", "aq-3-4-5"], quizPassThreshold: 0.8 },
  { id: "mod-3-4-2", courseId: "kurs-3-4", title: "AI för bild, ljud & video", description: "Bildgenerering, talsyntes och videoproduktion med AI.", order: 2, estimatedMinutes: 18, lessonIds: ["les-3-4-2-1", "les-3-4-2-2"], quizQuestionIds: ["aq-3-4-6", "aq-3-4-7", "aq-3-4-8", "aq-3-4-9", "aq-3-4-10"], quizPassThreshold: 0.8 },
  { id: "mod-3-4-3", courseId: "kurs-3-4", title: "Low-code/No-code AI", description: "Bygg AI-lösningar utan programmering — Power Automate, Make, Zapier.", order: 3, estimatedMinutes: 18, lessonIds: ["les-3-4-3-1", "les-3-4-3-2"], quizQuestionIds: ["aq-3-4-11", "aq-3-4-12", "aq-3-4-13", "aq-3-4-14", "aq-3-4-15"], quizPassThreshold: 0.8 },
  { id: "mod-3-4-4", courseId: "kurs-3-4", title: "Framtidens arbetsplats", description: "AI och arbetsrätt, automatisering vs. augmentering, kompetensförflyttning.", order: 4, estimatedMinutes: 18, lessonIds: ["les-3-4-4-1", "les-3-4-4-2"], quizQuestionIds: ["aq-3-4-16", "aq-3-4-17", "aq-3-4-18", "aq-3-4-19", "aq-3-4-20"], quizPassThreshold: 0.8 },
];

// ---------------------------------------------------------------------------
// Nivå 1 — Lektioner (fullt innehåll)
// ---------------------------------------------------------------------------

export const LESSONS: Lesson[] = [
  // =========================================================================
  // KURS 1.1 — Vad är AI?
  // =========================================================================

  // --- Modul 1.1.1: AI förklarat ---
  {
    id: "les-1-1-1-1",
    moduleId: "mod-1-1-1",
    title: "Vad är artificiell intelligens?",
    order: 1,
    estimatedMinutes: 5,
    type: "reading",
    conceptIds: ["ai", "maskininlarning"],
    content: {
      hook: "Om du har använt stavningskontrollen i Word, röstigenkänning i din telefon eller fått en filmrekommendation på Netflix — grattis, du har redan använt AI.",
      funFact: "Begreppet 'artificiell intelligens' myntades redan 1956 på en sommarkonferens vid Dartmouth College. Forskarna trodde att problemet skulle vara löst inom en generation.",
      sections: [
        {
          heading: "AI är inte magi — det är matematik",
          text: "Artificiell intelligens (AI) är datorsystem som kan utföra uppgifter som normalt kräver mänsklig intelligens. Det handlar om att analysera data, hitta mönster och fatta beslut baserat på dessa mönster. AI 'tänker' inte som du och jag — den räknar, otroligt snabbt.",
          icon: "Brain",
        },
        {
          heading: "Hur lär sig en AI?",
          text: "Maskininlärning är grunden. Istället för att programmera exakta regler ('om X, gör Y') matar vi AI:n med tusentals exempel. Den hittar mönstren själv. Ju fler exempel, desto bättre blir den.",
          analogy: "Tänk dig ett barn som ser 1 000 bilder på katter. Ingen förklarar reglerna — barnet lär sig själv att känna igen en katt det aldrig sett förut. AI fungerar likadant, fast med miljontals exempel.",
          icon: "TrendingUp",
        },
      ],
      municipalExample: {
        title: "AI på kommunen idag",
        description: "I Katrineholms kommun används AI redan — via Intric-plattformen med assistenter som iKAI, VårdKAI och Konteringsassistenten, och via Microsoft Copilot i Office 365. AI hjälper medarbetare att förenkla sin vardag, från sjukvårdsfrågor till kontering och dokumenthantering.",
        department: "Alla förvaltningar",
        icon: "Building2",
      },
      interactiveElement: {
        type: "true-false",
        data: {
          statement: "AI kan tänka och förstå saker precis som en människa.",
          isTrue: false,
          explanation: "Nej! AI hittar mönster i data och gör statistiska beräkningar — den förstår inte på det sätt vi gör. Den är extremt bra på att se mönster, men har ingen verklig förståelse.",
        },
      },
      summary: [
        "AI är datorsystem som hittar mönster i data och fattar beslut baserat på dem",
        "Maskininlärning innebär att AI lär sig av exempel istället för programmerade regler",
        "Du använder redan AI i vardagen — stavningskontroll, Netflix-tips, röstigenkänning",
      ],
    },
  },
  {
    id: "les-1-1-1-2",
    moduleId: "mod-1-1-1",
    title: "Olika typer av AI",
    order: 2,
    estimatedMinutes: 5,
    type: "reading",
    conceptIds: ["deep-learning"],
    content: {
      hook: "Allt som kallas 'AI' är inte samma sak. Det finns enkel AI som sorterar din mejl, och avancerad AI som kan skriva dikter. Vad är skillnaden?",
      funFact: "Deep learning-modeller kan ha miljarder 'neuroner' — fler kopplingar än det finns stjärnor i Vintergatan.",
      sections: [
        {
          heading: "Specialiserad AI vs. generell AI",
          text: "Nästan all AI idag är specialiserad inom sitt område. Spam-filtret i din mejl kan hitta skräppost men inte sammanfatta ett dokument. ChatGPT kan hantera text och resonera men kan inte styra en robot eller köra bil. Varje AI-system har sina styrkor och begränsningar. En AI som verkligen kan allt — AGI — finns ännu inte.",
          icon: "Target",
        },
        {
          heading: "Deep learning — AI:s hemliga vapen",
          text: "Deep learning är en avancerad form av maskininlärning inspirerad av hjärnans neuroner. Den använder lager på lager av beräkningar ('djupa nätverk') och är anledningen till att AI plötsligt blivit så bra på språk, bild och tal de senaste åren.",
          analogy: "Tänk dig ett lag av detektiver. Den första tittar på enskilda ledtrådar, nästa sätter ihop dem till mönster, den tredje ser helheten. Ju fler lager av detektiver, desto mer komplexa samband kan de hitta.",
          icon: "Layers",
        },
      ],
      municipalExample: {
        title: "Deep learning bakom verktygen",
        description: "Varje gång du chattar med en assistent i Intric eller ber Copilot sammanfatta ett möte, är det deep learning som driver svaren. Samma teknik gör att Teams kan transkribera tal till text och att Outlook kan föreslå svar på mejl.",
        department: "IT & digitalisering",
        icon: "Cpu",
      },
      interactiveElement: {
        type: "multi-choice",
        data: {
          question: "Vilken typ av AI är vanligast idag?",
          options: [
            "Generell AI som kan allt",
            "Specialiserad AI som är bra på specifika uppgifter",
            "Superintelligent AI",
            "Robotar med medvetande",
          ],
          correctIndex: 1,
          explanation: "Rätt! All AI vi använder idag är specialiserad på specifika uppgifter. Generell AI existerar inte ännu.",
        },
      },
      summary: [
        "AI idag är specialiserad — bra inom sitt område, men ingen AI kan allt (AGI finns inte ännu)",
        "Deep learning använder lager av beräkningar inspirerade av hjärnan",
        "Det är deep learning som gjort AI så bra på språk och bild de senaste åren",
      ],
    },
  },

  // --- Modul 1.1.2: Generativ AI & språkmodeller ---
  {
    id: "les-1-1-2-1",
    moduleId: "mod-1-1-2",
    title: "Generativ AI — AI som skapar",
    order: 1,
    estimatedMinutes: 5,
    type: "reading",
    conceptIds: ["generativ-ai", "llm"],
    content: {
      hook: "Fram till nyligen kunde AI bara analysera och sortera. Nu kan den skapa — text, bilder, musik och kod. Det är den största förändringen sedan internet.",
      funFact: "ChatGPT nådde 100 miljoner användare på bara två månader — snabbare än någon tjänst i historien. TikTok tog 9 månader, Instagram 2,5 år.",
      sections: [
        {
          heading: "Från analys till skapande",
          text: "Generativ AI kan producera NYTT innehåll — inte bara analysera det som finns. Den kan skriva mejl, sammanfatta dokument, skapa bilder och till och med skriva kod. ChatGPT, Claude, Copilot och DALL-E är alla generativa AI-verktyg.",
          icon: "Wand2",
        },
        {
          heading: "Vad är en språkmodell (LLM)?",
          text: "En stor språkmodell (Large Language Model, LLM) är hjärnan bakom verktyg som ChatGPT och Claude. Den har läst miljarder texter — böcker, webbsidor, artiklar — och lärt sig mönstren i språket. När du ställer en fråga förutsäger den det mest sannolika nästa ordet, om och om igen, tills svaret är klart.",
          analogy: "Tänk dig någon som läst alla böcker som någonsin skrivits. Den personen kan inte 'tänka' — men den är otroligt bra på att gissa vad som borde komma härnäst i en mening. Det är precis vad en LLM gör.",
          icon: "BookOpen",
        },
      ],
      municipalExample: {
        title: "Generativ AI i kommunen",
        description: "Med generativ AI kan en handläggare snabbt få hjälp att sammanfatta ett tjänsteutlåtande, skriva utkast till mejl eller förenkla en text så att invånare lättare förstår den. Det sparar tid — ibland timmar per vecka.",
        department: "Kommunledningskontoret",
        icon: "FileText",
      },
      interactiveElement: {
        type: "match",
        data: [
          { term: "ChatGPT", definition: "OpenAI:s chattbaserade AI-assistent" },
          { term: "Claude", definition: "Anthropics AI-assistent" },
          { term: "Copilot", definition: "Microsofts AI integrerad i Office 365" },
          { term: "DALL-E", definition: "AI som skapar bilder från text" },
        ],
      },
      summary: [
        "Generativ AI skapar nytt innehåll — text, bilder, kod, musik",
        "En LLM (språkmodell) förutsäger nästa ord baserat på mönster i miljardtals texter",
        "ChatGPT, Claude och Copilot är alla generativa AI-verktyg",
      ],
    },
  },
  {
    id: "les-1-1-2-2",
    moduleId: "mod-1-1-2",
    title: "Tokens och kontext — hur AI 'läser'",
    order: 2,
    estimatedMinutes: 5,
    type: "reading",
    conceptIds: ["ai-modell", "token"],
    content: {
      hook: "När du skriver 'Hej, jag behöver hjälp' till en AI, ser den inte ord — den ser siffror. Hur kan den ändå förstå dig?",
      funFact: "Ordet 'kommunanställd' delas troligen upp i 3–4 tokens av en AI: 'kommun', 'an', 'ställ', 'd'. Svenska ord blir ofta fler tokens än engelska.",
      sections: [
        {
          heading: "AI-modeller — grunden",
          text: "En AI-modell är resultatet av all träning — alla mönster den lärt sig. Tänk på modellen som en färdigutbildad expert. Olika modeller (GPT-4, Claude, Gemini) har tränats på olika sätt och har olika styrkor. Modellen i sig ändras inte när du använder den — den tillämpar bara det den redan lärt sig.",
          icon: "Box",
        },
        {
          heading: "Tokens — AI:s byggstenar",
          text: "AI läser inte ord som du och jag. Den bryter ner text i 'tokens' — bitar som kan vara hela ord, delar av ord eller tecken. 'Artificiell intelligens' kan bli ['Artifici', 'ell', ' intell', 'igens']. Varje AI har en gräns för hur många tokens den kan hantera åt gången — det kallas kontextfönstret.",
          analogy: "Tänk dig att du ska memorera ett samtal, men du bara har plats för 1 000 post-it-lappar. Varje lapp = en token. Ju fler lappar (tokens) du har, desto längre samtal kan du komma ihåg.",
          icon: "Puzzle",
        },
      ],
      municipalExample: {
        title: "Varför tokens spelar roll",
        description: "Om du klistrar in ett 50-sidigt dokument i en AI-chatt kan den 'glömma' början innan den når slutet — för att kontextfönstret tar slut. Tips: ge AI:n de viktigaste delarna istället för hela dokumentet.",
        department: "Alla som använder Intric",
        icon: "Scissors",
      },
      interactiveElement: {
        type: "true-false",
        data: {
          statement: "En AI-modell lär sig nya saker varje gång du chattar med den.",
          isTrue: false,
          explanation: "Nej! Modellen är 'frusen' efter träning. Den lär sig inte av dina konversationer. Den tillämpar bara mönster den redan lärt sig. (Undantag: vissa system kan ha minne inom en session, men modellen i sig ändras inte.)",
        },
      },
      summary: [
        "En AI-modell är resultatet av träning — den ändras inte när du använder den",
        "Tokens är de bitar AI bryter ner text i — ett ord kan bli flera tokens",
        "Kontextfönstret begränsar hur mycket text AI kan 'komma ihåg' åt gången",
      ],
    },
  },

  // --- Modul 1.1.3: Prata med AI ---
  {
    id: "les-1-1-3-1",
    moduleId: "mod-1-1-3",
    title: "Prompten — din nyckel till bra svar",
    order: 1,
    estimatedMinutes: 7,
    type: "reading",
    conceptIds: ["prompt", "promptteknik"],
    content: {
      hook: "Skillnaden mellan ett dåligt och ett fantastiskt AI-svar? Det du skrev. Din prompt avgör allt.",
      funFact: "Det finns nu 'prompt engineers' — personer vars jobb är att skriva bra instruktioner till AI. Löner på över 200 000 kr/mån har rapporterats.",
      sections: [
        {
          heading: "Vad är en prompt?",
          text: "En prompt är helt enkelt den text du skriver till en AI. Det kan vara en fråga ('Vad är GDPR?'), en instruktion ('Sammanfatta den här texten') eller en uppgift ('Skriv ett mejl till en invånare om...'). Ju tydligare prompt, desto bättre svar.",
          icon: "MessageSquare",
        },
        {
          heading: "Fem tips för bättre prompts",
          text: "1. **Var specifik** — 'Skriv ett kort mejl som förklarar att parkeringstillståndet är godkänt' slår 'Skriv ett mejl'.\n2. **Ge kontext** — Berätta vem du skriver till och varför.\n3. **Be om format** — 'Svara med punktlista' eller 'Max 100 ord'.\n4. **Ge ett exempel** — Visa hur du vill att resultatet ska se ut.\n5. **Iterera** — Första svaret behöver inte vara perfekt. Säg 'Gör det kortare' eller 'Mer formellt'.",
          icon: "Lightbulb",
        },
        {
          heading: "Promptteknik — nivå upp",
          text: "Promptteknik handlar om att strategiskt formulera instruktioner. En enkel teknik: be AI:n 'tänka steg för steg'. Då resonerar den sig fram istället för att gissa — och svaren blir bättre, särskilt för komplexa frågor.",
          analogy: "En prompt är som att ge instruktioner till en ny kollega. Säger du bara 'Fix det' blir resultatet oförutsägbart. Säger du 'Skriv en sammanfattning av mötesprotokollet, max 5 punkter, fokusera på beslut' — då får du vad du behöver.",
          icon: "Settings",
        },
      ],
      municipalExample: {
        title: "Bra prompt på jobbet",
        description: "Istället för: 'Skriv ett mejl'\nTesta: 'Skriv ett professionellt mejl till en invånare som ansökt om bygglöv. Förklara att handläggningstiden är 10 veckor och att vi återkommer med beslut. Tonen ska vara vänlig och tydlig. Max 150 ord.'",
        department: "Samhällsbyggnad",
        icon: "Mail",
      },
      interactiveElement: {
        type: "multi-choice",
        data: {
          question: "Vilken prompt ger troligtvis bäst resultat?",
          options: [
            "Skriv nåt om AI",
            "Skriv en kort sammanfattning (max 5 punkter) av vad AI är för en kommunanställd som aldrig använt det förut",
            "AI?",
            "Berätta allt du vet om AI",
          ],
          correctIndex: 1,
          explanation: "Rätt! Den prompen är specifik (kort sammanfattning), har format (max 5 punkter), kontext (kommunanställd) och målgrupp (nybörjare). Det ger AI:n allt den behöver.",
        },
      },
      summary: [
        "En prompt är texten du skriver till AI — den avgör kvaliteten på svaret",
        "Var specifik, ge kontext, be om format, visa exempel och iterera",
        "Promptteknik som 'tänk steg för steg' ger bättre svar på komplexa frågor",
      ],
    },
  },
  {
    id: "les-1-1-3-2",
    moduleId: "mod-1-1-3",
    title: "AI-assistenter och hallucinationer",
    order: 2,
    estimatedMinutes: 6,
    type: "reading",
    conceptIds: ["ai-assistent", "hallucination"],
    content: {
      hook: "En AI-assistent svarade nyligen en advokat med tre rättsfall som stöd — problemet? Alla tre var påhittade. Välkommen till AI:s största svaghet.",
      funFact: "Fenomenet att AI hittar på fakta kallas 'hallucination'. Det beror inte på att AI:n ljuger — den vet inte skillnaden mellan sant och falskt. Den genererar det som 'låter' mest troligt.",
      sections: [
        {
          heading: "AI-assistenter — din digitala kollega",
          text: "En AI-assistent är en tjänst byggd på en språkmodell, designad för att hjälpa dig med uppgifter. Intric, ChatGPT och Copilot är alla AI-assistenter. De kan svara på frågor, sammanfatta texter, skriva utkast och hjälpa dig lösa problem — men de är verktyg, inte kollegor med eget omdöme.",
          icon: "Bot",
        },
        {
          heading: "Hallucinationer — när AI hittar på",
          text: "Hallucinationer är AI:s största svaghet. Eftersom en språkmodell förutsäger 'mest troliga nästa ord' kan den generera text som låter helt rimlig — men är helt fel. Den kan hitta på fakta, skapa falska källor och ge felaktiga svar med total självsäkerhet.",
          analogy: "Tänk dig en person som aldrig säger 'jag vet inte'. Istället gissar den — alltid — och låter jättesäker. Ibland träffar den rätt, ibland helt galet. Det är AI i ett nötskal.",
          icon: "AlertTriangle",
        },
        {
          heading: "Så hanterar du hallucinationer",
          text: "1. **Dubbelkolla alltid** — Lita aldrig blint på AI:s svar, särskilt för fakta, siffror och juridik.\n2. **Be om källor** — Fråga AI:n varifrån informationen kommer (men dubbelkolla dessa också!).\n3. **Känn igen varningssignaler** — Extremt specifika påståenden utan källa, eller svar som 'låter för bra'.\n4. **Använd AI som startpunkt** — Låt den ge utkast, inte slutprodukt.",
          icon: "CheckCircle",
        },
      ],
      municipalExample: {
        title: "Hallucination i praktiken",
        description: "En handläggare bad AI:n sammanfatta en lag och fick ett svar som blandade ihop två olika lagrum. Svaret lät korrekt, men var juridiskt fel. Lösning: använd alltid AI som stöd, inte som ensam källa — och dubbelkolla mot den faktiska lagtexten.",
        department: "Juridik & förvaltning",
        icon: "Scale",
      },
      interactiveElement: {
        type: "true-false",
        data: {
          statement: "Om en AI svarar med stor säkerhet betyder det att svaret stämmer.",
          isTrue: false,
          explanation: "Absolut inte! AI:n vet inte om den har rätt. Den genererar alltid text med samma 'självsäkerhet' oavsett om svaret är korrekt eller totalt påhittat. Du måste alltid granska.",
        },
      },
      summary: [
        "AI-assistenter som Intric och ChatGPT är verktyg — inte kollegor med omdöme",
        "Hallucinationer innebär att AI hittar på fakta som låter troliga men är fel",
        "Dubbelkolla ALLTID AI:s svar — särskilt fakta, siffror och juridisk information",
      ],
    },
  },

  // =========================================================================
  // KURS 1.2 — AI på jobbet
  // =========================================================================

  // --- Modul 1.2.1: AI som arbetsverktyg ---
  {
    id: "les-1-2-1-1",
    moduleId: "mod-1-2-1",
    title: "Chatbotar, assistenter och Copilot",
    order: 1,
    estimatedMinutes: 6,
    type: "reading",
    conceptIds: ["chatbot", "copilot-begrepp"],
    content: {
      hook: "Är en chatbot och en AI-assistent samma sak? Och vad är Copilot egentligen? Spoiler: det beror på vem du frågar.",
      funFact: "Microsofts Copilot heter så för att det är en 'andrepilot' — du flyger planet, AI:n hjälper till. Namnet är inspirerat av flygterminologi.",
      sections: [
        {
          heading: "Chatbot vs. AI-assistent",
          text: "En chatbot är ett program du chattar med. Enkla chatbotar följer förprogrammerade svar ('Tryck 1 för faktura'). AI-assistenter som ChatGPT och Intric använder språkmodeller och kan förstå nyanser, improvisera och hantera frågor de aldrig sett förut. Alla AI-assistenter är chatbotar — men alla chatbotar är inte AI-assistenter.",
          icon: "MessageSquare",
        },
        {
          heading: "Copilot — AI inbyggd i dina verktyg",
          text: "Microsoft Copilot är AI integrerad direkt i Office 365 — Word, Excel, PowerPoint, Teams, Outlook. Istället för att byta till en annan app kan du be om hjälp direkt där du jobbar. 'Sammanfatta det här mötet', 'Skapa en presentation från det här dokumentet', 'Skriv ett svar på det här mejlet'.",
          analogy: "Tänk dig att du har en erfaren kollega som sitter bredvid dig hela dagen, redo att hjälpa — men som aldrig tar egna initiativ. Du bestämmer, Copilot levererar.",
          icon: "Laptop",
        },
      ],
      municipalExample: {
        title: "Tre AI-verktyg på kommunen",
        description: "1. **Intric** — kommunens egen AI-plattform med säker datahanteriing\n2. **Microsoft Copilot** — inbyggd i Word, Excel och Teams (om licens finns)\n3. **Specialassistenter** — AI-assistenter byggda i Intric för specifika uppgifter (t.ex. 'HR-assistenten')",
        department: "IT",
        icon: "Monitor",
      },
      interactiveElement: {
        type: "match",
        data: [
          { term: "Enkel chatbot", definition: "Följer förprogrammerade svar" },
          { term: "AI-assistent", definition: "Använder språkmodell, kan improvisera" },
          { term: "Copilot", definition: "AI inbyggd i Office 365" },
          { term: "Intric", definition: "Kommunens egen AI-plattform" },
        ],
      },
      summary: [
        "Chatbotar kan vara enkla (regelbaserade) eller avancerade (AI-drivna)",
        "Copilot är Microsofts AI inbyggd direkt i Word, Excel, Teams och Outlook",
        "Kommunen har Intric som egen plattform + Copilot i Microsoft 365",
      ],
    },
  },
  {
    id: "les-1-2-1-2",
    moduleId: "mod-1-2-1",
    title: "Vad kan AI faktiskt hjälpa dig med?",
    order: 2,
    estimatedMinutes: 6,
    type: "reading",
    conceptIds: ["ai-assistent"],
    content: {
      hook: "Kan AI göra allt? Nej. Kan den spara dig timmar varje vecka? Absolut. Men du måste veta VAD du ska använda den till.",
      sections: [
        {
          heading: "AI:s superkrafter",
          text: "AI är bäst på repetitiva språkuppgifter:\n\n• **Sammanfatta** — Mötesprotokoll, rapporter, mejltrådar\n• **Skriva utkast** — Mejl, PM, informationstext\n• **Omformulera** — Förenkla, formalisera, korta ner\n• **Söka & förklara** — Hitta svar i dokument, förklara komplexa begrepp\n• **Strukturera** — Skapa agendor, punktlistor, dispositioner",
          icon: "Zap",
        },
        {
          heading: "Vad AI INTE bör göra",
          text: "• **Fatta beslut** — AI kan ge underlag, men beslut ska fattas av människor\n• **Hantera känslig data** — Personuppgifter, sekretessbelagd info hör inte hemma i öppna AI-verktyg\n• **Ersätta expertkunskap** — AI kan stödja, inte ersätta juridisk, medicinsk eller social bedömning\n• **Vara enda källan** — Alltid dubbelkolla mot officiella källor",
          icon: "ShieldOff",
        },
      ],
      municipalExample: {
        title: "Tidsbesparing i praktiken",
        description: "En enhetschef inom äldreomsorgen sparar ca 3 timmar per vecka genom att låta AI sammanfatta team-möten och skriva utkast till veckorapporter. Hon granskar och justerar — men slipper starta från noll.",
        department: "Vård & omsorg",
        icon: "Heart",
      },
      interactiveElement: {
        type: "multi-choice",
        data: {
          question: "Vilket av dessa är AI bäst lämpad för?",
          options: [
            "Fatta beslut om en elevs behov av särskilt stöd",
            "Sammanfatta ett 10-sidigt mötesprotokoll till 5 punkter",
            "Avgöra om en bygglovsansökan ska beviljas",
            "Diagnostisera en patients symptom",
          ],
          correctIndex: 1,
          explanation: "Rätt! Sammanfattning är en av AI:s starkaste sidor. Beslut om stöd, bygglov och diagnoser kräver mänsklig expertbedömning.",
        },
      },
      summary: [
        "AI sparar mest tid på sammanfattning, utkast, omformulering och sökning",
        "AI ska ALDRIG fatta beslut — den ger underlag, du bestämmer",
        "Känslig data och expertbedömningar hör inte hemma i AI utan kontroll",
      ],
    },
  },

  // --- Modul 1.2.2: Praktiska användningsfall ---
  {
    id: "les-1-2-2-1",
    moduleId: "mod-1-2-2",
    title: "Sammanfatta och skriva med AI",
    order: 1,
    estimatedMinutes: 6,
    type: "reading",
    conceptIds: ["sammanfattning", "textgenerering"],
    content: {
      hook: "Tänk dig att du har ett 20-sidigt dokument och 5 minuter. Med AI kan du ha en sammanfattning på 30 sekunder. Låt oss se hur.",
      sections: [
        {
          heading: "Sammanfatta — din vanligaste AI-uppgift",
          text: "Sammanfattning är troligtvis det du kommer använda AI till mest. Du kan:\n\n• Klistra in ett långt mejl och be om en kort version\n• Sammanfatta ett mötesprotokoll till beslut och åtgärdspunkter\n• Kondensera en rapport till en ledningsbriefing",
          icon: "FileText",
        },
        {
          heading: "Skriva utkast — börja aldrig från noll",
          text: "Textgenerering innebär att AI skriver text åt dig baserat på dina instruktioner. Det ersätter inte ditt skrivande — det ger dig en startpunkt. Du får ett utkast på sekunder som du sedan justerar och gör till ditt eget.",
          analogy: "Tänk dig att du ska baka en tårta. Istället för att börja med mjöl och ägg från scratch får du en halvfärdig deg. Du slipper grundjobbet och kan fokusera på dekoration och smak — det som gör den unik.",
          icon: "PenTool",
        },
      ],
      municipalExample: {
        title: "Prompt-exempel: Sammanfatta protokoll",
        description: "Prompt: 'Sammanfatta det här mötesprotokollet. Lista: 1) Beslut som fattades, 2) Åtgärdspunkter med ansvarig person, 3) Datum för nästa möte. Max 200 ord.'\n\nResultat: En strukturerad sammanfattning på 15 sekunder istället för 30 minuters läsande.",
        department: "Kommunstyrelsen",
        icon: "ClipboardList",
      },
      interactiveElement: {
        type: "fill-blank",
        data: {
          sentence: "När du ber AI sammanfatta ett dokument bör du alltid ange önskat ___ och längd.",
          correctAnswer: "format",
          distractors: ["språk", "typsnitt", "lösenord"],
        },
      },
      summary: [
        "Sammanfattning är AI:s vanligaste och mest tidsbesparande användning",
        "Textgenerering ger dig ett utkast — du granskar, justerar och godkänner",
        "Ange alltid önskat format, längd och fokus i din prompt",
      ],
    },
  },
  {
    id: "les-1-2-2-2",
    moduleId: "mod-1-2-2",
    title: "Transkribering och ärendehantering",
    order: 2,
    estimatedMinutes: 6,
    type: "reading",
    conceptIds: ["transkribering", "arendehantering-ai"],
    content: {
      hook: "Hur lång tid tar det dig att skriva ner ett 60 minuters möte? Med AI: under 5 minuter, automatiskt.",
      sections: [
        {
          heading: "Transkribering — tal till text",
          text: "AI-baserad transkribering omvandlar inspelat tal till text. Microsoft Teams kan transkribera möten i realtid. Du får en sökbar text av hela samtalet — perfekt som underlag för sammanfattning efteråt.",
          icon: "Mic",
        },
        {
          heading: "AI i ärendehantering",
          text: "AI kan hjälpa till att sortera, kategorisera och prioritera ärenden. Den kan läsa inkommande meddelanden och föreslå vilken enhet som bör hantera dem, identifiera brådskande ärenden och ge handläggare förslag på svar baserat på tidigare liknande ärenden.",
          analogy: "Som en erfaren receptionist som direkt vet vart varje samtal ska kopplas — fast en som kan hantera hundratals ärenden samtidigt utan att tappa tråden.",
          icon: "FolderKanban",
        },
      ],
      municipalExample: {
        title: "Teams-transkribering",
        description: "I Katrineholms kommun kan Teams-möten transkriberas automatiskt (om funktionen är aktiverad). Efter mötet får du hela konversationen som text. Be sedan AI:n sammanfatta den — och du har mötesanteckningar utan att ha antecknat en enda rad.",
        department: "Alla förvaltningar",
        icon: "Video",
      },
      interactiveElement: {
        type: "true-false",
        data: {
          statement: "AI kan helt automatisera ärendehantering utan mänsklig översikt.",
          isTrue: false,
          explanation: "Nej! AI kan hjälpa till att sortera och föreslå, men en människa måste alltid granska och godkänna — särskilt myndighetsärenden som kräver korrekt handläggning.",
        },
      },
      summary: [
        "Transkribering omvandlar tal till sökbar text — perfekt för möten",
        "AI kan sortera, kategorisera och föreslå åtgärder i ärendehantering",
        "Mänsklig granskning är alltid nödvändig — AI assisterar, inte beslutar",
      ],
    },
  },

  // --- Modul 1.2.3: Intric — din första chatt ---
  {
    id: "les-1-2-3-1",
    moduleId: "mod-1-2-3",
    title: "Välkommen till Intric",
    order: 1,
    estimatedMinutes: 6,
    type: "reading",
    conceptIds: ["intric-plattform"],
    content: {
      hook: "Kommunen har sin egen AI-plattform — och den heter Intric. Den är byggd för svenska myndigheter och hanterar data säkert. Låt oss ta en titt.",
      funFact: "Intric är byggt av ett svenskt företag och specialdesignat för offentlig sektor. All data stannar inom EU, och plattformen uppfyller GDPR och svenska säkerhetskrav.",
      sections: [
        {
          heading: "Vad är Intric?",
          text: "Intric är en AI-plattform för offentlig sektor. Den låter dig chatta med AI, bygga egna assistenter och koppla dem till organisationens dokument. Tänk på det som kommunens egna, säkra version av ChatGPT — fast med möjlighet att anpassa assistenterna för specifika uppgifter.",
          icon: "Boxes",
        },
        {
          heading: "Varför Intric istället för ChatGPT?",
          text: "• **Datasäkerhet** — All data stannar inom EU och hanteras enligt GDPR\n• **Anpassningsbart** — Vi kan bygga assistenter specifikt för kommunens behov\n• **Organisationskunskap** — Assistenter kan kopplas till våra egna dokument\n• **Kontroll** — IT-avdelningen har full insyn i hur plattformen används",
          icon: "Shield",
        },
      ],
      municipalExample: {
        title: "Intric på Katrineholm",
        description: "Katrineholms kommun har Intric som sin primära AI-plattform. Du hittar den via AI-hubben. Där kan du chatta med AI, ställa frågor om kommunens riktlinjer och använda specialbyggda assistenter för din förvaltning.",
        department: "IT & digitalisering",
        icon: "Landmark",
      },
      interactiveElement: {
        type: "multi-choice",
        data: {
          question: "Varför använder kommunen Intric istället för bara ChatGPT?",
          options: [
            "ChatGPT är för dyrt",
            "Intric är snabbare",
            "Intric hanterar data säkert inom EU och kan anpassas för kommunens behov",
            "ChatGPT fungerar inte på svenska",
          ],
          correctIndex: 2,
          explanation: "Rätt! Datasäkerhet, GDPR-efterlevnad och möjligheten att bygga egna assistenter med kommunens dokument är huvudskälen.",
        },
      },
      summary: [
        "Intric är kommunens säkra AI-plattform, byggd för svenska myndigheter",
        "All data stannar inom EU — tryggare än öppna AI-verktyg",
        "Du kan chatta med AI och använda specialbyggda assistenter för din förvaltning",
      ],
    },
  },
  {
    id: "les-1-2-3-2",
    moduleId: "mod-1-2-3",
    title: "Din första chatt i Intric",
    order: 2,
    estimatedMinutes: 6,
    type: "reading",
    conceptIds: ["intric-personlig-chatt"],
    content: {
      hook: "Redo att testa? Att starta din första AI-chatt i Intric tar under 30 sekunder. Här visar vi steg för steg.",
      sections: [
        {
          heading: "Steg-för-steg: Din första chatt",
          text: "1. **Gå till Intric** via AI-hubben (aihubben.se) eller direkt länk\n2. **Logga in** med ditt kommunkonto\n3. **Klicka 'Ny chatt'** eller välj en färdig assistent\n4. **Skriv din prompt** — börja enkelt, t.ex. 'Vad kan du hjälpa mig med?'\n5. **Läs svaret** och ställ följdfrågor\n6. **Starta ny chatt** för ett nytt ämne — det ger bättre svar",
          icon: "Play",
        },
        {
          heading: "Tips för bästa upplevelsen",
          text: "• **En fråga i taget** — AI:n ger bättre svar på fokuserade frågor\n• **Ny chatt = nytt ämne** — Blanda inte olika uppgifter i samma konversation\n• **Testa och experimentera** — Du kan inte 'göra fel'. Utforska fritt!\n• **Spara bra prompts** — Om du hittar en formulering som funkar, skriv ner den",
          icon: "Lightbulb",
        },
      ],
      municipalExample: {
        title: "Tre bra första prompts att testa",
        description: "1. 'Hjälp mig skriva ett kort informationsmejl till föräldrar om skolavslutningen den 12 juni'\n2. 'Förklara vad GDPR innebär för min roll som handläggare, i max 5 punkter'\n3. 'Jag ska presentera vårt projekt på 5 min. Ge mig en disposition med 4 delar'",
        department: "Alla",
        icon: "Sparkles",
      },
      interactiveElement: {
        type: "fill-blank",
        data: {
          sentence: "När du byter ämne i Intric bör du starta en ny ___ för bästa resultat.",
          correctAnswer: "chatt",
          distractors: ["assistent", "webbläsare", "dator"],
        },
      },
      summary: [
        "Starta din första Intric-chatt via AI-hubben — det tar 30 sekunder",
        "Var specifik, ställ en fråga i taget och starta ny chatt för nytt ämne",
        "Du kan inte göra fel — experimentera fritt!",
      ],
    },
  },

  // =========================================================================
  // KURS 1.3 — Använd AI säkert
  // =========================================================================

  // --- Modul 1.3.1: Fallgropar & risker ---
  {
    id: "les-1-3-1-1",
    moduleId: "mod-1-3-1",
    title: "Hallucinationer och bias",
    order: 1,
    estimatedMinutes: 6,
    type: "reading",
    conceptIds: ["hallucination", "bias"],
    content: {
      hook: "En AI-assistent på ett sjukhus rekommenderade en behandling som inte existerade. En annan visade sig vara systematiskt sämre på att hjälpa vissa grupper. Vad gick fel?",
      sections: [
        {
          heading: "Hallucinationer — återbesök",
          text: "Vi nämnde hallucinationer i förra kursen. Nu fördjupar vi oss. Hallucinationer uppstår för att AI:n inte har en 'sanningskompass'. Den genererar troliga svar — inte sanna svar. Risken ökar när du frågar om specifika fakta, datum, lagar eller personer.",
          icon: "AlertTriangle",
        },
        {
          heading: "Bias — snedvridning i AI",
          text: "Bias innebär att AI systematiskt snedvrider resultat. Om AI:n tränats på texter där vissa grupper beskrivs negativt, kan den reproducera dessa fördomar. I en kommun kan det innebära att en AI-assistent ger olika kvalitet på svar beroende på hur frågan formuleras.",
          analogy: "Om du bara läste nyheter från EN tidning hela livet, skulle du se världen genom den tidningens glasögon. AI har samma problem — den speglar de texter den tränats på, med alla sina snedvridningar.",
          icon: "Scale",
        },
      ],
      municipalExample: {
        title: "Bias-risk i kommunen",
        description: "Om AI används för att föreslå prioritering av ärenden finns risk att den nedprioriterar grupper som var underrepresenterade i träningsdatan. Därför ska AI aldrig ensam fatta beslut som påverkar invånare — alltid med mänsklig granskning.",
        department: "Socialtjänsten",
        icon: "Users",
      },
      interactiveElement: {
        type: "true-false",
        data: {
          statement: "Bias i AI beror alltid på att någon medvetet programmerat in fördomar.",
          isTrue: false,
          explanation: "Nej! Bias uppstår oftast omedvetet — genom snedvridning i den data AI:n tränats på. Ingen behöver ha haft ont uppsåt, men resultatet kan ändå vara diskriminerande.",
        },
      },
      summary: [
        "Hallucinationer: AI genererar troliga, inte sanna svar — dubbelkolla alltid",
        "Bias: AI kan reproducera samhällets fördomar från sin träningsdata",
        "Mänsklig granskning är det viktigaste skyddet mot båda problemen",
      ],
    },
  },
  {
    id: "les-1-3-1-2",
    moduleId: "mod-1-3-1",
    title: "Källkritik i AI-eran",
    order: 2,
    estimatedMinutes: 5,
    type: "reading",
    conceptIds: ["kallkritik"],
    content: {
      hook: "Du har alltid källkritiskt granskat information — men AI gör det svårare. Texten låter mer övertygande, produceras snabbare och kan vara helt påhittad.",
      sections: [
        {
          heading: "Källkritik 2.0",
          text: "Klassisk källkritik (Vem säger det? Varför? Stämmer det med andra källor?) gäller fortfarande — men med AI tillkommer nya frågor:\n\n• **Genererade det av AI?** — Text kan vara helt AI-genererad utan att det framgår\n• **Finns källan?** — AI kan skapa trovärdiga men falska källor\n• **Är det aktuellt?** — AI:ns kunskap har ett slutdatum (den vet inte vad som hänt nyligen)",
          icon: "Search",
        },
        {
          heading: "Praktisk källkritik-checklista",
          text: "Innan du använder AI-genererad information:\n\n✅ Dubbelkolla fakta mot officiella källor\n✅ Verifiera att nämnda lagar/regler faktiskt existerar\n✅ Kontrollera siffror och statistik\n✅ Fråga dig: 'Hade jag litat på detta från en okänd person?'\n✅ Vid osäkerhet — fråga en kollega med expertkunskap",
          icon: "ClipboardCheck",
        },
      ],
      municipalExample: {
        title: "Källkritik på jobbet",
        description: "En handläggare fick ett AI-genererat svar som hänvisade till 'Kommunallagen 14 kap. 3§'. Paragrafen existerade inte. Genom att alltid dubbelkolla mot riksdagen.se fångas sådana fel direkt.",
        department: "Juridik",
        icon: "BookOpen",
      },
      interactiveElement: {
        type: "multi-choice",
        data: {
          question: "Vilket är det bästa sättet att hantera AI-genererad information?",
          options: [
            "Lita på den om den låter trovärdig",
            "Alltid dubbelkolla mot officiella/ursprungliga källor",
            "Be AI:n bekräfta att svaret stämmer",
            "Ignorera den helt — AI kan aldrig ha rätt",
          ],
          correctIndex: 1,
          explanation: "Rätt! Dubbelkolla alltid mot officiella källor. Att be AI:n bekräfta sig själv fungerar inte — den 'tror' alltid att den har rätt.",
        },
      },
      summary: [
        "AI gör källkritik viktigare — inte mindre viktigt",
        "Kontrollera alltid fakta, lagar och siffror mot officiella källor",
        "Be aldrig AI bekräfta sig själv — den vet inte om den har fel",
      ],
    },
  },

  // --- Modul 1.3.2: Informationssäkerhet & GDPR ---
  {
    id: "les-1-3-2-1",
    moduleId: "mod-1-3-2",
    title: "Vad får du skriva till en AI?",
    order: 1,
    estimatedMinutes: 6,
    type: "reading",
    conceptIds: ["informationssakerhet", "ai-sekretess"],
    content: {
      hook: "Samsung-anställda läckte känslig källkod genom att klistra in den i ChatGPT. Företaget förbjöd sedan all AI-användning. Vad lär vi oss?",
      funFact: "Data som skrivs in i öppna AI-tjänster (som gratisversionen av ChatGPT) kan användas för att träna framtida modeller. Det betyder att din text kan dyka upp i andras svar.",
      sections: [
        {
          heading: "Gyllene regeln",
          text: "**Skriv aldrig något till en AI som du inte skulle skriva på en anslagstavla.** Innan du klistrar in text, fråga dig: 'Skulle det vara okej om alla kunde se det här?' Om svaret är nej — skriv det inte.",
          icon: "ShieldAlert",
        },
        {
          heading: "Vad du ALDRIG ska skriva",
          text: "• **Personuppgifter** — Namn, personnummer, adresser, telefonnummer\n• **Känsliga uppgifter** — Hälsoinfo, etnisk tillhörighet, politiska åsikter\n• **Sekretessbelagd info** — Uppgifter som lyder under offentlighets- och sekretesslagen\n• **Interna strategier** — Budget, personalärenden, kommande beslut\n• **Lösenord & inloggning** — Aldrig, under några omständigheter",
          icon: "Lock",
        },
        {
          heading: "Intric vs. öppna AI-verktyg",
          text: "Intric är säkrare än öppna verktyg som ChatGPT, för att data stannar inom EU och inte används för träning. Men även i Intric ska du vara försiktig med personuppgifter och sekretessbelagd information — bättre att anonymisera.",
          icon: "ShieldCheck",
        },
      ],
      municipalExample: {
        title: "Anonymisera först!",
        description: "Istället för: 'Sammanfatta ärendet om Lisa Andersson, 850612-1234, som ansökt om försörjningsstöd'\n\nSkriv: 'Sammanfatta ett ärende där en person ansökt om försörjningsstöd. Ärendet gäller...'",
        department: "Socialtjänsten",
        icon: "UserMinus",
      },
      interactiveElement: {
        type: "multi-choice",
        data: {
          question: "Vilken av dessa är okej att skriva i Intric?",
          options: [
            "Sammanfatta den här texten: [tjänsteutlåtande utan personuppgifter]",
            "Hjälp mig skriva ett svar till Anna Johansson, 19850301-1234",
            "Vad borde vi göra med medarbetaren som presterar dåligt på HR-avdelningen?",
            "Här är budgetunderlaget för nästa år, analysera",
          ],
          correctIndex: 0,
          explanation: "Rätt! En text utan personuppgifter eller känslig info är säker att bearbeta. De andra innehåller personuppgifter, personalärende eller känslig ekonomisk information.",
        },
      },
      summary: [
        "Skriv aldrig något till AI som du inte skulle sätta på en anslagstavla",
        "Personuppgifter, sekretess och interna strategier ska ALDRIG in i AI",
        "Intric är säkrare men anonymisera ändå — bättre safe than sorry",
      ],
    },
  },
  {
    id: "les-1-3-2-2",
    moduleId: "mod-1-3-2",
    title: "GDPR och AI i kommunen",
    order: 2,
    estimatedMinutes: 6,
    type: "reading",
    conceptIds: ["gdpr", "offentlighetsprincipen-ai"],
    content: {
      hook: "GDPR och AI — två bokstavskombinationer som kan kännas krångliga var för sig. Tillsammans? Inte så svårt som du tror. Här är det du behöver veta.",
      sections: [
        {
          heading: "GDPR i korta drag",
          text: "GDPR (dataskyddsförordningen) skyddar personers integritet. I korthet: du får bara behandla personuppgifter om du har laglig grund, du ska samla in så lite data som möjligt, och personen har rätt att veta vad du gör med deras uppgifter.",
          icon: "Shield",
        },
        {
          heading: "GDPR + AI = var försiktig med personuppgifter",
          text: "När du använder AI behandlas din inmatning som data. Om den innehåller personuppgifter, behandlar du personuppgifter — och då gäller GDPR. I praktiken: **anonymisera innan du använder AI**. Ta bort namn, personnummer, adresser och allt annat som kan identifiera en person.",
          icon: "UserX",
        },
        {
          heading: "Offentlighetsprincipen",
          text: "Som myndighet gäller även offentlighetsprincipen. AI-genererade texter som används i myndighetsutövning kan bli allmänna handlingar. Tänk på: Vad du skriver till AI:n kan begäras ut. Var professionell även i dina prompts.",
          analogy: "Tänk på AI-chatten som ett internt mejl — det kan bli offentligt. Skriv inget du inte vill se i tidningen.",
          icon: "FileSearch",
        },
      ],
      municipalExample: {
        title: "GDPR-säker AI-användning",
        description: "Tumregel: Om du skriver om en person, anonymisera. Om du är osäker, fråga din chef eller dataskyddsombudet. Bättre att fråga en gång för mycket än att bryta mot GDPR.",
        department: "Alla förvaltningar",
        icon: "HelpCircle",
      },
      interactiveElement: {
        type: "true-false",
        data: {
          statement: "GDPR gäller inte när man använder Intric eftersom det är kommunens egna plattform.",
          isTrue: false,
          explanation: "Fel! GDPR gäller alltid vid behandling av personuppgifter, oavsett vilken plattform du använder. Att Intric är säkrare minskar INTE ditt ansvar att hantera personuppgifter korrekt.",
        },
      },
      summary: [
        "GDPR gäller alltid — anonymisera personuppgifter innan du använder AI",
        "AI-genererade texter kan bli allmänna handlingar — var professionell",
        "Vid osäkerhet: fråga din chef eller dataskyddsombudet",
      ],
    },
  },

  // --- Modul 1.3.3: Ansvarsfull AI ---
  {
    id: "les-1-3-3-1",
    moduleId: "mod-1-3-3",
    title: "Transparens och mänsklig kontroll",
    order: 1,
    estimatedMinutes: 7,
    type: "reading",
    conceptIds: ["transparens", "mansklig-kontroll", "ansvarsfull-ai"],
    content: {
      hook: "Om en AI ger ett felaktigt råd som påverkar en invånare — vem bär ansvaret? Spoiler: inte AI:n.",
      sections: [
        {
          heading: "Transparens — var öppen med AI-användning",
          text: "Transparens betyder att vara ärlig om när och hur AI används. Om du använder AI för att skriva ett svar till en invånare, är det god praxis att nämna det. 'Med stöd av AI-verktyg' räcker. Det handlar om förtroende.",
          icon: "Eye",
        },
        {
          heading: "Mänsklig kontroll — du bestämmer",
          text: "Den viktigaste principen: **en människa ska alltid ha sista ordet**. AI kan föreslå, formulera och analysera — men beslutet är ditt. Du granskar, du justerar, du godkänner. Det är inte en svaghet i systemet — det ÄR systemet.",
          icon: "UserCheck",
        },
        {
          heading: "Ansvarsfull AI i vardagen",
          text: "Ansvarsfull AI-användning handlar om att:\n\n• **Granska** — Läs igenom allt AI producerar\n• **Ifrågasätta** — Stämmer detta? Saknas något?\n• **Ta ansvar** — När du skickar ett AI-genererat mejl är det DITT mejl\n• **Lära av misstag** — Dela med kollegor om AI gav fel resultat\n• **Utvecklas** — Ju mer du använder AI, desto bättre blir du på att använda den rätt",
          analogy: "Du är piloten, AI:n är autopiloten. Autopiloten kan flyga långa sträckor — men du landar planet, du gör bedömningar i svåra situationer och du har det yttersta ansvaret.",
          icon: "Compass",
        },
      ],
      municipalExample: {
        title: "Ansvar i praktiken",
        description: "Om du skickar ett beslut som baseras på AI-genererat underlag och det visar sig vara felaktigt, är det DU (och kommunen) som bär ansvaret — inte AI:n, inte Intric, inte OpenAI. Därför: granska alltid innan du agerar.",
        department: "Alla förvaltningar",
        icon: "Gavel",
      },
      interactiveElement: {
        type: "multi-choice",
        data: {
          question: "Vem bär ansvaret om ett AI-genererat svar till en invånare innehåller felaktig information?",
          options: [
            "AI-leverantören (t.ex. OpenAI eller Intric)",
            "Den medarbetare som skickade svaret",
            "IT-avdelningen som köpt in AI-verktyget",
            "Ingen — AI-fel är oförutsägbara",
          ],
          correctIndex: 1,
          explanation: "Rätt! Du som medarbetare (och kommunen) bär ansvaret. Därför är mänsklig granskning inte valfritt — det är obligatoriskt.",
        },
      },
      summary: [
        "Var transparent — berätta när AI används",
        "Du har alltid sista ordet — AI föreslår, du beslutar",
        "Ansvaret för AI-genererat innehåll ligger på dig, inte på AI:n",
      ],
    },
  },
  // Nivå 2 & 3 lessons appended from separate files
  ...LESSONS_NIVA_2,
  ...LESSONS_NIVA_3,
];

// ---------------------------------------------------------------------------
// Nivå 1 — Quiz-frågor (för modulquiz)
// ---------------------------------------------------------------------------

export const ACADEMY_QUIZ_QUESTIONS: AcademyQuizQuestion[] = [
  // --- Modul 1.1.1: AI förklarat ---
  { id: "aq-1-1-1", moduleId: "mod-1-1-1", question: "Vad är AI i grunden?", options: ["En robot med medvetande", "Datorsystem som hittar mönster i data", "Ett program som alltid har rätt", "En ersättare för mänskligt tänkande"], correctIndex: 1, explanation: "AI är datorsystem som analyserar data och hittar mönster — det handlar om matematik, inte medvetande." },
  { id: "aq-1-1-2", moduleId: "mod-1-1-1", question: "Hur lär sig en AI genom maskininlärning?", options: ["Genom att följa exakta regler en programmerare skrivit", "Genom att analysera tusentals exempel och hitta mönster", "Genom att kopiera mänskligt beteende", "Genom att söka på internet i realtid"], correctIndex: 1, explanation: "Maskininlärning innebär att AI lär sig mönster från stora mängder data/exempel." },
  { id: "aq-1-1-3", moduleId: "mod-1-1-1", question: "Vilken typ av AI är vanligast idag?", options: ["Generell AI (AGI)", "Superintelligent AI", "Specialiserad AI som är bra på specifika uppgifter", "Medveten AI"], correctIndex: 2, explanation: "All AI vi använder idag är specialiserad på specifika uppgifter." },
  { id: "aq-1-1-4", moduleId: "mod-1-1-1", question: "Vad är deep learning?", options: ["AI som lär sig under jorden", "Avancerad maskininlärning med lager av beräkningar", "AI som kan tänka djupa tankar", "En ny programmeringsstil"], correctIndex: 1, explanation: "Deep learning använder 'djupa' nätverk med flera lager, inspirerade av hjärnans neuroner." },
  { id: "aq-1-1-5", moduleId: "mod-1-1-1", question: "Vilket av dessa är ett exempel på AI i vardagen?", options: ["En vanlig miniräknare", "Stavningskontroll i Word", "En papperskalender", "En enkel väckarklocka"], correctIndex: 1, explanation: "Stavningskontroll använder AI/maskininlärning för att förstå kontext och föreslå korrigeringar." },

  // --- Modul 1.1.2: Generativ AI & språkmodeller ---
  { id: "aq-1-1-6", moduleId: "mod-1-1-2", question: "Vad kan generativ AI göra som äldre AI inte kunde?", options: ["Analysera data snabbare", "Skapa nytt innehåll som text, bilder och kod", "Koppla upp sig mot internet", "Fatta bättre beslut"], correctIndex: 1, explanation: "Det som är nytt med generativ AI är att den kan SKAPA nytt innehåll — inte bara analysera." },
  { id: "aq-1-1-7", moduleId: "mod-1-1-2", question: "Vad gör en stor språkmodell (LLM)?", options: ["Översätter mellan alla världens språk", "Förutsäger det mest sannolika nästa ordet", "Förstår och tänker som en människa", "Söker svar på internet"], correctIndex: 1, explanation: "En LLM genererar text genom att förutsäga nästa ord, baserat på mönster från miljardtals texter." },
  { id: "aq-1-1-8", moduleId: "mod-1-1-2", question: "Vad är tokens?", options: ["AI:ns valuta", "Bitar som AI bryter ner text i", "Lösenord för att komma åt AI", "Poäng man samlar i AI-spel"], correctIndex: 1, explanation: "Tokens är de bitar en AI bryter ner text i — ord, delar av ord eller tecken." },
  { id: "aq-1-1-9", moduleId: "mod-1-1-2", question: "Lär sig en AI-modell nya saker varje gång du chattar med den?", options: ["Ja, den blir smartare för varje konversation", "Nej, modellen är frusen efter träning", "Ja, men bara om du ger feedback", "Det beror på modellen"], correctIndex: 1, explanation: "Modellen ändras inte av dina konversationer — den tillämpar mönster den redan lärt sig." },
  { id: "aq-1-1-10", moduleId: "mod-1-1-2", question: "Vilket av dessa är generativa AI-verktyg?", options: ["Excel, Word, PowerPoint", "ChatGPT, Claude, Copilot", "Google, Bing, Yahoo", "Outlook, Teams, Slack"], correctIndex: 1, explanation: "ChatGPT (OpenAI), Claude (Anthropic) och Copilot (Microsoft) är alla generativa AI-verktyg." },

  // --- Modul 1.1.3: Prata med AI ---
  { id: "aq-1-1-11", moduleId: "mod-1-1-3", question: "Vad är en prompt?", options: ["AI:ns svar till dig", "Texten du skriver till AI:n", "En typ av AI-modell", "Ett felmeddelande från AI"], correctIndex: 1, explanation: "En prompt är din instruktion eller fråga till AI:n — det du skriver in." },
  { id: "aq-1-1-12", moduleId: "mod-1-1-3", question: "Vilket av dessa tips förbättrar dina prompts mest?", options: ["Skriv så kort som möjligt", "Var specifik och ge kontext", "Använd bara engelska", "Upprepa frågan flera gånger"], correctIndex: 1, explanation: "Specificitet och kontext är de viktigaste faktorerna för bra AI-svar." },
  { id: "aq-1-1-13", moduleId: "mod-1-1-3", question: "Vad är en hallucination i AI-sammanhang?", options: ["När AI:n kraschar", "När AI:n genererar felaktig info med stor säkerhet", "När AI:n vägrar svara", "När AI:n svarar på fel språk"], correctIndex: 1, explanation: "Hallucinationer innebär att AI hittar på fakta som låter troliga men är helt fel." },
  { id: "aq-1-1-14", moduleId: "mod-1-1-3", question: "Hur bör du hantera AI:ns svar?", options: ["Lita på dem helt — AI har tränat på miljarder texter", "Alltid dubbelkolla fakta och siffror", "Ignorera dem — AI har alltid fel", "Bara lita på dem om de är långa"], correctIndex: 1, explanation: "Alltid dubbelkolla — AI kan ge imponerande men felaktiga svar." },
  { id: "aq-1-1-15", moduleId: "mod-1-1-3", question: "Vad gör prompttekniken 'tänk steg för steg'?", options: ["AI:n svarar snabbare", "AI:n resonerar sig fram istället för att gissa", "AI:n skriver med numrerade steg", "AI:n frågar dig följdfrågor"], correctIndex: 1, explanation: "Att be AI:n tänka steg för steg ger den 'utrymme att resonera' och ger bättre svar." },

  // --- Modul 1.2.1: AI som arbetsverktyg ---
  { id: "aq-1-2-1", moduleId: "mod-1-2-1", question: "Vad skiljer en AI-assistent från en enkel chatbot?", options: ["AI-assistenten kostar mer", "AI-assistenten använder en språkmodell och kan improvisera", "Det finns ingen skillnad", "Enkla chatbotar är smartare"], correctIndex: 1, explanation: "AI-assistenter använder språkmodeller och kan hantera nya frågor, medan enkla chatbotar följer förprogrammerade svar." },
  { id: "aq-1-2-2", moduleId: "mod-1-2-1", question: "Vad är Microsoft Copilot?", options: ["En fristående AI-app", "AI integrerad direkt i Office 365", "En ersättare för Office", "Microsofts sökmotor"], correctIndex: 1, explanation: "Copilot är AI inbyggd i Word, Excel, PowerPoint, Teams och Outlook." },
  { id: "aq-1-2-3", moduleId: "mod-1-2-1", question: "Vilken uppgift är AI BÄST lämpad för?", options: ["Fatta myndighetsbeslut", "Sammanfatta en lång rapport till 5 punkter", "Diagnostisera sjukdomar", "Bedöma en elevs kunskapsnivå"], correctIndex: 1, explanation: "Sammanfattning av text är en av AI:s starkaste förmågor. Beslut och bedömningar kräver mänsklig expertis." },
  { id: "aq-1-2-4", moduleId: "mod-1-2-1", question: "AI ska ALDRIG användas för att:", options: ["Skriva utkast till mejl", "Fatta beslut utan mänsklig granskning", "Sammanfatta mötesprotokoll", "Förklara begrepp"], correctIndex: 1, explanation: "AI ska aldrig fatta beslut ensam — den ger underlag, människan beslutar." },
  { id: "aq-1-2-5", moduleId: "mod-1-2-1", question: "Vilka AI-verktyg har Katrineholms kommun?", options: ["Bara ChatGPT", "Intric och Microsoft Copilot", "Google Bard", "Inget AI-verktyg alls"], correctIndex: 1, explanation: "Kommunen har Intric som egen säker plattform, plus Microsoft Copilot integrerat i Office 365." },

  // --- Modul 1.2.2: Praktiska användningsfall ---
  { id: "aq-1-2-6", moduleId: "mod-1-2-2", question: "Vad är den vanligaste AI-uppgiften på jobbet?", options: ["Skapa bilder", "Sammanfatta text", "Programmera", "Bygga webbsidor"], correctIndex: 1, explanation: "Sammanfattning av text — mejl, protokoll, rapporter — är den vanligaste och mest tidsbesparande uppgiften." },
  { id: "aq-1-2-7", moduleId: "mod-1-2-2", question: "Vad innebär textgenerering med AI?", options: ["AI skriver text baserat på dina instruktioner", "AI översätter text automatiskt", "AI rättar stavfel", "AI läser upp text högt"], correctIndex: 0, explanation: "Textgenerering innebär att AI skapar ny text utifrån dina prompts." },
  { id: "aq-1-2-8", moduleId: "mod-1-2-2", question: "Vad gör AI-transkribering?", options: ["Översätter text till andra språk", "Omvandlar inspelat tal till text", "Sammanfattar dokument", "Skapar ljudfiler från text"], correctIndex: 1, explanation: "Transkribering omvandlar tal till text — t.ex. ett inspelat möte blir en sökbar text." },
  { id: "aq-1-2-9", moduleId: "mod-1-2-2", question: "Kan AI helt automatisera ärendehantering?", options: ["Ja, AI kan hantera allt utan mänsklig insats", "Nej, men den kan hjälpa till att sortera och föreslå", "Ja, om man använder Intric", "Nej, AI kan inte läsa text"], correctIndex: 1, explanation: "AI kan assistera med sortering och förslag, men mänsklig granskning krävs alltid." },
  { id: "aq-1-2-10", moduleId: "mod-1-2-2", question: "Vad bör du alltid ange när du ber AI sammanfatta ett dokument?", options: ["Ditt lösenord", "Önskat format och längd", "Dokumentets filstorlek", "Datum då dokumentet skapades"], correctIndex: 1, explanation: "Att ange format (punktlista, löptext) och längd (max 200 ord, 5 punkter) ger bäst resultat." },

  // --- Modul 1.2.3: Intric ---
  { id: "aq-1-2-11", moduleId: "mod-1-2-3", question: "Vad är Intric?", options: ["En sökmotor för kommuner", "En AI-plattform för offentlig sektor", "Ett e-postsystem", "Ett projekthanteringsverktyg"], correctIndex: 1, explanation: "Intric är en AI-plattform specifikt byggd för svenska myndigheter och offentlig sektor." },
  { id: "aq-1-2-12", moduleId: "mod-1-2-3", question: "Varför är Intric säkrare än ChatGPT?", options: ["Intric är snabbare", "Data stannar inom EU och används inte för träning", "Intric har inget internet", "Intric är gratis"], correctIndex: 1, explanation: "Intrics data stannar inom EU, hanteras enligt GDPR, och används inte för att träna modellen." },
  { id: "aq-1-2-13", moduleId: "mod-1-2-3", question: "Vad bör du göra när du byter ämne i en Intric-chatt?", options: ["Fortsätta i samma chatt", "Starta en ny chatt", "Logga ut och in igen", "Rensa webbläsarens cache"], correctIndex: 1, explanation: "Ny chatt vid nytt ämne ger bättre svar — AI:n slipper blanda ihop olika kontexter." },
  { id: "aq-1-2-14", moduleId: "mod-1-2-3", question: "Hur kommer du åt Intric?", options: ["Ladda ner en app", "Via AI-hubben eller direkt länk, med kommunens inloggning", "Skicka mejl till IT", "Via Google"], correctIndex: 1, explanation: "Intric nås via AI-hubben (aihubben.se) eller direkt länk, med ditt kommunala inloggningskonto." },
  { id: "aq-1-2-15", moduleId: "mod-1-2-3", question: "Vilken prompt är bäst att börja med i Intric?", options: ["Skriv allt", "Vad kan du hjälpa mig med?", "hej", "test"], correctIndex: 1, explanation: "Att fråga vad assistenten kan hjälpa dig med ger en bra överblick och startpunkt." },

  // --- Modul 1.3.1: Fallgropar & risker ---
  { id: "aq-1-3-1", moduleId: "mod-1-3-1", question: "Varför uppstår hallucinationer i AI?", options: ["AI:n försöker lura dig", "Den genererar troliga, inte sanna svar", "Dålig internetuppkoppling", "Fel i din dator"], correctIndex: 1, explanation: "AI saknar sanningskompass — den förutsäger det mest troliga nästa ordet, inte det mest sanna." },
  { id: "aq-1-3-2", moduleId: "mod-1-3-1", question: "Vad är bias i AI?", options: ["En teknisk bugg", "Systematisk snedvridning i AI:ns resultat", "När AI vägrar svara", "En typ av virus"], correctIndex: 1, explanation: "Bias innebär att AI systematiskt producerar snedvridna resultat baserat på fördomar i träningsdatan." },
  { id: "aq-1-3-3", moduleId: "mod-1-3-1", question: "Fungerar det att be AI bekräfta att dess svar stämmer?", options: ["Ja, det är det bästa sättet", "Nej, AI vet inte om den har fel", "Ja, om du ber artigt", "Ja, i Intric men inte ChatGPT"], correctIndex: 1, explanation: "AI kan inte utvärdera sin egen korrekthet — den svarar alltid med samma 'självsäkerhet'." },
  { id: "aq-1-3-4", moduleId: "mod-1-3-1", question: "Hur uppstår bias i AI vanligtvis?", options: ["Någon programmerar in fördomar medvetet", "Genom snedvridning i den data AI:n tränats på", "Genom virus i systemet", "Bias existerar inte i moderna AI-system"], correctIndex: 1, explanation: "Bias uppstår oftast omedvetet genom att träningsdatan speglar samhällets befintliga snedvridningar." },
  { id: "aq-1-3-5", moduleId: "mod-1-3-1", question: "Vilket är det viktigaste skyddet mot hallucinationer och bias?", options: ["Använda den dyraste AI-modellen", "Mänsklig granskning av alla AI-resultat", "Ställa samma fråga tre gånger", "Bara använda AI på engelska"], correctIndex: 1, explanation: "Mänsklig granskning är det viktigaste och mest pålitliga skyddet." },

  // --- Modul 1.3.2: Informationssäkerhet & GDPR ---
  { id: "aq-1-3-6", moduleId: "mod-1-3-2", question: "Vad är den gyllene regeln för AI och data?", options: ["Skriv bara på engelska", "Skriv aldrig något du inte skulle sätta på en anslagstavla", "Dela aldrig AI:ns svar med kollegor", "Använd bara AI efter kl. 17"], correctIndex: 1, explanation: "Om du inte vill att alla ser det — skriv det inte till AI:n." },
  { id: "aq-1-3-7", moduleId: "mod-1-3-2", question: "Vilken information ska du ALDRIG skriva till en AI?", options: ["Allmänna frågor om kommunens tjänster", "Personuppgifter som namn och personnummer", "Frågor om hur Word fungerar", "Text utan personuppgifter"], correctIndex: 1, explanation: "Personuppgifter som namn, personnummer, adresser ska aldrig in i AI-verktyg." },
  { id: "aq-1-3-8", moduleId: "mod-1-3-2", question: "Gäller GDPR även i Intric?", options: ["Nej, Intric är kommunens egna plattform", "Ja, GDPR gäller alltid vid behandling av personuppgifter", "Bara om du laddar upp filer", "Bara för chefer"], correctIndex: 1, explanation: "GDPR gäller alltid vid personuppgiftsbehandling, oavsett plattform." },
  { id: "aq-1-3-9", moduleId: "mod-1-3-2", question: "Vad bör du göra innan du klistrar in text med personuppgifter i AI?", options: ["Fråga IT-avdelningen", "Anonymisera texten först", "Byta till engelska", "Inget särskilt"], correctIndex: 1, explanation: "Anonymisera alltid personuppgifter innan du använder AI — ta bort namn, personnummer, adresser." },
  { id: "aq-1-3-10", moduleId: "mod-1-3-2", question: "Kan en AI-genererad text bli en allmän handling?", options: ["Nej, AI-text räknas inte", "Ja, om den används i myndighetsutövning", "Bara om chefen godkänner", "Bara om den är längre än 1 sida"], correctIndex: 1, explanation: "AI-genererade texter som används i myndighetsutövning kan bli allmänna handlingar enligt offentlighetsprincipen." },

  // --- Modul 1.3.3: Ansvarsfull AI ---
  { id: "aq-1-3-11", moduleId: "mod-1-3-3", question: "Vem bär ansvaret om ett AI-genererat svar till en invånare är fel?", options: ["AI-leverantören", "Den medarbetare som skickade svaret", "IT-avdelningen", "Ingen — AI-fel är oundvikliga"], correctIndex: 1, explanation: "Du som medarbetare och kommunen bär ansvaret — AI:n kan inte hållas ansvarig." },
  { id: "aq-1-3-12", moduleId: "mod-1-3-3", question: "Vad innebär transparens i AI-användning?", options: ["Att visa AI:ns källkod", "Att vara öppen med när och hur AI används", "Att låta AI fatta alla beslut", "Att aldrig använda AI"], correctIndex: 1, explanation: "Transparens handlar om att vara ärlig om att AI använts — det bygger förtroende." },
  { id: "aq-1-3-13", moduleId: "mod-1-3-3", question: "Vad innebär principen om mänsklig kontroll?", options: ["Att bara chefer får använda AI", "Att en människa alltid ska ha sista ordet", "Att AI måste godkännas av riksdagen", "Att man bara får använda AI varannan dag"], correctIndex: 1, explanation: "Mänsklig kontroll innebär att en människa alltid granskar och godkänner AI:s resultat." },
  { id: "aq-1-3-14", moduleId: "mod-1-3-3", question: "Hur bör du se på AI-genererad text?", options: ["Som en slutprodukt redo att skickas", "Som ett utkast som behöver din granskning", "Som helt opålitlig information", "Som juridiskt bindande"], correctIndex: 1, explanation: "AI-text är ett utkast — du granskar, justerar och tar ansvar för slutresultatet." },
  { id: "aq-1-3-15", moduleId: "mod-1-3-3", question: "Vilket av dessa ingår i ansvarsfull AI-användning?", options: ["Blint lita på AI-svar för att spara tid", "Granska, ifrågasätta och ta ansvar för resultatet", "Undvika AI helt för att minimera risk", "Använda AI bara för privata ärenden"], correctIndex: 1, explanation: "Ansvarsfull AI = granska alltid, ifrågasätta när det behövs, och ta ansvar för det du publicerar." },
  // Nivå 2 & 3 quiz questions appended from separate files
  ...QUIZ_QUESTIONS_NIVA_2,
  ...QUIZ_QUESTIONS_NIVA_3,
];

// ---------------------------------------------------------------------------
// Final exam question pool (Nivå 1)
// ---------------------------------------------------------------------------

export const FINAL_EXAM_POOL_NIVA_1: AcademyQuizQuestion[] = [
  { id: "fe-1-1", levelId: "niva-1", question: "AI fungerar genom att...", options: ["Tänka som en människa", "Hitta mönster i stora mängder data", "Vara uppkopplad mot internet hela tiden", "Kopiera mänskliga hjärnor"], correctIndex: 1, explanation: "AI hittar mönster i data — det är kärnan i all AI." },
  { id: "fe-1-2", levelId: "niva-1", question: "En LLM genererar text genom att...", options: ["Söka på internet", "Förutsäga det mest sannolika nästa ordet", "Kopiera text från databaser", "Fråga en mänsklig expert"], correctIndex: 1, explanation: "LLM:er förutsäger nästa ord baserat på statistiska mönster." },
  { id: "fe-1-3", levelId: "niva-1", question: "Du ska sammanfatta ett sekretessbelagt dokument. Vad gör du?", options: ["Klistrar in hela dokumentet i ChatGPT", "Anonymiserar känslig info, sedan Intric", "Ber en kollega istället", "Skriver allt i Copilot"], correctIndex: 1, explanation: "Anonymisera alltid känslig info, och använd kommunens säkra plattform Intric." },
  { id: "fe-1-4", levelId: "niva-1", question: "AI:ns svar är alltid korrekt.", options: ["Sant", "Falskt — AI kan hallucinera", "Sant om man använder Intric", "Sant om man betalar för premium"], correctIndex: 1, explanation: "AI kan hallucinera — alltid dubbelkolla fakta." },
  { id: "fe-1-5", levelId: "niva-1", question: "Vad ska du göra INNAN du skickar ett AI-genererat mejl?", options: ["Inget — AI skriver perfekt", "Läsa igenom och granska innehållet", "Skicka det till IT för godkännande", "Vänta 24 timmar"], correctIndex: 1, explanation: "Alltid granska AI-genererad text innan du använder den." },
  { id: "fe-1-6", levelId: "niva-1", question: "Intric är säkrare än ChatGPT för att...", options: ["Den är snabbare", "Data stannar inom EU och används inte för träning", "Den har fler funktioner", "Den är gratis"], correctIndex: 1, explanation: "Intric hanterar data inom EU, GDPR-säkert, utan att använda den för modellträning." },
  { id: "fe-1-7", levelId: "niva-1", question: "Om AI ger dig juridisk information bör du...", options: ["Lita på den — AI har läst alla lagar", "Dubbelkolla mot den faktiska lagtexten", "Fråga AI:n igen för bekräftelse", "Anta att den har fel"], correctIndex: 1, explanation: "AI kan hitta på eller blanda ihop juridisk information. Alltid verifiera mot officiella källor." },
  { id: "fe-1-8", levelId: "niva-1", question: "Mänsklig kontroll i AI-sammanhang innebär att...", options: ["Bara chefer får använda AI", "En människa alltid granskar och godkänner", "AI stängs av på helger", "Man behöver lösenord"], correctIndex: 1, explanation: "Principen innebär att en människa alltid har sista ordet." },
  { id: "fe-1-9", levelId: "niva-1", question: "GDPR gäller vid AI-användning...", options: ["Aldrig", "Alltid vid behandling av personuppgifter", "Bara i ChatGPT", "Bara för chefer"], correctIndex: 1, explanation: "GDPR gäller alltid vid personuppgiftsbehandling, oavsett verktyg." },
  { id: "fe-1-10", levelId: "niva-1", question: "Bias i AI innebär...", options: ["Att AI föredrar ett visst programmeringsspråk", "Systematisk snedvridning i resultat", "Att AI svarar för långsamt", "En typ av datorvirus"], correctIndex: 1, explanation: "Bias innebär att AI systematiskt producerar snedvridna resultat p.g.a. sin träningsdata." },
  { id: "fe-1-11", levelId: "niva-1", question: "Vilken prompt ger bäst resultat?", options: ["Hjälp mig", "Skriv en professionell inbjudan till ett möte om budget den 15 mars, max 100 ord", "Skriv saker", "Gör nåt bra"], correctIndex: 1, explanation: "Specifik, med kontext, format och längd — det ger bäst resultat." },
  { id: "fe-1-12", levelId: "niva-1", question: "AI-genererade texter i myndighetsutövning kan...", options: ["Aldrig bli offentliga", "Bli allmänna handlingar", "Bara ses av IT", "Raderas automatiskt"], correctIndex: 1, explanation: "Offentlighetsprincipen gäller — AI-texter i myndighetsutövning kan begäras ut." },
  { id: "fe-1-13", levelId: "niva-1", question: "Tokens i AI-sammanhang är...", options: ["Betalningsmedel", "Bitar som AI bryter ner text i", "Belöningar för bra prompts", "AI:ns minne"], correctIndex: 1, explanation: "AI bryter ner text i tokens — bitar av ord, hela ord eller tecken." },
  { id: "fe-1-14", levelId: "niva-1", question: "Kontextfönstret i en LLM bestämmer...", options: ["Hur snabbt AI svarar", "Hur mycket text den kan 'komma ihåg' åt gången", "Hur snygg chatten ser ut", "Vilka språk AI kan"], correctIndex: 1, explanation: "Kontextfönstret sätter gränsen för hur mycket text AI:n kan bearbeta i en konversation." },
  { id: "fe-1-15", levelId: "niva-1", question: "Deep learning har gjort AI bättre på...", options: ["Enkel matematik", "Språk, bild och tal", "Att tänka som människor", "Att följa exakta regler"], correctIndex: 1, explanation: "Deep learning är anledningen till AI:s genombrott inom språk, bild- och taligenkänning." },
  { id: "fe-1-16", levelId: "niva-1", question: "Du hittar ett fel i AI:ns svar. Vad gör du?", options: ["Rapporterar buggen till AI-leverantören", "Korrigerar det själv och delar erfarenheten med kollegor", "Slutar använda AI", "Ber AI:n rätta sig själv"], correctIndex: 1, explanation: "Korrigera felet själv och dela insikten så att kollegor också lär sig." },
  { id: "fe-1-17", levelId: "niva-1", question: "Transkribering med AI omvandlar...", options: ["Text till tal", "Tal till sökbar text", "Bilder till text", "Kod till text"], correctIndex: 1, explanation: "AI-transkribering omvandlar inspelat tal till text." },
  { id: "fe-1-18", levelId: "niva-1", question: "Smal AI betyder att...", options: ["AI:n är liten i storlek", "AI:n är bra på EN specifik uppgift", "AI:n har lite data", "AI:n bara funkar offline"], correctIndex: 1, explanation: "All AI vi använder idag är specialiserad — bra på sitt område men med tydliga begränsningar." },
  { id: "fe-1-19", levelId: "niva-1", question: "När du använder AI som stöd i ett beslut, vem fattar beslutet?", options: ["AI:n", "Du (med mänskligt omdöme)", "IT-avdelningen", "Intric automatiskt"], correctIndex: 1, explanation: "Du fattar alltid beslutet — AI ger underlag och förslag." },
  { id: "fe-1-20", levelId: "niva-1", question: "Promptteknik handlar om att...", options: ["Programmera AI-modeller", "Strategiskt formulera instruktioner för bättre AI-svar", "Installera AI-programvara", "Bygga robotar"], correctIndex: 1, explanation: "Promptteknik = konsten att skriva bra instruktioner till AI." },
];

// ---------------------------------------------------------------------------
// Helper: Lookup functions
// ---------------------------------------------------------------------------

export function getCoursesByLevel(levelId: string): Course[] {
  return COURSES.filter((c) => c.levelId === levelId);
}

export function getModulesByCourse(courseId: string): Module[] {
  return MODULES.filter((m) => m.courseId === courseId);
}

export function getLessonsByModule(moduleId: string): Lesson[] {
  return LESSONS.filter((l) => l.moduleId === moduleId);
}

export function getLessonById(lessonId: string): Lesson | undefined {
  return LESSONS.find((l) => l.id === lessonId);
}

export function getModuleById(moduleId: string): Module | undefined {
  return MODULES.find((m) => m.id === moduleId);
}

export function getCourseById(courseId: string): Course | undefined {
  return COURSES.find((c) => c.id === courseId);
}

export function getLevelConfig(levelId: string): CertificationLevelConfig | undefined {
  return CERTIFICATION_LEVELS.find((l) => l.id === levelId);
}

export function getQuizQuestionsForModule(moduleId: string): AcademyQuizQuestion[] {
  const mod = getModuleById(moduleId);
  if (!mod) return [];
  return ACADEMY_QUIZ_QUESTIONS.filter((q) => mod.quizQuestionIds.includes(q.id));
}

export function getFinalExamQuestions(levelId: string, count: number): AcademyQuizQuestion[] {
  const pool =
    levelId === "niva-1"
      ? FINAL_EXAM_POOL_NIVA_1
      : levelId === "niva-2"
        ? FINAL_EXAM_POOL_NIVA_2
        : levelId === "niva-3"
          ? FINAL_EXAM_POOL_NIVA_3
          : [];
  // Shuffle and pick
  const shuffled = [...pool].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

/** Find the next uncompleted lesson across all courses for a level */
export function getNextLesson(
  levelId: string,
  completedLessons: string[]
): { courseId: string; moduleId: string; lessonId: string } | null {
  const courses = getCoursesByLevel(levelId);
  for (const course of courses) {
    const modules = getModulesByCourse(course.id);
    for (const mod of modules) {
      const lessons = getLessonsByModule(mod.id);
      for (const lesson of lessons) {
        if (!completedLessons.includes(lesson.id)) {
          return { courseId: course.id, moduleId: mod.id, lessonId: lesson.id };
        }
      }
    }
  }
  return null;
}
