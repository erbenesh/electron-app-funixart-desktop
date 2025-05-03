import apiClient from '../apiClient';
import { FEED_MY, CHANNEL_SUBS_ALL, ARTICLE_LATEST_ALL } from '../endpoints';

class FeedService {
  async getChannelSubs(page: number | string = 0) {
    const url = `${CHANNEL_SUBS_ALL}${page}`;

    const data = await apiClient.get(url);

    return data;
  }

  // async getArticleLatest(token: string, page: number | string = 0){
  //     const url = `${BASE_URL}${ARTICLE_LATEST_ALL}${page}?token=${token}`

  //     const data = {
  //         DATE_DAY: 2,
  //         DATE_MONTH: 4,
  //         DATE_NONE: 0,
  //         DATE_TODAY: 1,
  //         DATE_WEEK: 3,
  //         DATE_WHOLE_TIME: 6,
  //         DATE_YEAR: 5,
  //         channelId: null,
  //         date: null
  //     }

  //     const feedNewsData = await axios.post(url, data);

  //     return feedNewsData;
  // }

  async getFeed(path: string, page: number | string = 0) {
    const url = path === 'news' ? `${FEED_MY}${page}` : `${ARTICLE_LATEST_ALL}${page}`;

    const data = {
      DATE_DAY: 2,
      DATE_MONTH: 4,
      DATE_NONE: 0,
      DATE_TODAY: 1,
      DATE_WEEK: 3,
      DATE_WHOLE_TIME: 6,
      DATE_YEAR: 5,
      channelId: null,
      date: null,
    };

    const feedNewsData = await apiClient.post(url, data);

    return feedNewsData.data;
  }
}

export const feedService = new FeedService();
