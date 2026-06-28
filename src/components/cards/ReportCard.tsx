import { motion } from 'framer-motion';
import { BarChart2, Calendar, TrendingUp, Users, IndianRupee, FileText, Download } from 'lucide-react';
import type { Report } from '../../types';

interface ReportCardProps {
  report: Report;
  index: number;
}

const iconMap: Record<Report['type'], typeof BarChart2> = {
  weekly: FileText,
  monthly: BarChart2,
  audience: Users,
  roi: TrendingUp,
  engagement: Calendar,
  budget: IndianRupee,
};

const iconBgMap: Record<Report['type'], string> = {
  weekly: 'bg-blue-100 dark:bg-blue-900/30',
  monthly: 'bg-indigo-100 dark:bg-indigo-900/30',
  audience: 'bg-purple-100 dark:bg-purple-900/30',
  roi: 'bg-green-100 dark:bg-green-900/30',
  engagement: 'bg-amber-100 dark:bg-amber-900/30',
  budget: 'bg-red-100 dark:bg-red-900/30',
};

const iconColorMap: Record<Report['type'], string> = {
  weekly: 'text-blue-600 dark:text-blue-400',
  monthly: 'text-indigo-600 dark:text-indigo-400',
  audience: 'text-purple-600 dark:text-purple-400',
  roi: 'text-green-600 dark:text-green-400',
  engagement: 'text-amber-600 dark:text-amber-400',
  budget: 'text-red-600 dark:text-red-400',
};

export function ReportCard({ report, index }: ReportCardProps) {
  const Icon = iconMap[report.type];

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: index * 0.07 }}
      whileHover={{ y: -2, boxShadow: '0 8px 24px rgba(0,0,0,0.1)' }}
      className="bg-card border border-card-border rounded-2xl p-5 shadow-sm"
      data-testid={`card-report-${report.id}`}
    >
      <div className={`w-10 h-10 rounded-xl ${iconBgMap[report.type]} flex items-center justify-center mb-4`}>
        <Icon size={20} className={iconColorMap[report.type]} />
      </div>
      <h3 className="font-semibold text-foreground text-sm mb-1.5">{report.title}</h3>
      <p className="text-xs text-muted-foreground leading-relaxed mb-4">{report.description}</p>
      <div className="flex items-center justify-between pt-3 border-t border-border">
        <div>
          <p className="text-xs text-muted-foreground">{report.date}</p>
          <p className="text-xs text-muted-foreground">{report.size}</p>
        </div>
        <button
          data-testid={`button-download-report-${report.id}`}
          className="flex items-center gap-1.5 text-xs font-medium text-primary border border-primary/30 rounded-lg px-3 py-1.5 hover:bg-primary hover:text-primary-foreground transition-colors"
        >
          <Download size={12} />
          Download
        </button>
      </div>
    </motion.div>
  );
}
