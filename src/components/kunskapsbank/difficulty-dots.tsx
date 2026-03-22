"use client";

import { DIFFICULTY_LEVELS, type DifficultyLevel } from "@/lib/knowledge-bank";

const DOT_COLORS: Record<DifficultyLevel, string> = {
  grundlaggande: "bg-emerald-500",
  mellanniva: "bg-amber-500",
  fordjupning: "bg-rose-500",
};

export function DifficultyDots({
  level,
  showLabel = false,
}: {
  level: DifficultyLevel;
  showLabel?: boolean;
}) {
  const { label, dots } = DIFFICULTY_LEVELS[level];
  const color = DOT_COLORS[level];

  return (
    <div className="flex items-center gap-1.5">
      <div className="flex gap-0.5">
        {[1, 2, 3].map((i) => (
          <span
            key={i}
            className={`inline-block h-1.5 w-1.5 rounded-full ${
              i <= dots ? color : "bg-muted"
            }`}
          />
        ))}
      </div>
      {showLabel && (
        <span
          className="text-[0.625rem] uppercase tracking-[0.08em] text-muted-foreground"
          style={{ fontFamily: "var(--font-geist-mono), monospace" }}
        >
          {label}
        </span>
      )}
    </div>
  );
}
