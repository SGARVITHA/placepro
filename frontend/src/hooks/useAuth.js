import { useState, useEffect } from 'react';
import supabase from '../lib/supabaseClient';

export function useAuth() {
  const [user, setUser] = useState(null);
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const handleSession = async (currentSession) => {
      if (currentSession && !currentSession.user.email.endsWith('@rmkec.ac.in')) {
        await supabase.auth.signOut();
        if (isMounted) {
          setSession(null);
          setUser(null);
          setLoading(false);
        }
        // Dispatch custom event for Login page to catch
        window.dispatchEvent(new CustomEvent('auth_domain_error'));
        return;
      }

      if (isMounted) {
        setSession(currentSession);
        setUser(currentSession?.user ?? null);
        setLoading(false);
      }
    };

    // Get initial session
    supabase.auth.getSession().then(({ data: { session: initialSession }, error }) => {
      if (error) console.error('Error fetching session:', error);
      handleSession(initialSession);
    });

    // Subscribe to auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, currentSession) => {
      handleSession(currentSession);
    });

    return () => {
      isMounted = false;
      subscription?.unsubscribe();
    };
  }, []);

  const signInWithGoogle = async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        queryParams: {
          hd: 'rmkec.ac.in',
        },
        redirectTo: window.location.origin,
      },
    });

    if (error) {
      throw error;
    }

    return data;
  };

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      throw error;
    }
  };

  return {
    user,
    session,
    loading,
    signInWithGoogle,
    signOut,
  };
}
