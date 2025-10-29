import { useInfiniteQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import type { Release } from "../../types/entities";
import { bookmarksService } from "../BookmarksService";
import type { PageableResponse } from "../types/responses";

export function useGetFavoritesInfinite(token: string | null) {
    return useInfiniteQuery<PageableResponse<Release>, Error, { pages: Release[]; pageParams: number[] }, readonly unknown[], number>({
        queryKey: ["getFavorites", token],
        queryFn: ({ pageParam }) => bookmarksService.getFavorites(token!, pageParam as number),
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

export function useAddToBookmarkList(params: { releaseId: number | string; token: string }) {
    const { releaseId, token } = params;
    const queryClient = useQueryClient();
    return useMutation<{ code: number }, Error, number>({
        mutationKey: ["addToBookmarkList", releaseId, token],
        mutationFn: (list) => bookmarksService.addToBookmarkList(list, releaseId, token),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["getBookmarks"] });
        },
    });
}

export function useRemoveFromBookmarkList(params: { releaseId: number | string; token: string }) {
    const { releaseId, token } = params;
    const queryClient = useQueryClient();
    return useMutation<{ code: number }, Error, number>({
        mutationKey: ["removeFromBookmarkList", releaseId, token],
        mutationFn: (list) => bookmarksService.removeFromBookmarkList(list, releaseId, token),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["getBookmarks"] });
        },
    });
}

export function useFavoriteReleaseMutations(params: { releaseId: number | string; token: string }) {
    const { releaseId, token } = params;
    const queryClient = useQueryClient();
    
    const add = useMutation<{ code: number }, Error, void>({
        mutationKey: ["addToFavorite", releaseId, token],
        mutationFn: () => bookmarksService.setAddToFavorite(releaseId, token),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["getFavorites", token] });
            queryClient.invalidateQueries({ queryKey: ["getCurrentRelease", releaseId] });
        },
    });
    
    const remove = useMutation<{ code: number }, Error, void>({
        mutationKey: ["deleteFromFavorite", releaseId, token],
        mutationFn: () => bookmarksService.setDeleteFromFavorite(releaseId, token),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["getFavorites", token] });
            queryClient.invalidateQueries({ queryKey: ["getCurrentRelease", releaseId] });
        },
    });
    
    return { add, remove };
}

export function useGetBookmarksInfinite(params: { listName: string; token: string }) {
    const { listName, token } = params;
    return useInfiniteQuery<PageableResponse<Release>, Error, { pages: Release[]; pageParams: number[] }, readonly unknown[], number>({
        queryKey: ["getBookmarks", listName, token],
        queryFn: ({ pageParam }) => bookmarksService.getBookmarks(listName, token, pageParam as number),
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

export function useGetMyBookmarksInfinite(params: { status: number; token: string }) {
    const { status, token } = params;
    return useInfiniteQuery<PageableResponse<Release>, Error, { pages: Release[]; pageParams: number[] }, readonly unknown[], number>({
        queryKey: ["getMyBookmarks", status, token],
        queryFn: ({ pageParam }) => bookmarksService.getMyBookmarks(status, token, pageParam as number),
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


