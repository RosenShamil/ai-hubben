"use client";

import { useCallback } from "react";
import Image from "next/image";
import {
  Printer,
  FileText,
  Lightbulb,
  AlertTriangle,
} from "lucide-react";
import { BRAND_GRADIENT } from "@/lib/constants";
import type { Guide } from "@/lib/guides-data";

// ---------------------------------------------------------------------------
// PDF / Print view
// ---------------------------------------------------------------------------

interface GuidePdfProps {
  guide: Guide;
}

export function GuidePdf({ guide }: GuidePdfProps) {
  const handlePrint = useCallback(() => {
    window.print();
  }, []);

  return (
    <div>
      {/* Action buttons */}
      <div className="mb-6 flex gap-3 print:hidden">
        <button
          onClick={handlePrint}
          className="flex items-center gap-2 rounded-lg bg-foreground px-5 py-2.5 text-[0.8125rem] font-medium text-background transition-opacity hover:opacity-90"
        >
          <Printer size={14} />
          Skriv ut / Spara som PDF
        </button>
      </div>

      {/* Instructions */}
      <div className="mb-6 rounded-xl border border-border bg-card p-4 print:hidden">
        <div className="flex items-start gap-3">
          <FileText size={16} className="mt-0.5 shrink-0 text-muted-foreground" />
          <div className="text-[0.8125rem] leading-[1.6] text-muted-foreground">
            <p>
              Klicka på <strong>&quot;Skriv ut&quot;</strong> och välj{" "}
              <strong>&quot;Spara som PDF&quot;</strong> som skrivare för att ladda ner guiden.
            </p>
            <p className="mt-1">
              PDF:en innehåller alla steg, skärmdumpar, exempel och tips — perfekt för utskrift eller offline-användning.
            </p>
          </div>
        </div>
      </div>

      {/* Printable content */}
      <div className="rounded-2xl border border-border bg-card print:rounded-none print:border-none">
        {/* PDF header */}
        <div className="border-b border-border p-6 md:p-8 print:border-b-2 print:border-gray-200">
          <div className="flex items-center gap-2 print:gap-3">
            <div
              className="h-1 w-8 rounded-full print:w-12"
              style={{ background: BRAND_GRADIENT }}
            />
            <span
              className="text-[0.6875rem] font-medium uppercase tracking-[0.15em] text-muted-foreground print:text-[0.75rem] print:text-gray-500"
              style={{ fontFamily: "var(--font-geist-mono), monospace" }}
            >
              AI-hubben Lathund
            </span>
          </div>
          <h2
            className="mt-4 text-[1.5rem] leading-[1.1] tracking-[-0.03em] md:text-[2rem] print:text-[1.75rem] print:text-black"
            style={{ fontFamily: "var(--font-bodoni), serif", fontWeight: 400 }}
          >
            {guide.title}
          </h2>
          <p className="mt-3 max-w-xl text-[0.9375rem] leading-[1.6] text-muted-foreground print:text-[0.875rem] print:text-gray-600">
            {guide.description}
          </p>
          <div className="mt-4 flex gap-4 text-[0.75rem] text-muted-foreground print:text-gray-500">
            <span>Målgrupp: {guide.audienceLabel}</span>
            <span>·</span>
            <span>{guide.estimatedMinutes} min</span>
            <span>·</span>
            <span>{guide.steps.length} steg</span>
          </div>
        </div>

        {/* Steps */}
        <div className="divide-y divide-border print:divide-gray-200">
          {guide.steps.map((step, i) => (
            <div
              key={step.id}
              className="p-6 md:p-8 print:break-inside-avoid print:p-6"
            >
              {/* Step header */}
              <div className="flex items-start gap-3">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-foreground text-[0.75rem] font-semibold text-background print:border-2 print:border-gray-800 print:bg-white print:text-gray-800">
                  {i + 1}
                </span>
                <div>
                  <h3 className="text-[1.0625rem] font-medium leading-[1.3] tracking-[-0.01em] print:text-[1rem] print:text-black">
                    {step.title}
                  </h3>
                  <p className="mt-1 text-[0.875rem] text-muted-foreground print:text-gray-600">
                    {step.description}
                  </p>
                </div>
              </div>

              {/* Screenshots */}
              {step.images && step.images.length > 0 && (
                <div className="ml-10 mt-4 space-y-3">
                  {step.images.map((img, j) => (
                    <div key={j}>
                      <div className="overflow-hidden rounded-lg border border-border print:border-gray-300">
                        <Image
                          src={img.src}
                          alt={img.alt}
                          width={600}
                          height={375}
                          className="w-full h-auto"
                          sizes="(max-width: 768px) 100vw, 550px"
                        />
                      </div>
                      {img.caption && (
                        <p className="mt-1 text-[0.6875rem] text-muted-foreground print:text-gray-500">
                          {img.caption}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {/* Instructions */}
              <div className="ml-10 mt-4 space-y-2.5">
                {step.instructions.map((instruction, j) => (
                  <div key={j} className="flex gap-2.5">
                    <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-muted-foreground/40 print:bg-gray-400" />
                    <p className="text-[0.875rem] leading-[1.7] text-foreground/90 print:text-gray-800">
                      {instruction}
                    </p>
                  </div>
                ))}
              </div>

              {/* Examples */}
              {step.examples && step.examples.length > 0 && (
                <div className="ml-10 mt-4">
                  <p className="mb-2 text-[0.8125rem] font-medium text-foreground print:text-black">
                    Exempel
                  </p>
                  <div className="space-y-2">
                    {step.examples.map((example, j) => (
                      <div
                        key={j}
                        className="rounded-lg border border-border bg-secondary/40 p-3 print:border-gray-300 print:bg-gray-50"
                      >
                        <p className="text-[0.6875rem] font-medium uppercase tracking-wide text-muted-foreground print:text-gray-500">
                          {example.task}
                        </p>
                        <p className="mt-1 text-[0.8125rem] leading-[1.6] text-foreground/90 italic print:text-gray-800">
                          &ldquo;{example.prompt}&rdquo;
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Tip */}
              {step.tip && (
                <div className="ml-10 mt-4 flex gap-2.5 rounded-lg bg-amber-50 p-3 print:border print:border-amber-200 dark:bg-amber-950/20">
                  <Lightbulb
                    size={14}
                    className="mt-0.5 shrink-0 text-amber-600 dark:text-amber-400 print:text-amber-600"
                  />
                  <p className="text-[0.8125rem] leading-[1.6] text-amber-900 dark:text-amber-200 print:text-amber-900">
                    <span className="font-medium">Tips: </span>
                    {step.tip}
                  </p>
                </div>
              )}

              {/* Warning */}
              {step.warning && (
                <div className="ml-10 mt-3 flex gap-2.5 rounded-lg bg-red-50 p-3 print:border print:border-red-200 dark:bg-red-950/20">
                  <AlertTriangle
                    size={14}
                    className="mt-0.5 shrink-0 text-red-600 dark:text-red-400 print:text-red-600"
                  />
                  <p className="text-[0.8125rem] leading-[1.6] text-red-900 dark:text-red-200 print:text-red-900">
                    <span className="font-medium">Viktigt: </span>
                    {step.warning}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="border-t border-border p-6 text-center text-[0.75rem] text-muted-foreground print:border-gray-200 print:text-gray-500">
          <p>AI-hubben · Katrineholms kommun · ai-hubben.eu</p>
          <p className="mt-1">Denna lathund är en del av kommunens AI-utbildning.</p>
        </div>
      </div>
    </div>
  );
}
