// Player related types
export interface Voiceover {
  id: number;
  name: string;
  icon: string;
  episodes_count: number;
  view_count: number;
}

export interface VideoSource {
  id: number;
  name: string;
}

export interface Episode {
  position: number;
  name?: string;
  url: string;
  is_watched: boolean;
  is_filler?: boolean;
}

export interface VoiceoverResponse {
  code: number;
  data: {
    types: Voiceover[];
  };
}

export interface SourcesResponse {
  code: number;
  data: {
    sources: VideoSource[];
  };
}

export interface EpisodesResponse {
  code: number;
  data: {
    episodes: Episode[];
  };
}

export type VoiceoverKind = 'all' | 'dub' | 'subs';

export interface VoiceoverPickerItem {
  id: number | string;
  title: string;
  episodesCount: number;
  viewsCount?: number;
  logoUrl?: string;
  kind: VoiceoverKind;
  isNew?: boolean;
}

