import React, { useState } from 'react';
import { Target, Lightbulb, Compass, Code, Rocket, TrendingUp } from 'lucide-react';
import DigitalTransformationScene from '../three/DigitalTransformationScene';

const STEPS = [
  {
    icon: Target,
    title: '1. Business Challenge',
    subtitle: 'Audit & Pain Points',
    description: 'We diagnose legacy operational bottlenecks, market competition, and UX inefficiencies.'
  },
  {
    icon: Compass,
    title: '2. Strategy',
    subtitle: 'Architectural Blueprint',
    description: 'Creating high-yield tech roadmaps, microservice choices, and conversion funnel strategies.'
  },
  {
    icon: Lightbulb,
    title: '3. Design',
    subtitle: 'Human-Centered UI/UX',
    description: 'Drafting futuristic wireframes, design tokens, and WebGL micro-interactions.'
  },
  {
    icon: Code,
    title: '4. Technology',
    subtitle: 'Full-Stack Engineering',
    description: 'Writing high-throughput Node.js microservices, React frontends, and custom 3D models.'
  },
  {
    icon: Rocket,
    title: '5. Launch',
    subtitle: 'DevOps & Deployment',
    description: 'Continuous integration, security vulnerability audits, and sub-second CDN deployment.'
  },
  {
    icon: TrendingUp,
    title: '6. Growth',
    subtitle: 'Data-Driven Scaling',
    description: 'Ongoing performance optimization, A/B testing, and feature enhancements.'
  }
];

export default function DigitalTransformation() {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <section className="py-24 bg-obsidian-900/60 relative overflow-hidden border-y border-white/5">
      <div className="container mx-auto px-6">
        
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-accent uppercase tracking-widest text-gold-400 font-bold px-3 py-1 rounded-full bg-gold-500/10 border border-gold-500/30">
            Our Proven Methodology
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold text-white mt-4 font-heading">
            The Digital Transformation Journey
          </h2>
          <p className="text-gray-400 mt-4 text-base leading-relaxed">
            How Riyadvi guides enterprise projects from initial strategic blueprint to high-margin revenue scaling.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Interactive 3D Canvas */}
          <div className="lg:col-span-5 sticky top-28">
            <DigitalTransformationScene activeStep={activeStep} />
          </div>

          {/* Right Column: Interactive 6-Step Cards */}
          <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-4">
            {STEPS.map((step, idx) => {
              const IconComp = step.icon;
              const isActive = activeStep === idx;
              return (
                <div
                  key={idx}
                  onClick={() => setActiveStep(idx)}
                  className={`p-6 rounded-2xl cursor-pointer transition-all duration-300 border ${
                    isActive
                      ? 'bg-gold-500/10 border-gold-500 shadow-gold-glow'
                      : 'glass-card border-white/10 hover:border-gold-500/40'
                  }`}
                >
                  <div className="flex items-center justify-between mb-4">
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${
                        isActive
                          ? 'bg-gold-500 text-black font-bold'
                          : 'bg-white/5 text-gold-400 border border-gold-500/20'
                      }`}
                    >
                      <IconComp className="w-5 h-5" />
                    </div>
                    <span
                      className={`text-2xl font-extrabold font-accent ${
                        isActive ? 'text-gold-400' : 'text-white/20'
                      }`}
                    >
                      0{idx + 1}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-white mb-1 font-heading">
                    {step.title}
                  </h3>
                  <p className="text-xs font-semibold text-gold-500 uppercase tracking-wider mb-2">
                    {step.subtitle}
                  </p>
                  <p className="text-xs text-gray-400 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
}
