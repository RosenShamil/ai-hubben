"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, X, RotateCcw, ArrowRight } from "lucide-react";
import { BRAND_GRADIENT } from "@/lib/constants";
import type { QuizQuestion } from "@/lib/knowledge-bank";
import { saveQuizScore } from "@/lib/knowledge-progress";

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function getScoreMessage(pct: number): string {
  if (pct >= 90) return "Fantastiskt! Du är en riktig AI-kännare!";
  if (pct >= 70) return "Imponerande! Du har en stark förståelse.";
  if (pct >= 40) return "På god väg! Du bygger starka grundkunskaper.";
  return "Bra start! Utforska fler begrepp och prova igen.";
}

export function QuizPlayer({
  questions,
  quizKey,
  onClose,
}: {
  questions: QuizQuestion[];
  quizKey: string;
  onClose: () => void;
}) {
  const shuffled = useMemo(() => shuffle(questions).slice(0, 10), [questions]);
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const q = shuffled[current];
  const total = shuffled.length;
  const isCorrect = selected === q?.correctIndex;

  function handleSelect(index: number) {
    if (selected !== null) return;
    setSelected(index);
    if (index === q.correctIndex) setScore((s) => s + 1);
  }

  function handleNext() {
    if (current < total - 1) {
      setCurrent((c) => c + 1);
      setSelected(null);
    } else {
      const finalScore = score + (selected === q.correctIndex ? 0 : 0); // already counted
      const pct = Math.round((score / total) * 100);
      saveQuizScore(quizKey, pct);
      setFinished(true);
    }
  }

  function handleRetry() {
    setCurrent(0);
    setSelected(null);
    setScore(0);
    setFinished(false);
  }

  if (finished) {
    const pct = Math.round((score / total) * 100);
    return (
      <div className="rounded-lg border border-border bg-card p-8 text-center">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-secondary">
          <span className="text-[1.75rem] font-bold">{pct}%</span>
        </div>
        <p
          className="mt-4 text-[1.25rem] leading-[1.3] tracking-[-0.02em]"
          style={{ fontFamily: "var(--font-heading), serif", fontWeight: 400 }}
        >
          {score} av {total} rätt
        </p>
        <p className="mt-2 text-[0.9375rem] text-muted-foreground">
          {getScoreMessage(pct)}
        </p>
        <div className="mt-6 flex justify-center gap-3">
          <button
            onClick={handleRetry}
            className="flex items-center gap-2 rounded-lg border border-border px-4 py-2 text-[0.8125rem] font-medium transition-colors hover:bg-secondary"
          >
            <RotateCcw size={14} />
            Prova igen
          </button>
          <button
            onClick={onClose}
            className="rounded-lg bg-foreground px-4 py-2 text-[0.8125rem] font-medium text-background transition-colors hover:bg-foreground/90"
          >
            Tillbaka
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-lg border border-border bg-card p-6">
      {/* Progress */}
      <div className="mb-4 flex items-center justify-between">
        <p
          className="text-[0.625rem] font-medium uppercase tracking-[0.15em] text-muted-foreground"
          style={{ fontFamily: "var(--font-geist-mono), monospace" }}
        >
          Fråga {current + 1} / {total}
        </p>
        <p className="text-[0.75rem] text-muted-foreground">
          {score} rätt
        </p>
      </div>
      <div className="mb-6 h-1 overflow-hidden rounded-full bg-secondary">
        <div
          className="h-full transition-all duration-500"
          style={{
            width: `${((current + 1) / total) * 100}%`,
            background: BRAND_GRADIENT,
          }}
        />
      </div>

      {/* Question */}
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -30 }}
          transition={{ duration: 0.25 }}
        >
          <h3
            className="text-[1.0625rem] leading-[1.4] tracking-[-0.01em]"
            style={{ fontFamily: "var(--font-heading), serif", fontWeight: 400 }}
          >
            {q.question}
          </h3>

          <div className="mt-4 space-y-2">
            {q.options.map((opt, i) => {
              const isSelected = selected === i;
              const isAnswer = i === q.correctIndex;
              let bgClass = "bg-card hover:bg-secondary";
              if (selected !== null) {
                if (isAnswer) bgClass = "bg-emerald-500/10 border-emerald-500/30";
                else if (isSelected && !isAnswer) bgClass = "bg-rose-500/10 border-rose-500/30";
              }

              return (
                <button
                  key={i}
                  onClick={() => handleSelect(i)}
                  disabled={selected !== null}
                  className={`flex w-full items-center gap-3 rounded-lg border border-border p-3.5 text-left text-[0.875rem] transition-all ${bgClass} disabled:cursor-default`}
                >
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-border text-[0.6875rem] font-medium">
                    {String.fromCharCode(65 + i)}
                  </span>
                  <span className="flex-1">{opt}</span>
                  {selected !== null && isAnswer && (
                    <Check size={16} className="shrink-0 text-emerald-500" />
                  )}
                  {selected !== null && isSelected && !isAnswer && (
                    <X size={16} className="shrink-0 text-rose-500" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Explanation */}
          {selected !== null && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 rounded-lg bg-secondary/50 p-4"
            >
              <p className="text-[0.8125rem] leading-[1.6] text-muted-foreground">
                {q.explanation}
              </p>
            </motion.div>
          )}

          {/* Next button */}
          {selected !== null && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-4 flex justify-end"
            >
              <button
                onClick={handleNext}
                className="flex items-center gap-1.5 rounded-lg bg-foreground px-4 py-2 text-[0.8125rem] font-medium text-background transition-colors hover:bg-foreground/90"
              >
                {current < total - 1 ? "Nästa fråga" : "Se resultat"}
                <ArrowRight size={14} />
              </button>
            </motion.div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
