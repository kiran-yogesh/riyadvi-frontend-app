import React from 'react';

export default function Badge({ children, variant = 'gold', className = '', ...props }) {
  const styles = {
    gold: 'bg-gold-500/10 text-gold-400 border-gold-500/30',
    gray: 'bg-white/5 text-gray-300 border-white/10',
    solidGold: 'bg-gold-500 text-black border-gold-500 font-bold'
  };

  return (
    <span 
      className={`inline-block text-xs font-accent uppercase tracking-widest font-semibold px-3.5 py-1 rounded-full border ${styles[variant]} ${className}`}
      {...props}
    >
      {children}
    </span>
  );
}
