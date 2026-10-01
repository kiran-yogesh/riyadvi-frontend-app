import React from 'react';

export default function Button({ children, variant = 'primary', size = 'md', className = '', ...props }) {
  const baseStyle = "font-bold rounded-xl transition-all duration-300 inline-flex items-center justify-center gap-2";
  
  const variants = {
    primary: "gold-gradient-bg text-black shadow-gold-glow hover:scale-105",
    secondary: "bg-white/5 text-white border border-white/10 hover:border-gold-500/50 hover:bg-gold-500/10",
    outline: "border border-gold-500/50 text-gold-400 hover:bg-gold-500/10",
    ghost: "text-gray-300 hover:text-gold-400 hover:bg-white/5"
  };

  const sizes = {
    sm: "px-4 py-2 text-xs",
    md: "px-6 py-3 text-sm",
    lg: "px-8 py-4 text-base"
  };

  return (
    <button 
      className={`${baseStyle} ${variants[variant]} ${sizes[size]} ${className}`} 
      {...props}
    >
      {children}
    </button>
  );
}
