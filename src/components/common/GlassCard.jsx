import React from 'react';

export default function GlassCard({ children, goldBorder = false, className = '', ...props }) {
  const borderStyle = goldBorder 
    ? "border-gold-500/40 hover:border-gold-400 shadow-gold-glow" 
    : "border-white/10 hover:border-gold-500/40";

  return (
    <div 
      className={`glass-card p-6 rounded-2xl ${borderStyle} ${className}`} 
      {...props}
    >
      {children}
    </div>
  );
}
