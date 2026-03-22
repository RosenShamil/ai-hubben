// =============================================================================
// AI-AKADEMIN — Type definitions for the education system
// =============================================================================

import type { ConceptCategory } from "./knowledge-bank";

// ---------------------------------------------------------------------------
// Certification levels
// ---------------------------------------------------------------------------

export type CertificationLevel = "niva-1" | "niva-2" | "niva-3";

export interface CertificationLevelConfig {
  id: CertificationLevel;
  title: string;
  subtitle: string;
  description: string;
  icon: string;
  color: string;
  badgeColor: string; // brons/silver/guld
  requiredLevel?: CertificationLevel;
  courseIds: string[];
  finalExamQuestionCount: number;
  finalExamPassThreshold: number; // 0.8 = 80%
  requiredScenarios: number;
  estimatedTotalMinutes: number;
}

// ---------------------------------------------------------------------------
// Course → Module → Lesson hierarchy
// ---------------------------------------------------------------------------

export interface Course {
  id: string;
  levelId: CertificationLevel;
  title: string;
  description: string;
  icon: string;
  order: number;
  estimatedMinutes: number;
  moduleIds: string[];
}

export interface Module {
  id: string;
  courseId: string;
  title: string;
  description: string;
  order: number;
  estimatedMinutes: number;
  lessonIds: string[];
  quizQuestionIds: string[];
  quizPassThreshold: number; // 0.8 = 80%
}

export type LessonType =
  | "storyboard"
  | "reading"
  | "interactive"
  | "quiz"
  | "scenario"
  | "case-study"
  | "reflection";

export interface Lesson {
  id: string;
  moduleId: string;
  title: string;
  order: number;
  estimatedMinutes: number;
  type: LessonType;
  conceptIds: string[];
  content: LessonContent;
}

// ---------------------------------------------------------------------------
// Lesson content
// ---------------------------------------------------------------------------

export interface LessonContent {
  /** Opening hook — surprising fact or question */
  hook: string;
  /** "Visste du att..." fun fact */
  funFact?: string;
  /** Main content sections */
  sections: LessonSection[];
  /** Real-world municipality example */
  municipalExample?: MunicipalExample;
  /** Interactive element within the lesson */
  interactiveElement?: InteractiveElement;
  /** 3 key takeaways */
  summary: string[];
}

export interface LessonSection {
  heading?: string;
  text: string;
  /** Everyday analogy highlighted in a box */
  analogy?: string;
  /** Lucide icon name */
  icon?: string;
}

export interface MunicipalExample {
  title: string;
  description: string;
  /** e.g. "Socialtjänsten", "HR", "IT", "Bildning" */
  department?: string;
  /** Lucide icon name */
  icon?: string;
}

// ---------------------------------------------------------------------------
// Interactive elements
// ---------------------------------------------------------------------------

export type InteractiveElement =
  | { type: "true-false"; data: TrueFalseItem }
  | { type: "match"; data: MatchItem[] }
  | { type: "fill-blank"; data: FillBlankItem }
  | { type: "multi-choice"; data: MultiChoiceItem };

export interface TrueFalseItem {
  statement: string;
  isTrue: boolean;
  explanation: string;
}

export interface MatchItem {
  term: string;
  definition: string;
}

export interface FillBlankItem {
  /** Use ___ for the blank position */
  sentence: string;
  correctAnswer: string;
  distractors: string[];
}

export interface MultiChoiceItem {
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

// ---------------------------------------------------------------------------
// Quiz (module-level & final exam)
// ---------------------------------------------------------------------------

export interface AcademyQuizQuestion {
  id: string;
  moduleId?: string;
  levelId?: CertificationLevel;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  conceptId?: string;
  category?: ConceptCategory;
}

// ---------------------------------------------------------------------------
// Certificates
// ---------------------------------------------------------------------------

export interface CertificateRecord {
  levelId: CertificationLevel;
  earnedDate: string;
  certificateId: string;
  name: string;
}

// ---------------------------------------------------------------------------
// Gamification
// ---------------------------------------------------------------------------

export type XPSource =
  | "concept-read"
  | "lesson-complete"
  | "module-complete"
  | "quiz-pass"
  | "quiz-perfect"
  | "scenario-complete"
  | "course-complete"
  | "certificate-earned"
  | "streak-day"
  | "streak-week"
  | "daily-byte";

export const XP_REWARDS: Record<XPSource, number> = {
  "concept-read": 10,
  "lesson-complete": 25,
  "module-complete": 50,
  "quiz-pass": 75,
  "quiz-perfect": 150,
  "scenario-complete": 30,
  "course-complete": 200,
  "certificate-earned": 500,
  "streak-day": 15,
  "streak-week": 100,
  "daily-byte": 10,
};

export interface Badge {
  id: string;
  title: string;
  description: string;
  icon: string;
  rarity: "common" | "uncommon" | "rare" | "epic" | "legendary";
}

export const BADGES: Badge[] = [
  { id: "first-lesson", title: "Första steget", description: "Klar med din första lektion", icon: "Footprints", rarity: "common" },
  { id: "curious-10", title: "Nyfiken på AI", description: "Läst 10 begrepp", icon: "Lightbulb", rarity: "common" },
  { id: "quizmaster-5", title: "Quizmaster", description: "Klarat 5 quiz", icon: "Trophy", rarity: "uncommon" },
  { id: "perfectionist", title: "Perfektionist", description: "100% på ett quiz", icon: "Star", rarity: "rare" },
  { id: "streak-7", title: "Veckostreak", description: "7 dagar i rad", icon: "Flame", rarity: "uncommon" },
  { id: "streak-30", title: "Månadsstreak", description: "30 dagar i rad", icon: "Zap", rarity: "rare" },
  { id: "cert-niva-1", title: "AI-redo", description: "Certifierad AI-redo medarbetare", icon: "Award", rarity: "uncommon" },
  { id: "cert-niva-2", title: "Superanvändare", description: "Certifierad AI-superanvändare", icon: "Award", rarity: "rare" },
  { id: "cert-niva-3", title: "Ambassadör", description: "Certifierad AI-ambassadör", icon: "Crown", rarity: "epic" },
  { id: "allvetare", title: "Allvetare", description: "Läst alla 222 begrepp", icon: "BookOpen", rarity: "legendary" },
  { id: "scenario-master", title: "Scenariomästare", description: "Klarat alla scenarion med bästa val", icon: "Shield", rarity: "rare" },
  { id: "all-certs", title: "Helgar", description: "Alla tre certifikat", icon: "GraduationCap", rarity: "legendary" },
];

// ---------------------------------------------------------------------------
// XP level titles (cosmetic)
// ---------------------------------------------------------------------------

export function getXPLevel(xp: number): { level: number; title: string; nextThreshold: number } {
  if (xp >= 4000) return { level: 8, title: "AI-legend", nextThreshold: 5000 };
  if (xp >= 2500) return { level: 7, title: "AI-mästare", nextThreshold: 4000 };
  if (xp >= 1500) return { level: 6, title: "AI-expert", nextThreshold: 2500 };
  if (xp >= 1000) return { level: 5, title: "AI-kännare", nextThreshold: 1500 };
  if (xp >= 600) return { level: 4, title: "AI-entusiast", nextThreshold: 1000 };
  if (xp >= 300) return { level: 3, title: "Kunskapssökare", nextThreshold: 600 };
  if (xp >= 100) return { level: 2, title: "Utforskare", nextThreshold: 300 };
  return { level: 1, title: "Nybörjare", nextThreshold: 100 };
}
