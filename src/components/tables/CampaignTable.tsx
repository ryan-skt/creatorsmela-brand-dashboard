import { motion } from 'framer-motion';
import { Eye, Edit2 } from 'lucide-react';
import type { Campaign } from '../../types';
import { StatusBadge } from '../common/StatusBadge';
import { formatCurrency, formatDate } from '../../utils/formatters';

interface CampaignTableProps {
  campaigns: Campaign[];
}

function AnimatedProgress({ value }: { value: number }) {
  return (
    <div className="flex items-center gap-2 min-w-[100px]">
      <div className="flex-1 bg-border rounded-full h-1.5 overflow-hidden">
        <motion.div
          className="h-full bg-primary rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${value}%` }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        />
      </div>
      <span className="text-xs text-muted-foreground w-8 text-right">{value}%</span>
    </div>
  );
}

export function CampaignTable({ campaigns }: CampaignTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm" data-testid="campaign-table">
        <thead>
          <tr className="border-b border-border">
            <th className="text-left text-xs font-medium text-muted-foreground pb-3 pr-4 whitespace-nowrap">Campaign</th>
            <th className="text-left text-xs font-medium text-muted-foreground pb-3 pr-4 whitespace-nowrap">Status</th>
            <th className="text-left text-xs font-medium text-muted-foreground pb-3 pr-4 whitespace-nowrap min-w-[140px]">Progress</th>
            <th className="text-left text-xs font-medium text-muted-foreground pb-3 pr-4 whitespace-nowrap">Budget</th>
            <th className="text-left text-xs font-medium text-muted-foreground pb-3 pr-4 whitespace-nowrap">Creators</th>
            <th className="text-left text-xs font-medium text-muted-foreground pb-3 pr-4 whitespace-nowrap">Deadline</th>
            <th className="text-left text-xs font-medium text-muted-foreground pb-3 whitespace-nowrap">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {campaigns.map((campaign, i) => (
            <motion.tr
              key={campaign.id}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.25, delay: i * 0.04 }}
              className="hover:bg-accent/40 transition-colors"
              data-testid={`row-campaign-${campaign.id}`}
            >
              <td className="py-3 pr-4">
                <div>
                  <p className="font-medium text-foreground">{campaign.name}</p>
                  <p className="text-xs text-muted-foreground">{campaign.category}</p>
                </div>
              </td>
              <td className="py-3 pr-4">
                <StatusBadge status={campaign.status} />
              </td>
              <td className="py-3 pr-4">
                <AnimatedProgress value={campaign.progress} />
              </td>
              <td className="py-3 pr-4">
                <p className="font-medium text-foreground">{formatCurrency(campaign.budget)}</p>
                <p className="text-xs text-muted-foreground">{formatCurrency(campaign.spent)} spent</p>
              </td>
              <td className="py-3 pr-4">
                <span className="font-medium text-foreground">{campaign.creators}</span>
              </td>
              <td className="py-3 pr-4">
                <span className="text-muted-foreground whitespace-nowrap">{formatDate(campaign.deadline)}</span>
              </td>
              <td className="py-3">
                <div className="flex items-center gap-1">
                  <button
                    data-testid={`button-view-campaign-${campaign.id}`}
                    className="p-1.5 rounded-lg hover:bg-accent text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <Eye size={15} />
                  </button>
                  <button
                    data-testid={`button-edit-campaign-${campaign.id}`}
                    className="p-1.5 rounded-lg hover:bg-accent text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <Edit2 size={15} />
                  </button>
                </div>
              </td>
            </motion.tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
