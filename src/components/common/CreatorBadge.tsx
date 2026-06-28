import type { CreatorBadge as BadgeType } from '../../types';

interface CreatorBadgeProps {
  badge: BadgeType;
}

const config: Record<BadgeType, { label: string; className: string }> = {
  top_performer: { label: 'Top Performer', className: 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400' },
  trending: { label: 'Trending', className: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' },
  new: { label: 'New', className: 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-300' },
};

export function CreatorBadge({ badge }: CreatorBadgeProps) {
  const { label, className } = config[badge];
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${className}`}>
      {label}
    </span>
  );
}
