"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import {
  ArrowLeft,
  ChevronRight,
  ChevronLeft,
  Check,
  Lightbulb,
  AlertTriangle,
  Download,
  List,
} from "lucide-react";
import { BRAND_GRADIENT } from "@/lib/constants";
import { GuidePdf } from "./guide-pdf";
import {
  getGuideProgress,
  toggleStepComplete,
  type Guide,
} from "@/lib/guides-data";

// ---------------------------------------------------------------------------
// View mode tabs
// ---------------------------------------------------------------------------

type ViewMode = "steps" | "pdf";

const VIEW_MODES: { key: ViewMode; label: string; icon: React.ReactNode }[] = [
  { key: "steps", label: "Steg-för-steg", icon: <List size={14} /> },
  { key: "pdf", label: "Ladda ner / Skriv ut", icon: <Download size={14} /> },
];

// ---------------------------------------------------------------------------
// Step guide component
// ---------------------------------------------------------------------------

interface StepGuideProps {
  guide: Guide;
  onBack: () => void;
}

export function StepGuide({ guide, onBack }: StepGuideProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<string[]>(() =>
    getGuideProgress(guide.id)
  );
  const [viewMode, setViewMode] = useState<ViewMode>("steps");

  const step = guide.steps[currentStep];
  const total = guide.steps.length;
  const progress = completedSteps.length / total;

  const handleToggleComplete = useCallback(() => {
    if (!step) return;
    const next = toggleStepComplete(guide.id, step.id);
    setCompletedSteps(next);
  }, [guide.id, step]);

  const goNext = useCallback(() => {
    if (currentStep < total - 1) setCurrentStep((s) => s + 1);
  }, [currentStep, total]);

  const goPrev = useCallback(() => {
    if (currentStep > 0) setCurrentStep((s) => s - 1);
  }, [currentStep]);

  return (
    <div className="print:bg-white">
      {/* Header */}
      <div className="mb-6 flex items-center gap-3 print:hidden">
        <button
          onClick={onBack}
          className="flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-card transition-colors hover:bg-secondary"
          aria-label="Tillbaka"
        >
          <ArrowLeft size={16} />
        </button>
        <div className="flex-1">
          <h2
            className="text-[1.25rem] leading-[1.2] tracking-[-0.02em] sm:text-[1.5rem]"
            style={{ fontFamily: "var(--font-bodoni), serif", fontWeight: 400 }}
          >
            {guide.title}
          </h2>
          <p className="mt-1 text-[0.8125rem] text-muted-foreground">
            {guide.description}
          </p>
        </div>
      </div>

      {/* Overall progress bar */}
      <div className="mb-6 print:hidden">
        <div className="flex items-center justify-between text-[0.75rem] text-muted-foreground">
          <span>{completedSteps.length} av {total} steg klara</span>
          <span>{Math.round(progress * 100)}%</span>
        </div>
        <div className="mt-1.5 h-2 w-full overflow-hidden rounded-full bg-secondary">
          <motion.div
            className="h-full rounded-full"
            style={{ background: BRAND_GRADIENT }}
            animate={{ width: `${progress * 100}%` }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          />
        </div>
      </div>

      {/* View mode tabs */}
      <div className="mb-6 flex gap-1 rounded-lg border border-border bg-card p-1 print:hidden">
        {VIEW_MODES.map((vm) => (
          <button
            key={vm.key}
            onClick={() => setViewMode(vm.key)}
            className={`flex flex-1 items-center justify-center gap-1.5 rounded-md px-3 py-2 text-[0.8125rem] font-medium transition-colors ${
              viewMode === vm.key
                ? "bg-foreground text-background"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {vm.icon}
            <span className="hidden sm:inline">{vm.label}</span>
          </button>
        ))}
      </div>

      {/* Content based on view mode */}
      <AnimatePresence mode="wait">
        {viewMode === "steps" && (
          <motion.div
            key="steps"
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 12 }}
            transition={{ duration: 0.2 }}
          >
            <StepsView
              guide={guide}
              currentStep={currentStep}
              completedSteps={completedSteps}
              onStepSelect={setCurrentStep}
              onToggleComplete={handleToggleComplete}
              onNext={goNext}
              onPrev={goPrev}
            />
          </motion.div>
        )}

        {viewMode === "pdf" && (
          <motion.div
            key="pdf"
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 12 }}
            transition={{ duration: 0.2 }}
          >
            <GuidePdf guide={guide} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Screenshot component with caption
// ---------------------------------------------------------------------------

function StepScreenshot({
  src,
  alt,
  caption,
  censorZones,
}: {
  src: string;
  alt: string;
  caption?: string;
  censorZones?: { x: number; y: number; width: number; height: number }[];
}) {
  return (
    <figure>
      <div className="relative overflow-hidden rounded-xl border border-border bg-secondary/30">
        <Image
          src={src}
          alt={alt}
          width={800}
          height={500}
          className="w-full h-auto"
          sizes="(max-width: 768px) 100vw, 700px"
        />
        {censorZones?.map((zone, i) => (
          <div
            key={i}
            className="absolute"
            style={{
              left: `${zone.x}%`,
              top: `${zone.y}%`,
              width: `${zone.width}%`,
              height: `${zone.height}%`,
              backdropFilter: "blur(12px)",
              WebkitBackdropFilter: "blur(12px)",
            }}
          />
        ))}
      </div>
      {caption && (
        <figcaption className="mt-2 text-center text-[0.75rem] leading-[1.5] text-muted-foreground">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}

// ---------------------------------------------------------------------------
// Steps view
// ---------------------------------------------------------------------------

function StepsView({
  guide,
  currentStep,
  completedSteps,
  onStepSelect,
  onToggleComplete,
  onNext,
  onPrev,
}: {
  guide: Guide;
  currentStep: number;
  completedSteps: string[];
  onStepSelect: (i: number) => void;
  onToggleComplete: () => void;
  onNext: () => void;
  onPrev: () => void;
}) {
  const step = guide.steps[currentStep];
  const total = guide.steps.length;
  const isCompleted = step ? completedSteps.includes(step.id) : false;

  return (
    <div className="grid gap-6 lg:grid-cols-[240px_1fr]">
      {/* Step navigation sidebar */}
      <div className="order-2 lg:order-1">
        <div className="rounded-2xl border border-border bg-card p-4">
          <p
            className="mb-3 text-[0.6875rem] font-medium uppercase tracking-[0.12em] text-muted-foreground"
            style={{ fontFamily: "var(--font-geist-mono), monospace" }}
          >
            Steg
          </p>
          <div className="space-y-1">
            {guide.steps.map((s, i) => {
              const done = completedSteps.includes(s.id);
              const isCurrent = i === currentStep;
              return (
                <button
                  key={s.id}
                  onClick={() => onStepSelect(i)}
                  className={`flex w-full items-center gap-2.5 rounded-lg px-3 py-2.5 text-left text-[0.8125rem] transition-colors ${
                    isCurrent
                      ? "bg-foreground text-background"
                      : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                  }`}
                >
                  <span
                    className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[0.625rem] font-medium ${
                      done
                        ? isCurrent
                          ? "bg-background/20 text-background"
                          : "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400"
                        : isCurrent
                        ? "bg-background/20 text-background"
                        : "bg-secondary text-muted-foreground"
                    }`}
                  >
                    {done ? <Check size={10} /> : i + 1}
                  </span>
                  <span className="truncate">{s.title}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Step content */}
      <div className="order-1 lg:order-2">
        <AnimatePresence mode="wait">
          {step && (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="rounded-2xl border border-border bg-card p-6 md:p-8"
            >
              {/* Step header */}
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p
                    className="text-[0.6875rem] font-medium uppercase tracking-[0.12em] text-muted-foreground"
                    style={{ fontFamily: "var(--font-geist-mono), monospace" }}
                  >
                    Steg {currentStep + 1} av {total}
                  </p>
                  <h3
                    className="mt-2 text-[1.25rem] leading-[1.2] tracking-[-0.02em] md:text-[1.5rem]"
                    style={{ fontFamily: "var(--font-bodoni), serif", fontWeight: 400 }}
                  >
                    {step.title}
                  </h3>
                  <p className="mt-2 text-[0.9375rem] leading-[1.6] text-muted-foreground">
                    {step.description}
                  </p>
                </div>

                {/* Complete checkbox */}
                <button
                  onClick={onToggleComplete}
                  className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border-2 transition-colors ${
                    isCompleted
                      ? "border-emerald-500 bg-emerald-500 text-white"
                      : "border-border hover:border-foreground/30"
                  }`}
                  aria-label={isCompleted ? "Markera som ej klar" : "Markera som klar"}
                >
                  {isCompleted && <Check size={14} />}
                </button>
              </div>

              {/* Screenshots */}
              {step.images && step.images.length > 0 && (
                <div className="mt-6 space-y-4">
                  {step.images.map((img, i) => (
                    <StepScreenshot
                      key={i}
                      src={img.src}
                      alt={img.alt}
                      caption={img.caption}
                      censorZones={img.censorZones}
                    />
                  ))}
                </div>
              )}

              {/* Instructions */}
              <div className="mt-6 space-y-3">
                {step.instructions.map((instruction, i) => (
                  <div key={i} className="flex gap-3">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-secondary text-[0.625rem] font-medium text-muted-foreground">
                      {i + 1}
                    </span>
                    <p className="text-[0.9375rem] leading-[1.7] text-foreground/90">
                      {instruction}
                    </p>
                  </div>
                ))}
              </div>

              {/* Examples */}
              {step.examples && step.examples.length > 0 && (
                <div className="mt-6">
                  <p className="mb-3 text-[0.8125rem] font-medium text-foreground">
                    Exempel
                  </p>
                  <div className="space-y-2.5">
                    {step.examples.map((example, i) => (
                      <div
                        key={i}
                        className="rounded-xl border border-border bg-secondary/40 p-4"
                      >
                        <p className="text-[0.75rem] font-medium uppercase tracking-wide text-muted-foreground">
                          {example.task}
                        </p>
                        <p className="mt-1.5 text-[0.875rem] leading-[1.6] text-foreground/90 italic">
                          &ldquo;{example.prompt}&rdquo;
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Tip box */}
              {step.tip && (
                <div className="mt-6 flex gap-3 rounded-xl bg-amber-50 p-4 dark:bg-amber-950/20">
                  <Lightbulb size={16} className="mt-0.5 shrink-0 text-amber-600 dark:text-amber-400" />
                  <p className="text-[0.8125rem] leading-[1.6] text-amber-900 dark:text-amber-200">
                    <span className="font-medium">Tips: </span>
                    {step.tip}
                  </p>
                </div>
              )}

              {/* Warning box */}
              {step.warning && (
                <div className="mt-4 flex gap-3 rounded-xl bg-red-50 p-4 dark:bg-red-950/20">
                  <AlertTriangle size={16} className="mt-0.5 shrink-0 text-red-600 dark:text-red-400" />
                  <p className="text-[0.8125rem] leading-[1.6] text-red-900 dark:text-red-200">
                    <span className="font-medium">Viktigt: </span>
                    {step.warning}
                  </p>
                </div>
              )}

              {/* Navigation */}
              <div className="mt-8 flex items-center justify-between border-t border-border pt-4">
                <button
                  onClick={onPrev}
                  disabled={currentStep === 0}
                  className="flex items-center gap-1.5 rounded-lg px-4 py-2 text-[0.8125rem] font-medium text-muted-foreground transition-colors hover:text-foreground disabled:opacity-30 disabled:hover:text-muted-foreground"
                >
                  <ChevronLeft size={14} />
                  Föregående
                </button>

                {currentStep < total - 1 ? (
                  <button
                    onClick={onNext}
                    className="flex items-center gap-1.5 rounded-lg bg-foreground px-4 py-2 text-[0.8125rem] font-medium text-background transition-opacity hover:opacity-90"
                  >
                    Nästa
                    <ChevronRight size={14} />
                  </button>
                ) : (
                  <span className="flex items-center gap-1.5 text-[0.8125rem] font-medium text-emerald-600 dark:text-emerald-400">
                    <Check size={14} />
                    Alla steg visade
                  </span>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
