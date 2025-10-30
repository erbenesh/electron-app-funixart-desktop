import { useEffect } from 'react';
import { Outlet, useNavigate } from "react-router-dom";
import { Page } from 'ui-kit/components/Page/Page'
import { Container } from 'ui-kit/components/Container/Container'
import { TopFilterButtons } from "../../../components/TopFilterButtons/TopFilterButtons";
import '../styles/Bookmarks.css';

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

export const Bookmarks = () => {

    const navigate = useNavigate();

    useEffect(() => {
        navigate("/bookmarks/watching");
        
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <Page topOffset="md">
            <Container>
                <TopFilterButtons buttonsArray={bookmarksArray} />
                <Outlet />
            </Container>
        </Page>
    )
}