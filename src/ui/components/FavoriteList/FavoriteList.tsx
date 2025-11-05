import { useCallback } from 'react';
import { useGetFavoritesInfinite } from '../../api/hooks/useBookmarks';
import { useUserStore } from '../../auth/store/auth';
import { InfiniteList } from '../InfiniteList/InfiniteList';
import { ReleaseListCard } from '../ReleaseListCard/ReleaseListCard';
import type { IRelease } from '../../types/IRelease';
import styles from './FavoriteList.module.css';

export const FavoriteList = () => {
    const token = useUserStore((state) => state.token);
    const favorites = useGetFavoritesInfinite(token);

    const renderItem = useCallback((release: IRelease) => (
        <ReleaseListCard key={release.id} release={release} />
    ), []);

    return (
        <div className={styles.bookmarks_full_wrap} key="favorite">
            <div className={styles.bookmarks_full}>
                <InfiniteList
                    query={favorites}
                    renderItem={renderItem}
                    emptyMessage="У вас пока нет избранных релизов"
                    itemClassName={styles.anime_list}
                />
            </div>
        </div>
    );
}