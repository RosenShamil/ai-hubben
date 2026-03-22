// =============================================================================
// AI-AKADEMIN — localStorage-based progress tracking
// =============================================================================

import type { CertificationLevel, XPSource } from "./education-system";
import { XP_REWARDS } from "./education-system";
import { markConceptRead } from "./knowledge-progress";
import {
  reportLessonComplete,
  reportModuleQuiz,
  reportFinalExam,
  reportCertificateEarned,
  reportEnrollment,
} from "./education-analytics";

const STORAGE_KEY = "ai-akademin-progress";

// ---------------------------------------------------------------------------
// Progress interface
// ---------------------------------------------------------------------------

export interface EducationProgress {
  // Core progress
  completedLessons: string[];
  completedModules: string[];
  completedCourses: string[];

  // Quiz tracking
  moduleQuizScores: Record<string, number>; // moduleId -> best score %
  finalExamScores: Record<string, number>; // levelId -> best score %
  finalExamLastAttempt: Record<string, string>; // levelId -> ISO date

  // Certification
  certificates: CertificateEntry[];

  // Gamification
  xp: number;
  badges: string[];
  longestStreak: number;

  // Timestamps
  lastActivityDate: string;
  enrollmentDate: string;
}

export interface CertificateEntry {
  levelId: CertificationLevel;
  earnedDate: string;
  certificateId: string;
  name: string;
}

// ---------------------------------------------------------------------------
// Default state
// ---------------------------------------------------------------------------

const DEFAULT_PROGRESS: EducationProgress = {
  completedLessons: [],
  completedModules: [],
  completedCourses: [],
  moduleQuizScores: {},
  finalExamScores: {},
  finalExamLastAttempt: {},
  certificates: [],
  xp: 0,
  badges: [],
  longestStreak: 0,
  lastActivityDate: "",
  enrollmentDate: "",
};

// ---------------------------------------------------------------------------
// Storage helpers
// ---------------------------------------------------------------------------

function getStored(): EducationProgress {
  if (typeof window === "undefined") return DEFAULT_PROGRESS;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_PROGRESS;
    return { ...DEFAULT_PROGRESS, ...JSON.parse(raw) };
  } catch {
    return DEFAULT_PROGRESS;
  }
}

function save(progress: EducationProgress): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  } catch {
    // storage full or unavailable
  }
}

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

export function getEducationProgress(): EducationProgress {
  return getStored();
}

/** Ensure enrollment date is set */
export function enroll(): void {
  const p = getStored();
  if (!p.enrollmentDate) {
    p.enrollmentDate = new Date().toISOString().slice(0, 10);
    save(p);
    reportEnrollment();
  }
}

// --- Lessons ---

export function completeLesson(lessonId: string, conceptIds: string[]): void {
  const p = getStored();
  if (!p.completedLessons.includes(lessonId)) {
    p.completedLessons.push(lessonId);
    p.xp += XP_REWARDS["lesson-complete"];
    p.lastActivityDate = new Date().toISOString().slice(0, 10);
    save(p);
    // Report to server — derive level/course from lesson ID (les-X-Y-Z-W)
    const parts = lessonId.split("-");
    const levelId = `niva-${parts[1]}`;
    const courseId = `course-${parts[1]}-${parts[2]}`;
    reportLessonComplete(lessonId, levelId, courseId);
  }
  // Sync concepts to knowledge bank
  conceptIds.forEach((id) => markConceptRead(id));
}

export function isLessonCompleted(lessonId: string): boolean {
  return getStored().completedLessons.includes(lessonId);
}

// --- Modules ---

export function completeModule(moduleId: string): void {
  const p = getStored();
  if (!p.completedModules.includes(moduleId)) {
    p.completedModules.push(moduleId);
    p.xp += XP_REWARDS["module-complete"];
    save(p);
  }
}

export function isModuleCompleted(moduleId: string): boolean {
  return getStored().completedModules.includes(moduleId);
}

// --- Courses ---

