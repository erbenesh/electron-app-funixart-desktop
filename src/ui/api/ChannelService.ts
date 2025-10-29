import axios from "axios";
import type { Channel } from "../types/entities";
import { BASE_URL, CHANNEL, CHANNEL_ALL, CHANNEL_AVATAR_UPLOAD, CHANNEL_BLOCK, CHANNEL_BLOCK_MANAGE, CHANNEL_BLOCKS, CHANNEL_BLOG, CHANNEL_BLOG_CREATE, CHANNEL_COVER_UPLOAD, CHANNEL_CREATE, CHANNEL_EDIT, CHANNEL_EDITOR_AVAILABLE, CHANNEL_PERMISSION_MANAGE, CHANNEL_PERMISSIONS, CHANNEL_RECOMMENDATIONS, CHANNEL_SUBSCRIBE, CHANNEL_SUBSCRIBERS, CHANNEL_SUBSCRIPTION_COUNT, CHANNEL_UNSUBSCRIBE } from "./endpoints";
import type { PageableResponse } from "./types/responses";

class ChannelService {

    async getChannel(channelId: number | string, token?: string | null): Promise<any> {
        let url = `${BASE_URL}${CHANNEL}${channelId}`;
        if (token) {
            url += `?token=${token}`;
        }
        const response = await axios.get<any>(url);
        return response.data;
    }

    async getChannelBlog(blogId: number | string, token?: string | null): Promise<any> {
        let url = `${BASE_URL}${CHANNEL_BLOG}${blogId}`;
        if (token) {
            url += `?token=${token}`;
        }
        const response = await axios.get<any>(url);
        return response.data;
    }

    async getChannelBlocks(channelId: number | string, page: number | string, token: string): Promise<PageableResponse<any>> {
        const url = `${BASE_URL}${CHANNEL_BLOCKS}${channelId}/block/all/${page}?token=${token}`;
        const response = await axios.get<PageableResponse<any>>(url);
        return response.data;
    }

    async getChannelPosts(channelId: number | string, page: number | string, token: string): Promise<PageableResponse<any>> {
        // Используем endpoint для блоков канала - это правильный способ получить посты конкретного канала
        // channel/{c_id}/block/all/{page}
        const url = `${BASE_URL}${CHANNEL_BLOCKS}${channelId}/block/all/${page}?token=${token}`;
        const response = await axios.get<PageableResponse<any>>(url);
        return response.data;
    }

    async getChannelBlock(channelId: number | string, profileId: number | string, token: string): Promise<any> {
        const url = `${BASE_URL}${CHANNEL_BLOCK}${channelId}/block/${profileId}?token=${token}`;
        const response = await axios.get<any>(url);
        return response.data;
    }

    async getChannelSubscribers(channelId: number | string, page: number | string, token: string): Promise<PageableResponse<any>> {
        const url = `${BASE_URL}${CHANNEL_SUBSCRIBERS}${channelId}/subscriber/all/${page}?token=${token}`;
        const response = await axios.get<PageableResponse<any>>(url);
        return response.data;
    }

    async getSubscriptionCount(token: string): Promise<{ code: number; count: number }> {
        const url = `${BASE_URL}${CHANNEL_SUBSCRIPTION_COUNT}?token=${token}`;
        const response = await axios.get<{ code: number; count: number }>(url);
        return response.data;
    }

    async getEditorAvailable(channelId: number | string, token: string): Promise<{ code: number; available: boolean }> {
        const url = `${BASE_URL}${CHANNEL_EDITOR_AVAILABLE}${channelId}/editor/available?token=${token}`;
        const response = await axios.get<{ code: number; available: boolean }>(url);
        return response.data;
    }

    async createChannel(request: any, token: string): Promise<any> {
        const url = `${BASE_URL}${CHANNEL_CREATE}?token=${token}`;
        const response = await axios.post<any>(url, request);
        return response.data;
    }

    async createBlog(request: any, token: string): Promise<any> {
        const url = `${BASE_URL}${CHANNEL_BLOG_CREATE}?token=${token}`;
        const response = await axios.post<any>(url, request);
        return response.data;
    }

    async editChannel(channelId: number | string, request: any, token: string): Promise<any> {
        const url = `${BASE_URL}${CHANNEL_EDIT}${channelId}?token=${token}`;
        const response = await axios.post<any>(url, request);
        return response.data;
    }

    async getAllChannels(page: number | string, token: string): Promise<PageableResponse<Channel>> {
        const url = `${BASE_URL}${CHANNEL_ALL}${page}?token=${token}`;
        const response = await axios.post<PageableResponse<Channel>>(url);
        return response.data;
    }

    async getRecommendations(page: number | string, token: string): Promise<PageableResponse<Channel>> {
        const url = `${BASE_URL}${CHANNEL_RECOMMENDATIONS}${page}?token=${token}`;
        const response = await axios.post<PageableResponse<Channel>>(url);
        return response.data;
    }

    async subscribe(channelId: number | string, token: string): Promise<{ code: number }> {
        const url = `${BASE_URL}${CHANNEL_SUBSCRIBE}${channelId}?token=${token}`;
        const response = await axios.get<{ code: number }>(url);
        return response.data;
    }

    async unsubscribe(channelId: number | string, token: string): Promise<{ code: number }> {
        const url = `${BASE_URL}${CHANNEL_UNSUBSCRIBE}${channelId}?token=${token}`;
        const response = await axios.get<{ code: number }>(url);
        return response.data;
    }

    async manageBlock(channelId: number | string, request: any, token: string): Promise<{ code: number }> {
        const url = `${BASE_URL}${CHANNEL_BLOCK_MANAGE}${channelId}/block/manage?token=${token}`;
        const response = await axios.post<{ code: number }>(url, request);
        return response.data;
    }

    async managePermission(channelId: number | string, request: any, token: string): Promise<{ code: number }> {
        const url = `${BASE_URL}${CHANNEL_PERMISSION_MANAGE}${channelId}/permission/manage?token=${token}`;
        const response = await axios.post<{ code: number }>(url, request);
        return response.data;
    }

    async getPermissions(channelId: number | string, page: number | string, token: string): Promise<PageableResponse<any>> {
        const url = `${BASE_URL}${CHANNEL_PERMISSIONS}${channelId}/permission/all/${page}?token=${token}`;
        const response = await axios.get<PageableResponse<any>>(url);
        return response.data;
    }

    async uploadAvatar(channelId: number | string, formData: FormData, token: string): Promise<any> {
        const url = `${BASE_URL}${CHANNEL_AVATAR_UPLOAD}${channelId}?token=${token}`;
        const response = await axios.post<any>(url, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    }

    async uploadCover(channelId: number | string, formData: FormData, token: string): Promise<any> {
        const url = `${BASE_URL}${CHANNEL_COVER_UPLOAD}${channelId}?token=${token}`;
        const response = await axios.post<any>(url, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    }

}

export const channelService = new ChannelService();

