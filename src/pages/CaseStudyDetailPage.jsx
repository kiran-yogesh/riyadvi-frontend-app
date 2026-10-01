import React, { useState, useEffect } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import ThreeDViewerModal from '../three/canvases/ThreeDViewerModal';
import Portfolio3DScene from '../components/three/Portfolio3DScene';
import CTASection from '../components/common/CTASection';
import apiClient from '../api/apiClient';
import { ArrowLeft, Box, CheckCircle2, Cpu, ExternalLink, Layers, Trophy } from 'lucide-react';

export default function CaseStudyDetailPage() {
  const { slug } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    setLoading(true);
    apiClient.get(`/portfolio/${slug}`)
      .then(res => {
        setProject(res.data.data);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-obsidian-950 flex items-center justify-center text-gold-400 font-bold">
        Loading Case Study Details...
      </div>
    );
  }

  if (!project) {
    return <Navigate to="/portfolio" replace />;
  }

  return (
    <div className="min-h-screen bg-obsidian-950 text-white pt-28 pb-16">
      <div className="container mx-auto px-6 max-w-5xl">
        
        <Link to="/portfolio" className="inline-flex items-center gap-2 text-xs font-semibold text-gray-400 hover:text-gold-400 mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to Portfolio Case Studies
        </Link>

        {/* Case Study Header */}
        <div className="mb-12">
          <span className="text-xs font-accent uppercase tracking-widest text-gold-400 font-bold px-3 py-1 rounded-full bg-gold-500/10 border border-gold-500/30">
            {project.industry}
          </span>
          <h1 className="text-3xl md:text-5xl font-extrabold text-white mt-4 font-heading leading-tight">
            {project.title}
          </h1>
          <p className="text-gold-400 text-sm font-semibold mt-2">Client: {project.client}</p>
        </div>

        {/* Cover Image & Interactive 3D Trigger */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
          <div className="lg:col-span-7 rounded-3xl overflow-hidden relative border border-white/10 glass-panel shadow-gold-glow">
            <img 
              src={project.coverImage} 
              alt={project.title} 
              className="w-full h-80 md:h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-obsidian-950 via-transparent to-transparent flex items-end p-8 justify-between">
              <div>
                <span className="text-xs text-gold-400 uppercase tracking-widest font-accent font-bold">Architectural Showcase</span>
                <h3 className="text-xl font-bold text-white">{project.title}</h3>
              </div>
              
              <button
                onClick={() => setModalOpen(true)}
                className="px-6 py-3 rounded-xl gold-gradient-bg text-black font-bold text-xs shadow-gold-glow hover:scale-105 transition-all flex items-center gap-2"
              >
                <Box className="w-4 h-4" /> Fullscreen 3D View
              </button>
            </div>
          </div>

          <div className="lg:col-span-5">
            <Portfolio3DScene projectTitle={project.title} modelType={project.model3DType || 'browser'} />
          </div>
        </div>

        {/* Results Highlights Strip */}
        {project.results && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
            {project.results.map((r, idx) => (
              <div key={idx} className="glass-panel p-6 rounded-2xl border border-gold-500/30 flex items-center gap-4">
                <Trophy className="w-10 h-10 text-gold-400 shrink-0" />
                <div>
                  <span className="text-3xl font-extrabold text-gold-400 font-heading block">{r.metric}</span>
                  <span className="text-xs text-gray-300 uppercase tracking-wider font-accent">{r.label}</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Challenge & Solution */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <div className="glass-card p-8 rounded-2xl border border-white/10">
            <h3 className="text-xl font-bold text-red-400 mb-4 font-heading flex items-center gap-2">
              The Client Challenge
            </h3>
            <p className="text-gray-300 text-sm leading-relaxed">{project.challenge}</p>
          </div>

          <div className="glass-card p-8 rounded-2xl border border-gold-500/40">
            <h3 className="text-xl font-bold text-gold-400 mb-4 font-heading flex items-center gap-2">
              <Cpu className="w-5 h-5" /> Riyadvi Architectural Solution
            </h3>
            <p className="text-gray-300 text-sm leading-relaxed">{project.solution}</p>
          </div>
        </div>

        {/* Technologies Used */}
        {project.technologies && (
          <div className="mb-16 glass-panel p-8 rounded-2xl border border-white/10">
            <h3 className="text-lg font-bold text-white mb-4 font-heading flex items-center gap-2">
              <Layers className="w-5 h-5 text-gold-400" /> Technology Stack Implemented
            </h3>
            <div className="flex flex-wrap gap-3">
              {project.technologies.map((t, idx) => (
                <span key={idx} className="px-4 py-2 rounded-xl bg-black/60 border border-gold-500/30 text-xs font-semibold text-gray-200">
                  {t}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* CTA */}
        <CTASection title="Want Similar Results for Your Business?" />

        {/* 3D Model Modal */}
        <ThreeDViewerModal 
          isOpen={modalOpen} 
          onClose={() => setModalOpen(false)} 
          title={project.title} 
          modelType={project.model3DType || 'cube'} 
        />

      </div>
    </div>
  );
}
