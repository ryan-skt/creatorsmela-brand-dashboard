import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Search } from 'lucide-react';
import { InitialsAvatar } from '../../components/common/InitialsAvatar';
import { creators } from '../../data/creators';

const threads = creators.slice(0, 6).map((c, i) => ({
  id: c.id,
  creator: c,
  lastMessage: [
    'Sounds great! I\'ll start on the content this week.',
    'When is the campaign going live?',
    'I have 3 new reels ready for review.',
    'Can we discuss the brief in more detail?',
    'Payment received, thank you!',
    'Looking forward to the collaboration.',
  ][i],
  time: ['2m', '14m', '1h', '3h', '1d', '2d'][i],
  unread: [2, 1, 0, 0, 0, 0][i],
}));

export function MessagesPage() {
  const [selected, setSelected] = useState(threads[0]);
  const [message, setMessage] = useState('');

  const conversationMessages = [
    { from: 'them', text: selected.lastMessage, time: selected.time },
    { from: 'me', text: 'Thanks for the update! Please send them over when ready.', time: '1h ago' },
    { from: 'them', text: 'Will do. Also, should I use the new brand colors for the thumbnails?', time: '45m ago' },
    { from: 'me', text: 'Yes, please stick to the style guide we shared last week.', time: '30m ago' },
  ];

  return (
    <div className="max-w-[1400px]">
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6"
      >
        <h1 className="text-2xl font-bold text-foreground tracking-tight">Messages</h1>
        <p className="text-sm text-muted-foreground mt-1">Communicate with your creators</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-card border border-card-border rounded-2xl shadow-sm overflow-hidden"
        style={{ height: '600px' }}
      >
        <div className="flex h-full">
          {/* Thread list */}
          <div className="w-72 border-r border-border flex flex-col flex-shrink-0">
            <div className="p-3 border-b border-border">
              <div className="relative">
                <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="search"
                  placeholder="Search messages..."
                  data-testid="input-search-messages"
                  className="w-full pl-8 pr-3 py-2 text-sm bg-background border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-ring text-foreground placeholder:text-muted-foreground"
                />
              </div>
            </div>
            <div className="flex-1 overflow-y-auto divide-y divide-border">
              {threads.map(thread => (
                <button
                  key={thread.id}
                  onClick={() => setSelected(thread)}
                  data-testid={`thread-${thread.id}`}
                  className={`w-full flex items-start gap-3 px-4 py-3 text-left hover:bg-accent/50 transition-colors ${
                    selected.id === thread.id ? 'bg-accent/70' : ''
                  }`}
                >
                  <InitialsAvatar initials={thread.creator.initials} color={thread.creator.avatarColor} size="sm" />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-0.5">
                      <p className="text-xs font-semibold text-foreground truncate">{thread.creator.name}</p>
                      <span className="text-xs text-muted-foreground flex-shrink-0 ml-2">{thread.time}</span>
                    </div>
                    <p className="text-xs text-muted-foreground truncate">{thread.lastMessage}</p>
                  </div>
                  {thread.unread > 0 && (
                    <span className="w-4 h-4 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center flex-shrink-0 mt-0.5">
                      {thread.unread}
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Conversation */}
          <div className="flex-1 flex flex-col min-w-0">
            <div className="flex items-center gap-3 px-5 py-3.5 border-b border-border">
              <InitialsAvatar initials={selected.creator.initials} color={selected.creator.avatarColor} size="sm" />
              <div>
                <p className="text-sm font-semibold text-foreground">{selected.creator.name}</p>
                <p className="text-xs text-muted-foreground">{selected.creator.category}</p>
              </div>
            </div>
            <div className="flex-1 overflow-y-auto p-5 space-y-4" data-testid="conversation-view">
              {conversationMessages.map((msg, i) => (
                <div key={i} className={`flex ${msg.from === 'me' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[70%] px-4 py-2.5 rounded-2xl text-sm ${
                    msg.from === 'me'
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted text-foreground'
                  }`}>
                    <p>{msg.text}</p>
                    <p className={`text-xs mt-1 ${msg.from === 'me' ? 'text-primary-foreground/70' : 'text-muted-foreground'}`}>
                      {msg.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <div className="p-4 border-t border-border flex gap-3">
              <input
                value={message}
                onChange={e => setMessage(e.target.value)}
                placeholder="Type a message..."
                data-testid="input-message"
                className="flex-1 px-4 py-2.5 text-sm bg-background border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-ring text-foreground placeholder:text-muted-foreground"
                onKeyDown={e => { if (e.key === 'Enter') setMessage(''); }}
              />
              <button
                onClick={() => setMessage('')}
                data-testid="button-send-message"
                className="p-2.5 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
              >
                <Send size={16} />
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
