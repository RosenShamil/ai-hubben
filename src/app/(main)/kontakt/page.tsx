import type { Metadata } from "next";
import { Mail, Phone, Building2, Headset } from "lucide-react";
import { FadeIn } from "@/components/shared/fade-in";
import { ContactForm } from "@/components/kontakt/contact-form";
import { BRAND_GRADIENT } from "@/lib/constants";

export const metadata: Metadata = { title: "Kontakt" };

export default function KontaktPage() {
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
            className="mt-4 text-[2.75rem] leading-[1.1] tracking-[-0.04em] md:text-[4.5rem]"
            style={{
              fontFamily: "var(--font-bodoni), serif",
              fontWeight: 400,
            }}
          >
            Hör av dig
          </h1>
          <p className="mt-6 max-w-[42rem] text-[1.0625rem] leading-[1.7] text-muted-foreground">
            Har du frågor, feedback eller förslag kring AI-hubben eller
            kommunens digitala utveckling? Vi finns här för att hjälpa.
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
                {/* Department */}
                <div>
                  <div className="flex items-center gap-2">
                    <Building2 size={18} className="text-muted-foreground" />
                    <p
                      className="text-[0.6875rem] font-medium uppercase tracking-[0.15em] text-muted-foreground"
                      style={{
                        fontFamily: "var(--font-geist-mono), monospace",
                      }}
                    >
                      Avdelning
                    </p>
                  </div>
                  <h3 className="mt-3 text-[1.125rem] font-medium tracking-tight">
                    Digitaliseringsavdelningen
                  </h3>
                  <p className="mt-1 text-[0.9375rem] text-muted-foreground">
                    Katrineholms kommun
                  </p>
                </div>

                {/* Email */}
                <div>
                  <div className="flex items-center gap-2">
                    <Mail size={18} className="text-muted-foreground" />
                    <p
                      className="text-[0.6875rem] font-medium uppercase tracking-[0.15em] text-muted-foreground"
                      style={{
                        fontFamily: "var(--font-geist-mono), monospace",
                      }}
                    >
                      E-post
                    </p>
                  </div>
                  <a
                    href="mailto:digitaliseringsavdelningen@katrineholm.se"
                    className="mt-3 block text-[0.9375rem] text-foreground underline decoration-border underline-offset-4 transition-colors hover:decoration-foreground"
                  >
                    digitaliseringsavdelningen@katrineholm.se
                  </a>
                </div>

                {/* Servicedesk */}
                <div className="rounded-lg border border-border bg-card p-6">
                  <div className="flex items-center gap-2">
                    <Headset size={18} className="text-muted-foreground" />
                    <p
                      className="text-[0.6875rem] font-medium uppercase tracking-[0.15em] text-muted-foreground"
                      style={{
                        fontFamily: "var(--font-geist-mono), monospace",
                      }}
                    >
                      IT-support
                    </p>
                  </div>
                  <p className="mt-3 text-[0.9375rem] text-muted-foreground">
                    För teknisk support och IT-ärenden, kontakta Servicedesk.
                  </p>
                  <div className="mt-4 space-y-2">
                    <a
                      href="tel:015056900"
                      className="flex items-center gap-2 text-[0.9375rem] text-muted-foreground transition-colors hover:text-foreground"
                    >
                      <Phone size={14} />
                      0150-569 00
                    </a>
                    <a
                      href="mailto:6900@katrineholm.se"
                      className="flex items-center gap-2 text-[0.9375rem] text-muted-foreground transition-colors hover:text-foreground"
                    >
                      <Mail size={14} />
                      6900@katrineholm.se
                    </a>
                  </div>
                </div>
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
