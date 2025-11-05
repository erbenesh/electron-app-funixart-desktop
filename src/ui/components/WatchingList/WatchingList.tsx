import { useCallback } from 'react';
import { useUserStore } from '../../auth/store/auth';
import { InfiniteList } from '../InfiniteList/InfiniteList';
import { ReleaseCard } from '../ReleaseCard/ReleaseCard';
import { useGetWatchingInfinite } from '../../api/hooks/useDiscover';
import type { Release } from '../../types/entities';
import styles from './WatchingList.module.css';

export const WatchingList = () => {
    const token = useUserStore((state) => state.token);
    const list = useGetWatchingInfinite(token);

    const renderItem = useCallback((release: Release) => (
        <ReleaseCard key={release.id} release={release} />
    ), []);

    return (
        <div className={styles.watching_list_page}>
            <InfiniteList
                query={list}
                renderItem={renderItem}
                emptyMessage="Список просмотров пуст"
                itemClassName={styles.watching_list_cards}
            />
        </div>
    );
}