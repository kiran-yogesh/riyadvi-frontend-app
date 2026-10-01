import React from 'react';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import ScrollToTop from '../components/common/ScrollToTop';

export default function MainLayout({ children }) {
  return (
    <div className="flex flex-col min-h-screen bg-obsidian-950 text-white selection:bg-gold-500 selection:text-black">
      <ScrollToTop />
      <Navbar />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
    </div>
  );
}
