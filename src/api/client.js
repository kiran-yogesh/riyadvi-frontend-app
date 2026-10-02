import axios from 'axios';

const getApiBaseUrl = () => {
  let url = import.meta.env.VITE_API_URL || import.meta.env.VITE_API_BASE_URL || '/api';
  url = url ? url.trim() : '/api';
  if (url && !url.endsWith('/api') && !url.endsWith('/api/')) {
    url = url.replace(/\/+$/, '') + '/api';
  }
  return url;
};

const client = axios.create({
  baseURL: getApiBaseUrl(),
  headers: {
    'Content-Type': 'application/json'
  }
});

client.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('riyadvi_admin_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default client;
