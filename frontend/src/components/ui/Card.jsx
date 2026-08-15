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
  className = '' 
}) {
  const content = (
    <div className={`flex flex-col bg-bg-primary rounded-card p-5 border border-border shadow-card hover:shadow-card-hover transition-shadow h-full ${className}`}>
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
    return <Link to={to} className="block h-full group">{content}</Link>;
  }
  
  if (onClick) {
    return <button onClick={onClick} className="block w-full text-left h-full group">{content}</button>;
  }

  return content;
}
