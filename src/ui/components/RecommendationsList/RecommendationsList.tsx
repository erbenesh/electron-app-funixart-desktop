import { useCallback } from 'react';
import { useUserStore } from '../../auth/store/auth';
import { InfiniteList } from '../InfiniteList/InfiniteList';
import { ReleaseCard } from '../ReleaseCard/ReleaseCard';
import { useGetRecommendationsInfinite } from '../../api/hooks/useDiscover';
import type { Release } from '../../types/entities';
import styles from './RecommendationsList.module.css';

export const RecommendationsList = () => {
    const token = useUserStore((state) => state.token);
    const recom = useGetRecommendationsInfinite(token);

    const renderItem = useCallback((release: Release) => (
        <ReleaseCard key={release.id} release={release} />
    ), []);

    return (
        <div className={styles.recom_list_page}>
            <InfiniteList
                query={recom}
                renderItem={renderItem}
                emptyMessage="Нет рекомендаций"
                itemClassName={styles.recom_list_cards}
            />
        </div>
    );
}