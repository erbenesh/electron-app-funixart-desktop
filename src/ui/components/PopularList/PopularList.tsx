
import { useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import { useUserStore } from '../../auth/store/auth';
import { usePreferencesStore } from '../../api/preferences';
import { InfiniteList } from '../InfiniteList/InfiniteList';
import { ReleaseCard } from '../ReleaseCard/ReleaseCard';
import { ReleaseListCard } from '../ReleaseListCard/ReleaseListCard';
import { useGetLastUpdatedReleasesInfinite } from '../../api/hooks/useRelease';
import type { Release } from '../../types/entities';
import styles from './PopularList.module.css';

export const PopularList = () => {
    const token = useUserStore((state) => state.token);
    const location = useLocation();
    const viewMode = usePreferencesStore((state) => state.params.releaseListViewMode || 'grid');

    const status = location.pathname.split('/')[2];
    const list = useGetLastUpdatedReleasesInfinite({ status, token, sort: 1 });

    const renderItem = useCallback((release: Release) => {
        if (viewMode === 'list') {
            return <ReleaseListCard key={release.id} release={release} />;
        }
        return <ReleaseCard key={release.id} release={release} />;
    }, [viewMode]);

    const itemClassName = viewMode === 'list' 
        ? styles.popular_list_mode
        : styles.popular_list_cards;

    return (
        <div className={styles.popular_list_page} key={status}>
            <InfiniteList
                query={list}
                renderItem={renderItem}
                emptyMessage="Нет популярных релизов"
                itemClassName={itemClassName}
            />
        </div>
    );
}