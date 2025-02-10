
import { useInfiniteQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useScrollPosition } from '../../hooks/useScrollPosition';
import { useUserStore } from '../../services/api/auth';
import styles from './PopularList.module.css';
import { ReleaseCard } from '../ReleaseCard/ReleaseCard';
import { releaseService } from '../../services/ReleaseService';

export const PopularList = () => {

    const token = useUserStore((state) => state.token);

    const location = useLocation();

    const list = useInfiniteQuery({
        queryKey: ['get top releases', String(location.pathname), token],
        queryFn: meta => releaseService.getLastUpdatedReleases(location.pathname.split('/')[2], token, meta.pageParam, 1),
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
        <div className={styles.popular_list_page}>
            <div className={styles.popular_list_cards}>
                
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