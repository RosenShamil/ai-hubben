import type { Metadata } from "next";
import { FadeIn } from "@/components/shared/fade-in";

export const metadata: Metadata = { title: "Utbildning" };

export default function UtbildningPage() {
  return (
    <section className="mx-auto max-w-[68.75rem] px-6 py-24 md:py-32">
      <FadeIn>
        <p
          className="text-[0.6875rem] font-medium uppercase tracking-[0.15em] text-muted-foreground"
          style={{ fontFamily: "var(--font-geist-mono), monospace" }}
        >
          Lärresurser
        </p>
        <h1
          className="mt-4 text-[2.75rem] leading-[1.1] tracking-[-0.04em] md:text-[4.5rem]"
          style={{ fontFamily: "var(--font-bodoni), serif", fontWeight: 400 }}
        >
          Utbildning
        </h1>
        <p className="mt-6 max-w-[42rem] text-[1.0625rem] leading-[1.7] text-muted-foreground">
          Guider, kurser och material för att komma igång med AI i kommunen.
        </p>
      </FadeIn>
    </section>
  );
}
