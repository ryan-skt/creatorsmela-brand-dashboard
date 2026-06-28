import { useState } from 'react';
import { Sidebar } from './Sidebar';
import { TopNav } from './TopNav';
import { useTheme } from '../../hooks/useTheme';

interface LayoutProps {
  children: React.ReactNode;
  searchQuery?: string;
  onSearchChange?: (q: string) => void;
}

export function Layout({ children, searchQuery = '', onSearchChange }: LayoutProps) {
  const { theme, toggle } = useTheme();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <TopNav
        theme={theme}
        onThemeToggle={toggle}
        onMenuOpen={() => setSidebarOpen(true)}
        searchQuery={searchQuery}
        onSearchChange={onSearchChange ?? (() => {})}
      />
      <main className="lg:ml-64 pt-[72px] min-h-screen">
        <div className="p-6 lg:p-8">{children}</div>
      </main>
    </div>
  );
}
