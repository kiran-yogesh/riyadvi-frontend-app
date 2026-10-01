import React from 'react';

export default function Container({ children, className = '', ...props }) {
  return (
    <div className={`container mx-auto px-6 max-w-7xl ${className}`} {...props}>
      {children}
    </div>
  );
}
