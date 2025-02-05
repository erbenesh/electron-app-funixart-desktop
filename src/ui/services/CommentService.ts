import axios from "axios";
import { BASE_URL, RELEASE_COMMENTS_PAGE, COLLECTION_COMMENTS } from "./api/endpoints";

class CommentService {

    async getAllComments(
        type: string,
        release_id: number | string, 
        page: string | number,
        token: string
    ) {

        let url;
        if (type == "release") {
            url = `${BASE_URL}${RELEASE_COMMENTS_PAGE}${release_id}/${page}?sort=1&token=${token}`;
        } else if (type == "collection") {
            url = `${BASE_URL}${COLLECTION_COMMENTS}${release_id}/${page}?sort=1&token=${token}`;
        }

        const commentsData = await axios.get(url);

        return commentsData.data;

    }

}

export const commentService = new CommentService();