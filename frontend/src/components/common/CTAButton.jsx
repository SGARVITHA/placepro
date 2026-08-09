import React from 'react';

export default function CTAButton({
  children,
  onClick,
  icon: Icon,
  variant = 'primary',
  className = '',
  disabled = false,
  type = 'button',
}) {
  const renderIcon = () => {
    if (!Icon) return null;
    if (React.isValidElement(Icon)) return Icon;
    return <Icon className="w-4 h-4" />;
  };

  const variantStyles =
    variant === 'secondary'
      ? 'bg-bg-secondary text-text-primary border border-border hover:bg-bg-primary'
      : 'bg-text-primary text-white hover:bg-text-primary/90';

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`
        rounded-pill px-3 py-2 text-sm font-medium
        focus:outline-none focus:ring-2 focus:ring-accent transition-colors
        inline-flex items-center justify-center gap-1
        disabled:opacity-50 disabled:cursor-not-allowed
        ${variantStyles}
        ${className}
      `}
    >
      <span>{children}</span>
      {renderIcon()}
    </button>
  );
}
