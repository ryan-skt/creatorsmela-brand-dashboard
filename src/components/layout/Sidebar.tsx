import { useState } from 'react';
import { Link, useLocation } from 'wouter';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard, Megaphone, Users, BarChart2,
  MessageSquare, Settings, LogOut, X,
} from 'lucide-react';
import cmLogo from '../cm-logo.png';
import instamartLogo from '../../instamart-logo.png';

const navItems = [
  { label: 'Dashboard', icon: LayoutDashboard, href: '/' },
  { label: 'Campaigns', icon: Megaphone, href: '/campaigns' },
  { label: 'Creators', icon: Users, href: '/creators' },
  { label: 'Reports', icon: BarChart2, href: '/reports' },
  { label: 'Messages', icon: MessageSquare, href: '/messages' },
  { label: 'Settings', icon: Settings, href: '/settings' },
];

interface SidebarProps {
  open: boolean;
  onClose: () => void;
}

function NavLink({ item, onClick }: { item: typeof navItems[0]; onClick?: () => void }) {
  const [location] = useLocation();
  const isActive = item.href === '/' ? location === '/' : location.startsWith(item.href);
  const Icon = item.icon;

  return (
    <Link href={item.href}>
      <motion.div
        onClick={onClick}
        whileHover={{ x: 2 }}
        data-testid={`nav-${item.label.toLowerCase()}`}
        className={`flex items-center gap-3 px-3 py-2.5 rounded-xl cursor-pointer transition-colors text-sm font-medium select-none ${
          isActive
            ? 'bg-primary text-primary-foreground shadow-sm'
            : 'text-muted-foreground hover:text-foreground hover:bg-accent'
        }`}
      >
        <Icon size={18} className="flex-shrink-0" />
        <span>{item.label}</span>
      </motion.div>
    </Link>
  );
}

function SidebarContent({ onClose }: { onClose?: () => void }) {
  return (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="flex items-center justify-between px-4 pt-6 pb-6">
          <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl flex items-center justify-center overflow-hidden bg-transparent">
            <img src={cmLogo} alt="CreatorsMela logo" className="w-full h-full object-cover" />
          </div>
          <span className="font-semibold text-base text-foreground tracking-tight">CreatorsMela</span>
        </div>
        {onClose && (
          <button onClick={onClose} className="p-1 rounded-lg hover:bg-accent lg:hidden" data-testid="button-close-sidebar">
            <X size={18} className="text-muted-foreground" />
          </button>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 space-y-1">
        {navItems.map(item => (
          <NavLink key={item.href} item={item} onClick={onClose} />
        ))}
      </nav>

      {/* Profile + Logout */}
      <div className="px-3 pb-6 space-y-1 border-t border-border pt-4 mt-4">
        <div className="flex items-center gap-3 px-3 py-2.5 rounded-xl" data-testid="sidebar-profile">
          <div className="w-12 h-12 rounded-full overflow-hidden bg-transparent flex items-center justify-center flex-shrink-0">
            <img src={instamartLogo} alt="Instamart logo" className="w-full h-full object-contain" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-foreground truncate">Instamart</p>
            <p className="text-xs text-muted-foreground truncate">brand@instamart.com</p>
          </div>
        </div>
        <button
          data-testid="button-logout"
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
        >
          <LogOut size={18} />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
}

export function Sidebar({ open, onClose }: SidebarProps) {
  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex flex-col w-64 bg-sidebar border-r border-sidebar-border fixed inset-y-0 left-0 z-30">
        <SidebarContent />
      </aside>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onClose}
              className="fixed inset-0 bg-black/40 z-40 lg:hidden"
            />
            <motion.aside
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 left-0 w-64 bg-sidebar border-r border-sidebar-border z-50 lg:hidden"
            >
              <SidebarContent onClose={onClose} />
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
