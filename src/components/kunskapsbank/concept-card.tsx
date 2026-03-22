"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check } from "lucide-react";
import * as LucideIcons from "lucide-react";
import { CATEGORIES, type Concept } from "@/lib/knowledge-bank";
import { DifficultyDots } from "./difficulty-dots";
import { isConceptRead } from "@/lib/knowledge-progress";

function getIcon(name: string) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const Icon = (LucideIcons as any)[name] as React.ComponentType<{ size?: number; className?: string }> | undefined;
  return Icon || LucideIcons.BookOpen;
}

export function ConceptCard({
  concept,
  onOpenDetail,
}: {
  concept: Concept;
  onOpenDetail: (concept: Concept) => void;
}) {
  const [flipped, setFlipped] = useState(false);
  const [read, setRead] = useState(false);
  const Icon = getIcon(concept.icon);
  const cat = CATEGORIES[concept.category];

  useEffect(() => {
    setRead(isConceptRead(concept.id));
  }, [concept.id]);

  return (
    <div
      className="group relative cursor-pointer"
      style={{ perspective: "1000px" }}
    >
      <motion.div
        className="relative h-[220px] w-full"
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        style={{ transformStyle: "preserve-3d" }}
        onClick={() => setFlipped(!flipped)}
      >
        {/* Front */}
        <div
          className="absolute inset-0 rounded-lg border border-border bg-card p-5 transition-all duration-300 group-hover:bg-secondary group-hover:shadow-lg"
          style={{ backfaceVisibility: "hidden" }}
        >
          <div className="flex items-start justify-between">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-secondary">
              <Icon size={18} className="text-foreground" />
            </div>
            {read && (
              <div className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500/15">
                <Check size={12} className="text-emerald-500" />
              </div>
            )}
          </div>

          <h3 className="mt-3 text-[0.9375rem] font-medium leading-[1.4] tracking-tight">
            {concept.title}
          </h3>

          <div className="mt-2 flex items-center gap-2">
            <span
              className="text-[0.5625rem] font-medium uppercase tracking-[0.1em] text-muted-foreground"
              style={{ fontFamily: "var(--font-geist-mono), monospace" }}
            >
              {cat.label}
            </span>
          </div>

          <div className="mt-auto absolute bottom-5 left-5">
            <DifficultyDots level={concept.difficulty} />
          </div>

          <p className="absolute bottom-5 right-5 text-[0.6875rem] text-muted-foreground/60">
            Tryck för att vända
          </p>
        </div>

        {/* Back */}
        <div
          className="absolute inset-0 rounded-lg border border-border bg-card p-5"
          style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
        >
          <p className="text-[0.8125rem] leading-[1.7] text-foreground">
            {concept.shortExplanation}
          </p>

          <p className="mt-3 text-[0.8125rem] italic leading-[1.6] text-muted-foreground">
            &ldquo;{concept.analogy}&rdquo;
          </p>

          <button
            onClick={(e) => {
              e.stopPropagation();
              onOpenDetail(concept);
            }}
            className="absolute bottom-5 right-5 text-[0.75rem] font-medium text-foreground underline underline-offset-2 hover:text-muted-foreground"
          >
            Läs mer →
          </button>
        </div>
      </motion.div>
    </div>
  );
}
