"use client";

import Link from "next/link";
import {
  GraduationCap,
  FileText,
  FolderOpen,
  HelpCircle,
  ArrowRight,
  Upload,
} from "lucide-react";
import { BRAND_GRADIENT } from "@/lib/constants";
import { FadeIn } from "@/components/shared/fade-in";
import { CountUp } from "@/components/shared/count-up";

/* ── Data ── */

const stats = [
  { label: "AI-assistenter", value: "312" },
  { label: "Ställda frågor", value: "48 291" },
  { label: "Aktiva användare", value: "1 847" },
  { label: "Spaces", value: "89" },
];

const assistants = [
  {
    name: "Mötessammanfattare",
    category: "Administration",
    model: "GPT-4",
    description: "Sammanfattar protokoll och mötesanteckningar automatiskt.",
  },
  {
    name: "Beslutsstöd socialtjänst",
    category: "Vård & omsorg",
    model: "Claude",
    description: "Hjälper handläggare med beslutsunderlag och lagstöd.",
  },
  {
    name: "Upphandlingsassistent",
    category: "Juridik",
    model: "GPT-4",
    description: "Analyserar upphandlingsdokument och identifierar risker.",
  },
  {
    name: "Skolplanerare",
    category: "Utbildning",
    model: "Claude",
    description: "Skapar lektionsplaneringar och pedagogiskt material.",
  },
  {
    name: "Ärendehanterare",
    category: "Förvaltning",
    model: "GPT-4",
    description: "Klassificerar och prioriterar inkommande ärenden.",
  },
  {
    name: "Kommunikatör",
    category: "Kommunikation",
    model: "Claude",
    description: "Skriver pressmeddelanden och informationstexter.",
  },
];

const quickLinks = [
  {
    label: "Utbildning",
    description: "Guider och kurser för AI i kommunen",
    href: "/utbildning",
    icon: GraduationCap,
  },
  {
    label: "Dokumentation",
    description: "Policyer och riktlinjer",
    href: "/dokumentation",
    icon: FileText,
  },
  {
    label: "Projekt",
    description: "Pågående AI-initiativ",
    href: "/projekt",
    icon: FolderOpen,
  },
  {
    label: "FAQ",
    description: "Vanliga frågor och svar",
    href: "/faq",
    icon: HelpCircle,
  },
];

const news = [
  {
    title: "Ny AI-policy antagen av kommunstyrelsen",
    date: "12 mar 2026",
    slug: "ny-ai-policy",
  },
  {
    title: "Workshop: Promptteknik för tjänstepersoner",
    date: "8 mar 2026",
    slug: "workshop-promptteknik",
  },
  {
    title: "AI-hubben passerar 300 assistenter",
    date: "1 mar 2026",
    slug: "300-assistenter",
  },
];

/* ── Components ── */

function FlashCard({ children }: { children: React.ReactNode }) {
  return (
    <div className="group relative cursor-pointer rounded-lg transition-all duration-300">
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
      <div className="relative rounded-lg border border-border bg-card p-7 transition-all duration-300 group-hover:bg-secondary group-hover:shadow-lg">
        {children}
      </div>
    </div>
  );
}

/* ── Page ── */

