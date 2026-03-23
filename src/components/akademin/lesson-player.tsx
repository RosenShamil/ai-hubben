"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSwipeNavigation } from "@/hooks/use-swipe-navigation";
import {
  X,
  ChevronRight,
  ChevronLeft,
  Lightbulb,
  Building2,
  CheckCircle,
  XCircle,
  Sparkles,
  Check,
} from "lucide-react";
import * as LucideIcons from "lucide-react";
import { BRAND_GRADIENT } from "@/lib/constants";
import {
  getLessonById,
  getModuleById,
  getLessonsByModule,
} from "@/lib/education-data";
import { completeLesson, isLessonCompleted } from "@/lib/education-progress";
import { XP_REWARDS } from "@/lib/education-system";
import type { InteractiveElement, LessonSection, MunicipalExample } from "@/lib/education-system";
import { showXPToast } from "./xp-toast";

function getIcon(name: string) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const Icon = (LucideIcons as any)[name] as React.ComponentType<{
    size?: number;
    className?: string;
  }> | undefined;
  return Icon || Sparkles;
}

// ---------------------------------------------------------------------------
// Sub-components for each section type
// ---------------------------------------------------------------------------

function HookSection({ text, funFact }: { text: string; funFact?: string }) {
  return (
    <div className="space-y-6">
      <div className="relative overflow-hidden rounded-2xl border border-border bg-card p-6 md:p-8">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.04]"
          style={{ background: BRAND_GRADIENT }}
        />
        <p className="relative text-[1.0625rem] leading-[1.7] md:text-[1.125rem]">
          {text}
        </p>
      </div>
      {funFact && (
        <div className="flex gap-3 rounded-xl bg-secondary/60 p-4">
          <Lightbulb size={18} className="mt-0.5 shrink-0 text-amber-500" />
          <p className="text-[0.875rem] leading-[1.6] text-muted-foreground">
            <span className="font-medium text-foreground">Visste du att...</span>{" "}
            {funFact}
          </p>
        </div>
      )}
    </div>
  );
}

function ContentSection({ section }: { section: LessonSection }) {
  const Icon = section.icon ? getIcon(section.icon) : null;

  return (
    <div className="space-y-4">
      {section.heading && (
        <div className="flex items-center gap-3">
          {Icon && (
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-secondary">
              <Icon size={18} className="text-foreground" />
            </div>
          )}
          <h3
            className="text-[1.125rem] leading-[1.3] tracking-[-0.02em] md:text-[1.25rem]"
            style={{ fontFamily: "var(--font-heading), serif", fontWeight: 400 }}
          >
            {section.heading}
          </h3>
        </div>
      )}
      <div className="text-[0.9375rem] leading-[1.8] text-foreground/90 whitespace-pre-line">
        {section.text.split("\n").map((line, i) => {
          // Bold markdown-style
          const parts = line.split(/(\*\*[^*]+\*\*)/g);
          return (
            <p key={i} className={line.startsWith("•") || line.startsWith("✅") ? "ml-1" : i > 0 ? "mt-3" : ""}>
              {parts.map((part, j) =>
                part.startsWith("**") && part.endsWith("**") ? (
                  <strong key={j} className="font-semibold text-foreground">
                    {part.slice(2, -2)}
                  </strong>
                ) : (
                  <span key={j}>{part}</span>
                )
              )}
            </p>
          );
        })}
      </div>
      {section.analogy && (
        <div className="rounded-xl border border-border bg-secondary/40 p-4">
          <p className="text-[0.8125rem] font-medium text-foreground">
            💡 Tänk dig att...
          </p>
          <p className="mt-1 text-[0.875rem] leading-[1.7] text-muted-foreground">
            {section.analogy}
          </p>
        </div>
      )}
    </div>
  );
}

