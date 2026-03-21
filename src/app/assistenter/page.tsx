"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Search, Plus } from "lucide-react";
import { FadeIn } from "@/components/shared/fade-in";
import { SubmitAssistantModal } from "@/components/shared/submit-assistant-modal";
import { ASSISTANTS, CATEGORIES } from "@/lib/mock-assistants";
import { BRAND_GRADIENT } from "@/lib/constants";

export default function AssistenterPage() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("Alla");
  const [modalOpen, setModalOpen] = useState(false);

  const filtered = useMemo(() => {
    return ASSISTANTS.filter((a) => {
      const matchesQuery =
        !query ||
        a.name.toLowerCase().includes(query.toLowerCase()) ||
        a.description.toLowerCase().includes(query.toLowerCase()) ||
        a.organization.toLowerCase().includes(query.toLowerCase());
      const matchesCategory =
        category === "Alla" || a.category === category;
      return matchesQuery && matchesCategory;
    });
  }, [query, category]);

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
                className="mt-4 text-[2.75rem] leading-[1.1] tracking-[-0.04em] md:text-[4.5rem]"
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
            Utforska kommunens AI-assistenter. Sök, filtrera och hitta verktyg
            som förenklar din vardag.
          </p>
        </FadeIn>
      </section>

      {/* Search + Filters */}
      <section className="mx-auto max-w-[68.75rem] px-6">
        <FadeIn delay={0.1}>
          {/* Search */}
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
              className="w-full rounded-lg border border-border bg-card py-3.5 pl-12 pr-5 text-[0.9375rem] outline-none transition-colors focus:border-foreground"
            />
          </div>

          {/* Category pills */}
          <div className="mt-4 flex flex-wrap gap-2">
            {CATEGORIES.map((cat) => {
              const active = category === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setCategory(cat)}
                  className="rounded-full border px-3.5 py-1.5 text-[0.8125rem] font-medium transition-all"
                  style={{
                    fontFamily: "var(--font-geist-mono), monospace",
                    borderColor: active
                      ? "var(--foreground)"
                      : "var(--border)",
                    backgroundColor: active
                      ? "var(--foreground)"
                      : "transparent",
                    color: active
                      ? "var(--background)"
                      : "var(--muted-foreground)",
                  }}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </FadeIn>
      </section>

      {/* Gradient divider */}
      <div className="mx-auto mt-12 max-w-[68.75rem] px-6">
        <div className="h-px" style={{ background: BRAND_GRADIENT }} />
      </div>

      {/* Grid */}
      <section className="mx-auto max-w-[68.75rem] px-6 py-12 md:py-16">
        {filtered.length === 0 ? (
          <div className="py-20 text-center">
            <p className="text-[1.125rem] font-medium">
              Inga assistenter hittades
            </p>
            <p className="mt-2 text-[0.875rem] text-muted-foreground">
              Prova att ändra din sökning eller dina filter.
            </p>
          </div>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((a, i) => (
              <FadeIn key={a.slug} delay={i * 0.05}>
                <Link href={`/assistenter/${a.slug}`}>
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
                    <div className="relative flex flex-col gap-4 rounded-lg border border-border bg-card p-6 transition-all duration-300 group-hover:bg-secondary group-hover:shadow-lg">
                      <div className="flex items-center gap-3">
                        <div
                          className="flex h-10 w-10 items-center justify-center rounded-md border border-border bg-secondary text-[0.875rem] font-medium"
                          style={{
                            fontFamily:
                              "var(--font-geist-mono), monospace",
                          }}
                        >
                          {a.name[0]}
                        </div>
                        <div className="min-w-0 flex-1">
                          <h3 className="truncate text-[1rem] font-medium tracking-tight">
                            {a.name}
                          </h3>
                          <p className="text-[0.8125rem] text-muted-foreground">
                            {a.organization}
                          </p>
                        </div>
                      </div>
                      <p className="line-clamp-2 text-[0.875rem] leading-[1.6] text-muted-foreground">
                        {a.description}
                      </p>
                      <div className="flex items-center gap-2">
                        <span
                          className="rounded-full border border-border px-2.5 py-1 text-[0.625rem] font-medium uppercase tracking-[0.05em] text-muted-foreground"
                          style={{
                            fontFamily:
                              "var(--font-geist-mono), monospace",
                          }}
                        >
                          {a.model}
                        </span>
                        <span
                          className="rounded-full border border-border px-2.5 py-1 text-[0.625rem] font-medium uppercase tracking-[0.05em] text-muted-foreground"
                          style={{
                            fontFamily:
                              "var(--font-geist-mono), monospace",
                          }}
                        >
                          {a.category}
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              </FadeIn>
            ))}
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
