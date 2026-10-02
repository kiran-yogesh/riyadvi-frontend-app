import axios from 'axios';

const getApiBaseUrl = () => {
  let url = import.meta.env.VITE_API_BASE_URL || import.meta.env.VITE_API_URL || '/api';
  url = url ? url.trim() : '/api';
  if (url && !url.endsWith('/api') && !url.endsWith('/api/')) {
    url = url.replace(/\/+$/, '') + '/api';
  }
  return url;
};

const apiClient = axios.create({
  baseURL: getApiBaseUrl(),
  headers: {
    'Content-Type': 'application/json'
  }
});

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('riyadvi_admin_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => Promise.reject(error));

export default apiClient;
