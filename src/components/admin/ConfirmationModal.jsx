import React from 'react';
import { AlertTriangle } from 'lucide-react';

export default function ConfirmationModal({
  isOpen,
  onClose,
  onConfirm,
  title = 'Confirm Destructive Action',
  message = 'Are you sure you want to proceed? This action cannot be undone.',
  confirmText = 'Confirm Delete',
  loading = false
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
      <div className="bg-obsidian-900 border border-red-500/40 rounded-2xl w-full max-w-md p-6 relative shadow-gold-glow">
        <div className="flex items-center gap-3 text-red-400 mb-4">
          <AlertTriangle className="w-6 h-6 shrink-0" />
          <h3 className="text-lg font-bold font-heading text-white">{title}</h3>
        </div>

        <p className="text-xs text-gray-300 leading-relaxed mb-6">
          {message}
        </p>

        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            disabled={loading}
            className="px-4 py-2 rounded-xl border border-white/10 text-xs font-semibold text-gray-300 hover:text-white"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            disabled={loading}
            className="px-5 py-2 rounded-xl bg-red-600 text-white font-bold text-xs hover:bg-red-500 transition-all flex items-center gap-1.5"
          >
            {loading ? 'Processing...' : confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}
