import React from 'react';

export default React.forwardRef(function Input({ label, error, className = '', ...props }, ref) {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-xs font-medium text-gray-300 mb-1.5 font-sans">
          {label}
        </label>
      )}
      <input
        ref={ref}
        className={`w-full bg-black/60 border ${
          error ? 'border-red-500/80 focus:border-red-500' : 'border-white/10 focus:border-gold-500'
        } rounded-xl px-4 py-3 text-sm text-white placeholder-gray-500 outline-none transition-all duration-200 focus:ring-1 focus:ring-gold-500/30 ${className}`}
        {...props}
      />
      {error && (
        <span className="block text-[11px] text-red-400 mt-1 font-medium">
          {error}
        </span>
      )}
    </div>
  );
});
