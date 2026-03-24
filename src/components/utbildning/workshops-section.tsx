"use client";

import { useState } from "react";
import {
  GraduationCap,
  Users,
  Building2,
  Send,
  Check,
  ChevronDown,
} from "lucide-react";
import { FadeIn } from "@/components/shared/fade-in";
import { BRAND_GRADIENT } from "@/lib/constants";
import { TrainingCalendar } from "@/components/utbildning/training-calendar";
import type { TrainingSession } from "@/lib/training-resources";

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

export function WorkshopsSection({
  allSessions,
  pastTraining,
}: {
  allSessions: TrainingSession[];
  pastTraining: TrainingSession[];
}) {
  const [showAllPast, setShowAllPast] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const visiblePast = showAllPast ? pastTraining : pastTraining.slice(0, 10);

  function handleContactSubmit(e: React.FormEvent) {
    e.preventDefault();
    setFormSubmitted(true);
    setContactForm({ name: "", email: "", message: "" });
  }

  return (
    <>
      {/* Utbildningskalender */}
      <section className="py-4">
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
          <p className="mt-4 max-w-[42rem] text-[0.9375rem] leading-[1.7] text-foreground">
            Klicka på en markerad dag för att se detaljer och anmäla dig.
          </p>
        </FadeIn>

        <div className="mt-8">
          <TrainingCalendar sessions={allSessions} />
        </div>
      </section>

      {/* Gradient divider */}
      <div className="py-8">
        <div className="h-px" style={{ background: BRAND_GRADIENT }} />
      </div>

      {/* Kontakt / Boka */}
      <section>
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
                <p className="mt-2 text-[0.875rem] text-foreground/85">
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
      <div className="py-8">
        <div className="h-px" style={{ background: BRAND_GRADIENT }} />
      </div>

      {/* Genomförda utbildningar */}
      <section>
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
                <p className="mt-2 text-[0.875rem] text-foreground/85">
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
