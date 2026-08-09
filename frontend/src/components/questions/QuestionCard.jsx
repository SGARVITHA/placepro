import React from 'react';

function getDifficultyBadge(difficulty) {
  const diff = (difficulty || '').toLowerCase();
  if (diff === 'easy') {
    return (
      <span className="bg-difficulty-easy/10 text-difficulty-easy border border-difficulty-easy/20 rounded-pill px-2 py-0.5 text-xs font-semibold uppercase tracking-wider flex-shrink-0">
        Easy
      </span>
    );
  }
  if (diff === 'medium') {
    return (
      <span className="bg-difficulty-medium/10 text-difficulty-medium border border-difficulty-medium/20 rounded-pill px-2 py-0.5 text-xs font-semibold uppercase tracking-wider flex-shrink-0">
        Medium
      </span>
    );
  }
  if (diff === 'hard') {
    return (
      <span className="bg-difficulty-hard/10 text-difficulty-hard border border-difficulty-hard/20 rounded-pill px-2 py-0.5 text-xs font-semibold uppercase tracking-wider flex-shrink-0">
        Hard
      </span>
    );
  }
  return (
    <span className="bg-bg-secondary text-text-secondary border border-border rounded-pill px-2 py-0.5 text-xs font-semibold uppercase tracking-wider flex-shrink-0">
      {difficulty || 'General'}
    </span>
  );
}

export default function QuestionCard({ question, onClick, className = '' }) {
  const handleKeyDown = (e) => {
    if ((e.key === 'Enter' || e.key === ' ') && onClick) {
      e.preventDefault();
      onClick(e);
    }
  };

  const { difficulty, question_text, year_asked, company_name } = question || {};

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={onClick}
      onKeyDown={handleKeyDown}
      className={`
        bg-bg-primary rounded-card border border-border p-3 flex items-center justify-between gap-3
        hover:shadow-sm hover:border-accent/40 transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-accent
        ${className}
      `}
    >
      <div className="flex items-center gap-3 min-w-0">
        {getDifficultyBadge(difficulty)}
        <p className="text-text-primary font-medium text-base line-clamp-2 leading-snug min-w-0">
          {question_text}
        </p>
      </div>

      {(year_asked || company_name) && (
        <div className="flex items-center gap-2 text-sm text-text-secondary flex-shrink-0">
          {company_name && <span>{company_name}</span>}
          {year_asked && <span>{year_asked}</span>}
        </div>
      )}
    </div>
  );
}
