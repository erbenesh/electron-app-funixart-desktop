import axios from "axios";
import type { Article, Collection, Profile, Release } from "../types/entities";
import { BASE_URL, SEARCH_ARTICLE, SEARCH_CHANNEL, SEARCH_CHANNEL_SUBSCRIBERS, SEARCH_COLLECTION, SEARCH_FAVORITE, SEARCH_FAVORITE_COLLECTION, SEARCH_FEED, SEARCH_HISTORY, SEARCH_PROFILE, SEARCH_PROFILE_COLLECTION, SEARCH_PROFILE_LIST, SEARCH_RELEASE } from "./endpoints";
import type { SearchRequest } from "./types/requests";
import type { PageableResponse, ReleaseSearchResponse } from "./types/responses";

class SearchService {

    async searchReleases(
        token: string, 
        query: string, 
        page: string | number = 0,
        searchBy?: number
    ): Promise<ReleaseSearchResponse> {
        const data: SearchRequest = {
            query: query,
            searchBy: searchBy
        };

        const url = `${BASE_URL}${SEARCH_RELEASE}${page}?token=${token}`;
        const response = await axios.post<ReleaseSearchResponse>(url, data);
        return response.data;
    }

    async searchProfiles(
        token: string, 
        query: string, 
        page: string | number = 0,
        searchBy?: number
    ): Promise<PageableResponse<Profile>> {
        const data: SearchRequest = {
            query: query,
            searchBy: searchBy
        };

        const url = `${BASE_URL}${SEARCH_PROFILE}${page}?token=${token}`;
        const response = await axios.post<PageableResponse<Profile>>(url, data);
        return response.data;
    }

    async searchCollections(
        token: string, 
        query: string, 
        page: string | number = 0,
        searchBy?: number
    ): Promise<PageableResponse<Collection>> {
        const data: SearchRequest = {
            query: query,
            searchBy: searchBy
        };

        const url = `${BASE_URL}${SEARCH_COLLECTION}${page}?token=${token}`;
        const response = await axios.post<PageableResponse<Collection>>(url, data);
        return response.data;
    }

    async searchFavoriteCollections(
        token: string, 
        query: string, 
        page: string | number = 0
    ): Promise<PageableResponse<Collection>> {
        const data: SearchRequest = {
            query: query
        };

        const url = `${BASE_URL}${SEARCH_FAVORITE_COLLECTION}${page}?token=${token}`;
        const response = await axios.post<PageableResponse<Collection>>(url, data);
        return response.data;
    }

    async searchProfileCollections(
        token: string,
        profileId: number | string,
        query: string,
        page: string | number = 0
    ): Promise<PageableResponse<Collection>> {
        const data: SearchRequest = {
            query: query
        };

        const url = `${BASE_URL}${SEARCH_PROFILE_COLLECTION}${profileId}/${page}?token=${token}`;
        const response = await axios.post<PageableResponse<Collection>>(url, data);
        return response.data;
    }

    async searchProfileList(
        token: string,
        status: number,
        query: string,
        page: string | number = 0
    ): Promise<PageableResponse<Release>> {
        const data: SearchRequest = {
            query: query
        };

        const url = `${BASE_URL}${SEARCH_PROFILE_LIST}${status}/${page}?token=${token}`;
        const response = await axios.post<PageableResponse<Release>>(url, data);
        return response.data;
    }

    async searchFavorites(
        token: string,
        query: string,
        page: string | number = 0
    ): Promise<PageableResponse<Release>> {
        const data: SearchRequest = {
            query: query
        };

        const url = `${BASE_URL}${SEARCH_FAVORITE}${page}?token=${token}`;
        const response = await axios.post<PageableResponse<Release>>(url, data);
        return response.data;
    }

    async searchHistory(
        token: string,
        query: string,
        page: string | number = 0
    ): Promise<PageableResponse<Release>> {
        const data: SearchRequest = {
            query: query
        };

        const url = `${BASE_URL}${SEARCH_HISTORY}${page}?token=${token}`;
        const response = await axios.post<PageableResponse<Release>>(url, data);
        return response.data;
    }

    async searchArticles(
        token: string,
        query: string,
        page: string | number = 0
    ): Promise<PageableResponse<Article>> {
        const data: SearchRequest = {
            query: query
        };

        const url = `${BASE_URL}${SEARCH_ARTICLE}${page}?token=${token}`;
        const response = await axios.post<PageableResponse<Article>>(url, data);
        return response.data;
    }

    async searchChannels(
        token: string,
        query: string,
        page: string | number = 0
    ): Promise<PageableResponse<any>> {
        const data: SearchRequest = {
            query: query
        };

        const url = `${BASE_URL}${SEARCH_CHANNEL}${page}?token=${token}`;
        const response = await axios.post<PageableResponse<any>>(url, data);
        return response.data;
    }

    async searchChannelSubscribers(
        channelId: number | string,
        query: string,
        page: string | number,
        token: string
    ): Promise<PageableResponse<any>> {
        const data: SearchRequest = {
            query: query
        };

        const url = `${BASE_URL}${SEARCH_CHANNEL_SUBSCRIBERS}${channelId}/subscribers/${page}?token=${token}`;
        const response = await axios.post<PageableResponse<any>>(url, data);
        return response.data;
    }

    async searchFeed(
        token: string,
        query: string,
        page: string | number = 0
    ): Promise<PageableResponse<any>> {
        const data: SearchRequest = {
            query: query
        };

        const url = `${BASE_URL}${SEARCH_FEED}${page}?token=${token}`;
        const response = await axios.post<PageableResponse<any>>(url, data);
        return response.data;
    }

    // Legacy method for backward compatibility
    async searchResults(
        token: string, 
        value: string, 
        searchBy: string, 
        location: string
    ) {
        let SEARCH: string;
        
        if(location === '/profile') {
            SEARCH = SEARCH_PROFILE;
        } else if(location === '/collections') {
            SEARCH = SEARCH_COLLECTION;
        } else {
            SEARCH = SEARCH_RELEASE;
        }

        const url = `${BASE_URL}${SEARCH}0?token=${token}`;
        const data = {
            query: value,
            searchBy: searchBy
        };

        const response = await axios.post(url, data);
        return response;
    }

}

export const searchService = new SearchService(); 