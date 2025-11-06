import axios from "axios";
import type { ArticleComment, CollectionComment, ReleaseComment } from "../types/entities";
import { ARTICLE_COMMENT_ADD, ARTICLE_COMMENT_ALL, ARTICLE_COMMENT_ALL_POPULAR, ARTICLE_COMMENT_ALL_PROFILE, ARTICLE_COMMENT_DELETE, ARTICLE_COMMENT_EDIT, ARTICLE_COMMENT_PROCESS, ARTICLE_COMMENT_REPLIES, ARTICLE_COMMENT_REPORT, ARTICLE_COMMENT_VOTE, ARTICLE_COMMENT_VOTES, BASE_URL, COLLECTION_COMMENTS, COLLECTION_COMMENTS_ADD, COLLECTION_COMMENTS_DELETE, COLLECTION_COMMENTS_EDIT, COLLECTION_COMMENTS_PROCESS, COLLECTION_COMMENTS_PROFILE, COLLECTION_COMMENTS_REPLIES, COLLECTION_COMMENTS_REPORT, COLLECTION_COMMENTS_VOTE, COLLECTION_COMMENTS_VOTES, RELEASE_COMMENT_ADD, RELEASE_COMMENT_DELETE, RELEASE_COMMENT_EDIT, RELEASE_COMMENT_PROCESS, RELEASE_COMMENT_PROFILE, RELEASE_COMMENT_REPLIES, RELEASE_COMMENT_REPORT, RELEASE_COMMENT_VOTE, RELEASE_COMMENT_VOTES, RELEASE_COMMENTS_PAGE } from "./endpoints";
import type { CommentAddRequest, CommentEditRequest, CommentReportRequest } from "./types/requests";
import type { CommentAddResponse, PageableResponse, ReportResponse } from "./types/responses";

class CommentService {

    async getAllComments(
        type: "release" | "collection" | "article",
        entityId: number | string, 
        page: string | number,
        token: string
    ): Promise<PageableResponse<ReleaseComment | CollectionComment | ArticleComment>> {
        let url: string;
        if (type === "release") {
            url = `${BASE_URL}${RELEASE_COMMENTS_PAGE}${entityId}/${page}?sort=1&token=${token}`;
        } else if (type === "collection") {
            url = `${BASE_URL}${COLLECTION_COMMENTS}${entityId}/${page}?sort=1&token=${token}`;
        } else {
            // Article comments
            url = `${BASE_URL}${ARTICLE_COMMENT_ALL}${entityId}/${page}?sort=1&token=${token}`;
        }

        const response = await axios.get<PageableResponse<ReleaseComment | CollectionComment | ArticleComment>>(url);
        return response.data;
    }

    async addReleaseComment(
        releaseId: number | string,
        request: CommentAddRequest,
        token: string
    ): Promise<CommentAddResponse<ReleaseComment>> {
        const url = `${BASE_URL}${RELEASE_COMMENT_ADD}${releaseId}?token=${token}`;
        const response = await axios.post<CommentAddResponse<ReleaseComment>>(url, request);
        return response.data;
    }

    async addCollectionComment(
        collectionId: number | string,
        request: CommentAddRequest,
        token: string
    ): Promise<CommentAddResponse<CollectionComment>> {
        const url = `${BASE_URL}${COLLECTION_COMMENTS_ADD}${collectionId}?token=${token}`;
        const response = await axios.post<CommentAddResponse<CollectionComment>>(url, request);
        return response.data;
    }

    async addArticleComment(
        articleId: number | string,
        request: CommentAddRequest,
        token: string
    ): Promise<CommentAddResponse<ArticleComment>> {
        const url = `${BASE_URL}${ARTICLE_COMMENT_ADD}${articleId}?token=${token}`;
        const response = await axios.post<CommentAddResponse<ArticleComment>>(url, request);
        return response.data;
    }

    async editReleaseComment(
        commentId: number | string,
        request: CommentEditRequest,
        token: string
    ): Promise<CommentAddResponse<ReleaseComment>> {
        const url = `${BASE_URL}${RELEASE_COMMENT_EDIT}${commentId}?token=${token}`;
        const response = await axios.post<CommentAddResponse<ReleaseComment>>(url, request);
        return response.data;
    }

