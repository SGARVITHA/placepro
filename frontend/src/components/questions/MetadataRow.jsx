import React from 'react';

export default function MetadataRow({
  difficulty,
  companyName,
  yearAsked,
  category,
  topicName,
}) {
  const renderDifficultyTag = () => {
    if (!difficulty) return null;
    const diff = difficulty.toLowerCase();

    let colorClasses = 'bg-bg-secondary text-text-secondary border-border';
    let label = difficulty;

    if (diff === 'easy') {
      colorClasses = 'bg-difficulty-easy/10 text-difficulty-easy border-difficulty-easy/20';
      label = 'Easy';
    } else if (diff === 'medium') {
      colorClasses = 'bg-difficulty-medium/10 text-difficulty-medium border-difficulty-medium/20';
      label = 'Medium';
    } else if (diff === 'hard') {
      colorClasses = 'bg-difficulty-hard/10 text-difficulty-hard border-difficulty-hard/20';
      label = 'Hard';
    }

    return (
      <span
        className={`rounded-pill border px-3 py-1 text-xs font-semibold uppercase tracking-wider ${colorClasses}`}
      >
        {label}
      </span>
    );
  };

  return (
    <div className="flex flex-wrap items-center gap-2 my-4">
      {renderDifficultyTag()}

      {companyName && (
        <span className="rounded-pill border border-border bg-bg-secondary px-3 py-1 text-xs font-medium text-text-secondary">
          {companyName}
        </span>
      )}

      {yearAsked && (
        <span className="rounded-pill border border-border bg-bg-secondary px-3 py-1 text-xs font-medium text-text-secondary">
          {yearAsked}
        </span>
      )}

      {category && (
        <span className="rounded-pill border border-border bg-bg-secondary px-3 py-1 text-xs font-medium text-text-secondary">
          {category}
        </span>
      )}

      {topicName && (
        <span className="rounded-pill border border-border bg-bg-secondary px-3 py-1 text-xs font-medium text-text-secondary">
          {topicName}
        </span>
      )}
    </div>
  );
}
