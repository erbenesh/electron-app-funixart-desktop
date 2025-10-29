
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useScrollPosition } from '../../hooks/useScrollPosition';
import { useUserStore } from '../../auth/store/auth';
import styles from './PopularList.module.css';
import { ReleaseCard } from '../ReleaseCard/ReleaseCard';
import { useGetLastUpdatedReleasesInfinite } from '../../api/hooks/useRelease';

export const PopularList = () => {

    const token = useUserStore((state) => state.token);

    const location = useLocation();

    const list = useGetLastUpdatedReleasesInfinite({ status: location.pathname.split('/')[2], token, sort: 1 });

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
                list.data?.pages.map(release => release.id && (
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