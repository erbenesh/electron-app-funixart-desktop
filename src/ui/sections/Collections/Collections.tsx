
import { useEffect } from 'react';
import styles from './Collections.module.css'
import { Outlet, useNavigate } from 'react-router-dom';
import { TopFilterButtons } from '../../layouts/navigation/FilterButtons/FilterButtons';
import { FakeHeader } from '../../components/FakeHeader/FakeHeader';

export const Collections = () => {

    const collectionsArray = [
        {
            id: 0,
            eng_name: "collections",
            ru_name: "Коллекции",
            link: '/collections/all'
        },
        {
            id: 1,
            eng_name: "my_collections",
            ru_name: "Мои коллекции",
            link: '/collections/my'
        },
        {
            id: 2,
            eng_name: "my_favorite_collections",
            ru_name: "Закладки",
            link: '/collections/favorite'
        }
    ];

    const navigate = useNavigate();

    useEffect(() => {
        navigate("/collections/all");
        
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className={styles.сollections_page_wrap}>

            <div className={styles.сollections_page}>   
              
                <TopFilterButtons buttonsArray={collectionsArray} />

                <Outlet />

            </div>
        </div>
    )
}