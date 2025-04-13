import { collectionService } from "../api/collections/CollectionService";
import { CollectionCard } from "../components/CollectionCard/CollectionCard";
import { InfiniteScrollList } from "../components/infinite-scroll-list/InfiniteScrollList";


export const collectionsRoutes = [
    {
        path: 'all',
        element: <InfiniteScrollList
                queryKey="getInfiniteList collections"
                queryFn={({ pathParam, pageParam, profileID }) => 
                    collectionService.getCollections(pathParam, pageParam, profileID)
                }
                pathIndex={2}
                additionalParams={{}}
                renderItem={(collection) => collection.id && <CollectionCard key={collection.id} collection={collection} />}
                />
    },
    {
        path: 'my',
        element: <InfiniteScrollList
                queryKey="getInfiniteList collections"
                queryFn={({ pathParam, pageParam, profileID }) => 
                    collectionService.getCollections(pathParam, pageParam, profileID)
                }
                pathIndex={2}
                additionalParams={{}}
                renderItem={(collection) => collection.id && <CollectionCard key={collection.id} collection={collection} />}
                />
    },
    {
        path: 'favorite',
        element: <InfiniteScrollList
                queryKey="getInfiniteList collections"
                queryFn={({ pathParam, pageParam, profileID }) => 
                    collectionService.getCollections(pathParam, pageParam, profileID)
                }
                pathIndex={2}
                additionalParams={{}}
                renderItem={(collection) => collection.id && <CollectionCard key={collection.id} collection={collection} />}
                />
    },
]