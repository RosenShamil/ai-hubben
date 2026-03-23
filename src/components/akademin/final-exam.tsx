"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  ChevronRight,
  Trophy,
  RotateCcw,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Award,
  Lock,
} from "lucide-react";
import { BRAND_GRADIENT } from "@/lib/constants";
import {
  getLevelConfig,
  getFinalExamQuestions,
} from "@/lib/education-data";
import {
  saveFinalExamScore,
  canRetryFinalExam,
} from "@/lib/education-progress";
import type { AcademyQuizQuestion } from "@/lib/education-system";

export function FinalExam({
  levelId,
  onClose,
  onPass,
}: {
  levelId: string;
  onClose: () => void;
  onPass: () => void;
}) {
  const level = getLevelConfig(levelId);
  const canRetry = canRetryFinalExam(levelId as "niva-1" | "niva-2" | "niva-3");

  const questions = useMemo(
    () => (level ? getFinalExamQuestions(levelId, level.finalExamQuestionCount) : []),
    [levelId, level]
  );

  const [started, setStarted] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [showResult, setShowResult] = useState(false);

  if (!level || questions.length === 0) return null;

  const totalQuestions = questions.length;
  const question = questions[currentIndex];
  const isLastQuestion = currentIndex === totalQuestions - 1;
  const passThreshold = level.finalExamPassThreshold * 100;

  // Calculate score
  const correctCount = Object.entries(answers).filter(
    ([qId, ans]) => questions.find((q) => q.id === qId)?.correctIndex === ans
  ).length;
  const scorePercent = Math.round((correctCount / totalQuestions) * 100);
  const passed = scorePercent >= passThreshold;

  const handleSelect = (idx: number) => {
    if (showExplanation) return;
    setSelectedAnswer(idx);
    setShowExplanation(true);
    setAnswers((prev) => ({ ...prev, [question.id]: idx }));
  };

  const handleNext = () => {
    if (isLastQuestion) {
      const finalAnswers = { ...answers, [question.id]: selectedAnswer ?? -1 };
      const finalCorrect = Object.entries(finalAnswers).filter(
        ([qId, ans]) => questions.find((q) => q.id === qId)?.correctIndex === ans
      ).length;
      const finalScore = Math.round((finalCorrect / totalQuestions) * 100);

      saveFinalExamScore(
        levelId as "niva-1" | "niva-2" | "niva-3",
        finalScore
      );
      setShowResult(true);
    } else {
      setCurrentIndex((i) => i + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
    }
  };

  // Can't retry screen
  if (!canRetry && !started) {
    return (
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center bg-background"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <div className="mx-auto max-w-[28rem] px-6 text-center">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-secondary">
            <Lock size={32} className="text-muted-foreground" />
          </div>
          <h2
            className="mt-6 text-[1.25rem] leading-[1.3] tracking-[-0.02em]"
            style={{ fontFamily: "var(--font-bodoni), serif", fontWeight: 400 }}
          >
            Vänta innan du försöker igen
          </h2>
          <p className="mt-3 text-[0.9375rem] text-foreground/85">
            Du kan göra om slutprovet efter 24 timmar. Använd tiden till att
            repetera lektionerna och modul-quizen.
          </p>
          <button
            onClick={onClose}
            className="mt-6 rounded-lg border border-border px-6 py-3 text-[0.875rem] font-medium transition-all hover:bg-secondary"
          >
            Tillbaka
          </button>
        </div>
      </motion.div>
    );
  }

  // Intro screen
  if (!started) {
    return (
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center bg-background"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <div className="mx-auto max-w-[28rem] px-6 text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 15 }}
          >
            <div
              className="mx-auto flex h-20 w-20 items-center justify-center rounded-2xl"
              style={{
                background:
                  levelId === "niva-1"
                    ? "linear-gradient(135deg, #d4a574, #b8860b)"
                    : levelId === "niva-2"
                      ? "linear-gradient(135deg, #b8c6d4, #8fa3b8)"
                      : "linear-gradient(135deg, #d4af37, #b8960c)",
              }}
            >
              <Award size={36} className="text-white" />
            </div>
          </motion.div>

          <h2
            className="mt-6 text-[1.5rem] leading-[1.2] tracking-[-0.03em]"
            style={{ fontFamily: "var(--font-bodoni), serif", fontWeight: 400 }}
          >
            Slutprov: {level.title}
          </h2>

          <p className="mt-3 text-[0.9375rem] text-foreground/85">
            Visa att du behärskar allt du lärt dig. Klarar du provet får du ditt
            certifikat!
          </p>

          <div className="mt-6 space-y-2 rounded-xl border border-border bg-card p-4 text-left">
            <div className="flex items-center gap-2 text-[0.8125rem]">
              <CheckCircle size={14} className="text-muted-foreground" />
              <span>{totalQuestions} slumpmässiga frågor</span>
            </div>
            <div className="flex items-center gap-2 text-[0.8125rem]">
              <Trophy size={14} className="text-muted-foreground" />
              <span>{passThreshold}% rätt för godkänt</span>
            </div>
            <div className="flex items-center gap-2 text-[0.8125rem]">
              <AlertTriangle size={14} className="text-muted-foreground" />
              <span>Omförsök möjligt efter 24 timmar</span>
            </div>
          </div>

          <div className="mt-8 flex flex-col gap-3">
            <button
              onClick={() => setStarted(true)}
              className="rounded-lg bg-primary px-6 py-3 text-[0.875rem] font-medium text-primary-foreground transition-all hover:bg-primary/90"
            >
              Starta slutprovet
            </button>
            <button
              onClick={onClose}
              className="rounded-lg border border-border px-6 py-3 text-[0.875rem] font-medium text-muted-foreground transition-all hover:bg-secondary"
            >
              Inte redo ännu
            </button>
          </div>
        </div>
      </motion.div>
    );
  }

  // Result screen
  if (showResult) {
    return (
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center bg-background"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <div className="mx-auto max-w-[28rem] px-6 text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 15 }}
          >
            {passed ? (
              <div
                className="mx-auto flex h-24 w-24 items-center justify-center rounded-2xl"
                style={{
                  background:
                    levelId === "niva-1"
                      ? "linear-gradient(135deg, #d4a574, #b8860b)"
                      : levelId === "niva-2"
                        ? "linear-gradient(135deg, #b8c6d4, #8fa3b8)"
                        : "linear-gradient(135deg, #d4af37, #b8960c)",
                }}
              >
                <Trophy size={44} className="text-white" />
              </div>
            ) : (
              <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-2xl bg-red-500/15">
                <RotateCcw size={40} className="text-red-500" />
              </div>
            )}
          </motion.div>

          <h2
            className="mt-6 text-[1.75rem] leading-[1.2] tracking-[-0.03em]"
            style={{ fontFamily: "var(--font-bodoni), serif", fontWeight: 400 }}
          >
            {passed ? "Grattis!" : "Inte godkänt"}
          </h2>

          <p className="mt-2 text-[0.9375rem] text-foreground/85">
            {passed
              ? `Du klarade slutprovet med ${scorePercent}%! Du är nu certifierad ${level.title}.`
              : `Du fick ${scorePercent}% rätt. Du behöver minst ${passThreshold}%. Försök igen efter 24 timmar.`}
          </p>

          <motion.div
            className="mt-6 text-[3rem] font-bold tabular-nums"
            initial={{ scale: 0.5 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: "spring" }}
          >
            {scorePercent}%
          </motion.div>
          <p className="text-[0.875rem] text-foreground/85">
            {correctCount} av {totalQuestions} rätt
          </p>

          <div className="mt-8 flex flex-col gap-3">
            {passed ? (
              <button
                onClick={onPass}
                className="rounded-lg bg-primary px-6 py-3 text-[0.875rem] font-medium text-primary-foreground transition-all hover:bg-primary/90"
              >
                Hämta ditt certifikat →
              </button>
            ) : (
              <button
                onClick={onClose}
                className="rounded-lg border border-border px-6 py-3 text-[0.875rem] font-medium transition-all hover:bg-secondary"
              >
                Tillbaka till akademin
              </button>
            )}
          </div>
        </div>
      </motion.div>
    );
  }

  // Question screen
  return (
    <motion.div
      className="fixed inset-0 z-50 flex flex-col bg-background"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      {/* Top bar */}
      <div className="flex items-center gap-4 border-b border-border px-4 py-3">
        <button
          onClick={onClose}
          className="flex h-8 w-8 items-center justify-center rounded-full hover:bg-secondary"
        >
          <X size={18} />
        </button>

        <div className="flex-1">
          <div className="h-2 overflow-hidden rounded-full bg-secondary">
            <motion.div
              className="h-full rounded-full"
              style={{ background: BRAND_GRADIENT }}
              animate={{
                width: `${((currentIndex + 1) / totalQuestions) * 100}%`,
              }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>

        <span className="text-[0.75rem] tabular-nums text-muted-foreground">
          {currentIndex + 1}/{totalQuestions}
        </span>
      </div>

      {/* Question */}
      <div className="flex-1 overflow-y-auto">
        <div className="mx-auto max-w-[42rem] px-6 py-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={question.id}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.2 }}
            >
              <p
                className="mb-2 text-[0.6875rem] font-medium uppercase tracking-[0.15em] text-muted-foreground"
                style={{ fontFamily: "var(--font-geist-mono), monospace" }}
              >
                Slutprov · Fråga {currentIndex + 1}
              </p>
              <p className="text-[1.0625rem] font-medium leading-[1.5]">
                {question.question}
              </p>

              <div className="mt-6 space-y-2">
                {question.options.map((opt, idx) => {
                  const isSelected = selectedAnswer === idx;
                  const isCorrect = idx === question.correctIndex;
                  const showCorrect = showExplanation && isCorrect;
                  const showWrong =
                    showExplanation && isSelected && !isCorrect;

                  return (
                    <button
                      key={idx}
                      onClick={() => handleSelect(idx)}
                      disabled={showExplanation}
                      className={`flex w-full items-center gap-3 rounded-xl border px-4 py-3.5 text-left text-[0.9375rem] transition-all ${
                        showCorrect
                          ? "border-emerald-500/40 bg-emerald-500/10"
                          : showWrong
                            ? "border-red-500/40 bg-red-500/10"
                            : showExplanation
                              ? "border-border/50 opacity-40"
                              : "border-border hover:bg-secondary/50"
                      }`}
                    >
                      <span
                        className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[0.75rem] font-bold ${
                          showCorrect
                            ? "bg-emerald-500/20 text-emerald-500"
                            : showWrong
                              ? "bg-red-500/20 text-red-500"
                              : "bg-secondary text-muted-foreground"
                        }`}
                      >
                        {showCorrect ? (
                          <CheckCircle size={14} />
                        ) : showWrong ? (
                          <XCircle size={14} />
                        ) : (
                          String.fromCharCode(65 + idx)
                        )}
                      </span>
                      <span>{opt}</span>
                    </button>
                  );
                })}
              </div>

              {showExplanation && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`mt-4 rounded-xl p-4 ${
                    selectedAnswer === question.correctIndex
                      ? "bg-emerald-500/10"
                      : "bg-red-500/10"
                  }`}
                >
                  <p className="text-[0.875rem] leading-[1.6] text-foreground/85">
                    {question.explanation}
                  </p>
                </motion.div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Bottom navigation */}
      {showExplanation && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="border-t border-border px-4 py-4"
        >
          <div className="mx-auto flex max-w-[42rem] justify-end">
            <button
              onClick={handleNext}
              className="flex items-center gap-1 rounded-lg bg-primary px-6 py-2.5 text-[0.875rem] font-medium text-primary-foreground transition-all hover:bg-primary/90"
            >
              {isLastQuestion ? "Se resultat" : "Nästa fråga"}
              <ChevronRight size={16} />
            </button>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}
