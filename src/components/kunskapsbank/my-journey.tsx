"use client";

import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  BookOpen,
  Brain,
  Sparkles,
  Briefcase,
  Boxes,
  Laptop,
  Server,
  Database,
  Scale,
  Shield,
  Wrench,
  FlaskConical,
  Monitor,
  Trophy,
  Flame,
  TrendingUp,
  ChevronDown,
  ChevronUp,
  Check,
  Route,
  Clock,
} from "lucide-react";
import { FadeIn } from "@/components/shared/fade-in";
import { BRAND_GRADIENT } from "@/lib/constants";
import {
  CONCEPTS,
  CATEGORIES,
  LEARNING_PATHS,
  type ConceptCategory,
} from "@/lib/knowledge-bank";
import { getProgress, type KnowledgeProgress } from "@/lib/knowledge-progress";
import { getEducationProgress, type EducationProgress } from "@/lib/education-progress";
import { BADGES, getXPLevel } from "@/lib/education-system";
import { CERTIFICATION_LEVELS } from "@/lib/education-data";
import * as LucideIcons from "lucide-react";

// ---------------------------------------------------------------------------
// Icon map
// ---------------------------------------------------------------------------
const CATEGORY_ICONS: Record<
  string,
  React.ComponentType<{ size?: number; className?: string }>
> = {
  "it-grunderna": Monitor,
  "ai-grunderna": Brain,
  sprakmodeller: Sparkles,
  "ai-pa-jobbet": Briefcase,
  intric: Boxes,
  copilot: Laptop,
  teknik: Server,
  "data-sokning": Database,
  "lagar-regler": Scale,
  "sakerhet-etik": Shield,
  verktyg: Wrench,
  avancerat: FlaskConical,
};

// Tailwind-safe category colors (bg + text)
const CATEGORY_COLORS: Record<string, { bg: string; ring: string; glow: string }> = {
  "it-grunderna": { bg: "bg-slate-500", ring: "ring-slate-500/30", glow: "shadow-slate-500/20" },
  "ai-grunderna": { bg: "bg-purple-500", ring: "ring-purple-500/30", glow: "shadow-purple-500/20" },
  sprakmodeller: { bg: "bg-indigo-500", ring: "ring-indigo-500/30", glow: "shadow-indigo-500/20" },
  "ai-pa-jobbet": { bg: "bg-blue-500", ring: "ring-blue-500/30", glow: "shadow-blue-500/20" },
  intric: { bg: "bg-teal-500", ring: "ring-teal-500/30", glow: "shadow-teal-500/20" },
  copilot: { bg: "bg-sky-500", ring: "ring-sky-500/30", glow: "shadow-sky-500/20" },
  teknik: { bg: "bg-green-500", ring: "ring-green-500/30", glow: "shadow-green-500/20" },
  "data-sokning": { bg: "bg-emerald-500", ring: "ring-emerald-500/30", glow: "shadow-emerald-500/20" },
  "lagar-regler": { bg: "bg-amber-500", ring: "ring-amber-500/30", glow: "shadow-amber-500/20" },
  "sakerhet-etik": { bg: "bg-rose-500", ring: "ring-rose-500/30", glow: "shadow-rose-500/20" },
  verktyg: { bg: "bg-orange-500", ring: "ring-orange-500/30", glow: "shadow-orange-500/20" },
  avancerat: { bg: "bg-violet-500", ring: "ring-violet-500/30", glow: "shadow-violet-500/20" },
};

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function getCategoryStats(progress: KnowledgeProgress) {
  const cats = Object.keys(CATEGORIES) as ConceptCategory[];
  return cats.map((cat) => {
    const concepts = CONCEPTS.filter((c) => c.category === cat);
    const read = concepts.filter((c) => progress.readConcepts.includes(c.id));
    return { category: cat, total: concepts.length, read: read.length };
  });
}

function getBestQuizScore(progress: KnowledgeProgress) {
  const scores = Object.values(progress.quizScores);
  if (scores.length === 0) return null;
  return Math.max(...scores);
}

