import React from 'react';

export default function UserAvatar({ user, className = '' }) {
  const getInitials = () => {
    if (!user) return '??';
    if (user.user_metadata?.full_name) {
      return user.user_metadata.full_name
        .split(' ')
        .map(n => n[0])
        .join('')
        .substring(0, 2)
        .toUpperCase();
    }
    return user.email?.[0].toUpperCase() || '??';
  };

  return (
    <div className={`relative flex items-center justify-center shrink-0 rounded-full bg-accent-light text-accent font-semibold text-sm ${className}`} style={{ width: 40, height: 40 }}>
      {user?.user_metadata?.avatar_url ? (
        <img
          src={user.user_metadata.avatar_url}
          alt="User avatar"
          className="w-full h-full rounded-full object-cover"
        />
      ) : (
        <span>{getInitials()}</span>
      )}
    </div>
  );
}
