import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { ASSISTANTS } from "@/lib/mock-assistants";
import { FadeIn } from "@/components/shared/fade-in";
import { BRAND_GRADIENT } from "@/lib/constants";

export function generateStaticParams() {
  return ASSISTANTS.map((a) => ({ slug: a.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const assistant = ASSISTANTS.find((a) => a.slug === params.slug);
  if (!assistant) return { title: "Assistent inte hittad" };
  return { title: assistant.name };
}

export default function AssistantDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const assistant = ASSISTANTS.find((a) => a.slug === params.slug);
  if (!assistant) notFound();

  return (
    <>
      {/* Breadcrumb */}
      <section className="mx-auto max-w-[68.75rem] px-6 pt-8">
        <Link
          href="/assistenter"
          className="inline-flex items-center gap-2 text-[0.8125rem] text-muted-foreground transition-colors hover:text-foreground"
          style={{ fontFamily: "var(--font-geist-mono), monospace" }}
        >
          <ArrowLeft size={14} />
          Alla assistenter
        </Link>
      </section>

      {/* Header */}
      <section className="mx-auto max-w-[68.75rem] px-6 pt-12 pb-8 md:pt-16">
        <FadeIn>
          <div className="flex items-start gap-5">
            <div
              className="flex h-14 w-14 shrink-0 items-center justify-center rounded-lg border border-border bg-secondary text-[1.25rem] font-medium"
              style={{ fontFamily: "var(--font-geist-mono), monospace" }}
            >
              {assistant.name[0]}
            </div>
            <div>
              <h1
                className="text-[2rem] leading-[1.2] tracking-[-0.04em] md:text-[2.75rem]"
                style={{
                  fontFamily: "var(--font-bodoni), serif",
                  fontWeight: 400,
                }}
              >
                {assistant.name}
              </h1>
              <p className="mt-2 text-[1rem] text-muted-foreground">
                {assistant.organization}
              </p>
            </div>
          </div>

          {/* Badges */}
          <div className="mt-6 flex flex-wrap gap-2">
            <span
              className="rounded-full border border-border px-3 py-1.5 text-[0.6875rem] font-medium uppercase tracking-[0.05em] text-muted-foreground"
              style={{ fontFamily: "var(--font-geist-mono), monospace" }}
            >
              {assistant.model}
            </span>
            <span
              className="rounded-full border border-border px-3 py-1.5 text-[0.6875rem] font-medium uppercase tracking-[0.05em] text-muted-foreground"
              style={{ fontFamily: "var(--font-geist-mono), monospace" }}
            >
              {assistant.category}
            </span>
          </div>
        </FadeIn>
      </section>

      {/* Divider */}
      <div className="mx-auto max-w-[68.75rem] px-6">
        <div className="h-px" style={{ background: BRAND_GRADIENT }} />
      </div>

      {/* Content */}
      <section className="mx-auto max-w-[68.75rem] px-6 py-12 md:py-16">
        <div className="grid gap-12 md:grid-cols-[1fr_20rem]">
          {/* Main */}
          <div className="space-y-10">
            {/* Description */}
            <FadeIn>
              <div>
                <p
                  className="text-[0.6875rem] font-medium uppercase tracking-[0.15em] text-muted-foreground"
                  style={{
                    fontFamily: "var(--font-geist-mono), monospace",
                  }}
                >
                  Beskrivning
                </p>
                <p className="mt-3 text-[1.0625rem] leading-[1.7]">
                  {assistant.description}
                </p>
              </div>
            </FadeIn>

            {/* System Prompt */}
            {assistant.prompt && (
              <FadeIn delay={0.1}>
                <div>
                  <p
                    className="text-[0.6875rem] font-medium uppercase tracking-[0.15em] text-muted-foreground"
                    style={{
                      fontFamily: "var(--font-geist-mono), monospace",
                    }}
                  >
                    Systemprompt
                  </p>
                  <pre className="mt-3 whitespace-pre-wrap rounded-lg border border-border bg-secondary p-5 text-[0.8125rem] leading-[1.7] font-mono">
                    {assistant.prompt}
                  </pre>
                </div>
              </FadeIn>
            )}

            {/* Setup Instructions */}
            {assistant.setupInstructions && (
              <FadeIn delay={0.15}>
                <div>
                  <p
                    className="text-[0.6875rem] font-medium uppercase tracking-[0.15em] text-muted-foreground"
                    style={{
                      fontFamily: "var(--font-geist-mono), monospace",
                    }}
                  >
                    Setup-instruktioner
                  </p>
                  <div className="mt-3 whitespace-pre-wrap rounded-lg border border-border bg-secondary p-5 text-[0.875rem] leading-[1.7]">
                    {assistant.setupInstructions}
                  </div>
                </div>
              </FadeIn>
            )}
          </div>

          {/* Sidebar */}
          <FadeIn delay={0.1}>
            <div className="space-y-6">
              {/* Open assistant button */}
              {assistant.assistantLink && (
                <a
                  href={assistant.assistantLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-[0.8125rem] font-medium uppercase tracking-[0.01em] text-primary-foreground transition-all duration-150 active:scale-[0.98]"
                  style={{
                    fontFamily: "var(--font-geist-mono), monospace",
                    boxShadow:
                      "0px 2px 1px 0px rgba(255,255,255,0.15) inset, 0px -2px 1px 0px rgba(0,0,0,0.05) inset",
                  }}
                >
                  Öppna assistent
                  <ExternalLink size={14} />
                </a>
              )}

              {/* Info card */}
              <div className="rounded-lg border border-border bg-card p-5 space-y-4">
                <div>
                  <p
                    className="text-[0.6875rem] font-medium uppercase tracking-[0.1em] text-muted-foreground"
                    style={{
                      fontFamily: "var(--font-geist-mono), monospace",
                    }}
                  >
                    Modell
                  </p>
                  <p className="mt-1 text-[0.9375rem]">{assistant.model}</p>
                </div>
                <div
                  className="h-px"
                  style={{
                    background:
                      "linear-gradient(to right, transparent, var(--border) 50%, transparent)",
                  }}
                />
                <div>
                  <p
                    className="text-[0.6875rem] font-medium uppercase tracking-[0.1em] text-muted-foreground"
                    style={{
                      fontFamily: "var(--font-geist-mono), monospace",
                    }}
                  >
                    Kategori
                  </p>
                  <p className="mt-1 text-[0.9375rem]">
                    {assistant.category}
                  </p>
                </div>
                <div
                  className="h-px"
                  style={{
                    background:
                      "linear-gradient(to right, transparent, var(--border) 50%, transparent)",
                  }}
                />
                <div>
                  <p
                    className="text-[0.6875rem] font-medium uppercase tracking-[0.1em] text-muted-foreground"
                    style={{
                      fontFamily: "var(--font-geist-mono), monospace",
                    }}
                  >
                    Organisation
                  </p>
                  <p className="mt-1 text-[0.9375rem]">
                    {assistant.organization}
                  </p>
                </div>
                {assistant.submittedBy && (
                  <>
                    <div
                      className="h-px"
                      style={{
                        background:
                          "linear-gradient(to right, transparent, var(--border) 50%, transparent)",
                      }}
                    />
                    <div>
                      <p
                        className="text-[0.6875rem] font-medium uppercase tracking-[0.1em] text-muted-foreground"
                        style={{
                          fontFamily: "var(--font-geist-mono), monospace",
                        }}
                      >
                        Inskickad av
                      </p>
                      <p className="mt-1 text-[0.9375rem]">
                        {assistant.submittedBy}
                      </p>
                    </div>
                  </>
                )}
              </div>
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
