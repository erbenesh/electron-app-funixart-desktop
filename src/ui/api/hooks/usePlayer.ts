import { useInfiniteQuery, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { Release } from "../../types/entities";
import { playerService } from "../PlayerService";
import type { EpisodeResponse, EpisodeTargetResponse, EpisodeWatchResponse, PageableResponse, SourcesResponse, TypesResponse } from "../types/responses";

export function useGetEpisodeTypes(releaseId: string | number | null, token?: string | null) {
    return useQuery<TypesResponse>({
        queryKey: ["getEpisodeTypes", releaseId, token],
        queryFn: () => playerService.getEpisodeTypes(releaseId!, token),
        enabled: Boolean(releaseId),
    });
}

export function useGetEpisodeSources(
    releaseId: string | number | null,
    typeId: string | number | null,
    token?: string | null
) {
    return useQuery<SourcesResponse>({
        queryKey: ["getEpisodeSources", releaseId, typeId, token],
        queryFn: () => playerService.getEpisodeSources(releaseId!, typeId!, token),
        enabled: Boolean(releaseId && typeId),
    });
}

export function useGetEpisodes(
    releaseId: string | number | null,
    typeId: string | number | null,
    sourceId: string | number | null,
    token?: string | null
) {
    return useQuery<EpisodeResponse>({
        queryKey: ["getEpisodes", releaseId, typeId, sourceId, token],
        queryFn: () => playerService.getEpisodes(releaseId!, typeId!, sourceId!, token),
        enabled: Boolean(releaseId && typeId && sourceId),
    });
}

export function useGetEpisodeTarget(
    releaseId: string | number | null,
    sourceId: string | number | null,
    position: number | null,
    token?: string | null
) {
    return useQuery<EpisodeTargetResponse>({
        queryKey: ["getEpisodeTarget", releaseId, sourceId, position, token],
        queryFn: () => playerService.getEpisodeTarget(releaseId!, sourceId!, position!, token),
        enabled: Boolean(releaseId && sourceId !== null && position !== null),
    });
}

export function useWatchEpisodePosition() {
    const queryClient = useQueryClient();
    return useMutation<EpisodeWatchResponse, Error, { releaseId: number | string; sourceId: number | string; position: number; token: string }>({
        mutationKey: ["watchEpisodePosition"],
        mutationFn: ({ releaseId, sourceId, position, token }) =>
            playerService.watchEpisodePosition(releaseId, sourceId, position, token),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["getHistory"] });
        },
    });
}

export function useWatchEpisodeSource() {
    const queryClient = useQueryClient();
    return useMutation<EpisodeWatchResponse, Error, { releaseId: number | string; sourceId: number | string; token: string }>({
        mutationKey: ["watchEpisodeSource"],
        mutationFn: ({ releaseId, sourceId, token }) =>
            playerService.watchEpisodeSource(releaseId, sourceId, token),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["getHistory"] });
        },
    });
}

export function useGetHistoryInfinite(token: string | null) {
    return useInfiniteQuery<PageableResponse<Release>, Error, { pages: Release[]; pageParams: number[] }, readonly unknown[], number>({
        queryKey: ["getHistory", token],
        queryFn: ({ pageParam }) => playerService.getHistory(token!, pageParam as number),
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

export function useAddToHistory() {
    const queryClient = useQueryClient();
    return useMutation<{ code: number }, Error, { releaseId: number | string; sourceId: number | string; position: number; token: string }>({
        mutationKey: ["addToHistory"],
        mutationFn: ({ releaseId, sourceId, position, token }) =>
            playerService.addToHistory(releaseId, sourceId, position, token),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["getHistory"] });
        },
    });
}

export function useDeleteHistory() {
    const queryClient = useQueryClient();
    return useMutation<{ code: number }, Error, { releaseId: number | string; token: string }>({
        mutationKey: ["deleteHistory"],
        mutationFn: ({ releaseId, token }) =>
            playerService.deleteHistory(releaseId, token),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["getHistory"] });
        },
    });
}

// Legacy hooks for backward compatibility
export function useLoadPlayerVoiceovers(releaseId: string) {
    return useMutation({
        mutationKey: ["voice over", releaseId],
        mutationFn: () => playerService.getReleasePlayer(releaseId),
    });
}

export function useLoadPlayerSources(releaseId: string, voiceoverId: number | string) {
    return useMutation({
        mutationKey: ["sources", releaseId],
        mutationFn: () => playerService.getReleasePlayer(`${releaseId}/${voiceoverId}`),
    });
}

export function useLoadPlayerEpisodes(params: { releaseId: string; voiceoverId: number | string; sourceId: number | string; token: string }) {
    const { releaseId, voiceoverId, sourceId, token } = params;
    return useMutation({
        mutationKey: ["episodes", releaseId],
        mutationFn: () => playerService.getReleasePlayer(`${releaseId}/${voiceoverId}/${sourceId}?token=${token}`),
    });
}

export function useAddHistory(params: { releaseId: string | number; sourceId: string | number; token: string }) {
    const { releaseId, sourceId, token } = params;
    return useMutation({
        mutationKey: ["addHistory", releaseId, sourceId, token],
        mutationFn: (position: number | string) => playerService.getToHistory(`${releaseId}/${sourceId}/${position}?token=${token}`),
    });
}

export function useMarkWatched(params: { releaseId: string | number; sourceId: string | number; token: string }) {
    const { releaseId, sourceId, token } = params;
    return useMutation({
        mutationKey: ["markWatched", releaseId, sourceId, token],
        mutationFn: (position: number | string) => playerService.getMarkWatched(`${releaseId}/${sourceId}/${position}?token=${token}`),
    });
}


