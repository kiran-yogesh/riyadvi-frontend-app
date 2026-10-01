import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ShieldAlert } from 'lucide-react';

export default function NotFoundPage() {
  return (
    <div className="min-h-screen bg-obsidian-950 text-white flex items-center justify-center p-6 text-center">
      <div className="max-w-md glass-panel p-10 rounded-3xl border border-white/10 shadow-gold-glow">
        <ShieldAlert className="w-16 h-16 text-gold-400 mx-auto mb-4" />
        <h1 className="text-4xl font-extrabold font-heading text-white mb-2">404 — Page Not Found</h1>
        <p className="text-xs text-gray-400 mb-6">The architectural route you are searching for does not exist or has been relocated.</p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl gold-gradient-bg text-black font-bold text-xs shadow-gold-glow hover:scale-105 transition-all"
        >
          <ArrowLeft className="w-4 h-4" /> Return to Homepage
        </Link>
      </div>
    </div>
  );
}
