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
    if (path.includes('/interview/hr')) return 'Interview / HR';
    if (path.includes('/interview/technical')) return 'Interview / Technical';
    if (path.includes('/interview')) return 'Interview';
    if (path.includes('/cs-subjects')) {
      const stateSubject = location.state?.subjectName;
      const stateCompany = location.state?.companyName;
      if (stateCompany && stateSubject) return `${stateCompany} • ${stateSubject}`;
      if (stateSubject) return `CS Subjects • ${stateSubject}`;
      if (stateCompany) return `${stateCompany} • CS Subjects`;
      return 'CS Subjects';
    }
    if (path.startsWith('/company')) return 'Company Specific';
    if (path.startsWith('/practice/aptitude')) return 'Aptitude Practice';
    if (path.startsWith('/practice/coding')) return 'Coding Practice';
    if (path.startsWith('/practice/flashcards')) {
      const searchParams = new URLSearchParams(location.search);
      const subject = searchParams.get('subject') || location.state?.subjectName;
      return subject || 'Operating Systems';
    }
    if (path.startsWith('/tests')) return 'Tests';
    if (path.startsWith('/recent') || path.startsWith('/activity') || path.startsWith('/progress')) return 'Activity & Progress';
    
    // Capitalize first part of path as fallback
    const segments = path.split('/').filter(Boolean);
    if (segments.length > 0) {
      return segments[0].charAt(0).toUpperCase() + segments[0].slice(1);
    }
    return '';
  };

  return (
    <header className="h-14 sm:h-15 flex items-center justify-between px-6 sm:px-8 bg-white shrink-0 border-b border-[#eaedf1] shadow-2xs sticky top-0 z-20">
      <h1 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight">{getPageTitle()}</h1>
      <div className="flex items-center">
        <Link to="/profile">
          <UserAvatar user={user} className="cursor-pointer hover:ring-2 hover:ring-[#16793A] hover:ring-offset-2 transition-all shadow-sm" />
        </Link>
      </div>
    </header>
  );
}
