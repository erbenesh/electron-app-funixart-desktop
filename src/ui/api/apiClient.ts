import axios from 'axios';

import { BASE_URL } from '../api/endpoints';
import { useAuthStore } from '../auth/store/authStore';

const apiClient = axios.create({
  baseURL: BASE_URL,
});

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');

  if (token) {
    config.params = config.params || {}; // Создаем объект, если его нет
    config.params.token = token;
  }
  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      useAuthStore.getState().logout();
    }
    return Promise.reject(error);
  }
);

export default apiClient;
