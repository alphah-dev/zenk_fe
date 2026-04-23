import axios from 'axios';

/**
 * Custom Axios API Client
 * 
 * Provides a standardized way to make API requests across the application.
 * Automatically handles features like attaching authorization tokens and 
 * standardizing error responses.
 */

const getApiBase = () => {
  if (import.meta.env.VITE_API_BASE_URL) return import.meta.env.VITE_API_BASE_URL;
  if (typeof window !== 'undefined' && (window.location.hostname.includes('vercel.app') || window.location.hostname.includes('zenk'))) {
    return 'https://deployment-production-27bd.up.railway.app';
  }
  return 'http://localhost:8000';
};

const BASE_URL = getApiBase();

const apiClient = axios.create({
  baseURL: BASE_URL,
  timeout: 10000, // 10 seconds timeout for standard requests
  headers: {
    'Content-Type': 'application/json',
  },
});

// -------------------------------------------------------------
// REQUEST INTERCEPTOR
// Runs BEFORE the request is sent to the backend
// -------------------------------------------------------------
apiClient.interceptors.request.use(
  (config) => {
    // Check if we have an auth token stored (e.g. from localStorage)
    const token = localStorage.getItem('zenk_token');
    
    // If the token exists, attach it to the Authorization header
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    // You can also add dynamic headers here if requested by senior dev
    // e.g. config.headers['x-zenk-circle-id'] = currentCircleId;

    return config;
  },
  (error) => {
    // Handle request setup errors
    return Promise.reject(error);
  }
);

// -------------------------------------------------------------
// RESPONSE INTERCEPTOR
// Runs AFTER the response is received, catching errors globally
// -------------------------------------------------------------
apiClient.interceptors.response.use(
  (response) => {
    // If successful, just return the raw data directly for cleaner components
    // Most times we only care about `response.data`
    return response.data;
  },
  (error) => {
    // Standardize error handling globally
    if (error.response) {
      // The backend responded with a status code outside the 2xx range
      const status = error.response.status;

      if (status === 401) {
        // Unauthorized: Token might be expired or invalid
        console.warn('Authentication failed. Redirecting to login...');
        
        // TODO: In the future, trigger a logout function or redirect
        // e.g., window.location.href = '/login';
        // localStorage.removeItem('zenk_token');
      } else if (status === 403) {
        // Forbidden: Valid token, but not enough permissions (e.g., student trying to access leader dashboard)
        console.warn('Permission denied to access this resource.');
      } else if (status === 500) {
        console.error('Critical Server Error happened on the backend.');
      }

      // Return a standardized, clean error to the UI components
      const cleanError = error.response.data?.message || error.response.data?.detail || 'An unexpected server error occurred.';
      return Promise.reject(new Error(cleanError));
    } else if (error.request) {
      // The request was made but no response was received (Network Down / CORS issue)
      console.error('No response from server. Check network connection or CORS policy.');
      return Promise.reject(new Error('Unable to connect to the server. Please check your internet connection.'));
    } else {
      // Something happened in setting up the request that triggered an Error
      return Promise.reject(error);
    }
  }
);

export default apiClient;
