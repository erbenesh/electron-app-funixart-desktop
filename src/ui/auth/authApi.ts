import { PROFILE, SIGN_IN } from '../api/endpoints';
import apiClient from './apiClient';

export const login = async (credentials) => {
    const response = await apiClient.post(SIGN_IN, null, credentials);
    return response.data;
};

export const getProfile = async (id: number | string, token: string) => {

    const queryParams = {
        params:{
            token: `${token}`
        }
    }

    const response = await apiClient.get(`${PROFILE}${id}`, queryParams);
    return response.data;
};