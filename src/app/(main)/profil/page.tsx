"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  User,
  KeyRound,
  Map,
  GraduationCap,
  BookOpen,
  Heart,
  LogOut,
  ChevronDown,
  ChevronUp,
  Trash2,
  ExternalLink,
  Award,
  Flame,
  Star,
  CheckCircle2,
} from "lucide-react";
import { useAuth } from "@/components/shared/auth-provider";
import { updateUserProfile, changePassword } from "@/lib/supabase-auth";
import {
  profileSchema,
  changePasswordSchema,
  type ProfileValues,
  type ChangePasswordValues,
} from "@/lib/auth-validation";
import { getEducationProgress } from "@/lib/education-progress";
import type { EducationProgress } from "@/lib/education-progress";
import { getProgress as getKnowledgeProgress } from "@/lib/knowledge-progress";
import type { KnowledgeProgress } from "@/lib/knowledge-progress";
import { getGuideProfile } from "@/lib/ai-guide-profile";
import type { AIGuideProfile } from "@/lib/ai-guide-profile";
import { DEPARTMENTS_MAP, ROLE_CATEGORIES_MAP, GOAL_OPTIONS } from "@/lib/ai-guide-data";
import { BADGES } from "@/lib/education-system";
import { getFavorites, removeFavorite, type Favorite } from "@/lib/favorites";

// ---------------------------------------------------------------------------
// Helper label
// ---------------------------------------------------------------------------

const monoLabel =
  "mb-1.5 block text-[0.6875rem] font-medium uppercase tracking-[0.1em] text-muted-foreground";
const monoStyle = { fontFamily: "var(--font-geist-mono), monospace" } as const;
const sectionHeading =
  "flex items-center gap-2 text-[1.125rem] tracking-[-0.02em]";
const headingStyle = {
  fontFamily: "var(--font-bodoni), serif",
  fontWeight: 400,
} as const;
const card = "rounded-lg border border-border bg-card p-6";

const experienceLabels: Record<string, string> = {
  nyborjare: "Nybörjare",
  "lite-erfarenhet": "Lite erfarenhet",
  erfaren: "Erfaren",
};

