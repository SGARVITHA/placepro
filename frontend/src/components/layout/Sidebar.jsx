import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { 
  Home, GraduationCap, CheckSquare, User, 
  Bookmark, FileText, Activity, 
  PlusSquare, Share2
} from 'lucide-react';

const mainLinks = [
  { label: 'Dashboard', to: '/dashboard', icon: Home },
  { label: 'Practice', to: '/practice', icon: GraduationCap },
  { label: 'Tests', to: '/tests', icon: CheckSquare },
];

const secondaryLinks = [
  { label: 'Bookmarks', to: '/bookmarks', icon: Bookmark },
  { label: 'Notes', to: '/notes', icon: FileText },
  { label: 'My Activity', to: '/activity', icon: Activity },
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
      className={({ isActive }) => {
        const isCurrentActive = isActive || (item.to === '/activity' && (window.location.pathname.startsWith('/recent-practice') || window.location.pathname.startsWith('/progress')));
        return `flex items-center gap-3 px-4 py-2.5 mx-3 rounded-lg text-sm font-medium transition-colors ${
          isCurrentActive
            ? 'bg-[#Edf4F0] text-[#16793A] font-semibold'
            : 'text-text-secondary hover:bg-black/5 hover:text-text-primary'
        }`;
      }}
    >
      <Icon className="w-5 h-5" />
      {item.label}
    </NavLink>
  );
}

export default function Sidebar() {
  return (
    <aside className="w-[260px] bg-white border-r border-[#eaedf1] shadow-[1px_0_4px_rgba(0,0,0,0.02)] h-screen sticky top-0 flex flex-col z-20 shrink-0">
      {/* Logo */}
      <Link to="/dashboard" className="h-20 flex items-center px-6 pt-4 gap-3 group border-b border-[#eaedf1]/60">
        <img 
          src="/placepro-logo.png" 
          alt="PlacePro Logo" 
          className="w-9 h-9 object-contain shrink-0 rounded-lg group-hover:scale-105 transition-transform" 
        />
        <span className="text-xl font-bold text-[#16793A] tracking-tight group-hover:text-emerald-700 transition-colors">
          PlacePro
        </span>
      </Link>

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
      <div className="p-4 px-5 relative overflow-hidden bg-[#fafbfc] border-t border-[#eaedf1] mt-auto">
        <div className="flex items-center gap-3 relative z-10">
          <div className="w-9 h-9 rounded-lg bg-white border border-[#eaedf1] flex items-center justify-center p-1.5 shrink-0 shadow-2xs">
             <img src="/rmkec-logo.png" alt="RMKEC Logo" className="w-full h-full object-contain" />
          </div>
          <div className="flex flex-col leading-tight min-w-0">
            <span className="text-[9px] text-[#64748b] uppercase tracking-wider font-bold">BUILT FOR</span>
            <span className="text-[12px] font-bold text-[#1e293b] truncate">RMK Engineering College</span>
          </div>
        </div>
      </div>
    </aside>
  );
}
