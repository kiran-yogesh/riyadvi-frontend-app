import React, { useState } from 'react';
import { useAdminAuth } from '../../context/AdminAuthContext';
import { ShieldCheck, User, Lock, Key, LogOut, CheckCircle2 } from 'lucide-react';

export default function AdminSettingsPage() {
  const { admin, logout } = useAdminAuth();
  const [successMsg, setSuccessMsg] = useState('');

  const handlePasswordResetSim = (e) => {
    e.preventDefault();
    setSuccessMsg('Password updated successfully. Security credentials refreshed.');
    setTimeout(() => setSuccessMsg(''), 4000);
  };

  return (
    <div className="space-y-8 max-w-4xl">
      <div>
        <h2 className="text-xl font-bold font-heading text-white">System Settings & Security</h2>
        <p className="text-xs text-gray-400">Manage administrator account credentials, JWT tokens, and system parameters.</p>
      </div>

      {successMsg && (
        <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-semibold flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          <span>{successMsg}</span>
        </div>
      )}

      {/* Admin Profile Overview */}
      <div className="glass-panel p-6 rounded-3xl border border-white/10 space-y-4">
        <h3 className="text-base font-bold font-heading text-gold-400 flex items-center gap-2">
          <User className="w-5 h-5" /> Administrator Profile
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs pt-2">
          <div>
            <span className="text-gray-400 block uppercase font-accent">Full Name</span>
            <span className="font-bold text-white text-sm">{admin?.name || 'Riyadvi Administrator'}</span>
          </div>
          <div>
            <span className="text-gray-400 block uppercase font-accent">Email Address</span>
            <span className="font-mono text-gray-200">{admin?.email || 'admin@riyadvisoftwaretechnologies.com'}</span>
          </div>
          <div>
            <span className="text-gray-400 block uppercase font-accent">Access Role</span>
            <span className="font-bold text-gold-400 uppercase">{admin?.role || 'Admin'}</span>
          </div>
          <div>
            <span className="text-gray-400 block uppercase font-accent">Session Status</span>
            <span className="text-emerald-400 font-semibold flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" /> Authenticated (JWT 24h)
            </span>
          </div>
        </div>
      </div>

      {/* Password Reset Form */}
      <div className="glass-panel p-6 rounded-3xl border border-white/10 space-y-4">
        <h3 className="text-base font-bold font-heading text-white flex items-center gap-2">
          <Lock className="w-5 h-5 text-gold-400" /> Security Credentials
        </h3>

        <form onSubmit={handlePasswordResetSim} className="space-y-4 text-xs max-w-md">
          <div>
            <label className="block text-gray-300 font-semibold mb-1">Current Password *</label>
            <input
              type="password"
              required
              placeholder="••••••••"
              className="w-full px-3 py-2.5 rounded-xl bg-black/60 border border-white/10 text-white focus:border-gold-500"
            />
          </div>

          <div>
            <label className="block text-gray-300 font-semibold mb-1">New Password *</label>
            <input
              type="password"
              required
              placeholder="••••••••"
              className="w-full px-3 py-2.5 rounded-xl bg-black/60 border border-white/10 text-white focus:border-gold-500"
            />
          </div>

          <button
            type="submit"
            className="px-5 py-2.5 rounded-xl gold-gradient-bg text-black font-bold hover:scale-105 transition-all"
          >
            Update Security Credentials
          </button>
        </form>
      </div>

      {/* Logout Action */}
      <div className="glass-panel p-6 rounded-3xl border border-red-500/30 flex items-center justify-between">
        <div>
          <h4 className="text-sm font-bold text-white font-heading">Sign Out of Admin Portal</h4>
          <p className="text-xs text-gray-400">Clear JWT authentication token and return to public website.</p>
        </div>
        <button
          onClick={logout}
          className="px-5 py-2.5 rounded-xl bg-red-600/20 border border-red-500/40 text-red-300 hover:bg-red-600 hover:text-white transition-all text-xs font-bold flex items-center gap-2"
        >
          <LogOut className="w-4 h-4" /> Sign Out
        </button>
      </div>
    </div>
  );
}
