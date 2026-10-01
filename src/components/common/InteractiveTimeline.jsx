import React from 'react';
import TimelineGlobeCanvas from '../../three/canvases/TimelineGlobeCanvas';
import { Award, Zap, Users, CheckCircle2 } from 'lucide-react';

const MILESTONES = [
  {
    year: '2021',
    title: 'Company Foundation',
    description: 'Established Riyadvi Software Technologies as a specialized software solution agency delivering custom React & Node systems.'
  },
  {
    year: '2023',
    title: 'Enterprise & IoT Expansion',
    description: 'Expanded capabilities into IoT smart water systems (Puratap), luxury e-commerce (Wanaromah), and enterprise franchise ERPs (Studio11).'
  },
  {
    year: '2026',
    title: '3D WebGL & AI Integration',
    description: 'Pioneered WebGL spatial experiences, 3D product visualizers, and AI NLP integrations (Laxmi Astro AI).'
  }
];

export default function InteractiveTimeline() {
  return (
    <section className="py-24 bg-obsidian-950 relative">
      <div className="container mx-auto px-6">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Column: Interactive 3D Globe */}
          <div>
            <span className="text-xs font-accent uppercase tracking-widest text-gold-400 font-bold px-3 py-1 rounded-full bg-gold-500/10 border border-gold-500/30">
              Why Riyadvi
            </span>
            <h2 className="text-3xl md:text-5xl font-extrabold text-white mt-4 font-heading leading-tight">
              A Legacy of Technology Innovation <span className="gold-gradient-text">Since 2021</span>
            </h2>
            <p className="text-gray-400 mt-4 text-base leading-relaxed mb-8">
              We go beyond software vendor delivery. We are your dedicated Technology & Digital Solutions Partner for end-to-end strategy, 3D design, engineering, and scaling.
            </p>

            <TimelineGlobeCanvas />
          </div>

          {/* Right Column: Timeline Cards */}
          <div className="space-y-6">
            {MILESTONES.map((m, idx) => (
              <div 
                key={idx}
                className="glass-panel p-6 rounded-2xl border-l-4 border-gold-500 hover:border-gold-400 transition-all group"
              >
                <div className="flex items-center gap-3 mb-2">
                  <span className="px-3 py-1 text-xs font-bold font-accent bg-gold-500 text-black rounded-lg">
                    {m.year}
                  </span>
                  <h3 className="text-lg font-bold text-white font-heading group-hover:text-gold-400 transition-colors">
                    {m.title}
                  </h3>
                </div>
                <p className="text-sm text-gray-400 leading-relaxed pl-1">
                  {m.description}
                </p>
              </div>
            ))}

            <div className="p-6 rounded-2xl bg-gold-500/10 border border-gold-500/30 flex items-center justify-between">
              <div>
                <h4 className="text-white font-bold text-base">Ready for Digital Transformation?</h4>
                <p className="text-xs text-gray-400">Get a free architecture consultation with our lead team.</p>
              </div>
              <CheckCircle2 className="w-8 h-8 text-gold-400 shrink-0" />
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
