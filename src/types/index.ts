export type CampaignStatus = 'draft' | 'active' | 'completed' | 'paused';

export interface Campaign {
  id: string;
  name: string;
  status: CampaignStatus;
  progress: number;
  budget: number;
  spent: number;
  creators: number;
  deadline: string;
  category: string;
}

export type CreatorBadge = 'top_performer' | 'trending' | 'new';

export interface Creator {
  id: string;
  name: string;
  initials: string;
  avatarColor: string;
  category: string;
  followers: number;
  engagementRate: number;
  conversions: number;
  rating: number;
  badge: CreatorBadge;
}

export interface Notification {
  id: string;
  text: string;
  time: string;
  read: boolean;
  type: 'info' | 'success' | 'warning' | 'danger';
}

export interface Activity {
  id: string;
  text: string;
  detail: string;
  time: string;
  type: 'upload' | 'approved' | 'budget' | 'report' | 'invitation' | 'payment' | 'launch' | 'milestone';
}

export interface Report {
  id: string;
  title: string;
  description: string;
  type: 'weekly' | 'monthly' | 'audience' | 'roi' | 'engagement' | 'budget';
  size: string;
  date: string;
}

export interface MonthlySpend {
  month: string;
  spend: number;
}
