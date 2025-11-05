// Central export for all Zod schemas
export * from './userSchema';
export * from './playerSchema';
export * from './releaseSchema';

// Common validation utilities
import { z } from 'zod';

/**
 * Generic API Response Schema
 */
export const ApiResponseSchema = <T extends z.ZodTypeAny>(dataSchema: T) =>
  z.object({
    code: z.number(),
    data: dataSchema.optional(),
    message: z.string().optional(),
    error: z.string().optional(),
  });

/**
 * Validate and parse API response
 * Throws error if validation fails
 */
export function validateResponse<T>(schema: z.ZodSchema<T>, data: unknown): T {
  return schema.parse(data);
}

/**
 * Safe validation that returns undefined on error
 */
export function safeValidateResponse<T>(
  schema: z.ZodSchema<T>,
  data: unknown
): T | undefined {
  const result = schema.safeParse(data);
  if (result.success) {
    return result.data;
  }
  
  console.error('Validation error:', result.error);
  return undefined;
}

/**
 * Validate with fallback value
 */
export function validateWithFallback<T>(
  schema: z.ZodSchema<T>,
  data: unknown,
  fallback: T
): T {
  const result = schema.safeParse(data);
  return result.success ? result.data : fallback;
}

