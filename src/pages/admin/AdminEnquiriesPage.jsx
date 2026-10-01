import React, { useState, useEffect } from 'react';
import { getAdminContactsApi, updateContactStatusApi } from '../../api/adminApi';
import DataTable from '../../components/admin/DataTable';
import StatusBadge from '../../components/admin/StatusBadge';
import { Eye, CheckCircle2 } from 'lucide-react';

export default function AdminEnquiriesPage() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedEnquiry, setSelectedEnquiry] = useState(null);
  const [updatingId, setUpdatingId] = useState(null);

  const fetchContacts = () => {
    setLoading(true);
    getAdminContactsApi()
      .then(res => {
        setData(res.data || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  const handleStatusUpdate = async (id, status) => {
    setUpdatingId(id);
    try {
      await updateContactStatusApi(id, status);
      fetchContacts();
      if (selectedEnquiry && selectedEnquiry._id === id) {
        setSelectedEnquiry(prev => ({ ...prev, status }));
      }
    } catch (err) {
      alert('Failed to update status.');
    } finally {
      setUpdatingId(null);
    }
  };

  const filteredData = data.filter(item =>
    (item.name || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    (item.email || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    (item.requirement || '').toLowerCase().includes(searchTerm.toLowerCase())
  );

  const columns = [
    { header: 'Client Name', accessor: 'name', render: row => <span className="font-semibold text-white">{row.name}</span> },
    { header: 'Email', accessor: 'email', render: row => <span className="text-gray-300">{row.email}</span> },
    { header: 'Phone', accessor: 'phone' },
    { header: 'Company', accessor: 'company' },
    { header: 'Requirement', accessor: 'requirement', render: row => <span className="text-gold-400 font-medium">{row.requirement}</span> },
    { header: 'Status', accessor: 'status', render: row => <StatusBadge status={row.status} /> },
    {
      header: 'Actions',
      render: row => (
        <button
          onClick={() => setSelectedEnquiry(row)}
          className="p-1.5 rounded-lg bg-gold-500/10 border border-gold-500/30 text-gold-400 hover:bg-gold-500 hover:text-black transition-all"
        >
          <Eye className="w-4 h-4" />
        </button>
      )
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-bold font-heading text-white">Contact Enquiries Management</h2>
          <p className="text-xs text-gray-400">View and respond to incoming project enquiries.</p>
        </div>
      </div>

      <DataTable
        columns={columns}
        data={filteredData}
        loading={loading}
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        emptyMessage="No contact enquiries found."
      />

      {/* Detail & Status Drawer */}
      {selectedEnquiry && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/70 backdrop-blur-xs">
          <div className="w-full max-w-lg bg-obsidian-900 border-l border-white/10 p-6 overflow-y-auto space-y-6">
            <div className="flex justify-between items-center border-b border-white/10 pb-4">
              <h3 className="text-lg font-bold font-heading text-gold-400">Enquiry Details</h3>
              <button onClick={() => setSelectedEnquiry(null)} className="text-gray-400 hover:text-white text-xl">
                &times;
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <span className="text-gray-400 block uppercase font-accent">Name</span>
                <span className="text-base font-bold text-white">{selectedEnquiry.name}</span>
              </div>
              <div>
                <span className="text-gray-400 block uppercase font-accent">Email</span>
                <span className="text-gray-200">{selectedEnquiry.email}</span>
              </div>
              <div>
                <span className="text-gray-400 block uppercase font-accent">Phone</span>
                <span className="text-gray-200">{selectedEnquiry.phone}</span>
              </div>
              <div>
                <span className="text-gray-400 block uppercase font-accent">Company</span>
                <span className="text-gray-200">{selectedEnquiry.company}</span>
              </div>
              <div>
                <span className="text-gray-400 block uppercase font-accent">Requirement</span>
                <span className="text-gold-400 font-bold">{selectedEnquiry.requirement}</span>
              </div>
              <div>
                <span className="text-gray-400 block uppercase font-accent">Message</span>
                <p className="p-3 bg-black/60 rounded-xl border border-white/10 text-gray-300 whitespace-pre-wrap">
                  {selectedEnquiry.message}
                </p>
              </div>
            </div>

            <div className="border-t border-white/10 pt-4">
              <label className="block text-xs font-accent uppercase text-gold-400 font-bold mb-2">Update Status</label>
              <div className="grid grid-cols-2 gap-2">
                {['new', 'contacted', 'in-progress', 'closed'].map((st) => (
                  <button
                    key={st}
                    onClick={() => handleStatusUpdate(selectedEnquiry._id, st)}
                    disabled={updatingId === selectedEnquiry._id}
                    className={`p-2 rounded-xl border text-xs font-bold capitalize transition-all ${
                      selectedEnquiry.status === st
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
