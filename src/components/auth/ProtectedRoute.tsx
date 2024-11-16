import { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const [session, setSession] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  // Add rate limiting for auth requests
  useEffect(() => {
    const rateLimitKey = "auth_attempts";
    const maxAttempts = 5;
    const timeWindow = 15 * 60 * 1000; // 15 minutes

    const attempts = JSON.parse(sessionStorage.getItem(rateLimitKey) || "[]");
    const now = Date.now();

    // Clean up old attempts
    const recentAttempts = attempts.filter((timestamp: number) => now - timestamp < timeWindow);

    if (recentAttempts.length >= maxAttempts) {
      toast({
        title: "Error",
        description: "Too many login attempts. Please try again later.",
        variant: "destructive",
      });
      return <Navigate to="/login" state={{ from: location }} replace />;
    }

    // Record new attempt
    recentAttempts.push(now);
    sessionStorage.setItem(rateLimitKey, JSON.stringify(recentAttempts));
  }, [location]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!session) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};