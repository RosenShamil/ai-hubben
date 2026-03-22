import { CONCEPTS } from "./knowledge-bank";
import { getProgress } from "./knowledge-progress";

/**
 * Returns a deterministic concept for today's date.
 * Prioritizes unseen concepts, falls back to cycling through all.
 */
export function getDailyByte() {
  const today = new Date().toISOString().slice(0, 10);
  const dayIndex = hashDateToIndex(today, CONCEPTS.length);

  // Try to find an unseen concept
  const progress = getProgress();
  const unseen = CONCEPTS.filter(
    (c) => !progress.readConcepts.includes(c.id)
  );

  if (unseen.length > 0) {
    const idx = hashDateToIndex(today, unseen.length);
    return { concept: unseen[idx], date: today };
  }

  // All seen — cycle through all concepts
  return { concept: CONCEPTS[dayIndex], date: today };
}

function hashDateToIndex(date: string, max: number): number {
  let hash = 0;
  for (let i = 0; i < date.length; i++) {
    hash = (hash * 31 + date.charCodeAt(i)) | 0;
  }
  return Math.abs(hash) % max;
}
