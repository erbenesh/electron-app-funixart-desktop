import axios from "axios";
import { BASE_URL, FEED_MY } from "./api/endpoints";

class FeedService {

    async getFeedNews(token: string, page: number | string = 0){
        const url = `${BASE_URL}${FEED_MY}${page}?token=${token}`

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