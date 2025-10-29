import axios from "axios";
import { AUTH_SIGN_IN_WITH_GOOGLE, AUTH_SIGN_IN_WITH_VK, BASE_URL, PROFILE, PROFILE_INFO, PROFILE_NICKNAMES_HISTORY, PROFILE_PROCESS, PROFILE_SOCIAL, SIGN_IN, SIGN_UP, SIGN_UP_VERIFY } from "./endpoints";
import type { SignInRequest, SignInWithGoogleRequest, SignInWithVkRequest, SignUpRequest, VerifyRequest } from "./types/requests";
import type { PageableResponse, ProfileResponse, ProfileSocialResponse, SignInResponse, SignUpResponse } from "./types/responses";

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

    async signIn(request: SignInRequest): Promise<SignInResponse> {
        const url = `${BASE_URL}${SIGN_IN}?login=${encodeURIComponent(request.login)}&password=${encodeURIComponent(request.password)}`;
        const response = await axios.post<SignInResponse>(url);
        return response.data;
    }

    async signUp(request: SignUpRequest): Promise<SignUpResponse> {
        const url = `${BASE_URL}${SIGN_UP}`;
        const response = await axios.post<SignUpResponse>(url, request);
        return response.data;
    }

    async signInWithGoogle(request: SignInWithGoogleRequest): Promise<SignInResponse> {
        const url = `${BASE_URL}${AUTH_SIGN_IN_WITH_GOOGLE}`;
        const response = await axios.post<SignInResponse>(url, request);
        return response.data;
    }

    async signInWithVk(request: SignInWithVkRequest): Promise<SignInResponse> {
        const url = `${BASE_URL}${AUTH_SIGN_IN_WITH_VK}`;
        const response = await axios.post<SignInResponse>(url, request);
        return response.data;
    }

    async verify(request: VerifyRequest): Promise<SignInResponse> {
        const url = `${BASE_URL}${SIGN_UP_VERIFY}`;
        const response = await axios.post<SignInResponse>(url, request);
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

    // Legacy method for backward compatibility
    async postSubmitLogin(
        login: string,
        password: string,
    ): Promise<SignInResponse> {
        return this.signIn({ login, password });
    }

}

export const profileService = new ProfileService();