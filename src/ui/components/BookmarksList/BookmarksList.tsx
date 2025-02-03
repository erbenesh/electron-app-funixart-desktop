
import { useEffect, useState } from 'react';
import { IRelease } from '../../interfaces/IRelease'
import { ReleaseCard } from '../ReleaseCard/ReleaseCard'
import styles from './BookmarksList.module.css'
import { useLocation } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { anixartService } from '../../services/AnixartService';
import { useUserStore } from '../../services/auth';
import { useScrollPosition } from '../../hooks/useScrollPosition';

export const BookmarksList = () => {

    const token = useUserStore((state) => state.token);

    const location = useLocation();

    const [ page, setPage ] = useState(0);

    const [ bookmarks, setBookmarks ] = useState([]);

    const fetchBookmarks = useQuery({
        queryKey: ['fetchBookmarks', String(location.pathname).slice(11), token, page],
        queryFn: () => anixartService.getBookmarks(String(location.pathname).slice(11), token, page)
    });

    useEffect(() => {
        async function _loadInitialReleases() {
            const releasesData = fetchBookmarks.data?.data.content;

            setBookmarks(releasesData);

            console.log("FETCH_1", String(location.pathname).slice(11), releasesData);
        }

        if(fetchBookmarks.isSuccess && page === 0) {
            _loadInitialReleases();
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [token, fetchBookmarks.status, String(location.pathname).slice(11)]);

    useEffect(() => {

        async function _loadNextReleasesPage() {
            const releasesData = fetchBookmarks.data?.data.content;
            const newBookmarks = [...bookmarks, ...releasesData];

            setBookmarks(newBookmarks);

            console.log("FETCH_2", String(location.pathname).slice(11), releasesData);
        }

        if (fetchBookmarks.isSuccess && page > 0) {
            _loadNextReleasesPage();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page, fetchBookmarks.status])

    const scrollPosition = useScrollPosition();
    useEffect(() => {
        
        if (fetchBookmarks.isSuccess && fetchBookmarks.data?.data.content.length > 0 && scrollPosition >= 90) {
            if(page === 0) {
                setPage(1);
            } else {
                setPage(page + 1);
            }
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [scrollPosition])

    if (fetchBookmarks.status === "error") {
        console.log('An error has occurred: ' + fetchBookmarks.error.message)
        return ('An error has occurred: ' + fetchBookmarks.error.message);
    }

    return(
        <div className={styles.bookmarks_full_wrap}>
            <div className={styles.bookmarks_full}>
                <div className={styles.anime_list}>

                    {
                        bookmarks?.map((
                            el: IRelease) => 
                            el.id && 
                            <ReleaseCard 
                                key={el.id} 
                                release={el}
                            />
                        ) 
                    }

                </div>

                {   
                
                    !bookmarks &&
                    <div className="loader-container_home">	
                        <i className="loader-circle"></i>
                    </div>

                }
            </div>
        </div>
    )
}