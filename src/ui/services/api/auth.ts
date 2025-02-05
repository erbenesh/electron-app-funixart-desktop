import { create } from "zustand";
import { fetchDataViaGet, getJWT, removeJWT } from "./utils";
import { BASE_URL, PROFILE } from './endpoints';

interface userState {
  _hasHydrated: boolean;
  isAuth: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  user: any | null;
  token: string | null;
  state: string;
  login: (user: object, token: string) => void;
  logout: () => void;
  checkAuth: () => void;
}

export const useUserStore = create<userState>((set, get) => ({
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
  checkAuth: () => {

    const jwt = getJWT();
    
    if (jwt) {
        const _checkAuth = async () => {

          const url = `${BASE_URL}${PROFILE}${jwt.user_id}?token=${jwt.jwt}`;

          const data = await fetchDataViaGet(url);

          if (data && data.is_my_profile) {
            get().login(data.profile, jwt.jwt);
          } else {
            get().logout();
          }

        };
        _checkAuth();
    } else {
      get().logout();
    }
  },
}));
