// API Request Types

// Base Request
export interface BaseRequest {}

// Auth Requests
export interface SignInRequest {
  login: string;
  password: string;
}

export interface SignUpRequest {
  login: string;
  email: string;
  password: string;
}

export interface SignUpWithGoogleRequest {
  login: string;
  email: string;
  googleIdToken: string;
}

export interface SignUpWithVkRequest {
  login: string;
  email: string;
  vkAccessToken: string;
}

export interface SignInWithGoogleRequest {
  googleIdToken: string;
}

export interface SignInWithVkRequest {
  vkAccessToken: string;
}

export interface VerifyRequest {
  login: string;
  email: string;
  password: string;
  vkAccessToken?: string;
  googleIdToken?: string;
  hash: string;
  code: string;
}

export interface ResendRequest {
  login: string;
  email: string;
  password: string;
  vkAccessToken?: string;
  googleIdToken?: string;
  hash: string;
}

export interface RestoreRequest {
  data: string;
}

export interface RestoreResendRequest {
  data: string;
  password: string;
  hash: string;
}

export interface RestoreVerifyRequest {
  data: string;
  password: string;
  hash: string;
  code: string;
}

// Search Requests
export interface SearchRequest {
  query: string;
  searchBy?: number;
}

export interface ChannelsSearchRequest extends SearchRequest {}

export interface ArticlesSearchRequest extends SearchRequest {}

// Filter Requests
export enum FilterSort {
  DATE_UPDATE = 0,
  GRADE = 1,
  YEAR = 2,
  POPULAR = 3,
}

export enum FilterEpisodes {
  LESS_THAN_13 = 1,
  MORE_THAN_13 = 2,
  MORE_THAN_26 = 3,
  MORE_THAN_100 = 4,
}

export interface FilterRequest {
  category_id?: number | null;
  status_id?: number | null;
  start_year?: number | null;
  end_year?: number | null;
  studio?: string | null;
  country?: string | null;
  season?: number | null;
  episode_duration_from?: number | null;
  episode_duration_to?: number | null;
  episodes_from?: number | null;
  episodes_to?: number | null;
  genres?: number[];
  profile_list_exclusions?: number[];
  types?: number[];
  age_ratings?: number[];
  is_genres_exclude_mode_enabled?: boolean;
  sort?: number | null;
}

// Comment Requests
export interface CommentAddRequest {
  parentCommentId?: number;
  replyToProfileId?: number;
  message: string;
  spoiler: boolean;
}

export interface CommentEditRequest {
  message: string;
  spoiler: boolean;
}

export interface CommentProcessRequest {
  // Process action details
}

export interface CommentReportRequest {
  reasonId: number;
  description?: string;
}

// Collection Requests
export interface CollectionCreateEditRequest {
  title: string;
  description?: string;
  is_private?: boolean;
}

export interface CollectionReportRequest {
  reasonId: number;
  description?: string;
}

// Article Requests
export interface ArticleCreateEditRequest {
  title: string;
  content: string;
  tags?: string[];
}

export interface ArticlesFilterRequest {
  // Filter parameters for articles
}

// Profile Requests
export interface ProfileProcessRequest {
  // Process action details
}

export interface StatusEditRequest {
  status: string;
}

export interface SocialPagesEditRequest {
  vk_page?: string | null;
  tg_page?: string | null;
  inst_page?: string | null;
  tt_page?: string | null;
  discord_page?: string | null;
}

export interface PrivacyEditRequest {
  privacy: number;
}

export interface SelectPinnedSectionRequest {
  sectionId: number;
}

export interface SelectThemeRequest {
  themeId: number;
}

// Release Requests
export interface ReleaseReportRequest {
  reasonId: number;
  description?: string;
}

export interface ReleaseVideoAppealRequest {
  releaseId: number;
  categoryId: number;
  description?: string;
}

// Report Requests
export interface ReportRequest<T = number> {
  id: T;
  reasonId: number;
  description?: string;
}

// Channel Requests
export interface ChannelCreateEditRequest {
  title: string;
  description?: string;
}

export interface ChannelBlockManageRequest {
  profileId: number;
  block: boolean;
}

export interface ChannelPermissionManageRequest {
  profileId: number;
  // Permission details
}

export interface ChannelPermissionsFilterRequest {
  // Filter parameters
}

export interface ChannelsFilterRequest {
  // Filter parameters
}

// Notification Preference Requests
export interface NotificationPreferenceEditRequest {
  enabled: boolean;
}

export interface NotificationReleaseTypeEditRequest {
  releaseId: number;
  typeId: number;
}

