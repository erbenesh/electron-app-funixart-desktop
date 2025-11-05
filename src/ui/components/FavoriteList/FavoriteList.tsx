import { useCallback } from 'react';
import { useGetFavoritesInfinite } from '../../api/hooks/useBookmarks';
import { useUserStore } from '../../auth/store/auth';
import { usePreferencesStore } from '../../api/preferences';
import { InfiniteList } from '../InfiniteList/InfiniteList';
import { ReleaseCard } from '../ReleaseCard/ReleaseCard';
import { ReleaseListCard } from '../ReleaseListCard/ReleaseListCard';
import type { IRelease } from '../../types/IRelease';
import styles from './FavoriteList.module.css';

export const FavoriteList = () => {
    const token = useUserStore((state) => state.token);
    const viewMode = usePreferencesStore((state) => state.params.releaseListViewMode) || 'list';
    const favorites = useGetFavoritesInfinite(token);

    const renderItem = useCallback((release: IRelease) => {
        if (viewMode === 'grid') {
            return <ReleaseCard key={release.id} release={release} />;
        }
        return <ReleaseListCard key={release.id} release={release} />;
    }, [viewMode]);

    const itemClassName = viewMode === 'grid'
        ? styles.anime_list_grid
        : styles.anime_list;

    return (
        <div className={styles.bookmarks_full_wrap} key="favorite">
            <div className={styles.bookmarks_full}>
                <InfiniteList
                    query={favorites}
                    renderItem={renderItem}
                    emptyMessage="У вас пока нет избранных релизов"
                    itemClassName={itemClassName}
                />
            </div>
        </div>
    );
}