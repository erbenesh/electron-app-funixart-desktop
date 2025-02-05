import axios from "axios";
import { BASE_URL, SEARCH_COLLECTION, SEARCH_PROFILE, SEARCH_RELEASE } from "./api/endpoints";

class SearchService {

    async searchResults(token: string, value: string, searchBy: string, location: string) {

        const data = {
            query: value,
            searchBy: searchBy
        };

        let SEARCH;
        
        if(location === '/profile') {
            SEARCH = SEARCH_PROFILE;
        } else if(location === '/collections') {
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