import { z } from 'zod';

// Country Schema
const CountrySchema = z.object({
  id: z.number(),
  name: z.string(),
  code: z.string(),
});

// Type Schema
const TypeSchema = z.object({
  id: z.number(),
  name: z.string(),
  code: z.string(),
});

// Genre Schema
const GenreSchema = z.object({
  id: z.number(),
  name: z.string(),
});

// Studio Schema
const StudioSchema = z.object({
  id: z.number(),
  name: z.string(),
});

// Title Schema
const TitleSchema = z.object({
  ru: z.string().optional(),
  en: z.string().optional(),
  original: z.string().optional(),
});

// Release Schema
export const ReleaseSchema = z.object({
  id: z.number(),
  code: z.string(),
  title: TitleSchema,
  description: z.string().optional(),
  poster: z.string().nullable(),
  
  type: TypeSchema.optional(),
  country: CountrySchema.optional(),
  
  status_id: z.number().optional(),
  release_date: z.number().optional(),
  
  episodes_total: z.number().optional(),
  episodes_released: z.number().optional(),
  episode_duration: z.number().optional(),
  
  schedule_day: z.number().optional(),
  
  genres: z.array(GenreSchema).optional(),
  studios: z.array(StudioSchema).optional(),
  
  vote_average: z.number().optional(),
  vote_count: z.number().optional(),
  
  is_favorite: z.boolean().optional(),
  profile_list: z.number().optional(),
  
  created_at: z.string().optional(),
  updated_at: z.string().optional(),
});

export type ReleaseValidated = z.infer<typeof ReleaseSchema>;

// Release Response Schema
export const ReleaseResponseSchema = z.object({
  code: z.number(),
  release: ReleaseSchema,
  is_my_profile: z.boolean().optional(),
});

export type ReleaseResponseValidated = z.infer<typeof ReleaseResponseSchema>;

// Pageable Response Schema
export function createPageableSchema<T extends z.ZodTypeAny>(itemSchema: T) {
  return z.object({
    content: z.array(itemSchema),
    page: z.number(),
    size: z.number(),
    total_elements: z.number(),
    total_pages: z.number(),
    last: z.boolean(),
  });
}

export const PageableReleaseSchema = createPageableSchema(ReleaseSchema);
export type PageableReleaseValidated = z.infer<typeof PageableReleaseSchema>;

