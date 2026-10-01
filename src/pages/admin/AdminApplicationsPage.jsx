import React, { useState, useEffect } from 'react';
import { getAdminApplicationsApi, updateApplicationStatusApi } from '../../api/adminApi';
import DataTable from '../../components/admin/DataTable';
import StatusBadge from '../../components/admin/StatusBadge';
import { Eye, ExternalLink, Briefcase } from 'lucide-react';

export default function AdminApplicationsPage() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedApp, setSelectedApp] = useState(null);

  const fetchApplications = () => {
    setLoading(true);
    getAdminApplicationsApi()
      .then(res => {
        setData(res.data || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  const handleStatusUpdate = async (id, status) => {
    try {
      await updateApplicationStatusApi(id, status);
      fetchApplications();
      if (selectedApp && selectedApp._id === id) {
        setSelectedApp(prev => ({ ...prev, status }));
      }
    } catch (err) {
      alert('Failed to update candidate application status.');
    }
  };

  const filteredData = data.filter(item =>
    (item.name || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    (item.email || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    (item.position || '').toLowerCase().includes(searchTerm.toLowerCase())
  );

  const columns = [
    { header: 'Candidate Name', accessor: 'name', render: row => <span className="font-semibold text-white">{row.name}</span> },
    { header: 'Email', accessor: 'email', render: row => <span className="text-gray-300">{row.email}</span> },
    { header: 'Position Applied', accessor: 'position', render: row => <span className="text-gold-400 font-medium">{row.position}</span> },
    { header: 'Phone', accessor: 'phone' },
    { header: 'Status', accessor: 'status', render: row => <StatusBadge status={row.status} /> },
    {
      header: 'Actions',
      render: row => (
        <button
          onClick={() => setSelectedApp(row)}
          className="p-1.5 rounded-lg bg-gold-500/10 border border-gold-500/30 text-gold-400 hover:bg-gold-500 hover:text-black transition-all flex items-center gap-1 text-xs"
        >
          <Eye className="w-4 h-4" /> Review Profile
        </button>
      )
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold font-heading text-white">Career Applications Management</h2>
        <p className="text-xs text-gray-400">Review job applications, candidate resumes, and update recruitment funnel statuses.</p>
      </div>

      <DataTable
        columns={columns}
        data={filteredData}
        loading={loading}
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        emptyMessage="No career applications found."
      />

      {/* Candidate Review Drawer */}
      {selectedApp && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/80 backdrop-blur-xs">
          <div className="w-full max-w-lg bg-obsidian-900 border-l border-white/10 p-6 overflow-y-auto space-y-6">
            <div className="flex justify-between items-center border-b border-white/10 pb-4">
              <div className="flex items-center gap-2">
                <Briefcase className="w-5 h-5 text-gold-400" />
                <h3 className="text-lg font-bold font-heading text-white">Candidate Review</h3>
              </div>
              <button onClick={() => setSelectedApp(null)} className="text-gray-400 hover:text-white text-xl">
                &times;
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <span className="text-gray-400 block uppercase font-accent">Candidate Name</span>
                <span className="text-base font-bold text-white">{selectedApp.name}</span>
              </div>
              <div>
                <span className="text-gray-400 block uppercase font-accent">Position</span>
                <span className="text-gold-400 font-bold">{selectedApp.position}</span>
              </div>
              <div>
                <span className="text-gray-400 block uppercase font-accent">Email</span>
                <span className="text-gray-200">{selectedApp.email}</span>
              </div>
              <div>
                <span className="text-gray-400 block uppercase font-accent">Phone</span>
                <span className="text-gray-200">{selectedApp.phone}</span>
              </div>

              {selectedApp.resumeUrl && (
                <div>
                  <span className="text-gray-400 block uppercase font-accent mb-1">Resume Document</span>
                  <a
                    href={selectedApp.resumeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gold-500/10 border border-gold-500/30 text-gold-300 hover:bg-gold-500 hover:text-black transition-all text-xs font-bold"
                  >
                    View Resume Link <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              )}

              {selectedApp.message && (
                <div>
                  <span className="text-gray-400 block uppercase font-accent">Cover Letter / Note</span>
                  <p className="p-3 bg-black/60 rounded-xl border border-white/10 text-gray-300 whitespace-pre-wrap">
                    {selectedApp.message}
                  </p>
                </div>
              )}
            </div>

            <div className="border-t border-white/10 pt-4">
              <label className="block text-xs font-accent uppercase text-gold-400 font-bold mb-2">Update Candidate Funnel Status</label>
              <div className="grid grid-cols-2 gap-2">
                {['submitted', 'reviewing', 'shortlisted', 'rejected', 'hired'].map((st) => (
                  <button
                    key={st}
                    onClick={() => handleStatusUpdate(selectedApp._id, st)}
                    className={`p-2 rounded-xl border text-xs font-bold capitalize transition-all ${
                      selectedApp.status === st
                        ? 'bg-gold-500 text-black border-gold-500'
                        : 'bg-black/40 border-white/10 text-gray-300 hover:border-gold-500/40'
                    }`}
                  >
                    {st}
                  </button>
                ))}
              </div>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}
