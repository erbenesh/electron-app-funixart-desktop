
import { skipToken, useQuery } from '@tanstack/react-query'
import styles from './ReleasePlayer.module.css'
import { anixartService } from '../../services/AnixartService';
import { useEffect, useState } from 'react';
import { useUserStore } from '../../services/auth';

export const ReleasePlayer = ({...props}) => {

    const userStore = useUserStore();
    const [voiceoverInfo, setVoiceoverInfo] = useState(null);
    const [selectedVoiceover, setSelectedVoiceover] = useState(null);
    const [sourcesInfo, setSourcesInfo] = useState(null);
    const [selectedSource, setSelectedSource] = useState(null);
    const [episodeInfo, setEpisodeInfo] = useState(null);
    const [selectedEpisode, setSelectedEpisode] = useState(null);

    const [ isFetchingVoiceOver, setIsFetchingVoiceOver ] = useState(false);
    const [ isFetchingSources, setIsFetchingSources ] = useState(false);
    const [ isFetchingEpisodes, setIsFetchingEpisodes ] = useState(false);
    const [ isFetchingToHistory, setIsFetchingToHistory ] = useState(false);


    const fetchVoiceOver = useQuery({
        queryKey: ["voice over", props.id],
        queryFn: isFetchingVoiceOver ? () => anixartService.getReleasePlayer(props.id) : skipToken
    });

    const fetchSources = useQuery({
        queryKey: ["sources", props.id],
        queryFn: isFetchingSources ? () => anixartService.getReleasePlayer(`${props.id}/${selectedVoiceover.id}`) : skipToken
    });
 
    const fetchEpisodes = useQuery({
        queryKey: ["episodes", props.id],
        queryFn: isFetchingEpisodes ? () => anixartService.getReleasePlayer(`${props.id}/${selectedVoiceover.id}/${selectedSource.id}?token=${userStore.token}`) : skipToken
    });

    const fetchToHistory = useQuery({
        queryKey: ["addHistory"],
        queryFn: isFetchingToHistory ? () => anixartService.getToHistory(`${props.id}/${selectedSource.id}/${selectedEpisode.position}?token=${userStore.token}`) : skipToken
    });

    const fetchMarkWatched = useQuery({
        queryKey: ["markWatched"],
        queryFn: isFetchingToHistory ? () => anixartService.getMarkWatched(`$${props.id}/${selectedSource.id}/${selectedEpisode.position}?token=${userStore.token}`) : skipToken
    });


    useEffect(() => {
        async function _fetchInfo() {
            setIsFetchingVoiceOver(true);
            const voiceover = fetchVoiceOver.data?.data;
            if(fetchVoiceOver.status === "success"){
                setVoiceoverInfo(voiceover.types);
                setSelectedVoiceover(voiceover.types[0]);
                setIsFetchingVoiceOver(false);
            }
        }
        _fetchInfo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [fetchVoiceOver.status]);
    
    useEffect(() => {
        async function _fetchInfo() {
            setIsFetchingSources(true);
            const sources = fetchSources.data?.data;
            if(fetchSources.status === "success"){
                setSourcesInfo(sources.sources);
                setSelectedSource(sources.sources[0]);
                setIsFetchingSources(false);
            }
        }
        if (selectedVoiceover) {
            _fetchInfo();
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedVoiceover, fetchSources.status]);
    
    useEffect(() => {
        async function _fetchInfo() {
            setIsFetchingEpisodes(true)
            const episodes = fetchEpisodes.data?.data;
            if(fetchEpisodes.status === "success"){
                if (episodes.episodes.length === 0) {
                    const remSources = sourcesInfo.filter(
                        (source) => source.id !== selectedSource.id
                    );
                    setSourcesInfo(remSources);
                    setSelectedSource(remSources[0]);

                    return;
                }

                setEpisodeInfo(episodes.episodes);
                setSelectedEpisode(episodes.episodes[0]);
                setIsFetchingEpisodes(false);
            }
        }
        if (selectedSource) {
            _fetchInfo();
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedSource, userStore.token, fetchEpisodes.status]);

    async function _addToHistory(episode: any) {
        if(episode && userStore.token) {
            setIsFetchingToHistory(true);
        }
    }

    useEffect(() => {
        if (fetchToHistory.status === "success") {
            setIsFetchingToHistory(false);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [fetchToHistory.status]);

    if (fetchVoiceOver.status === "pending"|| fetchSources.status === "pending" || fetchEpisodes.status === "pending") {
        return (
            <div className="loader-container">	
                <i className="loader-circle"></i>
            </div>
        )
    }

    if (fetchVoiceOver.status === "error") {
        return ('An error has occurred: ' + fetchVoiceOver.error.message);
    } else if (fetchSources.status === "error") {
        return ('An error has occurred: ' + fetchSources.error.message);
    } else if (fetchEpisodes.status === "error") {
        return ('An error has occurred: ' + fetchEpisodes.error.message);
    }

    return (
        <div>
                {!voiceoverInfo || !sourcesInfo || !episodeInfo ? (
                    <div className="flex items-center justify-center w-full aspect-video">
                        <div className="loader-container">	
                            <i className="loader-circle"></i>
                        </div>
                    </div>
                ) : (
                    <>
                    <div className="flex flex-wrap gap-2">
                        {/* <Dropdown label={`Озвучка: ${selectedVoiceover.name}`} color="blue" theme={DropdownTheme} >
                            {voiceoverInfo.map((voiceover: any) => (
                                <Dropdown.Item key={`voiceover_${voiceover.id}`} onClick={() => setSelectedVoiceover(voiceover)}>
                                    {voiceover.name}
                                </Dropdown.Item>
                            ))}
                        </Dropdown>

                        <Dropdown label={`Плеер: ${selectedSource.name}`} color="blue" theme={DropdownTheme}>
                            {sourcesInfo.map((source: any) => (
                                <Dropdown.Item
                                key={`source_${source.id}`}
                                onClick={() => setSelectedSource(source)}
                                >
                                {source.name}
                                </Dropdown.Item>
                            ))}
                        </Dropdown> */}

                    </div>

                    <div className={styles.player_wrap}>
                        <iframe allowFullScreen={true} src={selectedEpisode.url} className={styles.player}></iframe>
                    </div>

                    <div className={styles.episodes_buttons_swiper_wrap}>
                        <div className={styles.episodes_buttons_swiper}>
                            {episodeInfo.map((episode: any) => (
                                <button key={`episode_${episode.position}`} className={styles.episode_choose_button}
                                    onClick={() => { setSelectedEpisode(episode); episode.is_watched = true; _addToHistory(episode);}} disabled={selectedEpisode.position === episode.position}>
                                    {episode.name ? episode.name.split(" серия")
                                    : `${
                                        selectedSource.name !== "Sibnet"
                                            ? episode.position
                                            : episode.position + 1
                                        }`
                                    }
                                    {
                                    episode.is_watched ? 
                                    ( <span className="w-5 h-5 ml-2 iconify material-symbols--check-circle"></span>) 
                                    : (<span className="w-5 h-5 ml-2 opacity-10 iconify material-symbols--check-circle"></span>)
                                    }
                                </button>
                            ))}
                        </div>

                    </div>
                    
                    </>
                )}
        </div>
    )
}