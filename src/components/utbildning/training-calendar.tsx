"use client";

import { useState, useMemo } from "react";
import {
  ChevronLeft,
  ChevronRight,
  X,
  MapPin,
  Clock,
  Building2,
  Users,
  Check,
  Loader2,
} from "lucide-react";
import { FadeIn } from "@/components/shared/fade-in";
import { supabase } from "@/lib/supabase";
import type { TrainingSession, SessionStatus } from "@/lib/training-resources";

const STATUS_LABELS: Record<SessionStatus, string> = {
  open: "Öppen",
  closed: "Stängd",
  full: "Fullbokad",
  completed: "Genomförd",
};

const STATUS_STYLES: Record<SessionStatus, string> = {
  open: "bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-300",
  closed: "bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300",
  full: "bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-300",
  completed: "bg-secondary text-muted-foreground",
};

const SWEDISH_MONTHS = [
  "januari",
  "februari",
  "mars",
  "april",
  "maj",
  "juni",
  "juli",
  "augusti",
  "september",
  "oktober",
  "november",
  "december",
];

const WEEKDAY_HEADERS = ["mån", "tis", "ons", "tor", "fre", "lör", "sön"];

function formatSwedishDate(dateStr: string): string {
  const d = new Date(dateStr + "T00:00:00");
  return `${d.getDate()} ${SWEDISH_MONTHS[d.getMonth()]} ${d.getFullYear()}`;
}

