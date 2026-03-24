"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Copy,
  Building2,
  GraduationCap,
  Landmark,
  Heart,
  Wrench,
  BookOpen,
  Palette,
  Crown,
  FileSearch,
  ClipboardList,
  Cpu,
  Stethoscope,
  HardHat,
  Pen,
  FileText,
  Lightbulb,
  Scale,
  Sparkles,
  X,
} from "lucide-react";
import { BRAND_GRADIENT } from "@/lib/constants";
import {
  DEPARTMENTS,
  ROLE_CATEGORIES,
  GOAL_OPTIONS,
  DEPARTMENTS_MAP,
  ROLE_CATEGORIES_MAP,
  generateGuideResult,
  type DepartmentId,
  type RoleCategory,
  type ExperienceLevel,
  type GoalId,
} from "@/lib/ai-guide-data";
import type { IntricAssistant } from "@/lib/intric";
import { saveGuideProfile } from "@/lib/ai-guide-profile";
import Link from "next/link";

const ICONS: Record<string, React.ElementType> = {
  Building2, GraduationCap, Landmark, Heart, Wrench, BookOpen, Palette,
  Crown, FileSearch, ClipboardList, Cpu, Stethoscope, HardHat,
  Pen, FileText, Lightbulb, Scale,
};

function getIcon(name: string) {
  return ICONS[name] || Sparkles;
}

