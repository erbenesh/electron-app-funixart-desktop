import axios from "axios";
import { BASE_URL, NOTIFICATION_ALL, NOTIFICATION_ARTICLE_COMMENT_DELETE, NOTIFICATION_ARTICLE_COMMENTS, NOTIFICATION_ARTICLES, NOTIFICATION_COLLECTION_COMMENT_DELETE, NOTIFICATION_COLLECTION_COMMENTS, NOTIFICATION_COUNT, NOTIFICATION_DELETE_ALL, NOTIFICATION_EPISODE_DELETE, NOTIFICATION_EPISODES, NOTIFICATION_FRIEND_DELETE, NOTIFICATION_FRIENDS, NOTIFICATION_MY_ARTICLE_COMMENT_DELETE, NOTIFICATION_MY_ARTICLE_COMMENTS, NOTIFICATION_MY_COLLECTION_COMMENT_DELETE, NOTIFICATION_MY_COLLECTION_COMMENTS, NOTIFICATION_READ, NOTIFICATION_RELATED_RELEASE, NOTIFICATION_RELATED_RELEASE_DELETE, NOTIFICATION_RELEASE_COMMENT_DELETE, NOTIFICATION_RELEASE_COMMENTS } from "./endpoints";
import type { NotificationCountResponse, PageableResponse } from "./types/responses";

class NotificationService {

    async getAllNotifications(page: number | string, token: string): Promise<PageableResponse<any>> {
        const url = `${BASE_URL}${NOTIFICATION_ALL}${page}?token=${token}`;
        const response = await axios.get<PageableResponse<any>>(url);
        return response.data;
    }

    async getNotificationCount(token: string): Promise<NotificationCountResponse> {
        const url = `${BASE_URL}${NOTIFICATION_COUNT}?token=${token}`;
        const response = await axios.get<NotificationCountResponse>(url);
        return response.data;
    }

    async deleteAllNotifications(token: string): Promise<{ code: number }> {
        const url = `${BASE_URL}${NOTIFICATION_DELETE_ALL}?token=${token}`;
        const response = await axios.get<{ code: number }>(url);
        return response.data;
    }

    async markAsRead(token: string): Promise<{ code: number }> {
        const url = `${BASE_URL}${NOTIFICATION_READ}?token=${token}`;
        const response = await axios.get<{ code: number }>(url);
        return response.data;
    }

    async getArticleComments(page: number | string, token: string): Promise<PageableResponse<any>> {
        const url = `${BASE_URL}${NOTIFICATION_ARTICLE_COMMENTS}${page}?token=${token}`;
        const response = await axios.get<PageableResponse<any>>(url);
        return response.data;
    }

    async getArticles(page: number | string, token: string): Promise<PageableResponse<any>> {
        const url = `${BASE_URL}${NOTIFICATION_ARTICLES}${page}?token=${token}`;
        const response = await axios.get<PageableResponse<any>>(url);
        return response.data;
    }

    async getCollectionComments(page: number | string, token: string): Promise<PageableResponse<any>> {
        const url = `${BASE_URL}${NOTIFICATION_COLLECTION_COMMENTS}${page}?token=${token}`;
        const response = await axios.get<PageableResponse<any>>(url);
        return response.data;
    }

    async getEpisodes(page: number | string, token: string): Promise<PageableResponse<any>> {
        const url = `${BASE_URL}${NOTIFICATION_EPISODES}${page}?token=${token}`;
        const response = await axios.get<PageableResponse<any>>(url);
        return response.data;
    }

    async getFriends(page: number | string, token: string): Promise<PageableResponse<any>> {
        const url = `${BASE_URL}${NOTIFICATION_FRIENDS}${page}?token=${token}`;
        const response = await axios.get<PageableResponse<any>>(url);
        return response.data;
    }

    async getMyArticleComments(page: number | string, token: string): Promise<PageableResponse<any>> {
        const url = `${BASE_URL}${NOTIFICATION_MY_ARTICLE_COMMENTS}${page}?token=${token}`;
        const response = await axios.get<PageableResponse<any>>(url);
        return response.data;
    }

    async getMyCollectionComments(page: number | string, token: string): Promise<PageableResponse<any>> {
        const url = `${BASE_URL}${NOTIFICATION_MY_COLLECTION_COMMENTS}${page}?token=${token}`;
        const response = await axios.get<PageableResponse<any>>(url);
        return response.data;
    }

    async getRelatedRelease(page: number | string, token: string): Promise<PageableResponse<any>> {
        const url = `${BASE_URL}${NOTIFICATION_RELATED_RELEASE}${page}?token=${token}`;
        const response = await axios.get<PageableResponse<any>>(url);
        return response.data;
    }

    async getReleaseComments(page: number | string, token: string): Promise<PageableResponse<any>> {
        const url = `${BASE_URL}${NOTIFICATION_RELEASE_COMMENTS}${page}?token=${token}`;
        const response = await axios.get<PageableResponse<any>>(url);
        return response.data;
    }

    async deleteArticleComment(notificationId: number | string, token: string): Promise<{ code: number }> {
        const url = `${BASE_URL}${NOTIFICATION_ARTICLE_COMMENT_DELETE}${notificationId}?token=${token}`;
        const response = await axios.get<{ code: number }>(url);
        return response.data;
    }

    async deleteCollectionComment(notificationId: number | string, token: string): Promise<{ code: number }> {
        const url = `${BASE_URL}${NOTIFICATION_COLLECTION_COMMENT_DELETE}${notificationId}?token=${token}`;
        const response = await axios.get<{ code: number }>(url);
        return response.data;
    }

    async deleteEpisode(notificationId: number | string, token: string): Promise<{ code: number }> {
        const url = `${BASE_URL}${NOTIFICATION_EPISODE_DELETE}${notificationId}?token=${token}`;
        const response = await axios.get<{ code: number }>(url);
        return response.data;
    }

    async deleteFriend(notificationId: number | string, token: string): Promise<{ code: number }> {
        const url = `${BASE_URL}${NOTIFICATION_FRIEND_DELETE}${notificationId}?token=${token}`;
        const response = await axios.get<{ code: number }>(url);
        return response.data;
    }

    async deleteMyArticleComment(notificationId: number | string, token: string): Promise<{ code: number }> {
        const url = `${BASE_URL}${NOTIFICATION_MY_ARTICLE_COMMENT_DELETE}${notificationId}?token=${token}`;
        const response = await axios.get<{ code: number }>(url);
        return response.data;
    }

    async deleteMyCollectionComment(notificationId: number | string, token: string): Promise<{ code: number }> {
        const url = `${BASE_URL}${NOTIFICATION_MY_COLLECTION_COMMENT_DELETE}${notificationId}?token=${token}`;
        const response = await axios.get<{ code: number }>(url);
        return response.data;
    }

    async deleteRelatedRelease(notificationId: number | string, token: string): Promise<{ code: number }> {
        const url = `${BASE_URL}${NOTIFICATION_RELATED_RELEASE_DELETE}${notificationId}?token=${token}`;
        const response = await axios.get<{ code: number }>(url);
        return response.data;
    }

    async deleteReleaseComment(notificationId: number | string, token: string): Promise<{ code: number }> {
        const url = `${BASE_URL}${NOTIFICATION_RELEASE_COMMENT_DELETE}${notificationId}?token=${token}`;
        const response = await axios.get<{ code: number }>(url);
        return response.data;
    }

}

export const notificationService = new NotificationService();

