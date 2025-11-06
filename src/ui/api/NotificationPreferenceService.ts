import axios from "axios";
import { BASE_URL, NOTIFICATION_PREFERENCE_ARTICLE_EDIT, NOTIFICATION_PREFERENCE_COMMENT_EDIT, NOTIFICATION_PREFERENCE_EPISODE_EDIT, NOTIFICATION_PREFERENCE_EPISODE_FIRST_EDIT, NOTIFICATION_PREFERENCE_MY, NOTIFICATION_PREFERENCE_MY_ARTICLE_COMMENT_EDIT, NOTIFICATION_PREFERENCE_MY_COLLECTION_COMMENT_EDIT, NOTIFICATION_PREFERENCE_RELATED_RELEASE_EDIT, NOTIFICATION_PREFERENCE_RELEASE_ALL, NOTIFICATION_PREFERENCE_RELEASE_TYPE, NOTIFICATION_PREFERENCE_RELEASE_TYPE_EDIT, NOTIFICATION_PREFERENCE_REPORT_PROCESS_EDIT, NOTIFICATION_PREFERENCE_SELECTED_RELEASES_EDIT, NOTIFICATION_PREFERENCE_STATUS_EDIT, NOTIFICATION_PREFERENCE_TYPE_EDIT } from "./endpoints";
import type { NotificationPreferenceEditRequest, NotificationReleaseTypeEditRequest } from "./types/requests";
import type { NotificationPreferenceResponse, PageableResponse, ProfileReleaseTypeNotificationPreferencesResponse } from "./types/responses";

class NotificationPreferenceService {

    async getMyNotificationPreferences(token: string): Promise<NotificationPreferenceResponse> {
        const url = `${BASE_URL}${NOTIFICATION_PREFERENCE_MY}?token=${token}`;
        const response = await axios.get<NotificationPreferenceResponse>(url);
        return response.data;
    }

    async editArticleNotifications(request: NotificationPreferenceEditRequest, token: string): Promise<{ code: number }> {
        const url = `${BASE_URL}${NOTIFICATION_PREFERENCE_ARTICLE_EDIT}?token=${token}`;
        const response = await axios.post<{ code: number }>(url, request);
        return response.data;
    }

    async editCommentNotifications(request: NotificationPreferenceEditRequest, token: string): Promise<{ code: number }> {
        const url = `${BASE_URL}${NOTIFICATION_PREFERENCE_COMMENT_EDIT}?token=${token}`;
        const response = await axios.post<{ code: number }>(url, request);
        return response.data;
    }

    async editEpisodeNotifications(request: NotificationPreferenceEditRequest, token: string): Promise<{ code: number }> {
        const url = `${BASE_URL}${NOTIFICATION_PREFERENCE_EPISODE_EDIT}?token=${token}`;
        const response = await axios.post<{ code: number }>(url, request);
        return response.data;
    }

    async editEpisodeFirstNotifications(request: NotificationPreferenceEditRequest, token: string): Promise<{ code: number }> {
        const url = `${BASE_URL}${NOTIFICATION_PREFERENCE_EPISODE_FIRST_EDIT}?token=${token}`;
        const response = await axios.post<{ code: number }>(url, request);
        return response.data;
    }

    async editMyArticleCommentNotifications(request: NotificationPreferenceEditRequest, token: string): Promise<{ code: number }> {
        const url = `${BASE_URL}${NOTIFICATION_PREFERENCE_MY_ARTICLE_COMMENT_EDIT}?token=${token}`;
        const response = await axios.post<{ code: number }>(url, request);
        return response.data;
    }

    async editMyCollectionCommentNotifications(request: NotificationPreferenceEditRequest, token: string): Promise<{ code: number }> {
        const url = `${BASE_URL}${NOTIFICATION_PREFERENCE_MY_COLLECTION_COMMENT_EDIT}?token=${token}`;
        const response = await axios.post<{ code: number }>(url, request);
        return response.data;
    }

    async getAllReleaseNotificationPreferences(page: number | string, token: string): Promise<PageableResponse<any>> {
        const url = `${BASE_URL}${NOTIFICATION_PREFERENCE_RELEASE_ALL}${page}?token=${token}`;
        const response = await axios.get<PageableResponse<any>>(url);
        return response.data;
    }

    async getReleaseTypeNotificationPreference(releaseId: number | string, token: string): Promise<ProfileReleaseTypeNotificationPreferencesResponse> {
        const url = `${BASE_URL}${NOTIFICATION_PREFERENCE_RELEASE_TYPE}${releaseId}?token=${token}`;
        const response = await axios.get<ProfileReleaseTypeNotificationPreferencesResponse>(url);
        return response.data;
    }

    async editReleaseTypeNotification(request: NotificationReleaseTypeEditRequest, token: string): Promise<{ code: number }> {
        const url = `${BASE_URL}${NOTIFICATION_PREFERENCE_RELEASE_TYPE_EDIT}?token=${token}`;
        const response = await axios.post<{ code: number }>(url, request);
        return response.data;
    }

    async editStatusNotifications(request: NotificationPreferenceEditRequest, token: string): Promise<{ code: number }> {
        const url = `${BASE_URL}${NOTIFICATION_PREFERENCE_STATUS_EDIT}?token=${token}`;
        const response = await axios.post<{ code: number }>(url, request);
        return response.data;
    }

    async editTypeNotifications(request: NotificationPreferenceEditRequest, token: string): Promise<{ code: number }> {
        const url = `${BASE_URL}${NOTIFICATION_PREFERENCE_TYPE_EDIT}?token=${token}`;
        const response = await axios.post<{ code: number }>(url, request);
        return response.data;
    }

    async editRelatedReleaseNotifications(request: NotificationPreferenceEditRequest, token: string): Promise<{ code: number }> {
        const url = `${BASE_URL}${NOTIFICATION_PREFERENCE_RELATED_RELEASE_EDIT}?token=${token}`;
        const response = await axios.post<{ code: number }>(url, request);
        return response.data;
    }

    async editReportProcessNotifications(request: NotificationPreferenceEditRequest, token: string): Promise<{ code: number }> {
        const url = `${BASE_URL}${NOTIFICATION_PREFERENCE_REPORT_PROCESS_EDIT}?token=${token}`;
        const response = await axios.post<{ code: number }>(url, request);
        return response.data;
    }

    async editSelectedReleasesNotifications(request: { releaseIds: number[] }, token: string): Promise<{ code: number }> {
        const url = `${BASE_URL}${NOTIFICATION_PREFERENCE_SELECTED_RELEASES_EDIT}?token=${token}`;
        const response = await axios.post<{ code: number }>(url, request);
        return response.data;
    }

}

export const notificationPreferenceService = new NotificationPreferenceService();

