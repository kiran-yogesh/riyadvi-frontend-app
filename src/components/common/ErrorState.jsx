import React from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';

export default function ErrorState({ title = 'Error Loading Data', message = 'Failed to connect to the backend server. Please try again.', onRetry }) {
  return (
    <div className="glass-panel p-8 rounded-2xl border border-red-500/30 text-center max-w-md mx-auto space-y-4 my-8">
      <AlertTriangle className="w-10 h-10 text-red-400 mx-auto" />
      <h3 className="text-lg font-bold font-heading text-white">{title}</h3>
      <p className="text-xs text-gray-400 leading-relaxed">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-red-500/40 text-red-300 hover:bg-red-500/10 text-xs font-semibold transition-all"
        >
          <RefreshCw className="w-3.5 h-3.5" /> Retry Request
        </button>
      )}
    </div>
  );
}
