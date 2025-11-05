// Entity Types extracted from decompiled Java code

// Base Types
export interface Identifiable<T = number> {
  id: T;
}

// Release Types
export interface ReleaseStatus extends Identifiable {
  name: string;
}

export interface Category extends Identifiable {
  name: string;
}

export interface Related {
  id?: number;
  title?: string;
  code?: string;
  type?: string;
}

export interface EpisodeUpdate {
  last_episode_update_date: number;
  last_episode_update_name: string;
  last_episode_source_update_id: number;
  last_episode_source_update_name: string;
  last_episode_type_update_id: number;
  last_episode_type_update_name: string;
}

export interface ReleaseVideoBanner {
  name: string;
  image: string;
  action_id: number;
  value: string;
  is_new: boolean;
}

export interface Release extends Identifiable {
  // Basic info
  title_original?: string;
  title_ru?: string;
  title_alt: string;
  image?: string;
  year?: string;
  country?: string;
  
  // Episodes
  episodes_released?: number;
  episodes_total?: number;
  release_date?: string;
  
  // Details
  director?: string;
  author?: string;
  translators?: string;
  studio?: string;
  source?: string;
  description?: string;
  note?: string;
  
  // Relations
  related?: Related;
  category?: Category;
  episode_last_update?: EpisodeUpdate;
  genres?: string;
  status?: ReleaseStatus;
  
  // Statistics
  rating: number;
  vote_1_count: number;
  vote_2_count: number;
  vote_3_count: number;
  vote_4_count: number;
  vote_5_count: number;
  vote_count: number;
  grade: number;
  
  // Dates
  creation_date?: number;
  last_update_date?: number;
  aired_on_date: number;
  
  // Counts
  favorites_count: number;
  watching_count: number;
  plan_count: number;
  completed_count: number;
  hold_on_count: number;
  dropped_count: number;
  
  // Flags
  is_adult: boolean;
  is_ru_blocked: boolean;
  is_view_blocked: boolean;
  is_play_disabled: boolean;
  is_tpp_disabled: boolean;
  is_deleted: boolean;
  
  // Additional
  age_rating: number;
  duration: number;
  season: number;
  broadcast: number;
  
  // User specific
  your_vote?: number;
  my_vote?: number;
  voted_at: number;
  related_count: number;
  comment_count: number;
  collection_count: number;
  profile_list_status: number;
  status_id: number;
  last_view_timestamp: number;
  
  // Capabilities
  can_video_appeal: boolean;
  can_torlook_search: boolean;
  
  // Last view episode
  last_view_episode?: Episode;
  last_view_episode_name?: string;
  last_view_episode_type_name?: string;
  
  // User flags
  is_viewed: boolean;
  is_favorite: boolean;
  
  // Lists
  screenshot_images: string[];
  video_banners: ReleaseVideoBanner[];
  related_releases: Release[];
  recommended_releases: Release[];
  comments?: ReleaseComment[];
  comment_per_day_count: number;
  
  // Notification preferences
  profile_release_type_notification_preference_count: number;
  profile_release_type_notification_preferences?: any[];
  is_release_type_notifications_enabled: boolean;
  
  // Last set dates
  last_set_viewed_date: number;
  last_set_favorite_date: number;
  last_set_watching_date: number;
  last_set_plan_date: number;
  last_set_completed_date: number;
  last_set_hold_on_date: number;
  last_set_dropped_date: number;
}

// Profile Types
export interface Badge {
  id: number;
  type: number; // 0 = TYPE_STATIC, 1 = TYPE_ANIMATION
  name: string;
  image_url: string;
  timestamp: number;
}

export interface ProfileCompact extends Identifiable {
  login: string;
  avatar: string;
  ban_expires: number;
  ban_reason?: string;
  privilege_level: number;
  badge_id?: number;
  badge_name?: string;
  badge_type?: number;
  badge_url?: string;
  is_banned: boolean;
  is_sponsor: boolean;
  is_verified: boolean;
}

export enum ProfileFriendStatus {
  PENDING_FIRST_SECOND = 0,
  PENDING_SECOND_FIRST = 1,
  FRIEND = 2,
}

export interface ProfileGenre {
  id: number;
  name: string;
  [key: string]: any;
}

export interface ProfileWatchDynamics {
  [key: string]: any;
}

export interface RoleDto {
  [key: string]: any;
}

export interface ProfileToken extends Identifiable {
  token: string;
}

export interface Profile extends Identifiable {
  // Basic info
  login: string;
  password?: string;
  avatar: string;
  status: string;
  
  // Social
  vk_page?: string;
  tg_page?: string;
  inst_page?: string;
  tt_page?: string;
  discord_page: string;
  is_social: boolean;
  
  // Dates
  sponsorship_expires: number;
  ban_expires: number;
  ban_reason?: string;
  privilege_level: number;
  
  // Counts
  watching_count: number;
  plan_count: number;
  completed_count: number;
  hold_on_count: number;
  dropped_count: number;
  favorite_count: number;
  comment_count: number;
  collection_count: number;
  video_count: number;
  friend_count: number;
  watched_episode_count: number;
  watched_time: number;
  
  // Dates
  last_activity_time: number;
  register_date: number;
  
  // Flags
  is_stats_hidden: boolean;
  is_counts_hidden: boolean;
  is_social_hidden: boolean;
  is_friend_requests_disallowed: boolean;
  is_sponsor: boolean;
  
  // Badge
  badge?: Badge;
  badge_id?: number;
  badge_name?: string;
  badge_type?: number;
  badge_url?: string;
  
