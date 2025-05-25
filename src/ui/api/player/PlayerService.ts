import { IRelease } from 'src/ui/sections/Release/IRelease';
import apiClient from '../apiClient';
import { EPISODE, HISTORY_ADD, EPISODE_WATCH_SOURCE } from '../endpoints';

export interface IEpisode {
  '@id': number;
  position: number;
  release: IRelease;
  source: {
    '@id': number;
    id: number;
    type: {
      '@id': number;
      id: number;
      name: string;
      icon: string;
      workers: string;
      is_sub: boolean;
      episodes_count: number;
      view_count: number;
      pinned: boolean;
    };
    name: string;
    episodes_count: boolean;
  };
  name: string;
  url: string;
  iframe: boolean;
  addedDate: number;
  is_filler: boolean;
  is_watched: boolean;
}
export interface IResponseEpisode {
  episodes: IEpisode[];
}
export interface IType {
  '@id': number;
  id: number;
  name: string;
  icon: string;
  workers: string | null;
  is_sub: boolean;
  episodes_count: number;
  view_count: number;
  pinned: boolean;
}

export interface IResponseTypes {
  types: IType[];
}

export interface ISource {
  '@id': number;
  id: number;
  type: {
    '@id': number;
    id: number;
    name: string;
    icon: string;
    workers: string | null;
    is_sub: boolean;
    episodes_count: number;
    view_count: number;
    pinned: boolean;
  };
  name: string;
  episodes_count: number;
}

export interface ISourceResponse {
  sources: ISource[];
}

class PlayerService {
  async getToHistory(url: string) {
    const fullUrl = `${HISTORY_ADD}${url}`;
    const toHistory = await apiClient.get(fullUrl);
    console.log('HISTORY');
    return toHistory;
  }

  async getMarkWatched(url: string) {
    const fullUrl = `${EPISODE_WATCH_SOURCE}${url}`;
    const markWatched = await apiClient.post(fullUrl);
    console.log('MARK');
    return markWatched;
  }

  async getReleasePlayer(url: string) {
    const fullUrl = `${EPISODE}${url}`;
    const playerData = await apiClient.get<IResponseTypes & ISourceResponse & IResponseEpisode>(
      fullUrl
    );

    return playerData;
  }
}

export const playerService = new PlayerService();
