import { useQuery } from "@tanstack/react-query";
import { profileService } from "../ProfileService";
import type { ProfileResponse } from "../types/responses";

export function useGetProfile(params: { id: string | number; token: string | null }) {
    const { id, token } = params;
    return useQuery<ProfileResponse>({
        queryKey: ["getProfile", id, token],
        queryFn: () => profileService.getProfile(id, token),
        enabled: Boolean(id),
    });
}

export function useGetMyProfile(token: string | null) {
    return useQuery<ProfileResponse>({
        queryKey: ["getMyProfile", token],
        queryFn: () => profileService.getMyProfile(token!),
        enabled: Boolean(token),
    });
}




