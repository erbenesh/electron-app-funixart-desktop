import { useEffect } from 'react';
import { IRelease } from '../../interfaces/IRelease'
import { ReleaseCard } from '../ReleaseCard/ReleaseCard'
import styles from './FavoriteList.module.css'
import { useInfiniteQuery } from '@tanstack/react-query';
import { useUserStore } from '../../services/api/auth';
import { useScrollPosition } from '../../hooks/useScrollPosition';
import { bookmarksService } from '../../services/BookmarksService';

export const FavoriteList = () => {

    const token = useUserStore((state) => state.token);

    const favorites = useInfiniteQuery({
        queryKey: ['get favorite', token],
        queryFn: meta => bookmarksService.getFavorites(token, meta.pageParam),
        initialPageParam: 0,
        getNextPageParam: (lastPage, allPages, lastPageParam) => {
            if (lastPage.length === 0) {
              return undefined
            }
            return lastPageParam + 1
          },
        select: data => data.pages.flatMap((page) => page.content)
    });

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
                        favorites.data?.map((
                            el: IRelease) => 
                            el.id && 
                            <ReleaseCard 
                                key={el.id} 
                                release={el}
                            />
                        ) 
                    }

                </div>
            </div>
        </div>)
        
    )
}