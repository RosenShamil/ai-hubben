// =============================================================================
// Education Analytics — report events to Supabase for admin dashboard
// =============================================================================

import { supabase } from "./supabase";

const ANON_ID_KEY = "ai-akademin-anon-id";

// ---------------------------------------------------------------------------
// Anonymous ID — persistent per browser
// ---------------------------------------------------------------------------

function getAnonymousId(): string {
  if (typeof window === "undefined") return "server";
  let id = localStorage.getItem(ANON_ID_KEY);
  if (!id) {
    id = `anon-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
    localStorage.setItem(ANON_ID_KEY, id);
  }
  return id;
}

// ---------------------------------------------------------------------------
// Event types
// ---------------------------------------------------------------------------

type EventType =
  | "lesson_complete"
  | "module_quiz_pass"
  | "module_quiz_fail"
  | "exam_pass"
  | "exam_fail"
  | "certificate_earned"
  | "enrollment";

interface EventPayload {
  event_type: EventType;
  level_id?: string;
  course_id?: string;
  module_id?: string;
  lesson_id?: string;
  score?: number;
  user_name?: string;
  metadata?: Record<string, unknown>;
}

// ---------------------------------------------------------------------------
// Report event (fire-and-forget, never blocks UI)
// ---------------------------------------------------------------------------

export function reportEvent(payload: EventPayload): void {
  if (typeof window === "undefined") return;

  const row = {
    anonymous_id: getAnonymousId(),
    event_type: payload.event_type,
    level_id: payload.level_id ?? null,
    course_id: payload.course_id ?? null,
    module_id: payload.module_id ?? null,
    lesson_id: payload.lesson_id ?? null,
    score: payload.score ?? null,
    user_name: payload.user_name ?? null,
    metadata: payload.metadata ?? {},
  };

  // Fire-and-forget — don't await, don't block
  supabase.from("education_events").insert(row).then(({ error }) => {
    if (error) {
      // Silent fail in production — log in dev
      if (process.env.NODE_ENV === "development") {
        console.warn("[education-analytics] Failed to report event:", error.message);
      }
    }
  });
}

// ---------------------------------------------------------------------------
// Convenience helpers
// ---------------------------------------------------------------------------

export function reportLessonComplete(lessonId: string, levelId: string, courseId: string): void {
  reportEvent({ event_type: "lesson_complete", lesson_id: lessonId, level_id: levelId, course_id: courseId });
}

export function reportModuleQuiz(moduleId: string, levelId: string, score: number, passed: boolean): void {
  reportEvent({
    event_type: passed ? "module_quiz_pass" : "module_quiz_fail",
    module_id: moduleId,
    level_id: levelId,
    score,
  });
}

export function reportFinalExam(levelId: string, score: number, passed: boolean): void {
  reportEvent({
    event_type: passed ? "exam_pass" : "exam_fail",
    level_id: levelId,
    score,
  });
}

export function reportCertificateEarned(
  levelId: string,
  userName: string,
  certificateId: string
): void {
  reportEvent({
    event_type: "certificate_earned",
    level_id: levelId,
    user_name: userName,
    metadata: { certificate_id: certificateId },
  });
}

export function reportEnrollment(): void {
  reportEvent({ event_type: "enrollment" });
}
