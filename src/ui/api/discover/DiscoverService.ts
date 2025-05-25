import { IRelease } from 'src/ui/sections/Release/IRelease';
import apiClient from '../apiClient';
import {
  SCHEDULE,
  USER_AGENT,
  DISCOVER_WATCHING,
  DISCOVER_COMMENTS,
  DISCOVER_DISCUSSING,
  DISCOVER_INTERESTING,
  DISCOVER_RECOMMENDATIONS,
} from '../endpoints';

export const HEADERS = {
  'User-Agent': USER_AGENT,
  'Content-Type': 'application/json; charset=UTF-8',
};

export interface IResponseSchedule {
  monday: IRelease[];
  saturday: IRelease[];
  sunday: IRelease[];
  thursday: IRelease[];
  friday: IRelease[];
  tuesday: IRelease[];
  wednesday: IRelease[];
  [key: string]: any;
}

class DiscoverService {
  async getComments() {
    const commentsData = await apiClient.post(DISCOVER_COMMENTS);

    return commentsData;
  }

  async getWatching(page: number | string = 0) {
    const url = `${DISCOVER_WATCHING}${page}`;

    const watchingData = await apiClient.post(url);

    return watchingData;
  }

  async getDiscussing() {
    const discussingData = await apiClient.post(DISCOVER_DISCUSSING);

    return discussingData.data;
  }

  async getRecommendations(page: number) {
    const prev_page = page !== 0 ? page - 1 : 0;

    const queryParams = {
      params: {
        previous_page: prev_page,
      },
    };

    const url = `${DISCOVER_RECOMMENDATIONS}${page}`;

    const recommendationsData = await apiClient.post(url, null, queryParams);

    return recommendationsData.data;
  }

  async getDiscoverInteresting() {
    const discoverInteresting = await apiClient.get(DISCOVER_INTERESTING);

    return discoverInteresting.data;
  }

  async getSchedule() {
    const scheduleData = await apiClient.get<IResponseSchedule>(SCHEDULE);

    return scheduleData.data;
  }
}

export const discoverService = new DiscoverService();
