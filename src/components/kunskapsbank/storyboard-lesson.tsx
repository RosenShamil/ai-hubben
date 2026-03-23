"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSwipeNavigation } from "@/hooks/use-swipe-navigation";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { BRAND_GRADIENT } from "@/lib/constants";
import type { LearningPathWithPanels } from "@/lib/knowledge-bank";
import { markConceptRead } from "@/lib/knowledge-progress";
import { StoryboardPanelCard } from "./storyboard-panel";

export function StoryboardLesson({
  path,
  onClose,
  onConceptClick,
}: {
  path: LearningPathWithPanels;
  onClose: () => void;
  onConceptClick: (conceptId: string) => void;
}) {
  const [current, setCurrent] = useState(0);
  const total = path.panels.length;

  const goNext = useCallback(() => {
    if (current < total - 1) {
      const conceptId = path.panels[current].conceptId;
      if (conceptId) markConceptRead(conceptId);
      setCurrent((c) => c + 1);
    }
  }, [current, total, path.panels]);

  const goPrev = useCallback(() => {
    if (current > 0) setCurrent((c) => c - 1);
  }, [current]);

  const { dragProps } = useSwipeNavigation({
    onSwipeLeft: goNext,
    onSwipeRight: goPrev,
  });

  const isLast = current === total - 1;
  const isFirst = current === 0;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex flex-col bg-background"
    >
      {/* Top bar */}
      <div className="flex items-center justify-between border-b border-border px-4 py-3">
        <p className="text-[0.8125rem] font-medium">{path.title}</p>
        <button
          onClick={onClose}
          className="rounded-full p-1.5 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
        >
          <X size={18} />
        </button>
      </div>

      {/* Progress bar */}
      <div className="h-1 bg-secondary">
        <div
          className="h-full transition-all duration-500"
          style={{
            width: `${((current + 1) / total) * 100}%`,
            background: BRAND_GRADIENT,
          }}
        />
      </div>

      {/* Panel content — swipe left/right to navigate */}
      <div className="flex flex-1 items-center justify-center overflow-hidden px-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            {...dragProps}
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -60 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="w-full max-w-xl"
            style={{ touchAction: "pan-y" }}
          >
            <StoryboardPanelCard
              panel={path.panels[current]}
              index={current}
              total={total}
              onConceptClick={onConceptClick}
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation */}
      <div className="border-t border-border px-4 py-4">
        <div className="mx-auto flex max-w-xl items-center justify-between">
          <button
            onClick={goPrev}
            disabled={isFirst}
            className="flex items-center gap-1.5 rounded-lg px-4 py-2 text-[0.8125rem] font-medium text-muted-foreground transition-colors hover:text-foreground disabled:opacity-30"
          >
            <ChevronLeft size={16} />
            Föregående
          </button>

          {/* Dots */}
          <div className="flex gap-1.5">
            {path.panels.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`h-2 rounded-full transition-all ${
                  i === current
                    ? "w-6 bg-foreground"
                    : i < current
                    ? "w-2 bg-foreground/40"
                    : "w-2 bg-muted"
                }`}
              />
            ))}
          </div>

          {isLast ? (
            <button
              onClick={() => {
                const conceptId = path.panels[current].conceptId;
                if (conceptId) markConceptRead(conceptId);
                onClose();
              }}
              className="rounded-lg bg-foreground px-4 py-2 text-[0.8125rem] font-medium text-background transition-colors hover:bg-foreground/90"
            >
              Slutför ✓
            </button>
          ) : (
            <button
              onClick={goNext}
              className="flex items-center gap-1.5 rounded-lg bg-foreground px-4 py-2 text-[0.8125rem] font-medium text-background transition-colors hover:bg-foreground/90"
            >
              Nästa
              <ChevronRight size={16} />
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
}
