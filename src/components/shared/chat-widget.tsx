"use client";

import { useState, useEffect, useCallback } from "react";
import { MessageCircle, X, Maximize2, Minimize2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const IFRAME_URL =
  "https://katrineholm.intric.ai/embed/iframe/392eba43-f6e4-4b0d-a4e9-26a51d1f3eb8";

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [iframeLoaded, setIframeLoaded] = useState(false);
  const [showPulse, setShowPulse] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Stop pulse animation after 8 seconds
  useEffect(() => {
    const timer = setTimeout(() => setShowPulse(false), 8000);
    return () => clearTimeout(timer);
  }, []);

  const handleOpen = useCallback(() => {
    setIsOpen(true);
    setShowPulse(false);
  }, []);

  const handleClose = useCallback(() => {
    setIsOpen(false);
  }, []);

  return (
    <>
      {/* ── Floating bubble ── */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            key="chat-bubble"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            onClick={handleOpen}
            aria-label="Öppna chatt med iKAI"
            className="fixed z-[997] flex h-12 w-12 md:h-16 md:w-16 items-center justify-center rounded-full shadow-lg transition-transform hover:scale-110 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary cursor-pointer"
            style={{
              background:
                "linear-gradient(135deg, #c83228 0%, #e5651a 50%, #f5a623 100%)",
              boxShadow:
                "0 8px 32px rgba(200,50,40,0.35), 0 4px 12px rgba(0,0,0,0.15), inset 0 1px 0 rgba(255,255,255,0.2)",
              right: "var(--chat-bubble-right)",
              bottom: "var(--chat-bubble-bottom)",
              left: "var(--chat-bubble-left)",
            }}
          >
            {/* Pulse rings */}
            {showPulse && (
              <>
                <span className="absolute inset-0 rounded-full animate-ping bg-primary/30" />
                <span
                  className="absolute inset-0 rounded-full bg-primary/20"
                  style={{
                    animation: "ping 1.5s cubic-bezier(0,0,0.2,1) infinite 0.3s",
                  }}
                />
              </>
            )}
            <MessageCircle size={22} className="text-white relative z-10 md:!h-7 md:!w-7" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* ── Chat window ── */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="chat-window"
            initial={{ scale: 0.85, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.85, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="fixed z-[1000] flex flex-col overflow-hidden bg-card border border-border max-md:inset-0 max-md:!w-auto max-md:!h-auto md:bottom-8 md:right-8 md:rounded-2xl"
            style={{
              width: isFullscreen ? 800 : 400,
              height: isFullscreen ? 700 : 600,
              transformOrigin: "bottom right",
              boxShadow:
                "0 24px 80px rgba(0,0,0,0.16), 0 8px 24px rgba(0,0,0,0.08), 0 0 0 1px rgba(0,0,0,0.04)",
            }}
          >
            {/* ── Header ── */}
            <div
              className="relative flex items-center justify-between px-5 py-4 shrink-0"
              style={{
                background:
                  "linear-gradient(135deg, #330f1f 0%, #c83228 40%, #e5651a 70%, #f5a623 100%)",
              }}
            >
              {/* Gradient accent line at bottom of header */}
              <div
                className="absolute bottom-0 left-0 right-0 h-[3px]"
                style={{
                  background:
                    "linear-gradient(90deg, #c83228 0%, #e5651a 50%, #f5a623 100%)",
                }}
              />

              <div className="flex items-center gap-3">
                {/* Online dot */}
                <span className="relative flex h-2.5 w-2.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#f5a623] opacity-60" />
                  <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[#f5a623]" />
                </span>
              </div>

              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => setIsFullscreen(!isFullscreen)}
                  aria-label={isFullscreen ? "Minimera" : "Helskärm"}
                  className="hidden md:flex h-7 w-7 items-center justify-center rounded-full bg-white/10 transition-colors hover:bg-white/25 cursor-pointer"
                >
                  {isFullscreen ? (
                    <Minimize2 size={14} className="text-white" />
                  ) : (
                    <Maximize2 size={14} className="text-white" />
                  )}
                </button>
                <button
                  onClick={handleClose}
                  aria-label="Stäng chatt"
                  className="flex h-7 w-7 items-center justify-center rounded-full bg-white/15 transition-colors hover:bg-white/30 cursor-pointer"
                >
                  <X size={16} className="text-white" />
                </button>
              </div>
            </div>

            {/* ── Chat body (iframe) ── */}
            <div className="relative flex-1 min-h-0 bg-background">
              {/* Loading skeleton */}
              {!iframeLoaded && (
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
                  <div className="h-8 w-8 rounded-full border-2 border-primary/30 border-t-primary animate-spin" />
                  <p
                    className="text-[0.6875rem] uppercase tracking-[0.12em] text-muted-foreground"
                    style={{
                      fontFamily: "var(--font-geist-mono), monospace",
                    }}
                  >
                    Laddar&hellip;
                  </p>
                </div>
              )}

              <iframe
                src={IFRAME_URL}
                title="iKAI AI-assistent"
                allow="clipboard-write"
                sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
                onLoad={() => setIframeLoaded(true)}
                className="h-full w-full border-0"
                style={{
                  opacity: iframeLoaded ? 1 : 0,
                  transition: "opacity 0.3s ease",
                }}
              />
            </div>

            {/* ── Footer accent line ── */}
            <div
              className="h-[3px] shrink-0"
              style={{
                background:
                  "linear-gradient(90deg, #c83228 0%, #e5651a 50%, #f5a623 100%)",
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Responsive positioning via CSS custom properties ── */}
      <style jsx global>{`
        :root {
          /* Mobile: bottom-right, above tab bar */
          --chat-bubble-left: auto;
          --chat-bubble-right: 1rem;
          --chat-bubble-bottom: 6.5rem;
        }

        @media (min-width: 768px) {
          :root {
            /* Desktop: bottom-right */
            --chat-bubble-left: auto;
            --chat-bubble-right: 2rem;
            --chat-bubble-bottom: 2rem;
          }
        }
      `}</style>
    </>
  );
}
