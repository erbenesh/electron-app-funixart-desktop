
import { TopFilterButtons } from "#/components/TopFilterButtons/TopFilterButtons";
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { Page } from 'ui-kit/components/Page/Page'
import { Container } from 'ui-kit/components/Container/Container'
import '../styles/Popular.css';

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
        <Page topOffset="md">
            <Container>
                <TopFilterButtons buttonsArray={popularArray} />
                <Outlet />
            </Container>
        </Page>
    )
}