function getLevel(readCount: number): { level: number; title: string; next: number } {
  if (readCount >= 200) return { level: 10, title: "AI-mästare", next: 222 };
  if (readCount >= 170) return { level: 9, title: "AI-expert", next: 200 };
  if (readCount >= 140) return { level: 8, title: "AI-strateg", next: 170 };
  if (readCount >= 110) return { level: 7, title: "AI-entusiast", next: 140 };
  if (readCount >= 80) return { level: 6, title: "AI-utforskare", next: 110 };
  if (readCount >= 55) return { level: 5, title: "AI-nyfiken", next: 80 };
  if (readCount >= 35) return { level: 4, title: "Digital navigatör", next: 55 };
  if (readCount >= 20) return { level: 3, title: "Digital medveten", next: 35 };
  if (readCount >= 8) return { level: 2, title: "Nybörjare", next: 20 };
  return { level: 1, title: "Första steget", next: 8 };
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

function getBadgeIcon(name: string) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const Icon = (LucideIcons as any)[name] as React.ComponentType<{
    size?: number;
    className?: string;
  }> | undefined;
  return Icon || LucideIcons.Award;
}

const RARITY_RING: Record<string, string> = {
  common: "ring-border",
  uncommon: "ring-blue-500/30",
  rare: "ring-purple-500/30",
  epic: "ring-amber-500/30",
  legendary: "ring-yellow-400/40",
};

