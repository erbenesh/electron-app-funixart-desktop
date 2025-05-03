import styles from './Collection.module.css';

import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient, useInfiniteQuery } from '@tanstack/react-query';

import { unixToDate } from '../../utils/utils';
import { useAuthStore } from '../../auth/store/authStore';
import { useScrollPosition } from '../../hooks/useScrollPosition';
import { ReleaseCard } from '../../components/ReleaseCard/ReleaseCard';
import { collectionService } from '../../api/collections/CollectionService';

export const CollectionPage = () => {
  const token = useAuthStore((state) => state.token);

  const { collectionId } = useParams();

  const queryClient = useQueryClient();

  const currentCollection = useQuery({
    queryKey: ['get current collection', token, collectionId],
    queryFn: () => collectionService.getCurrentCollection(token, collectionId),
  });

  const collection = currentCollection.data?.data.collection;

  const currentCollectionReleases = useInfiniteQuery({
    queryKey: ['get current collection releases', token, collectionId],
    queryFn: (meta) =>
      collectionService.getCurrentCollectionReleases(token, collectionId, meta.pageParam),
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages, lastPageParam) => {
      if (lastPage.length === 0) {
        return undefined;
      }
      return lastPageParam + 1;
    },
    select: (data) => data.pages.flatMap((page) => page.content),
  });

  const fetchDeleteFromFavorite = useMutation({
    mutationKey: ['delete from favorite collections', collectionId, token],
    mutationFn: () => collectionService.deleteFromFavorite(collectionId, token),
    onSuccess() {
      queryClient.refetchQueries({ queryKey: ['get current collection'] });
    },
  });

  const fetchAddToFavorite = useMutation({
    mutationKey: ['add to favorite collections', collectionId, token],
    mutationFn: () => collectionService.addToFavorite(collectionId, token),
    onSuccess() {
      queryClient.refetchQueries({ queryKey: ['get current collection'] });
    },
  });

  function addToFavorite() {
    if (token) {
      if (collection.is_favorite) {
        fetchDeleteFromFavorite.mutate();
      } else {
        fetchAddToFavorite.mutate();
      }
    }
  }

  const scrollPosition = useScrollPosition();
  useEffect(() => {
    if (currentCollectionReleases.isSuccess && scrollPosition > 90) {
      currentCollectionReleases.fetchNextPage();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scrollPosition]);

  if (currentCollectionReleases.status === 'error') {
    return 'An error has occurred: ' + currentCollectionReleases.error.message;
  }

  return currentCollection.isPending ? (
    <div className="loader-container">
      <i className="loader-circle" />
    </div>
  ) : (
    <div className={styles.сollection_page_wrap}>
      <div className={styles.сollection_page}>
        <div className={styles.collection_full_wrap}>
          {collection && (
            <div id="collection_full" className={styles.collection_full}>
              <div className={styles.collection_poster_border}>
                <img src={collection.image} className={styles.collection_poster} alt="" />
              </div>

              <div className={styles.collection_body}>
                <h2>{collection?.title}</h2>
                <p>{unixToDate(collection?.creation_date, 'full')}</p>
                <button onClick={() => addToFavorite()} type="button">
                  Добавить в закладки
                </button>
                <p style={{ whiteSpace: 'pre-wrap' }}>{collection?.description}</p>
              </div>

              <div className={styles.collection_releases}>
                {currentCollectionReleases.data?.map(
                  (release) =>
                    release.id && (
                      <ReleaseCard
                        key={`coll_${collection.id}_release_${release.id}_pos_${release['@id']}`}
                        release={release}
                      />
                    )
                )}
              </div>
            </div>
          )}
        </div>
        {currentCollectionReleases.isPending && (
          <div className="loader-container">
            <i className="loader-circle" />
          </div>
        )}
      </div>
    </div>
  );
};
