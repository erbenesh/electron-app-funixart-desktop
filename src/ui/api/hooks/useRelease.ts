import { useInfiniteQuery, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { Release } from "../../types/entities";
import { releaseService } from "../ReleaseService";
import type { PageableResponse, ReleaseResponse } from "../types/responses";

export function useGetRandomRelease(token?: string | null) {
    return useQuery<ReleaseResponse>({
        queryKey: ["getRandomRelease", token],
        queryFn: () => releaseService.getRandomRelease(token),
    });
}

export function useGetRandomFavoriteRelease(token: string | null) {
    return useQuery<ReleaseResponse>({
        queryKey: ["getRandomFavoriteRelease", token],
        queryFn: () => releaseService.getRandomFavoriteRelease(token!),
        enabled: Boolean(token),
    });
}

export function useGetRandomReleaseFromProfileList(
    profileId: number | string | null,
    status: number | null,
    token: string | null
) {
    return useQuery<ReleaseResponse>({
        queryKey: ["getRandomReleaseFromProfileList", profileId, status, token],
        queryFn: () => releaseService.getRandomReleaseFromProfileList(profileId!, status!, token!),
        enabled: Boolean(profileId && status !== null && token),
    });
}

export function useGetRandomReleaseFromCollection(
    collectionId: number | string | null,
    token: string | null
) {
    return useQuery<ReleaseResponse>({
        queryKey: ["getRandomReleaseFromCollection", collectionId, token],
        queryFn: () => releaseService.getRandomReleaseFromCollection(collectionId!, token!),
        enabled: Boolean(collectionId && token),
    });
}

export function useGetCurrentRelease(params: { id: number | string; token: string | null }) {
    const { id, token } = params;
    return useQuery<ReleaseResponse>({
        queryKey: ["getCurrentRelease", id, token],
        queryFn: () => releaseService.getCurrentRelease(id, token),
        enabled: Boolean(id),
    });
}

export function useVoteRelease() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationKey: ["voteRelease"],
        mutationFn: ({ releaseId, vote, token }: { releaseId: number | string; vote: number; token: string }) =>
            releaseService.voteRelease(releaseId, vote, token),
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({ queryKey: ["getCurrentRelease", variables.releaseId] });
        },
    });
}

export function useDeleteVote() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationKey: ["deleteVote"],
        mutationFn: ({ releaseId, token }: { releaseId: number | string; token: string }) =>
            releaseService.deleteVote(releaseId, token),
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({ queryKey: ["getCurrentRelease", variables.releaseId] });
        },
    });
}

export function useGetLastUpdatedReleasesInfinite(
    params: { status: string; token: string | null; sort?: number | null }
) {
    const { status, token, sort = 0 } = params;
    return useInfiniteQuery<PageableResponse<Release>, Error, { pages: Release[]; pageParams: number[] }, readonly unknown[], number>({
        queryKey: ["getLastUpdatedReleases", status, token, sort],
        queryFn: ({ pageParam }) => releaseService.getLastUpdatedReleases(status, token, pageParam as number, sort ?? 0),
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
    });
}


