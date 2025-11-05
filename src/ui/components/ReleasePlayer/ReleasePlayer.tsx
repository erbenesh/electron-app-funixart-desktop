import { useParams, useSearchParams } from 'react-router-dom';
import { QueryError } from '../QueryError/QueryError';
import { PlayerControls } from './components/PlayerControls';
import { PlayerFrame } from './components/PlayerFrame';
import { PlayerSkeleton } from './components/PlayerSkeleton';
import { usePlayerData } from './hooks/usePlayerData';
import styles from './ReleasePlayer.module.css';

interface ReleasePlayerProps {
  minimal?: boolean;
}

export const ReleasePlayer = (props: ReleasePlayerProps) => {
  const { releaseId } = useParams();
  const [searchParams] = useSearchParams();
  
  // Get initial values from URL params (for mobile watch flow)
  const initialTypeId = searchParams.get('type');
  const initialSourceId = searchParams.get('source');
  const initialEpisodeIndex = searchParams.get('episode');
  
  const playerData = usePlayerData({ 
    releaseId: releaseId!,
    initialTypeId,
    initialSourceId,
    initialEpisodeIndex
  });

  // Handle errors
  if (playerData.error) {
    return <QueryError error={playerData.error} />;
  }

  // Handle loading state
  if (playerData.isLoading || !playerData.voiceovers.length) {
    return <PlayerSkeleton />;
  }

  // Ensure we have all required data
  if (!playerData.selectedVoiceover || !playerData.selectedSource || !playerData.selectedEpisode) {
    return <PlayerSkeleton />;
  }

  const handleEpisodeSelect = (episode: typeof playerData.selectedEpisode) => {
    if (!episode) return;
    
    playerData.setSelectedEpisode(episode);
    
    // Mark episode as watched
    episode.is_watched = true;
    
    // Add to history
    playerData.addToHistory(episode);
    playerData.markAsWatched(episode);
  };

  return (
    <div>
      <div className={styles.player_row}>
        <PlayerFrame url={playerData.selectedEpisode.url} />

        {!props.minimal && (
          <PlayerControls
            voiceovers={playerData.voiceovers}
            selectedVoiceover={playerData.selectedVoiceover}
            onVoiceoverChange={playerData.setSelectedVoiceover}
            sources={playerData.sources}
            selectedSource={playerData.selectedSource}
            onSourceChange={playerData.setSelectedSource}
            episodes={playerData.episodes}
            selectedEpisode={playerData.selectedEpisode}
            onEpisodeChange={handleEpisodeSelect}
          />
        )}
      </div>
    </div>
  );
};
