import React from 'react';
import Sidebar from './Sidebar';
import TopBar from './TopBar';

export default function AuthenticatedLayout({ children }) {
  return (
    <div className="min-h-screen bg-[#f8f9fa] flex overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        <TopBar />
        <main className="flex-1 overflow-y-auto px-4 sm:px-6 md:px-8 pt-4 pb-20 no-scrollbar">
          {children}
        </main>
      </div>
    </div>
  );
}
