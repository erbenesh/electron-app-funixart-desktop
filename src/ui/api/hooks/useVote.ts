import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import type { Release } from "../../types/entities";
import { voteService } from "../VoteService";
import type { PageableResponse } from "../types/responses";

export function useGetVotedReleases(params: {
    profileId: number | string;
    token: string | null;
    page?: number | string;
}) {
    const { profileId, token, page = 0 } = params;
    
    return useQuery<PageableResponse<Release>>({
        queryKey: ["getVotedReleases", profileId, page, token],
        queryFn: () => voteService.getVotedReleases(profileId, page, token!),
        enabled: Boolean(profileId && token),
    });
}

export function useGetVotedReleasesInfinite(params: {
    profileId: number | string;
    token: string | null;
}) {
    const { profileId, token } = params;
    
    return useInfiniteQuery<PageableResponse<Release>>({
        queryKey: ["getVotedReleasesInfinite", profileId, token],
        queryFn: ({ pageParam = 0 }) => 
            voteService.getVotedReleases(profileId, pageParam as number, token!),
        enabled: Boolean(profileId && token),
        getNextPageParam: (lastPage) => {
            if (lastPage.totalPageCount && lastPage.currentPage !== undefined) {
                const nextPage = lastPage.currentPage + 1;
                return nextPage < lastPage.totalPageCount ? nextPage : undefined;
            }
            return undefined;
        },
        initialPageParam: 0,
    });
}
