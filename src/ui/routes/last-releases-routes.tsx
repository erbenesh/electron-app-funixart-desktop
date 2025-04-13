import { releaseService } from "../api/release/ReleaseService";
import { ReleaseCard } from "../components/ReleaseCard/ReleaseCard";
import { InfiniteScrollList } from "../components/infinite-scroll-list/InfiniteScrollList";

export const lastReleasesRoutes = [
    {
        path: 'last',
        element: <InfiniteScrollList
                queryKey="getInfiniteList"
                queryFn={({ pathParam, pageParam }) => 
                    releaseService.getLastUpdatedReleases(pathParam, pageParam)
                }
                pathIndex={2}
                renderItem={(release) => release.id && <ReleaseCard key={release.id} release={release} />}
                />
    },
    {
        path: 'ongoing',
        element: <InfiniteScrollList
                queryKey="getInfiniteList"
                queryFn={({ pathParam, pageParam }) => 
                    releaseService.getLastUpdatedReleases(pathParam, pageParam)
                }
                pathIndex={2}
                renderItem={(release) => release.id && <ReleaseCard key={release.id} release={release} />}
    />
    },
    {
        path: 'announce',
        element: <InfiniteScrollList
                queryKey="getInfiniteList"
                queryFn={({ pathParam, pageParam }) => 
                    releaseService.getLastUpdatedReleases(pathParam, pageParam)
                }
                pathIndex={2}
                renderItem={(release) => release.id && <ReleaseCard key={release.id} release={release} />}
    />
    },
    {
        path: 'finished',
        element: <InfiniteScrollList
                queryKey="getInfiniteList"
                queryFn={({ pathParam, pageParam }) => 
                    releaseService.getLastUpdatedReleases(pathParam, pageParam)
                }
                pathIndex={2}
                renderItem={(release) => release.id && <ReleaseCard key={release.id} release={release} />}
                />
    },
    {
        path: 'films',
        element: <InfiniteScrollList
                queryKey="getInfiniteList"
                queryFn={({ pathParam, pageParam }) => 
                    releaseService.getLastUpdatedReleases(pathParam, pageParam)
                }
                pathIndex={2}
                renderItem={(release) => release.id && <ReleaseCard key={release.id} release={release} />}
                />
    }
]