import React from 'react';
import Sidebar from './Sidebar';
import TopBar from './TopBar';

export default function AuthenticatedLayout({ children }) {
  return (
    <div className="min-h-screen bg-bg-app flex overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        <TopBar />
        <main className="flex-1 overflow-y-auto p-4 md:p-8 no-scrollbar pb-24">
          {children}
        </main>
      </div>
    </div>
  );
}
