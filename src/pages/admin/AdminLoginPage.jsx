import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAdminAuth } from '../../context/AdminAuthContext';
import Input from '../../components/forms/Input';
import SubmitButton from '../../components/forms/SubmitButton';
import ErrorState from '../../components/common/ErrorState';
import { ShieldCheck, Lock, Mail } from 'lucide-react';

export default function AdminLoginPage() {
  const [email, setEmail] = useState('admin@riyadvisoftwaretechnologies.com');
  const [password, setPassword] = useState('admin123');
  const [errorMsg, setErrorMsg] = useState('');
  const { login, loading } = useAdminAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (!email || !password) {
      setErrorMsg('Please enter both email and password.');
      return;
    }

    const res = await login(email, password);
    if (res.success) {
      navigate('/admin/dashboard', { replace: true });
    } else {
      setErrorMsg(res.message || 'Authentication failed.');
    }
  };

  return (
    <div className="min-h-screen bg-obsidian-950 flex items-center justify-center p-6 text-white relative overflow-hidden">
      {/* Subtle Background Glow */}
      <div className="absolute w-96 h-96 bg-gold-500/10 rounded-full blur-3xl top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />

      <div className="w-full max-w-md relative z-10 glass-panel p-8 md:p-10 rounded-3xl border border-gold-500/40 shadow-gold-glow">
        
        {/* Emblem */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-2xl gold-gradient-bg p-0.5 mx-auto mb-4 shadow-gold-glow">
            <div className="w-full h-full bg-black rounded-[14px] flex items-center justify-center">
              <ShieldCheck className="w-8 h-8 text-gold-400" />
            </div>
          </div>

          <h1 className="text-2xl font-extrabold font-heading text-white">
            Admin Authentication
          </h1>
          <p className="text-xs text-gray-400 mt-1 font-accent">
            Riyadvi Management Portal
          </p>
        </div>

        {errorMsg && <ErrorState title="Login Failed" message={errorMsg} />}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-2">
              Admin Email
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gold-400" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@riyadvisoftwaretechnologies.com"
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-black/60 border border-white/10 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-gold-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-2">
              Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gold-400" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-black/60 border border-white/10 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-gold-500"
              />
            </div>
          </div>

          <div className="pt-2">
            <SubmitButton loading={loading} loadingText="Authenticating Token...">
              Sign In to Dashboard
            </SubmitButton>
          </div>
        </form>

        <div className="mt-6 text-center border-t border-white/10 pt-4 text-[11px] text-gray-400">
          Default seed credentials: <code className="text-gold-400 font-mono">admin@riyadvisoftwaretechnologies.com</code> / <code className="text-gold-400 font-mono">admin123</code>
        </div>
      </div>
    </div>
  );
}
