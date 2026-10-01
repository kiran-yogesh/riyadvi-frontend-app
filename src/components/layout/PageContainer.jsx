import React from 'react';

export default function PageContainer({ children, className = '' }) {
  return (
    <div className={`container mx-auto px-6 py-12 max-w-7xl ${className}`}>
      {children}
    </div>
  );
}
