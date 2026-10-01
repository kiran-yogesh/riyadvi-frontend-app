import React, { useEffect, useState } from 'react';

export default function InitialLoader({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [isFadingOut, setIsFadingOut] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setIsFadingOut(true);
          setTimeout(() => {
            if (onComplete) onComplete();
          }, 600);
          return 100;
        }
        return prev + 5;
      });
    }, 40);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <div
      className={`fixed inset-0 z-50 bg-obsidian-950 flex flex-col items-center justify-center transition-opacity duration-600 ${
        isFadingOut ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      {/* Brand Emblem */}
      <div className="relative mb-8">
        <div className="w-20 h-20 rounded-2xl gold-gradient-bg p-0.5 shadow-gold-glow animate-pulse">
          <div className="w-full h-full bg-black rounded-[14px] flex items-center justify-center">
            <span className="font-heading font-extrabold text-3xl gold-gradient-text">R</span>
          </div>
        </div>
      </div>

      {/* Brand Text */}
      <h1 className="text-xl font-bold font-heading text-white tracking-wide mb-1">
        RIYADVI <span className="text-gold-400">SOFTWARE</span>
      </h1>
      <p className="text-xs text-gray-400 font-accent uppercase tracking-widest mb-8">
        Digital Architecture & 3D WebGL Platform
      </p>

      {/* Progress Bar Container */}
      <div className="w-64 h-1 bg-white/10 rounded-full overflow-hidden relative">
        <div
          className="h-full gold-gradient-bg transition-all duration-75 ease-out rounded-full shadow-gold-glow"
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="mt-3 text-xs font-accent text-gold-400 font-mono">
        {progress}%
      </div>
    </div>
  );
}
