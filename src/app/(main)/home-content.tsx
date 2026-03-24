"use client";

import Link from "next/link";
import {
  ArrowRight,
  Upload,
} from "lucide-react";
import { BRAND_GRADIENT } from "@/lib/constants";
import { FadeIn } from "@/components/shared/fade-in";
import { GuideSectionHome } from "@/components/ai-guide/guide-section-home";
import type { IntricAssistant } from "@/lib/intric";
import type { Post } from "@/lib/posts";
import type { HomeTexts } from "@/lib/home-content-data";

// Color palette for letter avatars (same as assistant library)
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

/* ── Components ── */

function FlashCard({ children }: { children: React.ReactNode }) {
  return (
    <div className="group relative h-full cursor-pointer rounded-lg transition-all duration-300">
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
      <div className="relative flex h-full flex-col rounded-lg border border-border bg-card p-7 transition-all duration-300 group-hover:bg-secondary group-hover:shadow-lg">
        {children}
      </div>
    </div>
  );
}

/* ── Props ── */

interface HomeContentProps {
  assistants: IntricAssistant[];
  posts: Post[];
  homeTexts?: HomeTexts;
}

/* ── Page Content ── */

export function HomeContent({ assistants, posts, homeTexts = {} }: HomeContentProps) {
  const label = homeTexts.home_label || "Katrineholms kommun";
  const heading1 = homeTexts.home_heading_1 || "Kommunens";
  const heading2 = homeTexts.home_heading_2 || "AI-resa";
  const subtitle = homeTexts.home_subtitle || "En samlad plattform för AI-assistenter, statistik, utbildning och resurser — byggd för kommunal verksamhet.";
  const ctaPrimary = homeTexts.home_cta_primary || "Utforska assistenter";
  const ctaSecondary = homeTexts.home_cta_secondary || "Se statistik";
  const uploadHeading = homeTexts.home_upload_heading || "Har du byggt en AI-assistent i Intric?";
  const uploadText = homeTexts.home_upload_text || "Dela den med kommunen och hjälp kollegor att jobba smartare.";

  return (
    <>
      {/* ─── Hero ─── */}
      <section className="mx-auto max-w-[68.75rem] px-6">
        <div className="flex flex-col items-center pt-24 pb-20 md:pt-32 md:pb-28">
          <FadeIn>
            <p
              className="text-center text-[0.75rem] font-medium uppercase tracking-[0.15em] text-muted-foreground"
              style={{ fontFamily: "var(--font-geist-mono), monospace" }}
            >
              {label}
            </p>
          </FadeIn>
          <FadeIn delay={0.15}>
            <h1
              className="mt-8 max-w-[50rem] text-center text-[1.75rem] leading-[1.1] tracking-[-0.04em] sm:text-[2.75rem] md:text-[4.5rem] lg:text-[5.625rem]"
              style={{
                fontFamily: "var(--font-bodoni), serif",
                fontWeight: 400,
              }}
            >
              {heading1}
              <br />
              {heading2}
            </h1>
          </FadeIn>
          <FadeIn delay={0.3}>
            <p className="mt-8 max-w-[42rem] text-center text-[1.0625rem] leading-[1.7] text-foreground/85">
              {subtitle}
            </p>
          </FadeIn>
          <FadeIn delay={0.45}>
            <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row">
              <Link
                href="/assistenter"
                className="inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3 text-[0.8125rem] font-medium uppercase tracking-[0.01em] text-primary-foreground transition-all duration-150 active:scale-[0.98]"
                style={{
                  fontFamily: "var(--font-geist-mono), monospace",
                  boxShadow: "0px 2px 1px 0px rgba(255,255,255,0.15) inset, 0px -2px 1px 0px rgba(0,0,0,0.05) inset",
                }}
              >
                {ctaPrimary}
                <ArrowRight size={14} />
              </Link>
              <Link
                href="/statistik"
                className="inline-flex items-center gap-2 rounded-full border border-border px-7 py-3 text-[0.8125rem] font-medium uppercase tracking-[0.01em] text-muted-foreground transition-all hover:bg-secondary"
                style={{ fontFamily: "var(--font-geist-mono), monospace" }}
              >
                {ctaSecondary}
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ─── Gradient divider ─── */}
      <div className="mx-auto max-w-[68.75rem] px-6">
        <div className="h-px" style={{ background: BRAND_GRADIENT }} />
      </div>

      {/* ─── AI Guide ─── */}
      <GuideSectionHome assistants={assistants} />

      {/* ─── Fading divider ─── */}
      <div className="mx-auto max-w-[68.75rem] px-6">
        <div
          className="h-px"
          style={{
            background:
              "linear-gradient(to right, transparent, var(--border) 50%, transparent)",
          }}
        />
      </div>

      {/* ─── Featured Assistants ─── */}
      <section className="mx-auto max-w-[68.75rem] px-6 py-24 md:py-32">
        <FadeIn>
          <div className="flex items-end justify-between">
            <div>
              <h2
                className="text-[2rem] tracking-[-0.04em] md:text-[2.75rem]"
                style={{
                  fontFamily: "var(--font-bodoni), serif",
                  fontWeight: 400,
                }}
              >
                Populära assistenter
              </h2>
            </div>
            <Link
              href="/assistenter"
              className="hidden items-center gap-2 text-[0.8125rem] font-medium text-muted-foreground transition-colors hover:text-foreground md:flex"
              style={{ fontFamily: "var(--font-geist-mono), monospace" }}
            >
              Visa alla
              <ArrowRight size={14} />
            </Link>
          </div>
        </FadeIn>

        <div className="mt-16 grid gap-5 md:grid-cols-3">
          {assistants.map((a, i) => (
            <FadeIn key={a.id} delay={i * 0.08}>
              <Link href={`/assistenter/${a.id}`}>
              <FlashCard>
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
                <p className="mt-4 flex-1 line-clamp-2 text-[0.875rem] leading-[1.6] text-foreground/85">
                  {a.description}
                </p>
              </FlashCard>
              </Link>
            </FadeIn>
          ))}
        </div>

        {/* Mobile "visa alla" */}
        <div className="mt-8 md:hidden">
          <Link
            href="/assistenter"
            className="flex items-center justify-center gap-2 rounded-full border border-border px-7 py-3 text-[0.8125rem] font-medium uppercase tracking-[0.01em] transition-all hover:bg-secondary"
            style={{ fontFamily: "var(--font-geist-mono), monospace" }}
          >
            Visa alla assistenter
            <ArrowRight size={14} />
          </Link>
        </div>
      </section>

      {/* ─── Gradient divider ─── */}
      <div className="mx-auto max-w-[68.75rem] px-6">
        <div className="h-px" style={{ background: BRAND_GRADIENT }} />
      </div>

      {/* ─── Latest News ─── */}
      <section className="mx-auto max-w-[68.75rem] px-6 py-24 md:py-32">
        <FadeIn>
          <div className="flex items-end justify-between">
            <div>
              <p
                className="text-[0.6875rem] font-medium uppercase tracking-[0.15em] text-muted-foreground"
                style={{
                  fontFamily: "var(--font-geist-mono), monospace",
                }}
              >
                Senaste
              </p>
              <h2
                className="mt-5 text-[2rem] tracking-[-0.04em] md:text-[2.75rem]"
                style={{
                  fontFamily: "var(--font-bodoni), serif",
                  fontWeight: 400,
                }}
              >
                Nyheter
              </h2>
            </div>
            <Link
              href="/nyheter"
              className="hidden items-center gap-2 text-[0.8125rem] font-medium text-muted-foreground transition-colors hover:text-foreground md:flex"
              style={{ fontFamily: "var(--font-geist-mono), monospace" }}
            >
              Alla nyheter
              <ArrowRight size={14} />
            </Link>
          </div>
        </FadeIn>

        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {posts.length > 0 ? (
            posts.map((item, i) => (
              <FadeIn key={item.slug} delay={i * 0.1}>
                <Link href={`/nyheter/${item.slug}`}>
                  <FlashCard>
                    <p
                      className="text-[0.6875rem] font-medium uppercase tracking-[0.15em] text-muted-foreground"
                      style={{
                        fontFamily: "var(--font-geist-mono), monospace",
                      }}
                    >
                      {item.published_at
                        ? new Date(item.published_at).toLocaleDateString("sv-SE", {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                          })
                        : ""}
                    </p>
                    <h3 className="mt-4 text-[1.125rem] font-medium leading-[1.4] tracking-tight">
                      {item.title}
                    </h3>
                    <span className="mt-5 inline-flex items-center gap-1.5 text-[0.8125rem] text-muted-foreground transition-colors group-hover:text-foreground">
                      Läs mer
                      <ArrowRight
                        size={13}
                        className="transition-transform duration-300 group-hover:translate-x-1"
                      />
                    </span>
                  </FlashCard>
                </Link>
              </FadeIn>
            ))
          ) : (
            <FadeIn>
              <div className="col-span-full rounded-lg border border-border bg-card p-7">
                <p className="text-[0.875rem] text-foreground/85">
                  Inga nyheter publicerade ännu. Kom tillbaka snart!
                </p>
              </div>
            </FadeIn>
          )}
        </div>
      </section>

      {/* ─── CTA — Upload ─── */}
      <section className="mx-auto max-w-[68.75rem] px-6 pb-24 md:pb-32">
        <FadeIn>
          <div className="flex flex-col items-center justify-between gap-4 rounded-lg border border-border bg-card p-6 sm:flex-row sm:gap-6">
            <div className="flex items-center gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-secondary">
                <Upload size={18} className="text-muted-foreground" />
              </div>
              <div>
                <p className="text-[0.9375rem] font-medium">{uploadHeading}</p>
                <p className="text-[0.8125rem] text-foreground/85">{uploadText}</p>
              </div>
            </div>
            <Link
              href="/assistenter"
              className="shrink-0 inline-flex items-center gap-2 rounded-full border border-border px-5 py-2 text-[0.8125rem] font-medium transition-all hover:bg-secondary"
              style={{ fontFamily: "var(--font-geist-mono), monospace" }}
            >
              Ladda upp
              <ArrowRight size={14} />
            </Link>
          </div>
        </FadeIn>
      </section>
    </>
  );
}
