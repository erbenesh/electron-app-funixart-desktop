import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import type { Collection, Profile, Release } from "../../types/entities";
import { searchService } from "../SearchService";
import type { PageableResponse, ReleaseSearchResponse } from "../types/responses";

export function useSearchResults(params: { token: string; query: string; searchBy: string | null; location: string }) {
    const { token, query, searchBy, location } = params;
    return useQuery({
        queryKey: ["searchResults", token, query, searchBy, location],
        queryFn: () => searchService.searchResults(token, query, searchBy || "", location),
        enabled: Boolean(token && query),
    });
}

export function useSearchReleasesInfinite(params: { token: string; query: string; searchBy?: number }) {
    const { token, query, searchBy } = params;
    return useInfiniteQuery<ReleaseSearchResponse, Error, { pages: Release[]; pageParams: number[] }, readonly unknown[], number>({
        queryKey: ["searchReleases", token, query, searchBy],
        queryFn: ({ pageParam }) => searchService.searchReleases(token, query, pageParam as number, searchBy),
        initialPageParam: 0,
        getNextPageParam: (lastPage, _allPages, lastPageParam) => {
            if (lastPage.releases && lastPage.releases.length === 0) {
                return undefined;
            }
            return (lastPageParam as number) + 1;
        },
        select: (data) => ({
            pages: data.pages.flatMap((page) => page.releases || []),
            pageParams: data.pageParams,
        }),
        enabled: Boolean(token && query),
    });
}

export function useSearchProfilesInfinite(params: { token: string; query: string; searchBy?: number }) {
    const { token, query, searchBy } = params;
    return useInfiniteQuery<PageableResponse<Profile>, Error, { pages: Profile[]; pageParams: number[] }, readonly unknown[], number>({
        queryKey: ["searchProfiles", token, query, searchBy],
        queryFn: ({ pageParam }) => searchService.searchProfiles(token, query, pageParam as number, searchBy),
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
        enabled: Boolean(token && query),
    });
}

export function useSearchCollectionsInfinite(params: { token: string; query: string; searchBy?: number }) {
    const { token, query, searchBy } = params;
    return useInfiniteQuery<PageableResponse<Collection>, Error, { pages: Collection[]; pageParams: number[] }, readonly unknown[], number>({
        queryKey: ["searchCollections", token, query, searchBy],
        queryFn: ({ pageParam }) => searchService.searchCollections(token, query, pageParam as number, searchBy),
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
        enabled: Boolean(token && query),
    });
}


