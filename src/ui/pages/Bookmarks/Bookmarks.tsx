import styles from './Bookmarks.module.css'
import { TopFilterButtons } from "../../components/TopFilterButtons/TopFilterButtons";
import { Outlet, useNavigate } from "react-router-dom";
import { useEffect } from 'react';
import { FakeHeader } from '../../components/FakeHeader/FakeHeader';
import { Toolbar } from '../../components/Toolbar/Toolbar';

export const Bookmarks = () => {

    const bookmarksArray = [
        {
            id: 0,
            eng_name: "favorite",
            ru_name: "Избранное",
            link: '/bookmarks/favorite'
        },
        {
            id: 1,
            eng_name: "watching",
            ru_name: "Смотрю",
            link: '/bookmarks/watching'
        },
        {
            id: 2,
            eng_name: "planned",
            ru_name: "В планах",
            link: '/bookmarks/planned'
        },
        {
            id: 3,
            eng_name: "watched",
            ru_name: "Просмотрено",
            link: '/bookmarks/watched'
        },
        {
            id: 4,
            eng_name: "delayed",
            ru_name: "Отложено",
            link: '/bookmarks/delayed'
        },
        {
            id: 5,
            eng_name: "abandoned",
            ru_name: "Заброшено",
            link: '/bookmarks/abandoned'
        }
    ];

    const navigate = useNavigate();

    useEffect(() => {
        navigate("/bookmarks/watching");
        
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className={styles.bookmarks_page_wrap}>

            <div className={styles.bookmarks_page}>

                <FakeHeader />
                <FakeHeader />
                <FakeHeader />
             

                <TopFilterButtons buttonsArray={bookmarksArray} />

                <Outlet />

            </div>
        </div>
    )
}