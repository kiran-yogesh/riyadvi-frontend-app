import React, { useState, useEffect } from 'react';
import { getAdminHealthCheckupsApi, updateHealthCheckupStatusApi } from '../../api/adminApi';
import DataTable from '../../components/admin/DataTable';
import StatusBadge from '../../components/admin/StatusBadge';
import { Eye, FileCheck } from 'lucide-react';

export default function AdminHealthCheckupsPage() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedAudit, setSelectedAudit] = useState(null);

  const fetchAudits = () => {
    setLoading(true);
    getAdminHealthCheckupsApi()
      .then(res => {
        setData(res.data || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  useEffect(() => {
    fetchAudits();
  }, []);

  const handleStatusUpdate = async (id, status) => {
    try {
      await updateHealthCheckupStatusApi(id, status);
      fetchAudits();
      if (selectedAudit && selectedAudit._id === id) {
        setSelectedAudit(prev => ({ ...prev, status }));
      }
    } catch (err) {
      alert('Failed to update audit status.');
    }
  };

  const filteredData = data.filter(item => {
    const name = item.businessInformation?.contactPerson || item.companyName || '';
    const comp = item.businessInformation?.companyName || '';
    return name.toLowerCase().includes(searchTerm.toLowerCase()) || comp.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const columns = [
    {
      header: 'Company / Client',
      accessor: 'companyName',
      render: row => (
        <div>
          <span className="font-semibold text-white block">{row.businessInformation?.companyName || row.companyName || 'N/A'}</span>
          <span className="text-[11px] text-gray-400">{row.businessInformation?.contactPerson}</span>
        </div>
      )
    },
    { header: 'Industry', render: row => <span className="text-gray-300">{row.businessInformation?.industry || 'Technology'}</span> },
    { header: 'Email', render: row => <span className="text-gray-300">{row.businessInformation?.email}</span> },
    { header: 'Phone', render: row => <span className="text-gray-300">{row.businessInformation?.phone}</span> },
    { header: 'Status', render: row => <StatusBadge status={row.status} /> },
    {
      header: 'Actions',
      render: row => (
        <button
          onClick={() => setSelectedAudit(row)}
          className="p-1.5 rounded-lg bg-gold-500/10 border border-gold-500/30 text-gold-400 hover:bg-gold-500 hover:text-black transition-all flex items-center gap-1 text-xs"
        >
          <Eye className="w-4 h-4" /> Inspect Audit
        </button>
      )
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold font-heading text-white">Business Health Checkup Submissions</h2>
        <p className="text-xs text-gray-400">Detailed 5-step technical audits submitted by enterprise prospects.</p>
      </div>

      <DataTable
        columns={columns}
        data={filteredData}
        loading={loading}
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        emptyMessage="No health checkup submissions found."
      />

      {/* Comprehensive Multi-Section Audit Inspect Drawer */}
      {selectedAudit && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/80 backdrop-blur-xs">
          <div className="w-full max-w-2xl bg-obsidian-900 border-l border-white/10 p-6 md:p-8 overflow-y-auto space-y-6">
            <div className="flex justify-between items-center border-b border-white/10 pb-4">
              <div className="flex items-center gap-2">
                <FileCheck className="w-5 h-5 text-gold-400" />
                <h3 className="text-lg font-bold font-heading text-white">Diagnostic Audit Report</h3>
              </div>
              <button onClick={() => setSelectedAudit(null)} className="text-gray-400 hover:text-white text-xl font-bold">
                &times;
              </button>
            </div>

            {/* SECTION 1: Business Information */}
            <div className="glass-panel p-5 rounded-2xl border border-white/10 space-y-2">
              <h4 className="text-xs font-accent uppercase text-gold-400 font-bold border-b border-white/10 pb-2">
                1. Business Information
              </h4>
              <div className="grid grid-cols-2 gap-4 text-xs pt-2">
                <div><span className="text-gray-400 block">Company Name:</span><span className="font-bold text-white">{selectedAudit.businessInformation?.companyName || 'N/A'}</span></div>
                <div><span className="text-gray-400 block">Industry Sector:</span><span className="font-bold text-gold-300">{selectedAudit.businessInformation?.industry || 'Technology'}</span></div>
                <div><span className="text-gray-400 block">Contact Person:</span><span className="text-gray-200">{selectedAudit.businessInformation?.contactPerson}</span></div>
                <div><span className="text-gray-400 block">Email:</span><span className="text-gray-200">{selectedAudit.businessInformation?.email}</span></div>
                <div><span className="text-gray-400 block">Phone:</span><span className="text-gray-200">{selectedAudit.businessInformation?.phone}</span></div>
              </div>
            </div>

            {/* SECTION 2: Website & Digital Presence */}
            <div className="glass-panel p-5 rounded-2xl border border-white/10 space-y-2">
              <h4 className="text-xs font-accent uppercase text-gold-400 font-bold border-b border-white/10 pb-2">
                2. Website & Digital Presence
              </h4>
              <div className="text-xs pt-2">
                <span className="text-gray-400 block">Website URL:</span>
                <span className="font-bold text-blue-400">{selectedAudit.websiteDigitalPresence?.websiteUrl || 'Not provided'}</span>
              </div>
            </div>

            {/* SECTION 3: Marketing Bottlenecks */}
            <div className="glass-panel p-5 rounded-2xl border border-white/10 space-y-2">
              <h4 className="text-xs font-accent uppercase text-gold-400 font-bold border-b border-white/10 pb-2">
                3. Marketing Challenges Selected
              </h4>
              <div className="flex flex-wrap gap-2 pt-2">
                {selectedAudit.marketing?.marketingChallenges?.map((c, i) => (
                  <span key={i} className="px-3 py-1 bg-red-500/20 border border-red-500/30 text-red-300 rounded-lg text-xs font-semibold">
                    {c}
                  </span>
                )) || <span className="text-xs text-gray-500">None selected</span>}
              </div>
            </div>

            {/* SECTION 4: Technology Infrastructure */}
            <div className="glass-panel p-5 rounded-2xl border border-white/10 space-y-2">
              <h4 className="text-xs font-accent uppercase text-gold-400 font-bold border-b border-white/10 pb-2">
                4. Current Tech Stack Components
              </h4>
              <div className="flex flex-wrap gap-2 pt-2">
                {selectedAudit.technology?.techStackCurrent?.map((t, i) => (
                  <span key={i} className="px-3 py-1 bg-gold-500/20 border border-gold-500/30 text-gold-300 rounded-lg text-xs font-semibold">
                    {t}
                  </span>
                )) || <span className="text-xs text-gray-500">None selected</span>}
              </div>
            </div>

            {/* SECTION 5: Strategic Business Challenges & Goal */}
            <div className="glass-panel p-5 rounded-2xl border border-white/10 space-y-2">
              <h4 className="text-xs font-accent uppercase text-gold-400 font-bold border-b border-white/10 pb-2">
                5. Primary Strategic Objective
              </h4>
              <p className="text-xs text-gray-200 pt-2 leading-relaxed italic bg-black/50 p-3 rounded-xl border border-white/10">
                "{selectedAudit.businessChallenges?.primaryGoal || 'No goal statement provided.'}"
              </p>
            </div>

            {/* Status Update Controls */}
            <div className="border-t border-white/10 pt-4">
              <label className="block text-xs font-accent uppercase text-gold-400 font-bold mb-2">Update Audit Status</label>
              <div className="grid grid-cols-2 gap-2">
                {['new', 'contacted', 'in-progress', 'closed'].map((st) => (
                  <button
                    key={st}
                    onClick={() => handleStatusUpdate(selectedAudit._id, st)}
                    className={`p-2 rounded-xl border text-xs font-bold capitalize transition-all ${
                      selectedAudit.status === st
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
