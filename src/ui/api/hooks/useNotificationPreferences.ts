import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { notificationPreferenceService } from "../NotificationPreferenceService";
import type { NotificationPreferenceEditRequest, NotificationReleaseTypeEditRequest } from "../types/requests";
import type { NotificationPreferenceResponse, PageableResponse, ProfileReleaseTypeNotificationPreferencesResponse } from "../types/responses";

export function useGetNotificationPreferences(token: string | null) {
    return useQuery<NotificationPreferenceResponse>({
        queryKey: ["notificationPreferences", token],
        queryFn: () => notificationPreferenceService.getMyNotificationPreferences(token!),
        enabled: Boolean(token),
    });
}

export function useGetReleaseNotificationPreferences(page: number | string, token: string | null) {
    return useQuery<PageableResponse<any>>({
        queryKey: ["releaseNotificationPreferences", page, token],
        queryFn: () => notificationPreferenceService.getAllReleaseNotificationPreferences(page, token!),
        enabled: Boolean(token),
    });
}

export function useGetReleaseTypeNotificationPreference(releaseId: number | string, token: string | null) {
    return useQuery<ProfileReleaseTypeNotificationPreferencesResponse>({
        queryKey: ["releaseTypeNotificationPreference", releaseId, token],
        queryFn: () => notificationPreferenceService.getReleaseTypeNotificationPreference(releaseId, token!),
        enabled: Boolean(token && releaseId),
    });
}

export function useEditArticleNotifications(token: string | null) {
    const queryClient = useQueryClient();
    
    return useMutation({
        mutationKey: ["editArticleNotifications", token],
        mutationFn: (request: NotificationPreferenceEditRequest) => 
            notificationPreferenceService.editArticleNotifications(request, token!),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["notificationPreferences", token] });
        },
    });
}

export function useEditCommentNotifications(token: string | null) {
    const queryClient = useQueryClient();
    
    return useMutation({
        mutationKey: ["editCommentNotifications", token],
        mutationFn: (request: NotificationPreferenceEditRequest) => 
            notificationPreferenceService.editCommentNotifications(request, token!),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["notificationPreferences", token] });
        },
    });
}

export function useEditEpisodeNotifications(token: string | null) {
    const queryClient = useQueryClient();
    
    return useMutation({
        mutationKey: ["editEpisodeNotifications", token],
        mutationFn: (request: NotificationPreferenceEditRequest) => 
            notificationPreferenceService.editEpisodeNotifications(request, token!),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["notificationPreferences", token] });
        },
    });
}

export function useEditEpisodeFirstNotifications(token: string | null) {
    const queryClient = useQueryClient();
    
    return useMutation({
        mutationKey: ["editEpisodeFirstNotifications", token],
        mutationFn: (request: NotificationPreferenceEditRequest) => 
            notificationPreferenceService.editEpisodeFirstNotifications(request, token!),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["notificationPreferences", token] });
        },
    });
}

export function useEditMyArticleCommentNotifications(token: string | null) {
    const queryClient = useQueryClient();
    
    return useMutation({
        mutationKey: ["editMyArticleCommentNotifications", token],
        mutationFn: (request: NotificationPreferenceEditRequest) => 
            notificationPreferenceService.editMyArticleCommentNotifications(request, token!),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["notificationPreferences", token] });
        },
    });
}

export function useEditMyCollectionCommentNotifications(token: string | null) {
    const queryClient = useQueryClient();
    
    return useMutation({
        mutationKey: ["editMyCollectionCommentNotifications", token],
        mutationFn: (request: NotificationPreferenceEditRequest) => 
            notificationPreferenceService.editMyCollectionCommentNotifications(request, token!),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["notificationPreferences", token] });
        },
    });
}

export function useEditReleaseTypeNotification(token: string | null) {
    const queryClient = useQueryClient();
    
    return useMutation({
        mutationKey: ["editReleaseTypeNotification", token],
        mutationFn: (request: NotificationReleaseTypeEditRequest) => 
            notificationPreferenceService.editReleaseTypeNotification(request, token!),
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({ queryKey: ["notificationPreferences", token] });
            queryClient.invalidateQueries({ queryKey: ["releaseTypeNotificationPreference", variables.releaseId, token] });
            queryClient.invalidateQueries({ queryKey: ["releaseNotificationPreferences"] });
        },
    });
}

export function useEditStatusNotifications(token: string | null) {
    const queryClient = useQueryClient();
    
    return useMutation({
        mutationKey: ["editStatusNotifications", token],
        mutationFn: (request: NotificationPreferenceEditRequest) => 
            notificationPreferenceService.editStatusNotifications(request, token!),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["notificationPreferences", token] });
        },
    });
}

export function useEditTypeNotifications(token: string | null) {
    const queryClient = useQueryClient();
    
    return useMutation({
        mutationKey: ["editTypeNotifications", token],
        mutationFn: (request: NotificationPreferenceEditRequest) => 
            notificationPreferenceService.editTypeNotifications(request, token!),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["notificationPreferences", token] });
        },
    });
}

export function useEditRelatedReleaseNotifications(token: string | null) {
    const queryClient = useQueryClient();
    
    return useMutation({
        mutationKey: ["editRelatedReleaseNotifications", token],
        mutationFn: (request: NotificationPreferenceEditRequest) => 
            notificationPreferenceService.editRelatedReleaseNotifications(request, token!),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["notificationPreferences", token] });
        },
    });
}

export function useEditReportProcessNotifications(token: string | null) {
    const queryClient = useQueryClient();
    
    return useMutation({
        mutationKey: ["editReportProcessNotifications", token],
        mutationFn: (request: NotificationPreferenceEditRequest) => 
            notificationPreferenceService.editReportProcessNotifications(request, token!),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["notificationPreferences", token] });
        },
    });
}

export function useEditSelectedReleasesNotifications(token: string | null) {
    const queryClient = useQueryClient();
    
    return useMutation({
        mutationKey: ["editSelectedReleasesNotifications", token],
        mutationFn: (request: { releaseIds: number[] }) => 
            notificationPreferenceService.editSelectedReleasesNotifications(request, token!),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["notificationPreferences", token] });
            queryClient.invalidateQueries({ queryKey: ["releaseNotificationPreferences"] });
        },
    });
}

