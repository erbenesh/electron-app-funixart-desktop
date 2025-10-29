import axios from "axios";
import type { Release } from "../types/entities";
import { BASE_URL, RELATED } from "./endpoints";
import type { PageableResponse } from "./types/responses";

class RelatedService {

    async getRelatedReleases(relatedId: number | string, page: number | string, token?: string | null): Promise<PageableResponse<Release>> {
        let url = `${BASE_URL}${RELATED}${relatedId}/${page}`;
        if (token) {
            url += `?token=${token}`;
        }
        const response = await axios.get<PageableResponse<Release>>(url);
        return response.data;
    }

}

export const relatedService = new RelatedService();

