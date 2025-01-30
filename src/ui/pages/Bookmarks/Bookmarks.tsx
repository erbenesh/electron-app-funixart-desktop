import { useState, useEffect } from "react";
import { useScrollPosition } from "../../hooks/useScrollPosition";
import styles from './Bookmarks.module.css'
import { useUserStore } from "../../services/auth";
import { useQuery } from "@tanstack/react-query";
import { anixartService } from "../../services/AnixartService";
import { ReleaseCard } from "../../components/ReleaseCard/ReleaseCard";
import { IRelease } from "../../interfaces/IRelease";

const bookmarksArray = [
    {
        id: 0,
        eng_name: "favorite",
        ru_name: "Избранное",
    },
    {
        id: 1,
        eng_name: "watching",
        ru_name: "Смотрю",
    },
    {
        id: 2,
        eng_name: "planned",
        ru_name: "В планах",
    },
    {
        id: 3,
        eng_name: "watched",
        ru_name: "Просмотрено",
    },
    {
        id: 4,
        eng_name: "delayed",
        ru_name: "Отложено",
    },
    {
        id: 5,
        eng_name: "abandoned",
        ru_name: "Заброшено",
    }
];

export const Bookmarks = () => {

    const token = useUserStore((state) => state.token);

    const [ currentBookmarksSection, setCurrentBookmarksSection ] = useState("watching");
    const [ page, setPage ] = useState(0);

    const [ watchingBookmarks, setWatchingBookmarks ] = useState([]);
    const [ plannedBookmarks, setPlannedBookmarks ] = useState([]);
    const [ watchedBookmarks, setWatchedBookmarks ] = useState([]);
    const [ delayedBookmarks, setDelayedBookmarks ] = useState([]);
    const [ abandonedBookmarks, setAbandonedBookmarks ] = useState([]);

    const fetchBookmarks = useQuery({
        queryKey: ['fetchBookmarks', currentBookmarksSection, token, page],
        queryFn: () => anixartService.getBookmarks(currentBookmarksSection, token, page)
    });

    const onChangeSection = (sectionTitle: string) => {
        if(sectionTitle !== currentBookmarksSection) {
            setPage(0);
            setCurrentBookmarksSection(sectionTitle);
        }
    }

    useEffect(() => {
        async function _loadInitialReleases() {
            const releasesData: [] = fetchBookmarks.status === "success" ? fetchBookmarks.data?.data.content : [];

            switch (currentBookmarksSection) {
                case "watching":
                    setWatchingBookmarks(releasesData);
                    break;
                case "planned":
                    setPlannedBookmarks(releasesData);
                    break;
                case "watched":
                    setWatchedBookmarks(releasesData);
                    break;
                case "delayed":
                    setDelayedBookmarks(releasesData);
                    break;
                default:
                    setAbandonedBookmarks(releasesData);
                    break;
            }
            console.log("FETCH_1", currentBookmarksSection, releasesData);
        }

        if(page === 0) {
            _loadInitialReleases();
            // console.log('Загрузка секции');
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [token, fetchBookmarks.status, currentBookmarksSection]);

    useEffect(() => {

        async function _loadNextReleasesPage() {
            const releasesData: [] = fetchBookmarks.status === "success" ? fetchBookmarks.data?.data.content : [];
            const newWatchingBookmarks = [...watchingBookmarks, ...releasesData];
            const newPlannedBookmarks = [...plannedBookmarks, ...releasesData];
            const newWatchedBookmarks = [...watchedBookmarks, ...releasesData];
            const newDelayedBookmarks = [...delayedBookmarks, ...releasesData];
            const newFilmsReleases = [...abandonedBookmarks, ...releasesData];

            switch (currentBookmarksSection) {
                case "watching":
                    setWatchingBookmarks(newWatchingBookmarks);
                    break;
                case "planned":
                    setPlannedBookmarks(newPlannedBookmarks);
                    break;
                case "watched":
                    setWatchedBookmarks(newWatchedBookmarks);
                    break;
                case "delayed":
                    setDelayedBookmarks(newDelayedBookmarks);
                    break;
                default:
                    setAbandonedBookmarks(newFilmsReleases);
                    break;
            }
            console.log("FETCH_2", currentBookmarksSection, releasesData);
        }

        if (page > 0) {
            _loadNextReleasesPage();
            // console.log('Вторая загрузка', content);
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page, fetchBookmarks.status])

    const scrollPosition = useScrollPosition();
    useEffect(() => {
        
        if (scrollPosition >= 100) {
            if(page === 0) {
                setPage(1);
            } else {
                setPage(page + 1);
            }
            // console.log('Обновление страницы', page);
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [scrollPosition])


    const currentBookmarksList = currentBookmarksSection === "watching" ?
                                watchingBookmarks : 
                                currentBookmarksSection === "planned" ?
                                plannedBookmarks : 
                                currentBookmarksSection === "watched" ?
                                watchedBookmarks : 
                                currentBookmarksSection === "delayed" ?
                                delayedBookmarks : abandonedBookmarks;

    if (fetchBookmarks.status === "error") {
        console.log('An error has occurred: ' + fetchBookmarks.error.message)
        return ('An error has occurred: ' + fetchBookmarks.error.message);
    }

    return (
        <div className={styles.bookmarks_page_wrap}>
            <div className={styles.fake_header_nav}/>
            <div className={styles.bookmarks_nav_buttons_fixed}>
                { bookmarksArray.map(button => 
                    <button key={button.id} className={styles.bookmarks_button} onClick={() => onChangeSection(button.eng_name)} type="button">

                            <div className={currentBookmarksSection === button.eng_name ? styles.bookmarks_button_title_active : styles.bookmarks_button_title}>
                                <p className={styles.button_p}>{button.ru_name}</p>
                            </div>

                    </button>
                )}
            </div>

            <div className={styles.bookmarks_page}>

                <div className={styles.bookmarks_full_wrap}>
                    <div className={styles.bookmarks_full}>
                        <div className={styles.anime_list}>
                
                                {
                                    currentBookmarksList?.map((
                                        el: IRelease) => 
                                        el.id && 
                                        <ReleaseCard 
                                            key={el.id} 
                                            release={el}
                                        />
                                    ) 
                                }

                        </div>

                        { fetchBookmarks.status === "pending" &&
                            <div className="loader-container_home">	
                                <i className="loader-circle"></i>
                            </div>
                        }
                    </div>
                </div>

            </div>
        </div>
    )
}