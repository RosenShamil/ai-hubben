"use client";

import { useState, useEffect } from "react";
import { Lightbulb, ArrowRight } from "lucide-react";
import * as LucideIcons from "lucide-react";
import Link from "next/link";
import { getDailyByte } from "@/lib/daily-byte";
import { updateStreak } from "@/lib/knowledge-progress";
import { CATEGORIES, type Concept } from "@/lib/knowledge-bank";
import { FUN_FACTS } from "@/lib/fun-facts";
import { DifficultyDots } from "./difficulty-dots";

function getIcon(name: string) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const Icon = (LucideIcons as any)[name] as React.ComponentType<{
    size?: number;
    className?: string;
  }> | undefined;
  return Icon || LucideIcons.BookOpen;
}

/**
 * Compact teaser widget for use on other pages (home, utbildning).
 */
export function DailyByteTeaser() {
  const [concept, setConcept] = useState<Concept | null>(null);

  useEffect(() => {
    const { concept: c } = getDailyByte();
    setConcept(c);
    updateStreak();
  }, []);

  if (!concept) return null;

  const Icon = getIcon(concept.icon);

  return (
    <Link
      href="/kunskapsbank"
      className="group flex items-center gap-4 rounded-lg border border-border bg-card p-4 transition-all hover:bg-secondary hover:shadow-lg"
    >
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-secondary">
        <Lightbulb size={18} className="text-foreground" />
      </div>
      <div className="min-w-0 flex-1">
        <p
          className="text-[0.5625rem] font-medium uppercase tracking-[0.12em] text-muted-foreground"
          style={{ fontFamily: "var(--font-geist-mono), monospace" }}
        >
          Dagens AI-byte
        </p>
        <p className="mt-0.5 truncate text-[0.875rem] font-medium">
          {concept.title}
        </p>
      </div>
      <ArrowRight
        size={16}
        className="shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5"
      />
    </Link>
  );
}

/**
 * Full daily byte card for the kunskapsbank page hero.
 */
export function DailyByteCard({
  onOpenConcept,
}: {
  onOpenConcept: (concept: Concept) => void;
}) {
  const [concept, setConcept] = useState<Concept | null>(null);
  const [streak, setStreak] = useState(0);

  useEffect(() => {
    const { concept: c } = getDailyByte();
    setConcept(c);
    setStreak(updateStreak());
  }, []);

  if (!concept) return null;

  const Icon = getIcon(concept.icon);
  const cat = CATEGORIES[concept.category];
  const funFact = concept ? (concept.funFact || FUN_FACTS[concept.id]) : null;

  return (
    <div className="rounded-lg border border-border bg-card p-5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Lightbulb size={16} className="text-amber-500" />
          <p
            className="text-[0.625rem] font-medium uppercase tracking-[0.12em] text-muted-foreground"
            style={{ fontFamily: "var(--font-geist-mono), monospace" }}
          >
            Dagens AI-byte
          </p>
        </div>
        {streak > 1 && (
          <span className="text-[0.75rem] text-muted-foreground">
            🔥 {streak} dagar i rad
          </span>
        )}
      </div>

      <div className="mt-4 flex items-start gap-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-secondary">
          <Icon size={22} className="text-foreground" />
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-[0.625rem] font-medium uppercase tracking-[0.08em] text-muted-foreground" style={{ fontFamily: "var(--font-geist-mono), monospace" }}>
            {cat.label}
          </p>
          <h3
            className="mt-0.5 text-[1.0625rem] leading-[1.3] tracking-[-0.01em]"
            style={{ fontFamily: "var(--font-heading), serif", fontWeight: 400 }}
          >
            {concept.title}
          </h3>
          <div className="mt-1">
            <DifficultyDots level={concept.difficulty} />
          </div>
        </div>
      </div>

      <p className="mt-3 text-[0.875rem] leading-[1.7] text-foreground/85">
        {concept.shortExplanation}
      </p>

      <p className="mt-2 text-[0.8125rem] italic leading-[1.6] text-foreground/70">
        &ldquo;{concept.analogy}&rdquo;
      </p>

      {/* Fun fact */}
      {funFact && (
        <div className="mt-4 rounded-lg border border-amber-500/20 bg-amber-500/5 p-3.5">
          <p
            className="text-[0.625rem] font-medium uppercase tracking-[0.12em] text-amber-600 dark:text-amber-400"
            style={{ fontFamily: "var(--font-geist-mono), monospace" }}
          >
            Visste du att...
          </p>
          <p className="mt-1.5 text-[0.8125rem] leading-[1.6] text-foreground/85">
            {funFact}
          </p>
        </div>
      )}

      <button
        onClick={() => onOpenConcept(concept)}
        className="mt-4 text-[0.75rem] font-medium text-foreground underline underline-offset-2 hover:text-muted-foreground"
      >
        Utforska begreppet →
      </button>
    </div>
  );
}
