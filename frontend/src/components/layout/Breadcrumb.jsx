import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

export default function Breadcrumb({ path = [] }) {
  if (!path || path.length === 0) {
    return null;
  }

  const renderSegments = (segments) => {
    return segments.map((item, index) => {
      const isLast = index === segments.length - 1;

      return (
        <span key={item.href || index} className="flex items-center gap-1">
          {index > 0 && (
            <ChevronRight className="w-4 h-4 text-text-secondary flex-shrink-0" />
          )}
          {isLast ? (
            <span className="text-text-primary font-medium truncate">
              {item.label}
            </span>
          ) : (
            <Link
              to={item.href}
              className="text-text-secondary hover:text-text-primary transition-colors truncate"
            >
              {item.label}
            </Link>
          )}
        </span>
      );
    });
  };

  const mobileSegments = path.length > 2 ? path.slice(-2) : path;

  return (
    <nav aria-label="Breadcrumb" className="mb-2">
      {/* Desktop view: full path */}
      <div className="hidden md:flex items-center gap-1 text-sm">
        {renderSegments(path)}
      </div>

      {/* Mobile view: truncated to last two segments */}
      <div className="flex md:hidden items-center gap-1 text-sm">
        {renderSegments(mobileSegments)}
      </div>
    </nav>
  );
}
