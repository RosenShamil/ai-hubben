"use client";

import { useState, useMemo } from "react";
import {
  Search,
  FileText,
  Shield,
  BookOpen,
  BarChart3,
  FileSpreadsheet,
  File,
  ExternalLink,
  Clock,
  GraduationCap,
  Bot,
  Layers,
  Database,
  Settings,
  Lock,
  Code,
  ArrowRight,
  Play,
} from "lucide-react";
import { FadeIn } from "@/components/shared/fade-in";
import { BRAND_GRADIENT } from "@/lib/constants";
import type { Document } from "@/lib/documents";

const CATEGORIES = [
  { value: "alla", label: "Alla" },
  { value: "riktlinje", label: "Riktlinjer" },
  { value: "policy", label: "Policyer" },
  { value: "guide", label: "Guider" },
  { value: "rapport", label: "Rapporter" },
  { value: "mall", label: "Mallar" },
  { value: "video", label: "Video" },
  { value: "ovrigt", label: "Övrigt" },
] as const;

const CATEGORY_LABEL: Record<string, string> = {
  riktlinje: "Riktlinje",
  policy: "Policy",
  guide: "Guide",
  rapport: "Rapport",
  mall: "Mall",
  video: "Video",
  ovrigt: "Övrigt",
};

const CATEGORY_ICON: Record<string, typeof FileText> = {
  riktlinje: FileText,
  policy: Shield,
  guide: BookOpen,
  rapport: BarChart3,
  mall: FileSpreadsheet,
  video: Play,
  ovrigt: File,
};

const CATEGORY_COLOR: Record<string, string> = {
  riktlinje:
    "bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300",
  policy:
    "bg-purple-100 text-purple-700 dark:bg-purple-950 dark:text-purple-300",
  guide:
    "bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-300",
  rapport:
    "bg-orange-100 text-orange-700 dark:bg-orange-950 dark:text-orange-300",
  mall: "bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300",
  video: "bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-300",
  ovrigt:
    "bg-neutral-100 text-neutral-600 dark:bg-neutral-800 dark:text-neutral-300",
};

const INTRIC_SECTIONS = [
  {
    title: "Kom igång",
    description: "Grundkurs i Intric — från första prompten till publicerad assistent.",
    url: "https://help.intric.ai/sv/training/get-started-with-intric/",
    icon: GraduationCap,
    color: "#3498db",
    articles: 7,
  },
  {
    title: "Assistenter",
    description: "Skapa, konfigurera och dela AI-assistenter med prompter, kunskap och verktyg.",
    url: "https://help.intric.ai/sv/docs/assistenter/",
    icon: Bot,
    color: "#9b59b6",
    articles: 8,
  },
  {
    title: "Planer",
    description: "Bygg flerstegsarbetsflöden, schemalägg och automatisera uppgifter.",
    url: "https://help.intric.ai/sv/docs/plans/",
    icon: Layers,
    color: "#e5651a",
    articles: 3,
  },
  {
    title: "Kunskap & Data",
    description: "RAG, samlingar, webbplatser och verktyg för att ge assistenter kontext.",
    url: "https://help.intric.ai/sv/docs/kunskap-data/",
    icon: Database,
    color: "#27ae60",
    articles: 4,
  },
  {
    title: "Administration",
    description: "AI-modeller, säkerhetsklassning, granskningslogg, användare och insikter.",
    url: "https://help.intric.ai/sv/docs/administration/",
    icon: Settings,
    color: "#c83228",
    articles: 9,
  },
  {
    title: "Säkerhet & Compliance",
    description: "GDPR, AI-förordningen, DPIA, certifieringar och dataflöden.",
    url: "https://help.intric.ai/sv/docs/sakerhet-compliance/",
    icon: Lock,
    color: "#2c3e50",
    articles: 10,
  },
  {
    title: "Spaces",
    description: "Roller, strukturering, säkerhetsklassificering och samarbete.",
    url: "https://help.intric.ai/sv/docs/spaces/",
    icon: FileSpreadsheet,
    color: "#1abc9c",
    articles: 5,
  },
  {
    title: "Teknisk dokumentation",
    description: "Driftalternativ, språkmodeller, SSO, verktyg och on-prem-installation.",
    url: "https://help.intric.ai/sv/docs/teknisk-dokumentation/",
    icon: Code,
    color: "#7f8c8d",
    articles: 5,
  },
];

