import { PROFILE, SIGN_IN } from '../api/endpoints';
import apiClient from './apiClient';

export const login = async (credentials) => {
    const response = await apiClient.post(SIGN_IN, credentials);
    return response.data;
};

export const getProfile = async () => {
    const response = await apiClient.get(PROFILE);
    return response.data;
};