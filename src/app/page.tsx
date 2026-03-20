"use client";

import { BRAND_GRADIENT } from "@/lib/constants";
import { FadeIn } from "@/components/shared/fade-in";

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
    description: "Sammanfattar protokoll och mötesanteckningar automatiskt.",
  },
  {
    name: "Beslutsstöd socialtjänst",
    category: "Vård & omsorg",
    description: "Hjälper handläggare med beslutsunderlag och lagstöd.",
  },
  {
    name: "Upphandlingsassistent",
    category: "Juridik",
    description: "Analyserar upphandlingsdokument och identifierar risker.",
  },
];

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
        <div className="absolute inset-0 opacity-40" style={{ background: BRAND_GRADIENT }} />
      </div>
      <div className="relative rounded-lg border border-border bg-card p-7 transition-all duration-300 group-hover:bg-secondary group-hover:shadow-lg">
        {children}
      </div>
    </div>
  );
}

function PrimaryButton({ children }: { children: React.ReactNode }) {
  return (
    <button
      className="rounded-full bg-primary px-7 py-3 text-[0.8125rem] font-medium uppercase tracking-[0.01em] text-primary-foreground transition-all duration-150 active:scale-[0.98]"
      style={{
        fontFamily: "var(--font-geist-mono), monospace",
        boxShadow:
          "0px 2px 1px 0px rgba(255,255,255,0.15) inset, 0px -2px 1px 0px rgba(0,0,0,0.05) inset",
      }}
    >
      {children}
    </button>
  );
}

function SecondaryButton({ children }: { children: React.ReactNode }) {
  return (
    <button
      className="rounded-full border border-border px-7 py-3 text-[0.8125rem] font-medium uppercase tracking-[0.01em] transition-all duration-150 hover:bg-secondary active:scale-[0.98]"
      style={{ fontFamily: "var(--font-geist-mono), monospace" }}
    >
      {children}
    </button>
  );
}

export default function Home() {
  return (
    <>
      {/* Hero */}
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
              style={{ fontFamily: "var(--font-bodoni), serif", fontWeight: 400 }}
            >
              Kommunens
              <br />
              AI-hub
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
              <PrimaryButton>Utforska assistenter</PrimaryButton>
              <SecondaryButton>Se statistik</SecondaryButton>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Gradient divider */}
      <div className="mx-auto max-w-[68.75rem] px-6">
        <div className="h-px" style={{ background: BRAND_GRADIENT }} />
      </div>

      {/* Stats */}
      <section className="mx-auto max-w-[68.75rem] px-6 py-24 md:py-32">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4 md:gap-12">
          {stats.map((stat, i) => (
            <FadeIn key={stat.label} delay={i * 0.1}>
              <div>
                <p
                  className="text-[0.6875rem] font-medium uppercase tracking-[0.15em] text-muted-foreground"
                  style={{ fontFamily: "var(--font-geist-mono), monospace" }}
                >
                  {stat.label}
                </p>
                <p
                  className="mt-3 text-[2.75rem] tracking-[-0.04em] md:text-[3.5rem]"
                  style={{ fontFamily: "var(--font-bodoni), serif", fontWeight: 400 }}
                >
                  {stat.value}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* Fading divider */}
      <div className="mx-auto max-w-[68.75rem] px-6">
        <div
          className="h-px"
          style={{
            background: "linear-gradient(to right, transparent, var(--border) 50%, transparent)",
          }}
        />
      </div>

      {/* Assistants */}
      <section className="mx-auto max-w-[68.75rem] px-6 py-24 md:py-32">
        <FadeIn>
          <p
            className="text-[0.6875rem] font-medium uppercase tracking-[0.15em] text-muted-foreground"
            style={{ fontFamily: "var(--font-geist-mono), monospace" }}
          >
            Populära assistenter
          </p>
          <h2
            className="mt-5 text-[2rem] tracking-[-0.04em] md:text-[2.75rem]"
            style={{ fontFamily: "var(--font-bodoni), serif", fontWeight: 400 }}
          >
            Verktyg som förenklar vardagen
          </h2>
        </FadeIn>

        <div className="mt-16 grid gap-5 md:grid-cols-3">
          {assistants.map((a, i) => (
            <FadeIn key={a.name} delay={i * 0.12}>
              <FlashCard>
                <div
                  className="flex h-10 w-10 items-center justify-center rounded-md border border-border bg-secondary text-[0.875rem] font-medium"
                  style={{ fontFamily: "var(--font-geist-mono), monospace" }}
                >
                  {a.name[0]}
                </div>
                <h3 className="mt-5 text-[1rem] font-medium tracking-tight">
                  {a.name}
                </h3>
                <p className="mt-2 text-[0.875rem] leading-[1.6] text-muted-foreground">
                  {a.description}
                </p>
                <p
                  className="mt-5 text-[0.6875rem] uppercase tracking-[0.1em] text-muted-foreground"
                  style={{ fontFamily: "var(--font-geist-mono), monospace" }}
                >
                  {a.category}
                </p>
              </FlashCard>
            </FadeIn>
          ))}
        </div>
      </section>
    </>
  );
}
