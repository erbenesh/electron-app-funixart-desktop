import { useCallback } from 'react';
import { useGetBookmarksInfinite } from '../../api/hooks/useBookmarks';
import { useUserStore } from '../../auth/store/auth';
import { usePreferencesStore } from '../../api/preferences';
import { InfiniteList } from '../InfiniteList/InfiniteList';
import { ReleaseCard } from '../ReleaseCard/ReleaseCard';
import { ReleaseListCard } from '../ReleaseListCard/ReleaseListCard';
import type { IRelease } from '../../types/IRelease';
import styles from './BookmarksList.module.css';

interface BookmarksListProps {
    listName: string;
}

export const BookmarksList = ({ listName }: BookmarksListProps) => {
    const token = useUserStore((state) => state.token);
    const viewMode = usePreferencesStore((state) => state.params.releaseListViewMode) || 'list';
    const bookmarks = useGetBookmarksInfinite({ listName, token });

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
        <div className={styles.bookmarks_full_wrap}>
            <div className={styles.bookmarks_full}>
                <InfiniteList
                    query={bookmarks}
                    renderItem={renderItem}
                    emptyMessage="Список пуст"
                    itemClassName={itemClassName}
                />
            </div>
        </div>
    );
}