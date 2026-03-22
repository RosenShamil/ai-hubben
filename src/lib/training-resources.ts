import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export interface TrainingSession {
  id: string;
  date: string;
  type: "workshop" | "individual";
  department: string;
  role_group: string;
  participants: number;
  description: string | null;
  time: string | null;
  location: string | null;
  max_participants: number;
  created_at: string;
}

export interface TrainingRegistration {
  id: string;
  session_id: string;
  name: string;
  email: string;
  created_at: string;
}

export interface TrainingResource {
  id: string;
  title: string;
  description: string | null;
  type: "guide" | "video" | "pdf" | "kurs";
  url: string | null;
  created_at: string;
}

export async function fetchUpcomingWorkshops(): Promise<TrainingSession[]> {
  const today = new Date().toISOString().split("T")[0];
  const { data, error } = await supabase
    .from("training_sessions")
    .select("*")
    .gte("date", today)
    .order("date", { ascending: true });

  if (error) {
    console.error("Error fetching upcoming workshops:", error);
    return [];
  }
  return (data ?? []) as TrainingSession[];
}

export async function fetchPastTraining(): Promise<TrainingSession[]> {
  const today = new Date().toISOString().split("T")[0];
  const { data, error } = await supabase
    .from("training_sessions")
    .select("*")
    .lt("date", today)
    .order("date", { ascending: false })
    .limit(20);

  if (error) {
    console.error("Error fetching past training:", error);
    return [];
  }
  return (data ?? []) as TrainingSession[];
}

export async function fetchResources(): Promise<TrainingResource[]> {
  const { data, error } = await supabase
    .from("training_resources")
    .select("*")
    .order("sort_order", { ascending: true });

  if (error) {
    console.error("Error fetching resources:", error);
    return [];
  }
  return (data ?? []) as TrainingResource[];
}

export async function fetchAllSessions(): Promise<TrainingSession[]> {
  const { data, error } = await supabase
    .from("training_sessions")
    .select("*")
    .order("date", { ascending: true });

  if (error) {
    console.error("Error fetching all sessions:", error);
    return [];
  }
  return (data ?? []) as TrainingSession[];
}

export async function fetchSessionWithRegistrations(
  id: string
): Promise<{ session: TrainingSession; registrationCount: number } | null> {
  const { data: session, error: sessionError } = await supabase
    .from("training_sessions")
    .select("*")
    .eq("id", id)
    .single();

  if (sessionError || !session) {
    console.error("Error fetching session:", sessionError);
    return null;
  }

  const { count, error: countError } = await supabase
    .from("training_registrations")
    .select("*", { count: "exact", head: true })
    .eq("session_id", id);

  if (countError) {
    console.error("Error fetching registration count:", countError);
    return { session: session as TrainingSession, registrationCount: 0 };
  }

  return {
    session: session as TrainingSession,
    registrationCount: count ?? 0,
  };
}

export async function registerForSession(
  sessionId: string,
  name: string,
  email: string
): Promise<{ success: boolean; error?: string }> {
  // Check available spots first
  const result = await fetchSessionWithRegistrations(sessionId);
  if (!result) {
    return { success: false, error: "Utbildningstillfället hittades inte" };
  }

  if (result.registrationCount >= result.session.max_participants) {
    return { success: false, error: "Fullbokat - inga platser kvar" };
  }

  const { error } = await supabase.from("training_registrations").insert({
    session_id: sessionId,
    name,
    email,
  });

  if (error) {
    console.error("Error registering for session:", error);
    return { success: false, error: error.message };
  }

  return { success: true };
}

export async function fetchRegistrationsForSession(
  sessionId: string
): Promise<TrainingRegistration[]> {
  const { data, error } = await supabase
    .from("training_registrations")
    .select("*")
    .eq("session_id", sessionId)
    .order("created_at", { ascending: true });

  if (error) {
    console.error("Error fetching registrations:", error);
    return [];
  }
  return (data ?? []) as TrainingRegistration[];
}
