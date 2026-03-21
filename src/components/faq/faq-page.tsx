"use client";

import { useState, useMemo } from "react";
import { ChevronDown, Search, ArrowRight } from "lucide-react";
import Link from "next/link";
import { FadeIn } from "@/components/shared/fade-in";
import type { FAQ } from "@/lib/faqs";

function AccordionItem({ faq }: { faq: FAQ }) {
  const [open, setOpen] = useState(false);

  const paragraphs = faq.answer.split("\n\n").filter(Boolean);

  return (
    <div className="overflow-hidden rounded-lg border border-border bg-card transition-colors hover:border-foreground/20">
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
        aria-expanded={open}
      >
        <span className="text-[0.9375rem] font-medium leading-snug">
          {faq.question}
        </span>
        <ChevronDown
          size={18}
          className={`shrink-0 text-muted-foreground transition-transform duration-300 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>
      <div
        className="grid transition-all duration-300 ease-in-out"
        style={{
          gridTemplateRows: open ? "1fr" : "0fr",
        }}
      >
        <div className="overflow-hidden">
          <div className="border-t border-border px-5 pb-5 pt-4">
            {paragraphs.map((p, i) => (
              <p
                key={i}
                className="text-[0.875rem] leading-[1.7] text-muted-foreground [&:not(:first-child)]:mt-3"
              >
                {p}
              </p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export function FaqPage({ faqs }: { faqs: FAQ[] }) {
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    if (!search.trim()) return faqs;
    const q = search.toLowerCase();
    return faqs.filter(
      (f) =>
        f.question.toLowerCase().includes(q) ||
        f.answer.toLowerCase().includes(q)
    );
  }, [faqs, search]);

  return (
    <section className="mx-auto max-w-[68.75rem] px-6 py-24 md:py-32">
      {/* Hero */}
      <FadeIn>
        <p
          className="text-[0.6875rem] font-medium uppercase tracking-[0.15em] text-muted-foreground"
          style={{ fontFamily: "var(--font-geist-mono), monospace" }}
        >
          Support
        </p>
        <h1
          className="mt-4 text-[2.75rem] leading-[1.1] tracking-[-0.04em] md:text-[4.5rem]"
          style={{ fontFamily: "var(--font-bodoni), serif", fontWeight: 400 }}
        >
          Vanliga frågor
        </h1>
        <p className="mt-6 max-w-[42rem] text-[1.0625rem] leading-[1.7] text-muted-foreground">
          Svar på de vanligaste frågorna om AI-hubben och kommunens AI-arbete.
        </p>
      </FadeIn>

      {/* Search */}
      <FadeIn delay={0.1}>
        <div className="relative mt-12 max-w-[32rem]">
          <Search
            size={16}
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground"
          />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Sök bland frågorna..."
            className="w-full rounded-lg border border-border bg-card py-3 pl-10 pr-4 text-[0.875rem] outline-none transition-colors placeholder:text-muted-foreground/60 focus:border-foreground"
          />
        </div>
      </FadeIn>

      {/* FAQ list */}
      <div className="mt-10 space-y-3">
        {filtered.length === 0 ? (
          <FadeIn>
            <div className="rounded-lg border border-border bg-card px-6 py-12 text-center">
              <p className="text-[0.9375rem] text-muted-foreground">
                {faqs.length === 0
                  ? "Inga vanliga frågor har publicerats ännu."
                  : "Inga frågor matchade din sökning."}
              </p>
            </div>
          </FadeIn>
        ) : (
          filtered.map((faq, i) => (
            <FadeIn key={faq.id} delay={Math.min(i * 0.05, 0.3)}>
              <AccordionItem faq={faq} />
            </FadeIn>
          ))
        )}
      </div>

      {/* Contact CTA */}
      <FadeIn delay={0.2}>
        <div className="mt-16 rounded-lg border border-border bg-card px-6 py-8 text-center">
          <p
            className="text-[1.25rem] tracking-[-0.02em]"
            style={{ fontFamily: "var(--font-bodoni), serif", fontWeight: 400 }}
          >
            Hittar du inte svaret?
          </p>
          <p className="mt-2 text-[0.875rem] text-muted-foreground">
            Kontakta oss så hjälper vi dig.
          </p>
          <Link
            href="/kontakt"
            className="mt-5 inline-flex items-center gap-2 rounded-md bg-primary px-5 py-2.5 text-[0.8125rem] font-medium text-primary-foreground transition-all hover:opacity-90 active:scale-[0.98]"
            style={{
              fontFamily: "var(--font-geist-mono), monospace",
              boxShadow:
                "0px 2px 1px 0px rgba(255,255,255,0.15) inset, 0px -2px 1px 0px rgba(0,0,0,0.05) inset",
            }}
          >
            Kontakta oss
            <ArrowRight size={14} />
          </Link>
        </div>
      </FadeIn>
    </section>
  );
}
