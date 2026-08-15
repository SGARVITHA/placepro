import React, { useState, useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import GoogleSignInButton from '../../components/auth/GoogleSignInButton';
import { Lock } from 'lucide-react';

export default function Login() {
  const { session, signInWithGoogle } = useAuth();
  const location = useLocation();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handleDomainError = () => {
      setError('domain_error');
    };
    window.addEventListener('auth_domain_error', handleDomainError);
    return () => window.removeEventListener('auth_domain_error', handleDomainError);
  }, []);

  // If active session exists, redirect to attempted location or dashboard root
  if (session) {
    const from = location.state?.from || '/dashboard';
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
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex w-full bg-bg-app font-sans">
      {/* Left Pane - Branding (Hidden on small screens) */}
      <div className="hidden lg:flex w-1/2 relative bg-[#F7F8EE] overflow-hidden flex-col justify-between p-12">
        {/* Decorative elements - Top Left Dots */}
        <div className="absolute top-0 left-0 w-48 h-48 bg-[#d8ebd1] rounded-br-full opacity-60"></div>
        <div className="absolute top-6 left-6 grid grid-cols-4 gap-2">
          {[...Array(16)].map((_, i) => (
            <div key={i} className="w-1.5 h-1.5 bg-white rounded-full"></div>
          ))}
        </div>

        {/* Decorative elements - Top Right Rings */}
        <div className="absolute top-10 right-0 translate-x-1/2 w-64 h-64 border border-[#e8d6a7] rounded-full"></div>
        <div className="absolute top-14 right-0 translate-x-1/2 w-56 h-56 border border-[#e8d6a7] rounded-full"></div>
        <div className="absolute top-18 right-0 translate-x-1/2 w-48 h-48 border border-[#e8d6a7] rounded-full"></div>

        {/* Content */}
        <div className="relative z-10 pt-20 pl-8 max-w-md">
          <h1 className="text-4xl font-bold text-[#144b25] mb-4 leading-tight tracking-tight">
            Your Placement<br/>Journey Starts Here.
          </h1>
          <p className="text-text-primary text-lg font-medium opacity-90">
            One platform. Everything you need<br/>to get placed.
          </p>
        </div>

        {/* Decorative Elements - Middle right dots */}
        <div className="absolute right-20 top-1/2 grid grid-cols-4 gap-2">
           {[...Array(16)].map((_, i) => (
            <div key={i} className="w-1 h-1 bg-[#a3c2a3] rounded-full"></div>
          ))}
        </div>

        {/* Decorative Elements - Bottom waves */}
        <div className="absolute bottom-0 left-0 right-0 h-64 opacity-50">
           <svg viewBox="0 0 1440 320" className="absolute bottom-0 w-full h-full" preserveAspectRatio="none">
             <path fill="#d8ebd1" fillOpacity="1" d="M0,256L48,229.3C96,203,192,149,288,144C384,139,480,181,576,197.3C672,213,768,203,864,186.7C960,171,1056,149,1152,149.3C1248,149,1344,171,1392,181.3L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
           </svg>
        </div>

        {/* College Branding */}
        <div className="relative z-10 flex items-center gap-4 pl-8 mb-4">
          <img src="/rmkec-logo.png" alt="RMKEC Logo" className="w-16 h-16 object-contain shrink-0" />
          <div className="flex flex-col">
            <span className="text-xs text-text-secondary uppercase tracking-wide font-medium">Built for</span>
            <span className="text-lg font-bold text-text-primary leading-tight">RMK Engineering College</span>
            <span className="text-xs text-text-secondary mt-1">Empowering students to achieve their dreams.</span>
          </div>
        </div>
      </div>

      {/* Right Pane - Login Form */}
      <div className="w-full lg:w-1/2 flex flex-col items-center justify-center bg-white relative px-8 py-12">
        <div className="w-full max-w-sm flex flex-col items-center text-center z-10">
          
          {/* Logo */}
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 bg-accent rounded-xl flex items-center justify-center">
              <div className="w-3.5 h-3.5 bg-yellow-400 rounded-sm"></div>
            </div>
            <span className="text-2xl font-bold text-accent tracking-tight">PlacePro</span>
          </div>

          <h2 className="text-2xl font-bold text-text-primary mb-2">Welcome back!</h2>
          <p className="text-text-secondary text-sm mb-10">
            Sign in to continue your placement preparation
          </p>

          <GoogleSignInButton
            signInWithGoogle={handleSignIn}
            loading={loading}
          />

          <div className="flex items-center gap-2 mt-6 text-xs text-text-secondary">
            <Lock className="w-3.5 h-3.5" />
            <span>Only @rmkec.ac.in email accounts can sign in</span>
          </div>

          {error && (
            <p className="mt-4 text-sm text-red-500 font-medium bg-red-50 px-4 py-2 rounded-lg border border-red-100">
              {error === 'domain_error' 
                ? 'Access denied. Please use an @rmkec.ac.in email address.' 
                : 'Sign-in failed. Please try again.'}
            </p>
          )}
        </div>

        {/* Faint building graphic at bottom */}
        <div className="absolute bottom-0 w-full flex justify-center pointer-events-none opacity-[0.15]">
           <svg viewBox="0 0 400 150" className="w-3/4 max-w-lg">
              {/* Abstract building shapes */}
              <rect x="180" y="50" width="40" height="100" fill="#16793A" />
              <rect x="120" y="80" width="60" height="70" fill="#16793A" />
              <rect x="220" y="70" width="70" height="80" fill="#16793A" />
              <path d="M160 50 L200 20 L240 50 Z" fill="#16793A" />
              <rect x="80" y="100" width="40" height="50" fill="#16793A" />
              <rect x="290" y="90" width="50" height="60" fill="#16793A" />
              {/* Windows */}
              <rect x="190" y="60" width="6" height="8" fill="white" />
              <rect x="205" y="60" width="6" height="8" fill="white" />
              <rect x="190" y="80" width="6" height="8" fill="white" />
              <rect x="205" y="80" width="6" height="8" fill="white" />
           </svg>
        </div>
      </div>
    </div>
  );
}
