import React from 'react';
import UserAvatar from '../ui/UserAvatar';
import { useLocation, Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

export default function TopBar() {
  const location = useLocation();
  const { user } = useAuth();
  
  const getPageTitle = () => {
    const path = location.pathname;
    if (path === '/dashboard' || path === '/') return 'Dashboard';
    if (path.startsWith('/company')) return 'Company Specific';
    if (path.startsWith('/practice/aptitude')) return 'Aptitude Practice';
    if (path.startsWith('/practice/coding')) return 'Coding Practice';
    if (path.startsWith('/practice/cs-subjects')) return 'CS Subjects';
    if (path.startsWith('/interview')) return 'Interview Prep';
    if (path.startsWith('/tests')) return 'Tests';
    if (path.startsWith('/recent')) return 'Activity';
    
    // Capitalize first part of path as fallback
    const segments = path.split('/').filter(Boolean);
    if (segments.length > 0) {
      return segments[0].charAt(0).toUpperCase() + segments[0].slice(1);
    }
    return '';
  };

  return (
    <header className="h-16 flex items-center justify-between px-8 bg-bg-app shrink-0 border-b border-border/50 lg:border-none sticky top-0 z-10 backdrop-blur-md bg-opacity-80">
      <h1 className="text-lg font-semibold text-text-primary">{getPageTitle()}</h1>
      <div className="flex items-center">
        <Link to="/profile">
          <UserAvatar user={user} className="cursor-pointer hover:ring-2 hover:ring-accent hover:ring-offset-2 transition-all shadow-sm" />
        </Link>
      </div>
    </header>
  );
}
