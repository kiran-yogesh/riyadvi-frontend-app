import React, { createContext, useContext, useState, useEffect } from 'react';
import { loginAdminApi } from '../api/adminApi';
import apiClient from '../api/apiClient';

const AdminAuthContext = createContext(null);

export const AdminAuthProvider = ({ children }) => {
  const [admin, setAdmin] = useState(() => {
    const saved = localStorage.getItem('riyadvi_admin_user');
    return saved ? JSON.parse(saved) : null;
  });

  const [token, setToken] = useState(() => {
    return localStorage.getItem('riyadvi_admin_token') || null;
  });

  const [loading, setLoading] = useState(false);

  // Synchronize Axios 401 response interceptor
  useEffect(() => {
    const interceptor = apiClient.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response && error.response.status === 401) {
          logout();
        }
        return Promise.reject(error);
      }
    );
    return () => apiClient.interceptors.response.eject(interceptor);
  }, []);

  const login = async (email, password) => {
    setLoading(true);
    try {
      const res = await loginAdminApi({ email, password });
      if (res.success && res.data?.token) {
        const tokenVal = res.data.token;
        const adminVal = res.data.admin;

        setToken(tokenVal);
        setAdmin(adminVal);

        localStorage.setItem('riyadvi_admin_token', tokenVal);
        localStorage.setItem('riyadvi_admin_user', JSON.stringify(adminVal));
        return { success: true };
      }
      return { success: false, message: res.message || 'Authentication failed.' };
    } catch (err) {
      const msg = err.response?.data?.message || err.message || 'Login failed.';
      return { success: false, message: msg };
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setToken(null);
    setAdmin(null);
    localStorage.removeItem('riyadvi_admin_token');
    localStorage.removeItem('riyadvi_admin_user');
  };

  return (
    <AdminAuthContext.Provider
      value={{
        admin,
        token,
        isAuthenticated: !!token,
        loading,
        login,
        logout
      }}
    >
      {children}
    </AdminAuthContext.Provider>
  );
};

export const useAdminAuth = () => useContext(AdminAuthContext);
