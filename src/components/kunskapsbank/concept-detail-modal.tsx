"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Play } from "lucide-react";
import * as LucideIcons from "lucide-react";
import { CATEGORIES, CONCEPTS, type Concept } from "@/lib/knowledge-bank";
import { EXPLAINERS } from "@/lib/explainers-data";
import { DifficultyDots } from "./difficulty-dots";
import { markConceptRead } from "@/lib/knowledge-progress";
import { AnimatedExplainerView } from "./animated-explainer";

function getIcon(name: string) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const Icon = (LucideIcons as any)[name] as React.ComponentType<{ size?: number; className?: string }> | undefined;
  return Icon || LucideIcons.BookOpen;
}

export function ConceptDetailModal({
  concept,
  onClose,
  onNavigate,
}: {
  concept: Concept | null;
  onClose: () => void;
  onNavigate: (concept: Concept) => void;
}) {
  useEffect(() => {
    if (concept) {
      markConceptRead(concept.id);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [concept]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  const [showExplainer, setShowExplainer] = useState(false);

  const relatedConcepts = concept
    ? concept.relatedConceptIds
        .map((id) => CONCEPTS.find((c) => c.id === id))
        .filter(Boolean) as Concept[]
    : [];

  const explainer = concept
    ? EXPLAINERS.find((e) => e.id === (concept.explainerId || concept.id))
    : null;

  return (
    <AnimatePresence>
      {concept && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="fixed inset-x-4 bottom-0 top-auto z-50 max-h-[85vh] overflow-y-auto rounded-t-2xl border border-border bg-card p-6 shadow-2xl md:inset-auto md:left-1/2 md:top-1/2 md:max-h-[80vh] md:w-full md:max-w-lg md:-translate-x-1/2 md:-translate-y-1/2 md:rounded-2xl"
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute right-4 top-4 rounded-full p-2 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
              aria-label="Stäng"
            >
              <X size={18} />
            </button>

            {/* Header */}
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-secondary">
                {(() => {
                  const Icon = getIcon(concept.icon);
                  return <Icon size={22} className="text-foreground" />;
                })()}
              </div>
              <div>
                <span
                  className="text-[0.625rem] font-medium uppercase tracking-[0.12em] text-muted-foreground"
                  style={{
                    fontFamily: "var(--font-geist-mono), monospace",
                  }}
                >
                  {CATEGORIES[concept.category].label}
                </span>
                <h2
                  className="mt-0.5 text-[1.25rem] leading-[1.3] tracking-[-0.02em]"
                  style={{
                    fontFamily: "var(--font-heading), serif",
                    fontWeight: 400,
                  }}
                >
                  {concept.title}
                </h2>
                <div className="mt-1.5">
                  <DifficultyDots level={concept.difficulty} showLabel />
                </div>
              </div>
            </div>

            {/* Explanation */}
            <div className="mt-6">
              <p className="text-[0.9375rem] leading-[1.7] text-foreground">
                {concept.shortExplanation}
              </p>
            </div>

            {/* Analogy */}
            <div className="mt-4 rounded-lg bg-secondary/50 p-4">
              <p
                className="text-[0.6875rem] font-medium uppercase tracking-[0.1em] text-muted-foreground"
                style={{
                  fontFamily: "var(--font-geist-mono), monospace",
                }}
              >
                Vardagsanalogi
              </p>
              <p className="mt-2 text-[0.9375rem] italic leading-[1.7] text-foreground">
                &ldquo;{concept.analogy}&rdquo;
              </p>
            </div>

            {/* Explainer button */}
            {explainer && (
              <button
                onClick={() => setShowExplainer(true)}
                className="mt-4 flex w-full items-center gap-3 rounded-lg border border-border p-3.5 text-left transition-colors hover:bg-secondary"
              >
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-secondary">
                  <Play size={14} className="text-foreground" />
                </div>
                <div>
                  <p className="text-[0.8125rem] font-medium">Se hur det fungerar</p>
                  <p className="text-[0.6875rem] text-muted-foreground">{explainer.title}</p>
                </div>
              </button>
            )}

            {/* Related concepts */}
            {relatedConcepts.length > 0 && (
              <div className="mt-6">
                <p
                  className="text-[0.6875rem] font-medium uppercase tracking-[0.1em] text-muted-foreground"
                  style={{
                    fontFamily: "var(--font-geist-mono), monospace",
                  }}
                >
                  Relaterade begrepp
                </p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {relatedConcepts.map((related) => (
                    <button
                      key={related.id}
                      onClick={() => onNavigate(related)}
                      className="rounded-full border border-border px-3 py-1 text-[0.75rem] font-medium text-muted-foreground transition-colors hover:border-foreground hover:text-foreground"
                    >
                      {related.title}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </motion.div>

          {/* Explainer overlay */}
          <AnimatePresence>
            {showExplainer && explainer && (
              <AnimatedExplainerView
                explainer={explainer}
                onClose={() => setShowExplainer(false)}
              />
            )}
          </AnimatePresence>
        </>
      )}
    </AnimatePresence>
  );
}
