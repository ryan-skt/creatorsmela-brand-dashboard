import { useState } from 'react';
import { motion } from 'framer-motion';
import { useToast } from '../../hooks/use-toast';

export function SettingsPage() {
  const { toast } = useToast();
  const [form, setForm] = useState({
    brandName: 'Instamart',
    email: 'brand@instamart.com',
    website: 'https://instamart.com',
    industry: 'Retail & Grocery',
    budget: '2400000',
    timezone: 'Asia/Kolkata',
    notifications: true,
    weeklyReports: true,
    campaignAlerts: true,
  });

  const handleSave = () => {
    toast({ title: 'Settings saved successfully.' });
  };

  return (
    <div className="space-y-6 max-w-2xl">
      <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl font-bold text-foreground tracking-tight">Settings</h1>
        <p className="text-sm text-muted-foreground mt-1">Manage your brand account and preferences</p>
      </motion.div>

      {/* Brand Info */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.08 }}
        className="bg-card border border-card-border rounded-2xl shadow-sm px-6 py-5"
      >
        <h2 className="text-sm font-semibold text-foreground mb-5">Brand Information</h2>
        <div className="space-y-4">
          {[
            { label: 'Brand Name', key: 'brandName', type: 'text', testId: 'input-brand-name' },
            { label: 'Email Address', key: 'email', type: 'email', testId: 'input-email' },
            { label: 'Website', key: 'website', type: 'url', testId: 'input-website' },
            { label: 'Industry', key: 'industry', type: 'text', testId: 'input-industry' },
            { label: 'Annual Budget (₹)', key: 'budget', type: 'number', testId: 'input-budget' },
          ].map(field => (
            <div key={field.key}>
              <label className="block text-xs font-medium text-muted-foreground mb-1.5">{field.label}</label>
              <input
                type={field.type}
                value={form[field.key as keyof typeof form] as string}
                onChange={e => setForm(p => ({ ...p, [field.key]: e.target.value }))}
                data-testid={field.testId}
                className="w-full px-3.5 py-2.5 text-sm bg-background border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-ring text-foreground"
              />
            </div>
          ))}
          <div>
            <label className="block text-xs font-medium text-muted-foreground mb-1.5">Timezone</label>
            <select
              value={form.timezone}
              onChange={e => setForm(p => ({ ...p, timezone: e.target.value }))}
              data-testid="select-timezone"
              className="w-full px-3.5 py-2.5 text-sm bg-background border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-ring text-foreground"
            >
              <option value="Asia/Kolkata">Asia/Kolkata (IST)</option>
              <option value="America/New_York">America/New_York (EST)</option>
              <option value="America/Los_Angeles">America/Los_Angeles (PST)</option>
              <option value="Europe/London">Europe/London (GMT)</option>
              <option value="Asia/Tokyo">Asia/Tokyo (JST)</option>
            </select>
          </div>
        </div>
      </motion.div>

      {/* Notifications */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className="bg-card border border-card-border rounded-2xl shadow-sm px-6 py-5"
      >
        <h2 className="text-sm font-semibold text-foreground mb-5">Notification Preferences</h2>
        <div className="space-y-4">
          {[
            { label: 'Email Notifications', sub: 'Receive updates via email', key: 'notifications' },
            { label: 'Weekly Reports', sub: 'Get weekly performance summaries', key: 'weeklyReports' },
            { label: 'Campaign Alerts', sub: 'Alerts for budget and milestone events', key: 'campaignAlerts' },
          ].map(item => (
            <div key={item.key} className="flex items-center justify-between py-1">
              <div>
                <p className="text-sm font-medium text-foreground">{item.label}</p>
                <p className="text-xs text-muted-foreground">{item.sub}</p>
              </div>
              <button
                onClick={() => setForm(p => ({ ...p, [item.key]: !p[item.key as keyof typeof form] }))}
                data-testid={`toggle-${item.key}`}
                className={`relative w-10 h-5.5 rounded-full transition-colors ${
                  form[item.key as keyof typeof form] ? 'bg-primary' : 'bg-muted'
                }`}
                style={{ height: '22px' }}
              >
                <span
                  className={`absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform ${
                    form[item.key as keyof typeof form] ? 'translate-x-[18px]' : ''
                  }`}
                />
              </button>
            </div>
          ))}
        </div>
      </motion.div>

      <div className="flex justify-end gap-3">
        <button
          data-testid="button-cancel-settings"
          className="px-4 py-2.5 text-sm font-medium text-muted-foreground hover:text-foreground border border-border rounded-xl transition-colors"
        >
          Cancel
        </button>
        <button
          onClick={handleSave}
          data-testid="button-save-settings"
          className="px-4 py-2.5 text-sm font-medium bg-primary text-primary-foreground rounded-xl hover:bg-primary/90 transition-colors shadow-sm"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
}
