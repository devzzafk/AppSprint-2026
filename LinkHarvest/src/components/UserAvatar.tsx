import React from 'react';

interface Props {
  avatar?: string;
  name: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  showOnlineStatus?: boolean;
}

export const UserAvatar: React.FC<Props> = ({
  avatar,
  name,
  size = 'md',
  className = '',
  showOnlineStatus = false,
}) => {
  // Extract initials
  const initials = name
    ? name
        .split(' ')
        .map((n) => n[0])
        .slice(0, 2)
        .join('')
        .toUpperCase()
    : 'U';

  const sizeClasses = {
    xs: 'w-6 h-6 text-[10px]',
    sm: 'w-8 h-8 text-xs',
    md: 'w-10 h-10 text-sm',
    lg: 'w-14 h-14 text-base',
    xl: 'w-20 h-20 text-xl',
  };

  const isUploadedImage = avatar && (avatar.startsWith('data:image') || avatar.startsWith('http'));

  return (
    <div className={`relative inline-block shrink-0 ${className}`}>
      {isUploadedImage ? (
        <img
          src={avatar}
          alt={name}
          className={`${sizeClasses[size]} rounded-full object-cover ring-2 ring-[#7DBE56]/40 shadow-xs`}
        />
      ) : (
        <div
          className={`${sizeClasses[size]} rounded-full bg-gradient-to-br from-[#4E9A28] to-[#2B5E16] text-white font-bold flex items-center justify-center ring-2 ring-[#7DBE56]/40 shadow-xs select-none`}
        >
          {initials}
        </div>
      )}

      {showOnlineStatus && (
        <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-[#52B72A] ring-2 ring-white" />
      )}
    </div>
  );
};
