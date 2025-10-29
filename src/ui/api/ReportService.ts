import axios from "axios";
import { BASE_URL, REPORT_ARTICLE, REPORT_ARTICLE_COMMENT, REPORT_ARTICLE_COMMENT_REASONS, REPORT_ARTICLE_REASONS, REPORT_CHANNEL, REPORT_CHANNEL_REASONS, REPORT_COLLECTION, REPORT_COLLECTION_COMMENT, REPORT_COLLECTION_COMMENT_REASONS, REPORT_COLLECTION_REASONS, REPORT_EPISODE, REPORT_EPISODE_REASONS, REPORT_PROFILE, REPORT_PROFILE_REASONS, REPORT_RELEASE, REPORT_RELEASE_COMMENT, REPORT_RELEASE_COMMENTS_REASONS, REPORT_RELEASE_REASONS } from "./endpoints";
import type { CollectionReportRequest, CommentReportRequest, ReleaseReportRequest } from "./types/requests";
import type { ReportResponse } from "./types/responses";

class ReportService {

    async getReleaseReportReasons(): Promise<{ code: number; reasons: any[] }> {
        const url = `${BASE_URL}${REPORT_RELEASE_REASONS}`;
        const response = await axios.get<{ code: number; reasons: any[] }>(url);
        return response.data;
    }

    async getReleaseCommentReportReasons(): Promise<{ code: number; reasons: any[] }> {
        const url = `${BASE_URL}${REPORT_RELEASE_COMMENTS_REASONS}`;
        const response = await axios.get<{ code: number; reasons: any[] }>(url);
        return response.data;
    }

    async getCollectionReportReasons(): Promise<{ code: number; reasons: any[] }> {
        const url = `${BASE_URL}${REPORT_COLLECTION_REASONS}`;
        const response = await axios.get<{ code: number; reasons: any[] }>(url);
        return response.data;
    }

    async getCollectionCommentReportReasons(): Promise<{ code: number; reasons: any[] }> {
        const url = `${BASE_URL}${REPORT_COLLECTION_COMMENT_REASONS}`;
        const response = await axios.get<{ code: number; reasons: any[] }>(url);
        return response.data;
    }

    async getEpisodeReportReasons(): Promise<{ code: number; reasons: any[] }> {
        const url = `${BASE_URL}${REPORT_EPISODE_REASONS}`;
        const response = await axios.get<{ code: number; reasons: any[] }>(url);
        return response.data;
    }

    async getProfileReportReasons(): Promise<{ code: number; reasons: any[] }> {
        const url = `${BASE_URL}${REPORT_PROFILE_REASONS}`;
        const response = await axios.get<{ code: number; reasons: any[] }>(url);
        return response.data;
    }

    async getChannelReportReasons(): Promise<{ code: number; reasons: any[] }> {
        const url = `${BASE_URL}${REPORT_CHANNEL_REASONS}`;
        const response = await axios.get<{ code: number; reasons: any[] }>(url);
        return response.data;
    }

    async getArticleReportReasons(): Promise<{ code: number; reasons: any[] }> {
        const url = `${BASE_URL}${REPORT_ARTICLE_REASONS}`;
        const response = await axios.get<{ code: number; reasons: any[] }>(url);
        return response.data;
    }

    async getArticleCommentReportReasons(): Promise<{ code: number; reasons: any[] }> {
        const url = `${BASE_URL}${REPORT_ARTICLE_COMMENT_REASONS}`;
        const response = await axios.get<{ code: number; reasons: any[] }>(url);
        return response.data;
    }

    async reportRelease(releaseId: number | string, request: ReleaseReportRequest, token: string): Promise<ReportResponse> {
        const url = `${BASE_URL}${REPORT_RELEASE}?token=${token}`;
        const response = await axios.post<ReportResponse>(url, { ...request, releaseId });
        return response.data;
    }

    async reportReleaseComment(commentId: number | string, request: CommentReportRequest, token: string): Promise<ReportResponse> {
        const url = `${BASE_URL}${REPORT_RELEASE_COMMENT}?token=${token}`;
        const response = await axios.post<ReportResponse>(url, { ...request, commentId });
        return response.data;
    }

    async reportCollection(collectionId: number | string, request: CollectionReportRequest, token: string): Promise<ReportResponse> {
        const url = `${BASE_URL}${REPORT_COLLECTION}?token=${token}`;
        const response = await axios.post<ReportResponse>(url, { ...request, collectionId });
        return response.data;
    }

    async reportCollectionComment(commentId: number | string, request: CommentReportRequest, token: string): Promise<ReportResponse> {
        const url = `${BASE_URL}${REPORT_COLLECTION_COMMENT}?token=${token}`;
        const response = await axios.post<ReportResponse>(url, { ...request, commentId });
        return response.data;
    }

    async reportEpisode(releaseId: number | string, sourceId: number | string, position: number, request: any, token: string): Promise<ReportResponse> {
        const url = `${BASE_URL}${REPORT_EPISODE}?token=${token}`;
        const response = await axios.post<ReportResponse>(url, { ...request, releaseId, sourceId, position });
        return response.data;
    }

    async reportProfile(profileId: number | string, request: any, token: string): Promise<ReportResponse> {
        const url = `${BASE_URL}${REPORT_PROFILE}?token=${token}`;
        const response = await axios.post<ReportResponse>(url, { ...request, profileId });
        return response.data;
    }

    async reportChannel(channelId: number | string, request: any, token: string): Promise<ReportResponse> {
        const url = `${BASE_URL}${REPORT_CHANNEL}?token=${token}`;
        const response = await axios.post<ReportResponse>(url, { ...request, channelId });
        return response.data;
    }

    async reportArticle(articleId: number | string, request: any, token: string): Promise<ReportResponse> {
        const url = `${BASE_URL}${REPORT_ARTICLE}?token=${token}`;
        const response = await axios.post<ReportResponse>(url, { ...request, articleId });
        return response.data;
    }

    async reportArticleComment(commentId: number | string, request: CommentReportRequest, token: string): Promise<ReportResponse> {
        const url = `${BASE_URL}${REPORT_ARTICLE_COMMENT}?token=${token}`;
        const response = await axios.post<ReportResponse>(url, { ...request, commentId });
        return response.data;
    }

}

export const reportService = new ReportService();

