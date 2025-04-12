import axios from "axios";
import { BASE_URL, SEARCH_COLLECTION, SEARCH_PROFILE, SEARCH_RELEASE } from "../endpoints";
import { matchPath } from "react-router-dom";

class SearchService {

    async searchResults(token: string, value: string, searchBy: string, location: string) {

        const isProfile = matchPath('/profile/*', window.location.pathname);
        const isCollections = matchPath('/collections/*', window.location.pathname);

        const data = {
            query: value,
            searchBy: searchBy
        };

        let SEARCH = SEARCH_RELEASE;
        
        if(isProfile) {
            SEARCH = SEARCH_PROFILE;
        } else if(isCollections) {
            SEARCH = SEARCH_COLLECTION
        } else {
            SEARCH = SEARCH_RELEASE;
        }

        const url = `${BASE_URL}${SEARCH}0?token=${token}`;

        const resultsData = await axios.post(url, data);

        return resultsData;
    }

}

export const searchService = new SearchService(); 