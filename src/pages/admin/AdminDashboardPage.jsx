import React, { useState, useEffect } from 'react';
import { getAdminStatsApi, getAllLeadsOverviewApi } from '../../api/adminApi';
import StatusBadge from '../../components/admin/StatusBadge';
import { MessageSquare, Calendar, Activity, FileText, Briefcase, TrendingUp, Users } from 'lucide-react';

export default function AdminDashboardPage() {
  const [stats, setStats] = useState(null);
  const [leads, setLeads] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    Promise.all([
      getAdminStatsApi().catch(() => null),
      getAllLeadsOverviewApi().catch(() => null)
    ]).then(([statsRes, leadsRes]) => {
      if (statsRes?.success) setStats(statsRes.data);
      if (leadsRes?.success) setLeads(leadsRes.leads);
      setLoading(false);
    });
  }, []);

  const STAT_CARDS = [
    { label: 'Total Contact Enquiries', value: stats?.totalEnquiries || 0, icon: MessageSquare, color: 'text-blue-400' },
    { label: 'Consultation Requests', value: stats?.totalConsultations || 0, icon: Calendar, color: 'text-purple-400' },
    { label: 'Health Checkup Audits', value: stats?.totalHealthAudits || 0, icon: Activity, color: 'text-gold-400' },
    { label: 'Lead Magnet Downloads', value: stats?.totalLeadMagnets || 0, icon: FileText, color: 'text-emerald-400' },
    { label: 'Career Applications', value: stats?.totalApplications || 0, icon: Briefcase, color: 'text-indigo-400' },
  ];

  return (
    <div className="space-y-8">
      
      {/* Header Banner */}
      <div className="glass-panel p-6 rounded-3xl border border-gold-500/30 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-accent text-gold-400 uppercase tracking-widest font-bold">Real-Time MongoDB Telemetry</span>
          <h2 className="text-2xl font-bold font-heading text-white mt-1">Executive Dashboard Overview</h2>
          <p className="text-xs text-gray-400">Live counts and submission records from MongoDB database pipelines.</p>
        </div>
        <div className="px-4 py-2 rounded-xl bg-gold-500/10 border border-gold-500/30 text-gold-300 text-xs font-bold font-accent flex items-center gap-2">
          <TrendingUp className="w-4 h-4" /> Total Leads: {stats?.totalLeads || 0}
        </div>
      </div>

      {/* Stat Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
        {STAT_CARDS.map((card, idx) => {
          const IconComp = card.icon;
          return (
            <div key={idx} className="glass-card p-5 rounded-2xl border border-white/10 hover:border-gold-500/40 transition-all">
              <div className="flex items-center justify-between mb-3">
                <div className={`w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center ${card.color}`}>
                  <IconComp className="w-5 h-5" />
                </div>
                <span className="text-2xl font-extrabold font-heading text-white">{loading ? '...' : card.value}</span>
              </div>
              <p className="text-xs text-gray-400 font-accent font-semibold">{card.label}</p>
            </div>
          );
        })}
      </div>

      {/* Recent Contact Enquiries Table */}
      <div className="glass-panel p-6 rounded-3xl border border-white/10">
        <h3 className="text-base font-bold font-heading text-white mb-4 flex items-center gap-2">
          <MessageSquare className="w-4 h-4 text-gold-400" /> Recent Contact Enquiries
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-black/60 text-gray-400 uppercase font-accent border-b border-white/10">
              <tr>
                <th className="px-4 py-3">Client Name</th>
                <th className="px-4 py-3">Email</th>
                <th className="px-4 py-3">Requirement</th>
                <th className="px-4 py-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {leads?.contacts?.slice(0, 5).map((item, idx) => (
                <tr key={idx} className="hover:bg-white/5">
                  <td className="px-4 py-3 font-semibold text-white">{item.name}</td>
                  <td className="px-4 py-3 text-gray-300">{item.email}</td>
                  <td className="px-4 py-3 text-gold-400">{item.requirement}</td>
                  <td className="px-4 py-3"><StatusBadge status={item.status} /></td>
                </tr>
              )) || (
                <tr>
                  <td colSpan={4} className="px-4 py-6 text-center text-gray-500">No contact enquiries available.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
