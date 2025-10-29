import axios from "axios";
import type { Article, Channel } from "../types/entities";
import { ARTICLE_LATEST_ALL, BASE_URL, CHANNEL_SUBS_ALL, FEED_MY, FEED_NEWS } from "./endpoints";
import type { PageableResponse } from "./types/responses";

class FeedService {

    async getChannelSubs(page: number | string = 0, token: string): Promise<PageableResponse<Channel>> {
        const url = `${BASE_URL}${CHANNEL_SUBS_ALL}${page}?token=${token}`;
        const response = await axios.get<PageableResponse<Channel>>(url);
        return response.data;
    }

    async getFeedMy(token: string, page: number | string = 0): Promise<PageableResponse<any>> {
        const url = `${BASE_URL}${FEED_MY}${page}?token=${token}`;
        const data = {
            DATE_DAY: 2,
            DATE_MONTH: 4,
            DATE_NONE: 0,
            DATE_TODAY: 1,
            DATE_WEEK: 3,
            DATE_WHOLE_TIME: 6,
            DATE_YEAR: 5,
            channelId: null,
            date: null
        };
        const response = await axios.post<PageableResponse<any>>(url, data);
        return response.data;
    }

    async getFeedNews(token: string, page: number | string = 0): Promise<PageableResponse<Article>> {
        const url = `${BASE_URL}${FEED_NEWS}${page}?token=${token}`;
        const data = {
            DATE_DAY: 2,
            DATE_MONTH: 4,
            DATE_NONE: 0,
            DATE_TODAY: 1,
            DATE_WEEK: 3,
            DATE_WHOLE_TIME: 6,
            DATE_YEAR: 5,
            channelId: null,
            date: null
        };
        const response = await axios.post<PageableResponse<Article>>(url, data);
        return response.data;
    }

  async getFeedByChannel(token: string, channelId: number | string, page: number | string = 0): Promise<PageableResponse<any>> {
    const url = `${BASE_URL}${FEED_NEWS}${page}?token=${token}`;
    const data = {
      DATE_DAY: 2,
      DATE_MONTH: 4,
      DATE_NONE: 0,
      DATE_TODAY: 1,
      DATE_WEEK: 3,
      DATE_WHOLE_TIME: 6,
      DATE_YEAR: 5,
      channelId,
      date: null
    };
    const response = await axios.post<PageableResponse<any>>(url, data);
    return response.data;
  }

    async getFeed(path: string, token: string, page: number | string = 0): Promise<PageableResponse<any>> {
        const url = path === "news"
            ? `${BASE_URL}${FEED_MY}${page}?token=${token}`
            : `${BASE_URL}${ARTICLE_LATEST_ALL}${page}?token=${token}`;

        const data = {
            DATE_DAY: 2,
            DATE_MONTH: 4,
            DATE_NONE: 0,
            DATE_TODAY: 1,
            DATE_WEEK: 3,
            DATE_WHOLE_TIME: 6,
            DATE_YEAR: 5,
            channelId: null,
            date: null
        };

        const response = await axios.post<PageableResponse<any>>(url, data);
        return response.data;
    }

}

export const feedService = new FeedService();