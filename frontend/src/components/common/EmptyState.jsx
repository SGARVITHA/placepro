import React from 'react';
import { SearchX } from 'lucide-react';

export default function EmptyState({
  message = 'No items found',
  actionLabel,
  onAction,
  icon: Icon = SearchX,
  className = '',
}) {
  const renderIcon = () => {
    if (!Icon) return null;
    if (React.isValidElement(Icon)) return Icon;
    return <Icon className="w-8 h-8 text-text-secondary" />;
  };

  return (
    <div className={`flex flex-col items-center justify-center p-6 text-center bg-bg-primary rounded-card border border-border ${className}`}>
      <div className="w-14 h-14 rounded-full bg-bg-secondary flex items-center justify-center mb-3">
        {renderIcon()}
      </div>
      <p className="text-text-secondary text-base font-medium max-w-sm">{message}</p>
      {actionLabel && onAction && (
        <button
          type="button"
          onClick={onAction}
          className="mt-3 bg-text-primary text-white rounded-pill px-3 py-1.5 text-sm font-medium hover:bg-text-primary/90 focus:outline-none focus:ring-2 focus:ring-accent transition-colors"
        >
          {actionLabel}
        </button>
      )}
    </div>
  );
}
