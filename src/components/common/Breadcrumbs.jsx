import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

export default function Breadcrumbs({ items = [] }) {
  return (
    <nav className="flex items-center gap-2 text-xs text-gray-400 mb-6 flex-wrap">
      <Link to="/" className="hover:text-gold-400 transition-colors flex items-center gap-1">
        <Home className="w-3.5 h-3.5" /> Home
      </Link>
      {items.map((item, idx) => (
        <React.Fragment key={idx}>
          <ChevronRight className="w-3 h-3 text-gray-600" />
          {item.path ? (
            <Link to={item.path} className="hover:text-gold-400 transition-colors">
              {item.label}
            </Link>
          ) : (
            <span className="text-gold-400 font-semibold">{item.label}</span>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
}
