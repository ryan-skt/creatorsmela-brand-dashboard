import { useState } from 'react';
import { motion } from 'framer-motion';
import { UserPlus } from 'lucide-react';
import { CreatorCard } from '../../components/cards/CreatorCard';
import { creators } from '../../data/creators';
import type { CreatorBadge } from '../../types';
import { useToast } from '../../hooks/use-toast';

const categories = ['All', 'Entertainment', 'Educational', 'Beauty', 'Fitness', 'Lifestyle', 'Sports', 'Food', 'Travel', 'Dance', 'Gaming'];

interface CreatorsPageProps {
  searchQuery: string;
}

export function CreatorsPage({ searchQuery }: CreatorsPageProps) {
  const [category, setCategory] = useState('All');
  const [badge, setBadge] = useState<CreatorBadge | 'all'>('all');
  const { toast } = useToast();

  const filtered = creators.filter(c => {
    const matchCat = category === 'All' || c.category === category;
    const matchBadge = badge === 'all' || c.badge === badge;
    const matchSearch = !searchQuery
      || c.name.toLowerCase().includes(searchQuery.toLowerCase())
      || c.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchBadge && matchSearch;
  });

  return (
    <div className="space-y-6 max-w-[1400px]">
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-2xl font-bold text-foreground tracking-tight">Creators</h1>
          <p className="text-sm text-muted-foreground mt-1">{creators.length} creators in your network</p>
        </div>
        <button
          onClick={() => toast({ title: 'Opening creator invite flow...' })}
          data-testid="button-invite-creator"
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90 transition-colors shadow-sm"
        >
          <UserPlus size={15} />
          Invite Creator
        </button>
      </motion.div>

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.08 }}
        className="bg-card border border-card-border rounded-2xl shadow-sm px-6 py-4"
      >
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <p className="text-xs font-medium text-muted-foreground mb-2 uppercase tracking-wide">Category</p>
            <div className="flex flex-wrap gap-2" data-testid="category-filters">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setCategory(cat)}
                  data-testid={`filter-category-${cat}`}
                  className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-colors ${
                    category === cat
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted text-muted-foreground hover:text-foreground hover:bg-accent'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
          <div>
            <p className="text-xs font-medium text-muted-foreground mb-2 uppercase tracking-wide">Badge</p>
            <div className="flex gap-2" data-testid="badge-filters">
              {[
                { label: 'All', value: 'all' as const },
                { label: 'Top Performer', value: 'top_performer' as CreatorBadge },
                { label: 'Trending', value: 'trending' as CreatorBadge },
                { label: 'New', value: 'new' as CreatorBadge },
              ].map(b => (
                <button
                  key={b.value}
                  onClick={() => setBadge(b.value)}
                  data-testid={`filter-badge-${b.value}`}
                  className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-colors whitespace-nowrap ${
                    badge === b.value
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted text-muted-foreground hover:text-foreground hover:bg-accent'
                  }`}
                >
                  {b.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Creator Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4" data-testid="creator-grid">
        {filtered.length > 0 ? (
          filtered.map((creator, i) => (
            <CreatorCard key={creator.id} creator={creator} index={i} />
          ))
        ) : (
          <div className="col-span-full py-16 text-center">
            <p className="text-sm text-muted-foreground">No creators match your filters.</p>
          </div>
        )}
      </div>
    </div>
  );
}
