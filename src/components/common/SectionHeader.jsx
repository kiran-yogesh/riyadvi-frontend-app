import React from 'react';

export default function SectionHeader({ badge, title, subtitle, align = 'center', className = '' }) {
  const alignment = align === 'left' ? 'text-left' : align === 'right' ? 'text-right' : 'text-center mx-auto';

  return (
    <div className={`max-w-3xl mb-16 ${alignment} ${className}`}>
      {badge && (
        <span className="text-xs font-accent uppercase tracking-widest text-gold-400 font-bold px-3 py-1 rounded-full bg-gold-500/10 border border-gold-500/30">
          {badge}
        </span>
      )}
      {title && (
        <h2 className="text-3xl md:text-5xl font-extrabold text-white mt-4 font-heading leading-tight">
          {title}
        </h2>
      )}
      {subtitle && (
        <p className="text-gray-400 mt-4 text-base leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  );
}
