import { useQuery } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import { ReleaseCard } from "../../components/ReleaseCard/ReleaseCard";
import { useScrollPosition } from "../../hooks/useScrollPosition";
import styles from './Home.module.css'
import { NavigationTopButtons } from "../../components/NavigationTopButtons/NavigationTopButtons";
import { IRelease } from "../../interfaces/IRelease";
import { useUserStore } from "../../services/api/auth";
import { releaseService } from "../../services/ReleaseService";

export const Home = (props) => {

    const token = useUserStore((state) => state.token);
    const [ currentSection, setCurrentSection ] = useState("last");
    const [ page, setPage ] = useState(0);

    const [ lastReleases, setLastReleases ] = useState([]);
    const [ ongoingReleases, setOngoingReleases ] = useState([]);
    const [ announceReleases, setAnnounceReleases ] = useState([]);
    const [ finishedReleases, setFinishedReleases ] = useState([]);
    const [ filmsReleases, setFilmsReleases ] = useState([]);

    const fetchLastUpdatedReleases = useQuery({
        queryKey: ['getLastUpdatedReleases', currentSection, page, token],
        queryFn: () => releaseService.getLastUpdatedReleases(currentSection, token, page)
    });

    const onChangeSection = (sectionTitle: string) => {
        if(sectionTitle !== currentSection) {
            setPage(0);
            setCurrentSection(sectionTitle);
        }
    }

    useEffect(() => {
        async function _loadInitialReleases() {
            const releasesData: [] = fetchLastUpdatedReleases.status === "success" ? fetchLastUpdatedReleases.data?.data.content : [];

            switch (currentSection) {
                case "ongoing":
                    setOngoingReleases(releasesData);
                    break;
                case "announce":
                    setAnnounceReleases(releasesData);
                    break;
                case "finished":
                    setFinishedReleases(releasesData);
                    break;
                case "films":
                    setFilmsReleases(releasesData);
                    break;
                default:
                    setLastReleases(releasesData);
                    break;
            }
        }

        if(page === 0) {
            _loadInitialReleases();
            // console.log('Загрузка секции');
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [token, fetchLastUpdatedReleases.status, currentSection]);

    useEffect(() => {

        async function _loadNextReleasesPage() {
            const lastReleasesData: [] = fetchLastUpdatedReleases.status === "success" ? fetchLastUpdatedReleases.data?.data.content : [];
            const newLastReleases = [...lastReleases, ...lastReleasesData];
            const newOngoingReleases = [...ongoingReleases, ...lastReleasesData];
            const newAnnounceReleases = [...announceReleases, ...lastReleasesData];
            const newFinishedReleases = [...finishedReleases, ...lastReleasesData];
            const newFilmsReleases = [...filmsReleases, ...lastReleasesData];

            switch (currentSection) {
                case "ongoing":
                    setOngoingReleases(newOngoingReleases);
                    break;
                case "announce":
                    setAnnounceReleases(newAnnounceReleases);
                    break;
                case "finished":
                    setFinishedReleases(newFinishedReleases);
                    break;
                case "films":
                    setFilmsReleases(newFilmsReleases);
                    break;
                default:
                    setLastReleases(newLastReleases);
                    break;
            }
        }

        if (page > 0) {
            _loadNextReleasesPage();
            // console.log('Вторая загрузка', content);
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page, fetchLastUpdatedReleases.status])

    const scrollPosition = useScrollPosition();
    useEffect(() => {
        
        if (scrollPosition >= 80) {
            if(page === 0) {
                setPage(1);
            } else {
                setPage(page + 1);
            }
            // console.log('Обновление страницы', page);
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [scrollPosition])


    const currentReleasesList = currentSection === "ongoing" ?
                                ongoingReleases : 
                                currentSection === "announce" ?
                                announceReleases : 
                                currentSection === "finished" ?
                                finishedReleases : 
                                currentSection === "films" ?
                                filmsReleases : lastReleases;

    if (fetchLastUpdatedReleases.status === "error") {
        return ('An error has occurred: ' + fetchLastUpdatedReleases.error.message);
    }

    return (
        <div>

            <NavigationTopButtons currentSection={currentSection} setCurrentSection={onChangeSection} isHeaderHidden={props.isHeaderHidden}/>
            
            <div className={styles.anime_list}>
    
                    {
                        currentReleasesList?.map((
                            el: IRelease) => 
                            el.id && 
                            <ReleaseCard 
                                key={el.id} 
                                release={el}
                                setCurrentChoosenRelease={props.setCurrentChoosenRelease}
                            />
                        ) 
                    }

            </div>

            { fetchLastUpdatedReleases.status === "pending" &&
                <div className="loader-container_home">	
                    <i className="loader-circle"></i>
                </div>
            }
        </div>
    )
}