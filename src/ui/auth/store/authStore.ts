import { create } from 'zustand';
import { removeJWT } from '../jwt/utils/jwt-local-storage';

interface userState {
    _hasHydrated: boolean;
    isAuth: boolean;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    user: any | null;
    token: string | null;
    state: string;
    login: (user: object, token: string) => void;
    logout: () => void;
    initialize: () => void;
}

export const useAuthStore = create<userState>((set, get) => ({
    _hasHydrated: false,
    isAuth: false,
    user: null,
    token: null,
    state: "loading",

    login: (user: object, token: string) => {
        set({
        isAuth: true,
        user: user,
        token: token,
        state: "finished",
        _hasHydrated: true,
        });
    },
    logout: () => {
        set({
        isAuth: false,
        user: null,
        token: null,
        state: "finished",
        _hasHydrated: true,
        });
        removeJWT();
    },

    initialize: () => {
        const token = localStorage.getItem('token');
        const user = JSON.parse(localStorage.getItem('user'));

        if (token && user) {
          set({ user, token, isAuth: true });
        }
    }
    // checkAuth: () => {

    //     const jwt = getJWT();
        
    //     if (jwt) {
    //         const _checkAuth = async () => {

    //             const url = `${BASE_URL}${PROFILE}${jwt.user_id}?token=${jwt.jwt}`;

    //             const data = await fetchDataViaGet(url);

    //             if (data && data.is_my_profile) {
    //                 get().login(data.profile, jwt.jwt);
    //             } else {
    //                 get().logout();
    //             }

    //         };
    //         _checkAuth();
    //     } else {
    //         get().logout();
    //     }
    // },
}));