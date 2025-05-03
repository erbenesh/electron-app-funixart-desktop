import apiClient from '../api/apiClient';
import { PROFILE, SIGN_IN } from '../api/endpoints';

export const login = async (credentials) => {
  const response = await apiClient.post(SIGN_IN, null, credentials);
  return response.data;
};

export const getProfile = async (id: number | string) => {
  // const queryParams = {
  //     params:{
  //         token: `${token}`
  //     }
  // }

  const response = await apiClient.get(`${PROFILE}${id}`);
  return response.data;
};
