import { feedService } from '../api/feed/FeedService';
import { FeedPost, IPost } from '../components/feed-post/FeedPost';
import { InfiniteScrollList } from '../components/infinite-scroll-list/InfiniteScrollList';

export const feedRoutes = [
  {
    path: 'news',
    element: (
      <InfiniteScrollList
        queryKey="getInfiniteList popular"
        queryFn={({ pathParam, pageParam }) => feedService.getFeed(pathParam, pageParam)}
        pathIndex={2}
        renderItem={(post: IPost) => <FeedPost key={post.id} post={post} />}
      />
    ),
  },
  {
    path: 'latest',
    element: (
      <InfiniteScrollList
        queryKey="getInfiniteList popular"
        queryFn={({ pathParam, pageParam }) => feedService.getFeed(pathParam, pageParam)}
        pathIndex={2}
        renderItem={(post: IPost) => <FeedPost key={post.id} post={post} />}
      />
    ),
  },
];
