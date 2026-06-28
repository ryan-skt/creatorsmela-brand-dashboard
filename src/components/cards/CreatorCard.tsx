import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import type { Creator } from '../../types';
import { InitialsAvatar } from '../common/InitialsAvatar';
import { CreatorBadge } from '../common/CreatorBadge';
import { formatFollowers, formatPercent } from '../../utils/formatters';

interface CreatorCardProps {
  creator: Creator;
  index: number;
}

export function CreatorCard({ creator, index }: CreatorCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: index * 0.05 }}
      whileHover={{ y: -2, boxShadow: '0 8px 24px rgba(0,0,0,0.1)' }}
      className="bg-card border border-card-border rounded-2xl p-5 shadow-sm cursor-default"
      data-testid={`card-creator-${creator.id}`}
    >
      <div className="flex items-start justify-between mb-4">
        <InitialsAvatar initials={creator.initials} color={creator.avatarColor} size="lg" />
        <CreatorBadge badge={creator.badge} />
      </div>
      <h3 className="font-semibold text-foreground text-sm mb-0.5">{creator.name}</h3>
      <p className="text-xs text-muted-foreground mb-4">{creator.category}</p>

      <div className="grid grid-cols-3 gap-2 mb-4">
        <div>
          <p className="text-xs text-muted-foreground mb-0.5">Followers</p>
          <p className="text-sm font-semibold text-foreground">{formatFollowers(creator.followers)}</p>
        </div>
        <div>
          <p className="text-xs text-muted-foreground mb-0.5">Eng. Rate</p>
          <p className="text-sm font-semibold text-foreground">{formatPercent(creator.engagementRate)}</p>
        </div>
        <div>
          <p className="text-xs text-muted-foreground mb-0.5">Conversions</p>
          <p className="text-sm font-semibold text-foreground">{creator.conversions.toLocaleString()}</p>
        </div>
      </div>

      <div className="flex items-center justify-between pt-3 border-t border-border">
        <div className="flex items-center gap-1">
          {[1,2,3,4,5].map(i => (
            <Star
              key={i}
              size={12}
              className={i <= Math.round(creator.rating) ? 'text-amber-400 fill-amber-400' : 'text-gray-300'}
            />
          ))}
          <span className="text-xs text-muted-foreground ml-1">{creator.rating.toFixed(1)}</span>
        </div>
        <button
          data-testid={`button-view-creator-${creator.id}`}
          className="text-xs text-primary font-medium hover:underline"
        >
          View Profile
        </button>
      </div>
    </motion.div>
  );
}
