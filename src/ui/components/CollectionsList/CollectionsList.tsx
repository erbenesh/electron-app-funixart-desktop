import { useInfiniteQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useScrollPosition } from '../../hooks/useScrollPosition';
import { collectionService } from '../../services/CollectionService';
import styles from './CollectionsList.module.css'
import { useUserStore } from '../../services/api/auth';
import { CollectionCard } from '../CollectionCard/CollectionCard';

export const CollectionsList = () => {

    const token = useUserStore((state) => state.token);
    const profileID = useUserStore((state) => state.user.id);

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