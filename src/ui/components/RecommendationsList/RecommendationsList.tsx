import { useEffect } from 'react';
import { useScrollPosition } from '../../hooks/useScrollPosition';
import { useUserStore } from '../../auth/store/auth';
import styles from './RecommendationsList.module.css';
import { ReleaseCard } from '../ReleaseCard/ReleaseCard';
import { useGetRecommendationsInfinite } from '../../api/hooks/useDiscover';

export const RecommendationsList = () => {

    const token = useUserStore((state) => state.token);

    const recom = useGetRecommendationsInfinite(token);

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
                recom.data?.pages.map(release => release.id && (
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