import React from 'react';
import { Send } from 'lucide-react';

export default function SubmitButton({ children, loading = false, loadingText = 'Processing...', className = '', ...props }) {
  return (
    <button
      type="submit"
      disabled={loading}
      className={`w-full py-3.5 px-6 rounded-xl gold-gradient-bg text-black font-bold text-sm shadow-gold-glow hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2 ${className}`}
      {...props}
    >
      <Send className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
      <span>{loading ? loadingText : children}</span>
    </button>
  );
}