export default function ProfilePage() {
  const router = useRouter();
  const { user, profile, loading, signOut, refreshProfile } = useAuth();
  const [eduProgress, setEduProgress] = useState<EducationProgress | null>(null);
  const [knowProgress, setKnowProgress] = useState<KnowledgeProgress | null>(null);
  const [guideProfile, setGuideProfile] = useState<AIGuideProfile | null>(null);
  const [favorites, setFavorites] = useState<Favorite[]>([]);
  const [passwordOpen, setPasswordOpen] = useState(false);
  const [profileSaved, setProfileSaved] = useState(false);
  const [passwordSaved, setPasswordSaved] = useState(false);
  const [profileError, setProfileError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  // Load local data
  useEffect(() => {
    setEduProgress(getEducationProgress());
    setKnowProgress(getKnowledgeProgress());
    setGuideProfile(getGuideProfile());
  }, []);

  // Load favorites from Supabase
  const loadFavorites = useCallback(async () => {
    if (!user) return;
    const favs = await getFavorites(user.id);
    setFavorites(favs);
  }, [user]);

  useEffect(() => {
    loadFavorites();
  }, [loadFavorites]);

  // Profile form
  const profileForm = useForm<ProfileValues>({
    resolver: zodResolver(profileSchema),
    values: profile
      ? {
          full_name: profile.full_name,
          municipality: profile.municipality || "",
          job_title: profile.job_title || "",
        }
      : undefined,
  });

  // Password form
  const passwordForm = useForm<ChangePasswordValues>({
    resolver: zodResolver(changePasswordSchema),
  });

  // Redirect if not logged in
  useEffect(() => {
    if (!loading && !user) {
      router.replace("/logga-in");
    }
  }, [loading, user, router]);

  if (!loading && !user) return null;

  if (loading || !profile) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
      </div>
    );
  }

  async function onProfileSubmit(values: ProfileValues) {
    if (!user) return;
    setProfileError("");
    setProfileSaved(false);
    try {
      await updateUserProfile(user.id, values);
      await refreshProfile();
      setProfileSaved(true);
      setTimeout(() => setProfileSaved(false), 3000);
    } catch (err: unknown) {
      setProfileError(
        err instanceof Error ? err.message : "Kunde inte spara profilen"
      );
    }
  }

  async function onPasswordSubmit(values: ChangePasswordValues) {
    setPasswordError("");
    setPasswordSaved(false);
    try {
      await changePassword(values.newPassword);
      setPasswordSaved(true);
      passwordForm.reset();
      setTimeout(() => setPasswordSaved(false), 3000);
    } catch (err: unknown) {
      setPasswordError(
        err instanceof Error ? err.message : "Kunde inte byta lösenord"
      );
    }
  }

  async function handleRemoveFavorite(fav: Favorite) {
    if (!user) return;
    await removeFavorite(user.id, fav.item_type, fav.item_id);
    setFavorites((prev) => prev.filter((f) => f.id !== fav.id));
  }

  async function handleSignOut() {
    await signOut();
    router.push("/");
  }

  const assistantFavs = favorites.filter((f) => f.item_type === "assistant");
  const courseFavs = favorites.filter(
    (f) => f.item_type === "course" || f.item_type === "lesson"
  );

  return (
    <div className="mx-auto max-w-[44rem] px-4 py-12 sm:px-6">
      {/* Header */}
      <div className="mb-10 text-center">
        <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-primary text-primary-foreground text-[1.75rem] font-medium">
          {profile.full_name
            ? profile.full_name.charAt(0).toUpperCase()
            : "?"}
        </div>
        <h1
          className="text-[2rem] tracking-[-0.04em]"
          style={headingStyle}
        >
          {profile.full_name || "Din profil"}
        </h1>
        <p className="mt-1 text-[0.875rem] text-foreground/85">
          {profile.email}
        </p>
      </div>

      <div className="space-y-8">
        {/* ─── Section 1: Profile Information ─── */}
        <section className={card}>
          <h2 className={sectionHeading} style={headingStyle}>
            <User size={20} /> Profilinformation
          </h2>
          <form
            onSubmit={profileForm.handleSubmit(onProfileSubmit)}
            className="mt-5 space-y-4"
          >
            <div>
              <label htmlFor="full_name" className={monoLabel} style={monoStyle}>
                Namn
              </label>
              <input
                id="full_name"
                {...profileForm.register("full_name")}
                className="w-full rounded-md border border-border bg-background px-3.5 py-2.5 text-[0.9375rem] outline-none transition-colors focus:border-foreground"
              />
              {profileForm.formState.errors.full_name && (
                <p className="mt-1 text-[0.8125rem] text-destructive">
                  {profileForm.formState.errors.full_name.message}
                </p>
              )}
            </div>

            <div>
              <label className={monoLabel} style={monoStyle}>
                E-post
              </label>
              <input
                value={profile.email}
                disabled
                className="w-full rounded-md border border-border bg-secondary/50 px-3.5 py-2.5 text-[0.9375rem] text-muted-foreground"
              />
            </div>

            <div>
              <label htmlFor="municipality" className={monoLabel} style={monoStyle}>
                Kommun
              </label>
              <input
                id="municipality"
                {...profileForm.register("municipality")}
                className="w-full rounded-md border border-border bg-background px-3.5 py-2.5 text-[0.9375rem] outline-none transition-colors focus:border-foreground"
                placeholder="Katrineholms kommun"
              />
            </div>

            <div>
              <label htmlFor="job_title" className={monoLabel} style={monoStyle}>
                Yrkestitel
              </label>
              <input
                id="job_title"
                {...profileForm.register("job_title")}
                className="w-full rounded-md border border-border bg-background px-3.5 py-2.5 text-[0.9375rem] outline-none transition-colors focus:border-foreground"
                placeholder="T.ex. Handläggare"
              />
            </div>

            {profileError && (
              <div className="rounded-md border border-destructive/30 bg-destructive/5 px-3.5 py-2.5 text-[0.8125rem] text-destructive">
                {profileError}
              </div>
            )}

            {profileSaved && (
              <div className="rounded-md border border-green-600/30 bg-green-50 px-3.5 py-2.5 text-[0.8125rem] text-green-700 dark:border-green-400/30 dark:bg-green-900/20 dark:text-green-400">
                Profilen har sparats!
              </div>
            )}

            <button
              type="submit"
              disabled={profileForm.formState.isSubmitting}
              className="rounded-md bg-primary px-5 py-2.5 text-[0.8125rem] font-medium uppercase tracking-[0.05em] text-primary-foreground transition-all duration-150 hover:opacity-90 active:scale-[0.99] disabled:opacity-50"
              style={{
                ...monoStyle,
                boxShadow:
                  "0px 2px 1px 0px rgba(255,255,255,0.15) inset, 0px -2px 1px 0px rgba(0,0,0,0.05) inset",
              }}
            >
              {profileForm.formState.isSubmitting ? "Sparar..." : "Spara"}
            </button>
          </form>

          {/* Password change */}
          <div className="mt-6 border-t border-border pt-5">
            <button
              onClick={() => setPasswordOpen(!passwordOpen)}
              className="flex w-full items-center justify-between text-[0.9375rem] text-muted-foreground hover:text-foreground"
            >
              <span className="flex items-center gap-2">
                <KeyRound size={16} /> Byt lösenord
              </span>
              {passwordOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </button>

            {passwordOpen && (
              <form
                onSubmit={passwordForm.handleSubmit(onPasswordSubmit)}
                className="mt-4 space-y-4"
              >
                <div>
                  <label htmlFor="newPassword" className={monoLabel} style={monoStyle}>
                    Nytt lösenord
                  </label>
                  <input
                    id="newPassword"
                    type="password"
                    {...passwordForm.register("newPassword")}
                    className="w-full rounded-md border border-border bg-background px-3.5 py-2.5 text-[0.9375rem] outline-none transition-colors focus:border-foreground"
                    placeholder="Minst 8 tecken"
                  />
                  {passwordForm.formState.errors.newPassword && (
                    <p className="mt-1 text-[0.8125rem] text-destructive">
                      {passwordForm.formState.errors.newPassword.message}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="confirmPw" className={monoLabel} style={monoStyle}>
                    Bekräfta lösenord
                  </label>
                  <input
                    id="confirmPw"
                    type="password"
                    {...passwordForm.register("confirmPassword")}
                    className="w-full rounded-md border border-border bg-background px-3.5 py-2.5 text-[0.9375rem] outline-none transition-colors focus:border-foreground"
                    placeholder="Upprepa lösenord"
                  />
                  {passwordForm.formState.errors.confirmPassword && (
                    <p className="mt-1 text-[0.8125rem] text-destructive">
                      {passwordForm.formState.errors.confirmPassword.message}
                    </p>
                  )}
                </div>

                {passwordError && (
                  <div className="rounded-md border border-destructive/30 bg-destructive/5 px-3.5 py-2.5 text-[0.8125rem] text-destructive">
                    {passwordError}
                  </div>
                )}

                {passwordSaved && (
                  <div className="rounded-md border border-green-600/30 bg-green-50 px-3.5 py-2.5 text-[0.8125rem] text-green-700 dark:border-green-400/30 dark:bg-green-900/20 dark:text-green-400">
                    Lösenordet har ändrats!
                  </div>
                )}

                <button
                  type="submit"
                  disabled={passwordForm.formState.isSubmitting}
                  className="rounded-md border border-border px-5 py-2.5 text-[0.8125rem] font-medium uppercase tracking-[0.05em] transition-colors hover:bg-secondary"
                  style={monoStyle}
                >
                  {passwordForm.formState.isSubmitting
                    ? "Sparar..."
                    : "Byt lösenord"}
                </button>
              </form>
            )}
          </div>
        </section>

        {/* ─── Section 2: Min AI-resa ─── */}
        {guideProfile && (
          <section className={card}>
            <h2 className={sectionHeading} style={headingStyle}>
              <Map size={20} /> Min AI-resa
            </h2>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <div className="rounded-md border border-border p-3">
                <p className={monoLabel} style={monoStyle}>
                  Förvaltning
                </p>
                <p className="text-[0.9375rem]">
                  {DEPARTMENTS_MAP[guideProfile.departmentId]?.name ?? guideProfile.departmentId}
                </p>
              </div>
              <div className="rounded-md border border-border p-3">
                <p className={monoLabel} style={monoStyle}>
                  Roll
                </p>
                <p className="text-[0.9375rem]">
                  {ROLE_CATEGORIES_MAP[guideProfile.roleCategory]?.title ?? guideProfile.roleCategory}
                </p>
              </div>
              <div className="rounded-md border border-border p-3">
                <p className={monoLabel} style={monoStyle}>
                  Erfarenhetsnivå
                </p>
                <p className="text-[0.9375rem]">
                  {experienceLabels[guideProfile.experienceLevel] ?? guideProfile.experienceLevel}
                </p>
              </div>
              <div className="rounded-md border border-border p-3">
                <p className={monoLabel} style={monoStyle}>
                  Mål
                </p>
                <p className="text-[0.9375rem]">
                  {(guideProfile.goals ?? [])
                    .map(
                      (g) =>
                        GOAL_OPTIONS.find((o) => o.id === g)?.label ?? g
                    )
                    .join(", ") || "Inga mål valda"}
                </p>
              </div>
            </div>
            <div className="mt-4">
              <Link
                href="/"
                className="text-[0.8125rem] text-muted-foreground underline underline-offset-4 hover:text-foreground"
              >
                Gör om AI-rese-quizzen
              </Link>
            </div>
          </section>
        )}

        {/* ─── Section 3: Akademin-framsteg ─── */}
        {eduProgress && (
          <section className={card}>
            <h2 className={sectionHeading} style={headingStyle}>
              <GraduationCap size={20} /> Akademin
            </h2>

            <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
              <StatCard
                icon={<Star size={16} />}
                label="XP"
                value={eduProgress.xp.toString()}
              />
              <StatCard
                icon={<CheckCircle2 size={16} />}
                label="Lektioner"
                value={eduProgress.completedLessons.length.toString()}
              />
              <StatCard
                icon={<Award size={16} />}
                label="Certifikat"
                value={eduProgress.certificates.length.toString()}
              />
              <StatCard
                icon={<Flame size={16} />}
                label="Bästa streak"
                value={`${eduProgress.longestStreak} d`}
              />
            </div>

            {/* Badges */}
            {eduProgress.badges.length > 0 && (
              <div className="mt-4">
                <p className={monoLabel} style={monoStyle}>
                  Badges
                </p>
                <div className="flex flex-wrap gap-2">
                  {eduProgress.badges.map((badgeId) => {
                    const badge = BADGES.find((b) => b.id === badgeId);
                    return (
                      <span
                        key={badgeId}
                        className="inline-flex items-center gap-1 rounded-full border border-border px-3 py-1 text-[0.8125rem]"
                      >
                        {badge?.icon ?? "🏅"} {badge?.title ?? badgeId}
                      </span>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Certificates */}
            {eduProgress.certificates.length > 0 && (
              <div className="mt-4">
                <p className={monoLabel} style={monoStyle}>
                  Certifikat
                </p>
                <div className="space-y-2">
                  {eduProgress.certificates.map((cert) => (
                    <div
                      key={cert.certificateId}
                      className="flex items-center justify-between rounded-md border border-border p-3"
                    >
                      <div>
                        <p className="text-[0.9375rem] font-medium">{cert.levelId.replace("niva-", "Nivå ")}</p>
                        <p className="text-[0.8125rem] text-muted-foreground">
                          {cert.earnedDate}
                        </p>
                      </div>
                      <Link
                        href="/akademin/certifikat"
                        className="text-[0.8125rem] text-muted-foreground hover:text-foreground"
                      >
                        <ExternalLink size={14} />
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="mt-4">
              <Link
                href="/akademin"
                className="text-[0.8125rem] text-muted-foreground underline underline-offset-4 hover:text-foreground"
              >
                Gå till akademin
              </Link>
            </div>
          </section>
        )}

        {/* ─── Section 4: Kunskapsbank-framsteg ─── */}
        {knowProgress && (
          <section className={card}>
            <h2 className={sectionHeading} style={headingStyle}>
              <BookOpen size={20} /> Kunskapsbanken
            </h2>

            <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
              <StatCard
                icon={<BookOpen size={16} />}
                label="Lästa begrepp"
                value={`${knowProgress.readConcepts.length}/222`}
              />
              <StatCard
                icon={<CheckCircle2 size={16} />}
                label="Lärvägar"
                value={knowProgress.completedPaths.length.toString()}
              />
              <StatCard
                icon={<Flame size={16} />}
                label="Streak"
                value={`${knowProgress.streak} d`}
              />
              <StatCard
                icon={<Star size={16} />}
                label="Quiz"
                value={Object.keys(knowProgress.quizScores).length.toString()}
              />
            </div>

            {/* Progress bar */}
            <div className="mt-4">
              <div className="flex items-center justify-between text-[0.8125rem] text-muted-foreground">
                <span>Framsteg</span>
                <span>
                  {Math.round((knowProgress.readConcepts.length / 222) * 100)}%
                </span>
              </div>
              <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-secondary">
                <div
                  className="h-full rounded-full bg-primary transition-all duration-500"
                  style={{
                    width: `${(knowProgress.readConcepts.length / 222) * 100}%`,
                  }}
                />
              </div>
            </div>

            <div className="mt-4">
              <Link
                href="/kunskapsbank"
                className="text-[0.8125rem] text-muted-foreground underline underline-offset-4 hover:text-foreground"
              >
                Gå till kunskapsbanken
              </Link>
            </div>
          </section>
        )}

        {/* ─── Section 5: Favoriter ─── */}
        <section className={card}>
          <h2 className={sectionHeading} style={headingStyle}>
            <Heart size={20} /> Mina favoriter
          </h2>

          {favorites.length === 0 ? (
            <p className="mt-4 text-[0.9375rem] text-foreground/85">
              Du har inga sparade favoriter ännu. Favorisera assistenter och kurser
              för att se dem här.
            </p>
          ) : (
            <div className="mt-4 space-y-4">
              {/* Assistant favorites */}
              {assistantFavs.length > 0 && (
                <div>
                  <p className={monoLabel} style={monoStyle}>
                    Assistenter
                  </p>
                  <div className="space-y-2">
                    {assistantFavs.map((fav) => (
                      <FavoriteRow
                        key={fav.id}
                        fav={fav}
                        href="/assistenter"
                        onRemove={() => handleRemoveFavorite(fav)}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Course/lesson favorites */}
              {courseFavs.length > 0 && (
                <div>
                  <p className={monoLabel} style={monoStyle}>
                    Kurser & lektioner
                  </p>
                  <div className="space-y-2">
                    {courseFavs.map((fav) => (
                      <FavoriteRow
                        key={fav.id}
                        fav={fav}
                        href="/akademin"
                        onRemove={() => handleRemoveFavorite(fav)}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </section>

        {/* ─── Sign out ─── */}
        <div className="flex justify-center pb-8">
          <button
            onClick={handleSignOut}
            className="flex items-center gap-2 rounded-md border border-border px-6 py-2.5 text-[0.8125rem] font-medium uppercase tracking-[0.05em] text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
            style={monoStyle}
          >
            <LogOut size={14} /> Logga ut
          </button>
        </div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Sub-components
// ---------------------------------------------------------------------------

function StatCard({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-md border border-border p-3 text-center">
      <div className="mx-auto mb-1 flex h-8 w-8 items-center justify-center rounded-full bg-secondary text-muted-foreground">
        {icon}
      </div>
      <p className="text-[1.125rem] font-medium">{value}</p>
      <p
        className="text-[0.625rem] font-medium uppercase tracking-[0.1em] text-muted-foreground"
        style={{ fontFamily: "var(--font-geist-mono), monospace" }}
      >
        {label}
      </p>
    </div>
  );
}

function FavoriteRow({
  fav,
  href,
  onRemove,
}: {
  fav: Favorite;
  href: string;
  onRemove: () => void;
}) {
  return (
    <div className="flex items-center justify-between rounded-md border border-border p-3">
      <Link
        href={href}
        className="flex-1 text-[0.9375rem] hover:underline underline-offset-4"
      >
        {fav.item_id}
      </Link>
      <button
        onClick={onRemove}
        className="ml-2 flex h-7 w-7 items-center justify-center rounded-full text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
        aria-label="Ta bort favorit"
      >
        <Trash2 size={14} />
      </button>
    </div>
  );
}
