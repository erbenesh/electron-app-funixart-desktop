// Common API types
export interface ApiError {
  code: number;
  message: string;
  details?: unknown;
}

export interface ApiResponse<T = unknown> {
  code: number;
  data?: T;
  message?: string;
  error?: string;
}

export interface PageableResponse<T> {
  content: T[];
  page: number;
  size: number;
  total_elements: number;
  total_pages: number;
  last: boolean;
}

export interface QueryParams {
  page?: number;
  size?: number;
  sort?: string;
  token?: string;
}

