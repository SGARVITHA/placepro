import { useState } from 'react';
import TopNav from './TopNav';
import Sidebar from './Sidebar';

export default function Layout({ children }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-bg-secondary flex flex-col font-sans text-text-primary">
      <TopNav onToggleMobileMenu={toggleMobileMenu} />
      <div className="flex flex-1 relative">
        <Sidebar isOpen={isMobileMenuOpen} onClose={closeMobileMenu} />
        <main className="flex-1 p-2 md:p-3 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
