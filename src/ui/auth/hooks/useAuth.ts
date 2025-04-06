import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { login as loginApi, getProfile } from '../authApi';
import { useAuthStore } from '../store/authStore';
import { useNavigate } from 'react-router-dom';

export const useLogin = () => {
  const authStore = useAuthStore();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: loginApi,
    onSuccess: (data) => {
      authStore.login(data.user, data.token);
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      queryClient.invalidateQueries(['profile']);
      navigate('/dashboard');
    },
  });
};

export const useProfile = () => {
  return useQuery({
    queryKey: ['profile'],
    queryFn: getProfile,
    enabled: useAuthStore.getState().isAuth,
  });
};

export const useLogout = () => {
  const authStore = useAuthStore();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return () => {
    authStore.logout();
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    queryClient.clear();
    navigate('/login');
  };
};