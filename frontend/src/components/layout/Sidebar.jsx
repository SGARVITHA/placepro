import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Building2,
  Brain,
  Code2,
  BookOpen,
  Users,
  X
} from 'lucide-react';

const NAV_ITEMS = [
  { label: 'Dashboard', href: '/', icon: LayoutDashboard },
  { label: 'Company Specific', href: '/company', icon: Building2 },
  { label: 'Aptitude', href: '/prep/aptitude', icon: Brain },
  { label: 'Coding', href: '/prep/coding', icon: Code2 },
  { label: 'CS Subjects', href: '/prep/cs-subjects', icon: BookOpen },
  { label: 'Interview', href: '/prep/interview', icon: Users },
];

export default function Sidebar({ isOpen, onClose }) {
  const handleNavClick = () => {
    if (onClose) {
      onClose();
    }
  };

  return (
    <>
      {/* Mobile Drawer Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 md:hidden backdrop-blur-sm transition-opacity"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`
          fixed top-0 left-0 bottom-0 z-50 w-64 bg-bg-primary border-r border-border p-2 flex flex-col justify-between
          transition-transform duration-200 ease-in-out
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
          md:translate-x-0 md:static md:z-auto md:min-h-[calc(100vh-4rem)] md:w-64 md:flex-shrink-0
        `}
      >
        <div>
          {/* Mobile Header with Close Button */}
          <div className="flex items-center justify-between p-1 mb-2 md:hidden border-b border-border">
            <span className="font-bold text-accent text-lg">Menu</span>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close menu"
              className="p-1 text-text-secondary hover:text-text-primary rounded-pill focus:outline-none focus:ring-2 focus:ring-accent"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1">
            {NAV_ITEMS.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.href}
                  to={item.href}
                  end={item.href === '/'}
                  onClick={handleNavClick}
                  className={({ isActive }) => `
                    flex items-center gap-2 px-2 py-1.5 text-sm font-medium rounded-card transition-colors
                    ${
                      isActive
                        ? 'bg-accent/10 text-accent font-semibold'
                        : 'text-text-secondary hover:text-text-primary hover:bg-bg-secondary'
                    }
                  `}
                >
                  <Icon className="w-5 h-5 flex-shrink-0" />
                  <span>{item.label}</span>
                </NavLink>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Footer / Info (Optional aesthetic touch) */}
        <div className="p-2 border-t border-border mt-auto hidden md:block text-xs text-text-secondary">
          <p className="font-medium text-text-primary">PlacePro v1.0</p>
          <p>Placement Prep Suite</p>
        </div>
      </aside>
    </>
  );
}