    async editCollectionComment(
        commentId: number | string,
        request: CommentEditRequest,
        token: string
    ): Promise<CommentAddResponse<CollectionComment>> {
        const url = `${BASE_URL}${COLLECTION_COMMENTS_EDIT}${commentId}?token=${token}`;
        const response = await axios.post<CommentAddResponse<CollectionComment>>(url, request);
        return response.data;
    }

    async editArticleComment(
        commentId: number | string,
        request: CommentEditRequest,
        token: string
    ): Promise<CommentAddResponse<ArticleComment>> {
        const url = `${BASE_URL}${ARTICLE_COMMENT_EDIT}${commentId}?token=${token}`;
        const response = await axios.post<CommentAddResponse<ArticleComment>>(url, request);
        return response.data;
    }

    async deleteReleaseComment(
        commentId: number | string,
        token: string
    ): Promise<{ code: number }> {
        const url = `${BASE_URL}${RELEASE_COMMENT_DELETE}${commentId}?token=${token}`;
        const response = await axios.get<{ code: number }>(url);
        return response.data;
    }

    async deleteCollectionComment(
        commentId: number | string,
        token: string
    ): Promise<{ code: number }> {
        const url = `${BASE_URL}${COLLECTION_COMMENTS_DELETE}${commentId}?token=${token}`;
        const response = await axios.get<{ code: number }>(url);
        return response.data;
    }

    async deleteArticleComment(
        commentId: number | string,
        token: string
    ): Promise<{ code: number }> {
        const url = `${BASE_URL}${ARTICLE_COMMENT_DELETE}${commentId}?token=${token}`;
        const response = await axios.get<{ code: number }>(url);
        return response.data;
    }

    async voteReleaseComment(
        commentId: number | string,
        vote: number,
        token: string
    ): Promise<{ code: number }> {
        const url = `${BASE_URL}${RELEASE_COMMENT_VOTE}${commentId}/${vote}?token=${token}`;
        const response = await axios.get<{ code: number }>(url);
        return response.data;
    }

    async voteCollectionComment(
        commentId: number | string,
        vote: number,
        token: string
    ): Promise<{ code: number }> {
        const url = `${BASE_URL}${COLLECTION_COMMENTS_VOTE}${commentId}/${vote}?token=${token}`;
        const response = await axios.get<{ code: number }>(url);
        return response.data;
    }

    async voteArticleComment(
        commentId: number | string,
        vote: number,
        token: string
    ): Promise<{ code: number }> {
        const url = `${BASE_URL}${ARTICLE_COMMENT_VOTE}${commentId}/${vote}?token=${token}`;
        const response = await axios.get<{ code: number }>(url);
        return response.data;
    }

    async getReleaseCommentReplies(
        commentId: number | string,
        page: number | string,
        token: string
    ): Promise<PageableResponse<ReleaseComment>> {
        const url = `${BASE_URL}${RELEASE_COMMENT_REPLIES}${commentId}/${page}?token=${token}`;
        const response = await axios.get<PageableResponse<ReleaseComment>>(url);
        return response.data;
    }

    async getCollectionCommentReplies(
        commentId: number | string,
        page: number | string,
        token: string
    ): Promise<PageableResponse<CollectionComment>> {
        const url = `${BASE_URL}${COLLECTION_COMMENTS_REPLIES}${commentId}/${page}?token=${token}`;
        const response = await axios.get<PageableResponse<CollectionComment>>(url);
        return response.data;
    }

    async getArticleCommentReplies(
        commentId: number | string,
        page: number | string,
        token: string
    ): Promise<PageableResponse<ArticleComment>> {
        const url = `${BASE_URL}${ARTICLE_COMMENT_REPLIES}${commentId}/${page}?token=${token}`;
        const response = await axios.get<PageableResponse<ArticleComment>>(url);
        return response.data;
    }

    async getReleaseCommentVotes(
        commentId: number | string,
        page: number | string,
        token: string
    ): Promise<PageableResponse<any>> {
        const url = `${BASE_URL}${RELEASE_COMMENT_VOTES}${commentId}/${page}?token=${token}`;
        const response = await axios.post<PageableResponse<any>>(url);
        return response.data;
    }

