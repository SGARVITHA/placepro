import React from 'react';

const OPTIONS = [
  { id: 'all', label: 'All' },
  { id: 'easy', label: 'Easy', colorClass: 'text-difficulty-easy' },
  { id: 'medium', label: 'Medium', colorClass: 'text-difficulty-medium' },
  { id: 'hard', label: 'Hard', colorClass: 'text-difficulty-hard' },
];

export default function FilterBar({ value = 'all', onChange, className = '' }) {
  return (
    <div className={`flex flex-wrap items-center gap-1.5 ${className}`}>
      {OPTIONS.map((opt) => {
        const isActive = value === opt.id;

        let activeStyle = 'bg-text-primary text-white border-text-primary';
        if (isActive && opt.id === 'easy') {
          activeStyle = 'bg-difficulty-easy/10 text-difficulty-easy border-difficulty-easy/40 font-semibold';
        } else if (isActive && opt.id === 'medium') {
          activeStyle = 'bg-difficulty-medium/10 text-difficulty-medium border-difficulty-medium/40 font-semibold';
        } else if (isActive && opt.id === 'hard') {
          activeStyle = 'bg-difficulty-hard/10 text-difficulty-hard border-difficulty-hard/40 font-semibold';
        }

        const inactiveStyle =
          'bg-bg-secondary text-text-secondary border-border hover:bg-bg-primary hover:text-text-primary';

        return (
          <button
            key={opt.id}
            type="button"
            aria-pressed={isActive}
            onClick={() => onChange && onChange(opt.id)}
            className={`
              rounded-pill px-3 py-1 text-sm font-medium border transition-colors focus:outline-none focus:ring-2 focus:ring-accent
              ${isActive ? activeStyle : inactiveStyle}
            `}
          >
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}
