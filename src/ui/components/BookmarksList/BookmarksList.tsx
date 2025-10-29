
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useGetBookmarksInfinite } from '../../api/hooks/useBookmarks';
import { useUserStore } from '../../auth/store/auth';
import { useScrollPosition } from '../../hooks/useScrollPosition';
import { IRelease } from '../../types/IRelease';
import { ReleaseCard } from '../ReleaseCard/ReleaseCard';
import styles from './BookmarksList.module.css';

export const BookmarksList = () => {

    const token = useUserStore((state) => state.token);

    const location = useLocation();

    const bookmarks = useGetBookmarksInfinite({ listName: String(location.pathname).slice(11), token });

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
                        bookmarks.data?.pages.map(
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