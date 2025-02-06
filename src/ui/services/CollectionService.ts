import axios from "axios";
import { BASE_URL, COLLECTION, COLLECTION_FAVORITE, COLLECTION_FAVORITE_ADD, COLLECTION_FAVORITE_DELETE, COLLECTION_LIST, COLLECTION_PROFILE } from "./api/endpoints";

class CollectionService {

    async addToFavorite(collection_id: number | string, token: string) {

        const url = `${BASE_URL}${COLLECTION_FAVORITE_ADD}${collection_id}?token=${token}`;

        const addToFavorite = await axios.get(url);

        return addToFavorite;
    }


    async deleteFromFavorite(collection_id: number | string, token: string) {

        const url = `${BASE_URL}${COLLECTION_FAVORITE_DELETE}${collection_id}?token=${token}`;

        const deletedFromFavorite = await axios.get(url);

        return deletedFromFavorite;
    }

    async getCurrentCollectionReleases(token: string, id: number | string, page: number ) {

        const url = `${BASE_URL}${COLLECTION}${id}/releases/${page}?token=${token}`

        const currentCollectionReleasesData = await axios.get(url);

        return currentCollectionReleasesData.data;
    }

    async getCurrentCollection(token: string, id: number | string ) {

        const url = `${BASE_URL}${COLLECTION}${id}?token=${token}`

        const currentCollectionData = await axios.get(url);

        return currentCollectionData;
    }

    async getCollections(page: number, token: string, loc: string = '/collections/all', profileID: string | number) {

        let LIST: string;

        if(loc === '/collections/my'){
            LIST = COLLECTION_PROFILE + `${profileID}/`;
        } else if(loc === '/collections/favorite') {
            LIST = COLLECTION_FAVORITE;
        } else {
            LIST = COLLECTION_LIST;
        }

        const url = `${BASE_URL}${LIST}${page}?previous_page=${page}&token=${token}`

        const collectionsData = await axios.get(url);

        return collectionsData.data;
    }

}

export const collectionService = new CollectionService();