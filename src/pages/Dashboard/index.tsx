import { motion } from 'framer-motion';
import {
  Megaphone, IndianRupee, Users, TrendingUp,
  Plus, UserPlus, Download, BarChart2,
} from 'lucide-react';
import { KPICard } from '../../components/cards/KPICard';
import { CampaignTable } from '../../components/tables/CampaignTable';
import { DonutChart } from '../../components/charts/DonutChart';
import { SpendingChart } from '../../components/charts/SpendingChart';
import { CreatorCard } from '../../components/cards/CreatorCard';
import { ActivityTimeline } from '../../components/timeline/ActivityTimeline';
import { ReportCard } from '../../components/cards/ReportCard';
import { NotificationWidget } from '../../components/notifications/NotificationWidget';
import { campaigns } from '../../data/campaigns';
import { creators } from '../../data/creators';
import { reports } from '../../data/reports';
import { useToast } from '../../hooks/use-toast';

const kpis = [
  {
    title: 'Active Campaigns',
    value: '12',
    trend: '+3 this month',
    trendUp: true,
    icon: Megaphone,
    iconColor: 'text-indigo-600 dark:text-indigo-400',
    iconBg: 'bg-indigo-100 dark:bg-indigo-900/30',
  },
  {
    title: 'Total Budget',
    value: '₹24 lakh',
    trend: '+18% vs last month',
    trendUp: true,
    icon: IndianRupee,
    iconColor: 'text-green-600 dark:text-green-400',
    iconBg: 'bg-green-100 dark:bg-green-900/30',
  },
  {
    title: 'Active Creators',
    value: '89',
    trend: '+12 new this month',
    trendUp: true,
    icon: Users,
    iconColor: 'text-blue-600 dark:text-blue-400',
    iconBg: 'bg-blue-100 dark:bg-blue-900/30',
  },
  {
    title: 'Avg Engagement Rate',
    value: '4.8%',
    trend: '+0.6% vs last month',
    trendUp: true,
    icon: TrendingUp,
    iconColor: 'text-amber-600 dark:text-amber-400',
    iconBg: 'bg-amber-100 dark:bg-amber-900/30',
  },
];

const quickActions = [
  { label: 'Create Campaign', icon: Plus, action: 'create_campaign' },
  { label: 'Invite Creator', icon: UserPlus, action: 'invite_creator' },
  { label: 'Export Report', icon: Download, action: 'export_report' },
  { label: 'View Analytics', icon: BarChart2, action: 'view_analytics' },
];

export function DashboardPage() {
  const { toast } = useToast();

  const handleQuickAction = (action: string) => {
    const messages: Record<string, string> = {
      create_campaign: 'Opening campaign builder...',
      invite_creator: 'Opening creator invite flow...',
      export_report: 'Preparing export...',
      view_analytics: 'Loading analytics view...',
    };
    toast({ title: messages[action] ?? 'Action triggered' });
  };

  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
  });

  return (
    <div className="space-y-8 max-w-[1400px]">
      {/* Greeting */}
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="flex items-start justify-between"
      >
        <div>
          <h1 className="text-2xl font-bold text-foreground tracking-tight">
            Welcome back, Instamart!
          </h1>
          <p className="text-muted-foreground mt-1 text-sm">
            Monitor your campaigns and creator partnerships in one place.
          </p>
        </div>
        <div className="hidden sm:block text-right">
          <p className="text-xs text-muted-foreground">{today}</p>
        </div>
      </motion.div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4" data-testid="kpi-grid">
        {kpis.map((kpi, i) => (
          <KPICard key={i} {...kpi} index={i} />
        ))}
      </div>

      {/* Campaign Progress */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, delay: 0.15 }}
        className="bg-card border border-card-border rounded-2xl shadow-sm"
        data-testid="campaign-table-section"
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-border">
          <div>
            <h2 className="text-sm font-semibold text-foreground">Campaign Progress</h2>
            <p className="text-xs text-muted-foreground mt-0.5">{campaigns.length} campaigns total</p>
          </div>
          <button
            data-testid="button-view-all-campaigns"
            className="text-xs text-primary font-medium hover:underline"
          >
            View all
          </button>
        </div>
        <div className="px-6 py-4">
          <CampaignTable campaigns={campaigns} />
        </div>
      </motion.div>

      {/* Budget Overview */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, delay: 0.2 }}
        className="bg-card border border-card-border rounded-2xl shadow-sm"
        data-testid="budget-overview"
      >
        <div className="px-6 py-4 border-b border-border">
          <h2 className="text-sm font-semibold text-foreground">Budget Overview</h2>
          <p className="text-xs text-muted-foreground mt-0.5">Total: ₹2.4M across all campaigns</p>
        </div>
        <div className="p-6 flex flex-col md:flex-row items-center gap-8">
          <div className="flex-shrink-0">
            <DonutChart used={1600000} total={2400000} />
          </div>
          <div className="flex-1 w-full">
            <p className="text-xs font-medium text-muted-foreground mb-3 uppercase tracking-wide">Monthly Spending</p>
            <SpendingChart />
          </div>
        </div>
      </motion.div>

      {/* Creator Performance + Activity Timeline */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: 0.25 }}
          className="xl:col-span-2 bg-card border border-card-border rounded-2xl shadow-sm"
          data-testid="creator-performance-section"
        >
          <div className="flex items-center justify-between px-6 py-4 border-b border-border">
            <h2 className="text-sm font-semibold text-foreground">Creator Performance</h2>
            <button className="text-xs text-primary font-medium hover:underline" data-testid="button-view-all-creators">View all</button>
          </div>
          <div className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {creators.slice(0, 6).map((creator, i) => (
              <CreatorCard key={creator.id} creator={creator} index={i} />
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: 0.28 }}
          className="bg-card border border-card-border rounded-2xl shadow-sm"
          data-testid="activity-section"
        >
          <div className="px-5 py-4 border-b border-border">
            <h2 className="text-sm font-semibold text-foreground">Recent Activity</h2>
          </div>
          <div className="px-5 py-4">
            <ActivityTimeline limit={8} />
          </div>
        </motion.div>
      </div>

      {/* Reports + Notifications */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: 0.3 }}
          className="xl:col-span-2 bg-card border border-card-border rounded-2xl shadow-sm"
          data-testid="reports-section"
        >
          <div className="px-6 py-4 border-b border-border">
            <h2 className="text-sm font-semibold text-foreground">Reports</h2>
          </div>
          <div className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {reports.map((report, i) => (
              <ReportCard key={report.id} report={report} index={i} />
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: 0.32 }}
          data-testid="notifications-section"
        >
          <NotificationWidget />
        </motion.div>
      </div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, delay: 0.35 }}
        className="bg-card border border-card-border rounded-2xl shadow-sm px-6 py-5"
        data-testid="quick-actions"
      >
        <h2 className="text-sm font-semibold text-foreground mb-4">Quick Actions</h2>
        <div className="flex flex-wrap gap-3">
          {quickActions.map(action => {
            const Icon = action.icon;
            return (
              <button
                key={action.action}
                onClick={() => handleQuickAction(action.action)}
                data-testid={`button-quick-${action.action}`}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90 transition-colors shadow-sm"
              >
                <Icon size={15} />
                {action.label}
              </button>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
}
