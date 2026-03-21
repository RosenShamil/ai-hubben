"use client";

import { useState } from "react";
import { ExternalLink, Copy, Check, MessageSquare } from "lucide-react";

export function AssistantActions({
  shareLink,
  chatLink,
}: {
  shareLink: string;
  chatLink?: string;
}) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    await navigator.clipboard.writeText(shareLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="flex flex-col gap-3">
      {chatLink && (
        <a
          href={chatLink}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-[0.8125rem] font-medium uppercase tracking-[0.01em] text-primary-foreground transition-all duration-150 active:scale-[0.98]"
          style={{
            fontFamily: "var(--font-geist-mono), monospace",
            boxShadow:
              "0px 2px 1px 0px rgba(255,255,255,0.15) inset, 0px -2px 1px 0px rgba(0,0,0,0.05) inset",
          }}
        >
          Chatta
          <MessageSquare size={14} />
        </a>
      )}
      <button
        onClick={handleCopy}
        className="flex items-center justify-center gap-2 rounded-full border border-border px-6 py-3 text-[0.8125rem] font-medium uppercase tracking-[0.01em] text-foreground transition-all duration-150 active:scale-[0.98] hover:bg-secondary"
        style={{
          fontFamily: "var(--font-geist-mono), monospace",
        }}
      >
        {copied ? (
          <>
            Länk kopierad!
            <Check size={14} />
          </>
        ) : (
          <>
            Importera assistenten
            <Copy size={14} />
          </>
        )}
      </button>
      <p className="text-[0.75rem] leading-[1.5] text-muted-foreground">
        Kopiera assistentens inställningar och prompt till din egen Intric-miljö.
        Obs: du behöver koppla på egen kunskap/data efter import.
      </p>
    </div>
  );
}
