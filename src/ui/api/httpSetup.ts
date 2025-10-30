import { useUserStore } from '#/auth/store/auth';
import axios from 'axios';
import { ALT_URL, BASE_URL } from './endpoints';
import { usePreferencesStore } from './preferences';

axios.interceptors.request.use((config) => {
  try {
    const token = useUserStore.getState().token;
    if (token) {
      const urlString = typeof config.url === 'string' ? config.url : '';
      const urlHasToken = /[?&]token=/.test(urlString);
      const paramsHasToken = Boolean((config.params as any)?.token);
      if (!urlHasToken && !paramsHasToken) {
        config.params = { ...(config.params as any), token };
      }
    }
  } catch (_) {
    // noop
  }

  try {
    // Swap base URL according to preferences (primary/alt/custom)
    const prefs = usePreferencesStore.getState();
    const selectedBase =
      prefs.network.apiBase === 'alt' ? ALT_URL :
      prefs.network.apiBase === 'custom' && prefs.network.customBaseUrl ? prefs.network.customBaseUrl : BASE_URL;

    if (typeof config.url === 'string') {
      let url = config.url;
      if (url.startsWith(BASE_URL)) {
        url = selectedBase + url.slice(BASE_URL.length);
      } else if (url.startsWith(ALT_URL)) {
        url = selectedBase + url.slice(ALT_URL.length);
      }
      config.url = url;
    }
  } catch (_) {
    // noop
  }
  return config;
});

axios.interceptors.response.use(
  (res) => res,
  (error) => {
    if (error?.response?.status === 401) {
      // optionally trigger logout or token refresh
    }
    return Promise.reject(error);
  }
);

export { }; // module side-effects only


