import axios from "axios";
import type { Release } from "../types/entities";
import { BASE_URL, RELEASE, RELEASE_COMMENT_REPORT, RELEASE_FILTER, RELEASE_RANDOM, RELEASE_RANDOM_COLLECTION, RELEASE_RANDOM_FAVORITE, RELEASE_RANDOM_PROFILE, RELEASE_REPORT, RELEASE_STREAMING_PLATFORM, RELEASE_VOTE_ADD, RELEASE_VOTE_DELETE } from "./endpoints";
import type { CommentReportRequest, FilterRequest, ReleaseReportRequest } from "./types/requests";
import type { PageableResponse, ReleaseResponse, VoteReleaseResponse } from "./types/responses";

const StatusList: Record<string, null | number> = {
    last: null,
    finished: 1,
    ongoing: 2,
    announce: 3,
};

export const profile_lists = {
    0: { name: "Не смотрю", bg_color: "rgb(39, 39, 39)" },
    1: { name: "Смотрю", bg_color: "rgb(26, 212, 85)" },
    2: { name: "В планах", bg_color: "rgb(140, 119, 197)" },
    3: { name: "Просмотрено", bg_color: "rgb(91, 93, 207)" },
    4: { name: "Отложено", bg_color: "rgb(233, 196, 47)" },
    5: { name: "Брошено", bg_color: "rgb(231, 115, 80)" },
};

export const lists = [
    { list: 0, name: "Не смотрю" },
    { list: 1, name: "Смотрю" },
    { list: 2, name: "В планах" },
    { list: 3, name: "Просмотрено" },
    { list: 4, name: "Отложено" },
    { list: 5, name: "Брошено" },
];

export const weekDay = [
    "_",
    "каждый понедельник",
    "каждый вторник",
    "каждую среду",
    "каждый четверг",
    "каждую пятницу",
    "каждую субботу",
    "каждое воскресенье",
];

class ReleaseService {

    async getRandomRelease(token?: string | null): Promise<ReleaseResponse> {
        let url = `${BASE_URL}${RELEASE_RANDOM}`;
        if (token) {
            url += `?token=${token}`;
        }
        const response = await axios.get<ReleaseResponse>(url);
        return response.data;
    }

    async getRandomFavoriteRelease(token: string): Promise<ReleaseResponse> {
        const url = `${BASE_URL}${RELEASE_RANDOM_FAVORITE}?token=${token}`;
        const response = await axios.get<ReleaseResponse>(url);
        return response.data;
    }

    async getRandomReleaseFromProfileList(
        profileId: number | string,
        status: number,
        token: string
    ): Promise<ReleaseResponse> {
        const url = `${BASE_URL}${RELEASE_RANDOM_PROFILE}${profileId}/${status}?token=${token}`;
        const response = await axios.get<ReleaseResponse>(url);
        return response.data;
    }

    async getRandomReleaseFromCollection(
        collectionId: number | string,
        token: string
    ): Promise<ReleaseResponse> {
        const url = `${BASE_URL}${RELEASE_RANDOM_COLLECTION}${collectionId}?token=${token}`;
        const response = await axios.get<ReleaseResponse>(url);
        return response.data;
    }

    async getCurrentRelease(
        id: number | string,
        token: string | null,
    ): Promise<ReleaseResponse> {
        let url = `${BASE_URL}${RELEASE}${id}`;
        if (token) {
            url += `?token=${token}`;
        }
        const response = await axios.get<ReleaseResponse>(url);
        return response.data;
    }

    async voteRelease(
        releaseId: number | string,
        vote: number,
        token: string
    ): Promise<VoteReleaseResponse> {
        const url = `${BASE_URL}${RELEASE_VOTE_ADD}${releaseId}/${vote}?token=${token}`;
        const response = await axios.get<VoteReleaseResponse>(url);
        return response.data;
    }

    async deleteVote(
        releaseId: number | string,
        token: string
    ): Promise<{ code: number }> {
        const url = `${BASE_URL}${RELEASE_VOTE_DELETE}${releaseId}?token=${token}`;
        const response = await axios.get<{ code: number }>(url);
        return response.data;
    }

    async getFilteredReleases(
        filter: FilterRequest,
        page: string | number = 0,
        token?: string | null
    ): Promise<PageableResponse<Release>> {
        let url = `${BASE_URL}${RELEASE_FILTER}${page}`;
        if (token) {
            url += `?token=${token}`;
        }
        
        const response = await axios.post<PageableResponse<Release>>(url, filter);
        return response.data;
    }

    async getLastUpdatedReleases(
        status: string,
        token: string | null,
        page: string | number = 0,
        sort: null | number = 0
    ): Promise<PageableResponse<Release>> {
        let statusId: null | number = null;
        let categoryId: null | number = null;
        if (status == "films") {
          categoryId = 2;
        } else {
          statusId = StatusList[status];
        }

        if (status == "ova") {
            categoryId = 3;
        }

        const filter: FilterRequest = {
            age_ratings: [],
            category_id: categoryId,
            country: null,
            end_year: null,
            episode_duration_from: null,
            episode_duration_to: null,
            episodes_from: null,
            episodes_to: null,
            genres: [],
            is_genres_exclude_mode_enabled: false,
            profile_list_exclusions: [],
            season: null,
            sort: sort,
            start_year: null,
            status_id: statusId,
            studio: null,
            types: []
        };

        return this.getFilteredReleases(filter, page, token);
    }

    async getStreamingPlatform(
        releaseId: number | string,
        token?: string | null
    ): Promise<{ code: number; platforms: any[] }> {
        let url = `${BASE_URL}${RELEASE_STREAMING_PLATFORM}${releaseId}`;
        if (token) {
            url += `?token=${token}`;
        }
        const response = await axios.get<{ code: number; platforms: any[] }>(url);
        return response.data;
    }

    async reportRelease(
        releaseId: number | string,
        request: ReleaseReportRequest,
        token: string
    ): Promise<{ code: number }> {
        const url = `${BASE_URL}${RELEASE_REPORT}${releaseId}?token=${token}`;
        const response = await axios.post<{ code: number }>(url, request);
        return response.data;
    }

    async reportReleaseComment(
        commentId: number | string,
        request: CommentReportRequest,
        token: string
    ): Promise<{ code: number }> {
        const url = `${BASE_URL}${RELEASE_COMMENT_REPORT}${commentId}?token=${token}`;
        const response = await axios.post<{ code: number }>(url, request);
        return response.data;
    }

}

export const releaseService = new ReleaseService();