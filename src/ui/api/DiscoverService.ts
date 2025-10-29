import axios from "axios";
import type { Release } from "../types/entities";
import {
    BASE_URL,
    DISCOVER_COMMENTS,
    DISCOVER_DISCUSSING,
    DISCOVER_INTERESTING,
    DISCOVER_RECOMMENDATIONS,
    DISCOVER_WATCHING,
    SCHEDULE,
    USER_AGENT
} from "./endpoints";
import type { PageableResponse, ScheduleResponse } from "./types/responses";

export const HEADERS = {
  "User-Agent": USER_AGENT,
  "Content-Type": "application/json; charset=UTF-8",
};

class DiscoverService {

    async getComments(token: string): Promise<PageableResponse<any>> {
        const url = `${BASE_URL}${DISCOVER_COMMENTS}?token=${token}`;
        const response = await axios.post<PageableResponse<any>>(url);
        return response.data;
    }

    async getWatching(page: number | string = 0, token: string): Promise<PageableResponse<Release>> {
        const url = `${BASE_URL}${DISCOVER_WATCHING}${page}?token=${token}`;
        const response = await axios.post<PageableResponse<Release>>(url);
        return response.data;
    }

    async getDiscussing(token: string): Promise<PageableResponse<any>> {
        const url = `${BASE_URL}${DISCOVER_DISCUSSING}?token=${token}`;
        const response = await axios.post<PageableResponse<any>>(url);
        return response.data;
    }

    async getRecommendations(page: number, token: string): Promise<PageableResponse<Release>> {
        const url = `${BASE_URL}${DISCOVER_RECOMMENDATIONS}${page}?previous_page=${page}&token=${token}`;
        const response = await axios.post<PageableResponse<Release>>(url);
        return response.data;
    }

    async getDiscoverInteresting(): Promise<PageableResponse<Release>> {
        const url = `${BASE_URL}${DISCOVER_INTERESTING}`;
        const response = await axios.get<PageableResponse<Release>>(url);
        return response.data;
    }

    async getSchedule(token: string): Promise<ScheduleResponse> {
        const url = `${BASE_URL}${SCHEDULE}?token=${token}`;
        const response = await axios.get<ScheduleResponse>(url);
        return response.data;
    }

}

export const discoverService = new DiscoverService();