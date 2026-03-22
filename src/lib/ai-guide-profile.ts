// =============================================================================
// AI-GUIDE — localStorage-based profile persistence
// =============================================================================

import type { DepartmentId, RoleCategory, ExperienceLevel, GoalId } from "./ai-guide-data";

const STORAGE_KEY = "ai-guide-profile";

export interface AIGuideProfile {
  departmentId: DepartmentId;
  roleCategory: RoleCategory;
  experienceLevel: ExperienceLevel;
  goals: GoalId[];
  completedAt: string;
}

export function getGuideProfile(): AIGuideProfile | null {
  if (typeof window === "undefined") return null;
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return null;
    return JSON.parse(stored);
  } catch {
    return null;
  }
}

export function saveGuideProfile(
  departmentId: DepartmentId,
  roleCategory: RoleCategory,
  experienceLevel: ExperienceLevel,
  goals: GoalId[]
): void {
  if (typeof window === "undefined") return;
  try {
    const profile: AIGuideProfile = {
      departmentId,
      roleCategory,
      experienceLevel,
      goals,
      completedAt: new Date().toISOString(),
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
  } catch {
    // silent fail
  }
}

export function clearGuideProfile(): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    // silent fail
  }
}

export function hasGuideProfile(): boolean {
  return getGuideProfile() !== null;
}
