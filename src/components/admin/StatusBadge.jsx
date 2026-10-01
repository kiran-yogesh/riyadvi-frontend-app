import React from 'react';

const STATUS_MAP = {
  // Leads
  new: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  contacted: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
  'in-progress': 'bg-purple-500/20 text-purple-400 border-purple-500/30',
  closed: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
  pending: 'bg-amber-500/20 text-amber-400 border-amber-500/30',

  // Applications
  submitted: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  reviewing: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
  shortlisted: 'bg-gold-500/20 text-gold-300 border-gold-500/30',
  rejected: 'bg-red-500/20 text-red-400 border-red-500/30',
  hired: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',

  // CMS
  published: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
  draft: 'bg-gray-500/20 text-gray-400 border-gray-500/30',
  active: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
  inactive: 'bg-red-500/20 text-red-400 border-red-500/30'
};

export default function StatusBadge({ status }) {
  const normStatus = (status || 'new').toLowerCase();
  const badgeClass = STATUS_MAP[normStatus] || 'bg-gray-500/20 text-gray-300 border-gray-500/30';

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold uppercase tracking-wider border ${badgeClass}`}>
      {status || 'new'}
    </span>
  );
}
