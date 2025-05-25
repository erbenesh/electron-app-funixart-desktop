import apiClient from '../apiClient';
import { COLLECTION_COMMENTS, RELEASE_COMMENTS_PAGE } from '../endpoints';

class CommentService {
  async getAllComments(type: string, release_id: number | string, page: string | number) {
    let url;
    if (type == 'release') {
      url = `${RELEASE_COMMENTS_PAGE}${release_id}/${page}`;
    } else if (type == 'collection') {
      url = `${COLLECTION_COMMENTS}${release_id}/${page}`;
    }

    const queryParams = {
      params: {
        sort: 1,
      },
    };

    const commentsData = await apiClient.get(url ?? '', queryParams);

    return commentsData.data;
  }
}

export const commentService = new CommentService();
