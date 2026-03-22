"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import * as LucideIcons from "lucide-react";
import type { NewBadge } from "@/lib/badge-checker";

function getIcon(name: string) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const Icon = (LucideIcons as any)[name] as React.ComponentType<{
    size?: number;
    className?: string;
  }> | undefined;
  return Icon || LucideIcons.Award;
}

const RARITY_COLORS: Record<string, string> = {
  common: "border-border bg-card",
  uncommon: "border-blue-500/30 bg-blue-500/5",
  rare: "border-purple-500/30 bg-purple-500/5",
  epic: "border-amber-500/30 bg-amber-500/5",
  legendary: "border-yellow-400/40 bg-yellow-400/5",
};

const RARITY_LABELS: Record<string, string> = {
  common: "Vanlig",
  uncommon: "Ovanlig",
  rare: "Sällsynt",
  epic: "Episk",
  legendary: "Legendarisk",
};

// Global listener pattern (same as XP toast)
const listeners: ((badge: NewBadge) => void)[] = [];

export function showBadgeNotification(badge: NewBadge) {
  listeners.forEach((fn) => fn(badge));
}

export function showBadgeNotifications(badges: NewBadge[]) {
  badges.forEach((b, i) => {
    setTimeout(() => showBadgeNotification(b), i * 800);
  });
}

export function BadgeNotificationContainer() {
  const [badge, setBadge] = useState<NewBadge | null>(null);

  useEffect(() => {
    const handler = (b: NewBadge) => {
      setBadge(b);
      setTimeout(() => setBadge(null), 4000);
    };
    listeners.push(handler);
    return () => {
      const idx = listeners.indexOf(handler);
      if (idx >= 0) listeners.splice(idx, 1);
    };
  }, []);

  return (
    <AnimatePresence>
      {badge && (
        <motion.div
          className="pointer-events-none fixed inset-0 z-[70] flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className={`pointer-events-auto rounded-2xl border p-6 shadow-2xl ${RARITY_COLORS[badge.rarity] || RARITY_COLORS.common}`}
            initial={{ scale: 0, rotate: -10 }}
            animate={{ scale: 1, rotate: 0 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ type: "spring", stiffness: 200, damping: 15 }}
          >
            <div className="flex flex-col items-center text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: [0, 1.3, 1] }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                {(() => {
                  const Icon = getIcon(badge.icon);
                  return (
                    <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-secondary">
                      <Icon size={32} className="text-foreground" />
                    </div>
                  );
                })()}
              </motion.div>
              <p className="mt-3 text-[0.6875rem] font-medium uppercase tracking-[0.15em] text-muted-foreground">
                Ny badge — {RARITY_LABELS[badge.rarity] || badge.rarity}
              </p>
              <p className="mt-1 text-[1.0625rem] font-medium">{badge.title}</p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
