import { useInfiniteQuery, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { notificationService } from "../NotificationService";
import type { NotificationCountResponse, PageableResponse } from "../types/responses";

export function useGetAllNotifications(token: string | null) {
    return useInfiniteQuery<PageableResponse<any>>({
        queryKey: ["getAllNotifications", token],
        queryFn: ({ pageParam = 0 }) => notificationService.getAllNotifications(pageParam, token!),
        getNextPageParam: (lastPage) => {
            if (lastPage.currentPage < lastPage.totalPageCount - 1) {
                return lastPage.currentPage + 1;
            }
            return undefined;
        },
        enabled: Boolean(token),
    });
}

export function useGetNotificationCount(token: string | null) {
    return useQuery<NotificationCountResponse>({
        queryKey: ["getNotificationCount", token],
        queryFn: () => notificationService.getNotificationCount(token!),
        enabled: Boolean(token),
        refetchInterval: 30000, // Обновлять каждые 30 секунд
    });
}

export function useDeleteAllNotifications() {
    const queryClient = useQueryClient();
    return useMutation<{ code: number }, Error, { token: string }>({
        mutationKey: ["notifications", "deleteAll"],
        mutationFn: ({ token }) => notificationService.deleteAllNotifications(token),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["getAllNotifications"] });
            queryClient.invalidateQueries({ queryKey: ["getNotificationCount"] });
        },
    });
}

export function useMarkNotificationsAsRead() {
    const queryClient = useQueryClient();
    return useMutation<{ code: number }, Error, { token: string }>({
        mutationKey: ["notifications", "markAsRead"],
        mutationFn: ({ token }) => notificationService.markAsRead(token),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["getNotificationCount"] });
        },
    });
}

export function useGetArticleCommentsNotifications(token: string | null) {
    return useInfiniteQuery<PageableResponse<any>>({
        queryKey: ["getArticleCommentsNotifications", token],
        queryFn: ({ pageParam = 0 }) => notificationService.getArticleComments(pageParam, token!),
        getNextPageParam: (lastPage) => {
            if (lastPage.currentPage < lastPage.totalPageCount - 1) {
                return lastPage.currentPage + 1;
            }
            return undefined;
        },
        enabled: Boolean(token),
    });
}

export function useGetEpisodesNotifications(token: string | null) {
    return useInfiniteQuery<PageableResponse<any>>({
        queryKey: ["getEpisodesNotifications", token],
        queryFn: ({ pageParam = 0 }) => notificationService.getEpisodes(pageParam, token!),
        getNextPageParam: (lastPage) => {
            if (lastPage.currentPage < lastPage.totalPageCount - 1) {
                return lastPage.currentPage + 1;
            }
            return undefined;
        },
        enabled: Boolean(token),
    });
}

export function useGetFriendsNotifications(token: string | null) {
    return useInfiniteQuery<PageableResponse<any>>({
        queryKey: ["getFriendsNotifications", token],
        queryFn: ({ pageParam = 0 }) => notificationService.getFriends(pageParam, token!),
        getNextPageParam: (lastPage) => {
            if (lastPage.currentPage < lastPage.totalPageCount - 1) {
                return lastPage.currentPage + 1;
            }
            return undefined;
        },
        enabled: Boolean(token),
    });
}

export function useDeleteNotification() {
    const queryClient = useQueryClient();
    return useMutation<{ code: number }, Error, { notificationId: number | string; token: string; type: string }>({
        mutationKey: ["notifications", "delete"],
        mutationFn: ({ notificationId, token, type }) => {
            switch (type) {
                case "articleComment":
                    return notificationService.deleteArticleComment(notificationId, token);
                case "collectionComment":
                    return notificationService.deleteCollectionComment(notificationId, token);
                case "episode":
                    return notificationService.deleteEpisode(notificationId, token);
                case "friend":
                    return notificationService.deleteFriend(notificationId, token);
                case "myArticleComment":
                    return notificationService.deleteMyArticleComment(notificationId, token);
                case "myCollectionComment":
                    return notificationService.deleteMyCollectionComment(notificationId, token);
                case "relatedRelease":
                    return notificationService.deleteRelatedRelease(notificationId, token);
                case "releaseComment":
                    return notificationService.deleteReleaseComment(notificationId, token);
                default:
                    throw new Error(`Unknown notification type: ${type}`);
            }
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["getAllNotifications"] });
            queryClient.invalidateQueries({ queryKey: ["getNotificationCount"] });
        },
    });
}

