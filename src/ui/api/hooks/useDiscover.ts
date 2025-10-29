import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import type { Release } from "../../types/entities";
import { discoverService } from "../DiscoverService";
import type { PageableResponse, ScheduleResponse } from "../types/responses";

export function useGetComments(token: string | null) {
    return useQuery<PageableResponse<any>>({
        queryKey: ["getPopularComments", token],
        queryFn: () => discoverService.getComments(token!),
        enabled: Boolean(token),
    });
}

export function useGetWatchingInfinite(token: string | null) {
    return useInfiniteQuery<PageableResponse<Release>, Error, { pages: Release[]; pageParams: number[] }, readonly unknown[], number>({
        queryKey: ["getWatching", token],
        queryFn: ({ pageParam }) => discoverService.getWatching(pageParam as number, token!),
        initialPageParam: 0,
        getNextPageParam: (lastPage, _allPages, lastPageParam) => {
            if (lastPage.content.length === 0) {
                return undefined;
            }
            return (lastPageParam as number) + 1;
        },
        select: (data) => ({
            pages: data.pages.flatMap((page) => page.content),
            pageParams: data.pageParams,
        }),
        enabled: Boolean(token),
    });
}

export function useGetDiscussing(token: string | null) {
    return useQuery<PageableResponse<any>>({
        queryKey: ["getDiscussing", token],
        queryFn: () => discoverService.getDiscussing(token!),
        enabled: Boolean(token),
    });
}

export function useGetRecommendationsInfinite(token: string | null) {
    return useInfiniteQuery<PageableResponse<Release>, Error, { pages: Release[]; pageParams: number[] }, readonly unknown[], number>({
        queryKey: ["getRecommendations", token],
        queryFn: ({ pageParam }) => discoverService.getRecommendations(pageParam as number, token!),
        initialPageParam: 0,
        getNextPageParam: (lastPage, _allPages, lastPageParam) => {
            if (lastPage.content.length === 0) {
                return undefined;
            }
            return (lastPageParam as number) + 1;
        },
        select: (data) => ({
            pages: data.pages.flatMap((page) => page.content),
            pageParams: data.pageParams,
        }),
        enabled: Boolean(token),
    });
}

export function useGetDiscoverInteresting() {
    return useQuery<PageableResponse<Release>>({
        queryKey: ["getDiscoverInteresting"],
        queryFn: () => discoverService.getDiscoverInteresting(),
    });
}

export function useGetSchedule(token: string | null) {
    return useQuery<ScheduleResponse>({
        queryKey: ["getSchedule", token],
        queryFn: () => discoverService.getSchedule(token!),
        enabled: Boolean(token),
    });
}


