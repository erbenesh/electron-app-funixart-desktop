/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useRef, useState } from 'react';
import { IoEye, IoEyeOffOutline } from "react-icons/io5";
import { useAddHistory, useLoadPlayerEpisodes, useLoadPlayerSources, useLoadPlayerVoiceovers, useMarkWatched } from '../../api/hooks/usePlayer';
import { useUserStore } from '../../auth/store/auth';
import { useClickOutside } from '../../hooks/useClickOutside';
import { VoiceoverPicker } from '../VoiceoverPicker/VoiceoverPicker';
import styles from './ReleasePlayer.module.css';

export const ReleasePlayer = (props) => {

    const userStore = useUserStore();
    const [voiceoverInfo, setVoiceoverInfo] = useState(null);
    const [selectedVoiceover, setSelectedVoiceover] = useState(null);
    const [sourcesInfo, setSourcesInfo] = useState(null);
    const [selectedSource, setSelectedSource] = useState(null);
    const [episodeInfo, setEpisodeInfo] = useState(null);
    const [selectedEpisode, setSelectedEpisode] = useState(null);

    const [ isDropdownVoicesHidden, setIsDropdownVoicesHidden ] = useState(false);
    const [ isDropdownSourcesHidden, setIsDropdownSourcesHidden ] = useState(false);

    const fetchVoiceOver = useLoadPlayerVoiceovers(props.id);

    // Close dropdowns on outside click
    const voicesRef = useRef<HTMLDivElement | null>(null);
    const sourcesRef = useRef<HTMLDivElement | null>(null);
    useClickOutside(voicesRef, () => setIsDropdownVoicesHidden(false));
    useClickOutside(sourcesRef, () => setIsDropdownSourcesHidden(false));
    useEffect(() => {
        if (fetchVoiceOver.isSuccess) {
            const data = fetchVoiceOver.data as any;
            const voiceover = data.data;
            console.log(voiceover);
            setVoiceoverInfo(voiceover.types);
            setSelectedVoiceover(voiceover.types[0]);
        }
    }, [fetchVoiceOver.isSuccess]);

    const fetchSources = useLoadPlayerSources(props.id, selectedVoiceover?.id);
    useEffect(() => {
        if (fetchSources.isSuccess) {
            const data = fetchSources.data as any;
            const sources = data.data;
            setSourcesInfo(sources.sources);
            setSelectedSource(sources.sources[0]);
        }
    }, [fetchSources.isSuccess]);
 
    const fetchEpisodes = useLoadPlayerEpisodes({ releaseId: props.id, voiceoverId: selectedVoiceover?.id, sourceId: selectedSource?.id, token: userStore.token });
    useEffect(() => {
        if (fetchEpisodes.isSuccess) {
            const data = fetchEpisodes.data as any;
            const episodes = data.data;
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
        }
    }, [fetchEpisodes.isSuccess]);

    const fetchToHistory = useAddHistory({ releaseId: props.id, sourceId: selectedSource?.id, token: userStore.token });

    const fetchMarkWatched = useMarkWatched({ releaseId: props.id, sourceId: selectedSource?.id, token: userStore.token });

    useEffect(() => {
        fetchVoiceOver.mutate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    
    useEffect(() => {
        if (selectedVoiceover) {
            fetchSources.mutate();
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedVoiceover]);
    
    useEffect(() => {
        if (selectedSource) {
            fetchEpisodes.mutate();
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedSource, userStore.token]);

    async function _addToHistory(episode: any) {
        if(episode && userStore.token) {
            fetchToHistory.mutate(episode.position);
            fetchMarkWatched.mutate(episode.position);
        }
    }

    function setVoice(voiceover: any) {
        setSelectedVoiceover(voiceover);
        setIsDropdownVoicesHidden(!isDropdownVoicesHidden);
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
            {fetchVoiceOver.isPending || fetchSources.isPending || fetchEpisodes.isPending || !voiceoverInfo || !sourcesInfo || !episodeInfo ? (            
                
                    <div className={styles.player_loading}>
                        <div className="loader-container">	
                            <i className="loader-circle"></i>
                        </div>
                    </div>
                
            ) : (
            <div className={styles.player_row}>

                    <div className={styles.player_wrap}>
                        <iframe allowFullScreen={true} src={selectedEpisode.url} className={styles.player}></iframe>
                    </div>

                    <div className={styles.episodes_buttons_swiper_wrap}>

                        <div className={styles.voices_and_sources_dropdowns}>
                            <div className={styles.player_dropdowns} ref={voicesRef}>
                                <button className={styles.dropdown_button} onClick={() => setIsDropdownVoicesHidden(!isDropdownVoicesHidden)} type='button'>
                                    <div className={styles.voicer_ico_border}>
                                        <img className={styles.voicer_ico} src={selectedVoiceover?.icon} alt="" />
                                    </div>
                                    <div className={styles.button_name}>
                                        <p>{selectedVoiceover?.name}</p>
                                    </div>
                                </button>

                                <div className={styles.top_buttons_swiper} style={isDropdownVoicesHidden ? {display: "flex"} : {}}>
                                    {isDropdownVoicesHidden && (
                                        <VoiceoverPicker
                                            items={voiceoverInfo.map((v:any) => ({
                                                id: v.id,
                                                title: v.name,
                                                episodesCount: v.episodes_count,
                                                viewsCount: v.view_count,
                                                logoUrl: v.icon,
                                                kind: 'dub',
                                                isNew: false,
                                            }))}
                                            onSelect={(item) => {
                                                const found = voiceoverInfo.find((v:any) => v.id === item.id);
                                                if (found) setVoice(found);
                                                setIsDropdownVoicesHidden(false);
                                            }}
                                        />
                                    )}
                                </div>
                            </div>
                            <div className={styles.player_dropdowns} style={{width: '40%'}} ref={sourcesRef}>
                                <button className={styles.dropdown_button} onClick={() => setIsDropdownSourcesHidden(!isDropdownSourcesHidden)} 
                                type='button' style={{placeContent: 'center', height: '100%'}}>
                                    {selectedSource?.name}
                                </button>

                                <div className={styles.top_buttons_swiper} style={isDropdownSourcesHidden ? {display: "flex"} : {}}>
                                    {sourcesInfo.map((source: any) => (
                                        <button key={`source_${source.id}`} className={styles.dropdown_list_button}
                                        onClick={() => setSelectedSource(source)}>
                                            {source.name}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className={styles.episodes_buttons_swiper}>
                            {episodeInfo.map((episode: any) => (
                                <button key={`episode_${episode.position}`} className={styles.episode_choose_button}
                                    onClick={() => { 
                                        setSelectedEpisode(episode); 
                                        episode.is_watched = true; 
                                        _addToHistory(episode);
                                    }} 
                                disabled={selectedEpisode.position === episode.position}>
                                    <p>{
                                        episode.name ? episode.name + ` `
                                        : `${
                                            selectedSource.name !== "Sibnet"
                                                ? episode.position
                                                : episode.position + 1
                                            }`
                                    }</p>
                                    <p className={styles.eye_ico}>{
                                        episode.is_watched ? 
                                        <IoEye/>
                                        : <IoEyeOffOutline /> 
                                    }</p>
                                </button>
                            ))}
                        </div>
                    </div>
                
            </div>
            )}

        </div>
    )
}