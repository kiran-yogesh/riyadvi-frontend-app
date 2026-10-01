import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

// Public Pages
import HomePage from '../pages/HomePage';
import ServicesPage from '../pages/ServicesPage';
import ServiceDetailPage from '../pages/ServiceDetailPage';
import PortfolioPage from '../pages/PortfolioPage';
import CaseStudyDetailPage from '../pages/CaseStudyDetailPage';
import AboutPage from '../pages/AboutPage';
import BlogPage from '../pages/BlogPage';
import BlogArticleDetailPage from '../pages/BlogArticleDetailPage';
import CareersPage from '../pages/CareersPage';
import JobDetailPage from '../pages/JobDetailPage';
import ContactPage from '../pages/ContactPage';
import BusinessHealthCheckupPage from '../pages/BusinessHealthCheckupPage';
import LeadMagnetPage from '../pages/LeadMagnetPage';
import NotFoundPage from '../pages/NotFoundPage';

// Admin Architecture
import ProtectedAdminRoute from './ProtectedAdminRoute';
import AdminLayout from '../layouts/AdminLayout';

// Admin Pages
import AdminLoginPage from '../pages/admin/AdminLoginPage';
import AdminDashboardPage from '../pages/admin/AdminDashboardPage';
import AdminEnquiriesPage from '../pages/admin/AdminEnquiriesPage';
import AdminConsultationsPage from '../pages/admin/AdminConsultationsPage';
import AdminHealthCheckupsPage from '../pages/admin/AdminHealthCheckupsPage';
import AdminLeadsPage from '../pages/admin/AdminLeadsPage';
import AdminApplicationsPage from '../pages/admin/AdminApplicationsPage';
import AdminServicesPage from '../pages/admin/AdminServicesPage';
import AdminPortfolioPage from '../pages/admin/AdminPortfolioPage';
import AdminBlogPage from '../pages/admin/AdminBlogPage';
import AdminJobsPage from '../pages/admin/AdminJobsPage';
import AdminSettingsPage from '../pages/admin/AdminSettingsPage';

export default function AppRoutes() {
  return (
    <Routes>
      {/* Public Client Routes */}
      <Route path="/" element={<HomePage />} />
      <Route path="/services" element={<ServicesPage />} />
      <Route path="/services/:slug" element={<ServiceDetailPage />} />
      
      <Route path="/portfolio" element={<PortfolioPage />} />
      <Route path="/portfolio/:slug" element={<CaseStudyDetailPage />} />

      <Route path="/about" element={<AboutPage />} />

      <Route path="/blog" element={<BlogPage />} />
      <Route path="/blog/:slug" element={<BlogArticleDetailPage />} />

      <Route path="/careers" element={<CareersPage />} />
      <Route path="/careers/:slug" element={<JobDetailPage />} />

      <Route path="/contact" element={<ContactPage />} />
      <Route path="/business-health-checkup" element={<BusinessHealthCheckupPage />} />
      <Route path="/software-project-planning-guide" element={<LeadMagnetPage />} />

      {/* Admin Authentication */}
      <Route path="/admin/login" element={<AdminLoginPage />} />

      {/* Protected Admin Management Portal */}
      <Route
        path="/admin"
        element={
          <ProtectedAdminRoute>
            <AdminLayout />
          </ProtectedAdminRoute>
        }
      >
        <Route index element={<Navigate to="/admin/dashboard" replace />} />
        <Route path="dashboard" element={<AdminDashboardPage />} />
        <Route path="enquiries" element={<AdminEnquiriesPage />} />
        <Route path="consultations" element={<AdminConsultationsPage />} />
        <Route path="health-checkups" element={<AdminHealthCheckupsPage />} />
        <Route path="leads" element={<AdminLeadsPage />} />
        <Route path="applications" element={<AdminApplicationsPage />} />
        <Route path="services" element={<AdminServicesPage />} />
        <Route path="portfolio" element={<AdminPortfolioPage />} />
        <Route path="blog" element={<AdminBlogPage />} />
        <Route path="jobs" element={<AdminJobsPage />} />
        <Route path="settings" element={<AdminSettingsPage />} />
      </Route>

      {/* Catch-all 404 Route */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
