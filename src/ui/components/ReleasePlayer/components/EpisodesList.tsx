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
          >
            <p>
              {episode.name
                ? `${episode.name} `
                : `${source.name !== 'Sibnet' ? episode.position : episode.position + 1}`}
            </p>
            <p className={styles.eye_ico}>
              {episode.is_watched ? <IoEye /> : <IoEyeOffOutline />}
            </p>
          </button>
        );
      })}
    </div>
  );
}

