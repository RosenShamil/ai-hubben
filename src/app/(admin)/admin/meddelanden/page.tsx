"use client";

import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/lib/supabase";
import { Trash2, X, Check, Mail, MailOpen } from "lucide-react";

interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  read: boolean;
  created_at: string;
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("sv-SE", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function AdminMeddelandenPage() {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(
    null
  );
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [toast, setToast] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  const unreadCount = messages.filter((m) => !m.read).length;

  const showToast = useCallback(
    (type: "success" | "error", message: string) => {
      setToast({ type, message });
      setTimeout(() => setToast(null), 3000);
    },
    []
  );

  const fetchMessages = useCallback(async () => {
    const { data, error } = await supabase
      .from("contact_messages")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      showToast("error", "Kunde inte hämta meddelanden");
      return;
    }
    setMessages(data ?? []);
    setLoading(false);
  }, [showToast]);

  useEffect(() => {
    fetchMessages();
  }, [fetchMessages]);

  async function markAsRead(msg: ContactMessage) {
    setSelectedMessage(msg);
    if (!msg.read) {
      await supabase
        .from("contact_messages")
        .update({ read: true })
        .eq("id", msg.id);
      setMessages((prev) =>
        prev.map((m) => (m.id === msg.id ? { ...m, read: true } : m))
      );
    }
  }

  async function handleDelete(id: string) {
    const { error } = await supabase
      .from("contact_messages")
      .delete()
      .eq("id", id);
    if (error) {
      showToast("error", "Kunde inte ta bort: " + error.message);
    } else {
      showToast("success", "Meddelandet borttaget");
    }
    setDeleteConfirm(null);
    if (selectedMessage?.id === id) {
      setSelectedMessage(null);
    }
    fetchMessages();
  }

  return (
    <div className="mx-auto max-w-[1200px]">
      {/* Toast */}
      {toast && (
        <div
          className={`fixed right-4 top-4 z-[100] flex items-center gap-2 rounded-lg border px-4 py-3 text-[0.8125rem] shadow-lg ${
            toast.type === "success"
              ? "border-green-200 bg-green-50 text-green-800 dark:border-green-900 dark:bg-green-950 dark:text-green-200"
              : "border-red-200 bg-red-50 text-red-800 dark:border-red-900 dark:bg-red-950 dark:text-red-200"
          }`}
        >
          <Check size={14} />
          {toast.message}
        </div>
      )}

      {/* Header */}
      <div className="mb-6 flex items-end justify-between">
        <div>
          <p
            className="text-[0.6875rem] font-medium uppercase tracking-[0.15em] text-muted-foreground"
            style={{ fontFamily: "var(--font-geist-mono), monospace" }}
          >
            Hantera
          </p>
          <h1
            className="mt-2 text-[2rem] tracking-[-0.04em]"
            style={{
              fontFamily: "var(--font-bodoni), serif",
              fontWeight: 400,
            }}
          >
            Meddelanden
          </h1>
          {!loading && messages.length > 0 && (
            <p
              className="mt-1 text-[0.75rem] text-muted-foreground"
              style={{ fontFamily: "var(--font-geist-mono), monospace" }}
            >
              {messages.length} totalt · {unreadCount} olasta
            </p>
          )}
        </div>
        {unreadCount > 0 && (
          <span
            className="rounded-full bg-blue-100 px-3 py-1 text-[0.75rem] font-medium text-blue-700 dark:bg-blue-950 dark:text-blue-300"
            style={{ fontFamily: "var(--font-geist-mono), monospace" }}
          >
            {unreadCount} olasta
          </span>
        )}
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-lg border border-border bg-card">
        <table className="w-full text-[0.8125rem]">
          <thead>
            <tr className="border-b border-border">
              {["Datum", "Namn", "E-post", "Ämne", "Meddelande", "Status", "Åtgärder"].map(
                (h) => (
                  <th
                    key={h}
                    className="px-4 py-3 text-left font-medium uppercase tracking-[0.1em] text-muted-foreground"
                    style={{
                      fontFamily: "var(--font-geist-mono), monospace",
                      fontSize: "0.625rem",
                    }}
                  >
                    {h}
                  </th>
                )
              )}
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td
                  colSpan={7}
                  className="px-4 py-8 text-center text-muted-foreground"
                >
                  Laddar...
                </td>
              </tr>
            ) : messages.length === 0 ? (
              <tr>
                <td
                  colSpan={7}
                  className="px-4 py-8 text-center text-muted-foreground"
                >
                  Inga meddelanden
                </td>
              </tr>
            ) : (
              messages.map((msg, i) => (
                <tr
                  key={msg.id}
                  onClick={() => markAsRead(msg)}
                  className={`cursor-pointer border-b border-border last:border-0 transition-colors hover:bg-secondary/50 ${
                    i % 2 === 0 ? "" : "bg-secondary/20"
                  } ${!msg.read ? "font-medium" : ""}`}
                >
                  <td className="whitespace-nowrap px-4 py-3 text-muted-foreground">
                    {formatDate(msg.created_at)}
                  </td>
                  <td className="px-4 py-3">{msg.name}</td>
                  <td className="px-4 py-3 text-muted-foreground">
                    {msg.email}
                  </td>
                  <td className="px-4 py-3">{msg.subject}</td>
                  <td className="max-w-[200px] truncate px-4 py-3 text-muted-foreground">
                    {msg.message}
                  </td>
                  <td className="px-4 py-3">
                    {msg.read ? (
                      <span className="inline-flex items-center gap-1 rounded-full bg-secondary px-2 py-0.5 text-[0.6875rem] text-muted-foreground">
                        <MailOpen size={10} />
                        Läst
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 rounded-full bg-blue-100 px-2 py-0.5 text-[0.6875rem] font-medium text-blue-700 dark:bg-blue-950 dark:text-blue-300">
                        <Mail size={10} />
                        Nytt
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <div
                      className="flex items-center gap-1"
                      onClick={(e) => e.stopPropagation()}
                    >
                      {deleteConfirm === msg.id ? (
                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => handleDelete(msg.id)}
                            className="rounded-md p-1.5 text-destructive transition-colors hover:bg-destructive/10"
                            title="Bekräfta"
                          >
                            <Check size={14} />
                          </button>
                          <button
                            onClick={() => setDeleteConfirm(null)}
                            className="rounded-md p-1.5 text-muted-foreground transition-colors hover:bg-secondary"
                            title="Avbryt"
                          >
                            <X size={14} />
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => setDeleteConfirm(msg.id)}
                          className="rounded-md p-1.5 text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive"
                          title="Ta bort"
                        >
                          <Trash2 size={14} />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Message detail modal */}
      {selectedMessage && (
        <div
          className="fixed inset-0 z-[90] flex items-center justify-center bg-black/40 p-4"
          onClick={() => setSelectedMessage(null)}
        >
          <div
            className="w-full max-w-[580px] rounded-lg border border-border bg-card shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-border px-6 py-4">
              <h2
                className="text-[1.125rem] tracking-[-0.02em]"
                style={{
                  fontFamily: "var(--font-bodoni), serif",
                  fontWeight: 400,
                }}
              >
                {selectedMessage.subject}
              </h2>
              <button
                onClick={() => setSelectedMessage(null)}
                className="rounded-md p-1 text-muted-foreground hover:text-foreground"
              >
                <X size={18} />
              </button>
            </div>

            <div className="space-y-4 p-6">
              <div className="flex flex-wrap gap-x-6 gap-y-2">
                <div>
                  <p
                    className="text-[0.625rem] font-medium uppercase tracking-[0.1em] text-muted-foreground"
                    style={{
                      fontFamily: "var(--font-geist-mono), monospace",
                    }}
                  >
                    Från
                  </p>
                  <p className="mt-1 text-[0.875rem]">
                    {selectedMessage.name}
                  </p>
                </div>
                <div>
                  <p
                    className="text-[0.625rem] font-medium uppercase tracking-[0.1em] text-muted-foreground"
                    style={{
                      fontFamily: "var(--font-geist-mono), monospace",
                    }}
                  >
                    E-post
                  </p>
                  <a
                    href={`mailto:${selectedMessage.email}`}
                    className="mt-1 block text-[0.875rem] text-foreground underline decoration-border underline-offset-4 transition-colors hover:decoration-foreground"
                  >
                    {selectedMessage.email}
                  </a>
                </div>
                <div>
                  <p
                    className="text-[0.625rem] font-medium uppercase tracking-[0.1em] text-muted-foreground"
                    style={{
                      fontFamily: "var(--font-geist-mono), monospace",
                    }}
                  >
                    Datum
                  </p>
                  <p className="mt-1 text-[0.875rem] text-muted-foreground">
                    {formatDate(selectedMessage.created_at)}
                  </p>
                </div>
              </div>

              <div className="rounded-md border border-border bg-background p-4">
                <p
                  className="mb-2 text-[0.625rem] font-medium uppercase tracking-[0.1em] text-muted-foreground"
                  style={{
                    fontFamily: "var(--font-geist-mono), monospace",
                  }}
                >
                  Meddelande
                </p>
                <p className="whitespace-pre-wrap text-[0.875rem] leading-[1.7]">
                  {selectedMessage.message}
                </p>
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <a
                  href={`mailto:${selectedMessage.email}?subject=Re: ${selectedMessage.subject}`}
                  className="rounded-md bg-primary px-4 py-2 text-[0.8125rem] font-medium text-primary-foreground transition-all hover:opacity-90"
                  style={{
                    fontFamily: "var(--font-geist-mono), monospace",
                    boxShadow:
                      "0px 2px 1px 0px rgba(255,255,255,0.15) inset, 0px -2px 1px 0px rgba(0,0,0,0.05) inset",
                  }}
                >
                  Svara via e-post
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
