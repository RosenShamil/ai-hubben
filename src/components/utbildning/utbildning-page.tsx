"use client";

import { useState } from "react";
import {
  Calendar,
  BookOpen,
  Play,
  FileText,
  GraduationCap,
  Users,
  Building2,
  ExternalLink,
  Send,
  Check,
  ChevronDown,
} from "lucide-react";
import { FadeIn } from "@/components/shared/fade-in";
import { TrainingCalendar } from "@/components/utbildning/training-calendar";
import { BRAND_GRADIENT } from "@/lib/constants";
import type {
  TrainingSession,
  TrainingResource,
} from "@/lib/training-resources";

function formatSwedishDate(dateStr: string): string {
  const months = [
    "januari",
    "februari",
    "mars",
    "april",
    "maj",
    "juni",
    "juli",
    "augusti",
    "september",
    "oktober",
    "november",
    "december",
  ];
  const d = new Date(dateStr + "T00:00:00");
  return `${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}`;
}

const RESOURCE_ICONS: Record<string, typeof BookOpen> = {
  guide: BookOpen,
  video: Play,
  pdf: FileText,
  kurs: GraduationCap,
};

const RESOURCE_LABELS: Record<string, string> = {
  guide: "Guide",
  video: "Video",
  pdf: "PDF",
  kurs: "Kurs",
};

const FILTER_OPTIONS = [
  { key: "alla", label: "Alla" },
  { key: "guide", label: "Guider" },
  { key: "video", label: "Videos" },
  { key: "pdf", label: "PDF" },
  { key: "kurs", label: "Kurser" },
];

