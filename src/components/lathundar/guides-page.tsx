"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import * as LucideIcons from "lucide-react";
import { Clock, ChevronRight, Users } from "lucide-react";
import { FadeIn } from "@/components/shared/fade-in";
import { BRAND_GRADIENT } from "@/lib/constants";
import {
  GUIDES,
  AUDIENCE_LABELS,
  AUDIENCE_COLORS,
  getGuideProgress,
  type Guide,
  type GuideAudience,
} from "@/lib/guides-data";
import { StepGuide } from "./step-guide";

function getIcon(name: string) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const Icon = (LucideIcons as any)[name] as React.ComponentType<{
    size?: number;
    className?: string;
  }> | undefined;
  return Icon || LucideIcons.FileText;
}

// ---------------------------------------------------------------------------
// Guide card
// ---------------------------------------------------------------------------

function GuideCard({
  guide,
  onOpen,
}: {
  guide: Guide;
  onOpen: (guide: Guide) => void;
}) {
  const Icon = getIcon(guide.icon);
  const completed = getGuideProgress(guide.id);
  const total = guide.steps.length;
  const done = completed.length;
  const progress = total > 0 ? done / total : 0;

  return (
    <motion.button
      onClick={() => onOpen(guide)}
      className="group relative flex flex-col items-start overflow-hidden rounded-2xl border border-border bg-card p-6 text-left transition-colors hover:border-foreground/20"
      whileHover={{ y: -2 }}
      transition={{ duration: 0.2 }}
    >
      {/* Gradient accent */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-1 opacity-60"
        style={{ background: BRAND_GRADIENT }}
      />

      {/* Icon + audience badge */}
      <div className="flex w-full items-start justify-between">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-secondary">
          <Icon size={20} className="text-foreground" />
        </div>
        <span
          className={`rounded-full px-2.5 py-1 text-[0.6875rem] font-medium ${AUDIENCE_COLORS[guide.audience]}`}
        >
          {guide.audienceLabel}
        </span>
      </div>

      {/* Title + description */}
      <h3
        className="mt-4 text-[1rem] leading-[1.3] tracking-[-0.01em]"
        style={{ fontFamily: "var(--font-bodoni), serif" }}
      >
        {guide.title}
      </h3>
      <p className="mt-2 line-clamp-2 text-[0.8125rem] leading-[1.6] text-muted-foreground">
        {guide.description}
      </p>

      {/* Meta row */}
      <div className="mt-4 flex w-full items-center gap-4 text-[0.75rem] text-muted-foreground">
        <span className="flex items-center gap-1">
          <Clock size={12} />
          {guide.estimatedMinutes} min
        </span>
        <span className="flex items-center gap-1">
          {total} steg
        </span>
      </div>

      {/* Progress bar */}
      {done > 0 && (
        <div className="mt-3 w-full">
          <div className="flex items-center justify-between text-[0.6875rem] text-muted-foreground">
            <span>{done}/{total} klart</span>
            <span>{Math.round(progress * 100)}%</span>
          </div>
          <div className="mt-1 h-1.5 w-full overflow-hidden rounded-full bg-secondary">
            <motion.div
              className="h-full rounded-full bg-foreground"
              initial={{ width: 0 }}
              animate={{ width: `${progress * 100}%` }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            />
          </div>
        </div>
      )}

      {/* Arrow */}
      <div className="mt-4 flex items-center gap-1 text-[0.8125rem] font-medium text-foreground">
        Öppna guide
        <ChevronRight
          size={14}
          className="transition-transform group-hover:translate-x-0.5"
        />
      </div>
    </motion.button>
  );
}

// ---------------------------------------------------------------------------
// Audience filter
// ---------------------------------------------------------------------------

const AUDIENCE_FILTERS: { key: GuideAudience | "all"; label: string }[] = [
  { key: "all", label: "Alla" },
  { key: "user", label: "Användare" },
  { key: "creator", label: "Creators" },
  { key: "space-admin", label: "Space-admins" },
  { key: "owner", label: "Org-admins" },
];

// ---------------------------------------------------------------------------
// Main page
// ---------------------------------------------------------------------------

export function GuidesPage({ embedded = false }: { embedded?: boolean }) {
  const [filter, setFilter] = useState<GuideAudience | "all">("all");
  const [openGuide, setOpenGuide] = useState<Guide | null>(null);

  const filtered =
    filter === "all" ? GUIDES : GUIDES.filter((g) => g.audience === filter);

  if (openGuide) {
    return (
      <StepGuide
        guide={openGuide}
        onBack={() => setOpenGuide(null)}
      />
    );
  }

  return (
    <div>
      {/* Header (only when not embedded) */}
      {!embedded && (
        <FadeIn>
          <div className="mb-8">
            <p
              className="text-[0.6875rem] font-medium uppercase tracking-[0.15em] text-muted-foreground"
              style={{ fontFamily: "var(--font-geist-mono), monospace" }}
            >
              Lathundar
            </p>
            <h2
              className="mt-2 text-[1.75rem] leading-[1.1] tracking-[-0.04em] sm:text-[2.25rem]"
              style={{ fontFamily: "var(--font-bodoni), serif", fontWeight: 400 }}
            >
              Steg-för-steg-guider
            </h2>
            <p className="mt-3 max-w-[42rem] text-[0.9375rem] leading-[1.7] text-muted-foreground">
              Praktiska guider för att komma igång med Intric. Varje guide har interaktiva steg,
              en simulerad miljö och möjlighet att ladda ner som PDF.
            </p>
          </div>
        </FadeIn>
      )}

      {/* Audience filter */}
      <FadeIn delay={0.05}>
        <div className="mb-6 flex items-center gap-2 overflow-x-auto">
          <Users size={14} className="shrink-0 text-muted-foreground" />
          {AUDIENCE_FILTERS.map((af) => (
            <button
              key={af.key}
              onClick={() => setFilter(af.key)}
              className={`shrink-0 rounded-full px-3 py-1.5 text-[0.75rem] font-medium transition-colors ${
                filter === af.key
                  ? "bg-foreground text-background"
                  : "bg-secondary text-muted-foreground hover:text-foreground"
              }`}
            >
              {af.label}
            </button>
          ))}
        </div>
      </FadeIn>

      {/* Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {filtered.map((guide, i) => (
            <motion.div
              key={guide.id}
              layout
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.25, delay: i * 0.05 }}
            >
              <GuideCard guide={guide} onOpen={setOpenGuide} />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {filtered.length === 0 && (
        <p className="mt-8 text-center text-[0.875rem] text-muted-foreground">
          Inga lathundar för den valda målgruppen ännu. Fler kommer snart!
        </p>
      )}
    </div>
  );
}
