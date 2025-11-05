import { create } from 'zustand';
import { persist, devtools } from 'zustand/middleware';
import type { User } from '../types/user';

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
}

interface AuthActions {
  login: (user: User, token: string) => void;
  logout: () => void;
  updateUser: (user: Partial<User>) => void;
  checkAuth: () => Promise<void>;
}

type AuthStore = AuthState & AuthActions;

export const useAuthStore = create<AuthStore>()(
  devtools(
    persist(
      (set, get) => ({
        // State
        user: null,
        token: null,
        isAuthenticated: false,

        // Actions
        login: (user, token) => {
          set({ user, token, isAuthenticated: true }, false, 'auth/login');
        },

        logout: () => {
          set({ user: null, token: null, isAuthenticated: false }, false, 'auth/logout');
          // Also clear old JWT if exists
          try {
            localStorage.removeItem('jwt');
          } catch (e) {
            console.error('Failed to remove jwt:', e);
          }
        },

        updateUser: (userData) => {
          set((state) => ({
            user: state.user ? { ...state.user, ...userData } : null
          }), false, 'auth/updateUser');
        },

        checkAuth: async () => {
          const { token, user } = get();
          
          if (!token) {
            // Try to get old JWT format
            try {
              const oldJwt = localStorage.getItem('jwt');
              if (oldJwt) {
                const jwtData = JSON.parse(oldJwt);
                if (jwtData.jwt) {
                  // Migrate old format - will need to verify with API
                  console.log('Found old JWT format, please re-login');
                  get().logout();
                }
              }
            } catch (e) {
              console.error('Failed to parse old jwt:', e);
            }
            get().logout();
            return;
          }

          // Token exists, verify it's still valid
          // This should call API to verify token
          // For now, we trust the stored token
          if (!user) {
            // Token exists but no user data - should fetch user profile
            console.warn('Token exists but no user data, should fetch profile');
          }
        },
      }),
      {
        name: 'auth-storage',
        partialize: (state) => ({ 
          token: state.token,
          user: state.user,
          isAuthenticated: state.isAuthenticated,
        }),
      }
    ),
    { name: 'AuthStore' }
  )
);

// Setup auth event listeners
if (typeof window !== 'undefined') {
  window.addEventListener('auth:unauthorized', () => {
    useAuthStore.getState().logout();
  });
}

