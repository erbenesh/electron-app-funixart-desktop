import { useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import { useGetBookmarksInfinite } from '../../api/hooks/useBookmarks';
import { useUserStore } from '../../auth/store/auth';
import { InfiniteList } from '../InfiniteList/InfiniteList';
import { ReleaseListCard } from '../ReleaseListCard/ReleaseListCard';
import type { IRelease } from '../../types/IRelease';
import styles from './BookmarksList.module.css';

export const BookmarksList = () => {
    const token = useUserStore((state) => state.token);
    const location = useLocation();

    const listName = String(location.pathname).slice(11);
    const bookmarks = useGetBookmarksInfinite({ listName, token });

    const renderItem = useCallback((release: IRelease) => (
        <ReleaseListCard key={release.id} release={release} />
    ), []);

    return (
        <div className={styles.bookmarks_full_wrap} key={listName}>
            <div className={styles.bookmarks_full}>
                <InfiniteList
                    query={bookmarks}
                    renderItem={renderItem}
                    emptyMessage="Список пуст"
                    itemClassName={styles.anime_list}
                />
            </div>
        </div>
    );
}