import React, { useEffect, useState } from 'react';

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [trailingPos, setTrailingPos] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [isCanvasHovered, setIsCanvasHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Disable on touch / mobile devices or reduced-motion
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (isTouchDevice || prefersReducedMotion) return;

    setIsVisible(true);

    const handleMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e) => {
      const target = e.target;
      const isInteractive = target.closest('a, button, input, textarea, select, [data-cursor="pointer"]');
      const isCanvas = target.closest('canvas, [data-cursor="3d"]');

      setIsHovered(!!isInteractive);
      setIsCanvasHovered(!!isCanvas);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  // Smooth lerp trailing effect
  useEffect(() => {
    if (!isVisible) return;
    let animationFrame;

    const lerp = () => {
      setTrailingPos((prev) => ({
        x: prev.x + (position.x - prev.x) * 0.2,
        y: prev.y + (position.y - prev.y) * 0.2,
      }));
      animationFrame = requestAnimationFrame(lerp);
    };

    animationFrame = requestAnimationFrame(lerp);
    return () => cancelAnimationFrame(animationFrame);
  }, [position, isVisible]);

  if (!isVisible) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden">
      {/* Small Core Dot */}
      <div
        className={`fixed w-2.5 h-2.5 bg-gold-400 rounded-full -translate-x-1/2 -translate-y-1/2 transition-transform duration-75 ${
          isHovered ? 'scale-150 bg-white' : ''
        }`}
        style={{ left: `${position.x}px`, top: `${position.y}px` }}
      />

      {/* Outer Ring */}
      <div
        className={`fixed border rounded-full -translate-x-1/2 -translate-y-1/2 transition-all duration-300 ease-out ${
          isCanvasHovered
            ? 'w-16 h-16 border-gold-400/80 bg-gold-500/10 backdrop-blur-xs scale-110'
            : isHovered
            ? 'w-12 h-12 border-gold-400 bg-gold-400/20 scale-125'
            : 'w-8 h-8 border-gold-400/40 bg-transparent'
        }`}
        style={{ left: `${trailingPos.x}px`, top: `${trailingPos.y}px` }}
      >
        {isCanvasHovered && (
          <span className="absolute inset-0 flex items-center justify-center text-[8px] font-accent uppercase text-gold-300 font-bold tracking-widest animate-pulse">
            3D INTERACT
          </span>
        )}
      </div>
    </div>
  );
}
