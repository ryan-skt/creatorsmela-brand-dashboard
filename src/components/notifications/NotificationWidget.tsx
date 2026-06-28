import { useState } from 'react';
import { motion } from 'framer-motion';
import { Bell } from 'lucide-react';
import { notifications as initialNotifications } from '../../data/notifications';
import type { Notification } from '../../types';

export function NotificationWidget() {
  const [items, setItems] = useState<Notification[]>(initialNotifications);

  const markAllRead = () => {
    setItems(prev => prev.map(n => ({ ...n, read: true })));
  };

  const unread = items.filter(n => !n.read).length;

  const typeColor: Record<Notification['type'], string> = {
    success: 'bg-green-100 dark:bg-green-900/30',
    warning: 'bg-amber-100 dark:bg-amber-900/30',
    danger: 'bg-red-100 dark:bg-red-900/30',
    info: 'bg-blue-100 dark:bg-blue-900/30',
  };

  const dotColor: Record<Notification['type'], string> = {
    success: 'bg-green-500',
    warning: 'bg-amber-500',
    danger: 'bg-red-500',
    info: 'bg-blue-500',
  };

  return (
    <div className="bg-card border border-card-border rounded-2xl shadow-sm overflow-hidden" data-testid="notification-widget">
      <div className="flex items-center justify-between px-5 py-4 border-b border-border">
        <div className="flex items-center gap-2">
          <Bell size={16} className="text-muted-foreground" />
          <h3 className="text-sm font-semibold text-foreground">Notifications</h3>
          {unread > 0 && (
            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-primary text-primary-foreground" data-testid="badge-unread-count">
              {unread}
            </span>
          )}
        </div>
        {unread > 0 && (
          <button
            onClick={markAllRead}
            data-testid="button-mark-all-read"
            className="text-xs text-primary font-medium hover:underline"
          >
            Mark all read
          </button>
        )}
      </div>
      <div className="divide-y divide-border max-h-80 overflow-y-auto">
        {items.map((n, i) => (
          <motion.div
            key={n.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: i * 0.03 }}
            className={`px-5 py-3 flex items-start gap-3 transition-colors hover:bg-accent/50 ${!n.read ? typeColor[n.type] : ''}`}
            data-testid={`notification-item-${n.id}`}
          >
            <div className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${!n.read ? dotColor[n.type] : 'bg-muted'}`} />
            <div className="flex-1 min-w-0">
              <p className={`text-xs leading-snug ${!n.read ? 'text-foreground font-medium' : 'text-muted-foreground'}`}>
                {n.text}
              </p>
              <p className="text-xs text-muted-foreground mt-0.5">{n.time}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
