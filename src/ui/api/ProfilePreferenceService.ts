import axios from "axios";
import type { Badge, Profile } from "../types/entities";
import { BASE_URL, PROFILE_BADGE_ALL, PROFILE_BADGE_EDIT, PROFILE_BADGE_REMOVE, PROFILE_BLACKLIST, PROFILE_BLACKLIST_ADD, PROFILE_BLACKLIST_REMOVE, PROFILE_PREFERENCE_AVATAR_EDIT, PROFILE_PREFERENCE_CHANGE_EMAIL, PROFILE_PREFERENCE_CHANGE_EMAIL_CONFIRM, PROFILE_PREFERENCE_CHANGE_LOGIN, PROFILE_PREFERENCE_CHANGE_LOGIN_INFO, PROFILE_PREFERENCE_CHANGE_PASSWORD, PROFILE_PREFERENCE_GOOGLE_BIND, PROFILE_PREFERENCE_GOOGLE_UNBIND, PROFILE_PREFERENCE_MY, PROFILE_PREFERENCE_PRIVACY_COUNTS_EDIT, PROFILE_PREFERENCE_PRIVACY_FRIEND_REQUESTS_EDIT, PROFILE_PREFERENCE_PRIVACY_SOCIAL_EDIT, PROFILE_PREFERENCE_PRIVACY_STATS_EDIT, PROFILE_PREFERENCE_SECTION_EDIT, PROFILE_PREFERENCE_SOCIAL, PROFILE_PREFERENCE_SOCIAL_EDIT, PROFILE_PREFERENCE_STATUS_DELETE, PROFILE_PREFERENCE_STATUS_EDIT, PROFILE_PREFERENCE_THEMES_EDIT, PROFILE_PREFERENCE_VK_BIND, PROFILE_PREFERENCE_VK_UNBIND } from "./endpoints";
import type { PrivacyEditRequest, ProfilePreferenceEmailChangeConfirmRequest, ProfilePreferenceEmailChangeRequest, ProfilePreferencePasswordChangeRequest, SelectPinnedSectionRequest, SelectThemeRequest, SocialPagesEditRequest, StatusEditRequest } from "./types/requests";
import type { ChangeEmailConfirmResponse, ChangeEmailResponse, ChangeLoginInfoResponse, ChangeLoginResponse, ChangePasswordResponse, PageableResponse, ProfilePreferenceResponse, ProfileSocialResponse } from "./types/responses";

class ProfilePreferenceService {

    async getMyPreferences(token: string): Promise<ProfilePreferenceResponse> {
        const url = `${BASE_URL}${PROFILE_PREFERENCE_MY}?token=${token}`;
        const response = await axios.get<ProfilePreferenceResponse>(url);
        return response.data;
    }

    async getSocialPreferences(token: string): Promise<ProfileSocialResponse> {
        const url = `${BASE_URL}${PROFILE_PREFERENCE_SOCIAL}?token=${token}`;
        const response = await axios.get<ProfileSocialResponse>(url);
        return response.data;
    }

    async changeEmail(request: ProfilePreferenceEmailChangeRequest, token: string): Promise<ChangeEmailResponse> {
        const url = `${BASE_URL}${PROFILE_PREFERENCE_CHANGE_EMAIL}?token=${token}`;
        const response = await axios.get<ChangeEmailResponse>(url);
        return response.data;
    }

    async confirmEmailChange(request: ProfilePreferenceEmailChangeConfirmRequest, token: string): Promise<ChangeEmailConfirmResponse> {
        const url = `${BASE_URL}${PROFILE_PREFERENCE_CHANGE_EMAIL_CONFIRM}?token=${token}`;
        const response = await axios.post<ChangeEmailConfirmResponse>(url, request);
        return response.data;
    }

    async changePassword(request: ProfilePreferencePasswordChangeRequest, token: string): Promise<ChangePasswordResponse> {
        const url = `${BASE_URL}${PROFILE_PREFERENCE_CHANGE_PASSWORD}?token=${token}`;
        const response = await axios.get<ChangePasswordResponse>(url);
        return response.data;
    }

    async deleteStatus(token: string): Promise<{ code: number }> {
        const url = `${BASE_URL}${PROFILE_PREFERENCE_STATUS_DELETE}?token=${token}`;
        const response = await axios.get<{ code: number }>(url);
        return response.data;
    }

