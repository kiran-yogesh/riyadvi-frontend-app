import React, { useState, useEffect } from 'react';
import apiClient from '../../api/apiClient';
import { createServiceApi, updateServiceApi, deleteServiceApi } from '../../api/adminApi';
import DataTable from '../../components/admin/DataTable';
import ConfirmationModal from '../../components/admin/ConfirmationModal';
import { Plus, Edit2, Trash2, Layers } from 'lucide-react';

export default function AdminServicesPage() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingService, setEditingService] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const [form, setForm] = useState({
    title: '',
    slug: '',
    tagline: '',
    shortDescription: '',
    sceneType: 'browser',
    featured: false,
    order: 1
  });

  const fetchServices = () => {
    setLoading(true);
    apiClient.get('/services')
      .then(res => {
        setServices(res.data.data || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const openCreateModal = () => {
    setEditingService(null);
    setForm({
      title: '',
      slug: '',
      tagline: '',
      shortDescription: '',
      sceneType: 'browser',
      featured: false,
      order: services.length + 1
    });
    setModalOpen(true);
  };

  const openEditModal = (service) => {
    setEditingService(service);
    setForm({
      title: service.title || '',
      slug: service.slug || '',
      tagline: service.tagline || '',
      shortDescription: service.shortDescription || service.description || '',
      sceneType: service.sceneType || 'browser',
      featured: !!service.featured,
      order: service.order || 1
    });
    setModalOpen(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      if (editingService) {
        await updateServiceApi(editingService._id || editingService.slug, form);
      } else {
        await createServiceApi(form);
      }
      setModalOpen(false);
      fetchServices();
    } catch (err) {
      alert('Failed to save service.');
    }
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    setDeleteLoading(true);
    try {
      await deleteServiceApi(deleteId);
      setDeleteId(null);
      fetchServices();
    } catch (err) {
      alert('Failed to delete service.');
    } finally {
      setDeleteLoading(false);
    }
  };

  const columns = [
    { header: 'Title', accessor: 'title', render: row => <span className="font-bold text-white">{row.title}</span> },
    { header: 'Slug', accessor: 'slug', render: row => <span className="text-gray-400 font-mono text-[11px]">{row.slug}</span> },
    { header: '3D Scene Type', accessor: 'sceneType', render: row => <span className="text-gold-400 font-semibold">{row.sceneType}</span> },
    { header: 'Order', accessor: 'order' },
    {
      header: 'Actions',
      render: row => (
        <div className="flex gap-2">
          <button
            onClick={() => openEditModal(row)}
            className="p-1.5 rounded-lg bg-white/5 border border-white/10 text-gray-300 hover:text-white hover:border-gold-500"
          >
            <Edit2 className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => setDeleteId(row._id || row.slug)}
            className="p-1.5 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 hover:bg-red-500 hover:text-white"
          >
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
          <h2 className="text-xl font-bold font-heading text-white">Services Content Management (CMS)</h2>
          <p className="text-xs text-gray-400">Manage the 6 core services and dynamic detail pages.</p>
        </div>
        <button
          onClick={openCreateModal}
          className="px-4 py-2 rounded-xl gold-gradient-bg text-black font-bold text-xs shadow-gold-glow hover:scale-105 transition-all flex items-center gap-1.5"
        >
          <Plus className="w-4 h-4" /> Add New Service
        </button>
      </div>

      <DataTable
        columns={columns}
        data={services}
        loading={loading}
        emptyMessage="No services registered."
      />

      {/* Service Create / Edit Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-xs p-4">
          <div className="bg-obsidian-900 border border-gold-500/40 rounded-2xl w-full max-w-lg p-6 space-y-4 shadow-gold-glow">
            <h3 className="text-lg font-bold font-heading text-gold-400">
              {editingService ? 'Edit Service Record' : 'Create New Service'}
            </h3>

            <form onSubmit={handleSave} className="space-y-3 text-xs">
              <div>
                <label className="block text-gray-300 font-semibold mb-1">Service Title *</label>
                <input
                  type="text"
                  required
                  value={form.title}
                  onChange={e => setForm({ ...form, title: e.target.value, slug: e.target.value.toLowerCase().replace(/\s+/g, '-') })}
                  className="w-full px-3 py-2 rounded-xl bg-black/60 border border-white/10 text-white focus:border-gold-500"
                />
              </div>

              <div>
                <label className="block text-gray-300 font-semibold mb-1">URL Slug *</label>
                <input
                  type="text"
                  required
                  value={form.slug}
                  onChange={e => setForm({ ...form, slug: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-black/60 border border-white/10 text-white font-mono focus:border-gold-500"
                />
              </div>

              <div>
                <label className="block text-gray-300 font-semibold mb-1">Tagline</label>
                <input
                  type="text"
                  value={form.tagline}
                  onChange={e => setForm({ ...form, tagline: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-black/60 border border-white/10 text-white focus:border-gold-500"
                />
              </div>

              <div>
                <label className="block text-gray-300 font-semibold mb-1">3D Visualization Type</label>
                <select
                  value={form.sceneType}
                  onChange={e => setForm({ ...form, sceneType: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-black/60 border border-white/10 text-white focus:border-gold-500"
                >
                  <option value="browser">Web Browser (Web Dev)</option>
                  <option value="phone">Mobile Phone (App Dev)</option>
                  <option value="growth">Growth Bars (Marketing)</option>
                  <option value="ar-vr">Spatial Torus (AR/VR)</option>
                  <option value="object3d">3D Object (3D Modeling)</option>
                  <option value="floating-ui">Floating UI (UI/UX)</option>
                </select>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-white/10 text-gray-300 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl gold-gradient-bg text-black font-bold hover:scale-105 transition-all"
                >
                  Save Service
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      <ConfirmationModal
        isOpen={!!deleteId}
        onClose={() => setDeleteId(null)}
        onConfirm={handleDelete}
        title="Delete Service Record"
        message="Are you sure you want to delete this service entry from the CMS?"
        loading={deleteLoading}
      />
    </div>
  );
}
