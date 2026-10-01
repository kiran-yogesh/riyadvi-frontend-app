import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import HeroCanvas from '../three/canvases/HeroCanvas';
import DigitalTransformation from '../components/common/DigitalTransformation';
import ServiceCanvasFactory from '../three/canvases/ServiceCanvasFactory';
import TechEcosystemCanvas from '../three/canvases/TechEcosystemCanvas';
import InteractiveTimeline from '../components/common/InteractiveTimeline';
import CTASection from '../components/common/CTASection';
import apiClient from '../api/apiClient';
import { ArrowRight, CheckCircle2, Star, Trophy, Users, Zap, ShieldCheck } from 'lucide-react';

export default function HomePage() {
  const [services, setServices] = useState([]);
  const [portfolio, setPortfolio] = useState([]);

  useEffect(() => {
    apiClient.get('/services').then(res => setServices(res.data.data || [])).catch(() => {});
    apiClient.get('/portfolio').then(res => setPortfolio(res.data.data || [])).catch(() => {});
  }, []);

  return (
    <div className="min-h-screen bg-obsidian-950 text-white overflow-hidden">
      
      {/* HERO SECTION */}
      <section className="relative min-h-screen flex items-center justify-center pt-24 pb-16 px-6 overflow-hidden">
        {/* 3D WebGL Background Canvas */}
        <HeroCanvas />

        <div className="container mx-auto relative z-10 text-center max-w-4xl">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-gold-500/30 backdrop-blur-md mb-6 shadow-gold-glow">
            <span className="w-2 h-2 rounded-full bg-gold-400 animate-pulse" />
            <span className="text-xs font-accent font-semibold uppercase tracking-wider text-gold-300">
              Technology & Digital Solutions Partner
            </span>
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold font-heading leading-tight tracking-tight text-white mb-6">
            Custom Software & Digital Solutions to <span className="gold-gradient-text">Grow Your Business</span>
          </h1>

          <p className="text-lg md:text-xl text-gray-300 font-sans max-w-2xl mx-auto mb-10 leading-relaxed">
            Web & App Development, UI/UX Design, and Business Strategy – all tailored to your needs.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/contact"
              className="w-full sm:w-auto px-8 py-4 rounded-xl gold-gradient-bg text-black font-bold text-base shadow-gold-glow hover:scale-105 transition-all flex items-center justify-center gap-2"
            >
              Book a Free Consultation <ArrowRight className="w-5 h-5" />
            </Link>

            <Link
              to="/services"
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-white/5 text-white font-semibold text-base border border-white/10 hover:border-gold-500/50 hover:bg-gold-500/10 transition-all flex items-center justify-center gap-2"
            >
              Explore Our Solutions
            </Link>
          </div>

          {/* Key Metrics Strip */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 pt-10 border-t border-white/10">
            <div>
              <span className="text-3xl font-extrabold font-heading text-gold-400">100+</span>
              <span className="block text-xs text-gray-400 uppercase tracking-wider font-accent mt-1">Projects Delivered</span>
            </div>
            <div>
              <span className="text-3xl font-extrabold font-heading text-gold-400">99.8%</span>
              <span className="block text-xs text-gray-400 uppercase tracking-wider font-accent mt-1">Uptime Reliability</span>
            </div>
            <div>
              <span className="text-3xl font-extrabold font-heading text-gold-400">Since 2021</span>
              <span className="block text-xs text-gray-400 uppercase tracking-wider font-accent mt-1">Track Record</span>
            </div>
            <div>
              <span className="text-3xl font-extrabold font-heading text-gold-400">4.9/5</span>
              <span className="block text-xs text-gray-400 uppercase tracking-wider font-accent mt-1">Client Rating</span>
            </div>
          </div>

        </div>
      </section>

      {/* DIGITAL TRANSFORMATION SECTION */}
      <DigitalTransformation />

      {/* 6 CORE SERVICES SECTION */}
      <section className="py-24 bg-obsidian-950 relative">
        <div className="container mx-auto px-6">
          
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div>
              <span className="text-xs font-accent uppercase tracking-widest text-gold-400 font-bold px-3 py-1 rounded-full bg-gold-500/10 border border-gold-500/30">
                Core Capabilities
              </span>
              <h2 className="text-3xl md:text-5xl font-extrabold text-white mt-4 font-heading">
                Interactive Engineering Solutions
              </h2>
            </div>
            <Link to="/services" className="text-sm font-bold text-gold-400 hover:text-gold-300 flex items-center gap-1">
              View All 6 Services <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, idx) => (
              <div key={idx} className="glass-card rounded-2xl p-6 flex flex-col justify-between group">
                <div>
                  <ServiceCanvasFactory sceneType={service.sceneType} />
                  <h3 className="text-xl font-bold text-white mb-2 font-heading group-hover:text-gold-400 transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-sm text-gray-400 leading-relaxed mb-6">
                    {service.tagline}
                  </p>
                </div>
                <Link
                  to={`/services/${service.slug}`}
                  className="w-full py-2.5 rounded-xl border border-white/10 text-xs font-bold text-center text-gray-200 hover:bg-gold-500 hover:text-black hover:border-gold-500 transition-all flex items-center justify-center gap-1.5"
                >
                  Explore {service.title} <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 3D TECH ECOSYSTEM SECTION */}
      <section className="py-24 bg-obsidian-900/40 border-y border-white/5 relative">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-xs font-accent uppercase tracking-widest text-gold-400 font-bold px-3 py-1 rounded-full bg-gold-500/10 border border-gold-500/30">
                3D Constellation
              </span>
              <h2 className="text-3xl md:text-5xl font-extrabold text-white mt-4 font-heading leading-tight">
                Our Technology Ecosystem
              </h2>
              <p className="text-gray-400 mt-4 text-base leading-relaxed mb-6">
                We leverage full-stack MERN technologies, WebGL Three.js shaders, and cloud architecture to deliver scalable, high-throughput applications.
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-3 text-sm text-gray-300">
                  <CheckCircle2 className="w-5 h-5 text-gold-400" />
                  <span>React 18 & Node.js Express Microservices</span>
                </li>
                <li className="flex items-center gap-3 text-sm text-gray-300">
                  <CheckCircle2 className="w-5 h-5 text-gold-400" />
                  <span>MongoDB Atlas & Indexed Database Pipelines</span>
                </li>
                <li className="flex items-center gap-3 text-sm text-gray-300">
                  <CheckCircle2 className="w-5 h-5 text-gold-400" />
                  <span>Three.js, React Three Fiber & GSAP Animation</span>
                </li>
              </ul>
            </div>

            {/* Interactive 3D Sphere Canvas */}
            <TechEcosystemCanvas />
          </div>
        </div>
      </section>

      {/* WHY RIYADVI & TIMELINE */}
      <InteractiveTimeline />

      {/* FEATURED PORTFOLIO PREVIEW */}
      <section className="py-24 bg-obsidian-950">
        <div className="container mx-auto px-6">
          
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div>
              <span className="text-xs font-accent uppercase tracking-widest text-gold-400 font-bold px-3 py-1 rounded-full bg-gold-500/10 border border-gold-500/30">
                Proven Track Record
              </span>
              <h2 className="text-3xl md:text-5xl font-extrabold text-white mt-4 font-heading">
                Featured Case Studies
              </h2>
            </div>
            <Link to="/portfolio" className="text-sm font-bold text-gold-400 hover:text-gold-300 flex items-center gap-1">
              View All 10 Projects <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {portfolio.slice(0, 3).map((item, idx) => (
              <Link 
                key={idx} 
                to={`/portfolio/${item.slug}`} 
                className="glass-card rounded-2xl overflow-hidden group block"
              >
                <div className="h-48 overflow-hidden relative">
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
                  <p className="text-xs text-gray-400 mb-4 line-clamp-2">
                    {item.challenge}
                  </p>
                  <div className="flex gap-4 pt-4 border-t border-white/10 text-xs">
                    {item.results && item.results[0] && (
                      <div>
                        <span className="font-bold text-gold-400 text-base">{item.results[0].metric}</span>
                        <span className="block text-gray-500 text-[10px] uppercase">{item.results[0].label}</span>
                      </div>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>

        </div>
      </section>

      {/* GLOBAL CTA */}
      <CTASection />

    </div>
  );
}
