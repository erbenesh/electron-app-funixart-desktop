import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { profilePreferenceService } from "../ProfilePreferenceService";
import type { PrivacyEditRequest, SelectThemeRequest, SocialPagesEditRequest, StatusEditRequest } from "../types/requests";
import type { ProfilePreferenceResponse } from "../types/responses";

export function useGetPreferences(token: string | null) {
    return useQuery<ProfilePreferenceResponse>({
        queryKey: ["preferences", token],
        queryFn: () => profilePreferenceService.getMyPreferences(token!),
        enabled: Boolean(token),
    });
}

export function useUpdateStatus(token: string | null) {
    const queryClient = useQueryClient();
    
    return useMutation({
        mutationKey: ["updateStatus", token],
        mutationFn: (request: StatusEditRequest) => profilePreferenceService.editStatus(request, token!),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["preferences", token] });
            queryClient.invalidateQueries({ queryKey: ["getProfile"] });
        },
    });
}

export function useUpdateSocial(token: string | null) {
    const queryClient = useQueryClient();
    
    return useMutation({
        mutationKey: ["updateSocial", token],
        mutationFn: (request: SocialPagesEditRequest) => profilePreferenceService.editSocial(request, token!),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["preferences", token] });
            queryClient.invalidateQueries({ queryKey: ["getProfile"] });
        },
    });
}

export function useUpdatePrivacyStats(token: string | null) {
    const queryClient = useQueryClient();
    
    return useMutation({
        mutationKey: ["updatePrivacyStats", token],
        mutationFn: (request: PrivacyEditRequest) => profilePreferenceService.editPrivacyStats(request, token!),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["preferences", token] });
        },
    });
}

export function useUpdatePrivacyCounts(token: string | null) {
    const queryClient = useQueryClient();
    
    return useMutation({
        mutationKey: ["updatePrivacyCounts", token],
        mutationFn: (request: PrivacyEditRequest) => profilePreferenceService.editPrivacyCounts(request, token!),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["preferences", token] });
        },
    });
}

export function useUpdatePrivacySocial(token: string | null) {
    const queryClient = useQueryClient();
    
    return useMutation({
        mutationKey: ["updatePrivacySocial", token],
        mutationFn: (request: PrivacyEditRequest) => profilePreferenceService.editPrivacySocial(request, token!),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["preferences", token] });
        },
    });
}

export function useUpdatePrivacyFriendRequests(token: string | null) {
    const queryClient = useQueryClient();
    
    return useMutation({
        mutationKey: ["updatePrivacyFriendRequests", token],
        mutationFn: (request: PrivacyEditRequest) => profilePreferenceService.editPrivacyFriendRequests(request, token!),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["preferences", token] });
        },
    });
}

export function useUpdateTheme(token: string | null) {
    const queryClient = useQueryClient();
    
    return useMutation({
        mutationKey: ["updateTheme", token],
        mutationFn: (request: SelectThemeRequest) => profilePreferenceService.selectTheme(request, token!),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["preferences", token] });
        },
    });
}







