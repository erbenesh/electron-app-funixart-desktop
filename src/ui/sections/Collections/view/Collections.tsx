
import { CollectionsList } from '#/components/CollectionsList/CollectionsList';
import { TabCarousel } from '#/components/TabCarousel/TabCarousel';
import { TopFilterButtons } from '#/components/TopFilterButtons/TopFilterButtons';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Container } from 'ui-kit/components/Container/Container';
import { Page } from 'ui-kit/components/Page/Page';
import '../styles/Collections.css';

export const Collections = () => {

    const collectionsArray = [
        {
            id: 0,
            eng_name: "collections",
            ru_name: "Коллекции",
            link: '/collections/all',
            type: 'all' as const
        },
        {
            id: 1,
            eng_name: "my_collections",
            ru_name: "Мои коллекции",
            link: '/collections/my',
            type: 'my' as const
        },
        {
            id: 2,
            eng_name: "my_favorite_collections",
            ru_name: "Закладки",
            link: '/collections/favorite',
            type: 'favorite' as const
        }
    ];

    const navigate = useNavigate();
    const location = useLocation();

    const getIndexFromPath = (path: string) => {
        const index = collectionsArray.findIndex(c => c.link === path);
        return index >= 0 ? index : 0;
    };

    const [activeIndex, setActiveIndex] = useState(() => getIndexFromPath(location.pathname));

    // Sync URL with active index
    useEffect(() => {
        const expectedPath = collectionsArray[activeIndex]?.link;
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

    const tabs = collectionsArray.map((collection) => ({
        id: collection.id,
        content: <CollectionsList key={collection.type} locationType={collection.type} />
    }));

    return (
        <Page>
            <Container>
                <div style={{ paddingTop: '3.5rem' }}>
                    <TopFilterButtons buttonsArray={collectionsArray} />
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