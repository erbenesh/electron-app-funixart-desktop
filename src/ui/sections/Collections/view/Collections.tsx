
import { TopFilterButtons } from '#/components/TopFilterButtons/TopFilterButtons';
import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import '../styles/Collections.css';

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
        <div className="сollections_page_wrap">

            <div className="сollections_page">   
              
                <TopFilterButtons buttonsArray={collectionsArray} />

                <Outlet />

            </div>
        </div>
    )
}