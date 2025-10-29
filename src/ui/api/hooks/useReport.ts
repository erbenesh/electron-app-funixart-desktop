import { useMutation, useQuery } from "@tanstack/react-query";
import { reportService } from "../ReportService";
import type { CollectionReportRequest, CommentReportRequest, ReleaseReportRequest } from "../types/requests";
import type { ReportResponse } from "../types/responses";

export function useGetReportReasons(type: string) {
    return useQuery<{ code: number; reasons: any[] }>({
        queryKey: ["getReportReasons", type],
        queryFn: () => {
            switch (type) {
                case "release":
                    return reportService.getReleaseReportReasons();
                case "releaseComment":
                    return reportService.getReleaseCommentReportReasons();
                case "collection":
                    return reportService.getCollectionReportReasons();
                case "collectionComment":
                    return reportService.getCollectionCommentReportReasons();
                case "episode":
                    return reportService.getEpisodeReportReasons();
                case "profile":
                    return reportService.getProfileReportReasons();
                case "channel":
                    return reportService.getChannelReportReasons();
                case "article":
                    return reportService.getArticleReportReasons();
                case "articleComment":
                    return reportService.getArticleCommentReportReasons();
                default:
                    throw new Error(`Unknown report type: ${type}`);
            }
        },
        enabled: Boolean(type),
    });
}

export function useReportRelease() {
    return useMutation<ReportResponse, Error, { releaseId: number | string; request: ReleaseReportRequest; token: string }>({
        mutationKey: ["reports", "release"],
        mutationFn: ({ releaseId, request, token }) => reportService.reportRelease(releaseId, request, token),
    });
}

export function useReportReleaseComment() {
    return useMutation<ReportResponse, Error, { commentId: number | string; request: CommentReportRequest; token: string }>({
        mutationKey: ["reports", "releaseComment"],
        mutationFn: ({ commentId, request, token }) => reportService.reportReleaseComment(commentId, request, token),
    });
}

export function useReportCollection() {
    return useMutation<ReportResponse, Error, { collectionId: number | string; request: CollectionReportRequest; token: string }>({
        mutationKey: ["reports", "collection"],
        mutationFn: ({ collectionId, request, token }) => reportService.reportCollection(collectionId, request, token),
    });
}

export function useReportCollectionComment() {
    return useMutation<ReportResponse, Error, { commentId: number | string; request: CommentReportRequest; token: string }>({
        mutationKey: ["reports", "collectionComment"],
        mutationFn: ({ commentId, request, token }) => reportService.reportCollectionComment(commentId, request, token),
    });
}

export function useReportEpisode() {
    return useMutation<ReportResponse, Error, { releaseId: number | string; sourceId: number | string; position: number; request: any; token: string }>({
        mutationKey: ["reports", "episode"],
        mutationFn: ({ releaseId, sourceId, position, request, token }) => reportService.reportEpisode(releaseId, sourceId, position, request, token),
    });
}

export function useReportProfile() {
    return useMutation<ReportResponse, Error, { profileId: number | string; request: any; token: string }>({
        mutationKey: ["reports", "profile"],
        mutationFn: ({ profileId, request, token }) => reportService.reportProfile(profileId, request, token),
    });
}

export function useReportChannel() {
    return useMutation<ReportResponse, Error, { channelId: number | string; request: any; token: string }>({
        mutationKey: ["reports", "channel"],
        mutationFn: ({ channelId, request, token }) => reportService.reportChannel(channelId, request, token),
    });
}

export function useReportArticle() {
    return useMutation<ReportResponse, Error, { articleId: number | string; request: any; token: string }>({
        mutationKey: ["reports", "article"],
        mutationFn: ({ articleId, request, token }) => reportService.reportArticle(articleId, request, token),
    });
}

export function useReportArticleComment() {
    return useMutation<ReportResponse, Error, { commentId: number | string; request: CommentReportRequest; token: string }>({
        mutationKey: ["reports", "articleComment"],
        mutationFn: ({ commentId, request, token }) => reportService.reportArticleComment(commentId, request, token),
    });
}

