import { useState, useEffect } from 'react';
import supabase from '../lib/supabaseClient';

const IS_MOCK_MODE = import.meta.env.VITE_USE_MOCK_API === 'true';
const DEV_AUTH_KEY = 'placepro_dev_auth';

function getInitialDevSession() {
  if (!IS_MOCK_MODE) return null;
  try {
    const saved = localStorage.getItem(DEV_AUTH_KEY);
    if (!saved) return null;
    const parsed = JSON.parse(saved);
    if (parsed?.user?.email?.endsWith('@rmkec.ac.in')) {
      return parsed;
    }
  } catch {
    localStorage.removeItem(DEV_AUTH_KEY);
  }
  return null;
}

export function useAuth() {
  const [session, setSession] = useState(getInitialDevSession);
  const [user, setUser] = useState(() => getInitialDevSession()?.user || null);
  const [loading, setLoading] = useState(() => !getInitialDevSession());

  useEffect(() => {
    let isMounted = true;

    // In mock mode, if dev session is already active, no need to query Supabase
    if (IS_MOCK_MODE && getInitialDevSession()) {
      return;
    }

    const handleSession = async (currentSession) => {
      if (currentSession && !currentSession.user.email.endsWith('@rmkec.ac.in')) {
        await supabase.auth.signOut();
        if (isMounted) {
          setSession(null);
          setUser(null);
          setLoading(false);
        }
        window.dispatchEvent(new CustomEvent('auth_domain_error'));
        return;
      }

      if (isMounted) {
        setSession(currentSession);
        setUser(currentSession?.user ?? null);
        setLoading(false);
      }
    };

    // Get initial Supabase session
    supabase.auth.getSession().then(({ data: { session: initialSession }, error }) => {
      if (error && !IS_MOCK_MODE) console.error('Error fetching session:', error);
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

  /**
   * Safe dev-only authentication helper for local demonstration and screen testing.
   * Strictly operational only when VITE_USE_MOCK_API=true.
   */
  const signInDevDemo = () => {
    if (!IS_MOCK_MODE) return;

    const demoSession = {
      access_token: 'mock-dev-token-rmkec',
      token_type: 'bearer',
      user: {
        id: 'demo-student-id',
        email: 'demo.student@rmkec.ac.in',
        user_metadata: {
          full_name: 'Demo Student',
          name: 'Demo Student',
        },
      },
    };

    localStorage.setItem(DEV_AUTH_KEY, JSON.stringify(demoSession));
    setSession(demoSession);
    setUser(demoSession.user);
    setLoading(false);
  };

  const signOut = async () => {
    if (IS_MOCK_MODE) {
      localStorage.removeItem(DEV_AUTH_KEY);
    }
    try {
      const { error } = await supabase.auth.signOut();
      if (error && !IS_MOCK_MODE) throw error;
    } catch (err) {
      if (!IS_MOCK_MODE) throw err;
    }
    setUser(null);
    setSession(null);
  };

  return {
    user,
    session,
    loading,
    signInWithGoogle,
    signInDevDemo,
    signOut,
    isMockMode: IS_MOCK_MODE,
  };
}
