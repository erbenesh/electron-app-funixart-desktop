import { z } from 'zod';

// Voiceover Schema
export const VoiceoverSchema = z.object({
  id: z.number(),
  name: z.string(),
  icon: z.string(),
  episodes_count: z.number(),
  view_count: z.number(),
});

export type VoiceoverValidated = z.infer<typeof VoiceoverSchema>;

// Video Source Schema
export const VideoSourceSchema = z.object({
  id: z.number(),
  name: z.string(),
});

export type VideoSourceValidated = z.infer<typeof VideoSourceSchema>;

// Episode Schema
export const EpisodeSchema = z.object({
  position: z.number(),
  name: z.string().optional(),
  url: z.string(),
  is_watched: z.boolean(),
});

export type EpisodeValidated = z.infer<typeof EpisodeSchema>;

// Voiceover Response Schema
export const VoiceoverResponseSchema = z.object({
  code: z.number(),
  data: z.object({
    types: z.array(VoiceoverSchema),
  }),
});

export type VoiceoverResponseValidated = z.infer<typeof VoiceoverResponseSchema>;

// Sources Response Schema
export const SourcesResponseSchema = z.object({
  code: z.number(),
  data: z.object({
    sources: z.array(VideoSourceSchema),
  }),
});

export type SourcesResponseValidated = z.infer<typeof SourcesResponseSchema>;

// Episodes Response Schema
export const EpisodesResponseSchema = z.object({
  code: z.number(),
  data: z.object({
    episodes: z.array(EpisodeSchema),
  }),
});

export type EpisodesResponseValidated = z.infer<typeof EpisodesResponseSchema>;

