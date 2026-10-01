import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, ArrowUpRight, Github, Linkedin, Twitter } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-obsidian-900 border-t border-white/10 pt-16 pb-8 text-gray-400">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-white/10">
          
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gold-500 p-0.5 shadow-gold-glow">
                <div className="w-full h-full bg-obsidian-950 rounded-[10px] flex items-center justify-center">
                  <span className="font-heading font-extrabold text-gold-400 text-xl">R</span>
                </div>
              </div>
              <span className="font-heading font-extrabold text-2xl tracking-tight text-white">RIYADVI</span>
            </Link>
            <p className="text-sm leading-relaxed max-w-sm text-gray-400">
              Riyadvi Software Technologies is a premier Technology & Digital Solutions Partner delivering full-stack engineering, 3D WebGL experiences, and business transformation.
            </p>
            <div className="flex gap-4 pt-2">
              <a href="#" className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-gray-300 hover:text-gold-400 hover:border-gold-500/50 transition-all">
                <Linkedin className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-gray-300 hover:text-gold-400 hover:border-gold-500/50 transition-all">
                <Github className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-gray-300 hover:text-gold-400 hover:border-gold-500/50 transition-all">
                <Twitter className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold font-heading mb-4 text-sm uppercase tracking-wider text-gold-400">Services</h4>
            <ul className="space-y-2.5 text-sm">
              <li><Link to="/services/web-development" className="hover:text-gold-400 transition-colors">Web Development</Link></li>
              <li><Link to="/services/app-development" className="hover:text-gold-400 transition-colors">App Development</Link></li>
              <li><Link to="/services/digital-marketing" className="hover:text-gold-400 transition-colors">Digital Marketing</Link></li>
              <li><Link to="/services/ar-vr" className="hover:text-gold-400 transition-colors">AR / VR Solutions</Link></li>
              <li><Link to="/services/3d-modeling" className="hover:text-gold-400 transition-colors">3D Modeling</Link></li>
              <li><Link to="/services/ui-ux-design" className="hover:text-gold-400 transition-colors">UI / UX Design</Link></li>
            </ul>
          </div>

          {/* Special Tools */}
          <div>
            <h4 className="text-white font-semibold font-heading mb-4 text-sm uppercase tracking-wider text-gold-400">Lead Funnels</h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/business-health-checkup" className="hover:text-gold-400 transition-colors flex items-center gap-1 text-gold-300 font-medium">
                  Business Health Checkup <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              </li>
              <li>
                <Link to="/software-project-planning-guide" className="hover:text-gold-400 transition-colors flex items-center gap-1 text-gold-300 font-medium">
                  Project Planning Guide <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              </li>
              <li><Link to="/portfolio" className="hover:text-gold-400 transition-colors">Case Studies</Link></li>
              <li><Link to="/careers" className="hover:text-gold-400 transition-colors">Careers</Link></li>
              <li><Link to="/blog" className="hover:text-gold-400 transition-colors">Tech Blog</Link></li>
              <li><Link to="/admin/login" className="hover:text-gold-400 transition-colors text-xs text-gray-500">Admin Login</Link></li>
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h4 className="text-white font-semibold font-heading mb-4 text-sm uppercase tracking-wider text-gold-400">Contact</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-gold-500 shrink-0 mt-0.5" />
                <span>Riyadvi Tech Park, Mylapore, Chennai, India</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-gold-500 shrink-0" />
                <span>contact@riyadvisoftwaretechnologies.com</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-gold-500 shrink-0" />
                <span>+91 98765 43210</span>
              </li>
            </ul>
          </div>

        </div>

        <div className="pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500 gap-4">
          <p>© {new Date().getFullYear()} Riyadvi Software Technologies. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-gray-300">Privacy Policy</a>
            <a href="#" className="hover:text-gray-300">Terms of Service</a>
            <a href="#" className="hover:text-gray-300">Security Architecture</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
