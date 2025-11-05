import { useEffect, useState } from 'react';
import { useAddHistory, useLoadPlayerEpisodes, useLoadPlayerSources, useLoadPlayerVoiceovers, useMarkWatched } from '../../../api/hooks/usePlayer';
import { useAuthStore } from '../../../stores/authStore';
import type { Episode, Voiceover, VideoSource, VoiceoverResponse, SourcesResponse, EpisodesResponse } from '../../../types/player';

interface UsePlayerDataProps {
  releaseId: string;
}

interface UsePlayerDataReturn {
  // Voiceovers
  voiceovers: Voiceover[];
  selectedVoiceover: Voiceover | null;
  setSelectedVoiceover: (v: Voiceover) => void;
  isVoiceoversLoading: boolean;
  voiceoversError: Error | null;

  // Sources
  sources: VideoSource[];
  selectedSource: VideoSource | null;
  setSelectedSource: (s: VideoSource) => void;
  isSourcesLoading: boolean;
  sourcesError: Error | null;

  // Episodes
  episodes: Episode[];
  selectedEpisode: Episode | null;
  setSelectedEpisode: (e: Episode) => void;
  isEpisodesLoading: boolean;
  episodesError: Error | null;

  // Actions
  addToHistory: (episode: Episode) => void;
  markAsWatched: (episode: Episode) => void;

  // Overall state
  isLoading: boolean;
  error: Error | null;
}

export function usePlayerData({ releaseId }: UsePlayerDataProps): UsePlayerDataReturn {
  const token = useAuthStore((state) => state.token);

  const [voiceovers, setVoiceovers] = useState<Voiceover[]>([]);
  const [selectedVoiceover, setSelectedVoiceover] = useState<Voiceover | null>(null);
  
  const [sources, setSources] = useState<VideoSource[]>([]);
  const [selectedSource, setSelectedSource] = useState<VideoSource | null>(null);
  
  const [episodes, setEpisodes] = useState<Episode[]>([]);
  const [selectedEpisode, setSelectedEpisode] = useState<Episode | null>(null);

  // Fetch voiceovers
  const voiceoversQuery = useLoadPlayerVoiceovers(releaseId);
  
  useEffect(() => {
    if (voiceoversQuery.isSuccess && voiceoversQuery.data) {
      const data = voiceoversQuery.data as any;
      const voiceoverList = data.data?.types || [];
      
      if (voiceoverList.length > 0) {
        setVoiceovers(voiceoverList);
        setSelectedVoiceover(voiceoverList[0]);
      }
    }
  }, [voiceoversQuery.isSuccess, voiceoversQuery.data]);

  // Fetch sources
  const sourcesQuery = useLoadPlayerSources(releaseId, selectedVoiceover?.id);
  
  useEffect(() => {
    if (sourcesQuery.isSuccess && sourcesQuery.data) {
      const data = sourcesQuery.data as any;
      const sourcesList = data.data?.sources || [];
      
      if (sourcesList.length > 0) {
        setSources(sourcesList);
        setSelectedSource(sourcesList[0]);
      }
    }
  }, [sourcesQuery.isSuccess, sourcesQuery.data]);

  // Fetch episodes
  const episodesQuery = useLoadPlayerEpisodes({
    releaseId,
    voiceoverId: selectedVoiceover?.id,
    sourceId: selectedSource?.id,
    token,
  });

  useEffect(() => {
    if (episodesQuery.isSuccess && episodesQuery.data) {
      const data = episodesQuery.data as any;
      const episodesList = data.data?.episodes || [];

      // If no episodes, try next source
      if (episodesList.length === 0 && sources.length > 1) {
        const remainingSources = sources.filter(s => s.id !== selectedSource?.id);
        if (remainingSources.length > 0) {
          setSources(remainingSources);
          setSelectedSource(remainingSources[0]);
        }
        return;
      }

      setEpisodes(episodesList);
      if (episodesList.length > 0) {
        setSelectedEpisode(episodesList[0]);
      }
    }
  }, [episodesQuery.isSuccess, episodesQuery.data, sources, selectedSource?.id]);

  // History and watched mutations
  const addHistoryMutation = useAddHistory({
    releaseId,
    sourceId: selectedSource?.id,
    token,
  });

  const markWatchedMutation = useMarkWatched({
    releaseId,
    sourceId: selectedSource?.id,
    token,
  });

  // Trigger initial fetch
  useEffect(() => {
    voiceoversQuery.mutate();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (selectedVoiceover) {
      sourcesQuery.mutate();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedVoiceover]);

  useEffect(() => {
    if (selectedSource) {
      episodesQuery.mutate();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedSource, token]);

  // Actions
  const addToHistory = (episode: Episode) => {
    if (episode && token) {
      addHistoryMutation.mutate(episode.position);
    }
  };

  const markAsWatched = (episode: Episode) => {
    if (episode && token) {
      markWatchedMutation.mutate(episode.position);
    }
  };

  const isLoading = voiceoversQuery.isPending || sourcesQuery.isPending || episodesQuery.isPending;
  const error = voiceoversQuery.error || sourcesQuery.error || episodesQuery.error;

  return {
    // Voiceovers
    voiceovers,
    selectedVoiceover,
    setSelectedVoiceover,
    isVoiceoversLoading: voiceoversQuery.isPending,
    voiceoversError: voiceoversQuery.error,

    // Sources
    sources,
    selectedSource,
    setSelectedSource,
    isSourcesLoading: sourcesQuery.isPending,
    sourcesError: sourcesQuery.error,

    // Episodes
    episodes,
    selectedEpisode,
    setSelectedEpisode,
    isEpisodesLoading: episodesQuery.isPending,
    episodesError: episodesQuery.error,

    // Actions
    addToHistory,
    markAsWatched,

    // Overall
    isLoading,
    error,
  };
}

