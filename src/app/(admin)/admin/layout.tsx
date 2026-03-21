"use client";

import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import { isCurrentUserAdmin, signOut } from "@/lib/supabase-auth";
import { useTheme } from "next-themes";
import { BRAND_GRADIENT } from "@/lib/constants";
import {
  LayoutDashboard,
  GraduationCap,
  Bot,
  BookOpen,
  FileText,
  LogOut,
  Menu,
  X,
  Moon,
  Sun,
  ExternalLink,
} from "lucide-react";

const SIDEBAR_LINKS = [
  { label: "Oversikt", href: "/admin", icon: LayoutDashboard },
  { label: "Utbildning", href: "/admin/utbildning", icon: GraduationCap },
  { label: "Resurser", href: "/admin/resurser", icon: BookOpen },
  { label: "Dokument", href: "/admin/dokument", icon: FileText },
  { label: "Assistenter", href: "/admin/assistenter", icon: Bot },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    async function checkAuth() {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) {
        router.replace("/admin/login");
        return;
      }
      const admin = await isCurrentUserAdmin();
      if (!admin) {
        router.replace("/admin/login");
        return;
      }
      setUserEmail(user.email ?? null);
      setLoading(false);
    }
    checkAuth();
    setMounted(true);
  }, [router]);

  // Don't render admin layout for login page
  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="text-[0.875rem] text-muted-foreground">Laddar...</div>
      </div>
    );
  }

  async function handleLogout() {
    await signOut();
    router.replace("/");
  }

  return (
    <div className="flex min-h-screen flex-col bg-background">
      {/* Rainbow top bar */}
      <div className="h-1 w-full" style={{ background: BRAND_GRADIENT }} />
      <div className="flex flex-1">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-[240px] flex-col border-r border-border bg-card transition-transform duration-200 lg:static lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-14 items-center justify-between border-b border-border px-5">
          <Link href="/admin" className="flex items-center gap-2">
            <span
              className="text-[1.125rem] tracking-[-0.02em]"
              style={{
                fontFamily: "var(--font-bodoni), serif",
                fontWeight: 400,
              }}
            >
              AI-hubben
            </span>
            <span
              className="rounded bg-primary px-1.5 py-0.5 text-[0.5625rem] font-medium uppercase tracking-[0.1em] text-primary-foreground"
              style={{ fontFamily: "var(--font-geist-mono), monospace" }}
            >
              Admin
            </span>
          </Link>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden text-muted-foreground hover:text-foreground"
          >
            <X size={18} />
          </button>
        </div>

        <nav className="flex-1 px-3 py-4 space-y-1">
          {SIDEBAR_LINKS.map((link) => {
            const isActive =
              pathname === link.href ||
              (link.href !== "/admin" && pathname.startsWith(link.href));
            const Icon = link.icon;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 rounded-md px-3 py-2 text-[0.8125rem] transition-colors ${
                  isActive
                    ? "bg-secondary text-foreground font-medium"
                    : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                }`}
              >
                <Icon size={16} />
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="border-t border-border p-3 space-y-1">
          <Link
            href="/"
            className="flex w-full items-center gap-3 rounded-md px-3 py-2 text-[0.8125rem] text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
          >
            <ExternalLink size={16} />
            AI-hubben
          </Link>
          <button
            onClick={handleLogout}
            className="flex w-full items-center gap-3 rounded-md px-3 py-2 text-[0.8125rem] text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
          >
            <LogOut size={16} />
            Logga ut
          </button>
        </div>
      </aside>

      {/* Main area */}
      <div className="flex flex-1 flex-col min-w-0">
        {/* Top bar */}
        <header className="flex h-14 items-center justify-between border-b border-border bg-card px-4 lg:px-6">
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden text-muted-foreground hover:text-foreground"
          >
            <Menu size={20} />
          </button>
          <div className="hidden lg:block" />
          <div className="flex items-center gap-4">
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="flex h-8 w-8 items-center justify-center rounded-full border border-border transition-colors hover:bg-secondary"
              aria-label="Byt tema"
            >
              {mounted && theme === "dark" ? <Sun size={14} /> : <Moon size={14} />}
            </button>
            <span
              className="text-[0.75rem] text-muted-foreground"
              style={{ fontFamily: "var(--font-geist-mono), monospace" }}
            >
              {userEmail}
            </span>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-auto p-4 lg:p-6">{children}</main>
      </div>
      </div>
    </div>
  );
}
