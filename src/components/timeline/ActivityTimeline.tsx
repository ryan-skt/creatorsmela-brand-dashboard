import { motion } from 'framer-motion';
import {
  Upload, CheckCircle, IndianRupee, FileText,
  UserPlus, CreditCard, Rocket, Award,
} from 'lucide-react';
import type { Activity } from '../../types';
import { activities } from '../../data/activities';

const iconMap: Record<Activity['type'], typeof Upload> = {
  upload: Upload,
  approved: CheckCircle,
  budget: IndianRupee,
  report: FileText,
  invitation: UserPlus,
  payment: CreditCard,
  launch: Rocket,
  milestone: Award,
};

const colorMap: Record<Activity['type'], string> = {
  upload: 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400',
  approved: 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400',
  budget: 'bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400',
  report: 'bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400',
  invitation: 'bg-indigo-100 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400',
  payment: 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400',
  launch: 'bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400',
  milestone: 'bg-yellow-100 text-yellow-600 dark:bg-yellow-900/30 dark:text-yellow-400',
};

interface ActivityTimelineProps {
  limit?: number;
}

export function ActivityTimeline({ limit = 10 }: ActivityTimelineProps) {
  const displayed = activities.slice(0, limit);

  return (
    <div className="space-y-1" data-testid="activity-timeline">
      {displayed.map((activity, i) => {
        const Icon = iconMap[activity.type];
        const color = colorMap[activity.type];

        return (
          <motion.div
            key={activity.id}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.25, delay: i * 0.04 }}
            className="flex gap-3 py-2.5 group"
            data-testid={`activity-${activity.id}`}
          >
            <div className="flex flex-col items-center">
              <div className={`w-8 h-8 rounded-full ${color} flex items-center justify-center flex-shrink-0`}>
                <Icon size={14} />
              </div>
              {i < displayed.length - 1 && (
                <div className="w-px flex-1 bg-border mt-1 min-h-[12px]" />
              )}
            </div>
            <div className="flex-1 min-w-0 pb-2">
              <p className="text-sm text-foreground font-medium leading-tight">{activity.text}</p>
              <p className="text-xs text-muted-foreground mt-0.5">{activity.detail}</p>
              <p className="text-xs text-muted-foreground mt-0.5">{activity.time}</p>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
