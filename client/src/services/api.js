import axios from 'axios';
import toast from 'react-hot-toast';

// Create axios instance with base configuration
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || '/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    // Add auth token if available
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const message = error.response?.data?.message || 'Something went wrong';
    
    // Handle specific error codes
    if (error.response?.status === 404) {
      console.error('Resource not found:', error.config.url);
    } else if (error.response?.status >= 500) {
      toast.error('Server error. Please try again later.');
    } else if (error.response?.status === 429) {
      toast.error('Too many requests. Please wait before trying again.');
    }
    
    return Promise.reject(error);
  }
);

// Profile API
export const profileAPI = {
  getProfile: () => api.get('/profile'),
  getProfileSummary: () => api.get('/profile/summary'),
  updateProfile: (data) => api.put('/profile', data)
};

// Projects API
export const projectsAPI = {
  getAllProjects: (params = {}) => api.get('/projects', { params }),
  getFeaturedProjects: () => api.get('/projects/featured'),
  getProjectById: (id) => api.get(`/projects/${id}`),
  getProjectCategories: () => api.get('/projects/categories'),
  createProject: (data) => api.post('/projects', data),
  updateProject: (id, data) => api.put(`/projects/${id}`, data),
  deleteProject: (id) => api.delete(`/projects/${id}`)
};

// Skills API
export const skillsAPI = {
  getAllSkills: (params = {}) => api.get('/skills', { params }),
  getCoreSkills: () => api.get('/skills/core')
};

// Experience API
export const experienceAPI = {
  getAllExperience: () => api.get('/experience'),
  getCurrentExperience: () => api.get('/experience/current')
};

// Contact API
export const contactAPI = {
  submitContactForm: (data) => api.post('/contact', data),
  getAllContacts: (params = {}) => api.get('/contact', { params }),
  getContactById: (id) => api.get(`/contact/${id}`),
  updateContact: (id, data) => api.put(`/contact/${id}`, data),
  getContactStats: () => api.get('/contact/stats')
};

// Admin API
export const adminAPI = {
  getDashboardStats: () => api.get('/admin/dashboard'),
  getBackupData: () => api.get('/admin/backup')
};

// Utility functions
export const handleApiError = (error, customMessage) => {
  const message = error.response?.data?.message || customMessage || 'An error occurred';
  toast.error(message);
  console.error('API Error:', error);
  return message;
};

export const handleApiSuccess = (message, data) => {
  if (message) {
    toast.success(message);
  }
  return data;
};

export default api;
