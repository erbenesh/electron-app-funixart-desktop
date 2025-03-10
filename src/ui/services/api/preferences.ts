import { deepmerge } from "deepmerge-ts";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface preferencesState {
  _hasHydrated: boolean;
  flags: {
    // saveSearchHistory: boolean;
    saveWatchHistory?: boolean;
    showChangelog?: boolean;
    enableAnalytics?: boolean;
  };
  params: {
    isFirstLaunch?: boolean;
    version?: string;
    skipToCategory?: {
      enabled: boolean;
      homeCategory: string;
      bookmarksCategory: string;
    }
    // color: {
    //   primary: string;
    //   secondary: string;
    //   accent: string;
    // }
  };
  setHasHydrated: (state: boolean) => void;
  setFlags: (flags: preferencesState["flags"]) => void;
  setParams: (params: preferencesState["params"]) => void;
}

export const usePreferencesStore = create<preferencesState>()(
  persist(
    (set, get) => ({
      _hasHydrated: false,
      flags: {
        // saveSearchHistory: true,
        saveWatchHistory: true,
        showChangelog: true,
        enableAnalytics: true,
      },
      params: {
        isFirstLaunch: true,
        version: "3.0.0",
        skipToCategory: {
          enabled: false,
          homeCategory: "last",
          bookmarksCategory: "watching",
        }
      },
      setHasHydrated: (state) => {
        set({
          _hasHydrated: state,
        });
      },
      setFlags(flags) {
        set({ flags: { ...get().flags, ...flags } });
      },
      setParams(params) {
        set({ params: { ...get().params, ...params } });
      },
    }),
    {
      name: "preferences",
      onRehydrateStorage: (state) => {
        return () => state.setHasHydrated(true);
      },
      merge: (persistedState , currentState) => {
        return deepmerge(currentState as preferencesState, persistedState as preferencesState);
      }
    }
  )
);