import React from 'react';
import { Inbox } from 'lucide-react';

export default function EmptyState({ title = 'No Items Found', message = 'No data available matching your query.' }) {
  return (
    <div className="glass-panel p-8 rounded-2xl border border-white/10 text-center max-w-md mx-auto space-y-3 my-8">
      <Inbox className="w-10 h-10 text-gold-400/60 mx-auto" />
      <h3 className="text-lg font-bold font-heading text-white">{title}</h3>
      <p className="text-xs text-gray-400 leading-relaxed">{message}</p>
    </div>
  );
}
