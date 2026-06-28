import { useState } from 'react';
import { Switch, Route, Router as WouterRouter } from 'wouter';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import { Layout } from './components/layout/Layout';
import { DashboardPage } from './pages/Dashboard';
import { CampaignsPage } from './pages/Campaigns';
import { CreatorsPage } from './pages/Creators';
import { ReportsPage } from './pages/Reports';
import { MessagesPage } from './pages/Messages';
import { SettingsPage } from './pages/Settings';

const queryClient = new QueryClient();

function AppRoutes() {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <Layout searchQuery={searchQuery} onSearchChange={setSearchQuery}>
      <Switch>
        <Route path="/" component={DashboardPage} />
        <Route path="/campaigns">
          <CampaignsPage searchQuery={searchQuery} />
        </Route>
        <Route path="/creators">
          <CreatorsPage searchQuery={searchQuery} />
        </Route>
        <Route path="/reports" component={ReportsPage} />
        <Route path="/messages" component={MessagesPage} />
        <Route path="/settings" component={SettingsPage} />
        <Route>
          <div className="flex items-center justify-center min-h-[60vh]">
            <div className="text-center">
              <h2 className="text-xl font-bold text-foreground mb-2">Page not found</h2>
              <p className="text-muted-foreground text-sm">The page you're looking for doesn't exist.</p>
            </div>
          </div>
        </Route>
      </Switch>
    </Layout>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}>
          <AppRoutes />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
