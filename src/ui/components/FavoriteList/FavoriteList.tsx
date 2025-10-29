import { useEffect } from 'react';
import { useGetFavoritesInfinite } from '../../api/hooks/useBookmarks';
import { useUserStore } from '../../auth/store/auth';
import { useScrollPosition } from '../../hooks/useScrollPosition';
import { IRelease } from '../../types/IRelease';
import { ReleaseCard } from '../ReleaseCard/ReleaseCard';
import styles from './FavoriteList.module.css';

export const FavoriteList = () => {

    const token = useUserStore((state) => state.token);

    const favorites = useGetFavoritesInfinite(token);

    const scrollPosition = useScrollPosition();
    useEffect(() => {
        
        if (favorites.isSuccess && scrollPosition >= 90) {
            favorites.fetchNextPage();
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [scrollPosition])

    if (favorites.status === "error") {
        console.log('An error has occurred: ' + favorites.error.message)
        return ('An error has occurred: ' + favorites.error.message);
    }

    return(
           
                
        !favorites.data || favorites.isPending ?
        (<div className="loader-container_home">	
            <i className="loader-circle"></i>
        </div>)
        :
        (<div className={styles.bookmarks_full_wrap}>
            <div className={styles.bookmarks_full}>
                <div className={styles.anime_list}>

                    {
                        favorites.data?.pages.map(
                            (el: IRelease) =>
                                el.id && (
                                    <ReleaseCard
                                        key={el.id}
                                        release={el}
                                    />
                                )
                        )
                    }

                </div>
            </div>
        </div>)
        
    )
}