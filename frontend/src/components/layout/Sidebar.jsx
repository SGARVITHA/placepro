import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  Home, GraduationCap, CheckSquare, User, 
  Bookmark, FileText, Activity, Trophy, 
  PlusSquare, Share2
} from 'lucide-react';

const mainLinks = [
  { label: 'Dashboard', to: '/dashboard', icon: Home },
  { label: 'Practice', to: '/practice/aptitude', icon: GraduationCap },
  { label: 'Tests', to: '/tests', icon: CheckSquare },
];

const secondaryLinks = [
  { label: 'Bookmarks', to: '/bookmarks', icon: Bookmark },
  { label: 'Notes', to: '/notes', icon: FileText },
  { label: 'My Activity', to: '/recent-practice', icon: Activity },
  { label: 'Leaderboard', to: '/leaderboard', icon: Trophy },
];

const contributeLinks = [
  { label: 'Submit Question', to: '/contribute/question', icon: PlusSquare },
  { label: 'Share Experience', to: '/contribute/experience', icon: Share2 },
  { label: 'Profile', to: '/profile', icon: User },
];

function NavItem({ item }) {
  const Icon = item.icon;
  return (
    <NavLink
      to={item.to}
      className={({ isActive }) =>
        `flex items-center gap-3 px-4 py-2.5 mx-3 rounded-lg text-sm font-medium transition-colors ${
          isActive
            ? 'bg-[#Edf4F0] text-[#16793A] font-semibold'
            : 'text-text-secondary hover:bg-black/5 hover:text-text-primary'
        }`
      }
    >
      <Icon className="w-5 h-5" />
      {item.label}
    </NavLink>
  );
}

export default function Sidebar() {
  return (
    <aside className="w-[260px] bg-bg-app border-r border-border/40 h-screen sticky top-0 flex flex-col z-20 shrink-0">
      {/* Logo */}
      <div className="h-20 flex items-center px-6 pt-4">
        <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center mr-3 shrink-0 shadow-sm">
          <div className="w-3 h-3 bg-yellow-400 rounded-sm"></div>
        </div>
        <span className="text-xl font-bold text-[#16793A] tracking-tight">PlacePro</span>
      </div>

      <div className="flex-1 overflow-y-auto overflow-x-hidden px-3 pb-6 flex flex-col gap-6 no-scrollbar">
        {/* Main Links */}
        <nav className="flex flex-col gap-1.5 mt-2">
          {mainLinks.map((item) => (
            <NavItem key={item.to} item={item} />
          ))}
          {secondaryLinks.map((item) => (
            <NavItem key={item.to} item={item} />
          ))}
        </nav>

        {/* Contribute Section */}
        <div className="mt-4 mb-2">
          <h4 className="px-4 text-[11px] font-bold text-text-secondary uppercase tracking-wider mb-2">
            CONTRIBUTE
          </h4>
          <nav className="flex flex-col gap-1.5">
            {contributeLinks.map((item) => (
              <NavItem key={item.to} item={item} />
            ))}
          </nav>
        </div>
      </div>

      {/* College Footer */}
      <div className="p-6 relative overflow-hidden bg-bg-app mt-auto">
        <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at bottom right, var(--tw-colors-accent) 0%, transparent 60%)' }}></div>
        <div className="flex items-center gap-3 relative z-10">
          <div className="w-10 h-10 flex items-center justify-center flex-shrink-0">
             <img src="/rmkec-logo.png" alt="RMKEC Logo" className="w-full h-full object-contain" />
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] text-text-secondary uppercase tracking-wide font-semibold">Built for</span>
            <span className="text-sm font-bold text-text-primary leading-tight">RMK Engineering<br/>College</span>
          </div>
        </div>
      </div>
    </aside>
  );
}
