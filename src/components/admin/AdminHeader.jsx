import React from 'react';
import { Menu, User, ShieldCheck } from 'lucide-react';
import { useAdminAuth } from '../../context/AdminAuthContext';

export default function AdminHeader({ title = 'Admin Overview', onOpenMobile }) {
  const { admin } = useAdminAuth();

  return (
    <header className="h-16 bg-obsidian-950/80 backdrop-blur-md border-b border-white/10 px-6 flex items-center justify-between sticky top-0 z-30">
      <div className="flex items-center gap-4">
        <button
          onClick={onOpenMobile}
          className="lg:hidden p-2 rounded-lg bg-white/5 border border-white/10 text-gray-300 hover:text-white"
        >
          <Menu className="w-5 h-5" />
        </button>

        <h1 className="text-lg font-bold font-heading text-white tracking-tight">
          {title}
        </h1>
      </div>

      <div className="flex items-center gap-3">
        <div className="hidden sm:flex flex-col text-right">
          <span className="text-xs font-bold text-white leading-tight">
            {admin?.name || 'Riyadvi Super Admin'}
          </span>
          <span className="text-[10px] font-accent text-gold-400 uppercase tracking-widest flex items-center gap-1 justify-end">
            <ShieldCheck className="w-3 h-3" /> {admin?.role || 'Administrator'}
          </span>
        </div>

        <div className="w-9 h-9 rounded-full bg-gold-500/20 border border-gold-500/40 flex items-center justify-center text-gold-400">
          <User className="w-4 h-4" />
        </div>
      </div>
    </header>
  );
}
