import { useInfiniteQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useScrollPosition } from '../../../hooks/useScrollPosition';
import styles from './CollectionsList.module.css'
import { CollectionCard } from '../../../components/CollectionCard/CollectionCard';
import { useAuthStore } from '../../../auth/store/authStore';
import { collectionService } from '../../../api/collections/CollectionService';

export const CollectionsList = () => {

    const token = useAuthStore((state) => state.token);
    const profileID = useAuthStore((state) => state.user.id);

    const location = useLocation();

    const collections = useInfiniteQuery({
        queryKey: ['get Collections', String(location.pathname), token],
        queryFn: meta => collectionService.getCollections(meta.pageParam, token, String(location.pathname), profileID),
        initialPageParam: 0,
        getNextPageParam: (lastPage, allPages, lastPageParam) => {
            if (lastPageParam >= lastPage.total_page_count) {
                return undefined
            }
            return lastPageParam + 1
          },
        select: data => data.pages.flatMap((page) => page.content)
    });

    const scrollPosition = useScrollPosition();
    useEffect(() => {
        
        if (collections.isSuccess && !collections.isFetchingNextPage && scrollPosition >= 90) {
            collections.fetchNextPage();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [scrollPosition])

    return (
        collections.isPending ?
        (
        <div className="loader-container_home">	
            <i className="loader-circle"></i>
        </div>
        ) :
        <div className={styles.сollections_page}>
            <div className={styles.collections_cards}>
                {
                    collections.data.length ? collections.data?.map(collection => collection.id && (
                        <CollectionCard key={collection.id} collection={collection}/>
                    )) : <p style={{margin: 'auto', alignContent: 'center', height: '100vh'}}>Ой, а тут коллекций нет!</p>
                }
            </div>

            {
                collections.isFetchingNextPage &&
                (
                <div className="loader-container_home">	
                    <i className="loader-circle"></i>
                </div>
                )
            }

        </div>
    )
}