import React, { useEffect, useRef } from 'react';
import { gsap } from '../../animations/gsapConfig';

export default function TextReveal({ text, className = '', as = 'h2', delay = 0 }) {
  const containerRef = useRef(null);
  const Tag = as;

  useEffect(() => {
    if (!containerRef.current) return;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const words = containerRef.current.querySelectorAll('.word');

    gsap.fromTo(
      words,
      { opacity: 0, y: 24, rotateX: -20 },
      {
        opacity: 1,
        y: 0,
        rotateX: 0,
        duration: 0.8,
        delay,
        stagger: 0.04,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 85%',
          toggleActions: 'play none none none'
        }
      }
    );
  }, [text, delay]);

  const wordsArray = typeof text === 'string' ? text.split(' ') : [];

  return (
    <Tag ref={containerRef} className={`inline-block ${className}`}>
      {wordsArray.map((word, idx) => (
        <span key={idx} className="word inline-block mr-[0.25em] will-change-transform">
          {word}
        </span>
      ))}
    </Tag>
  );
}
