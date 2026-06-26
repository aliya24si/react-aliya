import { createContext, useContext, useState, useEffect, useCallback } from "react";
import { authService } from "@/services/authService";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchProfile = useCallback(async (userId) => {
    try {
      const profileData = await authService.getProfile(userId);
      setProfile(profileData);
    } catch {
      setProfile(null);
    }
  }, []);

  // Single source of truth for session handling
  useEffect(() => {
    let isMounted = true;

    async function handleSession(newSession) {
      if (newSession?.user) {
        setSession(newSession);
        setUser(newSession.user);
        await fetchProfile(newSession.user.id);
      } else {
        setSession(null);
        setUser(null);
        setProfile(null);
      }
      if (isMounted) setLoading(false);
    }

    // 1. Get initial session
    authService.getCurrentSession().then((currentSession) => {
      if (isMounted) handleSession(currentSession);
    });

    // 2. Listen for subsequent auth changes
    const { data: { subscription } } = authService.onAuthStateChange(
      (_event, newSession) => {
        handleSession(newSession);
      }
    );

    return () => {
      isMounted = false;
      subscription?.unsubscribe();
    };
  }, [fetchProfile]);

  const signIn = useCallback(async ({ email, password }) => {
    return await authService.signIn({ email, password });
  }, []);

  const signUp = useCallback(async ({ email, password, fullName }) => {
    return await authService.signUp({ email, password, fullName });
  }, []);

  const signOut = useCallback(async () => {
    await authService.signOut();
  }, []);

  const resetPassword = useCallback(async (email) => {
    return await authService.resetPassword(email);
  }, []);

  const refreshProfile = useCallback(async () => {
    if (user) {
      await fetchProfile(user.id);
    }
  }, [user, fetchProfile]);

  const value = {
    user,
    profile,
    session,
    loading,
    isAuthenticated: !!session,
    isAdmin: profile?.role === "admin",
    isMember: profile?.role === "member",
    signIn,
    signUp,
    signOut,
    resetPassword,
    refreshProfile,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
