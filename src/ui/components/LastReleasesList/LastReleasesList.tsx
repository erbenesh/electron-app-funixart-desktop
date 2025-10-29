
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useScrollPosition } from '../../hooks/useScrollPosition';
import { useUserStore } from '../../auth/store/auth';
import styles from './LastReleasesList.module.css';
import { ReleaseCard } from '../ReleaseCard/ReleaseCard';
import { useGetLastUpdatedReleasesInfinite } from '../../api/hooks/useRelease';

export const LastReleasesList = () => {

    const token = useUserStore((state) => state.token);

    const location = useLocation();

    const last = useGetLastUpdatedReleasesInfinite({ status: location.pathname.split('/')[2], token });

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
                last.data?.pages.map(release => release.id && (
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