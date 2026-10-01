import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import CTASection from '../components/common/CTASection';
import apiClient from '../api/apiClient';
import { ArrowRight, Layers } from 'lucide-react';

export default function PortfolioPage() {
  const [portfolio, setPortfolio] = useState([]);
  const [filter, setFilter] = useState('All');

  useEffect(() => {
    apiClient.get('/portfolio').then(res => setPortfolio(res.data.data || [])).catch(() => {});
  }, []);

  const categories = ['All', 'IoT & CleanTech', 'Luxury Retail & Fragrance', 'Consumer AI & EdTech', 'Healthcare & Telemedicine', 'Real Estate & Construction'];

  const filteredItems = filter === 'All' 
    ? portfolio 
    : portfolio.filter(item => item.industry === filter);

  return (
    <div className="min-h-screen bg-obsidian-950 text-white pt-28 pb-16">
      <div className="container mx-auto px-6">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-accent uppercase tracking-widest text-gold-400 font-bold px-3 py-1 rounded-full bg-gold-500/10 border border-gold-500/30">
            Case Studies & Proof of Concept
          </span>
          <h1 className="text-4xl md:text-6xl font-extrabold text-white mt-4 font-heading">
            Our Portfolio of <span className="gold-gradient-text">Digital Impact</span>
          </h1>
          <p className="text-gray-400 mt-4 text-base leading-relaxed">
            Explore 10 real-world case studies demonstrating our engineering depth across IoT, AI platforms, WebGL 3D retail, and enterprise systems.
          </p>
        </div>

        {/* Filter Bar */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((cat, idx) => (
            <button
              key={idx}
              onClick={() => setFilter(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                filter === cat 
                  ? 'gold-gradient-bg text-black shadow-gold-glow font-bold' 
                  : 'glass-panel text-gray-300 hover:text-white hover:border-gold-500/40'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Portfolio Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {filteredItems.map((item, idx) => (
            <Link 
              key={idx} 
              to={`/portfolio/${item.slug}`} 
              className="glass-card rounded-2xl overflow-hidden group block"
            >
              <div className="h-56 overflow-hidden relative">
                <img 
                  src={item.coverImage} 
                  alt={item.title} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <span className="absolute top-3 left-3 text-xs font-bold font-accent bg-gold-500 text-black px-3 py-1 rounded-full">
                  {item.industry}
                </span>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-white font-heading group-hover:text-gold-400 transition-colors mb-2">
                  {item.title}
                </h3>
                <p className="text-xs text-gray-400 mb-4 line-clamp-2 leading-relaxed">
                  {item.challenge}
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {item.technologies && item.technologies.slice(0, 3).map((t, tIdx) => (
                    <span key={tIdx} className="px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-[10px] text-gray-300">
                      {t}
                    </span>
                  ))}
                </div>
                <div className="pt-4 border-t border-white/10 flex justify-between items-center text-xs text-gold-400 font-semibold">
                  <span>View Full Case Study</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* CTA */}
        <CTASection title="Have a Project Idea?" subtitle="Let us craft a high-yield technical strategy for your business." />

      </div>
    </div>
  );
}
