// DEPRECATED: This file is kept for backward compatibility
// Please migrate to use @/stores/authStore instead

import { useAuthStore } from '#/stores/authStore';
import { fetchDataViaGet, getJWT, removeJWT } from "../../api/utils";
import { BASE_URL, PROFILE } from '../../api/endpoints';
import type { User } from '#/types/user';

interface userState {
  _hasHydrated: boolean;
  isAuth: boolean;
  user: User | null;
  token: string | null;
  state: string;
  login: (user: User, token: string) => void;
  logout: () => void;
  checkAuth: () => void;
}

// Re-export new auth store with compatibility wrapper
export const useUserStore = (() => {
  const newStore = useAuthStore;
  
  return Object.assign(
    (selector?: (state: userState) => any) => {
      const state = newStore((s) => s);
      
      // Map new store to old interface
      const mappedState: userState = {
        _hasHydrated: true, // New store always hydrated
        isAuth: state.isAuthenticated,
        user: state.user,
        token: state.token,
        state: "finished",
        login: state.login,
        logout: state.logout,
        checkAuth: async () => {
          const jwt = getJWT();
          
          if (jwt) {
            const url = `${BASE_URL}${PROFILE}${jwt.user_id}?token=${jwt.jwt}`;
            const data = await fetchDataViaGet(url);

            if (data && data.is_my_profile) {
              state.login(data.profile, jwt.jwt);
            } else {
              state.logout();
            }
          } else {
            // Try new store
            await state.checkAuth();
          }
        },
      };
      
      return selector ? selector(mappedState) : mappedState;
    },
    {
      getState: () => {
        const state = newStore.getState();
        return {
          _hasHydrated: true,
          isAuth: state.isAuthenticated,
          user: state.user,
          token: state.token,
          state: "finished",
          login: state.login,
          logout: state.logout,
          checkAuth: state.checkAuth,
        };
      }
    }
  );
})();
