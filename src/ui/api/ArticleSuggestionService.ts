import axios from "axios";
import type { Article } from "../types/entities";
import { ARTICLE_SUGGESTION, ARTICLE_SUGGESTION_ALL, ARTICLE_SUGGESTION_CREATE, ARTICLE_SUGGESTION_DELETE, ARTICLE_SUGGESTION_EDIT, ARTICLE_SUGGESTION_PUBLISH, BASE_URL } from "./endpoints";
import type { ArticleResponse, PageableResponse } from "./types/responses";

class ArticleSuggestionService {

    async getSuggestion(articleId: number | string, token: string): Promise<ArticleResponse> {
        const url = `${BASE_URL}${ARTICLE_SUGGESTION}${articleId}?token=${token}`;
        const response = await axios.get<ArticleResponse>(url);
        return response.data;
    }

    async getAllSuggestions(page: number | string, token: string): Promise<PageableResponse<Article>> {
        const url = `${BASE_URL}${ARTICLE_SUGGESTION_ALL}${page}?token=${token}`;
        const response = await axios.get<PageableResponse<Article>>(url);
        return response.data;
    }

    async createSuggestion(blogId: number | string, request: any, token: string): Promise<any> {
        const url = `${BASE_URL}${ARTICLE_SUGGESTION_CREATE}${blogId}?token=${token}`;
        const response = await axios.post<any>(url, request);
        return response.data;
    }

    async deleteSuggestion(articleId: number | string, token: string): Promise<{ code: number }> {
        const url = `${BASE_URL}${ARTICLE_SUGGESTION_DELETE}${articleId}?token=${token}`;
        const response = await axios.post<{ code: number }>(url);
        return response.data;
    }

    async editSuggestion(articleId: number | string, request: any, token: string): Promise<any> {
        const url = `${BASE_URL}${ARTICLE_SUGGESTION_EDIT}${articleId}?token=${token}`;
        const response = await axios.post<any>(url, request);
        return response.data;
    }

    async publishSuggestion(articleId: number | string, token: string): Promise<{ code: number }> {
        const url = `${BASE_URL}${ARTICLE_SUGGESTION_PUBLISH}${articleId}?token=${token}`;
        const response = await axios.post<{ code: number }>(url);
        return response.data;
    }

}

export const articleSuggestionService = new ArticleSuggestionService();

