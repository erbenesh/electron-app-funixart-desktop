
import { useInfiniteQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useScrollPosition } from '../../hooks/useScrollPosition';
import { useUserStore } from '../../services/api/auth';
import styles from './RecommendationsList.module.css';
import { ReleaseCard } from '../ReleaseCard/ReleaseCard';
import { discoverService } from '../../services/DiscoverService';

export const RecommendationsList = () => {

    const token = useUserStore((state) => state.token);

    const recom = useInfiniteQuery({
        queryKey: ['get last', token],
        queryFn: meta => discoverService.getRecommendations(meta.pageParam, token),
        initialPageParam: 0,
        getNextPageParam: (lastPage, allPages, lastPageParam) => {
            if (lastPage.data.length === 0 || lastPageParam >= lastPage.data.total_page_count) {
                return undefined
            }
            return lastPageParam + 1
          },
        select: data => data.pages.flatMap((page) => page.data.content)
    });

    const scrollPosition = useScrollPosition();
    useEffect(() => {
        
        if (recom.isSuccess && !recom.isFetchingNextPage && scrollPosition >= 90) {
            recom.fetchNextPage();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [scrollPosition])

    return (
        recom.isPending ?
        (
        <div className="loader-container_home">	
            <i className="loader-circle"></i>
        </div>
        ) :
        <div className={styles.recom_list_page}>
            <div className={styles.recom_list_cards}>
                
                {
                recom.data?.map(release => release.id && (
                    <ReleaseCard key={release.id} release={release}/>
                ))
                }
                
            </div>

            {
                recom.isFetchingNextPage &&
                (
                <div className="loader-container_home">	
                    <i className="loader-circle"></i>
                </div>
                )
            }

        </div>
    )
}