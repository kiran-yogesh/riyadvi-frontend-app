import React, { useState, useEffect } from 'react';
import { getAdminLeadMagnetsApi } from '../../api/adminApi';
import DataTable from '../../components/admin/DataTable';
import StatusBadge from '../../components/admin/StatusBadge';
import { Download } from 'lucide-react';

export default function AdminLeadsPage() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    setLoading(true);
    getAdminLeadMagnetsApi()
      .then(res => {
        setData(res.data || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const filteredData = data.filter(item =>
    (item.name || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    (item.email || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    (item.company || '').toLowerCase().includes(searchTerm.toLowerCase())
  );

  const columns = [
    { header: 'Lead Name', accessor: 'name', render: row => <span className="font-semibold text-white">{row.name}</span> },
    { header: 'Company', accessor: 'company', render: row => <span className="text-gray-300">{row.company}</span> },
    { header: 'Email', accessor: 'email', render: row => <span className="text-gray-300">{row.email}</span> },
    { header: 'Phone', accessor: 'phone' },
    { header: 'Resource Requested', accessor: 'resourceName', render: row => <span className="text-gold-400 font-medium">{row.resourceName || 'Planning Guide'}</span> },
    { header: 'Status', accessor: 'status', render: row => <StatusBadge status={row.status || 'access-granted'} /> }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-bold font-heading text-white">Software Planning Guide Leads</h2>
          <p className="text-xs text-gray-400">Leads captured through the Software Project Planning Guide lead magnet.</p>
        </div>
      </div>

      <DataTable
        columns={columns}
        data={filteredData}
        loading={loading}
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        emptyMessage="No lead magnet downloads found."
      />
    </div>
  );
}
