import { useEffect } from 'react';
import { useScrollPosition } from '../../hooks/useScrollPosition';
import { useGetCollectionsInfinite } from '../../api/hooks/useCollection';
import styles from './CollectionsList.module.css'
import { useUserStore } from '../../auth/store/auth';
import { CollectionCard } from '../CollectionCard/CollectionCard';
import { Spinner } from 'ui-kit/components/Spinner/Spinner';

interface CollectionsListProps {
    locationType: 'all' | 'my' | 'favorite';
}

export const CollectionsList = ({ locationType }: CollectionsListProps) => {

    const token = useUserStore((state) => state.token);
    const profileID = useUserStore((state) => state.user.id);

    const locationPath = `/collections/${locationType}`;

    const collections = useGetCollectionsInfinite({ token, location: locationPath, profileID });

    const scrollPosition = useScrollPosition();
    useEffect(() => {
        
        if (collections.isSuccess && !collections.isFetchingNextPage && scrollPosition >= 90) {
            collections.fetchNextPage();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [scrollPosition])

    return (
        collections.isPending ?
        (
        <div className="loader-container_home">
            <Spinner />
        </div>
        ) :
        <div className={styles.сollections_page}>
            <div className={styles.collections_cards}>
                {
                    collections.data?.pages.length ? collections.data.pages.map(collection => collection.id && (
                        <CollectionCard key={collection.id} collection={collection}/>
                    )) : <p style={{margin: 'auto', alignContent: 'center', height: '100vh'}}>Ой, а тут коллекций нет!</p>
                }
            </div>

            {
                collections.isFetchingNextPage &&
                (
                <div className="loader-container_home">
                    <Spinner />
                </div>
                )
            }

        </div>
    )
}