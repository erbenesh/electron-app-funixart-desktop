import apiClient from '../apiClient';
import {
  COLLECTION,
  COLLECTION_LIST,
  COLLECTION_PROFILE,
  COLLECTION_FAVORITE,
  COLLECTION_FAVORITE_ADD,
  COLLECTION_FAVORITE_DELETE,
} from '../endpoints';

class CollectionService {
  async addToFavorite(collection_id: number | string) {
    const url = `${COLLECTION_FAVORITE_ADD}${collection_id}`;

    const addToFavorite = await apiClient.get(url);

    return addToFavorite;
  }

  async deleteFromFavorite(collection_id: number | string) {
    const url = `${COLLECTION_FAVORITE_DELETE}${collection_id}`;

    const deletedFromFavorite = await apiClient.get(url);

    return deletedFromFavorite;
  }

  async getCurrentCollectionReleases(id: number | string, page: number) {
    const url = `${COLLECTION}${id}/releases/${page}`;

    const currentCollectionReleasesData = await apiClient.get(url);

    return currentCollectionReleasesData.data;
  }

  async getCurrentCollection(id: number | string) {
    const url = `${COLLECTION}${id}`;

    const currentCollectionData = await apiClient.get(url);

    return currentCollectionData;
  }

  async getCollections(
    loc: string = 'all',
    page: number,
    profileID?: number | string,
    someProfile?: number | string
  ) {
    let LIST: string;
    console.log(loc);

    if (profileID && loc === 'my') {
      LIST = COLLECTION_PROFILE + `${profileID}/`;
    } else if (someProfile && loc === 'profile') {
      LIST = COLLECTION_PROFILE + `${someProfile}/`;
    } else if (loc === 'favorite') {
      LIST = COLLECTION_FAVORITE;
    } else {
      LIST = COLLECTION_LIST;
    }

    const prev_page = page !== 0 ? page - 1 : 0;

    const queryParams = {
      params: {
        previous_page: prev_page,
      },
    };
    console.log('LIST', LIST);
    const url = `${LIST}${page}`;

    const collectionsData = await apiClient.get(url, queryParams);

    return collectionsData.data;
  }
}

export const collectionService = new CollectionService();
