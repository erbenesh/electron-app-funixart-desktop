import axios from "axios";
import { BASE_URL, COLLECTION, COLLECTION_LIST } from "./api/endpoints";

class CollectionService {

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

}

export const collectionService = new CollectionService();