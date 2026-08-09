import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, User, LogOut } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';

export default function TopNav({ onToggleMobileMenu }) {
  const { user, signOut } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSignOut = async () => {
    setDropdownOpen(false);
    try {
      await signOut();
    } catch (error) {
      console.error('Failed to sign out:', error);
    }
  };

  const userInitial = user?.email ? user.email.charAt(0).toUpperCase() : 'U';
  const userName = user?.user_metadata?.full_name || user?.email || 'User';

  return (
    <header className="sticky top-0 z-30 bg-bg-primary border-b border-border h-16 px-2 md:px-3 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={onToggleMobileMenu}
          aria-label="Toggle navigation menu"
          className="md:hidden p-1 text-text-secondary hover:text-text-primary focus:outline-none focus:ring-2 focus:ring-accent rounded-pill"
        >
          <Menu className="w-6 h-6" />
        </button>

        <Link to="/" className="flex items-center gap-1 focus:outline-none">
          <span className="text-xl font-bold text-accent tracking-tight">PlacePro</span>
        </Link>
      </div>

      <div className="relative" ref={dropdownRef}>
        <button
          type="button"
          onClick={() => setDropdownOpen(!dropdownOpen)}
          aria-label="User menu"
          className="flex items-center gap-2 p-1 rounded-pill hover:bg-bg-secondary focus:outline-none focus:ring-2 focus:ring-accent transition-colors"
        >
          {user?.user_metadata?.avatar_url ? (
            <img
              src={user.user_metadata.avatar_url}
              alt={userName}
              className="w-8 h-8 rounded-full object-cover border border-border"
            />
          ) : (
            <div className="w-8 h-8 rounded-full bg-accent/10 text-accent flex items-center justify-center font-semibold text-sm border border-border">
              {userInitial !== 'U' ? userInitial : <User className="w-4 h-4" />}
            </div>
          )}
        </button>

        {dropdownOpen && (
          <div className="absolute right-0 mt-1 w-48 bg-bg-primary rounded-card shadow-lg border border-border py-1 z-50 animate-in fade-in zoom-in-95 duration-100">
            <div className="px-2 py-1 border-b border-border">
              <p className="text-xs font-semibold text-text-primary truncate">{userName}</p>
              {user?.email && (
                <p className="text-xs text-text-secondary truncate">{user.email}</p>
              )}
            </div>
            <button
              type="button"
              onClick={handleSignOut}
              className="w-full text-left px-2 py-1 text-sm text-difficulty-hard hover:bg-bg-secondary flex items-center gap-1 transition-colors"
            >
              <LogOut className="w-4 h-4" />
              <span>Log out</span>
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
