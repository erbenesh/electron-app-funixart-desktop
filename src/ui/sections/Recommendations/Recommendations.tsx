import styles from './Recommendations.module.css'
import { releaseService } from '../../api/release/ReleaseService';
import { ReleaseCard } from '../../components/ReleaseCard/ReleaseCard';
import { InfiniteScrollList } from '../../components/infinite-scroll-list/InfiniteScrollList';

export const Recommendations = () => {

    return (
        <div className={styles.recommendations_page_wrap}>

            <div className={styles.recommendations_page}>
                   
                <InfiniteScrollList
                    queryKey="getInfiniteList recommendations"
                    queryFn={({ pathParam, pageParam }) => 
                        releaseService.getLastUpdatedReleases(pathParam, pageParam, 1)
                    }
                    pathIndex={2}
                    renderItem={(release) => release.id && <ReleaseCard key={release.id} release={release} />}
                    />

            </div>
        </div>
    )
}