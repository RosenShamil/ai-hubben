import type { Metadata } from "next";
import Link from "next/link";
import { FadeIn } from "@/components/shared/fade-in";
import { BRAND_GRADIENT } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Tillgänglighetsredogörelse",
  description:
    "Tillgänglighetsredogörelse för AI-hubben enligt DOS-lagen (2018:1937).",
};

/* ── section helper ──────────────────────────────────────── */

function Section({
  label,
  heading,
  children,
}: {
  label: string;
  heading: string;
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="mx-auto max-w-[68.75rem] px-6">
        <div className="h-px" style={{ background: BRAND_GRADIENT }} />
      </div>
      <section className="mx-auto max-w-[68.75rem] px-6 py-12 md:py-16">
        <FadeIn>
          <p
            className="text-[0.6875rem] font-medium uppercase tracking-[0.15em] text-muted-foreground"
            style={{ fontFamily: "var(--font-geist-mono), monospace" }}
          >
            {label}
          </p>
          <h2
            className="mt-4 text-[1.75rem] leading-[1.1] tracking-[-0.04em] md:text-[2.75rem]"
            style={{
              fontFamily: "var(--font-bodoni), serif",
              fontWeight: 400,
            }}
          >
            {heading}
          </h2>
        </FadeIn>
        <FadeIn delay={0.1}>
          <div className="mt-8 max-w-[52rem] space-y-5 text-[1.0625rem] leading-[1.8] text-muted-foreground">
            {children}
          </div>
        </FadeIn>
      </section>
    </>
  );
}

/* ── page ────────────────────────────────────────────────── */

