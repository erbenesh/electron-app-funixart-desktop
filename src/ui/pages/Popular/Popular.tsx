
import { useEffect } from "react";
import styles from './Popular.module.css'
import { useNavigate, Outlet } from "react-router-dom";
import { FakeHeader } from "../../components/FakeHeader/FakeHeader";
import { TopFilterButtons } from "../../components/TopFilterButtons/TopFilterButtons";

export const Popular = () => {

    const popularArray = [
        {
            id: 0,
            eng_name: "ongoing_popular",
            ru_name: "Онгоинги",
            link: '/popular/ongoing'
        },
        {
            id: 1,
            eng_name: "completed_popular",
            ru_name: "Завершенные",
            link: '/popular/finished'
        },
        {
            id: 2,
            eng_name: "films_popular",
            ru_name: "Фильмы",
            link: '/popular/films'
        },
        {
            id: 3,
            eng_name: "ova_popular",
            ru_name: "OVA",
            link: '/popular/ova'
        }
    ];

    const navigate = useNavigate();

    useEffect(() => {
        navigate("/popular/ongoing");
        
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className={styles.popular_page_wrap}>

            <div className={styles.popular_page}>   
              
                <TopFilterButtons buttonsArray={popularArray} />

                <Outlet />

            </div>
        </div>
    )
}