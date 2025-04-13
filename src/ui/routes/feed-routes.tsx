import { feedService } from "../api/feed/FeedService";
import { FeedPost } from "../components/feed-post/feedPost";
import { InfiniteScrollList } from "../components/infinite-scroll-list/InfiniteScrollList";

export const feedRoutes = [
    {
        path: 'news',
        element: <InfiniteScrollList
                    queryKey="getInfiniteList popular"
                    queryFn={({ pathParam, pageParam }) => 
                        feedService.getFeed(pathParam, pageParam)
                    }
                    pathIndex={2}
                    renderItem={(post) => post.id && <FeedPost key={post.id} post={post} />}
                    />
    },
    {
        path: 'latest',
        element: <InfiniteScrollList
                    queryKey="getInfiniteList popular"
                    queryFn={({ pathParam, pageParam }) => 
                        feedService.getFeed(pathParam, pageParam)
                    }
                    pathIndex={2}
                    renderItem={(post) => post.id && <FeedPost key={post.id} post={post} />}
                    />
    },
]