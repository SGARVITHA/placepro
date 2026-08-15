import React from 'react';
import { Search } from 'lucide-react';

export default function SearchInput({ value, onChange, placeholder = 'Search...' }) {
  return (
    <div className="relative w-full max-w-2xl">
      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
        <Search className="h-5 w-5 text-text-secondary opacity-70" />
      </div>
      <input
        type="text"
        className="block w-full pl-11 pr-4 py-3 bg-bg-primary border border-border rounded-lg text-text-primary placeholder-text-secondary/70 focus:outline-none focus:ring-1 focus:ring-accent focus:border-accent text-sm transition-colors shadow-sm"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}
