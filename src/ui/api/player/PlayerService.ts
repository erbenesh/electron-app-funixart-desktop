import { HISTORY_ADD, EPISODE_WATCH_SOURCE, EPISODE } from "../endpoints";
import apiClient from "../apiClient";

class PlayerService {

    async getToHistory(url: string) {
        const fullUrl = `${HISTORY_ADD}${url}`;
        const toHistory =  await apiClient.get(fullUrl);
        console.log("HISTORY");
        return toHistory;
    }

    async getMarkWatched(url: string) {
        const fullUrl = `${EPISODE_WATCH_SOURCE}${url}`;
        const markWatched =  await apiClient.post(fullUrl);
        console.log("MARK");
        return markWatched;
    }

    async getReleasePlayer(url: string) {
        const fullUrl = `${EPISODE}${url}`;
        const playerData =  await apiClient.get(fullUrl);

        return playerData;
    }

}

export const playerService = new PlayerService();