const slideVariants = {
  enter: (dir: number) => ({ x: dir > 0 ? 80 : -80, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir: number) => ({ x: dir > 0 ? -80 : 80, opacity: 0 }),
};

interface QuizProps {
  onComplete: () => void;
  onClose: () => void;
  assistants?: IntricAssistant[];
}

export function GuideQuiz({ onComplete, onClose, assistants = [] }: QuizProps) {
  const [step, setStep] = useState(0);
  const [direction, setDirection] = useState(1);
  const [department, setDepartment] = useState<DepartmentId | null>(null);
  const [role, setRole] = useState<RoleCategory | null>(null);
  const [experience, setExperience] = useState<ExperienceLevel | null>(null);
  const [goals, setGoals] = useState<GoalId[]>([]);
  const [copied, setCopied] = useState<string | null>(null);

  const totalSteps = 5;

  function goNext() {
    setDirection(1);
    setStep((s) => s + 1);
  }

  function goBack() {
    setDirection(-1);
    setStep((s) => s - 1);
  }

  function selectDepartment(id: DepartmentId) {
    setDepartment(id);
    setRole(null);
    setTimeout(goNext, 200);
  }

  function selectRole(id: RoleCategory) {
    setRole(id);
    setTimeout(goNext, 200);
  }

  function selectExperience(level: ExperienceLevel) {
    setExperience(level);
    setTimeout(goNext, 200);
  }

  function toggleGoal(id: GoalId) {
    setGoals((prev) =>
      prev.includes(id) ? prev.filter((g) => g !== id) : [...prev, id]
    );
  }

  function finishQuiz() {
    if (!department || !role || !experience || goals.length === 0) return;
    saveGuideProfile(department, role, experience, goals);
    goNext();
  }

  function copyPrompt(prompt: string, id: string) {
    navigator.clipboard.writeText(prompt);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  }

  const result =
    department && role && experience && goals.length > 0
      ? generateGuideResult(department, role, experience, goals)
      : null;

  const availableRoles = department
    ? ROLE_CATEGORIES.filter((r) =>
        DEPARTMENTS_MAP[department].roleCategories.includes(r.id)
      )
    : [];

  return (
    <div className="fixed inset-0 z-[1002] flex items-center justify-center">
      <div
        className="absolute inset-0 bg-background/90 backdrop-blur-sm"
        onClick={onClose}
      />
      <div
        className="relative mx-4 flex max-h-[90vh] w-full max-w-2xl flex-col overflow-hidden rounded-xl border border-border bg-card shadow-2xl"
        role="dialog"
        aria-modal="true"
        aria-label="Starta din AI-resa"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-border px-6 py-4">
          <div className="flex items-center gap-3">
            {step > 0 && step < totalSteps && (
              <button
                onClick={goBack}
                className="flex h-8 w-8 items-center justify-center rounded-full transition-colors hover:bg-secondary"
                aria-label="Tillbaka"
              >
                <ArrowLeft size={16} />
              </button>
            )}
            <div>
              <p
                className="text-[0.6875rem] font-medium uppercase tracking-[0.15em] text-muted-foreground"
                style={{ fontFamily: "var(--font-geist-mono), monospace" }}
              >
                {step < totalSteps ? `Steg ${step + 1} av ${totalSteps - 1}` : "Klar!"}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-full transition-colors hover:bg-secondary"
            aria-label="Stäng"
          >
            <X size={16} />
          </button>
        </div>

        {/* Progress dots */}
        {step < totalSteps && (
          <div className="flex justify-center gap-2 px-6 pt-4">
            {Array.from({ length: totalSteps - 1 }).map((_, i) => (
              <div
                key={i}
                className="h-1.5 rounded-full transition-all duration-300"
                style={{
                  width: i === step ? 32 : 8,
                  background: i <= step ? BRAND_GRADIENT : "var(--border)",
                }}
              />
            ))}
          </div>
        )}

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-6 py-6">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={step}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.25, ease: "easeInOut" }}
            >
              {/* Step 0: Department */}
              {step === 0 && (
                <div>
                  <h2
                    className="text-[1.5rem] leading-tight tracking-[-0.03em] sm:text-[1.75rem]"
                    style={{ fontFamily: "var(--font-bodoni), serif", fontWeight: 400 }}
                  >
                    Vilken förvaltning jobbar du på?
                  </h2>
                  <p className="mt-2 text-[0.9375rem] text-foreground/85">
                    Vi anpassar din guide baserat på din arbetsplats.
                  </p>
                  <div className="mt-6 grid gap-3 sm:grid-cols-2">
                    {DEPARTMENTS.map((dept) => {
                      const Icon = getIcon(dept.icon);
                      const selected = department === dept.id;
                      return (
                        <button
                          key={dept.id}
                          onClick={() => selectDepartment(dept.id)}
                          className="group relative flex items-start gap-3 rounded-lg text-left transition-all duration-300"
                        >
                          {/* Gradient flash on hover */}
                          <div className="absolute -inset-px rounded-lg overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <div
                              className="absolute inset-0 opacity-0 group-hover:animate-[travel-flash_1.125s_linear_forwards]"
                              style={{ background: "conic-gradient(from 0deg, transparent 0%, transparent 70%, white 85%, white 95%, transparent 100%)" }}
                            />
                            <div className="absolute inset-0 opacity-40" style={{ background: BRAND_GRADIENT }} />
                          </div>
                          <div
                            className="relative flex w-full items-start gap-3 rounded-lg border p-4 transition-all duration-300 group-hover:bg-secondary group-hover:shadow-lg"
                            style={{
                              borderColor: selected ? "var(--foreground)" : "var(--border)",
                              backgroundColor: selected ? "var(--secondary)" : "var(--card)",
                            }}
                          >
                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-secondary">
                              <Icon size={18} />
                            </div>
                            <div className="min-w-0">
                              <p className="text-[0.875rem] font-medium">{dept.shortName}</p>
                              <p className="mt-0.5 text-[0.75rem] leading-snug text-muted-foreground">
                                {dept.description}
                              </p>
                            </div>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Step 1: Role */}
              {step === 1 && (
                <div>
                  <h2
                    className="text-[1.5rem] leading-tight tracking-[-0.03em] sm:text-[1.75rem]"
                    style={{ fontFamily: "var(--font-bodoni), serif", fontWeight: 400 }}
                  >
                    Vad beskriver din roll bäst?
                  </h2>
                  <p className="mt-2 text-[0.9375rem] text-foreground/85">
                    Välj den kategori som ligger närmast.
                  </p>
                  <div className="mt-6 grid gap-3">
                    {availableRoles.map((r) => {
                      const Icon = getIcon(r.icon);
                      const selected = role === r.id;
                      return (
                        <button
                          key={r.id}
                          onClick={() => selectRole(r.id)}
                          className="flex items-center gap-4 rounded-lg border p-4 text-left transition-all duration-150 hover:bg-secondary"
                          style={{
                            borderColor: selected ? "var(--foreground)" : "var(--border)",
                            backgroundColor: selected ? "var(--secondary)" : undefined,
                          }}
                        >
                          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-secondary">
                            <Icon size={18} />
                          </div>
                          <div>
                            <p className="text-[0.875rem] font-medium">{r.title}</p>
                            <p className="text-[0.75rem] text-muted-foreground">{r.description}</p>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Step 2: Experience */}
              {step === 2 && (
                <div>
                  <h2
                    className="text-[1.5rem] leading-tight tracking-[-0.03em] sm:text-[1.75rem]"
                    style={{ fontFamily: "var(--font-bodoni), serif", fontWeight: 400 }}
                  >
                    Hur bekant är du med AI?
                  </h2>
                  <p className="mt-2 text-[0.9375rem] text-foreground/85">
                    Det finns inga rätt eller fel — vi vill bara hitta rätt nivå.
                  </p>
                  <div className="mt-6 grid gap-3">
                    {([
                      { id: "nyborjare" as const, label: "Helt ny", desc: "Jag har inte använt AI-verktyg", emoji: "🌱" },
                      { id: "lite-erfarenhet" as const, label: "Lite erfarenhet", desc: "Jag har provat ChatGPT eller liknande", emoji: "🌿" },
                      { id: "erfaren" as const, label: "Använder regelbundet", desc: "Jag använder AI i mitt arbete", emoji: "🌳" },
                    ]).map((level) => {
                      const selected = experience === level.id;
                      return (
                        <button
                          key={level.id}
                          onClick={() => selectExperience(level.id)}
                          className="flex items-center gap-4 rounded-lg border p-4 text-left transition-all duration-150 hover:bg-secondary"
                          style={{
                            borderColor: selected ? "var(--foreground)" : "var(--border)",
                            backgroundColor: selected ? "var(--secondary)" : undefined,
                          }}
                        >
                          <span className="text-2xl">{level.emoji}</span>
                          <div>
                            <p className="text-[0.875rem] font-medium">{level.label}</p>
                            <p className="text-[0.75rem] text-muted-foreground">{level.desc}</p>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Step 3: Goals */}
              {step === 3 && (
                <div>
                  <h2
                    className="text-[1.5rem] leading-tight tracking-[-0.03em] sm:text-[1.75rem]"
                    style={{ fontFamily: "var(--font-bodoni), serif", fontWeight: 400 }}
                  >
                    Vad vill du ha mest hjälp med?
                  </h2>
                  <p className="mt-2 text-[0.9375rem] text-foreground/85">
                    Välj 1–3 områden som intresserar dig.
                  </p>
                  <div className="mt-6 grid gap-3 sm:grid-cols-2">
                    {GOAL_OPTIONS.map((goal) => {
                      const Icon = getIcon(goal.icon);
                      const selected = goals.includes(goal.id);
                      return (
                        <button
                          key={goal.id}
                          onClick={() => toggleGoal(goal.id)}
                          className="flex items-center gap-3 rounded-lg border p-4 text-left transition-all duration-150 hover:bg-secondary"
                          style={{
                            borderColor: selected ? "var(--foreground)" : "var(--border)",
                            backgroundColor: selected ? "var(--secondary)" : undefined,
                          }}
                        >
                          <div
                            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-colors"
                            style={{
                              backgroundColor: selected ? "var(--foreground)" : "var(--secondary)",
                              color: selected ? "var(--background)" : "var(--foreground)",
                            }}
                          >
                            {selected ? <Check size={14} /> : <Icon size={14} />}
                          </div>
                          <span className="text-[0.875rem] font-medium">{goal.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Step 4: Result */}
              {step === 4 && result && department && role && (
                <div>
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.1, duration: 0.4, ease: "easeOut" }}
                  >
                    <div className="relative rounded-xl p-px" style={{ background: BRAND_GRADIENT }}>
                      <div className="rounded-xl bg-card p-6 text-center">
                        <div
                          className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full"
                          style={{ background: BRAND_GRADIENT }}
                        >
                          <Sparkles size={28} className="text-white" />
                        </div>
                        <h2
                          className="text-[1.5rem] leading-tight tracking-[-0.03em] sm:text-[1.75rem]"
                          style={{ fontFamily: "var(--font-bodoni), serif", fontWeight: 400 }}
                        >
                          Din AI-profil
                        </h2>
                        <p className="mt-2 text-[0.875rem] text-foreground/85">
                          {DEPARTMENTS_MAP[department].shortName} · {ROLE_CATEGORIES_MAP[role].title}
                        </p>
                      </div>
                    </div>
                  </motion.div>

                  {/* Intric info */}
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.25 }}
                    className="mt-6"
                  >
                    <div className="rounded-lg border border-border bg-secondary/50 p-4">
                      <p
                        className="text-[0.6875rem] font-medium uppercase tracking-[0.15em] text-muted-foreground"
                        style={{ fontFamily: "var(--font-geist-mono), monospace" }}
                      >
                        Ditt AI-verktyg
                      </p>
                      <p className="mt-1 text-[0.9375rem] font-medium">
                        Intric — kommunens AI-plattform
                      </p>
                      <p className="mt-1.5 text-[0.8125rem] leading-relaxed text-foreground/85">
                        Intric finns installerat på din arbetsdator. Du kan även nå det via{" "}
                        <a href="https://katrineholm.intric.ai" target="_blank" rel="noopener noreferrer" className="font-medium text-foreground underline underline-offset-4">katrineholm.intric.ai</a>{" "}
                        — logga in med ditt vanliga AD-konto. Där hittar du färdiga assistenter
                        och en personlig chatt.
                      </p>
                    </div>
                  </motion.div>

                  {/* Recommended assistants */}
                  {assistants.length > 0 && (
                    <motion.div
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.4 }}
                      className="mt-6"
                    >
                      <p
                        className="text-[0.6875rem] font-medium uppercase tracking-[0.15em] text-muted-foreground"
                        style={{ fontFamily: "var(--font-geist-mono), monospace" }}
                      >
                        Färdiga assistenter för dig
                      </p>
                      <p className="mt-1 text-[0.8125rem] text-foreground/85">
                        Dessa assistenter är redo att användas direkt — klicka för att öppna.
                      </p>
                      <div className="mt-3 space-y-2">
                        {assistants.slice(0, 5).map((a) => (
                          <a
                            key={a.id}
                            href={`/assistenter/${a.id}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-3 rounded-lg border border-border p-3 transition-all hover:bg-secondary"
                          >
                            <div
                              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md text-[0.8125rem] font-semibold text-white"
                              style={{
                                backgroundColor: `hsl(${a.name.charCodeAt(0) * 7 % 360}, 50%, 45%)`,
                                fontFamily: "var(--font-geist-mono), monospace",
                              }}
                            >
                              {a.name[0]}
                            </div>
                            <div className="min-w-0 flex-1">
                              <p className="truncate text-[0.875rem] font-medium">{a.name}</p>
                              <p className="truncate text-[0.75rem] text-muted-foreground">{a.description}</p>
                            </div>
                            <ArrowRight size={14} className="shrink-0 text-muted-foreground" />
                          </a>
                        ))}
                      </div>
                      <a
                        href="/assistenter"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-3 inline-flex items-center gap-1 text-[0.8125rem] font-medium underline underline-offset-4"
                      >
                        Visa alla {assistants.length} assistenter <ArrowRight size={14} />
                      </a>
                    </motion.div>
                  )}

                  {/* Use cases with prompts */}
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.55 }}
                    className="mt-6"
                  >
                    <p
                      className="text-[0.6875rem] font-medium uppercase tracking-[0.15em] text-muted-foreground"
                      style={{ fontFamily: "var(--font-geist-mono), monospace" }}
                    >
                      Så kan du använda AI
                    </p>
                    <p className="mt-1 text-[0.8125rem] text-foreground/85">
                      Kopiera en prompt och klistra in den i Intrics personliga chatt.
                    </p>
                    <div className="mt-3 space-y-3">
                      {result.useCases.map((uc) => (
                        <div key={uc.id} className="rounded-lg border border-border p-4">
                          <p className="text-[0.875rem] font-medium">{uc.title}</p>
                          <p className="mt-1 text-[0.8125rem] text-foreground/85">{uc.description}</p>
                          {uc.examplePrompt ? (
                            <div className="mt-3">
                              <div
                                className="rounded-md bg-secondary p-3 text-[0.75rem] leading-relaxed"
                                style={{ fontFamily: "var(--font-geist-mono), monospace" }}
                              >
                                {uc.examplePrompt}
                              </div>
                              <button
                                onClick={() => copyPrompt(uc.examplePrompt, uc.id)}
                                className="mt-2 flex items-center gap-1.5 text-[0.75rem] font-medium text-muted-foreground transition-colors hover:text-foreground"
                              >
                                {copied === uc.id ? (
                                  <>
                                    <Check size={12} /> Kopierad!
                                  </>
                                ) : (
                                  <>
                                    <Copy size={12} /> Kopiera prompt
                                  </>
                                )}
                              </button>
                            </div>
                          ) : uc.actionHref && (
                            <a
                              href={uc.actionHref}
                              target={uc.actionHref.startsWith("http") ? "_blank" : undefined}
                              rel={uc.actionHref.startsWith("http") ? "noopener noreferrer" : undefined}
                              className="mt-3 inline-flex items-center gap-1 text-[0.8125rem] font-medium underline underline-offset-4"
                            >
                              {uc.actionLabel} <ArrowRight size={14} />
                            </a>
                          )}
                        </div>
                      ))}
                    </div>
                  </motion.div>

                  {/* Recommended training */}
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.65 }}
                    className="mt-6"
                  >
                    <div className="rounded-lg border border-border p-4">
                      <p
                        className="text-[0.6875rem] font-medium uppercase tracking-[0.15em] text-muted-foreground"
                        style={{ fontFamily: "var(--font-geist-mono), monospace" }}
                      >
                        Rekommenderad utbildning
                      </p>
                      <p className="mt-1 text-[0.9375rem] font-medium">{result.levelDescription}</p>
                      <Link
                        href="/utbildning?flik=akademin"
                        className="mt-2 inline-flex items-center gap-1 text-[0.8125rem] font-medium underline underline-offset-4"
                        onClick={onComplete}
                      >
                        Gå till AI-akademin <ArrowRight size={14} />
                      </Link>
                    </div>
                  </motion.div>

                  {/* Rules */}
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.75 }}
                    className="mt-6"
                  >
                    <p
                      className="text-[0.6875rem] font-medium uppercase tracking-[0.15em] text-muted-foreground"
                      style={{ fontFamily: "var(--font-geist-mono), monospace" }}
                    >
                      Viktigt att veta
                    </p>
                    <div className="mt-3 grid gap-2 sm:grid-cols-2">
                      {result.rules.map((rule, i) => (
                        <div
                          key={i}
                          className="flex items-start gap-2 rounded-lg border p-3"
                          style={{
                            borderColor: rule.type === "do" ? "var(--border)" : "var(--destructive)",
                            backgroundColor: rule.type === "do" ? undefined : "rgba(239,68,68,0.05)",
                          }}
                        >
                          <span className="mt-0.5 text-[0.75rem]">
                            {rule.type === "do" ? "✅" : "⛔"}
                          </span>
                          <p className="text-[0.8125rem] leading-snug">{rule.text}</p>
                        </div>
                      ))}
                    </div>
                  </motion.div>

                  {/* Recommended concepts */}
                  {result.conceptIds.length > 0 && (
                    <motion.div
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.85 }}
                      className="mt-6"
                    >
                      <p
                        className="text-[0.6875rem] font-medium uppercase tracking-[0.15em] text-muted-foreground"
                        style={{ fontFamily: "var(--font-geist-mono), monospace" }}
                      >
                        Begrepp att lära dig
                      </p>
                      <div className="mt-3 flex flex-wrap gap-2">
                        {result.conceptIds.map((id) => {
                          const label = id.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
                          return (
                            <a
                              key={id}
                              href={`/utbildning?flik=begrepp`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="rounded-full border border-border px-3 py-1.5 text-[0.75rem] font-medium transition-all hover:bg-secondary"
                            >
                              {label}
                            </a>
                          );
                        })}
                      </div>
                    </motion.div>
                  )}

                  {/* Next steps */}
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.95 }}
                    className="mt-8"
                  >
                    <p
                      className="text-[0.6875rem] font-medium uppercase tracking-[0.15em] text-muted-foreground"
                      style={{ fontFamily: "var(--font-geist-mono), monospace" }}
                    >
                      Nästa steg
                    </p>
                    <div className="mt-3 flex flex-wrap gap-3">
                      <Link
                        href="/utbildning?flik=akademin"
                        onClick={onComplete}
                        className="rounded-full bg-primary px-5 py-2.5 text-[0.8125rem] font-medium uppercase tracking-[0.01em] text-primary-foreground transition-all duration-150 active:scale-[0.98]"
                        style={{
                          fontFamily: "var(--font-geist-mono), monospace",
                          boxShadow: "0px 2px 1px 0px rgba(255,255,255,0.15) inset, 0px -2px 1px 0px rgba(0,0,0,0.05) inset",
                        }}
                      >
                        Börja utbildning
                      </Link>
                      <a
                        href="/assistenter"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="rounded-full border border-border px-5 py-2.5 text-[0.8125rem] font-medium uppercase tracking-[0.01em] transition-all hover:bg-secondary"
                        style={{ fontFamily: "var(--font-geist-mono), monospace" }}
                      >
                        Utforska assistenter
                      </a>
                      <a
                        href="/utbildning?flik=begrepp"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="rounded-full border border-border px-5 py-2.5 text-[0.8125rem] font-medium uppercase tracking-[0.01em] transition-all hover:bg-secondary"
                        style={{ fontFamily: "var(--font-geist-mono), monospace" }}
                      >
                        Kunskapsbanken
                      </a>
                    </div>
                  </motion.div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Footer */}
        {step === 3 && (
          <div className="border-t border-border px-6 py-4">
            <button
              onClick={finishQuiz}
              disabled={goals.length === 0}
              className="w-full rounded-full bg-primary px-6 py-3 text-[0.8125rem] font-medium uppercase tracking-[0.01em] text-primary-foreground transition-all duration-150 active:scale-[0.98] disabled:opacity-40"
              style={{
                fontFamily: "var(--font-geist-mono), monospace",
                boxShadow: goals.length > 0
                  ? "0px 2px 1px 0px rgba(255,255,255,0.15) inset, 0px -2px 1px 0px rgba(0,0,0,0.05) inset"
                  : "none",
              }}
            >
              Visa min AI-profil
            </button>
          </div>
        )}

        {step === 4 && (
          <div className="border-t border-border px-6 py-4">
            <button
              onClick={() => {
                onComplete();
              }}
              className="w-full rounded-full bg-primary px-6 py-3 text-[0.8125rem] font-medium uppercase tracking-[0.01em] text-primary-foreground transition-all duration-150 active:scale-[0.98]"
              style={{
                fontFamily: "var(--font-geist-mono), monospace",
                boxShadow:
                  "0px 2px 1px 0px rgba(255,255,255,0.15) inset, 0px -2px 1px 0px rgba(0,0,0,0.05) inset",
              }}
            >
              Klar
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
