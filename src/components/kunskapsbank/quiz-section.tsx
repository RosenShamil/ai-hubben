"use client";

import { useState } from "react";
import { Brain, Briefcase, Scale, Shield, BookOpen, Boxes, Laptop, Server as ServerIcon, Database, Wrench, FlaskConical, Sparkles, Shuffle } from "lucide-react";
import { FadeIn } from "@/components/shared/fade-in";
import {
  QUIZ_QUESTIONS,
  SCENARIOS,
  CATEGORIES,
  type ConceptCategory,
} from "@/lib/knowledge-bank";
import { QuizPlayer } from "./quiz-player";
import { ScenarioCardComponent } from "./scenario-card";

const CATEGORY_ICONS: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  "ai-grunderna": Brain,
  sprakmodeller: Sparkles,
  "ai-pa-jobbet": Briefcase,
  intric: Boxes,
  copilot: Laptop,
  teknik: ServerIcon,
  "data-sokning": Database,
  "lagar-regler": Scale,
  "sakerhet-etik": Shield,
  verktyg: Wrench,
  avancerat: FlaskConical,
};

type View = "menu" | "quiz" | "scenarios";

export function QuizSection() {
  const [view, setView] = useState<View>("menu");
  const [quizCategory, setQuizCategory] = useState<ConceptCategory | "all">(
    "all"
  );

  const categoriesWithQuestions = [
    ...new Set(QUIZ_QUESTIONS.map((q) => q.category).filter(Boolean)),
  ] as ConceptCategory[];

  const filteredQuestions =
    quizCategory === "all"
      ? QUIZ_QUESTIONS
      : QUIZ_QUESTIONS.filter((q) => q.category === quizCategory);

  if (view === "quiz") {
    return (
      <QuizPlayer
        questions={filteredQuestions}
        quizKey={quizCategory}
        onClose={() => setView("menu")}
      />
    );
  }

  if (view === "scenarios") {
    return (
      <div>
        <button
          onClick={() => setView("menu")}
          className="mb-4 text-[0.8125rem] font-medium text-muted-foreground hover:text-foreground"
        >
          ← Tillbaka
        </button>
        <div className="space-y-4">
          {SCENARIOS.map((s) => (
            <FadeIn key={s.id}>
              <ScenarioCardComponent scenario={s} />
            </FadeIn>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Quiz section */}
      <FadeIn>
        <div className="rounded-lg border border-border bg-card p-6">
          <h3
            className="text-[1.125rem] leading-[1.3] tracking-[-0.02em]"
            style={{
              fontFamily: "var(--font-heading), serif",
              fontWeight: 400,
            }}
          >
            Quiz
          </h3>
          <p className="mt-2 text-[0.875rem] text-muted-foreground">
            Testa dina kunskaper med flervalsfrågor. Välj en kategori eller kör
            alla!
          </p>

          <div className="mt-4 flex flex-wrap gap-2">
            <button
              onClick={() => {
                setQuizCategory("all");
                setView("quiz");
              }}
              className="flex items-center gap-2 rounded-full border border-border px-3.5 py-1.5 text-[0.8125rem] font-medium transition-colors hover:bg-secondary"
            >
              <Shuffle size={14} />
              Alla kategorier ({QUIZ_QUESTIONS.length} frågor)
            </button>
            {categoriesWithQuestions.map((cat) => {
              const Icon = CATEGORY_ICONS[cat] || BookOpen;
              const count = QUIZ_QUESTIONS.filter(
                (q) => q.category === cat
              ).length;
              return (
                <button
                  key={cat}
                  onClick={() => {
                    setQuizCategory(cat);
                    setView("quiz");
                  }}
                  className="flex items-center gap-2 rounded-full border border-border px-3.5 py-1.5 text-[0.8125rem] font-medium transition-colors hover:bg-secondary"
                >
                  <Icon size={14} />
                  {CATEGORIES[cat].label} ({count})
                </button>
              );
            })}
          </div>
        </div>
      </FadeIn>

      {/* Scenarios section */}
      <FadeIn delay={0.1}>
        <div className="rounded-lg border border-border bg-card p-6">
          <h3
            className="text-[1.125rem] leading-[1.3] tracking-[-0.02em]"
            style={{
              fontFamily: "var(--font-heading), serif",
              fontWeight: 400,
            }}
          >
            Scenariokort
          </h3>
          <p className="mt-2 text-[0.875rem] text-muted-foreground">
            Verkliga arbetsplatssituationer där du fattar beslut och lär dig av
            konsekvenserna. {SCENARIOS.length} scenarion.
          </p>
          <button
            onClick={() => setView("scenarios")}
            className="mt-4 rounded-lg bg-foreground px-4 py-2 text-[0.8125rem] font-medium text-background transition-colors hover:bg-foreground/90"
          >
            Starta scenarion →
          </button>
        </div>
      </FadeIn>
    </div>
  );
}
