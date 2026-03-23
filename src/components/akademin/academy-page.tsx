"use client";

import { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import {
  GraduationCap,
  Rocket,
  Crown,
  Lock,
  ChevronRight,
  Play,
  BookOpen,
  Trophy,
  Flame,
  Award,
} from "lucide-react";
import Link from "next/link";
import { FadeIn } from "@/components/shared/fade-in";
import { BRAND_GRADIENT } from "@/lib/constants";
import { FinalExam } from "./final-exam";
import { CertificateEarnFlow } from "./certificate-viewer";
import { XPToastContainer } from "./xp-toast";
import { BadgeNotificationContainer, showBadgeNotifications } from "./badge-notification";
import { checkAndAwardBadges } from "@/lib/badge-checker";
import {
  CERTIFICATION_LEVELS,
  COURSES,
  MODULES,
  LESSONS,
  getNextLesson,
  getCoursesByLevel,
  getModulesByCourse,
  getLessonsByModule,
} from "@/lib/education-data";
import {
  getEducationProgress,
  enroll,
  getModuleQuizScore,
  hasCertificate,
  getFinalExamScore,
  type EducationProgress,
} from "@/lib/education-progress";
import { getXPLevel } from "@/lib/education-system";
import type { CertificationLevelConfig } from "@/lib/education-system";

// ---------------------------------------------------------------------------
// Icon map
// ---------------------------------------------------------------------------
const LEVEL_ICONS: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  GraduationCap,
  Rocket,
  Crown,
};

const LEVEL_GRADIENTS: Record<string, string> = {
  "niva-1": "linear-gradient(135deg, #d4a574 0%, #b8860b 50%, #cd853f 100%)",
  "niva-2": "linear-gradient(135deg, #b8c6d4 0%, #8fa3b8 50%, #a0b0c0 100%)",
  "niva-3": "linear-gradient(135deg, #d4af37 0%, #b8960c 50%, #daa520 100%)",
};

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function getLevelProgress(
  levelId: string,
  progress: EducationProgress
): { completedLessons: number; totalLessons: number; pct: number } {
  const courses = getCoursesByLevel(levelId);
  let total = 0;
  let completed = 0;
  for (const course of courses) {
    const modules = getModulesByCourse(course.id);
    for (const mod of modules) {
      const lessons = getLessonsByModule(mod.id);
      total += lessons.length;
      completed += lessons.filter((l) =>
        progress.completedLessons.includes(l.id)
      ).length;
    }
  }
  return { completedLessons: completed, totalLessons: total, pct: total > 0 ? (completed / total) * 100 : 0 };
}

