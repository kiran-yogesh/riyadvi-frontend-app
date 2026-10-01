import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import CTASection from '../components/common/CTASection';
import apiClient from '../api/apiClient';
import { Search, Clock, ArrowRight, BookOpen } from 'lucide-react';

export default function BlogPage() {
  const [blogs, setBlogs] = useState([]);
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  useEffect(() => {
    apiClient.get('/blog').then(res => setBlogs(res.data.data || [])).catch(() => {});
  }, []);

  const categories = ['All', 'Engineering & 3D', 'Architecture', 'UI/UX Design'];

  const filteredBlogs = blogs.filter(b => {
    const matchesCategory = selectedCategory === 'All' || b.category === selectedCategory;
    const matchesSearch = b.title.toLowerCase().includes(search.toLowerCase()) || b.excerpt.toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const featured = blogs.find(b => b.isFeatured) || blogs[0];

  return (
    <div className="min-h-screen bg-obsidian-950 text-white pt-28 pb-16">
      <div className="container mx-auto px-6">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-accent uppercase tracking-widest text-gold-400 font-bold px-3 py-1 rounded-full bg-gold-500/10 border border-gold-500/30">
            Insights & Engineering Knowledge Hub
          </span>
          <h1 className="text-4xl md:text-6xl font-extrabold text-white mt-4 font-heading">
            Riyadvi <span className="gold-gradient-text">Tech Blog</span>
          </h1>
          <p className="text-gray-400 mt-4 text-base leading-relaxed">
            Architectural breakdowns, WebGL optimization guides, and full-stack software insights.
          </p>
        </div>

        {/* Featured Article Banner */}
        {featured && (
          <Link 
            to={`/blog/${featured.slug}`}
            className="block glass-panel rounded-3xl overflow-hidden mb-16 border border-gold-500/40 hover:border-gold-400 transition-all group"
          >
            <div className="grid md:grid-cols-2 gap-8 items-center p-6 md:p-8">
              <div className="h-64 md:h-80 rounded-2xl overflow-hidden">
                <img 
                  src={featured.coverImage} 
                  alt={featured.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div>
                <span className="text-xs font-bold font-accent bg-gold-500 text-black px-3 py-1 rounded-full inline-block mb-4">
                  Featured Article • {featured.category}
                </span>
                <h2 className="text-2xl md:text-4xl font-bold font-heading text-white group-hover:text-gold-400 transition-colors mb-4">
                  {featured.title}
                </h2>
                <p className="text-sm text-gray-300 mb-6 leading-relaxed">
                  {featured.excerpt}
                </p>
                <div className="flex items-center gap-4 text-xs text-gray-400">
                  <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5 text-gold-400" /> {featured.readTimeMinutes} min read</span>
                  <span>By {featured.author?.name}</span>
                </div>
              </div>
            </div>
          </Link>
        )}

        {/* Search & Category Filter */}
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-12">
          <div className="flex flex-wrap gap-2">
            {categories.map((cat, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                  selectedCategory === cat 
                    ? 'gold-gradient-bg text-black shadow-gold-glow font-bold' 
                    : 'glass-panel text-gray-300 hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
            <input
              type="text"
              placeholder="Search articles..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full bg-black/50 border border-white/10 rounded-xl pl-9 pr-4 py-2 text-xs text-white focus:border-gold-500 outline-none"
            />
          </div>
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {filteredBlogs.map((b, idx) => (
            <Link key={idx} to={`/blog/${b.slug}`} className="glass-card rounded-2xl overflow-hidden group block">
              <div className="h-48 overflow-hidden">
                <img src={b.coverImage} alt={b.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
              </div>
              <div className="p-6">
                <span className="text-[10px] font-accent uppercase text-gold-400 font-bold block mb-2">{b.category}</span>
                <h3 className="text-lg font-bold text-white font-heading group-hover:text-gold-400 transition-colors mb-2 line-clamp-2">{b.title}</h3>
                <p className="text-xs text-gray-400 leading-relaxed mb-4 line-clamp-2">{b.excerpt}</p>
                <div className="flex items-center justify-between text-xs text-gray-500 pt-3 border-t border-white/10">
                  <span className="flex items-center gap-1"><Clock className="w-3 h-3 text-gold-400" /> {b.readTimeMinutes} min</span>
                  <span className="text-gold-400 font-semibold flex items-center gap-1">Read <ArrowRight className="w-3 h-3" /></span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* CTA */}
        <CTASection />

      </div>
    </div>
  );
}
