import { useInfiniteQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useScrollPosition } from '../../../hooks/useScrollPosition';
import styles from './WatchingList.module.css';
import { ReleaseCard } from '../../../components/ReleaseCard/ReleaseCard';
import { discoverService } from '../../../api/discover/DiscoverService';

export const WatchingList = () => {

    const list = useInfiniteQuery({
        queryKey: ['get watching list'],
        queryFn: meta => discoverService.getWatching(meta.pageParam),
        initialPageParam: 0,
        getNextPageParam: (lastPage, allPages, lastPageParam) => {
            if (lastPage.data.length === 0 || lastPageParam >= Math.ceil(lastPage.data.total_count/25)) {
                return undefined
            }
            return lastPageParam + 1
          },
        select: data => data.pages.flatMap((page) => page.data.content)
    });

    const scrollPosition = useScrollPosition();
    useEffect(() => {
        
        if (list.isSuccess && !list.isFetchingNextPage && scrollPosition >= 90) {
            list.fetchNextPage();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [scrollPosition])

    return (
        list.isPending ?
        (
        <div className="loader-container_home">	
            <i className="loader-circle"></i>
        </div>
        ) :
        <div className={styles.watching_list_page}>
            <div className={styles.watching_list_cards}>
                
                {
                list.data?.map(release => release.id && (
                    <ReleaseCard key={release.id} release={release}/>
                ))
                }
                
            </div>

            {
                list.isFetchingNextPage &&
                (
                <div className="loader-container_home">	
                    <i className="loader-circle"></i>
                </div>
                )
            }

        </div>
    )
}