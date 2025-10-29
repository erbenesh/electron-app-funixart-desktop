import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import type { Article, Channel } from "../../types/entities";
import { feedService } from "../FeedService";
import type { PageableResponse } from "../types/responses";

export function useGetChannelSubs(token: string | null) {
    return useQuery<PageableResponse<Channel>>({
        queryKey: ["getChannelSubs", token, 0],
        queryFn: () => feedService.getChannelSubs(0, token!),
        enabled: Boolean(token),
    });
}

export function useGetFeedInfinite(params: { path: string; token: string }) {
    const { path, token } = params;
    return useInfiniteQuery<PageableResponse<any>, Error, { pages: any[]; pageParams: number[] }, readonly unknown[], number>({
        queryKey: ["getFeed", path, token],
        queryFn: ({ pageParam }) => feedService.getFeed(path, token, pageParam as number),
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

export function useGetFeedByChannelInfinite(params: { channelId: number | string; token: string }) {
  const { channelId, token } = params;
  return useInfiniteQuery<PageableResponse<any>, Error, PageableResponse<any>, readonly unknown[], number>({
    queryKey: ["getFeedByChannel", channelId, token],
    queryFn: ({ pageParam = 0 }) => feedService.getFeedByChannel(token, channelId, pageParam),
    initialPageParam: 0,
    getNextPageParam: (lastPage, _allPages, lastPageParam) => {
      if ((lastPage as any).content?.length === 0) return undefined;
      return (lastPageParam as number) + 1;
    },
    enabled: Boolean(channelId && token),
  });
}

export function useGetFeedMyInfinite(token: string | null) {
    return useInfiniteQuery<PageableResponse<any>, Error, { pages: any[]; pageParams: number[] }, readonly unknown[], number>({
        queryKey: ["getFeedMy", token],
        queryFn: ({ pageParam }) => feedService.getFeedMy(token!, pageParam as number),
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

export function useGetFeedNewsInfinite(token: string | null) {
    return useInfiniteQuery<PageableResponse<Article>, Error, { pages: Article[]; pageParams: number[] }, readonly unknown[], number>({
        queryKey: ["getFeedNews", token],
        queryFn: ({ pageParam }) => feedService.getFeedNews(token!, pageParam as number),
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


