import { 
  ReleaseResponseSchema, 
  PageableReleaseSchema,
  safeValidateResponse 
} from '../schemas';
import type { ReleaseResponseValidated, PageableReleaseValidated } from '../schemas';

/**
 * Validate single release response
 */
export function validateReleaseResponse(data: unknown): ReleaseResponseValidated | undefined {
  return safeValidateResponse(ReleaseResponseSchema, data);
}

/**
 * Validate pageable release response
 */
export function validatePageableReleases(data: unknown): PageableReleaseValidated | undefined {
  return safeValidateResponse(PageableReleaseSchema, data);
}

/**
 * Extract release from response with validation
 */
export function extractValidatedRelease(response: unknown) {
  const validated = validateReleaseResponse(response);
  return validated?.release;
}

/**
 * Extract releases from pageable response with validation
 */
export function extractValidatedReleases(response: unknown) {
  const validated = validatePageableReleases(response);
  return validated?.content || [];
}

