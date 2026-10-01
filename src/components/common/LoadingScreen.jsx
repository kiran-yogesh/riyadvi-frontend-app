import React from 'react';

export default function LoadingScreen({ message = 'Loading Digital Architecture...' }) {
  return (
    <div className="min-h-screen bg-obsidian-950 flex flex-col items-center justify-center text-gold-400 p-6">
      <div className="w-12 h-12 rounded-xl bg-gold-500/10 border border-gold-500/40 flex items-center justify-center animate-spin mb-4">
        <span className="font-heading font-extrabold text-gold-400 text-xl">R</span>
      </div>
      <p className="text-sm font-semibold font-accent tracking-wider uppercase text-gray-300 animate-pulse">
        {message}
      </p>
    </div>
  );
}
