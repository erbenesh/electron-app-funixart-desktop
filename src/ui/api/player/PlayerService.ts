import axios from "axios";
import { BASE_URL, HISTORY_ADD, EPISODE_WATCH_SOURCE, EPISODE } from "../endpoints";

class PlayerService {

    async getToHistory(url: string) {
        const fullUrl = `${BASE_URL}${HISTORY_ADD}${url}`;
        const toHistory =  await axios.get(fullUrl);
        console.log("HISTORY");
        return toHistory;
    }

    async getMarkWatched(url: string) {
        const fullUrl = `${BASE_URL}${EPISODE_WATCH_SOURCE}${url}`;
        const markWatched =  await axios.post(fullUrl);
        console.log("MARK");
        return markWatched;
    }

    async getReleasePlayer(url: string) {
        const fullUrl = `${BASE_URL}${EPISODE}${url}`;
        const playerData =  await axios.get(fullUrl);

        return playerData;
    }

}

export const playerService = new PlayerService();