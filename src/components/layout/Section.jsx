import React from 'react';

export default function Section({ children, className = '', id, ...props }) {
  return (
    <section id={id} className={`py-20 md:py-28 relative ${className}`} {...props}>
      {children}
    </section>
  );
}
