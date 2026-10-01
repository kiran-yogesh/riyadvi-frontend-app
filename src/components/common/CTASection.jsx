import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ShieldCheck, Download } from 'lucide-react';

export default function CTASection({ title, subtitle }) {
  return (
    <section className="py-20 relative overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="glass-panel-gold rounded-3xl p-10 md:p-16 border border-gold-500/40 relative shadow-gold-glow-lg text-center max-w-5xl mx-auto">
          
          <div className="absolute top-0 right-0 w-64 h-64 bg-gold-500/10 rounded-full blur-3xl pointer-events-none" />

          <span className="text-xs font-accent uppercase tracking-widest text-gold-400 font-bold px-4 py-1.5 rounded-full bg-gold-500/10 border border-gold-500/30">
            Technology & Digital Solutions Partner
          </span>

          <h2 className="text-3xl md:text-5xl font-extrabold text-white mt-6 mb-4 font-heading leading-tight">
            {title || 'Ready to Scale Your Digital Vision?'}
          </h2>

          <p className="text-gray-300 text-base md:text-lg max-w-2xl mx-auto mb-10 leading-relaxed">
            {subtitle || 'Book a free technical consultation or take our Business Health Checkup audit to discover your growth bottlenecks.'}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/contact"
              className="w-full sm:w-auto px-8 py-4 rounded-xl gold-gradient-bg text-black font-bold text-base shadow-gold-glow hover:scale-105 transition-all flex items-center justify-center gap-2"
            >
              Book a Free Consultation <ArrowRight className="w-5 h-5" />
            </Link>

            <Link
              to="/business-health-checkup"
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-black/60 text-gold-400 font-semibold text-base border border-gold-500/40 hover:bg-gold-500/10 transition-all flex items-center justify-center gap-2"
            >
              <ShieldCheck className="w-5 h-5" /> Business Health Checkup
            </Link>

            <Link
              to="/software-project-planning-guide"
              className="w-full sm:w-auto px-6 py-4 rounded-xl text-gray-300 font-medium text-sm hover:text-white transition-all flex items-center justify-center gap-1.5"
            >
              <Download className="w-4 h-4 text-gold-500" /> Free Planning Guide
            </Link>
          </div>

        </div>
      </div>
    </section>
  );
}
