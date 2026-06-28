import { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus } from 'lucide-react';
import { CampaignTable } from '../../components/tables/CampaignTable';
import { StatusBadge } from '../../components/common/StatusBadge';
import { campaigns } from '../../data/campaigns';
import type { CampaignStatus } from '../../types';
import { useToast } from '../../hooks/use-toast';

const statuses: Array<{ label: string; value: CampaignStatus | 'all' }> = [
  { label: 'All', value: 'all' },
  { label: 'Active', value: 'active' },
  { label: 'Draft', value: 'draft' },
  { label: 'Paused', value: 'paused' },
  { label: 'Completed', value: 'completed' },
];

interface CampaignsPageProps {
  searchQuery: string;
}

export function CampaignsPage({ searchQuery }: CampaignsPageProps) {
  const [statusFilter, setStatusFilter] = useState<CampaignStatus | 'all'>('all');
  const { toast } = useToast();

  const filtered = campaigns.filter(c => {
    const matchStatus = statusFilter === 'all' || c.status === statusFilter;
    const matchSearch = !searchQuery || c.name.toLowerCase().includes(searchQuery.toLowerCase()) || c.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchStatus && matchSearch;
  });

  return (
    <div className="space-y-6 max-w-[1400px]">
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-2xl font-bold text-foreground tracking-tight">Campaigns</h1>
          <p className="text-sm text-muted-foreground mt-1">{campaigns.length} campaigns across all statuses</p>
        </div>
        <button
          onClick={() => toast({ title: 'Opening campaign builder...' })}
          data-testid="button-create-campaign"
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90 transition-colors shadow-sm"
        >
          <Plus size={15} />
          New Campaign
        </button>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-card border border-card-border rounded-2xl shadow-sm"
      >
        <div className="px-6 py-4 border-b border-border">
          <div className="flex flex-wrap gap-2" data-testid="campaign-status-filters">
            {statuses.map(s => (
              <button
                key={s.value}
                onClick={() => setStatusFilter(s.value)}
                data-testid={`filter-${s.value}`}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-medium transition-colors ${
                  statusFilter === s.value
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted text-muted-foreground hover:text-foreground hover:bg-accent'
                }`}
              >
                {s.label}
                {s.value !== 'all' && (
                  <span className="ml-1.5 opacity-70">
                    {campaigns.filter(c => c.status === s.value).length}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
        <div className="px-6 py-4">
          {filtered.length > 0 ? (
            <CampaignTable campaigns={filtered} />
          ) : (
            <div className="py-16 text-center">
              <p className="text-sm text-muted-foreground">No campaigns match your filters.</p>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
