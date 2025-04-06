
import { useEffect } from "react";
import styles from './LastReleases.module.css'
import { useNavigate, Outlet } from "react-router-dom";
import { FakeHeader } from "../../components/FakeHeader/FakeHeader";
import { TopFilterButtons } from "../../layouts/navigation/FilterButtons/FilterButtons";

export const LastReleases = () => {

    const lastReleasesArray = [
        {
            id: 0,
            eng_name: "last_releases",
            ru_name: "Последнее",
            link: '/last/last'
        },
        {
            id: 1,
            eng_name: "ongoing_releases",
            ru_name: "Онгоинги",
            link: '/last/ongoing'
        },
        {
            id: 2,
            eng_name: "anonce_releases",
            ru_name: "Анонсы",
            link: '/last/announce'
        },
        {
            id: 3,
            eng_name: "completed_releases",
            ru_name: "Завершенные",
            link: '/last/finished'
        },
        {
            id: 4,
            eng_name: "films_releases",
            ru_name: "Фильмы",
            link: '/last/films'
        }
    ];

    const navigate = useNavigate();

    useEffect(() => {
        navigate("/last/last");
        
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className={styles.lastReleases_page_wrap}>

            <div className={styles.lastReleases_page}>   
            
                <TopFilterButtons buttonsArray={lastReleasesArray} />

                <Outlet />

            </div>
        </div>
    )
}