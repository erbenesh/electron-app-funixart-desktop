import { LISTS_ADD, FAVORITE_ADD, FAVORITE_DELETE, LISTS, FAVORITES } from "../endpoints";
import { BookmarksList } from "../../utils/utils";
import apiClient from "../apiClient";

class BookmarksService {

    async getFavorites(loc: string, page: string | number = 0) {

        const url = `${FAVORITES}${page}`;

        const bookmarksData = await apiClient.get(url);

        return bookmarksData.data;
    }

    async addToBookmarkList(list: number, release_id: number | string) {

        const url = `${LISTS_ADD}${list}/${release_id}`

        const addToList = await apiClient.get(url);

        return addToList;
    }

    async setAddToFavorite(release_id: number | string) {

        const url = `${FAVORITE_ADD}${release_id}`;

        const addToFavorite = await apiClient.get(url);

        return addToFavorite;
    }


    async setDeleteFromFavorite(release_id: number | string) {

        const url = `${FAVORITE_DELETE}${release_id}`;

        const deletedFromFavorite = await apiClient.get(url);

        return deletedFromFavorite;
    }

    async getBookmarks(listName: string, page: string | number = 0) {
        // url = `${ENDPOINTS.user.bookmark}/all/${props.profile_id}/${BookmarksList[listName]}/0?sort=1&token=${token}`;
        // url = `${ENDPOINTS.user.bookmark}/all/${BookmarksList[listName]}/0?sort=1&token=${token}`;

        const queryParams = {
            params: {
                sort: 1,
            }
        }
        const url = `${LISTS}${BookmarksList[listName]}/${page}`;

        const bookmarksData = await apiClient.get(url, queryParams);

        return bookmarksData.data;
    }

}

export const bookmarksService = new BookmarksService();