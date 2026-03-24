"use client";

import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/lib/supabase";
import {
  Plus,
  ExternalLink,
  Pencil,
  Trash2,
  X,
  Check,
  Upload,
  Loader2,
  ImageOff,
  ArrowUp,
  ArrowDown,
} from "lucide-react";
import type { TeamMember } from "@/lib/team";

const emptyForm = {
  name: "",
  role: "",
  email: "",
  sort_order: 0,
  image_url: "",
};

function nameToColor(name: string): string {
  const COLORS = [
    "#c83228",
    "#fb873f",
    "#59824f",
    "#2874d7",
    "#9b59b6",
    "#e5651a",
    "#1abc9c",
    "#2c3e50",
    "#d4a017",
    "#27ae60",
  ];
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  return COLORS[Math.abs(hash) % COLORS.length];
}

function getInitials(name: string): string {
  return name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

export default function AdminTeamPage() {
  const [members, setMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);

  const showToast = useCallback(
    (type: "success" | "error", message: string) => {
      setToast({ type, message });
      setTimeout(() => setToast(null), 3000);
    },
    []
  );

  const fetchMembers = useCallback(async () => {
    const { data, error } = await supabase
      .from("team_members")
      .select("*")
      .order("sort_order", { ascending: true });

    if (error) {
      showToast("error", "Kunde inte hämta teammedlemmar");
      return;
    }
    setMembers(data ?? []);
    setLoading(false);
  }, [showToast]);

  useEffect(() => {
    fetchMembers();
  }, [fetchMembers]);

  function openCreate() {
    setForm(emptyForm);
    setEditingId(null);
    setModalOpen(true);
  }

  function openEdit(member: TeamMember) {
    setForm({
      name: member.name,
      role: member.role,
      email: member.email ?? "",
      sort_order: member.sort_order,
      image_url: member.image_url ?? "",
    });
    setEditingId(member.id);
    setModalOpen(true);
  }

  async function handlePhotoUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);

    const ext = file.name.split(".").pop();
    const path = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;

    const { error } = await supabase.storage
      .from("team-photos")
      .upload(path, file);

    if (error) {
      showToast("error", "Uppladdning misslyckades: " + error.message);
      setUploading(false);
      return;
    }

    const { data: urlData } = supabase.storage
      .from("team-photos")
      .getPublicUrl(path);

    setForm({ ...form, image_url: urlData.publicUrl });
    setUploading(false);
    showToast("success", "Bilden uppladdad");
  }

  function removePhoto() {
    setForm({ ...form, image_url: "" });
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);

    const payload = {
      name: form.name.trim(),
      role: form.role.trim(),
      email: form.email.trim() || null,
      sort_order: form.sort_order,
      image_url: form.image_url.trim() || null,
    };

    if (editingId) {
      const { error } = await supabase
        .from("team_members")
        .update(payload)
        .eq("id", editingId);
      if (error) {
        showToast("error", "Kunde inte uppdatera: " + error.message);
      } else {
        showToast("success", "Teammedlem uppdaterad");
      }
    } else {
      const { error } = await supabase.from("team_members").insert(payload);
      if (error) {
        showToast("error", "Kunde inte skapa: " + error.message);
      } else {
        showToast("success", "Teammedlem tillagd");
      }
    }

    setSaving(false);
    setModalOpen(false);
    fetchMembers();
  }

  async function handleMove(index: number, direction: "up" | "down") {
    if (direction === "up" && index === 0) return;
    if (direction === "down" && index === members.length - 1) return;
    const swapIndex = direction === "up" ? index - 1 : index + 1;
    const a = members[index];
    const b = members[swapIndex];
    await Promise.all([
      supabase.from("team_members").update({ sort_order: b.sort_order }).eq("id", a.id),
      supabase.from("team_members").update({ sort_order: a.sort_order }).eq("id", b.id),
    ]);
    fetchMembers();
  }

  async function handleDelete(id: string) {
    const { error } = await supabase
      .from("team_members")
      .delete()
      .eq("id", id);
    if (error) {
      showToast("error", "Kunde inte ta bort: " + error.message);
    } else {
      showToast("success", "Teammedlem borttagen");
    }
    setDeleteConfirm(null);
    fetchMembers();
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
            Team
          </h1>
          {!loading && members.length > 0 && (
            <p
              className="mt-1 text-[0.75rem] text-muted-foreground"
              style={{ fontFamily: "var(--font-geist-mono), monospace" }}
            >
              {members.length} medlemmar
            </p>
          )}
        </div>
        <div className="flex items-center gap-2">
        <a
          href="/om"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 rounded-md border border-border px-3 py-2 text-[0.8125rem] text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
          style={{ fontFamily: "var(--font-geist-mono), monospace" }}
        >
          <ExternalLink size={14} />
          Visa live
        </a>
        <button
          onClick={openCreate}
          className="flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-[0.8125rem] font-medium text-primary-foreground transition-all hover:opacity-90 active:scale-[0.98]"
          style={{
            fontFamily: "var(--font-geist-mono), monospace",
            boxShadow:
              "0px 2px 1px 0px rgba(255,255,255,0.15) inset, 0px -2px 1px 0px rgba(0,0,0,0.05) inset",
          }}
        >
          <Plus size={16} />
          Lägg till
        </button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-lg border border-border bg-card">
        <table className="w-full text-[0.8125rem]">
          <thead>
            <tr className="border-b border-border">
              {["Bild", "Namn", "Roll", "E-post", "Ordning", "Åtgärder"].map(
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
                  colSpan={6}
                  className="px-4 py-8 text-center text-muted-foreground"
                >
                  Laddar...
                </td>
              </tr>
            ) : members.length === 0 ? (
              <tr>
                <td
                  colSpan={6}
                  className="px-4 py-8 text-center text-muted-foreground"
                >
                  Inga teammedlemmar registrerade
                </td>
              </tr>
            ) : (
              members.map((member, i) => {
                const color = nameToColor(member.name);
                const initials = getInitials(member.name);
                return (
                  <tr
                    key={member.id}
                    className={`border-b border-border last:border-0 transition-colors hover:bg-secondary/50 ${
                      i % 2 === 0 ? "" : "bg-secondary/20"
                    }`}
                  >
                    <td className="px-4 py-3">
                      {member.image_url ? (
                        <img
                          src={member.image_url}
                          alt={member.name}
                          className="h-8 w-8 rounded-full object-cover"
                        />
                      ) : (
                        <div
                          className="flex h-8 w-8 items-center justify-center rounded-full text-[0.625rem] font-semibold text-white"
                          style={{ backgroundColor: color }}
                        >
                          {initials}
                        </div>
                      )}
                    </td>
                    <td className="px-4 py-3 font-medium">{member.name}</td>
                    <td className="px-4 py-3 text-muted-foreground">
                      {member.role}
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">
                      {member.email ?? "—"}
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">
                      {member.sort_order}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1">
                        <button onClick={() => handleMove(i, "up")} disabled={i === 0} className="rounded-md p-1.5 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground disabled:opacity-30 disabled:pointer-events-none" title="Flytta upp"><ArrowUp size={14} /></button>
                        <button onClick={() => handleMove(i, "down")} disabled={i === members.length - 1} className="rounded-md p-1.5 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground disabled:opacity-30 disabled:pointer-events-none" title="Flytta ner"><ArrowDown size={14} /></button>
                        <button
                          onClick={() => openEdit(member)}
                          className="rounded-md p-1.5 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                          title="Redigera"
                        >
                          <Pencil size={14} />
                        </button>
                        {deleteConfirm === member.id ? (
                          <div className="flex items-center gap-1">
                            <button
                              onClick={() => handleDelete(member.id)}
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
                            onClick={() => setDeleteConfirm(member.id)}
                            className="rounded-md p-1.5 text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive"
                            title="Ta bort"
                          >
                            <Trash2 size={14} />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-[90] flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-[520px] rounded-lg border border-border bg-card shadow-xl">
            <div className="flex items-center justify-between border-b border-border px-6 py-4">
              <h2
                className="text-[1.125rem] tracking-[-0.02em]"
                style={{
                  fontFamily: "var(--font-bodoni), serif",
                  fontWeight: 400,
                }}
              >
                {editingId ? "Redigera teammedlem" : "Ny teammedlem"}
              </h2>
              <button
                onClick={() => setModalOpen(false)}
                className="rounded-md p-1 text-muted-foreground hover:text-foreground"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4 p-6">
              <div>
                <label
                  className="mb-1.5 block text-[0.625rem] font-medium uppercase tracking-[0.1em] text-muted-foreground"
                  style={{ fontFamily: "var(--font-geist-mono), monospace" }}
                >
                  Namn *
                </label>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) =>
                    setForm({ ...form, name: e.target.value })
                  }
                  placeholder="Förnamn Efternamn"
                  className="w-full rounded-md border border-border bg-background px-3 py-2 text-[0.875rem] outline-none focus:border-foreground"
                />
              </div>

              <div>
                <label
                  className="mb-1.5 block text-[0.625rem] font-medium uppercase tracking-[0.1em] text-muted-foreground"
                  style={{ fontFamily: "var(--font-geist-mono), monospace" }}
                >
                  Roll *
                </label>
                <input
                  type="text"
                  required
                  value={form.role}
                  onChange={(e) =>
                    setForm({ ...form, role: e.target.value })
                  }
                  placeholder="T.ex. AI-utvecklare"
                  className="w-full rounded-md border border-border bg-background px-3 py-2 text-[0.875rem] outline-none focus:border-foreground"
                />
              </div>

              <div>
                <label
                  className="mb-1.5 block text-[0.625rem] font-medium uppercase tracking-[0.1em] text-muted-foreground"
                  style={{ fontFamily: "var(--font-geist-mono), monospace" }}
                >
                  E-post
                </label>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) =>
                    setForm({ ...form, email: e.target.value })
                  }
                  placeholder="namn@katrineholm.se"
                  className="w-full rounded-md border border-border bg-background px-3 py-2 text-[0.875rem] outline-none focus:border-foreground"
                />
              </div>

              <div>
                <label
                  className="mb-1.5 block text-[0.625rem] font-medium uppercase tracking-[0.1em] text-muted-foreground"
                  style={{ fontFamily: "var(--font-geist-mono), monospace" }}
                >
                  Ordning
                </label>
                <input
                  type="number"
                  value={form.sort_order}
                  onChange={(e) =>
                    setForm({ ...form, sort_order: parseInt(e.target.value) || 0 })
                  }
                  className="w-full rounded-md border border-border bg-background px-3 py-2 text-[0.875rem] outline-none focus:border-foreground"
                />
              </div>

              <div>
                <label
                  className="mb-1.5 block text-[0.625rem] font-medium uppercase tracking-[0.1em] text-muted-foreground"
                  style={{ fontFamily: "var(--font-geist-mono), monospace" }}
                >
                  Foto
                </label>
                {form.image_url ? (
                  <div className="flex items-center gap-3">
                    <img
                      src={form.image_url}
                      alt="Preview"
                      className="h-16 w-16 rounded-full object-cover"
                    />
                    <button
                      type="button"
                      onClick={removePhoto}
                      className="flex items-center gap-1.5 rounded-md border border-border px-3 py-1.5 text-[0.75rem] text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                    >
                      <ImageOff size={14} />
                      Ta bort bild
                    </button>
                  </div>
                ) : (
                  <label className="flex cursor-pointer items-center gap-2 rounded-md border border-dashed border-border bg-background px-3 py-3 text-[0.8125rem] text-muted-foreground transition-colors hover:border-foreground hover:text-foreground">
                    {uploading ? (
                      <Loader2 size={16} className="animate-spin" />
                    ) : (
                      <Upload size={16} />
                    )}
                    {uploading ? "Laddar upp..." : "Ladda upp foto"}
                    <input
                      type="file"
                      className="hidden"
                      accept="image/*"
                      onChange={handlePhotoUpload}
                      disabled={uploading}
                    />
                  </label>
                )}
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="rounded-md border border-border px-4 py-2 text-[0.8125rem] transition-colors hover:bg-secondary"
                >
                  Avbryt
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="rounded-md bg-primary px-4 py-2 text-[0.8125rem] font-medium text-primary-foreground transition-all hover:opacity-90 disabled:opacity-50"
                  style={{
                    fontFamily: "var(--font-geist-mono), monospace",
                    boxShadow:
                      "0px 2px 1px 0px rgba(255,255,255,0.15) inset, 0px -2px 1px 0px rgba(0,0,0,0.05) inset",
                  }}
                >
                  {saving
                    ? "Sparar..."
                    : editingId
                      ? "Uppdatera"
                      : "Lägg till"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
