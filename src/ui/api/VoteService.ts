import axios from "axios";
import type { Release } from "../types/entities";
import { BASE_URL, VOTE_UNVOTED, VOTE_UNVOTED_LAST, VOTE_VOTED } from "./endpoints";
import type { PageableResponse } from "./types/responses";

class VoteService {

    async getVotedReleases(
        profileId: number | string,
        page: number | string,
        token: string
    ): Promise<PageableResponse<Release>> {
        const url = `${BASE_URL}${VOTE_VOTED}${profileId}/${page}?token=${token}`;
        const response = await axios.get<PageableResponse<Release>>(url);
        return response.data;
    }

    async getUnvotedReleases(
        page: number | string,
        token: string
    ): Promise<PageableResponse<Release>> {
        const url = `${BASE_URL}${VOTE_UNVOTED}${page}?token=${token}`;
        const response = await axios.get<PageableResponse<Release>>(url);
        return response.data;
    }

    async getUnvotedLast(token: string): Promise<{ code: number; release?: Release }> {
        const url = `${BASE_URL}${VOTE_UNVOTED_LAST}?token=${token}`;
        const response = await axios.get<{ code: number; release?: Release }>(url);
        return response.data;
    }

}

export const voteService = new VoteService();

