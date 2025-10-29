import axios from "axios";
import { ACHIEVEMENT_GET, BASE_URL, CONFIG_TOGGLES, CONFIG_URLS, VIDEO_PARSE } from "./endpoints";
import type { AchievementResponse, ConfigUrlsResponse, TogglesResponse } from "./types/responses";

class ConfigService {

    async getToggles(): Promise<TogglesResponse> {
        const url = `${BASE_URL}${CONFIG_TOGGLES}`;
        const response = await axios.get<TogglesResponse>(url);
        return response.data;
    }

    async getUrls(): Promise<ConfigUrlsResponse> {
        const url = `${BASE_URL}${CONFIG_URLS}`;
        const response = await axios.get<ConfigUrlsResponse>(url);
        return response.data;
    }

}

export const configService = new ConfigService();

class DirectLinkService {

    async parseVideo(request: { url: string }): Promise<{ code: number; video?: any }> {
        const url = `${BASE_URL}${VIDEO_PARSE}`;
        const response = await axios.post<{ code: number; video?: any }>(url, request);
        return response.data;
    }

}

export const directLinkService = new DirectLinkService();

class AchievementService {

    async getAchievement(achievementId: number | string, token?: string | null): Promise<AchievementResponse> {
        let url = `${BASE_URL}${ACHIEVEMENT_GET}${achievementId}`;
        if (token) {
            url += `?token=${token}`;
        }
        const response = await axios.get<AchievementResponse>(url);
        return response.data;
    }

}

export const achievementService = new AchievementService();

