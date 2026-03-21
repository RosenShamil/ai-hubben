import type { Metadata } from "next";
import { Mail, Phone, Building2 } from "lucide-react";
import { FadeIn } from "@/components/shared/fade-in";
import { ContactForm } from "@/components/kontakt/contact-form";
import { BRAND_GRADIENT } from "@/lib/constants";
import { fetchSiteContent } from "@/lib/team";
import { fetchContactEntries } from "@/lib/contact-entries";
import type { ContactEntry } from "@/lib/contact-entries";

export const metadata: Metadata = { title: "Kontakt" };
export const revalidate = 60;

function ContactCard({ entry }: { entry: ContactEntry }) {
  const phoneHref = entry.phone?.replace(/[^+\d]/g, "") ?? "";

  const content = (
    <>
      <div className="flex items-center gap-2">
        <Building2 size={18} className="text-muted-foreground" />
        <p
          className="text-[0.6875rem] font-medium uppercase tracking-[0.15em] text-muted-foreground"
          style={{ fontFamily: "var(--font-geist-mono), monospace" }}
        >
          {entry.label}
        </p>
      </div>
      <h3 className="mt-3 text-[1.125rem] font-medium tracking-tight">
        {entry.title}
      </h3>
      {entry.description && (
        <p className="mt-1 text-[0.9375rem] text-muted-foreground">
          {entry.description}
        </p>
      )}
      <div className="mt-4 space-y-2">
        {entry.phone && (
          <a
            href={`tel:${phoneHref}`}
            className="flex items-center gap-2 text-[0.9375rem] text-muted-foreground transition-colors hover:text-foreground"
          >
            <Phone size={14} />
            {entry.phone}
          </a>
        )}
        {entry.email && (
          <a
            href={`mailto:${entry.email}`}
            className="flex items-center gap-2 text-[0.9375rem] text-muted-foreground transition-colors hover:text-foreground"
          >
            <Mail size={14} />
            {entry.email}
          </a>
        )}
      </div>
    </>
  );

  if (entry.is_highlighted) {
    return (
      <div className="rounded-lg border border-border bg-card p-6">
        {content}
      </div>
    );
  }

  return <div>{content}</div>;
}

export default async function KontaktPage() {
  const [heading, description, entries] = await Promise.all([
    fetchSiteContent("kontakt_heading"),
    fetchSiteContent("kontakt_description"),
    fetchContactEntries(),
  ]);

  const h = heading || "Hör av dig";
  const desc =
    description ||
    "Har du frågor, feedback eller förslag kring AI-hubben eller kommunens digitala utveckling? Vi finns här för att hjälpa.";

  return (
    <>
      {/* Hero */}
      <section className="mx-auto max-w-[68.75rem] px-6 pt-20 pb-12 md:pt-28 md:pb-16">
        <FadeIn>
          <p
            className="text-[0.6875rem] font-medium uppercase tracking-[0.15em] text-muted-foreground"
            style={{ fontFamily: "var(--font-geist-mono), monospace" }}
          >
            Kontakt
          </p>
          <h1
            className="mt-4 text-[1.75rem] leading-[1.1] tracking-[-0.04em] sm:text-[2.75rem] md:text-[4.5rem]"
            style={{
              fontFamily: "var(--font-bodoni), serif",
              fontWeight: 400,
            }}
          >
            {h}
          </h1>
          <p className="mt-6 max-w-[42rem] text-[1.0625rem] leading-[1.7] text-muted-foreground">
            {desc}
          </p>
        </FadeIn>
      </section>

      {/* Gradient divider */}
      <div className="mx-auto max-w-[68.75rem] px-6">
        <div className="h-px" style={{ background: BRAND_GRADIENT }} />
      </div>

      {/* Two-column layout */}
      <section className="mx-auto max-w-[68.75rem] px-6 py-12 md:py-16">
        <div className="grid gap-12 lg:grid-cols-5">
          {/* Left — Contact info */}
          <div className="lg:col-span-2">
            <FadeIn>
              <div className="space-y-8">
                {entries.map((entry) => (
                  <ContactCard key={entry.id} entry={entry} />
                ))}
              </div>
            </FadeIn>
          </div>

          {/* Right — Form */}
          <div className="lg:col-span-3">
            <FadeIn delay={0.1}>
              <ContactForm />
            </FadeIn>
          </div>
        </div>
      </section>
    </>
  );
}
