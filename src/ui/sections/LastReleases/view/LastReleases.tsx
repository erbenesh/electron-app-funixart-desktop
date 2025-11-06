
import { TopFilterButtons } from "#/components/TopFilterButtons/TopFilterButtons";
import { TabCarousel } from "#/components/TabCarousel/TabCarousel";
import { LastReleasesList } from "#/components/LastReleasesList/LastReleasesList";
import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Page } from 'ui-kit/components/Page/Page'
import { Container } from 'ui-kit/components/Container/Container'
import '../styles/LastReleases.css';

export const LastReleases = () => {
    const lastReleasesArray = [
        {
            id: 0,
            eng_name: "last_releases",
            ru_name: "Последнее",
            link: '/last/last',
            status: 'last' as const
        },
        {
            id: 1,
            eng_name: "ongoing_releases",
            ru_name: "Онгоинги",
            link: '/last/ongoing',
            status: 'ongoing' as const
        },
        {
            id: 2,
            eng_name: "anonce_releases",
            ru_name: "Анонсы",
            link: '/last/announce',
            status: 'announce' as const
        },
        {
            id: 3,
            eng_name: "completed_releases",
            ru_name: "Завершенные",
            link: '/last/finished',
            status: 'finished' as const
        },
        {
            id: 4,
            eng_name: "films_releases",
            ru_name: "Фильмы",
            link: '/last/films',
            status: 'films' as const
        }
    ];

    const navigate = useNavigate();
    const location = useLocation();

    const getIndexFromPath = (path: string) => {
        const index = lastReleasesArray.findIndex(r => r.link === path);
        return index >= 0 ? index : 0;
    };

    const [activeIndex, setActiveIndex] = useState(() => getIndexFromPath(location.pathname));

    // Sync URL with active index
    useEffect(() => {
        const expectedPath = lastReleasesArray[activeIndex]?.link;
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

    const tabs = lastReleasesArray.map((release) => ({
        id: release.id,
        content: <LastReleasesList key={release.status} status={release.status} />
    }));

    return (
        <Page>
            <Container>
                <div style={{ paddingTop: '2.5rem' }}>
                    <TopFilterButtons buttonsArray={lastReleasesArray} />
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