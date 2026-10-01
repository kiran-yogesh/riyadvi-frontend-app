import React, { useState, useEffect } from 'react';
import apiClient from '../../api/apiClient';
import { createJobApi, updateJobApi, deleteJobApi } from '../../api/adminApi';
import DataTable from '../../components/admin/DataTable';
import StatusBadge from '../../components/admin/StatusBadge';
import ConfirmationModal from '../../components/admin/ConfirmationModal';
import { Plus, Edit2, Trash2 } from 'lucide-react';

export default function AdminJobsPage() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingJob, setEditingJob] = useState(null);
  const [deleteId, setDeleteId] = useState(null);

  const [form, setForm] = useState({
    title: '',
    slug: '',
    department: 'Engineering',
    designation: 'Senior Engineer',
    location: 'Mylapore, Chennai, India (Hybrid)',
    experience: '3-5 Years',
    employmentType: 'Full-time',
    description: '',
    status: 'active'
  });

  const fetchJobs = () => {
    setLoading(true);
    apiClient.get('/jobs')
      .then(res => {
        setJobs(res.data.data || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const openCreateModal = () => {
    setEditingJob(null);
    setForm({
      title: '',
      slug: '',
      department: 'Engineering',
      designation: 'Senior Engineer',
      location: 'Mylapore, Chennai, India (Hybrid)',
      experience: '3-5 Years',
      employmentType: 'Full-time',
      description: '',
      status: 'active'
    });
    setModalOpen(true);
  };

  const openEditModal = (job) => {
    setEditingJob(job);
    setForm({
      title: job.title || '',
      slug: job.slug || '',
      department: job.department || 'Engineering',
      designation: job.designation || '',
      location: job.location || '',
      experience: job.experience || '',
      employmentType: job.employmentType || 'Full-time',
      description: job.description || '',
      status: job.status || 'active'
    });
    setModalOpen(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      if (editingJob) {
        await updateJobApi(editingJob._id || editingJob.slug, form);
      } else {
        await createJobApi(form);
      }
      setModalOpen(false);
      fetchJobs();
    } catch (err) {
      alert('Failed to save job posting.');
    }
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    try {
      await deleteJobApi(deleteId);
      setDeleteId(null);
      fetchJobs();
    } catch (err) {
      alert('Failed to delete job posting.');
    }
  };

  const columns = [
    { header: 'Job Title', accessor: 'title', render: row => <span className="font-bold text-white">{row.title}</span> },
    { header: 'Department', accessor: 'department', render: row => <span className="text-gold-400 font-medium">{row.department}</span> },
    { header: 'Experience', accessor: 'experience' },
    { header: 'Location', accessor: 'location' },
    { header: 'Status', render: row => <StatusBadge status={row.status} /> },
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
          <h2 className="text-xl font-bold font-heading text-white">Career Jobs CMS Management</h2>
          <p className="text-xs text-gray-400">Post career opportunities and manage recruitment roles.</p>
        </div>
        <button onClick={openCreateModal} className="px-4 py-2 rounded-xl gold-gradient-bg text-black font-bold text-xs shadow-gold-glow hover:scale-105 transition-all flex items-center gap-1.5">
          <Plus className="w-4 h-4" /> Add Job Opening
        </button>
      </div>

      <DataTable columns={columns} data={jobs} loading={loading} emptyMessage="No job openings found." />

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-xs p-4">
          <div className="bg-obsidian-900 border border-gold-500/40 rounded-2xl w-full max-w-lg p-6 space-y-4 shadow-gold-glow">
            <h3 className="text-lg font-bold font-heading text-gold-400">
              {editingJob ? 'Edit Job Opening' : 'Post New Job Opening'}
            </h3>

            <form onSubmit={handleSave} className="space-y-3 text-xs">
              <div>
                <label className="block text-gray-300 font-semibold mb-1">Job Title *</label>
                <input
                  type="text"
                  required
                  value={form.title}
                  onChange={e => setForm({ ...form, title: e.target.value, slug: e.target.value.toLowerCase().replace(/\s+/g, '-') })}
                  className="w-full px-3 py-2 rounded-xl bg-black/60 border border-white/10 text-white focus:border-gold-500"
                />
              </div>

              <div>
                <label className="block text-gray-300 font-semibold mb-1">Department</label>
                <input
                  type="text"
                  value={form.department}
                  onChange={e => setForm({ ...form, department: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-black/60 border border-white/10 text-white focus:border-gold-500"
                />
              </div>

              <div>
                <label className="block text-gray-300 font-semibold mb-1">Experience Required</label>
                <input
                  type="text"
                  value={form.experience}
                  onChange={e => setForm({ ...form, experience: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-black/60 border border-white/10 text-white focus:border-gold-500"
                />
              </div>

              <div>
                <label className="block text-gray-300 font-semibold mb-1">Job Status</label>
                <select
                  value={form.status}
                  onChange={e => setForm({ ...form, status: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-black/60 border border-white/10 text-white focus:border-gold-500"
                >
                  <option value="active">Active (Accepting Applications)</option>
                  <option value="closed">Closed / Inactive</option>
                </select>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-white/10">
                <button type="button" onClick={() => setModalOpen(false)} className="px-4 py-2 rounded-xl border border-white/10 text-gray-300 hover:text-white">
                  Cancel
                </button>
                <button type="submit" className="px-5 py-2 rounded-xl gold-gradient-bg text-black font-bold hover:scale-105 transition-all">
                  Save Job Opening
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <ConfirmationModal isOpen={!!deleteId} onClose={() => setDeleteId(null)} onConfirm={handleDelete} title="Delete Job Opening" message="Are you sure you want to delete this job position?" />
    </div>
  );
}
