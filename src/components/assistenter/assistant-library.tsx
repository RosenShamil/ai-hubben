"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Search, Plus } from "lucide-react";
import { FadeIn } from "@/components/shared/fade-in";
import { SubmitAssistantModal } from "@/components/shared/submit-assistant-modal";
import { BRAND_GRADIENT } from "@/lib/constants";
import type { IntricAssistant } from "@/lib/intric";

// Color palette for letter avatars (OKLCH-based)
const AVATAR_COLORS = [
  "#e74c3c", "#e67e22", "#f1c40f", "#2ecc71",
  "#1abc9c", "#3498db", "#9b59b6", "#e91e63",
  "#00bcd4", "#ff9800", "#8bc34a", "#673ab7",
];

function getAvatarColor(name: string) {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  return AVATAR_COLORS[Math.abs(hash) % AVATAR_COLORS.length];
}

function AssistantCard({ assistant: a, delay }: { assistant: IntricAssistant; delay: number }) {
  return (
    <FadeIn delay={delay}>
      <Link href={`/assistenter/${a.id}`}>
        <div className="group relative cursor-pointer rounded-lg transition-all duration-300">
          {/* Travel flash */}
          <div className="absolute -inset-px rounded-lg overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div
              className="absolute inset-0 opacity-0 group-hover:animate-[travel-flash_1.125s_linear_forwards]"
              style={{
                background:
                  "conic-gradient(from 0deg, transparent 0%, transparent 70%, white 85%, white 95%, transparent 100%)",
              }}
            />
            <div
              className="absolute inset-0 opacity-40"
              style={{ background: BRAND_GRADIENT }}
            />
          </div>
          {/* Card */}
          <div className="relative flex h-full flex-col gap-4 rounded-lg border border-border bg-card p-6 transition-all duration-300 group-hover:bg-secondary group-hover:shadow-lg">
            <div className="flex items-center gap-3">
              {a.icon_url ? (
                <img
                  src={a.icon_url}
                  alt={a.name}
                  className="h-10 w-10 rounded-md border border-border object-cover"
                />
              ) : (
                <div
                  className="flex h-10 w-10 items-center justify-center rounded-md text-[0.875rem] font-semibold text-white"
                  style={{
                    backgroundColor: getAvatarColor(a.name),
                    fontFamily: "var(--font-geist-mono), monospace",
                  }}
                >
                  {a.name[0]}
                </div>
              )}
              <div className="min-w-0 flex-1">
                <h3 className="truncate text-[1rem] font-medium tracking-tight">
                  {a.name}
                </h3>
                <p className="text-[0.8125rem] text-muted-foreground">
                  {a.organization}
                </p>
              </div>
            </div>
            <p className="flex-1 line-clamp-2 text-[0.875rem] leading-[1.6] text-foreground/85">
              {a.description}
            </p>
          </div>
        </div>
      </Link>
    </FadeIn>
  );
}

