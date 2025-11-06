import axios from "axios";
import type { Collection } from "../types/entities";
import { BASE_URL, COLLECTION, COLLECTION_FAVORITE, COLLECTION_FAVORITE_ADD, COLLECTION_FAVORITE_DELETE, COLLECTION_LIST, COLLECTION_MY, COLLECTION_MY_ADD_RELEASE, COLLECTION_MY_CREATE, COLLECTION_MY_DELETE, COLLECTION_MY_EDIT, COLLECTION_MY_EDIT_IMAGE, COLLECTION_PROFILE, COLLECTION_RELEASE, COLLECTION_REPORT } from "./endpoints";
import type { CollectionCreateEditRequest, CollectionReportRequest } from "./types/requests";
import type { CollectionCreateEditResponse, CollectionResponse, PageableResponse, ReportResponse } from "./types/responses";

class CollectionService {

    async addToFavorite(collection_id: number | string, token: string): Promise<{ code: number }> {
        const url = `${BASE_URL}${COLLECTION_FAVORITE_ADD}${collection_id}?token=${token}`;
        const response = await axios.get<{ code: number }>(url);
        return response.data;
    }

    async deleteFromFavorite(collection_id: number | string, token: string): Promise<{ code: number }> {
        const url = `${BASE_URL}${COLLECTION_FAVORITE_DELETE}${collection_id}?token=${token}`;
        const response = await axios.get<{ code: number }>(url);
        return response.data;
    }

    async getCurrentCollectionReleases(
        token: string, 
        id: number | string, 
        page: number
    ): Promise<PageableResponse<Collection>> {
        const url = `${BASE_URL}${COLLECTION}${id}/releases/${page}?token=${token}`;
        const response = await axios.get<PageableResponse<Collection>>(url);
        return response.data;
    }

    async getCollectionsByRelease(
        releaseId: number | string,
        page: number | string,
        token: string
    ): Promise<PageableResponse<Collection>> {
        const url = `${BASE_URL}${COLLECTION_RELEASE}${releaseId}/${page}?token=${token}`;
        const response = await axios.get<PageableResponse<Collection>>(url);
        return response.data;
    }

    async getCurrentCollection(
        token: string, 
        id: number | string
    ): Promise<CollectionResponse> {
        const url = `${BASE_URL}${COLLECTION}${id}?token=${token}`;
        const response = await axios.get<CollectionResponse>(url);
        return response.data;
    }

    async getCollections(
        page: number, 
        token: string, 
        loc: string = '/collections/all', 
        profileID?: string | number
    ): Promise<PageableResponse<Collection>> {
        let LIST: string;

        if(loc === '/collections/my'){
            LIST = COLLECTION_PROFILE + `${profileID}/`;
        } else if(loc === '/collections/favorite') {
            LIST = COLLECTION_FAVORITE;
        } else {
            LIST = COLLECTION_LIST;
        }

        const url = `${BASE_URL}${LIST}${page}?previous_page=${page}&token=${token}`;
        const response = await axios.get<PageableResponse<Collection>>(url);
        return response.data;
    }

    async createCollection(
        request: CollectionCreateEditRequest,
        token: string
    ): Promise<CollectionCreateEditResponse> {
        const url = `${BASE_URL}${COLLECTION_MY_CREATE}?token=${token}`;
        const response = await axios.post<CollectionCreateEditResponse>(url, request);
        return response.data;
    }

    async editCollection(
        collectionId: number | string,
        request: CollectionCreateEditRequest,
        token: string
    ): Promise<CollectionCreateEditResponse> {
        const url = `${BASE_URL}${COLLECTION_MY_EDIT}${collectionId}?token=${token}`;
        const response = await axios.post<CollectionCreateEditResponse>(url, request);
        return response.data;
    }

    async deleteCollection(
        collectionId: number | string,
        token: string
    ): Promise<{ code: number }> {
        const url = `${BASE_URL}${COLLECTION_MY_DELETE}${collectionId}?token=${token}`;
        const response = await axios.get<{ code: number }>(url);
        return response.data;
    }

    async addReleaseToCollection(
        collectionId: number | string,
        releaseId: number | string,
        token: string
    ): Promise<{ code: number }> {
        const url = `${BASE_URL}${COLLECTION_MY_ADD_RELEASE}${collectionId}?token=${token}`;
        const response = await axios.post<{ code: number }>(url, { releaseId });
        return response.data;
    }

    async editCollectionImage(
        collectionId: number | string,
        formData: FormData,
        token: string
    ): Promise<{ code: number }> {
        const url = `${BASE_URL}${COLLECTION_MY_EDIT_IMAGE}${collectionId}?token=${token}`;
        const response = await axios.post<{ code: number }>(url, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    }

    async reportCollection(
        collectionId: number | string,
        request: CollectionReportRequest,
        token: string
    ): Promise<ReportResponse> {
        const url = `${BASE_URL}${COLLECTION_REPORT}${collectionId}?token=${token}`;
        const response = await axios.post<ReportResponse>(url, request);
        return response.data;
    }

    async getMyCollectionReleases(
        collectionId: number | string,
        token: string
    ): Promise<PageableResponse<any>> {
        const url = `${BASE_URL}${COLLECTION_MY}${collectionId}/releases?token=${token}`;
        const response = await axios.get<PageableResponse<any>>(url);
        return response.data;
    }

}

export const collectionService = new CollectionService();