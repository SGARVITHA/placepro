import React from 'react';

export default function FilterPill({ label, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-1.5 rounded-pill text-sm font-medium transition-colors border ${
        active 
          ? 'bg-accent text-white border-accent' 
          : 'bg-bg-primary text-text-secondary border-border hover:border-text-secondary/30'
      }`}
    >
      {label}
    </button>
  );
}
