import React from 'react';

export default function LoadingState({
  count = 4,
  variant = 'card',
  className = '',
}) {
  const items = Array.from({ length: count });

  if (variant === 'row') {
    return (
      <div className={`space-y-2 w-full ${className}`}>
        {items.map((_, idx) => (
          <div
            key={idx}
            className="animate-pulse bg-bg-primary border border-border p-3 rounded-card flex items-center justify-between"
          >
            <div className="flex items-center gap-2 w-full">
              <div className="w-10 h-10 rounded-lg bg-bg-secondary flex-shrink-0" />
              <div className="space-y-1 w-full max-w-md">
                <div className="h-4 bg-bg-secondary rounded w-1/3" />
                <div className="h-3 bg-bg-secondary rounded w-2/3" />
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 w-full ${className}`}>
      {items.map((_, idx) => (
        <div
          key={idx}
          className="animate-pulse bg-bg-primary border border-border p-3 rounded-card h-40 flex flex-col justify-between"
        >
          <div>
            <div className="w-10 h-10 rounded-lg bg-bg-secondary mb-3" />
            <div className="h-5 bg-bg-secondary rounded w-3/4 mb-2" />
            <div className="h-3 bg-bg-secondary rounded w-1/2" />
          </div>
          <div className="h-3 bg-bg-secondary rounded w-1/4 pt-2" />
        </div>
      ))}
    </div>
  );
}
