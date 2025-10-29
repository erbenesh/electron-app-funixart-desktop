import axios from "axios";
import type { Article } from "../types/entities";
import { ARTICLE, ARTICLE_ALL, ARTICLE_CREATE, ARTICLE_DELETE, ARTICLE_EDIT, ARTICLE_LATEST, ARTICLE_LATEST_ALL, ARTICLE_REPOSTS, ARTICLE_VOTE, ARTICLE_VOTES, BASE_URL } from "./endpoints";
import type { ArticleResponse, PageableResponse } from "./types/responses";

class ArticleService {

    async getArticle(articleId: number | string, token?: string | null): Promise<ArticleResponse> {
        let url = `${BASE_URL}${ARTICLE}${articleId}`;
        if (token) {
            url += `?token=${token}`;
        }
        const response = await axios.get<ArticleResponse>(url);
        return response.data;
    }

    async voteArticle(articleId: number | string, vote: number, token: string): Promise<{ code: number }> {
        const url = `${BASE_URL}${ARTICLE_VOTE}${articleId}/${vote}?token=${token}`;
        const response = await axios.get<{ code: number }>(url);
        return response.data;
    }

    async getReposts(articleId: number | string, page: number | string, token: string): Promise<PageableResponse<any>> {
        const url = `${BASE_URL}${ARTICLE_REPOSTS}${articleId}/${page}?token=${token}`;
        const response = await axios.get<PageableResponse<any>>(url);
        return response.data;
    }

    async getAllArticles(page: number | string, token: string): Promise<PageableResponse<Article>> {
        const url = `${BASE_URL}${ARTICLE_ALL}${page}?token=${token}`;
        const response = await axios.post<PageableResponse<Article>>(url);
        return response.data;
    }

    async getArticlesByChannel(page: number | string, channelId: number | string, token: string): Promise<PageableResponse<Article>> {
        const url = `${BASE_URL}${ARTICLE_ALL}${page}?token=${token}`;
        const data = { channel_id: Number(channelId), date: 0 } as any;
        const response = await axios.post<PageableResponse<Article>>(url, data);
        return response.data;
    }

    async createArticle(channelId: number | string, request: any, token: string): Promise<any> {
        const url = `${BASE_URL}${ARTICLE_CREATE}${channelId}?token=${token}`;
        const response = await axios.post<any>(url, request);
        return response.data;
    }

    async deleteArticle(articleId: number | string, token: string): Promise<{ code: number }> {
        const url = `${BASE_URL}${ARTICLE_DELETE}${articleId}?token=${token}`;
        const response = await axios.post<{ code: number }>(url);
        return response.data;
    }

    async editArticle(articleId: number | string, request: any, token: string): Promise<any> {
        const url = `${BASE_URL}${ARTICLE_EDIT}${articleId}?token=${token}`;
        const response = await axios.post<any>(url, request);
        return response.data;
    }

    async getLatest(token: string): Promise<any> {
        const url = `${BASE_URL}${ARTICLE_LATEST}?token=${token}`;
        const response = await axios.post<any>(url);
        return response.data;
    }

    async getLatestAll(page: number | string, token: string): Promise<PageableResponse<Article>> {
        const url = `${BASE_URL}${ARTICLE_LATEST_ALL}${page}?token=${token}`;
        const response = await axios.post<PageableResponse<Article>>(url);
        return response.data;
    }

    async getVotes(articleId: number | string, page: number | string, token: string): Promise<PageableResponse<any>> {
        const url = `${BASE_URL}${ARTICLE_VOTES}${articleId}/${page}?token=${token}`;
        const response = await axios.post<PageableResponse<any>>(url);
        return response.data;
    }

}

export const articleService = new ArticleService();

