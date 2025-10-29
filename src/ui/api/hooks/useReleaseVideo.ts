import { useInfiniteQuery, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { ReleaseVideo } from "../../types/entities";
import { releaseVideoService } from "../ReleaseVideoService";
import type { ReleaseVideoAppealRequest } from "../types/requests";
import type { PageableResponse, ReleaseVideoCategoriesResponse, ReleaseVideosResponse } from "../types/responses";

export function useGetReleaseVideos(params: { releaseId: number | string; token?: string | null }) {
    const { releaseId, token } = params;
    return useQuery<ReleaseVideosResponse>({
        queryKey: ["getReleaseVideos", releaseId, token],
        queryFn: () => releaseVideoService.getReleaseVideos(releaseId, token),
        enabled: Boolean(releaseId),
    });
}

export function useGetReleaseVideosPage(params: { releaseId: number | string; page: number | string; token: string }) {
    const { releaseId, page, token } = params;
    return useInfiniteQuery<PageableResponse<ReleaseVideo>>({
        queryKey: ["getReleaseVideosPage", releaseId, token],
        queryFn: ({ pageParam = 0 }) => releaseVideoService.getReleaseVideosPage(releaseId, pageParam, token),
        getNextPageParam: (lastPage) => {
            if (lastPage.currentPage < lastPage.totalPageCount - 1) {
                return lastPage.currentPage + 1;
            }
            return undefined;
        },
        enabled: Boolean(releaseId && token),
    });
}

export function useGetVideoCategories(token?: string | null) {
    return useQuery<ReleaseVideoCategoriesResponse>({
        queryKey: ["getVideoCategories", token],
        queryFn: () => releaseVideoService.getVideoCategories(token),
        enabled: true,
    });
}

export function useAddVideoAppeal() {
    const queryClient = useQueryClient();
    return useMutation<{ code: number }, Error, { request: ReleaseVideoAppealRequest; token: string }>({
        mutationKey: ["releaseVideos", "addAppeal"],
        mutationFn: ({ request, token }) => releaseVideoService.addVideoAppeal(request, token),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["getProfileAppeals"] });
        },
    });
}

export function useAddFavoriteVideo() {
    const queryClient = useQueryClient();
    return useMutation<{ code: number }, Error, { releaseId: number | string; token: string }>({
        mutationKey: ["releaseVideos", "addFavorite"],
        mutationFn: ({ releaseId, token }) => releaseVideoService.addFavoriteVideo(releaseId, token),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["getFavoriteVideos"] });
        },
    });
}

export function useDeleteFavoriteVideo() {
    const queryClient = useQueryClient();
    return useMutation<{ code: number }, Error, { releaseId: number | string; token: string }>({
        mutationKey: ["releaseVideos", "deleteFavorite"],
        mutationFn: ({ releaseId, token }) => releaseVideoService.deleteFavoriteVideo(releaseId, token),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["getFavoriteVideos"] });
        },
    });
}

