import axios from "axios";
import type { Release } from "../types/entities";
import { BASE_URL, EPISODE_REPORT, EPISODE_SOURCES, EPISODE_TARGET, EPISODE_TYPES, EPISODE_UNWATCH_POSITION, EPISODE_UNWATCH_SOURCE, EPISODE_UPDATES, EPISODE_WATCH_POSITION, EPISODE_WATCH_SOURCE, EPISODES, HISTORY, HISTORY_ADD, HISTORY_DELETE } from "./endpoints";
import type { EpisodeResponse, EpisodeTargetResponse, EpisodeWatchResponse, PageableResponse, SourcesResponse, TypesResponse } from "./types/responses";

class PlayerService {

    async getEpisodeTypes(releaseId: number | string, token?: string | null): Promise<TypesResponse> {
        let url = `${BASE_URL}${EPISODE_TYPES}${releaseId}`;
        if (token) {
            url += `?token=${token}`;
        }
        const response = await axios.get<TypesResponse>(url);
        return response.data;
    }

    async getEpisodeSources(releaseId: number | string, typeId: number | string, token?: string | null): Promise<SourcesResponse> {
        let url = `${BASE_URL}${EPISODE_SOURCES}${releaseId}/${typeId}`;
        if (token) {
            url += `?token=${token}`;
        }
        const response = await axios.get<SourcesResponse>(url);
        return response.data;
    }

    async getEpisodes(releaseId: number | string, typeId: number | string, sourceId: number | string, token?: string | null): Promise<EpisodeResponse> {
        let url = `${BASE_URL}${EPISODES}${releaseId}/${typeId}/${sourceId}`;
        if (token) {
            url += `?token=${token}`;
        }
        const response = await axios.get<EpisodeResponse>(url);
        return response.data;
    }

    async getEpisodeTarget(
        releaseId: number | string,
        sourceId: number | string,
        position: number,
        token?: string | null
    ): Promise<EpisodeTargetResponse> {
        let url = `${BASE_URL}${EPISODE_TARGET}${releaseId}/${sourceId}/${position}`;
        if (token) {
            url += `?token=${token}`;
        }
        const response = await axios.get<EpisodeTargetResponse>(url);
        return response.data;
    }

    async watchEpisodePosition(
        releaseId: number | string,
        sourceId: number | string,
        position: number,
        token: string
    ): Promise<EpisodeWatchResponse> {
        const url = `${BASE_URL}${EPISODE_WATCH_POSITION}${releaseId}/${sourceId}/${position}?token=${token}`;
        const response = await axios.post<EpisodeWatchResponse>(url);
        return response.data;
    }

    async watchEpisodeSource(
        releaseId: number | string,
        sourceId: number | string,
        token: string
    ): Promise<EpisodeWatchResponse> {
        const url = `${BASE_URL}${EPISODE_WATCH_SOURCE}${releaseId}/${sourceId}?token=${token}`;
        const response = await axios.post<EpisodeWatchResponse>(url);
        return response.data;
    }

    async unwatchEpisodePosition(
        releaseId: number | string,
        sourceId: number | string,
        position: number,
        token: string
    ): Promise<{ code: number }> {
        const url = `${BASE_URL}${EPISODE_UNWATCH_POSITION}${releaseId}/${sourceId}/${position}?token=${token}`;
        const response = await axios.post<{ code: number }>(url);
        return response.data;
    }

    async unwatchEpisodeSource(
        releaseId: number | string,
        sourceId: number | string,
        token: string
    ): Promise<{ code: number }> {
        const url = `${BASE_URL}${EPISODE_UNWATCH_SOURCE}${releaseId}/${sourceId}?token=${token}`;
        const response = await axios.post<{ code: number }>(url);
        return response.data;
    }

    async addToHistory(
        releaseId: number | string,
        sourceId: number | string,
        position: number,
        token: string
    ): Promise<{ code: number }> {
        const url = `${BASE_URL}${HISTORY_ADD}${releaseId}/${sourceId}/${position}?token=${token}`;
        const response = await axios.get<{ code: number }>(url);
        return response.data;
    }

    async getHistory(token: string, page: string | number = 0): Promise<PageableResponse<Release>> {
        const url = `${BASE_URL}${HISTORY}${page}?token=${token}`;
        const response = await axios.get<PageableResponse<Release>>(url);
        return response.data;
    }

    async deleteHistory(releaseId: number | string, token: string): Promise<{ code: number }> {
        const url = `${BASE_URL}${HISTORY_DELETE}${releaseId}?token=${token}`;
        const response = await axios.get<{ code: number }>(url);
        return response.data;
    }

    async getEpisodeUpdates(
        releaseId: number | string,
        page: number | string,
        token: string
    ): Promise<PageableResponse<any>> {
        const url = `${BASE_URL}${EPISODE_UPDATES}${releaseId}/${page}?token=${token}`;
        const response = await axios.get<PageableResponse<any>>(url);
        return response.data;
    }

    async reportEpisode(
        releaseId: number | string,
        sourceId: number | string,
        position: number,
        request: { reasonId: number; description?: string },
        token: string
    ): Promise<{ code: number }> {
        const url = `${BASE_URL}${EPISODE_REPORT}${releaseId}/${sourceId}/${position}?token=${token}`;
        const response = await axios.post<{ code: number }>(url, request);
        return response.data;
    }

    // Legacy methods for backward compatibility
    async getToHistory(url: string) {
        const fullUrl = `${BASE_URL}${HISTORY_ADD}${url}`;
        const response = await axios.get(fullUrl);
        console.log("HISTORY");
        return response;
    }

    async getMarkWatched(url: string) {
        const fullUrl = `${BASE_URL}${EPISODE_WATCH_SOURCE}${url}`;
        const response = await axios.post(fullUrl);
        console.log("MARK");
        return response;
    }

    async getReleasePlayer(url: string) {
        const fullUrl = `${BASE_URL}${EPISODE_TYPES}${url}`;
        const response = await axios.get(fullUrl);
        return response;
    }

}

export const playerService = new PlayerService();