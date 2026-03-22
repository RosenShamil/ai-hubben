// =============================================================================
// AI-AKADEMIN — Badge checking logic
// =============================================================================

import { BADGES } from "./education-system";
import {
  getEducationProgress,
  earnBadge,
  getCertificates,
} from "./education-progress";
import { getProgress } from "./knowledge-progress";

export interface NewBadge {
  id: string;
  title: string;
  icon: string;
  rarity: string;
}

/**
 * Check all badge conditions and award any newly earned badges.
 * Returns array of newly earned badges (for notification).
 */
export function checkAndAwardBadges(): NewBadge[] {
  const eduProgress = getEducationProgress();
  const kbProgress = getProgress();
  const newBadges: NewBadge[] = [];

  const checks: Record<string, () => boolean> = {
    // First lesson
    "first-lesson": () => eduProgress.completedLessons.length >= 1,

    // 10 concepts read
    "curious-10": () => kbProgress.readConcepts.length >= 10,

    // 5 quizzes passed
    "quizmaster-5": () =>
      Object.values(eduProgress.moduleQuizScores).filter((s) => s >= 80).length >= 5,

    // 100% on any quiz
    perfectionist: () =>
      Object.values(eduProgress.moduleQuizScores).some((s) => s === 100),

    // 7-day streak
    "streak-7": () => kbProgress.streak >= 7,

    // 30-day streak
    "streak-30": () => kbProgress.streak >= 30,

    // Certificates
    "cert-niva-1": () =>
      eduProgress.certificates.some((c) => c.levelId === "niva-1"),
    "cert-niva-2": () =>
      eduProgress.certificates.some((c) => c.levelId === "niva-2"),
    "cert-niva-3": () =>
      eduProgress.certificates.some((c) => c.levelId === "niva-3"),

    // All 222 concepts
    allvetare: () => kbProgress.readConcepts.length >= 222,

    // All three certificates
    "all-certs": () => eduProgress.certificates.length >= 3,
  };

  for (const badge of BADGES) {
    // Skip if already earned
    if (eduProgress.badges.includes(badge.id)) continue;

    const check = checks[badge.id];
    if (check && check()) {
      const isNew = earnBadge(badge.id);
      if (isNew) {
        newBadges.push({
          id: badge.id,
          title: badge.title,
          icon: badge.icon,
          rarity: badge.rarity,
        });
      }
    }
  }

  return newBadges;
}