    async editAvatar(formData: FormData, token: string): Promise<{ code: number }> {
        const url = `${BASE_URL}${PROFILE_PREFERENCE_AVATAR_EDIT}?token=${token}`;
        const response = await axios.post<{ code: number }>(url, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    }

    async editStatus(request: StatusEditRequest, token: string): Promise<{ code: number }> {
        const url = `${BASE_URL}${PROFILE_PREFERENCE_STATUS_EDIT}?token=${token}`;
        const response = await axios.post<{ code: number }>(url, request);
        return response.data;
    }

    async editSocial(request: SocialPagesEditRequest, token: string): Promise<{ code: number }> {
        const url = `${BASE_URL}${PROFILE_PREFERENCE_SOCIAL_EDIT}?token=${token}`;
        const response = await axios.post<{ code: number }>(url, request);
        return response.data;
    }

    async changeLogin(request: any, token: string): Promise<ChangeLoginResponse> {
        const url = `${BASE_URL}${PROFILE_PREFERENCE_CHANGE_LOGIN}?token=${token}`;
        const response = await axios.post<ChangeLoginResponse>(url, request);
        return response.data;
    }

    async getLoginChangeInfo(token: string): Promise<ChangeLoginInfoResponse> {
        const url = `${BASE_URL}${PROFILE_PREFERENCE_CHANGE_LOGIN_INFO}?token=${token}`;
        const response = await axios.post<ChangeLoginInfoResponse>(url);
        return response.data;
    }

    async bindGoogle(request: { googleIdToken: string }, token: string): Promise<{ code: number }> {
        const url = `${BASE_URL}${PROFILE_PREFERENCE_GOOGLE_BIND}?token=${token}`;
        const response = await axios.post<{ code: number }>(url, request);
        return response.data;
    }

    async unbindGoogle(token: string): Promise<{ code: number }> {
        const url = `${BASE_URL}${PROFILE_PREFERENCE_GOOGLE_UNBIND}?token=${token}`;
        const response = await axios.post<{ code: number }>(url);
        return response.data;
    }

    async bindVk(request: { vkAccessToken: string }, token: string): Promise<{ code: number }> {
        const url = `${BASE_URL}${PROFILE_PREFERENCE_VK_BIND}?token=${token}`;
        const response = await axios.post<{ code: number }>(url, request);
        return response.data;
    }

    async unbindVk(token: string): Promise<{ code: number }> {
        const url = `${BASE_URL}${PROFILE_PREFERENCE_VK_UNBIND}?token=${token}`;
        const response = await axios.post<{ code: number }>(url);
        return response.data;
    }

    async editPrivacyCounts(request: PrivacyEditRequest, token: string): Promise<{ code: number }> {
        const url = `${BASE_URL}${PROFILE_PREFERENCE_PRIVACY_COUNTS_EDIT}?token=${token}`;
        const response = await axios.post<{ code: number }>(url, request);
        return response.data;
    }

    async editPrivacyFriendRequests(request: PrivacyEditRequest, token: string): Promise<{ code: number }> {
        const url = `${BASE_URL}${PROFILE_PREFERENCE_PRIVACY_FRIEND_REQUESTS_EDIT}?token=${token}`;
        const response = await axios.post<{ code: number }>(url, request);
        return response.data;
    }

    async editPrivacySocial(request: PrivacyEditRequest, token: string): Promise<{ code: number }> {
        const url = `${BASE_URL}${PROFILE_PREFERENCE_PRIVACY_SOCIAL_EDIT}?token=${token}`;
        const response = await axios.post<{ code: number }>(url, request);
        return response.data;
    }

    async editPrivacyStats(request: PrivacyEditRequest, token: string): Promise<{ code: number }> {
        const url = `${BASE_URL}${PROFILE_PREFERENCE_PRIVACY_STATS_EDIT}?token=${token}`;
        const response = await axios.post<{ code: number }>(url, request);
        return response.data;
    }

    async selectPinnedSection(request: SelectPinnedSectionRequest, token: string): Promise<{ code: number }> {
        const url = `${BASE_URL}${PROFILE_PREFERENCE_SECTION_EDIT}?token=${token}`;
        const response = await axios.post<{ code: number }>(url, request);
        return response.data;
    }

    async selectTheme(request: SelectThemeRequest, token: string): Promise<{ code: number }> {
        const url = `${BASE_URL}${PROFILE_PREFERENCE_THEMES_EDIT}?token=${token}`;
        const response = await axios.post<{ code: number }>(url, request);
        return response.data;
    }

    async getBadges(page: number | string, token: string): Promise<PageableResponse<Badge>> {
        const url = `${BASE_URL}${PROFILE_BADGE_ALL}${page}?token=${token}`;
        const response = await axios.get<PageableResponse<Badge>>(url);
        return response.data;
    }

    async editBadge(badgeId: number | string, token: string): Promise<{ code: number }> {
        const url = `${BASE_URL}${PROFILE_BADGE_EDIT}${badgeId}?token=${token}`;
        const response = await axios.get<{ code: number }>(url);
        return response.data;
    }

    async removeBadge(token: string): Promise<{ code: number }> {
        const url = `${BASE_URL}${PROFILE_BADGE_REMOVE}?token=${token}`;
        const response = await axios.get<{ code: number }>(url);
        return response.data;
    }

    async getBlocklist(page: number | string, token: string): Promise<PageableResponse<Profile>> {
        const url = `${BASE_URL}${PROFILE_BLACKLIST}${page}?token=${token}`;
        const response = await axios.get<PageableResponse<Profile>>(url);
        return response.data;
    }

    async addToBlocklist(profileId: number | string, token: string): Promise<{ code: number }> {
        const url = `${BASE_URL}${PROFILE_BLACKLIST_ADD}${profileId}?token=${token}`;
        const response = await axios.get<{ code: number }>(url);
        return response.data;
    }

    async removeFromBlocklist(profileId: number | string, token: string): Promise<{ code: number }> {
        const url = `${BASE_URL}${PROFILE_BLACKLIST_REMOVE}${profileId}?token=${token}`;
        const response = await axios.get<{ code: number }>(url);
        return response.data;
    }

}

export const profilePreferenceService = new ProfilePreferenceService();

