import React, { useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import GoogleSignInButton from '../../components/auth/GoogleSignInButton';

export default function Login() {
  const { session, signInWithGoogle } = useAuth();
  const location = useLocation();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  // If active session exists, redirect to attempted location or dashboard root
  if (session) {
    const from = location.state?.from || '/';
    return <Navigate to={from} replace />;
  }

  const handleSignIn = async () => {
    try {
      setError(null);
      setLoading(true);
      await signInWithGoogle();
    } catch (err) {
      console.error('Sign in error:', err);
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const isDomainOrPermissionError = (err) => {
    if (!err) return false;
    const msg = (err.message || String(err)).toLowerCase();
    return (
      msg.includes('domain') ||
      msg.includes('permission') ||
      msg.includes('rmkec') ||
      msg.includes('hd') ||
      msg.includes('unauthorized') ||
      msg.includes('access_denied')
    );
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-bg-primary px-4 py-8">
      {/* Accessible h1 for screen reader announcement */}
      <h1 className="sr-only">Sign in to PlacePro</h1>

      <div className="w-full max-w-md flex flex-col items-center text-center">
        {/* App wordmark */}
        <span className="text-4xl font-bold text-accent tracking-tight mb-3 font-sans">
          PlacePro
        </span>

        {/* One-line value proposition */}
        <p className="text-text-secondary text-base mb-8 font-sans">
          Placement preparation, built for RMK Engineering College
        </p>

        {/* Google Sign In Button */}
        <GoogleSignInButton
          signInWithGoogle={handleSignIn}
          loading={loading}
        />

        {/* Inline error message */}
        {error && (
          <p className="mt-4 text-sm text-red-500 font-medium font-sans">
            {isDomainOrPermissionError(error)
              ? 'Only RMK Engineering College accounts can sign in'
              : 'Sign-in failed. Try again.'}
          </p>
        )}

        {/* Footnote text */}
        <p className="mt-6 text-xs text-text-secondary opacity-80 font-sans">
          Only RMK Engineering College accounts can sign in
        </p>
      </div>
    </div>
  );
}
