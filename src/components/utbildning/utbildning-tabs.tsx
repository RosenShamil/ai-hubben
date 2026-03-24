"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { GraduationCap, BookOpen, Calendar, TreePine } from "lucide-react";
import { FadeIn } from "@/components/shared/fade-in";
import { BRAND_GRADIENT } from "@/lib/constants";
import { DailyByteCard } from "@/components/kunskapsbank/daily-byte";
import { AcademyPage } from "@/components/akademin/academy-page";
import { KunskapsbankPage } from "@/components/kunskapsbank/kunskapsbank-page";
import { WorkshopsSection } from "./workshops-section";
import { MyJourney } from "@/components/kunskapsbank/my-journey";
import type { TrainingSession } from "@/lib/training-resources";

const TABS = [
  { key: "akademin", label: "Akademin", icon: GraduationCap },
  { key: "begrepp", label: "Begrepp", icon: BookOpen },
  { key: "workshops", label: "Workshops", icon: Calendar },
  { key: "resa", label: "Min resa", icon: TreePine },
] as const;

type TabKey = (typeof TABS)[number]["key"];

interface UtbildningTabsProps {
  allSessions: TrainingSession[];
  pastTraining: TrainingSession[];
}

export function UtbildningTabs({ allSessions, pastTraining }: UtbildningTabsProps) {
  const searchParams = useSearchParams();
  const initialTab = (searchParams.get("flik") as TabKey) || "akademin";
  const [activeTab, setActiveTab] = useState<TabKey>(
    TABS.some((t) => t.key === initialTab) ? initialTab : "akademin"
  );

  return (
    <>
      {/* Hero */}
      <section className="mx-auto max-w-[68.75rem] px-6 pt-20 pb-12 md:pt-28 md:pb-16">
        <FadeIn>
          <p
            className="text-[0.6875rem] font-medium uppercase tracking-[0.15em] text-muted-foreground"
            style={{ fontFamily: "var(--font-geist-mono), monospace" }}
          >
            Utbildning
          </p>
          <h1
            className="mt-4 text-[1.75rem] leading-[1.1] tracking-[-0.04em] sm:text-[2.75rem] md:text-[4.5rem]"
            style={{ fontFamily: "var(--font-bodoni), serif", fontWeight: 400 }}
          >
            Lär dig AI
          </h1>
          <p className="mt-6 max-w-[42rem] text-[1.0625rem] leading-[1.7] text-foreground">
            Bli certifierad, utforska begrepp, boka workshops — allt på ett ställe.
          </p>
        </FadeIn>

        {/* Dagens begrepp */}
        <FadeIn delay={0.1}>
          <div className="mt-6 max-w-md">
            <DailyByteCard onOpenConcept={() => setActiveTab("begrepp")} />
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
          {activeTab === "akademin" && <AcademyPage embedded />}
          {activeTab === "begrepp" && <KunskapsbankPage embedded />}
          {activeTab === "workshops" && (
            <WorkshopsSection allSessions={allSessions} pastTraining={pastTraining} />
          )}
          {activeTab === "resa" && <MyJourney />}
        </div>
      </section>
    </>
  );
}
