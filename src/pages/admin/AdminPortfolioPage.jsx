import React, { useState, useEffect } from 'react';
import apiClient from '../../api/apiClient';
import { createPortfolioApi, updatePortfolioApi, deletePortfolioApi } from '../../api/adminApi';
import DataTable from '../../components/admin/DataTable';
import ConfirmationModal from '../../components/admin/ConfirmationModal';
import { Plus, Edit2, Trash2 } from 'lucide-react';

export default function AdminPortfolioPage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [deleteId, setDeleteId] = useState(null);

  const [form, setForm] = useState({
    title: '',
    slug: '',
    client: '',
    industry: 'Enterprise',
    challenge: '',
    solution: '',
    coverImage: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1000&auto=format&fit=crop',
    featured: true
  });

  const fetchPortfolio = () => {
    setLoading(true);
    apiClient.get('/portfolio')
      .then(res => {
        setItems(res.data.data || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  useEffect(() => {
    fetchPortfolio();
  }, []);

  const openCreateModal = () => {
    setEditingItem(null);
    setForm({
      title: '',
      slug: '',
      client: '',
      industry: 'Enterprise',
      challenge: '',
      solution: '',
      coverImage: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1000&auto=format&fit=crop',
      featured: true
    });
    setModalOpen(true);
  };

  const openEditModal = (item) => {
    setEditingItem(item);
    setForm({
      title: item.title || '',
      slug: item.slug || '',
      client: item.client || '',
      industry: item.industry || 'Enterprise',
      challenge: item.challenge || '',
      solution: item.solution || '',
      coverImage: item.coverImage || '',
      featured: !!item.featured
    });
    setModalOpen(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      if (editingItem) {
        await updatePortfolioApi(editingItem._id || editingItem.slug, form);
      } else {
        await createPortfolioApi(form);
      }
      setModalOpen(false);
      fetchPortfolio();
    } catch (err) {
      alert('Failed to save portfolio case study.');
    }
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    try {
      await deletePortfolioApi(deleteId);
      setDeleteId(null);
      fetchPortfolio();
    } catch (err) {
      alert('Failed to delete portfolio case study.');
    }
  };

  const columns = [
    { header: 'Project Title', accessor: 'title', render: row => <span className="font-bold text-white">{row.title}</span> },
    { header: 'Client', accessor: 'client', render: row => <span className="text-gold-400 font-medium">{row.client}</span> },
    { header: 'Industry', accessor: 'industry' },
    { header: 'Slug', accessor: 'slug', render: row => <span className="text-gray-400 font-mono text-[11px]">{row.slug}</span> },
    {
      header: 'Actions',
      render: row => (
        <div className="flex gap-2">
          <button onClick={() => openEditModal(row)} className="p-1.5 rounded-lg bg-white/5 border border-white/10 text-gray-300 hover:text-white hover:border-gold-500">
            <Edit2 className="w-3.5 h-3.5" />
          </button>
          <button onClick={() => setDeleteId(row._id || row.slug)} className="p-1.5 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 hover:bg-red-500 hover:text-white">
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>
      )
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-bold font-heading text-white">Portfolio Case Studies CMS</h2>
          <p className="text-xs text-gray-400">Manage case study entries and client success showcases.</p>
        </div>
        <button onClick={openCreateModal} className="px-4 py-2 rounded-xl gold-gradient-bg text-black font-bold text-xs shadow-gold-glow hover:scale-105 transition-all flex items-center gap-1.5">
          <Plus className="w-4 h-4" /> Add Case Study
        </button>
      </div>

      <DataTable columns={columns} data={items} loading={loading} emptyMessage="No case studies found." />

      {/* Create / Edit Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-xs p-4">
          <div className="bg-obsidian-900 border border-gold-500/40 rounded-2xl w-full max-w-lg p-6 space-y-4 shadow-gold-glow">
            <h3 className="text-lg font-bold font-heading text-gold-400">
              {editingItem ? 'Edit Case Study' : 'Create New Case Study'}
            </h3>

            <form onSubmit={handleSave} className="space-y-3 text-xs">
              <div>
                <label className="block text-gray-300 font-semibold mb-1">Project Title *</label>
                <input
                  type="text"
                  required
                  value={form.title}
                  onChange={e => setForm({ ...form, title: e.target.value, slug: e.target.value.toLowerCase().replace(/\s+/g, '-') })}
                  className="w-full px-3 py-2 rounded-xl bg-black/60 border border-white/10 text-white focus:border-gold-500"
                />
              </div>

              <div>
                <label className="block text-gray-300 font-semibold mb-1">Client Name *</label>
                <input
                  type="text"
                  required
                  value={form.client}
                  onChange={e => setForm({ ...form, client: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-black/60 border border-white/10 text-white focus:border-gold-500"
                />
              </div>

              <div>
                <label className="block text-gray-300 font-semibold mb-1">Industry Sector</label>
                <input
                  type="text"
                  value={form.industry}
                  onChange={e => setForm({ ...form, industry: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-black/60 border border-white/10 text-white focus:border-gold-500"
                />
              </div>

              <div>
                <label className="block text-gray-300 font-semibold mb-1">Challenge Summary</label>
                <textarea
                  rows={2}
                  value={form.challenge}
                  onChange={e => setForm({ ...form, challenge: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-black/60 border border-white/10 text-white focus:border-gold-500"
                />
              </div>

              <div>
                <label className="block text-gray-300 font-semibold mb-1">Solution Summary</label>
                <textarea
                  rows={2}
                  value={form.solution}
                  onChange={e => setForm({ ...form, solution: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-black/60 border border-white/10 text-white focus:border-gold-500"
                />
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-white/10">
                <button type="button" onClick={() => setModalOpen(false)} className="px-4 py-2 rounded-xl border border-white/10 text-gray-300 hover:text-white">
                  Cancel
                </button>
                <button type="submit" className="px-5 py-2 rounded-xl gold-gradient-bg text-black font-bold hover:scale-105 transition-all">
                  Save Case Study
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <ConfirmationModal isOpen={!!deleteId} onClose={() => setDeleteId(null)} onConfirm={handleDelete} title="Delete Case Study" message="Are you sure you want to delete this case study entry?" />
    </div>
  );
}
