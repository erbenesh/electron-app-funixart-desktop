import { describe, it, expect } from 'vitest';
import { 
  UserSchema, 
  VoiceoverSchema, 
  ReleaseSchema,
  validateResponse,
  safeValidateResponse 
} from '../schemas';

describe('User Schema Validation', () => {
  it('should validate correct user data', () => {
    const validUser = {
      id: 1,
      username: 'testuser',
      avatar: 'https://example.com/avatar.jpg',
    };

    const result = UserSchema.safeParse(validUser);
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data).toEqual(validUser);
    }
  });

  it('should reject invalid user data', () => {
    const invalidUser = {
      id: 'not-a-number', // Should be number
      username: 'testuser',
    };

    const result = UserSchema.safeParse(invalidUser);
    expect(result.success).toBe(false);
  });

  it('should allow optional fields', () => {
    const minimalUser = {
      id: 1,
      username: 'testuser',
      avatar: null,
    };

    const result = UserSchema.safeParse(minimalUser);
    expect(result.success).toBe(true);
  });
});

describe('Voiceover Schema Validation', () => {
  it('should validate correct voiceover data', () => {
    const validVoiceover = {
      id: 1,
      name: 'AniLibria',
      icon: 'https://example.com/icon.png',
      episodes_count: 12,
      view_count: 1000,
    };

    const result = VoiceoverSchema.safeParse(validVoiceover);
    expect(result.success).toBe(true);
  });

  it('should reject missing required fields', () => {
    const invalidVoiceover = {
      id: 1,
      name: 'AniLibria',
      // Missing icon, episodes_count, view_count
    };

    const result = VoiceoverSchema.safeParse(invalidVoiceover);
    expect(result.success).toBe(false);
  });
});

describe('Release Schema Validation', () => {
  it('should validate minimal release data', () => {
    const minimalRelease = {
      id: 1,
      code: 'test-anime',
      title: {
        ru: 'Тестовое Аниме',
      },
      poster: null,
    };

    const result = ReleaseSchema.safeParse(minimalRelease);
    expect(result.success).toBe(true);
  });

  it('should validate complete release data', () => {
    const completeRelease = {
      id: 1,
      code: 'test-anime',
      title: {
        ru: 'Тестовое Аниме',
        en: 'Test Anime',
        original: 'テストアニメ',
      },
      description: 'Test description',
      poster: 'https://example.com/poster.jpg',
      type: { id: 1, name: 'TV', code: 'tv' },
      country: { id: 1, name: 'Japan', code: 'JP' },
      episodes_total: 12,
      episodes_released: 5,
      genres: [
        { id: 1, name: 'Action' },
        { id: 2, name: 'Comedy' },
      ],
    };

    const result = ReleaseSchema.safeParse(completeRelease);
    expect(result.success).toBe(true);
  });
});

describe('Validation Utilities', () => {
  it('should throw error on invalid data with validateResponse', () => {
    const invalidData = { id: 'not-a-number' };
    
    expect(() => {
      validateResponse(UserSchema, invalidData);
    }).toThrow();
  });

  it('should return undefined on invalid data with safeValidateResponse', () => {
    const invalidData = { id: 'not-a-number' };
    
    const result = safeValidateResponse(UserSchema, invalidData);
    expect(result).toBeUndefined();
  });

  it('should return validated data on success', () => {
    const validData = {
      id: 1,
      username: 'testuser',
      avatar: null,
    };
    
    const result = safeValidateResponse(UserSchema, validData);
    expect(result).toEqual(validData);
  });
});

