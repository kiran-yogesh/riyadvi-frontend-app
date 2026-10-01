import apiClient from './apiClient';

// Admin Login
export const loginAdminApi = async (credentials) => {
  const res = await apiClient.post('/admin/login', credentials);
  return res.data;
};

// Dashboard Stats
export const getAdminStatsApi = async () => {
  const res = await apiClient.get('/admin/dashboard');
  return res.data;
};

// Lead Overview
export const getAllLeadsOverviewApi = async () => {
  const res = await apiClient.get('/admin/leads');
  return res.data;
};

// Contacts
export const getAdminContactsApi = async (params = {}) => {
  const res = await apiClient.get('/admin/contacts', { params });
  return res.data;
};

export const updateContactStatusApi = async (id, status) => {
  const res = await apiClient.patch(`/admin/contacts/${id}`, { status });
  return res.data;
};

// Consultations
export const getAdminConsultationsApi = async (params = {}) => {
  const res = await apiClient.get('/admin/consultations', { params });
  return res.data;
};

export const updateConsultationStatusApi = async (id, status) => {
  const res = await apiClient.patch(`/admin/consultations/${id}`, { status });
  return res.data;
};

// Health Checkups
export const getAdminHealthCheckupsApi = async (params = {}) => {
  const res = await apiClient.get('/admin/health-checkups', { params });
  return res.data;
};

export const updateHealthCheckupStatusApi = async (id, status) => {
  const res = await apiClient.patch(`/admin/health-checkups/${id}`, { status });
  return res.data;
};

// Lead Magnets
export const getAdminLeadMagnetsApi = async (params = {}) => {
  const res = await apiClient.get('/admin/lead-magnets', { params });
  return res.data;
};

// Applications
export const getAdminApplicationsApi = async (params = {}) => {
  const res = await apiClient.get('/admin/applications', { params });
  return res.data;
};

export const updateApplicationStatusApi = async (id, status) => {
  const res = await apiClient.patch(`/admin/applications/${id}`, { status });
  return res.data;
};

// CMS Services
export const createServiceApi = async (data) => {
  const res = await apiClient.post('/admin/services', data);
  return res.data;
};

export const updateServiceApi = async (id, data) => {
  const res = await apiClient.patch(`/admin/services/${id}`, data);
  return res.data;
};

export const deleteServiceApi = async (id) => {
  const res = await apiClient.delete(`/admin/services/${id}`);
  return res.data;
};

// CMS Portfolio
export const createPortfolioApi = async (data) => {
  const res = await apiClient.post('/admin/portfolio', data);
  return res.data;
};

export const updatePortfolioApi = async (id, data) => {
  const res = await apiClient.patch(`/admin/portfolio/${id}`, data);
  return res.data;
};

export const deletePortfolioApi = async (id) => {
  const res = await apiClient.delete(`/admin/portfolio/${id}`);
  return res.data;
};

// CMS Blog
export const createBlogPostApi = async (data) => {
  const res = await apiClient.post('/admin/blog', data);
  return res.data;
};

export const updateBlogPostApi = async (id, data) => {
  const res = await apiClient.patch(`/admin/blog/${id}`, data);
  return res.data;
};

export const deleteBlogPostApi = async (id) => {
  const res = await apiClient.delete(`/admin/blog/${id}`);
  return res.data;
};

// CMS Jobs
export const createJobApi = async (data) => {
  const res = await apiClient.post('/admin/jobs', data);
  return res.data;
};

export const updateJobApi = async (id, data) => {
  const res = await apiClient.patch(`/admin/jobs/${id}`, data);
  return res.data;
};

export const deleteJobApi = async (id) => {
  const res = await apiClient.delete(`/admin/jobs/${id}`);
  return res.data;
};
