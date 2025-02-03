import axios from "axios";
import { 
    BASE_URL, RELEASE, DISCOVER_INTERESTING, 
    USER_AGENT, SIGN_IN, PROFILE, EPISODE, LISTS, 
    FAVORITE_DELETE, FAVORITE_ADD, LISTS_ADD, 
    RELEASE_FILTER, RELEASE_COMMENTS_PAGE, 
    COLLECTION_COMMENTS, DISCOVER_RECOMMENDATIONS, 
    SCHEDULE,
    DISCOVER_DISCUSSING,
    DISCOVER_WATCHING,
    EPISODE_WATCH_SOURCE,
    HISTORY_ADD,
    FEED_NEWS,
    RELEASE_RANDOM,
    COLLECTION_LIST,
    COLLECTION
} from "./endpoints";
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

    async getCurrentCollectionReleases(token: string, id: number | string, page: number ) {

        const url = `${BASE_URL}${COLLECTION}${id}/releases/${page}?token=${token}`

        const currentCollectionReleasesData = await axios.get(url);

        return currentCollectionReleasesData;
    }

    async getCurrentCollection(token: string, id: number | string ) {

        const url = `${BASE_URL}${COLLECTION}${id}?token=${token}`

        const currentCollectionData = await axios.get(url);

        return currentCollectionData;
    }

    async getCollections(page: number, token: string) {

        const url = `${BASE_URL}${COLLECTION_LIST}${page}?previous_page=${page}&token=${token}`

        const collectionsData = await axios.get(url);

        return collectionsData;
    }

    async getRandomRelease() {

        const url = `${BASE_URL}${RELEASE_RANDOM}`

        const randomRelease = await axios.get(url);

        return randomRelease;
    }

    async getFeedNews(token: string, page: number | string = 0){
        const url = `${BASE_URL}${FEED_NEWS}${page}?token=${token}`

        const data = {
            DATE_DAY: 2,
            DATE_MONTH: 4,
            DATE_NONE: 0,
            DATE_TODAY: 1,
            DATE_WEEK: 3,
            DATE_WHOLE_TIME: 6,
            DATE_YEAR: 5,
            channelId: null,
            date: null
        }

        const feedNewsData = await axios.post(url, data);

        return feedNewsData;
    }

    async getWatching(page: number | string = 0, token: string) {

        const url = `${BASE_URL}${DISCOVER_WATCHING}${page}?token=${token}`

        const watchingData = await axios.post(url);

        return watchingData;
    }

    async getDiscussing(token: string) {

        const url = `${BASE_URL}${DISCOVER_DISCUSSING}?token=${token}`

        const discussingData = await axios.post(url);

        return discussingData;
    }

    async getSchedule(token: string) {

        const url = `${BASE_URL}${SCHEDULE}?token=${token}`

        const scheduleData = await axios.get(url);

        return scheduleData;
    }

    async getRecommendations(page: number, token: string) {

        const url = `${BASE_URL}${DISCOVER_RECOMMENDATIONS}${page}?previous_page=${page}&token=${token}`

        const recommendationsData = await axios.post(url);

        return recommendationsData;
    }

    async getAllComments(
        type: string,
        release_id: number | string, 
        page: string | number,
        token: string
    ) {

        let url;
        if (type == "release") {
          url = `${BASE_URL}${RELEASE_COMMENTS_PAGE}${release_id}/${page}?sort=1&token=${token}`;
        } else if (type == "collection") {
          url = `${BASE_URL}${COLLECTION_COMMENTS}${release_id}/${page}?sort=1&token=${token}`;
        }

        const commentsData = await axios.get(url);

        return commentsData;

    }

    async addToBookmarkList(list: number, release_id: number | string, token: string) {

        const url = `${BASE_URL}${LISTS_ADD}${list}/${release_id}?token=${token}`

        const addToList = await axios.get(url);

        return addToList;
    }

    async setAddToFavorite(release_id: number | string, token: string) {

        const url = `${BASE_URL}${FAVORITE_ADD}${release_id}?token=${token}`;

        const addToFavorite = await axios.get(url);

        return addToFavorite;
    }


    async setDeleteFromFavorite(release_id: number | string, token: string) {

        const url = `${BASE_URL}${FAVORITE_DELETE}${release_id}?token=${token}`;

        const deletedFromFavorite = await axios.get(url);

        return deletedFromFavorite;
    }

    async getBookmarks(listName: string, token: string, page: string | number = 0) {
        // url = `${ENDPOINTS.user.bookmark}/all/${props.profile_id}/${BookmarksList[listName]}/0?sort=1&token=${token}`;
        // url = `${ENDPOINTS.user.bookmark}/all/${BookmarksList[listName]}/0?sort=1&token=${token}`;
        const url = `${BASE_URL}${LISTS}${BookmarksList[listName]}/${page}?sort=1&token=${token}`;

        const bookmarksData = await axios.get(url);

        return bookmarksData;
    }

    async getToHistory(url: string) {
        const fullUrl = `${BASE_URL}${HISTORY_ADD}${url}`;
        const toHistory =  await axios.get(fullUrl);
        console.log("HISTORY");
        return toHistory;
    }

    async getMarkWatched(url: string) {
        const fullUrl = `${BASE_URL}${EPISODE_WATCH_SOURCE}${url}`;
        const markWatched =  await axios.post(fullUrl);
        console.log("MARK");
        return markWatched;
    }

    async getReleasePlayer(url: string) {
        const fullUrl = `${BASE_URL}${EPISODE}${url}`;
        const playerData =  await axios.get(fullUrl);

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
        id: number | string,
        token: string | null,
    ) {
        const url = `${BASE_URL}${RELEASE}${id}?token=${token}`;

        const currentRelease = await axios.get(url);

        return currentRelease;
    }

    async getLastUpdatedReleases(
        status: string,
        token: string | null,
        page: string | number = 0,
        sort: null | number = 0
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
            sort: sort,
            start_year: null,
            status_id: statusId,
            studio : null,
            types:[]
        };

        let url = `${BASE_URL}${RELEASE_FILTER}${page}`;
        if (token) {
            url += `?token=${token}`;
        }
        
        const lastUpdatedReleases = await axios.post(url, data);
        
        return lastUpdatedReleases;
    }

}

export const anixartService = new AnixartService();