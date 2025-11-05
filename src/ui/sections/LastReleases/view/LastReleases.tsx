
import { TopFilterButtons } from "#/components/TopFilterButtons/TopFilterButtons";
import { useEffect } from "react";
import { IoGrid, IoList } from "react-icons/io5";
import { Outlet, useNavigate } from "react-router-dom";
import { Page } from 'ui-kit/components/Page/Page'
import { Container } from 'ui-kit/components/Container/Container'
import { usePreferencesStore } from '#/api/preferences';
import '../styles/LastReleases.css';

export const LastReleases = () => {
    const viewMode = usePreferencesStore((state) => state.params.releaseListViewMode || 'grid');
    const setParams = usePreferencesStore((state) => state.setParams);

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

    const toggleViewMode = () => {
        setParams({ releaseListViewMode: viewMode === 'grid' ? 'list' : 'grid' });
    };

    return (
        <Page topOffset="md">
            <Container>
                <div className="last_releases_header">
                    <TopFilterButtons buttonsArray={lastReleasesArray} />
                    <div className="view_mode_toggle">
                        <button 
                            className={`view_mode_button ${viewMode === 'grid' ? 'active' : ''}`}
                            onClick={toggleViewMode}
                            aria-label="Вид галереи"
                        >
                            <IoGrid size={20} />
                        </button>
                        <button 
                            className={`view_mode_button ${viewMode === 'list' ? 'active' : ''}`}
                            onClick={toggleViewMode}
                            aria-label="Вид списка"
                        >
                            <IoList size={20} />
                        </button>
                    </div>
                </div>
                <Outlet />
            </Container>
        </Page>
    )
}