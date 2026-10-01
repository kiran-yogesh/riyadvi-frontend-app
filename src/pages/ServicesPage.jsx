import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ServiceCanvasFactory from '../three/canvases/ServiceCanvasFactory';
import CTASection from '../components/common/CTASection';
import apiClient from '../api/apiClient';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

export default function ServicesPage() {
  const [services, setServices] = useState([]);

  useEffect(() => {
    apiClient.get('/services').then(res => setServices(res.data.data || [])).catch(() => {});
  }, []);

  return (
    <div className="min-h-screen bg-obsidian-950 text-white pt-28 pb-16">
      <div className="container mx-auto px-6">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-accent uppercase tracking-widest text-gold-400 font-bold px-3 py-1 rounded-full bg-gold-500/10 border border-gold-500/30">
            End-to-End Capabilities
          </span>
          <h1 className="text-4xl md:text-6xl font-extrabold text-white mt-4 font-heading">
            Our 6 Core <span className="gold-gradient-text">Software & Digital Solutions</span>
          </h1>
          <p className="text-gray-400 mt-4 text-base leading-relaxed">
            From MERN web apps to spatial AR/VR and data-driven marketing, discover how our interactive engineering powers business growth.
          </p>
        </div>

        {/* 6 Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {services.map((s, idx) => (
            <div key={idx} className="glass-card rounded-2xl p-6 flex flex-col justify-between group">
              <div>
                <ServiceCanvasFactory sceneType={s.sceneType} />
                <h3 className="text-2xl font-bold text-white mb-2 font-heading group-hover:text-gold-400 transition-colors">
                  {s.title}
                </h3>
                <p className="text-sm text-gray-400 leading-relaxed mb-6">
                  {s.tagline}
                </p>
                <div className="space-y-2 mb-6 border-t border-white/10 pt-4">
                  {s.keyFeatures && s.keyFeatures.slice(0, 2).map((kf, fIdx) => (
                    <div key={fIdx} className="flex items-center gap-2 text-xs text-gray-300">
                      <CheckCircle2 className="w-4 h-4 text-gold-400 shrink-0" />
                      <span>{kf.title}</span>
                    </div>
                  ))}
                </div>
              </div>

              <Link
                to={`/services/${s.slug}`}
                className="w-full py-3 rounded-xl gold-gradient-bg text-black font-bold text-xs text-center shadow-gold-glow hover:scale-[1.02] transition-all flex items-center justify-center gap-1.5"
              >
                Learn More About {s.title} <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          ))}
        </div>

        {/* CTA */}
        <CTASection title="Need a Custom Software Solution?" subtitle="Speak directly with our solution architecture team to blueprint your project." />

      </div>
    </div>
  );
}
