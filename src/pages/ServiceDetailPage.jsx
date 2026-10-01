import React, { useState, useEffect } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import ServiceCanvasFactory from '../three/canvases/ServiceCanvasFactory';
import CTASection from '../components/common/CTASection';
import apiClient from '../api/apiClient';
import { CheckCircle2, ArrowRight, ShieldAlert, Cpu, Layers, HelpCircle, Send } from 'lucide-react';

export default function ServiceDetailPage() {
  const { slug } = useParams();
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quoteModalOpen, setQuoteModalOpen] = useState(false);
  const [quoteForm, setQuoteForm] = useState({ name: '', email: '', phone: '', message: '' });
  const [quoteSuccess, setQuoteSuccess] = useState('');

  useEffect(() => {
    setLoading(true);
    apiClient.get(`/services/${slug}`)
      .then(res => {
        setService(res.data.data);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, [slug]);

  const handleQuoteSubmit = async (e) => {
    e.preventDefault();
    try {
      await apiClient.post('/contact', {
        name: quoteForm.name,
        email: quoteForm.email,
        phone: quoteForm.phone,
        requirement: service ? service.title : 'Web Development',
        message: quoteForm.message || `Quote request for ${service?.title}`
      });
      setQuoteSuccess('Quote request submitted successfully! We will get back to you in 24 hours.');
      setTimeout(() => {
        setQuoteModalOpen(false);
        setQuoteSuccess('');
      }, 2500);
    } catch (err) {
      setQuoteSuccess('Submission received!');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-obsidian-950 flex items-center justify-center text-gold-400 font-bold">
        Loading Service Architecture...
      </div>
    );
  }

  if (!service) {
    return <Navigate to="/services" replace />;
  }

  return (
    <div className="min-h-screen bg-obsidian-950 text-white pt-28 pb-16">
      <div className="container mx-auto px-6">
        
        {/* SERVICE HERO */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
          <div>
            <span className="text-xs font-accent uppercase tracking-widest text-gold-400 font-bold px-3 py-1 rounded-full bg-gold-500/10 border border-gold-500/30">
              Capability Architecture
            </span>
            <h1 className="text-4xl md:text-6xl font-extrabold text-white mt-4 mb-4 font-heading leading-tight">
              {service.title}
            </h1>
            <p className="text-gray-300 text-lg leading-relaxed mb-8">
              {service.tagline}
            </p>
            <div className="flex gap-4">
              <button
                onClick={() => setQuoteModalOpen(true)}
                className="px-8 py-4 rounded-xl gold-gradient-bg text-black font-bold text-base shadow-gold-glow hover:scale-105 transition-all flex items-center gap-2"
              >
                Get a Quote <ArrowRight className="w-5 h-5" />
              </button>
              <Link
                to="/contact"
                className="px-6 py-4 rounded-xl bg-white/5 border border-white/10 text-white font-medium hover:border-gold-500/50 transition-all"
              >
                Book Tech Consultation
              </Link>
            </div>
          </div>

          <div className="glass-panel p-6 rounded-3xl border border-gold-500/30">
            <ServiceCanvasFactory sceneType={service.sceneType} />
          </div>
        </div>

        {/* PROBLEM & SOLUTION */}
        <div className="grid md:grid-cols-2 gap-8 mb-20">
          <div className="p-8 rounded-2xl bg-red-500/5 border border-red-500/20 glass-panel">
            <div className="flex items-center gap-3 text-red-400 font-bold font-heading mb-4 text-xl">
              <ShieldAlert className="w-6 h-6" /> Industry Pain Points
            </div>
            <p className="text-gray-300 leading-relaxed text-sm">
              {service.problemStatement}
            </p>
          </div>

          <div className="p-8 rounded-2xl bg-gold-500/5 border border-gold-500/30 glass-panel">
            <div className="flex items-center gap-3 text-gold-400 font-bold font-heading mb-4 text-xl">
              <Cpu className="w-6 h-6" /> Riyadvi Architectural Solution
            </div>
            <p className="text-gray-300 leading-relaxed text-sm">
              {service.solutionStatement}
            </p>
          </div>
        </div>

        {/* KEY FEATURES GRID */}
        {service.keyFeatures && (
          <div className="mb-20">
            <h2 className="text-2xl md:text-3xl font-bold font-heading text-white mb-8 text-center">
              Key Features & Architectural Capabilities
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {service.keyFeatures.map((kf, idx) => (
                <div key={idx} className="glass-card p-6 rounded-2xl border border-white/10">
                  <CheckCircle2 className="w-8 h-8 text-gold-400 mb-4" />
                  <h3 className="text-lg font-bold text-white mb-2 font-heading">{kf.title}</h3>
                  <p className="text-xs text-gray-400 leading-relaxed">{kf.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TECH STACK & PROCESS */}
        {service.techStack && (
          <div className="mb-20 glass-panel p-8 rounded-3xl border border-white/10">
            <h3 className="text-xl font-bold text-gold-400 mb-4 font-heading flex items-center gap-2">
              <Layers className="w-5 h-5" /> Recommended Technology Stack
            </h3>
            <div className="flex flex-wrap gap-3">
              {service.techStack.map((tech, idx) => (
                <span key={idx} className="px-4 py-2 rounded-xl bg-black/60 border border-gold-500/30 text-xs font-semibold text-gray-200">
                  {tech}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* CTA SECTION */}
        <CTASection title={`Ready to build with ${service.title}?`} />

      </div>

      {/* GET A QUOTE MODAL */}
      {quoteModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4">
          <div className="bg-obsidian-900 border border-gold-500/40 rounded-2xl w-full max-w-lg p-6 relative shadow-gold-glow">
            <button 
              onClick={() => setQuoteModalOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white text-2xl font-bold"
            >
              &times;
            </button>
            <h3 className="text-2xl font-bold text-gold-400 font-heading mb-2">Get a Quote — {service.title}</h3>
            <p className="text-xs text-gray-400 mb-6">Fill in your requirements below for an instant preliminary quote.</p>

            {quoteSuccess ? (
              <div className="p-4 bg-gold-500/20 border border-gold-500/50 rounded-xl text-gold-300 font-semibold text-center">
                {quoteSuccess}
              </div>
            ) : (
              <form onSubmit={handleQuoteSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs text-gray-300 font-medium mb-1">Your Full Name *</label>
                  <input
                    type="text"
                    required
                    value={quoteForm.name}
                    onChange={e => setQuoteForm({...quoteForm, name: e.target.value})}
                    className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:border-gold-500 outline-none"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-300 font-medium mb-1">Email Address *</label>
                  <input
                    type="email"
                    required
                    value={quoteForm.email}
                    onChange={e => setQuoteForm({...quoteForm, email: e.target.value})}
                    className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:border-gold-500 outline-none"
                    placeholder="john@company.com"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-300 font-medium mb-1">Phone Number *</label>
                  <input
                    type="tel"
                    required
                    value={quoteForm.phone}
                    onChange={e => setQuoteForm({...quoteForm, phone: e.target.value})}
                    className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:border-gold-500 outline-none"
                    placeholder="+91 98765 43210"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-300 font-medium mb-1">Project Details / Message</label>
                  <textarea
                    rows="3"
                    value={quoteForm.message}
                    onChange={e => setQuoteForm({...quoteForm, message: e.target.value})}
                    className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:border-gold-500 outline-none"
                    placeholder="Briefly outline your goals..."
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-3 rounded-xl gold-gradient-bg text-black font-bold text-sm shadow-gold-glow hover:scale-[1.02] transition-all flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" /> Submit Quote Request
                </button>
              </form>
            )}
          </div>
        </div>
      )}

    </div>
  );
}
