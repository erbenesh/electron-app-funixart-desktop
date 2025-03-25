import axios from "axios";
import { BASE_URL, LISTS_ADD, FAVORITE_ADD, FAVORITE_DELETE, LISTS, FAVORITES } from "./api/endpoints";
import { BookmarksList } from "./utils";

class BookmarksService {

    async getFavorites(token: string, page: string | number = 0) {
        const url = `${BASE_URL}${FAVORITES}${page}?token=${token}`;

        const bookmarksData = await axios.get(url);

        return bookmarksData.data;
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

        return bookmarksData.data;
    }

}

export const bookmarksService = new BookmarksService();