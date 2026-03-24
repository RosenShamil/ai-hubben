"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  BookOpen,
  Check,
  ChevronRight,
  Clock,
  Lock,
  Play,
  Brain,
  Briefcase,
  Shield,
} from "lucide-react";
import Link from "next/link";
import { FadeIn } from "@/components/shared/fade-in";
import { BRAND_GRADIENT } from "@/lib/constants";
import {
  getCourseById,
  getModulesByCourse,
  getLessonsByModule,
  getLevelConfig,
  getQuizQuestionsForModule,
} from "@/lib/education-data";
import {
  getEducationProgress,
  isLessonCompleted,
  getModuleQuizScore,
  type EducationProgress,
} from "@/lib/education-progress";
import { LessonPlayer } from "./lesson-player";
import { ModuleQuiz } from "./module-quiz";

const COURSE_ICONS: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  Brain,
  Briefcase,
  Shield,
};

export function CourseOverview({ courseId }: { courseId: string }) {
  const [progress, setProgress] = useState<EducationProgress | null>(null);
  const [activeLessonId, setActiveLessonId] = useState<string | null>(null);
  const [activeQuizModuleId, setActiveQuizModuleId] = useState<string | null>(null);

  useEffect(() => {
    setProgress(getEducationProgress());
  }, []);

  // Refresh progress when returning from lesson/quiz
  const refreshProgress = () => setProgress(getEducationProgress());

  const course = getCourseById(courseId);
  if (!course) {
    return (
      <div className="mx-auto max-w-[68.75rem] px-6 pt-20">
        <p className="text-muted-foreground">Kursen hittades inte.</p>
        <Link href="/utbildning?flik=akademin" className="mt-4 inline-block text-[0.875rem] text-foreground underline">
          ← Tillbaka till akademin
        </Link>
      </div>
    );
  }

  const level = getLevelConfig(course.levelId);
  const modules = getModulesByCourse(courseId);
  const Icon = COURSE_ICONS[course.icon] || BookOpen;

  if (!progress) return null;

  // Active lesson player
  if (activeLessonId) {
    return (
      <LessonPlayer
        lessonId={activeLessonId}
        onClose={() => {
          setActiveLessonId(null);
          refreshProgress();
        }}
        onNext={(nextLessonId) => {
          setActiveLessonId(nextLessonId);
          refreshProgress();
        }}
      />
    );
  }

  // Active quiz
  if (activeQuizModuleId) {
    return (
      <ModuleQuiz
        moduleId={activeQuizModuleId}
        onClose={() => {
          setActiveQuizModuleId(null);
          refreshProgress();
        }}
      />
    );
  }

  return (
    <>
      {/* Header */}
      <section className="mx-auto max-w-[68.75rem] px-6 pt-20 pb-8 md:pt-28">
        <FadeIn>
          <Link
            href="/utbildning?flik=akademin"
            className="mb-6 inline-flex items-center gap-1 text-[0.8125rem] text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft size={14} />
            Tillbaka till akademin
          </Link>

          <div className="flex items-start gap-4">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-secondary">
              <Icon size={24} className="text-foreground" />
            </div>
            <div>
              <p
                className="text-[0.6875rem] font-medium uppercase tracking-[0.15em] text-muted-foreground"
                style={{ fontFamily: "var(--font-geist-mono), monospace" }}
              >
                {level?.subtitle} · Kurs {course.order} av{" "}
                {level?.courseIds.length}
              </p>
              <h1
                className="mt-1 text-[1.5rem] leading-[1.2] tracking-[-0.03em] sm:text-[2rem]"
                style={{
                  fontFamily: "var(--font-bodoni), serif",
                  fontWeight: 400,
                }}
              >
                {course.title}
              </h1>
              <p className="mt-2 max-w-[36rem] text-[0.9375rem] leading-[1.6] text-foreground">
                {course.description}
              </p>
              <div className="mt-3 flex items-center gap-3 text-[0.8125rem] text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Clock size={14} />~{course.estimatedMinutes} min
                </span>
                <span>{modules.length} moduler</span>
              </div>
            </div>
          </div>
        </FadeIn>
      </section>

      {/* Divider */}
      <div className="mx-auto max-w-[68.75rem] px-6">
        <div className="h-px" style={{ background: BRAND_GRADIENT }} />
      </div>

      {/* Modules */}
      <section className="mx-auto max-w-[68.75rem] px-6 py-8">
        <div className="space-y-4">
          {modules.map((mod, mi) => {
            const lessons = getLessonsByModule(mod.id);
            const completedCount = lessons.filter((l) =>
              progress.completedLessons.includes(l.id)
            ).length;
            const allDone = completedCount === lessons.length;
            const quizScore = getModuleQuizScore(mod.id);
            const quizPassed = quizScore >= mod.quizPassThreshold * 100;

            // Module is locked if previous module isn't complete
            const prevModule = mi > 0 ? modules[mi - 1] : null;
            const prevModuleDone = prevModule
              ? getLessonsByModule(prevModule.id).every((l) =>
                  progress.completedLessons.includes(l.id)
                )
              : true;
            const isLocked = !prevModuleDone && mi > 0;

            return (
              <FadeIn key={mod.id} delay={mi * 0.06}>
                <div
                  className={`rounded-xl border transition-all ${
                    isLocked
                      ? "border-border/50 bg-card/50 opacity-60"
                      : allDone && quizPassed
                        ? "border-emerald-500/20 bg-card"
                        : "border-border bg-card"
                  }`}
                >
                  {/* Module header */}
                  <div className="p-5">
                    <div className="flex items-center gap-3">
                      <div
                        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-[0.8125rem] font-bold ${
                          allDone && quizPassed
                            ? "bg-emerald-500/15 text-emerald-500"
                            : isLocked
                              ? "bg-secondary text-muted-foreground"
                              : "bg-foreground text-background"
                        }`}
                      >
                        {allDone && quizPassed ? (
                          <Check size={16} />
                        ) : isLocked ? (
                          <Lock size={14} />
                        ) : (
                          mi + 1
                        )}
                      </div>
                      <div className="min-w-0 flex-1">
                        <h3 className="text-[0.9375rem] font-medium leading-tight">
                          {mod.title}
                        </h3>
                        <p className="mt-0.5 text-[0.8125rem] text-foreground/85">
                          {mod.description}
                        </p>
                      </div>
                      <div className="hidden text-[0.75rem] text-muted-foreground sm:flex sm:items-center sm:gap-2">
                        <Clock size={12} />
                        ~{mod.estimatedMinutes} min
                      </div>
                    </div>

                    {/* Lessons list */}
                    {!isLocked && (
                      <div className="mt-4 space-y-1.5 pl-12">
                        {lessons.map((lesson, li) => {
                          const done = progress.completedLessons.includes(
                            lesson.id
                          );
                          const isNext =
                            !done &&
                            lessons
                              .slice(0, li)
                              .every((l) =>
                                progress.completedLessons.includes(l.id)
                              );

                          return (
                            <motion.button
                              key={lesson.id}
                              onClick={() =>
                                !isLocked && setActiveLessonId(lesson.id)
                              }
                              className={`group flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left transition-all ${
                                done
                                  ? "text-muted-foreground"
                                  : isNext
                                    ? "bg-secondary/50 font-medium"
                                    : "hover:bg-secondary/30"
                              }`}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.1 + li * 0.04 }}
                            >
                              <div
                                className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full ${
                                  done
                                    ? "bg-emerald-500/15"
                                    : isNext
                                      ? "bg-foreground"
                                      : "bg-secondary"
                                }`}
                              >
                                {done ? (
                                  <Check size={12} className="text-emerald-500" />
                                ) : isNext ? (
                                  <Play size={10} className="text-background" />
                                ) : (
                                  <span className="text-[0.625rem] tabular-nums text-muted-foreground">
                                    {li + 1}
                                  </span>
                                )}
                              </div>
                              <span className="flex-1 text-[0.8125rem]">
                                {lesson.title}
                              </span>
                              <span className="text-[0.6875rem] text-muted-foreground">
                                ~{lesson.estimatedMinutes} min
                              </span>
                              <ChevronRight
                                size={14}
                                className="text-muted-foreground transition-transform group-hover:translate-x-0.5"
                              />
                            </motion.button>
                          );
                        })}

                        {/* Quiz button */}
                        {allDone && (
                          <motion.button
                            onClick={() => setActiveQuizModuleId(mod.id)}
                            className={`mt-2 flex w-full items-center gap-3 rounded-lg border px-3 py-2.5 text-left transition-all ${
                              quizPassed
                                ? "border-emerald-500/20 bg-emerald-500/[0.03]"
                                : "border-border bg-secondary/30 hover:bg-secondary/50"
                            }`}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                          >
                            <div
                              className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full ${
                                quizPassed
                                  ? "bg-emerald-500/15"
                                  : "bg-foreground"
                              }`}
                            >
                              {quizPassed ? (
                                <Check size={12} className="text-emerald-500" />
                              ) : (
                                <BookOpen size={10} className="text-background" />
                              )}
                            </div>
                            <span className="flex-1 text-[0.8125rem] font-medium">
                              Modul-quiz
                            </span>
                            {quizPassed && (
                              <span className="text-[0.75rem] font-medium text-emerald-500">
                                {quizScore}%
                              </span>
                            )}
                            <ChevronRight size={14} className="text-muted-foreground" />
                          </motion.button>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </FadeIn>
            );
          })}
        </div>
      </section>
    </>
  );
}
