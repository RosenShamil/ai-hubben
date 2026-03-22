"use client";

import {
  CATEGORIES,
  DIFFICULTY_LEVELS,
  type ConceptCategory,
  type DifficultyLevel,
} from "@/lib/knowledge-bank";

export function CategoryFilter({
  activeCategory,
  activeDifficulty,
  onCategoryChange,
  onDifficultyChange,
  conceptCounts,
}: {
  activeCategory: ConceptCategory | "all";
  activeDifficulty: DifficultyLevel | "all";
  onCategoryChange: (cat: ConceptCategory | "all") => void;
  onDifficultyChange: (diff: DifficultyLevel | "all") => void;
  conceptCounts: Record<string, number>;
}) {
  return (
    <div className="space-y-3">
      {/* Category pills */}
      <div className="flex flex-wrap gap-2">
        <FilterPill
          label={`Alla (${conceptCounts["all"] ?? 0})`}
          active={activeCategory === "all"}
          onClick={() => onCategoryChange("all")}
        />
        {(Object.keys(CATEGORIES) as ConceptCategory[]).map((key) => (
          <FilterPill
            key={key}
            label={`${CATEGORIES[key].label} (${conceptCounts[key] ?? 0})`}
            active={activeCategory === key}
            onClick={() => onCategoryChange(key)}
          />
        ))}
      </div>

      {/* Difficulty pills */}
      <div className="flex flex-wrap gap-2">
        <FilterPill
          label="Alla nivåer"
          active={activeDifficulty === "all"}
          onClick={() => onDifficultyChange("all")}
          small
        />
        {(Object.keys(DIFFICULTY_LEVELS) as DifficultyLevel[]).map((key) => (
          <FilterPill
            key={key}
            label={DIFFICULTY_LEVELS[key].label}
            active={activeDifficulty === key}
            onClick={() => onDifficultyChange(key)}
            small
          />
        ))}
      </div>
    </div>
  );
}

function FilterPill({
  label,
  active,
  onClick,
  small = false,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
  small?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      className={`rounded-full border transition-all ${
        small
          ? "px-3 py-1 text-[0.75rem]"
          : "px-3.5 py-1.5 text-[0.8125rem]"
      } font-medium`}
      style={{
        borderColor: active ? "var(--foreground)" : "var(--border)",
        backgroundColor: active ? "var(--foreground)" : "transparent",
        color: active ? "var(--background)" : "var(--muted-foreground)",
      }}
    >
      {label}
    </button>
  );
}
