
import { useCallback } from 'react';
import { useUserStore } from '../../auth/store/auth';
import { usePreferencesStore } from '../../api/preferences';
import { InfiniteList } from '../InfiniteList/InfiniteList';
import { ReleaseCard } from '../ReleaseCard/ReleaseCard';
import { ReleaseListCard } from '../ReleaseListCard/ReleaseListCard';
import { useGetLastUpdatedReleasesInfinite } from '../../api/hooks/useRelease';
import type { Release } from '../../types/entities';
import styles from './PopularList.module.css';

interface PopularListProps {
    status: string;
}

export const PopularList = ({ status }: PopularListProps) => {
    const token = useUserStore((state) => state.token);
    const viewMode = usePreferencesStore((state) => state.params.releaseListViewMode) || 'list';

    const list = useGetLastUpdatedReleasesInfinite({ status, token, sort: 1 });

    const renderItem = useCallback((release: Release) => {
        if (viewMode === 'grid') {
            return <ReleaseCard key={release.id} release={release} />;
        }
        return <ReleaseListCard key={release.id} release={release} />;
    }, [viewMode]);

    const itemClassName = viewMode === 'grid' 
        ? styles.popular_list_cards
        : styles.popular_list_mode;

    return (
        <div className={styles.popular_list_page}>
            <InfiniteList
                query={list}
                renderItem={renderItem}
                emptyMessage="Нет популярных релизов"
                itemClassName={itemClassName}
            />
        </div>
    );
}