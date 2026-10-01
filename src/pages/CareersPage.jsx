import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import CTASection from '../components/common/CTASection';
import apiClient from '../api/apiClient';
import { Briefcase, MapPin, ArrowRight, CheckCircle2 } from 'lucide-react';

export default function CareersPage() {
  const [jobs, setJobs] = useState([]);
  const [departmentFilter, setDepartmentFilter] = useState('All');

  useEffect(() => {
    apiClient.get('/jobs').then(res => setJobs(res.data.data || [])).catch(() => {});
  }, []);

  const departments = ['All', 'Engineering', 'Design & Graphics', 'Design'];

  const filteredJobs = departmentFilter === 'All'
    ? jobs
    : jobs.filter(j => j.department === departmentFilter);

  return (
    <div className="min-h-screen bg-obsidian-950 text-white pt-28 pb-16">
      <div className="container mx-auto px-6 max-w-5xl">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-accent uppercase tracking-widest text-gold-400 font-bold px-3 py-1 rounded-full bg-gold-500/10 border border-gold-500/30">
            Join Our Engineering Team
          </span>
          <h1 className="text-4xl md:text-6xl font-extrabold text-white mt-4 font-heading">
            Build the Future at <span className="gold-gradient-text">Riyadvi</span>
          </h1>
          <p className="text-gray-400 mt-4 text-base leading-relaxed">
            We are looking for passionate MERN developers, 3D WebGL creators, and UI/UX designers to craft industry-shaping digital products.
          </p>
        </div>

        {/* Filter Bar */}
        <div className="flex justify-center gap-3 mb-12">
          {departments.map((dep, idx) => (
            <button
              key={idx}
              onClick={() => setDepartmentFilter(dep)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                departmentFilter === dep
                  ? 'gold-gradient-bg text-black shadow-gold-glow font-bold'
                  : 'glass-panel text-gray-300 hover:text-white'
              }`}
            >
              {dep}
            </button>
          ))}
        </div>

        {/* Open Job Listings */}
        <div className="space-y-6 mb-20">
          {filteredJobs.map((job, idx) => (
            <div key={idx} className="glass-panel p-6 md:p-8 rounded-2xl border border-white/10 hover:border-gold-500/40 transition-all flex flex-col md:flex-row md:items-center justify-between gap-6 group">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <span className="px-3 py-1 rounded-full bg-gold-500/10 text-gold-400 text-xs font-bold font-accent border border-gold-500/30">
                    {job.department}
                  </span>
                  <span className="text-xs text-gray-400 font-medium flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-gold-400" /> {job.location}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-white font-heading group-hover:text-gold-400 transition-colors">
                  {job.title}
                </h3>
                <p className="text-xs text-gray-400 mt-1 line-clamp-2">
                  {job.description}
                </p>
              </div>

              <Link
                to={`/careers/${job.slug}`}
                className="px-6 py-3 rounded-xl gold-gradient-bg text-black font-bold text-xs shadow-gold-glow hover:scale-105 transition-all flex items-center gap-1.5 shrink-0 justify-center"
              >
                Apply Now <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          ))}
        </div>

        {/* CTA */}
        <CTASection title="Don't see an exact match?" subtitle="Send your resume for general engineering review at careers@riyadvisoftwaretechnologies.com." />

      </div>
    </div>
  );
}
