"use client";

import { useState, useEffect } from "react";
import { BookOpen, Route, Trophy, TreePine } from "lucide-react";
import { MyJourney } from "./my-journey";
import { FadeIn } from "@/components/shared/fade-in";
import { BRAND_GRADIENT } from "@/lib/constants";
import { CONCEPTS } from "@/lib/knowledge-bank";
import { getReadCount, updateStreak } from "@/lib/knowledge-progress";
import { ConceptGrid } from "./concept-grid";
import { LearningPaths } from "./learning-paths";
import { QuizSection } from "./quiz-section";
import { ConceptDetailModal } from "./concept-detail-modal";
import { DailyByteCard } from "./daily-byte";

const TABS = [
  { key: "begrepp", label: "Begrepp", icon: BookOpen },
  { key: "larvägar", label: "Lärvägar", icon: Route },
  { key: "testa", label: "Testa dig", icon: Trophy },
  { key: "resa", label: "Min resa", icon: TreePine },
] as const;

type TabKey = (typeof TABS)[number]["key"];

export function KunskapsbankPage() {
  const [activeTab, setActiveTab] = useState<TabKey>("begrepp");
  const [readCount, setReadCount] = useState(0);
  const [streak, setStreak] = useState(0);
  const [detailConcept, setDetailConcept] = useState<
    (typeof CONCEPTS)[number] | null
  >(null);

  useEffect(() => {
    setReadCount(getReadCount());
    setStreak(updateStreak());
  }, []);

  // Refresh read count when switching back to begrepp tab
  useEffect(() => {
    if (activeTab === "begrepp") {
      setReadCount(getReadCount());
    }
  }, [activeTab]);

  return (
    <>
      {/* Hero */}
      <section className="mx-auto max-w-[68.75rem] px-6 pt-20 pb-12 md:pt-28 md:pb-16">
        <FadeIn>
          <p
            className="text-[0.6875rem] font-medium uppercase tracking-[0.15em] text-muted-foreground"
            style={{ fontFamily: "var(--font-geist-mono), monospace" }}
          >
            Lär dig AI & IT
          </p>
          <h1
            className="mt-4 text-[1.75rem] leading-[1.1] tracking-[-0.04em] sm:text-[2.75rem] md:text-[4.5rem]"
            style={{
              fontFamily: "var(--font-bodoni), serif",
              fontWeight: 400,
            }}
          >
            Kunskapsbanken
          </h1>
          <p className="mt-6 max-w-[42rem] text-[1.0625rem] leading-[1.7] text-muted-foreground">
            Alla AI- och IT-begrepp förklarade enkelt — från absolut nybörjare
            till avancerad nivå. Sök, utforska och lär dig i din egen takt.
          </p>
        </FadeIn>

        {/* Progress bar */}
        <FadeIn delay={0.1}>
          <div className="mt-8 rounded-lg border border-border bg-card p-4">
            <div className="flex items-center justify-between">
              <p className="text-[0.875rem] text-muted-foreground">
                Du har utforskat{" "}
                <span className="font-medium text-foreground">
                  {readCount}
                </span>{" "}
                av{" "}
                <span className="font-medium text-foreground">
                  {CONCEPTS.length}
                </span>{" "}
                begrepp
              </p>
              {streak > 1 && (
                <p className="text-[0.8125rem] text-muted-foreground">
                  🔥 {streak} dagar i rad
                </p>
              )}
            </div>
            <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-secondary">
              <div
                className="h-full rounded-full transition-all duration-700"
                style={{
                  width: `${Math.min(
                    (readCount / CONCEPTS.length) * 100,
                    100
                  )}%`,
                  background: BRAND_GRADIENT,
                }}
              />
            </div>
          </div>
        </FadeIn>

        {/* Daily byte */}
        <FadeIn delay={0.15}>
          <div className="mt-6">
            <DailyByteCard
              onOpenConcept={(c) => setDetailConcept(c)}
            />
          </div>
        </FadeIn>
      </section>

      {/* Gradient divider */}
      <div className="mx-auto max-w-[68.75rem] px-6">
        <div className="h-px" style={{ background: BRAND_GRADIENT }} />
      </div>

      {/* Tab navigation */}
      <section className="mx-auto max-w-[68.75rem] px-6 py-8">
        <FadeIn delay={0.15}>
          <div className="flex gap-1 overflow-x-auto rounded-lg border border-border bg-card p-1">
            {TABS.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.key;
              return (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={`flex flex-1 items-center justify-center gap-2 rounded-md px-4 py-2.5 text-[0.8125rem] font-medium transition-all ${
                    isActive
                      ? "bg-foreground text-background"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <Icon size={16} />
                  <span className="hidden sm:inline">{tab.label}</span>
                </button>
              );
            })}
          </div>
        </FadeIn>

        {/* Tab content */}
        <div className="mt-6">
          {activeTab === "begrepp" && <ConceptGrid />}

          {activeTab === "larvägar" && (
            <LearningPaths
              onConceptClick={(conceptId) => {
                const c = CONCEPTS.find((x) => x.id === conceptId);
                if (c) {
                  setDetailConcept(c);
                  setActiveTab("begrepp");
                }
              }}
            />
          )}

          {activeTab === "testa" && <QuizSection />}

          {activeTab === "resa" && <MyJourney />}
        </div>
      </section>

      {/* Detail modal for cross-navigation from learning paths */}
      <ConceptDetailModal
        concept={detailConcept}
        onClose={() => {
          setDetailConcept(null);
          setReadCount(getReadCount());
        }}
        onNavigate={(c) => setDetailConcept(c)}
      />
    </>
  );
}
