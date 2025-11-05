import { type ReactNode, useEffect } from 'react';
import { type UseInfiniteQueryResult } from '@tanstack/react-query';
import { Spinner } from 'ui-kit';
import { QueryError } from '../QueryError/QueryError';
import { useScrollPosition } from '../../hooks/useScrollPosition';
import styles from './InfiniteList.module.css';

interface InfiniteListProps<T> {
  query: UseInfiniteQueryResult<any, Error>;
  renderItem: (item: T) => ReactNode;
  emptyMessage?: string;
  className?: string;
  itemClassName?: string;
  scrollThreshold?: number;
}

export function InfiniteList<T extends { id?: number | string }>({
  query,
  renderItem,
  emptyMessage = 'Нет данных для отображения',
  className = '',
  itemClassName = '',
  scrollThreshold = 90,
}: InfiniteListProps<T>) {
  const scrollPosition = useScrollPosition();

  // Auto-fetch next page on scroll
  useEffect(() => {
    if (
      query.isSuccess &&
      !query.isFetchingNextPage &&
      query.hasNextPage &&
      scrollPosition >= scrollThreshold
    ) {
      query.fetchNextPage();
    }
  }, [scrollPosition, query, scrollThreshold]);

  // Error state
  if (query.error) {
    return <QueryError error={query.error} onRetry={() => query.refetch()} />;
  }

  // Loading state
  if (query.isPending) {
    return (
      <div className="loader-container">
        <Spinner />
      </div>
    );
  }

  // Extract items from pages
  const items = query.data?.pages || [];

  // Empty state
  if (items.length === 0) {
    return (
      <div className={styles.empty}>
        <p>{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className={`${styles.container} ${className}`}>
      <div className={`${styles.grid} ${itemClassName}`}>
        {items.map((item: T) => item?.id && renderItem(item))}
      </div>

      {query.isFetchingNextPage && (
        <div className={styles.loadingMore}>
          <Spinner />
        </div>
      )}
    </div>
  );
}