  // Status flags
  is_banned: boolean;
  is_perm_banned: boolean;
  is_vk_bound: boolean;
  is_google_bound: boolean;
  is_login_changed: boolean;
  
  // Notifications
  is_episode_notifications_enabled: boolean;
  is_first_episode_notification_enabled: boolean;
  is_comment_notifications_enabled: boolean;
  
  // Friends
  friend_status?: ProfileFriendStatus;
  is_blocked: boolean;
  is_me_blocked: boolean;
  is_online: boolean;
  is_verified: boolean;
  block_list_added_date: number;
  
  // Preferences
  rating_score: number;
  preferred_genres?: ProfileGenre[];
  preferred_audiences?: ProfileGenre[];
  preferred_themes?: ProfileGenre[];
  pinned_section_id: number;
  
  // Theme
  theme_enabled?: boolean;
  theme_gradient_start_color?: string;
  theme_gradient_end_color?: string;
  theme_gradient_angle?: string;
  theme_icon_res_name?: string;
  theme_icon_url?: string;
  theme_icon_color?: string;
  theme_icon_alpha?: number;
  theme_icon_density?: string;
  theme_icon_size?: string;
  theme_animation_enabled?: boolean;
  theme_animation_speed?: string;
  theme_background_url?: string;
  theme_background_mode?: string;
  theme_background_alpha?: number;
  
  // Previews
  friends_preview?: Profile[];
  collections_preview?: Collection[];
  release_comments_preview?: ReleaseComment[];
  comments_preview?: Comment<any>[];
  release_videos_preview?: ReleaseVideo[];
  
  // Additional
  watch_dynamics?: ProfileWatchDynamics[];
  roles?: RoleDto[];
  history?: Release[];
  votes?: Release[];
  vote: number;
}

// Comment Types
export interface Comment<T extends ProfileCompact = ProfileCompact> extends Identifiable {
  profile: T;
  parent_comment_id?: number;
  message: string;
  vote_count: number;
  likes_count: number;
  timestamp: number;
  is_spoiler: boolean;
  is_edited: boolean;
  is_deleted: boolean;
  is_reply: boolean;
  type: number;
  reply_count: number;
  can_like: boolean;
  vote: number;
  
  // Abstract methods - to be implemented by specific comment types
  embeddable_id: number;
  embeddable_title: string;
  embeddable_image?: string;
}

export interface ReleaseComment extends Comment<ProfileCompact> {
  release: Release;
}

export interface CollectionComment extends Comment<ProfileCompact> {
  collection?: Collection;
}

export interface ArticleComment extends Comment<ProfileCompact> {
  article?: Article;
}

// Episode Types
export interface Source {
  id: number;
  name: string;
  [key: string]: any;
}

export interface Episode extends Identifiable {
  release?: Release;
  source?: Source;
  release_id: number;
  source_id: number;
  name?: string;
  url: string;
  iframe: boolean;
  position: number;
  playback_position: number;
  added_date: number;
  is_filler: boolean;
  is_watched: boolean;
}

// Collection Types
export interface Collection extends Identifiable {
  creator?: Profile;
  title: string;
  description: string;
  image: string;
  is_private: boolean;
  creation_date: number;
  last_update_date: number;
  favorites_count: number;
  releases: Release[];
  comment_count: number;
  is_favorite: boolean;
  delete: boolean;
}

// Article Types
export interface ChannelProfile extends ProfileCompact {
  [key: string]: any;
}

export interface ArticlePayload {
  blocks: any[];
  createPreview: (hasRepost: boolean) => ArticlePayload | null;
  isExpandAvailable: () => boolean;
  [key: string]: any;
}

export interface Article extends Identifiable {
  channel: Channel;
  author?: Profile;
  repost_article?: Article;
  payload: ArticlePayload;
  creation_date: number;
  last_update_date: number;
  comment_count: number;
  repost_count: number;
  vote_count: number;
  contains_repost_article: boolean;
  is_deleted: boolean;
  vote: number;
}

// Channel Types
export interface Channel extends Identifiable {
  title: string;
  description: string;
  cover?: string;
  avatar?: string;
  badge_id?: number;
  badge_name?: string;
  badge_type?: number;
  badge_url?: string;
  article_count: number;
  subscriber_count: number;
  creation_date: number;
  last_update_date: number;
  is_verified: boolean;
  is_blog: boolean;
  is_commenting_enabled: boolean;
  is_article_suggestion_enabled: boolean;
  is_deleted: boolean;
  blog_profile_id?: number;
  is_subscribed: boolean;
  permission: number;
  is_blocked: boolean;
  block_reason?: string;
  block_expire_date?: number;
  is_perm_blocked: boolean;
}

// Release Video Types
export interface ReleaseVideoCategory {
  id: number;
  name: string;
  [key: string]: any;
}

export interface ReleaseVideoHosting {
  id: number;
  name: string;
  [key: string]: any;
}

export interface ReleaseVideo extends Identifiable {
  release: Release;
  profile: Profile;
  category?: ReleaseVideoCategory;
  hosting?: ReleaseVideoHosting;
  title?: string;
  image: string;
  url: string;
  player_url: string;
  timestamp: number;
  is_favorite: boolean;
  favorites_count: number;
  delete: boolean;
}

// Notification Types
export interface ProfileNotification {
  id: number;
  type: string;
  timestamp: number;
  is_read: boolean;
  [key: string]: any;
}

// Schedule Types
export interface ScheduleRelease {
  release: Release;
  episode?: Episode;
  episode_type?: any;
  [key: string]: any;
}

// Type Types
export interface Type {
  id: number;
  name: string;
  [key: string]: any;
}

export interface TypeCompact {
  id: number;
  name: string;
  [key: string]: any;
}

