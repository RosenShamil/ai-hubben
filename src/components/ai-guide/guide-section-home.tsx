"use client";

import { useState, useEffect } from "react";
import { ArrowRight, RotateCcw, Sparkles } from "lucide-react";
import { BRAND_GRADIENT } from "@/lib/constants";
import { FadeIn } from "@/components/shared/fade-in";
import { getGuideProfile, clearGuideProfile, type AIGuideProfile } from "@/lib/ai-guide-profile";
import { DEPARTMENTS_MAP, ROLE_CATEGORIES_MAP, generateGuideResult } from "@/lib/ai-guide-data";
import type { IntricAssistant } from "@/lib/intric";
import { GuideQuiz } from "./guide-quiz";
import Link from "next/link";

export function GuideSectionHome({ assistants = [] }: { assistants?: IntricAssistant[] }) {
  const [profile, setProfile] = useState<AIGuideProfile | null>(null);
  const [quizOpen, setQuizOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setProfile(getGuideProfile());
  }, []);

  function handleComplete() {
    setQuizOpen(false);
    setProfile(getGuideProfile());
  }

  function handleReset() {
    clearGuideProfile();
    setProfile(null);
  }

  if (!mounted) return null;

  // ── Compact dashboard (profile exists) ──
  if (profile) {
    const dept = DEPARTMENTS_MAP[profile.departmentId];
    const roleInfo = ROLE_CATEGORIES_MAP[profile.roleCategory];
    const result = generateGuideResult(
      profile.departmentId,
      profile.roleCategory,
      profile.experienceLevel,
      profile.goals
    );

    return (
      <section className="mx-auto max-w-[68.75rem] px-6 py-12 md:py-16">
        <FadeIn>
          <div className="rounded-xl border border-border bg-card p-6 md:p-8">
            <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-4">
                <div
                  className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full"
                  style={{ background: BRAND_GRADIENT }}
                >
                  <Sparkles size={20} className="text-white" />
                </div>
                <div>
                  <p
                    className="text-[0.6875rem] font-medium uppercase tracking-[0.15em] text-muted-foreground"
                    style={{ fontFamily: "var(--font-geist-mono), monospace" }}
                  >
                    Din AI-profil
                  </p>
                  <p className="mt-0.5 text-[1rem] font-medium">
                    {dept.shortName} · {roleInfo.title}
                  </p>
                  <p className="mt-0.5 text-[0.8125rem] text-muted-foreground">
                    {result.levelDescription}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Link
                  href="/akademin"
                  className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-[0.8125rem] font-medium uppercase tracking-[0.01em] text-primary-foreground transition-all duration-150 active:scale-[0.98]"
                  style={{
                    fontFamily: "var(--font-geist-mono), monospace",
                    boxShadow:
                      "0px 2px 1px 0px rgba(255,255,255,0.15) inset, 0px -2px 1px 0px rgba(0,0,0,0.05) inset",
                  }}
                >
                  Börja utbildning <ArrowRight size={14} />
                </Link>
                <button
                  onClick={handleReset}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-border transition-colors hover:bg-secondary"
                  aria-label="Gör om quiz"
                >
                  <RotateCcw size={14} />
                </button>
              </div>
            </div>
          </div>
        </FadeIn>
      </section>
    );
  }

  // ── CTA (no profile) ──
  return (
    <>
      <section className="mx-auto max-w-[68.75rem] px-6 py-12 md:py-16">
        <FadeIn>
          <div className="relative overflow-hidden rounded-xl border border-border bg-card p-8 md:p-12">
            {/* Gradient accent */}
            <div
              className="absolute inset-x-0 top-0 h-1"
              style={{ background: BRAND_GRADIENT }}
            />
            <div className="relative flex flex-col items-center text-center">
              <div
                className="flex h-14 w-14 items-center justify-center rounded-full"
                style={{ background: BRAND_GRADIENT }}
              >
                <Sparkles size={24} className="text-white" />
              </div>
              <h2
                className="mt-5 text-[1.5rem] leading-tight tracking-[-0.03em] sm:text-[2rem]"
                style={{ fontFamily: "var(--font-bodoni), serif", fontWeight: 400 }}
              >
                Starta din AI-resa
              </h2>
              <p className="mt-3 max-w-md text-[0.9375rem] leading-relaxed text-muted-foreground">
                Svara på 4 snabba frågor och få en personlig guide med verktyg,
                tips och utbildning anpassad till just din roll.
              </p>
              <button
                onClick={() => setQuizOpen(true)}
                className="mt-6 inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3 text-[0.8125rem] font-medium uppercase tracking-[0.01em] text-primary-foreground transition-all duration-150 active:scale-[0.98]"
                style={{
                  fontFamily: "var(--font-geist-mono), monospace",
                  boxShadow:
                    "0px 2px 1px 0px rgba(255,255,255,0.15) inset, 0px -2px 1px 0px rgba(0,0,0,0.05) inset",
                }}
              >
                Kom igång <ArrowRight size={14} />
              </button>
              <p className="mt-3 text-[0.75rem] text-muted-foreground">
                Tar ungefär 30 sekunder · Ingen inloggning krävs
              </p>
            </div>
          </div>
        </FadeIn>
      </section>

      {quizOpen && (
        <GuideQuiz
          onComplete={handleComplete}
          onClose={() => setQuizOpen(false)}
          assistants={assistants}
        />
      )}
    </>
  );
}
