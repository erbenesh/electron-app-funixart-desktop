import axios from "axios";
import { BASE_URL, FILTER, RELEASE, DISCOVER_INTERESTING, USER_AGENT, SIGN_IN, PROFILE, EPISODE, LISTS } from "./endpoints";
import { BookmarksList } from "./utils";

export const HEADERS = {
  "User-Agent": USER_AGENT,
  "Content-Type": "application/json; charset=UTF-8",
};

const StatusList: Record<string, null | number> = {
    last: null,
    finished: 1,
    ongoing: 2,
    announce: 3,
};

class AnixartService {

    async getBookmarks(listName: string, token: string, page: string | number = 0) {
        // url = `${ENDPOINTS.user.bookmark}/all/${props.profile_id}/${BookmarksList[listName]}/0?sort=1&token=${token}`;
        // url = `${ENDPOINTS.user.bookmark}/all/${BookmarksList[listName]}/0?sort=1&token=${token}`;
        const url = `${BASE_URL}${LISTS}${BookmarksList[listName]}/${page}?sort=1&token=${token}`;

        const bookmarksData = await axios.get(url);

        return bookmarksData;
    }

    async getToHistory(url: string) {
        const fullUrl = `${BASE_URL}${"history/add/"}${url}`;
        const toHistory =  await axios.get(fullUrl);
        console.log("HISTORY");
        return toHistory;
    }

    async getMarkWatched(url: string) {
        const fullUrl = `${BASE_URL}${"episode/watch/"}${url}`;
        const markWatched =  await axios.get(fullUrl);
        console.log("MARK");
        return markWatched;
    }

    async getReleasePlayer(url: string) {
        const fullUrl = `${BASE_URL}${EPISODE}${url}`;
        const playerData =  await axios.get(fullUrl);
        console.log("url");
        return playerData;
    }

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

    async getDiscoverInteresting() {
        const url = `${BASE_URL}${DISCOVER_INTERESTING}`;

        const discoverInteresting = await axios.get(url);

        return discoverInteresting;
    }

    async getCurrentRelease(
        id: number | string
    ) {
        const url = `${BASE_URL}${RELEASE}${id}`;

        const currentRelease = await axios.get(url);

        return currentRelease;
    }

    async getLastUpdatedReleases(
        status: string,
        token: string | null,
        page: string | number = 0
    ) {

        let statusId: null | number = null;
        let categoryId: null | number = null;
        if (status == "films") {
          categoryId = 2;
        } else {
          statusId = StatusList[status];
        }

        const data = {
            age_ratings: [],
            category_id: categoryId,
            country: null,
            end_year: null,
            episode_duration_from: null,
            episode_duration_to: null,
            episodes_from: null,
            episodes_to: null,
            genres:[],
            is_genres_exclude_mode_enabled: false,
            profile_list_exclusions: [],
            season: null,
            sort: 0,
            start_year: null,
            status_id: statusId,
            studio : null,
            types:[]
        };

        let url = `${BASE_URL}${FILTER}${page}`;
        if (token) {
            url += `?token=${token}`;
        }
        
        const lastUpdatedReleases = await axios.post(url, data);
        
        return lastUpdatedReleases;
    }

}

export const anixartService = new AnixartService();