export function UtbildningPage({
  upcomingWorkshops,
  resources,
  pastTraining,
  allSessions,
}: {
  upcomingWorkshops: TrainingSession[];
  resources: TrainingResource[];
  pastTraining: TrainingSession[];
  allSessions: TrainingSession[];
}) {
  const [resourceFilter, setResourceFilter] = useState("alla");
  const [showAllPast, setShowAllPast] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const filteredResources =
    resourceFilter === "alla"
      ? resources
      : resources.filter((r) => r.type === resourceFilter);

  const visiblePast = showAllPast ? pastTraining : pastTraining.slice(0, 10);

  function handleContactSubmit(e: React.FormEvent) {
    e.preventDefault();
    setFormSubmitted(true);
    setContactForm({ name: "", email: "", message: "" });
  }

  return (
    <>
      {/* Section 1: Hero */}
      <section className="mx-auto max-w-[68.75rem] px-6 pt-20 pb-12 md:pt-28 md:pb-16">
        <FadeIn>
          <p
            className="text-[0.6875rem] font-medium uppercase tracking-[0.15em] text-muted-foreground"
            style={{ fontFamily: "var(--font-geist-mono), monospace" }}
          >
            Lärresurser
          </p>
          <h1
            className="mt-4 text-[1.75rem] leading-[1.1] tracking-[-0.04em] sm:text-[2.75rem] md:text-[4.5rem]"
            style={{
              fontFamily: "var(--font-bodoni), serif",
              fontWeight: 400,
            }}
          >
            Utbildning
          </h1>
          <p className="mt-6 max-w-[42rem] text-[1.0625rem] leading-[1.7] text-muted-foreground">
            Guider, workshops och kurser för att stärka AI-kompetensen i
            Katrineholms kommun. Här hittar du allt du behöver för att komma
            igång och utvecklas.
          </p>
        </FadeIn>
      </section>

      {/* Gradient divider */}
      <div className="mx-auto max-w-[68.75rem] px-6">
        <div className="h-px" style={{ background: BRAND_GRADIENT }} />
      </div>

      {/* Section 2: Utbildningskalender */}
      <section className="mx-auto max-w-[68.75rem] px-6 py-12 md:py-16">
        <FadeIn>
          <p
            className="text-[0.6875rem] font-medium uppercase tracking-[0.15em] text-muted-foreground"
            style={{ fontFamily: "var(--font-geist-mono), monospace" }}
          >
            Kalender
          </p>
          <h2
            className="mt-3 text-[1.75rem] leading-[1.15] tracking-[-0.03em] md:text-[2.5rem]"
            style={{
              fontFamily: "var(--font-bodoni), serif",
              fontWeight: 400,
            }}
          >
            Kommande utbildningar
          </h2>
          <p className="mt-4 max-w-[42rem] text-[0.9375rem] leading-[1.7] text-muted-foreground">
            Klicka på en markerad dag för att se detaljer och anmäla dig.
          </p>
        </FadeIn>

        <div className="mt-8">
          <TrainingCalendar sessions={allSessions} />
        </div>
      </section>

      {/* Gradient divider */}
      <div className="mx-auto max-w-[68.75rem] px-6">
        <div className="h-px" style={{ background: BRAND_GRADIENT }} />
      </div>

      {/* Section 3: Utbildningsmaterial */}
      <section className="mx-auto max-w-[68.75rem] px-6 py-12 md:py-16">
        <FadeIn>
          <p
            className="text-[0.6875rem] font-medium uppercase tracking-[0.15em] text-muted-foreground"
            style={{ fontFamily: "var(--font-geist-mono), monospace" }}
          >
            Material
          </p>
          <h2
            className="mt-3 text-[1.75rem] leading-[1.15] tracking-[-0.03em] md:text-[2.5rem]"
            style={{
              fontFamily: "var(--font-bodoni), serif",
              fontWeight: 400,
            }}
          >
            Utbildningsmaterial
          </h2>
        </FadeIn>

        {/* Filter pills */}
        <FadeIn delay={0.1}>
          <div className="mt-6 flex flex-wrap gap-2">
            {FILTER_OPTIONS.map((opt) => {
              const isActive = resourceFilter === opt.key;
              return (
                <button
                  key={opt.key}
                  onClick={() => setResourceFilter(opt.key)}
                  className="rounded-full border px-3.5 py-1.5 text-[0.8125rem] font-medium transition-all"
                  style={{
                    borderColor: isActive
                      ? "var(--foreground)"
                      : "var(--border)",
                    backgroundColor: isActive
                      ? "var(--foreground)"
                      : "transparent",
                    color: isActive
                      ? "var(--background)"
                      : "var(--muted-foreground)",
                  }}
                >
                  {opt.label}
                </button>
              );
            })}
          </div>
        </FadeIn>

        <div className="mt-8">
          {filteredResources.length === 0 ? (
            <FadeIn delay={0.15}>
              <div className="rounded-lg border border-border bg-card p-8 text-center">
                <BookOpen
                  size={32}
                  className="mx-auto text-muted-foreground"
                />
                <p className="mt-4 text-[1rem] font-medium">
                  Material kommer snart
                </p>
                <p className="mt-2 text-[0.875rem] text-muted-foreground">
                  Vi arbetar med att ta fram utbildningsmaterial. Kom tillbaka
                  snart!
                </p>
              </div>
            </FadeIn>
          ) : (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {filteredResources.map((res, i) => {
                const Icon = RESOURCE_ICONS[res.type] || BookOpen;
                return (
                  <FadeIn key={res.id} delay={i * 0.05}>
                    <div className="group relative flex h-full flex-col rounded-lg border border-border bg-card p-6 transition-all duration-300 hover:bg-secondary hover:shadow-lg">
                      <div className="flex items-start gap-3">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-secondary">
                          <Icon size={18} className="text-foreground" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <span
                            className="text-[0.625rem] font-medium uppercase tracking-[0.1em] text-muted-foreground"
                            style={{
                              fontFamily: "var(--font-geist-mono), monospace",
                            }}
                          >
                            {RESOURCE_LABELS[res.type] || res.type}
                          </span>
                          <h3 className="mt-1 text-[0.9375rem] font-medium leading-[1.4] tracking-tight">
                            {res.title}
                          </h3>
                        </div>
                      </div>
                      <p className="mt-3 line-clamp-2 text-[0.875rem] leading-[1.6] text-muted-foreground">
                        {res.description || "\u00A0"}
                      </p>
                      <div className="mt-auto pt-4">
                        {res.url ? (
                          <a
                            href={res.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 text-[0.8125rem] font-medium text-foreground transition-colors hover:text-muted-foreground"
                          >
                            Öppna
                            <ExternalLink size={12} />
                          </a>
                        ) : (
                          <div className="h-5" />
                        )}
                      </div>
                    </div>
                  </FadeIn>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* Gradient divider */}
      <div className="mx-auto max-w-[68.75rem] px-6">
        <div className="h-px" style={{ background: BRAND_GRADIENT }} />
      </div>

      {/* Section 4: Kontakt / Boka */}
      <section className="mx-auto max-w-[68.75rem] px-6 py-12 md:py-16">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          <FadeIn>
            <p
              className="text-[0.6875rem] font-medium uppercase tracking-[0.15em] text-muted-foreground"
              style={{ fontFamily: "var(--font-geist-mono), monospace" }}
            >
              Kontakt
            </p>
            <h2
              className="mt-3 text-[1.75rem] leading-[1.15] tracking-[-0.03em] md:text-[2.5rem]"
              style={{
                fontFamily: "var(--font-bodoni), serif",
                fontWeight: 400,
              }}
            >
              Boka utbildning
            </h2>
            <p className="mt-4 max-w-[32rem] text-[1.0625rem] leading-[1.7] text-muted-foreground">
              Vill du boka en workshop för din förvaltning eller få individuell
              handledning i AI-verktyg? Skicka ett meddelande så återkommer vi
              med förslag på upplägg.
            </p>
            <div className="mt-6 space-y-3">
              <div className="flex items-center gap-3 text-[0.9375rem] text-muted-foreground">
                <GraduationCap size={16} />
                <span>Skräddarsydda workshops</span>
              </div>
              <div className="flex items-center gap-3 text-[0.9375rem] text-muted-foreground">
                <Users size={16} />
                <span>Individuell handledning</span>
              </div>
              <div className="flex items-center gap-3 text-[0.9375rem] text-muted-foreground">
                <Building2 size={16} />
                <span>Förvaltningsanpassat innehåll</span>
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={0.1}>
            {formSubmitted ? (
              <div className="flex flex-col items-center justify-center rounded-lg border border-border bg-card p-8 text-center">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-secondary">
                  <Check size={24} />
                </div>
                <h3 className="mt-5 text-[1.125rem] font-semibold">
                  Tack för ditt meddelande!
                </h3>
                <p className="mt-2 text-[0.875rem] text-muted-foreground">
                  Vi återkommer till dig så snart som möjligt.
                </p>
                <button
                  onClick={() => setFormSubmitted(false)}
                  className="mt-6 rounded-full border border-border px-5 py-2 text-[0.8125rem] font-medium transition-colors hover:bg-secondary"
                  style={{ fontFamily: "var(--font-geist-mono), monospace" }}
                >
                  Skicka ett till
                </button>
              </div>
            ) : (
              <form
                onSubmit={handleContactSubmit}
                className="space-y-5 rounded-lg border border-border bg-card p-6"
              >
                <div>
                  <label
                    className="mb-1.5 block text-[0.625rem] font-medium uppercase tracking-[0.1em] text-muted-foreground"
                    style={{
                      fontFamily: "var(--font-geist-mono), monospace",
                    }}
                  >
                    Namn *
                  </label>
                  <input
                    type="text"
                    required
                    value={contactForm.name}
                    onChange={(e) =>
                      setContactForm({ ...contactForm, name: e.target.value })
                    }
                    placeholder="Ditt namn"
                    className="w-full rounded-md border border-border bg-background px-3 py-2.5 text-[0.875rem] outline-none transition-colors focus:border-foreground"
                  />
                </div>
                <div>
                  <label
                    className="mb-1.5 block text-[0.625rem] font-medium uppercase tracking-[0.1em] text-muted-foreground"
                    style={{
                      fontFamily: "var(--font-geist-mono), monospace",
                    }}
                  >
                    E-post *
                  </label>
                  <input
                    type="email"
                    required
                    value={contactForm.email}
                    onChange={(e) =>
                      setContactForm({ ...contactForm, email: e.target.value })
                    }
                    placeholder="din.email@katrineholm.se"
                    className="w-full rounded-md border border-border bg-background px-3 py-2.5 text-[0.875rem] outline-none transition-colors focus:border-foreground"
                  />
                </div>
                <div>
                  <label
                    className="mb-1.5 block text-[0.625rem] font-medium uppercase tracking-[0.1em] text-muted-foreground"
                    style={{
                      fontFamily: "var(--font-geist-mono), monospace",
                    }}
                  >
                    Meddelande *
                  </label>
                  <textarea
                    required
                    value={contactForm.message}
                    onChange={(e) =>
                      setContactForm({
                        ...contactForm,
                        message: e.target.value,
                      })
                    }
                    placeholder="Beskriv vad du vill ha hjälp med..."
                    rows={4}
                    className="w-full resize-none rounded-md border border-border bg-background px-3 py-2.5 text-[0.875rem] outline-none transition-colors focus:border-foreground"
                  />
                </div>
                <button
                  type="submit"
                  className="flex items-center gap-2 rounded-md bg-primary px-5 py-2.5 text-[0.8125rem] font-medium text-primary-foreground transition-all hover:opacity-90 active:scale-[0.98]"
                  style={{
                    fontFamily: "var(--font-geist-mono), monospace",
                    boxShadow:
                      "0px 2px 1px 0px rgba(255,255,255,0.15) inset, 0px -2px 1px 0px rgba(0,0,0,0.05) inset",
                  }}
                >
                  <Send size={14} />
                  Skicka
                </button>
              </form>
            )}
          </FadeIn>
        </div>
      </section>

      {/* Gradient divider */}
      <div className="mx-auto max-w-[68.75rem] px-6">
        <div className="h-px" style={{ background: BRAND_GRADIENT }} />
      </div>

      {/* Section 5: Genomförda utbildningar */}
      <section className="mx-auto max-w-[68.75rem] px-6 py-12 md:py-16">
        <FadeIn>
          <p
            className="text-[0.6875rem] font-medium uppercase tracking-[0.15em] text-muted-foreground"
            style={{ fontFamily: "var(--font-geist-mono), monospace" }}
          >
            Historik
          </p>
          <h2
            className="mt-3 text-[1.75rem] leading-[1.15] tracking-[-0.03em] md:text-[2.5rem]"
            style={{
              fontFamily: "var(--font-bodoni), serif",
              fontWeight: 400,
            }}
          >
            Genomförda utbildningar
          </h2>
        </FadeIn>

        <div className="mt-8">
          {pastTraining.length === 0 ? (
            <FadeIn delay={0.1}>
              <div className="rounded-lg border border-border bg-card p-8 text-center">
                <GraduationCap
                  size={32}
                  className="mx-auto text-muted-foreground"
                />
                <p className="mt-4 text-[1rem] font-medium">
                  Inga genomförda utbildningar ännu
                </p>
                <p className="mt-2 text-[0.875rem] text-muted-foreground">
                  Utbildningshistorik visas här efter genomförda tillfällen.
                </p>
              </div>
            </FadeIn>
          ) : (
            <>
              <div className="space-y-0 rounded-lg border border-border bg-card">
                {visiblePast.map((session, i) => (
                  <FadeIn key={session.id} delay={i * 0.03}>
                    <div
                      className={`flex flex-col gap-2 px-5 py-4 sm:flex-row sm:items-center sm:gap-4 ${
                        i !== visiblePast.length - 1
                          ? "border-b border-border"
                          : ""
                      }`}
                    >
                      {/* Date */}
                      <div className="shrink-0 sm:w-[140px]">
                        <span
                          className="text-[0.75rem] font-medium text-muted-foreground"
                          style={{
                            fontFamily: "var(--font-geist-mono), monospace",
                          }}
                        >
                          {formatSwedishDate(session.date)}
                        </span>
                      </div>

                      {/* Description */}
                      <div className="min-w-0 flex-1">
                        <p className="text-[0.875rem] font-medium leading-[1.4] tracking-tight">
                          {session.description || "Utbildningstillfälle"}
                        </p>
                      </div>

                      {/* Meta */}
                      <div className="flex shrink-0 flex-wrap items-center gap-2">
                        <span
                          className={`inline-block rounded-full px-2 py-0.5 text-[0.6875rem] font-medium ${
                            session.type === "workshop"
                              ? "bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300"
                              : "bg-purple-100 text-purple-700 dark:bg-purple-950 dark:text-purple-300"
                          }`}
                        >
                          {session.type === "workshop"
                            ? "Workshop"
                            : "Individuell"}
                        </span>
                        {session.department && (
                          <span className="text-[0.75rem] text-muted-foreground">
                            {session.department}
                          </span>
                        )}
                        {session.role_group && (
                          <span className="text-[0.75rem] text-muted-foreground">
                            · {session.role_group}
                          </span>
                        )}
                        <span className="inline-flex items-center gap-1 text-[0.75rem] text-muted-foreground">
                          <Users size={11} />
                          {session.participants}
                        </span>
                      </div>
                    </div>
                  </FadeIn>
                ))}
              </div>

              {pastTraining.length > 10 && !showAllPast && (
                <FadeIn delay={0.15}>
                  <div className="mt-6 text-center">
                    <button
                      onClick={() => setShowAllPast(true)}
                      className="inline-flex items-center gap-1.5 rounded-full border border-border px-5 py-2.5 text-[0.8125rem] font-medium transition-all hover:bg-secondary"
                      style={{
                        fontFamily: "var(--font-geist-mono), monospace",
                      }}
                    >
                      Visa fler
                      <ChevronDown size={14} />
                    </button>
                  </div>
                </FadeIn>
              )}
            </>
          )}
        </div>
      </section>
    </>
  );
}
