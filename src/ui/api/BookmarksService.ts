import axios from "axios";
import type { Release } from "../types/entities";
import { BASE_URL, FAVORITE_ADD, FAVORITE_DELETE, FAVORITES, LISTS, LISTS_ADD, LISTS_DELETE, LISTS_MY } from "./endpoints";
import type { PageableResponse } from "./types/responses";
import { BookmarksList } from "./utils";

class BookmarksService {

    async getFavorites(token: string, page: string | number = 0): Promise<PageableResponse<Release>> {
        const url = `${BASE_URL}${FAVORITES}${page}?token=${token}`;
        const response = await axios.get<PageableResponse<Release>>(url);
        return response.data;
    }

    async addToBookmarkList(
        list: number, 
        release_id: number | string, 
        token: string
    ): Promise<{ code: number }> {
        const url = `${BASE_URL}${LISTS_ADD}${list}/${release_id}?token=${token}`;
        const response = await axios.get<{ code: number }>(url);
        return response.data;
    }

    async removeFromBookmarkList(
        list: number,
        release_id: number | string,
        token: string
    ): Promise<{ code: number }> {
        const url = `${BASE_URL}${LISTS_DELETE}${list}/${release_id}?token=${token}`;
        const response = await axios.get<{ code: number }>(url);
        return response.data;
    }

    async setAddToFavorite(release_id: number | string, token: string): Promise<{ code: number }> {
        const url = `${BASE_URL}${FAVORITE_ADD}${release_id}?token=${token}`;
        const response = await axios.get<{ code: number }>(url);
        return response.data;
    }

    async setDeleteFromFavorite(release_id: number | string, token: string): Promise<{ code: number }> {
        const url = `${BASE_URL}${FAVORITE_DELETE}${release_id}?token=${token}`;
        const response = await axios.get<{ code: number }>(url);
        return response.data;
    }

    async getBookmarks(
        listName: string, 
        token: string, 
        page: string | number = 0
    ): Promise<PageableResponse<Release>> {
        const listId = BookmarksList[listName as keyof typeof BookmarksList];
        const url = `${BASE_URL}${LISTS}${listId}/${page}?sort=1&token=${token}`;
        const response = await axios.get<PageableResponse<Release>>(url);
        return response.data;
    }

    async getMyBookmarks(
        status: number,
        token: string,
        page: string | number = 0
    ): Promise<PageableResponse<Release>> {
        const url = `${BASE_URL}${LISTS_MY}${status}/${page}?sort=1&token=${token}`;
        const response = await axios.get<PageableResponse<Release>>(url);
        return response.data;
    }

}

export const bookmarksService = new BookmarksService();