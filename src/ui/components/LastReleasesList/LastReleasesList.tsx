import { useCallback } from 'react';
import { useUserStore } from '../../auth/store/auth';
import { usePreferencesStore } from '../../api/preferences';
import { InfiniteList } from '../InfiniteList/InfiniteList';
import { ReleaseCard } from '../ReleaseCard/ReleaseCard';
import { ReleaseListCard } from '../ReleaseListCard/ReleaseListCard';
import { useGetLastUpdatedReleasesInfinite } from '../../api/hooks/useRelease';
import type { Release } from '../../types/entities';
import styles from './LastReleasesList.module.css';

interface LastReleasesListProps {
    status: string;
}

export const LastReleasesList = ({ status }: LastReleasesListProps) => {
    const token = useUserStore((state) => state.token);
    const viewMode = usePreferencesStore((state) => state.params.releaseListViewMode) || 'list';

    const last = useGetLastUpdatedReleasesInfinite({ status, token });

    const renderItem = useCallback((release: Release) => {
        if (viewMode === 'grid') {
            return <ReleaseCard key={release.id} release={release} />;
        }
        return <ReleaseListCard key={release.id} release={release} />;
    }, [viewMode]);

    const itemClassName = viewMode === 'grid' 
        ? styles.last_releases_list_cards
        : styles.last_releases_list_mode;

    return (
        <div className={styles.last_releases_list_page}>
            <InfiniteList
                query={last}
                renderItem={renderItem}
                emptyMessage="Нет последних обновлений"
                itemClassName={itemClassName}
            />
        </div>
    );
}