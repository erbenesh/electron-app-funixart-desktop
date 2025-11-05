import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import { Page } from 'ui-kit/components/Page/Page'
import { Container } from 'ui-kit/components/Container/Container'
import { TopFilterButtons } from "../../../components/TopFilterButtons/TopFilterButtons";
import { TabCarousel } from "../../../components/TabCarousel/TabCarousel";
import { FavoriteList } from "../../../components/FavoriteList/FavoriteList";
import { BookmarksList } from "../../../components/BookmarksList/BookmarksList";
import '../styles/Bookmarks.css';

const bookmarksArray = [
    {
        id: 0,
        eng_name: "favorite",
        ru_name: "Избранное",
        link: '/bookmarks/favorite',
        listName: 'favorite'
    },
    {
        id: 1,
        eng_name: "watching",
        ru_name: "Смотрю",
        link: '/bookmarks/watching',
        listName: 'watching'
    },
    {
        id: 2,
        eng_name: "planned",
        ru_name: "В планах",
        link: '/bookmarks/planned',
        listName: 'planned'
    },
    {
        id: 3,
        eng_name: "watched",
        ru_name: "Просмотрено",
        link: '/bookmarks/watched',
        listName: 'watched'
    },
    {
        id: 4,
        eng_name: "delayed",
        ru_name: "Отложено",
        link: '/bookmarks/delayed',
        listName: 'delayed'
    },
    {
        id: 5,
        eng_name: "abandoned",
        ru_name: "Заброшено",
        link: '/bookmarks/abandoned',
        listName: 'abandoned'
    }
];

export const Bookmarks = () => {
    const navigate = useNavigate();
    const location = useLocation();
    
    // Determine initial index from URL
    const getIndexFromPath = (path: string) => {
        const index = bookmarksArray.findIndex(b => b.link === path);
        return index >= 0 ? index : 1; // Default to "Смотрю"
    };

    const [activeIndex, setActiveIndex] = useState(() => getIndexFromPath(location.pathname));

    // Sync URL with active index
    useEffect(() => {
        const expectedPath = bookmarksArray[activeIndex]?.link;
        if (expectedPath && location.pathname !== expectedPath) {
            navigate(expectedPath, { replace: true });
        }
    }, [activeIndex, navigate]);

    // Sync active index with URL changes (browser back/forward)
    useEffect(() => {
        const newIndex = getIndexFromPath(location.pathname);
        if (newIndex !== activeIndex) {
            setActiveIndex(newIndex);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [location.pathname]);

    const tabs = bookmarksArray.map((bookmark) => ({
        id: bookmark.id,
        content: bookmark.listName === 'favorite' 
            ? <FavoriteList key={bookmark.listName} />
            : <BookmarksList key={bookmark.listName} listName={bookmark.listName} />
    }));

    return (
        <Page>
            <Container>
                <div style={{ paddingTop: 'calc(var(--header-height) + 3.5rem)' }}>
                    <TopFilterButtons buttonsArray={bookmarksArray} />
                    <TabCarousel
                        tabs={tabs}
                        activeIndex={activeIndex}
                        onChange={setActiveIndex}
                    />
                </div>
            </Container>
        </Page>
    )
}