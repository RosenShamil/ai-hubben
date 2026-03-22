// =============================================================================
// KUNSKAPSBANKEN — localStorage-based progress tracking
// =============================================================================

const STORAGE_KEY = "kunskapsbank-progress";

export interface KnowledgeProgress {
  readConcepts: string[];
  completedPaths: string[];
  quizScores: Record<string, number>;
  streak: number;
  lastVisitDate: string;
  seenDailyBytes: string[];
}

const DEFAULT_PROGRESS: KnowledgeProgress = {
  readConcepts: [],
  completedPaths: [],
  quizScores: {},
  streak: 0,
  lastVisitDate: "",
  seenDailyBytes: [],
};

function getStoredProgress(): KnowledgeProgress {
  if (typeof window === "undefined") return DEFAULT_PROGRESS;
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return DEFAULT_PROGRESS;
    return { ...DEFAULT_PROGRESS, ...JSON.parse(stored) };
  } catch {
    return DEFAULT_PROGRESS;
  }
}

function saveProgress(progress: KnowledgeProgress): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  } catch {
    // localStorage full or unavailable
  }
}

export function getProgress(): KnowledgeProgress {
  return getStoredProgress();
}

export function markConceptRead(conceptId: string): void {
  const progress = getStoredProgress();
  if (!progress.readConcepts.includes(conceptId)) {
    progress.readConcepts.push(conceptId);
    saveProgress(progress);
  }
}

export function isConceptRead(conceptId: string): boolean {
  const progress = getStoredProgress();
  return progress.readConcepts.includes(conceptId);
}

export function markPathCompleted(pathId: string): void {
  const progress = getStoredProgress();
  if (!progress.completedPaths.includes(pathId)) {
    progress.completedPaths.push(pathId);
    saveProgress(progress);
  }
}

export function saveQuizScore(key: string, score: number): void {
  const progress = getStoredProgress();
  const current = progress.quizScores[key] ?? 0;
  if (score > current) {
    progress.quizScores[key] = score;
    saveProgress(progress);
  }
}

export function getReadCount(): number {
  return getStoredProgress().readConcepts.length;
}

export function updateStreak(): number {
  const progress = getStoredProgress();
  const today = new Date().toISOString().slice(0, 10);

  if (progress.lastVisitDate === today) {
    return progress.streak;
  }

  const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10);
  if (progress.lastVisitDate === yesterday) {
    progress.streak += 1;
  } else if (progress.lastVisitDate !== today) {
    progress.streak = 1;
  }

  progress.lastVisitDate = today;
  saveProgress(progress);
  return progress.streak;
}

export function markDailyByteSeen(conceptId: string): void {
  const progress = getStoredProgress();
  if (!progress.seenDailyBytes.includes(conceptId)) {
    progress.seenDailyBytes.push(conceptId);
    saveProgress(progress);
  }
}
