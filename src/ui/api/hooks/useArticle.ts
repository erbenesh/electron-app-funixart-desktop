import { useInfiniteQuery, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { Article } from "../../types/entities";
import { articleService } from "../ArticleService";
import type { ArticleResponse, PageableResponse } from "../types/responses";

export function useGetArticle(params: { articleId: number | string; token?: string | null }) {
    const { articleId, token } = params;
    return useQuery<ArticleResponse>({
        queryKey: ["getArticle", articleId, token],
        queryFn: () => articleService.getArticle(articleId, token),
        enabled: Boolean(articleId),
    });
}

export function useGetAllArticles(token: string | null) {
    return useInfiniteQuery<PageableResponse<Article>>({
        queryKey: ["getAllArticles", token],
        queryFn: ({ pageParam = 0 }) => articleService.getAllArticles(pageParam as number, token!),
        initialPageParam: 0,
        getNextPageParam: (lastPage) => {
            if (lastPage.currentPage < lastPage.totalPageCount - 1) {
                return lastPage.currentPage + 1;
            }
            return undefined;
        },
        enabled: Boolean(token),
    });
}

export function useGetLatestArticles(token: string | null) {
    return useInfiniteQuery<PageableResponse<Article>>({
        queryKey: ["getLatestArticles", token],
        queryFn: ({ pageParam = 0 }) => articleService.getLatestAll(pageParam as number, token!),
        initialPageParam: 0,
        getNextPageParam: (lastPage) => {
            if (lastPage.currentPage < lastPage.totalPageCount - 1) {
                return lastPage.currentPage + 1;
            }
            return undefined;
        },
        enabled: Boolean(token),
    });
}

export function useGetArticlesByChannelInfinite(params: { channelId: number | string; token: string | null }) {
    const { channelId, token } = params;
    return useInfiniteQuery<PageableResponse<Article>>({
        queryKey: ["getArticlesByChannel", channelId, token],
        queryFn: ({ pageParam = 0 }) => articleService.getArticlesByChannel(pageParam as number, channelId, token!),
        initialPageParam: 0,
        getNextPageParam: (lastPage) => {
            if (lastPage.currentPage < lastPage.totalPageCount - 1) {
                return lastPage.currentPage + 1;
            }
            return undefined;
        },
        enabled: Boolean(channelId && token),
    });
}

export function useVoteArticle() {
    const queryClient = useQueryClient();
    return useMutation<{ code: number }, Error, { articleId: number | string; vote: number; token: string }>({
        mutationKey: ["articles", "vote"],
        mutationFn: ({ articleId, vote, token }) => articleService.voteArticle(articleId, vote, token),
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({ queryKey: ["getArticle", variables.articleId] });
        },
    });
}

export function useCreateArticle() {
    const queryClient = useQueryClient();
    return useMutation<any, Error, { channelId: number | string; request: any; token: string }>({
        mutationKey: ["articles", "create"],
        mutationFn: ({ channelId, request, token }) => articleService.createArticle(channelId, request, token),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["getAllArticles"] });
        },
    });
}

export function useEditArticle() {
    const queryClient = useQueryClient();
    return useMutation<any, Error, { articleId: number | string; request: any; token: string }>({
        mutationKey: ["articles", "edit"],
        mutationFn: ({ articleId, request, token }) => articleService.editArticle(articleId, request, token),
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({ queryKey: ["getArticle", variables.articleId] });
            queryClient.invalidateQueries({ queryKey: ["getAllArticles"] });
        },
    });
}

export function useDeleteArticle() {
    const queryClient = useQueryClient();
    return useMutation<{ code: number }, Error, { articleId: number | string; token: string }>({
        mutationKey: ["articles", "delete"],
        mutationFn: ({ articleId, token }) => articleService.deleteArticle(articleId, token),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["getAllArticles"] });
        },
    });
}

export function useGetArticleReposts(params: { articleId: number | string; page: number | string; token: string }) {
    const { articleId, page, token } = params;
    return useInfiniteQuery<PageableResponse<any>>({
        queryKey: ["getArticleReposts", articleId, token],
        queryFn: ({ pageParam = 0 }) => articleService.getReposts(articleId, pageParam as number, token),
        initialPageParam: 0,
        getNextPageParam: (lastPage) => {
            if (lastPage.currentPage < lastPage.totalPageCount - 1) {
                return lastPage.currentPage + 1;
            }
            return undefined;
        },
        enabled: Boolean(articleId && token),
    });
}

export function useGetArticleVotes(params: { articleId: number | string; page: number | string; token: string }) {
    const { articleId, page, token } = params;
    return useInfiniteQuery<PageableResponse<any>>({
        queryKey: ["getArticleVotes", articleId, token],
        queryFn: ({ pageParam = 0 }) => articleService.getVotes(articleId, pageParam as number, token),
        initialPageParam: 0,
        getNextPageParam: (lastPage) => {
            if (lastPage.currentPage < lastPage.totalPageCount - 1) {
                return lastPage.currentPage + 1;
            }
            return undefined;
        },
        enabled: Boolean(articleId && token),
    });
}

