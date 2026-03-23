"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  type ReactNode,
} from "react";
import type { User } from "@supabase/supabase-js";
import { supabase } from "@/lib/supabase";
import {
  getUserProfile,
  isUserAdmin,
  signOut as authSignOut,
  type UserProfile,
} from "@/lib/supabase-auth";
import { syncOnLogin, pushProgress } from "@/lib/progress-sync";

interface AuthContextValue {
  user: User | null;
  profile: UserProfile | null;
  isAdmin: boolean;
  loading: boolean;
  signOut: () => Promise<void>;
  refreshProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue>({
  user: null,
  profile: null,
  isAdmin: false,
  loading: true,
  signOut: async () => {},
  refreshProfile: async () => {},
});

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  const loadProfile = useCallback(async (u: User) => {
    let [p, admin] = await Promise.all([
      getUserProfile(u.id),
      isUserAdmin(u.id),
    ]);

    // If profile doesn't exist (user created before trigger), create it
    if (!p) {
      const fullName =
        u.user_metadata?.full_name || u.email?.split("@")[0] || "";
      await supabase.from("profiles").upsert({
        id: u.id,
        full_name: fullName,
        email: u.email ?? "",
        municipality: "Katrineholms kommun",
        job_title: "",
        avatar_url: "",
      });
      p = await getUserProfile(u.id);
    }

    setProfile(p);
    setIsAdmin(admin);
  }, []);

  const refreshProfile = useCallback(async () => {
    if (user) await loadProfile(user);
  }, [user, loadProfile]);

  const handleSignOut = useCallback(async () => {
    // Push progress before signing out
    if (user) {
      try {
        await pushProgress(user.id);
      } catch {
        // best-effort
      }
    }
    await authSignOut();
    setUser(null);
    setProfile(null);
    setIsAdmin(false);
  }, [user]);

  useEffect(() => {
    // Check existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      const u = session?.user ?? null;
      setUser(u);
      if (u) {
        loadProfile(u);
        syncOnLogin(u.id).catch(() => {});
      }
      setLoading(false);
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      const u = session?.user ?? null;
      setUser(u);
      if (u) {
        loadProfile(u);
        syncOnLogin(u.id).catch(() => {});
      } else {
        setProfile(null);
        setIsAdmin(false);
      }
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, [loadProfile]);

  return (
    <AuthContext.Provider
      value={{ user, profile, isAdmin, loading, signOut: handleSignOut, refreshProfile }}
    >
      {children}
    </AuthContext.Provider>
  );
}
