import { IoEye, IoEyeOffOutline } from 'react-icons/io5';
import type { Episode, VideoSource } from '../../../types/player';
import styles from '../ReleasePlayer.module.css';

interface EpisodesListProps {
  episodes: Episode[];
  selectedEpisode: Episode;
  source: VideoSource;
  onSelectEpisode: (episode: Episode) => void;
}

export function EpisodesList({ episodes, selectedEpisode, source, onSelectEpisode }: EpisodesListProps) {
  return (
    <div className={styles.episodes_buttons_swiper}>
      {episodes.map((episode) => {
        const isSelected = selectedEpisode.position === episode.position;
        
        return (
          <button
            key={`episode_${episode.position}`}
            className={styles.episode_choose_button}
            onClick={() => onSelectEpisode(episode)}
            disabled={isSelected}
            style={{
              background: episode.is_watched 
                ? 'rgba(189, 78, 44, 0.3)' 
                : isSelected 
                ? 'rgb(189, 78, 44)' 
                : undefined
            }}
          >
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '0.15rem' }}>
              <p style={{ margin: 0 }}>
                {episode.name
                  ? `${episode.name} `
                  : `${source.name !== 'Sibnet' ? episode.position : episode.position + 1}`}
              </p>
              {episode.is_filler && (
                <p style={{ 
                  fontSize: '0.65rem', 
                  color: '#999', 
                  fontStyle: 'italic',
                  margin: 0
                }}>
                  Филлер
                </p>
              )}
            </div>
            <p className={styles.eye_ico} style={{ margin: 0 }}>
              {episode.is_watched ? <IoEye /> : <IoEyeOffOutline />}
            </p>
          </button>
        );
      })}
    </div>
  );
}

