// User and authentication types
export interface User {
  id: number;
  username: string;
  email?: string;
  avatar: string | null;
  profile_name?: string;
  created_at?: string;
  updated_at?: string;
  // Add other user fields as needed
}

export interface LoginResponse {
  code: number;
  profile: User;
  token: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
}

