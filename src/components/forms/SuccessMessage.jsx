import React from 'react';
import { CheckCircle2 } from 'lucide-react';

export default function SuccessMessage({ title = 'Submission Received!', message, children }) {
  return (
    <div className="glass-panel p-8 rounded-2xl border border-gold-500/40 text-center space-y-3 shadow-gold-glow">
      <CheckCircle2 className="w-12 h-12 text-gold-400 mx-auto" />
      <h3 className="text-xl font-bold font-heading text-white">{title}</h3>
      {message && <p className="text-sm text-gray-300 max-w-md mx-auto leading-relaxed">{message}</p>}
      {children}
    </div>
  );
}
