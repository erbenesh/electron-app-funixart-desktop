import type { Episode, Voiceover, VideoSource } from '../../../types/player';
import { VoiceoverSelector } from './VoiceoverSelector';
import { SourceSelector } from './SourceSelector';
import { EpisodesList } from './EpisodesList';
import styles from '../ReleasePlayer.module.css';

interface PlayerControlsProps {
  voiceovers: Voiceover[];
  selectedVoiceover: Voiceover;
  onVoiceoverChange: (v: Voiceover) => void;

  sources: VideoSource[];
  selectedSource: VideoSource;
  onSourceChange: (s: VideoSource) => void;

  episodes: Episode[];
  selectedEpisode: Episode;
  onEpisodeChange: (e: Episode) => void;
}

export function PlayerControls({
  voiceovers,
  selectedVoiceover,
  onVoiceoverChange,
  sources,
  selectedSource,
  onSourceChange,
  episodes,
  selectedEpisode,
  onEpisodeChange,
}: PlayerControlsProps) {
  return (
    <div className={styles.episodes_buttons_swiper_wrap}>
      <div className={styles.voices_and_sources_dropdowns}>
        <VoiceoverSelector
          voiceovers={voiceovers}
          selected={selectedVoiceover}
          onSelect={onVoiceoverChange}
        />
        <SourceSelector
          sources={sources}
          selected={selectedSource}
          onSelect={onSourceChange}
        />
      </div>

      <EpisodesList
        episodes={episodes}
        selectedEpisode={selectedEpisode}
        source={selectedSource}
        onSelectEpisode={onEpisodeChange}
      />
    </div>
  );
}

