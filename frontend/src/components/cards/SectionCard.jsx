import React from 'react';
import { ArrowRight } from 'lucide-react';

export default function SectionCard({
  variant = 'standard',
  title,
  description,
  ctaLabel = 'Explore',
  ctaIcon: CtaIcon = ArrowRight,
  meta,
  icon: Icon,
  tags,
  onClick,
  onCtaClick,
  className = '',
}) {
  const handleCardClick = (e) => {
    if (onClick) {
      onClick(e);
    }
  };

  const handleCtaClick = (e) => {
    e.stopPropagation();
    if (onCtaClick) {
      onCtaClick(e);
    } else if (onClick) {
      onClick(e);
    }
  };

  const renderIcon = () => {
    if (!Icon) return null;
    if (React.isValidElement(Icon)) return Icon;
    return <Icon className="w-6 h-6 text-accent" />;
  };

  const renderCtaIcon = () => {
    if (!CtaIcon) return null;
    if (React.isValidElement(CtaIcon)) return CtaIcon;
    return <CtaIcon className="w-4 h-4 text-white" />;
  };

  return (
    <div
      onClick={handleCardClick}
      className={`
        bg-bg-primary rounded-card border border-border p-4 flex flex-col justify-between
        hover:shadow-md hover:border-accent/40 transition-all cursor-pointer group
        ${className}
      `}
    >
      <div>
        {Icon && (
          <div className="w-12 h-12 rounded-lg bg-bg-secondary flex items-center justify-center mb-3 flex-shrink-0">
            {renderIcon()}
          </div>
        )}

        <h2 className="text-xl font-semibold text-text-primary tracking-tight">{title}</h2>
        {description && (
          <p className="text-sm text-text-secondary mt-1">{description}</p>
        )}

        {variant === 'featured' && tags && tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-3 mb-4">
            {tags.map((tag, idx) => (
              <span
                key={idx}
                className="bg-bg-secondary text-text-secondary text-sm font-medium rounded-pill px-2 py-1"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>

      <div className={`flex items-center justify-between mt-4 ${variant === 'featured' && (!tags || tags.length === 0) ? 'mt-6' : ''}`}>
        <button
          type="button"
          onClick={handleCtaClick}
          className="bg-text-primary text-white rounded-pill px-3 py-1.5 text-sm font-medium hover:bg-text-primary/90 focus:outline-none focus:ring-2 focus:ring-accent transition-colors inline-flex items-center gap-1"
        >
          <span>{ctaLabel}</span>
          {renderCtaIcon()}
        </button>

        {meta && (
          <span className="text-sm text-text-secondary font-medium">{meta}</span>
        )}
      </div>
    </div>
  );
}
