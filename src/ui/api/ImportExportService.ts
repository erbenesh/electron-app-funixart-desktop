import axios from "axios";
import { BASE_URL, EXPORT_BOOKMARKS, IMPORT_BOOKMARKS, IMPORT_STATUS } from "./endpoints";
import type { BookmarksExportResponse, BookmarksImportResponse, BookmarksImportStatusResponse } from "./types/responses";

class ImportExportService {

    async importBookmarks(request: FormData, token: string): Promise<BookmarksImportResponse> {
        const url = `${BASE_URL}${IMPORT_BOOKMARKS}?token=${token}`;
        const response = await axios.post<BookmarksImportResponse>(url, request, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    }

    async getImportStatus(token: string): Promise<BookmarksImportStatusResponse> {
        const url = `${BASE_URL}${IMPORT_STATUS}?token=${token}`;
        const response = await axios.post<BookmarksImportStatusResponse>(url);
        return response.data;
    }

    async exportBookmarks(token: string): Promise<BookmarksExportResponse> {
        const url = `${BASE_URL}${EXPORT_BOOKMARKS}?token=${token}`;
        const response = await axios.post<BookmarksExportResponse>(url);
        return response.data;
    }

}

export const importExportService = new ImportExportService();