function getYouTubeId(url: string): string | null {
  const match = url.match(
    /(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|shorts\/))([^?&/#]+)/
  );
  return match?.[1] ?? null;
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("sv-SE", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function DokumentationPage({
  documents,
}: {
  documents: Document[];
}) {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("alla");

  const filtered = useMemo(() => {
    let result = documents;

    if (activeCategory !== "alla") {
      result = result.filter((d) => d.category === activeCategory);
    }

    if (query) {
      const q = query.toLowerCase();
      result = result.filter(
        (d) =>
          d.title.toLowerCase().includes(q) ||
          (d.description && d.description.toLowerCase().includes(q))
      );
    }

    return result;
  }, [documents, query, activeCategory]);

  return (
    <>
      {/* Hero */}
      <section className="mx-auto max-w-[68.75rem] px-6 pt-20 pb-12 md:pt-28 md:pb-16">
        <FadeIn>
          <p
            className="text-[0.6875rem] font-medium uppercase tracking-[0.15em] text-muted-foreground"
            style={{ fontFamily: "var(--font-geist-mono), monospace" }}
          >
            Resurser
          </p>
          <h1
            className="mt-4 text-[2.75rem] leading-[1.1] tracking-[-0.04em] md:text-[4.5rem]"
            style={{
              fontFamily: "var(--font-bodoni), serif",
              fontWeight: 400,
            }}
          >
            Dokumentation
          </h1>
          <p className="mt-6 max-w-[42rem] text-[1.0625rem] leading-[1.7] text-muted-foreground">
            Riktlinjer, policyer och dokument som styr kommunens AI-arbete.
            Hitta guider, rapporter och mallar samlade på ett ställe.
          </p>
        </FadeIn>
      </section>

      {/* Search + Filters */}
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
              placeholder="Sök dokument..."
              className="w-full rounded-lg border border-border bg-card py-3.5 pl-12 pr-5 text-[0.9375rem] outline-none transition-colors focus:border-foreground"
            />
          </div>
        </FadeIn>

        <FadeIn delay={0.15}>
          <div className="mt-4 flex flex-wrap gap-2">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.value}
                onClick={() => setActiveCategory(cat.value)}
                className={`rounded-full px-4 py-1.5 text-[0.8125rem] font-medium transition-all duration-150 ${
                  activeCategory === cat.value
                    ? "bg-foreground text-background"
                    : "border border-border bg-card text-muted-foreground hover:text-foreground hover:border-foreground/30"
                }`}
                style={{
                  fontFamily: "var(--font-geist-mono), monospace",
                }}
              >
                {cat.label}
              </button>
            ))}
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
              Inga dokument hittades
            </p>
            <p className="mt-2 text-[0.875rem] text-muted-foreground">
              {query || activeCategory !== "alla"
                ? "Prova att ändra din sökning eller filter."
                : "Inga dokument har publicerats ännu."}
            </p>
          </div>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((doc, i) => {
              const Icon = CATEGORY_ICON[doc.category] || File;
              const hasFile = !!doc.file_url;
              const youtubeId = doc.youtube_url
                ? getYouTubeId(doc.youtube_url)
                : null;
              const hasLink = hasFile || !!youtubeId;

              const cardContent = (
                <div className="group relative cursor-pointer rounded-lg transition-all duration-300">
                  {/* Travel flash */}
                  <div className="absolute -inset-px overflow-hidden rounded-lg opacity-0 transition-opacity duration-300 group-hover:opacity-100">
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
                    {/* YouTube thumbnail */}
                    {youtubeId && (
                      <div className="relative -mx-6 -mt-6 mb-0 overflow-hidden rounded-t-lg">
                        <img
                          src={`https://img.youtube.com/vi/${youtubeId}/hqdefault.jpg`}
                          alt=""
                          className="h-[160px] w-full object-cover"
                        />
                        <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-600 text-white">
                            <Play size={20} fill="white" />
                          </div>
                        </div>
                      </div>
                    )}
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-md border border-border bg-secondary text-muted-foreground transition-colors group-hover:text-foreground">
                        <Icon size={20} />
                      </div>
                      <div className="min-w-0 flex-1">
                        <h3 className="truncate text-[1rem] font-medium tracking-tight">
                          {doc.title}
                        </h3>
                        <div className="mt-0.5 flex items-center gap-2">
                          <span
                            className={`inline-block rounded-full px-2 py-0.5 text-[0.625rem] font-medium ${
                              CATEGORY_COLOR[doc.category] || ""
                            }`}
                            style={{
                              fontFamily:
                                "var(--font-geist-mono), monospace",
                            }}
                          >
                            {CATEGORY_LABEL[doc.category] || doc.category}
                          </span>
                          {!hasLink && (
                            <span
                              className="inline-flex items-center gap-1 rounded-full bg-amber-100 px-2 py-0.5 text-[0.625rem] font-medium text-amber-700 dark:bg-amber-950 dark:text-amber-300"
                              style={{
                                fontFamily:
                                  "var(--font-geist-mono), monospace",
                              }}
                            >
                              <Clock size={10} />
                              Kommer snart
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    {doc.description && (
                      <p className="line-clamp-2 text-[0.875rem] leading-[1.6] text-muted-foreground">
                        {doc.description}
                      </p>
                    )}
                    <div className="flex items-center justify-between">
                      <span className="text-[0.75rem] text-muted-foreground">
                        {formatDate(doc.created_at)}
                      </span>
                      {hasFile && (
                        <span className="flex items-center gap-1 text-[0.75rem] text-muted-foreground transition-colors group-hover:text-foreground">
                          <ExternalLink size={12} />
                          Öppna
                        </span>
                      )}
                      {youtubeId && !hasFile && (
                        <span className="flex items-center gap-1 text-[0.75rem] text-red-500 transition-colors group-hover:text-red-400">
                          <Play size={12} />
                          Video
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              );

              const linkUrl = hasFile
                ? doc.file_url!
                : youtubeId
                  ? doc.youtube_url!
                  : null;

              return (
                <FadeIn key={doc.id} delay={i * 0.05}>
                  {linkUrl ? (
                    <a
                      href={linkUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {cardContent}
                    </a>
                  ) : (
                    cardContent
                  )}
                </FadeIn>
              );
            })}
          </div>
        )}
      </section>

      {/* Gradient divider */}
      <div className="mx-auto max-w-[68.75rem] px-6">
        <div className="h-px" style={{ background: BRAND_GRADIENT }} />
      </div>

      {/* Intric Help Center */}
      <section className="mx-auto max-w-[68.75rem] px-6 py-12 md:py-16">
        <FadeIn>
          <p
            className="text-[0.6875rem] font-medium uppercase tracking-[0.15em] text-muted-foreground"
            style={{ fontFamily: "var(--font-geist-mono), monospace" }}
          >
            Plattform
          </p>
          <h2
            className="mt-4 text-[1.75rem] leading-[1.1] tracking-[-0.04em] md:text-[2.75rem]"
            style={{
              fontFamily: "var(--font-bodoni), serif",
              fontWeight: 400,
            }}
          >
            Intric — Dokumentation
          </h2>
          <p className="mt-4 max-w-[42rem] text-[1.0625rem] leading-[1.7] text-muted-foreground">
            Lär dig använda Intric-plattformen. Guider, utbildningsmaterial och
            teknisk dokumentation direkt från Intric.
          </p>
        </FadeIn>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {INTRIC_SECTIONS.map((section, i) => {
            const Icon = section.icon;
            return (
              <FadeIn key={section.title} delay={i * 0.05}>
                <a
                  href={section.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <div className="group relative cursor-pointer rounded-lg transition-all duration-300">
                    <div className="absolute -inset-px overflow-hidden rounded-lg opacity-0 transition-opacity duration-300 group-hover:opacity-100">
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
                    <div className="relative flex flex-col gap-4 rounded-lg border border-border bg-card p-6 transition-all duration-300 group-hover:bg-secondary group-hover:shadow-lg">
                      <div className="flex items-center gap-3">
                        <div
                          className="flex h-10 w-10 items-center justify-center rounded-md text-[0.875rem] font-semibold text-white"
                          style={{ backgroundColor: section.color }}
                        >
                          <Icon size={20} />
                        </div>
                        <h3 className="text-[1rem] font-medium tracking-tight">
                          {section.title}
                        </h3>
                      </div>
                      <p className="line-clamp-2 text-[0.875rem] leading-[1.6] text-muted-foreground">
                        {section.description}
                      </p>
                      <div className="flex items-center gap-1 text-[0.75rem] text-muted-foreground transition-colors group-hover:text-foreground">
                        <span>{section.articles} artiklar</span>
                        <ArrowRight size={12} className="ml-1" />
                      </div>
                    </div>
                  </div>
                </a>
              </FadeIn>
            );
          })}
        </div>
      </section>
    </>
  );
}
