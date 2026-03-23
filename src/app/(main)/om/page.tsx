import type { Metadata } from "next";
import {
  Server,
  Shield,
  Code,
  Bot,
  Package,
  Users,
  Mail,
} from "lucide-react";
import { FadeIn } from "@/components/shared/fade-in";
import { BRAND_GRADIENT } from "@/lib/constants";
import { fetchTeamMembers, fetchSiteContent } from "@/lib/team";
import type { TeamMember } from "@/lib/team";

export const metadata: Metadata = { title: "Om AI-hubben" };
export const revalidate = 60;

/* ── helpers ─────────────────────────────────────────────── */

function nameToColor(name: string): string {
  const COLORS = [
    "#c83228",
    "#fb873f",
    "#59824f",
    "#2874d7",
    "#9b59b6",
    "#e5651a",
    "#1abc9c",
    "#2c3e50",
    "#d4a017",
    "#27ae60",
  ];
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  return COLORS[Math.abs(hash) % COLORS.length];
}

function getInitials(name: string): string {
  return name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

/* ── data ────────────────────────────────────────────────── */

const AREAS = [
  {
    icon: Server,
    title: "Systemförvaltning",
    description:
      "Drift, underhåll och vidareutveckling av kommunens digitala system.",
  },
  {
    icon: Shield,
    title: "Informationssäkerhet",
    description:
      "Skydd av data, riskanalyser och efterlevnad av regelverk.",
  },
  {
    icon: Code,
    title: "Digital utveckling",
    description:
      "Nya digitala tjänster och modernisering av befintliga lösningar.",
  },
  {
    icon: Bot,
    title: "AI & Innovation",
    description:
      "Implementering av AI-lösningar och utforskning av ny teknik.",
  },
  {
    icon: Package,
    title: "Licenser & Inköp",
    description:
      "Hantering av programlicenser, hårdvara och leverantörsavtal.",
  },
  {
    icon: Users,
    title: "Samverkan",
    description:
      "Samarbete med verksamheter, leverantörer och andra kommuner.",
  },
];

/* ── team card (client-safe via FadeIn wrapper) ──────────── */

function TeamCard({ member, index }: { member: TeamMember; index: number }) {
  const color = nameToColor(member.name);
  const initials = getInitials(member.name);
  return (
    <FadeIn key={member.id} delay={index * 0.05}>
      <div className="group flex h-full flex-col rounded-lg border border-border bg-card p-6 transition-all duration-300 hover:bg-secondary hover:shadow-lg">
        <div className="flex items-center gap-4">
          {member.image_url ? (
            <img
              src={member.image_url}
              alt={member.name}
              className="h-12 w-12 shrink-0 rounded-full object-cover"
            />
          ) : (
            <div
              className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-[0.875rem] font-semibold text-white"
              style={{ backgroundColor: color }}
            >
              {initials}
            </div>
          )}
          <div className="min-w-0">
            <h3 className="text-[1rem] font-medium tracking-tight">
              {member.name}
            </h3>
            <p
              className="mt-0.5 text-[0.8125rem] text-muted-foreground"
              style={{
                fontFamily: "var(--font-geist-mono), monospace",
              }}
            >
              {member.role}
            </p>
          </div>
        </div>

        <div className="mt-auto pt-4">
          {member.email ? (
            <a
              href={`mailto:${member.email}`}
              className="flex items-center gap-1.5 text-[0.8125rem] text-muted-foreground transition-colors hover:text-foreground"
            >
              <Mail size={14} />
              {member.email}
            </a>
          ) : (
            <div className="h-5" />
          )}
        </div>
      </div>
    </FadeIn>
  );
}

/* ── page ────────────────────────────────────────────────── */

export default async function OmPage() {
  const [teamMembers, uppdragText, visionText] = await Promise.all([
    fetchTeamMembers(),
    fetchSiteContent("om_uppdrag"),
    fetchSiteContent("om_vision"),
  ]);

  const uppdragParagraphs = uppdragText
    ? uppdragText.split("\n\n").filter((p) => p.trim())
    : [];

  return (
    <>
      {/* Hero */}
      <section className="mx-auto max-w-[68.75rem] px-6 pt-20 pb-12 md:pt-28 md:pb-16">
        <FadeIn>
          <p
            className="text-[0.6875rem] font-medium uppercase tracking-[0.15em] text-muted-foreground"
            style={{ fontFamily: "var(--font-geist-mono), monospace" }}
          >
            Om oss
          </p>
          <h1
            className="mt-4 text-[1.75rem] leading-[1.1] tracking-[-0.04em] sm:text-[2.75rem] md:text-[4.5rem]"
            style={{
              fontFamily: "var(--font-bodoni), serif",
              fontWeight: 400,
            }}
          >
            Digitaliseringsavdelningen
          </h1>
          <p className="mt-6 max-w-[42rem] text-[1.0625rem] leading-[1.7] text-muted-foreground">
            Vi driver Katrineholms kommuns digitala utveckling — från
            systemförvaltning och informationssäkerhet till AI-implementering
            och innovation.
          </p>
        </FadeIn>
      </section>

      {/* Gradient divider */}
      <div className="mx-auto max-w-[68.75rem] px-6">
        <div className="h-px" style={{ background: BRAND_GRADIENT }} />
      </div>

      {/* Uppdrag */}
      <section className="mx-auto max-w-[68.75rem] px-6 py-12 md:py-16">
        <FadeIn>
          <p
            className="text-[0.6875rem] font-medium uppercase tracking-[0.15em] text-muted-foreground"
            style={{ fontFamily: "var(--font-geist-mono), monospace" }}
          >
            Uppdrag
          </p>
          <h2
            className="mt-4 text-[1.75rem] leading-[1.1] tracking-[-0.04em] md:text-[2.75rem]"
            style={{
              fontFamily: "var(--font-bodoni), serif",
              fontWeight: 400,
            }}
          >
            Vårt uppdrag
          </h2>
        </FadeIn>

        <FadeIn delay={0.1}>
          <div className="mt-8 max-w-[52rem] space-y-6 text-[1.0625rem] leading-[1.8] text-muted-foreground">
            {uppdragParagraphs.length > 0 ? (
              uppdragParagraphs.map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))
            ) : (
              <p className="italic">Uppdragstext kommer snart.</p>
            )}
          </div>
        </FadeIn>
      </section>

      {/* Gradient divider */}
      <div className="mx-auto max-w-[68.75rem] px-6">
        <div className="h-px" style={{ background: BRAND_GRADIENT }} />
      </div>

      {/* Vision */}
      <section className="mx-auto max-w-[68.75rem] px-6 py-12 md:py-16">
        <FadeIn>
          <p
            className="text-[0.6875rem] font-medium uppercase tracking-[0.15em] text-muted-foreground"
            style={{ fontFamily: "var(--font-geist-mono), monospace" }}
          >
            Vision
          </p>
          <h2
            className="mt-4 text-[1.75rem] leading-[1.1] tracking-[-0.04em] md:text-[2.75rem]"
            style={{
              fontFamily: "var(--font-bodoni), serif",
              fontWeight: 400,
            }}
          >
            Vår vision
          </h2>
        </FadeIn>

        <FadeIn delay={0.1}>
          <div
            className="mt-8 rounded-lg border border-border bg-card p-8"
            style={{ borderLeft: `4px solid transparent`, borderImage: `${BRAND_GRADIENT} 1` }}
          >
            <p className="text-[1.125rem] leading-[1.8] text-muted-foreground italic">
              &ldquo;{visionText || "Vår vision formuleras i dialog med verksamheterna och kommer att uppdateras här inom kort."}&rdquo;
            </p>
            {!visionText && (
              <p
                className="mt-4 text-[0.75rem] uppercase tracking-[0.1em] text-muted-foreground"
                style={{ fontFamily: "var(--font-geist-mono), monospace" }}
              >
                Kommer snart
              </p>
            )}
          </div>
        </FadeIn>
      </section>

      {/* Gradient divider */}
      <div className="mx-auto max-w-[68.75rem] px-6">
        <div className="h-px" style={{ background: BRAND_GRADIENT }} />
      </div>

      {/* Teamet */}
      <section className="mx-auto max-w-[68.75rem] px-6 py-12 md:py-16">
        <FadeIn>
          <p
            className="text-[0.6875rem] font-medium uppercase tracking-[0.15em] text-muted-foreground"
            style={{ fontFamily: "var(--font-geist-mono), monospace" }}
          >
            Människorna
          </p>
          <h2
            className="mt-4 text-[1.75rem] leading-[1.1] tracking-[-0.04em] md:text-[2.75rem]"
            style={{
              fontFamily: "var(--font-bodoni), serif",
              fontWeight: 400,
            }}
          >
            Teamet
          </h2>
        </FadeIn>

        <div className="mt-10 grid gap-5 sm:grid-cols-2">
          {teamMembers.map((member, i) => (
            <TeamCard key={member.id} member={member} index={i} />
          ))}
        </div>
      </section>

      {/* Gradient divider */}
      <div className="mx-auto max-w-[68.75rem] px-6">
        <div className="h-px" style={{ background: BRAND_GRADIENT }} />
      </div>

      {/* Ansvarsområden */}
      <section className="mx-auto max-w-[68.75rem] px-6 py-12 md:py-16">
        <FadeIn>
          <p
            className="text-[0.6875rem] font-medium uppercase tracking-[0.15em] text-muted-foreground"
            style={{ fontFamily: "var(--font-geist-mono), monospace" }}
          >
            Kompetens
          </p>
          <h2
            className="mt-4 text-[1.75rem] leading-[1.1] tracking-[-0.04em] md:text-[2.75rem]"
            style={{
              fontFamily: "var(--font-bodoni), serif",
              fontWeight: 400,
            }}
          >
            Ansvarsområden
          </h2>
        </FadeIn>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {AREAS.map((area, i) => {
            const Icon = area.icon;
            return (
              <FadeIn key={area.title} delay={i * 0.05}>
                <div className="rounded-lg border border-border bg-card p-6 transition-all duration-300 hover:bg-secondary hover:shadow-lg">
                  <div className="flex h-10 w-10 items-center justify-center rounded-md border border-border bg-secondary text-muted-foreground">
                    <Icon size={20} />
                  </div>
                  <h3 className="mt-4 text-[1rem] font-medium tracking-tight">
                    {area.title}
                  </h3>
                  <p className="mt-2 text-[0.875rem] leading-[1.6] text-foreground/85">
                    {area.description}
                  </p>
                </div>
              </FadeIn>
            );
          })}
        </div>
      </section>
    </>
  );
}
