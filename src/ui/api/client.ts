import axios, { 
  type AxiosInstance, 
  type AxiosError, 
  type InternalAxiosRequestConfig,
  type AxiosResponse 
} from 'axios';
import { BASE_URL, ALT_URL } from './endpoints';

// Create axios instance
export const apiClient: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    try {
      // Get token from localStorage (Zustand persist)
      const authData = localStorage.getItem('auth-storage');
      if (authData) {
        const { state } = JSON.parse(authData);
        const token = state?.token;
        
        if (token) {
          // Check if token is already in URL or params
          const urlString = config.url || '';
          const urlHasToken = /[?&]token=/.test(urlString);
          const paramsHasToken = Boolean(config.params?.token);
          
          if (!urlHasToken && !paramsHasToken) {
            config.params = { ...config.params, token };
          }
        }
      }

      // Handle API base switching (primary/alt/custom)
      const prefsData = localStorage.getItem('preferences');
      if (prefsData) {
        const { state } = JSON.parse(prefsData);
        const selectedBase =
          state?.network?.apiBase === 'alt' ? ALT_URL :
          state?.network?.apiBase === 'custom' && state?.network?.customBaseUrl 
            ? state.network.customBaseUrl 
            : BASE_URL;

        if (config.url) {
          let url = config.url;
          if (url.startsWith(BASE_URL)) {
            url = selectedBase + url.slice(BASE_URL.length);
          } else if (url.startsWith(ALT_URL)) {
            url = selectedBase + url.slice(ALT_URL.length);
          }
          config.url = url;
        }
      }
    } catch (error) {
      console.error('Request interceptor error:', error);
    }
    
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

// Response interceptor
apiClient.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      // Dispatch custom event for unauthorized access
      window.dispatchEvent(new CustomEvent('auth:unauthorized'));
    }
    
    // Log errors in development
    if (process.env.NODE_ENV === 'development') {
      console.error('API Error:', {
        url: error.config?.url,
        method: error.config?.method,
        status: error.response?.status,
        data: error.response?.data,
      });
    }
    
    return Promise.reject(error);
  }
);

export default apiClient;

