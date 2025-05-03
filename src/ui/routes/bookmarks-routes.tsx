import { ReleaseCard } from '../components/ReleaseCard/ReleaseCard';
import { bookmarksService } from '../api/bookmarks/BookmarksService';
import { InfiniteScrollList } from '../components/infinite-scroll-list/InfiniteScrollList';

export const bookmarksRoutes = [
  {
    path: 'favorite',
    element: (
      <InfiniteScrollList
        queryKey="getInfiniteList"
        queryFn={({ pathParam, pageParam }) => bookmarksService.getFavorites(pathParam, pageParam)}
        pathIndex={2}
        renderItem={(release) => release.id && <ReleaseCard key={release.id} release={release} />}
      />
    ),
  },
  {
    path: 'watching',
    element: (
      <InfiniteScrollList
        queryKey="getInfiniteList"
        queryFn={({ pathParam, pageParam }) => bookmarksService.getBookmarks(pathParam, pageParam)}
        pathIndex={2}
        renderItem={(release) => release.id && <ReleaseCard key={release.id} release={release} />}
      />
    ),
  },
  {
    path: 'planned',
    element: (
      <InfiniteScrollList
        queryKey="getInfiniteList"
        queryFn={({ pathParam, pageParam }) => bookmarksService.getBookmarks(pathParam, pageParam)}
        pathIndex={2}
        renderItem={(release) => release.id && <ReleaseCard key={release.id} release={release} />}
      />
    ),
  },
  {
    path: 'watched',
    element: (
      <InfiniteScrollList
        queryKey="getInfiniteList"
        queryFn={({ pathParam, pageParam }) => bookmarksService.getBookmarks(pathParam, pageParam)}
        pathIndex={2}
        renderItem={(release) => release.id && <ReleaseCard key={release.id} release={release} />}
      />
    ),
  },
  {
    path: 'delayed',
    element: (
      <InfiniteScrollList
        queryKey="getInfiniteList"
        queryFn={({ pathParam, pageParam }) => bookmarksService.getBookmarks(pathParam, pageParam)}
        pathIndex={2}
        renderItem={(release) => release.id && <ReleaseCard key={release.id} release={release} />}
      />
    ),
  },
  {
    path: 'abandoned',
    element: (
      <InfiniteScrollList
        queryKey="getInfiniteList"
        queryFn={({ pathParam, pageParam }) => bookmarksService.getBookmarks(pathParam, pageParam)}
        pathIndex={2}
        renderItem={(release) => release.id && <ReleaseCard key={release.id} release={release} />}
      />
    ),
  },
];
