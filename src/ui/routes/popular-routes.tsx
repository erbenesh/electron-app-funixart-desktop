import { releaseService } from '../api/release/ReleaseService';
import { ReleaseCard } from '../components/ReleaseCard/ReleaseCard';
import { InfiniteScrollList } from '../components/infinite-scroll-list/InfiniteScrollList';
import { IRelease } from '../sections/Release/IRelease';

export const popularRoutes = [
  {
    path: 'ongoing',
    element: (
      <InfiniteScrollList
        queryKey="getInfiniteList popular"
        queryFn={({ pathParam, pageParam }) =>
          releaseService.getLastUpdatedReleases(pathParam, pageParam, 1)
        }
        pathIndex={2}
        renderItem={(release: IRelease) =>
          release.id && <ReleaseCard key={release.id} release={release} />
        }
      />
    ),
  },
  {
    path: 'finished',
    element: (
      <InfiniteScrollList
        queryKey="getInfiniteList popular"
        queryFn={({ pathParam, pageParam }) =>
          releaseService.getLastUpdatedReleases(pathParam, pageParam, 1)
        }
        pathIndex={2}
        renderItem={(release: IRelease) =>
          release.id && <ReleaseCard key={release.id} release={release} />
        }
      />
    ),
  },
  {
    path: 'films',
    element: (
      <InfiniteScrollList
        queryKey="getInfiniteList popular"
        queryFn={({ pathParam, pageParam }) =>
          releaseService.getLastUpdatedReleases(pathParam, pageParam, 1)
        }
        pathIndex={2}
        renderItem={(release: IRelease) =>
          release.id && <ReleaseCard key={release.id} release={release} />
        }
      />
    ),
  },
  {
    path: 'ova',
    element: (
      <InfiniteScrollList
        queryKey="getInfiniteList popular"
        queryFn={({ pathParam, pageParam }) =>
          releaseService.getLastUpdatedReleases(pathParam, pageParam, 1)
        }
        pathIndex={2}
        renderItem={(release: IRelease) =>
          release.id && <ReleaseCard key={release.id} release={release} />
        }
      />
    ),
  },
];
