import axios from "axios";
import type { Profile } from "../types/entities";
import { BASE_URL, FRIENDS, FRIENDS_RECOMMENDATIONS, FRIENDS_REMOVE, FRIENDS_REQUESTS_HIDE, FRIENDS_REQUESTS_IN, FRIENDS_REQUESTS_IN_LAST, FRIENDS_REQUESTS_OUT, FRIENDS_REQUESTS_OUT_LAST, FRIENDS_SEND } from "./endpoints";
import type { PageableResponse } from "./types/responses";

class FriendsService {

    async getFriends(profileId: number | string, page: number | string, token: string): Promise<PageableResponse<Profile>> {
        const url = `${BASE_URL}${FRIENDS}${profileId}/${page}?token=${token}`;
        const response = await axios.get<PageableResponse<Profile>>(url);
        return response.data;
    }

    async getFriendRequestsIn(page: number | string, token: string): Promise<PageableResponse<Profile>> {
        const url = `${BASE_URL}${FRIENDS_REQUESTS_IN}${page}?token=${token}`;
        const response = await axios.get<PageableResponse<Profile>>(url);
        return response.data;
    }

    async getFriendRequestsOut(page: number | string, token: string): Promise<PageableResponse<Profile>> {
        const url = `${BASE_URL}${FRIENDS_REQUESTS_OUT}${page}?token=${token}`;
        const response = await axios.get<PageableResponse<Profile>>(url);
        return response.data;
    }

    async getFriendRequestsInLast(token: string): Promise<{ code: number; count: number }> {
        const url = `${BASE_URL}${FRIENDS_REQUESTS_IN_LAST}?token=${token}`;
        const response = await axios.get<{ code: number; count: number }>(url);
        return response.data;
    }

    async getFriendRequestsOutLast(token: string): Promise<{ code: number; count: number }> {
        const url = `${BASE_URL}${FRIENDS_REQUESTS_OUT_LAST}?token=${token}`;
        const response = await axios.get<{ code: number; count: number }>(url);
        return response.data;
    }

    async hideFriendRequest(requestId: number | string, token: string): Promise<{ code: number }> {
        const url = `${BASE_URL}${FRIENDS_REQUESTS_HIDE}${requestId}?token=${token}`;
        const response = await axios.get<{ code: number }>(url);
        return response.data;
    }

    async getRecommendations(token: string): Promise<PageableResponse<Profile>> {
        const url = `${BASE_URL}${FRIENDS_RECOMMENDATIONS}?token=${token}`;
        const response = await axios.get<PageableResponse<Profile>>(url);
        return response.data;
    }

    async sendFriendRequest(profileId: number | string, token: string): Promise<{ code: number }> {
        const url = `${BASE_URL}${FRIENDS_SEND}${profileId}?token=${token}`;
        const response = await axios.get<{ code: number }>(url);
        return response.data;
    }

    async removeFriend(profileId: number | string, token: string): Promise<{ code: number }> {
        const url = `${BASE_URL}${FRIENDS_REMOVE}${profileId}?token=${token}`;
        const response = await axios.get<{ code: number }>(url);
        return response.data;
    }

}

export const friendsService = new FriendsService();

