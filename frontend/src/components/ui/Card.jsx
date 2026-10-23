import React from 'react';
import { ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Card({ 
  icon: Icon, 
  iconColor = 'text-accent', 
  iconBg = 'bg-accent-light', 
  title, 
  subtitle, 
  to, 
  actionText,
  onClick,
  className = '',
  horizontal = false,
}) {
  const content = horizontal ? (
    <div className={`flex flex-col sm:flex-row sm:items-center justify-between bg-bg-primary rounded-card p-5 sm:p-6 border border-border shadow-card hover:shadow-card-hover transition-all w-full gap-4 ${className}`}>
      <div className="flex items-center gap-4">
        {Icon && (
          <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${iconBg} ${iconColor} group-hover:scale-105 transition-transform`}>
            <Icon className="w-6 h-6" />
          </div>
        )}
        <div>
          <h3 className="text-lg font-bold text-text-primary mb-1 group-hover:text-accent transition-colors">{title}</h3>
          <p className="text-sm text-text-secondary leading-relaxed max-w-2xl">{subtitle}</p>
        </div>
      </div>
      {actionText && (
        <div className="flex items-center text-sm font-semibold text-accent shrink-0 pt-2 sm:pt-0">
          <span>{actionText}</span>
          <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
        </div>
      )}
    </div>
  ) : (
    <div className={`flex flex-col bg-bg-primary rounded-card p-5 border border-border shadow-card hover:shadow-card-hover transition-shadow h-full w-full ${className}`}>
      {Icon && (
        <div className={`w-10 h-10 rounded-lg flex items-center justify-center mb-4 ${iconBg} ${iconColor}`}>
          <Icon className="w-5 h-5" />
        </div>
      )}
      <h3 className="text-base font-semibold text-text-primary mb-2 line-clamp-1">{title}</h3>
      <p className="text-sm text-text-secondary line-clamp-2 mb-4 flex-grow leading-relaxed">
        {subtitle}
      </p>
      {actionText && (
        <div className="flex items-center text-sm font-medium text-accent mt-auto pt-2">
          {actionText}
          <ChevronRight className="w-4 h-4 ml-1" />
        </div>
      )}
    </div>
  );

  if (to) {
    return <Link to={to} className="block h-full w-full group">{content}</Link>;
  }
  
  if (onClick) {
    return <button onClick={onClick} className="block w-full text-left h-full group">{content}</button>;
  }

  return content;
}
