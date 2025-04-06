import axios from "axios";
import { ARTICLE_LATEST_ALL, BASE_URL, CHANNEL_SUBS_ALL, FEED_MY } from "../endpoints";

class FeedService {

    async getChannelSubs(page: number | string = 0, token: string){
        const url = `${BASE_URL}${CHANNEL_SUBS_ALL}${page}?token=${token}`

        const data = await axios.get(url);

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

    async getFeed(path: string, token: string, page: number | string = 0){
        let url  
        url = path === "news" ? `${BASE_URL}${FEED_MY}${page}?token=${token}` : `${BASE_URL}${ARTICLE_LATEST_ALL}${page}?token=${token}`;

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
        }

        const feedNewsData = await axios.post(url, data);

        return feedNewsData;
    }

}

export const feedService = new FeedService();