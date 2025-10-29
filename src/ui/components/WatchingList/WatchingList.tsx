
import { useEffect } from 'react';
import { useScrollPosition } from '../../hooks/useScrollPosition';
import { useUserStore } from '../../auth/store/auth';
import styles from './WatchingList.module.css';
import { ReleaseCard } from '../ReleaseCard/ReleaseCard';
import { useGetWatchingInfinite } from '../../api/hooks/useDiscover';

export const WatchingList = () => {

    const token = useUserStore((state) => state.token);

    const list = useGetWatchingInfinite(token);

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