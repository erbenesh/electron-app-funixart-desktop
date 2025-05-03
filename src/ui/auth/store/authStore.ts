// store/authStore.ts
import axios from 'axios';
import { create } from 'zustand';

import { PROFILE, BASE_URL } from '../../api/endpoints';

interface AuthStore {
  user: any | null;
  token: string | null;
  isAuth: boolean;
  login: (user: any, token: string) => void;
  logout: () => void;
  // initialize: () => void;
  checkAuth: () => void;
}

export const useAuthStore = create<AuthStore>((set, get) => ({
  user: null,
  token: null,
  isAuth: false,

  login: (user, token) => {
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('token', token);
    set({ user, token, isAuth: true });
  },

  logout: () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    set({ user: null, token: null, isAuth: false });
  },

  // initialize: () => {
  //     const token = localStorage.getItem('token');
  //     const user = JSON.parse(localStorage.getItem('user') || 'null');

  //     if (token && user) {
  //         set({ user: user, token: token, isAuth: true });
  //     }
  // },

  checkAuth: async () => {
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user') || 'null');

    if (token) {
      const _checkAuth = async () => {
        const { data } = await axios.get(`${BASE_URL}${PROFILE}${user.id}?token=${token}`);

        if (data.error || !data.is_my_profile) {
          get().logout();
          return;
        }

        get().login(data.profile, token);
      };
      _checkAuth();
    } else {
      get().logout();
    }
  },
}));
