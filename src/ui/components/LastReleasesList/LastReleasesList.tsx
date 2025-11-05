import { useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import { useUserStore } from '../../auth/store/auth';
import { usePreferencesStore } from '../../api/preferences';
import { InfiniteList } from '../InfiniteList/InfiniteList';
import { ReleaseCard } from '../ReleaseCard/ReleaseCard';
import { ReleaseListCard } from '../ReleaseListCard/ReleaseListCard';
import { useGetLastUpdatedReleasesInfinite } from '../../api/hooks/useRelease';
import type { Release } from '../../types/entities';
import styles from './LastReleasesList.module.css';

export const LastReleasesList = () => {
    const token = useUserStore((state) => state.token);
    const location = useLocation();
    const viewMode = usePreferencesStore((state) => state.params.releaseListViewMode || 'grid');

    const status = location.pathname.split('/')[2];
    const last = useGetLastUpdatedReleasesInfinite({ status, token });

    const renderItem = useCallback((release: Release) => {
        if (viewMode === 'list') {
            return <ReleaseListCard key={release.id} release={release} />;
        }
        return <ReleaseCard key={release.id} release={release} />;
    }, [viewMode]);

    const itemClassName = viewMode === 'list' 
        ? styles.last_releases_list_mode
        : styles.last_releases_list_cards;

    return (
        <div className={styles.last_releases_list_page} key={status}>
            <InfiniteList
                query={last}
                renderItem={renderItem}
                emptyMessage="Нет последних обновлений"
                itemClassName={itemClassName}
            />
        </div>
    );
}