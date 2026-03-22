"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Check, AlertTriangle, X } from "lucide-react";
import type { ScenarioCard as ScenarioCardType, ScenarioOption } from "@/lib/knowledge-bank";

const QUALITY_STYLES: Record<ScenarioOption["quality"], { border: string; bg: string; icon: typeof Check; iconColor: string }> = {
  good: { border: "border-emerald-500/30", bg: "bg-emerald-500/10", icon: Check, iconColor: "text-emerald-500" },
  ok: { border: "border-amber-500/30", bg: "bg-amber-500/10", icon: AlertTriangle, iconColor: "text-amber-500" },
  bad: { border: "border-rose-500/30", bg: "bg-rose-500/10", icon: X, iconColor: "text-rose-500" },
};

export function ScenarioCardComponent({
  scenario,
}: {
  scenario: ScenarioCardType;
}) {
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <div className="rounded-lg border border-border bg-card p-6">
      {/* Title */}
      <p
        className="text-[0.625rem] font-medium uppercase tracking-[0.15em] text-muted-foreground"
        style={{ fontFamily: "var(--font-geist-mono), monospace" }}
      >
        Scenario
      </p>
      <h3
        className="mt-2 text-[1.0625rem] leading-[1.4] tracking-[-0.01em]"
        style={{ fontFamily: "var(--font-heading), serif", fontWeight: 400 }}
      >
        {scenario.title}
      </h3>

      {/* Situation */}
      <p className="mt-3 text-[0.9375rem] leading-[1.7] text-muted-foreground">
        {scenario.situation}
      </p>

      {/* Options */}
      <p className="mt-5 text-[0.8125rem] font-medium">Vad gör du?</p>
      <div className="mt-2 space-y-2">
        {scenario.options.map((opt, i) => {
          const isSelected = selected === i;
          const style = QUALITY_STYLES[opt.quality];

          return (
            <div key={i}>
              <button
                onClick={() => setSelected(i)}
                disabled={selected !== null}
                className={`flex w-full items-start gap-3 rounded-lg border p-3.5 text-left text-[0.875rem] transition-all disabled:cursor-default ${
                  isSelected
                    ? `${style.border} ${style.bg}`
                    : selected !== null
                    ? "border-border opacity-50"
                    : "border-border hover:bg-secondary"
                }`}
              >
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-border text-[0.625rem] font-medium">
                  {String.fromCharCode(65 + i)}
                </span>
                <span className="flex-1">{opt.label}</span>
                {isSelected && (() => {
                  const Icon = style.icon;
                  return <Icon size={16} className={`mt-0.5 shrink-0 ${style.iconColor}`} />;
                })()}
              </button>

              {/* Feedback */}
              {isSelected && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  className="mt-1 overflow-hidden rounded-lg bg-secondary/50 p-3"
                >
                  <p className="text-[0.8125rem] leading-[1.6] text-muted-foreground">
                    {opt.feedback}
                  </p>
                </motion.div>
              )}
            </div>
          );
        })}
      </div>

      {/* Reset */}
      {selected !== null && (
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={() => setSelected(null)}
          className="mt-4 text-[0.75rem] font-medium text-muted-foreground underline underline-offset-2 hover:text-foreground"
        >
          Prova igen
        </motion.button>
      )}
    </div>
  );
}