export function AssistantLibrary({
  assistants,
}: {
  assistants: IntricAssistant[];
}) {
  const [query, setQuery] = useState("");
  const [modalOpen, setModalOpen] = useState(false);

  const filtered = useMemo(() => {
    if (!query) return assistants;
    const q = query.toLowerCase();
    return assistants.filter(
      (a) =>
        a.name.toLowerCase().includes(q) ||
        a.description.toLowerCase().includes(q) ||
        a.organization.toLowerCase().includes(q)
    );
  }, [query, assistants]);

  const katrineholm = useMemo(
    () => filtered.filter((a) => a.organization.toLowerCase() === "katrineholms kommun"),
    [filtered]
  );
  const ovriga = useMemo(
    () => filtered.filter((a) => a.organization.toLowerCase() !== "katrineholms kommun"),
    [filtered]
  );

  return (
    <>
      {/* Header */}
      <section className="mx-auto max-w-[68.75rem] px-6 pt-20 pb-12 md:pt-28 md:pb-16">
        <FadeIn>
          <div className="flex items-end justify-between">
            <div>
              <p
                className="text-[0.6875rem] font-medium uppercase tracking-[0.15em] text-muted-foreground"
                style={{ fontFamily: "var(--font-geist-mono), monospace" }}
              >
                Bibliotek
              </p>
              <h1
                className="mt-4 text-[1.75rem] leading-[1.1] tracking-[-0.04em] sm:text-[2.75rem] md:text-[4.5rem]"
                style={{
                  fontFamily: "var(--font-bodoni), serif",
                  fontWeight: 400,
                }}
              >
                Assistenter
              </h1>
            </div>
            <button
              onClick={() => setModalOpen(true)}
              className="hidden items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-[0.8125rem] font-medium uppercase tracking-[0.01em] text-primary-foreground transition-all duration-150 active:scale-[0.98] md:flex"
              style={{
                fontFamily: "var(--font-geist-mono), monospace",
                boxShadow:
                  "0px 2px 1px 0px rgba(255,255,255,0.15) inset, 0px -2px 1px 0px rgba(0,0,0,0.05) inset",
              }}
            >
              <Plus size={16} />
              Lägg till
            </button>
          </div>
          <p className="mt-6 max-w-[42rem] text-[1.0625rem] leading-[1.7] text-muted-foreground">
            Utforska kommunens AI-assistenter. Sök och hitta verktyg som
            förenklar din vardag.
          </p>
        </FadeIn>
      </section>

      {/* Search */}
      <section className="mx-auto max-w-[68.75rem] px-6">
        <FadeIn delay={0.1}>
          <div className="relative">
            <Search
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground"
            />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Sök assistenter..."
              aria-label="Sök assistenter"
              className="w-full rounded-lg border border-border bg-card py-3.5 pl-12 pr-5 text-[0.9375rem] outline-none transition-colors focus:border-foreground"
            />
          </div>
        </FadeIn>
      </section>

      {/* Gradient divider */}
      <div className="mx-auto mt-12 max-w-[68.75rem] px-6">
        <div className="h-px" style={{ background: BRAND_GRADIENT }} />
      </div>

      {/* Assistants */}
      <section className="mx-auto max-w-[68.75rem] px-6 py-12 md:py-16">
        {filtered.length === 0 ? (
          <div className="py-20 text-center">
            <p className="text-[1.125rem] font-medium">
              Inga assistenter hittades
            </p>
            <p className="mt-2 text-[0.875rem] text-foreground/85">
              Prova att ändra din sökning.
            </p>
          </div>
        ) : (
          <div className="space-y-16">
            {/* Katrineholms kommun */}
            {katrineholm.length > 0 && (
              <div>
                <div className="mb-6">
                  <p
                    className="text-[0.6875rem] font-medium uppercase tracking-[0.15em] text-muted-foreground"
                    style={{ fontFamily: "var(--font-geist-mono), monospace" }}
                  >
                    Katrineholms kommun
                  </p>
                  <h2
                    className="mt-1 text-[1.25rem] tracking-[-0.02em] sm:text-[1.5rem]"
                    style={{ fontFamily: "var(--font-bodoni), serif", fontWeight: 400 }}
                  >
                    Våra assistenter
                  </h2>
                </div>
                <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                  {katrineholm.map((a, i) => (
                    <AssistantCard key={a.id} assistant={a} delay={i * 0.05} />
                  ))}
                </div>
              </div>
            )}

            {/* Övriga Sverige */}
            {ovriga.length > 0 && (
              <div>
                <div className="mb-6">
                  <p
                    className="text-[0.6875rem] font-medium uppercase tracking-[0.15em] text-muted-foreground"
                    style={{ fontFamily: "var(--font-geist-mono), monospace" }}
                  >
                    Övriga Sverige
                  </p>
                  <h2
                    className="mt-1 text-[1.25rem] tracking-[-0.02em] sm:text-[1.5rem]"
                    style={{ fontFamily: "var(--font-bodoni), serif", fontWeight: 400 }}
                  >
                    Fler assistenter
                  </h2>
                </div>
                <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                  {ovriga.map((a, i) => (
                    <AssistantCard key={a.id} assistant={a} delay={i * 0.05} />
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </section>

      {/* Mobile FAB */}
      <button
        onClick={() => setModalOpen(true)}
        className="fixed bottom-24 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg transition-all active:scale-95 md:hidden"
        style={{
          boxShadow:
            "0 4px 24px rgba(0,0,0,0.2), 0px 2px 1px 0px rgba(255,255,255,0.15) inset",
        }}
        aria-label="Lägg till assistent"
      >
        <Plus size={24} />
      </button>

      {/* Submit modal */}
      <SubmitAssistantModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
      />
    </>
  );
}
