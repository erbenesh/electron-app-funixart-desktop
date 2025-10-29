import { useMutation } from "@tanstack/react-query";
import { authService } from "../AuthService";
import type { ResendRequest, RestoreRequest, RestoreResendRequest, RestoreVerifyRequest, SignInRequest, SignInWithGoogleRequest, SignInWithVkRequest, SignUpRequest, VerifyRequest } from "../types/requests";
import type { FirebaseResponse, ResendResponse, RestoreResendResponse, RestoreResponse, RestoreVerifyResponse, SignInResponse, SignUpResponse, VerifyResponse } from "../types/responses";

export function useSignUp() {
    return useMutation<SignUpResponse, Error, SignUpRequest>({
        mutationKey: ["auth", "signUp"],
        mutationFn: (request) => authService.signUp(request),
    });
}

export function useSignUpWithGoogle() {
    return useMutation<SignUpResponse, Error, SignUpRequest & { googleIdToken: string }>({
        mutationKey: ["auth", "signUpWithGoogle"],
        mutationFn: (request) => authService.signUpWithGoogle(request),
    });
}

export function useSignUpWithVk() {
    return useMutation<SignUpResponse, Error, SignUpRequest & { vkAccessToken: string }>({
        mutationKey: ["auth", "signUpWithVk"],
        mutationFn: (request) => authService.signUpWithVk(request),
    });
}

export function useSignIn() {
    return useMutation<SignInResponse, Error, SignInRequest>({
        mutationKey: ["auth", "signIn"],
        mutationFn: (request) => authService.signIn(request),
    });
}

export function useSignInWithGoogle() {
    return useMutation<SignInResponse, Error, SignInWithGoogleRequest>({
        mutationKey: ["auth", "signInWithGoogle"],
        mutationFn: (request) => authService.signInWithGoogle(request),
    });
}

export function useSignInWithVk() {
    return useMutation<SignInResponse, Error, SignInWithVkRequest>({
        mutationKey: ["auth", "signInWithVk"],
        mutationFn: (request) => authService.signInWithVk(request),
    });
}

export function useVerify() {
    return useMutation<VerifyResponse, Error, VerifyRequest>({
        mutationKey: ["auth", "verify"],
        mutationFn: (request) => authService.verify(request),
    });
}

export function useResend() {
    return useMutation<ResendResponse, Error, ResendRequest>({
        mutationKey: ["auth", "resend"],
        mutationFn: (request) => authService.resend(request),
    });
}

export function useRestore() {
    return useMutation<RestoreResponse, Error, RestoreRequest>({
        mutationKey: ["auth", "restore"],
        mutationFn: (request) => authService.restore(request),
    });
}

export function useRestoreResend() {
    return useMutation<RestoreResendResponse, Error, RestoreResendRequest>({
        mutationKey: ["auth", "restoreResend"],
        mutationFn: (request) => authService.restoreResend(request),
    });
}

export function useRestoreVerify() {
    return useMutation<RestoreVerifyResponse, Error, RestoreVerifyRequest>({
        mutationKey: ["auth", "restoreVerify"],
        mutationFn: (request) => authService.restoreVerify(request),
    });
}

export function useFirebase() {
    return useMutation<FirebaseResponse, Error, string>({
        mutationKey: ["auth", "firebase"],
        mutationFn: (token) => authService.firebase(token),
    });
}

