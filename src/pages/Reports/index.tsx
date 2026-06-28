import { useState } from 'react';
import { motion } from 'framer-motion';
import { Download, Calendar } from 'lucide-react';
import { ReportCard } from '../../components/cards/ReportCard';
import { reports } from '../../data/reports';
import { useToast } from '../../hooks/use-toast';

export function ReportsPage() {
  const [dateRange, setDateRange] = useState({ from: '2025-06-01', to: '2025-06-30' });
  const { toast } = useToast();

  return (
    <div className="space-y-6 max-w-[1400px]">
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between flex-wrap gap-4"
      >
        <div>
          <h1 className="text-2xl font-bold text-foreground tracking-tight">Reports</h1>
          <p className="text-sm text-muted-foreground mt-1">Download and analyze your campaign data</p>
        </div>
        <button
          onClick={() => toast({ title: 'Exporting all reports...' })}
          data-testid="button-export-all"
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90 transition-colors shadow-sm"
        >
          <Download size={15} />
          Export All
        </button>
      </motion.div>

      {/* Date Range Selector */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.08 }}
        className="bg-card border border-card-border rounded-2xl shadow-sm px-6 py-5"
      >
        <div className="flex items-center gap-2 mb-4">
          <Calendar size={16} className="text-muted-foreground" />
          <h2 className="text-sm font-semibold text-foreground">Date Range</h2>
        </div>
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <label className="text-xs font-medium text-muted-foreground block mb-1.5">From</label>
            <input
              type="date"
              value={dateRange.from}
              onChange={e => setDateRange(p => ({ ...p, from: e.target.value }))}
              data-testid="input-date-from"
              className="w-full px-3 py-2 text-sm bg-background border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-ring text-foreground"
            />
          </div>
          <div className="flex-1">
            <label className="text-xs font-medium text-muted-foreground block mb-1.5">To</label>
            <input
              type="date"
              value={dateRange.to}
              onChange={e => setDateRange(p => ({ ...p, to: e.target.value }))}
              data-testid="input-date-to"
              className="w-full px-3 py-2 text-sm bg-background border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-ring text-foreground"
            />
          </div>
          <div className="flex items-end">
            <button
              onClick={() => toast({ title: `Generating report for ${dateRange.from} to ${dateRange.to}...` })}
              data-testid="button-generate-report"
              className="px-4 py-2 text-sm font-medium bg-primary text-primary-foreground rounded-xl hover:bg-primary/90 transition-colors"
            >
              Generate
            </button>
          </div>
        </div>
      </motion.div>

      {/* Report Cards */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
      >
        <h2 className="text-sm font-semibold text-foreground mb-4">Available Reports</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4" data-testid="reports-grid">
          {reports.map((report, i) => (
            <ReportCard key={report.id} report={report} index={i} />
          ))}
        </div>
      </motion.div>
    </div>
  );
}
