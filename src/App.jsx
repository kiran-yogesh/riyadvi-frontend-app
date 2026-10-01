import React, { useState } from 'react';
import { BrowserRouter, useLocation } from 'react-router-dom';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import ScrollToTop from './components/common/ScrollToTop';
import CustomCursor from './components/common/CustomCursor';
import InitialLoader from './components/common/InitialLoader';
import { AdminAuthProvider } from './context/AdminAuthContext';
import useLenis from './hooks/useLenis';
import AppRoutes from './routes/AppRoutes';

function MainLayout() {
  useLenis();
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  return (
    <div className="flex flex-col min-h-screen bg-obsidian-950 text-white selection:bg-gold-500 selection:text-black">
      <CustomCursor />
      <ScrollToTop />
      {!isAdminRoute && <Navbar />}
      <main className="flex-grow">
        <AppRoutes />
      </main>
      {!isAdminRoute && <Footer />}
    </div>
  );
}

export default function App() {
  const [initialLoading, setInitialLoading] = useState(true);

  return (
    <AdminAuthProvider>
      <BrowserRouter>
        {initialLoading && <InitialLoader onComplete={() => setInitialLoading(false)} />}
        <MainLayout />
      </BrowserRouter>
    </AdminAuthProvider>
  );
}
