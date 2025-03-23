import axios from "axios";
import { 
    BASE_URL, DISCOVER_INTERESTING, USER_AGENT, DISCOVER_RECOMMENDATIONS, 
    SCHEDULE, DISCOVER_DISCUSSING, DISCOVER_WATCHING, 
    DISCOVER_COMMENTS
} from "./api/endpoints";

export const HEADERS = {
  "User-Agent": USER_AGENT,
  "Content-Type": "application/json; charset=UTF-8",
};

class DiscoverService {

    async getComments(token: string) {

        const url = `${BASE_URL}${DISCOVER_COMMENTS}?token=${token}`

        const commentsData = await axios.post(url);

        return commentsData;
    }

    async getWatching(page: number | string = 0, token: string) {

        const url = `${BASE_URL}${DISCOVER_WATCHING}${page}?token=${token}`

        const watchingData = await axios.post(url);

        return watchingData;
    }

    async getDiscussing(token: string) {

        const url = `${BASE_URL}${DISCOVER_DISCUSSING}?token=${token}`

        const discussingData = await axios.post(url);

        return discussingData;
    }

    async getRecommendations(page: number, token: string) {

        const url = `${BASE_URL}${DISCOVER_RECOMMENDATIONS}${page}?previous_page=${page}&token=${token}`

        const recommendationsData = await axios.post(url);

        return recommendationsData;
    }

    async getDiscoverInteresting() {
        const url = `${BASE_URL}${DISCOVER_INTERESTING}`;

        const discoverInteresting = await axios.get(url);

        return discoverInteresting;
    }

    async getSchedule(token: string) {

        const url = `${BASE_URL}${SCHEDULE}?token=${token}`

        const scheduleData = await axios.get(url);

        return scheduleData;
    }

}

export const discoverService = new DiscoverService();