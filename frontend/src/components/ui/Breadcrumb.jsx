import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

export default function Breadcrumb({ items }) {
  return (
    <nav className="flex items-center text-sm mb-6 flex-wrap">
      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        
        return (
          <React.Fragment key={item.label}>
            {isLast ? (
              <span className="font-semibold text-text-primary">{item.label}</span>
            ) : (
              <Link 
                to={item.to} 
                className="text-text-secondary hover:text-text-primary hover:underline transition-colors"
              >
                {item.label}
              </Link>
            )}
            
            {!isLast && (
              <ChevronRight className="w-4 h-4 text-text-secondary mx-2 shrink-0" />
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
}
