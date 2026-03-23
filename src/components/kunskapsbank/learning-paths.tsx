"use client";

import { useState, useEffect } from "react";
import { Clock, ChevronRight, Check } from "lucide-react";
import * as LucideIcons from "lucide-react";
import { AnimatePresence } from "framer-motion";
import { FadeIn } from "@/components/shared/fade-in";
import { LEARNING_PATHS, CONCEPTS, type LearningPathWithPanels } from "@/lib/knowledge-bank";
import { getProgress } from "@/lib/knowledge-progress";
import { StoryboardLesson } from "./storyboard-lesson";

function getIcon(name: string) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const Icon = (LucideIcons as any)[name] as React.ComponentType<{
    size?: number;
    className?: string;
  }> | undefined;
  return Icon || LucideIcons.BookOpen;
}

export function LearningPaths({
  onConceptClick,
}: {
  onConceptClick: (conceptId: string) => void;
}) {
  const [activePath, setActivePath] = useState<LearningPathWithPanels | null>(
    null
  );
  const [progress, setProgress] = useState<string[]>([]);

  useEffect(() => {
    setProgress(getProgress().readConcepts);
  }, [activePath]);

  return (
    <>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {LEARNING_PATHS.map((path, i) => {
          const Icon = getIcon(path.icon);
          const completedCount = path.conceptIds.filter((id) =>
            progress.includes(id)
          ).length;
          const totalCount = path.conceptIds.length;
          const isCompleted = completedCount === totalCount;

          return (
            <FadeIn key={path.id} delay={i * 0.05}>
              <button
                onClick={() => setActivePath(path)}
                className="group flex h-full w-full flex-col rounded-lg border border-border bg-card p-6 text-left transition-all duration-300 hover:bg-secondary hover:shadow-lg"
              >
                <div className="flex items-start justify-between">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-secondary">
                    <Icon size={18} className="text-foreground" />
                  </div>
                  {isCompleted && (
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-500/15">
                      <Check size={14} className="text-emerald-500" />
                    </div>
                  )}
                </div>

                <h3 className="mt-3 text-[0.9375rem] font-medium leading-[1.4] tracking-tight">
                  {path.title}
                </h3>

                <p className="mt-2 line-clamp-2 text-[0.8125rem] leading-[1.6] text-foreground/85">
                  {path.description}
                </p>

                <div className="mt-auto flex items-center justify-between pt-4">
                  <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1 text-[0.75rem] text-muted-foreground">
                      <Clock size={12} />
                      ~{path.estimatedMinutes} min
                    </span>
                    <span className="text-[0.75rem] text-muted-foreground">
                      {completedCount}/{totalCount} begrepp
                    </span>
                  </div>
                  <ChevronRight
                    size={16}
                    className="text-muted-foreground transition-transform group-hover:translate-x-0.5"
                  />
                </div>

                {/* Mini progress */}
                {completedCount > 0 && !isCompleted && (
                  <div className="mt-3 h-1 overflow-hidden rounded-full bg-secondary">
                    <div
                      className="h-full rounded-full bg-foreground/30"
                      style={{
                        width: `${(completedCount / totalCount) * 100}%`,
                      }}
                    />
                  </div>
                )}
              </button>
            </FadeIn>
          );
        })}
      </div>

      {/* Storyboard overlay */}
      <AnimatePresence>
        {activePath && (
          <StoryboardLesson
            path={activePath}
            onClose={() => setActivePath(null)}
            onConceptClick={(id) => {
              setActivePath(null);
              onConceptClick(id);
            }}
          />
        )}
      </AnimatePresence>
    </>
  );
}
