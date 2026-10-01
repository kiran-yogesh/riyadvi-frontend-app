import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Globe, ChevronDown, Menu, X, ArrowRight, ShieldCheck } from 'lucide-react';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesDropdown, setServicesDropdown] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
    setServicesDropdown(false);
  }, [location]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Portfolio', path: '/portfolio' },
    { name: 'About', path: '/about' },
    { name: 'Blog', path: '/blog' },
    { name: 'Careers', path: '/careers' },
    { name: 'Contact', path: '/contact' },
  ];

  const serviceLinks = [
    { name: 'Web Development', path: '/services/web-development' },
    { name: 'App Development', path: '/services/app-development' },
    { name: 'Digital Marketing', path: '/services/digital-marketing' },
    { name: 'AR / VR Solutions', path: '/services/ar-vr' },
    { name: '3D Modeling', path: '/services/3d-modeling' },
    { name: 'UI/UX Design', path: '/services/ui-ux-design' },
  ];

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? 'bg-obsidian-950/85 backdrop-blur-xl border-b border-white/10 py-3 shadow-glass' : 'bg-transparent py-5'
    }`}>
      <div className="container mx-auto px-6 flex items-center justify-between">
        
        {/* Brand Logo */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-gold-600 via-gold-500 to-gold-300 p-0.5 shadow-gold-glow group-hover:scale-105 transition-all">
            <div className="w-full h-full bg-obsidian-950 rounded-[10px] flex items-center justify-center">
              <span className="font-heading font-extrabold text-gold-400 text-xl tracking-tighter">R</span>
            </div>
          </div>
          <div>
            <span className="font-heading font-extrabold text-xl tracking-tight text-white group-hover:text-gold-400 transition-colors">
              RIYADVI
            </span>
            <span className="block text-[10px] font-accent uppercase tracking-widest text-gold-500 font-semibold -mt-1">
              Software Technologies
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-8">
          <Link 
            to="/" 
            className={`text-sm font-medium transition-colors ${location.pathname === '/' ? 'text-gold-400 font-semibold' : 'text-gray-300 hover:text-white'}`}
          >
            Home
          </Link>

          {/* Services Dropdown */}
          <div 
            className="relative"
            onMouseEnter={() => setServicesDropdown(true)}
            onMouseLeave={() => setServicesDropdown(false)}
          >
            <Link 
              to="/services" 
              className={`flex items-center gap-1 text-sm font-medium transition-colors ${location.pathname.startsWith('/services') ? 'text-gold-400 font-semibold' : 'text-gray-300 hover:text-white'}`}
            >
              Services <ChevronDown className="w-4 h-4 text-gold-500" />
            </Link>

            {servicesDropdown && (
              <div className="absolute top-full left-0 pt-3 w-64">
                <div className="glass-panel-gold rounded-xl p-2 shadow-gold-glow border border-gold-500/30">
                  <div className="px-3 py-2 text-xs font-accent text-gold-400 uppercase tracking-wider font-semibold border-b border-white/10 mb-1">
                    Core Capabilities
                  </div>
                  {serviceLinks.map((s, idx) => (
                    <Link
                      key={idx}
                      to={s.path}
                      className="block px-3 py-2 rounded-lg text-sm text-gray-200 hover:text-black hover:bg-gold-500 transition-all font-medium"
                    >
                      {s.name}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          {navLinks.slice(1).map((link, idx) => (
            <Link
              key={idx}
              to={link.path}
              className={`text-sm font-medium transition-colors ${location.pathname === link.path ? 'text-gold-400 font-semibold' : 'text-gray-300 hover:text-white'}`}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Right CTA Actions */}
        <div className="hidden lg:flex items-center gap-4">
          <Link
            to="/business-health-checkup"
            className="text-xs font-semibold px-4 py-2.5 rounded-lg border border-gold-500/40 text-gold-400 hover:bg-gold-500/10 transition-all flex items-center gap-1.5"
          >
            <ShieldCheck className="w-4 h-4" /> Health Checkup
          </Link>
          <Link
            to="/contact"
            className="text-xs font-bold px-5 py-2.5 rounded-lg gold-gradient-bg text-black hover:scale-105 shadow-gold-glow transition-all flex items-center gap-1.5"
          >
            Free Consultation <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 text-gray-300 hover:text-gold-400"
          aria-label="Toggle Menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>

      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden glass-panel border-b border-white/10 px-6 py-6 space-y-4">
          <Link to="/" className="block text-base font-semibold text-gold-400">Home</Link>
          <Link to="/services" className="block text-base font-semibold text-gray-200">All Services</Link>
          <div className="pl-4 space-y-2 border-l border-gold-500/30">
            {serviceLinks.map((s, idx) => (
              <Link key={idx} to={s.path} className="block text-xs text-gray-400 hover:text-gold-400">{s.name}</Link>
            ))}
          </div>
          {navLinks.slice(1).map((link, idx) => (
            <Link key={idx} to={link.path} className="block text-base font-medium text-gray-200 hover:text-gold-400">
              {link.name}
            </Link>
          ))}
          <div className="pt-4 flex flex-col gap-3">
            <Link to="/business-health-checkup" className="w-full text-center py-2.5 text-xs font-semibold rounded-lg border border-gold-500/40 text-gold-400">
              Business Health Checkup
            </Link>
            <Link to="/contact" className="w-full text-center py-2.5 text-xs font-bold rounded-lg gold-gradient-bg text-black">
              Book a Free Consultation
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
