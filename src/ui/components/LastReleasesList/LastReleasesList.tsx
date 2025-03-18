
import { useInfiniteQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useScrollPosition } from '../../hooks/useScrollPosition';
import { useUserStore } from '../../services/api/auth';
import styles from './LastReleasesList.module.css';
import { ReleaseCard } from '../ReleaseCard/ReleaseCard';
import { releaseService } from '../../services/ReleaseService';

export const LastReleasesList = () => {

    const token = useUserStore((state) => state.token);

    const location = useLocation();

    const last = useInfiniteQuery({
        queryKey: ['get last', String(location.pathname), token],
        queryFn: meta => releaseService.getLastUpdatedReleases(location.pathname.split('/')[2], token, meta.pageParam),
        initialPageParam: 0,
        getNextPageParam: (lastPage, allPages, lastPageParam) => {
            if (lastPage.data.content.length === 0) {
                return undefined
            }
            return lastPageParam + 1
          },
        select: data => data.pages.flatMap((page) => page.data.content)
    });

    const scrollPosition = useScrollPosition();
    useEffect(() => {
        
        if (last.isSuccess && !last.isFetchingNextPage && scrollPosition >= 90) {
            last.fetchNextPage();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [scrollPosition])

    return (
        last.isPending ?
        (
        <div className="loader-container_home">	
            <i className="loader-circle"></i>
        </div>
        ) :
        <div className={styles.last_releases_list_page}>

            <div className={styles.last_releases_list_cards}>
                
                {
                last.data?.map(release => release.id && (
                    <ReleaseCard key={release.id} release={release}/>
                ))
                }
                
            </div>

            {
                last.isFetchingNextPage &&
                (
                <div className="loader-container_home">	
                    <i className="loader-circle"></i>
                </div>
                )
            }

        </div>
    )
}