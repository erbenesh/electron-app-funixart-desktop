
import { useEffect } from 'react';
import { IRelease } from '../../../interfaces/IRelease'
import { ReleaseCard } from '../../../components/ReleaseCard/ReleaseCard'
import styles from './BookmarksList.module.css'
import { useLocation } from 'react-router-dom';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useScrollPosition } from '../../../hooks/useScrollPosition';
import { useAuthStore } from '../../../auth/store/authStore';
import { bookmarksService } from '../../../api/bookmarks/BookmarksService';

export const BookmarksList = () => {

    const token = useAuthStore((state) => state.token);

    const location = useLocation();

    const bookmarks = useInfiniteQuery({
        queryKey: ['get bookmarks', String(location.pathname).slice(11), token],
        queryFn: meta => bookmarksService.getBookmarks(String(location.pathname).slice(11), token, meta.pageParam),
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
        
        if (bookmarks.isSuccess && scrollPosition >= 90) {
            bookmarks.fetchNextPage();
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [scrollPosition])

    if (bookmarks.status === "error") {
        console.log('An error has occurred: ' + bookmarks.error.message)
        return ('An error has occurred: ' + bookmarks.error.message);
    }

    return(
           
                
        !bookmarks.data || bookmarks.isPending ?
        (<div className="loader-container_home">	
            <i className="loader-circle"></i>
        </div>)
        :
        (<div className={styles.bookmarks_full_wrap}>
            <div className={styles.bookmarks_full}>
                <div className={styles.anime_list}>

                    {
                        bookmarks.data?.map((
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