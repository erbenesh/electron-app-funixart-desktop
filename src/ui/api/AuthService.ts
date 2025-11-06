import axios from "axios";
import { AUTH_RESEND, AUTH_RESTORE, AUTH_RESTORE_RESEND, AUTH_RESTORE_VERIFY, AUTH_SIGN_IN_WITH_GOOGLE, AUTH_SIGN_IN_WITH_VK, BASE_URL, FIREBASE, SIGN_IN, SIGN_UP, SIGN_UP_VERIFY, SIGN_UP_WITH_GOOGLE, SIGN_UP_WITH_VK } from "./endpoints";
import type { ResendRequest, RestoreRequest, RestoreResendRequest, RestoreVerifyRequest, SignInRequest, SignInWithGoogleRequest, SignInWithVkRequest, SignUpRequest, SignUpWithGoogleRequest, SignUpWithVkRequest, VerifyRequest } from "./types/requests";
import type { FirebaseResponse, ResendResponse, RestoreResendResponse, RestoreResponse, RestoreVerifyResponse, SignInResponse, SignUpResponse, VerifyResponse } from "./types/responses";

class AuthService {

    async signUp(request: SignUpRequest): Promise<SignUpResponse> {
        const url = `${BASE_URL}${SIGN_UP}`;
        const response = await axios.post<SignUpResponse>(url, request);
        return response.data;
    }

    async signUpWithGoogle(request: SignUpWithGoogleRequest): Promise<SignUpResponse> {
        const url = `${BASE_URL}${SIGN_UP_WITH_GOOGLE}`;
        const response = await axios.post<SignUpResponse>(url, request);
        return response.data;
    }

    async signUpWithVk(request: SignUpWithVkRequest): Promise<SignUpResponse> {
        const url = `${BASE_URL}${SIGN_UP_WITH_VK}`;
        const response = await axios.post<SignUpResponse>(url, request);
        return response.data;
    }

    async signIn(request: SignInRequest): Promise<SignInResponse> {
        const url = `${BASE_URL}${SIGN_IN}?login=${encodeURIComponent(request.login)}&password=${encodeURIComponent(request.password)}`;
        const response = await axios.post<SignInResponse>(url);
        return response.data;
    }

    async signInWithGoogle(request: SignInWithGoogleRequest): Promise<SignInResponse> {
        const url = `${BASE_URL}${AUTH_SIGN_IN_WITH_GOOGLE}`;
        const response = await axios.post<SignInResponse>(url, request);
        return response.data;
    }

    async signInWithVk(request: SignInWithVkRequest): Promise<SignInResponse> {
        const url = `${BASE_URL}${AUTH_SIGN_IN_WITH_VK}`;
        const response = await axios.post<SignInResponse>(url, request);
        return response.data;
    }

    async verify(request: VerifyRequest): Promise<VerifyResponse> {
        const url = `${BASE_URL}${SIGN_UP_VERIFY}`;
        const response = await axios.post<VerifyResponse>(url, request);
        return response.data;
    }

    async resend(request: ResendRequest): Promise<ResendResponse> {
        const url = `${BASE_URL}${AUTH_RESEND}`;
        const response = await axios.post<ResendResponse>(url, request);
        return response.data;
    }

    async restore(request: RestoreRequest): Promise<RestoreResponse> {
        const url = `${BASE_URL}${AUTH_RESTORE}`;
        const response = await axios.post<RestoreResponse>(url, request);
        return response.data;
    }

    async restoreResend(request: RestoreResendRequest): Promise<RestoreResendResponse> {
        const url = `${BASE_URL}${AUTH_RESTORE_RESEND}`;
        const response = await axios.post<RestoreResendResponse>(url, request);
        return response.data;
    }

    async restoreVerify(request: RestoreVerifyRequest): Promise<RestoreVerifyResponse> {
        const url = `${BASE_URL}${AUTH_RESTORE_VERIFY}`;
        const response = await axios.post<RestoreVerifyResponse>(url, request);
        return response.data;
    }

    async firebase(token: string): Promise<FirebaseResponse> {
        const url = `${BASE_URL}${FIREBASE}`;
        const response = await axios.post<FirebaseResponse>(url, { token });
        return response.data;
    }

}

export const authService = new AuthService();

