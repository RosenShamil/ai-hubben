"use client";

import { useState } from "react";
import { Send, CheckCircle, AlertCircle } from "lucide-react";
import { supabase } from "@/lib/supabase";

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const name = (formData.get("name") as string).trim();
    const email = (formData.get("email") as string).trim();
    const subject = (formData.get("subject") as string).trim();
    const message = (formData.get("message") as string).trim();

    const { error: insertError } = await supabase
      .from("contact_messages")
      .insert({ name, email, subject, message });

    setLoading(false);

    if (insertError) {
      setError("Något gick fel. Försök igen senare.");
      return;
    }

    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center rounded-lg border border-border bg-card p-12 text-center">
        <CheckCircle size={40} className="text-green-500" />
        <h3 className="mt-4 text-[1.25rem] font-medium tracking-tight">
          Tack för ditt meddelande
        </h3>
        <p className="mt-2 text-[0.9375rem] text-muted-foreground">
          Vi återkommer så snart vi kan.
        </p>
        <button
          onClick={() => {
            setSubmitted(false);
            setError(null);
          }}
          className="mt-6 text-[0.8125rem] text-muted-foreground underline transition-colors hover:text-foreground"
        >
          Skicka ett till meddelande
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-lg border border-border bg-card p-6 md:p-8"
    >
      <div className="space-y-5">
        {/* Error message */}
        {error && (
          <div className="flex items-center gap-2 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-[0.875rem] text-red-800 dark:border-red-900 dark:bg-red-950 dark:text-red-200">
            <AlertCircle size={16} />
            {error}
          </div>
        )}

        {/* Namn */}
        <div>
          <label
            htmlFor="name"
            className="mb-1.5 block text-[0.8125rem] font-medium"
            style={{ fontFamily: "var(--font-geist-mono), monospace" }}
          >
            Namn *
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            className="w-full rounded-lg border border-border bg-background py-3 px-4 text-[0.9375rem] outline-none transition-colors focus:border-foreground"
            placeholder="Ditt namn"
          />
        </div>

        {/* E-post */}
        <div>
          <label
            htmlFor="email"
            className="mb-1.5 block text-[0.8125rem] font-medium"
            style={{ fontFamily: "var(--font-geist-mono), monospace" }}
          >
            E-post *
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            className="w-full rounded-lg border border-border bg-background py-3 px-4 text-[0.9375rem] outline-none transition-colors focus:border-foreground"
            placeholder="namn@katrineholm.se"
          />
        </div>

        {/* Ämne */}
        <div>
          <label
            htmlFor="subject"
            className="mb-1.5 block text-[0.8125rem] font-medium"
            style={{ fontFamily: "var(--font-geist-mono), monospace" }}
          >
            Ämne *
          </label>
          <input
            id="subject"
            name="subject"
            type="text"
            required
            className="w-full rounded-lg border border-border bg-background py-3 px-4 text-[0.9375rem] outline-none transition-colors focus:border-foreground"
            placeholder="Vad gäller ditt ärende?"
          />
        </div>

        {/* Meddelande */}
        <div>
          <label
            htmlFor="message"
            className="mb-1.5 block text-[0.8125rem] font-medium"
            style={{ fontFamily: "var(--font-geist-mono), monospace" }}
          >
            Meddelande *
          </label>
          <textarea
            id="message"
            name="message"
            required
            rows={5}
            className="w-full resize-none rounded-lg border border-border bg-background py-3 px-4 text-[0.9375rem] leading-[1.6] outline-none transition-colors focus:border-foreground"
            placeholder="Beskriv ditt ärende..."
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="inline-flex items-center gap-2 rounded-lg bg-foreground px-6 py-3 text-[0.9375rem] font-medium text-background transition-opacity hover:opacity-90 disabled:opacity-60"
        >
          {loading ? (
            <>Skickar...</>
          ) : (
            <>
              <Send size={16} />
              Skicka meddelande
            </>
          )}
        </button>
      </div>
    </form>
  );
}