export function completeCourse(courseId: string): void {
  const p = getStored();
  if (!p.completedCourses.includes(courseId)) {
    p.completedCourses.push(courseId);
    p.xp += XP_REWARDS["course-complete"];
    save(p);
  }
}

export function isCourseCompleted(courseId: string): boolean {
  return getStored().completedCourses.includes(courseId);
}

// --- Quiz scores ---

export function saveModuleQuizScore(moduleId: string, score: number): void {
  const p = getStored();
  const current = p.moduleQuizScores[moduleId] ?? 0;
  if (score > current) {
    p.moduleQuizScores[moduleId] = score;
  }
  // XP only on first pass
  if (current < 80 && score >= 80) {
    p.xp += XP_REWARDS["quiz-pass"];
  }
  if (score === 100 && current < 100) {
    p.xp += XP_REWARDS["quiz-perfect"];
  }
  save(p);
  // Report to server
  const parts = moduleId.split("-"); // mod-X-Y-Z
  const levelId = `niva-${parts[1]}`;
  reportModuleQuiz(moduleId, levelId, score, score >= 80);
}

export function getModuleQuizScore(moduleId: string): number {
  return getStored().moduleQuizScores[moduleId] ?? 0;
}

export function saveFinalExamScore(levelId: CertificationLevel, score: number): void {
  const p = getStored();
  const current = p.finalExamScores[levelId] ?? 0;
  if (score > current) {
    p.finalExamScores[levelId] = score;
  }
  p.finalExamLastAttempt[levelId] = new Date().toISOString();
  save(p);
  // Report to server
  reportFinalExam(levelId, score, score >= 80);
}

export function getFinalExamScore(levelId: CertificationLevel): number {
  return getStored().finalExamScores[levelId] ?? 0;
}

export function canRetryFinalExam(levelId: CertificationLevel): boolean {
  const p = getStored();
  const last = p.finalExamLastAttempt[levelId];
  if (!last) return true;
  const lastDate = new Date(last);
  const now = new Date();
  // Allow retry after 24 hours
  return now.getTime() - lastDate.getTime() >= 24 * 60 * 60 * 1000;
}

// --- Certificates ---

export function earnCertificate(
  levelId: CertificationLevel,
  name: string
): CertificateEntry {
  const p = getStored();
  // Don't duplicate
  const existing = p.certificates.find((c) => c.levelId === levelId);
  if (existing) return existing;

  const entry: CertificateEntry = {
    levelId,
    earnedDate: new Date().toISOString().slice(0, 10),
    certificateId: generateCertId(name, levelId),
    name,
  };
  p.certificates.push(entry);
  p.xp += XP_REWARDS["certificate-earned"];
  save(p);
  // Report to server
  reportCertificateEarned(levelId, name, entry.certificateId);
  return entry;
}

export function getCertificates(): CertificateEntry[] {
  return getStored().certificates;
}

export function hasCertificate(levelId: CertificationLevel): boolean {
  return getStored().certificates.some((c) => c.levelId === levelId);
}

// --- XP ---

export function addXP(source: XPSource): void {
  const p = getStored();
  p.xp += XP_REWARDS[source];
  save(p);
}

export function getXP(): number {
  return getStored().xp;
}

// --- Badges ---

export function earnBadge(badgeId: string): boolean {
  const p = getStored();
  if (p.badges.includes(badgeId)) return false;
  p.badges.push(badgeId);
  save(p);
  return true; // true = newly earned
}

export function getEarnedBadges(): string[] {
  return getStored().badges;
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function generateCertId(name: string, levelId: string): string {
  const data = `${name}|${levelId}|${Date.now()}|${Math.random()}`;
  // Simple hash — not crypto-grade, just unique enough for display
  let hash = 0;
  for (let i = 0; i < data.length; i++) {
    const char = data.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash |= 0;
  }
  return `AH-${levelId.toUpperCase()}-${Math.abs(hash).toString(36).toUpperCase().padStart(8, "0")}`;
}
