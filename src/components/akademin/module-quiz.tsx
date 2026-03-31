"use client";

import { useState, useMemo, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Check,
  ChevronRight,
  Trophy,
  RotateCcw,
  ArrowLeft,
  CheckCircle,
  XCircle,
} from "lucide-react";
import { useSwipeNavigation } from "@/hooks/use-swipe-navigation";
import { BRAND_GRADIENT } from "@/lib/constants";
import { getModuleById, getQuizQuestionsForModule } from "@/lib/education-data";
import { saveModuleQuizScore, completeModule, getModuleQuizScore } from "@/lib/education-progress";
import { XP_REWARDS } from "@/lib/education-system";
import type { AcademyQuizQuestion } from "@/lib/education-system";
import { showXPToast } from "./xp-toast";

function shuffleOptions(q: AcademyQuizQuestion): AcademyQuizQuestion {
  const indices = q.options.map((_, i) => i).sort(() => Math.random() - 0.5);
  return {
    ...q,
    options: indices.map((i) => q.options[i]),
    correctIndex: indices.indexOf(q.correctIndex),
  };
}

export function ModuleQuiz({
  moduleId,
  onClose,
}: {
  moduleId: string;
  onClose: () => void;
}) {
  const mod = getModuleById(moduleId);
  const allQuestions = useMemo(
    () => getQuizQuestionsForModule(moduleId).sort(() => Math.random() - 0.5).map(shuffleOptions),
    [moduleId]
  );

  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [showResult, setShowResult] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);

  if (!mod || allQuestions.length === 0) return null;

  const question = allQuestions[currentIndex];
  const totalQuestions = allQuestions.length;
  const isLastQuestion = currentIndex === totalQuestions - 1;

  // Calculate score
  const correctCount = Object.entries(answers).filter(
    ([qId, ans]) => allQuestions.find((q) => q.id === qId)?.correctIndex === ans
  ).length;
  const scorePercent = Math.round((correctCount / totalQuestions) * 100);
  const passed = scorePercent >= (mod.quizPassThreshold * 100);

  const handleSelect = (idx: number) => {
    if (showExplanation) return;
    setSelectedAnswer(idx);
    setShowExplanation(true);
    setAnswers((prev) => ({ ...prev, [question.id]: idx }));
  };

  const handleNext = () => {
    if (isLastQuestion) {
      // Calculate final score
      const finalAnswers = { ...answers, [question.id]: selectedAnswer! };
      const finalCorrect = Object.entries(finalAnswers).filter(
        ([qId, ans]) => allQuestions.find((q) => q.id === qId)?.correctIndex === ans
      ).length;
      const finalScore = Math.round((finalCorrect / totalQuestions) * 100);

      const prevScore = getModuleQuizScore(moduleId);
      saveModuleQuizScore(moduleId, finalScore);
      if (finalScore >= mod.quizPassThreshold * 100) {
        completeModule(moduleId);
        if (prevScore < mod.quizPassThreshold * 100) {
          showXPToast(XP_REWARDS["quiz-pass"], "Quiz godkänt!");
        }
        if (finalScore === 100 && prevScore < 100) {
          showXPToast(XP_REWARDS["quiz-perfect"], "Perfekt quiz!");
        }
      }
      setShowResult(true);
    } else {
      setCurrentIndex((i) => i + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
    }
  };

  const handleRetry = () => {
    setCurrentIndex(0);
    setAnswers({});
    setSelectedAnswer(null);
    setShowExplanation(false);
    setShowResult(false);
  };

  const handleSwipeNext = useCallback(() => {
    if (showExplanation) handleNext();
  }, [showExplanation, handleNext]);

  const { dragProps } = useSwipeNavigation({
    onSwipeLeft: handleSwipeNext,
  });

  // Results screen
  if (showResult) {
    return (
      <motion.div
        className="fixed inset-0 z-[1000] flex items-center justify-center bg-background"
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
              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-emerald-500/15">
                <Trophy size={36} className="text-emerald-500" />
              </div>
            ) : (
              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-red-500/15">
                <RotateCcw size={36} className="text-red-500" />
              </div>
            )}
          </motion.div>

          <h2
            className="mt-6 text-[1.5rem] leading-[1.2] tracking-[-0.03em]"
            style={{ fontFamily: "var(--font-bodoni), serif", fontWeight: 400 }}
          >
            {passed ? "Godkänt!" : "Inte godkänt"}
          </h2>

          <p className="mt-2 text-[0.9375rem] text-foreground/85">
            {passed
              ? `Du klarade quizet med ${scorePercent}% rätt. Bra jobbat!`
              : `Du fick ${scorePercent}% rätt. Du behöver minst ${Math.round(mod.quizPassThreshold * 100)}% för att bli godkänd.`}
          </p>

          <div className="mt-6 text-[2.5rem] font-bold tabular-nums">
            {scorePercent}%
          </div>
          <p className="text-[0.8125rem] text-foreground/85">
            {correctCount} av {totalQuestions} rätt
          </p>

          <div className="mt-8 flex flex-col gap-3">
            {passed ? (
              <button
                onClick={onClose}
                className="rounded-lg bg-primary px-6 py-3 text-[0.875rem] font-medium text-primary-foreground transition-all hover:bg-primary/90"
              >
                Fortsätt →
              </button>
            ) : (
              <>
                <button
                  onClick={handleRetry}
                  className="rounded-lg bg-foreground px-6 py-3 text-[0.875rem] font-medium text-background transition-all hover:bg-foreground/90"
                >
                  Försök igen
                </button>
                <button
                  onClick={onClose}
                  className="rounded-lg border border-border px-6 py-3 text-[0.875rem] font-medium text-muted-foreground transition-all hover:bg-secondary"
                >
                  Tillbaka till kursen
                </button>
              </>
            )}
          </div>
        </div>
      </motion.div>
    );
  }

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
          {currentIndex === 0 && (
            <div className="mb-6">
              <p
                className="text-[0.6875rem] font-medium uppercase tracking-[0.15em] text-muted-foreground"
                style={{ fontFamily: "var(--font-geist-mono), monospace" }}
              >
                Modul-quiz
              </p>
              <h2
                className="mt-1 text-[1.125rem] leading-[1.3] tracking-[-0.02em]"
                style={{ fontFamily: "var(--font-heading), serif", fontWeight: 400 }}
              >
                {mod.title}
              </h2>
              <p className="mt-1 text-[0.8125rem] text-muted-foreground">
                {totalQuestions} frågor · {Math.round(mod.quizPassThreshold * 100)}% för godkänt
              </p>
            </div>
          )}

          <AnimatePresence mode="wait">
            <motion.div
              key={question.id}
              {...dragProps}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.2 }}
              style={{ touchAction: "pan-y" }}
            >
              <p className="text-[1.0625rem] font-medium leading-[1.5]">
                {question.question}
              </p>

              <div className="mt-6 space-y-2">
                {question.options.map((opt, idx) => {
                  const isSelected = selectedAnswer === idx;
                  const isCorrect = idx === question.correctIndex;
                  const showCorrect = showExplanation && isCorrect;
                  const showWrong = showExplanation && isSelected && !isCorrect;

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
                              : isSelected
                                ? "border-foreground bg-secondary"
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