export default function Home() {
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
              Katrineholms kommun
            </p>
          </FadeIn>
          <FadeIn delay={0.15}>
            <h1
              className="mt-8 max-w-[50rem] text-center text-[2.75rem] leading-[1.1] tracking-[-0.04em] md:text-[4.5rem] lg:text-[5.625rem]"
              style={{
                fontFamily: "var(--font-bodoni), serif",
                fontWeight: 400,
              }}
            >
              Kommunens
              <br />
              AI-resa
            </h1>
          </FadeIn>
          <FadeIn delay={0.3}>
            <p className="mt-8 max-w-[42rem] text-center text-[1.0625rem] leading-[1.7] text-muted-foreground">
              En samlad plattform för AI-assistenter, statistik, utbildning och
              resurser — byggd för kommunal verksamhet.
            </p>
          </FadeIn>
          <FadeIn delay={0.45}>
            <div className="mt-12 flex items-center gap-4">
              <Link
                href="/assistenter"
                className="rounded-full bg-primary px-7 py-3 text-[0.8125rem] font-medium uppercase tracking-[0.01em] text-primary-foreground transition-all duration-150 active:scale-[0.98]"
                style={{
                  fontFamily: "var(--font-geist-mono), monospace",
                  boxShadow:
                    "0px 2px 1px 0px rgba(255,255,255,0.15) inset, 0px -2px 1px 0px rgba(0,0,0,0.05) inset",
                }}
              >
                Utforska assistenter
              </Link>
              <Link
                href="/statistik"
                className="rounded-full border border-border px-7 py-3 text-[0.8125rem] font-medium uppercase tracking-[0.01em] transition-all duration-150 hover:bg-secondary active:scale-[0.98]"
                style={{ fontFamily: "var(--font-geist-mono), monospace" }}
              >
                Se statistik
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ─── Gradient divider ─── */}
      <div className="mx-auto max-w-[68.75rem] px-6">
        <div className="h-px" style={{ background: BRAND_GRADIENT }} />
      </div>

      {/* ─── Live Stats (CountUp) ─── */}
      <section className="mx-auto max-w-[68.75rem] px-6 py-24 md:py-32">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4 md:gap-12">
          {stats.map((stat, i) => (
            <FadeIn key={stat.label} delay={i * 0.1}>
              <div>
                <p
                  className="text-[0.6875rem] font-medium uppercase tracking-[0.15em] text-muted-foreground"
                  style={{
                    fontFamily: "var(--font-geist-mono), monospace",
                  }}
                >
                  {stat.label}
                </p>
                <CountUp
                  target={stat.value}
                  className="mt-3 block text-[2.75rem] tracking-[-0.04em] md:text-[3.5rem]"
                  style={{
                    fontFamily: "var(--font-bodoni), serif",
                    fontWeight: 400,
                  }}
                />
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

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
              <p
                className="text-[0.6875rem] font-medium uppercase tracking-[0.15em] text-muted-foreground"
                style={{
                  fontFamily: "var(--font-geist-mono), monospace",
                }}
              >
                Populära assistenter
              </p>
              <h2
                className="mt-5 text-[2rem] tracking-[-0.04em] md:text-[2.75rem]"
                style={{
                  fontFamily: "var(--font-bodoni), serif",
                  fontWeight: 400,
                }}
              >
                Verktyg som förenklar vardagen
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
            <FadeIn key={a.name} delay={i * 0.08}>
              <FlashCard>
                <div className="flex items-center justify-between">
                  <div
                    className="flex h-10 w-10 items-center justify-center rounded-md border border-border bg-secondary text-[0.875rem] font-medium"
                    style={{
                      fontFamily: "var(--font-geist-mono), monospace",
                    }}
                  >
                    {a.name[0]}
                  </div>
                  <span
                    className="rounded-full border border-border px-2.5 py-1 text-[0.625rem] font-medium uppercase tracking-[0.05em] text-muted-foreground"
                    style={{
                      fontFamily: "var(--font-geist-mono), monospace",
                    }}
                  >
                    {a.model}
                  </span>
                </div>
                <h3 className="mt-5 text-[1rem] font-medium tracking-tight">
                  {a.name}
                </h3>
                <p className="mt-2 text-[0.875rem] leading-[1.6] text-muted-foreground">
                  {a.description}
                </p>
                <p
                  className="mt-5 text-[0.6875rem] uppercase tracking-[0.1em] text-muted-foreground"
                  style={{
                    fontFamily: "var(--font-geist-mono), monospace",
                  }}
                >
                  {a.category}
                </p>
              </FlashCard>
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
          {news.map((item, i) => (
            <FadeIn key={item.slug} delay={i * 0.1}>
              <Link href={`/nyheter/${item.slug}`}>
                <FlashCard>
                  <p
                    className="text-[0.6875rem] font-medium uppercase tracking-[0.15em] text-muted-foreground"
                    style={{
                      fontFamily: "var(--font-geist-mono), monospace",
                    }}
                  >
                    {item.date}
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
          ))}
        </div>
      </section>

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

      {/* ─── Quick Links ─── */}
      <section className="mx-auto max-w-[68.75rem] px-6 py-24 md:py-32">
        <FadeIn>
          <p
            className="text-[0.6875rem] font-medium uppercase tracking-[0.15em] text-muted-foreground"
            style={{ fontFamily: "var(--font-geist-mono), monospace" }}
          >
            Utforska
          </p>
          <h2
            className="mt-5 text-[2rem] tracking-[-0.04em] md:text-[2.75rem]"
            style={{
              fontFamily: "var(--font-bodoni), serif",
              fontWeight: 400,
            }}
          >
            Snabblänkar
          </h2>
        </FadeIn>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 md:grid-cols-4">
          {quickLinks.map((link, i) => {
            const Icon = link.icon;
            return (
              <FadeIn key={link.href} delay={i * 0.08}>
                <Link href={link.href}>
                  <FlashCard>
                    <Icon size={24} className="text-muted-foreground" />
                    <h3 className="mt-5 text-[1rem] font-medium tracking-tight">
                      {link.label}
                    </h3>
                    <p className="mt-2 text-[0.8125rem] leading-[1.6] text-muted-foreground">
                      {link.description}
                    </p>
                  </FlashCard>
                </Link>
              </FadeIn>
            );
          })}
        </div>
      </section>

      {/* ─── CTA — Upload ─── */}
      <section className="mx-auto max-w-[68.75rem] px-6 pb-24 md:pb-32">
        <FadeIn>
          <div
            className="relative overflow-hidden rounded-lg border border-border p-12 text-center md:p-20"
          >
            {/* Subtle gradient background */}
            <div
              className="absolute inset-0 opacity-[0.03]"
              style={{ background: BRAND_GRADIENT }}
            />
            <div className="relative">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-border bg-secondary">
                <Upload size={24} className="text-muted-foreground" />
              </div>
              <h2
                className="mt-8 text-[2rem] tracking-[-0.04em] md:text-[2.75rem]"
                style={{
                  fontFamily: "var(--font-bodoni), serif",
                  fontWeight: 400,
                }}
              >
                Har du byggt en assistent?
              </h2>
              <p className="mt-4 text-[1.0625rem] leading-[1.7] text-muted-foreground">
                Dela den med kommunen och hjälp kollegor att jobba smartare.
              </p>
              <Link
                href="/assistenter/ladda-upp"
                className="mt-8 inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3 text-[0.8125rem] font-medium uppercase tracking-[0.01em] text-primary-foreground transition-all duration-150 active:scale-[0.98]"
                style={{
                  fontFamily: "var(--font-geist-mono), monospace",
                  boxShadow:
                    "0px 2px 1px 0px rgba(255,255,255,0.15) inset, 0px -2px 1px 0px rgba(0,0,0,0.05) inset",
                }}
              >
                Ladda upp assistent
                <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </FadeIn>
      </section>
    </>
  );
}
