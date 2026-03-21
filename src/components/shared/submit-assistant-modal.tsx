"use client";

import { useState } from "react";
import { X, Check, HelpCircle } from "lucide-react";

const REGIONS = [
  { value: "katrineholm", label: "Katrineholm" },
  { value: "sormland", label: "Sörmland" },
  { value: "nationell", label: "Nationell" },
];

export function SubmitAssistantModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [step, setStep] = useState<1 | 2 | "success">(1);
  const [form, setForm] = useState({
    name: "",
    assistantLink: "",
    organization: "",
    description: "",
    regions: [] as string[],
    prompt: "",
    setupInstructions: "",
    submittedBy: "",
  });

  function update(field: string, value: string | string[]) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  function toggleRegion(region: string) {
    setForm((prev) => ({
      ...prev,
      regions: prev.regions.includes(region)
        ? prev.regions.filter((r) => r !== region)
        : [...prev.regions, region],
    }));
  }

  function canProceed() {
    return (
      form.name.trim() &&
      form.assistantLink.trim() &&
      form.organization.trim() &&
      form.regions.length > 0
    );
  }

  function handleSubmit() {
    // TODO: POST to API
    setStep("success");
  }

  function handleClose() {
    setStep(1);
    setForm({
      name: "",
      assistantLink: "",
      organization: "",
      description: "",
      regions: [],
      prompt: "",
      setupInstructions: "",
      submittedBy: "",
    });
    onClose();
  }

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[1001] flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-background/80 backdrop-blur-sm"
        onClick={handleClose}
      />

      {/* Modal */}
      <div className="relative mx-4 flex max-h-[85vh] w-full max-w-2xl flex-col rounded-lg border border-border bg-card shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-border px-6 py-4">
          <div>
            <h2 className="text-[1.125rem] font-semibold tracking-tight">
              {step === "success" ? "Inskickad!" : "Lägg till assistent"}
            </h2>
            {step !== "success" && (
              <p className="mt-1 text-[0.8125rem] text-muted-foreground">
                Dela din assistent med kommunen. Inskickade assistenter granskas
                innan publicering.
              </p>
            )}
          </div>
          <button
            onClick={handleClose}
            className="flex h-8 w-8 items-center justify-center rounded-full transition-colors hover:bg-secondary"
          >
            <X size={16} />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto px-6 py-6">
          {step === 1 && (
            <div className="space-y-5">
              {/* Name */}
              <div>
                <label className="mb-1.5 block text-[0.8125rem] font-medium">
                  Namn <span className="text-destructive">*</span>
                </label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => update("name", e.target.value)}
                  placeholder="Min assistent"
                  className="w-full rounded-lg border border-border bg-background px-4 py-3 text-[0.875rem] outline-none transition-colors focus:border-foreground"
                />
              </div>

              {/* Assistant Link */}
              <div>
                <label className="mb-1.5 flex items-center gap-1.5 text-[0.8125rem] font-medium">
                  Assistentlänk <span className="text-destructive">*</span>
                  <HelpCircle
                    size={14}
                    className="text-muted-foreground"
                  />
                </label>
                <input
                  type="url"
                  value={form.assistantLink}
                  onChange={(e) => update("assistantLink", e.target.value)}
                  placeholder=".../share/assistant/..."
                  className="w-full rounded-lg border border-border bg-background px-4 py-3 text-[0.875rem] outline-none transition-colors focus:border-foreground"
                />
              </div>

              {/* Organization */}
              <div>
                <label className="mb-1.5 block text-[0.8125rem] font-medium">
                  Organisation <span className="text-destructive">*</span>
                </label>
                <input
                  type="text"
                  value={form.organization}
                  onChange={(e) => update("organization", e.target.value)}
                  placeholder="Din förvaltning/avdelning"
                  className="w-full rounded-lg border border-border bg-background px-4 py-3 text-[0.875rem] outline-none transition-colors focus:border-foreground"
                />
              </div>

              {/* Description */}
              <div>
                <label className="mb-1.5 block text-[0.8125rem] font-medium">
                  Beskrivning
                </label>
                <textarea
                  value={form.description}
                  onChange={(e) => update("description", e.target.value)}
                  placeholder="Vad gör din assistent?"
                  rows={3}
                  className="w-full resize-none rounded-lg border border-border bg-background px-4 py-3 text-[0.875rem] outline-none transition-colors focus:border-foreground"
                />
              </div>

              {/* Regions */}
              <div>
                <label className="mb-2 block text-[0.8125rem] font-medium">
                  Region <span className="text-destructive">*</span>
                </label>
                <div className="flex flex-wrap gap-2">
                  {REGIONS.map((region) => {
                    const selected = form.regions.includes(region.value);
                    return (
                      <button
                        key={region.value}
                        type="button"
                        onClick={() => toggleRegion(region.value)}
                        className="rounded-full border px-3.5 py-1.5 text-[0.8125rem] font-medium transition-all"
                        style={{
                          borderColor: selected
                            ? "var(--foreground)"
                            : "var(--border)",
                          backgroundColor: selected
                            ? "var(--foreground)"
                            : "transparent",
                          color: selected
                            ? "var(--background)"
                            : "var(--muted-foreground)",
                        }}
                      >
                        {region.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              <p className="text-[0.75rem] text-muted-foreground">
                Inkludera inte personuppgifter eller känslig information.
                Allt innehåll blir offentligt efter godkännande.
              </p>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-5">
              {/* System Prompt */}
              <div>
                <label className="mb-1.5 block text-[0.8125rem] font-medium">
                  Systemprompt
                </label>
                <textarea
                  value={form.prompt}
                  onChange={(e) => update("prompt", e.target.value)}
                  placeholder="Systemprompt som används av assistenten..."
                  rows={5}
                  className="w-full resize-none rounded-lg border border-border bg-background px-4 py-3 text-[0.875rem] outline-none transition-colors focus:border-foreground font-mono text-[0.8125rem]"
                />
              </div>

              {/* Setup Instructions */}
              <div>
                <label className="mb-1.5 block text-[0.8125rem] font-medium">
                  Setup-instruktioner
                </label>
                <textarea
                  value={form.setupInstructions}
                  onChange={(e) => update("setupInstructions", e.target.value)}
                  placeholder="T.ex. verktyg, val av språkmodell, typ av kunskap, etc."
                  rows={4}
                  className="w-full resize-none rounded-lg border border-border bg-background px-4 py-3 text-[0.875rem] outline-none transition-colors focus:border-foreground"
                />
                <p className="mt-1.5 text-[0.75rem] text-muted-foreground">
                  Tips: Nämn eventuella verktyg, integrationer eller MCP-servrar
                  kopplade till din assistent.
                </p>
              </div>

              {/* Submitted By */}
              <div>
                <label className="mb-1.5 block text-[0.8125rem] font-medium">
                  Ditt namn eller e-post (valfritt)
                </label>
                <input
                  type="text"
                  value={form.submittedBy}
                  onChange={(e) => update("submittedBy", e.target.value)}
                  placeholder="anna@example.com"
                  className="w-full rounded-lg border border-border bg-background px-4 py-3 text-[0.875rem] outline-none transition-colors focus:border-foreground"
                />
              </div>
            </div>
          )}

          {step === "success" && (
            <div className="flex flex-col items-center py-8 text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-secondary">
                <Check size={28} />
              </div>
              <h3 className="mt-6 text-[1.25rem] font-semibold">Tack!</h3>
              <p className="mt-3 max-w-sm text-[0.9375rem] text-muted-foreground">
                Din assistent har skickats in. Vårt team granskar den innan den
                visas i biblioteket.
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between border-t border-border px-6 py-4">
          {step === 1 && (
            <>
              <div />
              <button
                onClick={() => canProceed() && setStep(2)}
                disabled={!canProceed()}
                className="rounded-full bg-primary px-6 py-2.5 text-[0.8125rem] font-medium uppercase tracking-[0.01em] text-primary-foreground transition-all duration-150 disabled:opacity-40"
                style={{
                  fontFamily: "var(--font-geist-mono), monospace",
                  boxShadow: canProceed()
                    ? "0px 2px 1px 0px rgba(255,255,255,0.15) inset, 0px -2px 1px 0px rgba(0,0,0,0.05) inset"
                    : "none",
                }}
              >
                Nästa
              </button>
            </>
          )}
          {step === 2 && (
            <>
              <button
                onClick={() => setStep(1)}
                className="rounded-full border border-border px-6 py-2.5 text-[0.8125rem] font-medium uppercase tracking-[0.01em] transition-all hover:bg-secondary"
                style={{ fontFamily: "var(--font-geist-mono), monospace" }}
              >
                Tillbaka
              </button>
              <button
                onClick={handleSubmit}
                className="rounded-full bg-primary px-6 py-2.5 text-[0.8125rem] font-medium uppercase tracking-[0.01em] text-primary-foreground transition-all duration-150 active:scale-[0.98]"
                style={{
                  fontFamily: "var(--font-geist-mono), monospace",
                  boxShadow:
                    "0px 2px 1px 0px rgba(255,255,255,0.15) inset, 0px -2px 1px 0px rgba(0,0,0,0.05) inset",
                }}
              >
                Skicka in för granskning
              </button>
            </>
          )}
          {step === "success" && (
            <>
              <button
                onClick={handleClose}
                className="rounded-full border border-border px-6 py-2.5 text-[0.8125rem] font-medium uppercase tracking-[0.01em] transition-all hover:bg-secondary"
                style={{ fontFamily: "var(--font-geist-mono), monospace" }}
              >
                Stäng
              </button>
              <button
                onClick={() => {
                  setStep(1);
                  setForm({
                    name: "",
                    assistantLink: "",
                    organization: "",
                    description: "",
                    regions: [],
                    prompt: "",
                    setupInstructions: "",
                    submittedBy: "",
                  });
                }}
                className="rounded-full bg-primary px-6 py-2.5 text-[0.8125rem] font-medium uppercase tracking-[0.01em] text-primary-foreground transition-all duration-150 active:scale-[0.98]"
                style={{
                  fontFamily: "var(--font-geist-mono), monospace",
                  boxShadow:
                    "0px 2px 1px 0px rgba(255,255,255,0.15) inset, 0px -2px 1px 0px rgba(0,0,0,0.05) inset",
                }}
              >
                Skicka in en till
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
