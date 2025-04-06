import axios from "axios";
import { BASE_URL, PROFILE, SIGN_IN } from "../endpoints";

class ProfileService {

    async getProfile(
        id: string | number, 
        token: string | null
    ) {

        let url = `${BASE_URL}${PROFILE}${id}`;
        if (token) {
            url += `?token=${token}`;
        }
        
        const profile = await axios.get(url);
        
        return profile;
    }

    async postSubmitLogin(
        login: string,
        password: string,
    ) {

        const data = {
            login: login,
            password: password,
        };

        const url = `${BASE_URL}${SIGN_IN}?login=${data.login}&password=${data.password}`;

        const loginData = await axios.post(url);
        
        return loginData;
    }

}

export const profileService = new ProfileService();