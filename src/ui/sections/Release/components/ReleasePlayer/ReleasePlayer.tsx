import styles from './ReleasePlayer.module.css';

import { useState, useEffect } from 'react';
import { useMutation } from '@tanstack/react-query';
import { IoEye, IoEyeOutline, IoEyeOffOutline } from 'react-icons/io5';

import { IEpisode, ISource, IType, playerService } from '../../../../api/player/PlayerService';

interface Props {
  id: string;
}

export const ReleasePlayer = ({ id }: Props) => {
  //const userStore = useAuthStore();

  const [voiceoverInfo, setVoiceoverInfo] = useState<IType[]>();
  const [selectedVoiceover, setSelectedVoiceover] = useState<IType>();

  const [sourcesInfo, setSourcesInfo] = useState<ISource[]>();
  const [selectedSource, setSelectedSource] = useState<ISource>();

  const [episodeInfo, setEpisodeInfo] = useState<IEpisode[]>();
  const [selectedEpisode, setSelectedEpisode] = useState<IEpisode>();

  const [isDropdownVoicesHidden, setIsDropdownVoicesHidden] = useState(false);
  const [isDropdownSourcesHidden, setIsDropdownSourcesHidden] = useState(false);

  const fetchVoiceOver = useMutation({
    mutationKey: ['voice over', id],
    mutationFn: () => playerService.getReleasePlayer(id),
    onSuccess(data) {
      const voiceover = data.data;
      // console.log(voiceover);
      setVoiceoverInfo(voiceover.types);
      setSelectedVoiceover(voiceover.types[0]);
    },
  });

  const fetchSources = useMutation({
    mutationKey: ['sources', id],
    mutationFn: () => playerService.getReleasePlayer(`${id}/${selectedVoiceover?.id}`),
    onSuccess(data) {
      const sources = data.data;

      setSourcesInfo(sources.sources);
      setSelectedSource(sources.sources[0]);
    },
  });

  const fetchEpisodes = useMutation({
    mutationKey: ['episodes', id],
    mutationFn: () =>
      playerService.getReleasePlayer(`${id}/${selectedVoiceover?.id}/${selectedSource?.id}`),
    onSuccess(data) {
      const episodes = data.data;

      if (episodes.episodes.length === 0) {
        const remSources = sourcesInfo?.filter((source) => source.id !== selectedSource?.id);
        if (remSources) {
          setSourcesInfo(remSources);
          setSelectedSource(remSources[0]);
        }

        return;
      }

      setEpisodeInfo(episodes.episodes);
      setSelectedEpisode(episodes.episodes[0]);
    },
  });

  const fetchToHistory = useMutation({
    mutationKey: ['addHistory', id, selectedSource?.id],
    mutationFn: (position) => playerService.getToHistory(`${id}/${selectedSource?.id}/${position}`),
  });

  const fetchMarkWatched = useMutation({
    mutationKey: ['markWatched', id, selectedSource?.id],
    mutationFn: (position) =>
      playerService.getMarkWatched(`${id}/${selectedSource?.id}/${position}`),
  });

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
  }, [selectedSource]);

  async function _addToHistory(episode: any) {
    if (episode) {
      fetchToHistory.mutate(episode.position);
      fetchMarkWatched.mutate(episode.position);
    }
  }

  function setVoice(voiceover: any) {
    setSelectedVoiceover(voiceover);
    setIsDropdownVoicesHidden(!isDropdownVoicesHidden);
  }

  if (fetchVoiceOver.status === 'error') {
    return 'An error has occurred: ' + fetchVoiceOver.error.message;
  } else if (fetchSources.status === 'error') {
    return 'An error has occurred: ' + fetchSources.error.message;
  } else if (fetchEpisodes.status === 'error') {
    return 'An error has occurred: ' + fetchEpisodes.error.message;
  }

  return (
    <div>
      {fetchVoiceOver.isPending ||
      fetchSources.isPending ||
      fetchEpisodes.isPending ||
      !voiceoverInfo ||
      !sourcesInfo ||
      !episodeInfo ? (
        <div className={styles.player_loading}>
          <div className="loader-container">
            <i className="loader-circle" />
          </div>
        </div>
      ) : (
        <div className={styles.player_row}>
          <div className={styles.player_wrap}>
            <iframe allowFullScreen src={selectedEpisode?.url} className={styles.player} />
          </div>

          <div className={styles.episodes_buttons_swiper_wrap}>
            <div className={styles.voices_and_sources_dropdowns}>
              <div className={styles.player_dropdowns}>
                <button
                  className={styles.dropdown_button}
                  onClick={() => setIsDropdownVoicesHidden(!isDropdownVoicesHidden)}
                  type="button"
                >
                  <div className={styles.voicer_ico_border}>
                    <img className={styles.voicer_ico} src={selectedVoiceover?.icon} alt="" />
                  </div>
                  <div className={styles.button_name}>
                    <p>{selectedVoiceover?.name}</p>
                  </div>
                </button>

                <div
                  className={styles.top_buttons_swiper}
                  style={isDropdownVoicesHidden ? { display: 'flex' } : {}}
                >
                  {voiceoverInfo.map(
                    (voiceover) =>
                      voiceover.id !== selectedVoiceover?.id && (
                        <button
                          key={`voiceover_${voiceover.id}`}
                          className={styles.dropdown_list_button}
                          onClick={() => setVoice(voiceover)}
                        >
                          <div className={styles.info_flex_row}>
                            <div className={styles.voicer_ico_border}>
                              <img className={styles.voicer_ico} src={voiceover.icon} alt="" />
                            </div>
                            <div className={styles.button_name}>
                              <p className={styles.info}>{voiceover.name}</p>
                              <p className={styles.info_ep}>{voiceover.episodes_count} эпизодов</p>
                            </div>
                          </div>
                          <div className={styles.info_flex_row} style={{ gap: '0.1rem' }}>
                            <p className={styles.info_ep}>{voiceover.view_count}</p>
                            <IoEyeOutline style={{ width: 0.9 + 'rem', height: 0.9 + 'rem' }} />
                          </div>
                        </button>
                      )
                  )}
                </div>
              </div>
              <div className={styles.player_dropdowns} style={{ width: '40%' }}>
                <button
                  className={styles.dropdown_button}
                  onClick={() => setIsDropdownSourcesHidden(!isDropdownSourcesHidden)}
                  type="button"
                  style={{ placeContent: 'center', height: '100%' }}
                >
                  {selectedSource?.name}
                </button>

                <div
                  className={styles.top_buttons_swiper}
                  style={isDropdownSourcesHidden ? { display: 'flex' } : {}}
                >
                  {sourcesInfo?.map((source: any) => (
                    <button
                      key={`source_${source.id}`}
                      className={styles.dropdown_list_button}
                      onClick={() => setSelectedSource(source)}
                    >
                      {source.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className={styles.episodes_buttons_swiper}>
              {episodeInfo.map((episode: any) => (
                <button
                  key={`episode_${episode.position}`}
                  className={styles.episode_choose_button}
                  onClick={() => {
                    setSelectedEpisode(episode);
                    episode.is_watched = true;
                    _addToHistory(episode);
                  }}
                  disabled={selectedEpisode?.position === episode.position}
                >
                  <p>
                    {episode.name
                      ? episode.name + ` `
                      : `${
                          selectedSource?.name !== 'Sibnet'
                            ? episode.position
                            : episode.position + 1
                        }`}
                  </p>
                  <p className={styles.eye_ico}>
                    {episode.is_watched ? <IoEye /> : <IoEyeOffOutline />}
                  </p>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
