import React from 'react';
import { LogIn, Loader2 } from 'lucide-react';

export default function GoogleSignInButton({ signInWithGoogle, loading = false, disabled = false }) {
  return (
    <button
      type="button"
      onClick={signInWithGoogle}
      disabled={loading || disabled}
      className="w-full max-w-[400px] flex items-center justify-center gap-3 py-3 px-6 bg-text-primary text-bg-primary rounded-pill font-sans text-base font-medium transition-opacity hover:opacity-90 active:opacity-95 disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2"
    >
      {loading ? (
        <Loader2 className="w-5 h-5 animate-spin" />
      ) : (
        <LogIn className="w-5 h-5" />
      )}
      <span>Sign in with Google</span>
    </button>
  );
}
