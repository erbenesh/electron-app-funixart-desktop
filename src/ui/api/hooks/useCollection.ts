import { useInfiniteQuery, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { Collection } from "../../types/entities";
import { collectionService } from "../CollectionService";
import type { CollectionCreateEditRequest } from "../types/requests";
import type { CollectionCreateEditResponse, CollectionResponse, PageableResponse } from "../types/responses";

export function useGetCurrentCollection(params: { token: string; id: number | string }) {
    const { token, id } = params;
    return useQuery<CollectionResponse>({
        queryKey: ["getCurrentCollection", token, id],
        queryFn: () => collectionService.getCurrentCollection(token, id),
        enabled: Boolean(token && id),
    });
}

export function useGetCurrentCollectionReleasesInfinite(params: { token: string; id: number | string }) {
    const { token, id } = params;
    return useInfiniteQuery<PageableResponse<Collection>, Error, { pages: Collection[]; pageParams: number[] }, readonly unknown[], number>({
        queryKey: ["getCurrentCollectionReleases", token, id],
        queryFn: ({ pageParam }) => collectionService.getCurrentCollectionReleases(token, id, pageParam as number),
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
        enabled: Boolean(token && id),
    });
}

export function useToggleCollectionFavorite(params: { id: number | string; token: string }) {
    const { id, token } = params;
    const queryClient = useQueryClient();
    
    const add = useMutation({
        mutationKey: ["addToFavoriteCollections", id, token],
        mutationFn: () => collectionService.addToFavorite(id, token),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["getCurrentCollection", token, id] });
        },
    });
    
    const remove = useMutation({
        mutationKey: ["deleteFromFavoriteCollections", id, token],
        mutationFn: () => collectionService.deleteFromFavorite(id, token),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["getCurrentCollection", token, id] });
        },
    });
    
    return { add, remove };
}

export function useGetCollectionsInfinite(params: { pageStart?: number; token: string; location: string; profileID?: string | number }) {
    const { token, location, profileID } = params;
    return useInfiniteQuery<PageableResponse<Collection>, Error, { pages: Collection[]; pageParams: number[] }, readonly unknown[], number>({
        queryKey: ["getCollections", location, token, profileID],
        queryFn: ({ pageParam }) => collectionService.getCollections(pageParam as number, token, location, profileID),
        initialPageParam: 0,
        getNextPageParam: (lastPage, _allPages, lastPageParam) => {
            if ((lastPageParam as number) >= lastPage.totalPageCount) {
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

export function useCreateCollection(token: string) {
    const queryClient = useQueryClient();
    return useMutation<CollectionCreateEditResponse, Error, CollectionCreateEditRequest>({
        mutationKey: ["createCollection", token],
        mutationFn: (request) => collectionService.createCollection(request, token),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["getCollections"] });
        },
    });
}

export function useEditCollection(token: string, collectionId: number | string) {
    const queryClient = useQueryClient();
    return useMutation<CollectionCreateEditResponse, Error, CollectionCreateEditRequest>({
        mutationKey: ["editCollection", token, collectionId],
        mutationFn: (request) => collectionService.editCollection(collectionId, request, token),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["getCurrentCollection", token, collectionId] });
            queryClient.invalidateQueries({ queryKey: ["getCollections"] });
        },
    });
}

export function useDeleteCollection(token: string) {
    const queryClient = useQueryClient();
    return useMutation<{ code: number }, Error, number | string>({
        mutationKey: ["deleteCollection", token],
        mutationFn: (collectionId) => collectionService.deleteCollection(collectionId, token),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["getCollections"] });
        },
    });
}


