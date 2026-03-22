"use client";

import * as LucideIcons from "lucide-react";
import type { StoryboardPanel } from "@/lib/knowledge-bank";

function getIcon(name: string) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const Icon = (LucideIcons as any)[name] as React.ComponentType<{
    size?: number;
    className?: string;
  }> | undefined;
  return Icon || LucideIcons.BookOpen;
}

export function StoryboardPanelCard({
  panel,
  index,
  total,
  onConceptClick,
}: {
  panel: StoryboardPanel;
  index: number;
  total: number;
  onConceptClick?: (conceptId: string) => void;
}) {
  const Icon = getIcon(panel.icon);

  return (
    <div className="flex h-full min-w-0 shrink-0 snap-center flex-col items-center justify-center px-4 text-center">
      {/* Step indicator */}
      <p
        className="text-[0.625rem] font-medium uppercase tracking-[0.15em] text-muted-foreground"
        style={{ fontFamily: "var(--font-geist-mono), monospace" }}
      >
        {index + 1} / {total}
      </p>

      {/* Icon */}
      <div className="mt-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-secondary">
        <Icon size={28} className="text-foreground" />
      </div>

      {/* Title */}
      <h3
        className="mt-5 text-[1.125rem] leading-[1.3] tracking-[-0.02em] sm:text-[1.375rem]"
        style={{
          fontFamily: "var(--font-heading), serif",
          fontWeight: 400,
        }}
      >
        {panel.title}
      </h3>

      {/* Text */}
      <p className="mt-3 max-w-[28rem] text-[0.9375rem] leading-[1.7] text-muted-foreground">
        {panel.text}
      </p>

      {/* Link to concept */}
      {panel.conceptId && onConceptClick && (
        <button
          onClick={() => onConceptClick(panel.conceptId!)}
          className="mt-4 text-[0.75rem] font-medium text-foreground underline underline-offset-2 hover:text-muted-foreground"
        >
          Se begrepp i ordlistan →
        </button>
      )}
    </div>
  );
}
