import React from 'react';
import TimelineGlobeCanvas from '../three/canvases/TimelineGlobeCanvas';
import InteractiveTimeline from '../components/common/InteractiveTimeline';
import CTASection from '../components/common/CTASection';
import { Target, Compass, Heart, Shield, Award, Users, CheckCircle2 } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-obsidian-950 text-white pt-28 pb-16">
      <div className="container mx-auto px-6">
        
        {/* About Hero */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-accent uppercase tracking-widest text-gold-400 font-bold px-3 py-1 rounded-full bg-gold-500/10 border border-gold-500/30">
            Founded 2021
          </span>
          <h1 className="text-4xl md:text-6xl font-extrabold text-white mt-4 font-heading">
            Engineering the Future of <span className="gold-gradient-text">Digital Technology</span>
          </h1>
          <p className="text-gray-400 mt-4 text-base leading-relaxed">
            Riyadvi Software Technologies is an enterprise technology and digital solutions partner dedicated to accelerating client business growth.
          </p>
        </div>

        {/* Vision & Mission */}
        <div className="grid md:grid-cols-2 gap-8 mb-20">
          <div className="glass-panel p-8 rounded-3xl border border-gold-500/30">
            <Compass className="w-10 h-10 text-gold-400 mb-4" />
            <h3 className="text-2xl font-bold text-white mb-3 font-heading">Our Vision</h3>
            <p className="text-gray-300 text-sm leading-relaxed">
              To be global leaders in digital transformation by fusing high-throughput cloud software engineering with mesmerizing 3D WebGL user experiences.
            </p>
          </div>

          <div className="glass-panel p-8 rounded-3xl border border-gold-500/30">
            <Target className="w-10 h-10 text-gold-400 mb-4" />
            <h3 className="text-2xl font-bold text-white mb-3 font-heading">Our Mission</h3>
            <p className="text-gray-300 text-sm leading-relaxed">
              To empower ambitious companies with scalable MERN stack architectures, robust data pipelines, and captivating design systems that drive measurable ROI.
            </p>
          </div>
        </div>

        {/* Company Core Values */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-white font-heading text-center mb-12">
            Our Architectural Core Values
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="glass-card p-6 rounded-2xl">
              <Shield className="w-8 h-8 text-gold-400 mb-4" />
              <h4 className="text-lg font-bold text-white mb-2 font-heading">Uncompromising Quality</h4>
              <p className="text-xs text-gray-400 leading-relaxed">Sub-second page speeds, clean unit test suites, and strict OWASP security standards.</p>
            </div>
            <div className="glass-card p-6 rounded-2xl">
              <Award className="w-8 h-8 text-gold-400 mb-4" />
              <h4 className="text-lg font-bold text-white mb-2 font-heading">Design Excellence</h4>
              <p className="text-xs text-gray-400 leading-relaxed">We blend 3D graphics, smooth scroll storytelling, and micro-interactions into every product.</p>
            </div>
            <div className="glass-card p-6 rounded-2xl">
              <Users className="w-8 h-8 text-gold-400 mb-4" />
              <h4 className="text-lg font-bold text-white mb-2 font-heading">Long-term Partnership</h4>
              <p className="text-xs text-gray-400 leading-relaxed">We don't hand off code and leave; we scale software alongside your business milestones.</p>
            </div>
          </div>
        </div>

        {/* Interactive Timeline */}
        <InteractiveTimeline />

        {/* CTA */}
        <CTASection />

      </div>
    </div>
  );
}
