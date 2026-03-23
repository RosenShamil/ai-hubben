import { supabase } from "./supabase";
import type { EducationProgress } from "./education-progress";
import type { KnowledgeProgress } from "./knowledge-progress";
import type { AIGuideProfile } from "./ai-guide-profile";

// ---------------------------------------------------------------------------
// localStorage keys (must match the source modules)
// ---------------------------------------------------------------------------

const EDU_KEY = "ai-akademin-progress";
const KNOWLEDGE_KEY = "kunskapsbank-progress";
const GUIDE_KEY = "ai-guide-profile";

// ---------------------------------------------------------------------------
// Read localStorage helpers
// ---------------------------------------------------------------------------

function getLocalEducation(): EducationProgress | null {
  try {
    const raw = localStorage.getItem(EDU_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function getLocalKnowledge(): KnowledgeProgress | null {
  try {
    const raw = localStorage.getItem(KNOWLEDGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function getLocalGuide(): AIGuideProfile | null {
  try {
    const raw = localStorage.getItem(GUIDE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

// ---------------------------------------------------------------------------
// Merge helpers — keep whichever side has more progress
// ---------------------------------------------------------------------------

function mergeArrays(a: string[], b: string[]): string[] {
  return [...new Set([...a, ...b])];
}

function mergeScores(
  a: Record<string, number>,
  b: Record<string, number>
): Record<string, number> {
  const result = { ...a };
  for (const [key, val] of Object.entries(b)) {
    result[key] = Math.max(result[key] ?? 0, val);
  }
  return result;
}

function mergeEducation(
  local: EducationProgress | null,
  remote: EducationProgress | null
): EducationProgress | null {
  if (!local && !remote) return null;
  if (!local) return remote;
  if (!remote) return local;

  return {
    completedLessons: mergeArrays(local.completedLessons, remote.completedLessons),
    completedModules: mergeArrays(local.completedModules, remote.completedModules),
    completedCourses: mergeArrays(local.completedCourses, remote.completedCourses),
    moduleQuizScores: mergeScores(local.moduleQuizScores, remote.moduleQuizScores),
    finalExamScores: mergeScores(local.finalExamScores, remote.finalExamScores),
    finalExamLastAttempt: { ...remote.finalExamLastAttempt, ...local.finalExamLastAttempt },
    certificates: mergeCertificates(local.certificates, remote.certificates),
    xp: Math.max(local.xp, remote.xp),
    badges: mergeArrays(local.badges, remote.badges),
    longestStreak: Math.max(local.longestStreak, remote.longestStreak),
    lastActivityDate:
      local.lastActivityDate > remote.lastActivityDate
        ? local.lastActivityDate
        : remote.lastActivityDate,
    enrollmentDate:
      local.enrollmentDate && remote.enrollmentDate
        ? local.enrollmentDate < remote.enrollmentDate
          ? local.enrollmentDate
          : remote.enrollmentDate
        : local.enrollmentDate || remote.enrollmentDate,
  };
}

function mergeCertificates(
  a: EducationProgress["certificates"],
  b: EducationProgress["certificates"]
): EducationProgress["certificates"] {
  const map = new Map(a.map((c) => [c.levelId, c]));
  for (const cert of b) {
    if (!map.has(cert.levelId)) {
      map.set(cert.levelId, cert);
    }
  }
  return [...map.values()];
}

function mergeKnowledge(
  local: KnowledgeProgress | null,
  remote: KnowledgeProgress | null
): KnowledgeProgress | null {
  if (!local && !remote) return null;
  if (!local) return remote;
  if (!remote) return local;

  return {
    readConcepts: mergeArrays(local.readConcepts, remote.readConcepts),
    completedPaths: mergeArrays(local.completedPaths, remote.completedPaths),
    quizScores: mergeScores(local.quizScores, remote.quizScores),
    streak: Math.max(local.streak, remote.streak),
    lastVisitDate:
      local.lastVisitDate > remote.lastVisitDate
        ? local.lastVisitDate
        : remote.lastVisitDate,
    seenDailyBytes: mergeArrays(local.seenDailyBytes, remote.seenDailyBytes),
  };
}

function isValidGuideProfile(p: AIGuideProfile | null): p is AIGuideProfile {
  return !!(p && p.departmentId && p.roleCategory && p.completedAt);
}

function mergeGuide(
  local: AIGuideProfile | null,
  remote: AIGuideProfile | null
): AIGuideProfile | null {
  const validLocal = isValidGuideProfile(local) ? local : null;
  const validRemote = isValidGuideProfile(remote) ? remote : null;
  if (!validLocal) return validRemote;
  if (!validRemote) return validLocal;
  // Keep the most recent one
  return validLocal.completedAt > validRemote.completedAt ? validLocal : validRemote;
}

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

/** Load remote progress, merge with local, save both sides */
export async function syncOnLogin(userId: string): Promise<void> {
  if (typeof window === "undefined") return;

  // 1. Fetch remote
  const { data: remote } = await supabase
    .from("user_progress")
    .select("*")
    .eq("user_id", userId)
    .single();

  const remoteEdu = (remote?.education_progress as EducationProgress) ?? null;
  const remoteKnow = (remote?.knowledge_progress as KnowledgeProgress) ?? null;
  const remoteGuide = (remote?.ai_guide_profile as AIGuideProfile) ?? null;

  // 2. Merge with local
  const mergedEdu = mergeEducation(getLocalEducation(), remoteEdu);
  const mergedKnow = mergeKnowledge(getLocalKnowledge(), remoteKnow);
  const mergedGuide = mergeGuide(getLocalGuide(), remoteGuide);

  // 3. Write back to localStorage
  if (mergedEdu) localStorage.setItem(EDU_KEY, JSON.stringify(mergedEdu));
  if (mergedKnow) localStorage.setItem(KNOWLEDGE_KEY, JSON.stringify(mergedKnow));
  if (mergedGuide) localStorage.setItem(GUIDE_KEY, JSON.stringify(mergedGuide));

  // 4. Write back to Supabase
  await pushToSupabase(userId, mergedEdu, mergedKnow, mergedGuide);
}

/** Push current localStorage progress to Supabase */
export async function pushProgress(userId: string): Promise<void> {
  if (typeof window === "undefined") return;

  await pushToSupabase(
    userId,
    getLocalEducation(),
    getLocalKnowledge(),
    getLocalGuide()
  );
}

async function pushToSupabase(
  userId: string,
  edu: EducationProgress | null,
  knowledge: KnowledgeProgress | null,
  guide: AIGuideProfile | null
): Promise<void> {
  const payload = {
    user_id: userId,
    education_progress: edu ?? {},
    knowledge_progress: knowledge ?? {},
    ai_guide_profile: guide ?? {},
    updated_at: new Date().toISOString(),
  };

  await supabase.from("user_progress").upsert(payload, { onConflict: "user_id" });
}
