import { z } from 'zod';

// User Schema
export const UserSchema = z.object({
  id: z.number(),
  username: z.string(),
  email: z.string().email().optional(),
  avatar: z.string().nullable(),
  profile_name: z.string().optional(),
  created_at: z.string().optional(),
  updated_at: z.string().optional(),
});

export type UserValidated = z.infer<typeof UserSchema>;

// Login Response Schema
export const LoginResponseSchema = z.object({
  code: z.number(),
  profile: UserSchema,
  token: z.string(),
});

export type LoginResponseValidated = z.infer<typeof LoginResponseSchema>;

// Auth State Schema
export const AuthStateSchema = z.object({
  user: UserSchema.nullable(),
  token: z.string().nullable(),
  isAuthenticated: z.boolean(),
});

export type AuthStateValidated = z.infer<typeof AuthStateSchema>;