    async getArticleCommentVotes(
        commentId: number | string,
        page: number | string,
        token: string
    ): Promise<PageableResponse<any>> {
        const url = `${BASE_URL}${ARTICLE_COMMENT_VOTES}${commentId}/${page}?token=${token}`;
        const response = await axios.post<PageableResponse<any>>(url);
        return response.data;
    }

    async getPopularArticleComments(
        articleId: number | string,
        token: string
    ): Promise<PageableResponse<ArticleComment>> {
        const url = `${BASE_URL}${ARTICLE_COMMENT_ALL_POPULAR}${articleId}/popular?token=${token}`;
        const response = await axios.get<PageableResponse<ArticleComment>>(url);
        return response.data;
    }

    async getProfileArticleComments(
        profileId: number | string,
        page: number | string,
        token: string
    ): Promise<PageableResponse<ArticleComment>> {
        const url = `${BASE_URL}${ARTICLE_COMMENT_ALL_PROFILE}${profileId}/${page}?token=${token}`;
        const response = await axios.get<PageableResponse<ArticleComment>>(url);
        return response.data;
    }

    async getProfileReleaseComments(
        profileId: number | string,
        page: number | string,
        token: string
    ): Promise<PageableResponse<ReleaseComment>> {
        const url = `${BASE_URL}${RELEASE_COMMENT_PROFILE}${profileId}/${page}?token=${token}`;
        const response = await axios.get<PageableResponse<ReleaseComment>>(url);
        return response.data;
    }

    async processReleaseComment(
        commentId: number | string,
        request: any,
        token: string
    ): Promise<{ code: number }> {
        const url = `${BASE_URL}${RELEASE_COMMENT_PROCESS}${commentId}?token=${token}`;
        const response = await axios.post<{ code: number }>(url, request);
        return response.data;
    }

    async processCollectionComment(
        commentId: number | string,
        request: any,
        token: string
    ): Promise<{ code: number }> {
        const url = `${BASE_URL}${COLLECTION_COMMENTS_PROCESS}${commentId}?token=${token}`;
        const response = await axios.post<{ code: number }>(url, request);
        return response.data;
    }

    async processArticleComment(
        commentId: number | string,
        request: any,
        token: string
    ): Promise<{ code: number }> {
        const url = `${BASE_URL}${ARTICLE_COMMENT_PROCESS}${commentId}?token=${token}`;
        const response = await axios.post<{ code: number }>(url, request);
        return response.data;
    }

    async reportReleaseComment(
        commentId: number | string,
        request: CommentReportRequest,
        token: string
    ): Promise<ReportResponse> {
        const url = `${BASE_URL}${RELEASE_COMMENT_REPORT}${commentId}?token=${token}`;
        const response = await axios.post<ReportResponse>(url, request);
        return response.data;
    }

    async reportCollectionComment(
        commentId: number | string,
        request: CommentReportRequest,
        token: string
    ): Promise<ReportResponse> {
        const url = `${BASE_URL}${COLLECTION_COMMENTS_REPORT}${commentId}?token=${token}`;
        const response = await axios.post<ReportResponse>(url, request);
        return response.data;
    }

    async reportArticleComment(
        commentId: number | string,
        request: CommentReportRequest,
        token: string
    ): Promise<ReportResponse> {
        const url = `${BASE_URL}${ARTICLE_COMMENT_REPORT}${commentId}?token=${token}`;
        const response = await axios.post<ReportResponse>(url, request);
        return response.data;
    }

    async getCollectionCommentVotes(
        commentId: number | string,
        page: number | string,
        token: string
    ): Promise<PageableResponse<any>> {
        const url = `${BASE_URL}${COLLECTION_COMMENTS_VOTES}${commentId}/${page}?token=${token}`;
        const response = await axios.post<PageableResponse<any>>(url);
        return response.data;
    }

    async getProfileCollectionComments(
        profileId: number | string,
        page: number | string,
        token: string
    ): Promise<PageableResponse<CollectionComment>> {
        const url = `${BASE_URL}${COLLECTION_COMMENTS_PROFILE}${profileId}/${page}?token=${token}`;
        const response = await axios.get<PageableResponse<CollectionComment>>(url);
        return response.data;
    }

}

export const commentService = new CommentService();