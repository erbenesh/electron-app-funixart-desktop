import { useCallback } from 'react';
import { useGetBookmarksInfinite } from '../../api/hooks/useBookmarks';
import { useUserStore } from '../../auth/store/auth';
import { InfiniteList } from '../InfiniteList/InfiniteList';
import { ReleaseListCard } from '../ReleaseListCard/ReleaseListCard';
import type { IRelease } from '../../types/IRelease';
import styles from './BookmarksList.module.css';

interface BookmarksListProps {
    listName: string;
}

export const BookmarksList = ({ listName }: BookmarksListProps) => {
    const token = useUserStore((state) => state.token);
    const bookmarks = useGetBookmarksInfinite({ listName, token });

    const renderItem = useCallback((release: IRelease) => (
        <ReleaseListCard key={release.id} release={release} />
    ), []);

    return (
        <div className={styles.bookmarks_full_wrap}>
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