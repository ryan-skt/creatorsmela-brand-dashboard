import type { Report } from '../types';

export const reports: Report[] = [
  {
    id: '1',
    title: 'Weekly Performance Report',
    description: 'Campaign metrics, creator activity, and engagement for the past 7 days.',
    type: 'weekly',
    size: '2.4 MB',
    date: 'Jun 22, 2025',
  },
  {
    id: '2',
    title: 'Monthly Analytics',
    description: 'Full platform analytics including reach, impressions, and conversions for May 2025.',
    type: 'monthly',
    size: '8.1 MB',
    date: 'Jun 1, 2025',
  },
  {
    id: '3',
    title: 'Audience Insights',
    description: 'Demographic breakdown, interest mapping, and audience overlap across campaigns.',
    type: 'audience',
    size: '5.7 MB',
    date: 'Jun 15, 2025',
  },
  {
    id: '4',
    title: 'Campaign ROI Analysis',
    description: 'Return on investment analysis with cost-per-engagement and conversion attribution.',
    type: 'roi',
    size: '3.2 MB',
    date: 'Jun 10, 2025',
  },
  {
    id: '5',
    title: 'Creator Engagement Report',
    description: 'Per-creator performance metrics: engagement rate, content quality, and audience fit.',
    type: 'engagement',
    size: '4.8 MB',
    date: 'Jun 18, 2025',
  },
  {
    id: '6',
    title: 'Budget Utilization Report',
    description: 'Spend tracking across campaigns with forecasts and variance analysis.',
    type: 'budget',
    size: '1.9 MB',
    date: 'Jun 20, 2025',
  },
];
