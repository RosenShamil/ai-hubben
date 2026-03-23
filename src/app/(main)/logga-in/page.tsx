"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff } from "lucide-react";
import { signIn, resetPassword } from "@/lib/supabase-auth";
import { loginSchema, type LoginValues } from "@/lib/auth-validation";
import { useAuth } from "@/components/shared/auth-provider";

export default function LoginPage() {
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [resetSent, setResetSent] = useState(false);
  const [resetEmail, setResetEmail] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
  });

  // Redirect if already logged in
  useEffect(() => {
    if (!authLoading && user) {
      router.replace("/profil");
    }
  }, [authLoading, user, router]);

  if (!authLoading && user) return null;

  async function onSubmit(values: LoginValues) {
    setError("");
    try {
      await signIn(values.email, values.password);
      router.refresh();
      router.push("/");
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "Inloggning misslyckades";
      setError(message);
    }
  }

  async function handleResetPassword() {
    if (!resetEmail) return;
    try {
      await resetPassword(resetEmail);
      setResetSent(true);
    } catch {
      setError("Kunde inte skicka återställningslänk");
    }
  }

  return (
    <div className="flex min-h-[80vh] items-center justify-center px-4 py-16">
      <div className="w-full max-w-[400px]">
        <div className="mb-8 text-center">
          <h1
            className="text-[2.25rem] tracking-[-0.04em]"
            style={{
              fontFamily: "var(--font-bodoni), serif",
              fontWeight: 400,
            }}
          >
            Logga in
          </h1>
          <p
            className="mt-2 text-[0.6875rem] font-medium uppercase tracking-[0.15em] text-muted-foreground"
            style={{ fontFamily: "var(--font-geist-mono), monospace" }}
          >
            Ditt konto på AI-hubben
          </p>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="rounded-lg border border-border bg-card p-8"
        >
          <div className="space-y-5">
            <div>
              <label
                htmlFor="email"
                className="mb-1.5 block text-[0.6875rem] font-medium uppercase tracking-[0.1em] text-muted-foreground"
                style={{ fontFamily: "var(--font-geist-mono), monospace" }}
              >
                E-post
              </label>
              <input
                id="email"
                type="email"
                {...register("email")}
                className="w-full rounded-md border border-border bg-background px-3.5 py-2.5 text-[0.9375rem] outline-none transition-colors focus:border-foreground"
                placeholder="namn@katrineholm.se"
              />
              {errors.email && (
                <p className="mt-1 text-[0.8125rem] text-destructive">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="password"
                className="mb-1.5 block text-[0.6875rem] font-medium uppercase tracking-[0.1em] text-muted-foreground"
                style={{ fontFamily: "var(--font-geist-mono), monospace" }}
              >
                Lösenord
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  {...register("password")}
                  className="w-full rounded-md border border-border bg-background px-3.5 py-2.5 pr-10 text-[0.9375rem] outline-none transition-colors focus:border-foreground"
                  placeholder="********"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  aria-label={showPassword ? "Dölj lösenord" : "Visa lösenord"}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              {errors.password && (
                <p className="mt-1 text-[0.8125rem] text-destructive">
                  {errors.password.message}
                </p>
              )}
            </div>

            {error && (
              <div className="rounded-md border border-destructive/30 bg-destructive/5 px-3.5 py-2.5 text-[0.8125rem] text-destructive">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full rounded-md bg-primary px-4 py-2.5 text-[0.8125rem] font-medium uppercase tracking-[0.05em] text-primary-foreground transition-all duration-150 hover:opacity-90 active:scale-[0.99] disabled:opacity-50"
              style={{
                fontFamily: "var(--font-geist-mono), monospace",
                boxShadow:
                  "0px 2px 1px 0px rgba(255,255,255,0.15) inset, 0px -2px 1px 0px rgba(0,0,0,0.05) inset",
              }}
            >
              {isSubmitting ? "Loggar in..." : "Logga in"}
            </button>
          </div>

          {/* Forgot password */}
          <div className="mt-5 border-t border-border pt-5">
            <p className="text-[0.8125rem] text-muted-foreground">
              Glömt lösenordet?
            </p>
            <div className="mt-2 flex gap-2">
              <input
                type="email"
                value={resetEmail}
                onChange={(e) => setResetEmail(e.target.value)}
                placeholder="Din e-post"
                className="flex-1 rounded-md border border-border bg-background px-3 py-2 text-[0.8125rem] outline-none transition-colors focus:border-foreground"
              />
              <button
                type="button"
                onClick={handleResetPassword}
                className="rounded-md border border-border px-3 py-2 text-[0.8125rem] text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
              >
                Skicka
              </button>
            </div>
            {resetSent && (
              <p className="mt-2 text-[0.8125rem] text-green-600 dark:text-green-400">
                Återställningslänk skickad! Kolla din e-post.
              </p>
            )}
          </div>
        </form>

        <p className="mt-6 text-center text-[0.875rem] text-muted-foreground">
          Har du inget konto?{" "}
          <Link
            href="/registrera"
            className="text-foreground underline underline-offset-4 hover:opacity-80"
          >
            Registrera dig
          </Link>
        </p>
      </div>
    </div>
  );
}
