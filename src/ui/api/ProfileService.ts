import axios from "axios";
import { BASE_URL, PROFILE, PROFILE_INFO, PROFILE_NICKNAMES_HISTORY, PROFILE_PROCESS, PROFILE_ROLE_LIST_ALL, PROFILE_SOCIAL } from "./endpoints";
import type { PageableResponse, ProfileResponse, ProfileSocialResponse } from "./types/responses";

class ProfileService {

    async getProfile(
        id: string | number, 
        token: string | null
    ): Promise<ProfileResponse> {
        let url = `${BASE_URL}${PROFILE}${id}`;
        if (token) {
            url += `?token=${token}`;
        }
        
        const response = await axios.get<ProfileResponse>(url);
        return response.data;
    }

    async getMyProfile(token: string): Promise<ProfileResponse> {
        const url = `${BASE_URL}${PROFILE_INFO}?token=${token}`;
        const response = await axios.get<ProfileResponse>(url);
        return response.data;
    }

    async getNicknamesHistory(
        profileId: number | string,
        page: number | string,
        token: string
    ): Promise<PageableResponse<any>> {
        const url = `${BASE_URL}${PROFILE_NICKNAMES_HISTORY}${profileId}/${page}?token=${token}`;
        const response = await axios.get<PageableResponse<any>>(url);
        return response.data;
    }

    async getProfileSocial(
        profileId: number | string,
        token?: string | null
    ): Promise<ProfileSocialResponse> {
        let url = `${BASE_URL}${PROFILE_SOCIAL}${profileId}`;
        if (token) {
            url += `?token=${token}`;
        }
        const response = await axios.get<ProfileSocialResponse>(url);
        return response.data;
    }

    async processProfile(
        profileId: number | string,
        request: any,
        token: string
    ): Promise<{ code: number }> {
        const url = `${BASE_URL}${PROFILE_PROCESS}${profileId}?token=${token}`;
        const response = await axios.post<{ code: number }>(url, request);
        return response.data;
    }

    async getProfileRoleList(
        page: number | string,
        token: string
    ): Promise<PageableResponse<any>> {
        const url = `${BASE_URL}${PROFILE_ROLE_LIST_ALL}${page}?token=${token}`;
        const response = await axios.get<PageableResponse<any>>(url);
        return response.data;
    }

}

export const profileService = new ProfileService();