import { useNavigate } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { login as loginApi } from '../authApi';
import { useAuthStore } from '../store/authStore';

export const useLogin = () => {
  const authStore = useAuthStore();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: loginApi,
    onSuccess: (data) => {
      if (data.profileToken) {
        authStore.login(data.profile, data.profileToken.token);

        localStorage.setItem('token', data.profileToken.token);
        localStorage.setItem('user', JSON.stringify(data.profile));

        // queryClient.invalidateQueries({ queryKey: ['profile'] });
        navigate('/home');
      } else {
        alert('Неверные данные.');
      }
    },
  });
};

// export const useProfile = () => {
//   return useQuery({
//     queryKey: ['profile'],
//     queryFn: getProfile,
//     enabled: useAuthStore.getState().isAuth,
//   });
// };

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
