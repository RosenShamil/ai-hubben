"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, CheckCircle2 } from "lucide-react";
import { signUp } from "@/lib/supabase-auth";
import { registerSchema, type RegisterValues } from "@/lib/auth-validation";
import { useAuth } from "@/components/shared/auth-provider";

export default function RegisterPage() {
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterValues>({
    resolver: zodResolver(registerSchema),
  });

  // Redirect if already logged in
  useEffect(() => {
    if (!authLoading && user) {
      router.replace("/profil");
    }
  }, [authLoading, user, router]);

  if (!authLoading && user) return null;

  async function onSubmit(values: RegisterValues) {
    setError("");
    try {
      const fullName = `${values.first_name} ${values.last_name}`;
      await signUp(values.email, values.password, fullName);
      setSuccess(true);
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "Registrering misslyckades";
      if (message.toLowerCase().includes("already registered") || message.toLowerCase().includes("already been registered")) {
        setError("Det finns redan ett konto med denna e-postadress. Försök logga in istället.");
      } else {
        setError(message);
      }
    }
  }

  if (success) {
    return (
      <div className="flex min-h-[80vh] items-center justify-center px-4 py-16">
        <div className="w-full max-w-[400px] text-center">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/30">
            <CheckCircle2 className="h-8 w-8 text-green-600 dark:text-green-400" />
          </div>
          <h1
            className="text-[2rem] tracking-[-0.04em]"
            style={{
              fontFamily: "var(--font-bodoni), serif",
              fontWeight: 400,
            }}
          >
            Kolla din e-post
          </h1>
          <p className="mt-3 text-[0.9375rem] text-foreground/85">
            Vi har skickat en verifieringslänk till din e-post.
            Klicka på länken för att aktivera ditt konto.
          </p>
          <Link
            href="/logga-in"
            className="mt-8 inline-block rounded-md border border-border px-6 py-2.5 text-[0.8125rem] font-medium uppercase tracking-[0.05em] transition-colors hover:bg-secondary"
            style={{ fontFamily: "var(--font-geist-mono), monospace" }}
          >
            Till inloggningen
          </Link>
        </div>
      </div>
    );
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
            Registrera dig
          </h1>
          <p
            className="mt-2 text-[0.6875rem] font-medium uppercase tracking-[0.15em] text-muted-foreground"
            style={{ fontFamily: "var(--font-geist-mono), monospace" }}
          >
            Skapa ditt konto på AI-hubben
          </p>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="rounded-lg border border-border bg-card p-8"
        >
          <div className="space-y-5">
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="first_name"
                  className="mb-1.5 block text-[0.6875rem] font-medium uppercase tracking-[0.1em] text-muted-foreground"
                  style={{ fontFamily: "var(--font-geist-mono), monospace" }}
                >
                  Förnamn
                </label>
                <input
                  id="first_name"
                  type="text"
                  {...register("first_name")}
                  className="w-full rounded-md border border-border bg-background px-3.5 py-2.5 text-[0.9375rem] outline-none transition-colors focus:border-foreground"
                  placeholder="Förnamn"
                />
                {errors.first_name && (
                  <p className="mt-1 text-[0.8125rem] text-destructive">
                    {errors.first_name.message}
                  </p>
                )}
              </div>
              <div>
                <label
                  htmlFor="last_name"
                  className="mb-1.5 block text-[0.6875rem] font-medium uppercase tracking-[0.1em] text-muted-foreground"
                  style={{ fontFamily: "var(--font-geist-mono), monospace" }}
                >
                  Efternamn
                </label>
                <input
                  id="last_name"
                  type="text"
                  {...register("last_name")}
                  className="w-full rounded-md border border-border bg-background px-3.5 py-2.5 text-[0.9375rem] outline-none transition-colors focus:border-foreground"
                  placeholder="Efternamn"
                />
                {errors.last_name && (
                  <p className="mt-1 text-[0.8125rem] text-destructive">
                    {errors.last_name.message}
                  </p>
                )}
              </div>
            </div>

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
                  placeholder="Minst 8 tecken"
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

            <div>
              <label
                htmlFor="confirmPassword"
                className="mb-1.5 block text-[0.6875rem] font-medium uppercase tracking-[0.1em] text-muted-foreground"
                style={{ fontFamily: "var(--font-geist-mono), monospace" }}
              >
                Bekräfta lösenord
              </label>
              <input
                id="confirmPassword"
                type={showPassword ? "text" : "password"}
                {...register("confirmPassword")}
                className="w-full rounded-md border border-border bg-background px-3.5 py-2.5 text-[0.9375rem] outline-none transition-colors focus:border-foreground"
                placeholder="Upprepa lösenord"
              />
              {errors.confirmPassword && (
                <p className="mt-1 text-[0.8125rem] text-destructive">
                  {errors.confirmPassword.message}
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
              {isSubmitting ? "Skapar konto..." : "Skapa konto"}
            </button>
          </div>
        </form>

        <p className="mt-6 text-center text-[0.875rem] text-muted-foreground">
          Har du redan ett konto?{" "}
          <Link
            href="/logga-in"
            className="text-foreground underline underline-offset-4 hover:opacity-80"
          >
            Logga in
          </Link>
        </p>
      </div>
    </div>
  );
}