function MunicipalExampleSection({ example }: { example: MunicipalExample }) {
  const Icon = example.icon ? getIcon(example.icon) : Building2;

  return (
    <div className="rounded-xl border border-border bg-card p-5">
      <div className="flex items-center gap-3">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-secondary">
          <Icon size={18} className="text-foreground" />
        </div>
        <div>
          <p className="text-[0.8125rem] font-medium">{example.title}</p>
          {example.department && (
            <p className="text-[0.6875rem] text-muted-foreground">
              {example.department}
            </p>
          )}
        </div>
      </div>
      <div className="mt-3 text-[0.875rem] leading-[1.7] text-muted-foreground whitespace-pre-line">
        {example.description.split("\n").map((line, i) => {
          const parts = line.split(/(\*\*[^*]+\*\*)/g);
          return (
            <p key={i} className={i > 0 ? "mt-1.5" : ""}>
              {parts.map((part, j) =>
                part.startsWith("**") && part.endsWith("**") ? (
                  <strong key={j} className="font-medium text-foreground">
                    {part.slice(2, -2)}
                  </strong>
                ) : (
                  <span key={j}>{part}</span>
                )
              )}
            </p>
          );
        })}
      </div>
    </div>
  );
}

function InteractiveSection({ element }: { element: InteractiveElement }) {
  const [answered, setAnswered] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number | string | null>(null);
  const [isCorrect, setIsCorrect] = useState(false);

  if (element.type === "true-false") {
    const { statement, isTrue, explanation } = element.data;

    const handleAnswer = (answer: boolean) => {
      setSelectedAnswer(answer ? 1 : 0);
      setIsCorrect(answer === isTrue);
      setAnswered(true);
    };

    return (
      <div className="rounded-xl border border-border bg-card p-5">
        <p className="text-[0.8125rem] font-medium uppercase tracking-wide text-muted-foreground">
          Sant eller falskt?
        </p>
        <p className="mt-2 text-[0.9375rem] font-medium leading-[1.5]">{statement}</p>

        {!answered ? (
          <div className="mt-4 flex gap-3">
            <button
              onClick={() => handleAnswer(true)}
              className="flex-1 rounded-lg border border-border px-4 py-2.5 text-[0.875rem] font-medium transition-all hover:bg-secondary"
            >
              Sant
            </button>
            <button
              onClick={() => handleAnswer(false)}
              className="flex-1 rounded-lg border border-border px-4 py-2.5 text-[0.875rem] font-medium transition-all hover:bg-secondary"
            >
              Falskt
            </button>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`mt-4 rounded-lg p-4 ${
              isCorrect ? "bg-emerald-500/10" : "bg-red-500/10"
            }`}
          >
            <div className="flex items-center gap-2">
              {isCorrect ? (
                <CheckCircle size={18} className="text-emerald-500" />
              ) : (
                <XCircle size={18} className="text-red-500" />
              )}
              <p className={`text-[0.875rem] font-medium ${isCorrect ? "text-emerald-500" : "text-red-500"}`}>
                {isCorrect ? "Rätt!" : "Inte riktigt!"}
              </p>
            </div>
            <p className="mt-2 text-[0.8125rem] leading-[1.6] text-muted-foreground">
              {explanation}
            </p>
          </motion.div>
        )}
      </div>
    );
  }

  if (element.type === "multi-choice") {
    const { question, options, correctIndex, explanation } = element.data;

    const handleAnswer = (idx: number) => {
      setSelectedAnswer(idx);
      setIsCorrect(idx === correctIndex);
      setAnswered(true);
    };

    return (
      <div className="rounded-xl border border-border bg-card p-5">
        <p className="text-[0.8125rem] font-medium uppercase tracking-wide text-muted-foreground">
          Kunskapskontroll
        </p>
        <p className="mt-2 text-[0.9375rem] font-medium leading-[1.5]">{question}</p>

        <div className="mt-4 space-y-2">
          {options.map((opt, idx) => {
            const isSelected = selectedAnswer === idx;
            const showCorrect = answered && idx === correctIndex;
            const showWrong = answered && isSelected && idx !== correctIndex;

            return (
              <button
                key={idx}
                onClick={() => !answered && handleAnswer(idx)}
                disabled={answered}
                className={`flex w-full items-center gap-3 rounded-lg border px-4 py-3 text-left text-[0.875rem] transition-all ${
                  showCorrect
                    ? "border-emerald-500/40 bg-emerald-500/10"
                    : showWrong
                      ? "border-red-500/40 bg-red-500/10"
                      : answered
                        ? "border-border/50 opacity-50"
                        : "border-border hover:bg-secondary"
                }`}
              >
                <span
                  className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[0.6875rem] font-bold ${
                    showCorrect
                      ? "bg-emerald-500/20 text-emerald-500"
                      : showWrong
                        ? "bg-red-500/20 text-red-500"
                        : "bg-secondary text-muted-foreground"
                  }`}
                >
                  {showCorrect ? <Check size={12} /> : showWrong ? <X size={12} /> : String.fromCharCode(65 + idx)}
                </span>
                <span>{opt}</span>
              </button>
            );
          })}
        </div>

        {answered && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`mt-4 rounded-lg p-4 ${isCorrect ? "bg-emerald-500/10" : "bg-red-500/10"}`}
          >
            <p className="text-[0.8125rem] leading-[1.6] text-muted-foreground">
              {explanation}
            </p>
          </motion.div>
        )}
      </div>
    );
  }

  if (element.type === "fill-blank") {
    const { sentence, correctAnswer, distractors } = element.data;
    const allOptions = [correctAnswer, ...distractors].sort(() => Math.random() - 0.5);

    const handleAnswer = (answer: string) => {
      setSelectedAnswer(answer);
      setIsCorrect(answer === correctAnswer);
      setAnswered(true);
    };

    return (
      <div className="rounded-xl border border-border bg-card p-5">
        <p className="text-[0.8125rem] font-medium uppercase tracking-wide text-muted-foreground">
          Fyll i luckan
        </p>
        <p className="mt-2 text-[0.9375rem] font-medium leading-[1.5]">
          {sentence.replace("___", answered ? String(selectedAnswer) : "______")}
        </p>

        {!answered ? (
          <div className="mt-4 flex flex-wrap gap-2">
            {allOptions.map((opt) => (
              <button
                key={opt}
                onClick={() => handleAnswer(opt)}
                className="rounded-full border border-border px-4 py-2 text-[0.875rem] font-medium transition-all hover:bg-secondary"
              >
                {opt}
              </button>
            ))}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`mt-4 rounded-lg p-4 ${isCorrect ? "bg-emerald-500/10" : "bg-red-500/10"}`}
          >
            <div className="flex items-center gap-2">
              {isCorrect ? (
                <CheckCircle size={18} className="text-emerald-500" />
              ) : (
                <XCircle size={18} className="text-red-500" />
              )}
              <p className={`text-[0.875rem] font-medium ${isCorrect ? "text-emerald-500" : "text-red-500"}`}>
                {isCorrect ? "Rätt!" : `Inte riktigt — rätt svar är "${correctAnswer}"`}
              </p>
            </div>
          </motion.div>
        )}
      </div>
    );
  }

  if (element.type === "match") {
    const items = element.data;
    const [matched, setMatched] = useState<Record<string, string>>({});
    const [selectedTerm, setSelectedTerm] = useState<string | null>(null);
    const allMatched = Object.keys(matched).length === items.length;

    const handleDefClick = (def: string) => {
      if (!selectedTerm) return;
      const correct = items.find((i) => i.term === selectedTerm)?.definition === def;
      if (correct) {
        setMatched((prev) => ({ ...prev, [selectedTerm]: def }));
      }
      setSelectedTerm(null);
    };

    return (
      <div className="rounded-xl border border-border bg-card p-5">
        <p className="text-[0.8125rem] font-medium uppercase tracking-wide text-muted-foreground">
          Para ihop
        </p>
        <p className="mt-1 text-[0.8125rem] text-muted-foreground">
          Klicka på ett begrepp, sedan dess rätta beskrivning.
        </p>

        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          <div className="space-y-2">
            <p className="text-[0.75rem] font-medium text-muted-foreground">Begrepp</p>
            {items.map((item) => {
              const isMatched = item.term in matched;
              const isActive = selectedTerm === item.term;
              return (
                <button
                  key={item.term}
                  onClick={() => !isMatched && setSelectedTerm(item.term)}
                  disabled={isMatched}
                  className={`w-full rounded-lg border px-3 py-2 text-left text-[0.8125rem] transition-all ${
                    isMatched
                      ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-600"
                      : isActive
                        ? "border-foreground bg-secondary font-medium"
                        : "border-border hover:bg-secondary"
                  }`}
                >
                  {isMatched && <Check size={12} className="mr-1.5 inline text-emerald-500" />}
                  {item.term}
                </button>
              );
            })}
          </div>
          <div className="space-y-2">
            <p className="text-[0.75rem] font-medium text-muted-foreground">Beskrivning</p>
            {items
              .slice()
              .sort(() => 0.5 - Math.random())
              .map((item) => {
                const isMatched = Object.values(matched).includes(item.definition);
                return (
                  <button
                    key={item.definition}
                    onClick={() => handleDefClick(item.definition)}
                    disabled={isMatched || !selectedTerm}
                    className={`w-full rounded-lg border px-3 py-2 text-left text-[0.8125rem] transition-all ${
                      isMatched
                        ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-600"
                        : selectedTerm
                          ? "border-border hover:bg-secondary cursor-pointer"
                          : "border-border/50 opacity-60"
                    }`}
                  >
                    {item.definition}
                  </button>
                );
              })}
          </div>
        </div>

        {allMatched && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-4 flex items-center gap-2 rounded-lg bg-emerald-500/10 p-3"
          >
            <CheckCircle size={16} className="text-emerald-500" />
            <p className="text-[0.875rem] font-medium text-emerald-500">
              Alla rätt!
            </p>
          </motion.div>
        )}
      </div>
    );
  }

  return null;
}

function SummarySection({ items }: { items: string[] }) {
  return (
    <div className="rounded-xl border border-border bg-card p-5">
      <p className="text-[0.8125rem] font-medium uppercase tracking-wide text-muted-foreground">
        Sammanfattning
      </p>
      <div className="mt-3 space-y-2">
        {items.map((item, i) => (
          <motion.div
            key={i}
            className="flex gap-3"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.15 }}
          >
            <div className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-secondary">
              <Check size={10} className="text-foreground" />
            </div>
            <p className="text-[0.875rem] leading-[1.6]">{item}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Lesson player — builds a step-by-step flow from lesson content
// ---------------------------------------------------------------------------

interface Step {
  key: string;
  type: "hook" | "content" | "example" | "interactive" | "summary";
  data: unknown;
}

function buildSteps(lesson: ReturnType<typeof getLessonById>): Step[] {
  if (!lesson) return [];
  const steps: Step[] = [];
  const c = lesson.content;

  // Hook
  steps.push({ key: "hook", type: "hook", data: { text: c.hook, funFact: c.funFact } });

  // Content sections
  c.sections.forEach((s, i) => {
    steps.push({ key: `content-${i}`, type: "content", data: s });
  });

  // Municipal example
  if (c.municipalExample) {
    steps.push({ key: "example", type: "example", data: c.municipalExample });
  }

  // Interactive
  if (c.interactiveElement) {
    steps.push({ key: "interactive", type: "interactive", data: c.interactiveElement });
  }

  // Summary
  steps.push({ key: "summary", type: "summary", data: c.summary });

  return steps;
}

export function LessonPlayer({
  lessonId,
  onClose,
  onNext,
}: {
  lessonId: string;
  onClose: () => void;
  onNext: (nextLessonId: string) => void;
}) {
  const [currentStep, setCurrentStep] = useState(0);
  const lesson = getLessonById(lessonId);
  const mod = lesson ? getModuleById(lesson.moduleId) : null;

  const steps = lesson ? buildSteps(lesson) : [];
  const totalSteps = steps.length;
  const isLastStep = currentStep === totalSteps - 1;

  const handleBack = useCallback(() => {
    if (currentStep > 0) setCurrentStep((s) => s - 1);
  }, [currentStep]);

  const handleNext = useCallback(() => {
    if (isLastStep) {
      // Complete lesson
      if (lesson && !isLessonCompleted(lesson.id)) {
        completeLesson(lesson.id, lesson.conceptIds);
        showXPToast(XP_REWARDS["lesson-complete"], "Lektion klar!");
      }
      // Find next lesson in module
      if (mod) {
        const moduleLessons = getLessonsByModule(mod.id);
        const currentIdx = moduleLessons.findIndex((l) => l.id === lessonId);
        if (currentIdx < moduleLessons.length - 1) {
          onNext(moduleLessons[currentIdx + 1].id);
          setCurrentStep(0);
          return;
        }
      }
      onClose();
    } else {
      setCurrentStep((s) => s + 1);
    }
  }, [isLastStep, lesson, mod, lessonId, onNext, onClose]);

  const { dragProps } = useSwipeNavigation({
    onSwipeLeft: handleNext,
    onSwipeRight: handleBack,
  });

  if (!lesson || !mod) return null;

  const step = steps[currentStep];

  return (
    <motion.div
      className="fixed inset-0 z-50 flex flex-col bg-background"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Top bar */}
      <div className="flex items-center gap-4 border-b border-border px-4 py-3">
        <button
          onClick={onClose}
          className="flex h-8 w-8 items-center justify-center rounded-full hover:bg-secondary"
        >
          <X size={18} />
        </button>

        {/* Progress bar */}
        <div className="flex-1">
          <div className="h-2 overflow-hidden rounded-full bg-secondary">
            <motion.div
              className="h-full rounded-full"
              style={{ background: BRAND_GRADIENT }}
              animate={{ width: `${((currentStep + 1) / totalSteps) * 100}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>

        <span className="text-[0.75rem] tabular-nums text-muted-foreground">
          {currentStep + 1}/{totalSteps}
        </span>
      </div>

      {/* Content area — swipe left/right to navigate */}
      <div className="flex-1 overflow-y-auto">
        <div className="mx-auto max-w-[42rem] px-6 py-8">
          {/* Lesson title (only on first step) */}
          {currentStep === 0 && (
            <div className="mb-6">
              <p
                className="text-[0.6875rem] font-medium uppercase tracking-[0.15em] text-muted-foreground"
                style={{ fontFamily: "var(--font-geist-mono), monospace" }}
              >
                {mod.title}
              </p>
              <h2
                className="mt-1 text-[1.25rem] leading-[1.3] tracking-[-0.02em] sm:text-[1.5rem]"
                style={{ fontFamily: "var(--font-bodoni), serif", fontWeight: 400 }}
              >
                {lesson.title}
              </h2>
            </div>
          )}

          {/* Step content with animation + swipe */}
          <AnimatePresence mode="wait">
            <motion.div
              key={step.key}
              {...dragProps}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.25 }}
              style={{ touchAction: "pan-y" }}
            >
              {step.type === "hook" && (
                <HookSection {...(step.data as { text: string; funFact?: string })} />
              )}
              {step.type === "content" && (
                <ContentSection section={step.data as LessonSection} />
              )}
              {step.type === "example" && (
                <MunicipalExampleSection example={step.data as MunicipalExample} />
              )}
              {step.type === "interactive" && (
                <InteractiveSection element={step.data as InteractiveElement} />
              )}
              {step.type === "summary" && (
                <SummarySection items={step.data as string[]} />
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Bottom navigation */}
      <div className="border-t border-border px-4 py-4">
        <div className="mx-auto flex max-w-[42rem] items-center justify-between">
          <button
            onClick={handleBack}
            disabled={currentStep === 0}
            className="flex items-center gap-1 rounded-lg px-4 py-2.5 text-[0.875rem] font-medium text-muted-foreground transition-colors hover:text-foreground disabled:opacity-30"
          >
            <ChevronLeft size={16} />
            Tillbaka
          </button>

          <button
            onClick={handleNext}
            className="flex items-center gap-1 rounded-lg px-6 py-2.5 text-[0.875rem] font-medium text-background transition-all hover:opacity-90"
            style={{ background: BRAND_GRADIENT }}
          >
            {isLastStep ? "Slutför lektion" : "Nästa"}
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </motion.div>
  );
}
