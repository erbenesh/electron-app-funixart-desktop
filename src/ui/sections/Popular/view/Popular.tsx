
import { TopFilterButtons } from "#/components/TopFilterButtons/TopFilterButtons";
import { TabCarousel } from "#/components/TabCarousel/TabCarousel";
import { PopularList } from "#/components/PopularList/PopularList";
import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Page } from 'ui-kit/components/Page/Page'
import { Container } from 'ui-kit/components/Container/Container'
import '../styles/Popular.css';

export const Popular = () => {

    const popularArray = [
        {
            id: 0,
            eng_name: "ongoing_popular",
            ru_name: "Онгоинги",
            link: '/popular/ongoing',
            status: 'ongoing' as const
        },
        {
            id: 1,
            eng_name: "completed_popular",
            ru_name: "Завершенные",
            link: '/popular/finished',
            status: 'finished' as const
        },
        {
            id: 2,
            eng_name: "films_popular",
            ru_name: "Фильмы",
            link: '/popular/films',
            status: 'films' as const
        },
        {
            id: 3,
            eng_name: "ova_popular",
            ru_name: "OVA",
            link: '/popular/ova',
            status: 'ova' as const
        }
    ];

    const navigate = useNavigate();
    const location = useLocation();

    const getIndexFromPath = (path: string) => {
        const index = popularArray.findIndex(p => p.link === path);
        return index >= 0 ? index : 0;
    };

    const [activeIndex, setActiveIndex] = useState(() => getIndexFromPath(location.pathname));

    // Sync URL with active index
    useEffect(() => {
        const expectedPath = popularArray[activeIndex]?.link;
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

    const tabs = popularArray.map((popular) => ({
        id: popular.id,
        content: <PopularList key={popular.status} status={popular.status} />
    }));

    return (
        <Page>
            <Container>
                <div style={{ paddingTop: 'calc(var(--header-height) + 3.5rem)' }}>
                    <TopFilterButtons buttonsArray={popularArray} />
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