import type { Notification } from '../types';

export const notifications: Notification[] = [
  { id: '1', text: 'Summer Vibes campaign reached 80% of budget', time: '2m ago', read: false, type: 'warning' },
  { id: '2', text: 'Lakshay Chaudhary accepted your collaboration invite', time: '14m ago', read: false, type: 'success' },
  { id: '3', text: 'Payment of ₹42,000 completed for Air Max Launch', time: '1h ago', read: false, type: 'success' },
  { id: '4', text: 'Engagement rate increased by 0.8% this week', time: '2h ago', read: false, type: 'info' },
  { id: '5', text: 'World Cup Activation campaign marked as completed', time: '3h ago', read: false, type: 'success' },
  { id: '6', text: 'New creator application from Kabir Das', time: '5h ago', read: true, type: 'info' },
  { id: '7', text: 'Monthly analytics report is ready to download', time: '8h ago', read: true, type: 'info' },
  { id: '8', text: 'Budget alert: Educational Collab Series at 61% spend', time: '10h ago', read: true, type: 'warning' },
  { id: '9', text: 'Neha Kapoor uploaded 3 new content pieces', time: '12h ago', read: true, type: 'info' },
  { id: '10', text: 'Back to School campaign approved by compliance', time: '1d ago', read: true, type: 'success' },
  { id: '11', text: 'Yoga & Wellness campaign paused by admin', time: '1d ago', read: true, type: 'warning' },
  { id: '12', text: 'Q2 ROI report generated — 3.2x average return', time: '2d ago', read: true, type: 'success' },
];
