import apiClient from "../apiClient";
import { SEARCH_COLLECTION, SEARCH_PROFILE, SEARCH_RELEASE } from "../endpoints";
import { matchPath } from "react-router-dom";

class SearchService {

    async searchResults(value: string, searchBy: string, location: string) {

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

        const url = `${SEARCH}0`;

        const resultsData = await apiClient.post(url, data);

        return resultsData;
    }

}

export const searchService = new SearchService(); 