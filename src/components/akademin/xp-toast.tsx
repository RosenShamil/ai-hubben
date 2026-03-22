"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles } from "lucide-react";

interface XPToastState {
  amount: number;
  label: string;
  id: number;
}

let toastId = 0;
const listeners: ((toast: XPToastState) => void)[] = [];

/** Call this from anywhere to show an XP toast */
export function showXPToast(amount: number, label: string) {
  toastId += 1;
  const toast = { amount, label, id: toastId };
  listeners.forEach((fn) => fn(toast));
}

/** Mount this once in the layout or academy page */
export function XPToastContainer() {
  const [toasts, setToasts] = useState<XPToastState[]>([]);

  useEffect(() => {
    const handler = (toast: XPToastState) => {
      setToasts((prev) => [...prev, toast]);
      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== toast.id));
      }, 2500);
    };
    listeners.push(handler);
    return () => {
      const idx = listeners.indexOf(handler);
      if (idx >= 0) listeners.splice(idx, 1);
    };
  }, []);

  return (
    <div className="pointer-events-none fixed top-20 right-6 z-[60] flex flex-col items-end gap-2">
      <AnimatePresence>
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, y: -20, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.9 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 shadow-lg"
          >
            <Sparkles size={14} className="text-amber-500" />
            <span className="text-[0.8125rem] font-bold tabular-nums text-foreground">
              +{toast.amount} XP
            </span>
            <span className="text-[0.75rem] text-muted-foreground">
              {toast.label}
            </span>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