function isLevelUnlocked(
  level: CertificationLevelConfig,
  progress: EducationProgress
): boolean {
  if (!level.requiredLevel) return true;
  return progress.certificates.some((c) => c.levelId === level.requiredLevel);
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export function AcademyPage() {
  const [progress, setProgress] = useState<EducationProgress | null>(null);
  const [examLevelId, setExamLevelId] = useState<string | null>(null);
  const [certLevelId, setCertLevelId] = useState<string | null>(null);

  const refreshProgress = () => {
    setProgress(getEducationProgress());
    const newBadges = checkAndAwardBadges();
    if (newBadges.length > 0) {
      showBadgeNotifications(newBadges);
    }
  };

  useEffect(() => {
    enroll();
    setProgress(getEducationProgress());
  }, []);

  const xpLevel = useMemo(
    () => (progress ? getXPLevel(progress.xp) : getXPLevel(0)),
    [progress]
  );

  if (!progress) return null;

  // Find "continue" button target
  const continueTarget = getNextLesson("niva-1", progress.completedLessons);

  // Final exam overlay
  if (examLevelId) {
    return (
      <FinalExam
        levelId={examLevelId}
        onClose={() => {
          setExamLevelId(null);
          refreshProgress();
        }}
        onPass={() => {
          setExamLevelId(null);
          setCertLevelId(examLevelId);
          refreshProgress();
        }}
      />
    );
  }

  // Certificate earn flow overlay
  if (certLevelId) {
    return (
      <CertificateEarnFlow
        levelId={certLevelId}
        onDone={() => {
          setCertLevelId(null);
          refreshProgress();
        }}
      />
    );
  }

  return (
    <>
      <XPToastContainer />
      <BadgeNotificationContainer />
      {/* Hero */}
      <section className="mx-auto max-w-[68.75rem] px-6 pt-20 pb-12 md:pt-28 md:pb-16">
        <FadeIn>
          <p
            className="text-[0.6875rem] font-medium uppercase tracking-[0.15em] text-muted-foreground"
            style={{ fontFamily: "var(--font-geist-mono), monospace" }}
          >
            AI-utbildning för kommunanställda
          </p>
          <h1
            className="mt-4 text-[1.75rem] leading-[1.1] tracking-[-0.04em] sm:text-[2.75rem] md:text-[4.5rem]"
            style={{ fontFamily: "var(--font-bodoni), serif", fontWeight: 400 }}
          >
            AI-akademin
          </h1>
          <p className="mt-6 max-w-[42rem] text-[1.0625rem] leading-[1.7] text-foreground">
            Lär dig AI från grunden till avancerad nivå. Tre certifieringsnivåer med
            engagerande lektioner, quiz och verkliga exempel från kommunen.
          </p>
        </FadeIn>

        {/* XP & Stats bar */}
        <FadeIn delay={0.1}>
          <div className="mt-8 flex flex-wrap items-center gap-6 rounded-xl border border-border bg-card p-5">
            {/* XP Level */}
            <div className="flex items-center gap-3">
              <motion.div
                className="flex h-12 w-12 items-center justify-center rounded-xl border border-border bg-secondary"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200, damping: 15 }}
              >
                <span className="text-lg font-bold tabular-nums">{xpLevel.level}</span>
              </motion.div>
              <div>
                <p className="text-[0.75rem] text-muted-foreground">Din nivå</p>
                <p className="text-[0.9375rem] font-medium">{xpLevel.title}</p>
              </div>
            </div>

            <div className="hidden h-8 w-px bg-border sm:block" />

            {/* XP */}
            <div className="flex items-center gap-2">
              <Trophy size={16} className="text-muted-foreground" />
              <div>
                <p className="text-[0.75rem] text-muted-foreground">XP</p>
                <p className="text-[0.9375rem] font-bold tabular-nums">{progress.xp}</p>
              </div>
            </div>

            <div className="hidden h-8 w-px bg-border sm:block" />

            {/* Certificates */}
            <div className="flex items-center gap-2">
              <Award size={16} className="text-muted-foreground" />
              <div>
                <p className="text-[0.75rem] text-muted-foreground">Certifikat</p>
                <p className="text-[0.9375rem] font-bold tabular-nums">
                  {progress.certificates.length}/3
                </p>
              </div>
            </div>

            <div className="hidden h-8 w-px bg-border sm:block" />

            {/* Streak */}
            <div className="flex items-center gap-2">
              <Flame size={16} className="text-muted-foreground" />
              <div>
                <p className="text-[0.75rem] text-muted-foreground">Lektioner</p>
                <p className="text-[0.9375rem] font-bold tabular-nums">
                  {progress.completedLessons.length}/{LESSONS.length}
                </p>
              </div>
            </div>

            {/* Continue button */}
            {continueTarget && (
              <Link
                href={`/akademin/${continueTarget.courseId}?modul=${continueTarget.moduleId}&lektion=${continueTarget.lessonId}`}
                className="ml-auto flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-[0.8125rem] font-medium uppercase tracking-[0.01em] text-primary-foreground transition-all duration-150 active:scale-[0.98]"
                style={{
                  fontFamily: "var(--font-geist-mono), monospace",
                  boxShadow: "0px 2px 1px 0px rgba(255,255,255,0.15) inset, 0px -2px 1px 0px rgba(0,0,0,0.05) inset",
                }}
              >
                <Play size={14} />
                Fortsätt
              </Link>
            )}
          </div>
        </FadeIn>
      </section>

      {/* Gradient divider */}
      <div className="mx-auto max-w-[68.75rem] px-6">
        <div className="h-px" style={{ background: BRAND_GRADIENT }} />
      </div>

      {/* Levels */}
      <section className="mx-auto max-w-[68.75rem] px-6 py-12">
        <FadeIn delay={0.15}>
          <h2
            className="text-[1.25rem] leading-[1.3] tracking-[-0.02em] sm:text-[1.5rem]"
            style={{ fontFamily: "var(--font-bodoni), serif", fontWeight: 400 }}
          >
            Tre nivåer, ett mål
          </h2>
          <p className="mt-2 text-[0.9375rem] text-foreground">
            Varje nivå avslutas med ett certifikat. Börja från grunden och bygg din kompetens.
          </p>
        </FadeIn>

        <div className="mt-8 space-y-6">
          {CERTIFICATION_LEVELS.map((level, i) => {
            const Icon = LEVEL_ICONS[level.icon] || GraduationCap;
            const unlocked = isLevelUnlocked(level, progress);
            const levelProgress = getLevelProgress(level.id, progress);
            const hasCert = progress.certificates.some(
              (c) => c.levelId === level.id
            );
            const gradient = LEVEL_GRADIENTS[level.id];

            return (
              <FadeIn key={level.id} delay={0.2 + i * 0.08}>
                <div
                  className={`group relative overflow-hidden rounded-2xl border transition-all duration-300 ${
                    unlocked
                      ? "border-border bg-card hover:shadow-xl"
                      : "border-border/50 bg-card/50"
                  }`}
                >
                  {/* Gradient accent line */}
                  <div
                    className="absolute top-0 left-0 h-1 w-full"
                    style={{ background: gradient, opacity: unlocked ? 1 : 0.3 }}
                  />

                  <div className="p-6 md:p-8">
                    <div className="flex flex-col gap-6 sm:flex-row sm:items-start">
                      {/* Level badge */}
                      <motion.div
                        className={`flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl ${
                          unlocked ? "" : "opacity-40"
                        }`}
                        style={{
                          background: unlocked ? gradient : "var(--secondary)",
                        }}
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.3 + i * 0.1, type: "spring" }}
                      >
                        {unlocked ? (
                          <Icon size={28} className="text-white" />
                        ) : (
                          <Lock size={24} className="text-muted-foreground" />
                        )}
                      </motion.div>

                      {/* Content */}
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-3">
                          <p
                            className="text-[0.6875rem] font-medium uppercase tracking-[0.15em] text-muted-foreground"
                            style={{
                              fontFamily: "var(--font-geist-mono), monospace",
                            }}
                          >
                            {level.subtitle}
                          </p>
                          {hasCert && (
                            <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/15 px-2 py-0.5 text-[0.6875rem] font-medium text-emerald-500">
                              <Award size={10} />
                              Certifierad
                            </span>
                          )}
                          {!unlocked && (
                            <span className="inline-flex items-center gap-1 rounded-full bg-secondary px-2 py-0.5 text-[0.6875rem] font-medium text-muted-foreground">
                              <Lock size={10} />
                              Kräver {level.requiredLevel === "niva-1" ? "Nivå 1" : "Nivå 2"}
                            </span>
                          )}
                        </div>

                        <h3
                          className={`mt-1 text-[1.25rem] leading-[1.3] tracking-[-0.02em] sm:text-[1.5rem] ${
                            !unlocked ? "text-muted-foreground" : ""
                          }`}
                          style={{
                            fontFamily: "var(--font-bodoni), serif",
                            fontWeight: 400,
                          }}
                        >
                          {level.title}
                        </h3>

                        <p
                          className={`mt-2 text-[0.9375rem] leading-[1.6] ${
                            unlocked
                              ? "text-foreground/85"
                              : "text-foreground/60"
                          }`}
                        >
                          {level.description}
                        </p>

                        {/* Course pills */}
                        {unlocked && (
                          <div className="mt-4 flex flex-wrap gap-2">
                            {getCoursesByLevel(level.id).map((course) => {
                              const courseLessons = getModulesByCourse(course.id).flatMap(
                                (m) => getLessonsByModule(m.id)
                              );
                              const done = courseLessons.filter((l) =>
                                progress.completedLessons.includes(l.id)
                              ).length;
                              const total = courseLessons.length;
                              const isDone = done === total && total > 0;

                              return (
                                <Link
                                  key={course.id}
                                  href={`/akademin/${course.id}`}
                                  className={`flex items-center gap-2 rounded-lg border px-3 py-2 text-[0.8125rem] transition-all hover:shadow-md ${
                                    isDone
                                      ? "border-emerald-500/20 bg-emerald-500/[0.05]"
                                      : "border-border hover:bg-secondary"
                                  }`}
                                >
                                  <BookOpen size={14} className="text-muted-foreground" />
                                  <span className="font-medium">{course.title}</span>
                                  <span className="text-[0.75rem] tabular-nums text-muted-foreground">
                                    {done}/{total}
                                  </span>
                                </Link>
                              );
                            })}
                          </div>
                        )}

                        {/* Progress bar */}
                        {unlocked && levelProgress.totalLessons > 0 && (
                          <div className="mt-4">
                            <div className="flex items-center justify-between text-[0.75rem] text-muted-foreground">
                              <span>
                                {levelProgress.completedLessons} av{" "}
                                {levelProgress.totalLessons} lektioner
                              </span>
                              <span className="tabular-nums">
                                {Math.round(levelProgress.pct)}%
                              </span>
                            </div>
                            <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-secondary">
                              <motion.div
                                className="h-full rounded-full"
                                style={{ background: gradient }}
                                initial={{ width: 0 }}
                                animate={{
                                  width: `${levelProgress.pct}%`,
                                }}
                                transition={{
                                  duration: 0.8,
                                  delay: 0.4 + i * 0.1,
                                }}
                              />
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Arrow / CTA */}
                      {unlocked && (
                        <Link
                          href={`/akademin/${getCoursesByLevel(level.id)[0]?.id}`}
                          className="hidden shrink-0 self-center sm:block"
                        >
                          <ChevronRight
                            size={24}
                            className="text-muted-foreground transition-transform group-hover:translate-x-1"
                          />
                        </Link>
                      )}
                    </div>

                    {/* Final exam / Certificate buttons */}
                    {unlocked && (() => {
                      const allModulesComplete = getCoursesByLevel(level.id).every((course) => {
                        const mods = getModulesByCourse(course.id);
                        return mods.every((m) => {
                          const lessons = getLessonsByModule(m.id);
                          const allLessonsDone = lessons.every((l) => progress.completedLessons.includes(l.id));
                          const quizPassed = getModuleQuizScore(m.id) >= m.quizPassThreshold * 100;
                          return allLessonsDone && quizPassed;
                        });
                      });
                      const certified = hasCertificate(level.id as "niva-1" | "niva-2" | "niva-3");
                      const examScore = getFinalExamScore(level.id as "niva-1" | "niva-2" | "niva-3");

                      if (certified) {
                        return (
                          <div className="mt-4 flex items-center gap-3">
                            <Link
                              href="/akademin/certifikat"
                              className="flex items-center gap-2 rounded-lg border border-emerald-500/20 bg-emerald-500/[0.05] px-4 py-2.5 text-[0.8125rem] font-medium text-emerald-500 transition-all hover:bg-emerald-500/10"
                            >
                              <Award size={16} />
                              Visa certifikat
                            </Link>
                            {examScore > 0 && (
                              <span className="text-[0.75rem] text-muted-foreground">
                                Slutprov: {examScore}%
                              </span>
                            )}
                          </div>
                        );
                      }

                      if (allModulesComplete) {
                        return (
                          <div className="mt-4">
                            <button
                              onClick={() => setExamLevelId(level.id)}
                              className="flex items-center gap-2 rounded-lg px-5 py-2.5 text-[0.875rem] font-medium text-background transition-all hover:opacity-90"
                              style={{ background: gradient }}
                            >
                              <Trophy size={16} />
                              Starta slutprovet
                            </button>
                          </div>
                        );
                      }

                      return null;
                    })()}

                    {/* Meta row */}
                    <div
                      className={`mt-4 flex items-center gap-4 border-t pt-4 text-[0.75rem] ${
                        unlocked
                          ? "border-border text-muted-foreground"
                          : "border-border/50 text-muted-foreground"
                      }`}
                    >
                      <span>{level.courseIds.length} kurser</span>
                      <span>~{level.estimatedTotalMinutes} min</span>
                      <span>Slutprov: {level.finalExamQuestionCount} frågor</span>
                      <span className="capitalize">{level.badgeColor} certifikat</span>
                    </div>
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
