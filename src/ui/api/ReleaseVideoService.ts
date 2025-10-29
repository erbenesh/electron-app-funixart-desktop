import axios from "axios";
import type { ReleaseVideo } from "../types/entities";
import { BASE_URL, RELEASE_FAVORITE_VIDEOS, RELEASE_FAVORITE_VIDEO_ADD, RELEASE_FAVORITE_VIDEO_DELETE, RELEASE_VIDEO, RELEASE_VIDEO_CATEGORIES, RELEASE_VIDEO_CATEGORY, RELEASE_VIDEO_PAGE, RELEASE_VIDEO_PROFILE, VIDEO_APPEAL_ADD, VIDEO_APPEAL_DELETE, VIDEO_APPEAL_PROFILE, VIDEO_APPEAL_PROFILE_LAST } from "./endpoints";
import type { ReleaseVideoAppealRequest } from "./types/requests";
import type { PageableResponse, ReleaseVideoCategoriesResponse, ReleaseVideosResponse } from "./types/responses";

class ReleaseVideoService {

    async getReleaseVideos(releaseId: number | string, token?: string | null): Promise<ReleaseVideosResponse> {
        let url = `${BASE_URL}${RELEASE_VIDEO}${releaseId}`;
        if (token) {
            url += `?token=${token}`;
        }
        const response = await axios.get<ReleaseVideosResponse>(url);
        return response.data;
    }

    async getReleaseVideosPage(releaseId: number | string, page: number | string, token: string): Promise<PageableResponse<ReleaseVideo>> {
        const url = `${BASE_URL}${RELEASE_VIDEO_PAGE}${releaseId}/${page}?token=${token}`;
        const response = await axios.get<PageableResponse<ReleaseVideo>>(url);
        return response.data;
    }

    async getProfileVideos(profileId: number | string, page: number | string, token: string): Promise<PageableResponse<ReleaseVideo>> {
        const url = `${BASE_URL}${RELEASE_VIDEO_PROFILE}${profileId}/${page}?token=${token}`;
        const response = await axios.get<PageableResponse<ReleaseVideo>>(url);
        return response.data;
    }

    async getVideoCategories(token?: string | null): Promise<ReleaseVideoCategoriesResponse> {
        let url = `${BASE_URL}${RELEASE_VIDEO_CATEGORIES}`;
        if (token) {
            url += `?token=${token}`;
        }
        const response = await axios.get<ReleaseVideoCategoriesResponse>(url);
        return response.data;
    }

    async getVideosByCategory(releaseId: number | string, categoryId: number | string, page: number | string, token: string): Promise<PageableResponse<ReleaseVideo>> {
        const url = `${BASE_URL}${RELEASE_VIDEO_CATEGORY}${releaseId}/category/${categoryId}/${page}?token=${token}`;
        const response = await axios.get<PageableResponse<ReleaseVideo>>(url);
        return response.data;
    }

    async addVideoAppeal(request: ReleaseVideoAppealRequest, token: string): Promise<{ code: number }> {
        const url = `${BASE_URL}${VIDEO_APPEAL_ADD}?token=${token}`;
        const response = await axios.post<{ code: number }>(url, request);
        return response.data;
    }

    async deleteVideoAppeal(appealId: number | string, token: string): Promise<{ code: number }> {
        const url = `${BASE_URL}${VIDEO_APPEAL_DELETE}${appealId}?token=${token}`;
        const response = await axios.get<{ code: number }>(url);
        return response.data;
    }

    async getProfileAppeals(page: number | string, token: string): Promise<PageableResponse<any>> {
        const url = `${BASE_URL}${VIDEO_APPEAL_PROFILE}${page}?token=${token}`;
        const response = await axios.get<PageableResponse<any>>(url);
        return response.data;
    }

    async getProfileAppealsLast(token: string): Promise<{ code: number; count: number }> {
        const url = `${BASE_URL}${VIDEO_APPEAL_PROFILE_LAST}?token=${token}`;
        const response = await axios.get<{ code: number; count: number }>(url);
        return response.data;
    }

    async getFavoriteVideos(profileId: number | string, page: number | string, token: string): Promise<PageableResponse<ReleaseVideo>> {
        const url = `${BASE_URL}${RELEASE_FAVORITE_VIDEOS}${profileId}/${page}?token=${token}`;
        const response = await axios.get<PageableResponse<ReleaseVideo>>(url);
        return response.data;
    }

    async addFavoriteVideo(releaseId: number | string, token: string): Promise<{ code: number }> {
        const url = `${BASE_URL}${RELEASE_FAVORITE_VIDEO_ADD}${releaseId}?token=${token}`;
        const response = await axios.get<{ code: number }>(url);
        return response.data;
    }

    async deleteFavoriteVideo(releaseId: number | string, token: string): Promise<{ code: number }> {
        const url = `${BASE_URL}${RELEASE_FAVORITE_VIDEO_DELETE}${releaseId}?token=${token}`;
        const response = await axios.get<{ code: number }>(url);
        return response.data;
    }

}

export const releaseVideoService = new ReleaseVideoService();

