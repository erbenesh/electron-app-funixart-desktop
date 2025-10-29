import { useInfiniteQuery, useMutation, useQuery } from "@tanstack/react-query";
import type { Profile } from "../../types/entities";
import { friendsService } from "../FriendsService";
import type { PageableResponse } from "../types/responses";

export function useGetFriends(params: { profileId: number | string; page: number | string; token: string }) {
    const { profileId, page, token } = params;
    return useQuery<PageableResponse<Profile>>({
        queryKey: ["getFriends", profileId, page, token],
        queryFn: () => friendsService.getFriends(profileId, page, token),
        enabled: Boolean(profileId && token),
    });
}

export function useGetFriendRequestsIn(params: { page: number | string; token: string }) {
    const { page, token } = params;
    return useInfiniteQuery<PageableResponse<Profile>>({
        queryKey: ["getFriendRequestsIn", token],
        queryFn: ({ pageParam = 0 }) => friendsService.getFriendRequestsIn(pageParam, token),
        getNextPageParam: (lastPage) => {
            if (lastPage.currentPage < lastPage.totalPageCount - 1) {
                return lastPage.currentPage + 1;
            }
            return undefined;
        },
        enabled: Boolean(token),
    });
}

export function useGetFriendRequestsOut(params: { page: number | string; token: string }) {
    const { page, token } = params;
    return useInfiniteQuery<PageableResponse<Profile>>({
        queryKey: ["getFriendRequestsOut", token],
        queryFn: ({ pageParam = 0 }) => friendsService.getFriendRequestsOut(pageParam, token),
        getNextPageParam: (lastPage) => {
            if (lastPage.currentPage < lastPage.totalPageCount - 1) {
                return lastPage.currentPage + 1;
            }
            return undefined;
        },
        enabled: Boolean(token),
    });
}

export function useGetFriendRequestsInLast(token: string | null) {
    return useQuery<{ code: number; count: number }>({
        queryKey: ["getFriendRequestsInLast", token],
        queryFn: () => friendsService.getFriendRequestsInLast(token!),
        enabled: Boolean(token),
        refetchInterval: 30000, // Обновлять каждые 30 секунд
    });
}

export function useGetFriendRequestsOutLast(token: string | null) {
    return useQuery<{ code: number; count: number }>({
        queryKey: ["getFriendRequestsOutLast", token],
        queryFn: () => friendsService.getFriendRequestsOutLast(token!),
        enabled: Boolean(token),
    });
}

export function useHideFriendRequest() {
    return useMutation<{ code: number }, Error, { requestId: number | string; token: string }>({
        mutationKey: ["friends", "hideRequest"],
        mutationFn: ({ requestId, token }) => friendsService.hideFriendRequest(requestId, token),
    });
}

export function useGetFriendRecommendations(token: string | null) {
    return useQuery<PageableResponse<Profile>>({
        queryKey: ["getFriendRecommendations", token],
        queryFn: () => friendsService.getRecommendations(token!),
        enabled: Boolean(token),
    });
}

export function useSendFriendRequest() {
    return useMutation<{ code: number }, Error, { profileId: number | string; token: string }>({
        mutationKey: ["friends", "sendRequest"],
        mutationFn: ({ profileId, token }) => friendsService.sendFriendRequest(profileId, token),
    });
}

export function useRemoveFriend() {
    return useMutation<{ code: number }, Error, { profileId: number | string; token: string }>({
        mutationKey: ["friends", "removeFriend"],
        mutationFn: ({ profileId, token }) => friendsService.removeFriend(profileId, token),
    });
}

