"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import * as LucideIcons from "lucide-react";
import { BRAND_GRADIENT } from "@/lib/constants";
import type { AnimatedExplainer } from "@/lib/knowledge-bank";

function getIcon(name: string) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const Icon = (LucideIcons as any)[name] as React.ComponentType<{
    size?: number;
    className?: string;
  }> | undefined;
  return Icon || LucideIcons.BookOpen;
}

export function AnimatedExplainerView({
  explainer,
  onClose,
}: {
  explainer: AnimatedExplainer;
  onClose: () => void;
}) {
  const [current, setCurrent] = useState(0);
  const steps = explainer.steps;
  const total = steps.length;
  const step = steps[current];
  const Icon = getIcon(step.icon || "Circle");

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex flex-col bg-background"
    >
      {/* Top bar */}
      <div className="flex items-center justify-between border-b border-border px-4 py-3">
        <div>
          <p
            className="text-[0.5625rem] font-medium uppercase tracking-[0.15em] text-muted-foreground"
            style={{ fontFamily: "var(--font-geist-mono), monospace" }}
          >
            Animerad förklaring
          </p>
          <p className="text-[0.8125rem] font-medium">{explainer.title}</p>
        </div>
        <button
          onClick={onClose}
          className="rounded-full p-2 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
          aria-label="Stäng"
        >
          <X size={18} />
        </button>
      </div>

      {/* Progress */}
      <div className="h-1 bg-secondary">
        <div
          className="h-full transition-all duration-500"
          style={{
            width: `${((current + 1) / total) * 100}%`,
            background: BRAND_GRADIENT,
          }}
        />
      </div>

      {/* Content */}
      <div className="flex flex-1 items-center justify-center overflow-hidden px-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.35, ease: "easeInOut" }}
            className="w-full max-w-lg text-center"
          >
            {/* Step number */}
            <p
              className="text-[0.625rem] font-medium uppercase tracking-[0.15em] text-muted-foreground"
              style={{ fontFamily: "var(--font-geist-mono), monospace" }}
            >
              Steg {current + 1} av {total}
            </p>

            {/* Animated icon */}
            <motion.div
              initial={{ scale: 0.5, rotate: -10 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ duration: 0.4, ease: "easeOut", delay: 0.1 }}
              className="mx-auto mt-5 flex h-20 w-20 items-center justify-center rounded-2xl bg-secondary"
            >
              <Icon size={36} className="text-foreground" />
            </motion.div>

            {/* Label */}
            <motion.h3
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="mt-5 text-[1.25rem] leading-[1.3] tracking-[-0.02em]"
              style={{
                fontFamily: "var(--font-heading), serif",
                fontWeight: 400,
              }}
            >
              {step.label}
            </motion.h3>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="mt-3 text-[0.9375rem] leading-[1.7] text-foreground/85"
            >
              {step.description}
            </motion.p>

            {/* Connection line to next */}
            {current < total - 1 && (
              <motion.div
                initial={{ scaleY: 0 }}
                animate={{ scaleY: 1 }}
                transition={{ delay: 0.5, duration: 0.3 }}
                className="mx-auto mt-5 h-8 w-px origin-top bg-border"
              />
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation */}
      <div className="border-t border-border px-4 py-4">
        <div className="mx-auto flex max-w-lg items-center justify-between">
          <button
            onClick={() => setCurrent((c) => Math.max(0, c - 1))}
            disabled={current === 0}
            className="flex items-center gap-1.5 rounded-lg px-4 py-2 text-[0.8125rem] font-medium text-muted-foreground transition-colors hover:text-foreground disabled:opacity-30"
          >
            <ChevronLeft size={16} />
            Föregående
          </button>

          {/* Dots */}
          <div className="flex gap-1.5">
            {steps.map((_, i) => (
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

          {current < total - 1 ? (
            <button
              onClick={() => setCurrent((c) => c + 1)}
              className="flex items-center gap-1.5 rounded-lg bg-foreground px-4 py-2 text-[0.8125rem] font-medium text-background transition-colors hover:bg-foreground/90"
            >
              Nästa
              <ChevronRight size={16} />
            </button>
          ) : (
            <button
              onClick={onClose}
              className="rounded-lg bg-foreground px-4 py-2 text-[0.8125rem] font-medium text-background transition-colors hover:bg-foreground/90"
            >
              Stäng ✓
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
}
