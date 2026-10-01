import { gsap, ScrollTrigger } from './gsapConfig';

/**
 * Standard single element scroll reveal
 */
export const initScrollReveal = (targetRef, options = {}) => {
  if (!targetRef.current) return;
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) return;

  return gsap.fromTo(
    targetRef.current,
    { opacity: 0, y: options.y || 40 },
    {
      opacity: 1,
      y: 0,
      duration: options.duration || 0.8,
      delay: options.delay || 0,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: targetRef.current,
        start: options.start || 'top 85%',
        toggleActions: 'play none none none'
      }
    }
  );
};

/**
 * Staggered container list reveal
 */
export const initStaggerReveal = (containerRef, childSelector = '.stagger-item', options = {}) => {
  if (!containerRef.current) return;
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) return;

  const elements = containerRef.current.querySelectorAll(childSelector);
  if (!elements || elements.length === 0) return;

  return gsap.fromTo(
    elements,
    { opacity: 0, y: options.y || 30 },
    {
      opacity: 1,
      y: 0,
      duration: options.duration || 0.7,
      stagger: options.stagger || 0.15,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: containerRef.current,
        start: options.start || 'top 80%',
        toggleActions: 'play none none none'
      }
    }
  );
};

/**
 * Smooth Parallax Shift
 */
export const initParallax = (targetRef, distance = 60) => {
  if (!targetRef.current) return;
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) return;

  return gsap.to(targetRef.current, {
    y: -distance,
    ease: 'none',
    scrollTrigger: {
      trigger: targetRef.current,
      start: 'top bottom',
      end: 'bottom top',
      scrub: true
    }
  });
};