function getDaysInMonth(year: number, month: number): number {
  return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfMonth(year: number, month: number): number {
  // 0=Sunday in JS, we want 0=Monday
  const day = new Date(year, month, 1).getDay();
  return day === 0 ? 6 : day - 1;
}

function toDateString(year: number, month: number, day: number): string {
  return `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
}

interface RegistrationForm {
  name: string;
  email: string;
}

export function TrainingCalendar({
  sessions,
}: {
  sessions: TrainingSession[];
}) {
  const today = new Date();
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedSession, setSelectedSession] =
    useState<TrainingSession | null>(null);
  const [showRegForm, setShowRegForm] = useState(false);
  const [regForm, setRegForm] = useState<RegistrationForm>({
    name: "",
    email: "",
  });
  const [registering, setRegistering] = useState(false);
  const [regSuccess, setRegSuccess] = useState(false);
  const [regError, setRegError] = useState<string | null>(null);
  const [registrationCounts, setRegistrationCounts] = useState<
    Record<string, number>
  >({});

  // Build a map of date -> sessions
  const sessionsByDate = useMemo(() => {
    const map: Record<string, TrainingSession[]> = {};
    for (const s of sessions) {
      if (!map[s.date]) map[s.date] = [];
      map[s.date].push(s);
    }
    return map;
  }, [sessions]);

  // Calendar grid data
  const daysInMonth = getDaysInMonth(currentYear, currentMonth);
  const firstDay = getFirstDayOfMonth(currentYear, currentMonth);
  const prevMonthDays = getDaysInMonth(
    currentMonth === 0 ? currentYear - 1 : currentYear,
    currentMonth === 0 ? 11 : currentMonth - 1
  );

  const todayStr = toDateString(
    today.getFullYear(),
    today.getMonth(),
    today.getDate()
  );

  // Build calendar cells
  const calendarCells: {
    day: number;
    dateStr: string;
    isCurrentMonth: boolean;
    isToday: boolean;
    sessions: TrainingSession[];
  }[] = [];

  // Previous month trailing days
  for (let i = firstDay - 1; i >= 0; i--) {
    const day = prevMonthDays - i;
    const m = currentMonth === 0 ? 11 : currentMonth - 1;
    const y = currentMonth === 0 ? currentYear - 1 : currentYear;
    const dateStr = toDateString(y, m, day);
    calendarCells.push({
      day,
      dateStr,
      isCurrentMonth: false,
      isToday: dateStr === todayStr,
      sessions: sessionsByDate[dateStr] || [],
    });
  }

  // Current month days
  for (let day = 1; day <= daysInMonth; day++) {
    const dateStr = toDateString(currentYear, currentMonth, day);
    calendarCells.push({
      day,
      dateStr,
      isCurrentMonth: true,
      isToday: dateStr === todayStr,
      sessions: sessionsByDate[dateStr] || [],
    });
  }

  // Next month leading days to fill grid
  const remainingCells = 7 - (calendarCells.length % 7);
  if (remainingCells < 7) {
    for (let day = 1; day <= remainingCells; day++) {
      const m = currentMonth === 11 ? 0 : currentMonth + 1;
      const y = currentMonth === 11 ? currentYear + 1 : currentYear;
      const dateStr = toDateString(y, m, day);
      calendarCells.push({
        day,
        dateStr,
        isCurrentMonth: false,
        isToday: dateStr === todayStr,
        sessions: sessionsByDate[dateStr] || [],
      });
    }
  }

  function goToPrevMonth() {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
    closeDetail();
  }

  function goToNextMonth() {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
    closeDetail();
  }

  function closeDetail() {
    setSelectedDate(null);
    setSelectedSession(null);
    setShowRegForm(false);
    setRegSuccess(false);
    setRegError(null);
  }

  async function handleDayClick(dateStr: string, daySessions: TrainingSession[]) {
    if (daySessions.length === 0) return;
    setSelectedDate(dateStr);
    setSelectedSession(null);
    setShowRegForm(false);
    setRegSuccess(false);
    setRegError(null);

    // Fetch registration counts for all sessions on this day
    for (const s of daySessions) {
      if (registrationCounts[s.id] === undefined) {
        const { count } = await supabase
          .from("training_registrations")
          .select("*", { count: "exact", head: true })
          .eq("session_id", s.id);
        setRegistrationCounts((prev) => ({
          ...prev,
          [s.id]: count ?? 0,
        }));
      }
    }

    // If only one session, select it directly
    if (daySessions.length === 1) {
      setSelectedSession(daySessions[0]);
    }
  }

  async function selectSession(session: TrainingSession) {
    setSelectedSession(session);
    setShowRegForm(false);
    setRegSuccess(false);
    setRegError(null);

    // Fetch count if not cached
    if (registrationCounts[session.id] === undefined) {
      const { count } = await supabase
        .from("training_registrations")
        .select("*", { count: "exact", head: true })
        .eq("session_id", session.id);
      setRegistrationCounts((prev) => ({
        ...prev,
        [session.id]: count ?? 0,
      }));
    }
  }

  async function handleRegister(e: React.FormEvent) {
    e.preventDefault();
    if (!selectedSession) return;
    setRegistering(true);
    setRegError(null);

    // Check spots
    const currentCount = registrationCounts[selectedSession.id] ?? 0;
    if (currentCount >= selectedSession.max_participants) {
      setRegError("Fullbokat - inga platser kvar");
      setRegistering(false);
      return;
    }

    const { error } = await supabase.from("training_registrations").insert({
      session_id: selectedSession.id,
      name: regForm.name,
      email: regForm.email,
    });

    if (error) {
      setRegError(error.message);
      setRegistering(false);
      return;
    }

    // Update count
    setRegistrationCounts((prev) => ({
      ...prev,
      [selectedSession.id]: (prev[selectedSession.id] ?? 0) + 1,
    }));
    setRegSuccess(true);
    setRegistering(false);
    setRegForm({ name: "", email: "" });
  }

  const selectedDaySessions = selectedDate
    ? sessionsByDate[selectedDate] || []
    : [];

  return (
    <FadeIn>
      <div className="rounded-lg border border-border bg-card">
        {/* Calendar header */}
        <div className="flex items-center justify-between border-b border-border px-5 py-4">
          <button
            onClick={goToPrevMonth}
            className="rounded-md p-1.5 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
            aria-label="Föregående månad"
          >
            <ChevronLeft size={18} />
          </button>
          <h3
            className="text-[1.125rem] tracking-[-0.02em]"
            style={{
              fontFamily: "var(--font-bodoni), serif",
              fontWeight: 400,
            }}
          >
            {SWEDISH_MONTHS[currentMonth].charAt(0).toUpperCase() +
              SWEDISH_MONTHS[currentMonth].slice(1)}{" "}
            {currentYear}
          </h3>
          <button
            onClick={goToNextMonth}
            className="rounded-md p-1.5 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
            aria-label="Nästa månad"
          >
            <ChevronRight size={18} />
          </button>
        </div>

        {/* Weekday headers */}
        <div className="grid grid-cols-7 border-b border-border">
          {WEEKDAY_HEADERS.map((day) => (
            <div
              key={day}
              className="px-1 py-2.5 text-center text-[0.625rem] font-medium uppercase tracking-[0.1em] text-muted-foreground"
              style={{ fontFamily: "var(--font-geist-mono), monospace" }}
            >
              {day}
            </div>
          ))}
        </div>

        {/* Calendar grid */}
        <div className="grid grid-cols-7">
          {calendarCells.map((cell, i) => {
            const hasSessions = cell.sessions.length > 0;
            const isSelected = selectedDate === cell.dateStr;

            return (
              <button
                key={i}
                onClick={() =>
                  hasSessions
                    ? handleDayClick(cell.dateStr, cell.sessions)
                    : undefined
                }
                disabled={!hasSessions}
                className={`relative flex min-h-[3.25rem] flex-col items-center border-b border-r border-border px-1 py-2 text-[0.8125rem] transition-colors md:min-h-[4rem] ${
                  !cell.isCurrentMonth
                    ? "text-muted-foreground/40"
                    : "text-foreground"
                } ${
                  hasSessions
                    ? "cursor-pointer hover:bg-secondary/60"
                    : "cursor-default"
                } ${isSelected ? "bg-secondary" : ""} ${
                  cell.isToday && cell.isCurrentMonth
                    ? "font-semibold"
                    : ""
                }`}
              >
                <span
                  className={`flex h-7 w-7 items-center justify-center rounded-full text-[0.8125rem] ${
                    cell.isToday && cell.isCurrentMonth
                      ? "bg-primary text-primary-foreground"
                      : ""
                  }`}
                >
                  {cell.day}
                </span>
                {hasSessions && cell.isCurrentMonth && (
                  <div className="mt-0.5 flex gap-0.5">
                    {cell.sessions.map((s) => (
                      <span
                        key={s.id}
                        className={`h-1.5 w-1.5 rounded-full ${
                          s.status === "completed"
                            ? "bg-muted-foreground/40"
                            : s.status === "full"
                              ? "bg-red-500"
                              : s.status === "closed"
                                ? "bg-amber-500"
                                : s.type === "workshop"
                                  ? "bg-blue-500"
                                  : "bg-purple-500"
                        }`}
                      />
                    ))}
                  </div>
                )}
              </button>
            );
          })}
        </div>

        {/* Legend */}
        <div className="flex flex-wrap items-center gap-4 border-t border-border px-5 py-3">
          <div className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-blue-500" />
            <span className="text-[0.6875rem] text-muted-foreground" style={{ fontFamily: "var(--font-geist-mono), monospace" }}>
              Öppen
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-red-500" />
            <span className="text-[0.6875rem] text-muted-foreground" style={{ fontFamily: "var(--font-geist-mono), monospace" }}>
              Fullbokad
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-amber-500" />
            <span className="text-[0.6875rem] text-muted-foreground" style={{ fontFamily: "var(--font-geist-mono), monospace" }}>
              Stängd
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-muted-foreground/40" />
            <span className="text-[0.6875rem] text-muted-foreground" style={{ fontFamily: "var(--font-geist-mono), monospace" }}>
              Genomförd
            </span>
          </div>
        </div>
      </div>

      {/* Detail panel */}
      {selectedDate && (
        <div className="mt-5 rounded-lg border border-border bg-card">
          <div className="flex items-center justify-between border-b border-border px-5 py-4">
            <h4
              className="text-[1rem] tracking-[-0.02em]"
              style={{
                fontFamily: "var(--font-bodoni), serif",
                fontWeight: 400,
              }}
            >
              {formatSwedishDate(selectedDate)}
            </h4>
            <button
              onClick={closeDetail}
              className="rounded-md p-1 text-muted-foreground transition-colors hover:text-foreground"
            >
              <X size={16} />
            </button>
          </div>

          <div className="p-5">
            {/* Session list if multiple */}
            {selectedDaySessions.length > 1 && !selectedSession && (
              <div className="space-y-3">
                <p className="text-[0.8125rem] text-foreground/85">
                  {selectedDaySessions.length} utbildningstillfällen denna dag:
                </p>
                {selectedDaySessions.map((s) => {
                  const count = registrationCounts[s.id] ?? 0;
                  const spotsLeft = s.max_participants - count;
                  return (
                    <button
                      key={s.id}
                      onClick={() => selectSession(s)}
                      className="w-full rounded-lg border border-border p-4 text-left transition-colors hover:bg-secondary"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <p className="text-[0.875rem] font-medium">
                            {s.description || "Utbildningstillfälle"}
                          </p>
                          <div className="mt-1 flex items-center gap-3 text-[0.75rem] text-muted-foreground">
                            {s.time && (
                              <span className="flex items-center gap-1">
                                <Clock size={11} />
                                {s.time}
                              </span>
                            )}
                            <span
                              className={`inline-block rounded-full px-2 py-0.5 text-[0.6875rem] font-medium ${
                                s.type === "workshop"
                                  ? "bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300"
                                  : "bg-purple-100 text-purple-700 dark:bg-purple-950 dark:text-purple-300"
                              }`}
                            >
                              {s.type === "workshop"
                                ? "Workshop"
                                : "Individuell"}
                            </span>
                          </div>
                        </div>
                        <span
                          className={`shrink-0 rounded-full px-2 py-0.5 text-[0.6875rem] font-medium ${STATUS_STYLES[s.status ?? "open"]}`}
                          style={{
                            fontFamily: "var(--font-geist-mono), monospace",
                          }}
                        >
                          {STATUS_LABELS[s.status ?? "open"]}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            )}

            {/* Session detail */}
            {selectedSession && (
              <div>
                {selectedDaySessions.length > 1 && (
                  <button
                    onClick={() => {
                      setSelectedSession(null);
                      setShowRegForm(false);
                      setRegSuccess(false);
                    }}
                    className="mb-4 text-[0.8125rem] text-muted-foreground transition-colors hover:text-foreground"
                  >
                    &larr; Tillbaka
                  </button>
                )}

                <div className="space-y-4">
                  <div>
                    <h5 className="text-[1.0625rem] font-medium tracking-tight">
                      {selectedSession.description || "Utbildningstillfälle"}
                    </h5>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <span
                      className={`inline-block rounded-full px-2.5 py-0.5 text-[0.6875rem] font-medium ${
                        selectedSession.type === "workshop"
                          ? "bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300"
                          : "bg-purple-100 text-purple-700 dark:bg-purple-950 dark:text-purple-300"
                      }`}
                    >
                      {selectedSession.type === "workshop"
                        ? "Workshop"
                        : "Individuell"}
                    </span>
                    <span
                      className={`inline-block rounded-full px-2.5 py-0.5 text-[0.6875rem] font-medium ${STATUS_STYLES[selectedSession.status ?? "open"]}`}
                    >
                      {STATUS_LABELS[selectedSession.status ?? "open"]}
                    </span>
                  </div>

                  <div className="space-y-2.5 text-[0.875rem] text-foreground/85">
                    {selectedSession.time && (
                      <div className="flex items-center gap-2.5">
                        <Clock size={14} className="shrink-0" />
                        <span>{selectedSession.time}</span>
                      </div>
                    )}
                    {selectedSession.location && (
                      <div className="flex items-center gap-2.5">
                        <MapPin size={14} className="shrink-0" />
                        <span>{selectedSession.location}</span>
                      </div>
                    )}
                    {selectedSession.department && (
                      <div className="flex items-center gap-2.5">
                        <Building2 size={14} className="shrink-0" />
                        <span>{selectedSession.department}</span>
                      </div>
                    )}
                    <div className="flex items-center gap-2.5">
                      <Users size={14} className="shrink-0" />
                      <span>
                        {(() => {
                          const count =
                            registrationCounts[selectedSession.id] ?? 0;
                          const spotsLeft =
                            selectedSession.max_participants - count;
                          return spotsLeft <= 0
                            ? "Fullbokat"
                            : `${spotsLeft} av ${selectedSession.max_participants} platser kvar`;
                        })()}
                      </span>
                    </div>
                  </div>

                  {/* Registration area */}
                  {(() => {
                    const count =
                      registrationCounts[selectedSession.id] ?? 0;
                    const spotsLeft =
                      selectedSession.max_participants - count;
                    const isFull = spotsLeft <= 0;
                    const status = selectedSession.status ?? "open";

                    // Non-open statuses: show info instead of registration
                    if (status === "completed") {
                      return (
                        <div className="rounded-lg border border-border bg-secondary/50 p-4 text-center">
                          <p className="text-[0.875rem] font-medium text-muted-foreground">
                            Genomförd utbildning
                          </p>
                          <p className="mt-1 text-[0.8125rem] text-muted-foreground/70">
                            {selectedSession.participants > 0
                              ? `${selectedSession.participants} deltagare`
                              : ""}
                          </p>
                        </div>
                      );
                    }

                    if (status === "full") {
                      return (
                        <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-center dark:border-red-900 dark:bg-red-950">
                          <p className="text-[0.875rem] font-medium text-red-700 dark:text-red-300">
                            Fullbokad
                          </p>
                          <p className="mt-1 text-[0.8125rem] text-red-600 dark:text-red-400">
                            Det finns inga lediga platser kvar.
                          </p>
                        </div>
                      );
                    }

                    if (status === "closed") {
                      return (
                        <div className="rounded-lg border border-amber-200 bg-amber-50 p-4 text-center dark:border-amber-900 dark:bg-amber-950">
                          <p className="text-[0.875rem] font-medium text-amber-700 dark:text-amber-300">
                            Anmälan stängd
                          </p>
                          <p className="mt-1 text-[0.8125rem] text-amber-600 dark:text-amber-400">
                            Anmälan till detta tillfälle är inte längre öppen.
                          </p>
                        </div>
                      );
                    }

                    // status === "open" — show registration
                    if (regSuccess) {
                      return (
                        <div className="rounded-lg border border-green-200 bg-green-50 p-4 dark:border-green-900 dark:bg-green-950">
                          <div className="flex items-center gap-2">
                            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-100 dark:bg-green-900">
                              <Check
                                size={16}
                                className="text-green-700 dark:text-green-300"
                              />
                            </div>
                            <div>
                              <p className="text-[0.875rem] font-medium text-green-800 dark:text-green-200">
                                Anmälan registrerad!
                              </p>
                              <p className="text-[0.8125rem] text-green-700 dark:text-green-300">
                                Du är nu anmäld till detta tillfälle.
                              </p>
                            </div>
                          </div>
                        </div>
                      );
                    }

                    if (isFull) {
                      return (
                        <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-center dark:border-red-900 dark:bg-red-950">
                          <p className="text-[0.875rem] font-medium text-red-700 dark:text-red-300">
                            Fullbokat
                          </p>
                          <p className="mt-1 text-[0.8125rem] text-red-600 dark:text-red-400">
                            Det finns inga lediga platser kvar för detta
                            tillfälle.
                          </p>
                        </div>
                      );
                    }

                    if (!showRegForm) {
                      return (
                        <button
                          onClick={() => setShowRegForm(true)}
                          className="flex items-center gap-2 rounded-md bg-primary px-5 py-2.5 text-[0.8125rem] font-medium text-primary-foreground transition-all hover:opacity-90 active:scale-[0.98]"
                          style={{
                            fontFamily: "var(--font-geist-mono), monospace",
                            boxShadow:
                              "0px 2px 1px 0px rgba(255,255,255,0.15) inset, 0px -2px 1px 0px rgba(0,0,0,0.05) inset",
                          }}
                        >
                          Anmäl dig
                        </button>
                      );
                    }

                    return (
                      <form
                        onSubmit={handleRegister}
                        className="space-y-4 rounded-lg border border-border bg-background p-4"
                      >
                        <div>
                          <label
                            className="mb-1.5 block text-[0.625rem] font-medium uppercase tracking-[0.1em] text-muted-foreground"
                            style={{
                              fontFamily:
                                "var(--font-geist-mono), monospace",
                            }}
                          >
                            Namn *
                          </label>
                          <input
                            type="text"
                            required
                            value={regForm.name}
                            onChange={(e) =>
                              setRegForm({
                                ...regForm,
                                name: e.target.value,
                              })
                            }
                            placeholder="Ditt namn"
                            className="w-full rounded-md border border-border bg-background px-3 py-2.5 text-[0.875rem] outline-none transition-colors focus:border-foreground"
                          />
                        </div>
                        <div>
                          <label
                            className="mb-1.5 block text-[0.625rem] font-medium uppercase tracking-[0.1em] text-muted-foreground"
                            style={{
                              fontFamily:
                                "var(--font-geist-mono), monospace",
                            }}
                          >
                            E-post *
                          </label>
                          <input
                            type="email"
                            required
                            value={regForm.email}
                            onChange={(e) =>
                              setRegForm({
                                ...regForm,
                                email: e.target.value,
                              })
                            }
                            placeholder="din.email@katrineholm.se"
                            className="w-full rounded-md border border-border bg-background px-3 py-2.5 text-[0.875rem] outline-none transition-colors focus:border-foreground"
                          />
                        </div>

                        {regError && (
                          <p className="text-[0.8125rem] text-red-600 dark:text-red-400">
                            {regError}
                          </p>
                        )}

                        <div className="flex items-center gap-3">
                          <button
                            type="submit"
                            disabled={registering}
                            className="flex items-center gap-2 rounded-md bg-primary px-5 py-2.5 text-[0.8125rem] font-medium text-primary-foreground transition-all hover:opacity-90 disabled:opacity-50 active:scale-[0.98]"
                            style={{
                              fontFamily:
                                "var(--font-geist-mono), monospace",
                              boxShadow:
                                "0px 2px 1px 0px rgba(255,255,255,0.15) inset, 0px -2px 1px 0px rgba(0,0,0,0.05) inset",
                            }}
                          >
                            {registering && (
                              <Loader2
                                size={14}
                                className="animate-spin"
                              />
                            )}
                            {registering ? "Skickar..." : "Skicka anmälan"}
                          </button>
                          <button
                            type="button"
                            onClick={() => setShowRegForm(false)}
                            className="rounded-md border border-border px-4 py-2.5 text-[0.8125rem] transition-colors hover:bg-secondary"
                          >
                            Avbryt
                          </button>
                        </div>
                      </form>
                    );
                  })()}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </FadeIn>
  );
}
