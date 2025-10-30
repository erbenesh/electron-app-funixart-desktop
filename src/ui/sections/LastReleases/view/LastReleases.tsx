
import { TopFilterButtons } from "#/components/TopFilterButtons/TopFilterButtons";
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { Page } from 'ui-kit/components/Page/Page'
import { Container } from 'ui-kit/components/Container/Container'
import '../styles/LastReleases.css';

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
        <Page topOffset="md">
            <Container>
                <TopFilterButtons buttonsArray={lastReleasesArray} />
                <Outlet />
            </Container>
        </Page>
    )
}