import { useInfiniteQuery, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { Channel } from "../../types/entities";
import { channelService } from "../ChannelService";
import type { PageableResponse } from "../types/responses";

export function useGetChannel(params: { channelId: number | string; token?: string | null }) {
    const { channelId, token } = params;
    return useQuery({
        queryKey: ["getChannel", channelId, token],
        queryFn: () => channelService.getChannel(channelId, token),
        enabled: Boolean(channelId),
    });
}

export function useGetChannelBlog(params: { blogId: number | string; token?: string | null }) {
    const { blogId, token } = params;
    return useQuery({
        queryKey: ["getChannelBlog", blogId, token],
        queryFn: () => channelService.getChannelBlog(blogId, token),
        enabled: Boolean(blogId),
    });
}

export function useGetChannelBlocks(params: { channelId: number | string; page: number | string; token: string }) {
    const { channelId, page, token } = params;
    return useQuery<PageableResponse<any>>({
        queryKey: ["getChannelBlocks", channelId, page, token],
        queryFn: () => channelService.getChannelBlocks(channelId, page, token),
        enabled: Boolean(channelId && token),
    });
}

export function useGetChannelBlocksInfinite(params: { channelId: number | string; token: string | null }) {
    const { channelId, token } = params;
    return useInfiniteQuery<PageableResponse<any>>({
        queryKey: ["getChannelBlocks", channelId, token],
        queryFn: ({ pageParam = 0 }) => channelService.getChannelBlocks(channelId, pageParam, token!),
        getNextPageParam: (lastPage) => {
            if (lastPage.currentPage < lastPage.totalPageCount - 1) {
                return lastPage.currentPage + 1;
            }
            return undefined;
        },
        enabled: Boolean(channelId && token),
    });
}

export function useGetChannelPostsInfinite(params: { channelId: number | string; token: string | null }) {
    const { channelId, token } = params;
    return useInfiniteQuery<PageableResponse<any>>({
        queryKey: ["getChannelPosts", channelId, token],
        queryFn: ({ pageParam = 0 }) => channelService.getChannelPosts(channelId, pageParam, token!),
        getNextPageParam: (lastPage) => {
            if (lastPage.currentPage < lastPage.totalPageCount - 1) {
                return lastPage.currentPage + 1;
            }
            return undefined;
        },
        enabled: Boolean(channelId && token),
    });
}

export function useGetChannelSubscribers(params: { channelId: number | string; page: number | string; token: string }) {
    const { channelId, page, token } = params;
    return useInfiniteQuery<PageableResponse<any>>({
        queryKey: ["getChannelSubscribers", channelId, token],
        queryFn: ({ pageParam = 0 }) => channelService.getChannelSubscribers(channelId, pageParam, token),
        getNextPageParam: (lastPage) => {
            if (lastPage.currentPage < lastPage.totalPageCount - 1) {
                return lastPage.currentPage + 1;
            }
            return undefined;
        },
        enabled: Boolean(channelId && token),
    });
}

export function useGetSubscriptionCount(token: string | null) {
    return useQuery<{ code: number; count: number }>({
        queryKey: ["getSubscriptionCount", token],
        queryFn: () => channelService.getSubscriptionCount(token!),
        enabled: Boolean(token),
    });
}

export function useGetAllChannels(token: string | null) {
    return useInfiniteQuery<PageableResponse<Channel>>({
        queryKey: ["getAllChannels", token],
        queryFn: ({ pageParam = 0 }) => channelService.getAllChannels(pageParam, token!),
        getNextPageParam: (lastPage) => {
            if (lastPage.currentPage < lastPage.totalPageCount - 1) {
                return lastPage.currentPage + 1;
            }
            return undefined;
        },
        enabled: Boolean(token),
    });
}

export function useGetChannelRecommendations(token: string | null) {
    return useInfiniteQuery<PageableResponse<Channel>>({
        queryKey: ["getChannelRecommendations", token],
        queryFn: ({ pageParam = 0 }) => channelService.getRecommendations(pageParam, token!),
        getNextPageParam: (lastPage) => {
            if (lastPage.currentPage < lastPage.totalPageCount - 1) {
                return lastPage.currentPage + 1;
            }
            return undefined;
        },
        enabled: Boolean(token),
    });
}

export function useSubscribeChannel() {
    const queryClient = useQueryClient();
    return useMutation<{ code: number }, Error, { channelId: number | string; token: string }>({
        mutationKey: ["channels", "subscribe"],
        mutationFn: ({ channelId, token }) => channelService.subscribe(channelId, token),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["getChannel"] });
            queryClient.invalidateQueries({ queryKey: ["getSubscriptionCount"] });
        },
    });
}

export function useUnsubscribeChannel() {
    const queryClient = useQueryClient();
    return useMutation<{ code: number }, Error, { channelId: number | string; token: string }>({
        mutationKey: ["channels", "unsubscribe"],
        mutationFn: ({ channelId, token }) => channelService.unsubscribe(channelId, token),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["getChannel"] });
            queryClient.invalidateQueries({ queryKey: ["getSubscriptionCount"] });
        },
    });
}

export function useCreateChannel() {
    const queryClient = useQueryClient();
    return useMutation<any, Error, { request: any; token: string }>({
        mutationKey: ["channels", "create"],
        mutationFn: ({ request, token }) => channelService.createChannel(request, token),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["getAllChannels"] });
        },
    });
}

export function useEditChannel() {
    const queryClient = useQueryClient();
    return useMutation<any, Error, { channelId: number | string; request: any; token: string }>({
        mutationKey: ["channels", "edit"],
        mutationFn: ({ channelId, request, token }) => channelService.editChannel(channelId, request, token),
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({ queryKey: ["getChannel", variables.channelId] });
            queryClient.invalidateQueries({ queryKey: ["getAllChannels"] });
        },
    });
}

export function useUploadChannelAvatar() {
    const queryClient = useQueryClient();
    return useMutation<any, Error, { channelId: number | string; formData: FormData; token: string }>({
        mutationKey: ["channels", "uploadAvatar"],
        mutationFn: ({ channelId, formData, token }) => channelService.uploadAvatar(channelId, formData, token),
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({ queryKey: ["getChannel", variables.channelId] });
        },
    });
}

export function useUploadChannelCover() {
    const queryClient = useQueryClient();
    return useMutation<any, Error, { channelId: number | string; formData: FormData; token: string }>({
        mutationKey: ["channels", "uploadCover"],
        mutationFn: ({ channelId, formData, token }) => channelService.uploadCover(channelId, formData, token),
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({ queryKey: ["getChannel", variables.channelId] });
        },
    });
}

