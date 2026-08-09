import React from 'react';

export default function Card({
  variant = 'topic',
  name,
  description,
  meta,
  icon: Icon,
  onClick,
  className = '',
}) {
  const handleKeyDown = (e) => {
    if ((e.key === 'Enter' || e.key === ' ') && onClick) {
      e.preventDefault();
      onClick(e);
    }
  };

  const renderIcon = () => {
    if (!Icon) return null;
    if (React.isValidElement(Icon)) {
      return Icon;
    }
    // Assume Icon is a Lucide icon component
    return <Icon className="w-5 h-5 text-accent" />;
  };

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={onClick}
      onKeyDown={handleKeyDown}
      className={`
        bg-bg-primary rounded-card border border-border p-3 flex flex-col justify-between
        hover:shadow-md hover:border-accent/40 transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-accent
        ${className}
      `}
    >
      <div>
        {Icon && (
          <div className="w-10 h-10 rounded-lg bg-bg-secondary flex items-center justify-center mb-2 flex-shrink-0">
            {renderIcon()}
          </div>
        )}

        {variant === 'company' ? (
          <div>
            <h3 className="text-lg font-semibold text-text-primary tracking-tight">{name}</h3>
            {description && (
              <p className="text-sm text-text-secondary mt-1 line-clamp-2">{description}</p>
            )}
          </div>
        ) : (
          <div>
            <h3 className="text-lg font-medium text-text-primary tracking-tight">{name}</h3>
            {description && (
              <p className="text-sm text-text-secondary mt-1 line-clamp-2">{description}</p>
            )}
          </div>
        )}
      </div>

      {meta && (
        <div className="mt-3 pt-2 border-t border-border/50 flex items-center justify-between text-sm text-text-secondary">
          <span>{meta}</span>
        </div>
      )}
    </div>
  );
}
