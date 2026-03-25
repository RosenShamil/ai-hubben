import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Bot } from "lucide-react";
import { fetchAssistant } from "@/lib/intric";
import { FadeIn } from "@/components/shared/fade-in";
import { AssistantActions } from "@/components/assistenter/assistant-actions";
import { fetchChatLinks } from "@/lib/assistant-chat-links";
import { BRAND_GRADIENT } from "@/lib/constants";

// Color palette for letter avatars
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

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  try {
    const { id } = await params;
    const assistant = await fetchAssistant(id);
    return {
      title: `${assistant.name} — AI-hubben`,
      description: assistant.description,
    };
  } catch {
    return { title: "Assistent inte hittad" };
  }
}

export default async function AssistantDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  let assistant;
  let chatLinks: Record<string, string> = {};
  try {
    [assistant, chatLinks] = await Promise.all([
      fetchAssistant(id),
      fetchChatLinks(),
    ]);
  } catch {
    notFound();
  }

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
            {assistant.icon_url ? (
              <img
                src={assistant.icon_url}
                alt={assistant.name}
                className="h-14 w-14 shrink-0 rounded-lg border border-border object-cover"
              />
            ) : (
              <div
                className="flex h-14 w-14 shrink-0 items-center justify-center rounded-lg text-[1.25rem] font-semibold text-white"
                style={{
                  backgroundColor: getAvatarColor(assistant.name),
                  fontFamily: "var(--font-geist-mono), monospace",
                }}
              >
                {assistant.name[0]}
              </div>
            )}
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
            {assistant.setup_instructions && (
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
                    {assistant.setup_instructions}
                  </div>
                </div>
              </FadeIn>
            )}
          </div>

          {/* Sidebar */}
          <FadeIn delay={0.1}>
            <div className="space-y-6">
              {/* Assistant actions */}
              {assistant.assistant_link && (
                <AssistantActions
                  shareLink={assistant.assistant_link}
                  chatLink={chatLinks[assistant.id]}
                />
              )}

              {/* AI transparency notice (EU AI Act Art. 50) */}
              <div className="flex items-start gap-3 rounded-lg border border-border bg-secondary/50 p-4">
                <Bot size={16} className="mt-0.5 shrink-0 text-muted-foreground" />
                <p className="text-[0.8125rem] leading-[1.5] text-muted-foreground">
                  Denna assistent drivs av artificiell intelligens. Svaren
                  genereras automatiskt och bör alltid granskas av användaren.
                </p>
              </div>

              {/* Info card */}
              <div className="rounded-lg border border-border bg-card p-5 space-y-4">
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
                {assistant.submitted_by && (
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
                        {assistant.submitted_by}
                      </p>
                    </div>
                  </>
                )}
                {assistant.regions && assistant.regions.length > 0 && (
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
                        Regioner
                      </p>
                      <div className="mt-2 flex flex-wrap gap-1.5">
                        {assistant.regions.map((r) => (
                          <span
                            key={r}
                            className="rounded-full border border-border px-2.5 py-1 text-[0.625rem] font-medium uppercase tracking-[0.05em] text-muted-foreground"
                            style={{
                              fontFamily:
                                "var(--font-geist-mono), monospace",
                            }}
                          >
                            {r}
                          </span>
                        ))}
                      </div>
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
