import React, { useState, useEffect } from 'react';
import { getAdminConsultationsApi, updateConsultationStatusApi } from '../../api/adminApi';
import DataTable from '../../components/admin/DataTable';
import StatusBadge from '../../components/admin/StatusBadge';
import { Eye } from 'lucide-react';

export default function AdminConsultationsPage() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedConsultation, setSelectedConsultation] = useState(null);

  const fetchConsultations = () => {
    setLoading(true);
    getAdminConsultationsApi()
      .then(res => {
        setData(res.data || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  useEffect(() => {
    fetchConsultations();
  }, []);

  const handleStatusUpdate = async (id, status) => {
    try {
      await updateConsultationStatusApi(id, status);
      fetchConsultations();
      if (selectedConsultation && selectedConsultation._id === id) {
        setSelectedConsultation(prev => ({ ...prev, status }));
      }
    } catch (err) {
      alert('Failed to update consultation status.');
    }
  };

  const filteredData = data.filter(item =>
    (item.name || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    (item.email || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    (item.service || '').toLowerCase().includes(searchTerm.toLowerCase())
  );

  const columns = [
    { header: 'Client Name', accessor: 'name', render: row => <span className="font-semibold text-white">{row.name}</span> },
    { header: 'Email', accessor: 'email', render: row => <span className="text-gray-300">{row.email}</span> },
    { header: 'Service', accessor: 'service', render: row => <span className="text-gold-400 font-medium">{row.service}</span> },
    { header: 'Contact Method', accessor: 'preferredContactMethod' },
    { header: 'Status', accessor: 'status', render: row => <StatusBadge status={row.status} /> },
    {
      header: 'Actions',
      render: row => (
        <button
          onClick={() => setSelectedConsultation(row)}
          className="p-1.5 rounded-lg bg-gold-500/10 border border-gold-500/30 text-gold-400 hover:bg-gold-500 hover:text-black transition-all"
        >
          <Eye className="w-4 h-4" />
        </button>
      )
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold font-heading text-white">Consultation Requests Management</h2>
        <p className="text-xs text-gray-400">Manage free consultation scheduling and client architecture reviews.</p>
      </div>

      <DataTable
        columns={columns}
        data={filteredData}
        loading={loading}
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        emptyMessage="No consultation requests found."
      />

      {/* Detail Drawer */}
      {selectedConsultation && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/70 backdrop-blur-xs">
          <div className="w-full max-w-lg bg-obsidian-900 border-l border-white/10 p-6 overflow-y-auto space-y-6">
            <div className="flex justify-between items-center border-b border-white/10 pb-4">
              <h3 className="text-lg font-bold font-heading text-gold-400">Consultation Overview</h3>
              <button onClick={() => setSelectedConsultation(null)} className="text-gray-400 hover:text-white text-xl">
                &times;
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <span className="text-gray-400 block uppercase font-accent">Client Name</span>
                <span className="text-base font-bold text-white">{selectedConsultation.name}</span>
              </div>
              <div>
                <span className="text-gray-400 block uppercase font-accent">Email</span>
                <span className="text-gray-200">{selectedConsultation.email}</span>
              </div>
              <div>
                <span className="text-gray-400 block uppercase font-accent">Phone</span>
                <span className="text-gray-200">{selectedConsultation.phone}</span>
              </div>
              <div>
                <span className="text-gray-400 block uppercase font-accent">Company</span>
                <span className="text-gray-200">{selectedConsultation.company}</span>
              </div>
              <div>
                <span className="text-gray-400 block uppercase font-accent">Requested Service</span>
                <span className="text-gold-400 font-bold">{selectedConsultation.service}</span>
              </div>
              <div>
                <span className="text-gray-400 block uppercase font-accent">Preferred Contact Method</span>
                <span className="text-gray-200">{selectedConsultation.preferredContactMethod}</span>
              </div>
            </div>

            <div className="border-t border-white/10 pt-4">
              <label className="block text-xs font-accent uppercase text-gold-400 font-bold mb-2">Update Status</label>
              <div className="grid grid-cols-2 gap-2">
                {['pending', 'scheduled', 'completed', 'cancelled'].map((st) => (
                  <button
                    key={st}
                    onClick={() => handleStatusUpdate(selectedConsultation._id, st)}
                    className={`p-2 rounded-xl border text-xs font-bold capitalize transition-all ${
                      selectedConsultation.status === st
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