export function MyJourney() {
  const [progress, setProgress] = useState<KnowledgeProgress | null>(null);
  const [eduProgress, setEduProgress] = useState<EducationProgress | null>(null);
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);

  useEffect(() => {
    setProgress(getProgress());
    setEduProgress(getEducationProgress());
  }, []);

  const categoryStats = useMemo(
    () => (progress ? getCategoryStats(progress) : []),
    [progress]
  );

  const readCount = progress?.readConcepts.length ?? 0;
  const bestScore = progress ? getBestQuizScore(progress) : null;
  const level = getLevel(readCount);
  const completedPaths = progress?.completedPaths.length ?? 0;

  if (!progress) return null;

  return (
    <div className="space-y-8">
      {/* ----------------------------------------------------------------- */}
      {/* Level & XP hero card                                              */}
      {/* ----------------------------------------------------------------- */}
      <FadeIn>
        <div className="relative overflow-hidden rounded-xl border border-border bg-card p-6 md:p-8">
          {/* Subtle gradient glow */}
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.04]"
            style={{ background: BRAND_GRADIENT }}
          />
          <div className="relative">
            <div className="flex items-center gap-4">
              <motion.div
                className="flex h-16 w-16 items-center justify-center rounded-2xl border border-border bg-secondary"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200, damping: 15 }}
              >
                <span className="text-2xl font-bold tabular-nums">{level.level}</span>
              </motion.div>
              <div>
                <p
                  className="text-[0.6875rem] font-medium uppercase tracking-[0.15em] text-muted-foreground"
                  style={{ fontFamily: "var(--font-geist-mono), monospace" }}
                >
                  Din nivå
                </p>
                <h2
                  className="mt-0.5 text-[1.5rem] leading-[1.2] tracking-[-0.03em] sm:text-[2rem]"
                  style={{ fontFamily: "var(--font-bodoni), serif", fontWeight: 400 }}
                >
                  {level.title}
                </h2>
              </div>
            </div>

            {/* XP progress to next level */}
            <div className="mt-6">
              <div className="flex items-center justify-between text-[0.8125rem]">
                <span className="text-muted-foreground">
                  {readCount} / {level.next} begrepp till nästa nivå
                </span>
                <span className="font-medium tabular-nums">
                  {Math.round((readCount / level.next) * 100)}%
                </span>
              </div>
              <div className="mt-2 h-2 overflow-hidden rounded-full bg-secondary">
                <motion.div
                  className="h-full rounded-full"
                  style={{ background: BRAND_GRADIENT }}
                  initial={{ width: 0 }}
                  animate={{ width: `${Math.min((readCount / level.next) * 100, 100)}%` }}
                  transition={{ duration: 1, ease: "easeOut" }}
                />
              </div>
            </div>
          </div>
        </div>
      </FadeIn>

      {/* ----------------------------------------------------------------- */}
      {/* Stat cards row                                                    */}
      {/* ----------------------------------------------------------------- */}
      <FadeIn delay={0.1}>
        <div className="grid gap-4 sm:grid-cols-3">
          {/* Concepts read */}
          <motion.div
            className="rounded-xl border border-border bg-card p-5"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary">
                <BookOpen size={18} className="text-foreground" />
              </div>
              <div>
                <p className="text-[0.75rem] text-muted-foreground">Utforskade begrepp</p>
                <p className="text-[1.375rem] font-bold tabular-nums leading-tight">
                  {readCount}
                  <span className="text-[0.875rem] font-normal text-muted-foreground">
                    /{CONCEPTS.length}
                  </span>
                </p>
              </div>
            </div>
          </motion.div>

          {/* Best quiz */}
          <motion.div
            className="rounded-xl border border-border bg-card p-5"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary">
                <Trophy size={18} className="text-foreground" />
              </div>
              <div>
                <p className="text-[0.75rem] text-muted-foreground">Bästa quiz-resultat</p>
                <p className="text-[1.375rem] font-bold tabular-nums leading-tight">
                  {bestScore !== null ? `${bestScore}%` : "—"}
                </p>
              </div>
            </div>
          </motion.div>

          {/* Streak */}
          <motion.div
            className="rounded-xl border border-border bg-card p-5"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary">
                <Flame size={18} className="text-foreground" />
              </div>
              <div>
                <p className="text-[0.75rem] text-muted-foreground">Streak</p>
                <p className="text-[1.375rem] font-bold tabular-nums leading-tight">
                  {progress.streak}
                  <span className="text-[0.875rem] font-normal text-muted-foreground">
                    {" "}
                    {progress.streak === 1 ? "dag" : "dagar"}
                  </span>
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </FadeIn>

      {/* ----------------------------------------------------------------- */}
      {/* Knowledge tree — visual category orbs                             */}
      {/* ----------------------------------------------------------------- */}
      <FadeIn delay={0.15}>
        <div className="rounded-xl border border-border bg-card p-6 md:p-8">
          <div className="flex items-center gap-2">
            <TrendingUp size={18} className="text-muted-foreground" />
            <h3
              className="text-[1.125rem] leading-[1.3] tracking-[-0.02em]"
              style={{ fontFamily: "var(--font-heading), serif", fontWeight: 400 }}
            >
              Kunskapsträd
            </h3>
          </div>
          <p className="mt-2 text-[0.8125rem] text-muted-foreground">
            Varje gren representerar en kategori. Noder lyser upp när du lärt dig begreppen.
          </p>

          {/* Tree visualization */}
          <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
            {categoryStats.map((stat, i) => {
              const Icon = CATEGORY_ICONS[stat.category] || BookOpen;
              const colors = CATEGORY_COLORS[stat.category];
              const pct = stat.total > 0 ? stat.read / stat.total : 0;
              const isComplete = stat.read === stat.total;
              const isExpanded = expandedCategory === stat.category;

              return (
                <motion.button
                  key={stat.category}
                  onClick={() =>
                    setExpandedCategory(isExpanded ? null : stat.category)
                  }
                  className={`group relative flex flex-col items-center rounded-xl border bg-card p-4 text-center transition-all duration-300 ${
                    isComplete
                      ? `border-transparent ring-2 ${colors.ring} shadow-lg ${colors.glow}`
                      : "border-border hover:border-border/80 hover:shadow-md"
                  }`}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2 + i * 0.04, type: "spring", stiffness: 200, damping: 20 }}
                >
                  {/* Circular progress ring */}
                  <div className="relative">
                    <svg width="64" height="64" viewBox="0 0 64 64" className="drop-shadow-sm">
                      {/* Background circle */}
                      <circle
                        cx="32"
                        cy="32"
                        r="28"
                        fill="none"
                        strokeWidth="3"
                        className="stroke-secondary"
                      />
                      {/* Progress arc */}
                      <motion.circle
                        cx="32"
                        cy="32"
                        r="28"
                        fill="none"
                        strokeWidth="3"
                        strokeLinecap="round"
                        className={isComplete ? `${colors.bg.replace("bg-", "stroke-")}` : "stroke-foreground/40"}
                        strokeDasharray={`${2 * Math.PI * 28}`}
                        initial={{ strokeDashoffset: 2 * Math.PI * 28 }}
                        animate={{
                          strokeDashoffset: 2 * Math.PI * 28 * (1 - pct),
                        }}
                        transition={{ duration: 1, delay: 0.3 + i * 0.05, ease: "easeOut" }}
                        style={{
                          transformOrigin: "center",
                          transform: "rotate(-90deg)",
                        }}
                      />
                    </svg>
                    {/* Icon in center */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <motion.div
                        animate={isComplete ? { scale: [1, 1.15, 1] } : {}}
                        transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
                      >
                        <Icon
                          size={22}
                          className={
                            isComplete
                              ? "text-foreground"
                              : pct > 0
                                ? "text-foreground/70"
                                : "text-muted-foreground/40"
                          }
                        />
                      </motion.div>
                    </div>
                  </div>

                  {/* Label */}
                  <p className="mt-2 line-clamp-2 text-[0.75rem] font-medium leading-tight">
                    {CATEGORIES[stat.category].label}
                  </p>

                  {/* Count */}
                  <p className="mt-1 text-[0.6875rem] tabular-nums text-muted-foreground">
                    {stat.read}/{stat.total}
                  </p>

                  {/* Expand indicator */}
                  <div className="mt-1">
                    {isExpanded ? (
                      <ChevronUp size={12} className="text-muted-foreground" />
                    ) : (
                      <ChevronDown size={12} className="text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
                    )}
                  </div>

                  {/* Complete badge */}
                  {isComplete && (
                    <motion.div
                      className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500 shadow-sm"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", delay: 0.5 + i * 0.05 }}
                    >
                      <Check size={12} className="text-white" />
                    </motion.div>
                  )}
                </motion.button>
              );
            })}
          </div>

          {/* Expanded concept list */}
          <AnimatePresence>
            {expandedCategory && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="mt-4 rounded-lg border border-border bg-secondary/30 p-4">
                  <p className="mb-3 text-[0.8125rem] font-medium">
                    {CATEGORIES[expandedCategory as ConceptCategory].label}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {CONCEPTS.filter((c) => c.category === expandedCategory).map(
                      (concept) => {
                        const isRead = progress.readConcepts.includes(concept.id);
                        return (
                          <motion.span
                            key={concept.id}
                            className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[0.75rem] transition-colors ${
                              isRead
                                ? "bg-foreground/10 font-medium text-foreground"
                                : "bg-secondary text-muted-foreground/60"
                            }`}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.15 }}
                          >
                            {isRead && (
                              <Check size={10} className="text-emerald-500" />
                            )}
                            {concept.title}
                          </motion.span>
                        );
                      }
                    )}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </FadeIn>

      {/* ----------------------------------------------------------------- */}
      {/* Learning paths progress                                           */}
      {/* ----------------------------------------------------------------- */}
      <FadeIn delay={0.2}>
        <div className="rounded-xl border border-border bg-card p-6 md:p-8">
          <div className="flex items-center gap-2">
            <Route size={18} className="text-muted-foreground" />
            <h3
              className="text-[1.125rem] leading-[1.3] tracking-[-0.02em]"
              style={{ fontFamily: "var(--font-heading), serif", fontWeight: 400 }}
            >
              Lärvägar
            </h3>
            <span className="ml-auto text-[0.8125rem] tabular-nums text-muted-foreground">
              {completedPaths}/{LEARNING_PATHS.length} klara
            </span>
          </div>

          <div className="mt-5 space-y-3">
            {LEARNING_PATHS.map((path, i) => {
              const completedConcepts = path.conceptIds.filter((id) =>
                progress.readConcepts.includes(id)
              ).length;
              const total = path.conceptIds.length;
              const pct = total > 0 ? (completedConcepts / total) * 100 : 0;
              const isDone = completedConcepts === total;

              return (
                <motion.div
                  key={path.id}
                  className={`rounded-lg border p-4 transition-colors ${
                    isDone
                      ? "border-emerald-500/20 bg-emerald-500/[0.03]"
                      : "border-border"
                  }`}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.25 + i * 0.06 }}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      {isDone ? (
                        <div className="flex h-7 w-7 items-center justify-center rounded-full bg-emerald-500/15">
                          <Check size={14} className="text-emerald-500" />
                        </div>
                      ) : (
                        <div className="flex h-7 w-7 items-center justify-center rounded-full bg-secondary text-[0.75rem] font-medium tabular-nums">
                          {i + 1}
                        </div>
                      )}
                      <div>
                        <p className="text-[0.875rem] font-medium">{path.title}</p>
                        <p className="text-[0.75rem] text-muted-foreground">
                          <Clock size={10} className="mr-1 inline" />
                          ~{path.estimatedMinutes} min · {completedConcepts}/{total} begrepp
                        </p>
                      </div>
                    </div>
                    <span className="text-[0.8125rem] font-medium tabular-nums">
                      {Math.round(pct)}%
                    </span>
                  </div>
                  <div className="mt-2.5 h-1.5 overflow-hidden rounded-full bg-secondary">
                    <motion.div
                      className={`h-full rounded-full ${isDone ? "bg-emerald-500" : ""}`}
                      style={!isDone ? { background: BRAND_GRADIENT } : undefined}
                      initial={{ width: 0 }}
                      animate={{ width: `${pct}%` }}
                      transition={{ duration: 0.8, delay: 0.3 + i * 0.06 }}
                    />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </FadeIn>

      {/* ----------------------------------------------------------------- */}
      {/* Quiz scores                                                       */}
      {/* ----------------------------------------------------------------- */}
      <FadeIn delay={0.25}>
        <div className="rounded-xl border border-border bg-card p-6 md:p-8">
          <div className="flex items-center gap-2">
            <Trophy size={18} className="text-muted-foreground" />
            <h3
              className="text-[1.125rem] leading-[1.3] tracking-[-0.02em]"
              style={{ fontFamily: "var(--font-heading), serif", fontWeight: 400 }}
            >
              Quiz-resultat
            </h3>
          </div>

          {Object.keys(progress.quizScores).length === 0 ? (
            <div className="mt-4 rounded-lg bg-secondary/50 p-6 text-center">
              <Trophy size={24} className="mx-auto text-muted-foreground/40" />
              <p className="mt-3 text-[0.875rem] text-muted-foreground">
                Du har inte gjort något quiz ännu. Gå till{" "}
                <span className="font-medium text-foreground">Testa dig</span>-fliken
                och kör ditt första!
              </p>
            </div>
          ) : (
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {Object.entries(progress.quizScores).map(([key, score], i) => {
                const cat = key as ConceptCategory;
                const catInfo = CATEGORIES[cat];
                const Icon = CATEGORY_ICONS[cat] || BookOpen;
                const label = catInfo ? catInfo.label : key === "all" ? "Alla kategorier" : key;

                return (
                  <motion.div
                    key={key}
                    className="flex items-center gap-3 rounded-lg border border-border p-3"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + i * 0.05 }}
                  >
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-secondary">
                      <Icon size={16} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-[0.8125rem] font-medium">{label}</p>
                      <div className="mt-1 h-1 overflow-hidden rounded-full bg-secondary">
                        <motion.div
                          className="h-full rounded-full"
                          style={{
                            background:
                              score >= 80
                                ? "#10b981"
                                : score >= 50
                                  ? "#f59e0b"
                                  : "#ef4444",
                          }}
                          initial={{ width: 0 }}
                          animate={{ width: `${score}%` }}
                          transition={{ duration: 0.6, delay: 0.4 + i * 0.05 }}
                        />
                      </div>
                    </div>
                    <span className="text-[0.9375rem] font-bold tabular-nums">{score}%</span>
                  </motion.div>
                );
              })}
            </div>
          )}
        </div>
      </FadeIn>

      {/* ----------------------------------------------------------------- */}
      {/* Academy CTA / link                                                */}
      {/* ----------------------------------------------------------------- */}
      {eduProgress && (
        <FadeIn delay={0.28}>
          <div className="relative overflow-hidden rounded-xl border border-border bg-card p-6 md:p-8">
            <div
              className="pointer-events-none absolute inset-0 opacity-[0.04]"
              style={{ background: BRAND_GRADIENT }}
            />
            <div className="relative text-center">
              <LucideIcons.GraduationCap
                size={32}
                className="mx-auto text-muted-foreground"
              />
              <h3
                className="mt-3 text-[1.125rem] leading-[1.3] tracking-[-0.02em]"
                style={{ fontFamily: "var(--font-heading), serif", fontWeight: 400 }}
              >
                AI-akademin
              </h3>
              <p className="mt-2 text-[0.875rem] text-muted-foreground">
                {eduProgress.completedLessons.length === 0
                  ? "Vill du lära dig systematiskt? Ta AI-akademins kurser och få certifikat för dina kunskaper."
                  : `Du har klarat ${eduProgress.completedLessons.length} lektioner och ${eduProgress.certificates.length} certifikat. Fortsätt din resa!`}
              </p>
              <a
                href="/akademin"
                className="mt-4 inline-flex items-center gap-2 rounded-lg bg-foreground px-5 py-2.5 text-[0.8125rem] font-medium text-background transition-all hover:bg-foreground/90"
              >
                <LucideIcons.GraduationCap size={14} />
                {eduProgress.completedLessons.length === 0
                  ? "Gå till akademin"
                  : "Fortsätt i akademin"}
              </a>
            </div>
          </div>
        </FadeIn>
      )}

      {/* ----------------------------------------------------------------- */}
      {/* Academy: Certificates                                             */}
      {/* ----------------------------------------------------------------- */}
      {eduProgress && (
        <FadeIn delay={0.3}>
          <div className="rounded-xl border border-border bg-card p-6 md:p-8">
            <div className="flex items-center gap-2">
              <LucideIcons.Award size={18} className="text-muted-foreground" />
              <h3
                className="text-[1.125rem] leading-[1.3] tracking-[-0.02em]"
                style={{ fontFamily: "var(--font-heading), serif", fontWeight: 400 }}
              >
                Certifikat
              </h3>
            </div>
            <div className="mt-4 grid gap-3 sm:grid-cols-3">
              {CERTIFICATION_LEVELS.map((lvl, i) => {
                const cert = eduProgress.certificates.find(
                  (c) => c.levelId === lvl.id
                );
                const earned = !!cert;
                return (
                  <motion.div
                    key={lvl.id}
                    className={`rounded-xl border p-4 text-center ${
                      earned
                        ? "border-amber-500/20 bg-amber-500/[0.03]"
                        : "border-border/50 opacity-40"
                    }`}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: earned ? 1 : 0.4, scale: 1 }}
                    transition={{ delay: 0.35 + i * 0.08 }}
                  >
                    <div
                      className={`mx-auto flex h-12 w-12 items-center justify-center rounded-xl ${
                        earned ? "" : "bg-secondary"
                      }`}
                      style={
                        earned
                          ? {
                              background:
                                lvl.id === "niva-1"
                                  ? "linear-gradient(135deg, #d4a574, #b8860b)"
                                  : lvl.id === "niva-2"
                                    ? "linear-gradient(135deg, #b8c6d4, #8fa3b8)"
                                    : "linear-gradient(135deg, #d4af37, #b8960c)",
                            }
                          : undefined
                      }
                    >
                      <LucideIcons.Award
                        size={22}
                        className={earned ? "text-white" : "text-muted-foreground"}
                      />
                    </div>
                    <p className="mt-2 text-[0.8125rem] font-medium">{lvl.title}</p>
                    {cert && (
                      <p className="mt-0.5 text-[0.6875rem] text-muted-foreground">
                        {cert.earnedDate}
                      </p>
                    )}
                  </motion.div>
                );
              })}
            </div>
          </div>
        </FadeIn>
      )}

      {/* ----------------------------------------------------------------- */}
      {/* Academy: Badges                                                   */}
      {/* ----------------------------------------------------------------- */}
      {eduProgress && (
        <FadeIn delay={0.35}>
          <div className="rounded-xl border border-border bg-card p-6 md:p-8">
            <div className="flex items-center gap-2">
              <LucideIcons.Star size={18} className="text-muted-foreground" />
              <h3
                className="text-[1.125rem] leading-[1.3] tracking-[-0.02em]"
                style={{ fontFamily: "var(--font-heading), serif", fontWeight: 400 }}
              >
                Badges
              </h3>
              <span className="ml-auto text-[0.8125rem] tabular-nums text-muted-foreground">
                {eduProgress.badges.length}/{BADGES.length}
              </span>
            </div>
            <div className="mt-4 grid grid-cols-3 gap-3 sm:grid-cols-4 lg:grid-cols-6">
              {BADGES.map((badge, i) => {
                const earned = eduProgress.badges.includes(badge.id);
                const BadgeIcon = getBadgeIcon(badge.icon);
                return (
                  <motion.div
                    key={badge.id}
                    className={`flex flex-col items-center rounded-xl p-3 text-center transition-all ${
                      earned
                        ? `ring-1 ${RARITY_RING[badge.rarity] || "ring-border"}`
                        : "opacity-25"
                    }`}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: earned ? 1 : 0.25, scale: 1 }}
                    transition={{ delay: 0.4 + i * 0.03 }}
                    title={badge.description}
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary">
                      <BadgeIcon
                        size={18}
                        className={earned ? "text-foreground" : "text-muted-foreground"}
                      />
                    </div>
                    <p className="mt-1.5 line-clamp-1 text-[0.6875rem] font-medium leading-tight">
                      {badge.title}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </FadeIn>
      )}

    </div>
  );
}