export default function TillganglighetPage() {
  return (
    <>
      {/* Hero */}
      <section className="mx-auto max-w-[68.75rem] px-6 pt-20 pb-12 md:pt-28 md:pb-16">
        <FadeIn>
          <p
            className="text-[0.6875rem] font-medium uppercase tracking-[0.15em] text-muted-foreground"
            style={{ fontFamily: "var(--font-geist-mono), monospace" }}
          >
            DOS-lagen
          </p>
          <h1
            className="mt-4 text-[1.75rem] leading-[1.1] tracking-[-0.04em] sm:text-[2.75rem] md:text-[4.5rem]"
            style={{
              fontFamily: "var(--font-bodoni), serif",
              fontWeight: 400,
            }}
          >
            Tillgänglighetsredogörelse
          </h1>
          <p className="mt-6 max-w-[42rem] text-[1.0625rem] leading-[1.7] text-muted-foreground">
            Digitaliseringsavdelningen i Katrineholms kommun står bakom
            AI-hubben. Vi vill att så många som möjligt ska kunna använda
            plattformen. Här beskriver vi
            hur väl vi uppfyller lagen om tillgänglighet till digital offentlig
            service (DOS-lagen), kända problem och hur du kan rapportera brister.
          </p>
          <p
            className="mt-4 text-[0.75rem] uppercase tracking-[0.1em] text-muted-foreground/60"
            style={{ fontFamily: "var(--font-geist-mono), monospace" }}
          >
            Senast uppdaterad: 25 mars 2026
          </p>
        </FadeIn>
      </section>

      {/* 1. Hur tillgänglig är webbplatsen? */}
      <Section label="01" heading="Hur tillgänglig är webbplatsen?">
        <p>
          AI-hubben är{" "}
          <strong className="text-foreground">delvis förenlig</strong> med lagen
          om tillgänglighet till digital offentlig service (DOS-lagen). Det
          innebär att webbplatsen till stor del uppfyller tillgänglighetskraven i
          standarden EN 301 549 / WCAG 2.1 nivå AA, men att vissa brister
          kvarstår.
        </p>
      </Section>

      {/* 2. Vad vi redan gör */}
      <Section label="02" heading="Vad vi redan gör">
        <p>
          AI-hubben är byggt med tillgänglighet i fokus. Följande åtgärder är
          implementerade:
        </p>
        <div className="grid gap-4 sm:grid-cols-2">
          {[
            {
              title: "Tangentbordsnavigering",
              text: "Alla funktioner nåbara via tangentbord med synlig fokusmarkering (focus-visible).",
            },
            {
              title: "Rörelsereduktion",
              text: "Animationer stängs av automatiskt om du valt \"Reducera rörelse\" i dina systeminställningar.",
            },
            {
              title: "Mörkt och ljust läge",
              text: "Fullt stöd för båda lägen med tillräcklig kontrast.",
            },
            {
              title: "Responsiv design",
              text: "Fungerar på alla skärmstorlekar, inklusive 200% zoom utan informationsförlust.",
            },
            {
              title: "Semantisk HTML",
              text: "Korrekt rubrikhierarki, ARIA-labels och landmärken för skärmläsare.",
            },
            {
              title: "Formulärvalidering",
              text: "Tydliga felmeddelanden kopplade till respektive fält.",
            },
          ].map((item) => (
            <div
              key={item.title}
              className="rounded-lg border border-border bg-card p-5"
            >
              <h3 className="text-[0.9375rem] font-medium text-foreground">
                {item.title}
              </h3>
              <p className="mt-1.5 text-[0.875rem]">{item.text}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* 3. Innehåll som inte är tillgängligt */}
      <Section label="03" heading="Innehåll som inte är tillgängligt">
        <p>
          Följande brister har identifierats vid vår senaste bedömning:
        </p>

        <div className="space-y-4">
          <div className="rounded-lg border border-border bg-card p-6">
            <h3 className="text-[1rem] font-medium text-foreground">
              Bristande förenlighet med lagkraven
            </h3>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-[0.9375rem]">
              <li>
                <strong className="text-foreground">
                  PDF-dokument
                </strong>{" "}
                — Uppladdade dokument i dokumentationssektionen kanske inte alltid
                uppfyller tillgänglighetskraven. (WCAG 1.1.1, 1.3.1)
              </li>
            </ul>
          </div>

          <div className="rounded-lg border border-border bg-card p-6">
            <h3 className="text-[1rem] font-medium text-foreground">
              Innehåll som inte omfattas av lagen
            </h3>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-[0.9375rem]">
              <li>
                Tredjepartstjänster (AI-assistenter via Intric) som vi inte har
                full kontroll över.
              </li>
            </ul>
          </div>
        </div>

        <p>
          Vi arbetar kontinuerligt med att åtgärda identifierade brister.
        </p>
      </Section>

      {/* 4. Kontakta oss */}
      <Section label="04" heading="Rapportera brister">
        <p>
          Om du upptäcker tillgänglighetsproblem som inte beskrivs på denna sida,
          eller om du behöver innehåll i ett tillgängligt format, kontakta oss:
        </p>
        <div className="rounded-lg border border-border bg-card p-6 text-[0.9375rem]">
          <p>
            <strong className="text-foreground">E-post:</strong>{" "}
            <a
              href="mailto:digitaliseringsavdelningen@katrineholm.se"
              className="text-foreground underline underline-offset-4 hover:opacity-80"
            >
              digitaliseringsavdelningen@katrineholm.se
            </a>
          </p>
          <p className="mt-2">
            Du kan även använda vårt{" "}
            <Link
              href="/kontakt"
              className="text-foreground underline underline-offset-4 hover:opacity-80"
            >
              kontaktformulär
            </Link>
            .
          </p>
        </div>
        <p>
          Vi försöker besvara din begäran inom fem arbetsdagar.
        </p>
      </Section>

      {/* 5. Tillsyn */}
      <Section label="05" heading="Tillsyn">
        <p>
          Myndigheten för digital förvaltning (DIGG) ansvarar för tillsyn av
          DOS-lagen. Om du inte är nöjd med hur vi hanterar din begäran om
          tillgänglighet kan du anmäla till DIGG:
        </p>
        <div className="rounded-lg border border-border bg-card p-6 text-[0.9375rem]">
          <p>
            <strong className="text-foreground">
              Myndigheten för digital förvaltning (DIGG)
            </strong>
          </p>
          <p className="mt-2">
            <a
              href="https://www.digg.se/tdosanmalan"
              className="text-foreground underline underline-offset-4 hover:opacity-80"
              target="_blank"
              rel="noopener noreferrer"
            >
              Anmäl bristande tillgänglighet till DIGG
            </a>
          </p>
          <p className="mt-1">
            E-post:{" "}
            <a
              href="mailto:info@digg.se"
              className="text-foreground underline underline-offset-4 hover:opacity-80"
            >
              info@digg.se
            </a>
          </p>
        </div>
      </Section>

      {/* 6. Teknisk information */}
      <Section label="06" heading="Teknisk information">
        <p>
          Denna webbplats eftersträvar att uppfylla nivå AA i standarden{" "}
          <strong className="text-foreground">EN 301 549</strong>, som hänvisar
          till{" "}
          <strong className="text-foreground">
            Web Content Accessibility Guidelines (WCAG) 2.1
          </strong>
          .
        </p>
        <div className="overflow-x-auto">
          <table className="w-full text-[0.9375rem]">
            <tbody className="divide-y divide-border">
              <tr>
                <td className="py-3 pr-4 font-medium text-foreground">Webbplats</td>
                <td className="py-3">AI-hubben</td>
              </tr>
              <tr>
                <td className="py-3 pr-4 font-medium text-foreground">Efterlevnadsstatus</td>
                <td className="py-3">Delvis förenlig med DOS-lagen</td>
              </tr>
              <tr>
                <td className="py-3 pr-4 font-medium text-foreground">Standard</td>
                <td className="py-3">EN 301 549 / WCAG 2.1 nivå AA</td>
              </tr>
              <tr>
                <td className="py-3 pr-4 font-medium text-foreground">Bedömningsmetod</td>
                <td className="py-3">Intern bedömning (självskattning)</td>
              </tr>
              <tr>
                <td className="py-3 pr-4 font-medium text-foreground">Bedömningsdatum</td>
                <td className="py-3">25 mars 2026</td>
              </tr>
              <tr>
                <td className="py-3 pr-4 font-medium text-foreground">Senast uppdaterad</td>
                <td className="py-3">25 mars 2026</td>
              </tr>
            </tbody>
          </table>
        </div>
      </Section>

      {/* Bottom spacing */}
      <div className="pb-16" />
    </>
  );
}
