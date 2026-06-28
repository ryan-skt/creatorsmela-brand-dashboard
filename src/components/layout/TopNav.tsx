import { useState } from 'react';
import { Bell, Search, Sun, Moon, Menu } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { notifications } from '../../data/notifications';
import cmLogo from '../cm-logo.png';
import instamartLogo from '../../instamart-logo.png';

interface TopNavProps {
  theme: 'light' | 'dark';
  onThemeToggle: () => void;
  onMenuOpen: () => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
}

export function TopNav({ theme, onThemeToggle, onMenuOpen, searchQuery, onSearchChange }: TopNavProps) {
  const [notifOpen, setNotifOpen] = useState(false);
  const unread = notifications.filter(n => !n.read).length;

  return (
    <header className="fixed top-0 left-0 right-0 lg:left-64 h-[72px] bg-card border-b border-border z-20 flex items-center px-4 lg:px-8 gap-4">
      {/* Mobile menu button */}
      <button
        onClick={onMenuOpen}
        className="lg:hidden p-2 rounded-xl hover:bg-accent transition-colors"
        data-testid="button-menu"
      >
        <Menu size={20} className="text-muted-foreground" />
      </button>

      {/* Brand logo */}
      <div className="hidden md:flex items-center gap-3 mr-4">
        <div className="w-12 h-12 rounded-2xl overflow-hidden bg-transparent flex items-center justify-center">
          <img src={cmLogo} alt="CreatorsMela logo" className="w-full h-full object-cover" />
        </div>
        <div className="hidden lg:block">
          <p className="text-sm font-semibold text-foreground">CreatorsMela</p>
        </div>
      </div>

      {/* Search */}
      <div className="flex-1 max-w-md relative">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
        <input
          type="search"
          placeholder="Search campaigns, creators..."
          value={searchQuery}
          onChange={e => onSearchChange(e.target.value)}
          data-testid="input-search"
          className="w-full pl-9 pr-4 py-2 text-sm bg-background border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-ring placeholder:text-muted-foreground text-foreground transition-all"
        />
      </div>

      <div className="flex items-center gap-2 ml-auto">
        {/* Theme toggle */}
        <button
          onClick={onThemeToggle}
          data-testid="button-theme-toggle"
          className="p-2.5 rounded-xl hover:bg-accent transition-colors text-muted-foreground hover:text-foreground"
        >
          {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
        </button>

        {/* Notifications */}
        <div className="relative">
          <button
            onClick={() => setNotifOpen(p => !p)}
            data-testid="button-notifications"
            className="relative p-2.5 rounded-xl hover:bg-accent transition-colors text-muted-foreground hover:text-foreground"
          >
            <Bell size={18} />
            {unread > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-destructive" data-testid="badge-notifications" />
            )}
          </button>

          <AnimatePresence>
            {notifOpen && (
              <motion.div
                initial={{ opacity: 0, y: -8, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -8, scale: 0.96 }}
                transition={{ duration: 0.15 }}
                className="absolute right-0 top-full mt-2 w-80 bg-card border border-border rounded-2xl shadow-lg overflow-hidden z-50"
              >
                <div className="px-4 py-3 border-b border-border flex items-center justify-between">
                  <span className="text-sm font-semibold text-foreground">Notifications</span>
                  {unread > 0 && (
                    <span className="text-xs font-medium text-primary">{unread} unread</span>
                  )}
                </div>
                <div className="max-h-80 overflow-y-auto divide-y divide-border">
                  {notifications.slice(0, 6).map(n => (
                    <div
                      key={n.id}
                      data-testid={`notification-${n.id}`}
                      className={`px-4 py-3 text-sm hover:bg-accent/50 transition-colors cursor-pointer ${!n.read ? 'bg-primary/5' : ''}`}
                    >
                      <div className="flex items-start gap-2.5">
                        {!n.read && (
                          <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 flex-shrink-0" />
                        )}
                        <div className={!n.read ? '' : 'pl-4'}>
                          <p className="text-foreground leading-snug">{n.text}</p>
                          <p className="text-muted-foreground text-xs mt-0.5">{n.time}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="px-4 py-2.5 border-t border-border">
                  <button className="text-xs text-primary font-medium hover:underline">
                    View all notifications
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Avatar */}
        <div className="flex items-center gap-2.5 pl-2" data-testid="topnav-profile">
          <div className="w-12 h-12 rounded-full overflow-hidden bg-transparent flex items-center justify-center">
            <img src={instamartLogo} alt="Instamart logo" className="w-full h-full object-contain" />
          </div>
          <div className="hidden sm:block">
            <p className="text-sm font-medium text-foreground leading-tight">Instamart</p>
            <p className="text-xs text-muted-foreground leading-tight">Brand Account</p>
          </div>
        </div>
      </div>
    </header>
  );
}
